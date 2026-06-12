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
      <li><a data-page href="dashboard.html">Dashboard</a></li>
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
        <a href="dashboard.html">Dashboard</a>
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
