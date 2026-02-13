# 中陰・年回表 PDF App

A4縦・縦書きの中陰・年回表（上段: 初七日〜百ヶ日 / 下段: 一周忌〜五十回忌）をWebプレビューし、ブラウザ印刷でPDF保存する `Next.js + TypeScript` アプリです。

## Local Setup

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Local Quality Checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Workflow Policy

- 開発中はローカルGitを主として運用
- 節目でGitHubへ公開
- GitHubは公開とVercel連携用

詳細は `AGENTS.md` を参照してください。

## Publish to GitHub (Milestone)

```bash
git init
git add .
git commit -m "Initial milestone: memorial PDF app"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## Deploy to Vercel

1. VercelでGitHubリポジトリをImport
2. Framework Presetは `Next.js` を選択
3. Build Command / Outputはデフォルト
4. `main` をProductionに設定
