import { getCollection } from 'astro:content';
export const TYPES: Record<string, string> = { paper: 'Paper', book: 'Book', journal: 'Journal', website: 'Website', video: 'Video' };
export const STATUS: Record<string, string> = { 'to-read': 'To read', reading: 'Reading', done: 'Done' };
// sources (src/content/sources/<id>.md) + their notes (src/content/logs/<id>--<date>.md, matched by `source`)
export async function getResearch() {
  const srcs = (await getCollection('sources')).filter(b => !b.data.draft);
  const logs = (await getCollection('logs')).filter(r => !r.data.draft).sort((a, b) => +b.data.date - +a.data.date);
  return srcs.map(src => ({ id: src.id, src, notes: logs.filter(l => l.data.source === src.id) }))
    .sort((a, b) => +(b.src.data.date || 0) - +(a.src.data.date || 0));
}
export const authorList = (s = '') => s.split(';').map(x => x.trim()).filter(Boolean);
export const lastName = (a: string) => { a = a.trim(); if (a.includes(',')) return a.split(',')[0].trim(); const p = a.split(/\s+/); return p[p.length - 1]; };
export const shortAuthors = (s = '') => { const a = authorList(s); return !a.length ? '' : a.length === 1 ? lastName(a[0]) : a.length === 2 ? `${lastName(a[0])} & ${lastName(a[1])}` : `${lastName(a[0])} et al.`; };
export function bibtex(id: string, d: any) {
  const a = authorList(d.authors), kind = d.type === 'book' ? 'book' : d.type === 'paper' || d.type === 'journal' ? 'article' : 'misc';
  const key = ((a[0] ? lastName(a[0]) : id) + (d.year ?? '') + d.title.split(/\s+/)[0]).toLowerCase().replace(/[^a-z0-9]/g, '');
  const f: [string, any][] = [['author', a.join(' and ')], ['title', d.title], ['year', d.year], [kind === 'article' ? 'journal' : kind === 'book' ? 'publisher' : 'howpublished', d.venue], ['doi', d.doi], ['url', d.url]];
  return `@${kind}{${key},\n${f.filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => `  ${k} = {${v}}`).join(',\n')}\n}`;
}
export function extract(body = '', kind: string) {
  const out: string[] = [], re = new RegExp(`^>\\s*\\[!${kind}\\]\\s*(.*)$`, 'i');
  for (const blk of body.split(/\n{2,}/)) { const L = blk.split('\n'), m = L[0].match(re); if (!m) continue;
    const t = [m[1], ...L.slice(1).map(l => l.replace(/^>\s?/, ''))].join(' ').trim(); if (t) out.push(t); }
  return out;
}
const imgs = (body = '') => [...body.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map(m => m[1]).filter(s => !/^youtube:/.test(s) && !/\.(mp4|webm|mov|m4v)$/i.test(s));
export const penImages = (body = '') => imgs(body).filter(s => s.includes('/media/pen/'));
export const figureImages = (body = '') => imgs(body).filter(s => !s.includes('/media/pen/'));
