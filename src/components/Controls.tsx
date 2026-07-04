import { useGame, stopsBetween, atTerminus, type Direction } from '../store'
import { RIDEABLE, directionLabels } from '../data/rideable'

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-0.5">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  )
}

export function Controls() {
  const lineId = useGame((s) => s.lineId)
  const direction = useGame((s) => s.direction)
  const isMoving = useGame((s) => s.isMoving)
  const isPlaying = useGame((s) => s.isPlaying)
  const currentIndex = useGame((s) => s.currentIndex)
  const destinationIndex = useGame((s) => s.destinationIndex)
  const setDirection = useGame((s) => s.setDirection)
  const togglePlay = useGame((s) => s.togglePlay)
  const stepForward = useGame((s) => s.stepForward)
  const stepBackward = useGame((s) => s.stepBackward)

  const line = RIDEABLE[lineId]
  const labels = directionLabels(line)
  const directions: { id: Direction; label: string; sub: string }[] = [
    { id: 'rev', ...labels.rev },
    { id: 'fwd', ...labels.fwd },
  ]

  const back: Direction = direction === 'fwd' ? 'rev' : 'fwd'
  const forwardBlocked = atTerminus(currentIndex, direction, line)
  const backBlocked = atTerminus(currentIndex, back, line)

  const dest = destinationIndex != null ? line.stations[destinationIndex] : null
  const remaining =
    destinationIndex != null
      ? stopsBetween(currentIndex, destinationIndex, direction, line)
      : null

  return (
    <div className="panel p-3.5 space-y-3.5">
      {/* 方向 */}
      <div>
        <div className="text-[10px] tracking-[0.2em] text-slate-400 mb-1.5">
          方向 — どちら{line.loop ? '回り' : 'ゆき'}に乗る？
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {directions.map((d) => (
            <button
              key={d.id}
              onClick={() => setDirection(d.id)}
              disabled={isMoving}
              className={`px-1 py-2 border rounded-lg text-center transition-colors disabled:opacity-50 ${
                direction === d.id
                  ? 'border-yellow-300/70 bg-yellow-300/10 text-yellow-300'
                  : 'border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="text-sm font-medium">{d.label}</div>
              <div className="text-[9px] text-slate-400">{d.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 運転操作: 戻る / 再生 / 進む */}
      <div>
        <div className="text-[10px] tracking-[0.2em] text-slate-400 mb-1.5">運転操作</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => void stepBackward()}
            disabled={isMoving || backBlocked}
            className="flex-1 py-3 border border-slate-700 text-slate-200 text-sm font-medium rounded-lg hover:border-slate-500 transition-colors disabled:opacity-50"
          >
            ← 戻る
          </button>
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? '停止' : '再生'}
            className={`shrink-0 w-14 h-14 rounded-full border flex items-center justify-center transition-colors ${
              isPlaying
                ? 'border-lime-400 bg-lime-400 text-slate-950 hover:bg-lime-300'
                : 'border-lime-400/70 bg-lime-400/10 text-lime-300 hover:bg-lime-400 hover:text-slate-950'
            }`}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={() => void stepForward()}
            disabled={isMoving || forwardBlocked}
            className="flex-1 py-3 border border-lime-400/50 bg-lime-400/5 text-lime-300 text-sm font-medium rounded-lg hover:bg-lime-400/15 hover:border-lime-400/80 transition-colors disabled:opacity-50"
          >
            進む →
          </button>
        </div>
      </div>

      {/* ステータス / ヒント */}
      <div className="text-center text-xs py-2 border border-dashed border-slate-700 rounded-lg">
        {dest && remaining != null ? (
          <span className="text-yellow-300">
            {dest.name} まで あと {remaining} 駅
          </span>
        ) : forwardBlocked && !isPlaying ? (
          <span className="text-slate-300">終点です — 方向を変えるか、乗り換えよう</span>
        ) : isPlaying ? (
          <span className="text-lime-300">自動運転中 — 各駅に停車しながら進みます</span>
        ) : (
          <span className="text-slate-400">地図上の駅をタップすると、そこまで移動します</span>
        )}
      </div>
    </div>
  )
}
