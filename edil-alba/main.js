(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// Menu mobile
const burger=$('.burger'),menu=$('#menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}));
// Animazioni allo scroll
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
$$('.reveal,.tile').forEach(el=>io.observe(el));
// Galleria con lightbox
const lb=$('#lb'),img=$('#lbImg'),cap=$('#lbCap');let last;
function open(t){last=t;img.className='lb-img '+[...t.classList].find(c=>/^t\d$/.test(c));cap.textContent=t.dataset.cap;lb.hidden=false;lb.querySelector('.close').focus()}
function close(){lb.hidden=true;last&&last.focus()}
$$('.tile').forEach(t=>t.addEventListener('click',()=>open(t)));
lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('close'))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)close()});
// Modulo (dimostrativo: nessun invio dati)
const f=$('#quote'),m=$('#formMsg');
f.addEventListener('submit',e=>{
 e.preventDefault();let ok=true;
 [...f.elements].forEach(el=>{if(!el.name)return;const bad=!el.value.trim()||(el.type==='email'&&!/^\S+@\S+\.\S+$/.test(el.value));el.classList.toggle('err',bad);if(bad)ok=false});
 m.textContent=ok?'Modulo compilato correttamente. In questa demo i dati non vengono inviati.':'Controlla i campi evidenziati.';
 if(ok)f.reset();
});
})();
