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

  // Contact form (contacts.html)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Pre-fill from ?product= URL parameter
    try {
      var params = new URLSearchParams(window.location.search);
      var product = params.get('product');
      var subjectInput = contactForm.querySelector('#cf-subject');
      var messageInput = contactForm.querySelector('#cf-message');
      if (product) {
        if (subjectInput) {
          subjectInput.value = 'Product inquiry: ' + product;
        } else if (messageInput) {
          messageInput.value = 'I would like to inquire about ' + product + '.\n\n';
          messageInput.focus();
          messageInput.setSelectionRange(messageInput.value.length, messageInput.value.length);
        }
      }
    } catch (err) { /* ignore */ }

    var clearErrors = function () {
      contactForm.querySelectorAll('.field-error').forEach(function (el) { el.textContent = ''; });
      contactForm.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
    };
    var showError = function (input, msg) {
      var errorEl = document.getElementById(input.id + '-error');
      if (errorEl) errorEl.textContent = msg;
      input.setAttribute('aria-invalid', 'true');
    };
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();
      var valid = true;
      var rules = [
        { id: 'cf-name', label: 'Full name', required: true, minLength: 2 },
        { id: 'cf-email', label: 'Email', required: true, type: 'email' },
        { id: 'cf-message', label: 'Message', required: true, minLength: 10 }
      ];
      rules.forEach(function (r) {
        var input = contactForm.querySelector('#' + r.id);
        if (!input) return;
        var val = (input.value || '').trim();
        if (r.required && !val) {
          showError(input, r.label + ' is required.');
          valid = false;
        } else if (r.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          showError(input, 'Please enter a valid email address.');
          valid = false;
        } else if (r.minLength && val && val.length < r.minLength) {
          showError(input, r.label + ' must be at least ' + r.minLength + ' characters.');
          valid = false;
        }
      });
      if (valid) {
        var success = document.getElementById('form-success');
        if (success) {
          success.classList.remove('hidden');
          success.setAttribute('role', 'status');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        contactForm.reset();
      }
    });
  }
})();
