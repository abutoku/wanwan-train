import { useGame } from '../store'

export function TitleScreen() {
  const startGame = useGame((s) => s.startGame)

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

      <div className="relative min-h-full flex flex-col items-center justify-center gap-6 px-4 py-10">
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
          className="pixelated w-72 sm:w-96 max-w-full drop-shadow-[0_16px_48px_rgba(163,230,53,0.18)]"
        />

        <p className="text-sm sm:text-base leading-relaxed text-slate-300">
          チワワの「うる」と「ろい」と一緒に、東京の路線をめぐる旅へ。
          <br />
          <span className="text-slate-400">
            どちら行きに乗ればいいか、あと何駅で着くかがひと目でわかる。
          </span>
        </p>

        <button
          onClick={startGame}
          className="group mt-2 inline-flex items-center gap-3 rounded-full border border-lime-400/60 bg-lime-400/10 px-10 py-3.5 text-base sm:text-lg font-medium uppercase tracking-[0.3em] text-lime-300 transition-colors hover:bg-lime-400 hover:text-slate-950"
        >
          Start
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>

        <div className="text-xs tracking-wider text-slate-500">
          NOW RUNNING — JR山手線 / 東京駅発
        </div>
      </div>
    </div>
  )
}
