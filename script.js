(() => {
const c = window.KEEPBOOK;
if (!c) {
  document.body.innerHTML = '<main style="padding:2rem;font-family:serif">Missing content.js. Please restore the Master Publishing Template files.</main>';
  throw new Error('KEEPBOOK content object is missing');
}
document.title = c.browserTitle || `Before the Vow, There Was You — ${c.recipient}`;
const description = document.querySelector('meta[name="description"]');
if (description) description.setAttribute('content', c.browserDescription || `A mobile-first digital literary keepsake written for ${c.recipient}.`);
const seal = (className) => `<img class="official-seal ${className}" src="${c.sealPath}" alt="${c.sealAlt}">`;
const pages = [
  `<div class="center"><div class="page-kicker">This keepsake belongs to</div><div class="script-name">${c.recipient}</div><div class="small-note">${c.bookplateNote}</div></div>`,
  `<div class="center title-page"><div class="page-kicker">Title Page</div><h1>Before the Vow,<br>There Was You</h1><p>The chapters we wrote together.</p><p style="margin-top:28px">${c.titlePageNote}</p>${seal('title-seal')}</div>`,
  `<div class="center"><div class="page-kicker">${c.openingKicker}</div><p class="quote" style="font-size:27px">${c.openingQuote}</p></div>`,
  `<div class="center dedication">${c.dedication}</div>`,
  ...c.introPages,
  `<div class="center letter-title"><h2>${c.letterTitle}</h2><div class="page-kicker">${c.letterKicker}</div></div>`,
  ...c.letterPages,
  `<div class="center gratitude"><p>Every bride walks toward<br>the love of her life.</p></div>`,
  `<div class="center gratitude"><p>But she gets there because<br>incredible women walked beside her first.</p><p class="accent">Thank you for being one of mine.</p></div>`,
  `<div class="center"><div class="proposal-intro">${c.proposalIntro}</div><div class="proposal-name">${c.recipient},</div><div class="proposal-question">${c.proposalQuestion}</div></div>`,
  c.answerPage,
  `<div class="center acceptance-page"><button class="accept-button" id="acceptButton">${c.acceptanceText}</button><div class="grateful-message" id="gratefulMessage"><h2>Thank you</h2><p><strong>${c.gratitudeLead}</strong></p><p>${c.gratitudeBody}</p></div></div>`,
  `<div class="details"><div class="page-kicker" style="text-align:center">The Wedding of</div><h2>${c.wedding.couple}</h2><dl><div><dt>Date</dt><dd>${c.wedding.date}</dd></div><div><dt>Ceremony</dt><dd>${c.wedding.ceremony}</dd></div><div><dt>Reception</dt><dd>${c.wedding.reception}</dd></div></dl></div>`,
  `<div class="center attire"><div class="page-kicker">Attire Guide</div><h2>${c.attire.title}</h2>${c.attire.paragraphs.map(p=>`<p>${p}</p>`).join('')}</div>`,
  `<div class="center quote">${c.closingQuote1}</div>`,
  `<div class="center quote">${c.closingQuote2}</div>`,
  `<div class="center altar"><h2>${c.altarHeading}</h2><p>${c.altarSignoff}</p></div>`,
  `<div class="photo-page"><img src="${c.engagementPhotoPath}" alt="${c.engagementPhotoAlt}"></div>`,
  `<div class="center colophon"><h2>BEFORE THE VOW, THERE WAS YOU</h2><p><em>was lovingly written</em></p><p style="font-size:11px;letter-spacing:.16em;text-transform:uppercase">for</p><div class="name">${c.colophonName}</div><p><em>${c.colophonText}</em></p><p class="edition">${c.edition}</p>${seal('colophon-seal')}</div>`
];
const coverSeal = document.getElementById('coverSeal');
if (coverSeal) {
  coverSeal.src = c.sealPath;
  coverSeal.alt = c.sealAlt;
}
const coverWrap=document.getElementById('coverWrap'),reader=document.getElementById('reader'),openButton=document.getElementById('openButton'),pageContent=document.getElementById('pageContent'),progress=document.getElementById('readerProgress'),turnLayer=document.getElementById('turnLayer'),turnFront=turnLayer.querySelector('.turn-front'),turnBack=turnLayer.querySelector('.turn-back');
let index=0,busy=false,opened=false;
function bindAcceptance(){const btn=document.getElementById('acceptButton'),msg=document.getElementById('gratefulMessage');if(btn&&msg)btn.addEventListener('click',e=>{e.stopPropagation();msg.classList.add('show');btn.textContent=c.acceptanceText.replace("'",'’')},{once:true})}
function render(i){pageContent.innerHTML=pages[i];progress.textContent=`${i+1} / ${pages.length}`;bindAcceptance()}
function turn(dir){if(!opened||busy)return;const target=index+dir;if(target<0||target>=pages.length){if(target>=pages.length)closeBook();return}busy=true;if(dir>0){turnFront.innerHTML=`<div class="page-content">${pages[index]}</div>`;turnBack.innerHTML=`<div class="page-content">${pages[target]}</div>`;turnLayer.classList.add('active');pageContent.innerHTML=pages[target];setTimeout(()=>{index=target;turnLayer.classList.remove('active');turnFront.innerHTML='';turnBack.innerHTML='';busy=false;render(index)},1090)}else{reader.style.opacity='.22';setTimeout(()=>{index=target;render(index);reader.style.opacity='1';busy=false},220)}}
function closeBook(){busy=true;reader.classList.remove('visible');setTimeout(()=>{reader.hidden=true;coverWrap.hidden=false;coverWrap.classList.remove('opening');opened=false;busy=false;index=0;render(0)},700)}
openButton.addEventListener('click',()=>{if(opened)return;opened=true;coverWrap.classList.add('opening');setTimeout(()=>{coverWrap.hidden=true;reader.hidden=false;render(0);requestAnimationFrame(()=>reader.classList.add('visible'))},760)});
reader.addEventListener('click',e=>{if(e.target.closest('button'))return;const r=reader.getBoundingClientRect();turn(e.clientX>r.left+r.width*.48?1:-1)});
let startX=null;reader.addEventListener('pointerdown',e=>startX=e.clientX);reader.addEventListener('pointerup',e=>{if(startX===null)return;const dx=e.clientX-startX;startX=null;if(Math.abs(dx)>42)turn(dx<0?1:-1)});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key===' ')turn(1);if(e.key==='ArrowLeft')turn(-1)});render(0);
})();
