# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Wan Wan Train は、ドット絵のチワワ「うる」「ろい」が乗った電車で東京の路線をめぐる路線図アプリ。
「どちら行き（向き）に乗ればいいか」「あと何駅で着くか」を、電車が路線図上を実際に走る様子で
直感的に把握させるのが目的。テストコードは実装しない方針（`docs/START.md` 参照）。

開発は `docs/` のフェーズ単位（phase1〜phase10）で進めてきた。各フェーズの仕様は `docs/phaseN-*.md` に、
全体の企画背景は `docs/START.md` にある。新機能は「次のフェーズ」として同じ粒度で足すのが慣習。

## Commands

```bash
npm run dev      # Vite 開発サーバー
npm run build    # tsc --noEmit（型チェック）→ vite build。CI と同じ検証
npm run preview  # ビルド結果のプレビュー
npm run deploy   # build 後に wrangler で Cloudflare Pages へ手動デプロイ
```

- テストランナーは無い。変更の検証は `npm run build`（= 型チェック）と、必要なら手動/Playwright での動作確認。
- `strict` かつ `noUnusedLocals` / `noUnusedParameters` が有効なので、未使用の変数・引数はビルドを落とす。
- デプロイは通常 **main へのマージで自動**（`.github/workflows/deploy.yml` → Cloudflare Pages）。`npm run deploy` は手動用。

## Architecture

React 19 + Vite + Tailwind v4 + Zustand + Framer Motion。状態は単一の Zustand ストアに集約し、
路線データとジオメトリ（座標計算）をきれいに分離している。

### 状態: `src/store.ts`

- `useGame`（Zustand）が唯一の状態源。画面遷移（`title` / `game`）・現在路線・方向・現在駅などを保持。
- **方向モデル**: `Direction = 'fwd' | 'rev'`。`fwd` = 駅インデックス +1 方向（山手線は外回り/時計回り、直線路線は駅番号が増える方向）。
  `stations` 配列はこの規約（loop は外回り順、linear は駅番号昇順）で並んでいる前提。
- **走行はストア内の async アクション**。`_hop`（1駅、`STEP_MS`）と `_runTravel`（タップで目的地まで一気に）が
  `setTimeout` ベースの sleep で駒を進める。`travelActive` モジュール変数で `_runTravel` の多重起動をガードしている。
- `currentIndex` は「停車中=現在駅／走行中=次に着く駅」の二義的な意味を持つ点に注意。
- 再生ループ本体は `GameScreen.tsx` の `useEffect`（停車 → `AUTO_DWELL_MS` 待って `stepForward`）にある。ストアではない。

### 路線データ: `src/data/`

2層のデータモデルがある。混同しないこと。

- **`lines.ts` / `LINES`**: 乗り換え案内に出す**全**路線のマスタ（名前・ラインカラーのみ）。`LineId` を定義。
- **`rideable.ts` / `RIDEABLE`**: 実際に**乗車できる**路線だけのレジストリ。`RideableLine`（`src/data/types.ts`）は
  全駅・駅ナンバリング・乗換・種別（`services`）を持つ。キーは `LineId` と共通で `RideableLineId` を定義。
- 各路線は `src/data/<line>.ts` に 1 ファイル（`yamanote.ts` など）。路線を足すときは
  データファイルを作り `RIDEABLE` に登録する。乗換先として名前だけ出したいなら `LINES` に足すだけでよい。
- 乗換の解決は `resolveTransfer`（`rideable.ts`）: 乗車可能かつ対応駅が見つかれば飛べるチップ、それ以外は案内のみのチップ。
- 駅検索は `search.ts`（カタカナ→ひらがな正規化、駅名/かな/英名/駅ナンバリングの部分一致 + スコア順）。

### 描画: ジオメトリと map コンポーネント

路線は 2 種類のレイアウトで描く。`line.loop` で分岐する（`GameScreen.tsx`）。

- **環状線（山手線）**: `geometry.ts` が 1000×1000 SVG 上の正円座標を計算。外回り=外側トラック / 内回り=内側トラックの複線表現。
  `LoopMap.tsx` が描画。
- **直線路線**: `linearGeometry.ts` の `serpentineLayout`（1 行最大 7 駅のつづら折り）で座標を計算。`LinearMap.tsx` が描画。
- どちらも「実数の駅インデックス `pos` → 画面座標 + 進行方向角度」を返す関数（`alongLoop` / `alongSerpentine`）を提供し、
  `Train.tsx` がその補間で電車（チワワ）とアニメーションを描く。map を新設するときはこの pos→座標契約を守る。

### UI 構成

`App` → `TitleScreen`（出発駅選択・検索）または `GameScreen`。`GameScreen` 内は地図セクション
（`LoopMap`/`LinearMap` + `CenterInfo`）とパネル（`Controls` / `ServicePicker` / `InfoPanel`）。
スマホは地図上・パネル下、PC は地図左・パネル右のレスポンシブ。

## Conventions

- コメント・UI 文言・ドキュメントは日本語。既存の口調（簡潔な説明コメント）に合わせる。
- タイミング定数（`STEP_MS`, `AUTO_DWELL_MS`, `TRAVEL_EXTRA_MS` など）は `store.ts` の先頭に集約。
- ラインカラー・駅ナンバリングは公式値を忠実に再現するのが方針。
- README にはアプリ概要のみを書き、公開 URL や開発工程（フェーズ）は載せない。
- PWA は `vite.config.ts` の `VitePWA` 設定（`registerType: autoUpdate`、Workbox プリキャッシュ）。アイコン等の資産は `public/`。
