(function () {
  'use strict';
  var pentas = document.getElementById('ilustrasi'), novel = document.getElementById('novel');
  var ns = 'http://www.w3.org/2000/svg', scene = '', actors = {}, emosiKini = {}, masa = null, cerita = null, penutur = 'Pencerita', giliranPlayer = false;
  // Koordinat relatif pentas 1672 × 941. Setiap bingkai sprite ialah sel 512 × 512.
  var susun = {
    kelas: { atlas:[0,0,836,500], depan:.76, mira:[140,65,660], hakim:[760,-5,720], bibir:{mira:[.60,.42,.09,.06],hakim:[.35,.44,.10,.055]} },
    persediaan: { atlas:[836,0,836,500], depan:.79, mira:[180,85,660], hakim:[800,-5,710], bibir:{mira:[.63,.425,.075,.06],hakim:[.43,.435,.065,.06]} },
    hujan: { atlas:[0,500,836,441], depan:.84, mira:[150,65,720], hakim:[730,-25,790], bibir:{mira:[.64,.363,.075,.063],hakim:[.235,.35,.065,.065]} },
    senja: { atlas:[836,500,836,441], depan:.79, mira:[190,90,690], hakim:[760,45,700], bibir:{mira:[.63,.415,.09,.065],hakim:[.40,.425,.095,.065]} }
  };
  function fondo(c, depan) {
    var svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',c.atlas.join(' '));svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('class',depan?'depan':'fondo');
    var im=document.createElementNS(ns,'image');im.setAttribute('href','assets/scene-lapisan.png');im.setAttribute('width','1672');im.setAttribute('height','941');svg.appendChild(im);
    if(depan)svg.style.clipPath='inset('+(c.depan*100)+'% 0 0 0)';return svg;
  }
  function bina(n) {
    scene=n;pentas.dataset.scene=n;pentas.replaceChildren();actors={};var c=susun[n];pentas.appendChild(fondo(c,false));
    ['mira','hakim'].forEach(function(nama,i){
      var a=document.createElement('div');a.className='pelakon '+nama;a.dataset.watak=nama;var r=c[nama];
      a.style.left=(r[0]/1672*100)+'%';a.style.top=(r[1]/941*100)+'%';a.style.width=(r[2]/1672*100)+'%';a.style.height=(r[2]/941*100)+'%';a.style.setProperty('--kolum',i?'100%':'0%');
      var g=document.createElement('div');g.className='gerak-aksi';var p=document.createElement('div');p.className='pose-aksi';var b=document.createElement('div');b.className='mulut-aksi';var pandang=document.createElement('div');pandang.className='pandangan-player';pandang.style.backgroundImage='url("assets/aksi-'+scene+'-player.png")';
      p.style.backgroundImage=b.style.backgroundImage='url("assets/aksi-'+scene+'.png")';var m=c.bibir[nama];b.style.clipPath='ellipse('+(m[2]*50)+'% '+(m[3]*50)+'% at '+((m[0]+m[2]/2)*100)+'% '+((m[1]+m[3]/2)*100)+'%)';
      g.append(p,b,pandang);a.appendChild(g);pentas.appendChild(a);actors[nama]=a;
    });
    pentas.appendChild(fondo(c,true));novel.classList.add('scene-hidup');
  }
  function raut(nama,e) {
    var a=actors[nama],y=e==='ceria'?'0%':e==='fokus'?'50%':'100%';a.dataset.emosi=e;a.style.setProperty('--raut',y);a.style.setProperty('--bibir',e==='fokus'?'0%':'50%');
    if(emosiKini[nama]!==e){a.classList.remove('respon-aksi');void a.offsetWidth;a.classList.add('respon-aksi');}emosiKini[nama]=e;
  }
  function kemas() {
    var moods=window.KARNIVAL_EMOSI.raut(cerita);['mira','hakim'].forEach(function(n){raut(n,moods[n]);actors[n].classList.toggle('cakap',penutur.toLowerCase()===n);});
  }
  function player(v) {giliranPlayer=!!v;novel.classList.toggle('giliran-player',giliranPlayer);if(v)cakap(false);}
  function papar(n,nama,s) {clearTimeout(masa);player(false);if(scene!==n)bina(n);cerita=s;penutur=nama;kemas();}
  function cakap(v) {Object.keys(actors).forEach(function(n){actors[n].classList.toggle('cakap',v&&penutur.toLowerCase()===n);});}
  function respons(nama,objek,teks) {
    clearTimeout(masa);novel.classList.remove('giliran-player');var n=nama.toLowerCase();Object.keys(actors).forEach(function(k){actors[k].classList.remove('cakap','sedia-aksi','kemas-aksi');});
    if(!actors[n])return;raut(n,objek==='bekas'||objek==='hujan'?'risau':objek==='salad'||objek==='kotak'?'ceria':'fokus');actors[n].classList.add('cakap');
    actors[n].classList.remove('respon-aksi');void actors[n].offsetWidth;actors[n].classList.add('respon-aksi');
    if(objek==='salad'||objek==='jug')actors[n].classList.add('sedia-aksi');if(objek==='kotak')actors[n].classList.add('kemas-aksi');
    masa=setTimeout(function(){cakap(false);},Math.min(7000,Math.max(2400,teks.length*35)));
  }
  function kembali() {clearTimeout(masa);Object.keys(actors).forEach(function(n){actors[n].classList.remove('sedia-aksi','kemas-aksi');});kemas();cakap(false);novel.classList.toggle('giliran-player',giliranPlayer);}
  function bingkai(w,h,x,y) {pentas.style.width=w+'px';pentas.style.height=h+'px';pentas.style.left=x+'px';pentas.style.top=y+'px';}
  window.KARNIVAL_ANIMASI={papar:papar,cakap:cakap,respons:respons,kembali:kembali,bingkai:bingkai,player:player};
  ['scene-lapisan.png','aksi-kelas.png','aksi-persediaan.png','aksi-hujan.png','aksi-senja.png','aksi-kelas-player.png','aksi-persediaan-player.png','aksi-hujan-player.png','aksi-senja-player.png'].forEach(function(f){var i=new Image();i.src='assets/'+f;});
})();
