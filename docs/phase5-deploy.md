# 第5フェーズ実装ドキュメント — デプロイ

作成日: 2026-07-04
ステータス: 実装完了

## 目的・スコープ

「デプロイ」（START.md 第5フェーズ）。アプリを本番URLで公開し、誰でもブラウザから
アクセスできるようにする。

- デプロイ先は START.md の第一候補どおり **Cloudflare Pages**
  - 画像アセット（チワワのドット絵）が大きめで、エッジCDN配信の速さが体感差になる
  - 想定ユーザー（移動中の旅行者・モバイル回線）と好相性
  - 無料枠の帯域が実質無制限
- デプロイ方式は **wrangler CLI による直接アップロード（Direct Upload）**
  - Git 連携（push で自動デプロイ）はダッシュボード操作が必要なため今回は見送り。
    将来 GitHub Actions + `cloudflare/wrangler-action` での自動化に移行可能（下記参照）

## 公開URL

- **本番**: https://wanwan-train.pages.dev

## 構成

| 項目 | 値 |
|---|---|
| プラットフォーム | Cloudflare Pages（Direct Upload） |
| プロジェクト名 | `wanwan-train` |
| 本番ブランチ | `main`（`--branch=main` を明示して本番デプロイにする） |
| ビルド成果物 | `dist/`（`npm run build` = 型チェック + Vite ビルド） |
| SPA ルーティング | 対応不要（React Router 未使用の1画面SPA。なお Pages は `404.html` が
  無い場合、未知のパスに `index.html` を返すSPAモードで動作する） |

## 追加・変更ファイル

```
wrangler.toml        # Pages プロジェクト設定（name / pages_build_output_dir）★新規
package.json         # devDependencies に wrangler、scripts に deploy を追加
docs/phase5-deploy.md  # 本ドキュメント ★新規
README.md            # 公開URL・デプロイ手順・ロードマップ更新
```

### wrangler.toml

```toml
name = "wanwan-train"
compatibility_date = "2026-07-04"
pages_build_output_dir = "dist"
```

`pages_build_output_dir` を書いておくと `wrangler pages deploy` が
プロジェクト名・成果物ディレクトリを引数なしで解決できる。

## デプロイ手順

```bash
# 初回のみ: Cloudflare 認証（ブラウザが開く）
npx wrangler login

# 初回のみ: プロジェクト作成
npx wrangler pages project create wanwan-train --production-branch=main

# ビルド + 本番デプロイ（2回目以降はこれだけ）
npm run deploy
```

`npm run deploy` = `npm run build && wrangler pages deploy --branch=main`。

- 現在の作業ブランチ名に関わらず `--branch=main` を指定することで
  **本番デプロイ**（wanwan-train.pages.dev に反映）になる。
  指定しないと git のカレントブランチ名が使われ、feature ブランチからは
  プレビューデプロイ（`<hash>.wanwan-train.pages.dev`）になる
- プレビューを出したい場合は `npx wrangler pages deploy` を素で実行すればよい

## 仕様解釈・判断メモ

- **Direct Upload を選んだ理由**: wrangler が Pages 書き込み権限つきで認証済みで、
  CLI だけで完結する。Git 連携はダッシュボードでのリポジトリ接続操作が必要
- **wrangler を devDependencies に追加**: グローバルインストールに依存せず、
  リポジトリを clone した環境で `npm install` だけでデプロイ可能にするため
- **キャッシュ**: Vite がJS/CSSにコンテンツハッシュを付与し、Pages が静的アセットを
  エッジキャッシュするため追加設定は不要
- **独自ドメイン**: 未設定（`*.pages.dev` のまま）。必要になったらダッシュボードの
  Custom domains から追加する

## 将来の拡張（自動デプロイ）

main へのマージで自動デプロイしたくなったら、次のいずれか:

1. **GitHub Actions + wrangler-action**: Cloudflare ダッシュボードで API トークン
   （Pages 編集権限）を発行し、GitHub リポジトリの Secrets に
   `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` を登録してワークフローを追加
2. **Pages の Git 連携**: ダッシュボードで GitHub リポジトリを接続
   （ビルドコマンド `npm run build` / 出力 `dist`）。以降 push だけで反映

## 動作確認（実施済み）

- `npm run build`（型チェック含む）が通ること
- `wrangler pages deploy` が成功し、本番URLが発行されること
- https://wanwan-train.pages.dev で
  - タイトル画面（wanwan.png）が表示されること
  - 駅検索 → スタート → ゲーム画面で電車が走ること
  - 画像（uru.png / roi.png / wanwan.png）が配信されること
