import type { RideableLine, Station } from './types'

// JR横須賀線 — 駅番号昇順（久里浜 JO01 → 東京 JO19）
const STATIONS: Station[] = [
  {
    id: 'jo-kurihama', name: '久里浜', kana: 'くりはま', en: 'Kurihama', number: 'JO01',
    transfers: [{ line: 'keikyu', at: '京急久里浜駅' }],
  },
  {
    id: 'jo-kinugasa', name: '衣笠', kana: 'きぬがさ', en: 'Kinugasa', number: 'JO02',
    transfers: [],
  },
  {
    id: 'jo-yokosuka', name: '横須賀', kana: 'よこすか', en: 'Yokosuka', number: 'JO03',
    transfers: [],
  },
  {
    id: 'jo-taura', name: '田浦', kana: 'たうら', en: 'Taura', number: 'JO04',
    transfers: [],
  },
  {
    id: 'jo-higashi-zushi', name: '東逗子', kana: 'ひがしずし', en: 'Higashi-Zushi', number: 'JO05',
    transfers: [],
  },
  {
    id: 'jo-zushi', name: '逗子', kana: 'ずし', en: 'Zushi', number: 'JO06',
    transfers: [{ line: 'keikyu', at: '逗子・葉山駅' }],
  },
  {
    id: 'jo-kamakura', name: '鎌倉', kana: 'かまくら', en: 'Kamakura', number: 'JO07',
    transfers: [{ line: 'enoden' }],
  },
  {
    id: 'jo-kita-kamakura', name: '北鎌倉', kana: 'きたかまくら', en: 'Kita-Kamakura', number: 'JO08',
    transfers: [],
  },
  {
    id: 'jo-ofuna', name: '大船', kana: 'おおふな', en: 'Ofuna', number: 'JO09',
    transfers: [
      { line: 'tokaido' }, { line: 'keihinTohoku' }, { line: 'shonanShinjuku' }, { line: 'shonanMonorail' },
    ],
  },
  {
    id: 'jo-totsuka', name: '戸塚', kana: 'とつか', en: 'Totsuka', number: 'JO10',
    transfers: [{ line: 'tokaido' }, { line: 'shonanShinjuku' }, { line: 'blueLine' }],
  },
  {
    id: 'jo-higashi-totsuka', name: '東戸塚', kana: 'ひがしとつか', en: 'Higashi-Totsuka', number: 'JO11',
    transfers: [{ line: 'shonanShinjuku' }],
  },
  {
    id: 'jo-hodogaya', name: '保土ケ谷', kana: 'ほどがや', en: 'Hodogaya', number: 'JO12',
    transfers: [{ line: 'shonanShinjuku' }],
  },
  {
    id: 'jo-yokohama', name: '横浜', kana: 'よこはま', en: 'Yokohama', number: 'JO13',
    transfers: [
      { line: 'tokaido' }, { line: 'keihinTohoku' }, { line: 'shonanShinjuku' },
      { line: 'yokohamaLine' }, { line: 'toyoko' }, { line: 'minatomirai' },
      { line: 'keikyu' }, { line: 'sotetsu' }, { line: 'blueLine' },
    ],
  },
  {
    id: 'jo-shin-kawasaki', name: '新川崎', kana: 'しんかわさき', en: 'Shin-Kawasaki', number: 'JO14',
    transfers: [{ line: 'shonanShinjuku' }],
  },
  {
    id: 'jo-musashi-kosugi', name: '武蔵小杉', kana: 'むさしこすぎ', en: 'Musashi-Kosugi', number: 'JO15',
    transfers: [
      { line: 'shonanShinjuku' }, { line: 'toyoko' }, { line: 'tokyuMeguro' }, { line: 'nambu' },
    ],
  },
  {
    id: 'jo-nishi-oi', name: '西大井', kana: 'にしおおい', en: 'Nishi-Oi', number: 'JO16',
    transfers: [{ line: 'shonanShinjuku' }],
  },
  {
    id: 'jo-shinagawa', name: '品川', kana: 'しながわ', en: 'Shinagawa', number: 'JO17',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'tokaido' },
      { line: 'uenoTokyo' }, { line: 'tokaidoShinkansen' }, { line: 'keikyu' },
    ],
  },
  {
    id: 'jo-shimbashi', name: '新橋', kana: 'しんばし', en: 'Shimbashi', number: 'JO18',
    transfers: [
      { line: 'yamanote' }, { line: 'keihinTohoku' }, { line: 'tokaido' }, { line: 'uenoTokyo' },
      { line: 'ginza' }, { line: 'asakusa' }, { line: 'yurikamome' },
    ],
  },
  {
    id: 'jo-tokyo', name: '東京', kana: 'とうきょう', en: 'Tokyo', number: 'JO19',
    transfers: [
      { line: 'yamanote' }, { line: 'chuoRapid' }, { line: 'keihinTohoku' },
      { line: 'tokaido' }, { line: 'uenoTokyo' }, { line: 'keiyo' },
      { line: 'tokaidoShinkansen' }, { line: 'tohokuShinkansen' }, { line: 'marunouchi' },
    ],
  },
]

export const YOKOSUKA_LINE: RideableLine = {
  name: 'JR横須賀線',
  symbol: 'JO',
  color: '#0067C0',
  textColor: '#ffffff',
  loop: false,
  stations: STATIONS,
}
