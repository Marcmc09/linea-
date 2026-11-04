const dialog = document.querySelector('#detail');
const body = document.querySelector('#detail-body');
const scroller = document.querySelector('.timeline-scroll');
let opener;
function el(tag, text, cls) {const e = document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;}
function openDetail(key, trigger) {
 opener=trigger;body.replaceChildren();
 if(key==='fonts') {
  body.append(el('p','CRÈDITS','eyebrow'),el('h2','Fonts i imatges','modal-title'));
  body.lastChild.id='detail-title';
  body.append(el('p','Continguts adaptats del resum de classe «El Modernisme», amb les idees essencials.','lead'));
  const p=el('p','Retrats procedents de Wikimedia Commons, consultables des de les fitxes de Viquipèdia.','small');body.append(p);
  [['Santiago Rusiñol','Santiago_Rusiñol_i_Prats'],['Víctor Català','Víctor_Català'],['Joan Maragall','Joan_Maragall_i_Gorina']].forEach(([name,path])=>{const a=el('a',name+' ↗','source');a.href='https://ca.wikipedia.org/wiki/'+encodeURIComponent(path);a.target='_blank';a.rel='noopener';body.append(a);});
  body.append(el('p','Les targetes agrupen els autors dins del moviment; la seva posició no indica una data concreta.','small'));
 } else {
  const f=fitxes[key];const head=el('div',null,'modal-head');
  if(f.image){const img=el('img');img.src=f.image;img.alt='Retrat de '+f.title;head.append(img);}
  const heading=el('div');heading.append(el('p',f.label,'eyebrow'));const title=el('h2',f.title,'modal-title');title.id='detail-title';heading.append(title);head.append(heading);body.append(head,el('p',f.intro,'lead'));
  const list=el('ul',null,'keypoints');f.points.forEach(p=>list.append(el('li',p)));body.append(list);
  if(f.currents){const row=el('div',null,'currents');f.currents.forEach(([a,b])=>{const card=el('div');card.append(el('h3',a),el('p',b));row.append(card);});body.append(row);}
  if(f.stages){const row=el('div',null,'stages');f.stages.forEach(([a,b])=>{const cell=el('div');cell.append(el('strong',a),el('span',b));row.append(cell);});body.append(row);}
  if(f.works){body.append(el('p','DUES OBRES PER RECORDAR','eyebrow works-label'));f.works.forEach(([a,b])=>{const work=el('div',null,'work');work.append(el('h3',a),el('p',b));body.append(work);});}
  if(f.note)body.append(el('p',f.note,'small'));
 }
 dialog.showModal();document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.open,b)));
function closeDetail(){dialog.close();}
document.querySelector('#close').addEventListener('click',closeDetail);
document.querySelector('#back').addEventListener('click',closeDetail);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDetail();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus();});
const prev=document.querySelector('#prev'),next=document.querySelector('#next');
function nav(){prev.disabled=scroller.scrollLeft<2;next.disabled=scroller.scrollLeft+scroller.clientWidth>=scroller.scrollWidth-2;}
prev.onclick=()=>scroller.scrollBy({left:-450,behavior:'smooth'});next.onclick=()=>scroller.scrollBy({left:450,behavior:'smooth'});
scroller.addEventListener('scroll',nav);window.addEventListener('resize',nav);nav();
