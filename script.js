const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* nav scroll state */
const nav = document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>40));

/* mobile menu */
const burger=document.getElementById('burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>{burger.classList.toggle('open');menu.classList.toggle('open')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');menu.classList.remove('open')}));

/* cursor glow */
const glow=document.getElementById('glow');
if(!reduce){
  addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';},{passive:true});
}

/* scroll reveal */
const io=new IntersectionObserver((es)=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* accordion + synced image */
const items=[...document.querySelectorAll('.acc-item')];
const imgs=[...document.querySelectorAll('.svc-visual img')];
const caps=['Team Workshops','Conceptual Dinners','Community Collaborations'];
const cap=document.getElementById('svcCap');
items.forEach(item=>{
  item.querySelector('.acc-head').addEventListener('click',()=>{
    const open=item.classList.contains('open');
    items.forEach(i=>{i.classList.remove('open');i.querySelector('.acc-body').style.maxHeight=null});
    if(!open){
      item.classList.add('open');
      const body=item.querySelector('.acc-body');
      body.style.maxHeight=body.scrollHeight+'px';
      const idx=+item.dataset.svc;
      imgs.forEach(im=>im.classList.toggle('active',+im.dataset.svc===idx));
      cap.textContent=caps[idx];
    }
  });
});
/* open first on load */
addEventListener('load',()=>{const b=items[0].querySelector('.acc-body');b.style.maxHeight=b.scrollHeight+'px';});

/* carousels */
function carousel(track,prev,next){
  const t=document.getElementById(track),p=document.getElementById(prev),n=document.getElementById(next);
  const step=()=>t.querySelector('div').getBoundingClientRect().width+26;
  const upd=()=>{p.disabled=t.scrollLeft<8;n.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-8;};
  p.addEventListener('click',()=>t.scrollBy({left:-step(),behavior:'smooth'}));
  n.addEventListener('click',()=>t.scrollBy({left:step(),behavior:'smooth'}));
  t.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
}
carousel('pTrack','pPrev','pNext');
carousel('qTrack','qPrev','qNext');
