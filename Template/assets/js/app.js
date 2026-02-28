/**
 * Devashish Joshi - Portfolio
 * Modern Vanilla JS - No jQuery
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initPortfolioFilter();
  initCounters();
  initBackToTop();
  initFormSubmit();
  initScrollAnimations();
});

// Minimal preloader - hide after load
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;
  
  const hidePreloader = () => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  };
  
  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 600);
  } else {
    window.addEventListener('load', () => setTimeout(hidePreloader, 600));
  }
}

// Sticky header on scroll
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  
  window.addEventListener('scroll', () => requestAnimationFrame(onScroll));
  onScroll();
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-wrapper') || document.querySelector('.nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on nav link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Portfolio filter - vanilla JS
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  
  if (!filterBtns.length || !items.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      items.forEach(item => {
        const category = item.dataset.category;
        const show = filter === '*' || category?.includes(filter);
        item.classList.toggle('hidden', !show);
      });
    });
  });
}

// Counter animation with Intersection Observer
function initCounters() {
  const counters = document.querySelectorAll('.stat-value');
  if (!counters.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const el = entry.target;
      const target = el.dataset.count;
      if (!target || el.dataset.done) return;
      el.dataset.done = '1';
      
      const isFloat = target.includes('.');
      const num = parseFloat(target);
      const duration = 1500;
      const start = performance.now();
      
      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);
        const val = num * eased;
        el.textContent = isFloat ? val.toFixed(1) : Math.round(val);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.3 });
  
  counters.forEach(c => observer.observe(c));
}

// Back to top button
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  
  const onScroll = () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  };
  
  window.addEventListener('scroll', () => requestAnimationFrame(onScroll));
  onScroll();
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Contact form - EmailJS
function initFormSubmit() {
  const form = document.getElementById('contact-form');
  if (!form || typeof emailjs === 'undefined') return;

  emailjs.init('LfgUzj_fvEwqNarOC');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    
    emailjs.sendForm('service_heohddn', 'template_95tp7qq', form)
      .then(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.textContent = 'Sent!';
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 2000);
        }
        if (typeof alert === 'function') alert('Email sent successfully!');
      })
      .catch(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        if (typeof alert === 'function') alert('Failed to send. Please try again.');
      });
  });
}

// Scroll-triggered fade-in animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .section-header, .service-item, .portfolio-item, .resume-item, .skill-card, .stat');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  
  elements.forEach(el => {
    el.classList.add('fade-in');
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}
