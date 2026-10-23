document.getElementById('year').textContent=new Date().getFullYear();const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.tile').forEach(t=>{t.hidden=b.dataset.filter!=='all'&&t.dataset.category!==b.dataset.filter})}));const viewer=document.querySelector('#viewer');document.querySelectorAll('.tile').forEach(t=>t.addEventListener('click',()=>{viewer.querySelector('img').src=t.dataset.img;viewer.querySelector('img').alt=t.dataset.title;viewer.querySelector('p').textContent=t.dataset.title;viewer.showModal()}));viewer.querySelector('.close').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});

// Submit directly to Web3Forms; do not open the visitor's email app.
document.getElementById('contact-form')?.addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = this;
  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');
  if (!form.reportValidity()) return;
  const captchaToken = form.querySelector('[name="h-captcha-response"]')?.value;
  if (!captchaToken) {
    status.textContent = 'Please complete the spam verification before sending.';
    return;
  }
  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = 'Sending your message…';
  try {
    const response = await fetch('https://api.web3forms.com/submit', {method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Unable to send your message.');
    status.textContent = 'Thank you! Your message has been submitted.';
    form.reset();
    if (window.hcaptcha && typeof window.hcaptcha.reset === 'function') window.hcaptcha.reset();
  } catch(error) {
    status.textContent = 'Message not sent. Please try again or email mital.p@zohomail.in.';
  } finally {
    button.disabled = false;
    button.textContent = 'Send Message ↗';
  }
});

// iPhone Safari: retry inline muted autoplay; offer manual playback if blocked.
(() => {
  const video = document.querySelector('.hero-video');
  const playButton = document.querySelector('.hero-play');
  if (!video || !playButton) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  const tryPlay = () => {
    if (document.hidden || !video.paused) return;
    const result = video.play();
    if (result && typeof result.then === 'function') {
      result.then(() => { playButton.hidden = true; })
        .catch(() => { playButton.hidden = false; });
    }
  };
  video.addEventListener('playing', () => { playButton.hidden = true; });
  video.addEventListener('loadeddata', tryPlay);
  video.addEventListener('canplay', tryPlay);
  document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tryPlay(); });
  window.addEventListener('pageshow', tryPlay);
  playButton.addEventListener('click', () => {
    video.muted = true;
    const result = video.play();
    if (result && typeof result.then === 'function') {
      result.then(() => { playButton.hidden = true; }).catch(() => { playButton.hidden = false; });
    }
  });
  tryPlay();
})();


// Keep the Stories in Motion background playing inline on iOS and Android.
(() => {
  const video = document.querySelector('#films .reels-background-video');
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const tryPlay = () => {
    if (document.hidden || reducedMotion.matches || !video.paused) return;
    const promise = video.play();
    if (promise && typeof promise.catch === 'function') promise.catch(() => {
      // The original-photo CSS fallback remains visible if autoplay is blocked.
    });
  };
  video.addEventListener('loadeddata', tryPlay);
  video.addEventListener('canplay', tryPlay);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tryPlay(); });
  window.addEventListener('pageshow', tryPlay);
  const section = document.getElementById('films');
  if ('IntersectionObserver' in window && section) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) tryPlay();
    }, { threshold: 0.05 });
    observer.observe(section);
  }
  // Mobile browsers may permit playback after the first user gesture.
  document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
  document.addEventListener('click', tryPlay, { once: true, passive: true });
  tryPlay();
})();
