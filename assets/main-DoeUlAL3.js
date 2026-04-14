import"./nav-D-Z93WdM.js";async function e(){try{let{projects:e}=await(await fetch(`./data/projects.json`)).json(),t=document.getElementById(`projects-grid`);if(!t)return;t.innerHTML=e.map((e,t)=>`
      <a class="project-card" href="${e.link||`#`}" target="_blank" style="--i:${t}; --clr:${e.color||`var(--accent)`}">
        <div class="project-color-bar"></div>
        <div class="project-body">
          <div class="project-top">
            <h3 class="project-title">${e.title}</h3>
            <span class="project-arrow">↗</span>
          </div>
          <p class="project-desc">${e.description}</p>
          <div class="project-tags">
            ${e.tags.map(e=>`<span class="tag">${e}</span>`).join(``)}
          </div>
          <div class="project-date mono muted">${o(e.date)}</div>
        </div>
      </a>
    `).join(``)}catch(e){console.warn(`projects load failed`,e)}}async function t(){try{let e=await(await fetch(`./data/posts.json`)).json(),t=document.getElementById(`posts-preview`);if(!t)return;t.innerHTML=[...e].sort((e,t)=>new Date(t.date)-new Date(e.date)).slice(0,3).map((e,t)=>`
      <a class="post-preview-item" href="./blog.html#${e.id}" style="--i:${t}">
        <div class="post-preview-meta">
          <span class="mono muted" style="font-size:0.75rem;">${o(e.date)}</span>
          <span class="post-preview-tag">${e.tags?.[0]||``}</span>
        </div>
        <h3 class="post-preview-title">${e.title}</h3>
        <p class="post-preview-excerpt">${e.excerpt}</p>
        <span class="mono muted" style="font-size:0.75rem;">${e.readTime} read →</span>
      </a>
    `).join(``)}catch(e){console.warn(`posts preview load failed`,e)}}function n(){let e=document.getElementById(`ai-portal`),t=document.getElementById(`portal-status`),n=document.getElementById(`insight-text`),r=[`Subject: Harshit. Trait: High-level curiosity detected.`,`Encoding Style: Pixel Perfect. Status: Building the future.`,`Location: France Node. Latency: 5ms.`,`Activity: Documenting Wildlife & Distributed Systems.`,`Stack: Vite + Vanilla JS. Vibe: Minimal & Sharp.`,`Pattern: Explorer. Vision: 0/1.`];e&&(e.addEventListener(`mouseenter`,()=>{t.textContent=`ANALYZING...`,setTimeout(()=>{n.textContent=r[Math.floor(Math.random()*r.length)],t.textContent=`SCAN COMPLETE`},600)}),e.addEventListener(`mouseleave`,()=>{t.textContent=`SYSTEM ACTIVE`}))}function r(){document.querySelectorAll(`.lang-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.lang-btn`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.poetry-content`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let t=document.getElementById(`poetry-${e.dataset.lang}`);t&&t.classList.add(`active`)})})}function i(){let e=document.querySelectorAll(`[data-reveal]`),t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`revealed`)})},{threshold:.15});e.forEach(e=>t.observe(e))}function a(){if(!window.matchMedia(`(hover: hover) and (min-width: 601px)`).matches)return;let e=document.querySelectorAll(`.gallery-item`),t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.style.opacity=`1`,e.target.style.transform=`translateY(0)`)})},{threshold:.1});e.forEach(e=>{e.style.opacity=`0`,e.style.transform=`translateY(30px)`,e.style.transition=`opacity 0.6s ease, transform 0.6s ease`,t.observe(e)})}function o(e){return new Date(e).toLocaleDateString(`en-US`,{year:`numeric`,month:`short`})}document.addEventListener(`DOMContentLoaded`,()=>{e(),t(),n(),r(),i(),a()});