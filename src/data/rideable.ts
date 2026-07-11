import type { DirLabel, RideableLine, ServiceType, Station, Transfer } from './types'
import { YAMANOTE_LINE } from './yamanote'
import { CHUO_LINE } from './chuo'
import { GINZA_LINE } from './ginza'
import { MARUNOUCHI_LINE } from './marunouchi'
import { HIBIYA_LINE } from './hibiya'
import { TOYOKO_LINE } from './toyoko'
import { HANZOMON_LINE } from './hanzomon'
import { FUKUTOSHIN_LINE } from './fukutoshin'
import { OEDO_LINE } from './oedo'
import { ASAKUSA_LINE } from './asakusa'
import { DENENTOSHI_LINE } from './denentoshi'
import { MINATOMIRAI_LINE } from './minatomirai'
import { RINKAI_LINE } from './rinkai'
import { KEIKYU_LINE } from './keikyu'
import { SHONAN_SHINJUKU_LINE } from './shonanShinjuku'
import { YOKOSUKA_LINE } from './yokosuka'
import { KEIHIN_TOHOKU_LINE } from './keihinTohoku'
import { BLUE_LINE } from './blueLine'
import { SOTETSU_LINE } from './sotetsu'
import { SOBU_LOCAL_LINE } from './sobuLocal'
import { KEIKYU_AIRPORT_LINE } from './keikyuAirport'
import { SAIKYO_LINE } from './saikyo'
import { TOEI_SHINJUKU_LINE } from './toeiShinjuku'
import { YURAKUCHO_LINE } from './yurakucho'

// 乗車可能路線のレジストリ。キーは lines.ts の LineId と共通
export const RIDEABLE = {
  yamanote: YAMANOTE_LINE,
  chuoRapid: CHUO_LINE,
  ginza: GINZA_LINE,
  marunouchi: MARUNOUCHI_LINE,
  hibiya: HIBIYA_LINE,
  toyoko: TOYOKO_LINE,
  hanzomon: HANZOMON_LINE,
  fukutoshin: FUKUTOSHIN_LINE,
  oedo: OEDO_LINE,
  asakusa: ASAKUSA_LINE,
  denentoshi: DENENTOSHI_LINE,
  minatomirai: MINATOMIRAI_LINE,
  rinkai: RINKAI_LINE,
  keikyu: KEIKYU_LINE,
  shonanShinjuku: SHONAN_SHINJUKU_LINE,
  yokosukaSobu: YOKOSUKA_LINE, // JR横須賀線（LineId は乗換マスタと共通の yokosukaSobu）
  keihinTohoku: KEIHIN_TOHOKU_LINE,
  sobuLocal: SOBU_LOCAL_LINE,
  saikyo: SAIKYO_LINE,
  yurakuchoLine: YURAKUCHO_LINE,
  toeiShinjuku: TOEI_SHINJUKU_LINE,
  keikyuAirport: KEIKYU_AIRPORT_LINE,
  blueLine: BLUE_LINE,
  sotetsu: SOTETSU_LINE,
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
