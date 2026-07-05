import type { RideableLine, Station } from './types'

// 京急本線 — 駅番号昇順（品川 KK01 → 横浜 KK37）
// KK12〜17 は空港線、KK21〜26 は大師線のため欠番
const STATIONS: Station[] = [
  {
    id: 'kk-shinagawa', name: '品川', kana: 'しながわ', en: 'Shinagawa', number: 'KK01',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'tokaido' },
      { line: 'uenoTokyo' }, { line: 'yokosukaSobu' }, { line: 'tokaidoShinkansen' },
    ],
  },
  {
    id: 'kk-kita-shinagawa', name: '北品川', kana: 'きたしながわ', en: 'Kita-shinagawa', number: 'KK02',
    transfers: [],
  },
  {
    id: 'kk-shimbamba', name: '新馬場', kana: 'しんばんば', en: 'Shimbamba', number: 'KK03',
    transfers: [],
  },
  {
    id: 'kk-aomono-yokocho', name: '青物横丁', kana: 'あおものよこちょう', en: 'Aomono-yokocho', number: 'KK04',
    transfers: [],
  },
  {
    id: 'kk-samezu', name: '鮫洲', kana: 'さめず', en: 'Samezu', number: 'KK05',
    transfers: [],
  },
  {
    id: 'kk-tachiaigawa', name: '立会川', kana: 'たちあいがわ', en: 'Tachiaigawa', number: 'KK06',
    transfers: [],
  },
  {
    id: 'kk-omorikaigan', name: '大森海岸', kana: 'おおもりかいがん', en: 'Omorikaigan', number: 'KK07',
    transfers: [],
  },
  {
    id: 'kk-heiwajima', name: '平和島', kana: 'へいわじま', en: 'Heiwajima', number: 'KK08',
    transfers: [],
  },
  {
    id: 'kk-omorimachi', name: '大森町', kana: 'おおもりまち', en: 'Omorimachi', number: 'KK09',
    transfers: [],
  },
  {
    id: 'kk-umeyashiki', name: '梅屋敷', kana: 'うめやしき', en: 'Umeyashiki', number: 'KK10',
    transfers: [],
  },
  {
    id: 'kk-keikyu-kamata', name: '京急蒲田', kana: 'けいきゅうかまた', en: 'Keikyu Kamata', number: 'KK11',
    transfers: [{ line: 'keikyuAirport' }],
  },
  {
    id: 'kk-zoshiki', name: '雑色', kana: 'ぞうしき', en: 'Zoshiki', number: 'KK18',
    transfers: [],
  },
  {
    id: 'kk-rokugodote', name: '六郷土手', kana: 'ろくごうどて', en: 'Rokugodote', number: 'KK19',
    transfers: [],
  },
  {
    id: 'kk-keikyu-kawasaki', name: '京急川崎', kana: 'けいきゅうかわさき', en: 'Keikyu Kawasaki', number: 'KK20',
    transfers: [
      { line: 'keikyuDaishi' },
      { line: 'tokaido', at: '川崎駅' }, { line: 'keihinTohoku', at: '川崎駅' }, { line: 'nambu', at: '川崎駅' },
    ],
  },
  {
    id: 'kk-hatchonawate', name: '八丁畷', kana: 'はっちょうなわて', en: 'Hatchonawate', number: 'KK27',
    transfers: [{ line: 'nambu' }],
  },
  {
    id: 'kk-tsurumi-ichiba', name: '鶴見市場', kana: 'つるみいちば', en: 'Tsurumi-ichiba', number: 'KK28',
    transfers: [],
  },
  {
    id: 'kk-keikyu-tsurumi', name: '京急鶴見', kana: 'けいきゅうつるみ', en: 'Keikyu Tsurumi', number: 'KK29',
    transfers: [{ line: 'keihinTohoku', at: '鶴見駅' }],
  },
  {
    id: 'kk-kagetsu-sojiji', name: '花月総持寺', kana: 'かげつそうじじ', en: 'Kagetsu-sojiji', number: 'KK30',
    transfers: [],
  },
  {
    id: 'kk-namamugi', name: '生麦', kana: 'なまむぎ', en: 'Namamugi', number: 'KK31',
    transfers: [],
  },
  {
    id: 'kk-keikyu-shin-koyasu', name: '京急新子安', kana: 'けいきゅうしんこやす', en: 'Keikyu Shin-koyasu', number: 'KK32',
    transfers: [],
  },
  {
    id: 'kk-koyasu', name: '子安', kana: 'こやす', en: 'Koyasu', number: 'KK33',
    transfers: [],
  },
  {
    id: 'kk-kanagawa-shimmachi', name: '神奈川新町', kana: 'かながわしんまち', en: 'Kanagawa-shimmachi', number: 'KK34',
    transfers: [],
  },
  {
    id: 'kk-keikyu-higashi-kanagawa', name: '京急東神奈川', kana: 'けいきゅうひがしかながわ', en: 'Keikyu Higashi-kanagawa', number: 'KK35',
    transfers: [
      { line: 'keihinTohoku', at: '東神奈川駅' }, { line: 'yokohamaLine', at: '東神奈川駅' },
    ],
  },
  {
    id: 'kk-kanagawa', name: '神奈川', kana: 'かながわ', en: 'Kanagawa', number: 'KK36',
    transfers: [],
  },
  {
    id: 'kk-yokohama', name: '横浜', kana: 'よこはま', en: 'Yokohama', number: 'KK37',
    transfers: [
      { line: 'toyoko' }, { line: 'minatomirai' }, { line: 'tokaido' },
      { line: 'yokosukaSobu' }, { line: 'keihinTohoku' }, { line: 'shonanShinjuku' },
      { line: 'yokohamaLine' }, { line: 'sotetsu' }, { line: 'blueLine' },
    ],
  },
]

export const KEIKYU_LINE: RideableLine = {
  name: '京急本線',
  symbol: 'KK',
  color: '#E60012',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'local', name: '普通', color: '#64748B', textColor: '#ffffff',
      stops: 'all',
    },
    {
      id: 'ltd-express', name: '特急', color: '#0068B7', textColor: '#ffffff',
      stops: [
        'kk-shinagawa', 'kk-aomono-yokocho', 'kk-tachiaigawa', 'kk-heiwajima',
        'kk-keikyu-kamata', 'kk-keikyu-kawasaki', 'kk-kanagawa-shimmachi', 'kk-yokohama',
      ],
    },
    {
      id: 'kaitoku', name: '快特', color: '#00A650', textColor: '#ffffff',
      stops: [
        'kk-shinagawa', 'kk-keikyu-kamata', 'kk-keikyu-kawasaki', 'kk-yokohama',
      ],
    },
  ],
}
