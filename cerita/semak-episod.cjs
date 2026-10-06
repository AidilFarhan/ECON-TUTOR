const path = require('path');
const akarEpisod = path.join(__dirname, 'episod-1');
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(akarEpisod+'/cerita.js','utf8'),ctx);vm.runInContext(fs.readFileSync(akarEpisod+'/emosi.js','utf8'),ctx);const K=ctx.window.KARNIVAL;
let laluan=0,dialog=0;const endings=new Set(),dana=new Set();
function jalan(s,kedalaman=0){assert(kedalaman<35,'Cerita berulang tanpa tamat');assert(s.wang>=0,'Wang negatif');assert.strictEqual(s.wang,100+s.hasil-s.kos,'Lejar tidak seimbang');const k=K.kewangan(s);assert.strictEqual(k.aset,k.liabiliti+k.ekuiti,'PKK tidak seimbang');assert.strictEqual(k.tunai,100-s.kos+k.hasil);assert(k.air>=0&&k.sandwic>=0);if(s.node==='jualan'){assert.strictEqual(k.hasil,0,'Hasil diumumkan sebelum kiraan petang');assert.strictEqual(k.tunai,s.wang-s.hasil);}if(k.selesai)assert.strictEqual(k.tunai,s.wang);
if(s.node==='tamat'){laluan++;endings.add(K.ending(s).id);dana.add(s.wang);assert(s.jualAir+s.bantuanAir<=s.air);assert(s.jualSandwic+s.bantuanSandwic<=s.sandwic);assert.strictEqual(s.sejarah.length,6);return;}
const a=K.adegan[s.node];assert(a,'Scene hilang: '+s.node);assert(['kelas','persediaan','hujan','senja'].includes(a.seni));assert(fs.existsSync(akarEpisod+'/assets/'+a.seni+'.png'),'Ilustrasi scene hilang');const lines=a.baris(s);assert(lines.length);for(const l of lines){assert(l.nama&&l.teks);assert(!/undefined|NaN/.test(l.teks));dialog++;}
if(a.pilihan){const opts=a.pilihan(s);assert(opts.length>=2);assert(new Set(opts.map(p=>p.id)).size===opts.length,'Duplicate choices');for(const p of opts){const n=JSON.parse(JSON.stringify(s));K.tindakan(n,p.id);n.sejarah.push(p);n.node=p.lanjut;jalan(n,kedalaman+1);}}
else{s.node=a.lanjut;jalan(s,kedalaman+1);}}
jalan(K.awal());assert.strictEqual(laluan,324);assert.strictEqual(endings.size,4);assert(dana.size>10);
for(const nama of ['cerita.js','scene.js','main.js','animasi.js','emosi.js'])new vm.Script(fs.readFileSync(akarEpisod+'/'+nama,'utf8'));
for(const n of ['kelas','persediaan','hujan','senja'])assert(fs.existsSync(akarEpisod+'/assets/aksi-'+n+'.png'));
for(const [n,a] of Object.entries(K.adegan)){const s=K.awal();s.node=n;for(let b=0;b<a.baris(s).length;b++){s.baris=b;for(const e of Object.values(ctx.window.KARNIVAL_EMOSI.raut(s)))assert(['ceria','fokus','risau'].includes(e));}}
console.log('PASS: '+laluan+' complete story paths; all 4 endings reachable; '+dana.size+' different cash outcomes; cash, inventory, dialogue and 4 scene illustrations verified.');

