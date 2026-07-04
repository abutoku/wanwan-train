import type { RideableLine, Station } from './types'

// 東京メトロ丸ノ内線（本線のみ・方南町支線は未収録）— 駅番号昇順（荻窪 M01 → 池袋 M25）
const STATIONS: Station[] = [
  {
    id: 'm-ogikubo', name: '荻窪', kana: 'おぎくぼ', en: 'Ogikubo', number: 'M01',
    transfers: [{ line: 'chuoRapid' }, { line: 'sobuLocal' }],
  },
  {
    id: 'm-minami-asagaya', name: '南阿佐ケ谷', kana: 'みなみあさがや', en: 'Minami-asagaya', number: 'M02',
    transfers: [],
  },
  {
    id: 'm-shin-koenji', name: '新高円寺', kana: 'しんこうえんじ', en: 'Shin-koenji', number: 'M03',
    transfers: [],
  },
  {
    id: 'm-higashi-koenji', name: '東高円寺', kana: 'ひがしこうえんじ', en: 'Higashi-koenji', number: 'M04',
    transfers: [],
  },
  {
    id: 'm-shin-nakano', name: '新中野', kana: 'しんなかの', en: 'Shin-nakano', number: 'M05',
    transfers: [],
  },
  {
    id: 'm-nakano-sakaue', name: '中野坂上', kana: 'なかのさかうえ', en: 'Nakano-sakaue', number: 'M06',
    transfers: [{ line: 'oedo' }],
  },
  {
    id: 'm-nishi-shinjuku', name: '西新宿', kana: 'にししんじゅく', en: 'Nishi-shinjuku', number: 'M07',
    transfers: [],
  },
  {
    id: 'm-shinjuku', name: '新宿', kana: 'しんじゅく', en: 'Shinjuku', number: 'M08',
    transfers: [
      { line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'sobuLocal' },
      { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'toeiShinjuku' }, { line: 'oedo' }, { line: 'keio' }, { line: 'odakyu' },
    ],
  },
  {
    id: 'm-shinjuku-sanchome', name: '新宿三丁目', kana: 'しんじゅくさんちょうめ', en: 'Shinjuku-sanchome', number: 'M09',
    transfers: [{ line: 'fukutoshin' }, { line: 'toeiShinjuku' }],
  },
  {
    id: 'm-shinjuku-gyoemmae', name: '新宿御苑前', kana: 'しんじゅくぎょえんまえ', en: 'Shinjuku-gyoemmae', number: 'M10',
    transfers: [],
  },
  {
    id: 'm-yotsuya-sanchome', name: '四谷三丁目', kana: 'よつやさんちょうめ', en: 'Yotsuya-sanchome', number: 'M11',
    transfers: [],
  },
  {
    id: 'm-yotsuya', name: '四ツ谷', kana: 'よつや', en: 'Yotsuya', number: 'M12',
    transfers: [{ line: 'chuoRapid' }, { line: 'sobuLocal' }, { line: 'namboku' }],
  },
  {
    id: 'm-akasaka-mitsuke', name: '赤坂見附', kana: 'あかさかみつけ', en: 'Akasaka-mitsuke', number: 'M13',
    transfers: [
      { line: 'ginza' },
      { line: 'yurakuchoLine', at: '永田町駅' }, { line: 'hanzomon', at: '永田町駅' }, { line: 'namboku', at: '永田町駅' },
    ],
  },
  {
    id: 'm-kokkai-gijidomae', name: '国会議事堂前', kana: 'こっかいぎじどうまえ', en: 'Kokkai-gijidomae', number: 'M14',
    transfers: [
      { line: 'chiyoda' },
      { line: 'ginza', at: '溜池山王駅' }, { line: 'namboku', at: '溜池山王駅' },
    ],
  },
  {
    id: 'm-kasumigaseki', name: '霞ケ関', kana: 'かすみがせき', en: 'Kasumigaseki', number: 'M15',
    transfers: [{ line: 'hibiya' }, { line: 'chiyoda' }],
  },
  {
    id: 'm-ginza', name: '銀座', kana: 'ぎんざ', en: 'Ginza', number: 'M16',
    transfers: [
      { line: 'ginza' }, { line: 'hibiya' }, { line: 'yurakuchoLine', at: '銀座一丁目駅' },
    ],
  },
  {
    id: 'm-tokyo', name: '東京', kana: 'とうきょう', en: 'Tokyo', number: 'M17',
    transfers: [
      { line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'keihinTohoku' },
      { line: 'tokaido' }, { line: 'uenoTokyo' }, { line: 'yokosukaSobu' }, { line: 'keiyo' },
      { line: 'tokaidoShinkansen' }, { line: 'tohokuShinkansen' },
    ],
  },
  {
    id: 'm-otemachi', name: '大手町', kana: 'おおてまち', en: 'Otemachi', number: 'M18',
    transfers: [{ line: 'tozai' }, { line: 'chiyoda' }, { line: 'hanzomon' }, { line: 'mita' }],
  },
  {
    id: 'm-awajicho', name: '淡路町', kana: 'あわじちょう', en: 'Awajicho', number: 'M19',
    transfers: [
      { line: 'chiyoda', at: '新御茶ノ水駅' }, { line: 'toeiShinjuku', at: '小川町駅' },
    ],
  },
  {
    id: 'm-ochanomizu', name: '御茶ノ水', kana: 'おちゃのみず', en: 'Ochanomizu', number: 'M20',
    transfers: [{ line: 'chuoRapid' }, { line: 'sobuLocal' }],
  },
  {
    id: 'm-hongo-sanchome', name: '本郷三丁目', kana: 'ほんごうさんちょうめ', en: 'Hongo-sanchome', number: 'M21',
    transfers: [{ line: 'oedo' }],
  },
  {
    id: 'm-korakuen', name: '後楽園', kana: 'こうらくえん', en: 'Korakuen', number: 'M22',
    transfers: [
      { line: 'namboku' },
      { line: 'mita', at: '春日駅' }, { line: 'oedo', at: '春日駅' },
    ],
  },
  {
    id: 'm-myogadani', name: '茗荷谷', kana: 'みょうがだに', en: 'Myogadani', number: 'M23',
    transfers: [],
  },
  {
    id: 'm-shin-otsuka', name: '新大塚', kana: 'しんおおつか', en: 'Shin-otsuka', number: 'M24',
    transfers: [],
  },
  {
    id: 'm-ikebukuro', name: '池袋', kana: 'いけぶくろ', en: 'Ikebukuro', number: 'M25',
    transfers: [
      { line: 'yamanote' }, { line: 'saikyo' }, { line: 'shonanShinjuku' },
      { line: 'yurakuchoLine' }, { line: 'fukutoshin' },
      { line: 'tobuTojo' }, { line: 'seibuIkebukuro' },
    ],
  },
]

export const MARUNOUCHI_LINE: RideableLine = {
  name: '丸ノ内線',
  symbol: 'M',
  color: '#F62E36',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
}
