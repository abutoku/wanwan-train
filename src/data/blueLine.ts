import type { RideableLine, Station } from './types'

// 横浜市営地下鉄ブルーライン（1号線・3号線） — 駅番号昇順（湘南台 B01 → あざみ野 B32）
const STATIONS: Station[] = [
  {
    id: 'bl-shonandai', name: '湘南台', kana: 'しょうなんだい', en: 'Shonandai', number: 'B01',
    transfers: [{ line: 'odakyu' }, { line: 'sotetsu' }],
  },
  {
    id: 'bl-shimo-iida', name: '下飯田', kana: 'しもいいだ', en: 'Shimo-iida', number: 'B02',
    transfers: [],
  },
  {
    id: 'bl-tateba', name: '立場', kana: 'たてば', en: 'Tateba', number: 'B03',
    transfers: [],
  },
  {
    id: 'bl-nakata', name: '中田', kana: 'なかた', en: 'Nakata', number: 'B04',
    transfers: [],
  },
  {
    id: 'bl-odoriba', name: '踊場', kana: 'おどりば', en: 'Odoriba', number: 'B05',
    transfers: [],
  },
  {
    id: 'bl-totsuka', name: '戸塚', kana: 'とつか', en: 'Totsuka', number: 'B06',
    transfers: [{ line: 'tokaido' }, { line: 'yokosukaSobu' }, { line: 'shonanShinjuku' }],
  },
  {
    id: 'bl-maioka', name: '舞岡', kana: 'まいおか', en: 'Maioka', number: 'B07',
    transfers: [],
  },
  {
    id: 'bl-shimo-nagaya', name: '下永谷', kana: 'しもながや', en: 'Shimo-nagaya', number: 'B08',
    transfers: [],
  },
  {
    id: 'bl-kami-nagaya', name: '上永谷', kana: 'かみながや', en: 'Kami-nagaya', number: 'B09',
    transfers: [],
  },
  {
    id: 'bl-konan-chuo', name: '港南中央', kana: 'こうなんちゅうおう', en: 'Konan-chuo', number: 'B10',
    transfers: [],
  },
  {
    id: 'bl-kamiooka', name: '上大岡', kana: 'かみおおおか', en: 'Kamiooka', number: 'B11',
    transfers: [{ line: 'keikyu' }],
  },
  {
    id: 'bl-gumyoji', name: '弘明寺', kana: 'ぐみょうじ', en: 'Gumyoji', number: 'B12',
    transfers: [],
  },
  {
    id: 'bl-maita', name: '蒔田', kana: 'まいた', en: 'Maita', number: 'B13',
    transfers: [],
  },
  {
    id: 'bl-yoshinocho', name: '吉野町', kana: 'よしのちょう', en: 'Yoshinocho', number: 'B14',
    transfers: [],
  },
  {
    id: 'bl-bandobashi', name: '阪東橋', kana: 'ばんどうばし', en: 'Bandobashi', number: 'B15',
    transfers: [],
  },
  {
    id: 'bl-isezaki-chojamachi', name: '伊勢佐木長者町', kana: 'いせざきちょうじゃまち', en: 'Isezaki-chojamachi', number: 'B16',
    transfers: [],
  },
  {
    id: 'bl-kannai', name: '関内', kana: 'かんない', en: 'Kannai', number: 'B17',
    transfers: [{ line: 'keihinTohoku' }],
  },
  {
    id: 'bl-sakuragicho', name: '桜木町', kana: 'さくらぎちょう', en: 'Sakuragicho', number: 'B18',
    transfers: [{ line: 'keihinTohoku' }],
  },
  {
    id: 'bl-takashimacho', name: '高島町', kana: 'たかしまちょう', en: 'Takashimacho', number: 'B19',
    transfers: [],
  },
  {
    id: 'bl-yokohama', name: '横浜', kana: 'よこはま', en: 'Yokohama', number: 'B20',
    transfers: [
      { line: 'keihinTohoku' }, { line: 'tokaido' }, { line: 'yokosukaSobu' },
      { line: 'shonanShinjuku' }, { line: 'toyoko' }, { line: 'minatomirai' },
      { line: 'keikyu' }, { line: 'sotetsu' },
    ],
  },
  {
    id: 'bl-mitsuzawa-shimocho', name: '三ツ沢下町', kana: 'みつざわしもちょう', en: 'Mitsuzawa-shimocho', number: 'B21',
    transfers: [],
  },
  {
    id: 'bl-mitsuzawa-kamicho', name: '三ツ沢上町', kana: 'みつざわかみちょう', en: 'Mitsuzawa-kamicho', number: 'B22',
    transfers: [],
  },
  {
    id: 'bl-katakuracho', name: '片倉町', kana: 'かたくらちょう', en: 'Katakuracho', number: 'B23',
    transfers: [],
  },
  {
    id: 'bl-kishine-koen', name: '岸根公園', kana: 'きしねこうえん', en: 'Kishine-koen', number: 'B24',
    transfers: [],
  },
  {
    id: 'bl-shin-yokohama', name: '新横浜', kana: 'しんよこはま', en: 'Shin-yokohama', number: 'B25',
    transfers: [{ line: 'yokohamaLine' }, { line: 'tokaidoShinkansen' }],
  },
  {
    id: 'bl-kita-shin-yokohama', name: '北新横浜', kana: 'きたしんよこはま', en: 'Kita-shin-yokohama', number: 'B26',
    transfers: [],
  },
  {
    id: 'bl-nippa', name: '新羽', kana: 'にっぱ', en: 'Nippa', number: 'B27',
    transfers: [],
  },
  {
    id: 'bl-nakamachidai', name: '仲町台', kana: 'なかまちだい', en: 'Nakamachidai', number: 'B28',
    transfers: [],
  },
  {
    id: 'bl-center-minami', name: 'センター南', kana: 'センターみなみ', en: 'Center-minami', number: 'B29',
    transfers: [{ line: 'greenLine' }],
  },
  {
    id: 'bl-center-kita', name: 'センター北', kana: 'センターきた', en: 'Center-kita', number: 'B30',
    transfers: [{ line: 'greenLine' }],
  },
  {
    id: 'bl-nakagawa', name: '中川', kana: 'なかがわ', en: 'Nakagawa', number: 'B31',
    transfers: [],
  },
  {
    id: 'bl-azamino', name: 'あざみ野', kana: 'あざみの', en: 'Azamino', number: 'B32',
    transfers: [{ line: 'denentoshi' }],
  },
]

export const BLUE_LINE: RideableLine = {
  name: '横浜市営ブルーライン',
  symbol: 'B',
  color: '#006CB6',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'local', name: '各駅停車', color: '#64748B', textColor: '#ffffff',
      stops: 'all',
    },
    {
      id: 'rapid', name: '快速', color: '#E7211A', textColor: '#ffffff',
      note: '日中時間帯に運転',
      stops: [
        'bl-shonandai', 'bl-totsuka', 'bl-kami-nagaya', 'bl-kamiooka', 'bl-kannai',
        'bl-sakuragicho', 'bl-yokohama', 'bl-shin-yokohama', 'bl-center-minami',
        'bl-center-kita', 'bl-azamino',
      ],
    },
  ],
}
