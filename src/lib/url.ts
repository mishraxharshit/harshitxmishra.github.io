// Prefixes internal links with the site's base path (see astro.config.mjs).
export const u = (p = '') => import.meta.env.BASE_URL.replace(/\/$/, '') + p;
