// Turns a lone image line into <figure>: photo, <video> (.mp4/.webm/.mov) or YouTube (![title](youtube:ID)).
const VID = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;
const walk = (n, f) => { f(n); (n.children || []).forEach(c => walk(c, f)); };
const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
export default function rehypeMedia() {
  return tree => walk(tree, n => {
    if (n.type !== 'element' || n.tagName !== 'p' || n.children.length !== 1) return;
    const i = n.children[0];
    if (i.type !== 'element' || i.tagName !== 'img') return;
    const { src = '', alt = '' } = i.properties; const yt = src.match(/^youtube:([\w-]{6,})/); let m;
    if (yt) m = el('iframe', { src: `https://www.youtube-nocookie.com/embed/${yt[1]}`, loading: 'lazy', allowfullscreen: true, title: alt || 'Video' });
    else if (VID.test(src)) m = el('video', { src, controls: true, playsinline: true, preload: 'metadata' });
    else { i.properties.loading = 'lazy'; i.properties.decoding = 'async'; m = i; }
    n.tagName = 'figure'; n.children = [m];
    if (alt) n.children.push(el('figcaption', {}, [{ type: 'text', value: alt }]));
  });
}
