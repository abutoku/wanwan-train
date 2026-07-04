import type { RideableLine, Station } from './types'

// JR中央線(快速) — 駅番号昇順（東京 JC01 → 高尾 JC24）
const STATIONS: Station[] = [
  {
    id: 'jc-tokyo', name: '東京', kana: 'とうきょう', en: 'Tokyo', number: 'JC01',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'tokaido' },
      { line: 'uenoTokyo' }, { line: 'yokosukaSobu' }, { line: 'keiyo' },
      { line: 'tokaidoShinkansen' }, { line: 'tohokuShinkansen' }, { line: 'marunouchi' },
    ],
  },
  {
    id: 'jc-kanda', name: '神田', kana: 'かんだ', en: 'Kanda', number: 'JC02',
    transfers: [{ line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'ginza' }],
  },
  {
    id: 'jc-ochanomizu', name: '御茶ノ水', kana: 'おちゃのみず', en: 'Ochanomizu', number: 'JC03',
    transfers: [
      { line: 'sobuLocal' }, { line: 'marunouchi' }, { line: 'chiyoda', at: '新御茶ノ水駅' },
    ],
  },
  {
    id: 'jc-yotsuya', name: '四ツ谷', kana: 'よつや', en: 'Yotsuya', number: 'JC04',
    transfers: [{ line: 'sobuLocal' }, { line: 'marunouchi' }, { line: 'namboku' }],
  },
  {
    id: 'jc-shinjuku', name: '新宿', kana: 'しんじゅく', en: 'Shinjuku', number: 'JC05',
    transfers: [
      { line: 'yamanote' }, { line: 'sobuLocal' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'marunouchi' }, { line: 'toeiShinjuku' }, { line: 'oedo' },
      { line: 'keio' }, { line: 'odakyu' },
    ],
  },
  {
    id: 'jc-nakano', name: '中野', kana: 'なかの', en: 'Nakano', number: 'JC06',
    transfers: [{ line: 'sobuLocal' }, { line: 'tozai' }],
  },
  {
    id: 'jc-koenji', name: '高円寺', kana: 'こうえんじ', en: 'Koenji', number: 'JC07',
    transfers: [{ line: 'sobuLocal' }],
  },
  {
    id: 'jc-asagaya', name: '阿佐ケ谷', kana: 'あさがや', en: 'Asagaya', number: 'JC08',
    transfers: [{ line: 'sobuLocal' }],
  },
  {
    id: 'jc-ogikubo', name: '荻窪', kana: 'おぎくぼ', en: 'Ogikubo', number: 'JC09',
    transfers: [{ line: 'sobuLocal' }, { line: 'marunouchi' }],
  },
  {
    id: 'jc-nishi-ogikubo', name: '西荻窪', kana: 'にしおぎくぼ', en: 'Nishi-Ogikubo', number: 'JC10',
    transfers: [{ line: 'sobuLocal' }],
  },
  {
    id: 'jc-kichijoji', name: '吉祥寺', kana: 'きちじょうじ', en: 'Kichijoji', number: 'JC11',
    transfers: [{ line: 'sobuLocal' }, { line: 'inokashira' }],
  },
  {
    id: 'jc-mitaka', name: '三鷹', kana: 'みたか', en: 'Mitaka', number: 'JC12',
    transfers: [{ line: 'sobuLocal' }],
  },
  {
    id: 'jc-musashi-sakai', name: '武蔵境', kana: 'むさしさかい', en: 'Musashi-Sakai', number: 'JC13',
    transfers: [],
  },
  {
    id: 'jc-higashi-koganei', name: '東小金井', kana: 'ひがしこがねい', en: 'Higashi-Koganei', number: 'JC14',
    transfers: [],
  },
  {
    id: 'jc-musashi-koganei', name: '武蔵小金井', kana: 'むさしこがねい', en: 'Musashi-Koganei', number: 'JC15',
    transfers: [],
  },
  {
    id: 'jc-kokubunji', name: '国分寺', kana: 'こくぶんじ', en: 'Kokubunji', number: 'JC16',
    transfers: [],
  },
  {
    id: 'jc-nishi-kokubunji', name: '西国分寺', kana: 'にしこくぶんじ', en: 'Nishi-Kokubunji', number: 'JC17',
    transfers: [],
  },
  {
    id: 'jc-kunitachi', name: '国立', kana: 'くにたち', en: 'Kunitachi', number: 'JC18',
    transfers: [],
  },
  {
    id: 'jc-tachikawa', name: '立川', kana: 'たちかわ', en: 'Tachikawa', number: 'JC19',
    transfers: [{ line: 'oume' }, { line: 'nambu' }],
  },
  {
    id: 'jc-hino', name: '日野', kana: 'ひの', en: 'Hino', number: 'JC20',
    transfers: [],
  },
  {
    id: 'jc-toyoda', name: '豊田', kana: 'とよだ', en: 'Toyoda', number: 'JC21',
    transfers: [],
  },
  {
    id: 'jc-hachioji', name: '八王子', kana: 'はちおうじ', en: 'Hachioji', number: 'JC22',
    transfers: [{ line: 'yokohamaLine' }],
  },
  {
    id: 'jc-nishi-hachioji', name: '西八王子', kana: 'にしはちおうじ', en: 'Nishi-Hachioji', number: 'JC23',
    transfers: [],
  },
  {
    id: 'jc-takao', name: '高尾', kana: 'たかお', en: 'Takao', number: 'JC24',
    transfers: [{ line: 'keioTakao' }],
  },
]

// 中央特快の停車駅（立川から先は各駅にとまる）
const CHUO_SPECIAL_RAPID_STOPS = [
  'jc-tokyo', 'jc-kanda', 'jc-ochanomizu', 'jc-yotsuya', 'jc-shinjuku', 'jc-nakano',
  'jc-mitaka', 'jc-kokubunji', 'jc-tachikawa', 'jc-hino', 'jc-toyoda',
  'jc-hachioji', 'jc-nishi-hachioji', 'jc-takao',
]

export const CHUO_LINE: RideableLine = {
  name: '中央線(快速)',
  symbol: 'JC',
  color: '#F15A22',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'rapid-weekday', name: '快速（平日）', color: '#F15A22', textColor: '#ffffff',
      stops: 'all',
    },
    {
      id: 'rapid-holiday', name: '快速（土休日）', color: '#F15A22', textColor: '#ffffff',
      note: '土休日は高円寺・阿佐ケ谷・西荻窪を通過します',
      stops: STATIONS.filter(
        (s) => !['jc-koenji', 'jc-asagaya', 'jc-nishi-ogikubo'].includes(s.id),
      ).map((s) => s.id),
    },
    {
      id: 'chuo-special-rapid', name: '中央特快', color: '#0075C2', textColor: '#ffffff',
      stops: CHUO_SPECIAL_RAPID_STOPS,
    },
    {
      id: 'commuter-special-rapid', name: '通勤特快', color: '#C4407D', textColor: '#ffffff',
      note: '平日の朝・東京方面のみ運転',
      stops: [
        'jc-takao', 'jc-hachioji', 'jc-tachikawa', 'jc-kokubunji',
        'jc-shinjuku', 'jc-yotsuya', 'jc-ochanomizu', 'jc-kanda', 'jc-tokyo',
      ],
    },
  ],
}
