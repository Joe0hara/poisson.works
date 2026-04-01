# poisson.works

ポートフォリオ重視の個人サイト。

## Stack

- **Framework**: Astro 6 (static output)
- **Styling**: Vanilla CSS (CSS custom properties)
- **Content**: Markdown files in `src/content/{work,tools,tutorial,prototype}/`
- **Deploy**: GitHub Pages via GitHub Actions
- **Domain**: poisson.works

## Content Structure

```
src/content/
├── work/          # 作品・プロジェクト (title, description, date, thumbnail?, role?, venue?)
├── tools/         # ツール・ソフトウェア (title, description, date, thumbnail?, url?)
├── tutorial/      # チュートリアル (title, description, date, thumbnail?)
└── prototype/     # プロトタイプ (title, description, date, thumbnail?)
```

Markdown frontmatter に `draft: true` を設定すると非公開になる。

## Development

```bash
npm run dev       # localhost:4321
npm run build     # dist/ に静的出力
npm run preview   # ビルド結果のプレビュー
```

## Conventions

- コンポーネント: `src/components/*.astro`
- レイアウト: `src/layouts/{BaseLayout,PostLayout}.astro`
- ページルーティング: ファイルベース (`src/pages/`)
- 日本語でコミュニケーション可
