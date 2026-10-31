import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL(siteConfig.url);
  const body = [
    '# Findable robots.txt',
    '# All crawlers (search engines and AI search bots) are welcome.',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('/sitemap-index.xml', base).href}`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

