document.getElementById('year').textContent=new Date().getFullYear();const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.tile').forEach(t=>{t.hidden=b.dataset.filter!=='all'&&t.dataset.category!==b.dataset.filter})}));const viewer=document.querySelector('#viewer');document.querySelectorAll('.tile').forEach(t=>t.addEventListener('click',()=>{viewer.querySelector('img').src=t.dataset.img;viewer.querySelector('img').alt=t.dataset.title;viewer.querySelector('p').textContent=t.dataset.title;viewer.showModal()}));viewer.querySelector('.close').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});

// Submit directly to Web3Forms; do not open the visitor's email app.
document.getElementById('contact-form')?.addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = this;
  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');
  if (!form.reportValidity()) return;
  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = 'Sending your message…';
  try {
    const response = await fetch('https://api.web3forms.com/submit', {method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Unable to send your message.');
    status.textContent = 'Thank you! Your message has been submitted.';
    form.reset();
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
  tryPlay();
})();


// Tiny, silent AeroScape drone. No clicks intercepted; pauses in hidden tabs.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const drone = document.createElement('div');
  drone.className = 'aeroscape-mini-drone';
  drone.setAttribute('aria-hidden', 'true');
  drone.innerHTML = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g stroke="#263e33" stroke-width="4" stroke-linecap="round"><path d="M27 28 16 17M37 28 48 17M27 36 16 47M37 36 48 47"/></g><g fill="#8da89a" stroke="#173b2c" stroke-width="2"><circle cx="16" cy="17" r="5"/><circle cx="48" cy="17" r="5"/><circle cx="16" cy="47" r="5"/><circle cx="48" cy="47" r="5"/></g><g class="drone-propeller" fill="#d4e4d7" opacity=".8"><ellipse cx="16" cy="17" rx="11" ry="3"/></g><g class="drone-propeller" fill="#d4e4d7" opacity=".8"><ellipse cx="48" cy="17" rx="11" ry="3"/></g><g class="drone-propeller" fill="#d4e4d7" opacity=".8"><ellipse cx="16" cy="47" rx="11" ry="3"/></g><g class="drone-propeller" fill="#d4e4d7" opacity=".8"><ellipse cx="48" cy="47" rx="11" ry="3"/></g><rect x="24" y="24" width="16" height="16" rx="6" fill="#557965" stroke="#173b2c" stroke-width="2"/><circle cx="32" cy="33" r="3" fill="#d0f0a5"/></svg>`;
  document.body.appendChild(drone);
  let x = -45, y = 0, fromX = x, fromY = y, toX = x, toY = y;
  let start = 0, duration = 0, pauseUntil = 0, rotation = 0, raf = 0;
  const size = () => window.innerWidth <= 600 ? 28 : 38;
  const random = (a,b) => a + Math.random() * (b-a);
  const destination = () => {
    const margin = size()+16;
    return {x:random(margin,Math.max(margin+1,window.innerWidth-margin)),
            y:random(margin,Math.max(margin+1,window.innerHeight-margin))};
  };
  const nextLeg = now => {
    fromX=x;fromY=y;
    const p=destination();toX=p.x;toY=p.y;
    const dx=toX-fromX,dy=toY-fromY;
    rotation=Math.max(-23,Math.min(23,dx/18));
    duration=Math.max(3800,Math.min(9500,Math.hypot(dx,dy)*18));
    start=now;
  };
  const animate = now => {
    if(document.hidden){raf=0;return;}
    if(now >= pauseUntil && duration === 0) nextLeg(now);
    if(duration){
      const t=Math.min(1,(now-start)/duration);
      const eased=t*t*(3-2*t);
      x=fromX+(toX-fromX)*eased;
      y=fromY+(toY-fromY)*eased+Math.sin(t*Math.PI*4)*2;
      if(t>=1){x=toX;y=toY;duration=0;pauseUntil=now+random(1800,4200);}
    }
    drone.style.transform=`translate3d(${x}px,${y}px,0) rotate(${rotation}deg)`;
    raf=requestAnimationFrame(animate);
  };
  const startDrone = () => {
    if(raf || document.hidden)return;
    if(x<0){x=window.innerWidth+10;y=window.innerHeight*.3;pauseUntil=0;}
    drone.classList.add('is-visible');
    raf=requestAnimationFrame(animate);
  };
  document.addEventListener('visibilitychange', () => {
    if(document.hidden){cancelAnimationFrame(raf);raf=0;drone.classList.remove('is-visible');}
    else{duration=0;pauseUntil=0;startDrone();}
  });
  window.addEventListener('resize', () => {x=Math.min(x,window.innerWidth-size());y=Math.min(y,window.innerHeight-size());duration=0;pauseUntil=0;});
  window.addEventListener('load', startDrone, {once:true});
  if(document.readyState==='complete')startDrone();
})();
