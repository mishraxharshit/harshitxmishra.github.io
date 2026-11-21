import { published } from '@/lib/content';
const esc = (s: string) => s.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]!));
export async function GET(ctx: any) {
  const site = ctx.site.href.replace(/\/$/, '') + import.meta.env.BASE_URL.replace(/\/$/, '');
  const items = (await published('posts')).map(p => `<item><title>${esc(p.data.title)}</title><link>${site}/writing/${p.id}/</link><guid>${site}/writing/${p.id}/</guid><pubDate>${p.data.date.toUTCString()}</pubDate><description>${esc(p.data.excerpt)}</description></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Harshit Mishra</title><link>${site}</link><description>Writing</description>${items}</channel></rss>`, { headers: { 'content-type': 'application/xml' } });
}
