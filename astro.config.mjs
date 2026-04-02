// @ts-check
import { defineConfig } from 'astro/config';
import rehypeYoutube from './src/plugins/rehype-youtube.mjs';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  site: 'https://poisson.works',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  image: {
    domains: [],
  },
  markdown: {
    rehypePlugins: [
      rehypeYoutube,
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
});
