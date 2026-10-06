const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const base=process.argv[2]||path.join(__dirname,'episod-1'),ctx={window:{}};vm.createContext(ctx);
for(const f of ['cerita.js','narasi.js'])vm.runInContext(fs.readFileSync(path.join(base,f),'utf8'),ctx);
const K=ctx.window.KARNIVAL,N=ctx.window.KARNIVAL_NARASI,seen=new Set();let paths=0,cues=0;
function walk(s){if(s.node==='tamat'){paths++;return;}const a=K.adegan[s.node];a.baris(s).forEach((l,i)=>{const c=N.cue({...s,baris:i},l);if(l.nama==='Pencerita'){assert(c,'Missing narrator shot '+s.node+':'+i);assert(fs.existsSync(path.join(base,c.gambar)),'Missing image '+c.gambar);if(c.susulan)assert(fs.existsSync(path.join(base,c.susulan.gambar)));seen.add(c.id);cues++;}else assert.strictEqual(c,null,'Cutaway over player/NPC');});if(a.pilihan)for(const p of a.pilihan(s)){const next=JSON.parse(JSON.stringify(s));K.tindakan(next,p.id);next.node=p.lanjut;walk(next);}else{s.node=a.lanjut;walk(s);}}
walk(K.awal());assert.strictEqual(paths,324);
assert.strictEqual(N.cue({...K.awal(),node:'sepakat',baris:3,pelan:'sandwic'},{nama:'Pencerita'}).gerak,'bulat');
assert.strictEqual(N.cue({...K.awal(),node:'sepakat',baris:3,pelan:'air'},{nama:'Pencerita'}).id,'cawan');
console.log('PASS: '+paths+' paths; '+cues+' narrator appearances; '+seen.size+' matched shots; no cutaway on player/NPC turns.');
