# poisson.works

[poisson.works](https://poisson.works) — 小原 丈 (Joe Ohara) のポートフォリオサイト。
ライブ演出・XR・インタラクティブコンテンツの制作実績 (Work) に加えて、ツール (Tools)、チュートリアル (Tutorial)、プロトタイプ (Prototype) を掲載しています。

## 技術スタック

| 項目 | 内容 |
| --- | --- |
| フレームワーク | [Astro](https://astro.build) 7(静的出力 `output: 'static'`) |
| スタイリング | Vanilla CSS(CSS カスタムプロパティ、スコープ付きスタイル) |
| コンテンツ | Markdown + Content Collections(`glob` ローダー) |
| デプロイ | GitHub Actions → GitHub Pages |
| ドメイン | poisson.works(`public/CNAME`) |

## 開発

Node.js **22.12.0 以上** が必要です(`package.json` の `engines` 参照)。

```sh
npm install
npm run dev       # 開発サーバー (http://localhost:4321)
npm run build     # dist/ に静的ビルド
npm run preview   # ビルド結果のプレビュー
```

## ディレクトリ構成

```text
/
├── astro.config.mjs        # サイト設定・Markdown パイプライン
├── public/                 # 静的ファイル (CNAME, favicon, images/)
└── src/
    ├── components/         # Card, CardGrid, Header, Footer, LinkCard
    ├── layouts/            # BaseLayout(全体骨格)/ PostLayout(記事)
    ├── pages/              # ファイルベースルーティング
    │   ├── index.astro     # トップ(各セクションの新着)
    │   ├── about.astro     # プロフィール
    │   ├── 404.astro
    │   └── {work,tools,tutorial,prototype}/
    ├── content/            # Markdown コンテンツ(下記参照)
    ├── content.config.ts   # コレクション定義・frontmatter スキーマ
    └── plugins/
        └── rehype-youtube.mjs  # YouTube リンクの自動埋め込み
```

## コンテンツの追加・編集

コンテンツは `src/content/` 配下のコレクションごとの Markdown ファイルです。ファイル名がそのまま URL スラッグになります(例: `src/content/work/xr-kaigi-2023.md` → `/work/xr-kaigi-2023/`)。

| コレクション | 用途 | frontmatter |
| --- | --- | --- |
| `work/` | 作品・案件の実績 | `title` `description` `date` + 任意: `thumbnail` `role` `venue` `officialUrl` `ogImage` `themeColor` |
| `tools/` | 配布ツール・ソフトウェア | `title` `description` `date` + 任意: `thumbnail` `url` `ogImage` |
| `tutorial/` | チュートリアル記事 | `title` `description` `date` + 任意: `thumbnail` |
| `prototype/` | プロトタイプ・実験 | `title` `description` `date` + 任意: `thumbnail` |

共通の frontmatter:

- `date` — `YYYY-MM-DD` 形式の文字列。一覧の並び順に使われます
- `draft: true` — 下書き。ビルドから除外され公開されません
- `thumbnail` — `public/images/` 配下の画像パス(例: `/images/example.webp`)

### Markdown の拡張

`astro.config.mjs` で rehype プラグインを設定しています(Astro 7 の `markdown.processor` + `@astrojs/markdown-remark` の `unified()` 経由):

- **YouTube 自動埋め込み** (`src/plugins/rehype-youtube.mjs`) — 段落に YouTube の URL リンクだけを置くと、レスポンシブな `<iframe>` 埋め込みに変換されます(`watch?v=` / `youtu.be` / `/live/` 形式に対応)
- **外部リンク** ([rehype-external-links](https://github.com/rehypejs/rehype-external-links)) — 自動で `target="_blank"` と `rel="noopener noreferrer"` を付与

## デプロイ

`main` ブランチへの push をトリガーに、GitHub Actions (`.github/workflows/deploy.yml`) がビルドして GitHub Pages に公開します。手動デプロイは不要です。

## 履歴

旧バージョンのサイト(Nuxt.js + Netlify 構成)は `archive/nuxt-site` ブランチに保存されています。
