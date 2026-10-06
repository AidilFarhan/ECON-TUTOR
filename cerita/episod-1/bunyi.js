(function () {
  'use strict';
  var novel=document.getElementById('novel'), key='econ-vn-audio:v1';
  var settings={muted:false,muzik:28,suasana:34,kesan:55};
  try { var old=JSON.parse(localStorage.getItem(key));if(old){settings.muted=old.muted===true;['muzik','suasana','kesan'].forEach(function(k){if(Number.isFinite(old[k]))settings[k]=Math.max(0,Math.min(100,old[k]));});} } catch(e) {}
  var started=false, hidden=document.hidden, active={}, oneShots=[], target='kelas', scene='kelas', state=null, typing=false, nextEvent=0, lastClick=0;
  var profiles={
    kelas:{music:'bgm-kelas',ambient:[['kelas',.56]],event:null},
    persediaan:{music:'bgm-dapur',ambient:[['potong',.63]],event:'blender'},
    hujan:{music:'bgm-hujan',ambient:[['hujan',.73],['crowd',.13]],event:'guruh'},
    festival:{music:'bgm-festival',ambient:[['hujan',.29],['crowd',.55]],event:'guruh'},
    senja:{music:'bgm-senja',ambient:[['crowd',.35]],event:null}
  };
  function element(name,loop){var a=new Audio('assets/audio/'+name+'.mp3');a.preload='auto';a.loop=!!loop;a.volume=0;a.dataset.bunyi=name;a.dataset.kategori=loop?'lapisan':'kesan';novel.appendChild(a);return a;}
  function volume(category,weight){return !started||settings.muted||hidden?0:settings[category]/100*weight*(typing&&category!=='kesan'?.72:1);}
  function remember(){try{localStorage.setItem(key,JSON.stringify(settings));}catch(e){}}
  function play(a){var p=a.play();if(p&&p.catch)p.catch(function(){a.dataset.tertahan='true';});}
  function sync(){
    if(!started)return;
    var p=profiles[target], wanted={};wanted[p.music]={category:'muzik',weight:.65};
    p.ambient.forEach(function(a){wanted[a[0]]={category:'suasana',weight:a[1]};});
    Object.keys(active).forEach(function(n){active[n].weight=0;});
    Object.keys(wanted).forEach(function(n){
      if(!active[n]){var a=element(n,true);active[n]={a:a,category:wanted[n].category,weight:0};}
      active[n].category=wanted[n].category;active[n].weight=wanted[n].weight;
      if(!hidden&&!settings.muted&&settings[active[n].category]>0)play(active[n].a);
    });
    novel.dataset.suasanaBunyi=target;
  }
  function start(){if(!started){started=true;nextEvent=Date.now()+8000;sync();}else sync();}
  function stopShots(ambientOnly){oneShots=oneShots.filter(function(a){if(ambientOnly&&a.dataset.kategori==='kesan')return true;a.pause();a.remove();return false;});}
  function effect(name,weight){
    if(!started||settings.muted||hidden)return;
    var category=name==='guruh'||name==='blender'?'suasana':'kesan';
    if(!settings[category])return;
    var a=element(name,false);a.dataset.kategori=category;a.volume=volume(category,weight||.7);oneShots.push(a);
    a.onended=function(){a.remove();oneShots=oneShots.filter(function(v){return v!==a;});};
    a.onerror=a.onended;play(a);
    // Paused, blocked or interrupted one-shots also have a bounded lifetime.
    setTimeout(function(){a.pause();a.onended();},9000);
  }
  function context(n,s){
    scene=n;state=s;var next=n;
    if(n==='hujan'&&s&&s.tempat&&s.tempat!=='luar')next='festival';
    if(n==='senja'&&s&&!s.jujur)next='senja';
    if(target!==next){target=next;nextEvent=Date.now()+8000;stopShots(true);sync();}
  }
  function cash(amount){if(amount)effect(amount<0?'cash-keluar':'cash-masuk',.8);}
  function duck(v){typing=!!v;}
  function panel(){
    var box=document.createElement('fieldset');box.className='kawalan-bunyi';
    var legend=document.createElement('legend');legend.textContent='Bunyi & muzik';box.appendChild(legend);
    var toggle=document.createElement('button');toggle.type='button';
    function status(){toggle.textContent=settings.muted?'Hidupkan bunyi':'Senyapkan semua bunyi';toggle.setAttribute('aria-pressed',String(settings.muted));}
    status();toggle.dataset.kawalanBunyi='true';toggle.onclick=function(){settings.muted=!settings.muted;remember();status();if(settings.muted){stopShots();Object.keys(active).forEach(function(n){active[n].a.volume=0;active[n].a.pause();});}else start();};box.appendChild(toggle);
    [['muzik','Muzik latar (BGM)'],['suasana','Suasana scene'],['kesan','Kesan butang & duit']].forEach(function(item){
      var label=document.createElement('label'),id='volume-'+item[0],name=document.createElement('span'),range=document.createElement('input'),value=document.createElement('output');
      label.htmlFor=id;name.textContent=item[1];range.id=id;range.type='range';range.min='0';range.max='100';range.step='1';range.value=settings[item[0]];range.setAttribute('aria-label',item[1]);value.htmlFor=id;value.textContent=range.value+'%';
      range.oninput=function(){settings[item[0]]=Number(this.value);value.textContent=this.value+'%';remember();start();oneShots.forEach(function(a){if(a.dataset.kategori===item[0])a.volume=volume(item[0],.7);});};label.append(name,range,value);box.appendChild(label);
    });
    var note=document.createElement('p');note.textContent='Bunyi ikut tempat cerita. Tetapan volume disimpan pada browser ini.';box.appendChild(note);return box;
  }
  // Trusted interaction unlocks playback; nothing sounds on initial page load.
  document.addEventListener('click',function(e){
    var button=e.target.closest('button');if(!button||button.disabled)return;
    if(button.dataset.kawalanBunyi)return;
    start();var now=Date.now();if(now-lastClick>80){effect('titis',.58);lastClick=now;}
  },true);
  document.addEventListener('keydown',function(e){
    if(e.repeat||e.target.closest('input,textarea'))return;
    if((e.code==='Space'||e.key==='Enter'||e.key==='ArrowRight')&&!e.target.closest('button,a')){start();if(!document.getElementById('mainan').hidden)effect('titis',.5);}
  },true);
  document.addEventListener('visibilitychange',function(){hidden=document.hidden;stopShots();if(hidden){Object.keys(active).forEach(function(n){active[n].a.pause();});}else{nextEvent=Date.now()+8000;sync();}});
  window.addEventListener('pagehide',function(){hidden=true;stopShots();Object.keys(active).forEach(function(n){active[n].a.pause();});});
  window.addEventListener('pageshow',function(){hidden=document.hidden;sync();});
  setInterval(function(){
    Object.keys(active).forEach(function(n){var layer=active[n],to=volume(layer.category,layer.weight);var v=layer.a.volume+(to-layer.a.volume)*.15;layer.a.volume=Math.abs(v-to)<.0008?to:Math.max(0,Math.min(1,v));if(!layer.weight&&layer.a.volume<.001){layer.a.pause();layer.a.remove();delete active[n];}});
    var p=profiles[target];if(!started||settings.muted||hidden||!settings.suasana||Date.now()<nextEvent||!p.event)return;
    effect(p.event,p.event==='blender'?.33:target==='festival'?.18:.42);nextEvent=Date.now()+(p.event==='blender'?18000:24000)+Math.random()*9000;
  },100);
  window.KARNIVAL_BUNYI={scene:context,cash:cash,typing:duck,panel:panel,objek:function(id){if(id==='jug')effect('blender',.3);if(id==='salad')effect('potong',.4);}};
})();
