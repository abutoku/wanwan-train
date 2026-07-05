import type { RideableLine, Station } from './types'

// 都営浅草線 — 駅番号昇順（西馬込 A01 → 押上 A20）
const STATIONS: Station[] = [
  {
    id: 'a-nishi-magome', name: '西馬込', kana: 'にしまごめ', en: 'Nishi-magome', number: 'A01',
    transfers: [],
  },
  {
    id: 'a-magome', name: '馬込', kana: 'まごめ', en: 'Magome', number: 'A02',
    transfers: [],
  },
  {
    id: 'a-nakanobu', name: '中延', kana: 'なかのぶ', en: 'Nakanobu', number: 'A03',
    transfers: [{ line: 'oimachi' }],
  },
  {
    id: 'a-togoshi', name: '戸越', kana: 'とごし', en: 'Togoshi', number: 'A04',
    transfers: [{ line: 'ikegami', at: '戸越銀座駅' }],
  },
  {
    id: 'a-gotanda', name: '五反田', kana: 'ごたんだ', en: 'Gotanda', number: 'A05',
    transfers: [{ line: 'yamanote' }, { line: 'ikegami' }],
  },
  {
    id: 'a-takanawadai', name: '高輪台', kana: 'たかなわだい', en: 'Takanawadai', number: 'A06',
    transfers: [],
  },
  {
    id: 'a-sengakuji', name: '泉岳寺', kana: 'せんがくじ', en: 'Sengakuji', number: 'A07',
    transfers: [{ line: 'keikyu' }],
  },
  {
    id: 'a-mita', name: '三田', kana: 'みた', en: 'Mita', number: 'A08',
    transfers: [
      { line: 'mita' },
      { line: 'yamanote', at: '田町駅' }, { line: 'keihinTohoku', at: '田町駅' },
    ],
  },
  {
    id: 'a-daimon', name: '大門', kana: 'だいもん', en: 'Daimon', number: 'A09',
    transfers: [
      { line: 'oedo' },
      { line: 'yamanote', at: '浜松町駅' }, { line: 'keihinTohoku', at: '浜松町駅' },
      { line: 'monorail', at: '浜松町駅' },
    ],
  },
  {
    id: 'a-shimbashi', name: '新橋', kana: 'しんばし', en: 'Shimbashi', number: 'A10',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'tokaido' },
      { line: 'uenoTokyo' }, { line: 'yokosukaSobu' },
      { line: 'ginza' }, { line: 'yurikamome' }, { line: 'oedo', at: '汐留駅' },
    ],
  },
  {
    id: 'a-higashi-ginza', name: '東銀座', kana: 'ひがしぎんざ', en: 'Higashi-ginza', number: 'A11',
    transfers: [{ line: 'hibiya' }],
  },
  {
    id: 'a-takaracho', name: '宝町', kana: 'たからちょう', en: 'Takaracho', number: 'A12',
    transfers: [],
  },
  {
    id: 'a-nihombashi', name: '日本橋', kana: 'にほんばし', en: 'Nihombashi', number: 'A13',
    transfers: [{ line: 'ginza' }, { line: 'tozai' }],
  },
  {
    id: 'a-ningyocho', name: '人形町', kana: 'にんぎょうちょう', en: 'Ningyocho', number: 'A14',
    transfers: [{ line: 'hibiya' }],
  },
  {
    id: 'a-higashi-nihombashi', name: '東日本橋', kana: 'ひがしにほんばし', en: 'Higashi-nihombashi', number: 'A15',
    transfers: [
      { line: 'toeiShinjuku', at: '馬喰横山駅' }, { line: 'yokosukaSobu', at: '馬喰町駅' },
    ],
  },
  {
    id: 'a-asakusabashi', name: '浅草橋', kana: 'あさくさばし', en: 'Asakusabashi', number: 'A16',
    transfers: [{ line: 'sobuLocal' }],
  },
  {
    id: 'a-kuramae', name: '蔵前', kana: 'くらまえ', en: 'Kuramae', number: 'A17',
    transfers: [{ line: 'oedo' }],
  },
  {
    id: 'a-asakusa', name: '浅草', kana: 'あさくさ', en: 'Asakusa', number: 'A18',
    transfers: [{ line: 'ginza' }, { line: 'tobuSkytree' }, { line: 'tx' }],
  },
  {
    id: 'a-honjo-azumabashi', name: '本所吾妻橋', kana: 'ほんじょあづまばし', en: 'Honjo-azumabashi', number: 'A19',
    transfers: [],
  },
  {
    id: 'a-oshiage', name: '押上', kana: 'おしあげ', en: 'Oshiage', number: 'A20',
    transfers: [{ line: 'hanzomon' }, { line: 'keisei' }, { line: 'tobuSkytree' }],
  },
]

export const ASAKUSA_LINE: RideableLine = {
  name: '都営浅草線',
  symbol: 'A',
  color: '#EC6E65',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'local', name: '各駅停車', color: '#64748B', textColor: '#ffffff',
      stops: 'all',
    },
    {
      id: 'airport-rapid-ltd-express', name: 'エアポート快特', color: '#00A650', textColor: '#ffffff',
      note: '泉岳寺〜押上間で運転（西馬込方面には乗り入れない）',
      stops: [
        'a-sengakuji', 'a-daimon', 'a-shimbashi', 'a-nihombashi', 'a-asakusa', 'a-oshiage',
      ],
    },
  ],
}
