import { useGame } from '../store'
import { STATIONS } from '../data/yamanote'
import { YAMANOTE_GREEN } from '../data/lines'
import {
  CX,
  CY,
  LABEL_R,
  RX,
  RY,
  STATION_R,
  TRACK_INNER,
  TRACK_OUTER,
  indexToTheta,
  pointAt,
  stationHitPath,
} from '../geometry'
import { Train } from './Train'

export function LoopMap() {
  const currentIndex = useGame((s) => s.currentIndex)
  const destinationIndex = useGame((s) => s.destinationIndex)
  const direction = useGame((s) => s.direction)
  const travelTo = useGame((s) => s.travelTo)

  const activeScale = direction === 'outer' ? TRACK_OUTER : TRACK_INNER

  return (
    <svg
      viewBox="0 0 1000 1000"
      className="w-full h-full touch-manipulation"
      role="img"
      aria-label="山手線の路線図"
    >
      {/* 複線: 外側=外回り / 内側=内回り */}
      <ellipse cx={CX} cy={CY} rx={RX * TRACK_OUTER} ry={RY * TRACK_OUTER} fill="none" stroke={YAMANOTE_GREEN} strokeWidth={10} opacity={direction === 'outer' ? 1 : 0.45} />
      <ellipse cx={CX} cy={CY} rx={RX * TRACK_INNER} ry={RY * TRACK_INNER} fill="none" stroke={YAMANOTE_GREEN} strokeWidth={10} opacity={direction === 'inner' ? 1 : 0.45} />

      {/* 進行方向に流れる破線（外回り=時計回り） */}
      <ellipse
        key={direction}
        className={direction === 'outer' ? 'flow-cw' : 'flow-ccw'}
        cx={CX}
        cy={CY}
        rx={RX * activeScale}
        ry={RY * activeScale}
        fill="none"
        stroke="#ffffff"
        strokeWidth={4}
        strokeDasharray="10 26"
        opacity={0.65}
      />

      {/* 駅 */}
      {STATIONS.map((s, i) => {
        const theta = indexToTheta(i)
        const p = pointAt(theta, STATION_R)
        const lp = pointAt(theta, LABEL_R)
        const onLeft = theta > 90 && theta < 270
        const labelRot = onLeft ? theta + 180 : theta
        const isCurrent = i === currentIndex
        const isDest = i === destinationIndex
        const canTap = i !== currentIndex // タップは常に受付

        return (
          <g
            key={s.id}
            onClick={canTap ? () => travelTo(i) : undefined}
            className={canTap ? 'cursor-pointer station-group' : undefined}
          >
            {/* タップ判定: 駅ドット〜ラベルまで覆う12°の扇形（スマホでも押しやすい） */}
            {canTap && <path d={stationHitPath(i)} fill="transparent" />}
            {isDest && <circle cx={p.x} cy={p.y} r={12} fill="#fde047" className="station-pulse" />}
            <circle
              cx={p.x}
              cy={p.y}
              r={s.transfers.length > 0 ? 13 : 10}
              fill={isCurrent ? '#fde047' : isDest ? '#fca5a5' : '#ffffff'}
              stroke="#14330a"
              strokeWidth={3}
              className="station-dot"
            />
            <text
              x={lp.x}
              y={lp.y}
              transform={`rotate(${labelRot} ${lp.x} ${lp.y})`}
              textAnchor={onLeft ? 'end' : 'start'}
              dominantBaseline="middle"
              fontSize={s.name.length > 5 ? 15 : 18}
              fill={isCurrent ? '#fde047' : isDest ? '#fca5a5' : '#cbd5e1'}
              className="pointer-events-none select-none"
            >
              {s.name}
            </text>
          </g>
        )
      })}

      <Train />
    </svg>
  )
}
