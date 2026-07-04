import { RIDEABLE, type RideableLineId } from './rideable'
import type { RideableLine, Station } from './types'

export interface SearchHit {
  lineId: RideableLineId
  line: RideableLine
  index: number // その路線での駅インデックス
  station: Station
}

// 小文字化・空白除去・カタカナ→ひらがな変換（「シブヤ」でも「しぶや」でもヒットさせる）
const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))

// 一致の強さ: 完全一致 2 / 前方一致 1 / 部分一致 0 / 不一致 -1
const matchScore = (field: string, q: string) => {
  const f = normalize(field)
  if (f === q) return 2
  if (f.startsWith(q)) return 1
  if (f.includes(q)) return 0
  return -1
}

// 乗車可能路線の全駅からフリーワード検索（駅名・かな・英名・駅ナンバリングの部分一致）
export function searchStations(query: string): SearchHit[] {
  const q = normalize(query.trim().replace(/駅$/, ''))
  if (!q) return []

  const hits: (SearchHit & { score: number })[] = []
  for (const [lineId, line] of Object.entries(RIDEABLE) as [RideableLineId, RideableLine][]) {
    line.stations.forEach((station, index) => {
      const score = Math.max(
        matchScore(station.name, q),
        matchScore(station.kana, q),
        matchScore(station.en, q),
        matchScore(station.number, q),
      )
      if (score >= 0) hits.push({ lineId, line, index, station, score })
    })
  }
  // 完全一致 → 前方一致 → 部分一致。同スコアは路線定義順（= 走査順）を維持
  return hits.sort((a, b) => b.score - a.score)
}
