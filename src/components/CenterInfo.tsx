import { useGame, stopsBetween } from '../store'
import { RIDEABLE, directionLabels } from '../data/rideable'

// 地図上のオーバーレイ表示（環状: 中央 / 直線: 上部に空けたスペース）
export function CenterInfo() {
  const lineId = useGame((s) => s.lineId)
  const currentIndex = useGame((s) => s.currentIndex)
  const direction = useGame((s) => s.direction)
  const isMoving = useGame((s) => s.isMoving)
  const destinationIndex = useGame((s) => s.destinationIndex)
  const arrivedIndex = useGame((s) => s.arrivedIndex)
  const transferFlash = useGame((s) => s.transferFlash)

  const line = RIDEABLE[lineId]
  const station = line.stations[currentIndex]
  const dirLabel = directionLabels(line)[direction].label
  const remaining =
    destinationIndex != null
      ? stopsBetween(currentIndex, destinationIndex, direction, line)
      : null

  let status: string
  if (transferFlash) {
    status = 'のりかえたよ！🐾'
  } else if (arrivedIndex != null) {
    status = '到着！🐾'
  } else if (isMoving) {
    status = remaining != null && remaining > 0 ? `あと ${remaining} 駅` : `次は ${station.name}`
  } else {
    status = '停車中'
  }

  return (
    <div
      className={`absolute inset-0 flex justify-center pointer-events-none ${
        line.loop ? 'items-center' : 'items-start pt-[2%]'
      }`}
    >
      <div className="text-center w-[42%] max-w-[300px]">
        {line.loop && (
          <div className="flex justify-center gap-1.5 mb-1.5">
            <img
              src="/images/uru.png"
              alt="うる"
              className={`pixelated w-10 sm:w-14 ${isMoving ? 'bob' : ''}`}
            />
            <img
              src="/images/roi.png"
              alt="ろい"
              className={`pixelated w-10 sm:w-14 ${isMoving ? 'bob' : ''}`}
              style={{ animationDelay: '0.45s' }}
            />
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mb-1">
          <span
            className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: line.color, color: line.textColor }}
          >
            {station.number}
          </span>
          <span className="text-[10px] sm:text-xs tracking-wider text-slate-400">{dirLabel}</span>
        </div>

        <div className="text-xl sm:text-3xl font-bold text-slate-50 leading-tight">
          {station.name}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
          {station.kana} / {station.en}
        </div>

        <div
          className={`mt-1.5 text-xs sm:text-sm tracking-wider ${
            arrivedIndex != null || transferFlash ? 'text-yellow-300' : 'text-lime-300'
          }`}
        >
          {status}
        </div>
      </div>
    </div>
  )
}
