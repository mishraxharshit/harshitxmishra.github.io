import { published } from '@/lib/content';
import { getCourses } from '@/lib/learn';
import { getResearch } from '@/lib/research';
const U = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + p;
const strip = (b = '') => b.replace(/[`#>*_\[\]()!$|-]/g, ' ').replace(/\s+/g, ' ').slice(0, 2500);
export async function GET() {
  const items: any[] = [];
  (await published('posts')).forEach(p => items.push({ t: p.data.title, u: U(`/writing/${p.id}/`), k: 'Post', g: p.data.tags.join(' '), x: strip(p.body) }));
  (await published('notes')).forEach(n => items.push({ t: n.data.title, u: U(`/notes/${n.id}/`), k: 'Note', g: n.data.tags.join(' '), x: strip(n.body) }));
  (await getCourses()).forEach(c => c.topics.forEach((t: any) => items.push({ t: t.title, u: U(`/learn/${c.id}/${t.id}/`), k: c.title, g: t.phase.label, x: strip(t.entry.body) })));
  (await getResearch()).forEach(b => items.push({ t: b.src.data.title, u: U(`/research/${b.id}/`), k: 'Research', g: b.src.data.authors + ' ' + b.src.data.tags.join(' '), x: strip([b.src.body, ...b.notes.map((s: any) => s.body)].join(' ')) }));
  return new Response(JSON.stringify(items), { headers: { 'content-type': 'application/json' } });
}
