document.getElementById('year').textContent=new Date().getFullYear();const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.tile').forEach(t=>{t.hidden=b.dataset.filter!=='all'&&t.dataset.category!==b.dataset.filter})}));const viewer=document.querySelector('#viewer');document.querySelectorAll('.tile').forEach(t=>t.addEventListener('click',()=>{viewer.querySelector('img').src=t.dataset.img;viewer.querySelector('img').alt=t.dataset.title;viewer.querySelector('p').textContent=t.dataset.title;viewer.showModal()}));viewer.querySelector('.close').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});

// Contact form uses the visitor's email app; no backend or stored submissions.
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
 e.preventDefault(); const f=new FormData(this); const subject='AeroScape: '+String(f.get('subject')||'New enquiry');
 const body='Name: '+f.get('name')+'\nEmail: '+f.get('email')+'\n\n'+f.get('message');
 window.location.href='mailto:mitalp@zohomail.in?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
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
