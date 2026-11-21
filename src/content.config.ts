import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({ title: z.string(), date: z.coerce.date(), summary: z.string().default(''), tags: z.array(z.string()).default([]), draft: z.boolean().default(false) }),
});
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(), date: z.coerce.date(), excerpt: z.string().default(''), category: z.string().default('Writing'),
    tags: z.array(z.string()).default([]), cover: z.string().optional(), draft: z.boolean().default(false),
    pinned: z.boolean().default(false), updated: z.coerce.date().optional(),
  }),
});
const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(), course: z.string(), phase: z.string(), color: z.string().default('#1D6FA4'),
    order: z.coerce.number().default(1), subtitle: z.string().default(''), draft: z.boolean().default(false),
  }),
});
const moments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/moments' }),
  schema: z.object({ title: z.string(), date: z.coerce.date(), location: z.string().default(''), caption: z.string().default(''), image: z.string(), draft: z.boolean().default(false) }),
});
const sources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sources' }),
  schema: z.object({
    title: z.string(), type: z.enum(['paper', 'book', 'journal', 'website', 'video']).default('paper'), authors: z.string().default(''),
    year: z.coerce.number().optional(), venue: z.string().default(''), doi: z.string().default(''), url: z.string().default(''),
    status: z.enum(['to-read', 'reading', 'done']).default('reading'), license: z.enum(['open', 'copyrighted']).default('open'),
    date: z.coerce.date().optional(), tags: z.array(z.string()).default([]), summary: z.string().default(''), draft: z.boolean().default(false),
  }),
});
const logs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logs' }),
  schema: z.object({ source: z.string(), date: z.coerce.date(), pages: z.string().default(''), title: z.string().default(''), draft: z.boolean().default(false) }),
});
export const collections = { notes, posts, learn, moments, sources, logs };
