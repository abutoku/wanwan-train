import type { RideableLine, Station } from './types'

// 都営地下鉄新宿線 — 駅番号昇順（新宿 S01 → 本八幡 S21）
const STATIONS: Station[] = [
  {
    id: 's-shinjuku', name: '新宿', kana: 'しんじゅく', en: 'Shinjuku', number: 'S01',
    transfers: [
      { line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'sobuLocal' },
      { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'marunouchi' }, { line: 'oedo' },
      { line: 'keio' }, { line: 'odakyu' },
    ],
  },
  {
    id: 's-shinjuku-sanchome', name: '新宿三丁目', kana: 'しんじゅくさんちょうめ', en: 'Shinjuku-sanchome', number: 'S02',
    transfers: [{ line: 'marunouchi' }, { line: 'fukutoshin' }],
  },
  {
    id: 's-akebonobashi', name: '曙橋', kana: 'あけぼのばし', en: 'Akebonobashi', number: 'S03',
    transfers: [],
  },
  {
    id: 's-ichigaya', name: '市ケ谷', kana: 'いちがや', en: 'Ichigaya', number: 'S04',
    transfers: [{ line: 'sobuLocal' }, { line: 'yurakuchoLine' }, { line: 'namboku' }],
  },
  {
    id: 's-kudanshita', name: '九段下', kana: 'くだんした', en: 'Kudanshita', number: 'S05',
    transfers: [{ line: 'tozai' }, { line: 'hanzomon' }],
  },
  {
    id: 's-jimbocho', name: '神保町', kana: 'じんぼうちょう', en: 'Jimbocho', number: 'S06',
    transfers: [{ line: 'hanzomon' }, { line: 'mita' }],
  },
  {
    id: 's-ogawamachi', name: '小川町', kana: 'おがわまち', en: 'Ogawamachi', number: 'S07',
    transfers: [{ line: 'marunouchi', at: '淡路町駅' }, { line: 'chiyoda', at: '新御茶ノ水駅' }],
  },
  {
    id: 's-iwamotocho', name: '岩本町', kana: 'いわもとちょう', en: 'Iwamotocho', number: 'S08',
    transfers: [{ line: 'hibiya', at: '秋葉原駅' }],
  },
  {
    id: 's-bakuro-yokoyama', name: '馬喰横山', kana: 'ばくろよこやま', en: 'Bakuro-yokoyama', number: 'S09',
    transfers: [{ line: 'asakusa', at: '東日本橋駅' }, { line: 'yokosukaSobu', at: '馬喰町駅' }],
  },
  {
    id: 's-hamacho', name: '浜町', kana: 'はまちょう', en: 'Hamacho', number: 'S10',
    transfers: [],
  },
  {
    id: 's-morishita', name: '森下', kana: 'もりした', en: 'Morishita', number: 'S11',
    transfers: [{ line: 'oedo' }],
  },
  {
    id: 's-kikukawa', name: '菊川', kana: 'きくかわ', en: 'Kikukawa', number: 'S12',
    transfers: [],
  },
  {
    id: 's-sumiyoshi', name: '住吉', kana: 'すみよし', en: 'Sumiyoshi', number: 'S13',
    transfers: [{ line: 'hanzomon' }],
  },
  {
    id: 's-nishi-ojima', name: '西大島', kana: 'にしおおじま', en: 'Nishi-ojima', number: 'S14',
    transfers: [],
  },
  {
    id: 's-ojima', name: '大島', kana: 'おおじま', en: 'Ojima', number: 'S15',
    transfers: [],
  },
  {
    id: 's-higashi-ojima', name: '東大島', kana: 'ひがしおおじま', en: 'Higashi-ojima', number: 'S16',
    transfers: [],
  },
  {
    id: 's-funabori', name: '船堀', kana: 'ふなぼり', en: 'Funabori', number: 'S17',
    transfers: [],
  },
  {
    id: 's-ichinoe', name: '一之江', kana: 'いちのえ', en: 'Ichinoe', number: 'S18',
    transfers: [],
  },
  {
    id: 's-mizue', name: '瑞江', kana: 'みずえ', en: 'Mizue', number: 'S19',
    transfers: [],
  },
  {
    id: 's-shinozaki', name: '篠崎', kana: 'しのざき', en: 'Shinozaki', number: 'S20',
    transfers: [],
  },
  {
    id: 's-motoyawata', name: '本八幡', kana: 'もとやわた', en: 'Motoyawata', number: 'S21',
    transfers: [{ line: 'sobuLocal' }, { line: 'keisei', at: '京成八幡駅' }],
  },
]

export const TOEI_SHINJUKU_LINE: RideableLine = {
  name: '都営新宿線',
  symbol: 'S',
  color: '#B0BF1E',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'local', name: '各駅停車', color: '#64748B', textColor: '#ffffff',
      stops: 'all',
    },
    {
      id: 'express', name: '急行', color: '#E7211A', textColor: '#ffffff',
      stops: [
        's-shinjuku', 's-shinjuku-sanchome', 's-ichigaya', 's-kudanshita',
        's-jimbocho', 's-bakuro-yokoyama', 's-morishita', 's-ojima',
        's-funabori', 's-mizue', 's-motoyawata',
      ],
    },
  ],
}
