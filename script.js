// Basit scroll reveal
const faders = document.querySelectorAll('.fade-in, .fade-in-delay');
const options = {threshold:0.3};
const observer = new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('show'); obs.unobserve(entry.target);}
  });
}, options);
faders.forEach(el=>observer.observe(el));
