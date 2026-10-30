/* AeroScape tiny floating drone — standalone so other page scripts cannot stop it. */
(function(){
  function init(){
    if(document.getElementById('aeroscape-drone-live') || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var d=document.createElement('div');
    d.id='aeroscape-drone-live';
    d.setAttribute('role','link');
    d.setAttribute('aria-label','Open AeroScape Instagram profile');
    d.setAttribute('tabindex','0');
    d.title='AeroScape on Instagram';
    d.style.cssText='position:fixed!important;left:0;top:0;width:42px;height:42px;z-index:2147483640!important;pointer-events:auto!important;cursor:pointer!important;display:block!important;opacity:.98!important;filter:drop-shadow(0 2px 3px #0009);transition:none;will-change:transform';
    d.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="42" height="42" aria-hidden="true"><defs><linearGradient id="asBody" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".52" stop-color="#cdd5d4"/><stop offset="1" stop-color="#647878"/></linearGradient><filter id="asGlow"><feGaussianBlur stdDeviation="2.4"/></filter></defs><g stroke="#647678" stroke-width="7" stroke-linecap="round"><path d="M31 34 16 21M49 34 64 21M31 47 16 58M49 47 64 58"/></g><g fill="#839595" stroke="#d5e0df" stroke-width="1.5"><rect x="10" y="17" width="12" height="13" rx="4"/><rect x="58" y="17" width="12" height="13" rx="4"/><rect x="10" y="52" width="12" height="13" rx="4"/><rect x="58" y="52" width="12" height="13" rx="4"/></g><g fill="#dce5e3" opacity=".62"><g class="as-rotor" style="transform-origin:16px 19px"><path d="M2 19 Q8 14 16 19 Q8 22 2 19Z" fill="#f6ffff"/><path d="M16 19 Q23 16 30 19 Q23 24 16 19Z" fill="#8da8aa"/><circle cx="16" cy="19" r="2" fill="#4d6465"/></g><g class="as-rotor" style="transform-origin:64px 19px"><path d="M50 19 Q56 14 64 19 Q56 22 50 19Z" fill="#f6ffff"/><path d="M64 19 Q71 16 78 19 Q71 24 64 19Z" fill="#8da8aa"/><circle cx="64" cy="19" r="2" fill="#4d6465"/></g><g class="as-rotor" style="transform-origin:16px 58px"><path d="M2 58 Q8 53 16 58 Q8 61 2 58Z" fill="#f6ffff"/><path d="M16 58 Q23 55 30 58 Q23 63 16 58Z" fill="#8da8aa"/><circle cx="16" cy="58" r="2" fill="#4d6465"/></g><g class="as-rotor" style="transform-origin:64px 58px"><path d="M50 58 Q56 53 64 58 Q56 61 50 58Z" fill="#f6ffff"/><path d="M64 58 Q71 55 78 58 Q71 63 64 58Z" fill="#8da8aa"/><circle cx="64" cy="58" r="2" fill="#4d6465"/></g></g><path d="M28 29Q40 24 52 29L56 45Q52 52 40 53Q28 52 24 45Z" fill="url(#asBody)" stroke="#637777" stroke-width="1.5"/><path d="M30 33Q40 30 50 33L48 39H32Z" fill="#f8faf7" opacity=".9"/><rect x="33" y="46" width="14" height="12" rx="5" fill="#313c3e" stroke="#b6c2c0" stroke-width="1.5"/><circle cx="40" cy="52" r="5" fill="#0c171a" stroke="#859d9f" stroke-width="1.3"/><circle cx="40" cy="52" r="2.4" fill="#527a89"/><g><circle cx="15" cy="19" r="6" fill="#3dff83" opacity=".45" filter="url(#asGlow)"><animate attributeName="fill" values="#3dff83;#ff4545;#3dff83" keyTimes="0;.5;1" calcMode="discrete" dur="2s" repeatCount="indefinite"/></circle><circle cx="15" cy="19" r="3.2" fill="#3dff83"><animate attributeName="fill" values="#3dff83;#ff4545;#3dff83" keyTimes="0;.5;1" calcMode="discrete" dur="2s" repeatCount="indefinite"/></circle><circle cx="65" cy="19" r="6" fill="#3dff83" opacity=".45" filter="url(#asGlow)"><animate attributeName="fill" values="#3dff83;#ff4545;#3dff83" keyTimes="0;.5;1" calcMode="discrete" dur="2s" repeatCount="indefinite"/></circle><circle cx="65" cy="19" r="3.2" fill="#3dff83"><animate attributeName="fill" values="#3dff83;#ff4545;#3dff83" keyTimes="0;.5;1" calcMode="discrete" dur="2s" repeatCount="indefinite"/></circle><circle cx="15" cy="63" r="6" fill="#ff4545" opacity=".45" filter="url(#asGlow)"><animate attributeName="fill" values="#ff4545;#3dff83;#ff4545" keyTimes="0;.5;1" calcMode="discrete" dur="2s" repeatCount="indefinite"/></circle><circle cx="15" cy="63" r="3.2" fill="#ff4545"><animate attributeName="fill" values="#ff4545;#3dff83;#ff4545" keyTimes="0;.5;1" calcMode="discrete" dur="2s" repeatCount="indefinite"/></circle><circle cx="65" cy="63" r="6" fill="#ff4545" opacity=".45" filter="url(#asGlow)"><animate attributeName="fill" values="#ff4545;#3dff83;#ff4545" keyTimes="0;.5;1" calcMode="discrete" dur="2s" repeatCount="indefinite"/></circle><circle cx="65" cy="63" r="3.2" fill="#ff4545"><animate attributeName="fill" values="#ff4545;#3dff83;#ff4545" keyTimes="0;.5;1" calcMode="discrete" dur="2s" repeatCount="indefinite"/></circle></g></svg>';
    // Safari/iOS fallback: CSS animations for propellers and LEDs (SMIL can freeze).
    var style=document.createElement('style');
    style.textContent='#aeroscape-drone-live .as-rotor{animation:as-ios-spin .24s linear infinite;transform-box:view-box}#aeroscape-drone-live .as-led-front{animation:as-ios-front 2s steps(1,end) infinite}#aeroscape-drone-live .as-led-rear{animation:as-ios-rear 2s steps(1,end) infinite}@keyframes as-ios-spin{to{transform:rotate(360deg)}}@keyframes as-ios-front{0%,49%{fill:#3dff83}50%,100%{fill:#ff4545}}@keyframes as-ios-rear{0%,49%{fill:#ff4545}50%,100%{fill:#3dff83}}@media(prefers-reduced-motion:reduce){#aeroscape-drone-live .as-rotor,#aeroscape-drone-live .as-led-front,#aeroscape-drone-live .as-led-rear{animation:none!important}}';
    document.head.appendChild(style);
    d.querySelectorAll('circle[fill="#3dff83"]').forEach(function(el){el.classList.add('as-led-front');});
    d.querySelectorAll('circle[fill="#ff4545"]').forEach(function(el){el.classList.add('as-led-rear');});
    document.body.appendChild(d);
    function openInstagram(){window.open('https://www.instagram.com/aeroscape_43/','_blank','noopener,noreferrer');}
    d.addEventListener('click',openInstagram);
    d.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openInstagram();}});
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