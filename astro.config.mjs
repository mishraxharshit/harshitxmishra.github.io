import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMedia from './plugins/rehype-media.mjs';
import rehypeCallouts from './plugins/rehype-callouts.mjs';
import rehypeCards from './plugins/rehype-cards.mjs';
import rehypeBase from './plugins/rehype-base.mjs';

// Repo is "harshitxmishra.github.io" under user "mishraxharshit", so GitHub serves it at /<repo>/.
// If you ever rename the repo to "mishraxharshit.github.io", set base to '/'.
const base = '/harshitxmishra.github.io';

export default defineConfig({
  site: 'https://mishraxharshit.github.io',
  base,
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMedia, rehypeCallouts, rehypeCards, rehypeKatex, [rehypeBase, { base }]],
  },
});
