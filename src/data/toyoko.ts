import type { RideableLine, Station } from './types'

// 東急東横線 — 駅番号昇順（渋谷 TY01 → 横浜 TY21）
const STATIONS: Station[] = [
  {
    id: 'ty-shibuya', name: '渋谷', kana: 'しぶや', en: 'Shibuya', number: 'TY01',
    transfers: [
      { line: 'yamanote' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'ginza' }, { line: 'hanzomon' }, { line: 'fukutoshin' },
      { line: 'denentoshi' }, { line: 'inokashira' },
    ],
  },
  {
    id: 'ty-daikan-yama', name: '代官山', kana: 'だいかんやま', en: 'Daikan-yama', number: 'TY02',
    transfers: [],
  },
  {
    id: 'ty-naka-meguro', name: '中目黒', kana: 'なかめぐろ', en: 'Naka-meguro', number: 'TY03',
    transfers: [{ line: 'hibiya' }],
  },
  {
    id: 'ty-yutenji', name: '祐天寺', kana: 'ゆうてんじ', en: 'Yutenji', number: 'TY04',
    transfers: [],
  },
  {
    id: 'ty-gakugei-daigaku', name: '学芸大学', kana: 'がくげいだいがく', en: 'Gakugei-daigaku', number: 'TY05',
    transfers: [],
  },
  {
    id: 'ty-toritsu-daigaku', name: '都立大学', kana: 'とりつだいがく', en: 'Toritsu-daigaku', number: 'TY06',
    transfers: [],
  },
  {
    id: 'ty-jiyugaoka', name: '自由が丘', kana: 'じゆうがおか', en: 'Jiyugaoka', number: 'TY07',
    transfers: [{ line: 'oimachi' }],
  },
  {
    id: 'ty-den-en-chofu', name: '田園調布', kana: 'でんえんちょうふ', en: 'Den-en-chofu', number: 'TY08',
    transfers: [{ line: 'tokyuMeguro' }],
  },
  {
    id: 'ty-tamagawa', name: '多摩川', kana: 'たまがわ', en: 'Tamagawa', number: 'TY09',
    transfers: [{ line: 'tokyuMeguro' }, { line: 'tokyuTamagawa' }],
  },
  {
    id: 'ty-shin-maruko', name: '新丸子', kana: 'しんまるこ', en: 'Shin-maruko', number: 'TY10',
    transfers: [{ line: 'tokyuMeguro' }],
  },
  {
    id: 'ty-musashi-kosugi', name: '武蔵小杉', kana: 'むさしこすぎ', en: 'Musashi-kosugi', number: 'TY11',
    transfers: [
      { line: 'tokyuMeguro' }, { line: 'yokosukaSobu' }, { line: 'shonanShinjuku' }, { line: 'nambu' },
    ],
  },
  {
    id: 'ty-motosumiyoshi', name: '元住吉', kana: 'もとすみよし', en: 'Motosumiyoshi', number: 'TY12',
    transfers: [{ line: 'tokyuMeguro' }],
  },
  {
    id: 'ty-hiyoshi', name: '日吉', kana: 'ひよし', en: 'Hiyoshi', number: 'TY13',
    transfers: [{ line: 'tokyuMeguro' }, { line: 'greenLine' }],
  },
  {
    id: 'ty-tsunashima', name: '綱島', kana: 'つなしま', en: 'Tsunashima', number: 'TY14',
    transfers: [],
  },
  {
    id: 'ty-okurayama', name: '大倉山', kana: 'おおくらやま', en: 'Okurayama', number: 'TY15',
    transfers: [],
  },
  {
    id: 'ty-kikuna', name: '菊名', kana: 'きくな', en: 'Kikuna', number: 'TY16',
    transfers: [{ line: 'yokohamaLine' }],
  },
  {
    id: 'ty-myorenji', name: '妙蓮寺', kana: 'みょうれんじ', en: 'Myorenji', number: 'TY17',
    transfers: [],
  },
  {
    id: 'ty-hakuraku', name: '白楽', kana: 'はくらく', en: 'Hakuraku', number: 'TY18',
    transfers: [],
  },
  {
    id: 'ty-higashi-hakuraku', name: '東白楽', kana: 'ひがしはくらく', en: 'Higashi-hakuraku', number: 'TY19',
    transfers: [],
  },
  {
    id: 'ty-tammachi', name: '反町', kana: 'たんまち', en: 'Tammachi', number: 'TY20',
    transfers: [],
  },
  {
    id: 'ty-yokohama', name: '横浜', kana: 'よこはま', en: 'Yokohama', number: 'TY21',
    transfers: [
      { line: 'tokaido' }, { line: 'yokosukaSobu' }, { line: 'keihinTohoku' },
      { line: 'shonanShinjuku' }, { line: 'yokohamaLine' },
      { line: 'keikyu' }, { line: 'sotetsu' }, { line: 'minatomirai' }, { line: 'blueLine' },
    ],
  },
]

export const TOYOKO_LINE: RideableLine = {
  name: '東急東横線',
  symbol: 'TY',
  color: '#DA0442',
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
        'ty-shibuya', 'ty-naka-meguro', 'ty-gakugei-daigaku', 'ty-jiyugaoka',
        'ty-den-en-chofu', 'ty-tamagawa', 'ty-musashi-kosugi', 'ty-hiyoshi',
        'ty-tsunashima', 'ty-kikuna', 'ty-yokohama',
      ],
    },
    {
      id: 'commuter-ltd-express', name: '通勤特急', color: '#0068B7', textColor: '#ffffff',
      note: '平日の朝夕のみ運転',
      stops: [
        'ty-shibuya', 'ty-naka-meguro', 'ty-jiyugaoka', 'ty-musashi-kosugi',
        'ty-hiyoshi', 'ty-kikuna', 'ty-yokohama',
      ],
    },
    {
      id: 'ltd-express', name: '特急', color: '#FF6600', textColor: '#ffffff',
      stops: [
        'ty-shibuya', 'ty-naka-meguro', 'ty-jiyugaoka', 'ty-musashi-kosugi',
        'ty-kikuna', 'ty-yokohama',
      ],
    },
  ],
}
