import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useGame, travelDurationMs, type Direction } from '../store'
import { mod } from '../geometry'

const norm180 = (d: number) => {
  let v = mod(d, 360)
  if (v > 180) v -= 360
  return v
}

// 肉球の足あと（走行中に線路へ残す）
const PAW_INTERVAL_MS = 280
const PAW_LIFETIME_MS = 1600
const PAW_MAX = 12

interface PawPrint {
  id: number
  x: number
  y: number
  angle: number
}

// 到着時に電車の中心から放射状に飛ぶ肉球
const PAW_BURSTS = [
  { dx: -62, dy: -48, delay: 0 },
  { dx: 64, dy: -40, delay: 0.08 },
  { dx: -78, dy: 4, delay: 0.16 },
  { dx: 78, dy: -4, delay: 0.1 },
  { dx: -40, dy: -74, delay: 0.2 },
  { dx: 46, dy: -68, delay: 0.24 },
]

interface TrainProps {
  // 実数駅インデックス pos → 線路上の座標と進行方向の角度（地図レイアウト側が提供）
  along: (pos: number, dir: Direction) => { x: number; y: number; angle: number }
  color: string // ラインカラー（車体の帯）
  n: number // 駅数
  loop: boolean
}

export function Train({ along, color, n, loop }: TrainProps) {
  const currentIndex = useGame((s) => s.currentIndex)
  const direction = useGame((s) => s.direction)
  const isMoving = useGame((s) => s.isMoving)
  const arrivedIndex = useGame((s) => s.arrivedIndex)
  const arrived = arrivedIndex != null && !isMoving

  const pos = useMotionValue(currentIndex)
  // fwd=1 / rev=0。環状線のトラック乗り換えを滑らかにするための補間値
  const dirMix = useMotionValue(direction === 'fwd' ? 1 : 0)

  const prevIndex = useRef(currentIndex)
  const directionRef = useRef(direction)
  directionRef.current = direction
  const alongRef = useRef(along)
  alongRef.current = along

  // 走行アニメーション。タップ移動では複数駅ぶんを1本の連続アニメーションで進む。
  // 走行中の行き先差し替えにも対応するため、現在の実位置 pos から絶対ターゲットへ動かす
  useEffect(() => {
    const prev = prevIndex.current
    prevIndex.current = currentIndex
    const from = pos.get()
    let target: number
    if (!loop) {
      target = currentIndex
    } else {
      const diff = mod(currentIndex - prev, n)
      if (diff === 0) return
      // タップ移動中は選択方向に従って周回する（store の stopsBetween と一致させる）。
      // ボタン操作（±1）は最短方向
      const traveling = useGame.getState().destinationIndex != null
      const fwd = traveling ? directionRef.current === 'fwd' : diff <= n / 2
      target = fwd ? from + mod(currentIndex - from, n) : from - mod(from - currentIndex, n)
    }
    if (target === from) return
    const controls = animate(pos, target, {
      duration: travelDurationMs(Math.abs(target - from)) / 1000,
      ease: 'easeInOut',
    })
    return () => controls.stop()
  }, [currentIndex, pos, loop, n])

  // 方向切替（環状線: 外側/内側トラックの乗り換え）
  useEffect(() => {
    const controls = animate(dirMix, direction === 'fwd' ? 1 : 0, {
      duration: 0.4,
      ease: 'easeInOut',
    })
    return () => controls.stop()
  }, [direction, dirMix])

  // 走行中、電車の実位置から肉球の足あとをスポーン（左右交互にずらして歩幅感を出す）
  const [prints, setPrints] = useState<PawPrint[]>([])
  const printSeq = useRef(0)
  const printSide = useRef(1)
  useEffect(() => {
    if (!isMoving) return
    const timer = setInterval(() => {
      const p = alongRef.current(pos.get(), directionRef.current)
      const side = (printSide.current *= -1)
      const rad = (p.angle * Math.PI) / 180
      const print: PawPrint = {
        id: printSeq.current++,
        x: p.x - Math.sin(rad) * 10 * side,
        y: p.y + Math.cos(rad) * 10 * side,
        angle: p.angle,
      }
      setPrints((prev) => [...prev.slice(-(PAW_MAX - 1)), print])
      setTimeout(() => {
        setPrints((prev) => prev.filter((q) => q.id !== print.id))
      }, PAW_LIFETIME_MS)
    }, PAW_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [isMoving, pos])

  const transform = useTransform([pos, dirMix], (values) => {
    const [p, m] = values as [number, number]
    const f = alongRef.current(p, 'fwd')
    const r = alongRef.current(p, 'rev')
    const x = r.x + (f.x - r.x) * m
    const y = r.y + (f.y - r.y) * m
    let rot = norm180(alongRef.current(p, directionRef.current).angle)
    // 上下逆さにならないように反転
    let flip = 1
    if (rot > 90 || rot < -90) {
      rot = norm180(rot - 180)
      flip = -1
    }
    return `translate(${x}px, ${y}px) rotate(${rot}deg) scaleX(${flip})`
  })

  // 吹き出し・肉球バースト用: 車体の回転/反転の影響を受けない正立レイヤー
  const overlayTransform = useTransform([pos, dirMix], (values) => {
    const [p, m] = values as [number, number]
    const f = alongRef.current(p, 'fwd')
    const r = alongRef.current(p, 'rev')
    const x = r.x + (f.x - r.x) * m
    const y = r.y + (f.y - r.y) * m
    return `translate(${x}px, ${y}px)`
  })

  // 走行中はぴょこぴょこ / 到着中はしっぽふりふり風
  const chiwawaClass = isMoving ? 'chiwawa-ride' : arrived ? 'chiwawa-happy' : undefined

  return (
    <>
      {/* 肉球の足あと（電車より下のレイヤー） */}
      <g>
        {prints.map((p) => (
          <g
            key={p.id}
            className="paw-print"
            transform={`translate(${p.x} ${p.y}) rotate(${p.angle})`}
          >
            <ellipse cx={0} cy={2.5} rx={4.4} ry={3.6} fill="#f9a8d4" />
            <circle cx={-4.2} cy={-2.6} r={1.9} fill="#f9a8d4" />
            <circle cx={0} cy={-4.2} r={1.9} fill="#f9a8d4" />
            <circle cx={4.2} cy={-2.6} r={1.9} fill="#f9a8d4" />
          </g>
        ))}
      </g>

      <motion.g style={{ transform }}>
        {/* 車体（銀ボディ + ラインカラー帯） */}
        <rect x={-62} y={-22} width={124} height={44} rx={9} fill="#e2e8f0" stroke="#0f172a" strokeWidth={3} />
        <rect x={-62} y={8} width={124} height={14} fill={color} />
        {/* まど + チワワ（窓から大きく乗り出す） */}
        <rect x={-52} y={-14} width={44} height={20} rx={3} fill="#bfdbfe" stroke="#0f172a" strokeWidth={2} />
        <g className={chiwawaClass}>
          <image href="/images/uru.png" x={-63} y={-59} width={66} height={63} className="pixelated" />
        </g>
        <rect x={8} y={-14} width={44} height={20} rx={3} fill="#bfdbfe" stroke="#0f172a" strokeWidth={2} />
        <g className={chiwawaClass} style={{ animationDelay: isMoving ? '0.22s' : '0.15s' }}>
          <image href="/images/roi.png" x={-3} y={-59} width={66} height={63} className="pixelated" />
        </g>
        {/* ヘッドライト */}
        <rect x={56} y={2} width={8} height={11} fill="#fde047" stroke="#0f172a" strokeWidth={1.5} />
        {/* しゃりん */}
        <circle cx={-36} cy={24} r={8} fill="#0f172a" />
        <circle cx={36} cy={24} r={8} fill="#0f172a" />
      </motion.g>

      {/* 到着演出: 「わん！」吹き出し + 肉球バースト（常に正立） */}
      {arrived && (
        <motion.g key={arrivedIndex} style={{ transform: overlayTransform }} pointerEvents="none">
          <g transform="translate(0 -100)">
            <g className="pop-in">
              <rect x={-42} y={-24} width={84} height={42} rx={13} fill="#fffbeb" stroke="#0f172a" strokeWidth={3} />
              <path d="M -10 16 L 0 33 L 10 16 Z" fill="#fffbeb" stroke="#0f172a" strokeWidth={3} strokeLinejoin="round" />
              <rect x={-11} y={12} width={22} height={6} fill="#fffbeb" />
              <text x={0} y={5} textAnchor="middle" fontSize={23} fontWeight={700} fill="#0f172a">
                わん！
              </text>
            </g>
          </g>
          {PAW_BURSTS.map((b, i) => (
            <text
              key={i}
              className="paw-pop"
              textAnchor="middle"
              fontSize={20}
              style={
                {
                  '--dx': `${b.dx}px`,
                  '--dy': `${b.dy}px`,
                  animationDelay: `${b.delay}s`,
                } as CSSProperties
              }
            >
              🐾
            </text>
          ))}
        </motion.g>
      )}
    </>
  )
}
