import type { RideableLine, Station } from './types'

// 東京メトロ副都心線 — 駅番号昇順（和光市 F01 → 渋谷 F16）
const STATIONS: Station[] = [
  {
    id: 'f-wakoshi', name: '和光市', kana: 'わこうし', en: 'Wakoshi', number: 'F01',
    transfers: [{ line: 'tobuTojo' }, { line: 'yurakuchoLine' }],
  },
  {
    id: 'f-chikatetsu-narimasu', name: '地下鉄成増', kana: 'ちかてつなります', en: 'Chikatetsu-narimasu', number: 'F02',
    transfers: [{ line: 'yurakuchoLine' }, { line: 'tobuTojo', at: '成増駅' }],
  },
  {
    id: 'f-chikatetsu-akatsuka', name: '地下鉄赤塚', kana: 'ちかてつあかつか', en: 'Chikatetsu-akatsuka', number: 'F03',
    transfers: [{ line: 'yurakuchoLine' }, { line: 'tobuTojo', at: '下赤塚駅' }],
  },
  {
    id: 'f-heiwadai', name: '平和台', kana: 'へいわだい', en: 'Heiwadai', number: 'F04',
    transfers: [{ line: 'yurakuchoLine' }],
  },
  {
    id: 'f-hikawadai', name: '氷川台', kana: 'ひかわだい', en: 'Hikawadai', number: 'F05',
    transfers: [{ line: 'yurakuchoLine' }],
  },
  {
    id: 'f-kotake-mukaihara', name: '小竹向原', kana: 'こたけむかいはら', en: 'Kotake-mukaihara', number: 'F06',
    transfers: [{ line: 'yurakuchoLine' }, { line: 'seibuIkebukuro' }],
  },
  {
    id: 'f-senkawa', name: '千川', kana: 'せんかわ', en: 'Senkawa', number: 'F07',
    transfers: [{ line: 'yurakuchoLine' }],
  },
  {
    id: 'f-kanamecho', name: '要町', kana: 'かなめちょう', en: 'Kanamecho', number: 'F08',
    transfers: [{ line: 'yurakuchoLine' }],
  },
  {
    id: 'f-ikebukuro', name: '池袋', kana: 'いけぶくろ', en: 'Ikebukuro', number: 'F09',
    transfers: [
      { line: 'yamanote' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'marunouchi' }, { line: 'yurakuchoLine' },
      { line: 'tobuTojo' }, { line: 'seibuIkebukuro' },
    ],
  },
  {
    id: 'f-zoshigaya', name: '雑司が谷', kana: 'ぞうしがや', en: 'Zoshigaya', number: 'F10',
    transfers: [{ line: 'toden', at: '鬼子母神前' }],
  },
  {
    id: 'f-nishi-waseda', name: '西早稲田', kana: 'にしわせだ', en: 'Nishi-waseda', number: 'F11',
    transfers: [],
  },
  {
    id: 'f-higashi-shinjuku', name: '東新宿', kana: 'ひがししんじゅく', en: 'Higashi-shinjuku', number: 'F12',
    transfers: [{ line: 'oedo' }],
  },
  {
    id: 'f-shinjuku-sanchome', name: '新宿三丁目', kana: 'しんじゅくさんちょうめ', en: 'Shinjuku-sanchome', number: 'F13',
    transfers: [{ line: 'marunouchi' }, { line: 'toeiShinjuku' }],
  },
  {
    id: 'f-kita-sando', name: '北参道', kana: 'きたさんどう', en: 'Kita-sando', number: 'F14',
    transfers: [],
  },
  {
    id: 'f-meiji-jingumae', name: '明治神宮前', kana: 'めいじじんぐうまえ', en: 'Meiji-jingumae', number: 'F15',
    transfers: [{ line: 'chiyoda' }, { line: 'yamanote', at: '原宿駅' }],
  },
  {
    id: 'f-shibuya', name: '渋谷', kana: 'しぶや', en: 'Shibuya', number: 'F16',
    transfers: [
      { line: 'yamanote' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'ginza' }, { line: 'hanzomon' },
      { line: 'toyoko' }, { line: 'denentoshi' }, { line: 'inokashira' },
    ],
  },
]

export const FUKUTOSHIN_LINE: RideableLine = {
  name: '東京メトロ副都心線',
  symbol: 'F',
  color: '#9C5E31',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'local', name: '各駅停車', color: '#64748B', textColor: '#ffffff',
      stops: 'all',
    },
    {
      id: 'commuter-express', name: '通勤急行', color: '#0068B7', textColor: '#ffffff',
      note: '平日朝夕のみ運転',
      stops: [
        'f-wakoshi', 'f-chikatetsu-narimasu', 'f-chikatetsu-akatsuka', 'f-heiwadai',
        'f-hikawadai', 'f-kotake-mukaihara', 'f-ikebukuro', 'f-shinjuku-sanchome', 'f-shibuya',
      ],
    },
    {
      id: 'express', name: '急行', color: '#E7211A', textColor: '#ffffff',
      note: '土休日は明治神宮前にも停車',
      stops: [
        'f-wakoshi', 'f-kotake-mukaihara', 'f-ikebukuro', 'f-shinjuku-sanchome', 'f-shibuya',
      ],
    },
  ],
}
