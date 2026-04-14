import"./nav-D-Z93WdM.js";import{t as e}from"./marked-mini-DTJTZDdd.js";var t=[],n=`all`,r=``;async function i(){try{t=await(await fetch(`./data/posts.json`)).json(),t.sort((e,t)=>new Date(t.date)-new Date(e.date)),a(),o();let e=document.getElementById(`post-count`);if(e&&(e.textContent=t.length),window.location.hash){let e=window.location.hash.slice(1),n=t.find(t=>t.id===e);n&&s(n)}}catch(e){console.error(`Failed to load posts`,e),document.getElementById(`posts-list`).innerHTML=`<p class="mono muted" style="padding:2rem 0;">Could not load posts. Check /public/data/posts.json</p>`}}function a(){let e=new Set([`all`]);t.forEach(t=>t.tags?.forEach(t=>e.add(t)));let r=document.getElementById(`filter-bar`);r&&(r.innerHTML=[...e].map(e=>`
    <button class="filter-btn${e===`all`?` active`:``}" data-tag="${e}">
      ${e}
    </button>
  `).join(``),r.querySelectorAll(`.filter-btn`).forEach(e=>{e.addEventListener(`click`,()=>{n=e.dataset.tag,r.querySelectorAll(`.filter-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),o()})}))}function o(){let e=t.filter(e=>{let t=n===`all`||e.tags?.includes(n),i=!r||e.title.toLowerCase().includes(r)||e.excerpt?.toLowerCase().includes(r)||e.tags?.some(e=>e.includes(r));return t&&i}),i=document.getElementById(`posts-list`);if(i){if(e.length===0){i.innerHTML=`<p class="mono muted" style="padding:2rem 0;">No posts found.</p>`;return}i.innerHTML=e.map((e,t)=>`
    <article class="post-item fade-in" style="--i:${t}" data-id="${e.id}">
      <div class="post-item-left">
        <time class="post-item-date mono muted">${c(e.date)}</time>
        <div class="post-item-tags">
          ${(e.tags||[]).map(e=>`<span class="tag">${e}</span>`).join(``)}
        </div>
      </div>
      <div class="post-item-center">
        <h2 class="post-item-title">${e.title}</h2>
        <p class="post-item-excerpt">${e.excerpt||``}</p>
      </div>
      <div class="post-item-right">
        <span class="mono muted" style="font-size:0.75rem;">${e.readTime||``}</span>
        <span class="post-item-arrow">→</span>
      </div>
    </article>
  `).join(``),i.querySelectorAll(`.post-item`).forEach(e=>{e.addEventListener(`click`,()=>{let n=t.find(t=>t.id===e.dataset.id);n&&s(n)})})}}function s(t){let n=document.getElementById(`posts-list`),r=document.getElementById(`filter-bar`),i=document.querySelector(`.search-bar`),a=document.querySelector(`.blog-header`),o=document.getElementById(`post-reader`),s=document.getElementById(`post-article`);[n,r,i,a].forEach(e=>e&&(e.style.display=`none`)),o.style.display=`block`,window.location.hash=t.id,window.scrollTo(0,0),s.innerHTML=`
    <header class="post-article-header">
      <div class="post-article-meta">
        <time class="mono muted">${l(t.date)}</time>
        <div class="post-article-tags">
          ${(t.tags||[]).map(e=>`<span class="tag">${e}</span>`).join(``)}
        </div>
        <span class="mono muted" style="font-size:0.8rem;">${t.readTime||``} read</span>
      </div>
    </header>
    <div class="post-article-body">
      ${e(t.body||``)}
    </div>
  `}document.addEventListener(`DOMContentLoaded`,()=>{document.getElementById(`back-btn`)?.addEventListener(`click`,()=>{document.getElementById(`post-reader`).style.display=`none`,[`posts-list`,`filter-bar`,`search-bar`,`blog-header`].forEach(e=>{let t=document.getElementById(e)||document.querySelector(`.`+e);t&&(t.style.display=``)}),document.querySelector(`.search-bar`)&&(document.querySelector(`.search-bar`).style.display=``),document.querySelector(`.blog-header`)&&(document.querySelector(`.blog-header`).style.display=``),document.getElementById(`filter-bar`)&&(document.getElementById(`filter-bar`).style.display=``),document.getElementById(`posts-list`)&&(document.getElementById(`posts-list`).style.display=``),window.location.hash=``}),document.getElementById(`search-input`)?.addEventListener(`input`,e=>{r=e.target.value.toLowerCase().trim(),o()}),i()});function c(e){return new Date(e).toLocaleDateString(`en-US`,{year:`numeric`,month:`short`,day:`numeric`})}function l(e){return new Date(e).toLocaleDateString(`en-US`,{year:`numeric`,month:`long`,day:`numeric`})}