import { useGame, stopsBetween } from '../store'
import { STATIONS } from '../data/yamanote'
import { YAMANOTE_GREEN } from '../data/lines'

// 地図中央のオーバーレイ表示
export function CenterInfo() {
  const currentIndex = useGame((s) => s.currentIndex)
  const direction = useGame((s) => s.direction)
  const isMoving = useGame((s) => s.isMoving)
  const destinationIndex = useGame((s) => s.destinationIndex)
  const arrivedIndex = useGame((s) => s.arrivedIndex)

  const station = STATIONS[currentIndex]
  const remaining =
    destinationIndex != null ? stopsBetween(currentIndex, destinationIndex, direction) : null

  let status: string
  if (arrivedIndex != null) {
    status = '到着！🐾'
  } else if (isMoving) {
    status = remaining != null && remaining > 0 ? `あと ${remaining} 駅` : `次は ${station.name}`
  } else {
    status = '停車中'
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center w-[42%] max-w-[300px]">
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

        <div className="flex items-center justify-center gap-2 mb-1">
          <span
            className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: YAMANOTE_GREEN, color: '#14330a' }}
          >
            {station.number}
          </span>
          <span className="text-[10px] sm:text-xs tracking-wider text-slate-400">
            {direction === 'outer' ? '外回り ⟳' : '内回り ⟲'}
          </span>
        </div>

        <div className="text-xl sm:text-3xl font-bold text-slate-50 leading-tight">
          {station.name}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
          {station.kana} / {station.en}
        </div>

        <div
          className={`mt-1.5 text-xs sm:text-sm tracking-wider ${arrivedIndex != null ? 'text-yellow-300' : 'text-lime-300'}`}
        >
          {status}
        </div>
      </div>
    </div>
  )
}
