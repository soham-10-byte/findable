import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = process.env.PUBLIC_SITE_URL && !process.env.PUBLIC_SITE_URL.includes('TODO_')
  ? process.env.PUBLIC_SITE_URL
  : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://findable-website.vercel.app');

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
      filter: (page) => !page.includes('/thank-you') && !page.includes('/404'),
    }),
  ],
});

