(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const track = document.getElementById('products-track');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('buscar');
  const storeForm = document.getElementById('store-form');
  const storeInput = document.getElementById('store-query');
  const storeMessage = document.getElementById('store-message');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelector('.round-arrow.next')?.addEventListener('click', (event) => {
    track?.scrollBy({ left: 280, behavior: reduceMotion ? 'auto' : 'smooth' });
    pulseControl(event.currentTarget, 1);
  });

  document.querySelector('.round-arrow.prev')?.addEventListener('click', (event) => {
    track?.scrollBy({ left: -280, behavior: reduceMotion ? 'auto' : 'smooth' });
    pulseControl(event.currentTarget, -1);
  });

  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const q = (searchInput?.value || '').trim().toLowerCase();
    if (!q) return;
    const cards = [...document.querySelectorAll('.product-card')];
    const hit = cards.find((card) => (card.dataset.search || '').includes(q) || card.textContent.toLowerCase().includes(q));
    if (hit) {
      document.getElementById('promociones')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      if (!reduceMotion) {
        hit.animate([
          { boxShadow: '0 0 0 rgba(231,25,34,0)', offset: 0 },
          { boxShadow: '0 0 0 6px rgba(231,25,34,.2), 0 20px 45px rgba(36,28,20,.16)', offset: .45 },
          { boxShadow: '0 0 0 rgba(231,25,34,0)', offset: 1 }
        ], { duration: 900, easing: 'cubic-bezier(.2,.8,.2,1)' });
      }
    } else {
      searchInput.setCustomValidity('No encontramos ese producto en las promociones de muestra.');
      searchInput.reportValidity();
      setTimeout(() => searchInput.setCustomValidity(''), 1500);
    }
  });

  storeForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const q = (storeInput?.value || '').trim();
    if (!q) {
      storeInput?.focus();
      return;
    }
    storeMessage.textContent = `Buscando sucursales cerca de “${q}”… Demo conceptual.`;
    if (!reduceMotion) {
      storeMessage.animate([
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' });
      storeForm.querySelector('button')?.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(.9)' },
        { transform: 'scale(1.06)' },
        { transform: 'scale(1)' }
      ], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
  });

  function pulseControl(button, direction) {
    if (!button || reduceMotion) return;
    button.animate([
      { transform: 'translateY(-50%) scale(1)' },
      { transform: `translateY(-50%) translateX(${direction * 5}px) scale(.92)` },
      { transform: 'translateY(-50%) scale(1)' }
    ], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }

  const motionStyle = document.createElement('style');
  motionStyle.id = 'dunosusa-motion-system';
  motionStyle.textContent = `
    .motion-progress{position:fixed;left:0;top:0;width:100%;height:4px;background:#ffcc25;transform:scaleX(0);transform-origin:left center;z-index:999;pointer-events:none;box-shadow:0 1px 7px rgba(0,0,0,.14)}
    .site-header{transition:box-shadow .35s ease,filter .35s ease}
    .hero{--wave-y:0px;--wave-scale:1}
    .hero:after{transform:translateY(var(--wave-y)) rotate(-3deg) scaleX(var(--wave-scale));will-change:transform}
    .hero-visual{transform-style:preserve-3d;will-change:transform;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
    .visual-blob{animation:blobBreath 7s ease-in-out infinite}
    .fruit-card{animation:fruitFloat 5.4s ease-in-out infinite;will-change:transform}
    .daily-copy{animation:dailyFloat 4.8s ease-in-out infinite;will-change:transform}
    .doodle{animation:doodleGlow 2.6s ease-in-out infinite alternate}
    .doodle-b{animation-delay:.35s}.doodle-c{animation-delay:.7s}
    .hero h1 strong{animation:contigoBreath 5.8s ease-in-out infinite;will-change:transform}
    .pin,.finder-pin{animation:pinPulse 2.2s ease-in-out infinite}
    .quick-access a,.product-card,.categories article,.hero-button,.yellow-button,.store-pill,.round-arrow{transition:transform .32s cubic-bezier(.2,.8,.2,1),box-shadow .32s ease,background-color .25s ease}
    .quick-access a:hover{transform:translateY(-7px);background:#fff;box-shadow:0 16px 28px rgba(36,28,20,.1);z-index:2}
    .quick-access a:hover .quick-icon{animation:iconPop .55s cubic-bezier(.2,.8,.2,1)}
    .product-card{transform-style:preserve-3d;will-change:transform}
    .product-card .product-image img{transition:transform .38s cubic-bezier(.2,.8,.2,1),filter .38s ease}
    .product-card:hover{box-shadow:0 20px 45px rgba(36,28,20,.14)}
    .product-card:hover .product-image img{transform:scale(1.07) rotate(-2deg);filter:saturate(1.08)}
    .product-card:hover .price-tag{animation:priceWiggle .55s cubic-bezier(.2,.8,.2,1)}
    .categories article{will-change:transform}
    .categories article img{transition:transform .6s cubic-bezier(.2,.8,.2,1),filter .45s ease}
    .categories article:hover{transform:translateY(-8px) rotate(-.5deg);box-shadow:0 18px 34px rgba(36,28,20,.12)}
    .categories article:hover img{transform:scale(1.08);filter:saturate(1.08)}
    .hero-button:hover,.yellow-button:hover,.store-pill:hover{transform:translateY(-3px);box-shadow:0 15px 28px rgba(36,28,20,.16)}
    .hero-button span,.yellow-button span{display:inline-block;transition:transform .25s ease}
    .hero-button:hover span,.yellow-button:hover span{transform:translateX(5px)}
    .fresh-photo img{will-change:transform}
    .finder-form input{transition:box-shadow .25s ease,transform .25s ease}
    .finder-form input:focus{outline:none;box-shadow:0 0 0 4px rgba(231,25,34,.15);transform:translateY(-1px)}
    .footer a{display:inline-block;transition:transform .25s ease,opacity .25s ease}.footer a:hover{transform:translateY(-3px);opacity:.8}
    @keyframes blobBreath{0%,100%{transform:rotate(7deg) scale(1)}50%{transform:rotate(10deg) scale(1.035)}}
    @keyframes fruitFloat{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-12px) rotate(-2.5deg)}}
    @keyframes dailyFloat{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(7px) rotate(-4.5deg)}}
    @keyframes doodleGlow{from{opacity:.55;filter:drop-shadow(0 0 0 rgba(255,204,37,0))}to{opacity:1;filter:drop-shadow(0 0 9px rgba(255,204,37,.35))}}
    @keyframes contigoBreath{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-4px) rotate(-1.2deg)}}
    @keyframes pinPulse{0%,100%{box-shadow:0 0 0 0 rgba(231,25,34,.26)}50%{box-shadow:0 0 0 7px rgba(231,25,34,0)}}
    @keyframes iconPop{0%{transform:scale(1) rotate(0)}45%{transform:scale(1.22) rotate(-8deg)}100%{transform:scale(1) rotate(0)}}
    @keyframes priceWiggle{0%,100%{transform:rotate(-5deg) scale(1)}35%{transform:rotate(-8deg) scale(1.08)}70%{transform:rotate(-3deg) scale(1.03)}}
    @media (prefers-reduced-motion:reduce){
      .visual-blob,.fruit-card,.daily-copy,.doodle,.hero h1 strong,.pin,.finder-pin{animation:none!important}
      .hero-visual,.quick-access a,.product-card,.categories article,.hero-button,.yellow-button,.store-pill,.round-arrow,.product-card .product-image img,.categories article img{transition:none!important}
    }
  `;
  document.head.appendChild(motionStyle);

  if (reduceMotion) return;

  const progress = document.createElement('div');
  progress.className = 'motion-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const intro = [
    ['.site-header', { y: -24, duration: 520, delay: 0 }],
    ['.eyebrow', { y: 16, duration: 460, delay: 80 }],
    ['.hero h1 span', { y: 34, duration: 700, delay: 130 }],
    ['.hero h1 strong', { y: 42, duration: 780, delay: 210 }],
    ['.hero-lede', { y: 20, duration: 560, delay: 330 }],
    ['.hero-button', { y: 20, duration: 560, delay: 390 }],
    ['.fruit-card', { x: 45, y: 8, duration: 900, delay: 260, scale: .92 }],
    ['.daily-copy', { x: 26, duration: 720, delay: 430, rotate: -10 }],
    ['.store-stage img', { y: 34, duration: 900, delay: 460, scale: .98 }]
  ];

  requestAnimationFrame(() => {
    intro.forEach(([selector, config]) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const start = `translate3d(${config.x || 0}px,${config.y || 0}px,0) scale(${config.scale || 1}) rotate(${config.rotate || 0}deg)`;
      const animation = el.animate([
        { opacity: 0, transform: start, filter: 'blur(5px)' },
        { opacity: 1, transform: 'translate3d(0,0,0) scale(1)', filter: 'blur(0)' }
      ], {
        duration: config.duration,
        delay: config.delay,
        easing: 'cubic-bezier(.16,1,.3,1)',
        fill: 'both'
      });
      animation.addEventListener('finish', () => animation.cancel(), { once: true });
    });
  });

  const revealSets = [
    { selector: '.quick-access a', y: 24, stagger: 65 },
    { selector: '.offers-intro > *', y: 26, stagger: 70 },
    { selector: '.product-card', y: 34, stagger: 90 },
    { selector: '.fresh-photo, .finder', y: 34, stagger: 120 },
    { selector: '.category-head > *', y: 26, stagger: 90 },
    { selector: '.categories article', y: 34, stagger: 75 },
    { selector: '.footer-inner > *', y: 18, stagger: 70 }
  ];

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = Number(el.dataset.motionDelay || 0);
      const y = Number(el.dataset.motionY || 28);
      setTimeout(() => {
        const animation = el.animate([
          { opacity: 0, transform: `translate3d(0,${y}px,0) scale(.985)`, filter: 'blur(4px)' },
          { opacity: 1, transform: 'translate3d(0,0,0) scale(1)', filter: 'blur(0)' }
        ], { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
        animation.addEventListener('finish', () => {
          el.style.opacity = '1';
          el.style.transform = '';
          el.style.filter = '';
          animation.cancel();
        }, { once: true });
      }, delay);
      revealObserver.unobserve(el);
    });
  }, { threshold: .16, rootMargin: '0px 0px -6% 0px' });

  revealSets.forEach(({ selector, y, stagger }) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = `translate3d(0,${y}px,0)`;
      el.dataset.motionDelay = String(index * stagger);
      el.dataset.motionY = String(y);
      revealObserver.observe(el);
    });
  });

  const hero = document.querySelector('.hero');
  const heroVisual = document.querySelector('.hero-visual');
  const storeImage = document.querySelector('.store-stage img');
  const freshPhoto = document.querySelector('.fresh-photo');
  const freshImage = document.querySelector('.fresh-photo img');
  const header = document.querySelector('.site-header');
  let ticking = false;

  const updateScrollMotion = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, scrollY / max)})`;

    if (hero) {
      const rect = hero.getBoundingClientRect();
      const amount = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
      hero.style.setProperty('--wave-y', `${amount * 20}px`);
      hero.style.setProperty('--wave-scale', String(1 + amount * .035));
      if (storeImage) storeImage.style.transform = `translate3d(0,${amount * 18}px,0)`;
    }

    if (freshPhoto && freshImage) {
      const rect = freshPhoto.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-16, Math.min(16, center * -.035));
      freshImage.style.transform = `scale(1.3) translate3d(0,${offset}px,0)`;
    }

    if (header) {
      header.style.boxShadow = scrollY > 18 ? '0 10px 28px rgba(120,0,8,.22)' : '0 6px 20px rgba(134,0,8,.14)';
    }
    ticking = false;
  };

  const requestScrollMotion = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollMotion);
  };

  window.addEventListener('scroll', requestScrollMotion, { passive: true });
  window.addEventListener('resize', requestScrollMotion, { passive: true });
  updateScrollMotion();

  if (finePointer && heroVisual) {
    heroVisual.addEventListener('pointermove', (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroVisual.style.transform = `perspective(900px) rotateX(${(-y * 3.5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translate3d(${(x * 5).toFixed(1)}px,${(y * 4).toFixed(1)}px,0)`;
    });
    heroVisual.addEventListener('pointerleave', () => {
      heroVisual.style.transform = '';
    });
  }

  if (finePointer) {
    document.querySelectorAll('.product-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(850px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });

    document.querySelectorAll('.hero-button, .store-pill').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        button.style.transform = `translate3d(${(x * .055).toFixed(1)}px,${(y * .08 - 3).toFixed(1)}px,0)`;
      });
      button.addEventListener('pointerleave', () => {
        button.style.transform = '';
      });
    });
  }

  const sectionMap = [
    ['inicio', 'inicio'],
    ['promociones', 'promociones'],
    ['productos', 'productos'],
    ['tiendas', 'tiendas'],
    ['nosotros', 'nosotros'],
    ['contacto', 'contacto']
  ];

  const navLinks = new Map([...document.querySelectorAll('.nav a[href^="#"]')].map((link) => [link.getAttribute('href').slice(1), link]));
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const key = visible.target.dataset.navKey;
    const active = navLinks.get(key);
    if (!active) return;
    navLinks.forEach((link) => link.classList.remove('is-active'));
    active.classList.add('is-active');
  }, { threshold: [.2, .45, .7], rootMargin: '-15% 0px -45% 0px' });

  sectionMap.forEach(([id, navKey]) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.dataset.navKey = navKey;
    navObserver.observe(section);
  });
})();