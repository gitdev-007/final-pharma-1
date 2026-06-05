(function () {
  'use strict';

  // Mobile menu toggle
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    var toggleIcon = navToggle.querySelector('.material-symbols-outlined');
    var srLabel = navToggle.querySelector('.sr-only');
    var setOpen = function (open) {
      if (open) {
        mobileNav.classList.remove('hidden');
        navToggle.setAttribute('aria-expanded', 'true');
        if (toggleIcon) toggleIcon.textContent = 'close';
        if (srLabel) srLabel.textContent = 'Close menu';
      } else {
        mobileNav.classList.add('hidden');
        navToggle.setAttribute('aria-expanded', 'false');
        if (toggleIcon) toggleIcon.textContent = 'menu';
        if (srLabel) srLabel.textContent = 'Open menu';
      }
    };
    navToggle.addEventListener('click', function () {
      setOpen(mobileNav.classList.contains('hidden'));
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileNav.classList.contains('hidden')) {
        setOpen(false);
        navToggle.focus();
      }
    });
  }

  // Sticky-header elevation
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal on scroll (respects prefers-reduced-motion via CSS)
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal, .reveal-up, [data-reveal]');
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('active'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }
})();
