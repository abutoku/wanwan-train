import type { RideableLine, Station } from './types'

// 京急空港線 — 駅番号昇順（京急蒲田 KK11 → 羽田空港第1・第2ターミナル KK17）
const STATIONS: Station[] = [
  {
    id: 'kka-keikyu-kamata', name: '京急蒲田', kana: 'けいきゅうかまた', en: 'Keikyu Kamata', number: 'KK11',
    transfers: [{ line: 'keikyu' }],
  },
  {
    id: 'kka-kojiya', name: '糀谷', kana: 'こうじや', en: 'Kojiya', number: 'KK12',
    transfers: [],
  },
  {
    id: 'kka-otorii', name: '大鳥居', kana: 'おおとりい', en: 'Otorii', number: 'KK13',
    transfers: [],
  },
  {
    id: 'kka-anamori-inari', name: '穴守稲荷', kana: 'あなもりいなり', en: 'Anamori-inari', number: 'KK14',
    transfers: [],
  },
  {
    id: 'kka-tenkubashi', name: '天空橋', kana: 'てんくうばし', en: 'Tenkubashi', number: 'KK15',
    transfers: [{ line: 'monorail' }],
  },
  {
    id: 'kka-haneda-airport-t3', name: '羽田空港第3ターミナル', kana: 'はねだくうこうだいさんターミナル', en: 'Haneda Airport Terminal 3', number: 'KK16',
    transfers: [{ line: 'monorail' }],
  },
  {
    id: 'kka-haneda-airport-t1-t2', name: '羽田空港第1・第2ターミナル', kana: 'はねだくうこうだいいち・だいにターミナル', en: 'Haneda Airport Terminal 1・2', number: 'KK17',
    transfers: [{ line: 'monorail' }],
  },
]

export const KEIKYU_AIRPORT_LINE: RideableLine = {
  name: '京急空港線',
  symbol: 'KK',
  color: '#E60012',
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
