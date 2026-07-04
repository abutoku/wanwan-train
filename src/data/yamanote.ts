import type { RideableLine, Station } from './types'

// 外回り（時計回り）順。先頭 = 東京駅。
// インデックス +1 = 外回りで1駅進む / -1 = 内回りで1駅進む
export const STATIONS: Station[] = [
  {
    id: 'tokyo', name: '東京', kana: 'とうきょう', en: 'Tokyo', number: 'JY01',
    transfers: [
      { line: 'chuoRapid' }, { line: 'keihinTohoku' }, { line: 'tokaido' },
      { line: 'uenoTokyo' }, { line: 'yokosukaSobu' }, { line: 'keiyo' },
      { line: 'tokaidoShinkansen' }, { line: 'tohokuShinkansen' }, { line: 'marunouchi' },
    ],
  },
  {
    id: 'yurakucho', name: '有楽町', kana: 'ゆうらくちょう', en: 'Yurakucho', number: 'JY30',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'yurakuchoLine' },
      { line: 'hibiya', at: '日比谷駅' }, { line: 'chiyoda', at: '日比谷駅' }, { line: 'mita', at: '日比谷駅' },
    ],
  },
  {
    id: 'shimbashi', name: '新橋', kana: 'しんばし', en: 'Shimbashi', number: 'JY29',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'tokaido' }, { line: 'uenoTokyo' },
      { line: 'yokosukaSobu' }, { line: 'ginza' }, { line: 'asakusa' }, { line: 'yurikamome' },
    ],
  },
  {
    id: 'hamamatsucho', name: '浜松町', kana: 'はままつちょう', en: 'Hamamatsucho', number: 'JY28',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'monorail' },
      { line: 'asakusa', at: '大門駅' }, { line: 'oedo', at: '大門駅' },
    ],
  },
  {
    id: 'tamachi', name: '田町', kana: 'たまち', en: 'Tamachi', number: 'JY27',
    transfers: [
      { line: 'keihinTohoku' },
      { line: 'asakusa', at: '三田駅' }, { line: 'mita', at: '三田駅' },
    ],
  },
  {
    id: 'takanawa-gateway', name: '高輪ゲートウェイ', kana: 'たかなわゲートウェイ', en: 'Takanawa Gateway', number: 'JY26',
    transfers: [{ line: 'keihinTohoku' }],
  },
  {
    id: 'shinagawa', name: '品川', kana: 'しながわ', en: 'Shinagawa', number: 'JY25',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'tokaido' }, { line: 'uenoTokyo' },
      { line: 'yokosukaSobu' }, { line: 'tokaidoShinkansen' }, { line: 'keikyu' },
    ],
  },
  {
    id: 'osaki', name: '大崎', kana: 'おおさき', en: 'Osaki', number: 'JY24',
    transfers: [{ line: 'saikyo' }, { line: 'shonanShinjuku' }, { line: 'rinkai' }],
  },
  {
    id: 'gotanda', name: '五反田', kana: 'ごたんだ', en: 'Gotanda', number: 'JY23',
    transfers: [{ line: 'asakusa' }, { line: 'ikegami' }],
  },
  {
    id: 'meguro', name: '目黒', kana: 'めぐろ', en: 'Meguro', number: 'JY22',
    transfers: [{ line: 'namboku' }, { line: 'mita' }, { line: 'tokyuMeguro' }],
  },
  {
    id: 'ebisu', name: '恵比寿', kana: 'えびす', en: 'Ebisu', number: 'JY21',
    transfers: [{ line: 'saikyo' }, { line: 'shonanShinjuku' }, { line: 'hibiya' }],
  },
  {
    id: 'shibuya', name: '渋谷', kana: 'しぶや', en: 'Shibuya', number: 'JY20',
    transfers: [
      { line: 'saikyo' }, { line: 'shonanShinjuku' }, { line: 'ginza' },
      { line: 'hanzomon' }, { line: 'fukutoshin' },
      { line: 'toyoko' }, { line: 'denentoshi' }, { line: 'inokashira' },
    ],
  },
  {
    id: 'harajuku', name: '原宿', kana: 'はらじゅく', en: 'Harajuku', number: 'JY19',
    transfers: [
      { line: 'chiyoda', at: '明治神宮前駅' }, { line: 'fukutoshin', at: '明治神宮前駅' },
    ],
  },
  {
    id: 'yoyogi', name: '代々木', kana: 'よよぎ', en: 'Yoyogi', number: 'JY18',
    transfers: [{ line: 'sobuLocal' }, { line: 'oedo' }],
  },
  {
    id: 'shinjuku', name: '新宿', kana: 'しんじゅく', en: 'Shinjuku', number: 'JY17',
    transfers: [
      { line: 'chuoRapid' }, { line: 'sobuLocal' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'marunouchi' }, { line: 'toeiShinjuku' }, { line: 'oedo' },
      { line: 'keio' }, { line: 'odakyu' },
    ],
  },
  {
    id: 'shin-okubo', name: '新大久保', kana: 'しんおおくぼ', en: 'Shin-Okubo', number: 'JY16',
    transfers: [],
  },
  {
    id: 'takadanobaba', name: '高田馬場', kana: 'たかだのばば', en: 'Takadanobaba', number: 'JY15',
    transfers: [{ line: 'tozai' }, { line: 'seibuShinjuku' }],
  },
  {
    id: 'mejiro', name: '目白', kana: 'めじろ', en: 'Mejiro', number: 'JY14',
    transfers: [],
  },
  {
    id: 'ikebukuro', name: '池袋', kana: 'いけぶくろ', en: 'Ikebukuro', number: 'JY13',
    transfers: [
      { line: 'saikyo' }, { line: 'shonanShinjuku' }, { line: 'marunouchi' },
      { line: 'yurakuchoLine' }, { line: 'fukutoshin' },
      { line: 'tobuTojo' }, { line: 'seibuIkebukuro' },
    ],
  },
  {
    id: 'otsuka', name: '大塚', kana: 'おおつか', en: 'Otsuka', number: 'JY12',
    transfers: [{ line: 'toden', at: '大塚駅前' }],
  },
  {
    id: 'sugamo', name: '巣鴨', kana: 'すがも', en: 'Sugamo', number: 'JY11',
    transfers: [{ line: 'mita' }],
  },
  {
    id: 'komagome', name: '駒込', kana: 'こまごめ', en: 'Komagome', number: 'JY10',
    transfers: [{ line: 'namboku' }],
  },
  {
    id: 'tabata', name: '田端', kana: 'たばた', en: 'Tabata', number: 'JY09',
    transfers: [{ line: 'keihinTohoku' }],
  },
  {
    id: 'nishi-nippori', name: '西日暮里', kana: 'にしにっぽり', en: 'Nishi-Nippori', number: 'JY08',
    transfers: [{ line: 'keihinTohoku' }, { line: 'chiyoda' }, { line: 'nipporiToneri' }],
  },
  {
    id: 'nippori', name: '日暮里', kana: 'にっぽり', en: 'Nippori', number: 'JY07',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'joban' }, { line: 'keisei' }, { line: 'nipporiToneri' },
    ],
  },
  {
    id: 'uguisudani', name: '鶯谷', kana: 'うぐいすだに', en: 'Uguisudani', number: 'JY06',
    transfers: [{ line: 'keihinTohoku' }],
  },
  {
    id: 'ueno', name: '上野', kana: 'うえの', en: 'Ueno', number: 'JY05',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'utsunomiyaTakasaki' }, { line: 'joban' },
      { line: 'uenoTokyo' }, { line: 'tohokuShinkansen' },
      { line: 'ginza' }, { line: 'hibiya' }, { line: 'keisei', at: '京成上野駅' },
    ],
  },
  {
    id: 'okachimachi', name: '御徒町', kana: 'おかちまち', en: 'Okachimachi', number: 'JY04',
    transfers: [
      { line: 'keihinTohoku' },
      { line: 'ginza', at: '上野広小路駅' }, { line: 'hibiya', at: '仲御徒町駅' }, { line: 'oedo', at: '上野御徒町駅' },
    ],
  },
  {
    id: 'akihabara', name: '秋葉原', kana: 'あきはばら', en: 'Akihabara', number: 'JY03',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'sobuLocal' }, { line: 'hibiya' }, { line: 'tx' },
    ],
  },
  {
    id: 'kanda', name: '神田', kana: 'かんだ', en: 'Kanda', number: 'JY02',
    transfers: [{ line: 'chuoRapid' }, { line: 'keihinTohoku' }, { line: 'ginza' }],
  },
]

export const N = STATIONS.length // 30

export const YAMANOTE_LINE: RideableLine = {
  name: '山手線',
  symbol: 'JY',
  color: '#9ACD32',
  textColor: '#14330a',
  loop: true,
  stations: STATIONS,
  directions: {
    fwd: { label: '外回り ⟳', sub: '時計回り' },
    rev: { label: '内回り ⟲', sub: '反時計回り' },
  },
}
