import { getCollection } from 'astro:content';
export const published = async (n: 'posts' | 'notes' | 'moments') =>
  (await getCollection(n)).filter(e => !e.data.draft).sort((a, b) => +b.data.date - +a.data.date);
export const readTime = (b = '') => Math.max(1, Math.round(b.split(/\s+/).length / 200)) + ' min read';
