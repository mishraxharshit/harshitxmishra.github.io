// Markdown content stays portable (/media/x.jpg); at build time root-relative src/href get the base path.
const walk = (n, f) => { f(n); (n.children || []).forEach(c => walk(c, f)); };
export default function rehypeBase({ base = '' } = {}) {
  const b = base.replace(/\/$/, '');
  return tree => { if (!b) return; walk(tree, n => {
    if (n.type !== 'element' || !n.properties) return;
    for (const k of ['src', 'href']) { const v = n.properties[k];
      if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(b + '/')) n.properties[k] = b + v; }
  }); };
}
