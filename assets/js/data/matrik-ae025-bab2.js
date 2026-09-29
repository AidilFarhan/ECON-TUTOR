/* =========================================================
   Matrikulasi · AE025 Makroekonomi · Bab 2 · Perakaunan Pendapatan Negara
   Sumber: slaid kuliah AE025 "bab 2 Perakaunan Pendapatan Negara" (155 slaid)
   ========================================================= */
EKO.daftarBab({
  id: "m2-b2",
  peringkat: "matrik",
  tingkatan: 2,
  no: 2,
  tajuk: "Perakaunan Pendapatan Negara",
  warna: "var(--bab-rm5)",
  ringkas:
    "Pendapatan negara ialah jumlah nilai barang akhir dan perkhidmatan yang dikeluarkan dalam setahun. Bab ini merangkumi konsep asas keluaran negara, pendapatan nominal dan benar, tiga kaedah pengiraan (teori dan amalan Malaysia), pendapatan persendirian, pendapatan boleh guna dan per kapita, serta masalah, kegunaan dan kelemahan data pendapatan negara.",
  seksyen: [
    {
      no: "2.0",
      tajuk: "Konsep Asas Keluaran Negara",
      soalan: [
        "Apakah beza KDNK, KNK dan KNB?",
        "Mengapakah harga pasaran berbeza daripada kos faktor?",
        "Mengapakah hanya nilai barang akhir atau nilai ditambah dikira?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Pendapatan negara</span><p>Jumlah nilai barang akhir dan perkhidmatan yang dikeluarkan dalam sesebuah negara untuk suatu tempoh, biasanya setahun. Ia diukur dalam wang kerana sukar menjumlahkan barang mengikut unit fizikal. <b>Barang akhir</b> ialah barang yang tidak melalui proses pengeluaran lagi dan digunakan terus oleh pengguna.</p></div>
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">KDNK</span><p>Keluaran Dalam Negeri Kasar: nilai barang akhir dan perkhidmatan yang dikeluarkan <b>di dalam</b> negara dalam setahun oleh faktor pengeluaran milik warganegara <b>atau bukan warganegara</b>.</p></div>
  <div class="kotak def"><span class="kotak-label">KNK</span><p>Keluaran Negara Kasar: nilai barang akhir dan perkhidmatan yang dikeluarkan oleh faktor pengeluaran <b>milik negara itu sahaja</b>, sama ada di dalam atau di luar negara.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Pendapatan faktor bersih luar negeri (PFBLN)</span><div class="rumus-baris">PFBLN = PFDLN − PFKLN</div><div class="rumus-baris">KNK = KDNK + PFBLN</div><p>PFDLN (penerimaan faktor dari luar negeri): pendapatan faktor milik negara yang bekerja di luar negeri, contoh gaji warganegara di luar negara dan pelaburan Petronas di luar negara. PFKLN (pembayaran faktor ke luar negeri): pendapatan faktor asing di dalam negara, contoh gaji pekerja asing dan keuntungan pelaburan asing. PFBLN negatif jika PFDLN &lt; PFKLN.</p></div>
<h3>Harga pasaran dan kos faktor</h3>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">Harga pasaran = kos faktor + cukai tak langsung (CTL) − subsidi</div><div class="rumus-baris">KDNKhp = KDNKkf + CTL − subsidi &nbsp; KNKhp = KNKkf + CTL − subsidi</div></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">CTL: komputer riba</span><p>Kos pengeluaran (kos faktor) RM4 000, harga pasaran RM6 000. Beza RM2 000 ialah CTL. Harga pasaran mengandungi CTL; kos faktor belum.</p></div>
  <div class="kotak contoh"><span class="kotak-label">Subsidi: baja kimia</span><p>Kos pengeluaran RM400 seguni, dijual RM300. Beza RM100 ialah subsidi kerajaan. Harga pasaran telah ditolak subsidi, maka lebih rendah daripada kos faktor.</p></div>
</div>
<h3>Konsep lain</h3>
<div class="jadual"><table><caption>Istilah penting</caption>
<thead><tr><th>Konsep</th><th>Maksud</th></tr></thead>
<tbody>
<tr><td>KNB</td><td>Keluaran Negara Bersih = KNK − susut nilai. Susut nilai ialah pengurangan nilai aset tetap selepas digunakan. <b>KNBkf</b> dikenali sebagai pendapatan negara (PN).</td></tr>
<tr><td>Pelaburan kasar</td><td>I kasar = I bersih + susut nilai. Kaedah perbelanjaan menggunakan pelaburan kasar.</td></tr>
<tr><td>Perubahan inventori</td><td>Stok akhir tahun − stok awal tahun. Dicampur jika positif, ditolak jika negatif.</td></tr>
<tr><td>Bunga bersih</td><td>Bunga yang tidak termasuk bunga atas pinjaman pengguna dan bunga atas pinjaman kerajaan, kerana kedua-duanya tidak menyumbang kepada keluaran.</td></tr>
<tr><td>Untung syarikat</td><td>Terdiri daripada cukai keuntungan syarikat, untung tak diagihkan (pendapatan tertahan) dan untung diagihkan (dividen).</td></tr>
</tbody></table></div>
<h3>Nilai ditambah</h3>
<p>Nilai ditambah ialah peningkatan nilai barang selepas melalui satu peringkat pengeluaran.</p>
<div class="grid-2">
  <div class="jadual"><table><caption>Industri tekstil sutera (RM)</caption>
  <thead><tr><th>Keluaran</th><th class="n">Nilai keluaran</th><th class="n">Nilai ditambah</th></tr></thead>
  <tbody><tr><td>Ulat sutera</td><td class="n">12 000</td><td class="n">12 000</td></tr><tr><td>Benang sutera</td><td class="n">18 000</td><td class="n">6 000</td></tr><tr><td>Kain sutera</td><td class="n">28 000</td><td class="n">10 000</td></tr><tr><td>Busana sutera</td><td class="n">41 000</td><td class="n">13 000</td></tr><tr><td><b>Jumlah</b></td><td class="n">Barang akhir 41 000</td><td class="n"><b>41 000</b></td></tr></tbody></table></div>
  <div class="jadual"><table><caption>Roti dengan gandum import (RM)</caption>
  <thead><tr><th>Keluaran</th><th class="n">Nilai keluaran</th><th class="n">Nilai ditambah</th></tr></thead>
  <tbody><tr><td>Gandum (import)</td><td class="n">12 000</td><td class="n">0</td></tr><tr><td>Tepung gandum</td><td class="n">18 000</td><td class="n">6 000</td></tr><tr><td>Roti</td><td class="n">28 000</td><td class="n">10 000</td></tr><tr><td><b>Jumlah</b></td><td class="n">Barang akhir 28 000</td><td class="n"><b>16 000</b></td></tr></tbody></table></div>
</div>
<div class="kotak tip"><span class="kotak-label">Mengapa nilai ditambah?</span><p>Hanya nilai barang akhir atau jumlah nilai ditambah dikira untuk <b>mengelakkan pengiraan dua kali</b>. Tanpa input import, jumlah nilai ditambah = nilai barang akhir. Dengan input import, jumlah nilai ditambah = nilai barang akhir − nilai import (RM28 000 − RM12 000 = RM16 000).</p></div>

<h3>Pendapatan nominal dan pendapatan benar</h3>
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Nominal (harga semasa)</span><p>Dikira pada harga tahun semasa; dipengaruhi perubahan kuantiti <b>dan</b> perubahan tingkat harga.</p></div>
  <div class="kotak def"><span class="kotak-label">Benar (harga tetap)</span><p>Dikira pada harga tahun asas; hanya dipengaruhi perubahan kuantiti keluaran.</p></div>
</div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Guna IHP</span><div class="kira"><div class="baris">KNK benar = IHP₀/IHP₁ × KNK nominal</div><div class="baris">= 100/122 × RM40 bilion</div><div class="baris jawapan">= RM32.79 bilion</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Guna pendeflasi KNK</span><div class="kira"><div class="baris">KNK benar = KNK nominal ÷ pendeflasi × 100</div><div class="baris">= RM40 bilion ÷ 121.99 × 100</div><div class="baris jawapan">= RM32.79 bilion</div></div></div>
</div>
<p>KNK benar lebih rendah kerana kesan kenaikan harga pada tahun semasa telah disingkirkan.</p>
<figure data-graf="kdnk-benar"></figure>
`
    },
    {
      no: "2.1",
      tajuk: "Kaedah Pengiraan Pendapatan Negara",
      soalan: [
        "Apakah tiga kaedah mengira pendapatan negara?",
        "Bagaimanakah KDNKhp ditukar kepada KNBkf?",
        "Apakah beza pengiraan secara teori dan amalan Malaysia?"
      ],
      html: `
<p>Ketiga-tiga kaedah memberi nilai yang sama kerana jumlah nilai keluaran sama dengan jumlah perbelanjaan, dan sama dengan jumlah pendapatan yang diterima faktor pengeluaran.</p>
<h3>(a) Kaedah perbelanjaan</h3>
<div class="kotak rumus"><span class="kotak-label">Kaedah perbelanjaan</span><div class="rumus-baris">KDNKhp = C + I + G + (X − M)</div><p>C: perbelanjaan penggunaan (swasta); I: pelaburan kasar atau pembentukan modal tetap swasta (barang modal, bangunan, pertambahan stok); G: perbelanjaan kerajaan (mengurus = penggunaan awam, pembangunan = pelaburan awam); X − M: eksport bersih.</p></div>
<div class="aliran"><span>KDNKhp</span><i>− CTL + subsidi →</i><span>KDNKkf</span><i>+ PFBLN →</i><span>KNKkf</span><i>− susut nilai →</i><span>KNBkf (PN)</span></div>
<div class="grid-2">
  <div class="jadual"><table><caption>Secara teori (RM juta)</caption>
  <thead><tr><th>Butiran</th><th class="n">RM juta</th></tr></thead>
  <tbody>
  <tr><td>C</td><td class="n">4 500</td></tr><tr><td>G</td><td class="n">700</td></tr><tr><td>I kasar</td><td class="n">800</td></tr><tr><td>X − M (1 600 − 1 400)</td><td class="n">200</td></tr>
  <tr><td><b>KDNKhp</b></td><td class="n"><b>6 200</b></td></tr>
  <tr><td>− CTL</td><td class="n">(500)</td></tr><tr><td>+ Subsidi</td><td class="n">200</td></tr>
  <tr><td><b>KDNKkf</b></td><td class="n"><b>5 900</b></td></tr>
  <tr><td>+ PFBLN (1 000 − 800)</td><td class="n">200</td></tr>
  <tr><td><b>KNKkf</b></td><td class="n"><b>6 100</b></td></tr>
  <tr><td>− Susut nilai</td><td class="n">(90)</td></tr>
  <tr><td><b>KNBkf</b></td><td class="n"><b>6 010</b></td></tr>
  </tbody></table></div>
  <div class="kotak info"><span class="kotak-label">Secara aplikasi (amalan Malaysia)</span><p>Butiran sama tetapi ditambah <b>perubahan inventori</b> (contoh +100), maka KDNKhp = 6 300 dan KDNKkf = 6 000. Di Malaysia, KDNK dan KNK dianggap sebagai pendapatan negara kerana PFBLN yang besar (negatif) akan menjadikan nilai KNB kecil.</p></div>
</div>
<div class="jadual"><table><caption>KDNKhp Malaysia 2000 mengikut kaedah perbelanjaan (harga semasa, RM juta)</caption>
<thead><tr><th>Butiran</th><th class="n">RM juta</th></tr></thead>
<tbody>
<tr><td>Perbelanjaan penggunaan awam</td><td class="n">36 854</td></tr>
<tr><td>Perbelanjaan penggunaan swasta</td><td class="n">143 650</td></tr>
<tr><td>Pembentukan modal tetap kasar awam</td><td class="n">39 469</td></tr>
<tr><td>Pembentukan modal tetap kasar swasta</td><td class="n">40 746</td></tr>
<tr><td>Perubahan dalam stok</td><td class="n">1 592</td></tr>
<tr><td>Eksport bersih (419 266 − 356 415)</td><td class="n">62 851</td></tr>
<tr><td><b>KDNKhp</b></td><td class="n"><b>325 162</b></td></tr>
<tr><td>Pendapatan faktor bersih luar negeri</td><td class="n">−25 627</td></tr>
<tr><td><b>KNKhp</b></td><td class="n"><b>299 535</b></td></tr>
</tbody></table></div>
<p class="teks-lemah">Sumber data: Laporan Ekonomi 2000/2001 (seperti dalam modul).</p>

<h3>(b) Kaedah keluaran (nilai ditambah)</h3>
<p>Menjumlahkan nilai barang akhir atau nilai ditambah semua sektor untuk mengelakkan pengiraan dua kali. Sektor peringkat pertama (pertanian, perikanan, penternakan, perhutanan, perlombongan), kedua (perkilangan, pembinaan) dan ketiga (perkhidmatan). Jumlah nilai keluaran sektor memberi <b>KDNKkf</b>.</p>
<div class="grid-2">
  <div class="jadual"><table><caption>Secara teori (RM juta)</caption>
  <thead><tr><th>Sektor</th><th class="n">RM juta</th></tr></thead>
  <tbody>
  <tr><td>Pertanian, perikanan, penternakan, perhutanan</td><td class="n">2 300</td></tr>
  <tr><td>Perlombongan dan kuari</td><td class="n">1 500</td></tr>
  <tr><td>Perkilangan</td><td class="n">2 800</td></tr>
  <tr><td>Pembinaan</td><td class="n">1 300</td></tr>
  <tr><td>Elektrik, gas dan air</td><td class="n">180</td></tr>
  <tr><td>Pengangkutan, penyimpanan, perhubungan</td><td class="n">120</td></tr>
  <tr><td>Perdagangan borong, runcit, hotel, restoran</td><td class="n">800</td></tr>
  <tr><td>Kewangan, insurans, hartanah</td><td class="n">320</td></tr>
  <tr><td>Perkhidmatan kerajaan</td><td class="n">200</td></tr>
  <tr><td>Perkhidmatan lain</td><td class="n">110</td></tr>
  <tr><td><b>KDNKkf</b></td><td class="n"><b>9 630</b></td></tr>
  <tr><td>+ PFBLN (1 000 − 900)</td><td class="n">100</td></tr>
  <tr><td><b>KNKkf</b></td><td class="n"><b>9 730</b></td></tr>
  <tr><td>− Susut nilai</td><td class="n">(80)</td></tr>
  <tr><td><b>KNBkf</b></td><td class="n"><b>9 650</b></td></tr>
  </tbody></table></div>
  <div class="kotak info"><span class="kotak-label">Secara aplikasi</span><p>Tolak <b>bayaran perkhidmatan bank</b> (contoh 150) kerana telah dikira dalam nilai keluaran sektor lain dan sekali lagi dalam sektor kewangan (pengiraan dua kali). Campur <b>duti import</b> (contoh 200) kerana ia cukai tak langsung yang tidak termasuk dalam nilai keluaran sektor. Hasilnya dalam sebutan <b>KDNKhp</b>: 9 630 − 150 + 200 = <b>9 680</b>.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 101 (KDNKhp Malaysia 2000 pada harga tetap 1987) memberi jumlah RM201 943 juta. Jumlah butiran sektor dalam slaid itu ialah RM216 855 juta; tolak bayaran perkhidmatan bank RM14 432 juta dan campur cukai import RM4 920 juta memberi <b>RM207 343 juta</b>. Sila rujuk Laporan Ekonomi asal sebelum menggunakan angka ini.</p></div>

<h3>(c) Kaedah pendapatan</h3>
<p>Menjumlahkan pendapatan semua faktor: upah dan gaji (termasuk caruman KWSP), sewa, bunga bersih, untung syarikat dan pendapatan perusahaan persendirian (milikan tunggal, perkongsian, koperasi). Hasilnya terus <b>KNBkf</b> (pendapatan negara). Bayaran pindahan seperti pencen, biasiswa, bantuan kebajikan, elaun dan hadiah <b>tidak</b> dikira kerana tidak produktif.</p>
<div class="jadual"><table><caption>Kaedah pendapatan (RM juta)</caption>
<thead><tr><th>Butiran</th><th class="n">RM juta</th></tr></thead>
<tbody><tr><td>Upah dan gaji</td><td class="n">3 000</td></tr><tr><td>Bunga</td><td class="n">800</td></tr><tr><td>Sewa</td><td class="n">300</td></tr><tr><td>Keuntungan syarikat</td><td class="n">5 500</td></tr><tr><td>Pendapatan perusahaan persendirian</td><td class="n">550</td></tr><tr><td><b>KNBkf = PN</b></td><td class="n"><b>10 150</b></td></tr></tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Catatan pada slaid 94 memecahkan keuntungan syarikat kepada cukai 280, untung tak diagih 420 dan untung diagih 600 (jumlah 1 300), serta menolak bunga atas pinjaman pengguna (170) dan kerajaan (300). Angka ini <b>tidak selari</b> dengan jadual (keuntungan syarikat 5 500, bunga 800). Gunakan catatan itu sebagai contoh komponen sahaja, bukan pecahan jadual di atas.</p></div>
`
    },
    {
      no: "2.1.4",
      tajuk: "Pendapatan Persendirian, Boleh Guna dan Per Kapita",
      soalan: ["Bagaimanakah pendapatan persendirian diperoleh daripada pendapatan negara?", "Mengapakah pendapatan per kapita benar digunakan untuk mengukur taraf hidup?"],
      html: `
<div class="kotak def"><span class="kotak-label">Pendapatan persendirian (PP)</span><p>Jumlah pendapatan yang diterima semua individu dalam setahun, sama ada sebagai bayaran faktor atau tidak (bayaran pindahan).</p></div>
<div class="kotak rumus"><span class="kotak-label">Daripada PN kepada PP</span><div class="rumus-baris">PP = PN − KWSP − cukai keuntungan syarikat − untung tak diagihkan + bunga atas pinjaman kerajaan + bunga atas pinjaman pengguna + bayaran pindahan</div><p>Untung tak diagihkan dan cukai keuntungan syarikat tidak dibayar kepada individu, maka ditolak. Caruman KWSP tidak boleh digunakan selagi belum dikeluarkan.</p></div>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Pendapatan boleh guna (PBG)</span><div class="rumus-baris">PBG = PP − cukai pendapatan persendirian − insurans − zakat</div><p>PBG digunakan untuk penggunaan (C) dan tabungan (S).</p></div>
  <div class="kotak rumus"><span class="kotak-label">Pendapatan per kapita</span><div class="rumus-baris">Per kapita = KNK ÷ jumlah penduduk</div><div class="rumus-baris">Per kapita benar = KNK benar ÷ jumlah penduduk</div><p>Per kapita nominal dipengaruhi harga; per kapita benar lebih tepat mengukur taraf hidup.</p></div>
</div>
`
    },
    {
      no: "2.2",
      tajuk: "Masalah Pengiraan Pendapatan Negara",
      soalan: ["Apakah masalah yang timbul semasa mengira pendapatan negara?"],
      html: `
<div class="jadual"><table><caption>Masalah pengiraan</caption>
<thead><tr><th>Masalah</th><th>Huraian</th></tr></thead>
<tbody>
<tr><td>Pengumpulan data</td><td>Di negara membangun, data kegiatan ekonomi tidak direkod dengan sempurna, maka taksiran kasar terpaksa dibuat.</td></tr>
<tr><td>Pengiraan dua kali</td><td>Sukar memisahkan barang perantaraan daripada barang akhir kerana dipasarkan bersama.</td></tr>
<tr><td>Kegiatan produktif tidak dikira</td><td>Kegiatan haram (dadah, pasaran gelap) tidak dikira; keluaran yang tidak dipasarkan (ekonomi sara diri, tukar barang) juga tidak dikira.</td></tr>
<tr><td>Kegiatan tidak dibayar dengan wang</td><td>Kerja suri rumah dan gotong-royong yang dibalas dengan makanan atau bantuan tidak diambil kira.</td></tr>
<tr><td>Susut nilai</td><td>Sukar menganggar kadar susut nilai setiap barang modal dengan tepat.</td></tr>
<tr><td>Perkhidmatan kerajaan</td><td>Perkhidmatan pertahanan dan keselamatan dibiayai pinjaman yang faedahnya dianggap tidak produktif, maka timbul konflik sama ada perkhidmatan itu patut dikira.</td></tr>
<tr><td>Indeks harga pengguna</td><td>Sukar memilih tahun asas, barang yang mewakili penggunaan masyarakat dan nilai wajaran.</td></tr>
</tbody></table></div>
`
    },
    {
      no: "2.3–2.4",
      tajuk: "Kegunaan dan Kelemahan Data Pendapatan Negara",
      soalan: ["Apakah kegunaan data pendapatan negara?", "Mengapakah pendapatan negara lemah sebagai ukuran taraf hidup antara masa dan antara negara?"],
      html: `
<div class="grid-2">
  <div class="kad-mini"><b>2.3 Kegunaan</b><p>(1) Mengukur kadar pertumbuhan ekonomi. (2) Mengukur keluaran pelbagai sektor. (3) Asas perancangan dan ramalan ekonomi. (4) Petunjuk perubahan struktur ekonomi. (5) Membandingkan taraf hidup antara masa dan antara negara melalui pendapatan per kapita benar.</p></div>
  <div class="kad-mini"><b>2.4 Kelemahan</b><p>Data pendapatan negara tidak menggambarkan sepenuhnya taraf hidup kerana faktor-faktor di bawah.</p></div>
</div>
<div class="jadual"><table><caption>Kelemahan sebagai pengukur taraf hidup</caption>
<thead><tr><th>Faktor</th><th>Antara masa</th><th>Antara negara</th></tr></thead>
<tbody>
<tr><td>Perubahan tingkat harga umum</td><td>PN naik kerana harga naik, bukan kerana keluaran bertambah; taraf hidup tidak meningkat</td><td>Negara maju mempunyai tingkat harga dan pendapatan tinggi; negara kurang maju sebaliknya</td></tr>
<tr><td>Kualiti barang</td><td>Kualiti meningkat menaikkan taraf hidup tetapi tidak tergambar dalam PN</td><td>–</td></tr>
<tr><td>Komposisi keluaran</td><td>–</td><td>Negara maju membelanjakan sebahagian besar untuk ketenteraan; negara membangun untuk barang pengguna dan modal</td></tr>
<tr><td>Corak agihan pendapatan</td><td>PN naik tetapi hanya dinikmati segelintir rakyat</td><td>Negara A pendapatan tinggi tetapi agihan tidak setara; negara B pendapatan lebih rendah tetapi agihan setara: taraf hidup B lebih tinggi</td></tr>
<tr><td>Masa rehat dan bekerja</td><td>Masa rehat bertambah menurunkan PN tetapi kebajikan meningkat</td><td>Masa kerja panjang: PN tinggi tetapi kebajikan rendah</td></tr>
</tbody></table></div>
`
    }
  ],
  kad: [
    { d: "Beza <b>KDNK</b> dan <b>KNK</b>", b: "KDNK: keluaran di dalam negara oleh semua faktor. KNK: keluaran oleh faktor milik negara sahaja, di dalam atau luar negara. KNK = KDNK + PFBLN.", t: "2.0" },
    { d: "Rumus <b>PFBLN</b>", b: "PFBLN = penerimaan faktor dari luar negeri − pembayaran faktor ke luar negeri.", t: "2.0" },
    { d: "Tukar harga pasaran kepada kos faktor", b: "Kos faktor = harga pasaran − CTL + subsidi.", t: "2.0" },
    { d: "Rumus <b>KNB</b>", b: "KNB = KNK − susut nilai. KNBkf ialah pendapatan negara.", t: "2.0" },
    { d: "Mengapa bunga atas pinjaman pengguna dan kerajaan tidak dikira?", b: "Tidak menyumbang kepada keluaran negara (tidak produktif).", t: "2.0" },
    { d: "Nilai ditambah roti dengan gandum import (RM12 000, tepung RM18 000, roti RM28 000)", b: "RM28 000 − RM12 000 = RM16 000.", t: "2.0" },
    { d: "KNK benar: nominal RM40 bilion, IHP 122", b: "100/122 × RM40 bilion = RM32.79 bilion.", t: "2.0" },
    { d: "Rumus kaedah <b>perbelanjaan</b>", b: "KDNKhp = C + I + G + (X − M).", t: "2.1" },
    { d: "Urutan penukaran KDNKhp kepada KNBkf", b: "KDNKhp − CTL + subsidi = KDNKkf; + PFBLN = KNKkf; − susut nilai = KNBkf.", t: "2.1" },
    { d: "Beza kaedah perbelanjaan secara teori dan aplikasi Malaysia", b: "Aplikasi menambah perubahan inventori.", t: "2.1" },
    { d: "Pelarasan kaedah keluaran (aplikasi)", b: "Tolak bayaran perkhidmatan bank (elak pengiraan dua kali), campur duti import (cukai tak langsung). Hasil: KDNKhp.", t: "2.1" },
    { d: "Lima butiran kaedah <b>pendapatan</b>", b: "Upah dan gaji, sewa, bunga bersih, untung syarikat, pendapatan perusahaan persendirian.", t: "2.1" },
    { d: "Mengapa bayaran pindahan tidak dikira dalam PN?", b: "Tidak produktif, iaitu tidak membantu meningkatkan keluaran negara. Namun ia dikira dalam pendapatan persendirian.", t: "2.1" },
    { d: "Rumus <b>PBG</b>", b: "PBG = PP − cukai pendapatan persendirian − insurans − zakat.", t: "2.1.4" },
    { d: "Mengapa per kapita <b>benar</b> lebih baik?", b: "Tidak dipengaruhi perubahan harga, maka lebih tepat mengukur taraf hidup.", t: "2.1.4" },
    { d: "Tiga masalah pengiraan pendapatan negara", b: "Contoh: pengumpulan data, pengiraan dua kali, kegiatan produktif tidak dikira atau tidak dibayar dengan wang.", t: "2.2" },
    { d: "Kelemahan PN antara negara: agihan pendapatan", b: "Negara berpendapatan tinggi tetapi agihan tidak setara mungkin bertaraf hidup lebih rendah daripada negara berpendapatan sederhana yang agihannya setara.", t: "2.4" }
  ],
  kuiz: []
});
