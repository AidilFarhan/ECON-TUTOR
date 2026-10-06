const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const root=process.argv[2]?path.resolve(process.argv[2]):path.join(__dirname,'episod-1');
const audio=[],events={},storage={};let tick;
class Element{constructor(tag){this.tagName=tag;this.dataset={};this.children=[];this.hidden=false;}appendChild(e){this.children.push(e);return e;}append(...es){es.forEach(e=>this.appendChild(e));}setAttribute(k,v){this[k]=v;}remove(){this.removed=true;}closest(){return this;}}
class Sound extends Element{constructor(src){super('audio');this.src=src;this.paused=true;this.volume=0;audio.push(this);}play(){this.paused=false;return Promise.resolve();}pause(){this.paused=true;}}
const novel=new Element('main'),doc={hidden:false,getElementById:id=>id==='novel'?novel:{hidden:false},createElement:t=>new Element(t),addEventListener:(name,cb)=>events[name]=cb};
const window={addEventListener:(name,cb)=>events[name]=cb};
const ctx={window,document:doc,Audio:Sound,localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},Number,Math,Date,setInterval:cb=>tick=cb,setTimeout:()=>0};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'bunyi.js'),'utf8'),ctx);
const B=window.KARNIVAL_BUNYI,button=new Element('button');
assert.equal(audio.length,0,'No audio before gesture');events.click({target:button});
for(let i=0;i<50;i++)tick();assert(audio.some(a=>a.src.endsWith('bgm-kelas.mp3')&&!a.paused&&a.volume>0));
B.scene('persediaan',{});for(let i=0;i<50;i++)tick();assert(audio.find(a=>a.src.endsWith('bgm-kelas.mp3')).paused);assert(audio.some(a=>a.src.endsWith('bgm-dapur.mp3')&&!a.paused));assert(audio.some(a=>a.src.endsWith('potong.mp3')&&!a.paused));
B.cash(-25);assert.equal(audio.at(-1).dataset.bunyi,'cash-keluar');B.cash(144);assert.equal(audio.at(-1).dataset.bunyi,'cash-masuk');let count=audio.length;B.cash(0);assert.equal(audio.length,count);
B.scene('hujan',{tempat:''});for(let i=0;i<50;i++)tick();assert.equal(novel.dataset.suasanaBunyi,'hujan');assert(audio.some(a=>a.src.endsWith('hujan.mp3')&&!a.paused));
B.scene('hujan',{tempat:'dewan'});assert.equal(novel.dataset.suasanaBunyi,'festival');for(let i=0;i<50;i++)tick();assert(audio.some(a=>a.src.endsWith('bgm-festival.mp3')&&!a.paused));
doc.hidden=true;events.visibilitychange();assert(audio.filter(a=>!a.removed).every(a=>a.paused),'Background tab pauses all sounds');doc.hidden=false;events.visibilitychange();assert(audio.some(a=>!a.removed&&!a.paused));
const panel=B.panel(),toggle=panel.children[1];toggle.onclick();for(let i=0;i<5;i++)tick();assert(audio.filter(a=>!a.removed).every(a=>a.paused&&a.volume===0),'Mute pauses and silences loops');assert.equal(JSON.parse(storage['econ-vn-audio:v1']).muted,true);toggle.onclick();for(let i=0;i<50;i++)tick();
const musicRange=panel.children[2].children[1];musicRange.value='0';musicRange.oninput();for(let i=0;i<50;i++)tick();assert(audio.filter(a=>!a.removed&&a.dataset.bunyi.startsWith('bgm')).every(a=>a.volume===0),'Zero music slider silences music');
B.scene('senja',{});assert.equal(novel.dataset.suasanaBunyi,'senja');
for(const f of fs.readdirSync(path.join(root,'assets/audio'))){assert(f.endsWith('.mp3'));assert(fs.statSync(path.join(root,'assets/audio',f)).size>1000);}
assert.equal(fs.readdirSync(path.join(root,'assets/audio')).length,14);console.log('PASS: gesture start, five sound profiles, crossfade cleanup, cash directions, mute, stored settings, zero volume, background pause/resume and 14 audio assets.');
