import { useGame } from '../store'
import { RIDEABLE, serviceStopsAt } from '../data/rideable'

// 停車駅ビュー: 種別（快速・特快・急行など）を選ぶと、地図上で停車駅／通過駅がわかる。
// 種別データのない路線（全列車各駅停車）では表示しない
export function ServicePicker() {
  const lineId = useGame((s) => s.lineId)
  const serviceId = useGame((s) => s.serviceId)
  const setService = useGame((s) => s.setService)

  const line = RIDEABLE[lineId]
  if (!line.services) return null

  const selected = line.services.find((sv) => sv.id === serviceId) ?? line.services[0]
  const stopCount =
    selected.stops === 'all'
      ? line.stations.length
      : line.stations.filter((s) => serviceStopsAt(selected, s.id)).length
  const passCount = line.stations.length - stopCount

  return (
    <div className="panel p-3.5 space-y-2.5">
      <div className="text-[10px] tracking-[0.2em] text-slate-400">
        停車駅ビュー — とまる駅をしらべる
      </div>

      <div className="flex flex-wrap gap-1.5">
        {line.services.map((sv) => {
          const active = sv.id === selected.id
          return (
            <button
              key={sv.id}
              type="button"
              onClick={() => setService(sv.id)}
              className={`flex items-center gap-1.5 text-xs font-medium rounded-full border px-2.5 py-1.5 transition-colors ${
                active
                  ? 'border-slate-300/80 bg-slate-100/10 text-slate-50'
                  : 'border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: sv.color }}
              />
              {sv.name}
            </button>
          )
        })}
      </div>

      <div className="text-[11px] text-slate-400 leading-relaxed">
        {passCount > 0 ? (
          <>
            <span className="font-bold" style={{ color: selected.color }}>
              {selected.name}
            </span>
            <span className="text-slate-200"> は 停車 {stopCount} 駅 ／ 通過 {passCount} 駅</span>
            <span className="block">通過する駅は地図でうすく表示されます</span>
          </>
        ) : (
          <span>
            <span className="font-bold text-slate-200">{selected.name}</span> は全部の駅にとまります
          </span>
        )}
        {selected.note && <span className="block text-amber-300/90">※ {selected.note}</span>}
      </div>
    </div>
  )
}
