import"./nav-D-Z93WdM.js";var e=null,t=null,n=[],r=[];async function i(){try{n=(await(await fetch(`./data/learn-content.json`)).json()).courses,a(n),o(n)}catch(e){console.error(`Failed to load courses`,e),document.getElementById(`sidebar-nav`).innerHTML=`<p class="mono muted" style="padding:1rem;">Could not load courses.</p>`}}function a(e){let t=document.getElementById(`sidebar-nav`);t&&(t.innerHTML=e.map(e=>`
    <div class="sidebar-course" data-course="${e.id}">
      <div class="course-header" data-course-toggle="${e.id}">
        <div class="course-icon mono">${e.icon}</div>
        <span class="course-name">${e.title}</span>
        <span class="course-chevron">›</span>
      </div>
      <div class="course-topics" id="topics-${e.id}" style="display:none;">
        ${(e.phases||[]).map(t=>`
          <div class="phase-group">
            <div class="phase-label mono muted">${t.label}</div>
            ${t.topics.map(t=>`
              <button class="topic-btn" data-course="${e.id}" data-topic="${t.id}">
                ${t.title}
              </button>
            `).join(``)}
          </div>
        `).join(``)}
      </div>
    </div>
  `).join(``),t.querySelectorAll(`[data-course-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.courseToggle,n=document.getElementById(`topics-${t}`),r=e.querySelector(`.course-chevron`),i=n.style.display!==`none`;n.style.display=i?`none`:`block`,r.style.transform=i?``:`rotate(90deg)`})}),t.querySelectorAll(`.topic-btn`).forEach(e=>{e.addEventListener(`click`,()=>{t.querySelectorAll(`.topic-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),s(e.dataset.course,e.dataset.topic)})}))}function o(e){let t=document.getElementById(`landing-courses`);t&&(t.innerHTML=e.map(e=>`
    <button class="landing-course-card" data-course="${e.id}">
      <div class="lc-icon mono">${e.icon}</div>
      <div class="lc-title">${e.title}</div>
      <div class="lc-count mono muted">
        ${e.phases?.reduce((e,t)=>e+t.topics.length,0)||0} topics
      </div>
    </button>
  `).join(``),t.querySelectorAll(`.landing-course-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.course,r=n.find(e=>e.id===t);if(!r?.phases?.[0]?.topics?.[0])return;let i=document.getElementById(`topics-${t}`);i&&(i.style.display=`block`);let a=document.querySelector(`[data-course-toggle="${t}"] .course-chevron`);a&&(a.style.transform=`rotate(90deg)`),s(t,r.phases[0].topics[0].id)})}))}async function s(i,a){try{let o=n.find(e=>e.id===i),s=null;for(let e of o.phases||[])if(s=e.topics.find(e=>e.id===a),s)break;if(!s)return;e=o,t=s,r=[],document.getElementById(`learn-landing`).style.display=`none`,document.getElementById(`learn-content`).style.display=`block`,document.getElementById(`content-breadcrumb`).textContent=`${o.title} › ${s.breadcrumb||s.title}`,document.getElementById(`content-title`).textContent=s.pageTitle||s.title,document.getElementById(`content-subtitle`).textContent=s.pageSubtitle||``,c(s.cards||[]),d(o,s),document.getElementById(`ai-mobile-fab`).style.display=`flex`}catch(e){console.error(`Failed to load topic`,e)}}function c(e){let t=document.getElementById(`cards-grid`);t&&(t.innerHTML=e.map(e=>e.type===`barchart`?u(e):l(e)).join(``))}function l(e){return`
    <div class="content-card ${e.type||``}">
      <div class="card-header">
        <div>
          <h3 class="card-title">${e.title}</h3>
          ${e.sub?`<p class="card-sub muted">${e.sub}</p>`:``}
        </div>
        ${e.difficulty?`<span class="card-diff" style="color:${{easy:`var(--accent-green)`,medium:`var(--accent-orange)`,hard:`var(--accent-red)`}[e.difficulty]||`var(--text-muted)`};">${e.difficulty}</span>`:``}
      </div>
      ${e.body?`<p class="card-body">${e.body}</p>`:``}
      ${e.analogy?`
        <div class="card-analogy">
          <div class="analogy-label mono muted">// analogy</div>
          <p class="analogy-text">${e.analogy}</p>
        </div>`:``}
      ${e.insight?`
        <div class="card-insight">
          <span class="insight-icon">✦</span>
          <p>${e.insight}</p>
        </div>`:``}
    </div>
  `}function u(e){return`
    <div class="content-card chart-card">
      <div class="card-header">
        <div>
          <h3 class="card-title">${e.title}</h3>
          ${e.sub?`<p class="card-sub muted">${e.sub}</p>`:``}
        </div>
      </div>
      <div class="barchart">
        ${(e.bars||[]).map(e=>`
          <div class="bar-row">
            <div class="bar-label mono">${e.name}</div>
            <div class="bar-track">
              <div class="bar-fill" style="width:${e.width}%; background:${e.color||`var(--accent)`};">
                <span class="bar-meta mono">${e.meta||``}</span>
              </div>
            </div>
            <div class="bar-desc muted">${e.label||``}</div>
          </div>
        `).join(``)}
      </div>
      ${e.analogy?`
        <div class="card-analogy">
          <div class="analogy-label mono muted">// analogy</div>
          <p class="analogy-text">${e.analogy}</p>
        </div>`:``}
      ${e.insight?`
        <div class="card-insight">
          <span class="insight-icon">✦</span>
          <p>${e.insight}</p>
        </div>`:``}
    </div>
  `}function d(e,t){document.getElementById(`ai-idle`).style.display=`none`,document.getElementById(`ai-active`).style.display=`flex`,document.getElementById(`ai-context-pill`).innerHTML=`<span class="mono" style="font-size:0.7rem;">Context: ${e.title} › ${t.title}</span>`;let n=f(t),r=document.getElementById(`ai-suggestions`);r.innerHTML=n.map(e=>`<button class="suggestion-chip">${e}</button>`).join(``),r.querySelectorAll(`.suggestion-chip`).forEach(e=>{e.addEventListener(`click`,()=>{document.getElementById(`ai-input`).value=e.textContent,p()})});let i=document.getElementById(`ai-messages`);i.innerHTML=`
    <div class="ai-msg ai-msg-bot">
      <div class="ai-msg-avatar">✦</div>
      <div class="ai-msg-text">
        Hi! I'm your tutor for <strong>${t.title}</strong> in ${e.title}.
        Ask me anything — I'll explain it simply with examples.
      </div>
    </div>
  `}function f(e){let t=[`Explain ${e.title} simply`,`Give me a real-world example`,`What should I learn next?`];return e.title.toLowerCase().includes(`law`)&&t.push(`Why does this law matter?`),e.title.toLowerCase().includes(`intro`)&&t.push(`What are the key concepts?`),t.slice(0,3)}async function p(){let n=document.getElementById(`ai-input`),i=n.value.trim();if(!i)return;let a=document.getElementById(`api-key-input`)?.value?.trim();n.value=``,n.style.height=`auto`;let o=document.getElementById(`ai-messages`);o.innerHTML+=`
    <div class="ai-msg ai-msg-user">
      <div class="ai-msg-text">${g(i)}</div>
    </div>
  `;let s=`typing-`+Date.now();o.innerHTML+=`
    <div class="ai-msg ai-msg-bot" id="${s}">
      <div class="ai-msg-avatar">✦</div>
      <div class="ai-msg-text ai-typing">
        <span></span><span></span><span></span>
      </div>
    </div>
  `,o.scrollTop=o.scrollHeight;let c=t?`
You are a knowledgeable, friendly tutor. The student is studying: "${t.title}" in the course "${e?.title}".

Topic description: ${t.pageSubtitle||``}

Cards/content in this topic:
${JSON.stringify(t.cards?.slice(0,3)||[],null,2)}

Be concise but clear. Use analogies when helpful. Format with simple markdown if needed.
  `.trim():`You are a helpful learning tutor.`;r.push({role:`user`,content:i});try{let e=``;if(a){let t=await(await fetch(`https://api.anthropic.com/v1/messages`,{method:`POST`,headers:{"Content-Type":`application/json`,"x-api-key":a,"anthropic-version":`2023-06-01`,"anthropic-dangerous-direct-browser-access":`true`},body:JSON.stringify({model:`claude-sonnet-4-20250514`,max_tokens:800,system:c,messages:r})})).json();if(t.error)throw Error(t.error.message);e=t.content?.[0]?.text||`Sorry, no response.`}else await new Promise(e=>setTimeout(e,900)),e=m(i,t);r.push({role:`assistant`,content:e});let n=document.getElementById(s);n&&(n.querySelector(`.ai-msg-text`).innerHTML=h(e))}catch(e){let t=document.getElementById(s);t&&(t.querySelector(`.ai-msg-text`).innerHTML=`<span style="color:var(--accent-red)">Error: ${g(e.message)}. Make sure your API key is correct.</span>`)}o.scrollTop=o.scrollHeight}function m(e,t){let n=e.toLowerCase(),r=t?.title||`this concept`;return n.includes(`example`)||n.includes(`real`)?`Great question! A real-world example of **${r}**:\n\nThink of it like how your GPS recalculates a route when you take a wrong turn — it's constantly applying the same underlying principle to new data.\n\n*Add your Anthropic API key above to get full AI-powered answers specific to your question!*`:n.includes(`why`)||n.includes(`matter`)||n.includes(`important`)?`**${r}** matters because it forms the foundation for everything that comes after it. Without this understanding, more advanced concepts become mysterious rather than logical.\n\n*Add your API key to unlock full Claude explanations!*`:n.includes(`next`)||n.includes(`after`)?`After **${r}**, I'd recommend exploring the next topic in this phase, then moving to the next phase. The concepts build on each other deliberately.\n\n*Add your API key for personalized learning path recommendations!*`:`**${r}** is a fascinating concept. At its core, it's about understanding the relationship between inputs, processes, and outputs in a structured way.\n\nTo get full explanations tailored to your exact question, add your Anthropic API key in the field below — it's stored only in your browser.\n\n*Get your free API key at console.anthropic.com*`}function h(e){return e.replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`).replace(/\*(.+?)\*/g,`<em>$1</em>`).replace(/`([^`]+)`/g,`<code>$1</code>`).replace(/\n\n/g,`</p><p>`).replace(/\n/g,`<br>`).replace(/^/,`<p>`).replace(/$/,`</p>`)}function g(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function _(){let e=document.getElementById(`ai-mobile-fab`),t=document.getElementById(`ai-panel`);!e||!t||e.addEventListener(`click`,()=>{t.classList.toggle(`mobile-open`)})}function v(){let e=document.getElementById(`ai-input`);e&&(e.addEventListener(`input`,()=>{e.style.height=`auto`,e.style.height=Math.min(e.scrollHeight,120)+`px`}),e.addEventListener(`keydown`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),p())}),document.getElementById(`ai-send-btn`)?.addEventListener(`click`,p))}document.addEventListener(`DOMContentLoaded`,()=>{i(),_(),v()});