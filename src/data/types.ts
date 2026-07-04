import type { LineId } from './lines'

export interface Transfer {
  line: LineId
  at?: string // 別名駅での乗り換え（例: 日比谷駅）
}

export interface Station {
  id: string
  name: string
  kana: string
  en: string
  number: string // 駅ナンバリング（例: JY01, G09）
  transfers: Transfer[]
}

export interface DirLabel {
  label: string // 例: 外回り ⟳ / 浅草方面
  sub: string // 例: 時計回り / → G19
}

// 乗車可能路線
// stations は loop: 外回り（時計回り）順 / linear: 駅番号昇順 で保持する。
// インデックス +1 = fwd 方向に1駅進む
export interface RideableLine {
  name: string
  symbol: string // 駅ナンバリング記号（例: JY, G）
  color: string
  textColor: string // ラインカラー上の文字色
  loop: boolean
  stations: Station[]
  directions?: { fwd: DirLabel; rev: DirLabel } // 環状線用（直線路線は終点名から自動生成）
}
