/* =========================================================
   Matrikulasi · AE025 Makroekonomi · Bab 3
   Penentuan Keseimbangan Pendapatan Negara
   Sumber: slaid kuliah AE025 "BAB 3 Penentuan Keseimbangan Pendapatan Negara" (237 slaid)
   ========================================================= */
EKO.daftarBab({
  id: "m2-b3",
  peringkat: "matrik",
  tingkatan: 2,
  no: 3,
  tajuk: "Penentuan Keseimbangan Pendapatan Negara",
  warna: "var(--bab-rm10)",
  ringkas:
    "Keseimbangan pendapatan negara dicapai apabila perbelanjaan agregat sama dengan penawaran agregat, atau suntikan sama dengan bocoran. Bab ini merangkumi fungsi penggunaan, tabungan dan pelaburan, MPC, MPS, APC dan APS, keseimbangan ekonomi dua dan tiga sektor, pengganda, lompang inflasi dan deflasi, ekonomi empat sektor serta pendekatan AD–AS.",
  seksyen: [
    {
      no: "3.1",
      tajuk: "Konsep Keseimbangan Pendapatan Negara",
      soalan: ["Apakah maksud AE, AS, suntikan dan bocoran?", "Apakah syarat umum keseimbangan pendapatan negara?"],
      html: `
<div class="kotak def"><span class="kotak-label">Keseimbangan pendapatan negara</span><p>Keadaan apabila jumlah perbelanjaan ke atas barang dan perkhidmatan (<b>perbelanjaan agregat, AE</b>) sama dengan jumlah barang dan perkhidmatan yang dikeluarkan (<b>penawaran agregat, AS = Y</b>).</p></div>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Pendekatan agregat</span><div class="rumus-baris">AS = AE</div><p>Dua sektor: Y = C + I. Tiga sektor: Y = C + I + G. Empat sektor: Y = C + I + G + (X − M).</p></div>
  <div class="kotak rumus"><span class="kotak-label">Pendekatan suntikan–bocoran</span><div class="rumus-baris">W = J</div><p>Dua sektor: S = I. Tiga sektor: S + T = I + G. Empat sektor: S + T + M = I + G + X.</p></div>
</div>
<div class="kotak tip"><span class="kotak-label">Asal S = I</span><p>Dalam dua sektor, Y = C + S (pendapatan dibelanjakan atau ditabung) dan Y = C + I (keseimbangan). Maka C + S = C + I, iaitu <b>S = I</b>.</p></div>
`
    },
    {
      no: "3.2.1",
      tajuk: "Penggunaan, Tabungan dan Pelaburan",
      soalan: [
        "Apakah maksud Yd, C, S dan I?",
        "Apakah faktor yang mempengaruhi penggunaan, tabungan dan pelaburan?",
        "Bagaimanakah MEI menentukan keputusan pelaburan?"
      ],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Pendapatan boleh guna (Yd)</span><p>Pendapatan yang boleh dibelanjakan individu: Yd = PP − cukai pendapatan persendirian, atau <b>Yd = Y − T</b>. Dalam ekonomi dua sektor tiada cukai, maka <b>Yd = Y</b>.</p></div>
  <div class="kotak def"><span class="kotak-label">Penggunaan (C) dan tabungan (S)</span><p>C ialah perbelanjaan isi rumah ke atas barang akhir dan perkhidmatan: bahagian Yd yang tidak ditabung. S ialah bahagian Yd yang tidak dibelanjakan. Kedua-duanya meningkat apabila Yd meningkat: C = f(Yd), S = f(Yd).</p></div>
</div>
<div class="kotak def"><span class="kotak-label">Pelaburan (I)</span><p>Perbelanjaan firma ke atas barang modal: bangunan kilang, pejabat dan rumah pekerja; jentera dan perkakasan; serta perubahan stok. <b>Pelaburan teraruh</b> dipengaruhi (berhubungan langsung dengan) pendapatan negara. <b>Pelaburan autonomi</b> tidak dipengaruhi pendapatan negara tetapi oleh kadar bunga, jangkaan pulangan, teknologi dan kos pengeluaran.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Faktor mempengaruhi C dan S</b><p>(1) Pendapatan isi rumah. (2) MPC dan MPS. (3) Agihan pendapatan: MPC golongan kaya lebih rendah daripada golongan miskin. (4) Kadar bunga: r naik, C turun dan S naik. (5) Pemilikan harta: isi rumah berharta berbelanja lebih. (6) Dasar kerajaan: cukai mengurangkan Yd, C dan S; skim pencen menggalakkan C dan mengurangkan S.</p></div>
  <div class="kad-mini"><b>Faktor mempengaruhi I</b><p>(1) Pendapatan negara (pelaburan teraruh). (2) Kadar bunga: r naik, kos pinjaman naik, I turun. (3) Kadar pulangan modal (MEI). (4) Perkembangan teknologi: MEI beralih ke kanan. (5) Kos pengeluaran. (6) Jangkaan ekonomi masa depan. (7) Dasar kerajaan: cukai korporat rendah dan belanjawan kurangan menggalakkan I.</p></div>
</div>
<div class="kotak fokus"><span class="kotak-label">Kecekapan modal sut (MEI)</span><p>MEI ialah peratus keuntungan setahun daripada pelaburan. Pengusaha melabur jika <b>MEI &gt; r</b> (kadar bunga pinjaman), dan tidak melabur jika sebaliknya. Keluk MEI mencerun ke bawah: kenaikan r dari r₁ ke r₀ mengurangkan pelaburan dari I₀ ke I₁. Kemajuan teknologi mengalihkan keluk MEI ke kanan, maka pelaburan bertambah pada kadar bunga yang sama.</p></div>
`
    },
    {
      no: "3.2.2",
      tajuk: "Fungsi Penggunaan dan Tabungan; MPC, MPS, APC dan APS",
      soalan: [
        "Apakah bentuk fungsi C = a + bYd dan S = −a + (1 − b)Yd?",
        "Apakah maksud penggunaan autonomi dan makan tabungan?",
        "Mengapakah MPC + MPS = 1 dan APC + APS = 1?"
      ],
      html: `
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Fungsi penggunaan</span><div class="rumus-baris">C = a + bYd</div><p>a = penggunaan autonomi (penggunaan ketika pendapatan sifar); b = MPC, kecerunan fungsi C.</p></div>
  <div class="kotak rumus"><span class="kotak-label">Fungsi tabungan</span><div class="rumus-baris">S = −a + (1 − b)Yd</div><p>−a = tabungan autonomi (negatif); 1 − b = MPS, kecerunan fungsi S. Diterbitkan daripada S = Yd − C = Yd − (a + bYd).</p></div>
</div>
<div class="jadual"><table><caption>Jadual pendapatan boleh guna, penggunaan dan tabungan (RM)</caption>
<thead><tr><th class="n">Y = Yd</th><th class="n">C</th><th class="n">S</th></tr></thead>
<tbody>
<tr><td class="n">0</td><td class="n">9 000</td><td class="n">−9 000</td></tr>
<tr><td class="n">6 000</td><td class="n">13 500</td><td class="n">−7 500</td></tr>
<tr><td class="n">12 000</td><td class="n">18 000</td><td class="n">−6 000</td></tr>
<tr><td class="n">18 000</td><td class="n">22 500</td><td class="n">−4 500</td></tr>
<tr><td class="n">24 000</td><td class="n">27 000</td><td class="n">−3 000</td></tr>
<tr><td class="n">30 000</td><td class="n">31 500</td><td class="n">−1 500</td></tr>
<tr><td class="n">36 000</td><td class="n">36 000</td><td class="n">0</td></tr>
<tr><td class="n">42 000</td><td class="n">40 500</td><td class="n">1 500</td></tr>
<tr><td class="n">48 000</td><td class="n">45 000</td><td class="n">3 000</td></tr>
<tr><td class="n">54 000</td><td class="n">49 500</td><td class="n">4 500</td></tr>
<tr><td class="n">60 000</td><td class="n">54 000</td><td class="n">6 000</td></tr>
</tbody></table></div>
<p>Daripada jadual: <b>C = 9 000 + 0.75Yd</b> dan <b>S = −9 000 + 0.25Yd</b>.</p>
<div class="grid-3">
  <div class="kad-mini"><b>C &gt; Yd (Yd RM0 hingga RM30 000)</b><p>Tabungan negatif: isi rumah "makan tabungan", iaitu menggunakan tabungan lampau, meminjam atau menjual harta.</p></div>
  <div class="kad-mini"><b>C = Yd (RM36 000)</b><p>Tabungan sifar. Fungsi C memotong garis 45° dan fungsi S memotong paksi pendapatan.</p></div>
  <div class="kad-mini"><b>C &lt; Yd (RM42 000 hingga RM60 000)</b><p>Lebihan pendapatan ditabung: tabungan positif.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 73 menyatakan C melebihi Yd pada tingkat Yd RM0 hingga "RM3000". Mengikut jadual, C &gt; Yd berlaku dari RM0 hingga <b>RM30 000</b>.</p></div>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Kecenderungan sut</span><div class="rumus-baris">MPC = ΔC ÷ ΔYd &nbsp; MPS = ΔS ÷ ΔYd</div><div class="rumus-baris">MPC + MPS = 1</div><p>Nilai MPC dan MPS sama pada setiap tingkat Yd (fungsi linear). Bukti: ΔYd = ΔC + ΔS; bahagikan dengan ΔYd.</p></div>
  <div class="kotak rumus"><span class="kotak-label">Kecenderungan purata</span><div class="rumus-baris">APC = C ÷ Yd &nbsp; APS = S ÷ Yd</div><div class="rumus-baris">APC + APS = 1</div><p>Nilai APC dan APS berbeza pada setiap tingkat Yd. Bukti: Yd = C + S; bahagikan dengan Yd.</p></div>
</div>
<div class="kotak contoh"><span class="kotak-label">Daripada jadual</span><div class="kira">
  <div class="baris">MPC = (13 500 − 9 000) ÷ (6 000 − 0) = 0.75; MPS = 1 500 ÷ 6 000 = 0.25</div>
  <div class="baris">Pada Yd = 48 000: APC = 45 000 ÷ 48 000 = 0.9375; APS = 3 000 ÷ 48 000 = 0.0625</div>
  <div class="baris jawapan">MPC + MPS = 1 dan APC + APS = 1</div></div></div>
`
    },
    {
      no: "3.2.3",
      tajuk: "Keseimbangan Ekonomi Dua Sektor dan Pengganda",
      soalan: [
        "Bagaimanakah keseimbangan ditentukan secara jadual, rumus dan rajah?",
        "Apakah kesan pertambahan pelaburan autonomi?",
        "Bagaimanakah proses pengganda berlaku?"
      ],
      html: `
<div class="jadual"><table><caption>Proses keseimbangan: I = RM1 500</caption>
<thead><tr><th class="n">Y = AS</th><th class="n">C</th><th class="n">S</th><th class="n">I</th><th class="n">AE = C + I</th><th>Stok</th><th>Kesan ke atas Y</th></tr></thead>
<tbody>
<tr><td class="n">30 000</td><td class="n">31 500</td><td class="n">−1 500</td><td class="n">1 500</td><td class="n">33 000</td><td>Berkurang</td><td>Bertambah</td></tr>
<tr><td class="n">36 000</td><td class="n">36 000</td><td class="n">0</td><td class="n">1 500</td><td class="n">37 500</td><td>Berkurang</td><td>Bertambah</td></tr>
<tr><td class="n"><b>42 000</b></td><td class="n">40 500</td><td class="n">1 500</td><td class="n">1 500</td><td class="n"><b>42 000</b></td><td>Tetap</td><td><b>Tidak berubah</b></td></tr>
<tr><td class="n">48 000</td><td class="n">45 000</td><td class="n">3 000</td><td class="n">1 500</td><td class="n">46 500</td><td>Bertambah</td><td>Berkurang</td></tr>
<tr><td class="n">54 000</td><td class="n">49 500</td><td class="n">4 500</td><td class="n">1 500</td><td class="n">51 000</td><td>Bertambah</td><td>Berkurang</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Pendekatan agregat</span><div class="kira"><div class="baris">Y = C + I = 9 000 + 0.75Y + 1 500</div><div class="baris">0.25Y = 10 500</div><div class="baris jawapan">Y = RM42 000</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Pendekatan suntikan–bocoran</span><div class="kira"><div class="baris">S = I: −9 000 + 0.25Y = 1 500</div><div class="baris">0.25Y = 10 500</div><div class="baris jawapan">Y = RM42 000</div></div></div>
</div>
<p>Pada Y &lt; RM42 000, AE &gt; AS: stok berkurang dan firma menambah keluaran. Pada Y &gt; RM42 000, AE &lt; AS: stok bertambah dan firma mengurangkan keluaran.</p>
<figure data-graf="carta-jadual" data-opt='{"tajuk":"Keseimbangan ekonomi dua sektor (jadual modul)","namaX":"Y","unitX":"","dpX":0,"dp":0,"nilaiX":[0,6000,12000,18000,24000,30000,36000,42000,48000,54000,60000],"xAwal":42000,"notaLalai":"","nota":{"0":"Pendapatan sifar: penggunaan autonomi RM9 000 dibiayai dengan makan tabungan (S = −RM9 000).","30000":"AE &gt; AS: stok berkurang, firma menambah keluaran, Y naik.","36000":"C = Y: tabungan sifar. AE (37 500) masih melebihi AS.","42000":"&lt;b&gt;Keseimbangan&lt;/b&gt;: AE = AS = RM42 000 dan S = I = RM1 500.","48000":"AE &lt; AS: stok bertambah, firma mengurangkan keluaran, Y turun.","60000":"AE (55 500) &lt; AS: Y akan turun ke RM42 000."},"panel":[{"labelX":"Pendapatan negara, Y (RM)","labelY":"AE dan C (RM)","x":[0,64000],"y":[0,64000],"tikX":[0,12000,24000,36000,48000,60000],"tikY":[0,12000,24000,36000,48000,60000],"siri":[{"id":"y45","nama":"Y = AE (45°)","label":"Y=AE","kelas":"c6","dyLabel":-6,"rm":true,"licin":false,"titik":false,"data":[[0,0],[6000,6000],[12000,12000],[18000,18000],[24000,24000],[30000,30000],[36000,36000],[42000,42000],[48000,48000],[54000,54000],[60000,60000]]},{"id":"ae","nama":"AE = C + I","label":"C+I","kelas":"d","rm":true,"data":[[0,10500],[6000,15000],[12000,19500],[18000,24000],[24000,28500],[30000,33000],[36000,37500],[42000,42000],[48000,46500],[54000,51000],[60000,55500]],"dyLabel":6},{"id":"c","nama":"C","label":"C","kelas":"c3","rm":true,"data":[[0,9000],[6000,13500],[12000,18000],[18000,22500],[24000,27000],[30000,31500],[36000,36000],[42000,40500],[48000,45000],[54000,49500],[60000,54000]],"dyLabel":20}],"bulat":[[42000,42000]]},{"labelX":"Pendapatan negara, Y (RM)","labelY":"S dan I (RM)","x":[0,64000],"y":[-10000,8000],"tikX":[0,12000,24000,36000,48000,60000],"tikY":[-10000,-5000,0,5000],"asalan":false,"paksiXBawah":true,"siri":[{"id":"s","nama":"S","label":"S","kelas":"s","rm":true,"data":[[0,-9000],[6000,-7500],[12000,-6000],[18000,-4500],[24000,-3000],[30000,-1500],[36000,0],[42000,1500],[48000,3000],[54000,4500],[60000,6000]]},{"id":"i","nama":"I","label":"I","kelas":"c4","rm":true,"licin":false,"titik":false,"data":[[0,1500],[6000,1500],[12000,1500],[18000,1500],[24000,1500],[30000,1500],[36000,1500],[42000,1500],[48000,1500],[54000,1500],[60000,1500]]}],"bulat":[[42000,1500]]}]}'></figure>

<h3>Kesan pertambahan pelaburan autonomi</h3>
<div class="kotak contoh"><span class="kotak-label">I bertambah RM1 500 (I₁ = RM3 000)</span><div class="kira">
  <div class="baris">Y = 9 000 + 0.75Y + 3 000 → 0.25Y = 12 000</div>
  <div class="baris">atau S = I₁: −9 000 + 0.25Y = 3 000</div>
  <div class="baris jawapan">Y baharu = RM48 000 (naik RM6 000)</div></div></div>

<h3>Pengganda</h3>
<div class="kotak def"><span class="kotak-label">Pengganda</span><p>Ukuran berapa kali ganda pendapatan negara keseimbangan berubah apabila komponen perbelanjaan agregat berubah. Dalam dua sektor, ia ialah <b>pengganda pelaburan</b>.</p></div>
<div class="kotak rumus"><span class="kotak-label">Pengganda pelaburan</span><div class="rumus-baris">k = 1 ÷ (1 − MPC) = 1 ÷ MPS = ΔYe ÷ ΔI</div><p>Contoh: k = 1 ÷ (1 − 0.75) = 4, atau 6 000 ÷ 1 500 = 4.</p></div>
<div class="jadual"><table><caption>Proses penggandaan: ΔI = RM1 500 juta, MPC = 0.75 (RM juta)</caption>
<thead><tr><th>Peringkat</th><th class="n">ΔY</th><th class="n">ΔC</th><th class="n">ΔS</th></tr></thead>
<tbody>
<tr><td>1</td><td class="n">1 500</td><td class="n">1 125</td><td class="n">375</td></tr>
<tr><td>2</td><td class="n">1 125</td><td class="n">843.8</td><td class="n">281.2</td></tr>
<tr><td>3</td><td class="n">843.8</td><td class="n">632.9</td><td class="n">210.9</td></tr>
<tr><td>4</td><td class="n">632.9</td><td class="n">474.7</td><td class="n">158.2</td></tr>
<tr><td>5</td><td class="n">474.7</td><td class="n">356</td><td class="n">118.7</td></tr>
<tr><td>Jumlah 5 peringkat</td><td class="n">4 576.4</td><td class="n">3 432.4</td><td class="n">1 144</td></tr>
<tr><td>Peringkat seterusnya</td><td class="n">1 423.6</td><td class="n">1 067.6</td><td class="n">356</td></tr>
<tr><td><b>Jumlah</b></td><td class="n"><b>6 000</b></td><td class="n"><b>4 500</b></td><td class="n"><b>1 500</b></td></tr>
</tbody></table></div>
<p>Syarikat meminjam RM1 500 juta untuk membina kilang. Pembekal bahan binaan, mesin dan peralatan menerima RM1 500 juta; mereka membelanjakan 75% (RM1 125 juta) dan menabung 25%. Perbelanjaan itu menjadi pendapatan pihak lain, dan proses ini berulang sehingga tiada lagi perbelanjaan baharu. Jumlah tambahan Y = RM6 000 juta, iaitu 4 kali ΔI.</p>
`
    },
    {
      no: "3.3",
      tajuk: "Keseimbangan Ekonomi Tiga Sektor",
      soalan: [
        "Apakah kesan cukai lump-sum dan cukai berkadar terhadap fungsi penggunaan?",
        "Bagaimanakah keseimbangan tiga sektor ditentukan?",
        "Bagaimanakah perubahan G dan T mempengaruhi pendapatan negara?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Perbelanjaan kerajaan (G)</span><p>G dianggap tetap dan tidak bergantung pada pendapatan (keluk G mendatar). G ialah <b>suntikan</b>: pembelian faktor daripada isi rumah dan barang daripada firma menambah pendapatan kedua-dua sektor. G naik, AE beralih ke atas dan Y naik.</p></div>
<h3>Cukai lump-sum dan cukai berkadar</h3>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Cukai lump-sum (tetap): T = 20</span><div class="kira">
    <div class="baris">C = 100 + 0.5Yd → Ct = 100 + 0.5(Y − 20) = 90 + 0.5Y</div>
    <div class="baris">S = −100 + 0.5Yd → St = −110 + 0.5Y</div>
    <div class="baris jawapan">Fungsi C dan S beralih ke bawah secara selari</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Cukai berkadar: T = 0.25Y</span><div class="kira">
    <div class="baris">C = 1 000 + 0.8Yd → Ct = 1 000 + 0.8(Y − 0.25Y) = 1 000 + 0.6Y</div>
    <div class="baris">S = −1 000 + 0.2Yd → St = −1 000 + 0.15Y</div>
    <div class="baris jawapan">Kecerunan (MPC) berubah; penggunaan autonomi tidak berubah</div></div></div>
</div>
<h3>Penentuan keseimbangan</h3>
<div class="jadual"><table><caption>Kaedah jadual (RM juta): T = 1 000, I = 500, G = 1 000</caption>
<thead><tr><th class="n">Y</th><th class="n">S</th><th class="n">C</th><th class="n">AE = C + I + G</th><th class="n">S + T</th><th class="n">I + G</th></tr></thead>
<tbody>
<tr><td class="n">5 000</td><td class="n">0</td><td class="n">4 000</td><td class="n">5 500</td><td class="n">1 000</td><td class="n">1 500</td></tr>
<tr><td class="n">6 000</td><td class="n">250</td><td class="n">4 750</td><td class="n">6 250</td><td class="n">1 250</td><td class="n">1 500</td></tr>
<tr><td class="n"><b>7 000</b></td><td class="n">500</td><td class="n">5 500</td><td class="n"><b>7 000</b></td><td class="n"><b>1 500</b></td><td class="n"><b>1 500</b></td></tr>
<tr><td class="n">8 000</td><td class="n">750</td><td class="n">6 250</td><td class="n">7 750</td><td class="n">1 750</td><td class="n">1 500</td></tr>
</tbody></table></div>
<p>Keseimbangan pada Y = AE = RM7 000 juta, dan S + T = I + G = RM1 500 juta.</p>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Kaedah rumus: agregat</span><div class="kira">
    <div class="baris">C = 80 + 0.75Yd, I = 20, G = 30, T = 20</div>
    <div class="baris">Y = 80 + 0.75(Y − 20) + 20 + 30</div>
    <div class="baris">Y = 115 + 0.75Y → 0.25Y = 115</div>
    <div class="baris jawapan">Y = RM460</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Kaedah rumus: suntikan = bocoran</span><div class="kira">
    <div class="baris">S + T = I + G</div>
    <div class="baris">−80 + 0.25(Y − 20) + 20 = 20 + 30</div>
    <div class="baris">0.25Y = 115</div>
    <div class="baris jawapan">Y = RM460</div></div></div>
</div>

<h3>Perubahan G dan T serta pengganda</h3>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Pengganda perbelanjaan kerajaan</span><div class="rumus-baris">KG = 1 ÷ (1 − MPC) = 1 ÷ MPS = ΔY ÷ ΔG</div></div>
  <div class="kotak rumus"><span class="kotak-label">Pengganda cukai (lump-sum)</span><div class="rumus-baris">KT = −MPC ÷ (1 − MPC) = −MPC ÷ MPS = ΔY ÷ ΔT</div></div>
</div>
<div class="jadual"><table><caption>Asal: C = 80 + 0.75Yd, I = 20, G = 30, T = 20 → Y = 460 (KG = 4, KT = −3)</caption>
<thead><tr><th>Perubahan</th><th>Pengiraan</th><th class="n">Y baharu</th></tr></thead>
<tbody>
<tr><td>G naik 10</td><td>ΔY = 4 × 10 = +40</td><td class="n">500</td></tr>
<tr><td>G jatuh 15</td><td>ΔY = 4 × (−15) = −60</td><td class="n">400</td></tr>
<tr><td>T naik 10</td><td>ΔY = −3 × 10 = −30</td><td class="n">430</td></tr>
<tr><td>T naik 15</td><td>ΔY = −3 × 15 = −45</td><td class="n">415</td></tr>
<tr><td>T jatuh 10</td><td>ΔY = −3 × (−10) = +30</td><td class="n">490</td></tr>
</tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 178 dan 193 mengira keseimbangan asal sebagai Y = 130 + 0.75Y = 520, iaitu <b>terlupa cukai T = 20</b>. Keseimbangan asal yang betul ialah <b>Y = 460</b> (sama dengan slaid 166). Akibatnya, slaid 194 memberi Y baharu = 490 apabila T naik 10; yang betul ialah 460 − 30 = <b>430</b>. Jawapan G jatuh 15 (Y = 400, turun 60) pula tepat.</p></div>
<div class="kotak tip"><span class="kotak-label">Mengapa KG lebih besar daripada KT?</span><p>Perubahan G memberi kesan <b>terus</b> kepada AE. Perubahan T hanya mengubah Yd, dan hanya sebahagian (MPC) yang mengubah C. Oleh itu, untuk menutup lompang yang sama besar, perubahan T yang diperlukan lebih besar daripada perubahan G.</p></div>
`
    },
    {
      no: "3.3.6",
      tajuk: "Lompang Inflasi dan Lompang Deflasi",
      soalan: ["Apakah beza jurang KNK, lompang inflasi dan lompang deflasi?", "Berapakah perubahan G atau T untuk menutup lompang?"],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Jurang KNK</span><p>Perbezaan antara KNK potensi (pendapatan pada guna tenaga penuh, Ygtp) dengan KNK sebenar (Ye).</p></div>
  <div class="kotak def"><span class="kotak-label">Lompang</span><p><b>Lompang inflasi</b>: pada Ygtp, suntikan &gt; bocoran (AE &gt; AS). <b>Lompang deflasi</b>: pada Ygtp, bocoran &gt; suntikan (AE &lt; AS). Saiz lompang = jurang ÷ pengganda.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 197 menulis kedua-dua ayat sebagai "lompang inflasi". Ayat kedua sepatutnya: lompang <b>deflasi</b> wujud apabila pada tingkat guna tenaga penuh, <b>bocoran melebihi suntikan</b>.</p></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Lompang deflasi: Ygtp = RM1 500 juta</span><div class="kira">
    <div class="baris">C = 150 + 0.75Yd, I = 150, G = 200, T = 200</div>
    <div class="baris">Ye = 150 + 0.75(Y − 200) + 150 + 200 → 0.25Y = 350 → Ye = RM1 400 juta</div>
    <div class="baris">Jurang = 1 500 − 1 400 = RM100 juta</div>
    <div class="baris">ΔG = 100 ÷ 4 = <b>+RM25 juta</b> (lompang deflasi RM25 juta)</div>
    <div class="baris jawapan">atau ΔT = 100 ÷ (−3) = −RM33.33 juta (turunkan cukai)</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Lompang inflasi: Ygtp = RM1 000 juta</span><div class="kira">
    <div class="baris">Ye = RM1 400 juta (fungsi yang sama)</div>
    <div class="baris">Jurang = 1 000 − 1 400 = −RM400 juta</div>
    <div class="baris">ΔG = −400 ÷ 4 = <b>−RM100 juta</b> (lompang inflasi RM100 juta)</div>
    <div class="baris jawapan">atau ΔT = −400 ÷ (−3) = +RM133.33 juta (naikkan cukai)</div></div></div>
</div>
<figure data-graf="ae-y" data-opt='{"tajuk":"Keseimbangan AE = Y, pengganda dan lompang"}'></figure>
`
    },
    {
      no: "3.4–3.5",
      tajuk: "Ekonomi Empat Sektor dan Pendekatan AD–AS",
      soalan: ["Apakah syarat keseimbangan ekonomi empat sektor?", "Apakah faktor yang mengalihkan keluk AD dan AS?", "Apakah kesan peralihan AD dan AS terhadap harga dan pendapatan negara benar?"],
      html: `
<div class="kotak rumus"><span class="kotak-label">3.4 Ekonomi empat sektor</span><div class="rumus-baris">Y = C + I + G + (X − M) &nbsp; atau &nbsp; S + T + M = I + G + X</div></div>
<h3>3.5.1 Permintaan agregat (AD)</h3>
<div class="kotak def"><span class="kotak-label">AD</span><p>Jumlah keluaran negara yang diminta oleh semua unit ekonomi pada pelbagai tingkat harga umum. Keluk AD mencerun ke bawah: hubungan <b>songsang</b> antara tingkat harga umum dengan pendapatan negara benar.</p></div>
<div class="grid-3">
  <div class="kad-mini"><b>Bekalan wang</b><p>Ms berkurang → r naik → I turun → Y turun: AD beralih ke kiri (dan sebaliknya).</p></div>
  <div class="kad-mini"><b>Kadar cukai</b><p>Cukai turun → Yd dan C naik: AD beralih ke kanan.</p></div>
  <div class="kad-mini"><b>Perbelanjaan kerajaan</b><p>G naik → AD beralih ke kanan.</p></div>
</div>
<h3>3.5.2 Penawaran agregat (AS)</h3>
<div class="kotak def"><span class="kotak-label">AS</span><p>Jumlah keluaran negara benar yang ditawarkan pada pelbagai tingkat harga umum. Keluk AS mencerun ke atas: harga tinggi mendorong pengeluar menambah keluaran.</p></div>
<div class="grid-3">
  <div class="kad-mini"><b>Harga input dan upah</b><p>Harga input atau upah naik → kos naik: AS beralih ke kiri.</p></div>
  <div class="kad-mini"><b>Teknologi</b><p>Kemajuan teknologi → AS beralih ke kanan.</p></div>
  <div class="kad-mini"><b>Dasar kerajaan</b><p>Cukai syarikat turun atau subsidi → AS beralih ke kanan.</p></div>
</div>
<h3>3.5.3 Keseimbangan AD–AS</h3>
<p>Keseimbangan pada persilangan AD dan AS (harga P₀, pendapatan Y₀). Pada harga di atas P₀ berlaku lebihan AS dan harga turun; di bawah P₀ berlaku lebihan AD dan harga naik.</p>
<div class="jadual"><table><caption>Kesan peralihan</caption>
<thead><tr><th>Peralihan</th><th>Harga umum</th><th>Pendapatan negara benar</th></tr></thead>
<tbody>
<tr><td>AD ke kanan</td><td>Naik</td><td><b>Naik</b></td></tr>
<tr><td>AD ke kiri</td><td>Turun</td><td>Turun</td></tr>
<tr><td>AS ke kanan</td><td>Turun</td><td><b>Naik</b></td></tr>
<tr><td>AS ke kiri</td><td>Naik</td><td>Turun</td></tr>
</tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 235 menyatakan apabila AD beralih ke kanan, keluaran negara "turun ke Y₁"; slaid 237 menyatakan apabila AS beralih ke kanan, keluaran "turun ke Y₂". Mengikut rajah, dalam <b>kedua-dua</b> kes keluaran negara benar <b>meningkat</b>. Jadual di atas telah dibetulkan.</p></div>
<figure data-graf="ad-as"></figure>
`
    }
  ],
  kad: [
    { d: "Syarat keseimbangan <b>dua sektor</b>", b: "AS = AE (Y = C + I) atau S = I.", t: "3.1" },
    { d: "Syarat keseimbangan <b>tiga sektor</b>", b: "Y = C + I + G atau S + T = I + G.", t: "3.1" },
    { d: "Beza pelaburan <b>teraruh</b> dan <b>autonomi</b>", b: "Teraruh: dipengaruhi pendapatan negara. Autonomi: tidak dipengaruhi pendapatan negara, tetapi oleh kadar bunga, jangkaan, teknologi dan kos.", t: "3.2.1" },
    { d: "Bilakah pengusaha melabur mengikut MEI?", b: "Apabila MEI > kadar bunga (r).", t: "3.2.1" },
    { d: "Fungsi penggunaan dan tabungan", b: "C = a + bYd; S = −a + (1 − b)Yd. a = penggunaan autonomi, b = MPC.", t: "3.2.2" },
    { d: "Maksud <b>makan tabungan</b>", b: "Membiayai C > Yd dengan menggunakan tabungan lampau, meminjam atau menjual harta; tabungan negatif.", t: "3.2.2" },
    { d: "Rumus MPC, MPS, APC, APS", b: "MPC = ΔC/ΔYd; MPS = ΔS/ΔYd; APC = C/Yd; APS = S/Yd. MPC + MPS = 1; APC + APS = 1.", t: "3.2.2" },
    { d: "Keseimbangan: C = 9 000 + 0.75Y, I = 1 500", b: "0.25Y = 10 500 → Y = RM42 000.", t: "3.2.3" },
    { d: "Rumus <b>pengganda pelaburan</b>", b: "k = 1/(1 − MPC) = 1/MPS = ΔY/ΔI.", t: "3.2.3" },
    { d: "ΔI = RM1 500 juta, MPC = 0.75: ΔY?", b: "k = 4, maka ΔY = RM6 000 juta (ΔC 4 500 + ΔS 1 500).", t: "3.2.3" },
    { d: "Kesan cukai <b>lump-sum</b> vs <b>berkadar</b> ke atas fungsi C", b: "Lump-sum: C beralih ke bawah secara selari. Berkadar: kecerunan (MPC) berkurang, penggunaan autonomi tetap.", t: "3.3" },
    { d: "Keseimbangan: C = 80 + 0.75Yd, I = 20, G = 30, T = 20", b: "Y = 115 + 0.75Y → Y = 460.", t: "3.3" },
    { d: "Rumus <b>KG</b> dan <b>KT</b>", b: "KG = 1/(1 − MPC). KT = −MPC/(1 − MPC).", t: "3.3" },
    { d: "Mengapa |KG| > |KT|?", b: "G memberi kesan terus kepada AE; T hanya mengubah Yd dan sebahagian (MPC) sahaja menjadi perubahan C.", t: "3.3" },
    { d: "Maksud <b>lompang deflasi</b>", b: "Pada tingkat guna tenaga penuh, bocoran melebihi suntikan (AE < AS).", t: "3.3.6" },
    { d: "Ye = 1 400, Ygtp = 1 500, MPC = 0.75: tindakan fiskal?", b: "Jurang 100; naikkan G sebanyak 25 atau turunkan T sebanyak 33.33.", t: "3.3.6" },
    { d: "Tiga faktor mengalihkan keluk <b>AD</b>", b: "Bekalan wang, kadar cukai, perbelanjaan kerajaan.", t: "3.5" },
    { d: "Kesan AS beralih ke kanan", b: "Tingkat harga umum turun dan pendapatan negara benar naik.", t: "3.5" }
  ],
  kuiz: []
});
