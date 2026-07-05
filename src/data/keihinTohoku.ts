import type { RideableLine, Station } from './types'

// JR京浜東北・根岸線 — 駅番号昇順（大船 JK01 → 大宮 JK47）
const STATIONS: Station[] = [
  {
    id: 'jk-ofuna', name: '大船', kana: 'おおふな', en: 'Ofuna', number: 'JK01',
    transfers: [
      { line: 'tokaido' }, { line: 'yokosukaSobu' }, { line: 'shonanShinjuku' }, { line: 'shonanMonorail' },
    ],
  },
  {
    id: 'jk-hongodai', name: '本郷台', kana: 'ほんごうだい', en: 'Hongodai', number: 'JK02',
    transfers: [],
  },
  {
    id: 'jk-konandai', name: '港南台', kana: 'こうなんだい', en: 'Konandai', number: 'JK03',
    transfers: [],
  },
  {
    id: 'jk-yokodai', name: '洋光台', kana: 'ようこうだい', en: 'Yokodai', number: 'JK04',
    transfers: [],
  },
  {
    id: 'jk-shin-sugita', name: '新杉田', kana: 'しんすぎた', en: 'Shin-Sugita', number: 'JK05',
    transfers: [{ line: 'seasideLine' }],
  },
  {
    id: 'jk-isogo', name: '磯子', kana: 'いそご', en: 'Isogo', number: 'JK06',
    transfers: [],
  },
  {
    id: 'jk-negishi', name: '根岸', kana: 'ねぎし', en: 'Negishi', number: 'JK07',
    transfers: [],
  },
  {
    id: 'jk-yamate', name: '山手', kana: 'やまて', en: 'Yamate', number: 'JK08',
    transfers: [],
  },
  {
    id: 'jk-ishikawacho', name: '石川町', kana: 'いしかわちょう', en: 'Ishikawacho', number: 'JK09',
    transfers: [],
  },
  {
    id: 'jk-kannai', name: '関内', kana: 'かんない', en: 'Kannai', number: 'JK10',
    transfers: [{ line: 'blueLine' }],
  },
  {
    id: 'jk-sakuragicho', name: '桜木町', kana: 'さくらぎちょう', en: 'Sakuragicho', number: 'JK11',
    transfers: [{ line: 'blueLine' }],
  },
  {
    id: 'jk-yokohama', name: '横浜', kana: 'よこはま', en: 'Yokohama', number: 'JK12',
    transfers: [
      { line: 'tokaido' }, { line: 'yokosukaSobu' }, { line: 'shonanShinjuku' },
      { line: 'yokohamaLine' }, { line: 'toyoko' }, { line: 'minatomirai' },
      { line: 'keikyu' }, { line: 'sotetsu' }, { line: 'blueLine' },
    ],
  },
  {
    id: 'jk-higashi-kanagawa', name: '東神奈川', kana: 'ひがしかながわ', en: 'Higashi-Kanagawa', number: 'JK13',
    transfers: [{ line: 'yokohamaLine' }, { line: 'keikyu', at: '京急東神奈川駅' }],
  },
  {
    id: 'jk-shin-koyasu', name: '新子安', kana: 'しんこやす', en: 'Shin-Koyasu', number: 'JK14',
    transfers: [],
  },
  {
    id: 'jk-tsurumi', name: '鶴見', kana: 'つるみ', en: 'Tsurumi', number: 'JK15',
    transfers: [{ line: 'keikyu', at: '京急鶴見駅' }],
  },
  {
    id: 'jk-kawasaki', name: '川崎', kana: 'かわさき', en: 'Kawasaki', number: 'JK16',
    transfers: [{ line: 'tokaido' }, { line: 'nambu' }, { line: 'keikyu', at: '京急川崎駅' }],
  },
  {
    id: 'jk-kamata', name: '蒲田', kana: 'かまた', en: 'Kamata', number: 'JK17',
    transfers: [{ line: 'tokyuTamagawa' }, { line: 'ikegami' }],
  },
  {
    id: 'jk-omori', name: '大森', kana: 'おおもり', en: 'Omori', number: 'JK18',
    transfers: [],
  },
  {
    id: 'jk-oimachi', name: '大井町', kana: 'おおいまち', en: 'Oimachi', number: 'JK19',
    transfers: [{ line: 'rinkai' }, { line: 'oimachi' }],
  },
  {
    id: 'jk-shinagawa', name: '品川', kana: 'しながわ', en: 'Shinagawa', number: 'JK20',
    transfers: [
      { line: 'yamanote' }, { line: 'tokaido' }, { line: 'uenoTokyo' },
      { line: 'yokosukaSobu' }, { line: 'tokaidoShinkansen' }, { line: 'keikyu' },
    ],
  },
  {
    id: 'jk-takanawa-gateway', name: '高輪ゲートウェイ', kana: 'たかなわゲートウェイ', en: 'Takanawa Gateway', number: 'JK21',
    transfers: [{ line: 'yamanote' }],
  },
  {
    id: 'jk-tamachi', name: '田町', kana: 'たまち', en: 'Tamachi', number: 'JK22',
    transfers: [
      { line: 'yamanote' },
      { line: 'asakusa', at: '三田駅' }, { line: 'mita', at: '三田駅' },
    ],
  },
  {
    id: 'jk-hamamatsucho', name: '浜松町', kana: 'はままつちょう', en: 'Hamamatsucho', number: 'JK23',
    transfers: [
      { line: 'yamanote' }, { line: 'monorail' },
      { line: 'asakusa', at: '大門駅' }, { line: 'oedo', at: '大門駅' },
    ],
  },
  {
    id: 'jk-shimbashi', name: '新橋', kana: 'しんばし', en: 'Shimbashi', number: 'JK24',
    transfers: [
      { line: 'yamanote' }, { line: 'tokaido' }, { line: 'uenoTokyo' },
      { line: 'yokosukaSobu' }, { line: 'ginza' }, { line: 'asakusa' }, { line: 'yurikamome' },
      { line: 'oedo', at: '汐留駅' },
    ],
  },
  {
    id: 'jk-yurakucho', name: '有楽町', kana: 'ゆうらくちょう', en: 'Yurakucho', number: 'JK25',
    transfers: [
      { line: 'yamanote' }, { line: 'yurakuchoLine' },
      { line: 'hibiya', at: '日比谷駅' }, { line: 'chiyoda', at: '日比谷駅' }, { line: 'mita', at: '日比谷駅' },
    ],
  },
  {
    id: 'jk-tokyo', name: '東京', kana: 'とうきょう', en: 'Tokyo', number: 'JK26',
    transfers: [
      { line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'tokaido' },
      { line: 'uenoTokyo' }, { line: 'yokosukaSobu' }, { line: 'keiyo' },
      { line: 'tokaidoShinkansen' }, { line: 'tohokuShinkansen' }, { line: 'marunouchi' },
      { line: 'hanzomon', at: '大手町駅' },
    ],
  },
  {
    id: 'jk-kanda', name: '神田', kana: 'かんだ', en: 'Kanda', number: 'JK27',
    transfers: [{ line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'ginza' }],
  },
  {
    id: 'jk-akihabara', name: '秋葉原', kana: 'あきはばら', en: 'Akihabara', number: 'JK28',
    transfers: [
      { line: 'yamanote' }, { line: 'sobuLocal' }, { line: 'hibiya' }, { line: 'tx' },
    ],
  },
  {
    id: 'jk-okachimachi', name: '御徒町', kana: 'おかちまち', en: 'Okachimachi', number: 'JK29',
    transfers: [
      { line: 'yamanote' },
      { line: 'ginza', at: '上野広小路駅' }, { line: 'hibiya', at: '仲御徒町駅' }, { line: 'oedo', at: '上野御徒町駅' },
    ],
  },
  {
    id: 'jk-ueno', name: '上野', kana: 'うえの', en: 'Ueno', number: 'JK30',
    transfers: [
      { line: 'yamanote' }, { line: 'utsunomiyaTakasaki' }, { line: 'joban' },
      { line: 'uenoTokyo' }, { line: 'tohokuShinkansen' },
      { line: 'ginza' }, { line: 'hibiya' }, { line: 'keisei', at: '京成上野駅' },
    ],
  },
  {
    id: 'jk-uguisudani', name: '鶯谷', kana: 'うぐいすだに', en: 'Uguisudani', number: 'JK31',
    transfers: [{ line: 'yamanote' }],
  },
  {
    id: 'jk-nippori', name: '日暮里', kana: 'にっぽり', en: 'Nippori', number: 'JK32',
    transfers: [
      { line: 'yamanote' }, { line: 'joban' }, { line: 'keisei' }, { line: 'nipporiToneri' },
    ],
  },
  {
    id: 'jk-nishi-nippori', name: '西日暮里', kana: 'にしにっぽり', en: 'Nishi-Nippori', number: 'JK33',
    transfers: [{ line: 'yamanote' }, { line: 'chiyoda' }, { line: 'nipporiToneri' }],
  },
  {
    id: 'jk-tabata', name: '田端', kana: 'たばた', en: 'Tabata', number: 'JK34',
    transfers: [{ line: 'yamanote' }],
  },
  {
    id: 'jk-kaminakazato', name: '上中里', kana: 'かみなかざと', en: 'Kaminakazato', number: 'JK35',
    transfers: [],
  },
  {
    id: 'jk-oji', name: '王子', kana: 'おうじ', en: 'Oji', number: 'JK36',
    transfers: [{ line: 'namboku' }, { line: 'toden', at: '王子駅前' }],
  },
  {
    id: 'jk-higashi-jujo', name: '東十条', kana: 'ひがしじゅうじょう', en: 'Higashi-Jujo', number: 'JK37',
    transfers: [],
  },
  {
    id: 'jk-akabane', name: '赤羽', kana: 'あかばね', en: 'Akabane', number: 'JK38',
    transfers: [
      { line: 'saikyo' }, { line: 'shonanShinjuku' }, { line: 'utsunomiyaTakasaki' }, { line: 'uenoTokyo' },
    ],
  },
  {
    id: 'jk-kawaguchi', name: '川口', kana: 'かわぐち', en: 'Kawaguchi', number: 'JK39',
    transfers: [],
  },
  {
    id: 'jk-nishi-kawaguchi', name: '西川口', kana: 'にしかわぐち', en: 'Nishi-Kawaguchi', number: 'JK40',
    transfers: [],
  },
  {
    id: 'jk-warabi', name: '蕨', kana: 'わらび', en: 'Warabi', number: 'JK41',
    transfers: [],
  },
  {
    id: 'jk-minami-urawa', name: '南浦和', kana: 'みなみうらわ', en: 'Minami-Urawa', number: 'JK42',
    transfers: [{ line: 'musashino' }],
  },
  {
    id: 'jk-urawa', name: '浦和', kana: 'うらわ', en: 'Urawa', number: 'JK43',
    transfers: [
      { line: 'shonanShinjuku' }, { line: 'utsunomiyaTakasaki' }, { line: 'uenoTokyo' },
    ],
  },
  {
    id: 'jk-kita-urawa', name: '北浦和', kana: 'きたうらわ', en: 'Kita-Urawa', number: 'JK44',
    transfers: [],
  },
  {
    id: 'jk-yono', name: '与野', kana: 'よの', en: 'Yono', number: 'JK45',
    transfers: [],
  },
  {
    id: 'jk-saitama-shintoshin', name: 'さいたま新都心', kana: 'さいたましんとしん', en: 'Saitama-Shintoshin', number: 'JK46',
    transfers: [{ line: 'utsunomiyaTakasaki' }],
  },
  {
    id: 'jk-omiya', name: '大宮', kana: 'おおみや', en: 'Omiya', number: 'JK47',
    transfers: [
      { line: 'shonanShinjuku' }, { line: 'saikyo' }, { line: 'utsunomiyaTakasaki' },
      { line: 'uenoTokyo' }, { line: 'tohokuShinkansen' },
      { line: 'tobuUrbanPark' }, { line: 'newShuttle' },
    ],
  },
]

export const KEIHIN_TOHOKU_LINE: RideableLine = {
  name: 'JR京浜東北・根岸線',
  symbol: 'JK',
  color: '#00B2E5',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
  services: [
    {
      id: 'local', name: '各駅停車', color: '#64748B', textColor: '#ffffff',
      stops: 'all',
    },
    {
      id: 'rapid', name: '快速', color: '#0068B7', textColor: '#ffffff',
      note: '日中のみ田端〜浜松町間で快速運転。土休日は御徒町にも停車',
      stops: [
        'jk-ofuna', 'jk-hongodai', 'jk-konandai', 'jk-yokodai', 'jk-shin-sugita',
        'jk-isogo', 'jk-negishi', 'jk-yamate', 'jk-ishikawacho', 'jk-kannai',
        'jk-sakuragicho', 'jk-yokohama', 'jk-higashi-kanagawa', 'jk-shin-koyasu',
        'jk-tsurumi', 'jk-kawasaki', 'jk-kamata', 'jk-omori', 'jk-oimachi',
        'jk-shinagawa', 'jk-takanawa-gateway', 'jk-tamachi', 'jk-hamamatsucho',
        'jk-tokyo', 'jk-kanda', 'jk-akihabara', 'jk-ueno', 'jk-tabata',
        'jk-kaminakazato', 'jk-oji', 'jk-higashi-jujo', 'jk-akabane',
        'jk-kawaguchi', 'jk-nishi-kawaguchi', 'jk-warabi', 'jk-minami-urawa',
        'jk-urawa', 'jk-kita-urawa', 'jk-yono', 'jk-saitama-shintoshin', 'jk-omiya',
      ],
    },
  ],
}
