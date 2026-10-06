(function () {
  "use strict";
  var K = window.KARNIVAL, s = null, jam = null, penuh = "", sedang = false, segera = false, kunci = "econ-vn-episod1:v1", seni = "kelas", terkunci = false, jamKesan = null, gerakan = true, jamCakap = null, siapDialog = null, jamPeralihan = null;
  function el(id) { return document.getElementById(id); }
  var tunaiBunyi = null;
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function simpan() { try { localStorage.setItem(kunci, JSON.stringify(s)); } catch (e) {} }
  function baca() { try { var v = JSON.parse(localStorage.getItem(kunci)); if (v && v.versi === 1 && (K.adegan[v.node] || v.node === "tamat") && Number.isInteger(v.baris) && v.baris >= 0 && Array.isArray(v.sejarah) && typeof v.wang === "number" && isFinite(v.wang)) { if (v.node !== "tamat") { v.baris = Math.min(v.baris, K.adegan[v.node].baris(v).length - 1); } return v; } } catch (e) {} return null; }
  function tukarSeni(nama) {
    el("latar").dataset.scene = nama; seni = nama;
    el("cuaca").className = "cuaca " + (nama === "hujan" || nama === "senja" ? nama : "");
    var alt = { kelas: "Mira menunjukkan lakaran booth kepada Hakim yang memegang buku kira-kira.", persediaan: "Mira menyusun salad atas sandwich, Hakim menyemak buku kira-kira, bahan dan jug air di atas meja.", hujan: "Mira dan Hakim cemas di bawah kanopi, Hakim menjaga bekas makanan ketika hujan lebat.", senja: "Mira dan Hakim menyusun bekas makanan ke dalam kotak sambil mengemas booth pada waktu senja." };
    el("latar").setAttribute("aria-label", alt[nama]);
    window.KARNIVAL_BUNYI.scene(nama,s);
  }
  function penutur(nama) {
    el("novel").dataset.penutur = nama;
    window.KARNIVAL_SCENE.papar(seni, nama, s);
  }
  function kemasHud() {
    el("hud").hidden = !s; if (!s) { return; }
    var tunaiKini = K.kewangan(s).tunai;
    if (tunaiBunyi !== null && tunaiKini !== tunaiBunyi) { window.KARNIVAL_BUNYI.cash(tunaiKini - tunaiBunyi); }
    tunaiBunyi = tunaiKini; el("dana").textContent = K.rm(tunaiKini);
    el("langkah").setAttribute("aria-label", s.sejarah.length + " daripada 6 keputusan dibuat");
    Array.prototype.forEach.call(el("langkah").children, function (n, i) { n.classList.toggle("siap", i < s.sejarah.length); });
  }
  function kesanPilihan(sebelum, id) {
    clearTimeout(jamKesan); var beza = s.wang - sebelum;
    var pesanan = {"pelan-air":"Pelan: fokus air", "pelan-sandwic":"Pelan: fokus sandwich", "pelan-bincang":"Pelan: bahagi sumber", kekal:"Kita kekal bawah kanopi", bantuan:"Kita tunggu ruang bantuan", biasa:"Harga biasa dikekalkan", murid:"Harga murid dipilih", kongsi:"Sebahagian stok diasingkan untuk bantuan", jujur:"Kad promosi dibetulkan", palsu:"Kad lama digantung"};
    el("kesan").textContent = s.node === "jualan" ? pesanan[id] : beza ? (beza < 0 ? "Belanja " + K.rm(-beza) : "Hasil jualan " + K.rm(beza)) + " · Baki " + K.rm(s.wang) : pesanan[id] || "Jumlah pengeluaran dipilih";
    el("kesan").hidden = false; jamKesan = setTimeout(function () { el("kesan").hidden = true; }, 3200);
  }
  function selepasDialog() { var f = siapDialog; siapDialog = null; if (f) { f(); } }
  function habisTaip() { if (jam) { clearInterval(jam); jam = null; } clearTimeout(jamCakap); window.KARNIVAL_ANIMASI.cakap(false); window.KARNIVAL_BUNYI.typing(false); sedang = false; el("ayat").textContent = penuh; el("ayat").setAttribute("aria-busy", "false"); selepasDialog(); }
  function taip(teks, selepas) {
    siapDialog = null; habisTaip(); penuh = teks; el("ayat").textContent = teks; siapDialog = selepas;
    window.KARNIVAL_ANIMASI.cakap(true);
    if (segera || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { selepasDialog(); jamCakap=setTimeout(function(){window.KARNIVAL_ANIMASI.cakap(false);},Math.min(6500,Math.max(2000,teks.length*35))); return; }
    el("ayat").setAttribute("aria-busy", "true"); el("ayat").textContent = ""; var i = 0; sedang = true;
    window.KARNIVAL_BUNYI.typing(true);
    jam = setInterval(function () { i += 3; el("ayat").textContent = teks.slice(0, i); if (i >= teks.length) { habisTaip(); } }, 18);
  }
  function papar() {
    terkunci = false; siapDialog = null; habisTaip(); el("pembukaan").hidden = true; el("pengakhiran").hidden = true; el("mainan").hidden = false;
    if (s.node === "tamat") { tamat(); return; }
    var a = K.adegan[s.node], baris = a.baris(s), sceneBaru = a.seni !== seni; tukarSeni(a.seni); penutur(baris[s.baris].nama); kemasHud(); window.KARNIVAL_NARASI.papar(s,baris[s.baris]);
    if (sceneBaru) { clearTimeout(jamPeralihan); el("lokasi-peralihan").textContent = a.lokasi; el("ayat-peralihan").textContent = a.peralihan || "Mereka meneruskan pelan yang sudah dipilih."; el("peralihan").hidden = false; el("novel").classList.remove("menukar-scene"); void el("novel").offsetWidth; el("novel").classList.add("menukar-scene"); jamPeralihan = setTimeout(function(){el("peralihan").hidden=true;el("novel").classList.remove("menukar-scene");},1800); }
    el("lokasi").textContent = "EPISOD 01 · " + a.lokasi; el("masa").textContent = a.lokasi; el("nama").textContent = baris[s.baris].nama;
    el("pilihan").replaceChildren(); el("seterusnya").hidden = false; el("petunjuk").textContent = "Klik atau tekan Space untuk sambung";
    if (baris[s.baris].nama === "Kamu") { window.KARNIVAL_ANIMASI.player(true); el("petunjuk").textContent = "Giliran kamu · Klik atau tekan Space untuk sambung"; }
    var beriPilihan = s.baris === baris.length - 1 && a.pilihan;
    taip(baris[s.baris].teks, beriPilihan ? function () {
      window.KARNIVAL_ANIMASI.player(true); window.KARNIVAL_SCENE.player();
      el("seterusnya").hidden = true; el("petunjuk").textContent = "Giliran kamu · Pilih jawapan";
      var pilihan = a.pilihan(s);
      pilihan.forEach(function (p) {
        var btn = document.createElement("button"); btn.textContent = p.teks; btn.dataset.pilihan = p.id;
        btn.onclick = function () {
          if (terkunci) { return; } terkunci = true; habisTaip();
          el("pilihan").querySelectorAll("button").forEach(function (b) { b.disabled = true; });
          var sebelum = s.wang; s.sejarah.push({ node: s.node, pilihan: p.teks, id: p.id }); K.tindakan(s, p.id); s.node = p.lanjut; s.baris = 0; simpan(); papar(); kesanPilihan(sebelum,p.id); el("seterusnya").focus({ preventScroll: true });
        }; el("pilihan").appendChild(btn);
      });
    } : null);
    simpan();
  }
  function sambung() {
    if (!s || s.node === "tamat" || el("buku").open || window.KARNIVAL_SCENE.menjelajah()) { return; }
    if (!el("peralihan").hidden) { clearTimeout(jamPeralihan); el("peralihan").hidden=true; el("novel").classList.remove("menukar-scene"); }
    if (sedang) { habisTaip(); if (el("seterusnya").hidden) { el("pilihan").querySelector("button").focus(); } return; }
    var a = K.adegan[s.node]; if (s.baris < a.baris(s).length - 1) { s.baris++; }
    else if (a.pilihan) { el("pilihan").querySelector("button").focus(); return; }
    else { s.node = a.lanjut; s.baris = 0; }
    simpan(); papar();
  }
  function mulakan() { tunaiBunyi = null; clearTimeout(jamKesan); clearTimeout(jamPeralihan); el("peralihan").hidden=true; el("kesan").hidden = true; s = K.awal(); simpan(); papar(); el("seterusnya").focus({ preventScroll: true }); }
  el("mula").onclick = mulakan; el("sambung").hidden = !baca(); el("sambung").onclick = function () { s = baca(); if (!s) { mulakan(); } else { papar(); } };
  el("seterusnya").onclick = sambung;
  el("dialog").onclick = function (e) { if (!e.target.closest("button")) { sambung(); } };
  document.addEventListener("keydown", function (e) { if (el("buku").open || e.target.closest("button,a,input,textarea,summary")) { return; } if ((e.code === "Space" || e.key === "Enter" || e.key === "ArrowRight") && s && s.node !== "tamat") { e.preventDefault(); sambung(); } });
  function modal(tajuk, html) { habisTaip(); el("tajuk-modal").textContent = tajuk; el("isi-buku").innerHTML = html; el("buku").showModal(); }
  el("tutup").onclick = function () { el("buku").close(); }; el("buku").onclick = function (e) { if (e.target === el("buku")) { var r = el("buku").getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) { el("buku").close(); } } };
  el("menu").onclick = function () {
    modal("Menu cerita", '<p>Kemajuan disimpan pada browser ini secara automatik. Setiap pilihan ada kesan; tiada markah untuk memilih nilai peribadi.</p><div class="opsyen-menu"><button id="cepat">Dialog: ' + (segera ? 'terus penuh' : 'muncul beransur') + '</button><button id="kembali">Kembali ke cerita</button><button id="ulang-menu">Mula semula</button><a class="balik" href="../../index.html#t4-b1"><span aria-hidden="true">←</span>Kembali ke nota Bab 1</a></div>');
    var gerakBtn = document.createElement("button"); gerakBtn.textContent = "Gerakan: " + (gerakan ? "hidup" : "dimatikan"); el("cepat").after(gerakBtn);
    el("isi-buku").appendChild(window.KARNIVAL_BUNYI.panel());
    gerakBtn.onclick = function () { gerakan = !gerakan; el("novel").classList.toggle("tanpa-gerak", !gerakan); this.textContent = "Gerakan: " + (gerakan ? "hidup" : "dimatikan"); };
    el("cepat").onclick = function () { segera = !segera; this.textContent = "Dialog: " + (segera ? "terus penuh" : "muncul beransur"); };
    el("kembali").onclick = function () { el("buku").close(); };
    el("ulang-menu").onclick = function () { el("isi-buku").innerHTML = '<p>Mulakan cerita baru? Kemajuan episod ini akan digantikan. Pilih kembali untuk teruskan laluan sekarang.</p><div class="opsyen-menu"><button id="baru">Ya, mula cerita baru</button><button id="batal">Kembali</button></div>'; el("baru").onclick = function () { el("buku").close(); mulakan(); }; el("batal").onclick = function () { el("buku").close(); }; };
  };
  function bahagian(tajuk, teks) { return '<h3>' + tajuk + '</h3><p>' + teks + '</p>'; }
  function penyataDana() {
    if (!s) { return; } var k = K.kewangan(s), masa = s.node === "tamat" ? "Selepas karnival" : K.adegan[s.node].lokasi;
    function row(n,v,cls) { return '<tr' + (cls ? ' class="'+cls+'"' : '') + '><th scope="row">'+esc(n)+'</th><td>'+(v<0?'('+K.rm(-v)+')':K.rm(v))+'</td></tr>'; }
    var h = '<p class="tarikh-pkk">'+esc(masa)+'</p><p>Penyata ringkas ini dikemas kini mengikut keputusan kamu.</p><table class="jadual-pkk"><caption>Penyata Kedudukan Kewangan · Kelas 4 Bestari</caption><thead><tr><th scope="col">Butiran</th><th scope="col">RM</th></tr></thead><tbody><tr class="kumpulan-pkk"><th colspan="2">Aset semasa</th></tr>';
    h += row('Tunai kelas',k.tunai)+row('Stok bahan / produk',k.stok)+row('Jumlah aset',k.aset,'jumlah-pkk');
    h += '<tr class="kumpulan-pkk"><th colspan="2">Liabiliti dan dana kelas</th></tr>'+row('Liabiliti (semua belanja dibayar tunai)',0)+row('Dana asal kelas',100)+row(k.lebihan<0?'Defisit terkumpul':'Lebihan terkumpul',k.lebihan)+row('Jumlah liabiliti + dana kelas',k.ekuiti,'jumlah-pkk')+'</tbody></table>';
    h += '<p><b>Aset '+K.rm(k.aset)+' = Liabiliti '+K.rm(k.liabiliti)+' + Dana kelas '+K.rm(k.ekuiti)+'.</b></p>';
    h += '<p>Aliran tunai: RM100.00 + kutipan '+K.rm(k.hasil)+' − bayaran '+K.rm(s.kos)+' = '+K.rm(k.tunai)+'.</p>';
    h += '<p>Stok'+(k.selesai?' berbaki':' tersedia')+': '+k.air+' air dan '+k.sandwic+' sandwich. '+(k.selesai?'Dalam simulasi satu hari ini, stok tidak terjual dinilai RM0 pada penutup.':'Stok dinilai pada kos bahan: RM1 bagi air dan RM2 bagi sandwich; bahan ini belum diiktiraf sebagai belanja penggunaan.')+'</p>';
    if(s.node==='jualan') { h+='<p class="rujukan">Jualan sedang berlangsung. Jumlah kutipan dan baki stok akan disahkan apabila pasukan membuat kiraan petang.</p>'; }
    h += '<p class="rujukan">Sasaran RM120 merujuk kepada tunai yang dibawa balik. Peralatan dipinjam atau disewa, jadi bukan aset milik kelas. PKK ini ialah ringkasan simulasi untuk memahami dana kelas.</p>';
    modal('PKK · Dana kelas',h);
  }
  el("buka-dana").onclick = penyataDana;
  function nota() {
    var h = '<p>Istilah dan nombor subtopik berdasarkan nota <b>Pengenalan kepada Ekonomi</b> dalam repo ECON-TUTOR. Dialog, angka booth dan kadar jualan ialah <b>cadangan / nilai contoh</b>.</p>';
    h += bahagian("1.1.1 · Ilmu ekonomi", "Sains sosial yang mengkaji pengurusan sumber ekonomi yang terhad untuk memenuhi kehendak manusia yang tidak terhad.");
    h += bahagian("1.1.2 · Kekurangan dan pilihan", "Kehendak tidak terhad berbanding sumber terhad menyebabkan kekurangan, lalu unit ekonomi membuat pilihan. Isi rumah memaksimumkan kepuasan, firma memaksimumkan keuntungan, kerajaan memaksimumkan kebajikan masyarakat. Kekurangan masing-masing: pendapatan dan masa; faktor pengeluaran; hasil negara.");
    h += bahagian("1.1.3 · Faktor pengeluaran", "Tanah ialah sumber semula jadi; buruh ialah tenaga fizikal atau mental manusia; modal ialah alat ciptaan manusia bagi pengeluaran; usahawan menggabungkan faktor serta menanggung risiko. Dalam cerita: tapak booth, tenaga pasukan, peralatan, dan kamu sebagai penyelaras. Wang untuk menyewa alat ialah pembiayaan.");
    h += bahagian("1.1.4–1.1.6 · Kos lepas", "Pulangan daripada pilihan <b>kedua terbaik</b> yang terpaksa dilepaskan. Bukan jumlah semua alternatif dan bukan harga yang dibayar. Dalam contoh firma sumber: X = 40 seluar dan 100 kemeja-T; Y = 60 seluar dan 80 kemeja-T. Bergerak X → Y mengorbankan 20 helai kemeja-T untuk tambahan 20 seluar. Individu mengorbankan kepuasan, firma keuntungan alternatif, kerajaan kebajikan projek alternatif.");
    h += bahagian("1.1.7 · Keluk kemungkinan pengeluaran", "Had maksimum keluaran dengan faktor dan teknologi tertentu. Andaian: dua barang, sumber terhad dan tetap, teknologi tetap, guna tenaga penuh pada KKP. Titik pada keluk cekap; di dalam tidak cekap; di luar belum dapat dicapai. Pertambahan faktor atau kemajuan teknologi boleh mengalihkan KKP ke kanan.");
    h += '<svg viewBox="0 0 340 240" role="img" aria-label="KKP daripada jadual sumber: R 0,20; S 4,19; T 8,17; U 12,13; V 16,0. W di dalam dan Y di luar keluk."><path class="graf-paksi" d="M45 25V195H310"/><path class="graf-keluk" d="M45 35L105 43L165 59L225 91L285 195"/><g class="graf-titik"><circle cx="45" cy="35" r="4"/><circle cx="105" cy="43" r="4"/><circle cx="165" cy="59" r="4"/><circle cx="225" cy="91" r="4"/><circle cx="285" cy="195" r="4"/><circle cx="120" cy="135" r="4"/><circle cx="250" cy="45" r="4"/></g><text x="52" y="28">R</text><text x="107" y="36">S</text><text x="170" y="52">T</text><text x="234" y="86">U</text><text x="294" y="188">V</text><text x="129" y="139">W</text><text x="260" y="45">Y</text><text x="6" y="39">20</text><text x="27" y="209">0</text><text x="276" y="213">16</text><text x="45" y="16">Makanan (tan metrik)</text><text x="141" y="234">Pakaian (ribu helai)</text></svg>';
    h += '<p class="rujukan">Garis menghubungkan kombinasi Jadual 1.2. R (0,20), S (4,19), T (8,17), U (12,13), V (16,0). W dan Y ialah titik ilustrasi. Dari S ke T: 2 tan metrik makanan dilepaskan bagi tambahan 4 ribu helai pakaian, atau 0.5 tan metrik bagi setiap 1 ribu helai. Model booth pula sengaja menggunakan kos lepas malar: 2 air menggantikan 1 sandwich.</p>';
    h += bahagian("1.2.1 · Empat masalah asas", "Apa: jenis barang. Berapa: kuantiti. Bagaimana: teknik pengeluaran mengikut harga relatif faktor dan kecekapan. Untuk siapa: corak agihan keluaran, dipengaruhi kuasa beli / agihan pendapatan.");
    h += '<details><summary>1.2.2–1.2.3 · Sistem ekonomi</summary><p><b>Pasaran bebas:</b> faktor dimiliki individu/swasta, pengguna dan pengeluar bebas memilih; apa dan berapa melalui mekanisme pasaran, bagaimana untuk kecekapan dan untung, untuk siapa mengikut kuasa beli. Kebebasan dan inovasi, tetapi risiko ketidaksamaan serta kesan luaran.</p><p><b>Perancangan pusat:</b> kerajaan memiliki faktor dan menentukan apa, berapa, bagaimana serta agihan untuk kebajikan. Pilihan individu dan insentif lebih terhad.</p><p><b>Campuran:</b> kerajaan dan swasta berperanan; barang ekonomi dipandu pasaran, kerajaan membekalkan barang awam dan campur tangan bagi kebajikan melalui cukai, subsidi atau kawalan. Malaysia ialah contoh dalam nota sumber.</p><p>Satu tindakan memberi bantuan tidak membuktikan sebuah negara mengamalkan sistem tertentu. Penganjur sekolah bukan kerajaan; model booth ialah analogi yang terhad.</p></details>';
    h += bahagian("1.2.4 · Ekonomi Islam", "Sistem ekonomi campuran berlandaskan al-Quran dan Hadis. Aktiviti halal, persaingan adil, keseimbangan individu dan masyarakat, pembangunan fizikal serta kerohanian, matlamat al-falah. Faktor pengeluaran hak milik mutlak Allah SWT, manusia pemegang amanah. Elakkan pembaziran serta penipuan. Zakat apabila cukup syarat; bantuan booth bukan zakat secara automatik.");
    h += '<p class="rujukan">Cerita menumpukan konflik kekurangan, pilihan, kos lepas, faktor pengeluaran dan agihan. Nota sistem ekonomi di sini melengkapkan rujukan Bab 1; cerita ini bukan pengganti keseluruhan nota atau skema peperiksaan. <a href="../../index.html#t4-b1">Baca nota Bab 1</a>.</p>';
    modal("Nota Bab 1 · Perjalanan kamu", h);
  }
  el("nota").onclick = nota;
  function jejak() {
    var h = '<p>Keputusan yang membawa kamu ke ending ini:</p><ol>';
    s.sejarah.forEach(function (j) { h += '<li>' + esc(j.pilihan) + '</li>'; }); h += '</ol>';
    h += bahagian("Apa yang kamu lepaskan?", s.keluaran === "air" ? "Sumber sesi ini boleh menghasilkan " + s.kapasiti / 2 + " sandwich sebagai alternatif, tetapi kamu memilih " + s.air + " air." : s.keluaran === "sandwic" ? "Sumber sesi ini boleh menghasilkan " + s.kapasiti + " air sebagai alternatif, tetapi kamu memilih " + s.sandwic + " sandwich." : "Pengeluaran campuran mengehadkan jumlah setiap produk. Berbanding semua air, " + s.kapasiti / 2 + " cawan air dilepaskan untuk " + s.sandwic + " sandwich. Ini kos lepas bagi pergerakan antara dua kombinasi itu.");
    h += '<p>Jualan: ' + s.jualAir + ' air, ' + s.jualSandwic + ' sandwich. Bantuan: ' + s.bantuanAir + ' air, ' + s.bantuanSandwic + ' sandwich. Stok tidak terjual: ' + (s.air - s.jualAir - s.bantuanAir) + ' air, ' + (s.sandwic - s.jualSandwic - s.bantuanSandwic) + ' sandwich.</p>';
    h += '<p>Modal awal RM100 + hasil ' + K.rm(s.hasil) + ' − belanja ' + K.rm(s.kos) + ' = dana akhir ' + K.rm(s.wang) + '.</p><p>Untung/rugi simulasi: ' + K.rm(s.hasil - s.kos) + '. Stok baki dinilai sifar dalam model satu hari. Semua kadar jualan ialah andaian contoh, bukan ramalan sebenar.</p>';
    h += '<h3>Refleksi selepas cerita</h3><p>Nyatakan sumber terhad, pilihan kedua terbaik yang dilepaskan, dan satu keputusan yang kamu akan ubah. Bezakan matlamat firma dengan matlamat kerajaan.</p>';
    modal("Jejak keputusan kamu", h);
  }
  function tamat() {
    habisTaip(); window.KARNIVAL_NARASI.tutup(); tukarSeni("senja"); penutur("Pencerita"); kemasHud(); el("hud").hidden = false; el("mainan").hidden = true; el("pengakhiran").hidden = false; el("lokasi").textContent = "EPISOD 01 · TAMAT"; var e = K.ending(s);
    el("pengakhiran").innerHTML = '<span class="kecil">ENDING · ' + esc(e.id.toUpperCase()) + '</span><h2>' + esc(e.tajuk) + '</h2><p>' + esc(e.teks) + '</p><div class="rekod"><div><strong>' + K.rm(s.wang) + '</strong><small>Dana akhir · target RM120</small></div><div><strong>' + (s.jualAir + s.jualSandwic) + '</strong><small>Unit terjual</small></div></div><div class="butang-akhir"><button class="utama" id="jejak">Lihat jejak keputusan</button><button id="ulang">Cuba laluan lain</button><a class="balik" href="../../index.html#t4-b1"><span aria-hidden="true">←</span>Kembali ke nota Bab 1</a></div><p class="fine">Cerita dan angka ialah simulasi contoh. Konsep berdasarkan Bab 1 Ekonomi Tingkatan 4. Semua ending boleh digunakan untuk berbincang; ini bukan ujian bermarkah.</p>';
    el("jejak").onclick = jejak; el("ulang").onclick = mulakan; simpan(); el("jejak").focus({ preventScroll: true });
  }
  el("skrin").hidden = !document.fullscreenEnabled;
  el("skrin").onclick = function () {
    var kerja = document.fullscreenElement ? document.exitFullscreen() : el("novel").requestFullscreen();
    if (kerja && kerja.catch) { kerja.catch(function () { el("kesan").textContent = "Browser ini belum membenarkan mod skrin penuh."; el("kesan").hidden = false; clearTimeout(jamKesan); jamKesan = setTimeout(function () { el("kesan").hidden = true; }, 3200); }); }
  };
  document.addEventListener("fullscreenchange", function () { var penuhSkrin = !!document.fullscreenElement; el("skrin").setAttribute("aria-label", penuhSkrin ? "Keluar skrin penuh" : "Buka skrin penuh"); el("skrin").title = penuhSkrin ? "Keluar skrin penuh" : "Skrin penuh"; });
  ["kelas", "persediaan", "hujan", "senja"].forEach(function (n) { var gambar = new Image(); gambar.src = "assets/" + n + ".png"; });
})();
