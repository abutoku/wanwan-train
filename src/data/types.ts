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

// 列車種別（快速・特快・急行など）。停車駅ビュー用の表示データ
export interface ServiceType {
  id: string
  name: string // 例: 中央特快
  color: string // 種別カラー（駅掲示等で流通している近似値）
  textColor: string
  note?: string // 例: 平日朝・東京方面のみ運転
  stops: 'all' | string[] // 'all' = 全駅停車 / 停車駅の station id リスト
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
  services?: ServiceType[] // 列車種別。先頭 = 全駅停車の基本種別。未定義 = 種別なし
}
