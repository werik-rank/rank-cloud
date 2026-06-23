/* Rank Cloud — home interactivity */
(function () {
  'use strict';

  /* ---------- Products ---------- */
  var PRODUCTS = [
    { c: '#0050E5', ti: '#fff', abbr: 'RmA', icon: 'trending-up', name: 'RankMyApp', line: 'Mobile Intelligence · ASO',
      blurb: 'Crescimento orgânico nas lojas com ASO e inteligência de reviews.',
      benefit: 'Mais downloads orgânicos e melhor reputação na loja, sem depender só de mídia paga.',
      mods: ['ASO', 'Reviews Intelligence', 'Store Analytics'] },
    { c: '#A8BF00', ti: '#00132c', abbr: 'RmA', icon: 'mouse-pointer-click', name: 'RankMyADS', line: 'Performance & Mídia',
      blurb: 'Mídia paga e programática com automação de lance em todos os canais.',
      benefit: 'ROAS escalável e aquisição paga eficiente, com automação de bid em todos os canais.',
      mods: ['Programmatic', 'Bid automation', 'Google · Meta · TikTok'] },
    { c: '#06B6D4', ti: '#00132c', abbr: 'RmG', icon: 'bot', name: 'RankMyGEO', line: 'GEO para IAs generativas', isNew: true,
      blurb: 'Sua marca presente e citada nas respostas das IAs generativas.',
      benefit: 'Presença e citação nas respostas de ChatGPT, Claude, Perplexity e Gemini.',
      mods: ['LLM monitoring', 'Citation tracking', 'GEO playbook'] },
    { c: '#7C3AED', ti: '#fff', abbr: 'Adi', icon: 'radar', name: 'Ads Intelligence', line: 'Inteligência competitiva', isNew: true,
      blurb: 'Monitore criativos e investimento da concorrência em tempo real.',
      benefit: 'Veja criativos, share of voice e investimento estimado dos concorrentes em tempo real.',
      mods: ['Ad library', 'Share of voice', 'Spend estimate'] },
    { c: '#FF5700', ti: '#fff', abbr: 'Di', icon: 'users', name: 'Digital Influencers', line: 'Influência & Awareness',
      blurb: 'Matching de criadores certos para alcance qualificado e awareness.',
      benefit: 'Alcance qualificado com matching de criadores certos para cada campanha.',
      mods: ['Creator discovery', 'Audience matching', 'Campaign reporting'] }
  ];

  var SC_DURATION = 5000;
  var scList = document.getElementById('showcaseList');
  var scMedia = document.getElementById('showcaseMedia');
  var scIndex = 0;
  var scTimer = null;
  var scItems = [];

  function renderMedia(i) {
    if (!scMedia) return;
    var p = PRODUCTS[i];
    scMedia.innerHTML =
      '<div class="rc-scm" style="--c:' + p.c + ';--scm-ink:' + p.ti + '">' +
        '<div class="rc-scm__deco"></div>' +
        '<div class="rc-scm__top">' +
          '<div class="rc-scm__icon"><i data-lucide="' + p.icon + '"></i></div>' +
          '<span class="rc-scm__tag">' + p.line + '</span>' +
        '</div>' +
        '<div class="rc-scm__body">' +
          '<h3 class="rc-scm__name">' + p.name + '</h3>' +
          '<p class="rc-scm__benefit">' + p.benefit + '</p>' +
          '<div class="rc-scm__mods">' + p.mods.map(function (m) { return '<span class="rc-scm__mod">' + m + '</span>'; }).join('') + '</div>' +
        '</div>' +
      '</div>';
    if (window.lucide) lucide.createIcons();
  }

  function selectShowcase(i, fromClick) {
    scIndex = i;
    scItems.forEach(function (el, idx) {
      el.classList.toggle('is-active', idx === i);
    });
    renderMedia(i);
    if (fromClick) stopScTimer();
  }

  function restartScTimer() {
    if (scTimer) clearInterval(scTimer);
    scTimer = setInterval(function () {
      selectShowcase((scIndex + 1) % PRODUCTS.length, false);
    }, SC_DURATION);
  }

  function stopScTimer() {
    if (scTimer) clearInterval(scTimer);
    scTimer = null;
    if (scList) scList.classList.add('is-paused');
  }

  if (scList && scMedia) {
    PRODUCTS.forEach(function (p, i) {
      var b = document.createElement('button');
      b.className = 'rc-sc-item';
      b.type = 'button';
      b.style.setProperty('--c', p.c);
      b.style.setProperty('--sc-dur', (SC_DURATION / 1000) + 's');
      b.innerHTML =
        '<div class="rc-sc-item__icon" style="background:' + p.c + ';color:' + p.ti + '">' + p.abbr + '</div>' +
        (p.isNew ? '<span class="rc-sc-item__new">novo</span>' : '') +
        '<div class="rc-sc-item__name">' + p.name + '</div>' +
        '<p class="rc-sc-item__desc">' + p.blurb + '</p>' +
        '<span class="rc-sc-progress"></span>';
      b.addEventListener('click', function () { selectShowcase(i, true); });
      scList.appendChild(b);
      scItems.push(b);
    });
    selectShowcase(0, false);
    restartScTimer();
  }

  if (window.lucide) lucide.createIcons();

  /* ---------- Product toggles ---------- */
  var toggles = Array.prototype.slice.call(document.querySelectorAll('.rc-toggle'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.rc-screen__panel'));
  var winUrl = document.getElementById('winUrl');
  var winChip = document.getElementById('winChip');

  function activate(btn) {
    var target = btn.getAttribute('data-target');
    var c = btn.style.getPropertyValue('--c').trim();
    var ink = btn.style.getPropertyValue('--ink').trim() || '#fff';
    toggles.forEach(function (t) { t.classList.toggle('is-active', t === btn); });
    panels.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-panel') === target); });
    var win = document.getElementById('window');
    if (win) win.classList.toggle('rc-window--bare', target === 'rmapp');
    if (winUrl) winUrl.textContent = btn.getAttribute('data-url') || '';
    if (winChip) {
      winChip.innerHTML = btn.getAttribute('data-chip') || '';
      winChip.style.background = c;
      winChip.style.color = ink;
    }
  }
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () { activate(btn); stopHeroRotate(); });
  });

  /* ---------- Hero auto-rotation (stops on manual click) ---------- */
  var heroTimer = null;
  var heroDur = 4500;
  function stopHeroRotate() {
    if (heroTimer) { clearInterval(heroTimer); heroTimer = null; }
  }
  function startHeroRotate() {
    stopHeroRotate();
    heroTimer = setInterval(function () {
      var i = toggles.findIndex(function (t) { return t.classList.contains('is-active'); });
      var next = toggles[(i + 1) % toggles.length];
      activate(next);
    }, heroDur);
  }
  if (toggles.length) startHeroRotate();

  /* ---------- Sector → product recommender ---------- */
  var PRODUCT_META = {
    rmapp:  { c: '#0050E5', t: '#fff',     abbr: 'RmA', name: 'RankMyApp',          icon: 'trending_up' },
    rmads:  { c: '#A8BF00', t: '#00132c',  abbr: 'RmA', name: 'RankMyAds',          icon: 'ads_click' },
    adsint: { c: '#7C3AED', t: '#fff',     abbr: 'Adi', name: 'Ads Intelligence',   icon: 'radar' },
    rmgeo:  { c: '#06B6D4', t: '#00132c',  abbr: 'RmG', name: 'RankMyGEO',          icon: 'smart_toy' },
    infl:   { c: '#FF5700', t: '#fff',     abbr: 'Di',  name: 'Digital Influencers', icon: 'groups' }
  };

  var SECTORS = [
    { id: 'banco', gicon: 'account_balance', name: 'Banco & Fintech',
      pain: 'Aquisição de contas e confiança em um mercado regulado e disputado.',
      brands: ['Nubank', 'Banco do Brasil', 'PicPay', 'Inter', 'C6 Bank'],
      products: [
        { k: 'rmapp', why: 'ASO e reviews para liderar as buscas de “banco digital” na loja.' },
        { k: 'rmads', why: 'Aquisição paga eficiente para abertura de contas, com ROAS sob controle.' },
        { k: 'rmgeo', why: 'Apareça quando perguntam à IA qual é o melhor banco.' }
      ] },
    { id: 'varejo', gicon: 'shopping_bag', name: 'Varejo & E-commerce',
      pain: 'Escalar vendas sem inflar o CAC nas datas de pico.',
      brands: ['Magalu', 'Renner', 'Mercado Livre', 'Casas Bahia', 'Shopee'],
      products: [
        { k: 'rmads', why: 'Mídia full-funnel com ROAS escalável em todos os canais.' },
        { k: 'rmapp', why: 'Mais instalações orgânicas do app de compras.' },
        { k: 'infl',  why: 'Prova social e awareness com os creators certos.' }
      ] },
    { id: 'tech', gicon: 'memory', name: 'Tecnologia & SaaS',
      pain: 'Ser a referência citada por humanos e por IAs.',
      brands: ['TOTVS', 'RD Station', 'Pipefy', 'VTEX', 'Movile'],
      products: [
        { k: 'rmgeo',  why: 'Presença e citação nas respostas das IAs generativas.' },
        { k: 'rmapp',  why: 'Crescimento e retenção do app do produto.' },
        { k: 'adsint', why: 'Inteligência competitiva de criativos e investimento.' }
      ] },
    { id: 'mobilidade', gicon: 'flight_takeoff', name: 'Mobilidade & Viagens',
      pain: 'Capturar demanda nos momentos de alta intenção.',
      brands: ['99', 'LATAM', 'Localiza', 'Gol', 'Movida'],
      products: [
        { k: 'rmapp', why: 'ASO para ranquear nas buscas do app.' },
        { k: 'rmads', why: 'Mídia ativada em momentos de intenção de compra.' },
        { k: 'rmgeo', why: 'Presença nas respostas das IAs sobre rotas e destinos.' }
      ] },
    { id: 'midia', gicon: 'movie', name: 'Mídia & Entretenimento',
      pain: 'Conquistar e reter audiência qualificada.',
      brands: ['Globoplay', 'Deezer', 'Band', 'DAZN', 'UOL'],
      products: [
        { k: 'infl',  why: 'Creators certos para cada audiência.' },
        { k: 'rmapp', why: 'Engajamento e retenção dentro do app.' },
        { k: 'rmads', why: 'Alcance e aquisição de assinantes.' }
      ] },
    { id: 'saude', gicon: 'health_and_safety', name: 'Saúde & Bem-estar',
      pain: 'Construir confiança e alcance com responsabilidade.',
      brands: ['Drogasil', 'Hapvida', 'Dasa', 'Drogaria SP', 'Conexa'],
      products: [
        { k: 'infl',  why: 'Influência com credibilidade e contexto.' },
        { k: 'adsint', why: 'Inteligência competitiva de criativos e investimento.' },
        { k: 'rmapp', why: 'Reviews e reputação na loja.' }
      ] }
  ];

  var ROLES = [
    'CMO / Head de Marketing',
    'Growth / Aquisição',
    'Marketing de Produto',
    'Mídia / Performance',
    'Founder / C-level'
  ];

  var PAINS = [
    { label: 'Aquisição cara / CAC alto',     primary: 'rmads',  lead: 'Vamos reduzir o seu CAC e escalar a aquisição paga com eficiência.' },
    { label: 'Pouco crescimento orgânico',     primary: 'rmapp',  lead: 'Mais downloads e tráfego orgânico, sem depender só de mídia paga.' },
    { label: 'Invisível nas IAs generativas',  primary: 'rmgeo',  lead: 'Sua marca presente e citada nas respostas das IAs generativas.' },
    { label: 'Pouca inteligência competitiva', primary: 'adsint', lead: 'Visão clara dos criativos, share of voice e investimento da concorrência.' },
    { label: 'Marca e awareness fracos',       primary: 'infl',   lead: 'Awareness e prova social com os creators certos para a sua audiência.' }
  ];

  var PRODUCT_WHY = {
    rmapp:  'ASO e reviews para liderar as buscas e crescer organicamente na loja.',
    rmads:  'Mídia paga e programática com ROAS escalável e CAC sob controle.',
    rmgeo:  'Presença e citação nas respostas de ChatGPT, Claude, Perplexity e Gemini.',
    adsint: 'Inteligência competitiva de criativos, share of voice e investimento.',
    infl:   'Awareness e prova social com os creators certos para cada campanha.'
  };

  var diagRole = document.getElementById('diagRole');
  var diagPain = document.getElementById('diagPain');
  var diagInd  = document.getElementById('diagIndustry');
  var sectorPanel = document.getElementById('sectorPanel');

  var diagSel = { role: 0, pain: 0, ind: 0 };

  function buildTags(container, items, getLabel, key, getIcon) {
    if (!container) return;
    items.forEach(function (it, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rc-tag' + (i === diagSel[key] ? ' is-active' : '');
      var icon = getIcon ? '<span class="material-symbols-rounded">' + getIcon(it) + '</span>' : '';
      b.innerHTML = icon + '<span>' + getLabel(it) + '</span>';
      b.addEventListener('click', function () {
        diagSel[key] = i;
        Array.prototype.forEach.call(container.children, function (c, idx) {
          c.classList.toggle('is-active', idx === i);
        });
        renderDiag();
      });
      container.appendChild(b);
    });
  }

  function fillSelect(sel, items, getLabel, key) {
    if (!sel) return;
    items.forEach(function (it, i) {
      var o = document.createElement('option');
      o.value = String(i);
      o.textContent = getLabel(it);
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () {
      diagSel[key] = parseInt(sel.value, 10) || 0;
      renderDiag();
    });
  }

  function renderDiag() {
    if (!sectorPanel) return;
    var role   = ROLES[diagSel.role];
    var pain   = PAINS[diagSel.pain];
    var sector = SECTORS[diagSel.ind];

    var keys = [pain.primary];
    sector.products.forEach(function (p) { if (keys.indexOf(p.k) < 0 && keys.length < 3) keys.push(p.k); });
    ['rmapp', 'rmads', 'rmgeo', 'adsint', 'infl'].forEach(function (k) {
      if (keys.indexOf(k) < 0 && keys.length < 3) keys.push(k);
    });

    var cards = keys.map(function (k, idx) {
      var m = PRODUCT_META[k];
      var rank = ('0' + (idx + 1)).slice(-2);
      var lead = idx === 0 ? '<span class="rc-rec__lead">Prioridade</span>' : '';
      return '<div class="rc-rec" style="--c:' + m.c + ';--t:' + m.t + '">' +
        '<div class="rc-rec__head">' +
          '<span class="rc-rec__icon"><span class="material-symbols-rounded">' + m.icon + '</span></span>' +
          '<span class="rc-rec__rank">' + rank + '</span>' +
        '</div>' +
        '<div class="rc-rec__name">' + m.name + lead + '</div>' +
        '<div class="rc-rec__why">' + PRODUCT_WHY[k] + '</div>' +
      '</div>';
    }).join('');

    var brands = sector.brands.map(function (b) {
      return '<span class="rc-brand">' + b + '</span>';
    }).join('');

    sectorPanel.innerHTML =
      '<div class="rc-sector__head">' +
        '<span class="rc-sector__icon"><span class="material-symbols-rounded">' + sector.gicon + '</span></span>' +
        '<div><div class="rc-diag__eyebrow">Para ' + role + '</div>' +
        '<div class="rc-sector__name">' + sector.name + '</div>' +
        '<p class="rc-sector__pain">' + pain.lead + '</p></div>' +
      '</div>' +
      '<div class="rc-sector__reclabel">Combo recomendado</div>' +
      '<div class="rc-recs">' + cards + '</div>' +
      '<div class="rc-sector__cases">' +
        '<div class="rc-brands">' + brands + '</div>' +
      '</div>';
    if (window.lucide) lucide.createIcons();
  }

  if (diagRole && diagPain && diagInd && sectorPanel) {
    buildTags(diagInd, SECTORS, function (s) { return s.name; }, 'ind', function (s) { return s.gicon; });
    buildTags(diagPain, PAINS, function (p) { return p.label; }, 'pain');
    fillSelect(diagRole, ROLES, function (r) { return r; }, 'role');
    renderDiag();
  }

  /* ---------- Lead form (bottom of diagnóstico section) ---------- */
  var leadForm = document.getElementById('diagLeadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = leadForm.querySelector('.rc-leadform__submit');
      if (btn) { btn.textContent = 'Recebemos o seu contato ✓'; btn.disabled = true; }
    });
  }

  /* ---------- Language switcher ---------- */
  var langBtns = Array.prototype.slice.call(document.querySelectorAll('.rc-lang-btn'));
  langBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      langBtns.forEach(function (x) { x.classList.toggle('is-active', x === b); });
    });
  });

  /* ---------- Mouse-reactive OS background ---------- */
  var hero = document.getElementById('hero');
  var os = hero ? hero.querySelector('.rc-os') : null;
  var spot = hero ? hero.querySelector('.rc-os__spot') : null;
  var win = document.getElementById('window');
  var layers = os ? Array.prototype.slice.call(os.querySelectorAll('[data-depth]')) : [];
  var appLayers = Array.prototype.slice.call(document.querySelectorAll('.asApp'));
  var appStage = document.querySelector('[data-app-parallax]');
  appLayers.forEach(function (el) {
    el.style.transform = 'rotate(' + (el.getAttribute('data-rot') || 0) + 'deg)';
  });
  var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onMove(e) {
    var r = hero.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width;   // 0..1
    var py = (e.clientY - r.top) / r.height;   // 0..1
    tx = px - 0.5;  // -0.5..0.5
    ty = py - 0.5;
    if (spot) spot.style.setProperty('background',
      'radial-gradient(460px circle at ' + (px * 100) + '% ' + (py * 100) + '%, rgba(77,138,255,0.20), transparent 60%)');
    if (!raf) raf = requestAnimationFrame(render);
  }

  function render() {
    raf = null;
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    layers.forEach(function (el) {
      var d = parseFloat(el.getAttribute('data-depth')) || 0;
      el.style.transform = 'translate3d(' + (-cx * d) + 'px,' + (-cy * d) + 'px,0)';
    });
    if (os.querySelector('.rc-os__grid')) {
      var g = os.querySelector('.rc-os__grid');
      g.style.transform = 'perspective(620px) rotateX(64deg) translate3d(' + (-cx * 8) + 'px,' + (-cy * 6) + 'px,0)';
    }
    if (win) {
      win.style.transform = 'rotateY(' + (cx * 4) + 'deg) rotateX(' + (-cy * 3) + 'deg)';
    }
    appLayers.forEach(function (el) {
      var d = parseFloat(el.getAttribute('data-depth')) || 0;
      var rot = el.getAttribute('data-rot') || 0;
      el.style.transform = 'translate3d(' + (cx * d) + 'px,' + (cy * d) + 'px,0) rotate(' + rot + 'deg)';
    });
    if (appStage) {
      appStage.style.transform = 'translate3d(' + (cx * 26) + 'px,' + (cy * 26) + 'px,0) rotateY(' + (cx * 6) + 'deg) rotateX(' + (-cy * 5) + 'deg)';
    }
    if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
      raf = requestAnimationFrame(render);
    }
  }

  if (hero && !reduce) {
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', function () {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(render);
    });
  }

  /* ---------- Mobile menu (simple jump) ---------- */
  var burger = document.querySelector('.rc-burger');
  if (burger) burger.addEventListener('click', function () {
    var el = document.getElementById('produtos');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  });

  /* ---------- Transparent header at top, solid on scroll ---------- */
  var header = document.querySelector('.rc-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('rc-header--top', window.scrollY < 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Render Lucide icons ---------- */
  if (window.lucide) lucide.createIcons();

  /* ---------- CTA rotating words ---------- */
  var rotator = document.getElementById('ctaRotator');
  if (rotator) {
    var words = [
      'mídia programática',
      'rankeamento da sua marca em inteligências artificiais',
      'performance de anúncios pagos',
      'visibilidade orgânica nas lojas de apps',
      'SEO e presença na web'
    ];
    var ri = 0;
    var reduceR = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setInterval(function () {
      var current = rotator.querySelector('.rc-rotator__word');
      var next = document.createElement('span');
      next.className = 'rc-rotator__word';
      ri = (ri + 1) % words.length;
      next.textContent = words[ri] + '.';
      rotator.appendChild(next);
      // force reflow so the transition runs
      void next.offsetWidth;
      next.classList.add('is-in');
      if (current) {
        current.classList.remove('is-in');
        current.classList.add('is-out');
        var toRemove = current;
        setTimeout(function () { if (toRemove.parentNode) toRemove.parentNode.removeChild(toRemove); }, reduceR ? 0 : 500);
      }
    }, 2600);
  }
})();
