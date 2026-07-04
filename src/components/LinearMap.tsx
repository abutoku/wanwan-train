import { useMemo } from 'react'
import { useGame, type Direction } from '../store'
import { RIDEABLE } from '../data/rideable'
import { alongSerpentine, serpentineLayout, serpentinePathD } from '../linearGeometry'
import { Train } from './Train'

// 直線路線の地図（つづら折り配置）。fwd = 駅番号が増える方向
export function LinearMap() {
  const lineId = useGame((s) => s.lineId)
  const currentIndex = useGame((s) => s.currentIndex)
  const destinationIndex = useGame((s) => s.destinationIndex)
  const direction = useGame((s) => s.direction)
  const serviceId = useGame((s) => s.serviceId)
  const travelTo = useGame((s) => s.travelTo)

  const line = RIDEABLE[lineId]
  const n = line.stations.length

  // 停車駅ビュー: 通過駅のある種別を選択中なら停車駅の Set（全駅停車なら null = 従来表示）
  const service = line.services?.find((sv) => sv.id === serviceId)
  const stopSet = service && service.stops !== 'all' ? new Set(service.stops) : null

  const { pts, dx, rowGap } = useMemo(() => serpentineLayout(n), [n])
  const pathD = useMemo(() => serpentinePathD(pts), [pts])
  const along = useMemo(
    () => (pos: number, dir: Direction) => alongSerpentine(pts, pos, dir),
    [pts],
  )

  const hitW = dx
  const hitH = Math.min(rowGap * 0.7, 190)

  return (
    <svg
      viewBox="0 0 1000 1000"
      className="w-full h-full touch-manipulation"
      role="img"
      aria-label={`${line.name}の路線図`}
    >
      {/* 線路 */}
      <path d={pathD} fill="none" stroke={line.color} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round" />
      {/* 進行方向に流れる破線 */}
      <path
        key={direction}
        className={direction === 'fwd' ? 'flow-cw' : 'flow-ccw'}
        d={pathD}
        fill="none"
        stroke="#ffffff"
        strokeWidth={4}
        strokeDasharray="10 26"
        strokeLinejoin="round"
        opacity={0.65}
      />

      {/* 終点表示 */}
      <text x={pts[0].x} y={pts[0].y - 40} textAnchor="middle" fontSize={14} fill="#64748b" className="select-none">
        {line.stations[0].number}
      </text>
      <text x={pts[n - 1].x} y={pts[n - 1].y - 40} textAnchor="middle" fontSize={14} fill="#64748b" className="select-none">
        {line.stations[n - 1].number}
      </text>

      {/* 駅 */}
      {line.stations.map((s, i) => {
        const p = pts[i]
        const lp = { x: p.x - 4, y: p.y + 34 }
        const isCurrent = i === currentIndex
        const isDest = i === destinationIndex
        const canTap = i !== currentIndex // タップは常に受付
        const isStop = stopSet == null || stopSet.has(s.id)
        const passed = !isStop // 選択中の種別が通過する駅（表示のみ。タップ移動は可能）

        return (
          <g
            key={s.id}
            onClick={canTap ? () => travelTo(i) : undefined}
            className={canTap ? 'cursor-pointer station-group' : undefined}
          >
            {/* タップ判定: 駅を中心にした矩形（スマホでも押しやすい） */}
            {canTap && (
              <rect
                x={p.x - hitW / 2}
                y={p.y - hitH / 2}
                width={hitW}
                height={hitH}
                fill="transparent"
              />
            )}
            {isDest && <circle cx={p.x} cy={p.y} r={12} fill="#fde047" className="station-pulse" />}
            {/* 停車駅ビュー: 停車駅に種別カラーのリング */}
            {stopSet != null && isStop && (
              <circle
                cx={p.x}
                cy={p.y}
                r={20}
                fill="none"
                stroke={service!.color}
                strokeWidth={5}
                opacity={0.9}
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={passed ? 7 : s.transfers.length > 0 ? 13 : 10}
              fill={isCurrent ? '#fde047' : isDest ? '#fca5a5' : passed ? '#475569' : '#ffffff'}
              stroke="#1e293b"
              strokeWidth={3}
              className="station-dot"
            />
            <text
              x={lp.x}
              y={lp.y}
              transform={`rotate(38 ${lp.x} ${lp.y})`}
              textAnchor="start"
              dominantBaseline="middle"
              fontSize={s.name.length > 5 ? 15 : 18}
              fill={
                isCurrent ? '#fde047' : isDest ? '#fca5a5' : passed ? '#64748b' : '#cbd5e1'
              }
              opacity={passed ? 0.7 : 1}
              className="pointer-events-none select-none"
            >
              {s.name}
            </text>
          </g>
        )
      })}

      <Train along={along} color={line.color} n={n} loop={false} />
    </svg>
  )
}
