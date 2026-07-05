import type { RideableLine, Station } from './types'

// 東京メトロ日比谷線 — 駅番号昇順（中目黒 H01 → 北千住 H22）
const STATIONS: Station[] = [
  {
    id: 'h-naka-meguro', name: '中目黒', kana: 'なかめぐろ', en: 'Naka-meguro', number: 'H01',
    transfers: [{ line: 'toyoko' }],
  },
  {
    id: 'h-ebisu', name: '恵比寿', kana: 'えびす', en: 'Ebisu', number: 'H02',
    transfers: [{ line: 'yamanote' }, { line: 'saikyo' }, { line: 'shonanShinjuku' }],
  },
  {
    id: 'h-hiro-o', name: '広尾', kana: 'ひろお', en: 'Hiro-o', number: 'H03',
    transfers: [],
  },
  {
    id: 'h-roppongi', name: '六本木', kana: 'ろっぽんぎ', en: 'Roppongi', number: 'H04',
    transfers: [{ line: 'oedo' }],
  },
  {
    id: 'h-kamiyacho', name: '神谷町', kana: 'かみやちょう', en: 'Kamiyacho', number: 'H05',
    transfers: [],
  },
  {
    id: 'h-toranomon-hills', name: '虎ノ門ヒルズ', kana: 'とらのもんヒルズ', en: 'Toranomon Hills', number: 'H06',
    transfers: [{ line: 'ginza', at: '虎ノ門駅' }],
  },
  {
    id: 'h-kasumigaseki', name: '霞ケ関', kana: 'かすみがせき', en: 'Kasumigaseki', number: 'H07',
    transfers: [{ line: 'marunouchi' }, { line: 'chiyoda' }],
  },
  {
    id: 'h-hibiya', name: '日比谷', kana: 'ひびや', en: 'Hibiya', number: 'H08',
    transfers: [
      { line: 'chiyoda' }, { line: 'mita' },
      { line: 'yamanote', at: '有楽町駅' }, { line: 'keihinTohoku', at: '有楽町駅' },
      { line: 'yurakuchoLine', at: '有楽町駅' },
    ],
  },
  {
    id: 'h-ginza', name: '銀座', kana: 'ぎんざ', en: 'Ginza', number: 'H09',
    transfers: [{ line: 'ginza' }, { line: 'marunouchi' }],
  },
  {
    id: 'h-higashi-ginza', name: '東銀座', kana: 'ひがしぎんざ', en: 'Higashi-ginza', number: 'H10',
    transfers: [{ line: 'asakusa' }],
  },
  {
    id: 'h-tsukiji', name: '築地', kana: 'つきじ', en: 'Tsukiji', number: 'H11',
    transfers: [{ line: 'yurakuchoLine', at: '新富町駅' }, { line: 'oedo', at: '築地市場駅' }],
  },
  {
    id: 'h-hatchobori', name: '八丁堀', kana: 'はっちょうぼり', en: 'Hatchobori', number: 'H12',
    transfers: [{ line: 'keiyo' }],
  },
  {
    id: 'h-kayabacho', name: '茅場町', kana: 'かやばちょう', en: 'Kayabacho', number: 'H13',
    transfers: [{ line: 'tozai' }],
  },
  {
    id: 'h-ningyocho', name: '人形町', kana: 'にんぎょうちょう', en: 'Ningyocho', number: 'H14',
    transfers: [{ line: 'asakusa' }, { line: 'hanzomon', at: '水天宮前駅' }],
  },
  {
    id: 'h-kodemmacho', name: '小伝馬町', kana: 'こでんまちょう', en: 'Kodemmacho', number: 'H15',
    transfers: [],
  },
  {
    id: 'h-akihabara', name: '秋葉原', kana: 'あきはばら', en: 'Akihabara', number: 'H16',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'sobuLocal' }, { line: 'tx' },
    ],
  },
  {
    id: 'h-naka-okachimachi', name: '仲御徒町', kana: 'なかおかちまち', en: 'Naka-okachimachi', number: 'H17',
    transfers: [
      { line: 'yamanote', at: '御徒町駅' }, { line: 'keihinTohoku', at: '御徒町駅' },
      { line: 'ginza', at: '上野広小路駅' }, { line: 'oedo', at: '上野御徒町駅' },
    ],
  },
  {
    id: 'h-ueno', name: '上野', kana: 'うえの', en: 'Ueno', number: 'H18',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'utsunomiyaTakasaki' },
      { line: 'joban' }, { line: 'uenoTokyo' }, { line: 'tohokuShinkansen' },
      { line: 'ginza' }, { line: 'keisei', at: '京成上野駅' },
    ],
  },
  {
    id: 'h-iriya', name: '入谷', kana: 'いりや', en: 'Iriya', number: 'H19',
    transfers: [],
  },
  {
    id: 'h-minowa', name: '三ノ輪', kana: 'みのわ', en: 'Minowa', number: 'H20',
    transfers: [{ line: 'toden', at: '三ノ輪橋' }],
  },
  {
    id: 'h-minami-senju', name: '南千住', kana: 'みなみせんじゅ', en: 'Minami-senju', number: 'H21',
    transfers: [{ line: 'joban' }, { line: 'tx' }],
  },
  {
    id: 'h-kita-senju', name: '北千住', kana: 'きたせんじゅ', en: 'Kita-senju', number: 'H22',
    transfers: [
      { line: 'joban' }, { line: 'chiyoda' }, { line: 'tobuSkytree' }, { line: 'tx' },
    ],
  },
]

export const HIBIYA_LINE: RideableLine = {
  name: '日比谷線',
  symbol: 'H',
  color: '#B5B5AC',
  textColor: '#26261f',
  loop: false,
  stations: STATIONS,
}
