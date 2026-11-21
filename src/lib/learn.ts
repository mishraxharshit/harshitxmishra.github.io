import { getCollection } from 'astro:content';
export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// course -> phases -> numbered topics, built from src/content/learn/<course>/<topic>.md
export async function getCourses() {
  const all = (await getCollection('learn')).filter(e => !e.data.draft)
    .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
  const map = new Map<string, any>();
  for (const e of all) {
    const d = e.data, cid = slug(d.course);
    if (!map.has(cid)) map.set(cid, { id: cid, title: d.course, phases: [], topics: [] });
    const c = map.get(cid); let p = c.phases.find((x: any) => x.label === d.phase);
    if (!p) { p = { label: d.phase, color: d.color, topics: [] }; c.phases.push(p); }
    const t = { id: e.id.split('/').pop()!, title: d.title, subtitle: d.subtitle, entry: e, phase: p, n: c.topics.length + 1 };
    c.topics.push(t); p.topics.push(t);
  }
  return [...map.values()];
}
