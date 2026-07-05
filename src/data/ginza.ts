import type { RideableLine, Station } from './types'

// 東京メトロ銀座線 — 駅番号昇順（渋谷 G01 → 浅草 G19）
const STATIONS: Station[] = [
  {
    id: 'g-shibuya', name: '渋谷', kana: 'しぶや', en: 'Shibuya', number: 'G01',
    transfers: [
      { line: 'yamanote' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'hanzomon' }, { line: 'fukutoshin' },
      { line: 'toyoko' }, { line: 'denentoshi' }, { line: 'inokashira' },
    ],
  },
  {
    id: 'g-omotesando', name: '表参道', kana: 'おもてさんどう', en: 'Omote-sando', number: 'G02',
    transfers: [{ line: 'chiyoda' }, { line: 'hanzomon' }],
  },
  {
    id: 'g-gaiemmae', name: '外苑前', kana: 'がいえんまえ', en: 'Gaiemmae', number: 'G03',
    transfers: [],
  },
  {
    id: 'g-aoyama-itchome', name: '青山一丁目', kana: 'あおやまいっちょうめ', en: 'Aoyama-itchome', number: 'G04',
    transfers: [{ line: 'hanzomon' }, { line: 'oedo' }],
  },
  {
    id: 'g-akasaka-mitsuke', name: '赤坂見附', kana: 'あかさかみつけ', en: 'Akasaka-mitsuke', number: 'G05',
    transfers: [
      { line: 'marunouchi' },
      { line: 'yurakuchoLine', at: '永田町駅' }, { line: 'hanzomon', at: '永田町駅' }, { line: 'namboku', at: '永田町駅' },
    ],
  },
  {
    id: 'g-tameike-sanno', name: '溜池山王', kana: 'ためいけさんのう', en: 'Tameike-sanno', number: 'G06',
    transfers: [
      { line: 'namboku' }, { line: 'chiyoda', at: '国会議事堂前駅' }, { line: 'marunouchi', at: '国会議事堂前駅' },
    ],
  },
  {
    id: 'g-toranomon', name: '虎ノ門', kana: 'とらのもん', en: 'Toranomon', number: 'G07',
    transfers: [{ line: 'hibiya', at: '虎ノ門ヒルズ駅' }],
  },
  {
    id: 'g-shimbashi', name: '新橋', kana: 'しんばし', en: 'Shimbashi', number: 'G08',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'tokaido' },
      { line: 'uenoTokyo' }, { line: 'yokosukaSobu' }, { line: 'asakusa' }, { line: 'yurikamome' },
      { line: 'oedo', at: '汐留駅' },
    ],
  },
  {
    id: 'g-ginza', name: '銀座', kana: 'ぎんざ', en: 'Ginza', number: 'G09',
    transfers: [
      { line: 'marunouchi' }, { line: 'hibiya' }, { line: 'yurakuchoLine', at: '銀座一丁目駅' },
    ],
  },
  {
    id: 'g-kyobashi', name: '京橋', kana: 'きょうばし', en: 'Kyobashi', number: 'G10',
    transfers: [],
  },
  {
    id: 'g-nihombashi', name: '日本橋', kana: 'にほんばし', en: 'Nihombashi', number: 'G11',
    transfers: [{ line: 'tozai' }, { line: 'asakusa' }],
  },
  {
    id: 'g-mitsukoshimae', name: '三越前', kana: 'みつこしまえ', en: 'Mitsukoshimae', number: 'G12',
    transfers: [{ line: 'hanzomon' }],
  },
  {
    id: 'g-kanda', name: '神田', kana: 'かんだ', en: 'Kanda', number: 'G13',
    transfers: [{ line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'keihinTohoku' }],
  },
  {
    id: 'g-suehirocho', name: '末広町', kana: 'すえひろちょう', en: 'Suehirocho', number: 'G14',
    transfers: [],
  },
  {
    id: 'g-ueno-hirokoji', name: '上野広小路', kana: 'うえのひろこうじ', en: 'Ueno-hirokoji', number: 'G15',
    transfers: [
      { line: 'yamanote', at: '御徒町駅' }, { line: 'keihinTohoku', at: '御徒町駅' },
      { line: 'hibiya', at: '仲御徒町駅' }, { line: 'oedo', at: '上野御徒町駅' },
    ],
  },
  {
    id: 'g-ueno', name: '上野', kana: 'うえの', en: 'Ueno', number: 'G16',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'utsunomiyaTakasaki' },
      { line: 'joban' }, { line: 'uenoTokyo' }, { line: 'tohokuShinkansen' },
      { line: 'hibiya' }, { line: 'keisei', at: '京成上野駅' },
    ],
  },
  {
    id: 'g-inaricho', name: '稲荷町', kana: 'いなりちょう', en: 'Inaricho', number: 'G17',
    transfers: [],
  },
  {
    id: 'g-tawaramachi', name: '田原町', kana: 'たわらまち', en: 'Tawaramachi', number: 'G18',
    transfers: [],
  },
  {
    id: 'g-asakusa', name: '浅草', kana: 'あさくさ', en: 'Asakusa', number: 'G19',
    transfers: [{ line: 'asakusa' }, { line: 'tobuSkytree' }],
  },
]

export const GINZA_LINE: RideableLine = {
  name: '銀座線',
  symbol: 'G',
  color: '#FF9500',
  textColor: '#3d2400',
  loop: false,
  stations: STATIONS,
}
