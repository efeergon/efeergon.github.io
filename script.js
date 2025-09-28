const progress=document.getElementById('progress');
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const scrolled=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  if (progress) progress.style.width=scrolled+"%";
});

const nav=document.getElementById('nav');
const onScroll=()=>{ if (window.scrollY>10) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); };
window.addEventListener('scroll',onScroll); onScroll();

const root=document.documentElement, tBtn=document.getElementById('themeToggle'), tIcon=document.getElementById('themeIcon');
const stored=localStorage.getItem('efe-theme'), prefersLight=matchMedia('(prefers-color-scheme: light)').matches;
if(stored==='light'||(!stored&&prefersLight)){root.classList.add('light'); tIcon.textContent='☀️';} else {root.classList.remove('light'); tIcon.textContent='🌙';}
tBtn.addEventListener('click',()=>{root.classList.toggle('light'); const l=root.classList.contains('light'); localStorage.setItem('efe-theme',l?'light':'dark'); tIcon.textContent=l?'☀️':'🌙';});

const burger=document.getElementById('hamburger'), panel=document.getElementById('mobilePanel');
burger.addEventListener('click',()=>{const open=panel.classList.toggle('open'); burger.setAttribute('aria-expanded',String(open)); panel.setAttribute('aria-hidden',String(!open));});
panel.addEventListener('click',e=>{if(e.target.tagName==='A'){panel.classList.remove('open'); burger.setAttribute('aria-expanded','false'); panel.setAttribute('aria-hidden','true');}});

function bindSmoothAnchors(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.onclick = (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior:'smooth' });
        panel?.classList.remove('open');
        burger?.setAttribute('aria-expanded','false');
        panel?.setAttribute('aria-hidden','true');
      }
    };
  });
}
bindSmoothAnchors();

document.querySelectorAll('.headline .shine').forEach(el=>{
  el.addEventListener('animationend', ()=> el.remove());
});

let lastReplayAt = 0;
function restartHeroAnimations(){
  const parts = ['.headline', '.eyebrow', '.quote', '.scroll-arrow'];
  parts.forEach(sel=>{
    const el = document.querySelector(sel); if(!el) return;
    const clone = el.cloneNode(true);
    if(sel === '.headline' && !clone.querySelector('.shine')){
      const shine = document.createElement('span'); shine.className = 'shine'; clone.appendChild(shine);
    }
    el.replaceWith(clone);
  });
  document.querySelectorAll('.headline .shine').forEach(el=>{
    el.addEventListener('animationend', ()=> el.remove());
  });
  bindSmoothAnchors();
}
function safeReplay(){ const now = performance.now(); if (now - lastReplayAt < 1200) return; lastReplayAt = now; restartHeroAnimations(); }
const brand = document.querySelector('.brand');
if(brand){
  brand.addEventListener('click', (e)=>{
    const hero = document.getElementById('top'); if(!hero) return;
    e.preventDefault();
    const nearTop = Math.abs((window.scrollY || 0) - (hero.offsetTop || 0)) < 6;
    if (nearTop) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      panel?.classList.remove('open'); burger?.setAttribute('aria-expanded','false'); panel?.setAttribute('aria-hidden','true');
      return;
    }
    let done = false;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(!done && entry.isIntersecting && entry.intersectionRatio >= 0.9){
          done = true; io.disconnect(); safeReplay();
        }
      });
    }, { threshold:[0.9] });
    io.observe(hero);
    hero.scrollIntoView({ behavior:'smooth', block:'start' });
    panel?.classList.remove('open'); burger?.setAttribute('aria-expanded','false
