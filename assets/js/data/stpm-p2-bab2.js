/* =========================================================
   STPM Penggal 2 · Bab 2 · Perakaunan Pendapatan Negara
   Sumber: Modul PdP Ekonomi P2 Makroekonomi, Bab 2
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p2-b2",
  peringkat: "stpm",
  tingkatan: 2,
  no: 2,
  tajuk: "Perakaunan Pendapatan Negara",
  warna: "var(--bab-rm5)",
  ringkas:
    "Pendapatan negara diukur melalui konsep KDNK, KNK, harga pasaran, kos faktor, nominal dan benar. Bab ini merangkumi kaedah keluaran dan kaedah perbelanjaan, masalah penghitungan, kegunaan data serta batasannya untuk membandingkan taraf hidup.",
  seksyen: [
    {
      no: "2.1",
      tajuk: "Konsep Pendapatan Negara",
      soalan: [
        "Apakah beza KDNK dengan KNK, harga pasaran dengan kos faktor, dan nominal dengan benar?",
        "Mengapakah pertumbuhan ekonomi tidak semestinya meningkatkan taraf hidup?"
      ],
      html: `
<div class="jadual"><table><caption>Konsep pendapatan negara</caption>
<thead><tr><th>Konsep</th><th>Maksud</th><th>Hubungan</th></tr></thead>
<tbody>
<tr><td><b>KDNK</b></td><td>Nilai barang dan perkhidmatan akhir yang dikeluarkan <b>dalam sesebuah negara</b> dalam setahun oleh faktor milik negara itu atau milik asing</td><td rowspan="2">KNK = KDNK + PFBLN<br>PFBLN = penerimaan pendapatan faktor dari luar negeri − pembayaran pendapatan faktor ke luar negeri</td></tr>
<tr><td><b>KNK</b></td><td>Nilai barang dan perkhidmatan akhir yang dikeluarkan dalam setahun oleh <b>faktor milik negara</b>, di dalam dan di luar negara</td></tr>
<tr><td><b>KNK<sub>hp</sub></b></td><td>Dihitung pada <b>harga pasaran</b>, iaitu harga yang dibayar pembeli</td><td rowspan="2">KNK<sub>hp</sub> = KNK<sub>kf</sub> + CTL − subsidi<br>KNK<sub>kf</sub> = KNK<sub>hp</sub> − CTL + subsidi</td></tr>
<tr><td><b>KNK<sub>kf</sub></b></td><td>Dihitung berdasarkan <b>bayaran kepada faktor</b> pengeluaran</td></tr>
<tr><td><b>KNK nominal</b></td><td>Dihitung pada harga <b>tahun semasa</b></td><td rowspan="2">KNK benar = <span class="pecahan"><span>IHP tahun asas</span><span>IHP tahun semasa</span></span> × KNK nominal</td></tr>
<tr><td><b>KNK benar</b></td><td>Dihitung pada harga <b>tahun asas</b> (harga tetap)</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kad-mini"><b>Tafsiran PFBLN</b><p>PFBLN positif: KNK &gt; KDNK. PFBLN negatif: KDNK &gt; KNK (biasa di negara membangun yang banyak menggunakan pelaburan dan pekerja asing).</p></div>
  <div class="kad-mini"><b>Tafsiran indeks harga</b><p>IHP tahun semasa &lt; 100: KNK benar &gt; KNK nominal. IHP &gt; 100: KNK benar &lt; KNK nominal.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Pendapatan per kapita</span><div class="rumus-baris">Pendapatan per kapita = <span class="pecahan"><span>Pendapatan negara</span><span>Jumlah penduduk</span></span></div><p>Digunakan untuk menentukan taraf hidup. Pertumbuhan ekonomi tidak menjamin taraf hidup meningkat kerana bergantung juga kepada <b>kadar pertumbuhan penduduk</b> (mesti lebih rendah daripada kadar pertumbuhan ekonomi) dan <b>corak agihan pendapatan</b> (lebih setara lebih baik).</p></div>
<figure data-graf="kdnk-benar"></figure>
<div class="jadual"><table><caption>Panduan menjawab · Bahagian C: KNK Malaysia (IHP 2007 = 100)</caption>
<thead><tr><th>Tahun</th><th class="n">KNK nominal (RM juta)</th><th class="n">IHP</th><th class="n">KNK benar (RM juta)</th><th class="n">Pertumbuhan nominal (%)</th><th class="n">Pertumbuhan benar (%)</th></tr></thead>
<tbody>
<tr><td>2011</td><td class="n">267 922</td><td class="n">155.1</td><td class="n">172 741.46</td><td class="n">–</td><td class="n">–</td></tr>
<tr><td>2012</td><td class="n">279 452</td><td class="n">155.5</td><td class="n">179 711.90</td><td class="n">4.30</td><td class="n">4.04</td></tr>
<tr><td>2013</td><td class="n">312 152</td><td class="n">164.0</td><td class="n">190 336.59</td><td class="n">11.70</td><td class="n">5.91</td></tr>
</tbody></table></div>
<p>Pada 2013, kadar pertumbuhan nominal (11.70%) jauh melebihi kadar pertumbuhan benar (5.91%) kerana sebahagian pertambahan KNK nominal disebabkan oleh kenaikan harga (IHP naik dari 155.5 ke 164.0), bukan pertambahan keluaran.</p>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Kadar pertumbuhan dikira semula daripada data jadual. Cadangan jawapan dalam modul asal menunjukkan nilai 2012 pada baris 2013 dan nilai lain yang tidak sepadan dengan data.</p></div>
`
    },
    {
      no: "2.2",
      tajuk: "Kaedah Penghitungan Pendapatan Negara",
      soalan: [
        "Bagaimanakah KDNK dihitung melalui kaedah keluaran dan kaedah perbelanjaan?",
        "Bagaimanakah konsep nilai ditambah mengelakkan pengiraan dua kali?",
        "Apakah masalah dalam menghitung pendapatan negara?"
      ],
      html: `
<h3>(i) Kaedah keluaran</h3>
<p>KDNK<sub>hp</sub> diperoleh dengan menjumlahkan <b>nilai ditambah</b> semua sektor ekonomi dalam setahun, ditambah cukai import.</p>
<div class="jadual"><table><caption>Contoh kaedah keluaran</caption>
<thead><tr><th>Sektor</th><th>Butiran</th><th class="n">RM juta</th></tr></thead>
<tbody>
<tr><td rowspan="2">Utama</td><td>Pertanian, perhutanan dan perikanan</td><td class="n">500</td></tr>
<tr><td>Perlombongan dan kuari</td><td class="n">100</td></tr>
<tr><td rowspan="2">Kedua</td><td>Pembuatan</td><td class="n">700</td></tr>
<tr><td>Pembinaan</td><td class="n">400</td></tr>
<tr><td rowspan="6">Ketiga</td><td>Elektrik, gas dan air</td><td class="n">600</td></tr>
<tr><td>Pengangkutan dan perhubungan</td><td class="n">500</td></tr>
<tr><td>Perdagangan, hotel dan restoran</td><td class="n">300</td></tr>
<tr><td>Kewangan dan harta tanah</td><td class="n">800</td></tr>
<tr><td>Perkhidmatan kerajaan</td><td class="n">200</td></tr>
<tr><td>Perkhidmatan lain</td><td class="n">100</td></tr>
<tr><td></td><td>(+) Cukai import</td><td class="n">100</td></tr>
<tr><td></td><td><b>KDNK<sub>hp</sub></b></td><td class="n"><b>4 300</b></td></tr>
</tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Jumlah butiran dalam jadual ialah RM4 300 juta; modul asal menulis RM4 100 juta.</p></div>
<div class="kotak def"><span class="kotak-label">Nilai ditambah</span><p>Tambahan nilai terhadap sesuatu keluaran setelah melalui proses pengeluaran. Contoh: kayu balak diproses menjadi kerusi.</p></div>
<div class="jadual"><table><caption>Contoh nilai ditambah: kerusi</caption>
<thead><tr><th>Peringkat</th><th class="n">Kos input (RM)</th><th class="n">Harga jualan (RM)</th><th class="n">Nilai ditambah (RM)</th></tr></thead>
<tbody>
<tr><td>Kayu balak</td><td class="n">0</td><td class="n">100</td><td class="n">100</td></tr>
<tr><td>Papan</td><td class="n">100</td><td class="n">150</td><td class="n">50</td></tr>
<tr><td>Kerusi</td><td class="n">150</td><td class="n">250</td><td class="n">100</td></tr>
<tr><td>Kedai perabot</td><td class="n">250</td><td class="n">350</td><td class="n">100</td></tr>
<tr><td><b>Jumlah</b></td><td></td><td></td><td class="n"><b>350</b></td></tr>
</tbody></table></div>
<p>Jumlah nilai ditambah (RM350) sama dengan nilai barang akhir. Jika semua nilai jualan dijumlahkan (100 + 150 + 250 + 350 = RM850), berlaku <b>pengiraan dua kali</b>.</p>

<h3>(ii) Kaedah perbelanjaan</h3>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">KDNK<sub>hp</sub> = C + I + G + perubahan stok + (X − M)</div></div>
<div class="jadual"><table><caption>Contoh kaedah perbelanjaan (agregat permintaan Malaysia)</caption>
<thead><tr><th>Butiran</th><th class="n">RM juta</th></tr></thead>
<tbody>
<tr><td>Perbelanjaan penggunaan swasta (C)</td><td class="n">150</td></tr>
<tr><td>Perbelanjaan penggunaan awam (G mengurus)</td><td class="n">100</td></tr>
<tr><td>Pembentukan modal tetap kasar swasta (I)</td><td class="n">300</td></tr>
<tr><td>Pembentukan modal tetap kasar awam (G pembangunan)</td><td class="n">150</td></tr>
<tr><td>Perubahan stok</td><td class="n">20</td></tr>
<tr><td>Eksport barang dan perkhidmatan</td><td class="n">350</td></tr>
<tr><td>(−) Import barang dan perkhidmatan</td><td class="n">150</td></tr>
<tr><td><b>KDNK<sub>hp</sub></b></td><td class="n"><b>920</b></td></tr>
</tbody></table></div>
<p>G = penggunaan awam + pembentukan modal tetap kasar awam = 100 + 150 = 250. Maka KDNK<sub>hp</sub> = 150 + 300 + 250 + 20 + (350 − 150) = RM920 juta.</p>
<figure data-graf="kdnk"></figure>

<h3>Masalah penghitungan pendapatan negara</h3>
<div class="jadual"><table><caption>Lima masalah</caption>
<thead><tr><th>Masalah</th><th>Huraian</th></tr></thead>
<tbody>
<tr><td>Pengumpulan maklumat</td><td>Rekod tidak lengkap dan data berupa anggaran, maka nilai tidak tepat.</td></tr>
<tr><td>Pengiraan dua kali</td><td>Sukar membezakan barang perantaraan dan barang akhir; pendapatan negara terlebih nilai.</td></tr>
<tr><td>Kegiatan produktif tidak dibayar</td><td>Contoh kerja suri rumah, gotong-royong, basuh kereta sendiri, jahit baju sendiri; pendapatan negara terkurang nilai.</td></tr>
<tr><td>Menentukan harga</td><td>Harga berbeza mengikut kawasan dan masa; harga komoditi berubah mengikut pasaran dunia.</td></tr>
<tr><td>Menentukan susut nilai</td><td>Susut nilai = pelaburan kasar − pelaburan bersih; konsep berbeza antara firma dan maklumat tidak lengkap.</td></tr>
</tbody></table></div>
`
    },
    {
      no: "2.3",
      tajuk: "Kegunaan dan Batasan Data Pendapatan Negara",
      soalan: ["Apakah kegunaan data pendapatan negara?", "Mengapakah data pendapatan negara dan per kapita kurang tepat untuk membandingkan taraf hidup?"],
      html: `
<div class="grid-2">
  <div class="kad-mini"><b>Mengukur taraf hidup</b><p>Pendapatan per kapita lebih tinggi menunjukkan taraf hidup lebih tinggi.</p></div>
  <div class="kad-mini"><b>Mengukur pertumbuhan ekonomi</b><p>Bandingkan KDNK benar antara tahun; positif bermaksud berkembang, negatif bermaksud meleset.</p></div>
  <div class="kad-mini"><b>Mengukur sumbangan sektor</b><p>Peratus sumbangan dan kadar pertumbuhan setiap sektor kepada KDNK.</p></div>
  <div class="kad-mini"><b>Perubahan struktur ekonomi</b><p>Data siri masa (contoh 5 tahun) menunjukkan peralihan sumbangan sektor.</p></div>
  <div class="kad-mini"><b>Asas perancangan ekonomi</b><p>Data masa kini dan lepas menjadi asas ramalan dan perancangan.</p></div>
</div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Kelemahan: membandingkan dua tempoh</span><ol>
    <li>Perubahan tingkat harga umum</li>
    <li>Perubahan kualiti barang dan perkhidmatan</li>
    <li>Perubahan komposisi keluaran (hospital berbanding senjata)</li>
    <li>Perubahan saiz penduduk</li>
    <li>Perubahan masa rehat</li></ol></div>
  <div class="kotak fokus"><span class="kotak-label">Kelemahan: membandingkan antara negara</span><ol>
    <li>Perbezaan agihan pendapatan</li>
    <li>Perbezaan tingkat guna tenaga</li>
    <li>Perbezaan komposisi keluaran</li>
    <li>Perbezaan tingkat harga umum</li>
    <li>Perbezaan masa kerja dan masa rehat</li></ol></div>
</div>
<div class="kotak contoh"><span class="kotak-label">Panduan menjawab · Nilai ditambah (Bahagian B)</span>
<div class="jadual"><table><thead><tr><th>Aktiviti</th><th class="n">Nilai keluaran (RM)</th><th class="n">Nilai ditambah (RM)</th></tr></thead>
<tbody><tr><td>Membalak</td><td class="n">150</td><td class="n">150</td></tr><tr><td>Menggergaji papan</td><td class="n">280</td><td class="n">130</td></tr><tr><td>Membuat kerusi</td><td class="n">400</td><td class="n">120</td></tr><tr><td>Kedai perabot</td><td class="n">550</td><td class="n">150</td></tr><tr><td><b>Jumlah</b></td><td class="n">1 380</td><td class="n"><b>550</b></td></tr></tbody></table></div>
<p>Jumlah nilai ditambah RM550 sama dengan nilai akhir perabot. Menjumlahkan nilai keluaran (RM1 380) menyebabkan pengiraan dua kali.</p></div>
`
    }
  ],
  kad: [
    { d: "Beza <b>KDNK</b> dan <b>KNK</b>", b: "KDNK: keluaran dalam negara oleh faktor tempatan atau asing. KNK: keluaran oleh faktor milik negara di dalam dan luar negara. KNK = KDNK + PFBLN.", t: "2.1" },
    { d: "Maksud <b>PFBLN</b>", b: "Penerimaan pendapatan faktor dari luar negeri − pembayaran pendapatan faktor ke luar negeri.", t: "2.1" },
    { d: "Mengapa KDNK > KNK di negara membangun?", b: "PFBLN negatif: pembayaran kepada pelabur dan pekerja asing melebihi penerimaan dari luar negeri.", t: "2.1" },
    { d: "Hubungan <b>KNK harga pasaran</b> dan <b>kos faktor</b>", b: "KNKhp = KNKkf + cukai tak langsung − subsidi.", t: "2.1" },
    { d: "Rumus <b>KNK benar</b>", b: "KNK benar = (IHP tahun asas ÷ IHP tahun semasa) × KNK nominal.", t: "2.1" },
    { d: "Dua sebab pertumbuhan ekonomi tidak semestinya menaikkan <b>taraf hidup</b>", b: "Kadar pertumbuhan penduduk dan corak agihan pendapatan.", t: "2.1" },
    { d: "Maksud <b>kaedah keluaran</b>", b: "Menjumlahkan nilai ditambah semua sektor ekonomi dalam setahun, ditambah cukai import.", t: "2.2" },
    { d: "Maksud <b>nilai ditambah</b>", b: "Tambahan nilai terhadap sesuatu keluaran setelah melalui proses pengeluaran.", t: "2.2" },
    { d: "Bagaimana nilai ditambah mengelakkan <b>pengiraan dua kali</b>?", b: "Hanya nilai tambahan di setiap peringkat dikira; jumlahnya sama dengan nilai barang akhir.", t: "2.2" },
    { d: "Rumus <b>kaedah perbelanjaan</b>", b: "KDNKhp = C + I + G + perubahan stok + (X − M).", t: "2.2" },
    { d: "Komponen <b>G</b> dalam kaedah agregat permintaan Malaysia", b: "Perbelanjaan penggunaan awam + pembentukan modal tetap kasar awam.", t: "2.2" },
    { d: "Lima <b>masalah penghitungan</b> pendapatan negara", b: "Pengumpulan maklumat, pengiraan dua kali, kegiatan produktif tidak dibayar, menentukan harga, menentukan susut nilai.", t: "2.2" },
    { d: "Contoh <b>kegiatan produktif tidak dibayar</b>", b: "Kerja suri rumah, gotong-royong, basuh kereta sendiri, guna sendiri hasil tanaman, jahit baju sendiri.", t: "2.2" },
    { d: "Lima <b>kegunaan data</b> pendapatan negara", b: "Mengukur taraf hidup, mengukur pertumbuhan, mengukur sumbangan sektor, menunjukkan perubahan struktur, asas perancangan.", t: "2.3" },
    { d: "Kelemahan pendapatan per kapita untuk banding <b>antara negara</b>", b: "Beza agihan pendapatan, guna tenaga, komposisi keluaran, tingkat harga, masa kerja dan rehat.", t: "2.3" },
    { d: "KNK nominal RM312 152 juta, IHP 164.0 (asas = 100)", b: "KNK benar = 312 152 × 100 ÷ 164 = RM190 336.59 juta.", t: "2.1" }
  ],
  kuiz: []
});
