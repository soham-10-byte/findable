
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = 'https://findableseo.vercel.app';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you') && !page.includes('/404'),
    }),
  ],
});
