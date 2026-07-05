# 第7フェーズ実装ドキュメント — 自動デプロイ

作成日: 2026-07-05
ステータス: 実装完了（Secrets 登録は下記「初回セットアップ」参照）

## 目的・スコープ

「自動デプロイ実装 — mainブランチにマージしたら本番に反映する」（START.md 第7フェーズ）。

第5フェーズでは `npm run deploy` による手動デプロイだった。これを
**main への push（= PR マージ）をトリガーに GitHub Actions が自動で本番デプロイ**する
構成に移行する。

## 方式の選定

phase5-deploy.md「将来の拡張」に挙げた2案から **GitHub Actions + wrangler-action** を採用。

| 案 | 採用 | 理由 |
|---|---|---|
| **GitHub Actions + cloudflare/wrangler-action** | ✅ | 設定がリポジトリ内のコードで完結し、レビュー可能。ビルド（型チェック含む）の成否が GitHub の Checks に出る |
| Pages の Git 連携 | ─ | Cloudflare ダッシュボードでの接続操作が必要で、設定がリポジトリ外に出る。既存の Direct Upload プロジェクトとの共存も切替作業が要る |

## 構成

```
main へ push（PR マージ）
  → GitHub Actions: deploy ジョブ
      1. checkout
      2. Node 22 セットアップ（npm キャッシュ有効）
      3. npm ci
      4. npm run build（tsc --noEmit + vite build）
      5. wrangler pages deploy --branch=main  → https://wanwan-train.pages.dev
```

- デプロイコマンド・成果物ディレクトリは既存の `wrangler.toml`
  （`pages_build_output_dir = "dist"`）をそのまま利用
- `--branch=main` を明示し、常に本番デプロイにする（phase5 と同じ扱い）
- `concurrency` で同一ワークフローの同時実行を1つに制限。
  古いデプロイが新しいデプロイを上書きする事故を防ぐ
  （`cancel-in-progress: false` — デプロイは途中キャンセルせず順番に流す）

## 追加・変更ファイル

```
.github/workflows/deploy.yml   # 自動デプロイワークフロー ★新規
docs/phase7-auto-deploy.md     # 本ドキュメント ★新規
README.md                      # デプロイ説明・ロードマップ更新
```

## 必要な GitHub Secrets

| Secret | 内容 | 状態 |
|---|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウントID | ✅ 登録済み（`gh secret set` で登録） |
| `CLOUDFLARE_API_TOKEN` | Pages 編集権限つき API トークン | ⚠️ 手動発行が必要（下記） |

### 初回セットアップ（CLOUDFLARE_API_TOKEN の発行）

API トークンの発行はダッシュボード操作が必要（wrangler の OAuth トークンでは代行不可）。

1. https://dash.cloudflare.com/profile/api-tokens を開く
2. 「トークンを作成する」→ カスタムトークン
3. 権限: **アカウント / Cloudflare Pages / 編集** のみ
4. アカウントリソース: 対象アカウントに限定
5. 作成されたトークンを GitHub Secrets に登録:

   ```bash
   gh secret set CLOUDFLARE_API_TOKEN -R abutoku/wanwan-train
   # プロンプトにトークンを貼り付け
   ```

## 運用

- **本番反映**: PR を main にマージするだけ。Actions の deploy ジョブが完走すれば反映
- **手動デプロイ**: 従来どおり `npm run deploy` も引き続き使用可能（緊急時のフォールバック）
- **手動トリガー**: Actions タブから `workflow_dispatch` でも実行可能
- ビルド（型チェック）が失敗した場合はデプロイされず、Actions が失敗として表示される

## 仕様解釈・判断メモ

- **PR のプレビューデプロイは対象外**: 第7フェーズの要件は「mainにマージしたら本番反映」
  のみ。プレビューが欲しくなったら `pull_request` トリガー + `--branch` 指定なしの
  ジョブを足せばよい
- **Node 22 を採用**: Vite 6 / wrangler 4 のサポート範囲内の LTS
- **`npm ci` を使用**: `package-lock.json` に基づく再現性のあるインストール

## 動作確認

- [x] `gh secret list` で `CLOUDFLARE_ACCOUNT_ID` が登録されていること
- [ ] `CLOUDFLARE_API_TOKEN` 登録後、本ブランチの PR を main にマージし
      Actions の deploy ジョブが成功すること
- [ ] https://wanwan-train.pages.dev に変更が反映されること
