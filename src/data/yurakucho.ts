import type { RideableLine, Station } from './types'

// 東京メトロ有楽町線 — 駅番号昇順（和光市 Y01 → 新木場 Y24）
const STATIONS: Station[] = [
  {
    id: 'y-wakoshi', name: '和光市', kana: 'わこうし', en: 'Wakoshi', number: 'Y01',
    transfers: [{ line: 'tobuTojo' }, { line: 'fukutoshin' }],
  },
  {
    id: 'y-chikatetsu-narimasu', name: '地下鉄成増', kana: 'ちかてつなります', en: 'Chikatetsu-narimasu', number: 'Y02',
    transfers: [{ line: 'fukutoshin' }, { line: 'tobuTojo', at: '成増駅' }],
  },
  {
    id: 'y-chikatetsu-akatsuka', name: '地下鉄赤塚', kana: 'ちかてつあかつか', en: 'Chikatetsu-akatsuka', number: 'Y03',
    transfers: [{ line: 'fukutoshin' }, { line: 'tobuTojo', at: '下赤塚駅' }],
  },
  {
    id: 'y-heiwadai', name: '平和台', kana: 'へいわだい', en: 'Heiwadai', number: 'Y04',
    transfers: [{ line: 'fukutoshin' }],
  },
  {
    id: 'y-hikawadai', name: '氷川台', kana: 'ひかわだい', en: 'Hikawadai', number: 'Y05',
    transfers: [{ line: 'fukutoshin' }],
  },
  {
    id: 'y-kotake-mukaihara', name: '小竹向原', kana: 'こたけむかいはら', en: 'Kotake-mukaihara', number: 'Y06',
    transfers: [{ line: 'fukutoshin' }, { line: 'seibuIkebukuro' }],
  },
  {
    id: 'y-senkawa', name: '千川', kana: 'せんかわ', en: 'Senkawa', number: 'Y07',
    transfers: [{ line: 'fukutoshin' }],
  },
  {
    id: 'y-kanamecho', name: '要町', kana: 'かなめちょう', en: 'Kanamecho', number: 'Y08',
    transfers: [{ line: 'fukutoshin' }],
  },
  {
    id: 'y-ikebukuro', name: '池袋', kana: 'いけぶくろ', en: 'Ikebukuro', number: 'Y09',
    transfers: [
      { line: 'yamanote' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'marunouchi' }, { line: 'fukutoshin' },
      { line: 'tobuTojo' }, { line: 'seibuIkebukuro' },
    ],
  },
  {
    id: 'y-higashi-ikebukuro', name: '東池袋', kana: 'ひがしいけぶくろ', en: 'Higashi-ikebukuro', number: 'Y10',
    transfers: [],
  },
  {
    id: 'y-gokokuji', name: '護国寺', kana: 'ごこくじ', en: 'Gokokuji', number: 'Y11',
    transfers: [],
  },
  {
    id: 'y-edogawabashi', name: '江戸川橋', kana: 'えどがわばし', en: 'Edogawabashi', number: 'Y12',
    transfers: [],
  },
  {
    id: 'y-iidabashi', name: '飯田橋', kana: 'いいだばし', en: 'Iidabashi', number: 'Y13',
    transfers: [
      { line: 'sobuLocal' }, { line: 'tozai' }, { line: 'namboku' }, { line: 'oedo' },
    ],
  },
  {
    id: 'y-ichigaya', name: '市ケ谷', kana: 'いちがや', en: 'Ichigaya', number: 'Y14',
    transfers: [
      { line: 'sobuLocal' }, { line: 'namboku' }, { line: 'toeiShinjuku' },
    ],
  },
  {
    id: 'y-kojimachi', name: '麹町', kana: 'こうじまち', en: 'Kojimachi', number: 'Y15',
    transfers: [],
  },
  {
    id: 'y-nagatacho', name: '永田町', kana: 'ながたちょう', en: 'Nagatacho', number: 'Y16',
    transfers: [
      { line: 'hanzomon' }, { line: 'namboku' },
      { line: 'ginza', at: '赤坂見附駅' }, { line: 'marunouchi', at: '赤坂見附駅' },
    ],
  },
  {
    id: 'y-sakuradamon', name: '桜田門', kana: 'さくらだもん', en: 'Sakuradamon', number: 'Y17',
    transfers: [],
  },
  {
    id: 'y-yurakucho', name: '有楽町', kana: 'ゆうらくちょう', en: 'Yurakucho', number: 'Y18',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' },
      { line: 'hibiya', at: '日比谷駅' }, { line: 'chiyoda', at: '日比谷駅' },
      { line: 'mita', at: '日比谷駅' },
    ],
  },
  {
    id: 'y-ginza-itchome', name: '銀座一丁目', kana: 'ぎんざいっちょうめ', en: 'Ginza-itchome', number: 'Y19',
    transfers: [
      { line: 'ginza', at: '銀座駅' }, { line: 'marunouchi', at: '銀座駅' },
      { line: 'hibiya', at: '銀座駅' },
    ],
  },
  {
    id: 'y-shintomicho', name: '新富町', kana: 'しんとみちょう', en: 'Shintomicho', number: 'Y20',
    transfers: [],
  },
  {
    id: 'y-tsukishima', name: '月島', kana: 'つきしま', en: 'Tsukishima', number: 'Y21',
    transfers: [{ line: 'oedo' }],
  },
  {
    id: 'y-toyosu', name: '豊洲', kana: 'とよす', en: 'Toyosu', number: 'Y22',
    transfers: [{ line: 'yurikamome' }],
  },
  {
    id: 'y-tatsumi', name: '辰巳', kana: 'たつみ', en: 'Tatsumi', number: 'Y23',
    transfers: [],
  },
  {
    id: 'y-shin-kiba', name: '新木場', kana: 'しんきば', en: 'Shin-kiba', number: 'Y24',
    transfers: [{ line: 'keiyo' }, { line: 'rinkai' }],
  },
]

export const YURAKUCHO_LINE: RideableLine = {
  name: '東京メトロ有楽町線',
  symbol: 'Y',
  color: '#C1A470',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'local', name: '各駅停車', color: '#64748B', textColor: '#ffffff',
      stops: 'all',
    },
  ],
}
