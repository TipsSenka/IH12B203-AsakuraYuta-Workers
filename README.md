# IH12B203-AsakuraYuta-Workers

Cloudflare Pages と Workers で動作する API 確認用サンプルです。

## 構成

- `pages/index.html`: Worker API を呼び出す静的フロントエンド
- `worker/src/index.js`: Cloudflare Worker の API 実装
- `worker/wrangler.toml`: Worker 名と公開設定

## ローカル確認

```powershell
Set-Location .\worker
npm install
npm run dev
```

Pages は `pages/index.html` をブラウザで開くと、接続先に本番 Worker URL が初期設定されています。

本番 Worker URL: `https://ih12b203-asakurayuta-workers-backend.nhs50170.workers.dev`

## API

| パス | 成功 | 内容 |
| --- | --- | --- |
| `GET /api` | 200 | Worker の稼働確認 |
| `GET /api/course` | 200 | コース一覧 |
| `GET /api/hello?name=山田` | 200 | 挨拶メッセージ |
| `GET /api/fortune` | 200 | 今日の運勢 |
| `GET /api/events` | 200 | イベント一覧 |
| `GET /api/hello?name=` | 400 | name 未入力 |
| 未定義パス | 404 | Not found |

## デプロイ

```powershell
Set-Location .\worker
npx wrangler login
npm run deploy
```

デプロイ後、表示された `https://<worker-name>.<subdomain>.workers.dev` を Pages の接続先に設定します。Pages の公開 URL が決まったら、`worker/wrangler.toml` の `ALLOWED_ORIGIN` をその URL に変更してから再デプロイしてください。