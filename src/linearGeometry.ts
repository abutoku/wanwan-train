import type { Direction } from './store'

// 直線路線のつづら折り（サーペンタイン）レイアウト。
// SVG viewBox 1000x1000 内に、1行あたり最大7駅で左右に折り返して配置する。
// 上部（y < 約240）は駅情報オーバーレイ用に空けてある

export interface Pt {
  x: number
  y: number
}

export interface SerpentineLayout {
  pts: Pt[] // 駅ごとの座標（駅番号昇順）
  dx: number // 同一行内の駅間隔
  rowGap: number // 行間隔
}

const MX = 130 // 左右マージン
const TOP = 300
const BOTTOM = 850
const MAX_PER_ROW = 7

export function serpentineLayout(n: number): SerpentineLayout {
  const rows = Math.max(1, Math.ceil(n / MAX_PER_ROW))
  const perRow = Math.ceil(n / rows)
  const dx = perRow > 1 ? (1000 - 2 * MX) / (perRow - 1) : 0
  const rowGap = rows > 1 ? (BOTTOM - TOP) / (rows - 1) : 0

  const pts: Pt[] = []
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / perRow)
    const k = i % perRow
    const y = rows === 1 ? 500 : TOP + r * rowGap
    // 偶数行: 左→右 / 奇数行: 右→左（折返し点が同じx座標で縦につながる）
    const x = r % 2 === 0 ? MX + k * dx : 1000 - MX - k * dx
    pts.push({ x, y })
  }
  return { pts, dx, rowGap }
}

export function serpentinePathD(pts: Pt[]) {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
}

// 実数駅インデックス pos → 折れ線上の座標と進行方向の角度
export function alongSerpentine(pts: Pt[], pos: number, dir: Direction) {
  const n = pts.length
  const clamped = Math.max(0, Math.min(n - 1, pos))
  const i = Math.min(Math.floor(clamped), n - 2)
  const t = clamped - i
  const a = pts[i]
  const b = pts[i + 1]
  const x = a.x + (b.x - a.x) * t
  const y = a.y + (b.y - a.y) * t
  let angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
  if (dir === 'rev') angle += 180
  return { x, y, angle }
}
