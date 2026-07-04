import { useGame, directionDelta } from '../store'
import { N, STATIONS } from '../data/yamanote'
import { LINES, YAMANOTE_GREEN } from '../data/lines'

export function InfoPanel() {
  const currentIndex = useGame((s) => s.currentIndex)
  const direction = useGame((s) => s.direction)
  const isMoving = useGame((s) => s.isMoving)

  const station = STATIONS[currentIndex]
  const next = STATIONS[(currentIndex + directionDelta(direction) + N) % N]

  return (
    <div className="space-y-3">
      {/* 現在の駅 + 乗り換え案内 */}
      <div className="panel p-3.5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="text-[10px] tracking-[0.2em] text-slate-400">
            {isMoving ? 'まもなく' : '現在の駅'}
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: YAMANOTE_GREEN, color: '#14330a' }}
          >
            {station.number}
          </span>
        </div>
        <div className="text-lg font-bold text-slate-50 leading-none mb-2.5">
          {station.name}
          <span className="text-xs font-normal text-slate-400 ml-2">{station.kana}</span>
        </div>

        <div className="text-[10px] tracking-[0.2em] text-slate-400 mb-1.5">乗り換え案内</div>
        {station.transfers.length > 0 ? (
          <ul className="space-y-1.5">
            {station.transfers.map((t) => {
              const line = LINES[t.line]
              return (
                <li key={`${t.line}-${t.at ?? ''}`}>
                  {/* 第2フェーズでタップ乗り換え予定のためボタンで実装 */}
                  <button
                    type="button"
                    className="w-full min-h-11 flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/60 rounded-lg px-3 py-2 text-left hover:bg-slate-700/60 hover:border-slate-500 active:bg-slate-700 transition-colors"
                  >
                    <span
                      className="w-2 h-6 shrink-0 rounded-full"
                      style={{ background: line.color }}
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm text-slate-100">{line.name}</span>
                      {t.at && (
                        <span className="block text-[10px] text-slate-400">{t.at} で乗り換え</span>
                      )}
                    </span>
                    <span className="shrink-0 text-slate-500 text-xs">›</span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="text-xs text-slate-400 bg-slate-800/60 rounded-lg px-3 py-2.5">
            乗り換え路線はありません
          </div>
        )}
      </div>

      {/* 次の駅 */}
      <div className="panel p-3.5 flex items-center justify-between gap-2">
        <div>
          <div className="text-[10px] tracking-[0.2em] text-slate-400 mb-1">
            次の駅（{direction === 'outer' ? '外回り ⟳' : '内回り ⟲'}）
          </div>
          <div className="text-base font-bold text-slate-50">
            {next.name}
            <span className="text-xs font-normal text-slate-400 ml-2">{next.kana}</span>
          </div>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
          style={{ background: YAMANOTE_GREEN, color: '#14330a' }}
        >
          {next.number}
        </span>
      </div>
    </div>
  )
}
