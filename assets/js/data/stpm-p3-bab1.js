/* =========================================================
   STPM Penggal 3 · Bab 1 · Pengangguran, Guna Tenaga dan Upah
   Sumber rujukan: nota ulang kaji STPM Ekonomi Penggal 3 (ditulis semula)
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p3-b1",
  peringkat: "stpm",
  tingkatan: 3,
  no: 1,
  tajuk: "Pengangguran, Guna Tenaga dan Upah",
  warna: "var(--bab-stpm1)",
  ringkas:
    "Isu pasaran buruh di Malaysia: konsep tenaga buruh dan guna tenaga penuh, jenis dan punca pengangguran, kesannya, dasar untuk mengurangkannya, serta upah wang, upah benar dan perbezaan upah.",
  seksyen: [
    {
      no: "1.1",
      tajuk: "Konsep Pengangguran",
      soalan: ["Siapakah yang termasuk dalam tenaga buruh?", "Bilakah ekonomi dikatakan mencapai guna tenaga penuh?"],
      html: `
<div class="jadual"><table><caption>Konsep asas pasaran buruh</caption>
<thead><tr><th>Konsep</th><th>Maksud</th></tr></thead>
<tbody>
<tr><td><b>Tenaga buruh</b></td><td>Penduduk berumur 15 hingga 64 tahun sama ada bekerja atau menganggur, tidak termasuk OKU (yang tidak bekerja), pelajar, pesara dan suri rumah.</td></tr>
<tr><td><b>Guna tenaga</b></td><td>Tenaga buruh yang sedang bekerja dan menyumbang kepada pengeluaran barang dan perkhidmatan.</td></tr>
<tr><td><b>Guna tenaga penuh</b></td><td>Keadaan semua tenaga buruh digunakan sepenuhnya; lazimnya apabila kadar pengangguran sekitar 4% atau kurang.</td></tr>
<tr><td><b>Pengangguran</b></td><td>Tenaga buruh yang mampu dan sanggup bekerja tetapi tidak mendapat pekerjaan.</td></tr>
</tbody></table></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span>
<div class="rumus-baris">Jumlah penganggur = tenaga buruh − guna tenaga</div>
<div class="rumus-baris">Kadar pengangguran = <span class="pecahan"><span>Jumlah penganggur</span><span>Tenaga buruh</span></span> × 100</div></div>
<figure data-graf="pengangguran"></figure>
`
    },
    {
      no: "1.2",
      tajuk: "Jenis Pengangguran",
      soalan: ["Apakah beza pengangguran struktur, geseran dan kitaran?"],
      html: `
<div class="jadual"><table><caption>Jenis pengangguran</caption>
<thead><tr><th>Jenis</th><th>Punca</th></tr></thead>
<tbody>
<tr><td><b>Struktur</b></td><td>Perubahan struktur ekonomi negara (contoh peralihan daripada pertanian kepada perindustrian) sehingga kemahiran buruh tidak lagi sepadan.</td></tr>
<tr><td><b>Bermusim</b></td><td>Perubahan musim tertentu, contoh musim tengkujuh bagi nelayan.</td></tr>
<tr><td><b>Geseran</b></td><td>Buruh berhenti secara sukarela untuk mencari pekerjaan yang lebih baik; wujud walaupun pada guna tenaga penuh.</td></tr>
<tr><td><b>Kitaran</b></td><td>Kemelesetan ekonomi (termasuk kemelesetan ekonomi dunia) yang mengurangkan permintaan agregat.</td></tr>
<tr><td><b>Teknologi</b></td><td>Buruh digantikan oleh teknologi moden.</td></tr>
<tr><td><b>Tak ketara</b></td><td>Buruh digunakan melebihi keperluan sebenar, maka produktiviti sut buruh tambahan sangat rendah atau sifar.</td></tr>
</tbody></table></div>
`
    },
    {
      no: "1.3",
      tajuk: "Punca, Kesan dan Langkah Mengatasi Pengangguran",
      soalan: ["Apakah punca dan kesan pengangguran?", "Bagaimanakah dasar fiskal dan kewangan mengurangkan pengangguran?"],
      html: `
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Punca pengangguran</span><ol>
    <li>Tenaga buruh bertambah lebih cepat daripada peluang pekerjaan</li>
    <li>Kemelesetan ekonomi</li>
    <li>Pendidikan rendah atau kekurangan kemahiran</li>
    <li>Kelayakan tidak sepadan dengan keperluan majikan</li>
    <li>Sikap memilih pekerjaan</li>
    <li>Perubahan musim</li>
    <li>Kekurangan maklumat tentang kekosongan jawatan</li>
    <li>Penggunaan teknologi moden</li></ol></div>
  <div class="kotak fokus"><span class="kotak-label">Kesan sosioekonomi</span><ol>
    <li>Taraf hidup merosot</li>
    <li>Pembaziran sumber</li>
    <li>Masalah sosial</li>
    <li>Pendapatan per kapita berkurang</li>
    <li>Pertumbuhan ekonomi terjejas</li>
    <li>Kemiskinan meningkat</li></ol></div>
</div>
<div class="jadual"><table><caption>Langkah mengurangkan pengangguran</caption>
<thead><tr><th>Dasar</th><th>Tindakan</th><th>Rantaian kesan</th></tr></thead>
<tbody>
<tr><td rowspan="3"><b>Fiskal mengembang</b></td><td>Kurangkan cukai</td><td>Y<sub>d</sub> naik → C naik → AE naik → pekerjaan bertambah</td></tr>
<tr><td>Tambah perbelanjaan kerajaan</td><td>AE naik → kegiatan ekonomi berkembang</td></tr>
<tr><td>Kurangkan T dan tambah G serentak</td><td>Kesan lebih kuat ke atas AE</td></tr>
<tr><td rowspan="7"><b>Kewangan mengembang</b></td><td>Operasi pasaran terbuka: bank pusat membeli sekuriti kerajaan</td><td>Bekalan wang naik → kadar bunga turun → I dan C naik</td></tr>
<tr><td>Longgarkan kawalan kredit</td><td>Pinjaman dan pelaburan bertambah</td></tr>
<tr><td>Turunkan nisbah rizab berkanun</td><td>Lebihan rizab naik → lebih banyak pinjaman</td></tr>
<tr><td>Turunkan nisbah rizab tunai</td><td>Lebih banyak pinjaman</td></tr>
<tr><td>Turunkan kadar bunga semalaman</td><td>Kos pinjaman turun</td></tr>
<tr><td>Turunkan kadar diskaun</td><td>Kadar bunga pasaran turun</td></tr>
<tr><td>Pujukan moral</td><td>Bank digalakkan menambah pinjaman</td></tr>
</tbody></table></div>
`
    },
    {
      no: "1.4",
      tajuk: "Upah",
      soalan: ["Apakah beza upah wang, upah bukan wang dan upah benar?", "Mengapakah upah berbeza antara pekerjaan dan sektor?"],
      html: `
<div class="grid-3">
  <div class="kad-mini"><b>Upah wang</b><p>Jumlah wang yang diterima buruh atas sumbangan tenaga fizikal dan mental.</p></div>
  <div class="kad-mini"><b>Upah bukan wang</b><p>Ganjaran dalam bentuk lain, contoh rumah, kenderaan atau kemudahan perubatan.</p></div>
  <div class="kad-mini"><b>Upah benar</b><p>Kuasa beli upah wang: jumlah barang dan perkhidmatan yang dapat dibeli.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Upah benar</span><div class="rumus-baris">Upah benar = <span class="pecahan"><span>IHP tahun asas</span><span>IHP tahun semasa</span></span> × upah wang</div></div>
<div class="kotak contoh"><span class="kotak-label">Contoh</span><div class="kira">
<div class="baris">Gaji RM6 000 sebulan; harga naik 20% sepanjang tahun (IHP = 120)</div>
<div class="baris jawapan">Upah benar = 100 ÷ 120 × 6 000 = RM5 000</div></div></div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Perbezaan upah mengikut pekerjaan</span><ol>
    <li>Permintaan dan penawaran buruh</li>
    <li>Tanggungjawab</li>
    <li>Tempoh masa bekerja</li>
    <li>Risiko yang ditanggung</li>
    <li>Taraf pendidikan</li>
    <li>Ganjaran bukan wang</li>
    <li>Mobiliti buruh</li>
    <li>Kuasa kesatuan sekerja</li>
    <li>Kemahiran</li></ol></div>
  <div class="kotak fokus"><span class="kotak-label">Perbezaan upah mengikut sektor</span><ol>
    <li>Harga keluaran sektor</li>
    <li>Keanjalan penawaran buruh</li>
    <li>Keanjalan permintaan pendapatan terhadap keluaran</li>
    <li>Mobiliti buruh</li>
    <li>Musim dan bencana</li></ol></div>
</div>
`
    }
  ],
  kad: [
    { d: "Siapakah <b>tenaga buruh</b>?", b: "Penduduk 15–64 tahun yang bekerja atau menganggur, tidak termasuk pelajar, pesara, suri rumah dan OKU yang tidak bekerja.", t: "1.1" },
    { d: "Maksud <b>guna tenaga penuh</b>", b: "Semua tenaga buruh digunakan sepenuhnya; lazimnya kadar pengangguran sekitar 4% atau kurang.", t: "1.1" },
    { d: "Rumus <b>kadar pengangguran</b>", b: "(Tenaga buruh − guna tenaga) ÷ tenaga buruh × 100.", t: "1.1" },
    { d: "Pengangguran <b>struktur</b>", b: "Akibat perubahan struktur ekonomi sehingga kemahiran buruh tidak sepadan.", t: "1.2" },
    { d: "Pengangguran <b>geseran</b>", b: "Buruh berhenti secara sukarela untuk mencari pekerjaan lebih baik; wujud walaupun pada guna tenaga penuh.", t: "1.2" },
    { d: "Pengangguran <b>kitaran</b>", b: "Akibat kemelesetan ekonomi yang mengurangkan permintaan agregat.", t: "1.2" },
    { d: "Pengangguran <b>tak ketara</b>", b: "Buruh digunakan melebihi keperluan; produktiviti sut sangat rendah.", t: "1.2" },
    { d: "Lima <b>punca pengangguran</b>", b: "Tenaga buruh bertambah cepat, kemelesetan, kurang kemahiran, kelayakan tidak sepadan, sikap memilih kerja (juga musim, kurang maklumat, teknologi).", t: "1.3" },
    { d: "Kesan sosioekonomi <b>pengangguran</b>", b: "Taraf hidup merosot, pembaziran sumber, masalah sosial, pendapatan per kapita turun, pertumbuhan terjejas, kemiskinan naik.", t: "1.3" },
    { d: "Dasar kewangan untuk <b>mengurangkan pengangguran</b>", b: "Beli sekuriti kerajaan, turunkan nisbah rizab, kadar diskaun dan kadar bunga semalaman, longgarkan kredit, pujukan moral.", t: "1.3" },
    { d: "Rumus <b>upah benar</b>", b: "IHP tahun asas ÷ IHP tahun semasa × upah wang.", t: "1.4" },
    { d: "Gaji RM6 000, IHP naik ke 120: upah benar?", b: "100 ÷ 120 × 6 000 = RM5 000.", t: "1.4" },
    { d: "Faktor perbezaan <b>upah mengikut pekerjaan</b>", b: "Permintaan dan penawaran buruh, tanggungjawab, masa bekerja, risiko, pendidikan, ganjaran bukan wang, mobiliti, kesatuan sekerja, kemahiran.", t: "1.4" }
  ],
  kuiz: []
});
