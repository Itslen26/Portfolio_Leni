(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* menu HP */
  var burger = $('#leni_burger'), menu = $('#leni_menu');
  function closeMenu() { menu.classList.remove('leni_open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('leni_open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); } });

  /* klik menu / tombol: scroll halus */
  $$('[data-nav]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var el = document.getElementById(a.getAttribute('data-nav'));
      if (el) { el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
      closeMenu();
    });
  });

  /* menu aktif mengikuti scroll */
  var links = $$('.leni_menu_link');
  function setActive(id) {
    links.forEach(function (l) { l.classList.toggle('leni_active', l.getAttribute('data-nav') === id); });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { setActive(en.target.id); } });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('main > section').forEach(function (s) { io.observe(s); });
  }
})();
