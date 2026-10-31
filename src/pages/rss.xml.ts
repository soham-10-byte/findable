import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(siteConfig.url);
  const posts = await getCollection('blog');
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description}]]></description>
      <link>${new URL(`/blog/${post.slug}`, base).href}</link>
      <guid>${new URL(`/blog/${post.slug}`, base).href}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <author>${siteConfig.contact.email} (${post.data.author})</author>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <description>${siteConfig.description}</description>
    <link>${base.href}</link>
    <atom:link href="${new URL('/rss.xml', base).href}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

