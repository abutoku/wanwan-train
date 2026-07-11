import type { RideableLine, Station } from './types'

// JR埼京線 — 駅番号昇順（大崎 JA08 → 大宮 JA26）
const STATIONS: Station[] = [
  {
    id: 'ja-osaki', name: '大崎', kana: 'おおさき', en: 'Osaki', number: 'JA08',
    transfers: [{ line: 'yamanote' }, { line: 'shonanShinjuku' }, { line: 'rinkai' }],
  },
  {
    id: 'ja-ebisu', name: '恵比寿', kana: 'えびす', en: 'Ebisu', number: 'JA09',
    transfers: [{ line: 'yamanote' }, { line: 'hibiya' }],
  },
  {
    id: 'ja-shibuya', name: '渋谷', kana: 'しぶや', en: 'Shibuya', number: 'JA10',
    transfers: [
      { line: 'yamanote' }, { line: 'shonanShinjuku' }, { line: 'ginza' },
      { line: 'hanzomon' }, { line: 'fukutoshin' }, { line: 'toyoko' },
      { line: 'denentoshi' }, { line: 'inokashira' },
    ],
  },
  {
    id: 'ja-shinjuku', name: '新宿', kana: 'しんじゅく', en: 'Shinjuku', number: 'JA11',
    transfers: [
      { line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'sobuLocal' },
      { line: 'shonanShinjuku' }, { line: 'marunouchi' }, { line: 'toeiShinjuku' },
      { line: 'oedo' }, { line: 'keio' }, { line: 'odakyu' },
    ],
  },
  {
    id: 'ja-ikebukuro', name: '池袋', kana: 'いけぶくろ', en: 'Ikebukuro', number: 'JA12',
    transfers: [
      { line: 'yamanote' }, { line: 'shonanShinjuku' }, { line: 'marunouchi' },
      { line: 'yurakuchoLine' }, { line: 'fukutoshin' }, { line: 'tobuTojo' },
      { line: 'seibuIkebukuro' },
    ],
  },
  {
    id: 'ja-itabashi', name: '板橋', kana: 'いたばし', en: 'Itabashi', number: 'JA13',
    transfers: [],
  },
  {
    id: 'ja-jujo', name: '十条', kana: 'じゅうじょう', en: 'Jujo', number: 'JA14',
    transfers: [],
  },
  {
    id: 'ja-akabane', name: '赤羽', kana: 'あかばね', en: 'Akabane', number: 'JA15',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'utsunomiyaTakasaki' }, { line: 'shonanShinjuku' },
    ],
  },
  {
    id: 'ja-kita-akabane', name: '北赤羽', kana: 'きたあかばね', en: 'Kita-Akabane', number: 'JA16',
    transfers: [],
  },
  {
    id: 'ja-ukima-funado', name: '浮間舟渡', kana: 'うきまふなど', en: 'Ukima-Funado', number: 'JA17',
    transfers: [],
  },
  {
    id: 'ja-toda-koen', name: '戸田公園', kana: 'とだこうえん', en: 'Toda-Koen', number: 'JA18',
    transfers: [],
  },
  {
    id: 'ja-toda', name: '戸田', kana: 'とだ', en: 'Toda', number: 'JA19',
    transfers: [],
  },
  {
    id: 'ja-kita-toda', name: '北戸田', kana: 'きたとだ', en: 'Kita-Toda', number: 'JA20',
    transfers: [],
  },
  {
    id: 'ja-musashi-urawa', name: '武蔵浦和', kana: 'むさしうらわ', en: 'Musashi-Urawa', number: 'JA21',
    transfers: [{ line: 'musashino' }],
  },
  {
    id: 'ja-naka-urawa', name: '中浦和', kana: 'なかうらわ', en: 'Naka-Urawa', number: 'JA22',
    transfers: [],
  },
  {
    id: 'ja-minami-yono', name: '南与野', kana: 'みなみよの', en: 'Minami-Yono', number: 'JA23',
    transfers: [],
  },
  {
    id: 'ja-yonohonmachi', name: '与野本町', kana: 'よのほんまち', en: 'Yonohommachi', number: 'JA24',
    transfers: [],
  },
  {
    id: 'ja-kita-yono', name: '北与野', kana: 'きたよの', en: 'Kita-Yono', number: 'JA25',
    transfers: [],
  },
  {
    id: 'ja-omiya', name: '大宮', kana: 'おおみや', en: 'Omiya', number: 'JA26',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'utsunomiyaTakasaki' }, { line: 'shonanShinjuku' },
      { line: 'tohokuShinkansen' }, { line: 'tobuUrbanPark' }, { line: 'newShuttle' },
    ],
  },
]

// 快速の停車駅（池袋〜赤羽間で板橋・十条を通過。赤羽以北は各駅にとまる）
const RAPID_STOPS = STATIONS.filter(
  (s) => !['ja-itabashi', 'ja-jujo'].includes(s.id),
).map((s) => s.id)

export const SAIKYO_LINE: RideableLine = {
  name: 'JR埼京線',
  symbol: 'JA',
  color: '#00AC84',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'saikyo-local', name: '各駅停車', color: '#00AC84', textColor: '#ffffff',
      stops: 'all',
    },
    {
      id: 'saikyo-rapid', name: '快速', color: '#00AC84', textColor: '#ffffff',
      note: '板橋・十条は通過します',
      stops: RAPID_STOPS,
    },
  ],
}
