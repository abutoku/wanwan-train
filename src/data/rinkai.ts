import type { RideableLine, Station } from './types'

// りんかい線 — 駅番号昇順（新木場 R01 → 大崎 R08）
const STATIONS: Station[] = [
  {
    id: 'r-shin-kiba', name: '新木場', kana: 'しんきば', en: 'Shin-kiba', number: 'R01',
    transfers: [{ line: 'keiyo' }, { line: 'yurakuchoLine' }],
  },
  {
    id: 'r-shinonome', name: '東雲', kana: 'しののめ', en: 'Shinonome', number: 'R02',
    transfers: [],
  },
  {
    id: 'r-kokusai-tenjijo', name: '国際展示場', kana: 'こくさいてんじじょう', en: 'Kokusai-tenjijo', number: 'R03',
    transfers: [{ line: 'yurikamome', at: '有明駅' }],
  },
  {
    id: 'r-tokyo-teleport', name: '東京テレポート', kana: 'とうきょうテレポート', en: 'Tokyo Teleport', number: 'R04',
    transfers: [],
  },
  {
    id: 'r-tennozu-isle', name: '天王洲アイル', kana: 'てんのうずアイル', en: 'Tennozu Isle', number: 'R05',
    transfers: [{ line: 'monorail' }],
  },
  {
    id: 'r-shinagawa-seaside', name: '品川シーサイド', kana: 'しながわシーサイド', en: 'Shinagawa Seaside', number: 'R06',
    transfers: [],
  },
  {
    id: 'r-oimachi', name: '大井町', kana: 'おおいまち', en: 'Oimachi', number: 'R07',
    transfers: [{ line: 'keihinTohoku' }, { line: 'oimachi' }],
  },
  {
    id: 'r-osaki', name: '大崎', kana: 'おおさき', en: 'Osaki', number: 'R08',
    transfers: [{ line: 'yamanote' }, { line: 'saikyo' }, { line: 'shonanShinjuku' }],
  },
]

export const RINKAI_LINE: RideableLine = {
  name: 'りんかい線',
  symbol: 'R',
  color: '#00418E',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
}
