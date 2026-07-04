import { useGame, directionDelta, atTerminus } from '../store'
import { RIDEABLE, resolveTransfer } from '../data/rideable'
import { LINES } from '../data/lines'

export function InfoPanel() {
  const lineId = useGame((s) => s.lineId)
  const currentIndex = useGame((s) => s.currentIndex)
  const direction = useGame((s) => s.direction)
  const isMoving = useGame((s) => s.isMoving)
  const transferTo = useGame((s) => s.transferTo)

  const line = RIDEABLE[lineId]
  const n = line.stations.length
  const station = line.stations[currentIndex]
  const isEnd = atTerminus(currentIndex, direction, line)
  const next = isEnd ? null : line.stations[(currentIndex + directionDelta(direction) + n) % n]

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
            style={{ background: line.color, color: line.textColor }}
          >
            {station.number}
          </span>
        </div>
        <div className="text-lg font-bold text-slate-50 leading-none mb-2.5">
          {station.name}
          <span className="text-xs font-normal text-slate-400 ml-2">{station.kana}</span>
        </div>

        <div className="text-[10px] tracking-[0.2em] text-slate-400 mb-1.5">
          乗り換え案内 — タップで乗り換え
        </div>
        {station.transfers.length > 0 ? (
          <ul className="space-y-1.5">
            {station.transfers.map((t) => {
              const transferLine = LINES[t.line]
              const target = resolveTransfer(t, station)
              const rideable = target != null

              const chip = (
                <>
                  <span
                    className="w-2 h-6 shrink-0 rounded-full"
                    style={{ background: transferLine.color }}
                  />
                  <span className="flex-1 min-w-0">
                    <span className={`block text-sm ${rideable ? 'text-slate-100' : 'text-slate-300'}`}>
                      {transferLine.name}
                    </span>
                    {t.at && (
                      <span className="block text-[10px] text-slate-400">{t.at} で乗り換え</span>
                    )}
                  </span>
                </>
              )

              return (
                <li key={`${t.line}-${t.at ?? ''}`}>
                  {rideable ? (
                    <button
                      type="button"
                      onClick={() => transferTo(target.lineId, target.index)}
                      disabled={isMoving}
                      className="w-full min-h-11 flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/60 rounded-lg px-3 py-2 text-left hover:bg-slate-700/60 hover:border-slate-500 active:bg-slate-700 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {chip}
                      <span className="shrink-0 text-[10px] font-bold text-lime-300 border border-lime-400/40 bg-lime-400/10 rounded-full px-2 py-0.5">
                        のりかえ →
                      </span>
                    </button>
                  ) : (
                    <div className="w-full min-h-11 flex items-center gap-2.5 bg-slate-800/40 border border-slate-800 rounded-lg px-3 py-2 text-left">
                      {chip}
                      <span className="shrink-0 text-[10px] text-slate-500">案内のみ</span>
                    </div>
                  )}
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
          <div className="text-[10px] tracking-[0.2em] text-slate-400 mb-1">次の駅</div>
          {next ? (
            <div className="text-base font-bold text-slate-50">
              {next.name}
              <span className="text-xs font-normal text-slate-400 ml-2">{next.kana}</span>
            </div>
          ) : (
            <div className="text-base font-bold text-slate-300">
              終点です
              <span className="text-xs font-normal text-slate-400 ml-2">方向を変えてしゅっぱつ！</span>
            </div>
          )}
        </div>
        {next && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
            style={{ background: line.color, color: line.textColor }}
          >
            {next.number}
          </span>
        )}
      </div>
    </div>
  )
}
