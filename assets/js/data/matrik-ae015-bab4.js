/* =========================================================
   Matrikulasi · AE015 Mikroekonomi · Bab 4
   Teori Perlakuan Pengguna (Utiliti Kardinal)
   Sumber: slaid kuliah AE015 "Bab 4 Teori Perlakuan Pengguna" (30 slaid)
   ========================================================= */
EKO.daftarBab({
  id: "m1-b4",
  peringkat: "matrik",
  tingkatan: 1,
  no: 4,
  tajuk: "Teori Perlakuan Pengguna (Utiliti Kardinal)",
  warna: "var(--bab-rm20)",
  ringkas:
    "Pendekatan utiliti kardinal menganggap kepuasan boleh diukur dalam unit util. Bab ini merangkumi jumlah utiliti dan utiliti sut, hukum utiliti sut berkurangan, syarat keseimbangan pengguna bagi satu dan dua barang, kesan perubahan harga dan pendapatan, serta terbitan keluk permintaan.",
  seksyen: [
    {
      no: "4.1",
      tajuk: "Konsep Utiliti",
      soalan: ["Apakah maksud utiliti, jumlah utiliti dan utiliti sut?", "Siapakah yang memperkenalkan pendekatan utiliti kardinal?"],
      html: `
<div class="grid-3">
  <div class="kotak def"><span class="kotak-label">Utiliti</span><p>Kepuasan yang diperoleh pengguna daripada penggunaan sesuatu barang atau perkhidmatan.</p></div>
  <div class="kotak def"><span class="kotak-label">Jumlah utiliti (TU)</span><p>Jumlah kepuasan yang diperoleh daripada penggunaan sejumlah barang dan perkhidmatan.</p></div>
  <div class="kotak def"><span class="kotak-label">Utiliti sut (MU)</span><p>Perubahan jumlah utiliti akibat tambahan penggunaan <b>satu unit</b> barang.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Rumus utiliti sut</span><div class="rumus-baris">MU = ΔTU ÷ ΔQ = (TU₁ − TU₀) ÷ (Q₁ − Q₀)</div><p>Contoh: TU naik dari 10 util (1 unit) ke 15 util (2 unit), maka MU unit kedua = 5 util.</p></div>
<div class="kotak info"><span class="kotak-label">4.2 Utiliti kardinal</span><p>Diperkenalkan oleh <b>Alfred Marshall</b>. Pendekatan ini menganggap utiliti (kepuasan) <b>boleh diukur</b> dan dinyatakan dalam unit <b>util</b>.</p></div>
`
    },
    {
      no: "4.2.1(a)–(b)",
      tajuk: "Jumlah Utiliti, Utiliti Sut dan Hukum Utiliti Sut Berkurangan",
      soalan: ["Apakah hukum utiliti sut berkurangan?", "Apakah hubungan antara TU dengan MU?"],
      html: `
<div class="kotak def"><span class="kotak-label">Hukum utiliti sut berkurangan</span><p>Apabila penggunaan sesuatu barang ditambah secara berterusan, <b>tambahan utiliti (MU) semakin berkurangan</b>.</p></div>
<div class="jadual"><table><caption>Jadual 4.1: Hubungan jumlah utiliti dengan utiliti sut (epal)</caption>
<thead><tr><th class="n">Epal (biji)</th><th class="n">0</th><th class="n">1</th><th class="n">2</th><th class="n">3</th><th class="n">4</th><th class="n">5</th><th class="n">6</th><th class="n">7</th><th class="n">8</th></tr></thead>
<tbody>
<tr><td>TU (util)</td><td class="n">0</td><td class="n">30</td><td class="n">50</td><td class="n">60</td><td class="n">65</td><td class="n">68</td><td class="n">68</td><td class="n">65</td><td class="n">60</td></tr>
<tr><td>MU (util)</td><td class="n">–</td><td class="n">30</td><td class="n">20</td><td class="n">10</td><td class="n">5</td><td class="n">3</td><td class="n">0</td><td class="n">−3</td><td class="n">−5</td></tr>
</tbody></table></div>
<figure data-graf="carta-jadual" data-opt='{"tajuk":"Keluk jumlah utiliti dan utiliti sut (Jadual 4.1)","namaX":"Epal","unitX":"biji","dpX":0,"dp":0,"nilaiX":[0,1,2,3,4,5,6,7,8],"xAwal":3,"notaLalai":"TU bertambah tetapi pada kadar yang semakin berkurangan kerana MU sedang menurun (hukum utiliti sut berkurangan).","nota":{"0":"Tiada epal digunakan, maka tiada kepuasan.","1":"Epal pertama memberi MU paling tinggi, 30 util (30 − 0).","2":"MU epal kedua = 50 − 30 = 20 util: lebih kecil daripada epal pertama.","6":"&lt;b&gt;TU maksimum&lt;/b&gt; 68 util pada epal ke-6, dan MU = 0.","7":"&lt;b&gt;TU menurun&lt;/b&gt; MU menjadi negatif (−3 util): epal ke-7 mengurangkan kepuasan.","8":"&lt;b&gt;TU menurun&lt;/b&gt; MU = −5 util."},"panel":[{"labelX":"Epal (biji)","labelY":"Jumlah utiliti, TU (util)","x":[0,8.8],"y":[0,80],"tikX":[0,1,2,3,4,5,6,7,8],"tikY":[0,20,40,60,80],"siri":[{"id":"tu","nama":"TU","label":"TU","kelas":"d","unit":"util","data":[[0,0],[1,30],[2,50],[3,60],[4,65],[5,68],[6,68],[7,65],[8,60]]}],"teks":[[6,68,"TU maksimum","lemah","middle",0,-12]]},{"labelX":"Epal (biji)","labelY":"Utiliti sut, MU (util)","x":[0,8.8],"y":[-10,35],"tikX":[0,1,2,3,4,5,6,7,8],"tikY":[-10,0,10,20,30],"asalan":false,"paksiXBawah":true,"siri":[{"id":"mu","nama":"MU","label":"MU","kelas":"s","unit":"util","data":[[1,30],[2,20],[3,10],[4,5],[5,3],[6,0],[7,-3],[8,-5]]}],"bulat":[[6,0]],"teks":[[6,0,"MU = 0","","end",-10,-10]]}]}'></figure>
<div class="grid-3">
  <div class="kad-mini"><b>TU naik</b><p>MU bernilai positif.</p></div>
  <div class="kad-mini"><b>TU maksimum</b><p>MU = 0 (epal ke-6).</p></div>
  <div class="kad-mini"><b>TU turun</b><p>MU bernilai negatif (epal ke-7 dan ke-8).</p></div>
</div>
<p>Keluk MU mencerun ke bawah dari kiri ke kanan kerana hukum utiliti sut berkurangan, dan memotong paksi kuantiti ketika TU maksimum.</p>
`
    },
    {
      no: "4.2.1(c)",
      tajuk: "Keseimbangan Pengguna",
      soalan: ["Apakah syarat keseimbangan pengguna bagi satu barang dan dua barang?", "Bagaimanakah kombinasi keseimbangan dipilih daripada jadual?"],
      html: `
<div class="kotak def"><span class="kotak-label">Definisi</span><p>Pengguna berada dalam keseimbangan apabila <b>semua pendapatan digunakan</b> dan <b>kepuasan maksimum</b> dicapai.</p></div>
<div class="kotak info"><span class="kotak-label">Andaian</span><p>(1) Pengguna rasional dan cuba memaksimumkan kepuasan. (2) Pengguna membelanjakan semua pendapatan. Dalam contoh modul, nilai 1 util dibandingkan terus dengan RM1.</p></div>

<h3>(a) Kes satu barang</h3>
<div class="kotak rumus"><span class="kotak-label">Syarat keseimbangan</span><div class="rumus-baris">Px = MUx</div></div>
<div class="grid-2">
  <div class="jadual"><table><caption>Px = RM5</caption>
  <thead><tr><th class="n">Kuantiti</th><th class="n">TU</th><th class="n">MU</th></tr></thead>
  <tbody><tr><td class="n">1</td><td class="n">10</td><td class="n">10</td></tr><tr><td class="n">2</td><td class="n">17</td><td class="n">7</td></tr><tr><td class="n">3</td><td class="n">22</td><td class="n">5</td></tr><tr><td class="n">4</td><td class="n">26</td><td class="n">4</td></tr><tr><td class="n">5</td><td class="n">29</td><td class="n">3</td></tr></tbody></table></div>
  <div class="kotak fokus"><span class="kotak-label">Keseimbangan pada unit ke-3</span><p>Pengguna terus membeli selagi MUx &gt; Px kerana setiap unit memberi kepuasan melebihi harganya. Keseimbangan dicapai pada unit ke-3, iaitu <b>Px = MUx = RM5</b>.</p><p>Jika MUx &lt; Px, pengguna mengurangkan penggunaan supaya MUx naik semula sehingga MUx = Px.</p></div>
</div>

<h3>(b) Kes dua barang</h3>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Harga sama</span><div class="rumus-baris">MUx = MUy</div><div class="rumus-baris">Px·X + Py·Y = I</div></div>
  <div class="kotak rumus"><span class="kotak-label">Harga berbeza</span><div class="rumus-baris">MUx/Px = MUy/Py</div><div class="rumus-baris">Px·X + Py·Y = I</div></div>
</div>
<div class="jadual"><table><caption>Utiliti barang X dan Y</caption>
<thead><tr><th class="n">Kuantiti</th><th class="n">TUx</th><th class="n">MUx</th><th class="n">TUy</th><th class="n">MUy</th></tr></thead>
<tbody>
<tr><td class="n">1</td><td class="n">33</td><td class="n">33</td><td class="n">28</td><td class="n">28</td></tr>
<tr><td class="n">2</td><td class="n">57</td><td class="n">24</td><td class="n">52</td><td class="n">24</td></tr>
<tr><td class="n">3</td><td class="n">75</td><td class="n">18</td><td class="n">72</td><td class="n">20</td></tr>
<tr><td class="n">4</td><td class="n">87</td><td class="n">12</td><td class="n">88</td><td class="n">16</td></tr>
<tr><td class="n">5</td><td class="n">95</td><td class="n">8</td><td class="n">100</td><td class="n">12</td></tr>
<tr><td class="n">6</td><td class="n">98</td><td class="n">3</td><td class="n">108</td><td class="n">8</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Harga sama: Px = Py = RM5, I = RM45</span><div class="kira">
    <div class="baris">MUx = MUy pada: 2X + 2Y (24), 4X + 5Y (12), 5X + 6Y (8)</div>
    <div class="baris">Belanja: 2(5) + 2(5) = 20; 4(5) + 5(5) = 45; 5(5) + 6(5) = 55</div>
    <div class="baris jawapan">Keseimbangan: 4 unit X dan 5 unit Y</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Harga berbeza: Px = RM3, Py = RM2, I = RM19</span><div class="kira">
    <div class="baris">MUx/Px: 11, 8, 6, 4, 2.67, 1</div>
    <div class="baris">MUy/Py: 14, 12, 10, 8, 6, 4</div>
    <div class="baris">Sama pada: 2X + 4Y (8), 3X + 5Y (6), 4X + 6Y (4)</div>
    <div class="baris">Belanja: 2(3) + 4(2) = 14; 3(3) + 5(2) = 19; 4(3) + 6(2) = 24</div>
    <div class="baris jawapan">Keseimbangan: 3 unit X dan 5 unit Y</div></div></div>
</div>
<div class="kotak tip"><span class="kotak-label">Tip menjawab</span><p>Dua syarat mesti dipenuhi serentak. Kombinasi yang hanya memenuhi syarat utiliti tetapi tidak menghabiskan (atau melebihi) pendapatan bukan keseimbangan.</p></div>
`
    },
    {
      no: "4.2.1(d)",
      tajuk: "Kesan Perubahan Harga dan Pendapatan",
      soalan: ["Apakah yang berlaku kepada keseimbangan apabila harga X jatuh?", "Apakah kesan kenaikan pendapatan?"],
      html: `
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Harga X jatuh</span><p>Jika penggunaan tidak berubah, MUx/Px &gt; MUy/Py: pengguna tidak lagi dalam keseimbangan. Pengguna menambah penggunaan X; mengikut hukum utiliti sut berkurangan MUx merosot sehingga keseimbangan baharu <b>MUx/Px = MUy/Py</b> dicapai.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Pendapatan berubah</span><p>Pendapatan bertambah: pengguna mampu membeli lebih banyak X dan Y sehingga keseimbangan baharu Px·X + Py·Y = I₁. Pendapatan merosot: penggunaan X dan Y dikurangkan.</p></div>
</div>
`
    },
    {
      no: "4.2.1(e)",
      tajuk: "Terbitan Keluk Permintaan",
      soalan: ["Bagaimanakah keluk DD diterbitkan daripada syarat keseimbangan pengguna?"],
      html: `
<div class="kotak info"><span class="kotak-label">Andaian</span><p>Pengguna membeli barang A dan B sahaja. PA = RM3, PB = RM4, pendapatan RM20. Pada keseimbangan asal pengguna membeli 4 unit A (MUA = 24) dan 2 unit B (MUB = 32): 24/3 = 32/4 = 8, dan 4(3) + 2(4) = RM20.</p></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">PA jatuh ke RM2</span><div class="kira">
    <div class="baris">MUA/PA = 24/2 = 12 &gt; MUB/PB = 8</div>
    <div class="baris">Pengguna membeli lebih banyak A sehingga MUA = 16</div>
    <div class="baris">16/2 = 32/4 = 8, pada 6 unit A</div>
    <div class="baris">Belanja: 6(2) + 2(4) = RM20</div>
    <div class="baris jawapan">PA = RM2 → 6 unit A</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">PA naik ke RM6</span><div class="kira">
    <div class="baris">MUA/PA = 24/6 = 4 &lt; MUB/PB = 8</div>
    <div class="baris">Pengguna mengurangkan A sehingga MUA = 48</div>
    <div class="baris">48/6 = 32/4 = 8, pada 2 unit A</div>
    <div class="baris">Belanja: 2(6) + 2(4) = RM20</div>
    <div class="baris jawapan">PA = RM6 → 2 unit A</div></div></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 29 menulis perbelanjaan selepas PA naik sebagai "2 × RM6 + 4 × RM4 = RM20". Barang B kekal 2 unit, maka perbelanjaannya ialah <b>2 × RM6 + 2 × RM4 = RM20</b> (4 × RM4 memberi RM28). Rajah slaid 30 pula melabelkan harga RM4 pada paksi; harga asal barang A ialah <b>RM3</b> (4 unit).</p></div>
<figure data-graf="carta-jadual" data-opt='{"tajuk":"Keluk permintaan barang A yang diterbitkan","namaX":"Kuantiti A","unitX":"unit","dpX":0,"dp":0,"nilaiX":[2,4,6],"xAwal":4,"nota":{"2":"PA naik ke RM6: MUA/PA &lt; MUB/PB, maka pengguna mengurangkan A kepada 2 unit.","4":"Keseimbangan asal: PA = RM3, 4 unit A.","6":"PA jatuh ke RM2: MUA/PA &gt; MUB/PB, maka pengguna menambah A kepada 6 unit."},"panel":[{"labelX":"Kuantiti barang A (unit)","labelY":"Harga barang A (RM)","x":[0,7.5],"y":[0,7.5],"tikX":[0,1,2,3,4,5,6,7],"tikY":[0,1,2,3,4,5,6,7],"siri":[{"id":"dd","nama":"Harga A","label":"DD","kelas":"d","data":[[2,6],[4,3],[6,2]],"rm":true}]}]}'></figure>
<p><b>Kesimpulan:</b> PA naik, kuantiti diminta A jatuh; PA jatuh, kuantiti diminta A naik. Hubungan songsang ini digambarkan oleh keluk DD yang bercerun negatif.</p>
`
    }
  ],
  kad: [
    { d: "Maksud <b>utiliti</b>", b: "Kepuasan yang diperoleh pengguna daripada penggunaan barang dan perkhidmatan.", t: "4.1" },
    { d: "Maksud <b>utiliti sut (MU)</b>", b: "Perubahan jumlah utiliti akibat tambahan penggunaan satu unit barang: MU = ΔTU ÷ ΔQ.", t: "4.1" },
    { d: "Siapa memperkenalkan <b>utiliti kardinal</b>?", b: "Alfred Marshall. Utiliti dianggap boleh diukur dalam unit util.", t: "4.2" },
    { d: "<b>Hukum utiliti sut berkurangan</b>", b: "Tambahan penggunaan sesuatu barang secara berterusan menyebabkan MU semakin berkurangan.", t: "4.2.1" },
    { d: "Hubungan TU dan MU", b: "TU naik: MU positif. TU maksimum: MU = 0. TU turun: MU negatif.", t: "4.2.1" },
    { d: "MU epal kedua (TU 30 → 50)", b: "20 util.", t: "4.2.1" },
    { d: "Maksud <b>keseimbangan pengguna</b>", b: "Semua pendapatan dibelanjakan dan kepuasan maksimum dicapai.", t: "4.2.1" },
    { d: "Syarat keseimbangan <b>satu barang</b>", b: "Px = MUx.", t: "4.2.1" },
    { d: "Syarat keseimbangan <b>dua barang, harga berbeza</b>", b: "MUx/Px = MUy/Py dan Px·X + Py·Y = I.", t: "4.2.1" },
    { d: "Keseimbangan Px = Py = RM5, I = RM45 (jadual modul)", b: "4 unit X dan 5 unit Y (MUx = MUy = 12, belanja RM45).", t: "4.2.1" },
    { d: "Keseimbangan Px = RM3, Py = RM2, I = RM19 (jadual modul)", b: "3 unit X dan 5 unit Y (MUx/Px = MUy/Py = 6, belanja RM19).", t: "4.2.1" },
    { d: "Harga X jatuh: tindakan pengguna", b: "MUx/Px > MUy/Py, maka pengguna menambah X sehingga MUx merosot dan keseimbangan baharu dicapai.", t: "4.2.1" },
    { d: "Terbitan DD: PA jatuh RM3 → RM2", b: "Pengguna menambah A dari 4 ke 6 unit (MUA = 16, 16/2 = 32/4).", t: "4.2.1" },
    { d: "Mengapa keluk DD bercerun negatif (utiliti kardinal)?", b: "Harga naik menjadikan MU/P lebih rendah, maka pengguna mengurangkan kuantiti sehingga MU/P kembali sama: hubungan songsang harga dan kuantiti.", t: "4.2.1" }
  ],
  kuiz: []
});
