// In Learn topics, every "## Heading" starts a card (the heading plus everything until the next ##).
export default function rehypeCards() {
  return (tree, file) => {
    if (!/content[\\/]learn[\\/]/.test(String(file.path || (file.history && file.history[0]) || ''))) return;
    const out = []; let cur = null;
    for (const n of tree.children) {
      if (n.type === 'element' && n.tagName === 'h2') { cur = { type: 'element', tagName: 'section', properties: { className: ['card'] }, children: [n] }; out.push(cur); }
      else if (cur && !(n.type === 'text' && !n.value.trim())) cur.children.push(n);
      else out.push(n);
    }
    tree.children = out;
  };
}
