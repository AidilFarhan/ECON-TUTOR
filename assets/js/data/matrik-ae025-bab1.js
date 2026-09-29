/* =========================================================
   Matrikulasi · AE025 Makroekonomi · Bab 1 · Pengenalan Makroekonomi
   Sumber: slaid kuliah AE025 "BAB 1 Pengenalan Makroekonomi" (45 slaid)
   ========================================================= */
EKO.daftarBab({
  id: "m2-b1",
  peringkat: "matrik",
  tingkatan: 2,
  no: 1,
  tajuk: "Pengenalan Makroekonomi",
  warna: "var(--bab-rm1)",
  ringkas:
    "Makroekonomi mengkaji kegiatan ekonomi secara agregat. Bab ini merangkumi empat pemboleh ubah makroekonomi beserta cara pengiraannya, empat matlamat makroekonomi, dasar-dasar makroekonomi dan aliran pusingan pendapatan dalam ekonomi dua, tiga dan empat sektor.",
  seksyen: [
    {
      no: "1.1",
      tajuk: "Definisi Makroekonomi",
      soalan: ["Apakah yang dikaji dalam makroekonomi?"],
      html: `
<div class="kotak def"><span class="kotak-label">Makroekonomi</span><p>Bidang yang menjelaskan kegiatan ekonomi secara <b>menyeluruh (agregat)</b>, iaitu kegiatan dan interaksi sektor isi rumah, firma, kerajaan dan luar negara yang menentukan tingkat pencapaian ekonomi.</p></div>
<p>Pencapaian ekonomi sesebuah negara diukur melalui beberapa petunjuk: pendapatan negara, guna tenaga dan pengangguran, inflasi, imbangan pembayaran dan pertumbuhan ekonomi.</p>
`
    },
    {
      no: "1.2",
      tajuk: "Pemboleh Ubah Makroekonomi",
      soalan: [
        "Apakah empat pemboleh ubah utama makroekonomi?",
        "Bagaimanakah kadar pertumbuhan, kadar pengangguran dan kadar inflasi dikira?"
      ],
      html: `
<p>Pemboleh ubah makroekonomi ialah data statistik kegiatan ekonomi yang digunakan untuk mengukur prestasi dan kecekapan ekonomi. Empat yang utama: (1) pendapatan negara dan pertumbuhan ekonomi, (2) guna tenaga dan pengangguran, (3) tingkat harga umum dan inflasi, (4) imbangan pembayaran.</p>

<h3>1. Pendapatan negara dan pertumbuhan ekonomi</h3>
<div class="kotak def"><span class="kotak-label">Pendapatan negara</span><p>Jumlah nilai barang akhir dan perkhidmatan yang dikeluarkan oleh sesebuah negara dalam tempoh setahun, atau jumlah pendapatan faktor (sewa, bunga, upah dan gaji, untung) yang diterima dalam tempoh setahun.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>KNK harga semasa dan harga tetap</b><p>Harga semasa: dinilai pada harga pasaran tahun berkenaan. Harga tetap: dinilai pada harga satu tahun asas yang dipilih.</p></div>
  <div class="kad-mini"><b>KNK potensi dan KNK sebenar</b><p>Potensi: keluaran yang sepatutnya dicapai jika semua faktor digunakan sepenuhnya. Sebenar: keluaran yang benar-benar dikeluarkan dalam tahun itu.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Kadar pertumbuhan ekonomi</span><div class="rumus-baris">= (KNK benar₁ − KNK benar₀) ÷ KNK benar₀ × 100%</div><p>KNK benar₁ = tahun semasa; KNK benar₀ = tahun sebelum.</p></div>
<div class="kotak contoh"><span class="kotak-label">Contoh: KNK benar Malaysia (RM juta)</span><div class="kira">
  <div class="baris">2000: 424 295; 2001: 454 625</div>
  <div class="baris">(454 625 − 424 295) ÷ 424 295 × 100%</div>
  <div class="baris jawapan">Kadar pertumbuhan 2001 = 7.15%</div></div></div>

<h3>2. Guna tenaga dan pengangguran</h3>
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Guna tenaga</span><p>Jumlah tenaga buruh yang digunakan oleh pelbagai sektor untuk menghasilkan barang dan perkhidmatan. Tenaga buruh ialah penduduk berumur 15–64 tahun yang bekerja atau aktif mencari kerja, tidak termasuk pelajar, pesara, suri rumah dan penganggur sukarela.</p></div>
  <div class="kotak def"><span class="kotak-label">Pengangguran</span><p>Jumlah tenaga buruh yang tidak digunakan. Kadar pengangguran ialah nisbah penganggur kepada jumlah tenaga buruh pada satu masa.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">Tenaga buruh = guna tenaga + penganggur</div><div class="rumus-baris">Kadar pengangguran = penganggur ÷ tenaga buruh × 100%</div><div class="rumus-baris">Kadar guna tenaga = guna tenaga ÷ tenaga buruh × 100%</div></div>
<div class="jadual"><table><caption>Malaysia ('000 orang)</caption>
<thead><tr><th>Butiran</th><th class="n">2006</th><th class="n">2007</th></tr></thead>
<tbody>
<tr><td>Tenaga buruh</td><td class="n">11 544.5</td><td class="n">11 781.0</td></tr>
<tr><td>Guna tenaga</td><td class="n">11 159.1</td><td class="n">11 409.6</td></tr>
<tr><td>Penganggur = TB − GT</td><td class="n">385.4</td><td class="n">371.4</td></tr>
<tr><td>Kadar pengangguran</td><td class="n">3.34%</td><td class="n">3.15%</td></tr>
<tr><td>Kadar guna tenaga</td><td class="n">96.66%</td><td class="n">96.85%</td></tr>
</tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Jadual penyelesaian slaid 16 menulis rumus kadar guna tenaga dengan pengangka "Jum. Pengangguran", tetapi pengiraannya menggunakan guna tenaga (11 159.1 ÷ 11 544.5). Rumus yang betul ialah <b>guna tenaga ÷ tenaga buruh × 100%</b>.</p></div>
<div class="kotak fokus"><span class="kotak-label">Guna tenaga penuh (GTP)</span><p>Keadaan apabila kadar pengangguran berada <b>pada atau di bawah 4%</b> dan semua faktor pengeluaran digunakan sepenuhnya. Semakin tinggi kadar guna tenaga, semakin rendah pengangguran dan semakin tinggi keluaran negara.</p></div>

<h3>3. Inflasi</h3>
<div class="kotak def"><span class="kotak-label">Inflasi</span><p>Kenaikan tingkat harga umum secara berterusan dan tidak terbatas: "terlalu banyak wang mengejar terlalu sedikit barang". Tingkat harga umum ialah harga purata semua barang dan perkhidmatan dalam negara.</p></div>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Kadar inflasi</span><div class="rumus-baris">= (IHP₁ − IHP₀) ÷ IHP₀ × 100%</div></div>
  <div class="kotak contoh"><span class="kotak-label">Contoh</span><div class="kira"><div class="baris">IHP 2010 = 102.5; IHP 2011 = 103.8</div><div class="baris">(103.8 − 102.5) ÷ 102.5 × 100%</div><div class="baris jawapan">Kadar inflasi 2011 = 1.27%</div></div></div>
</div>
<p>Inflasi menyebabkan nilai wang dan kuasa beli merosot serta kos hidup meningkat, lalu taraf hidup rakyat menurun.</p>

<h3>4. Imbangan pembayaran</h3>
<p>Penyata kewangan yang menunjukkan nilai semua urus niaga dan aliran wang antara sesebuah negara dengan negara lain dalam tempoh setahun.</p>
<div class="grid-3">
  <div class="kad-mini"><b>Lebihan</b><p>Jumlah penerimaan melebihi jumlah pembayaran.</p></div>
  <div class="kad-mini"><b>Seimbang</b><p>Jumlah penerimaan sama dengan jumlah pembayaran.</p></div>
  <div class="kad-mini"><b>Kurangan (defisit)</b><p>Jumlah penerimaan kurang daripada jumlah pembayaran.</p></div>
</div>
`
    },
    {
      no: "1.3",
      tajuk: "Matlamat dan Dasar Makroekonomi",
      soalan: ["Apakah empat matlamat makroekonomi dan kepentingannya?", "Apakah dasar yang digunakan untuk mencapai matlamat tersebut?"],
      html: `
<div class="jadual"><table><caption>Empat matlamat makroekonomi</caption>
<thead><tr><th>Matlamat</th><th>Kepentingan</th></tr></thead>
<tbody>
<tr><td><b>Guna tenaga penuh</b> (pengangguran ≤ 4%)</td><td>Keupayaan dan kebajikan maksimum; mengatasi pengangguran; mengelakkan pembaziran modal manusia; mengelakkan masalah sosial seperti perpecahan keluarga dan jenayah; mencapai kecekapan ekonomi.</td></tr>
<tr><td><b>Kestabilan tingkat harga umum</b></td><td>Menjamin kuasa beli dan taraf hidup; inflasi rendah menggalakkan pertumbuhan; mengelakkan kemerosotan kebajikan, kemerosotan daya saing eksport dan kemerosotan nilai ringgit. Harga yang jatuh berterusan pula menyebabkan deflasi atau kemelesetan.</td></tr>
<tr><td><b>Memperbaiki imbangan pembayaran</b></td><td>Lebihan menambah rizab antarabangsa; mengelakkan aliran keluar tukaran asing dan emas; kerajaan tidak perlu meminjam dari luar; mengelakkan kemerosotan nilai ringgit.</td></tr>
<tr><td><b>Pertumbuhan ekonomi</b></td><td>Mewujudkan peluang pekerjaan; meningkatkan pendapatan dan kebajikan; mengurangkan kemiskinan dan jurang pendapatan; mempercepat penyediaan perumahan, kesihatan dan pendidikan.</td></tr>
</tbody></table></div>
<h3><span class="no">1.3.2</span> Dasar-dasar makroekonomi</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Dasar fiskal (belanjawan)</b><p>Mengubah cukai (T) dan perbelanjaan kerajaan (G). Inflasi: dasar fiskal <b>menguncup</b> (G turun, T naik). Kemelesetan: dasar fiskal <b>mengembang</b> (G naik, T turun).</p></div>
  <div class="kad-mini"><b>Dasar kewangan</b><p>Bank pusat mengubah bekalan wang (Ms) dan kadar bunga (r). Inflasi: <b>menguncup</b> (Ms turun, r naik). Kemelesetan: <b>mengembang</b> (Ms naik, r turun).</p></div>
  <div class="kad-mini"><b>Dasar kawalan langsung</b><p>Undang-undang dan peraturan: harga maksimum dan upah maksimum semasa inflasi; harga minimum dan upah minimum semasa deflasi; tarif untuk memperbaiki imbangan pembayaran.</p></div>
  <div class="kad-mini"><b>Dasar sebelah penawaran</b><p>Mempengaruhi penawaran agregat (AS) melalui cukai, galakan pelaburan dan undang-undang, untuk menambah keluaran dan mengatasi inflasi tolakan kos.</p></div>
</div>
<div class="kotak tip"><span class="kotak-label">Ingat</span><p>Dasar fiskal dan dasar kewangan ialah <b>dasar sebelah permintaan</b> kerana mempengaruhi permintaan agregat (AD). Dasar sebelah penawaran mempengaruhi AS.</p></div>
`
    },
    {
      no: "1.4",
      tajuk: "Aliran Pusingan Pendapatan Negara",
      soalan: ["Bagaimanakah aliran fizikal dan aliran wang bergerak antara sektor ekonomi?", "Apakah bocoran dan suntikan dalam ekonomi dua, tiga dan empat sektor?"],
      html: `
<p>Aliran pusingan pendapatan menunjukkan aliran kegiatan ekonomi antara sektor-sektor ekonomi. Terdapat <b>aliran fizikal</b> (faktor pengeluaran dan barang) serta <b>aliran wang</b> (pendapatan dan perbelanjaan).</p>
<h3>(a) Ekonomi dua sektor: isi rumah dan firma</h3>
<div class="aliran"><span>Isi rumah</span><i>→</i><span>Tanah, buruh, modal, usahawan</span><i>→</i><span>Firma</span></div>
<div class="aliran"><span>Firma</span><i>→</i><span>Sewa, upah, bunga, untung (Y)</span><i>→</i><span>Isi rumah</span></div>
<div class="aliran"><span>Isi rumah</span><i>→</i><span>Perbelanjaan penggunaan (C)</span><i>→</i><span>Firma</span></div>
<p>Isi rumah menabung (S) di institusi kewangan: <b>bocoran</b>. Institusi kewangan meminjamkan dana kepada firma untuk pelaburan (I): <b>suntikan</b>.</p>
<h3>(b) Ekonomi tiga sektor: + kerajaan</h3>
<p>Kerajaan memungut <b>cukai (T)</b> daripada isi rumah dan firma (bocoran) dan membuat <b>perbelanjaan kerajaan (G)</b> ke atas faktor dan barang (suntikan).</p>
<h3>(c) Ekonomi empat sektor: + sektor luar negara</h3>
<p>Import (M) ialah bocoran kerana wang mengalir ke luar negara; eksport (X) ialah suntikan kerana wang masuk ke dalam negara.</p>
<div class="jadual"><table><caption>Bocoran dan suntikan</caption>
<thead><tr><th>Ekonomi</th><th>Bocoran (W)</th><th>Suntikan (J)</th></tr></thead>
<tbody><tr><td>Dua sektor</td><td>S</td><td>I</td></tr><tr><td>Tiga sektor</td><td>S + T</td><td>I + G</td></tr><tr><td>Empat sektor</td><td>S + T + M</td><td>I + G + X</td></tr></tbody></table></div>
`
    }
  ],
  kad: [
    { d: "Definisi <b>makroekonomi</b>", b: "Kajian kegiatan ekonomi secara agregat: interaksi sektor isi rumah, firma, kerajaan dan luar negara yang menentukan pencapaian ekonomi.", t: "1.1" },
    { d: "Empat pemboleh ubah utama makroekonomi", b: "Pendapatan negara dan pertumbuhan, guna tenaga dan pengangguran, tingkat harga umum dan inflasi, imbangan pembayaran.", t: "1.2" },
    { d: "Beza KNK <b>potensi</b> dan KNK <b>sebenar</b>", b: "Potensi: keluaran jika semua faktor digunakan sepenuhnya. Sebenar: keluaran yang benar-benar dicapai.", t: "1.2" },
    { d: "Kadar pertumbuhan 2001 (KNK benar 424 295 → 454 625)", b: "30 330 ÷ 424 295 × 100% = 7.15%.", t: "1.2" },
    { d: "Rumus <b>kadar pengangguran</b>", b: "Penganggur ÷ tenaga buruh × 100%.", t: "1.2" },
    { d: "Kadar pengangguran Malaysia 2006", b: "385.4 ÷ 11 544.5 × 100% = 3.34%.", t: "1.2" },
    { d: "Maksud <b>guna tenaga penuh</b>", b: "Kadar pengangguran pada atau di bawah 4%; semua faktor digunakan sepenuhnya.", t: "1.2" },
    { d: "Kadar inflasi 2011 (IHP 102.5 → 103.8)", b: "1.3 ÷ 102.5 × 100% = 1.27%.", t: "1.2" },
    { d: "Tiga keadaan <b>imbangan pembayaran</b>", b: "Lebihan (penerimaan > pembayaran), seimbang, kurangan atau defisit (penerimaan < pembayaran).", t: "1.2" },
    { d: "Empat matlamat makroekonomi", b: "Guna tenaga penuh, kestabilan harga, memperbaiki imbangan pembayaran, pertumbuhan ekonomi.", t: "1.3" },
    { d: "Dasar fiskal semasa <b>inflasi</b>", b: "Dasar fiskal menguncup: kurangkan G dan naikkan T.", t: "1.3" },
    { d: "Dasar kewangan semasa <b>kemelesetan</b>", b: "Dasar kewangan mengembang: tambah bekalan wang dan turunkan kadar bunga.", t: "1.3" },
    { d: "Maksud <b>dasar sebelah penawaran</b>", b: "Dasar yang mempengaruhi AS melalui cukai, galakan pelaburan dan undang-undang.", t: "1.3" },
    { d: "Bocoran dan suntikan ekonomi <b>empat sektor</b>", b: "Bocoran: S + T + M. Suntikan: I + G + X.", t: "1.4" }
  ],
  kuiz: []
});
