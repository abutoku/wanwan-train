import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useGame, STEP_MS } from '../store'
import { N } from '../data/yamanote'
import {
  DEG_PER_STATION,
  TRACK_INNER,
  TRACK_OUTER,
  indexToTheta,
  mod,
  pointAt,
  tangentDeg,
} from '../geometry'
import { YAMANOTE_GREEN } from '../data/lines'

const norm180 = (d: number) => {
  let v = mod(d, 360)
  if (v > 180) v -= 360
  return v
}

export function Train() {
  const currentIndex = useGame((s) => s.currentIndex)
  const direction = useGame((s) => s.direction)

  const angle = useMotionValue(indexToTheta(currentIndex))
  const track = useMotionValue(direction === 'outer' ? TRACK_OUTER : TRACK_INNER)

  const prevIndex = useRef(currentIndex)
  const directionRef = useRef(direction)
  directionRef.current = direction

  // 1駅ぶんの走行アニメーション（インデックスの差分から回転方向を決める）
  useEffect(() => {
    const diff = mod(currentIndex - prevIndex.current, N)
    prevIndex.current = currentIndex
    if (diff === 0) return
    const delta = diff === 1 ? DEG_PER_STATION : -DEG_PER_STATION
    const controls = animate(angle, angle.get() + delta, {
      duration: STEP_MS / 1000,
      ease: 'easeInOut',
    })
    return () => controls.stop()
  }, [currentIndex, angle])

  // 方向切替でトラック（外側/内側の線路）を乗り換える
  useEffect(() => {
    const controls = animate(track, direction === 'outer' ? TRACK_OUTER : TRACK_INNER, {
      duration: 0.4,
      ease: 'easeInOut',
    })
    return () => controls.stop()
  }, [direction, track])

  const transform = useTransform([angle, track], (values) => {
    const [a, s] = values as [number, number]
    const { x, y } = pointAt(a, s)
    // 進行方向を向く接線角度（内回りは逆向き）
    let rot = norm180(directionRef.current === 'outer' ? tangentDeg(a) : tangentDeg(a) + 180)
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
      {/* 車体（銀ボディ + ウグイス色帯） */}
      <rect x={-62} y={-22} width={124} height={44} rx={9} fill="#e2e8f0" stroke="#0f172a" strokeWidth={3} />
      <rect x={-62} y={8} width={124} height={14} fill={YAMANOTE_GREEN} />
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
