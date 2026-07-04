import type { DirLabel, RideableLine, ServiceType, Station, Transfer } from './types'
import { YAMANOTE_LINE } from './yamanote'
import { CHUO_LINE } from './chuo'
import { GINZA_LINE } from './ginza'
import { MARUNOUCHI_LINE } from './marunouchi'
import { HIBIYA_LINE } from './hibiya'
import { TOYOKO_LINE } from './toyoko'

// 乗車可能路線のレジストリ。キーは lines.ts の LineId と共通
export const RIDEABLE = {
  yamanote: YAMANOTE_LINE,
  chuoRapid: CHUO_LINE,
  ginza: GINZA_LINE,
  marunouchi: MARUNOUCHI_LINE,
  hibiya: HIBIYA_LINE,
  toyoko: TOYOKO_LINE,
} as const satisfies Record<string, RideableLine>

export type RideableLineId = keyof typeof RIDEABLE

export const isRideable = (id: string): id is RideableLineId => id in RIDEABLE

export interface TransferTarget {
  lineId: RideableLineId
  index: number // 乗換先路線での駅インデックス
}

// 乗換チップから乗換先の路線・駅を解決する。
// 別名駅乗換（at）は「駅」サフィックスを除いた駅名で、それ以外は現在駅名でマッチング。
// 乗車可能路線でない・駅が見つからない場合は null（= 案内のみのチップ）
export function resolveTransfer(t: Transfer, from: Station): TransferTarget | null {
  if (!isRideable(t.line)) return null
  const name = t.at ? t.at.replace(/駅$/, '') : from.name
  const index = RIDEABLE[t.line].stations.findIndex((s) => s.name === name)
  return index >= 0 ? { lineId: t.line, index } : null
}

// 種別 sv がその駅にとまるか
export const serviceStopsAt = (sv: ServiceType, stationId: string) =>
  sv.stops === 'all' || sv.stops.includes(stationId)

// 路線の基本種別（= 全駅停車。services 先頭）。種別のない路線は null
export const baseServiceId = (line: RideableLine) => line.services?.[0]?.id ?? null

// 方向ラベル。環状線は路線データの定義を使い、直線路線は終点駅名から生成する
export function directionLabels(line: RideableLine): { fwd: DirLabel; rev: DirLabel } {
  if (line.directions) return line.directions
  const first = line.stations[0]
  const last = line.stations[line.stations.length - 1]
  return {
    fwd: { label: `${last.name}方面`, sub: `→ ${last.number}` },
    rev: { label: `${first.name}方面`, sub: `→ ${first.number}` },
  }
}
