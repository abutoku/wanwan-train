import type { RideableLine, Station } from './types'

// みなとみらい線 — 駅番号昇順（横浜 MM01 → 元町・中華街 MM06）
const STATIONS: Station[] = [
  {
    id: 'mm-yokohama', name: '横浜', kana: 'よこはま', en: 'Yokohama', number: 'MM01',
    transfers: [
      { line: 'toyoko' }, { line: 'tokaido' }, { line: 'yokosukaSobu' }, { line: 'keihinTohoku' },
      { line: 'shonanShinjuku' }, { line: 'yokohamaLine' },
      { line: 'keikyu' }, { line: 'sotetsu' }, { line: 'blueLine' },
    ],
  },
  {
    id: 'mm-shin-takashima', name: '新高島', kana: 'しんたかしま', en: 'Shin-takashima', number: 'MM02',
    transfers: [],
  },
  {
    id: 'mm-minatomirai', name: 'みなとみらい', kana: 'みなとみらい', en: 'Minatomirai', number: 'MM03',
    transfers: [],
  },
  {
    id: 'mm-bashamichi', name: '馬車道', kana: 'ばしゃみち', en: 'Bashamichi', number: 'MM04',
    transfers: [],
  },
  {
    id: 'mm-nihon-odori', name: '日本大通り', kana: 'にほんおおどおり', en: 'Nihon-odori', number: 'MM05',
    transfers: [],
  },
  {
    id: 'mm-motomachi-chukagai', name: '元町・中華街', kana: 'もとまちちゅうかがい', en: 'Motomachi-Chukagai', number: 'MM06',
    transfers: [],
  },
]

export const MINATOMIRAI_LINE: RideableLine = {
  name: 'みなとみらい線',
  symbol: 'MM',
  color: '#003687',
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
        'mm-yokohama', 'mm-minatomirai', 'mm-bashamichi', 'mm-nihon-odori', 'mm-motomachi-chukagai',
      ],
    },
    {
      id: 'ltd-express', name: '特急', color: '#FF6600', textColor: '#ffffff',
      note: '東急東横線直通',
      stops: ['mm-yokohama', 'mm-minatomirai', 'mm-motomachi-chukagai'],
    },
  ],
}
