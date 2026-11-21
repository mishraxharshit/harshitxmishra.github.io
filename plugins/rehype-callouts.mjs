// > [!TIP] / [!NOTE] / [!INFO] / [!WARNING] / [!DANGER]  ->  styled callout box
const T = { note: 'Note', tip: 'Tip', info: 'Info', warning: 'Warning', danger: 'Danger', highlight: 'Highlight', question: 'Question', idea: 'Idea' };
const walk = (n, f) => { f(n); (n.children || []).forEach(c => walk(c, f)); };
export default function rehypeCallouts() {
  return tree => walk(tree, n => {
    if (n.type !== 'element' || n.tagName !== 'blockquote') return;
    const p = n.children.find(c => c.type === 'element' && c.tagName === 'p'); const t = p && p.children[0];
    const m = t && t.type === 'text' && t.value.match(/^\[!(\w+)\]\s*/i);
    if (!m || !T[m[1].toLowerCase()]) return;
    const k = m[1].toLowerCase(); t.value = t.value.slice(m[0].length);
    n.tagName = 'div'; n.properties = { className: ['callout', k] };
    n.children.unshift({ type: 'element', tagName: 'p', properties: { className: ['t'] }, children: [{ type: 'text', value: T[k] }] });
  });
}
