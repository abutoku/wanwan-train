import { useMemo, useState } from 'react'
import { useGame } from '../store'
import { RIDEABLE } from '../data/rideable'
import { searchStations, type SearchHit } from '../data/search'

// 初期のしゅっぱつ駅 = JR山手線 東京
const DEFAULT_START: SearchHit = {
  lineId: 'yamanote',
  line: RIDEABLE.yamanote,
  index: 0,
  station: RIDEABLE.yamanote.stations[0],
}

export function TitleScreen() {
  const startGame = useGame((s) => s.startGame)
  const [selected, setSelected] = useState<SearchHit>(DEFAULT_START)
  const [query, setQuery] = useState('')

  const hits = useMemo(() => searchStations(query), [query])

  const select = (hit: SearchHit) => {
    setSelected(hit)
    setQuery('')
  }

  return (
    <div className="relative h-dvh overflow-y-auto bg-slate-950 text-center">
      {/* 背景グロー */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(620px 440px at 50% 36%, rgba(163,230,53,0.13), transparent 70%), radial-gradient(900px 620px at 50% 115%, rgba(56,189,248,0.08), transparent 70%)',
        }}
      />

      <div className="relative min-h-full flex flex-col items-center justify-center gap-5 px-4 py-10">
        <div className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-slate-400">
          Tokyo Transit Journey
        </div>

        <h1 className="text-6xl sm:text-8xl font-bold leading-[0.95] tracking-tight text-slate-50">
          WAN WAN
          <br />
          <span className="text-lime-400">TRAIN</span>
        </h1>

        <img
          src="/images/wanwan.png"
          alt="チワワのうるとろい"
          className="pixelated w-60 sm:w-80 max-w-full drop-shadow-[0_16px_48px_rgba(163,230,53,0.18)]"
        />

        <p className="text-sm sm:text-base leading-relaxed text-slate-300">
          チワワの「うる」と「ろい」と一緒に、東京の路線をめぐる旅へ。
          <br />
          <span className="text-slate-400">
            どちら行きに乗ればいいか、あと何駅で着くかがひと目でわかる。
          </span>
        </p>

        {/* しゅっぱつ駅の選択 */}
        <div className="panel w-full max-w-md p-4 text-left">
          <div className="text-[10px] tracking-[0.2em] text-slate-400 mb-2">しゅっぱつ駅</div>
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0"
              style={{ background: selected.line.color, color: selected.line.textColor }}
            >
              {selected.station.number} {selected.line.name}
            </span>
            <span className="text-lg font-bold text-slate-50 leading-none truncate">
              {selected.station.name}
              <span className="text-xs font-normal text-slate-400 ml-2">
                {selected.station.kana}
              </span>
            </span>
          </div>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="駅名でけんさく（例: 渋谷 / しぶや / shibuya）"
            aria-label="スタート駅を検索"
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-lime-400/60"
          />

          {query.trim() !== '' && (
            <div className="mt-2">
              {hits.length > 0 ? (
                <ul className="max-h-56 overflow-y-auto space-y-1.5 pr-0.5">
                  {hits.map((hit) => (
                    <li key={`${hit.lineId}-${hit.station.id}`}>
                      <button
                        type="button"
                        onClick={() => select(hit)}
                        className="w-full min-h-11 flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/60 rounded-lg px-3 py-2 text-left hover:bg-slate-700/60 hover:border-slate-500 active:bg-slate-700 transition-colors"
                      >
                        <span
                          className="w-2 h-6 shrink-0 rounded-full"
                          style={{ background: hit.line.color }}
                        />
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm text-slate-100 truncate">
                            {hit.station.name}
                            <span className="text-[10px] text-slate-400 ml-1.5">
                              {hit.station.kana}
                            </span>
                          </span>
                          <span className="block text-[10px] text-slate-400">{hit.line.name}</span>
                        </span>
                        <span
                          className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: hit.line.color, color: hit.line.textColor }}
                        >
                          {hit.station.number}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-slate-400 bg-slate-800/60 rounded-lg px-3 py-2.5">
                  みつかりませんでした（乗車できる5路線の駅から探せます）
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => startGame({ lineId: selected.lineId, index: selected.index })}
          className="group mt-1 inline-flex items-center gap-3 rounded-full border border-lime-400/60 bg-lime-400/10 px-10 py-3.5 text-base sm:text-lg font-medium uppercase tracking-[0.3em] text-lime-300 transition-colors hover:bg-lime-400 hover:text-slate-950"
        >
          Start
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>

        <div className="text-xs tracking-wider text-slate-500">
          NOW RUNNING — JR山手線・JR中央線(快速)・銀座線・丸ノ内線・日比谷線・東急東横線
        </div>
      </div>
    </div>
  )
}
