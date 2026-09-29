/* =========================================================
   Matrikulasi · AE015 Mikroekonomi · Bab 2
   Teori Permintaan, Penawaran dan Keseimbangan Pasaran
   Sumber: slaid kuliah AE015 "BAB 2.1 Permintaan" (48 slaid).
   2.2 Penawaran, 2.3 Keseimbangan Pasaran dan 2.4 Lebihan Pengguna
   dan Lebihan Pengeluar tersenarai dalam isi kandungan slaid tetapi
   failnya belum diterima: ditulis sebagai CADANGAN sementara.
   ========================================================= */
EKO.daftarBab({
  id: "m1-b2",
  peringkat: "matrik",
  tingkatan: 1,
  no: 2,
  tajuk: "Teori Permintaan, Penawaran dan Keseimbangan Pasaran",
  warna: "var(--bab-rm5)",
  ringkas:
    "Permintaan menunjukkan keinginan dan kemampuan pembeli pada pelbagai tingkat harga. Bab ini merangkumi jadual, keluk dan fungsi permintaan, permintaan pasaran, faktor penentu, perubahan kuantiti diminta berbanding perubahan permintaan, dan permintaan luar biasa. Bahagian penawaran, keseimbangan pasaran serta lebihan pengguna dan pengeluar ialah cadangan sementara.",
  seksyen: [
    {
      no: "2.1",
      tajuk: "Permintaan",
      soalan: [
        "Apakah maksud permintaan dan hukum permintaan?",
        "Bagaimanakah fungsi permintaan Qd = a − bP dibentuk daripada jadual?",
        "Bagaimanakah permintaan pasaran diperoleh daripada permintaan individu?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">2.1.1(a) Definisi permintaan</span><p><b>Permintaan</b> ialah keinginan <b>dan</b> kemampuan pembeli untuk membeli barang dan perkhidmatan pada pelbagai tingkat harga dalam suatu tempoh tertentu.</p></div>

<h3><span class="no">2.1.1(b)</span> Jadual dan keluk permintaan</h3>
<div class="grid-2">
  <div class="jadual"><table><caption>Jadual permintaan</caption>
  <thead><tr><th>Keadaan</th><th class="n">Harga (RM)</th><th class="n">Kuantiti diminta</th></tr></thead>
  <tbody><tr><td>A</td><td class="n">10</td><td class="n">3</td></tr><tr><td>B</td><td class="n">8</td><td class="n">6</td></tr><tr><td>C</td><td class="n">6</td><td class="n">9</td></tr><tr><td>D</td><td class="n">4</td><td class="n">12</td></tr></tbody></table></div>
  <div class="kotak def"><span class="kotak-label">2.1.1(c) Hukum permintaan</span><p>Hubungan antara harga dengan kuantiti diminta adalah <b>songsang (negatif)</b>: harga naik, kuantiti diminta jatuh; harga turun, kuantiti diminta naik, dengan andaian <i>ceteris paribus</i>.</p><p><b>Ceteris paribus</b>: semua faktor lain selain harga barang itu sendiri dianggap tidak berubah.</p></div>
</div>
<p>Apabila titik A hingga D diplot, terbentuk keluk DD yang mencerun ke bawah dari kiri ke kanan (graf interaktif dalam 2.1.3).</p>

<h3><span class="no">2.1.1(d)</span> Fungsi permintaan</h3>
<div class="kotak rumus"><span class="kotak-label">Fungsi permintaan linear</span><div class="rumus-baris">Qd = a − bP</div><p>Qd = kuantiti diminta; a = pemalar (kuantiti diminta apabila harga sifar); b = kecerunan keluk permintaan (ΔQd ÷ ΔP); P = harga.</p></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Cara 1: cari b dahulu</span><div class="kira">
    <div class="baris">Harga RM10 → 3 botol; harga RM8 → 6 botol</div>
    <div class="baris">b = ΔQd ÷ ΔP = (6 − 3) ÷ (10 − 8) = 1.5</div>
    <div class="baris">Guna P = 8, Qd = 6: 6 = a − 1.5(8)</div>
    <div class="baris">a = 6 + 12 = 18</div>
    <div class="baris jawapan">Qd = 18 − 1.5P</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Cara 2: persamaan serentak</span><div class="kira">
    <div class="baris">P = 10, Qd = 50: 50 = a − 10b … (1)</div>
    <div class="baris">P = 8, Qd = 150: 150 = a − 8b … (2)</div>
    <div class="baris">(2) − (1): 100 = 2b → b = 50</div>
    <div class="baris">50 = a − 10(50) → a = 550</div>
    <div class="baris jawapan">Qd = 550 − 50P</div></div></div>
</div>
<div class="kotak tip"><span class="kotak-label">Semak jawapan</span><p>Masukkan titik lain dari jadual: Qd = 18 − 1.5(6) = 9 dan Qd = 18 − 1.5(4) = 12. Kedua-duanya sama dengan jadual, maka fungsi betul.</p></div>

<h3><span class="no">2.1.1(e)</span> Permintaan individu dan permintaan pasaran</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Keluk permintaan individu</b><p>Menunjukkan kuantiti yang diminta oleh <b>seorang</b> pengguna pada pelbagai tingkat harga dalam tempoh tertentu.</p></div>
  <div class="kad-mini"><b>Keluk permintaan pasaran</b><p>Menunjukkan <b>jumlah</b> permintaan semua individu dalam pasaran pada setiap tingkat harga, iaitu penjumlahan <b>mendatar</b> keluk individu.</p></div>
</div>
<div class="jadual"><table><caption>Permintaan Hisyam, Asyraf dan pasaran</caption>
<thead><tr><th>Keadaan</th><th class="n">Harga (RM)</th><th class="n">Qd Hisyam</th><th class="n">Qd Asyraf</th><th class="n">Qd pasaran</th></tr></thead>
<tbody><tr><td>A</td><td class="n">20</td><td class="n">2</td><td class="n">3</td><td class="n">5</td></tr><tr><td>B</td><td class="n">15</td><td class="n">4</td><td class="n">6</td><td class="n">10</td></tr><tr><td>C</td><td class="n">10</td><td class="n">6</td><td class="n">9</td><td class="n">15</td></tr><tr><td>D</td><td class="n">5</td><td class="n">8</td><td class="n">12</td><td class="n">20</td></tr></tbody></table></div>
<p>Contoh pada harga RM10: permintaan pasaran = 6 + 9 = 15 unit.</p>
<figure data-graf="jumlah-pasaran" data-opt='{"jenis":"dd"}'></figure>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 9 menulis kuantiti diminta "meningkat sebanyak 6 botol" apabila harga jatuh ke RM8. Mengikut jadual dan pengiraan, kuantiti diminta meningkat <b>kepada</b> 6 botol (tambahan 3 botol).</p></div>
`
    },
    {
      no: "2.1.2",
      tajuk: "Faktor yang Mempengaruhi Permintaan",
      soalan: ["Apakah sembilan faktor yang mempengaruhi permintaan?", "Bagaimanakah barang pengganti dan penggenap mempengaruhi permintaan?", "Apakah beza barang biasa, bawahan dan mesti?"],
      html: `
<div class="kotak info"><span class="kotak-label">Sembilan faktor</span><p>(a) Harga barang itu sendiri, (b) harga barang lain, (c) cita rasa, (d) pendapatan: <b>faktor (a)–(d) untuk permintaan individu</b>. (e) Jumlah penduduk, (f) jangkaan masa depan, (g) kemudahan kredit, (h) dasar kerajaan, (i) musim: <b>faktor (e)–(i) untuk permintaan pasaran</b>.</p></div>
<div class="jadual"><table><caption>Kesan setiap faktor</caption>
<thead><tr><th>Faktor</th><th>Kesan terhadap permintaan</th></tr></thead>
<tbody>
<tr><td>(a) Harga barang itu sendiri</td><td>Harga naik, kuantiti diminta turun (dan sebaliknya). Ditunjukkan oleh <b>pergerakan di sepanjang</b> keluk DD yang sama.</td></tr>
<tr><td>(b) Harga barang lain: <b>pengganti</b></td><td>Barang yang fungsinya sama dan mudah diganti, contoh getah asli dan getah tiruan. Harga getah asli naik → permintaan getah tiruan naik, keluk DD getah tiruan beralih ke <b>kanan</b> (DD ke DD₁). Harga getah asli turun → DD getah tiruan beralih ke <b>kiri</b>.</td></tr>
<tr><td>(b) Harga barang lain: <b>penggenap</b></td><td>Barang yang mesti digunakan bersama, contoh kamera dan filem. Harga kamera turun → kuantiti diminta kamera naik → permintaan filem naik, keluk DD filem beralih ke <b>kanan</b>.</td></tr>
<tr><td>(c) Cita rasa</td><td>Dipengaruhi iklan, pertunjukan dan ekspo. Cita rasa meningkat → DD ke kanan; berkurang → DD ke kiri.</td></tr>
<tr><td>(d) Pendapatan</td><td>Bergantung pada jenis barang (lihat di bawah).</td></tr>
<tr><td>(e) Jumlah penduduk</td><td>Penduduk bertambah → permintaan pasaran bertambah.</td></tr>
<tr><td>(f) Jangkaan masa depan</td><td>Harga dijangka naik → pengguna membeli lebih sekarang, DD ke kanan.</td></tr>
<tr><td>(g) Kemudahan kredit</td><td>Kredit mudah diperoleh daripada institusi kewangan → permintaan bertambah.</td></tr>
<tr><td>(h) Dasar kerajaan</td><td>Contoh cukai pendapatan mengurangkan pendapatan individu, maka permintaan berkurang.</td></tr>
<tr><td>(i) Musim</td><td>Musim hujan → permintaan baju hujan bertambah.</td></tr>
</tbody></table></div>
<h3>Pendapatan dan jenis barang</h3>
<div class="grid-3">
  <div class="kad-mini"><b>Barang biasa</b><p>Pendapatan naik, permintaan bertambah: DD ke kanan kerana lebih banyak barang mampu dibeli pada harga yang sama. Pendapatan turun, DD ke kiri.</p></div>
  <div class="kad-mini"><b>Barang bawahan</b><p>Hubungan <b>negatif</b> antara pendapatan dan permintaan. Pendapatan naik, permintaan turun dan DD ke kiri. Contoh: beras hancur.</p></div>
  <div class="kad-mini"><b>Barang mesti</b><p>Barang keperluan yang permintaannya <b>tidak dipengaruhi</b> perubahan pendapatan. Contoh: gula, garam dan beras.</p></div>
</div>
`
    },
    {
      no: "2.1.3",
      tajuk: "Perubahan Kuantiti Diminta dan Perubahan Permintaan",
      soalan: ["Apakah beza pergerakan di sepanjang keluk DD dengan peralihan keluk DD?"],
      html: `
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Perubahan kuantiti diminta</span><p><b>Pergerakan titik di sepanjang keluk DD yang sama</b> akibat perubahan <b>harga barang itu sendiri</b>, manakala faktor lain tetap. Harga naik → kuantiti diminta turun; harga turun → kuantiti diminta naik.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Perubahan permintaan</span><p><b>Peralihan keseluruhan keluk DD</b> ke kanan atau ke kiri akibat faktor <b>selain</b> harga barang itu sendiri: harga barang lain, cita rasa, pendapatan, penduduk, jangkaan, kredit, dasar kerajaan dan musim.</p></div>
</div>
<figure data-graf="permintaan"></figure>
`
    },
    {
      no: "2.1.4",
      tajuk: "Permintaan Luar Biasa",
      soalan: ["Mengapakah keluk permintaan barang mewah, barang Giffen dan barang mesti tidak mematuhi hukum permintaan?"],
      html: `
<p>Keluk permintaan luar biasa <b>tidak mematuhi hukum permintaan</b>, iaitu tidak mencerun ke bawah dari kiri ke kanan. Ia berlaku kepada tiga jenis barang:</p>
<div class="jadual"><table><caption>Tiga jenis permintaan luar biasa</caption>
<thead><tr><th>Barang</th><th>Sebab</th><th>Bentuk keluk DD</th></tr></thead>
<tbody>
<tr><td><b>Barang mewah</b> (contoh kereta mewah)</td><td>Semakin tinggi harga, semakin berprestij; pengguna kaya merasakan barang itu menaikkan taraf sosioekonomi mereka, maka kuantiti diminta bertambah apabila harga naik.</td><td>Mencerun ke atas pada harga tinggi</td></tr>
<tr><td><b>Barang Giffen</b> (contoh beras hancur)</td><td>Barang bawahan yang sangat murah dan bermutu rendah, diminta golongan berpendapatan rendah. Apabila harganya jatuh, pendapatan benar meningkat, maka pengguna menggantikan sebahagian barang itu dengan makanan yang lebih bermutu. Kuantiti diminta turun apabila harga turun.</td><td>Mencerun ke atas pada harga rendah</td></tr>
<tr><td><b>Barang mesti</b> (contoh garam)</td><td>Barang keperluan harian yang penting; perubahan harga tidak mengubah kuantiti diminta.</td><td>Garis tegak (tidak anjal sempurna)</td></tr>
</tbody></table></div>
`
    },
    {
      no: "2.2",
      tajuk: "Penawaran (cadangan)",
      soalan: ["Apakah maksud penawaran dan hukum penawaran?", "Apakah faktor yang mempengaruhi penawaran?"],
      html: `
<div class="kotak info"><span class="kotak-label">Cadangan sementara</span><p>Slaid modul bagi 2.2 Penawaran belum diterima. Bahagian ini ialah <b>cadangan</b> yang ditulis mengikut istilah slaid lain dalam modul AE015, dan akan disemak semula apabila fail modul ada.</p></div>
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Definisi penawaran</span><p>Keinginan dan kemampuan pengeluar untuk menjual barang dan perkhidmatan pada pelbagai tingkat harga dalam suatu tempoh tertentu.</p></div>
  <div class="kotak def"><span class="kotak-label">Hukum penawaran</span><p>Hubungan antara harga dengan kuantiti ditawar adalah <b>langsung (positif)</b>: harga naik, kuantiti ditawar naik, dengan andaian <i>ceteris paribus</i>.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Fungsi penawaran linear</span><div class="rumus-baris">Qs = c + dP</div><p>c = pemalar (kuantiti ditawar apabila harga sifar); d = kecerunan (ΔQs ÷ ΔP). Contoh dalam Bab 3.2 modul: Qs = 20 + 2P.</p></div>
<figure data-graf="penawaran"></figure>
<div class="jadual"><table><caption>Faktor yang mempengaruhi penawaran (cadangan)</caption>
<thead><tr><th>Faktor</th><th>Kesan</th></tr></thead>
<tbody>
<tr><td>Harga barang itu sendiri</td><td>Pergerakan di sepanjang keluk SS yang sama</td></tr>
<tr><td>Harga input / kos pengeluaran</td><td>Kos naik → penawaran berkurang, SS ke kiri</td></tr>
<tr><td>Tingkat teknologi</td><td>Teknologi maju → kos turun, SS ke kanan</td></tr>
<tr><td>Bilangan pengeluar</td><td>Pengeluar bertambah → SS ke kanan</td></tr>
<tr><td>Harga barang lain (penawaran bersaing / bersama)</td><td>Bergantung pada hubungan barang dalam pengeluaran</td></tr>
<tr><td>Dasar kerajaan (cukai, subsidi)</td><td>Cukai → SS ke kiri; subsidi → SS ke kanan</td></tr>
<tr><td>Jangkaan harga masa depan</td><td>Harga dijangka naik → penawaran sekarang berkurang</td></tr>
<tr><td>Cuaca dan musim</td><td>Cuaca baik → hasil pertanian bertambah, SS ke kanan</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Perubahan kuantiti ditawar</span><p>Pergerakan di sepanjang keluk SS akibat perubahan harga barang itu sendiri.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Perubahan penawaran</span><p>Peralihan keluk SS akibat faktor selain harga barang itu sendiri.</p></div>
</div>
<figure data-graf="jumlah-pasaran" data-opt='{"jenis":"ss"}'></figure>
`
    },
    {
      no: "2.3",
      tajuk: "Keseimbangan Pasaran (cadangan)",
      soalan: ["Bagaimanakah harga dan kuantiti keseimbangan ditentukan?", "Apakah berlaku pada harga di atas atau di bawah harga keseimbangan?"],
      html: `
<div class="kotak info"><span class="kotak-label">Cadangan sementara</span><p>Slaid modul bagi 2.3 Keseimbangan Pasaran belum diterima. Fungsi penawaran dalam contoh di bawah ialah <b>nilai contoh</b>; fungsi permintaan diambil daripada contoh 2.1 modul.</p></div>
<div class="kotak def"><span class="kotak-label">Keseimbangan pasaran</span><p>Keadaan apabila kuantiti diminta sama dengan kuantiti ditawar: <b>Qd = Qs</b>. Keluk DD bersilang dengan keluk SS pada harga dan kuantiti keseimbangan.</p></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Contoh (nilai contoh)</span><div class="kira">
    <div class="baris">Qd = 18 − 1.5P (modul), Qs = −6 + 1.5P (contoh)</div>
    <div class="baris">18 − 1.5P = −6 + 1.5P</div>
    <div class="baris">24 = 3P → P = RM8</div>
    <div class="baris">Q = 18 − 1.5(8) = 6 unit</div>
    <div class="baris jawapan">Keseimbangan: RM8, 6 unit</div></div></div>
  <div class="jadual"><table><caption>Keadaan pasaran (nilai contoh)</caption>
    <thead><tr><th class="n">Harga (RM)</th><th class="n">Qd</th><th class="n">Qs</th><th>Keadaan</th></tr></thead>
    <tbody><tr><td class="n">6</td><td class="n">9</td><td class="n">3</td><td>Lebihan permintaan 6</td></tr><tr><td class="n">8</td><td class="n">6</td><td class="n">6</td><td><b>Keseimbangan</b></td></tr><tr><td class="n">10</td><td class="n">3</td><td class="n">9</td><td>Lebihan penawaran 6</td></tr></tbody></table></div>
</div>
<p>Pada harga di bawah RM8, <b>lebihan permintaan</b> menolak harga naik. Pada harga di atas RM8, <b>lebihan penawaran</b> menolak harga turun. Harga akan bergerak sehingga Qd = Qs.</p>
<figure data-graf="keseimbangan" data-opt='{"tajuk":"Keseimbangan pasaran (nilai contoh)","data":{"a":12,"b":0.6667,"c":4,"d":0.6667,"x":[0,20],"y":[0,14],"tikX":[0,2,4,6,8,10,12,14,16,18,20],"tikY":[0,2,4,6,8,10,12,14],"labelX":"Kuantiti (unit)","labelY":"Harga (RM)","hargaAwal":10,"pMin":5,"pMaks":11.5,"anjak":1.5,"unitQ":"unit","qHujung":13.5}}'></figure>
<div class="jadual"><table><caption>Perubahan keseimbangan (keluk lain tetap)</caption>
<thead><tr><th>Perubahan</th><th>Harga</th><th>Kuantiti</th></tr></thead>
<tbody>
<tr><td>Permintaan bertambah (DD ke kanan)</td><td>Naik</td><td>Bertambah</td></tr>
<tr><td>Permintaan berkurang (DD ke kiri)</td><td>Turun</td><td>Berkurang</td></tr>
<tr><td>Penawaran bertambah (SS ke kanan)</td><td>Turun</td><td>Bertambah</td></tr>
<tr><td>Penawaran berkurang (SS ke kiri)</td><td>Naik</td><td>Berkurang</td></tr>
</tbody></table></div>
`
    },
    {
      no: "2.4",
      tajuk: "Lebihan Pengguna dan Lebihan Pengeluar (cadangan)",
      soalan: ["Apakah maksud lebihan pengguna dan lebihan pengeluar?", "Bagaimanakah kedua-duanya dihitung daripada rajah?"],
      html: `
<div class="kotak info"><span class="kotak-label">Cadangan sementara</span><p>Slaid modul bagi 2.4 belum diterima. Contoh pengiraan menggunakan keseimbangan nilai contoh dalam 2.3.</p></div>
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Lebihan pengguna</span><p>Perbezaan antara harga yang <b>sanggup dibayar</b> oleh pengguna dengan harga pasaran yang sebenarnya dibayar. Dalam rajah: kawasan di bawah keluk DD dan di atas harga keseimbangan.</p></div>
  <div class="kotak def"><span class="kotak-label">Lebihan pengeluar</span><p>Perbezaan antara harga pasaran yang diterima oleh pengeluar dengan harga minimum yang <b>sanggup diterima</b>. Dalam rajah: kawasan di atas keluk SS dan di bawah harga keseimbangan.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Rumus luas segi tiga</span><div class="rumus-baris">Lebihan = ½ × kuantiti keseimbangan × beza harga</div></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Lebihan pengguna</span><div class="kira"><div class="baris">Pintasan harga DD: Qd = 0 → P = 18 ÷ 1.5 = RM12</div><div class="baris">½ × 6 × (12 − 8)</div><div class="baris jawapan">= RM12</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Lebihan pengeluar</span><div class="kira"><div class="baris">Pintasan harga SS: Qs = 0 → P = 6 ÷ 1.5 = RM4</div><div class="baris">½ × 6 × (8 − 4)</div><div class="baris jawapan">= RM12</div></div></div>
</div>
`
    }
  ],
  kad: [
    { d: "Definisi <b>permintaan</b>", b: "Keinginan dan kemampuan pembeli untuk membeli barang dan perkhidmatan pada pelbagai tingkat harga dalam suatu tempoh tertentu.", t: "2.1.1" },
    { d: "<b>Hukum permintaan</b>", b: "Hubungan songsang antara harga dengan kuantiti diminta, ceteris paribus.", t: "2.1.1" },
    { d: "Maksud <b>ceteris paribus</b>", b: "Semua faktor selain harga barang itu sendiri dianggap tidak berubah.", t: "2.1.1" },
    { d: "Maksud a dan b dalam <b>Qd = a − bP</b>", b: "a: kuantiti diminta apabila harga sifar. b: kecerunan keluk permintaan (ΔQd ÷ ΔP).", t: "2.1.1" },
    { d: "Fungsi permintaan bagi (RM10, 3) dan (RM8, 6)", b: "b = 3 ÷ 2 = 1.5; a = 6 + 1.5(8) = 18. Qd = 18 − 1.5P.", t: "2.1.1" },
    { d: "Fungsi permintaan bagi (RM10, 50) dan (RM8, 150)", b: "Persamaan serentak: b = 50, a = 550. Qd = 550 − 50P.", t: "2.1.1" },
    { d: "Cara membentuk keluk <b>permintaan pasaran</b>", b: "Jumlahkan secara mendatar kuantiti diminta semua individu pada setiap tingkat harga. Contoh RM10: 6 + 9 = 15 unit.", t: "2.1.1" },
    { d: "Faktor permintaan <b>individu</b> (a–d)", b: "Harga barang itu sendiri, harga barang lain, cita rasa dan pendapatan.", t: "2.1.2" },
    { d: "Faktor permintaan <b>pasaran</b> (e–i)", b: "Jumlah penduduk, jangkaan masa depan, kemudahan kredit, dasar kerajaan dan musim.", t: "2.1.2" },
    { d: "Harga getah asli naik: kesan ke atas getah tiruan", b: "Barang pengganti. Permintaan getah tiruan naik, keluk DD getah tiruan beralih ke kanan.", t: "2.1.2" },
    { d: "Harga kamera turun: kesan ke atas filem", b: "Barang penggenap. Permintaan filem naik, keluk DD filem beralih ke kanan.", t: "2.1.2" },
    { d: "Pendapatan naik: kesan ke atas <b>barang bawahan</b>", b: "Permintaan turun, keluk DD beralih ke kiri. Contoh: beras hancur.", t: "2.1.2" },
    { d: "Maksud <b>barang mesti</b> (dari segi pendapatan)", b: "Permintaan tidak dipengaruhi perubahan pendapatan. Contoh: gula, garam, beras.", t: "2.1.2" },
    { d: "Beza <b>perubahan kuantiti diminta</b> dan <b>perubahan permintaan</b>", b: "Kuantiti diminta: akibat harga barang itu sendiri, pergerakan di sepanjang keluk. Permintaan: akibat faktor lain, keluk beralih.", t: "2.1.3" },
    { d: "Tiga barang yang keluk DDnya <b>luar biasa</b>", b: "Barang mewah, barang Giffen dan barang mesti.", t: "2.1.4" },
    { d: "Mengapa permintaan <b>barang Giffen</b> luar biasa?", b: "Harga barang bawahan yang sangat murah jatuh → pendapatan benar naik → pengguna menggantikannya dengan makanan lebih bermutu, maka kuantiti diminta turun.", t: "2.1.4" },
    { d: "Bentuk keluk DD <b>barang mesti</b>", b: "Garis tegak (tidak anjal sempurna): perubahan harga tidak mengubah kuantiti.", t: "2.1.4" },
    { d: "<b>Hukum penawaran</b> (cadangan)", b: "Hubungan langsung antara harga dengan kuantiti ditawar, ceteris paribus.", t: "2.2" },
    { d: "Syarat <b>keseimbangan pasaran</b>", b: "Qd = Qs: keluk DD bersilang dengan keluk SS.", t: "2.3" },
    { d: "Harga di bawah harga keseimbangan", b: "Berlaku lebihan permintaan; harga akan naik sehingga Qd = Qs.", t: "2.3" },
    { d: "Maksud <b>lebihan pengguna</b>", b: "Beza antara harga yang sanggup dibayar dengan harga pasaran yang sebenarnya dibayar.", t: "2.4" },
    { d: "Maksud <b>lebihan pengeluar</b>", b: "Beza antara harga pasaran yang diterima dengan harga minimum yang sanggup diterima pengeluar.", t: "2.4" }
  ],
  kuiz: []
});
