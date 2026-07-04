import { useEffect } from 'react'
import { useGame, AUTO_DWELL_MS } from '../store'
import { RIDEABLE } from '../data/rideable'
import { LoopMap } from './LoopMap'
import { LinearMap } from './LinearMap'
import { CenterInfo } from './CenterInfo'
import { InfoPanel } from './InfoPanel'
import { Controls } from './Controls'

export function GameScreen() {
  const isPlaying = useGame((s) => s.isPlaying)
  const isMoving = useGame((s) => s.isMoving)
  const currentIndex = useGame((s) => s.currentIndex)
  const lineId = useGame((s) => s.lineId)
  const stepForward = useGame((s) => s.stepForward)
  const backToTitle = useGame((s) => s.backToTitle)

  const line = RIDEABLE[lineId]

  // 再生中: 停車したら AUTO_DWELL_MS 待って次の駅へ（直線路線の終点では自動停止）
  useEffect(() => {
    if (!isPlaying || isMoving) return
    const t = setTimeout(() => void stepForward(), AUTO_DWELL_MS)
    return () => clearTimeout(t)
  }, [isPlaying, isMoving, currentIndex, lineId, stepForward])

  return (
    <div className="h-dvh flex flex-col bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-950/80 backdrop-blur border-b border-slate-800 shrink-0">
        <button
          onClick={backToTitle}
          className="shrink-0 text-[11px] text-slate-400 border border-slate-700 rounded-full px-3 py-1 hover:border-slate-500 hover:text-slate-200 transition-colors"
        >
          ← タイトル
        </button>
        <div className="flex items-center gap-2.5 min-w-0">
          <img src="/images/uru.png" alt="" className="pixelated w-6 sm:w-7 hidden sm:block" />
          <h1 className="text-sm sm:text-lg font-bold uppercase tracking-[0.12em] sm:tracking-[0.25em] text-slate-50 truncate">
            Wan Wan <span className="text-lime-400">Train</span>
          </h1>
          <img src="/images/roi.png" alt="" className="pixelated w-6 sm:w-7 hidden sm:block" />
        </div>
        <span
          className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
          style={{ background: line.color, color: line.textColor }}
        >
          {line.symbol} {line.name}
        </span>
      </header>

      <main className="flex-1 min-h-0 flex flex-col lg:flex-row">
        <section className="relative flex-1 min-h-0">
          {line.loop ? <LoopMap key={lineId} /> : <LinearMap key={lineId} />}
          <CenterInfo />
        </section>

        <aside className="shrink-0 max-h-[45dvh] lg:max-h-none lg:w-[380px] xl:w-[420px] overflow-y-auto border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/60 p-3 space-y-3">
          <Controls />
          <InfoPanel />
        </aside>
      </main>
    </div>
  )
}
