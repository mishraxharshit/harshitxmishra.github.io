// ==========================================
// MAIN.JS — Homepage Logic
// ==========================================
import './utils/nav.js';
import { marked } from './utils/marked-mini.js';

// ── Projects ──
async function loadProjects() {
  try {
    const res = await fetch('./data/projects.json');
    const { projects } = await res.json();
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = projects.map((p, i) => `
      <a class="project-card" href="${p.link || '#'}" target="_blank" style="--i:${i}; --clr:${p.color || 'var(--accent)'}">
        <div class="project-color-bar"></div>
        <div class="project-body">
          <div class="project-top">
            <h3 class="project-title">${p.title}</h3>
            <span class="project-arrow">↗</span>
          </div>
          <p class="project-desc">${p.description}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="project-date mono muted">${formatDate(p.date)}</div>
        </div>
      </a>
    `).join('');
  } catch(e) {
    console.warn('projects load failed', e);
  }
}

// ── Blog Preview ──
async function loadPostsPreview() {
  try {
    const res = await fetch('./data/posts.json');
    const posts = await res.json();
    const container = document.getElementById('posts-preview');
    if (!container) return;

    const latest = [...posts].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    container.innerHTML = latest.map((p, i) => `
      <a class="post-preview-item" href="./blog.html#${p.id}" style="--i:${i}">
        <div class="post-preview-meta">
          <span class="mono muted" style="font-size:0.75rem;">${formatDate(p.date)}</span>
          <span class="post-preview-tag">${p.tags?.[0] || ''}</span>
        </div>
        <h3 class="post-preview-title">${p.title}</h3>
        <p class="post-preview-excerpt">${p.excerpt}</p>
        <span class="mono muted" style="font-size:0.75rem;">${p.readTime} read →</span>
      </a>
    `).join('');
  } catch(e) {
    console.warn('posts preview load failed', e);
  }
}

// ── AI Portal Interaction ──
function initPortal() {
  const portal = document.getElementById('ai-portal');
  const statusEl = document.getElementById('portal-status');
  const insightEl = document.getElementById('insight-text');

  const insights = [
    "Subject: Harshit. Trait: High-level curiosity detected.",
    "Encoding Style: Pixel Perfect. Status: Building the future.",
    "Location: France Node. Latency: 5ms.",
    "Activity: Documenting Wildlife & Distributed Systems.",
    "Stack: Vite + Vanilla JS. Vibe: Minimal & Sharp.",
    "Pattern: Explorer. Vision: 0/1.",
  ];

  if (!portal) return;
  portal.addEventListener('mouseenter', () => {
    statusEl.textContent = 'ANALYZING...';
    setTimeout(() => {
      insightEl.textContent = insights[Math.floor(Math.random() * insights.length)];
      statusEl.textContent = 'SCAN COMPLETE';
    }, 600);
  });
  portal.addEventListener('mouseleave', () => {
    statusEl.textContent = 'SYSTEM ACTIVE';
  });
}

// ── Language toggle for poetry ──
function initPoetry() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.poetry-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const el = document.getElementById(`poetry-${btn.dataset.lang}`);
      if (el) el.classList.add('active');
    });
  });
}

// ── Timeline scroll reveal ──
function initTimeline() {
  const nodes = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
  }, { threshold: 0.15 });
  nodes.forEach(n => io.observe(n));
}

// ── Gallery scroll animation ──
function initGallery() {
  if (!window.matchMedia('(hover: hover) and (min-width: 601px)').matches) return;
  const items = document.querySelectorAll('.gallery-item');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }});
  }, { threshold: 0.1 });
  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    io.observe(el);
  });
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { year:'numeric', month:'short' });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  loadPostsPreview();
  initPortal();
  initPoetry();
  initTimeline();
  initGallery();
});
