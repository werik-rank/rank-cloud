/* Rank Cloud — product page interactions (RankMyApp template). */
(function () {
  'use strict';

  /* ---------- Header: transparent at top, solid on scroll ---------- */
  var header = document.querySelector('.rc-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('rc-header--top', window.scrollY < 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Feature tabs (Variation B) ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.pp-tab'));
  var panes = Array.prototype.slice.call(document.querySelectorAll('.pp-tabpane'));
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');
      tabs.forEach(function (t) { t.classList.toggle('is-active', t === tab); });
      panes.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-pane') === target); });
    });
  });

  /* ---------- FAQ accordion ---------- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll('.pp-faq__item'));
  faqItems.forEach(function (item) {
    var q = item.querySelector('.pp-faq__q');
    var a = item.querySelector('.pp-faq__a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      // close all
      faqItems.forEach(function (it) {
        it.classList.remove('is-open');
        var aa = it.querySelector('.pp-faq__a');
        if (aa) aa.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Demo form (no real submit) ---------- */
  var forms = Array.prototype.slice.call(document.querySelectorAll('.pp-form'));
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.pp-form__submit');
      if (btn) { btn.textContent = 'Recebemos o seu contato ✓'; btn.disabled = true; }
    });
  });

  /* ---------- Cases carousel ---------- */
  var carousel = document.getElementById('caseCarousel');
  if (carousel) {
    var track = carousel.querySelector('.pp-carousel__track');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.pp-carousel__slide'));
    var dotsWrap = carousel.querySelector('.pp-carousel__dots');
    var cIdx = 0, cTimer = null, C_DUR = 5500;

    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.className = 'pp-carousel__dot' + (i === 0 ? ' is-active' : '');
      d.type = 'button';
      d.setAttribute('aria-label', 'Ir para o case ' + (i + 1));
      d.addEventListener('click', function () { cGo(i, true); });
      dotsWrap.appendChild(d);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function cRender() {
      track.style.transform = 'translateX(' + (-cIdx * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === cIdx); });
    }
    function cGo(i, manual) {
      cIdx = (i + slides.length) % slides.length;
      cRender();
      if (manual) cRestart();
    }
    function cRestart() {
      if (cTimer) clearInterval(cTimer);
      cTimer = setInterval(function () { cGo(cIdx + 1); }, C_DUR);
    }
    Array.prototype.slice.call(carousel.querySelectorAll('.pp-carousel__arrow')).forEach(function (btn) {
      btn.addEventListener('click', function () { cGo(cIdx + parseInt(btn.getAttribute('data-dir'), 10), true); });
    });
    carousel.addEventListener('mouseenter', function () { if (cTimer) { clearInterval(cTimer); cTimer = null; } });
    carousel.addEventListener('mouseleave', cRestart);
    cRender();
    cRestart();
  }

  /* ---------- Mobile menu (simple jump) ---------- */
  var burger = document.querySelector('.rc-burger');
  if (burger) burger.addEventListener('click', function () {
    var el = document.getElementById('demo') || document.querySelector('.pp-demo');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  });

  /* ---------- Language switcher ---------- */
  var langBtns = Array.prototype.slice.call(document.querySelectorAll('.rc-lang-btn'));
  langBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      langBtns.forEach(function (x) { x.classList.toggle('is-active', x === b); });
    });
  });

  /* ---------- Lucide icons ---------- */
  if (window.lucide) lucide.createIcons();
})();
