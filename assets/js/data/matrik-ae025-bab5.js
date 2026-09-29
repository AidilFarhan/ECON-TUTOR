/* =========================================================
   Matrikulasi · AE025 Makroekonomi · Bab 5 · Inflasi dan Pengangguran
   Sumber: slaid kuliah AE025 "BAB 5.1 Inflasi" (37 slaid) dan
           "BAB 5.2 Pengangguran" (32 slaid, termasuk 5.3 Keluk Phillips)
   ========================================================= */
EKO.daftarBab({
  id: "m2-b5",
  peringkat: "matrik",
  tingkatan: 2,
  no: 5,
  tajuk: "Inflasi dan Pengangguran",
  warna: "var(--bab-rm50)",
  ringkas:
    "Inflasi ialah kenaikan tingkat harga umum secara berterusan, manakala pengangguran ialah tenaga buruh yang gagal mendapat pekerjaan. Bab ini merangkumi IHP, kadar inflasi dan indeks nilai wang, jenis, kesan dan langkah mengatasi inflasi, konsep tenaga buruh dan kadar pengangguran, jenis, kesan dan langkah mengurangkan pengangguran, serta keluk Phillips dan stagflasi.",
  seksyen: [
    {
      no: "5.1.1–5.1.3",
      tajuk: "Inflasi, IHP dan Kadar Inflasi",
      soalan: ["Apakah maksud inflasi dan indeks harga pengguna?", "Bagaimanakah kadar inflasi dan upah benar dikira?"],
      html: `
<div class="kotak def"><span class="kotak-label">Inflasi</span><p>Kenaikan tingkat harga umum secara berterusan dan tidak terbatas: "terlalu banyak wang mengejar terlalu sedikit barang". Inflasi yang dapat dikawal kerajaan ialah <b>inflasi tertekan</b>; yang gagal dikawal ialah <b>inflasi terbuka</b>.</p></div>
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Indeks harga pengguna (IHP)</span><p>Indeks yang mengukur perubahan harga purata sekumpulan barang dan perkhidmatan yang mewakili corak perbelanjaan isi rumah, berbanding satu tahun asas.</p></div>
  <div class="kotak def"><span class="kotak-label">Tahun asas</span><p>Tahun permulaan perbandingan yang harganya stabil, bernilai 100. Malaysia pernah menggunakan tahun 1980, 1990, 1994 dan 2000.</p></div>
</div>
<div class="grid-2">
  <div class="jadual"><table><caption>IHP Malaysia (2000 = 100)</caption>
  <thead><tr><th>Tahun</th><th class="n">IHP</th></tr></thead>
  <tbody><tr><td>1999</td><td class="n">98.5</td></tr><tr><td>2000</td><td class="n">100.0</td></tr><tr><td>2001</td><td class="n">101.4</td></tr><tr><td>2002</td><td class="n">103.2</td></tr><tr><td>2003</td><td class="n">104.4</td></tr><tr><td>2004</td><td class="n">105.9</td></tr><tr><td>2005</td><td class="n">108.4</td></tr></tbody></table></div>
  <div class="kad-mini"><b>Kegunaan IHP</b><p>(1) Mengukur kadar inflasi. (2) Mengukur nilai wang. (3) Mengukur pendapatan negara benar dan pertumbuhan ekonomi. (4) Menentukan upah benar. (5) Panduan perancangan ekonomi.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Kadar inflasi</span><div class="rumus-baris">= (IHP₁ − IHP₀) ÷ IHP₀ × 100</div><p>IHP₁ = tahun semasa; IHP₀ = tahun sebelum.</p></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Kadar inflasi 2002</span><div class="kira"><div class="baris">(103.2 − 101.4) ÷ 101.4 × 100</div><div class="baris jawapan">= 1.78%</div></div><p>Tingkat harga umum naik 1.78% berbanding tahun sebelumnya.</p></div>
  <div class="kotak contoh"><span class="kotak-label">Upah benar 2002 (upah nominal RM3 200)</span><div class="kira"><div class="baris">Upah benar = upah nominal ÷ IHP × 100</div><div class="baris">= 3 200 ÷ 103.2 × 100</div><div class="baris jawapan">= RM3 100.78</div></div></div>
</div>
<figure data-graf="ihp"></figure>
`
    },
    {
      no: "5.1.3",
      tajuk: "Nilai Wang dan Indeks Nilai Wang",
      soalan: ["Apakah hubungan antara tingkat harga dengan nilai wang?"],
      html: `
<div class="kotak def"><span class="kotak-label">Nilai wang</span><p>Jumlah barang yang dapat dibeli dengan satu unit mata wang, iaitu <b>kuasa beli</b> wang. Nilai wang meningkat apabila kuasa beli meningkat.</p></div>
<div class="kotak rumus"><span class="kotak-label">Indeks nilai wang (INW)</span><div class="rumus-baris">INW tahun semasa = indeks harga tahun asas ÷ indeks harga tahun semasa × 100</div><div class="rumus-baris">Perubahan nilai wang = (INW semasa − INW asas) ÷ INW asas × 100</div></div>
<div class="kotak contoh"><span class="kotak-label">Contoh: indeks harga 2000 = 100, 2003 = 120</span><div class="kira">
  <div class="baris">INW 2003 = 100 ÷ 120 × 100 = 83.33</div>
  <div class="baris">Perubahan = (83.33 − 100) ÷ 100 × 100</div>
  <div class="baris jawapan">Nilai wang 2003 jatuh 16.67% berbanding tahun asas</div></div></div>
<div class="kotak fokus"><span class="kotak-label">Hubungan songsang</span><p>Semakin tinggi tingkat harga, semakin sedikit barang yang dapat dibeli, maka nilai wang semakin rendah. Jika IHP menjadi 200 (harga naik 100%), nilai wang jatuh 50%. Jika IHP menjadi 50 (harga turun 50%), nilai wang naik 100%.</p></div>
<div class="kotak contoh"><span class="kotak-label">Latihan modul: IHP 2000 = 100, 2001 = 110, 2002 = 125 (jawapan dikira)</span><div class="kira">
  <div class="baris">Kadar inflasi 2001 = (110 − 100) ÷ 100 × 100 = 10%</div>
  <div class="baris">Kadar inflasi 2002 = (125 − 110) ÷ 110 × 100 = 13.64%</div>
  <div class="baris">INW 2001 = 100 ÷ 110 × 100 = 90.91; INW 2002 = 100 ÷ 125 × 100 = 80</div>
  <div class="baris jawapan">Nilai wang jatuh 9.09% (2001) dan 20% (2002) berbanding tahun asas</div></div></div>
`
    },
    {
      no: "5.1.4–5.1.7",
      tajuk: "Jenis, Kesan dan Langkah Mengatasi Inflasi",
      soalan: ["Apakah tiga jenis inflasi dan puncanya?", "Siapakah yang untung dan rugi semasa inflasi?", "Bagaimanakah inflasi tolakan kos diatasi?"],
      html: `
<div class="jadual"><table><caption>Jenis inflasi</caption>
<thead><tr><th>Jenis</th><th>Definisi</th><th>Punca</th></tr></thead>
<tbody>
<tr><td><b>Tarikan permintaan</b></td><td>Harga umum naik akibat kenaikan AD yang berterusan tanpa pertambahan AS yang setara</td><td>Bekalan wang bertambah; C, I, G atau (X − M) bertambah; cukai diturunkan</td></tr>
<tr><td><b>Tolakan kos</b></td><td>Harga umum naik akibat kenaikan kos pengeluaran: AS berkurang</td><td>Kenaikan upah, untung firma dan kos bahan mentah</td></tr>
<tr><td><b>Import</b></td><td>Harga umum naik akibat kenaikan harga input atau barang import</td><td>Negara pengeksport mengalami inflasi atau nilai mata wang asing naik</td></tr>
</tbody></table></div>
<figure data-graf="ad-as"></figure>
<div class="grid-2">
  <div class="kad-mini"><b>Kesan positif</b><p><b>Dalaman</b>: inflasi sederhana (merayap) menggalakkan pelaburan, guna tenaga dan pendapatan negara. <b>Luaran</b>: jika permintaan eksport tidak anjal, nilai eksport bertambah. Contoh: Px naik RM5 → RM10, Qx turun 10 000 → 8 000 unit, nilai eksport naik RM50 000 → RM80 000.</p></div>
  <div class="kad-mini"><b>Kesan negatif</b><p><b>Dalaman</b>: pendapatan benar berkurang, kos hidup naik, firma kurang cekap terpaksa tutup (tolakan kos dan import). <b>Luaran</b>: import bertambah, imbangan pembayaran dan kadar pertukaran terjejas, pelaburan asing dan modal jangka pendek berkurang.</p></div>
  <div class="kad-mini"><b>Golongan untung</b><p>Pemilik harta tetap, pemilik saham dan peniaga.</p></div>
  <div class="kad-mini"><b>Golongan rugi</b><p>Berpendapatan tetap, pendeposit di institusi kewangan dan pemiutang.</p></div>
</div>
<div class="kotak fokus"><span class="kotak-label">5.1.6 Langkah mengatasi inflasi tolakan kos (kawalan langsung)</span><p>(a) <b>Kawalan upah</b>: had kenaikan upah tidak melebihi kenaikan daya pengeluaran buruh. (b) <b>Kawalan harga barang pengguna</b>: harga maksimum di bawah harga pasaran bagi barang kawalan. (c) <b>Kawalan harga bahan mentah</b>: harga maksimum bahan mentah penting. (d) <b>Mengurangkan cukai import</b> ke atas input dan barang akhir.</p></div>
<div class="jadual"><table><caption>5.1.7 Kadar inflasi Malaysia (%)</caption>
<thead><tr><th>Tahun</th><th class="n">2000</th><th class="n">2001</th><th class="n">2002</th><th class="n">2003</th></tr></thead>
<tbody><tr><td>Kadar inflasi</td><td class="n">1.52</td><td class="n">1.40</td><td class="n">1.78</td><td class="n">1.16</td></tr></tbody></table></div>
<p>Inflasi Malaysia turun naik dalam julat yang sempit, pada kadar yang menggalakkan pertumbuhan.</p>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 37 memberi kadar inflasi 2003 sebagai 0.97%. Mengikut IHP dalam slaid yang sama (2002 = 103.2, 2003 = 104.4), kadarnya ialah (104.4 − 103.2) ÷ 103.2 × 100 = <b>1.16%</b>.</p></div>
`
    },
    {
      no: "5.2",
      tajuk: "Penduduk, Guna Tenaga dan Pengangguran",
      soalan: ["Siapakah yang termasuk dalam tenaga buruh?", "Bagaimanakah kadar pengangguran dikira?", "Apakah jenis, kesan dan langkah mengatasi pengangguran?"],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Tenaga buruh</span><p>Penduduk berumur 15–64 tahun yang sanggup dan mampu bekerja serta bersedia mencari kerja. Tenaga buruh = guna tenaga + penganggur (TL = TW + TO).</p></div>
  <div class="kotak def"><span class="kotak-label">Bukan tenaga buruh</span><p>Kanak-kanak bawah 15 tahun, penduduk melebihi 64 tahun, suri rumah sepenuh masa, pelajar dan golongan kurang upaya.</p></div>
</div>
<div class="kotak def"><span class="kotak-label">Pengangguran</span><p>Keadaan apabila penduduk yang sanggup dan mampu bekerja tidak mendapat pekerjaan pada kadar upah yang dikehendaki.</p></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">Kadar pengangguran = penganggur ÷ tenaga buruh × 100</div><div class="rumus-baris">Kadar penyertaan guna tenaga = guna tenaga ÷ tenaga buruh × 100</div><div class="rumus-baris">Kadar penyertaan tenaga buruh = tenaga buruh ÷ penduduk × 100</div></div>
<div class="jadual"><table><caption>Latihan modul (juta orang): penganggur dan kadar pengangguran dikira</caption>
<thead><tr><th>Tahun</th><th class="n">Tenaga buruh</th><th class="n">Guna tenaga</th><th class="n">Penganggur</th><th class="n">Kadar pengangguran</th></tr></thead>
<tbody>
<tr><td>1998</td><td class="n">8.85</td><td class="n">8.58</td><td class="n">0.27</td><td class="n">3.05%</td></tr>
<tr><td>1999</td><td class="n">9.18</td><td class="n">8.87</td><td class="n">0.31</td><td class="n">3.38%</td></tr>
<tr><td>2000</td><td class="n">9.57</td><td class="n">9.28</td><td class="n">0.29</td><td class="n">3.03%</td></tr>
<tr><td>2001</td><td class="n">9.90</td><td class="n">9.54</td><td class="n">0.36</td><td class="n">3.64%</td></tr>
<tr><td>2002</td><td class="n">10.20</td><td class="n">9.85</td><td class="n">0.35</td><td class="n">3.43%</td></tr>
</tbody></table></div>
<div class="jadual"><table><caption>Pengangguran di Malaysia 2001–2005 (juta orang)</caption>
<thead><tr><th>Butiran</th><th class="n">2001</th><th class="n">2002</th><th class="n">2003</th><th class="n">2004</th><th class="n">2005</th></tr></thead>
<tbody>
<tr><td>Tenaga buruh</td><td class="n">9.67</td><td class="n">9.89</td><td class="n">10.24</td><td class="n">10.59</td><td class="n">10.93</td></tr>
<tr><td>Guna tenaga</td><td class="n">9.35</td><td class="n">9.54</td><td class="n">9.89</td><td class="n">10.22</td><td class="n">10.55</td></tr>
<tr><td>Penganggur</td><td class="n">0.32</td><td class="n">0.35</td><td class="n">0.35</td><td class="n">0.37</td><td class="n">0.38</td></tr>
<tr><td>Kadar pengangguran (%)</td><td class="n">3.31</td><td class="n">3.52</td><td class="n">3.42</td><td class="n">3.35</td><td class="n">3.37</td></tr>
</tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Jadual slaid 11 (sumber Perbendaharaan) tidak konsisten: contohnya bagi 2005, 10.97 − 10.54 = 0.43 juta, bukan 0.35 juta. Jadual slaid 27 di atas konsisten (tenaga buruh − guna tenaga = penganggur) dan digunakan dalam nota ini. Kadar pengangguran rasmi dikira daripada data belum dibundarkan, maka mungkin berbeza sedikit jika dikira semula daripada angka juta di atas.</p></div>
<div class="jadual"><table><caption>5.2.3 Jenis pengangguran</caption>
<thead><tr><th>Jenis</th><th>Punca dan ciri</th></tr></thead>
<tbody>
<tr><td>Geseran (normal, semula jadi)</td><td>Maklumat dan mobiliti buruh tidak sempurna; sementara, contohnya menunggu kerja yang lebih baik atau lepasan pengajian</td></tr>
<tr><td>Kitaran</td><td>Kejatuhan AD: firma mengurangkan keluaran dan buruh. Dikategorikan dalam modul sebagai jangka panjang</td></tr>
<tr><td>Struktur</td><td>Perubahan struktur ekonomi, contoh dari pertanian ke perindustrian; buruh kurang kemahiran yang diperlukan. Jangka panjang</td></tr>
<tr><td>Teknologi</td><td>Tenaga manusia diganti mesin, robot dan komputer, terutama buruh kurang mahir</td></tr>
<tr><td>Bermusim</td><td>Perubahan musim, contoh penoreh getah dan nelayan semasa musim tengkujuh; sementara</td></tr>
<tr><td>Tak ketara (tersembunyi)</td><td>Buruh yang digunakan melebihi keperluan sebenar, biasanya dalam pertanian di negara berpenduduk pesat</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kad-mini"><b>5.2.4 Kesan pengangguran</b><p><b>Ekonomi</b>: pembaziran sumber, KNK benar lebih rendah daripada KNK potensi, taraf hidup menurun, kemiskinan meningkat. <b>Sosial</b>: jenayah, perpecahan keluarga, keluarga miskin bertambah, masalah kesihatan mental.</p></div>
  <div class="kad-mini"><b>5.2.5 Langkah mengurangkan pengangguran</b><p>(a) Mobiliti buruh (geseran). (b) Latihan kemahiran dan latihan semula (struktur, teknologi, bermusim). (c) Sebarkan maklumat pasaran buruh (geseran). (d) Lengahkan kemasukan ke pasaran buruh (geseran). (e) Bendung tuntutan kesatuan sekerja (geseran, kitaran). (f) Galak industri intensif buruh (teknologi, struktur). (g) Wujudkan peluang pekerjaan (semua jenis). (h) Galak pelaburan asing (semua jenis).</p></div>
</div>
<figure data-graf="pengangguran"></figure>
`
    },
    {
      no: "5.3",
      tajuk: "Hubungan Inflasi dengan Pengangguran",
      soalan: ["Apakah yang ditunjukkan oleh keluk Phillips?", "Mengapakah stagflasi bertentangan dengan keluk Phillips?"],
      html: `
<div class="kotak def"><span class="kotak-label">5.3.1 Keluk Phillips</span><p>Kajian ahli ekonomi British A.W. Phillips mendapati hubungan <b>songsang</b> antara kadar inflasi dengan kadar pengangguran: apabila inflasi tinggi, pengangguran rendah, dan sebaliknya.</p></div>
<figure data-graf="carta-jadual" data-opt='{"tajuk":"Keluk Phillips","namaX":"Pengangguran","unitX":"%","dpX":0,"dp":1,"nilaiX":[2,3,4,5,6],"xAwal":2,"notaLalai":"Pengangguran lebih tinggi berpasangan dengan inflasi lebih rendah.","nota":{"2":"Pengangguran 2%, inflasi 5% (titik dalam rajah modul).","6":"Pengangguran 6%, inflasi 2% (titik dalam rajah modul)."},"panel":[{"labelX":"Kadar pengangguran (%)","labelY":"Kadar inflasi (%)","x":[0,7],"y":[0,6],"tikX":[0,1,2,3,4,5,6,7],"tikY":[0,1,2,3,4,5,6],"siri":[{"id":"ph","nama":"Inflasi","label":"Keluk Phillips","kelas":"d","unit":"%","data":[[2,5],[3,3.8],[4,3],[5,2.4],[6,2]],"dxLabel":-40,"dyLabel":-14}]}]}'></figure>
<p class="teks-lemah">Titik (2%, 5%) dan (6%, 2%) daripada rajah modul; titik di antaranya ialah nilai contoh untuk melukis bentuk keluk.</p>
<div class="kotak def"><span class="kotak-label">5.3.2 Stagflasi</span><p>Keadaan apabila pengangguran <b>dan</b> tingkat harga umum meningkat serentak. Ia bertentangan dengan keluk Phillips kerana wujud hubungan <b>langsung</b> antara kadar pengangguran dengan kadar inflasi.</p></div>
<div class="kotak fokus"><span class="kotak-label">Rajah stagflasi</span><p>Keseimbangan asal di A (AD = AS₀) pada keluaran guna tenaga penuh dan harga P₀. Penawaran agregat berkurang dari AS₀ ke AS₁: keseimbangan bergerak ke B, harga naik ke P₁ (inflasi) manakala keluaran negara benar turun ke Y₁ (pengangguran meningkat).</p></div>
`
    }
  ],
  kad: [
    { d: "Definisi <b>inflasi</b>", b: "Kenaikan tingkat harga umum secara berterusan dan tidak terbatas.", t: "5.1.1" },
    { d: "Beza inflasi <b>tertekan</b> dan <b>terbuka</b>", b: "Tertekan: dapat dikawal kerajaan. Terbuka: gagal dikawal.", t: "5.1.1" },
    { d: "Lima kegunaan <b>IHP</b>", b: "Mengukur inflasi, nilai wang, pendapatan negara benar dan pertumbuhan, upah benar, dan panduan perancangan ekonomi.", t: "5.1.2" },
    { d: "Kadar inflasi 2002 (IHP 101.4 → 103.2)", b: "1.78%.", t: "5.1.3" },
    { d: "Rumus <b>indeks nilai wang</b>", b: "INW = indeks harga tahun asas ÷ indeks harga tahun semasa × 100.", t: "5.1.3" },
    { d: "INW jika indeks harga 120", b: "100/120 × 100 = 83.33: nilai wang jatuh 16.67%.", t: "5.1.3" },
    { d: "Tiga jenis inflasi", b: "Tarikan permintaan (AD naik), tolakan kos (AS berkurang), import (harga barang import naik).", t: "5.1.4" },
    { d: "Golongan yang <b>rugi</b> semasa inflasi", b: "Berpendapatan tetap, pendeposit dan pemiutang.", t: "5.1.5" },
    { d: "Langkah kawalan langsung inflasi tolakan kos", b: "Kawalan upah, kawalan harga barang pengguna, kawalan harga bahan mentah, kurangkan cukai import.", t: "5.1.6" },
    { d: "Siapa yang termasuk <b>tenaga buruh</b>?", b: "Penduduk 15–64 tahun yang sanggup, mampu dan bersedia bekerja: guna tenaga + penganggur.", t: "5.2.1" },
    { d: "Rumus <b>kadar penyertaan tenaga buruh</b>", b: "Tenaga buruh ÷ penduduk × 100.", t: "5.2.2" },
    { d: "Maksud pengangguran <b>geseran</b>", b: "Pengangguran sementara akibat maklumat dan mobiliti buruh tidak sempurna, contohnya menunggu kerja yang lebih baik.", t: "5.2.3" },
    { d: "Maksud pengangguran <b>struktur</b>", b: "Akibat perubahan struktur ekonomi; buruh tidak mempunyai kemahiran yang diperlukan sektor baharu.", t: "5.2.3" },
    { d: "Maksud pengangguran <b>tak ketara</b>", b: "Buruh yang digunakan melebihi keperluan sebenar, biasanya dalam sektor pertanian.", t: "5.2.3" },
    { d: "Langkah untuk pengangguran <b>geseran</b>", b: "Meningkatkan mobiliti buruh, menyebarkan maklumat pasaran buruh, melengahkan kemasukan ke pasaran buruh.", t: "5.2.5" },
    { d: "Maksud <b>keluk Phillips</b>", b: "Hubungan songsang antara kadar inflasi dengan kadar pengangguran (A.W. Phillips).", t: "5.3.1" },
    { d: "Maksud <b>stagflasi</b>", b: "Inflasi dan pengangguran meningkat serentak akibat AS berkurang; hubungan langsung, bertentangan dengan keluk Phillips.", t: "5.3.2" }
  ],
  kuiz: []
});
