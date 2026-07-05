import type { RideableLine, Station } from './types'

// 東急田園都市線 — 駅番号昇順（渋谷 DT01 → 中央林間 DT27）
const STATIONS: Station[] = [
  {
    id: 'dt-shibuya', name: '渋谷', kana: 'しぶや', en: 'Shibuya', number: 'DT01',
    transfers: [
      { line: 'yamanote' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'ginza' }, { line: 'hanzomon' }, { line: 'fukutoshin' },
      { line: 'toyoko' }, { line: 'inokashira' },
    ],
  },
  {
    id: 'dt-ikejiri-ohashi', name: '池尻大橋', kana: 'いけじりおおはし', en: 'Ikejiri-ohashi', number: 'DT02',
    transfers: [],
  },
  {
    id: 'dt-sangen-jaya', name: '三軒茶屋', kana: 'さんげんぢゃや', en: 'Sangen-jaya', number: 'DT03',
    transfers: [{ line: 'setagaya' }],
  },
  {
    id: 'dt-komazawa-daigaku', name: '駒沢大学', kana: 'こまざわだいがく', en: 'Komazawa-daigaku', number: 'DT04',
    transfers: [],
  },
  {
    id: 'dt-sakura-shimmachi', name: '桜新町', kana: 'さくらしんまち', en: 'Sakura-shimmachi', number: 'DT05',
    transfers: [],
  },
  {
    id: 'dt-yoga', name: '用賀', kana: 'ようが', en: 'Yoga', number: 'DT06',
    transfers: [],
  },
  {
    id: 'dt-futako-tamagawa', name: '二子玉川', kana: 'ふたこたまがわ', en: 'Futako-tamagawa', number: 'DT07',
    transfers: [{ line: 'oimachi' }],
  },
  {
    id: 'dt-futako-shinchi', name: '二子新地', kana: 'ふたこしんち', en: 'Futako-shinchi', number: 'DT08',
    transfers: [],
  },
  {
    id: 'dt-takatsu', name: '高津', kana: 'たかつ', en: 'Takatsu', number: 'DT09',
    transfers: [],
  },
  {
    id: 'dt-mizonokuchi', name: '溝の口', kana: 'みぞのくち', en: 'Mizonokuchi', number: 'DT10',
    transfers: [{ line: 'oimachi' }, { line: 'nambu', at: '武蔵溝ノ口駅' }],
  },
  {
    id: 'dt-kajigaya', name: '梶が谷', kana: 'かじがや', en: 'Kajigaya', number: 'DT11',
    transfers: [],
  },
  {
    id: 'dt-miyazakidai', name: '宮崎台', kana: 'みやざきだい', en: 'Miyazakidai', number: 'DT12',
    transfers: [],
  },
  {
    id: 'dt-miyamaedaira', name: '宮前平', kana: 'みやまえだいら', en: 'Miyamaedaira', number: 'DT13',
    transfers: [],
  },
  {
    id: 'dt-saginuma', name: '鷺沼', kana: 'さぎぬま', en: 'Saginuma', number: 'DT14',
    transfers: [],
  },
  {
    id: 'dt-tama-plaza', name: 'たまプラーザ', kana: 'たまぷらーざ', en: 'Tama-plaza', number: 'DT15',
    transfers: [],
  },
  {
    id: 'dt-azamino', name: 'あざみ野', kana: 'あざみの', en: 'Azamino', number: 'DT16',
    transfers: [{ line: 'blueLine' }],
  },
  {
    id: 'dt-eda', name: '江田', kana: 'えだ', en: 'Eda', number: 'DT17',
    transfers: [],
  },
  {
    id: 'dt-ichigao', name: '市が尾', kana: 'いちがお', en: 'Ichigao', number: 'DT18',
    transfers: [],
  },
  {
    id: 'dt-fujigaoka', name: '藤が丘', kana: 'ふじがおか', en: 'Fujigaoka', number: 'DT19',
    transfers: [],
  },
  {
    id: 'dt-aobadai', name: '青葉台', kana: 'あおばだい', en: 'Aobadai', number: 'DT20',
    transfers: [],
  },
  {
    id: 'dt-tana', name: '田奈', kana: 'たな', en: 'Tana', number: 'DT21',
    transfers: [],
  },
  {
    id: 'dt-nagatsuta', name: '長津田', kana: 'ながつた', en: 'Nagatsuta', number: 'DT22',
    transfers: [{ line: 'yokohamaLine' }, { line: 'kodomonokuni' }],
  },
  {
    id: 'dt-tsukushino', name: 'つくし野', kana: 'つくしの', en: 'Tsukushino', number: 'DT23',
    transfers: [],
  },
  {
    id: 'dt-suzukakedai', name: 'すずかけ台', kana: 'すずかけだい', en: 'Suzukakedai', number: 'DT24',
    transfers: [],
  },
  {
    id: 'dt-minami-machida-grandberry-park', name: '南町田グランベリーパーク', kana: 'みなみまちだぐらんべりーぱーく', en: 'Minami-machida Grandberry Park', number: 'DT25',
    transfers: [],
  },
  {
    id: 'dt-tsukimino', name: 'つきみ野', kana: 'つきみの', en: 'Tsukimino', number: 'DT26',
    transfers: [],
  },
  {
    id: 'dt-chuo-rinkan', name: '中央林間', kana: 'ちゅうおうりんかん', en: 'Chuo-rinkan', number: 'DT27',
    transfers: [{ line: 'odakyu' }],
  },
]

export const DENENTOSHI_LINE: RideableLine = {
  name: '東急田園都市線',
  symbol: 'DT',
  color: '#00A040',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'local', name: '各駅停車', color: '#64748B', textColor: '#ffffff',
      stops: 'all',
    },
    {
      id: 'semi-express', name: '準急', color: '#0068B7', textColor: '#ffffff',
      note: '二子玉川から先は各駅にとまる',
      stops: [
        'dt-shibuya', 'dt-sangen-jaya', 'dt-futako-tamagawa', 'dt-mizonokuchi',
        'dt-kajigaya', 'dt-miyazakidai', 'dt-miyamaedaira', 'dt-saginuma',
        'dt-tama-plaza', 'dt-azamino', 'dt-eda', 'dt-ichigao', 'dt-fujigaoka',
        'dt-aobadai', 'dt-tana', 'dt-nagatsuta', 'dt-tsukushino', 'dt-suzukakedai',
        'dt-minami-machida-grandberry-park', 'dt-tsukimino', 'dt-chuo-rinkan',
      ],
    },
    {
      id: 'express', name: '急行', color: '#E7211A', textColor: '#ffffff',
      stops: [
        'dt-shibuya', 'dt-sangen-jaya', 'dt-futako-tamagawa', 'dt-mizonokuchi',
        'dt-saginuma', 'dt-tama-plaza', 'dt-azamino', 'dt-aobadai',
        'dt-nagatsuta', 'dt-minami-machida-grandberry-park', 'dt-chuo-rinkan',
      ],
    },
  ],
}
