// ==========================================
// BLOG.JS — Full Blog System
// ==========================================
import '../utils/nav.js';
import { marked } from '../utils/marked-mini.js';

let allPosts = [];
let activeTag = 'all';
let searchQuery = '';

// ── Load all posts ──
async function loadPosts() {
  try {
    const res = await fetch('./data/posts.json');
    allPosts = await res.json();
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    buildTagFilters();
    renderPosts();

    const countEl = document.getElementById('post-count');
    if (countEl) countEl.textContent = allPosts.length;

    // Check if URL has a hash (direct link to post)
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const post = allPosts.find(p => p.id === id);
      if (post) openPost(post);
    }
  } catch(e) {
    console.error('Failed to load posts', e);
    document.getElementById('posts-list').innerHTML =
      '<p class="mono muted" style="padding:2rem 0;">Could not load posts. Check /public/data/posts.json</p>';
  }
}

// ── Build tag filter buttons ──
function buildTagFilters() {
  const tagSet = new Set(['all']);
  allPosts.forEach(p => p.tags?.forEach(t => tagSet.add(t)));

  const bar = document.getElementById('filter-bar');
  if (!bar) return;
  bar.innerHTML = [...tagSet].map(tag => `
    <button class="filter-btn${tag === 'all' ? ' active' : ''}" data-tag="${tag}">
      ${tag}
    </button>
  `).join('');

  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTag = btn.dataset.tag;
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPosts();
    });
  });
}

// ── Filter & render post list ──
function renderPosts() {
  const filtered = allPosts.filter(p => {
    const tagMatch = activeTag === 'all' || p.tags?.includes(activeTag);
    const searchMatch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery) ||
      p.excerpt?.toLowerCase().includes(searchQuery) ||
      p.tags?.some(t => t.includes(searchQuery));
    return tagMatch && searchMatch;
  });

  const list = document.getElementById('posts-list');
  if (!list) return;

  if (filtered.length === 0) {
    list.innerHTML = '<p class="mono muted" style="padding:2rem 0;">No posts found.</p>';
    return;
  }

  list.innerHTML = filtered.map((p, i) => `
    <article class="post-item fade-in" style="--i:${i}" data-id="${p.id}">
      <div class="post-item-left">
        <time class="post-item-date mono muted">${formatDate(p.date)}</time>
        <div class="post-item-tags">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="post-item-center">
        <h2 class="post-item-title">${p.title}</h2>
        <p class="post-item-excerpt">${p.excerpt || ''}</p>
      </div>
      <div class="post-item-right">
        <span class="mono muted" style="font-size:0.75rem;">${p.readTime || ''}</span>
        <span class="post-item-arrow">→</span>
      </div>
    </article>
  `).join('');

  list.querySelectorAll('.post-item').forEach(el => {
    el.addEventListener('click', () => {
      const post = allPosts.find(p => p.id === el.dataset.id);
      if (post) openPost(post);
    });
  });
}

// ── Open a post in inline reader ──
function openPost(post) {
  const listView = document.getElementById('posts-list');
  const filterBar = document.getElementById('filter-bar');
  const searchBar = document.querySelector('.search-bar');
  const blogHeader = document.querySelector('.blog-header');
  const reader = document.getElementById('post-reader');
  const article = document.getElementById('post-article');

  // Hide list, show reader
  [listView, filterBar, searchBar, blogHeader].forEach(el => el && (el.style.display = 'none'));
  reader.style.display = 'block';
  window.location.hash = post.id;
  window.scrollTo(0, 0);

  article.innerHTML = `
    <header class="post-article-header">
      <div class="post-article-meta">
        <time class="mono muted">${formatDateLong(post.date)}</time>
        <div class="post-article-tags">
          ${(post.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <span class="mono muted" style="font-size:0.8rem;">${post.readTime || ''} read</span>
      </div>
    </header>
    <div class="post-article-body">
      ${marked(post.body || '')}
    </div>
  `;
}

// ── Back button ──
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('back-btn')?.addEventListener('click', () => {
    document.getElementById('post-reader').style.display = 'none';
    ['posts-list','filter-bar','search-bar','blog-header'].forEach(id => {
      const el = document.getElementById(id) || document.querySelector('.' + id);
      if (el) el.style.display = '';
    });
    // restore proper display for divs
    document.querySelector('.search-bar') && (document.querySelector('.search-bar').style.display = '');
    document.querySelector('.blog-header') && (document.querySelector('.blog-header').style.display = '');
    document.getElementById('filter-bar') && (document.getElementById('filter-bar').style.display = '');
    document.getElementById('posts-list') && (document.getElementById('posts-list').style.display = '');
    window.location.hash = '';
  });

  // Search
  document.getElementById('search-input')?.addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderPosts();
  });

  loadPosts();
});

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
}
function formatDateLong(str) {
  return new Date(str).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
}
