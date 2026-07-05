import type { RideableLine, Station } from './types'

// 都営大江戸線 — 駅番号昇順（新宿西口 E01 → 光が丘 E38）
// 都庁前⟷新宿西口の環状接続は非対応（物理的に連続する区間のみ）
const STATIONS: Station[] = [
  {
    id: 'e-shinjuku-nishiguchi', name: '新宿西口', kana: 'しんじゅくにしぐち', en: 'Shinjuku-nishiguchi', number: 'E01',
    transfers: [
      { line: 'yamanote', at: '新宿駅' }, { line: 'marunouchi', at: '新宿駅' },
      { line: 'seibuShinjuku', at: '西武新宿駅' },
    ],
  },
  {
    id: 'e-higashi-shinjuku', name: '東新宿', kana: 'ひがししんじゅく', en: 'Higashi-shinjuku', number: 'E02',
    transfers: [{ line: 'fukutoshin' }],
  },
  {
    id: 'e-wakamatsu-kawada', name: '若松河田', kana: 'わかまつかわだ', en: 'Wakamatsu-kawada', number: 'E03',
    transfers: [],
  },
  {
    id: 'e-ushigome-yanagicho', name: '牛込柳町', kana: 'うしごめやなぎちょう', en: 'Ushigome-yanagicho', number: 'E04',
    transfers: [],
  },
  {
    id: 'e-ushigome-kagurazaka', name: '牛込神楽坂', kana: 'うしごめかぐらざか', en: 'Ushigome-kagurazaka', number: 'E05',
    transfers: [],
  },
  {
    id: 'e-iidabashi', name: '飯田橋', kana: 'いいだばし', en: 'Iidabashi', number: 'E06',
    transfers: [
      { line: 'sobuLocal' }, { line: 'tozai' }, { line: 'yurakuchoLine' }, { line: 'namboku' },
    ],
  },
  {
    id: 'e-kasuga', name: '春日', kana: 'かすが', en: 'Kasuga', number: 'E07',
    transfers: [
      { line: 'mita' },
      { line: 'marunouchi', at: '後楽園駅' }, { line: 'namboku', at: '後楽園駅' },
    ],
  },
  {
    id: 'e-hongo-sanchome', name: '本郷三丁目', kana: 'ほんごうさんちょうめ', en: 'Hongo-sanchome', number: 'E08',
    transfers: [{ line: 'marunouchi' }],
  },
  {
    id: 'e-ueno-okachimachi', name: '上野御徒町', kana: 'うえのおかちまち', en: 'Ueno-okachimachi', number: 'E09',
    transfers: [
      { line: 'yamanote', at: '御徒町駅' }, { line: 'keihinTohoku', at: '御徒町駅' },
      { line: 'ginza', at: '上野広小路駅' }, { line: 'hibiya', at: '仲御徒町駅' },
    ],
  },
  {
    id: 'e-shin-okachimachi', name: '新御徒町', kana: 'しんおかちまち', en: 'Shin-okachimachi', number: 'E10',
    transfers: [{ line: 'tx' }],
  },
  {
    id: 'e-kuramae', name: '蔵前', kana: 'くらまえ', en: 'Kuramae', number: 'E11',
    transfers: [{ line: 'asakusa' }],
  },
  {
    id: 'e-ryogoku', name: '両国', kana: 'りょうごく', en: 'Ryogoku', number: 'E12',
    transfers: [{ line: 'sobuLocal' }],
  },
  {
    id: 'e-morishita', name: '森下', kana: 'もりした', en: 'Morishita', number: 'E13',
    transfers: [{ line: 'toeiShinjuku' }],
  },
  {
    id: 'e-kiyosumi-shirakawa', name: '清澄白河', kana: 'きよすみしらかわ', en: 'Kiyosumi-shirakawa', number: 'E14',
    transfers: [{ line: 'hanzomon' }],
  },
  {
    id: 'e-monzen-nakacho', name: '門前仲町', kana: 'もんぜんなかちょう', en: 'Monzen-nakacho', number: 'E15',
    transfers: [{ line: 'tozai' }],
  },
  {
    id: 'e-tsukishima', name: '月島', kana: 'つきしま', en: 'Tsukishima', number: 'E16',
    transfers: [{ line: 'yurakuchoLine' }],
  },
  {
    id: 'e-kachidoki', name: '勝どき', kana: 'かちどき', en: 'Kachidoki', number: 'E17',
    transfers: [],
  },
  {
    id: 'e-tsukijishijo', name: '築地市場', kana: 'つきじしじょう', en: 'Tsukijishijo', number: 'E18',
    transfers: [{ line: 'hibiya', at: '築地駅' }],
  },
  {
    id: 'e-shiodome', name: '汐留', kana: 'しおどめ', en: 'Shiodome', number: 'E19',
    transfers: [
      { line: 'yurikamome' },
      { line: 'yamanote', at: '新橋駅' }, { line: 'keihinTohoku', at: '新橋駅' },
      { line: 'ginza', at: '新橋駅' }, { line: 'asakusa', at: '新橋駅' },
    ],
  },
  {
    id: 'e-daimon', name: '大門', kana: 'だいもん', en: 'Daimon', number: 'E20',
    transfers: [
      { line: 'asakusa' },
      { line: 'yamanote', at: '浜松町駅' }, { line: 'keihinTohoku', at: '浜松町駅' },
      { line: 'monorail', at: '浜松町駅' },
    ],
  },
  {
    id: 'e-akabanebashi', name: '赤羽橋', kana: 'あかばねばし', en: 'Akabanebashi', number: 'E21',
    transfers: [],
  },
  {
    id: 'e-azabu-juban', name: '麻布十番', kana: 'あざぶじゅうばん', en: 'Azabu-juban', number: 'E22',
    transfers: [{ line: 'namboku' }],
  },
  {
    id: 'e-roppongi', name: '六本木', kana: 'ろっぽんぎ', en: 'Roppongi', number: 'E23',
    transfers: [{ line: 'hibiya' }],
  },
  {
    id: 'e-aoyama-itchome', name: '青山一丁目', kana: 'あおやまいっちょうめ', en: 'Aoyama-itchome', number: 'E24',
    transfers: [{ line: 'ginza' }, { line: 'hanzomon' }],
  },
  {
    id: 'e-kokuritsu-kyogijo', name: '国立競技場', kana: 'こくりつきょうぎじょう', en: 'Kokuritsu-kyogijo', number: 'E25',
    transfers: [{ line: 'sobuLocal', at: '千駄ケ谷駅' }],
  },
  {
    id: 'e-yoyogi', name: '代々木', kana: 'よよぎ', en: 'Yoyogi', number: 'E26',
    transfers: [{ line: 'yamanote' }, { line: 'sobuLocal' }],
  },
  {
    id: 'e-shinjuku', name: '新宿', kana: 'しんじゅく', en: 'Shinjuku', number: 'E27',
    transfers: [
      { line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'sobuLocal' },
      { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'marunouchi' }, { line: 'toeiShinjuku' },
      { line: 'keio' }, { line: 'odakyu' },
    ],
  },
  {
    id: 'e-tochomae', name: '都庁前', kana: 'とちょうまえ', en: 'Tochomae', number: 'E28',
    transfers: [],
  },
  {
    id: 'e-nishi-shinjuku-gochome', name: '西新宿五丁目', kana: 'にししんじゅくごちょうめ', en: 'Nishi-shinjuku-gochome', number: 'E29',
    transfers: [],
  },
  {
    id: 'e-nakano-sakaue', name: '中野坂上', kana: 'なかのさかうえ', en: 'Nakano-sakaue', number: 'E30',
    transfers: [{ line: 'marunouchi' }],
  },
  {
    id: 'e-higashi-nakano', name: '東中野', kana: 'ひがしなかの', en: 'Higashi-nakano', number: 'E31',
    transfers: [{ line: 'sobuLocal' }],
  },
  {
    id: 'e-nakai', name: '中井', kana: 'なかい', en: 'Nakai', number: 'E32',
    transfers: [{ line: 'seibuShinjuku' }],
  },
  {
    id: 'e-ochiai-minami-nagasaki', name: '落合南長崎', kana: 'おちあいみなみながさき', en: 'Ochiai-minami-nagasaki', number: 'E33',
    transfers: [],
  },
  {
    id: 'e-shin-egota', name: '新江古田', kana: 'しんえごた', en: 'Shin-egota', number: 'E34',
    transfers: [],
  },
  {
    id: 'e-nerima', name: '練馬', kana: 'ねりま', en: 'Nerima', number: 'E35',
    transfers: [{ line: 'seibuIkebukuro' }],
  },
  {
    id: 'e-toshimaen', name: '豊島園', kana: 'としまえん', en: 'Toshimaen', number: 'E36',
    transfers: [],
  },
  {
    id: 'e-nerima-kasugacho', name: '練馬春日町', kana: 'ねりまかすがちょう', en: 'Nerima-kasugacho', number: 'E37',
    transfers: [],
  },
  {
    id: 'e-hikarigaoka', name: '光が丘', kana: 'ひかりがおか', en: 'Hikarigaoka', number: 'E38',
    transfers: [],
  },
]

export const OEDO_LINE: RideableLine = {
  name: '都営大江戸線',
  symbol: 'E',
  color: '#CE045B',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
}
