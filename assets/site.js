// Announcement bar dismiss
(function(){
  const announce = document.getElementById('announce');
  const announceClose = document.getElementById('announceClose');
  if (announceClose) {
    announceClose.addEventListener('click', () => {
      announce.classList.add('hidden');
      document.body.classList.add('announce-closed');
    });
  }
})();

// Reveal-on-scroll
(function(){
  const reveals = document.querySelectorAll('.reveal');
  const inViewport = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight - 60 && r.bottom > 0;
  };
  reveals.forEach(el => { if (inViewport(el)) el.classList.add('in'); });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => { if (!el.classList.contains('in')) io.observe(el); });
})();

// Active nav link
(function(){
  const path = window.location.pathname.replace(/\/$/, '');
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '');
    if (href === path || (href === '/' && (path === '' || path === '/index.html'))) {
      a.classList.add('active');
    }
  });
})();

// Testimonial mini carousel
(function(){
  const vTrack = document.getElementById('vMiniTrack');
  const vPrev = document.getElementById('vMiniPrev');
  const vNext = document.getElementById('vMiniNext');
  if (vTrack && vPrev && vNext) {
    const step = () => {
      const card = vTrack.querySelector('.v-mini');
      return card ? card.getBoundingClientRect().width + 20 : 320;
    };
    vPrev.addEventListener('click', () => vTrack.scrollBy({ left: -step(), behavior: 'smooth' }));
    vNext.addEventListener('click', () => vTrack.scrollBy({ left: step(), behavior: 'smooth' }));
  }
})();

// Floating chat button — show after slight scroll, hide near final CTA
(function(){
  const floatChat = document.getElementById('floatChat');
  if (!floatChat) return;
  const finalCTA = document.querySelector('.final');
  const update = () => {
    const scrolled = window.scrollY > 280;
    const finalRect = finalCTA ? finalCTA.getBoundingClientRect() : null;
    const inFinal = finalRect && finalRect.top < window.innerHeight - 60 && finalRect.bottom > 0;
    if (scrolled && !inFinal) {
      floatChat.classList.add('show');
      floatChat.classList.remove('hide');
    } else {
      floatChat.classList.remove('show');
      floatChat.classList.add('hide');
    }
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
