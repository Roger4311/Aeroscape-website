(()=>{'use strict';
const dialog=document.getElementById('ajmal-gallery'),open=document.getElementById('ajmal-gallery-open');
if(!dialog||!open)return;
const image=document.getElementById('ajmal-gallery-image'),count=document.getElementById('ajmal-gallery-count'),thumbs=document.getElementById('ajmal-gallery-thumbs');
const total=57;let current=0;let built=false;
const url=i=>'assets/dhara/ajmal-gadh/photo-'+String(i+1).padStart(2,'0')+'.jpg';
function show(i){current=(i+total)%total;image.src=url(current);image.alt='Ajmal Gadh mountain cleanup — photograph '+(current+1)+' of '+total;count.textContent='Photo '+(current+1)+' of '+total;const buttons=thumbs.querySelectorAll('button');buttons.forEach((b,n)=>b.setAttribute('aria-current',String(n===current)));buttons[current]?.scrollIntoView({block:'nearest',inline:'nearest'});for(const n of [current+1,current-1]){const preload=new Image();preload.src=url((n+total)%total)}}
function build(){if(built)return;built=true;const fragment=document.createDocumentFragment();for(let i=0;i<total;i++){const button=document.createElement('button');button.type='button';button.setAttribute('aria-label','View photograph '+(i+1));const img=document.createElement('img');img.src=url(i);img.loading='lazy';img.alt='';button.appendChild(img);button.addEventListener('click',()=>show(i));fragment.appendChild(button)}thumbs.appendChild(fragment)}
open.addEventListener('click',()=>{build();dialog.showModal();show(0)});
document.getElementById('ajmal-gallery-close').addEventListener('click',()=>dialog.close());
document.getElementById('ajmal-gallery-prev').addEventListener('click',()=>show(current-1));
document.getElementById('ajmal-gallery-next').addEventListener('click',()=>show(current+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}if(e.key==='ArrowRight'){e.preventDefault();show(current+1)}});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
})();