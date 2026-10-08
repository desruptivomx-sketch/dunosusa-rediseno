(() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const navToggle = qs('.nav-toggle');
  const nav = qs('.nav');
  const track = qs('#products-track');
  const searchForm = qs('#search-form');
  const searchInput = qs('#buscar');
  const storeForm = qs('#store-form');
  const storeInput = qs('#store-query');
  const storeMessage = qs('#store-message');
  const header = qs('.site-header');
  const hero = qs('.hero');
  const heroVisual = qs('.hero-visual');
  const storeImage = qs('.store-stage img');
  const freshPhoto = qs('.fresh-photo');
  const freshImage = qs('.fresh-photo img');

  /* -----------------------------
     Navigation + existing behavior
  ------------------------------ */
  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  qsa('.nav a').forEach((link) => link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const carouselMove = (direction, button) => {
    track?.scrollBy({ left: direction * 300, behavior: reduceMotion ? 'auto' : 'smooth' });
    if (!reduceMotion && button) {
      button.animate([
        { transform: 'translateY(-50%) scale(1)' },
        { transform: `translateY(-50%) translateX(${direction * 5}px) scale(.88)` },
        { transform: 'translateY(-50%) scale(1.04)' },
        { transform: 'translateY(-50%) scale(1)' }
      ], { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
  };

  qs('.round-arrow.next')?.addEventListener('click', (event) => carouselMove(1, event.currentTarget));
  qs('.round-arrow.prev')?.addEventListener('click', (event) => carouselMove(-1, event.currentTarget));

  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const query = normalize((searchInput?.value || '').trim());
    if (!query) return;

    const cards = qsa('.product-card');
    const hit = cards.find((card) => normalize((card.dataset.search || '') + ' ' + card.textContent).includes(query));

    if (!hit) {
      searchInput.setCustomValidity('No encontramos ese producto en las promociones de muestra.');
      searchInput.reportValidity();
      setTimeout(() => searchInput.setCustomValidity(''), 1500);
      return;
    }

    hit.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center', inline: 'center' });
    if (!reduceMotion) {
      setTimeout(() => {
        hit.animate([
          { transform: 'translateY(0) scale(1)', boxShadow: '0 0 0 rgba(231,25,34,0)' },
          { transform: 'translateY(-8px) scale(1.02)', boxShadow: '0 0 0 5px rgba(231,25,34,.16), 0 14px 28px rgba(36,28,20,.12)' },
          { transform: 'translateY(0) scale(1)', boxShadow: '0 0 0 rgba(231,25,34,0)' }
        ], { duration: 850, easing: 'cubic-bezier(.16,1,.3,1)' });
      }, 280);
    }
  });

  storeForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = (storeInput?.value || '').trim();
    if (!query) {
      storeInput?.focus();
      return;
    }

    storeMessage.textContent = `Buscando sucursales cerca de “${query}”… Demo conceptual.`;
    if (!reduceMotion) {
      storeMessage.animate([
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)' });
    }
  });

  /* -----------------------------
     DESIGN.md-inspired motion CSS
     - restrained chrome
     - image-led motion
     - one elevation tier
     - scale feedback on press
  ------------------------------ */
  const motionStyle = document.createElement('style');
  motionStyle.id = 'dunosusa-motion-system';
  motionStyle.textContent = `
    :root{
      --motion-ease:cubic-bezier(.16,1,.3,1);
      --motion-fast:220ms;
      --motion-base:420ms;
      --motion-slow:760ms;
      --motion-shadow:0 0 0 1px rgba(36,28,20,.02),0 2px 6px rgba(36,28,20,.04),0 10px 24px rgba(36,28,20,.10);
    }

    .motion-progress{position:fixed;left:0;top:0;width:100%;height:3px;background:#ffcc25;transform:scaleX(0);transform-origin:left center;z-index:999;pointer-events:none}
    .site-header{transition:box-shadow .35s ease,transform .35s var(--motion-ease)}
    .site-header.is-compact{box-shadow:0 10px 26px rgba(120,0,8,.20)}
    .site-header.is-compact .brand{transform:scale(.94)}
    .brand{transform-origin:left center;transition:transform var(--motion-base) var(--motion-ease)}

    .nav a:after{transition:transform var(--motion-base) var(--motion-ease)}
    .search{transition:transform var(--motion-base) var(--motion-ease)}
    .search:focus-within{transform:scale(1.015)}
    .search input{transition:box-shadow var(--motion-fast) ease,transform var(--motion-fast) ease}
    .search:focus-within input{box-shadow:0 0 0 4px rgba(255,204,37,.18)}

    .hero{--hero-scroll:0;--wave-y:0px;--wave-scale:1}
    .hero:after{transform:translateY(var(--wave-y)) rotate(-3deg) scaleX(var(--wave-scale));will-change:transform}
    .hero-copy{will-change:transform,opacity}
    .hero-visual{transform-style:preserve-3d;will-change:transform;transition:transform .65s var(--motion-ease)}
    .visual-blob{animation:blobDrift 8s ease-in-out infinite;will-change:transform}
    .fruit-card{animation:heroFloat 5.8s ease-in-out infinite;will-change:transform}
    .daily-copy{animation:copyFloat 5.2s ease-in-out infinite;will-change:transform}
    .doodle{animation:doodleBreathe 3.2s ease-in-out infinite alternate;transform-origin:center}
    .doodle-b{animation-delay:.45s}.doodle-c{animation-delay:.9s}
    .store-stage img{will-change:transform}

    .hero-button,.yellow-button,.store-pill,.round-arrow,.finder-form button,.nav-toggle{
      transition:transform var(--motion-fast) var(--motion-ease),box-shadow var(--motion-fast) ease,background-color var(--motion-fast) ease;
      transform-origin:center;
    }
    .hero-button:hover,.yellow-button:hover,.store-pill:hover{transform:translateY(-2px);box-shadow:var(--motion-shadow)}
    .hero-button:active,.yellow-button:active,.store-pill:active,.round-arrow:active,.finder-form button:active,.nav-toggle:active{transform:scale(.96)}
    .hero-button span,.yellow-button span{display:inline-block;transition:transform var(--motion-fast) var(--motion-ease)}
    .hero-button:hover span,.yellow-button:hover span{transform:translateX(4px)}

    .quick-access a,.product-card,.categories article{
      transition:transform var(--motion-base) var(--motion-ease),box-shadow var(--motion-base) ease,background-color var(--motion-fast) ease;
      will-change:transform;
    }
    .quick-access a:hover,.product-card:hover,.categories article:hover{box-shadow:var(--motion-shadow)}
    .quick-access a:hover{transform:translateY(-5px);background:#fff}
    .quick-icon{display:inline-block;transition:transform var(--motion-base) var(--motion-ease)}
    .quick-access a:hover .quick-icon{transform:translateY(-2px) scale(1.08)}

    .product-card{transform-style:preserve-3d}
    .product-card .product-image{overflow:hidden;border-radius:18px}
    .product-card .product-image img{transition:transform .7s var(--motion-ease),filter .5s ease;will-change:transform}
    .product-card:hover .product-image img{transform:scale(1.075);filter:saturate(1.06)}
    .price-tag{transform-origin:70% 80%;will-change:transform}

    .fresh-photo{isolation:isolate}
    .fresh-photo img{will-change:transform;transition:filter .6s ease}
    .fresh-photo:hover img{filter:saturate(1.05)}
    .fresh-copy{will-change:transform,opacity}
    .finder-form input{transition:box-shadow var(--motion-fast) ease,transform var(--motion-fast) var(--motion-ease)}
    .finder-form input:focus{outline:none;box-shadow:0 0 0 4px rgba(231,25,34,.15);transform:translateY(-1px)}

    .categories article{overflow:hidden}
    .categories article img{transition:transform .75s var(--motion-ease),filter .5s ease;will-change:transform}
    .categories article:hover{transform:translateY(-6px)}
    .categories article:hover img{transform:scale(1.07);filter:saturate(1.05)}

    .footer a{display:inline-block;transition:transform var(--motion-fast) var(--motion-ease),opacity var(--motion-fast) ease}
    .footer a:hover{transform:translateY(-2px);opacity:.82}

    @keyframes blobDrift{0%,100%{transform:rotate(7deg) translate3d(0,0,0) scale(1)}50%{transform:rotate(9deg) translate3d(7px,-5px,0) scale(1.025)}}
    @keyframes heroFloat{0%,100%{transform:translate3d(0,0,0) rotate(-4deg)}50%{transform:translate3d(0,-10px,0) rotate(-2.5deg)}}
    @keyframes copyFloat{0%,100%{transform:translate3d(0,0,0) rotate(-6deg)}50%{transform:translate3d(0,6px,0) rotate(-5deg)}}
    @keyframes doodleBreathe{from{opacity:.68;transform:scale(.96)}to{opacity:1;transform:scale(1.04)}}

    @media (prefers-reduced-motion:reduce){
      html{scroll-behavior:auto}
      .visual-blob,.fruit-card,.daily-copy,.doodle{animation:none!important}
      .hero-visual,.quick-access a,.product-card,.categories article,.hero-button,.yellow-button,.store-pill,.round-arrow,.product-card .product-image img,.categories article img,.brand,.search{transition:none!important}
      .motion-progress{display:none}
    }
  `;
  document.head.appendChild(motionStyle);

  if (reduceMotion) return;

  const progress = document.createElement('div');
  progress.className = 'motion-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  /* -----------------------------
     Hero entrance: cinematic chapters
  ------------------------------ */
  const introTimeline = [
    ['.site-header', { from: 'translateY(-24px)', duration: 520, delay: 0 }],
    ['.eyebrow', { from: 'translateY(12px)', duration: 430, delay: 70 }],
    ['.hero h1 span', { from: 'translateY(42px)', duration: 720, delay: 110 }],
    ['.hero h1 strong', { from: 'translateY(52px) rotate(-4deg)', duration: 820, delay: 190 }],
    ['.hero-lede', { from: 'translateY(18px)', duration: 520, delay: 320 }],
    ['.hero-button', { from: 'translateY(18px) scale(.96)', duration: 520, delay: 380 }],
    ['.visual-blob', { from: 'scale(.86) rotate(2deg)', duration: 950, delay: 180 }],
    ['.fruit-card', { from: 'translateX(52px) scale(.92) rotate(-8deg)', duration: 980, delay: 260 }],
    ['.daily-copy', { from: 'translateX(30px) rotate(-10deg)', duration: 760, delay: 390 }],
    ['.store-stage img', { from: 'translateY(42px) scale(.98)', duration: 920, delay: 430 }]
  ];

  introTimeline.forEach(([selector, config]) => {
    const element = qs(selector);
    if (!element) return;
    const animation = element.animate([
      { opacity: 0, transform: config.from, clipPath: 'inset(0 0 18% 0)' },
      { opacity: 1, transform: 'none', clipPath: 'inset(0 0 0 0)' }
    ], {
      duration: config.duration,
      delay: config.delay,
      easing: 'cubic-bezier(.16,1,.3,1)',
      fill: 'both'
    });
    animation.addEventListener('finish', () => animation.cancel(), { once: true });
  });

  /* -----------------------------
     One-shot section reveals
     Chapters alternate direction.
  ------------------------------ */
  const revealGroups = [
    { selector: '.quick-access a', axis: 'y', amount: 28, stagger: 70 },
    { selector: '.offers-intro > *', axis: 'x', amount: -28, stagger: 75 },
    { selector: '.product-card', axis: 'x', amount: 38, stagger: 95 },
    { selector: '.fresh-photo', axis: 'x', amount: -46, stagger: 0 },
    { selector: '.finder', axis: 'x', amount: 46, stagger: 0 },
    { selector: '.category-head > *', axis: 'y', amount: 24, stagger: 100 },
    { selector: '.categories article', axis: 'y', amount: 34, stagger: 75 },
    { selector: '.footer-inner > *', axis: 'y', amount: 18, stagger: 70 }
  ];

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const delay = Number(element.dataset.motionDelay || 0);
      const axis = element.dataset.motionAxis || 'y';
      const amount = Number(element.dataset.motionAmount || 24);
      const transform = axis === 'x' ? `translate3d(${amount}px,0,0)` : `translate3d(0,${amount}px,0)`;

      setTimeout(() => {
        const animation = element.animate([
          { opacity: 0, transform, clipPath: 'inset(6% 0 6% 0)' },
          { opacity: 1, transform: 'translate3d(0,0,0)', clipPath: 'inset(0 0 0 0)' }
        ], { duration: 680, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });

        animation.addEventListener('finish', () => {
          element.style.opacity = '1';
          element.style.transform = '';
          element.style.clipPath = '';
          animation.cancel();

          if (element.classList.contains('product-card')) {
            const price = qs('.price-tag', element);
            price?.animate([
              { transform: 'rotate(-5deg) scale(.82)' },
              { transform: 'rotate(-8deg) scale(1.08)' },
              { transform: 'rotate(-5deg) scale(1)' }
            ], { duration: 520, easing: 'cubic-bezier(.16,1,.3,1)' });
          }
        }, { once: true });
      }, delay);

      revealObserver.unobserve(element);
    });
  }, { threshold: .16, rootMargin: '0px 0px -7% 0px' });

  revealGroups.forEach(({ selector, axis, amount, stagger }) => {
    qsa(selector).forEach((element, index) => {
      element.style.opacity = '0';
      element.dataset.motionAxis = axis;
      element.dataset.motionAmount = String(amount);
      element.dataset.motionDelay = String((index % 4) * stagger);
      revealObserver.observe(element);
    });
  });

  /* -----------------------------
     Scroll-linked image motion
     UI stays restrained; imagery moves.
  ------------------------------ */
  let scrollTicking = false;

  const updateScrollMotion = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, scrollY / maxScroll)})`;
    header?.classList.toggle('is-compact', scrollY > 24);

    if (hero) {
      const rect = hero.getBoundingClientRect();
      const heroProgress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
      hero.style.setProperty('--wave-y', `${heroProgress * 22}px`);
      hero.style.setProperty('--wave-scale', String(1 + heroProgress * .04));

      const heroCopy = qs('.hero-copy');
      if (heroCopy) {
        heroCopy.style.transform = `translate3d(0,${heroProgress * -18}px,0)`;
        heroCopy.style.opacity = String(1 - heroProgress * .18);
      }
      if (storeImage) storeImage.style.transform = `translate3d(0,${heroProgress * 20}px,0) scale(${1 + heroProgress * .015})`;
    }

    if (freshPhoto && freshImage) {
      const rect = freshPhoto.getBoundingClientRect();
      const centerDelta = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-18, Math.min(18, centerDelta * -.04));
      freshImage.style.transform = `scale(1.3) translate3d(0,${offset}px,0)`;
    }

    scrollTicking = false;
  };

  const requestScrollMotion = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScrollMotion);
  };

  window.addEventListener('scroll', requestScrollMotion, { passive: true });
  window.addEventListener('resize', requestScrollMotion, { passive: true });
  updateScrollMotion();

  /* -----------------------------
     Pointer depth — tiny, not gimmicky
  ------------------------------ */
  if (finePointer && heroVisual) {
    heroVisual.addEventListener('pointermove', (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroVisual.style.transform = `perspective(1000px) rotateX(${(-y * 2.6).toFixed(2)}deg) rotateY(${(x * 3.6).toFixed(2)}deg) translate3d(${(x * 4).toFixed(1)}px,${(y * 3).toFixed(1)}px,0)`;
    });
    heroVisual.addEventListener('pointerleave', () => { heroVisual.style.transform = ''; });
  }

  if (finePointer) {
    qsa('.product-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 3.5).toFixed(2)}deg) rotateY(${(x * 4.2).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  /* -----------------------------
     Press feedback from Framer-like
     transform scale rather than recolor.
  ------------------------------ */
  qsa('.hero-button,.yellow-button,.store-pill,.quick-access a,.round-arrow,.finder-form button').forEach((element) => {
    element.addEventListener('pointerdown', () => {
      if (element.classList.contains('round-arrow')) return;
      element.animate([
        { transform: getComputedStyle(element).transform === 'none' ? 'scale(1)' : getComputedStyle(element).transform },
        { transform: 'scale(.96)' }
      ], { duration: 120, easing: 'ease-out', fill: 'forwards' });
    });
    const release = () => element.getAnimations().forEach((animation) => {
      if (animation.playState !== 'finished') animation.cancel();
    });
    element.addEventListener('pointerup', release);
    element.addEventListener('pointercancel', release);
    element.addEventListener('pointerleave', release);
  });

  /* -----------------------------
     Active nav follows page chapter
  ------------------------------ */
  const navLinks = new Map(qsa('.nav a[href^="#"]').map((link) => [link.getAttribute('href').slice(1), link]));
  const sectionIds = ['inicio', 'promociones', 'productos', 'tiendas', 'nosotros', 'contacto'];

  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const link = navLinks.get(visible.target.dataset.navKey);
    if (!link) return;
    navLinks.forEach((item) => item.classList.remove('is-active'));
    link.classList.add('is-active');
  }, { threshold: [.18, .38, .62], rootMargin: '-14% 0px -48% 0px' });

  sectionIds.forEach((id) => {
    const section = qs(`#${id}`);
    if (!section) return;
    section.dataset.navKey = id;
    navObserver.observe(section);
  });
})();