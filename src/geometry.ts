import { N } from './data/yamanote'
import type { Direction } from './store'

// SVG viewBox 1000x1000 上の正円
export const CX = 500
export const CY = 500
export const RX = 300
export const RY = 300

// トラック半径スケール: 外回りは外側の線路、内回りは内側の線路を走る
export const TRACK_OUTER = 1.0
export const TRACK_INNER = 0.88
export const STATION_R = 0.94 // 駅は複線の間
export const LABEL_R = 1.075

export const DEG_PER_STATION = 360 / N

export const mod = (v: number, m: number) => ((v % m) + m) % m

// 東京駅を右端(0°)として時計回り(=外回り順)に等間隔配置
export const indexToTheta = (i: number) => i * DEG_PER_STATION

export function pointAt(thetaDeg: number, scale = 1) {
  const t = (thetaDeg * Math.PI) / 180
  return {
    x: CX + RX * scale * Math.cos(t),
    y: CY + RY * scale * Math.sin(t),
  }
}

// θ増加方向（画面上の時計回り＝外回り）の接線角度
export function tangentDeg(thetaDeg: number) {
  const t = (thetaDeg * Math.PI) / 180
  return (Math.atan2(RY * Math.cos(t), -RX * Math.sin(t)) * 180) / Math.PI
}

// 実数駅インデックス pos → 円周上の座標と進行方向の角度。
// fwd(外回り)は外側トラック、rev(内回り)は内側トラックを走る
export function alongLoop(pos: number, dir: Direction) {
  const theta = pos * DEG_PER_STATION
  const scale = dir === 'fwd' ? TRACK_OUTER : TRACK_INNER
  const { x, y } = pointAt(theta, scale)
  const angle = dir === 'fwd' ? tangentDeg(theta) : tangentDeg(theta) + 180
  return { x, y, angle }
}

// 駅ごとのタップ判定エリア（12°ぶんの円環セクター）。
// 線路の内側からラベルの外側までを覆い、隣の駅と重ならずにタイルする
const HIT_S0 = 0.76
const HIT_S1 = 1.52

export function stationHitPath(i: number) {
  const half = DEG_PER_STATION / 2
  const t0 = indexToTheta(i) - half
  const t1 = indexToTheta(i) + half
  const a = pointAt(t0, HIT_S1)
  const b = pointAt(t1, HIT_S1)
  const c = pointAt(t1, HIT_S0)
  const d = pointAt(t0, HIT_S0)
  return [
    `M ${a.x} ${a.y}`,
    `A ${RX * HIT_S1} ${RY * HIT_S1} 0 0 1 ${b.x} ${b.y}`,
    `L ${c.x} ${c.y}`,
    `A ${RX * HIT_S0} ${RY * HIT_S0} 0 0 0 ${d.x} ${d.y}`,
    'Z',
  ].join(' ')
}
