# 第6フェーズ実装ドキュメント — PWA化

作成日: 2026-07-05
ステータス: 実装完了

## 目的・スコープ

「PWA化」（START.md 第6フェーズ）。想定ユーザーが「移動中の旅行者」であることを踏まえ、

1. **インストール可能にする** — ホーム画面に追加してネイティブアプリのように起動できる
2. **オフラインで動くようにする** — 電波の弱い駅ホームや地下でも路線図が見られる

本アプリは静的アセットのみで動作する（APIなし・路線データはバンドル内蔵）ため、
**全アセットのプリキャッシュ**で完全オフライン動作が実現できる。

## 方針

| 項目 | 採用 | 理由 |
|---|---|---|
| プラグイン | **vite-plugin-pwa** | Vite公式推奨。マニフェスト生成 + Workbox によるSW生成をビルドに統合できる |
| SW更新戦略 | **autoUpdate** | 新バージョン検出時に自動更新・リロード。更新UI実装が不要でシンプル |
| キャッシュ戦略 | **プリキャッシュ**（JS/CSS/HTML/画像） | アセット総量が小さく全部入れても軽い。オフライン完全動作 |
| Google Fonts | **ランタイムキャッシュ** | 外部オリジンなのでプリキャッシュ不可。CSSはStaleWhileRevalidate、フォント本体はCacheFirst（1年） |
| アイコン | **uru.png からnearest-neighbor拡大で生成** | ドット絵の質感を保ったまま 512/192/180px の正方形アイコンを用意 |

## 追加・変更ファイル

```
docs/phase6-pwa.md            # 本ドキュメント ★新規
package.json                  # devDependencies に vite-plugin-pwa を追加
vite.config.ts                # VitePWA プラグイン設定（マニフェスト・Workbox）
index.html                    # theme-color / apple-touch-icon 等のメタタグ追加
public/pwa-192x192.png        # PWAアイコン ★新規（uru.png から生成）
public/pwa-512x512.png        # PWAアイコン ★新規
public/maskable-icon-512x512.png  # マスカブルアイコン（セーフゾーン考慮）★新規
public/apple-touch-icon.png   # iOS用 180x180 ★新規
README.md                     # 機能・ロードマップ更新
```

## Webアプリマニフェスト

| 項目 | 値 |
|---|---|
| name | Wan Wan Train |
| short_name | WanWanTrain |
| description | ドット絵のチワワと東京の路線をめぐる路線図アプリ |
| display | standalone |
| orientation | portrait（スマホ縦持ち前提のUI） |
| lang | ja |
| theme_color / background_color | `#020617`（アプリ背景と同色） |
| icons | 192 / 512（any）+ 512（maskable） |

## Service Worker（Workbox / generateSW）

- `globPatterns: ['**/*.{js,css,html,png,svg,ico}']` — dist 内の全アセットをプリキャッシュ
- ナビゲーションフォールバック: `index.html`（SPAなのでオフライン時も起動可能）
- ランタイムキャッシュ:
  - `fonts.googleapis.com`（CSS）→ StaleWhileRevalidate
  - `fonts.gstatic.com`（フォント本体）→ CacheFirst・365日・10エントリ

## アイコン生成

ImageMagick等が環境に無いため、Playwright のブラウザ canvas
（`imageSmoothingEnabled = false`）で uru.png を nearest-neighbor 拡大して生成する。

- 通常アイコン: `#020617` 背景の正方形キャンバス中央に、高さ約88%でうるを配置
- マスカブルアイコン: セーフゾーン（中央80%円）に収まるよう高さ約60%で配置
- 生成はビルド外の1回きりの作業（生成物を `public/` にコミット）

## 仕様解釈・判断メモ

- **オフライン対象は「全部」**: 路線・駅データはTSソースに内蔵されバンドルに含まれるため、
  プリキャッシュだけで検索・乗換・停車駅ビューまで全機能がオフライン動作する
- **autoUpdate を選択**: 「新バージョンがあります」プロンプト（prompt方式）は
  UI実装が必要になる。本アプリは状態をURLに持たず再読み込みのコストが低いので自動更新でよい
- **orientation: portrait**: スマホでの利用が主想定。PCブラウザでは orientation は無視される
  ため実害なし
- **favicon**: 既存の `/images/uru.png` を維持（変更不要）
- **Webフォントのオフライン利用は「2回目の訪問以降」**: index.html の `<link>` による
  Google Fonts CSS の読み込みは、初回訪問時はSWが制御を取る前に発生するため
  ランタイムキャッシュに入らない。2回目のオンライン訪問でSW経由になりキャッシュされる。
  初回訪問直後にオフラインにした場合のみシステムフォントにフォールバックする
  （アプリ自体は問題なく動作する）。完全にしたければフォントのセルフホスト化が選択肢

## 動作確認（実施済み）

- `npm run build`（型チェック含む）が通り、`dist/` に `manifest.webmanifest` /
  `sw.js` / `workbox-*.js` が生成されること（プリキャッシュ19エントリ・約1.28MB）
- `npm run preview` + Playwright で検証:
  - マニフェストが読み込まれること（name / icons 3件）
  - Service Worker が activated になりプリキャッシュ19エントリが完了すること
  - 2回目訪問で Google Fonts がランタイムキャッシュされること
    （stylesheets 1件・webfonts 10件）
  - **オフラインでリロードしてもエラーなしで動作すること**
    （タイトル画面 → スタート → ゲーム画面まで。地図SVG・チワワ画像・乗換案内・
    Webフォントすべて表示）
