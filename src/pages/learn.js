// ==========================================
// LEARN.JS — Visual Learning + Claude AI
// ==========================================
import '../utils/nav.js';

// ── State ──
let currentCourse = null;
let currentTopic = null;
let allCourses = [];
let chatHistory = []; // per-topic conversation

// ── Load all course indexes ──
async function loadCourses() {
  try {
    const res = await fetch('./data/learn-content.json');
    const data = await res.json();
    allCourses = data.courses;
    buildSidebar(allCourses);
    buildLandingCards(allCourses);
  } catch(e) {
    console.error('Failed to load courses', e);
    document.getElementById('sidebar-nav').innerHTML =
      '<p class="mono muted" style="padding:1rem;">Could not load courses.</p>';
  }
}

// ── Build sidebar navigation ──
function buildSidebar(courses) {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  nav.innerHTML = courses.map(course => `
    <div class="sidebar-course" data-course="${course.id}">
      <div class="course-header" data-course-toggle="${course.id}">
        <div class="course-icon mono">${course.icon}</div>
        <span class="course-name">${course.title}</span>
        <span class="course-chevron">›</span>
      </div>
      <div class="course-topics" id="topics-${course.id}" style="display:none;">
        ${(course.phases || []).map(phase => `
          <div class="phase-group">
            <div class="phase-label mono muted">${phase.label}</div>
            ${phase.topics.map(topic => `
              <button class="topic-btn" data-course="${course.id}" data-topic="${topic.id}">
                ${topic.title}
              </button>
            `).join('')}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Course toggle
  nav.querySelectorAll('[data-course-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.courseToggle;
      const topics = document.getElementById(`topics-${id}`);
      const chevron = el.querySelector('.course-chevron');
      const isOpen = topics.style.display !== 'none';
      topics.style.display = isOpen ? 'none' : 'block';
      chevron.style.transform = isOpen ? '' : 'rotate(90deg)';
    });
  });

  // Topic select
  nav.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      nav.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadTopic(btn.dataset.course, btn.dataset.topic);
    });
  });
}

// ── Build landing course cards ──
function buildLandingCards(courses) {
  const container = document.getElementById('landing-courses');
  if (!container) return;
  container.innerHTML = courses.map(c => `
    <button class="landing-course-card" data-course="${c.id}">
      <div class="lc-icon mono">${c.icon}</div>
      <div class="lc-title">${c.title}</div>
      <div class="lc-count mono muted">
        ${c.phases?.reduce((acc, p) => acc + p.topics.length, 0) || 0} topics
      </div>
    </button>
  `).join('');

  container.querySelectorAll('.landing-course-card').forEach(card => {
    card.addEventListener('click', () => {
      const courseId = card.dataset.course;
      // Open first topic of course in sidebar
      const course = allCourses.find(c => c.id === courseId);
      if (!course?.phases?.[0]?.topics?.[0]) return;
      // Expand sidebar
      const topics = document.getElementById(`topics-${courseId}`);
      if (topics) topics.style.display = 'block';
      const chevron = document.querySelector(`[data-course-toggle="${courseId}"] .course-chevron`);
      if (chevron) chevron.style.transform = 'rotate(90deg)';
      loadTopic(courseId, course.phases[0].topics[0].id);
    });
  });
}

// ── Load a specific topic ──
async function loadTopic(courseId, topicId) {
  try {
    // Find topic in allCourses
    const course = allCourses.find(c => c.id === courseId);
    let topic = null;
    for (const phase of course.phases || []) {
      topic = phase.topics.find(t => t.id === topicId);
      if (topic) break;
    }
    if (!topic) return;

    currentCourse = course;
    currentTopic = topic;
    chatHistory = []; // reset chat for new topic

    // Show content, hide landing
    document.getElementById('learn-landing').style.display = 'none';
    document.getElementById('learn-content').style.display = 'block';

    // Set header
    document.getElementById('content-breadcrumb').textContent =
      `${course.title} › ${topic.breadcrumb || topic.title}`;
    document.getElementById('content-title').textContent = topic.pageTitle || topic.title;
    document.getElementById('content-subtitle').textContent = topic.pageSubtitle || '';

    // Render cards
    renderCards(topic.cards || []);

    // Activate AI panel for this topic
    activateAI(course, topic);

    // Mobile: show FAB
    document.getElementById('ai-mobile-fab').style.display = 'flex';

  } catch(e) {
    console.error('Failed to load topic', e);
  }
}

// ── Render topic cards ──
function renderCards(cards) {
  const grid = document.getElementById('cards-grid');
  if (!grid) return;

  grid.innerHTML = cards.map(card => {
    if (card.type === 'barchart') return renderBarChart(card);
    return renderStandardCard(card);
  }).join('');
}

function renderStandardCard(card) {
  const diffColor = { easy:'var(--accent-green)', medium:'var(--accent-orange)', hard:'var(--accent-red)' };
  return `
    <div class="content-card ${card.type || ''}">
      <div class="card-header">
        <div>
          <h3 class="card-title">${card.title}</h3>
          ${card.sub ? `<p class="card-sub muted">${card.sub}</p>` : ''}
        </div>
        ${card.difficulty ? `<span class="card-diff" style="color:${diffColor[card.difficulty] || 'var(--text-muted)'};">${card.difficulty}</span>` : ''}
      </div>
      ${card.body ? `<p class="card-body">${card.body}</p>` : ''}
      ${card.analogy ? `
        <div class="card-analogy">
          <div class="analogy-label mono muted">// analogy</div>
          <p class="analogy-text">${card.analogy}</p>
        </div>` : ''}
      ${card.insight ? `
        <div class="card-insight">
          <span class="insight-icon">✦</span>
          <p>${card.insight}</p>
        </div>` : ''}
    </div>
  `;
}

function renderBarChart(card) {
  return `
    <div class="content-card chart-card">
      <div class="card-header">
        <div>
          <h3 class="card-title">${card.title}</h3>
          ${card.sub ? `<p class="card-sub muted">${card.sub}</p>` : ''}
        </div>
      </div>
      <div class="barchart">
        ${(card.bars || []).map(bar => `
          <div class="bar-row">
            <div class="bar-label mono">${bar.name}</div>
            <div class="bar-track">
              <div class="bar-fill" style="width:${bar.width}%; background:${bar.color || 'var(--accent)'};">
                <span class="bar-meta mono">${bar.meta || ''}</span>
              </div>
            </div>
            <div class="bar-desc muted">${bar.label || ''}</div>
          </div>
        `).join('')}
      </div>
      ${card.analogy ? `
        <div class="card-analogy">
          <div class="analogy-label mono muted">// analogy</div>
          <p class="analogy-text">${card.analogy}</p>
        </div>` : ''}
      ${card.insight ? `
        <div class="card-insight">
          <span class="insight-icon">✦</span>
          <p>${card.insight}</p>
        </div>` : ''}
    </div>
  `;
}

// ── AI Panel ──
function activateAI(course, topic) {
  document.getElementById('ai-idle').style.display = 'none';
  document.getElementById('ai-active').style.display = 'flex';

  document.getElementById('ai-context-pill').innerHTML =
    `<span class="mono" style="font-size:0.7rem;">Context: ${course.title} › ${topic.title}</span>`;

  // Suggested questions based on topic
  const suggestions = generateSuggestions(topic);
  const suggestionsEl = document.getElementById('ai-suggestions');
  suggestionsEl.innerHTML = suggestions.map(s =>
    `<button class="suggestion-chip">${s}</button>`
  ).join('');

  suggestionsEl.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('ai-input').value = chip.textContent;
      sendMessage();
    });
  });

  // Clear old messages, add welcome
  const msgs = document.getElementById('ai-messages');
  msgs.innerHTML = `
    <div class="ai-msg ai-msg-bot">
      <div class="ai-msg-avatar">✦</div>
      <div class="ai-msg-text">
        Hi! I'm your tutor for <strong>${topic.title}</strong> in ${course.title}.
        Ask me anything — I'll explain it simply with examples.
      </div>
    </div>
  `;
}

function generateSuggestions(topic) {
  const base = [
    `Explain ${topic.title} simply`,
    `Give me a real-world example`,
    `What should I learn next?`,
  ];
  if (topic.title.toLowerCase().includes('law')) base.push('Why does this law matter?');
  if (topic.title.toLowerCase().includes('intro')) base.push('What are the key concepts?');
  return base.slice(0, 3);
}

// ── Send message to Claude ──
async function sendMessage() {
  const input = document.getElementById('ai-input');
  const text = input.value.trim();
  if (!text) return;

  const apiKey = document.getElementById('api-key-input')?.value?.trim();

  input.value = '';
  input.style.height = 'auto';

  const msgs = document.getElementById('ai-messages');

  // Add user message
  msgs.innerHTML += `
    <div class="ai-msg ai-msg-user">
      <div class="ai-msg-text">${escHtml(text)}</div>
    </div>
  `;

  // Add typing indicator
  const typingId = 'typing-' + Date.now();
  msgs.innerHTML += `
    <div class="ai-msg ai-msg-bot" id="${typingId}">
      <div class="ai-msg-avatar">✦</div>
      <div class="ai-msg-text ai-typing">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  msgs.scrollTop = msgs.scrollHeight;

  // Build context
  const contextStr = currentTopic ? `
You are a knowledgeable, friendly tutor. The student is studying: "${currentTopic.title}" in the course "${currentCourse?.title}".

Topic description: ${currentTopic.pageSubtitle || ''}

Cards/content in this topic:
${JSON.stringify(currentTopic.cards?.slice(0,3) || [], null, 2)}

Be concise but clear. Use analogies when helpful. Format with simple markdown if needed.
  `.trim() : 'You are a helpful learning tutor.';

  chatHistory.push({ role: 'user', content: text });

  try {
    let responseText = '';

    if (apiKey) {
      // Real Claude API call
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          system: contextStr,
          messages: chatHistory,
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      responseText = data.content?.[0]?.text || 'Sorry, no response.';
    } else {
      // Demo mode — smart fallback without API key
      await new Promise(r => setTimeout(r, 900));
      responseText = getDemoResponse(text, currentTopic);
    }

    chatHistory.push({ role: 'assistant', content: responseText });

    // Replace typing with real response
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.querySelector('.ai-msg-text').innerHTML = formatAIText(responseText);
    }

  } catch(err) {
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.querySelector('.ai-msg-text').innerHTML =
        `<span style="color:var(--accent-red)">Error: ${escHtml(err.message)}. Make sure your API key is correct.</span>`;
    }
  }

  msgs.scrollTop = msgs.scrollHeight;
}

// ── Smart demo responses when no API key ──
function getDemoResponse(question, topic) {
  const q = question.toLowerCase();
  const topicName = topic?.title || 'this concept';

  if (q.includes('example') || q.includes('real')) {
    return `Great question! A real-world example of **${topicName}**:\n\nThink of it like how your GPS recalculates a route when you take a wrong turn — it's constantly applying the same underlying principle to new data.\n\n*Add your Anthropic API key above to get full AI-powered answers specific to your question!*`;
  }
  if (q.includes('why') || q.includes('matter') || q.includes('important')) {
    return `**${topicName}** matters because it forms the foundation for everything that comes after it. Without this understanding, more advanced concepts become mysterious rather than logical.\n\n*Add your API key to unlock full Claude explanations!*`;
  }
  if (q.includes('next') || q.includes('after')) {
    return `After **${topicName}**, I'd recommend exploring the next topic in this phase, then moving to the next phase. The concepts build on each other deliberately.\n\n*Add your API key for personalized learning path recommendations!*`;
  }
  return `**${topicName}** is a fascinating concept. At its core, it's about understanding the relationship between inputs, processes, and outputs in a structured way.\n\nTo get full explanations tailored to your exact question, add your Anthropic API key in the field below — it's stored only in your browser.\n\n*Get your free API key at console.anthropic.com*`;
}

// ── Format AI response text (simple markdown) ──
function formatAIText(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Mobile AI FAB ──
function initMobileFAB() {
  const fab = document.getElementById('ai-mobile-fab');
  const panel = document.getElementById('ai-panel');
  if (!fab || !panel) return;

  fab.addEventListener('click', () => {
    panel.classList.toggle('mobile-open');
  });
}

// ── Auto-resize textarea ──
function initTextarea() {
  const input = document.getElementById('ai-input');
  if (!input) return;
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  document.getElementById('ai-send-btn')?.addEventListener('click', sendMessage);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  loadCourses();
  initMobileFAB();
  initTextarea();
});
