import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useGame, travelDurationMs, type Direction } from '../store'
import { mod } from '../geometry'

const norm180 = (d: number) => {
  let v = mod(d, 360)
  if (v > 180) v -= 360
  return v
}

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

  return (
    <motion.g style={{ transform }}>
      {/* 車体（銀ボディ + ラインカラー帯） */}
      <rect x={-62} y={-22} width={124} height={44} rx={9} fill="#e2e8f0" stroke="#0f172a" strokeWidth={3} />
      <rect x={-62} y={8} width={124} height={14} fill={color} />
      {/* まど + チワワ（窓から大きく乗り出す） */}
      <rect x={-52} y={-14} width={44} height={20} rx={3} fill="#bfdbfe" stroke="#0f172a" strokeWidth={2} />
      <image href="/images/uru.png" x={-54} y={-42} width={48} height={46} className="pixelated" />
      <rect x={8} y={-14} width={44} height={20} rx={3} fill="#bfdbfe" stroke="#0f172a" strokeWidth={2} />
      <image href="/images/roi.png" x={6} y={-42} width={48} height={46} className="pixelated" />
      {/* ヘッドライト */}
      <rect x={56} y={2} width={8} height={11} fill="#fde047" stroke="#0f172a" strokeWidth={1.5} />
      {/* しゃりん */}
      <circle cx={-36} cy={24} r={8} fill="#0f172a" />
      <circle cx={36} cy={24} r={8} fill="#0f172a" />
    </motion.g>
  )
}
