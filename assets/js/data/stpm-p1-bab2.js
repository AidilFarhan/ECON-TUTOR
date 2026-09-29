/* =========================================================
   STPM Penggal 1 · Bab 2 · Pasaran Barang dan Harga
   Sumber: Modul PdP Ekonomi Penggal 1 Mikroekonomi, Bab 2
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p1-b2",
  peringkat: "stpm",
  tingkatan: 1,
  no: 2,
  tajuk: "Pasaran Barang dan Harga",
  warna: "var(--bab-rm5)",
  ringkas:
    "Permintaan dan penawaran menentukan harga dan kuantiti keseimbangan. Bab ini merangkumi fungsi permintaan dan penawaran, perubahan keseimbangan, lebihan pengguna dan pengeluar, keanjalan, serta campur tangan kerajaan melalui cukai, subsidi dan kawalan harga.",
  seksyen: [
    {
      no: "2.1 & 2.2",
      tajuk: "Permintaan dan Penawaran",
      soalan: [
        "Apakah maksud permintaan dan penawaran?",
        "Bagaimanakah fungsi permintaan dan penawaran dibentuk daripada jadual?",
        "Apakah beza perubahan kuantiti diminta dengan perubahan permintaan?"
      ],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Permintaan (DD)</span><p>Kesanggupan dan kemampuan pengguna untuk membeli sejumlah barang tertentu pada tingkat harga tertentu dalam tempoh masa tertentu.</p></div>
  <div class="kotak def"><span class="kotak-label">Penawaran (SS)</span><p>Kesanggupan dan kemampuan pengeluar untuk menawarkan sejumlah barang tertentu pada tingkat harga tertentu dalam tempoh masa tertentu.</p></div>
</div>
<div class="grid-2">
  <div class="kad-mini"><b>Hukum permintaan</b><p>Apabila harga sesuatu barang meningkat, kuantiti diminta berkurang; apabila harga jatuh, kuantiti diminta bertambah. Hubungan <b>songsang (negatif)</b>.</p></div>
  <div class="kad-mini"><b>Hukum penawaran</b><p>Apabila harga sesuatu barang meningkat, kuantiti ditawar bertambah; apabila harga jatuh, kuantiti ditawar berkurang. Hubungan <b>langsung (positif)</b>.</p></div>
</div>
<div class="jadual"><table><caption>Jadual permintaan dan penawaran</caption>
<thead><tr><th class="n">Harga (RM)</th><th class="n">Kuantiti diminta (unit)</th><th class="n">Kuantiti ditawar (unit)</th></tr></thead>
<tbody><tr><td class="n">1</td><td class="n">10</td><td class="n">2</td></tr><tr><td class="n">2</td><td class="n">8</td><td class="n">4</td></tr><tr><td class="n">3</td><td class="n">6</td><td class="n">6</td></tr><tr><td class="n">4</td><td class="n">4</td><td class="n">8</td></tr><tr><td class="n">5</td><td class="n">2</td><td class="n">10</td></tr></tbody></table></div>
<p>Andaikan harga asal RM3: kuantiti diminta 6 unit. Harga naik ke RM4, kuantiti diminta turun ke 4 unit; harga turun ke RM2, kuantiti diminta naik ke 8 unit. Bagi penawaran pula, harga naik ke RM4 menaikkan kuantiti ditawar ke 8 unit, dan harga turun ke RM2 menurunkannya ke 4 unit.</p>

<h3>Fungsi permintaan dan penawaran</h3>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Fungsi permintaan: Qd = a − bP</span><div class="kira">
    <div class="baris">P = RM3, Qd = 6: 6 = a − 3b … (1)</div>
    <div class="baris">P = RM4, Qd = 4: 4 = a − 4b … (2)</div>
    <div class="baris">(1) − (2): 2 = b</div>
    <div class="baris">6 = a − 3(2) → a = 12</div>
    <div class="baris jawapan">Qd = 12 − 2P</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Fungsi penawaran: Qs = a + bP</span><div class="kira">
    <div class="baris">P = RM3, Qs = 6: 6 = a + 3b … (1)</div>
    <div class="baris">P = RM4, Qs = 8: 8 = a + 4b … (2)</div>
    <div class="baris">(2) − (1): 2 = b</div>
    <div class="baris">6 = a + 3(2) → a = 0</div>
    <div class="baris jawapan">Qs = 2P</div></div></div>
</div>
<p>Sebaliknya, jika fungsi diberi, jadual boleh dibina dengan menggantikan harga. Contoh: Qd = 50 − 5P memberi Qd = 40 unit pada RM2; Qs = 20 + 5P memberi Qs = 30 unit pada RM2.</p>

<h3>Faktor yang mempengaruhi permintaan dan penawaran</h3>
<div class="jadual"><table><caption>Faktor penentu</caption>
<thead><tr><th>Permintaan</th><th>Penawaran</th></tr></thead>
<tbody>
<tr><td>Harga barang itu sendiri</td><td>Harga barang itu sendiri</td></tr>
<tr><td>Harga barang lain: barang pengganti, barang penggenap</td><td>Harga barang lain: barang penawaran bertanding, barang penawaran bersama</td></tr>
<tr><td>Pendapatan pengguna</td><td>Harga input</td></tr>
<tr><td>Cita rasa</td><td>Bilangan pengeluar</td></tr>
<tr><td>Jumlah penduduk</td><td>Tingkat teknologi</td></tr>
<tr><td>Musim</td><td>Dasar kerajaan (cukai, subsidi)</td></tr>
<tr><td>Dasar kerajaan</td><td>Jangkaan harga masa depan</td></tr>
<tr><td>Jangkaan harga masa depan</td><td></td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Perubahan kuantiti diminta / ditawar</span><p>Disebabkan oleh perubahan <b>harga barang itu sendiri</b>. Ditunjukkan oleh <b>pergerakan di sepanjang keluk</b> yang sama.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Perubahan permintaan / penawaran</span><p>Disebabkan oleh <b>faktor selain harga barang itu sendiri</b>. Ditunjukkan oleh <b>peralihan keseluruhan keluk</b> ke kanan atau ke kiri.</p></div>
</div>
<div class="jadual"><table><caption>Kesan perubahan harga barang lain</caption>
<thead><tr><th>Hubungan</th><th>Contoh</th><th>Kesan</th></tr></thead>
<tbody>
<tr><td><b>Barang pengganti</b>: boleh saling mengganti kerana fungsinya sama</td><td>Marjerin dan mentega</td><td>Harga marjerin naik → kuantiti diminta marjerin berkurang → permintaan mentega bertambah, keluk DD mentega beralih ke <b>kanan</b>.</td></tr>
<tr><td><b>Barang penggenap</b>: perlu digunakan bersama</td><td>Kereta dan petrol</td><td>Harga kereta naik → kuantiti diminta kereta berkurang → permintaan petrol berkurang, keluk DD petrol beralih ke <b>kiri</b>.</td></tr>
<tr><td><b>Penawaran bertanding</b>: tambahan penawaran satu barang mengurangkan penawaran barang lain</td><td>Getah dan kelapa sawit</td><td>Harga getah naik → kuantiti ditawar getah bertambah → penawaran kelapa sawit berkurang, keluk SS beralih ke <b>kiri</b>.</td></tr>
<tr><td><b>Penawaran bersama</b>: dikeluarkan serentak</td><td>Daging kambing dan kulit kambing</td><td>Harga daging kambing naik → kuantiti ditawar daging bertambah → penawaran kulit kambing turut bertambah, keluk SS beralih ke <b>kanan</b>.</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kad-mini"><b>Faktor lain permintaan</b><p>Pendapatan naik → kuasa beli dan permintaan naik. Cita rasa meningkat → permintaan naik. Penduduk bertambah → permintaan naik. Musim hujan → permintaan payung naik. Cukai pendapatan → pendapatan boleh guna jatuh, permintaan berkurang; kempen barang tempatan → permintaan barang tempatan naik. Harga dijangka naik → permintaan sekarang naik.</p></div>
  <div class="kad-mini"><b>Faktor lain penawaran</b><p>Harga input naik → kos naik, penawaran berkurang. Pengeluar bertambah → penawaran naik. Teknologi lebih tinggi → kos turun, penawaran naik. Cukai → kos naik, penawaran turun; subsidi → kos turun, penawaran naik. Harga dijangka naik → penawaran sekarang berkurang.</p></div>
</div>
<figure data-graf="permintaan"></figure>
`
    },
    {
      no: "2.3",
      tajuk: "Keseimbangan Pasaran",
      soalan: ["Bagaimanakah harga dan kuantiti keseimbangan ditentukan?", "Apakah kesan perubahan permintaan dan penawaran serentak?"],
      html: `
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Keseimbangan pasaran</b> ialah keadaan apabila kuantiti diminta sama dengan kuantiti ditawar pada satu tingkat harga tertentu. Syarat: <b>Qd = Qs</b>, iaitu keluk permintaan pasaran bersilang dengan keluk penawaran pasaran.</p></div>
<h3>Tiga pendekatan penentuan keseimbangan</h3>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">(a) Pendekatan rumus</span><div class="kira">
    <div class="baris">Qd = 100 − 4P, Qs = 50 + P</div>
    <div class="baris">100 − 4P = 50 + P</div>
    <div class="baris">50 = 5P → P = RM10</div>
    <div class="baris">Q = 100 − 4(10) = 60 unit</div>
    <div class="baris jawapan">Keseimbangan: RM10, 60 unit</div></div></div>
  <div class="jadual"><table><caption>(b) Pendekatan jadual</caption>
    <thead><tr><th class="n">Harga (RM)</th><th class="n">Qd</th><th class="n">Qs</th><th>Keadaan</th></tr></thead>
    <tbody><tr><td class="n">5</td><td class="n">80</td><td class="n">55</td><td>Lebihan permintaan</td></tr><tr><td class="n">10</td><td class="n">60</td><td class="n">60</td><td><b>Keseimbangan</b></td></tr><tr><td class="n">15</td><td class="n">40</td><td class="n">65</td><td>Lebihan penawaran</td></tr><tr><td class="n">20</td><td class="n">20</td><td class="n">70</td><td>Lebihan penawaran</td></tr><tr><td class="n">25</td><td class="n">0</td><td class="n">75</td><td>Lebihan penawaran</td></tr></tbody></table></div>
</div>
<p><b>(c) Pendekatan rajah:</b> keseimbangan di titik E (RM10, 60 unit). Pada harga di bawah RM10 berlaku <b>lebihan permintaan</b> (Qd &gt; Qs); pada harga di atas RM10 berlaku <b>lebihan penawaran</b> (Qs &gt; Qd).</p>
<figure data-graf="keseimbangan" data-opt='{"tajuk":"Keseimbangan pasaran daging kambing import","data":{"a":70,"b":2,"c":10,"d":1,"x":[0,40],"y":[0,75],"tikX":[0,5,10,15,20,25,30,35,40],"tikY":[0,10,20,30,40,50,60,70],"labelX":"Kuantiti (kg)","labelY":"Harga (RM/kg)","hargaAwal":40,"pMin":12,"pMaks":68,"anjak":5,"unitQ":"kg"}}'></figure>

<h3>Perubahan keseimbangan pasaran</h3>
<div class="jadual"><table><caption>Kesan peralihan keluk (andaian keluk lain tetap)</caption>
<thead><tr><th>Perubahan</th><th>Contoh punca</th><th>Harga</th><th>Kuantiti</th></tr></thead>
<tbody>
<tr><td>Permintaan bertambah (DD ke kanan)</td><td>Pendapatan naik</td><td>Naik</td><td>Bertambah</td></tr>
<tr><td>Permintaan berkurang (DD ke kiri)</td><td>Pendapatan turun</td><td>Turun</td><td>Berkurang</td></tr>
<tr><td>Penawaran bertambah (SS ke kanan)</td><td>Harga input turun</td><td>Turun</td><td>Bertambah</td></tr>
<tr><td>Penawaran berkurang (SS ke kiri)</td><td>Harga input naik</td><td>Naik</td><td>Berkurang</td></tr>
</tbody></table></div>
<div class="jadual"><table><caption>Perubahan serentak permintaan dan penawaran</caption>
<thead><tr><th>Keadaan</th><th>Harga</th><th>Kuantiti</th></tr></thead>
<tbody>
<tr><td>DD bertambah = SS bertambah</td><td>Tetap</td><td>Bertambah</td></tr>
<tr><td>DD bertambah &gt; SS bertambah</td><td>Naik</td><td>Bertambah</td></tr>
<tr><td>DD bertambah &lt; SS bertambah</td><td>Turun</td><td>Bertambah</td></tr>
<tr><td>DD bertambah = SS berkurang</td><td>Naik</td><td>Tetap</td></tr>
<tr><td>DD bertambah &gt; SS berkurang</td><td>Naik</td><td>Bertambah</td></tr>
<tr><td>DD bertambah &lt; SS berkurang</td><td>Naik</td><td>Berkurang</td></tr>
<tr><td>DD berkurang = SS berkurang</td><td>Tetap</td><td>Berkurang</td></tr>
<tr><td>DD berkurang &gt; SS berkurang</td><td>Turun</td><td>Berkurang</td></tr>
<tr><td>DD berkurang &lt; SS berkurang</td><td>Naik</td><td>Berkurang</td></tr>
</tbody></table></div>
<div class="kotak tip"><span class="kotak-label">Tip menjawab</span><p>Bagi perubahan serentak, keluk yang beralih <b>lebih besar</b> menentukan arah perubahan pemboleh ubah yang tidak pasti. Contoh: DD bertambah dan SS berkurang, harga pasti naik; kuantiti bergantung kepada peralihan yang lebih besar.</p></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Jadual perubahan serentak disusun semula mengikut analisis rajah. Beberapa ayat kesan dalam modul asal (contohnya bahagian pengurangan serentak) tertulis "kuantiti bertambah"; mengikut rajah, kuantiti <b>berkurang</b> apabila kedua-dua DD dan SS berkurang.</p></div>
`
    },
    {
      no: "2.4",
      tajuk: "Lebihan Pengguna dan Lebihan Pengeluar",
      soalan: ["Bagaimanakah lebihan pengguna dan lebihan pengeluar dihitung?"],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Lebihan pengguna</span><p>Perbezaan antara harga yang <b>sanggup dibayar</b> dengan harga sebenar dibayar (harga pasaran).</p></div>
  <div class="kotak def"><span class="kotak-label">Lebihan pengeluar</span><p>Perbezaan antara harga yang <b>sanggup dijual</b> dengan harga sebenar diterima (harga pasaran).</p></div>
</div>
<div class="jadual"><table><caption>Cara jadual: lebihan pengguna pada harga pasaran RM5</caption>
<thead><tr><th class="n">Unit</th><th class="n">Sanggup dibayar (RM)</th><th class="n">Harga pasaran (RM)</th><th class="n">Lebihan pengguna (RM)</th></tr></thead>
<tbody><tr><td class="n">1</td><td class="n">20</td><td class="n">5</td><td class="n">15</td></tr><tr><td class="n">2</td><td class="n">15</td><td class="n">5</td><td class="n">10</td></tr><tr><td class="n">3</td><td class="n">10</td><td class="n">5</td><td class="n">5</td></tr><tr><td class="n">4</td><td class="n">5</td><td class="n">5</td><td class="n">0</td></tr></tbody></table></div>
<div class="kotak rumus"><span class="kotak-label">Rumus (cara rajah)</span><div class="rumus-baris">Lebihan = ½ × tapak × tinggi</div><p>Tapak ialah kuantiti keseimbangan; tinggi ialah jarak antara pintasan harga keluk (DD bagi lebihan pengguna, SS bagi lebihan pengeluar) dengan harga keseimbangan.</p></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Lebihan pengguna</span><div class="kira"><div class="baris">Pintasan DD = RM10, harga = RM5, Q = 20</div><div class="baris jawapan">½ × 20 × (10 − 5) = RM50</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Lebihan pengeluar</span><div class="kira"><div class="baris">Harga = RM10, pintasan SS = RM4, Q = 20</div><div class="baris jawapan">½ × 20 × (10 − 4) = RM60</div></div></div>
</div>
`
    },
    {
      no: "2.5 & 2.6",
      tajuk: "Keanjalan Permintaan dan Keanjalan Penawaran",
      soalan: [
        "Bagaimanakah Ed, Es, Ec dan Ey dihitung dan ditafsir?",
        "Apakah penentu keanjalan permintaan dan penawaran?",
        "Apakah hubungan keanjalan permintaan harga dengan jumlah hasil?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Keanjalan permintaan</b> mengukur peratus perubahan kuantiti diminta kesan perubahan harga barang itu sendiri, harga barang lain atau pendapatan. <b>Keanjalan penawaran (Es)</b> mengukur peratus perubahan kuantiti ditawar kesan perubahan harga barang itu sendiri.</p></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span>
<div class="rumus-baris">Ed = <span class="pecahan"><span>%Δ kuantiti diminta</span><span>%Δ harga</span></span> = <span class="pecahan"><span>Q₁ − Q₀</span><span>Q₀</span></span> × <span class="pecahan"><span>P₀</span><span>P₁ − P₀</span></span></div>
<div class="rumus-baris">Es = <span class="pecahan"><span>Q₁ − Q₀</span><span>Q₀</span></span> × <span class="pecahan"><span>P₀</span><span>P₁ − P₀</span></span> (kuantiti ditawar)</div>
<div class="rumus-baris">Ec = <span class="pecahan"><span>Qx₁ − Qx₀</span><span>Qx₀</span></span> × <span class="pecahan"><span>Py₀</span><span>Py₁ − Py₀</span></span></div>
<div class="rumus-baris">Ey = <span class="pecahan"><span>Q₁ − Q₀</span><span>Q₀</span></span> × <span class="pecahan"><span>Y₀</span><span>Y₁ − Y₀</span></span></div></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Contoh Ed</span><div class="kira"><div class="baris">Harga RM2 → RM3; Qd 10 → 6</div><div class="baris">Ed = (6 − 10)/10 × 2/(3 − 2)</div><div class="baris jawapan">Ed = −0.8 (tidak anjal)</div></div><p>Harga naik 1%, kuantiti diminta berkurang 0.8%.</p></div>
  <div class="kotak contoh"><span class="kotak-label">Contoh Es</span><div class="kira"><div class="baris">Harga RM5 → RM6; Qs 20 → 25</div><div class="baris">Es = (25 − 20)/20 × 5/(6 − 5)</div><div class="baris jawapan">Es = 1.25 (anjal)</div></div><p>Harga naik 1%, kuantiti ditawar bertambah 1.25%.</p></div>
</div>
<h3>Darjah keanjalan</h3>
<div class="jadual"><table><caption>Darjah keanjalan permintaan harga dan penawaran</caption>
<thead><tr><th>Darjah</th><th>Nilai</th><th>Maksud</th><th>Bentuk keluk</th></tr></thead>
<tbody>
<tr><td>Anjal</td><td>&gt; 1</td><td>%Δ kuantiti &gt; %Δ harga</td><td>Landai</td></tr>
<tr><td>Tidak anjal</td><td>&lt; 1</td><td>%Δ kuantiti &lt; %Δ harga</td><td>Curam</td></tr>
<tr><td>Anjal satu</td><td>= 1</td><td>%Δ kuantiti = %Δ harga</td><td>DD: hiperbola segi empat tepat; SS: garis lurus dari asalan</td></tr>
<tr><td>Anjal sempurna</td><td>∞</td><td>Kuantiti berubah tanpa had pada satu harga</td><td>Mendatar (selari dengan paksi kuantiti)</td></tr>
<tr><td>Tidak anjal sempurna</td><td>0</td><td>Perubahan harga tidak mengubah kuantiti</td><td>Tegak (selari dengan paksi harga)</td></tr>
</tbody></table></div>
<figure data-graf="keanjalan"></figure>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Penentu keanjalan permintaan harga</span><ol>
    <li><b>Barang pengganti</b>: banyak pengganti → lebih anjal (kobis lebih anjal daripada garam).</li>
    <li><b>Nisbah perbelanjaan kepada pendapatan</b>: besar → lebih anjal (televisyen lebih anjal daripada pen).</li>
    <li><b>Kegunaan barang</b>: banyak kegunaan → lebih anjal (komputer lebih anjal daripada mesin taip).</li>
    <li><b>Jangka masa</b>: lebih panjang → lebih anjal kerana ada masa mencari pengganti.</li>
    <li><b>Kepentingan barang</b>: semakin penting → semakin tidak anjal.</li>
  </ol></div>
  <div class="kotak fokus"><span class="kotak-label">Penentu keanjalan penawaran</span><ol>
    <li><b>Kadar pertambahan kos</b>: tambahan kos kecil → lebih anjal.</li>
    <li><b>Bekalan input</b>: sukar diperoleh → tidak anjal.</li>
    <li><b>Faktor pengeluaran khusus</b>: perlu faktor khusus → kurang anjal.</li>
    <li><b>Jangka masa pengeluaran</b>: semakin lama → semakin tidak anjal.</li>
    <li><b>Bilangan firma</b>: semakin banyak → semakin anjal.</li>
  </ol></div>
</div>
<h3>Keanjalan permintaan harga dan jumlah hasil (TR)</h3>
<div class="jadual"><table><caption>Kesan perubahan harga ke atas TR = P × Q</caption>
<thead><tr><th>Keluk</th><th>Harga naik</th><th>Harga turun</th></tr></thead>
<tbody>
<tr><td>Anjal (RM10, 10 unit ↔ RM12, 5 unit)</td><td>TR turun: RM100 → RM60</td><td>TR naik: RM60 → RM100</td></tr>
<tr><td>Tidak anjal (RM10, 7 unit ↔ RM20, 7 unit)</td><td>TR naik: RM70 → RM140</td><td>TR turun: RM140 → RM70</td></tr>
</tbody></table></div>
<h3>Keanjalan permintaan silang (Ec) dan pendapatan (Ey)</h3>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Contoh Ec</span><div class="kira"><div class="baris">Harga X RM2 → RM3; Qd Y 10 → 20</div><div class="baris">Ec = (20 − 10)/10 × 2/(3 − 2)</div><div class="baris jawapan">Ec = +2 → barang pengganti</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Contoh Ey</span><div class="kira"><div class="baris">Pendapatan RM1 000 → RM2 000; Qd X 10 → 50</div><div class="baris">Ey = (50 − 10)/10 × 1 000/(2 000 − 1 000)</div><div class="baris jawapan">Ey = 4 → barang mewah</div></div></div>
</div>
<div class="grid-2">
  <div class="jadual"><table><caption>Tafsiran Ec</caption><thead><tr><th>Nilai Ec</th><th>Hubungan</th></tr></thead>
  <tbody><tr><td>Positif</td><td>Barang pengganti</td></tr><tr><td>Negatif</td><td>Barang penggenap</td></tr><tr><td>Sifar</td><td>Tiada kaitan</td></tr></tbody></table></div>
  <div class="jadual"><table><caption>Tafsiran Ey (mengikut modul)</caption><thead><tr><th>Nilai Ey</th><th>Jenis barang</th></tr></thead>
  <tbody><tr><td>0 &lt; Ey ≤ 1</td><td>Normal</td></tr><tr><td>Ey &gt; 1</td><td>Mewah</td></tr><tr><td>Ey = 0</td><td>Mesti</td></tr><tr><td>Ey &lt; 0</td><td>Bawahan</td></tr></tbody></table></div>
</div>
`
    },
    {
      no: "2.7",
      tajuk: "Campur Tangan Kerajaan dalam Pasaran",
      soalan: [
        "Bagaimanakah cukai dan subsidi mempengaruhi harga, output serta lebihan pengguna dan pengeluar?",
        "Apakah kesan dasar harga maksimum dan harga minimum?"
      ],
      html: `
<h3>2.7.1 Cukai dan subsidi</h3>
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Cukai tak langsung</span><p>Cukai yang dikenakan ke atas pengeluar; sebahagian bebannya dipindahkan kepada pengguna. Kos pengeluaran naik, penawaran berkurang, keluk SS beralih ke <b>kiri</b> (S ke S₁).</p></div>
  <div class="kotak def"><span class="kotak-label">Subsidi</span><p>Pemberian kerajaan kepada pengeluar. Kos pengeluaran turun, penawaran bertambah, keluk SS beralih ke <b>kanan</b> (S ke S₁).</p></div>
</div>
<div class="jadual"><table><caption>Kesan cukai dan subsidi</caption>
<thead><tr><th>Aspek</th><th>Cukai</th><th>Subsidi</th></tr></thead>
<tbody>
<tr><td>Harga keseimbangan</td><td>Naik (P ke P₁)</td><td>Turun (P ke P₁)</td></tr>
<tr><td>Kuantiti keseimbangan</td><td>Berkurang (Q ke Q₁)</td><td>Bertambah (Q ke Q₁)</td></tr>
<tr><td>Agihan</td><td>Beban pengguna = kenaikan harga × Q₁; beban pengeluar = baki cukai seunit × Q₁</td><td>Faedah pengguna = penurunan harga × Q₁; faedah pengeluar = baki subsidi seunit × Q₁</td></tr>
<tr><td>Lebihan pengguna</td><td>Berkurang</td><td>Bertambah</td></tr>
<tr><td>Lebihan pengeluar</td><td>Berkurang</td><td>Bertambah</td></tr>
</tbody></table></div>
<figure data-graf="cukai-subsidi"></figure>

<h3>2.7.2 Dasar harga maksimum dan harga minimum</h3>
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Harga maksimum</span><p>Harga yang ditetapkan kerajaan <b>lebih rendah</b> daripada harga pasaran. Kuantiti diminta bertambah (Q ke Q₁), kuantiti ditawar berkurang (Q ke Q₂): wujud <b>lebihan permintaan</b> Q₂Q₁ yang perlu ditampung kerajaan.</p></div>
  <div class="kotak def"><span class="kotak-label">Harga minimum</span><p>Harga yang ditetapkan kerajaan <b>lebih tinggi</b> daripada harga pasaran. Kuantiti diminta berkurang (Q ke Q₁), kuantiti ditawar bertambah (Q ke Q₂): wujud <b>lebihan penawaran</b> Q₁Q₂ yang perlu dibeli kerajaan.</p></div>
</div>
<p>Kesan harga maksimum ke atas lebihan: lebihan pengeluar <b>berkurang</b> kerana harga dan kuantiti dijual lebih rendah. Lebihan pengguna berubah bergantung kepada keuntungan daripada harga lebih rendah berbanding kehilangan kerana kuantiti yang dapat dibeli terhad kepada Q₂.</p>
<figure data-graf="keseimbangan" data-opt='{"preset":"kawalan","tajuk":"Dasar harga maksimum dan minimum: daging kambing","data":{"a":70,"b":2,"c":10,"d":1,"x":[0,40],"y":[0,75],"tikX":[0,5,10,15,20,25,30,35,40],"tikY":[0,10,20,30,40,50,60,70],"labelX":"Kuantiti (kg)","labelY":"Harga (RM/kg)","hargaAwal":24,"pMin":12,"pMaks":68,"anjak":5,"unitQ":"kg"}}'></figure>

<div class="kotak contoh"><span class="kotak-label">Panduan menjawab · Bahagian C</span>
<p>Permintaan daging kambing import P = 70 − 2Q; penawaran P = 10 + Q (P dalam RM/kg, Q dalam kg).</p>
<div class="kira">
<div class="baris">(a) 70 − 2Q = 10 + Q → 3Q = 60 → Q = 20 kg; P = 70 − 2(20) = RM30</div>
<div class="baris">(b) Lebihan pengguna = ½ × 20 × (70 − 30) = RM400</div>
<div class="baris">(c)(i) Cukai RM3/kg: 70 − 2Q = 13 + Q → Q = 19 kg; P = 70 − 2(19) = RM32</div>
<div class="baris">(c)(ii) Lebihan pengguna baharu = ½ × 19 × (70 − 32) = RM361</div>
<div class="baris jawapan">Perubahan = RM361 − RM400 = −RM39: lebihan pengguna berkurang</div>
</div></div>
`
    }
  ],
  kad: [
    { d: "Maksud <b>permintaan</b>", b: "Kesanggupan dan kemampuan pengguna untuk membeli sejumlah barang tertentu pada tingkat harga tertentu dalam tempoh masa tertentu.", t: "2.1" },
    { d: "Maksud <b>penawaran</b>", b: "Kesanggupan dan kemampuan pengeluar untuk menawarkan sejumlah barang tertentu pada tingkat harga tertentu dalam tempoh masa tertentu.", t: "2.2" },
    { d: "<b>Hukum permintaan</b> dan <b>hukum penawaran</b>", b: "Permintaan: harga naik, kuantiti diminta turun (hubungan songsang). Penawaran: harga naik, kuantiti ditawar naik (hubungan langsung).", t: "2.1" },
    { d: "Bentuk umum <b>fungsi permintaan</b> dan <b>penawaran</b>", b: "Qd = a − bP dan Qs = a + bP. Nilai a dan b dicari dengan persamaan serentak daripada dua titik jadual.", t: "2.1" },
    { d: "Beza <b>perubahan kuantiti diminta</b> dan <b>perubahan permintaan</b>", b: "Perubahan kuantiti diminta: akibat harga barang itu sendiri, pergerakan di sepanjang keluk. Perubahan permintaan: akibat faktor lain, keluk beralih.", t: "2.1" },
    { d: "Harga marjerin naik: kesan ke atas permintaan <b>mentega</b>", b: "Barang pengganti. Permintaan mentega bertambah, keluk DD mentega beralih ke kanan.", t: "2.1" },
    { d: "Harga kereta naik: kesan ke atas permintaan <b>petrol</b>", b: "Barang penggenap. Permintaan petrol berkurang, keluk DD petrol beralih ke kiri.", t: "2.1" },
    { d: "Maksud <b>penawaran bertanding</b> dan <b>penawaran bersama</b>", b: "Bertanding: tambahan satu barang mengurangkan penawaran barang lain (getah dan kelapa sawit). Bersama: dikeluarkan serentak (daging dan kulit kambing).", t: "2.2" },
    { d: "Faktor yang menganjak keluk <b>penawaran</b>", b: "Harga barang lain, harga input, bilangan pengeluar, teknologi, dasar kerajaan (cukai, subsidi), jangkaan harga masa depan.", t: "2.2" },
    { d: "Syarat <b>keseimbangan pasaran</b>", b: "Qd = Qs, iaitu keluk permintaan pasaran bersilang dengan keluk penawaran pasaran.", t: "2.3" },
    { d: "Keseimbangan bagi Qd = 100 − 4P dan Qs = 50 + P", b: "100 − 4P = 50 + P → P = RM10, Q = 60 unit.", t: "2.3" },
    { d: "Bila berlaku <b>lebihan permintaan</b> dan <b>lebihan penawaran</b>?", b: "Lebihan permintaan: harga di bawah harga keseimbangan (Qd > Qs). Lebihan penawaran: harga di atas harga keseimbangan (Qs > Qd).", t: "2.3" },
    { d: "DD bertambah dan SS bertambah dengan kadar yang <b>sama</b>", b: "Harga tetap, kuantiti keseimbangan bertambah.", t: "2.3" },
    { d: "DD bertambah dan SS berkurang dengan kadar yang <b>sama</b>", b: "Harga naik, kuantiti keseimbangan tidak berubah.", t: "2.3" },
    { d: "Maksud <b>lebihan pengguna</b>", b: "Perbezaan antara harga yang sanggup dibayar dengan harga pasaran yang sebenar dibayar.", t: "2.4" },
    { d: "Maksud <b>lebihan pengeluar</b>", b: "Perbezaan antara harga yang sanggup dijual dengan harga pasaran yang sebenar diterima.", t: "2.4" },
    { d: "Rumus lebihan pengguna (rajah)", b: "½ × kuantiti keseimbangan × (pintasan harga keluk DD − harga keseimbangan).", t: "2.4" },
    { d: "Rumus <b>Ed</b>", b: "Ed = (Q₁ − Q₀)/Q₀ × P₀/(P₁ − P₀).", t: "2.5" },
    { d: "Nilai dan bentuk keluk bagi permintaan <b>anjal</b> dan <b>tidak anjal</b>", b: "Anjal: Ed > 1, keluk landai. Tidak anjal: Ed < 1, keluk curam.", t: "2.5" },
    { d: "Keluk <b>anjal sempurna</b> dan <b>tidak anjal sempurna</b>", b: "Anjal sempurna: mendatar (∞). Tidak anjal sempurna: tegak, selari dengan paksi harga (0).", t: "2.5" },
    { d: "Lima penentu keanjalan <b>permintaan</b> harga", b: "Barang pengganti, nisbah perbelanjaan kepada pendapatan, kegunaan barang, jangka masa, kepentingan barang.", t: "2.5" },
    { d: "Lima penentu keanjalan <b>penawaran</b>", b: "Kadar pertambahan kos, bekalan input, faktor pengeluaran khusus, jangka masa pengeluaran, bilangan firma.", t: "2.6" },
    { d: "Harga naik bagi permintaan <b>anjal</b>: kesan ke atas TR", b: "TR berkurang (contoh RM100 → RM60). Bagi permintaan tidak anjal, TR bertambah.", t: "2.5" },
    { d: "Tafsiran nilai <b>Ec</b>", b: "Positif: barang pengganti. Negatif: barang penggenap. Sifar: tiada kaitan.", t: "2.5" },
    { d: "Tafsiran nilai <b>Ey</b> (modul)", b: "0 < Ey ≤ 1: normal. Ey > 1: mewah. Ey = 0: mesti. Ey < 0: bawahan.", t: "2.5" },
    { d: "Kesan <b>cukai</b> tak langsung ke atas pasaran", b: "Kos naik, SS ke kiri, harga naik, kuantiti turun; beban dikongsi pengguna dan pengeluar; lebihan pengguna dan pengeluar berkurang.", t: "2.7" },
    { d: "Kesan <b>subsidi</b> ke atas pasaran", b: "Kos turun, SS ke kanan, harga turun, kuantiti naik; faedah dikongsi pengguna dan pengeluar; kedua-dua lebihan bertambah.", t: "2.7" },
    { d: "<b>Harga maksimum</b>: maksud dan kesan", b: "Ditetapkan di bawah harga pasaran; wujud lebihan permintaan yang perlu ditampung kerajaan.", t: "2.7" },
    { d: "<b>Harga minimum</b>: maksud dan kesan", b: "Ditetapkan di atas harga pasaran; wujud lebihan penawaran yang perlu dibeli kerajaan.", t: "2.7" },
    { d: "Daging kambing: P = 70 − 2Q, P = 10 + Q, cukai RM3/kg", b: "Asal: RM30, 20 kg, lebihan pengguna RM400. Selepas cukai: RM32, 19 kg, lebihan pengguna RM361 (berkurang RM39).", t: "2.7" }
  ],
  kuiz: []
});
