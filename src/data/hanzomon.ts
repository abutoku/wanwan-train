import type { RideableLine, Station } from './types'

// 東京メトロ半蔵門線 — 駅番号昇順（渋谷 Z01 → 押上 Z14）
const STATIONS: Station[] = [
  {
    id: 'z-shibuya', name: '渋谷', kana: 'しぶや', en: 'Shibuya', number: 'Z01',
    transfers: [
      { line: 'yamanote' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'ginza' }, { line: 'fukutoshin' },
      { line: 'toyoko' }, { line: 'denentoshi' }, { line: 'inokashira' },
    ],
  },
  {
    id: 'z-omote-sando', name: '表参道', kana: 'おもてさんどう', en: 'Omote-sando', number: 'Z02',
    transfers: [{ line: 'ginza' }, { line: 'chiyoda' }],
  },
  {
    id: 'z-aoyama-itchome', name: '青山一丁目', kana: 'あおやまいっちょうめ', en: 'Aoyama-itchome', number: 'Z03',
    transfers: [{ line: 'ginza' }, { line: 'oedo' }],
  },
  {
    id: 'z-nagatacho', name: '永田町', kana: 'ながたちょう', en: 'Nagatacho', number: 'Z04',
    transfers: [
      { line: 'yurakuchoLine' }, { line: 'namboku' },
      { line: 'marunouchi', at: '赤坂見附駅' }, { line: 'ginza', at: '赤坂見附駅' },
    ],
  },
  {
    id: 'z-hanzomon', name: '半蔵門', kana: 'はんぞうもん', en: 'Hanzomon', number: 'Z05',
    transfers: [],
  },
  {
    id: 'z-kudanshita', name: '九段下', kana: 'くだんした', en: 'Kudanshita', number: 'Z06',
    transfers: [{ line: 'tozai' }, { line: 'toeiShinjuku' }],
  },
  {
    id: 'z-jimbocho', name: '神保町', kana: 'じんぼうちょう', en: 'Jimbocho', number: 'Z07',
    transfers: [{ line: 'mita' }, { line: 'toeiShinjuku' }],
  },
  {
    id: 'z-otemachi', name: '大手町', kana: 'おおてまち', en: 'Otemachi', number: 'Z08',
    transfers: [
      { line: 'marunouchi' }, { line: 'tozai' }, { line: 'chiyoda' }, { line: 'mita' },
      { line: 'yamanote', at: '東京駅' }, { line: 'chuoRapid', at: '東京駅' }, { line: 'keihinTohoku', at: '東京駅' },
    ],
  },
  {
    id: 'z-mitsukoshimae', name: '三越前', kana: 'みつこしまえ', en: 'Mitsukoshimae', number: 'Z09',
    transfers: [{ line: 'ginza' }],
  },
  {
    id: 'z-suitengumae', name: '水天宮前', kana: 'すいてんぐうまえ', en: 'Suitengumae', number: 'Z10',
    transfers: [{ line: 'hibiya', at: '人形町駅' }],
  },
  {
    id: 'z-kiyosumi-shirakawa', name: '清澄白河', kana: 'きよすみしらかわ', en: 'Kiyosumi-shirakawa', number: 'Z11',
    transfers: [{ line: 'oedo' }],
  },
  {
    id: 'z-sumiyoshi', name: '住吉', kana: 'すみよし', en: 'Sumiyoshi', number: 'Z12',
    transfers: [{ line: 'toeiShinjuku' }],
  },
  {
    id: 'z-kinshicho', name: '錦糸町', kana: 'きんしちょう', en: 'Kinshicho', number: 'Z13',
    transfers: [{ line: 'sobuLocal' }, { line: 'yokosukaSobu' }],
  },
  {
    id: 'z-oshiage', name: '押上', kana: 'おしあげ', en: 'Oshiage', number: 'Z14',
    transfers: [{ line: 'asakusa' }, { line: 'keisei' }, { line: 'tobuSkytree' }],
  },
]

export const HANZOMON_LINE: RideableLine = {
  name: '東京メトロ半蔵門線',
  symbol: 'Z',
  color: '#8F76D6',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
}
