/* ============================================================
   CEC SAFETY STUDIO — APP
   State, DOM helpers, rendering functions, event wiring.
   Depends on globals from logos.js and data.js.
   ============================================================ */

const state = {
  view: 'browse',
  filter: 'all',
  search: '',
  template: null,  // currently editing
  config: null,    // current sign config (working copy)
  brand: 'cec_safety',  // current logo choice
  previewMode: 'paper',
  igTopic: 'arc_flash',
  ig: null,        // current infographic working copy
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ------------------------------------------------------------
   INIT
   ------------------------------------------------------------ */
function init() {
  // Date in folio
  $('#folio-date').textContent = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();

  // Brand logo in masthead
  setBrandLogo(state.brand);

  // Tab navigation
  $$('.tab').forEach(t => t.addEventListener('click', () => switchView(t.dataset.view)));

  // Browse view
  renderBrowse();
  $$('.chip[data-filter]').forEach(c => c.addEventListener('click', () => {
    state.filter = c.dataset.filter;
    $$('.chip[data-filter]').forEach(x => x.classList.toggle('active', x === c));
    renderBrowse();
  }));
  $('#search-input').addEventListener('input', e => {
    state.search = e.target.value.toLowerCase();
    renderBrowse();
  });

  // Compose default — load first template
  loadTemplate(TEMPLATES[5]); // High Voltage as default
  $$('.preview-tab').forEach(t => t.addEventListener('click', () => {
    state.previewMode = t.dataset.mode;
    $$('.preview-tab').forEach(x => x.classList.toggle('active', x === t));
    $('#preview-stage').dataset.mode = state.previewMode;
  }));
  $('#btn-print').addEventListener('click', () => {
    document.body.dataset.printing = 'sign';
    setTimeout(() => { window.print(); delete document.body.dataset.printing; }, 50);
  });

  // Infographic view
  const select = $('#ig-topic');
  INFOGRAPHICS.forEach(ig => {
    const opt = document.createElement('option');
    opt.value = ig.id;
    opt.textContent = ig.topic;
    select.appendChild(opt);
  });
  select.addEventListener('change', e => {
    state.igTopic = e.target.value;
    loadInfographic();
  });
  $$('.chip[data-ig-action]').forEach(b => b.addEventListener('click', () => {
    const action = b.dataset.igAction;
    if (action === 'reset') loadInfographic();
    if (action === 'randomize') {
      const random = INFOGRAPHICS[Math.floor(Math.random() * INFOGRAPHICS.length)];
      state.igTopic = random.id;
      $('#ig-topic').value = random.id;
      loadInfographic();
    }
    if (action === 'hero-clear') {
      if (state.ig) {
        state.ig.heroPhoto = '';
        state.ig.heroCredit = '';
      }
      $('#ig-hero-url').value = '';
      renderInfographic();
      renderPhotoGallery();
      toast('Using editorial illustration');
    }
    if (action === 'hero-suggest') {
      const q = state.ig ? state.ig.topic.split('·')[0].trim() : 'industrial safety';
      window.open(`https://unsplash.com/s/photos/${encodeURIComponent(q)}`, '_blank', 'noopener');
    }
  }));
  $('#ig-hero-url')?.addEventListener('input', e => {
    if (!state.ig) return;
    state.ig.heroPhoto = e.target.value.trim();
    state.ig.heroCredit = e.target.value.trim() ? 'Photo · User-supplied' : '';
    renderInfographic();
    // Update gallery active state — only highlight if URL matches a library photo
    $$('.hero-thumb').forEach(t => t.classList.toggle('active', t.dataset.photoUrl === state.ig.heroPhoto));
  });
  $('#btn-print-ig').addEventListener('click', () => {
    document.body.dataset.printing = 'ig';
    setTimeout(() => { window.print(); delete document.body.dataset.printing; }, 50);
  });
  loadInfographic();

  // Policy Analyzer view
  $('#btn-analyze').addEventListener('click', () => {
    const site = $('#site-doc').value;
    const company = $('#company-doc').value;
    if (!site.trim() && !company.trim()) {
      toast('Paste both documents first');
      return;
    }
    const results = analyzePolicies(site, company);
    renderAnalysisResults(results);
  });
  $$('button[data-sample]').forEach(btn => btn.addEventListener('click', () => {
    const which = btn.dataset.sample;
    if (which === 'site') $('#site-doc').value = SAMPLE_DOCS.site;
    if (which === 'company') $('#company-doc').value = SAMPLE_DOCS.company;
    toast(`Sample ${which} plan loaded`);
  }));

  // Brand view
  renderBrandPicker();
}

function switchView(name) {
  state.view = name;
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === name));
  $$('.view').forEach(v => v.classList.toggle('active', v.id === `view-${name}`));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setBrandLogo(brandKey) {
  state.brand = brandKey;
  $('#brand-logo').src = LOGOS[brandKey] || LOGOS.cec_mark;
}

function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  $('#toast-container').appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* ------------------------------------------------------------
   SIGN RENDERER
   Returns HTML for a sign preview at any size.
   ------------------------------------------------------------ */
function renderSign(cfg, opts = {}) {
  const compact = opts.compact === true;
  const showFields = !compact && cfg.fields && cfg.fields.length > 0;
  const showDoNot = !compact && cfg.donot && cfg.donot.length > 0;
  const showCitations = cfg.citations && cfg.citations.length > 0;
  const showAccent = cfg.accent && cfg.accent.trim();
  const showBody = !compact && (cfg.hazard || cfg.consequence || cfg.avoidance);

  const ghsItem = (typeof GHS_PICTOGRAMS !== 'undefined') ? GHS_PICTOGRAMS[cfg.pictogram] : null;
  const pictogramSvg = PICTOGRAMS[cfg.pictogram] || (ghsItem ? ghsItem.svg : '');
  // ANSI Z535.4 compliance: render as one of the 5 standard signal words
  const displaySignal = cfg.level === 'ENERGIZED' ? 'DANGER' : cfg.level;

  return `
    <div class="sign ${compact ? 'compact' : ''}" data-level="${cfg.level}">
      <div class="sign-header">
        ${pictogramSvg ? `<div class="sign-pictogram">${pictogramSvg}</div>` : '<div></div>'}
        <div class="sign-signal-wrap">
          <div class="sign-signal">${displaySignal}</div>
        </div>
        <div class="sign-cec-mark">
          <img src="${LOGOS.cec_corp || LOGOS.cec_mark}" alt="CEC">
        </div>
      </div>
      <div class="sign-body">
        ${cfg.primary ? `<div class="sign-primary">${escapeHtml(cfg.primary)}</div>` : ''}
        ${cfg.secondary ? `<div class="sign-secondary">${escapeHtml(cfg.secondary)}</div>` : ''}
        ${showAccent ? `<div class="sign-accent">${escapeHtml(cfg.accent)}</div>` : ''}
        ${showBody && cfg.hazard ? `<div class="sign-message"><strong>HAZARD —</strong> ${escapeHtml(cfg.hazard)}</div>` : ''}
        ${showBody && cfg.consequence ? `<div class="sign-message"><strong>CONSEQUENCE —</strong> ${escapeHtml(cfg.consequence)}</div>` : ''}
        ${showBody && cfg.avoidance ? `<div class="sign-message"><strong>HOW TO AVOID —</strong> ${escapeHtml(cfg.avoidance)}</div>` : ''}
        ${showDoNot ? `<ul class="sign-donot">${cfg.donot.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>` : ''}
      </div>
      ${showFields ? `
        <div class="sign-fields">
          ${cfg.fields.map(f => {
            const def = FIELD_DEFINITIONS[f];
            if (!def) return '';
            const val = cfg.fieldValues?.[f] || '';
            return `<div class="sign-field"><span class="sign-field-label">${def.label}</span><span class="sign-field-value">${escapeHtml(val)}</span></div>`;
          }).join('')}
        </div>` : ''}
      ${showCitations ? `
        <div class="sign-foot">
          <div class="sign-citations">${cfg.citations.slice(0, compact ? 2 : 99).map(c => `<div>§ ${escapeHtml(c)}</div>`).join('')}</div>
          <div class="sign-brand" title="CEC Safety Department">
            <img src="${LOGOS.cec_safety || LOGOS.cec_mark}" alt="CEC Safety">
          </div>
        </div>` : ''}
    </div>
  `;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function personnelPlaceholder(key) {
  const p = {
    name: 'J. Ramirez',
    supervisor: 'M. Chen',
    equipment: 'PNL-138-A',
    permit: 'EWP-2026-0142',
    date: '',
    marshal: 'D. Patel',
    marshal_ph: 'Ch. 4 / Ext. 4421',
    contact: '(915) 555-0142',
    competent_person: 'A. Foster',
    entry_supervisor: 'L. Vasquez',
    attendant: 'R. Klein',
    rescue_team: 'Site Rescue · 4 min ETA',
  };
  return p[key] || '';
}

/* ------------------------------------------------------------
   BROWSE VIEW
   ------------------------------------------------------------ */
function renderBrowse() {
  const container = $('#masonry');
  const filtered = TEMPLATES.filter(t => {
    if (state.filter !== 'all' && t.cat !== state.filter) return false;
    if (state.search) {
      const hay = `${t.id} ${t.title} ${t.desc} ${t.primary} ${t.level}`.toLowerCase();
      if (!hay.includes(state.search)) return false;
    }
    return true;
  });

  container.innerHTML = filtered.map(t => `
    <article class="pin" data-template-id="${t.id}">
      <div class="pin-cta">Open →</div>
      <div class="pin-preview">${renderSign(t, { compact: true })}</div>
      <div class="pin-meta">
        <div class="pin-num"><span>№ ${t.id} · ${t.level}</span><span>${t.cat}</span></div>
        <div class="pin-title">${escapeHtml(t.title)}</div>
        <div class="pin-desc">${escapeHtml(t.desc)}</div>
      </div>
    </article>
  `).join('');

  $$('.pin').forEach(p => p.addEventListener('click', () => {
    const tpl = TEMPLATES.find(x => x.id === p.dataset.templateId);
    loadTemplate(tpl);
    switchView('compose');
  }));
}

/* ------------------------------------------------------------
   COMPOSE VIEW
   ------------------------------------------------------------ */
function loadTemplate(template) {
  state.template = template;
  // Deep clone working copy
  state.config = JSON.parse(JSON.stringify(template));
  state.config.fieldValues = {};
  $('#compose-kicker').textContent = `Compose · № ${template.id} · ${template.level}`;
  $('#compose-title').textContent = template.title;
  renderEditor();
  renderPreview();
}

function renderEditor() {
  const cfg = state.config;
  const editor = $('#editor');

  const personnelKeys = [
    'name', 'supervisor', 'equipment', 'permit', 'date',
    'marshal', 'marshal_ph', 'contact',
    'competent_person', 'entry_supervisor', 'attendant', 'rescue_team',
  ];
  cfg.fieldValues = cfg.fieldValues || {};

  editor.innerHTML = `
    <div class="editor-section">
      <h3><span><span class="num">01</span> Signal Level</span></h3>
      <div class="signal-row">
        ${SIGNAL_LEVELS.map(L => `
          <button class="signal-btn ${cfg.level === L ? 'active' : ''}" data-level="${L}">${L}</button>
        `).join('')}
      </div>
    </div>

    <div class="editor-section">
      <h3><span><span class="num">02</span> Message Lines</span></h3>
      <div class="field">
        <label>Primary (large display)</label>
        <input type="text" data-bind="primary" value="${escapeHtml(cfg.primary || '')}">
      </div>
      <div class="field">
        <label>Secondary</label>
        <input type="text" data-bind="secondary" value="${escapeHtml(cfg.secondary || '')}">
      </div>
      <div class="field">
        <label>Accent (banner)</label>
        <input type="text" data-bind="accent" value="${escapeHtml(cfg.accent || '')}">
      </div>
    </div>

    <div class="editor-section">
      <h3><span><span class="num">03</span> ANSI Z535.4 Body — Hazard · Consequence · Avoidance</span></h3>
      <div class="field">
        <label>Hazard Identification — what is the hazard?</label>
        <textarea data-bind="hazard" rows="2">${escapeHtml(cfg.hazard || '')}</textarea>
      </div>
      <div class="field">
        <label>Consequence — what happens if not avoided?</label>
        <textarea data-bind="consequence" rows="2">${escapeHtml(cfg.consequence || '')}</textarea>
      </div>
      <div class="field">
        <label>Avoidance — how do you avoid it?</label>
        <textarea data-bind="avoidance" rows="2">${escapeHtml(cfg.avoidance || '')}</textarea>
      </div>
    </div>

    <div class="editor-section">
      <h3><span><span class="num">04</span> Personnel &amp; Contacts</span><span style="font-family:var(--mono);font-size:9px;letter-spacing:0.18em;color:var(--ink-mute);">FILL = ADDED TO SIGN</span></h3>
      <p style="font-family:var(--editorial);font-style:italic;font-size:13px;color:var(--ink-mute);margin-bottom:14px;">Type a value and the field is automatically posted on the sign. Leave blank to omit. The Energy Marshal channel and contact number become callable references in the field.</p>
      <div class="contacts-grid">
        ${personnelKeys.map(k => `
          <div class="field">
            <label>${FIELD_DEFINITIONS[k].label}</label>
            <input type="${FIELD_DEFINITIONS[k].type}" data-personnel="${k}" value="${escapeHtml(cfg.fieldValues[k] || '')}" placeholder="${escapeHtml(personnelPlaceholder(k))}">
          </div>
        `).join('')}
      </div>
    </div>

    <div class="editor-section">
      <h3><span><span class="num">05</span> Do-Not List</span></h3>
      <div id="donot-list">
        ${(cfg.donot || []).map((d, i) => `
          <div class="list-item">
            <input type="text" data-donot-index="${i}" value="${escapeHtml(d)}">
            <button class="remove" data-donot-remove="${i}" title="Remove">×</button>
          </div>
        `).join('')}
      </div>
      <button class="add-btn" id="donot-add">＋ Add prohibition</button>
    </div>

    <div class="editor-section">
      <h3><span><span class="num">06</span> Regulatory Citations</span></h3>
      <div id="cite-list">
        ${(cfg.citations || []).map((c, i) => `
          <div class="list-item">
            <input type="text" data-cite-index="${i}" value="${escapeHtml(c)}">
            <button class="remove" data-cite-remove="${i}" title="Remove">×</button>
          </div>
        `).join('')}
      </div>
      <button class="add-btn" id="cite-add">＋ Add citation</button>
    </div>

    <div class="editor-section">
      <h3><span><span class="num">07</span> Additional Fill-in Fields</span></h3>
      <div class="field-toggles">
        ${Object.keys(FIELD_DEFINITIONS).filter(k => !personnelKeys.includes(k)).map(k => `
          <label class="field-toggle">
            <input type="checkbox" data-field-toggle="${k}" ${cfg.fields?.includes(k) ? 'checked' : ''}>
            ${FIELD_DEFINITIONS[k].label}
          </label>
        `).join('')}
      </div>
    </div>

    <div class="editor-section">
      <h3><span><span class="num">08</span> Pictogram</span></h3>
      <div class="picto-group-label">ANSI / Generic Hazard Pictograms</div>
      <div class="picto-grid">
        ${Object.keys(PICTOGRAMS).map(k => `
          <button class="picto-btn ${cfg.pictogram === k ? 'active' : ''}" data-pictogram="${k}" title="${k}">
            <div class="picto-icon">${PICTOGRAMS[k]}</div>
            <span class="picto-name">${k}</span>
          </button>
        `).join('')}
      </div>
      <div class="picto-group-label" style="margin-top:14px;">GHS Hazard Pictograms · OSHA HazCom 2012</div>
      <div class="picto-grid">
        ${Object.keys(GHS_PICTOGRAMS).map(k => `
          <button class="picto-btn ghs ${cfg.pictogram === k ? 'active' : ''}" data-pictogram="${k}" title="${escapeHtml(GHS_PICTOGRAMS[k].label)}">
            <div class="picto-icon">${GHS_PICTOGRAMS[k].svg}</div>
            <span class="picto-name">${escapeHtml(GHS_PICTOGRAMS[k].label)}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Bind events
  $$('.signal-btn[data-level]', editor).forEach(b => b.addEventListener('click', () => {
    cfg.level = b.dataset.level;
    renderEditor(); renderPreview();
  }));
  $$('input[data-bind], textarea[data-bind]', editor).forEach(el => {
    el.addEventListener('input', () => { cfg[el.dataset.bind] = el.value; renderPreview(); });
  });
  $$('input[data-donot-index]', editor).forEach(el => {
    el.addEventListener('input', () => {
      cfg.donot[Number(el.dataset.donotIndex)] = el.value;
      renderPreview();
    });
  });
  $$('button[data-donot-remove]', editor).forEach(el => {
    el.addEventListener('click', () => {
      cfg.donot.splice(Number(el.dataset.donotRemove), 1);
      renderEditor(); renderPreview();
    });
  });
  $('#donot-add', editor)?.addEventListener('click', () => {
    cfg.donot = cfg.donot || []; cfg.donot.push('');
    renderEditor(); renderPreview();
  });
  $$('input[data-cite-index]', editor).forEach(el => {
    el.addEventListener('input', () => {
      cfg.citations[Number(el.dataset.citeIndex)] = el.value;
      renderPreview();
    });
  });
  $$('button[data-cite-remove]', editor).forEach(el => {
    el.addEventListener('click', () => {
      cfg.citations.splice(Number(el.dataset.citeRemove), 1);
      renderEditor(); renderPreview();
    });
  });
  $('#cite-add', editor)?.addEventListener('click', () => {
    cfg.citations = cfg.citations || []; cfg.citations.push('');
    renderEditor(); renderPreview();
  });
  $$('input[data-field-toggle]', editor).forEach(el => {
    el.addEventListener('change', () => {
      cfg.fields = cfg.fields || [];
      const k = el.dataset.fieldToggle;
      if (el.checked && !cfg.fields.includes(k)) cfg.fields.push(k);
      else if (!el.checked) cfg.fields = cfg.fields.filter(x => x !== k);
      renderPreview();
    });
  });
  $$('input[data-personnel]', editor).forEach(el => {
    el.addEventListener('input', () => {
      const k = el.dataset.personnel;
      const v = el.value;
      cfg.fieldValues = cfg.fieldValues || {};
      cfg.fieldValues[k] = v;
      cfg.fields = cfg.fields || [];
      // Auto-add field to sign if value is non-empty
      if (v.trim() && !cfg.fields.includes(k)) {
        cfg.fields.push(k);
      }
      renderPreview();
    });
  });
  $$('button[data-pictogram]', editor).forEach(b => b.addEventListener('click', () => {
    cfg.pictogram = b.dataset.pictogram;
    renderEditor(); renderPreview();
  }));
}

function renderPreview() {
  $('#preview-stage').innerHTML = renderSign(state.config);
}

/* ------------------------------------------------------------
   INFOGRAPHIC VIEW
   ------------------------------------------------------------ */
function loadInfographic() {
  const ig = INFOGRAPHICS.find(x => x.id === state.igTopic) || INFOGRAPHICS[0];
  state.ig = JSON.parse(JSON.stringify(ig));
  // Default heroPhoto = first item from PHOTO_LIBRARY for this topic so the
  // active thumb in the gallery is always in sync with what's rendered.
  const lib = (typeof PHOTO_LIBRARY !== 'undefined') ? PHOTO_LIBRARY[state.ig.id] || [] : [];
  if (lib.length) {
    state.ig.heroPhoto = lib[0].url;
    state.ig.heroCredit = `Photo · ${lib[0].credit}`;
    state.ig.heroAlt = lib[0].alt;
  }
  const urlInput = $('#ig-hero-url');
  if (urlInput) urlInput.value = state.ig.heroPhoto || '';
  renderInfographic();
  renderPhotoGallery();
}

function renderPhotoGallery() {
  const gallery = $('#hero-gallery');
  if (!gallery || !state.ig) return;
  const lib = (typeof PHOTO_LIBRARY !== 'undefined') ? PHOTO_LIBRARY[state.ig.id] || [] : [];
  if (!lib.length) {
    gallery.innerHTML = `<div class="hero-gallery-empty">No library photos for this topic. Use Custom URL or Illustration.</div>`;
    return;
  }
  const currentUrl = state.ig.heroPhoto || '';
  gallery.innerHTML = lib.map(p => `
    <button class="hero-thumb ${p.url === currentUrl ? 'active' : ''}" data-photo-url="${escapeHtml(p.url)}" data-photo-credit="${escapeHtml(p.credit)}" data-photo-alt="${escapeHtml(p.alt)}" title="${escapeHtml(p.alt)} — ${escapeHtml(p.credit)}">
      <img src="${escapeHtml(p.url)}" alt="${escapeHtml(p.alt)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('failed')">
      <span class="hero-thumb-fail">✕</span>
      <span class="hero-thumb-credit">${escapeHtml(p.credit.split('·')[0].trim())}</span>
    </button>
  `).join('');

  $$('.hero-thumb', gallery).forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('failed')) {
        toast('That photo did not load — pick another');
        return;
      }
      state.ig.heroPhoto = btn.dataset.photoUrl;
      state.ig.heroCredit = `Photo · ${btn.dataset.photoCredit}`;
      state.ig.heroAlt = btn.dataset.photoAlt;
      $('#ig-hero-url').value = btn.dataset.photoUrl;
      $$('.hero-thumb', gallery).forEach(x => x.classList.toggle('active', x === btn));
      renderInfographic();
    });
  });
}

function renderInfographic() {
  const ig = state.ig;
  const canvas = $('#info-canvas');
  const today = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
  const illustrationKey = ig.heroIllustration || ig.id;
  const illustrationSvg = HERO_ILLUSTRATIONS[illustrationKey] || HERO_ILLUSTRATIONS.arc_flash;
  const photoUrl = ig.heroPhoto || '';

  canvas.innerHTML = `
    <div class="ig">
      <div class="ig-hero" data-has-photo="${photoUrl ? 'true' : 'false'}">
        <div class="ig-hero-illustration">${illustrationSvg}</div>
        ${photoUrl ? `<img class="ig-hero-photo" src="${escapeHtml(photoUrl)}" alt="${escapeHtml(ig.heroAlt || ig.title)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.dataset.photoFailed='true'; this.remove();">` : ''}
        ${ig.heroCredit ? `<div class="ig-hero-credit">${escapeHtml(ig.heroCredit)}</div>` : ''}
      </div>

      <header class="ig-header">
        <div class="ig-title-block">
          <div style="font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; color: var(--gold-deep); margin-bottom: 6px;">${escapeHtml(ig.kicker)}</div>
          <h1 class="ig-title">${escapeHtml(ig.title)}</h1>
          <div class="ig-subtitle">${escapeHtml(ig.subtitle)}</div>
        </div>
        <div class="ig-meta">
          <b>${escapeHtml(ig.severity)}</b><br>
          ${today}<br>
          CEC SAFETY EDITION
        </div>
      </header>

      <div class="ig-grid">
        <div class="ig-stat">
          <div class="ig-stat-label">${escapeHtml(ig.bigStat.label)}</div>
          <div class="ig-stat-number">${escapeHtml(ig.bigStat.number)}</div>
          <div class="ig-stat-unit">${escapeHtml(ig.bigStat.unit)}</div>
        </div>
        <div class="ig-callouts">
          ${ig.callouts.map(c => `
            <div class="ig-callout">
              <div class="ig-callout-icon">${escapeHtml(c.icon)}</div>
              <div>
                <div class="ig-callout-title">${escapeHtml(c.title)}</div>
                <div class="ig-callout-text">${escapeHtml(c.text)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="ig-pullquote">${escapeHtml(ig.pullquote)}</div>

      <div class="ig-grid">
        ${ig.sections.map(s => `
          <div class="ig-section">
            <div class="ig-section-kicker">${escapeHtml(s.kicker)}</div>
            <div class="ig-section-title">${escapeHtml(s.title)}</div>
            <div class="ig-section-text">${escapeHtml(s.text)}</div>
          </div>
        `).join('')}
      </div>

      <div class="ig-cta">
        <div class="ig-cta-text">${ig.ctaText.replace(/\b([A-Z]{4,})\b/g, '<b>$1</b>')}</div>
        <div class="ig-cta-meta">${escapeHtml(ig.ctaMeta).replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------
   BRAND VIEW
   ------------------------------------------------------------ */
function renderBrandPicker() {
  const grid = $('#brand-grid');
  const brands = [
    { key: 'cec_safety', name: 'CEC Safety Shield', desc: 'Primary safety mark — gold shield with hard hat, used for all sign and infographic footers.', light: false },
    { key: 'cec_full',   name: 'CEC Wordmark', desc: 'Horizontal wordmark with the butterfly symbol. Use for documents, letterheads, and reports.', light: true },
    { key: 'cec_mark',   name: 'CEC Symbol Only', desc: 'Stand-alone butterfly mark on navy. Use when space is limited or when paired with bold display type.', light: false },
  ];
  grid.innerHTML = brands.map(b => `
    <div class="brand-card ${state.brand === b.key ? 'active' : ''}" data-brand="${b.key}">
      <div class="brand-preview ${b.light ? 'light' : ''}">
        <img src="${LOGOS[b.key]}" alt="${b.name}">
      </div>
      <h4>${b.name}</h4>
      <p>${b.desc}</p>
    </div>
  `).join('');
  $$('.brand-card').forEach(c => c.addEventListener('click', () => {
    setBrandLogo(c.dataset.brand);
    renderBrandPicker();
    if (state.config) renderPreview();
    toast('Brand mark updated');
  }));
}

/* ------------------------------------------------------------
   POLICY ANALYZER
   Compares two policy documents topic-by-topic and selects
   the more stringent value or treatment per OSHA convention.
   ------------------------------------------------------------ */
function countKeywordMatches(text, keywords) {
  const lower = text.toLowerCase();
  let count = 0;
  for (const k of keywords) {
    const re = new RegExp(`\\b${k.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const m = lower.match(re);
    if (m) count += m.length;
  }
  return count;
}

function extractValuesInContext(text, keywords, valuePattern) {
  if (!valuePattern || !text) return [];
  // Split into sentences. Lookbehind/lookahead protects decimal points like "1.2".
  const sentences = text.split(/(?<!\d)[.!?\n]+(?!\d)/).map(s => s.trim()).filter(Boolean);
  const lcKeys = keywords.map(k => k.toLowerCase());
  const matchingSentences = sentences.filter(s => {
    const lc = s.toLowerCase();
    return lcKeys.some(k => lc.includes(k));
  });
  const found = [];
  for (const s of matchingSentences) {
    const re = new RegExp(valuePattern.source, valuePattern.flags);
    let m;
    while ((m = re.exec(s)) !== null) {
      const v = parseFloat(m[1]);
      if (!isNaN(v)) found.push({ value: v, context: s });
    }
  }
  return found;
}

function pickByDirection(values, direction) {
  if (!values.length) return null;
  return values.reduce((best, cur) => {
    if (direction === 'lower') return cur.value < best.value ? cur : best;
    return cur.value > best.value ? cur : best;
  });
}

function analyzePolicies(siteText, companyText) {
  if (!siteText.trim() && !companyText.trim()) return [];
  const results = [];

  for (const topic of SAFETY_TOPICS) {
    const siteHits = countKeywordMatches(siteText, topic.keywords);
    const companyHits = countKeywordMatches(companyText, topic.keywords);
    if (siteHits === 0 && companyHits === 0) continue;

    const r = {
      id: topic.id,
      name: topic.name,
      osha: topic.osha,
      siteAddressed: siteHits > 0,
      companyAddressed: companyHits > 0,
      siteValue: null,
      siteContext: '',
      companyValue: null,
      companyContext: '',
      sitePermit: false,
      companyPermit: false,
      stringentSource: null,
      stringentValue: null,
      reasoning: '',
      templates: topic.templates.slice(),
      unit: topic.unit || '',
    };

    // Numeric threshold extraction
    if (topic.valuePattern) {
      const dir = topic.stringentDirection;
      const sitePicks = extractValuesInContext(siteText, topic.keywords, topic.valuePattern);
      const companyPicks = extractValuesInContext(companyText, topic.keywords, topic.valuePattern);
      const sitePick = pickByDirection(sitePicks, dir);
      const companyPick = pickByDirection(companyPicks, dir);

      if (sitePick) { r.siteValue = sitePick.value; r.siteContext = sitePick.context; }
      if (companyPick) { r.companyValue = companyPick.value; r.companyContext = companyPick.context; }

      if (sitePick && companyPick) {
        if (dir === 'lower') {
          if (sitePick.value < companyPick.value) { r.stringentSource = 'site'; r.stringentValue = sitePick.value; }
          else if (companyPick.value < sitePick.value) { r.stringentSource = 'company'; r.stringentValue = companyPick.value; }
          else { r.stringentSource = 'tie'; r.stringentValue = sitePick.value; }
        } else {
          if (sitePick.value > companyPick.value) { r.stringentSource = 'site'; r.stringentValue = sitePick.value; }
          else if (companyPick.value > sitePick.value) { r.stringentSource = 'company'; r.stringentValue = companyPick.value; }
          else { r.stringentSource = 'tie'; r.stringentValue = sitePick.value; }
        }
        if (r.stringentSource === 'tie') {
          r.reasoning = `Both documents specify ${r.stringentValue} ${r.unit}. Apply that threshold.`;
        } else {
          const otherVal = r.stringentSource === 'site' ? companyPick.value : sitePick.value;
          r.reasoning = `${topic.stringentReason} Stringent value: ${r.stringentValue} ${r.unit} (the other doc says ${otherVal} ${r.unit}).`;
        }
      } else if (sitePick) {
        r.stringentSource = 'site';
        r.stringentValue = sitePick.value;
        r.reasoning = `Only the site plan specifies a numeric threshold (${sitePick.value} ${r.unit}). Use this value; consider adding to company policy.`;
      } else if (companyPick) {
        r.stringentSource = 'company';
        r.stringentValue = companyPick.value;
        r.reasoning = `Only the company policy specifies a numeric threshold (${companyPick.value} ${r.unit}). Use this value; consider calling it out in the site plan.`;
      }
    }

    // Permit-required (confined space)
    if (topic.permitPattern) {
      const re1 = new RegExp(topic.permitPattern.source, topic.permitPattern.flags);
      const re2 = new RegExp(topic.permitPattern.source, topic.permitPattern.flags);
      r.sitePermit = re1.test(siteText);
      r.companyPermit = re2.test(companyText);

      if (r.sitePermit && r.companyPermit) {
        r.stringentSource = 'tie';
        r.reasoning = 'Both documents classify confined spaces as permit-required. Both confined-space templates apply.';
      } else if (r.sitePermit) {
        r.stringentSource = 'site';
        r.reasoning = 'Site plan classifies confined spaces as permit-required (more stringent than the company policy).';
      } else if (r.companyPermit) {
        r.stringentSource = 'company';
        r.reasoning = 'Company policy classifies confined spaces as permit-required by default (more stringent than the site plan).';
      } else if (siteHits > 0 || companyHits > 0) {
        r.stringentSource = 'tie';
        r.reasoning = 'Neither document specifies permit-required classification. Treat as confined space; reclassify if hazards develop.';
        // If neither permits, drop the permit-required template, keep only the basic one
        r.templates = ['20'];
      }
    }

    // Mention-based topics (LOTO, PPE)
    if (!r.stringentSource && (siteHits > 0 || companyHits > 0)) {
      if (siteHits > companyHits) {
        r.stringentSource = 'site';
        r.reasoning = `Site plan addresses this topic in more detail (${siteHits} keyword mentions vs ${companyHits}).`;
      } else if (companyHits > siteHits) {
        r.stringentSource = 'company';
        r.reasoning = `Company policy addresses this topic in more detail (${companyHits} keyword mentions vs ${siteHits}).`;
      } else {
        r.stringentSource = 'tie';
        r.reasoning = 'Both documents address this topic with similar depth.';
      }
    }

    results.push(r);
  }

  return results;
}

function truncate(s, n) {
  if (!s) return '';
  s = s.trim().replace(/\s+/g, ' ');
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function renderAnalysisResults(results) {
  const container = $('#analysis-results');
  if (!results || !results.length) {
    container.innerHTML = `<div class="analysis-empty">No safety topics detected in either document. Add more detail or load the sample documents.</div>`;
    return;
  }

  // Topic-by-topic comparison cards
  let html = '<div class="analysis-results-list">';
  results.forEach((r, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const winner = r.stringentSource;
    const siteLabel = r.siteValue !== null
      ? `${r.siteValue} ${r.unit}`
      : (r.sitePermit ? 'Permit-Required' : (r.siteAddressed ? 'Addressed' : 'Not specified'));
    const companyLabel = r.companyValue !== null
      ? `${r.companyValue} ${r.unit}`
      : (r.companyPermit ? 'Permit-Required' : (r.companyAddressed ? 'Addressed' : 'Not specified'));
    const recTemplates = r.templates.map(id => TEMPLATES.find(t => t.id === id)).filter(Boolean);

    html += `
      <div class="topic-card">
        <div class="topic-num">${num}</div>
        <div class="topic-col topic-head">
          <h3>${escapeHtml(r.name)}</h3>
          <div class="osha">§ ${escapeHtml(r.osha)}</div>
          <div class="verdict-bar">VERDICT — <b>${escapeHtml(r.reasoning)}</b></div>
        </div>
        <div class="topic-col topic-comparison">
          <div class="topic-side site ${winner === 'site' || winner === 'tie' ? 'winner' : ''}">
            <div class="src">Site Plan</div>
            <div class="val ${r.siteAddressed ? '' : 'empty'}">${escapeHtml(siteLabel)}</div>
            ${r.siteContext ? `<div class="note">${escapeHtml(truncate(r.siteContext, 110))}</div>` : ''}
          </div>
          <div class="topic-side company ${winner === 'company' || winner === 'tie' ? 'winner' : ''}">
            <div class="src">Company Policy</div>
            <div class="val ${r.companyAddressed ? '' : 'empty'}">${escapeHtml(companyLabel)}</div>
            ${r.companyContext ? `<div class="note">${escapeHtml(truncate(r.companyContext, 110))}</div>` : ''}
          </div>
        </div>
        <div class="topic-col topic-recs">
          <div class="topic-recs-label">Apply Sign(s)</div>
          ${recTemplates.map(t => `
            <div class="topic-rec" data-template-id="${t.id}">
              <span class="rec-num">№ ${t.id}</span>
              <span class="rec-title">${escapeHtml(t.title)}</span>
              <span class="rec-arrow">→</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  html += '</div>';

  // Field Posting Manifest — unique recommended templates
  const seen = new Set();
  const manifest = [];
  for (const r of results) {
    for (const id of r.templates) {
      if (seen.has(id)) continue;
      seen.add(id);
      const tpl = TEMPLATES.find(t => t.id === id);
      if (tpl) manifest.push({ tpl, driver: r.name });
    }
  }
  manifest.sort((a, b) => a.tpl.id.localeCompare(b.tpl.id));

  html += `
    <div class="manifest">
      <h2>Recommended Posting</h2>
      <p>${manifest.length} sign template${manifest.length === 1 ? '' : 's'} recommended based on the more stringent of the two documents. Click any to open in the composer.</p>
      <div class="manifest-list">
        ${manifest.map(({ tpl, driver }) => `
          <div class="manifest-item" data-template-id="${tpl.id}">
            <div class="id">№ ${tpl.id} · ${tpl.level}</div>
            <div class="title">${escapeHtml(tpl.title)}</div>
            <div class="reason">For: ${escapeHtml(driver)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Wire up click-through to composer
  $$('.topic-rec, .manifest-item', container).forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.templateId;
      const tpl = TEMPLATES.find(t => t.id === id);
      if (tpl) {
        loadTemplate(tpl);
        switchView('compose');
      }
    });
  });
}

/* ------------------------------------------------------------
   BOOT
   ------------------------------------------------------------ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

