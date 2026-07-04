// 乗り換え路線マスタ
// color はラインカラー。東京メトロ・都営は公式値、その他は一般に流通している近似値。
export interface Line {
  name: string
  color: string
}

export const YAMANOTE_GREEN = '#9ACD32'

export const LINES = {
  yamanote: { name: 'JR山手線', color: '#9ACD32' },
  chuoRapid: { name: 'JR中央線(快速)', color: '#F15A22' },
  sobuLocal: { name: 'JR中央・総武線(各停)', color: '#FFD400' },
  keihinTohoku: { name: 'JR京浜東北線', color: '#00B2E5' },
  tokaido: { name: 'JR東海道線', color: '#F68B1E' },
  uenoTokyo: { name: 'JR上野東京ライン', color: '#F68B1E' },
  utsunomiyaTakasaki: { name: 'JR宇都宮線・高崎線', color: '#F68B1E' },
  yokosukaSobu: { name: 'JR横須賀・総武快速線', color: '#0067C0' },
  joban: { name: 'JR常磐線', color: '#00B261' },
  keiyo: { name: 'JR京葉線', color: '#C9242F' },
  saikyo: { name: 'JR埼京線', color: '#00AC84' },
  shonanShinjuku: { name: 'JR湘南新宿ライン', color: '#E21F26' },
  tokaidoShinkansen: { name: '東海道新幹線', color: '#1153A2' },
  tohokuShinkansen: { name: '東北・上越・北陸新幹線など', color: '#008B4B' },
  ginza: { name: '東京メトロ銀座線', color: '#FF9500' },
  marunouchi: { name: '東京メトロ丸ノ内線', color: '#F62E36' },
  hibiya: { name: '東京メトロ日比谷線', color: '#B5B5AC' },
  tozai: { name: '東京メトロ東西線', color: '#009BBF' },
  chiyoda: { name: '東京メトロ千代田線', color: '#00BB85' },
  yurakuchoLine: { name: '東京メトロ有楽町線', color: '#C1A470' },
  hanzomon: { name: '東京メトロ半蔵門線', color: '#8F76D6' },
  namboku: { name: '東京メトロ南北線', color: '#00AC9B' },
  fukutoshin: { name: '東京メトロ副都心線', color: '#9C5E31' },
  asakusa: { name: '都営浅草線', color: '#EC6E65' },
  mita: { name: '都営三田線', color: '#006AB8' },
  toeiShinjuku: { name: '都営新宿線', color: '#B0BF1E' },
  oedo: { name: '都営大江戸線', color: '#CE045B' },
  keikyu: { name: '京急本線', color: '#E60012' },
  keisei: { name: '京成本線', color: '#005AAB' },
  keio: { name: '京王線', color: '#DD0077' },
  inokashira: { name: '京王井の頭線', color: '#1E50A2' },
  odakyu: { name: '小田急線', color: '#0F7DC2' },
  toyoko: { name: '東急東横線', color: '#DA0442' },
  denentoshi: { name: '東急田園都市線', color: '#00A040' },
  tokyuMeguro: { name: '東急目黒線', color: '#0090D8' },
  ikegami: { name: '東急池上線', color: '#ED86A0' },
  tobuTojo: { name: '東武東上線', color: '#0067C0' },
  seibuIkebukuro: { name: '西武池袋線', color: '#EF7A00' },
  seibuShinjuku: { name: '西武新宿線', color: '#00A7E3' },
  rinkai: { name: 'りんかい線', color: '#00418E' },
  yurikamome: { name: 'ゆりかもめ', color: '#00A3D9' },
  monorail: { name: '東京モノレール', color: '#E8380D' },
  toden: { name: '都電荒川線', color: '#EF5A9D' },
  nipporiToneri: { name: '日暮里・舎人ライナー', color: '#D5007F' },
  tx: { name: 'つくばエクスプレス', color: '#1D2088' },
  tobuSkytree: { name: '東武スカイツリーライン', color: '#005AAB' },
  oimachi: { name: '東急大井町線', color: '#F18D00' },
  tokyuTamagawa: { name: '東急多摩川線', color: '#AE0378' },
  minatomirai: { name: 'みなとみらい線', color: '#003687' },
  sotetsu: { name: '相鉄本線', color: '#003D8F' },
  oume: { name: 'JR青梅線', color: '#F15A22' },
  keioTakao: { name: '京王高尾線', color: '#DD0077' },
  yokohamaLine: { name: 'JR横浜線', color: '#9ACD32' },
  nambu: { name: 'JR南武線', color: '#FFD400' },
  blueLine: { name: '横浜市営地下鉄ブルーライン', color: '#006CB6' },
  greenLine: { name: '横浜市営地下鉄グリーンライン', color: '#00A650' },
} as const satisfies Record<string, Line>

export type LineId = keyof typeof LINES
