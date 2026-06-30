// AeroClima · Pulsar — nav + footer compartidos e interacciones
const NAV = `
<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="index.html" aria-label="AeroClima inicio">
      <img src="pulsar-logo.png" alt="">
      <span class="word">Aero<b>Clima</b></span>
    </a>
    <button class="burger" aria-label="Menú"><span></span><span></span><span></span></button>
    <ul class="nav-links">
      <li><a data-page href="index.html">Inicio</a></li>
      <li><a data-page href="producto.html">Producto</a></li>
      <li><a href="demo.html" target="_blank" rel="noopener">Demo</a></li>
      <li><a data-page href="nosotros.html">Nosotros</a></li>
      <li><a class="nav-cta" href="contacto.html">Contacto</a></li>
    </ul>
  </div>
</nav>`;
const FOOTER = `
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-top">
      <div>
        <div class="foot-brand"><img src="pulsar-logo.png" alt="">Aero<b>Clima</b></div>
        <p>Inteligencia conversacional para la meteorología aeronáutica de los aeropuertos regionales de LATAM. Un producto de Pulsar.</p>
      </div>
      <div class="foot-col">
        <h4>Navegación</h4>
        <a href="index.html">Inicio</a>
        <a href="producto.html">Producto</a>
        <a href="demo.html" target="_blank" rel="noopener">Demo</a>
        <a href="nosotros.html">Nosotros</a>
        <a href="contacto.html">Contacto</a>
      </div>
      <div class="foot-col">
        <h4>Pulsar</h4>
        <a href="nosotros.html">Quiénes somos</a>
        <a href="contacto.html">Hablemos</a>
        <span style="display:block;color:#8FA1B3;font-size:14px;padding:5px 0">Buenos Aires, Argentina</span>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© <span data-year>2026</span> Pulsar · AeroClima</span>
      <span>Información meteorológica de carácter complementario · no sustituye fuentes oficiales</span>
    </div>
  </div>
</footer>`;
const navSlot = document.getElementById('nav-slot');
if (navSlot) navSlot.outerHTML = NAV;
const footSlot = document.getElementById('footer-slot');
if (footSlot) footSlot.outerHTML = FOOTER;
const burger = document.querySelector('.burger');
const links = document.querySelector('.nav-links');
if (burger) burger.addEventListener('click', () => links.classList.toggle('open'));
if (links) links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
const here = (location.pathname.split('/').pop() || 'index.html');
document.querySelectorAll('.nav-links a[data-page]').forEach(a => { if (a.getAttribute('href') === here) a.classList.add('active'); });

// ===== Escena animada de fondo en los heroes =====
(function(){
  const heroes = document.querySelectorAll('.hero, .page-hero, .nf');
  if(!heroes.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SKYLINE = `
    <svg class="skyline" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <rect x="0" y="362" width="1440" height="38" fill="rgba(8,20,32,.55)"/>
      <g opacity="0.82">
        <rect x="1188" y="158" width="20" height="210" fill="#0A1825"/>
        <rect x="1168" y="128" width="60" height="42" rx="6" fill="#13314A" stroke="rgba(91,180,242,.4)" stroke-width="1"/>
        <line x1="1198" y1="128" x2="1198" y2="104" stroke="#5BB4F2" stroke-width="2"/>
        <circle cx="1198" cy="100" r="3" fill="#5BB4F2"><animate attributeName="opacity" values="1;.3;1" dur="2.4s" repeatCount="indefinite"/></circle>
      </g>
      <rect x="70" y="306" width="120" height="62" fill="#0A1825" opacity=".65"/>
      <rect x="220" y="324" width="86" height="44" fill="#0A1825" opacity=".55"/>
      <rect x="956" y="316" width="138" height="52" fill="#0A1825" opacity=".6"/>
      <g>
        <circle cx="410" cy="376" r="2.4" fill="#FFD27A"><animate attributeName="opacity" values=".25;1;.25" dur="3s" begin="0s" repeatCount="indefinite"/></circle>
        <circle cx="505" cy="378" r="2.4" fill="#FFD27A"><animate attributeName="opacity" values=".25;1;.25" dur="3s" begin=".4s" repeatCount="indefinite"/></circle>
        <circle cx="600" cy="380" r="2.4" fill="#FFD27A"><animate attributeName="opacity" values=".25;1;.25" dur="3s" begin=".8s" repeatCount="indefinite"/></circle>
        <circle cx="695" cy="382" r="2.4" fill="#FFD27A"><animate attributeName="opacity" values=".25;1;.25" dur="3s" begin="1.2s" repeatCount="indefinite"/></circle>
      </g>
    </svg>`;

  heroes.forEach(hero=>{
    const bg=document.createElement('div');
    bg.className='hero-bg';
    bg.innerHTML='<div class="glow"></div><div class="glow2"></div>'+
      (reduce?'':'<canvas></canvas><div class="scan"></div>')+SKYLINE;
    hero.insertBefore(bg, hero.firstChild);
    if(reduce) return;

    const cv=bg.querySelector('canvas'), ctx=cv.getContext('2d');
    let W,H,DPR=Math.min(window.devicePixelRatio||1,2), raf;
    function resize(){W=bg.clientWidth;H=bg.clientHeight;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0)}
    resize();
    const N=Math.max(24,Math.min(46,Math.round(W/30))),parts=[];
    for(let i=0;i<N;i++)parts.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+.4,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,a:Math.random()*.45+.2});
    function radar(t){
      const cx=W*0.80,cy=H*0.34,R=Math.min(W,H)*0.30;
      ctx.strokeStyle='rgba(91,180,242,.11)';ctx.lineWidth=1;
      for(let k=1;k<=3;k++){ctx.beginPath();ctx.arc(cx,cy,R*k/3,0,Math.PI*2);ctx.stroke();}
      ctx.beginPath();ctx.moveTo(cx-R,cy);ctx.lineTo(cx+R,cy);ctx.moveTo(cx,cy-R);ctx.lineTo(cx,cy+R);ctx.stroke();
      const ang=t*0.0008%(Math.PI*2);
      if(ctx.createConicGradient){const g=ctx.createConicGradient(ang,cx,cy);g.addColorStop(0,'rgba(91,180,242,.30)');g.addColorStop(.12,'rgba(91,180,242,0)');g.addColorStop(1,'rgba(91,180,242,0)');
        ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,R,ang-0.5,ang);ctx.closePath();ctx.fillStyle=g;ctx.fill();}
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(ang)*R,cy+Math.sin(ang)*R);
      ctx.strokeStyle='rgba(120,200,250,.45)';ctx.lineWidth=1.5;ctx.stroke();
    }
    function frame(t){
      ctx.clearRect(0,0,W,H);
      radar(t);
      for(let i=0;i<N;i++){const p=parts[i];p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(150,200,240,'+p.a+')';ctx.fill();
        for(let j=i+1;j<N;j++){const q=parts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);
          if(d<100){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='rgba(91,180,242,'+(.07*(1-d/100))+')';ctx.lineWidth=1;ctx.stroke();}}
      }
      raf=requestAnimationFrame(frame);
    }
    raf=requestAnimationFrame(frame);
    let to;addEventListener('resize',()=>{clearTimeout(to);to=setTimeout(resize,200)});
    // pausar fuera de viewport para ahorrar batería
    new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){if(!raf)raf=requestAnimationFrame(frame);}
      else{cancelAnimationFrame(raf);raf=null;}
    }),{threshold:0}).observe(hero);
  });
})();
