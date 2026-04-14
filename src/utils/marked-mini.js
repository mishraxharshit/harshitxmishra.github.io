// ── Ultra-lightweight Markdown → HTML parser ──
// Handles: headings, bold, italic, code blocks, inline code, blockquotes, lists, paragraphs, hr

export function marked(md) {
  if (!md) return '';
  let html = md
    // fenced code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre><code class="lang-${lang || 'text'}">${escHtml(code.trim())}</code></pre>`)
    // headings
    .replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>')
    // hr
    .replace(/^---$/gm, '<hr>')
    // blockquote
    .replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>')
    // unordered list items
    .replace(/^\-\s+(.+)$/gm, '<li>$1</li>')
    // ordered list
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // paragraphs: double newline
    .replace(/\n\n(?!<[hlbpc])/g, '</p><p>')
    .replace(/^(?!<[hlbpc])/m, '<p>')
    .replace(/(?<![>])$/m, '</p>');

  // wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*<\/li>(\n|$))+/g, m => `<ul>${m}</ul>`);
  return html;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
