/* AeroScape tiny floating drone — standalone so other page scripts cannot stop it. */
(function(){
  function init(){
    if(document.getElementById('aeroscape-drone-live') || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var d=document.createElement('div');
    d.id='aeroscape-drone-live';
    d.setAttribute('aria-hidden','true');
    d.style.cssText='position:fixed!important;left:0;top:0;width:42px;height:42px;z-index:2147483640!important;pointer-events:none!important;display:block!important;opacity:.98!important;filter:drop-shadow(0 2px 3px #0009);transition:none;will-change:transform';
    d.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="42" height="42"><g stroke="#132f25" stroke-width="5" stroke-linecap="round"><path d="M26 27 15 16M38 27 49 16M26 37 15 48M38 37 49 48"/></g><g fill="#b5d4c2" stroke="#163a2c" stroke-width="2"><ellipse cx="15" cy="16" rx="11" ry="4"/><ellipse cx="49" cy="16" rx="11" ry="4"/><ellipse cx="15" cy="48" rx="11" ry="4"/><ellipse cx="49" cy="48" rx="11" ry="4"/></g><rect x="23" y="24" width="18" height="16" rx="6" fill="#426b55" stroke="#e5f5e6" stroke-width="2"/><circle cx="32" cy="32" r="4" fill="#d3f0b5"/></svg>';
    document.body.appendChild(d);
    var x=Math.max(40,innerWidth*.68),y=Math.max(80,innerHeight*.28),tx=x,ty=y,until=0,last=0;
    function frame(t){
      if(document.hidden){requestAnimationFrame(frame);return;}
      if(t>until){
        tx=35+Math.random()*Math.max(1,innerWidth-110);
        ty=60+Math.random()*Math.max(1,innerHeight-150);
        until=t+4500+Math.random()*3500;
      }
      var dt=Math.min(40,t-(last||t));last=t;
      var k=Math.min(.028,dt*.00085);
      x+=(tx-x)*k;y+=(ty-y)*k;
      d.style.transform='translate3d('+x+'px,'+(y+Math.sin(t/360)*2)+'px,0) rotate('+Math.max(-14,Math.min(14,(tx-x)/24))+'deg)';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();