import type { RideableLine, Station } from './types'

// 相鉄本線 — 駅番号昇順（横浜 SO01 → 海老名 SO18）
const STATIONS: Station[] = [
  {
    id: 'so-yokohama', name: '横浜', kana: 'よこはま', en: 'Yokohama', number: 'SO01',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'tokaido' }, { line: 'yokosukaSobu' }, { line: 'shonanShinjuku' },
      { line: 'toyoko' }, { line: 'minatomirai' }, { line: 'keikyu' }, { line: 'blueLine' },
    ],
  },
  {
    id: 'so-hiranumabashi', name: '平沼橋', kana: 'ひらぬまばし', en: 'Hiranumabashi', number: 'SO02',
    transfers: [],
  },
  {
    id: 'so-nishi-yokohama', name: '西横浜', kana: 'にしよこはま', en: 'Nishi-Yokohama', number: 'SO03',
    transfers: [],
  },
  {
    id: 'so-tennocho', name: '天王町', kana: 'てんのうちょう', en: 'Tennocho', number: 'SO04',
    transfers: [],
  },
  {
    id: 'so-hoshikawa', name: '星川', kana: 'ほしかわ', en: 'Hoshikawa', number: 'SO05',
    transfers: [],
  },
  {
    id: 'so-wadamachi', name: '和田町', kana: 'わだまち', en: 'Wadamachi', number: 'SO06',
    transfers: [],
  },
  {
    id: 'so-kami-hoshikawa', name: '上星川', kana: 'かみほしかわ', en: 'Kami-hoshikawa', number: 'SO07',
    transfers: [],
  },
  {
    id: 'so-nishiya', name: '西谷', kana: 'にしや', en: 'Nishiya', number: 'SO08',
    transfers: [],
  },
  {
    id: 'so-tsurugamine', name: '鶴ケ峰', kana: 'つるがみね', en: 'Tsurugamine', number: 'SO09',
    transfers: [],
  },
  {
    id: 'so-futamatagawa', name: '二俣川', kana: 'ふたまたがわ', en: 'Futamatagawa', number: 'SO10',
    transfers: [],
  },
  {
    id: 'so-kibogaoka', name: '希望ケ丘', kana: 'きぼうがおか', en: 'Kibogaoka', number: 'SO11',
    transfers: [],
  },
  {
    id: 'so-mitsukyo', name: '三ツ境', kana: 'みつきょう', en: 'Mitsukyo', number: 'SO12',
    transfers: [],
  },
  {
    id: 'so-seya', name: '瀬谷', kana: 'せや', en: 'Seya', number: 'SO13',
    transfers: [],
  },
  {
    id: 'so-yamato', name: '大和', kana: 'やまと', en: 'Yamato', number: 'SO14',
    transfers: [{ line: 'odakyu' }],
  },
  {
    id: 'so-sagami-otsuka', name: '相模大塚', kana: 'さがみおおつか', en: 'Sagami-otsuka', number: 'SO15',
    transfers: [],
  },
  {
    id: 'so-sagamino', name: 'さがみ野', kana: 'さがみの', en: 'Sagamino', number: 'SO16',
    transfers: [],
  },
  {
    id: 'so-kashiwadai', name: 'かしわ台', kana: 'かしわだい', en: 'Kashiwadai', number: 'SO17',
    transfers: [],
  },
  {
    id: 'so-ebina', name: '海老名', kana: 'えびな', en: 'Ebina', number: 'SO18',
    transfers: [{ line: 'odakyu' }],
  },
]

export const SOTETSU_LINE: RideableLine = {
  name: '相鉄本線',
  symbol: 'SO',
  color: '#003D8F',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'local', name: '各駅停車', color: '#64748B', textColor: '#ffffff',
      stops: 'all',
    },
    {
      id: 'express', name: '急行', color: '#F39800', textColor: '#ffffff',
      stops: [
        'so-yokohama', 'so-futamatagawa', 'so-kibogaoka', 'so-mitsukyo', 'so-seya',
        'so-yamato', 'so-sagami-otsuka', 'so-sagamino', 'so-kashiwadai', 'so-ebina',
      ],
    },
    {
      id: 'ltd-express', name: '特急', color: '#E7211A', textColor: '#ffffff',
      stops: ['so-yokohama', 'so-futamatagawa', 'so-yamato', 'so-ebina'],
    },
  ],
}
