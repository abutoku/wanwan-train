import type { RideableLine, Station } from './types'

// JR湘南新宿ライン — 駅番号昇順（大船 JS09 → 大宮 JS24）
const STATIONS: Station[] = [
  {
    id: 'js-ofuna', name: '大船', kana: 'おおふな', en: 'Ofuna', number: 'JS09',
    transfers: [
      { line: 'tokaido' }, { line: 'yokosukaSobu' }, { line: 'keihinTohoku' }, { line: 'shonanMonorail' },
    ],
  },
  {
    id: 'js-totsuka', name: '戸塚', kana: 'とつか', en: 'Totsuka', number: 'JS10',
    transfers: [{ line: 'tokaido' }, { line: 'yokosukaSobu' }, { line: 'blueLine' }],
  },
  {
    id: 'js-higashi-totsuka', name: '東戸塚', kana: 'ひがしとつか', en: 'Higashi-Totsuka', number: 'JS11',
    transfers: [{ line: 'yokosukaSobu' }],
  },
  {
    id: 'js-hodogaya', name: '保土ケ谷', kana: 'ほどがや', en: 'Hodogaya', number: 'JS12',
    transfers: [{ line: 'yokosukaSobu' }],
  },
  {
    id: 'js-yokohama', name: '横浜', kana: 'よこはま', en: 'Yokohama', number: 'JS13',
    transfers: [
      { line: 'tokaido' }, { line: 'yokosukaSobu' }, { line: 'keihinTohoku' },
      { line: 'yokohamaLine' }, { line: 'toyoko' }, { line: 'minatomirai' },
      { line: 'keikyu' }, { line: 'sotetsu' }, { line: 'blueLine' },
    ],
  },
  {
    id: 'js-shin-kawasaki', name: '新川崎', kana: 'しんかわさき', en: 'Shin-Kawasaki', number: 'JS14',
    transfers: [{ line: 'yokosukaSobu' }],
  },
  {
    id: 'js-musashi-kosugi', name: '武蔵小杉', kana: 'むさしこすぎ', en: 'Musashi-Kosugi', number: 'JS15',
    transfers: [
      { line: 'yokosukaSobu' }, { line: 'toyoko' }, { line: 'tokyuMeguro' }, { line: 'nambu' },
    ],
  },
  {
    id: 'js-nishi-oi', name: '西大井', kana: 'にしおおい', en: 'Nishi-Oi', number: 'JS16',
    transfers: [{ line: 'yokosukaSobu' }],
  },
  {
    id: 'js-osaki', name: '大崎', kana: 'おおさき', en: 'Osaki', number: 'JS17',
    transfers: [{ line: 'yamanote' }, { line: 'saikyo' }, { line: 'rinkai' }],
  },
  {
    id: 'js-ebisu', name: '恵比寿', kana: 'えびす', en: 'Ebisu', number: 'JS18',
    transfers: [{ line: 'yamanote' }, { line: 'saikyo' }, { line: 'hibiya' }],
  },
  {
    id: 'js-shibuya', name: '渋谷', kana: 'しぶや', en: 'Shibuya', number: 'JS19',
    transfers: [
      { line: 'yamanote' }, { line: 'saikyo' }, { line: 'ginza' },
      { line: 'hanzomon' }, { line: 'fukutoshin' },
      { line: 'toyoko' }, { line: 'denentoshi' }, { line: 'inokashira' },
    ],
  },
  {
    id: 'js-shinjuku', name: '新宿', kana: 'しんじゅく', en: 'Shinjuku', number: 'JS20',
    transfers: [
      { line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'sobuLocal' }, { line: 'saikyo' },
      { line: 'marunouchi' }, { line: 'toeiShinjuku' }, { line: 'oedo' },
      { line: 'keio' }, { line: 'odakyu' },
    ],
  },
  {
    id: 'js-ikebukuro', name: '池袋', kana: 'いけぶくろ', en: 'Ikebukuro', number: 'JS21',
    transfers: [
      { line: 'yamanote' }, { line: 'saikyo' }, { line: 'marunouchi' },
      { line: 'yurakuchoLine' }, { line: 'fukutoshin' },
      { line: 'tobuTojo' }, { line: 'seibuIkebukuro' },
    ],
  },
  {
    id: 'js-akabane', name: '赤羽', kana: 'あかばね', en: 'Akabane', number: 'JS22',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'saikyo' }, { line: 'utsunomiyaTakasaki' }, { line: 'uenoTokyo' },
    ],
  },
  {
    id: 'js-urawa', name: '浦和', kana: 'うらわ', en: 'Urawa', number: 'JS23',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'utsunomiyaTakasaki' }, { line: 'uenoTokyo' },
    ],
  },
  {
    id: 'js-omiya', name: '大宮', kana: 'おおみや', en: 'Omiya', number: 'JS24',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'saikyo' }, { line: 'utsunomiyaTakasaki' },
      { line: 'uenoTokyo' }, { line: 'tohokuShinkansen' },
      { line: 'tobuUrbanPark' }, { line: 'newShuttle' },
    ],
  },
]

export const SHONAN_SHINJUKU_LINE: RideableLine = {
  name: 'JR湘南新宿ライン',
  symbol: 'JS',
  color: '#E21F26',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'local', name: '普通', color: '#64748B', textColor: '#ffffff',
      note: '横須賀線直通・逗子方面',
      stops: 'all',
    },
    {
      id: 'rapid', name: '快速', color: '#0068B7', textColor: '#ffffff',
      note: '東海道線直通',
      stops: [
        'js-ofuna', 'js-totsuka', 'js-yokohama', 'js-musashi-kosugi',
        'js-osaki', 'js-ebisu', 'js-shibuya', 'js-shinjuku', 'js-ikebukuro',
        'js-akabane', 'js-urawa', 'js-omiya',
      ],
    },
    {
      id: 'special-rapid', name: '特別快速', color: '#FF6600', textColor: '#ffffff',
      note: '東海道線直通。大船から先の停車駅が快速と異なる',
      stops: [
        'js-ofuna', 'js-totsuka', 'js-yokohama', 'js-musashi-kosugi',
        'js-osaki', 'js-ebisu', 'js-shibuya', 'js-shinjuku', 'js-ikebukuro',
        'js-akabane', 'js-urawa', 'js-omiya',
      ],
    },
  ],
}
