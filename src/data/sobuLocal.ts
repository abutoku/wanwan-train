import type { RideableLine, Station } from './types'

// JR中央・総武線(各停) — 駅番号昇順（三鷹 JB01 → 千葉 JB39）
const STATIONS: Station[] = [
  {
    id: 'jb-mitaka', name: '三鷹', kana: 'みたか', en: 'Mitaka', number: 'JB01',
    transfers: [{ line: 'chuoRapid' }],
  },
  {
    id: 'jb-kichijoji', name: '吉祥寺', kana: 'きちじょうじ', en: 'Kichijoji', number: 'JB02',
    transfers: [{ line: 'chuoRapid' }, { line: 'inokashira' }],
  },
  {
    id: 'jb-nishi-ogikubo', name: '西荻窪', kana: 'にしおぎくぼ', en: 'Nishi-Ogikubo', number: 'JB03',
    transfers: [{ line: 'chuoRapid' }],
  },
  {
    id: 'jb-ogikubo', name: '荻窪', kana: 'おぎくぼ', en: 'Ogikubo', number: 'JB04',
    transfers: [{ line: 'chuoRapid' }, { line: 'marunouchi' }],
  },
  {
    id: 'jb-asagaya', name: '阿佐ケ谷', kana: 'あさがや', en: 'Asagaya', number: 'JB05',
    transfers: [{ line: 'chuoRapid' }],
  },
  {
    id: 'jb-koenji', name: '高円寺', kana: 'こうえんじ', en: 'Koenji', number: 'JB06',
    transfers: [{ line: 'chuoRapid' }],
  },
  {
    id: 'jb-nakano', name: '中野', kana: 'なかの', en: 'Nakano', number: 'JB07',
    transfers: [{ line: 'chuoRapid' }, { line: 'tozai' }],
  },
  {
    id: 'jb-higashi-nakano', name: '東中野', kana: 'ひがしなかの', en: 'Higashi-Nakano', number: 'JB08',
    transfers: [{ line: 'oedo' }],
  },
  {
    id: 'jb-okubo', name: '大久保', kana: 'おおくぼ', en: 'Okubo', number: 'JB09',
    transfers: [],
  },
  {
    id: 'jb-shinjuku', name: '新宿', kana: 'しんじゅく', en: 'Shinjuku', number: 'JB10',
    transfers: [
      { line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'marunouchi' }, { line: 'toeiShinjuku' }, { line: 'oedo' },
      { line: 'keio' }, { line: 'odakyu' },
    ],
  },
  {
    id: 'jb-yoyogi', name: '代々木', kana: 'よよぎ', en: 'Yoyogi', number: 'JB11',
    transfers: [{ line: 'yamanote' }, { line: 'oedo' }],
  },
  {
    id: 'jb-sendagaya', name: '千駄ケ谷', kana: 'せんだがや', en: 'Sendagaya', number: 'JB12',
    transfers: [],
  },
  {
    id: 'jb-shinanomachi', name: '信濃町', kana: 'しなのまち', en: 'Shinanomachi', number: 'JB13',
    transfers: [],
  },
  {
    id: 'jb-yotsuya', name: '四ツ谷', kana: 'よつや', en: 'Yotsuya', number: 'JB14',
    transfers: [{ line: 'chuoRapid' }, { line: 'marunouchi' }, { line: 'namboku' }],
  },
  {
    id: 'jb-ichigaya', name: '市ケ谷', kana: 'いちがや', en: 'Ichigaya', number: 'JB15',
    transfers: [{ line: 'yurakuchoLine' }, { line: 'namboku' }, { line: 'toeiShinjuku' }],
  },
  {
    id: 'jb-iidabashi', name: '飯田橋', kana: 'いいだばし', en: 'Iidabashi', number: 'JB16',
    transfers: [
      { line: 'tozai' }, { line: 'yurakuchoLine' }, { line: 'namboku' }, { line: 'oedo' },
    ],
  },
  {
    id: 'jb-suidobashi', name: '水道橋', kana: 'すいどうばし', en: 'Suidobashi', number: 'JB17',
    transfers: [{ line: 'mita' }],
  },
  {
    id: 'jb-ochanomizu', name: '御茶ノ水', kana: 'おちゃのみず', en: 'Ochanomizu', number: 'JB18',
    transfers: [
      { line: 'chuoRapid' }, { line: 'marunouchi' }, { line: 'chiyoda', at: '新御茶ノ水駅' },
    ],
  },
  {
    id: 'jb-akihabara', name: '秋葉原', kana: 'あきはばら', en: 'Akihabara', number: 'JB19',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'hibiya' }, { line: 'tx' },
    ],
  },
  {
    id: 'jb-asakusabashi', name: '浅草橋', kana: 'あさくさばし', en: 'Asakusabashi', number: 'JB20',
    transfers: [{ line: 'asakusa' }],
  },
  {
    id: 'jb-ryogoku', name: '両国', kana: 'りょうごく', en: 'Ryogoku', number: 'JB21',
    transfers: [{ line: 'oedo' }],
  },
  {
    id: 'jb-kinshicho', name: '錦糸町', kana: 'きんしちょう', en: 'Kinshicho', number: 'JB22',
    transfers: [{ line: 'yokosukaSobu' }, { line: 'hanzomon' }],
  },
  {
    id: 'jb-kameido', name: '亀戸', kana: 'かめいど', en: 'Kameido', number: 'JB23',
    transfers: [],
  },
  {
    id: 'jb-hirai', name: '平井', kana: 'ひらい', en: 'Hirai', number: 'JB24',
    transfers: [],
  },
  {
    id: 'jb-shin-koiwa', name: '新小岩', kana: 'しんこいわ', en: 'Shin-Koiwa', number: 'JB25',
    transfers: [{ line: 'yokosukaSobu' }],
  },
  {
    id: 'jb-koiwa', name: '小岩', kana: 'こいわ', en: 'Koiwa', number: 'JB26',
    transfers: [],
  },
  {
    id: 'jb-ichikawa', name: '市川', kana: 'いちかわ', en: 'Ichikawa', number: 'JB27',
    transfers: [{ line: 'yokosukaSobu' }],
  },
  {
    id: 'jb-motoyawata', name: '本八幡', kana: 'もとやわた', en: 'Motoyawata', number: 'JB28',
    transfers: [{ line: 'toeiShinjuku' }, { line: 'keisei', at: '京成八幡駅' }],
  },
  {
    id: 'jb-shimosa-nakayama', name: '下総中山', kana: 'しもうさなかやま', en: 'Shimosa-Nakayama', number: 'JB29',
    transfers: [],
  },
  {
    id: 'jb-nishi-funabashi', name: '西船橋', kana: 'にしふなばし', en: 'Nishi-Funabashi', number: 'JB30',
    transfers: [
      { line: 'tozai' }, { line: 'keiyo' }, { line: 'musashino' }, { line: 'tobuUrbanPark' },
    ],
  },
  {
    id: 'jb-funabashi', name: '船橋', kana: 'ふなばし', en: 'Funabashi', number: 'JB31',
    transfers: [
      { line: 'yokosukaSobu' }, { line: 'tobuUrbanPark' }, { line: 'keisei', at: '京成船橋駅' },
    ],
  },
  {
    id: 'jb-higashi-funabashi', name: '東船橋', kana: 'ひがしふなばし', en: 'Higashi-Funabashi', number: 'JB32',
    transfers: [],
  },
  {
    id: 'jb-tsudanuma', name: '津田沼', kana: 'つだぬま', en: 'Tsudanuma', number: 'JB33',
    transfers: [{ line: 'yokosukaSobu' }],
  },
  {
    id: 'jb-makuhari-hongo', name: '幕張本郷', kana: 'まくはりほんごう', en: 'Makuharihongo', number: 'JB34',
    transfers: [{ line: 'keisei', at: '京成幕張本郷駅' }],
  },
  {
    id: 'jb-makuhari', name: '幕張', kana: 'まくはり', en: 'Makuhari', number: 'JB35',
    transfers: [{ line: 'keisei', at: '京成幕張駅' }],
  },
  {
    id: 'jb-shin-kemigawa', name: '新検見川', kana: 'しんけみがわ', en: 'Shin-Kemigawa', number: 'JB36',
    transfers: [],
  },
  {
    id: 'jb-inage', name: '稲毛', kana: 'いなげ', en: 'Inage', number: 'JB37',
    transfers: [{ line: 'yokosukaSobu' }],
  },
  {
    id: 'jb-nishi-chiba', name: '西千葉', kana: 'にしちば', en: 'Nishi-Chiba', number: 'JB38',
    transfers: [],
  },
  {
    id: 'jb-chiba', name: '千葉', kana: 'ちば', en: 'Chiba', number: 'JB39',
    transfers: [{ line: 'yokosukaSobu' }, { line: 'keisei', at: '京成千葉駅' }],
  },
]

export const SOBU_LOCAL_LINE: RideableLine = {
  name: 'JR中央・総武線(各停)',
  symbol: 'JB',
  color: '#FFD400',
  textColor: '#000000',
  loop: false,
  stations: STATIONS,
}
