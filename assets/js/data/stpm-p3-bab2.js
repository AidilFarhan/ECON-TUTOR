/* =========================================================
   STPM Penggal 3 · Bab 2 · Inflasi dan Kos Sara Hidup
   Sumber rujukan: nota ulang kaji STPM Ekonomi Penggal 3 (ditulis semula)
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p3-b2",
  peringkat: "stpm",
  tingkatan: 3,
  no: 2,
  tajuk: "Inflasi dan Kos Sara Hidup",
  warna: "var(--bab-rm5)",
  ringkas:
    "Pengukuran harga melalui IHP berwajaran, jenis dan punca inflasi, inflasi di Malaysia, kos sara hidup dan taraf hidup, kesan inflasi kepada pelbagai golongan, langkah mengawal inflasi serta belanjawan dan hutang negara.",
  seksyen: [
    {
      no: "2.1",
      tajuk: "Indeks Harga dan Inflasi",
      soalan: ["Bagaimanakah IHP berwajaran dihitung?", "Apakah tiga jenis inflasi?"],
      html: `
<div class="kotak def"><span class="kotak-label">Indeks harga pengguna (IHP)</span><p>Angka yang mengukur perubahan purata harga sekumpulan barang dan perkhidmatan dalam tempoh tertentu berbanding tahun asas.</p></div>
<ol>
<li><b>Pilih tahun asas</b> yang harganya stabil; IHP tahun asas = 100.</li>
<li><b>Pilih barang pengguna</b> yang biasa digunakan kebanyakan pengguna (berdasarkan cita rasa, adat dan corak perbelanjaan).</li>
<li><b>Beri wajaran</b>: barang lebih penting diberi wajaran lebih besar.</li>
</ol>
<div class="jadual"><table><caption>Contoh IHP berwajaran (tahun asas 2010)</caption>
<thead><tr><th>Barang</th><th class="n">Harga 2010 (RM)</th><th class="n">Harga 2016 (RM)</th><th class="n">Indeks harga 2016</th><th class="n">Wajaran</th><th class="n">Indeks × wajaran</th></tr></thead>
<tbody>
<tr><td>Seluar</td><td class="n">30</td><td class="n">34</td><td class="n">113.33</td><td class="n">5</td><td class="n">566.65</td></tr>
<tr><td>Baju</td><td class="n">20</td><td class="n">25</td><td class="n">125.00</td><td class="n">3</td><td class="n">375.00</td></tr>
<tr><td>Buku</td><td class="n">10</td><td class="n">16</td><td class="n">160.00</td><td class="n">2</td><td class="n">320.00</td></tr>
<tr><td><b>Jumlah</b></td><td></td><td></td><td></td><td class="n">10</td><td class="n">1 261.65</td></tr>
</tbody></table></div>
<p>IHP berwajaran 2016 = 1 261.65 ÷ 10 = <b>126.17</b>. Tanpa wajaran, purata indeks ialah 132.78.</p>
<div class="kotak def"><span class="kotak-label">Inflasi</span><p>Kenaikan tingkat harga purata barang dan perkhidmatan secara berterusan dalam tempoh tertentu. Kadar inflasi = (IHP₁ − IHP₀) ÷ IHP₀ × 100.</p></div>
<div class="grid-3">
  <div class="kad-mini"><b>Tarikan permintaan</b><p>AD terus meningkat melebihi keupayaan pengeluaran pada guna tenaga penuh; punca: kenaikan C, I, G, X − M atau bekalan wang berlebihan.</p></div>
  <div class="kad-mini"><b>Tolakan kos</b><p>Kos pengeluaran naik: tuntutan upah lebih tinggi, harga bahan mentah naik, atau firma mahu menaikkan untung.</p></div>
  <div class="kad-mini"><b>Diimport</b><p>Harga barang import dari negara yang mengalami inflasi meningkat, menaikkan harga dalam negara.</p></div>
</div>
<figure data-graf="ihp"></figure>
`
    },
    {
      no: "2.2 & 2.3",
      tajuk: "Inflasi di Malaysia dan Faktornya",
      soalan: ["Bagaimanakah arah aliran inflasi Malaysia 2008–2012?", "Apakah faktor yang mempengaruhi inflasi?"],
      html: `
<div class="jadual"><table><caption>Kadar inflasi Malaysia (Laporan Ekonomi 2012/2013)</caption>
<thead><tr><th>Tahun</th><td class="n">2008</td><td class="n">2009</td><td class="n">2010</td><td class="n">2011</td><td class="n">2012</td></tr></thead>
<tbody><tr><th>Inflasi (%)</th><td class="n">5.4</td><td class="n">0.6</td><td class="n">1.7</td><td class="n">3.2</td><td class="n">1.9</td></tr></tbody></table></div>
<ol>
<li><b>AD melebihi AS</b> apabila ekonomi pada guna tenaga penuh.</li>
<li><b>Kenaikan kadar upah</b> menaikkan kos dan mengurangkan penawaran.</li>
<li><b>Kenaikan harga faktor pengeluaran</b> seperti bahan mentah.</li>
<li><b>Kenaikan harga barang import</b> atau kenaikan nilai mata wang asing.</li>
</ol>
`
    },
    {
      no: "2.4 & 2.5",
      tajuk: "Kos Sara Hidup dan Kesan Inflasi",
      soalan: ["Apakah hubungan kos sara hidup dengan taraf hidup?", "Siapakah yang untung dan rugi semasa inflasi?"],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Kos sara hidup</span><p>Jumlah perbelanjaan yang diperlukan untuk meneruskan kehidupan harian: makanan, minuman, tempat tinggal dan keselamatan.</p></div>
  <div class="kotak def"><span class="kotak-label">Taraf hidup</span><p>Sejauh mana seseorang mudah memenuhi keperluan hidup; diukur melalui pendapatan boleh belanja berbanding keperluan asas.</p></div>
</div>
<p>Hubungan kos sara hidup dengan taraf hidup adalah <b>songsang</b>: kos sara hidup tinggi, taraf hidup rendah.</p>
<div class="jadual"><table><caption>Kesan inflasi</caption>
<thead><tr><th>Aspek</th><th>Kesan</th></tr></thead>
<tbody>
<tr><td>Kos sara hidup dan taraf hidup</td><td>Kos sara hidup naik, taraf hidup turun.</td></tr>
<tr><td>Pertumbuhan ekonomi</td><td>Inflasi tinggi menjejaskan pulangan pelaburan dan daya saing eksport; inflasi sederhana boleh menggalakkan pelaburan kerana untung firma naik.</td></tr>
<tr><td>Nilai wang</td><td>Merosot; inflasi berterusan menghakis keyakinan terhadap wang.</td></tr>
<tr><td>Pesara (pendapatan tetap)</td><td><b>Rugi</b>: pendapatan benar jatuh.</td></tr>
<tr><td>Peniaga</td><td><b>Untung</b>: harga jualan dan keuntungan naik.</td></tr>
<tr><td>Penghutang</td><td><b>Untung</b>: jika kadar faedah tetap, kadar bunga benar yang dibayar lebih rendah.</td></tr>
</tbody></table></div>
`
    },
    {
      no: "2.6",
      tajuk: "Langkah Mengawal Inflasi",
      soalan: ["Bagaimanakah dasar kewangan, fiskal dan pendapatan mengawal inflasi?", "Apakah kawalan langsung lain yang boleh digunakan?"],
      html: `
<div class="jadual"><table><caption>Langkah mengawal inflasi</caption>
<thead><tr><th>Dasar</th><th>Tindakan</th></tr></thead>
<tbody>
<tr><td><b>Kewangan</b> (mengurangkan bekalan wang dan AD)</td><td>Jual bil perbendaharaan dan bon kerajaan (operasi pasaran terbuka); naikkan kadar bank; naikkan nisbah rizab berkanun; pujukan moral supaya bank kurangkan pinjaman; kawalan kredit terpilih (kredit hanya kepada sektor penting dan produktif).</td></tr>
<tr><td><b>Fiskal</b></td><td>Kurangkan G, naikkan cukai, atau kedua-duanya serentak untuk mengurangkan AE dan AD.</td></tr>
<tr><td><b>Pendapatan</b></td><td>Kawal kenaikan upah supaya tidak melebihi peningkatan daya pengeluaran buruh; dasar upah maksimum (sasaran inflasi tolakan kos).</td></tr>
<tr><td><b>Kawalan harga</b></td><td>Harga maksimum bagi barang kawalan seperti beras, tepung, susu dan minyak masak.</td></tr>
<tr><td><b>Menambah keluaran</b></td><td>Tingkatkan daya pengeluaran melalui latihan, kebajikan dan motivasi pekerja.</td></tr>
<tr><td><b>Kawalan eksport dan import</b></td><td>Import barang penting sahaja (kuota, cukai import); kurangkan eksport barang penting supaya bekalan dalam negara mencukupi.</td></tr>
<tr><td><b>Catuan</b></td><td>Hadkan pembelian (contoh kupon) untuk mengagihkan barang keperluan dan elak pembelian berlebihan.</td></tr>
</tbody></table></div>
`
    },
    {
      no: "2.7",
      tajuk: "Belanjawan Negara Malaysia",
      soalan: ["Bilakah belanjawan lebihan, defisit dan seimbang digunakan?", "Apakah komponen perbelanjaan mengurus dan pembangunan?", "Apakah kebaikan dan keburukan hutang dalam dan luar negara?"],
      html: `
<div class="kotak def"><span class="kotak-label">Belanjawan negara</span><p>Penyata anggaran hasil (cukai dan bukan cukai) dan perbelanjaan (mengurus dan pembangunan) kerajaan bagi satu tahun.</p></div>
<div class="jadual"><table><caption>Jenis belanjawan dan penggunaannya</caption>
<thead><tr><th>Belanjawan</th><th>Syarat</th><th>Digunakan semasa</th></tr></thead>
<tbody>
<tr><td>Lebihan</td><td>Hasil &gt; perbelanjaan</td><td>Inflasi: naikkan cukai, kurangkan perbelanjaan, AD turun</td></tr>
<tr><td>Defisit</td><td>Perbelanjaan &gt; hasil; dibiayai pinjaman</td><td>Kemelesetan: tambah perbelanjaan untuk mewujudkan pekerjaan</td></tr>
<tr><td>Seimbang</td><td>Hasil = perbelanjaan</td><td>Ekonomi sudah pada guna tenaga penuh; untuk kestabilan kewangan awam</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Perbelanjaan mengurus (berulang setiap tahun)</span><ul>
    <li>Emolumen (gaji kakitangan awam; komponen terbesar)</li>
    <li>Pencen dan ganjaran</li>
    <li>Bayaran khidmat hutang</li>
    <li>Pemberian kepada kerajaan negeri</li>
    <li>Bekalan dan perkhidmatan</li>
    <li>Subsidi (petroleum, barang kawalan, harga padi)</li>
    <li>Perolehan aset, bayaran balik dan hapus kira</li>
    <li>Pemberian kepada badan berkanun</li></ul></div>
  <div class="kotak fokus"><span class="kotak-label">Perbelanjaan pembangunan</span><ul>
    <li><b>Keselamatan</b>: peralatan tentera, kem, balai polis</li>
    <li><b>Sosial</b>: pendidikan dan latihan (terbesar), kesihatan</li>
    <li><b>Ekonomi</b>: pengangkutan (terbesar), perdagangan dan perindustrian</li>
    <li><b>Pentadbiran am</b>: peralatan dan sistem atas talian</li></ul></div>
</div>
<div class="jadual"><table><caption>Hutang negara</caption>
<thead><tr><th></th><th>Hutang dalam negara</th><th>Hutang luar negara</th></tr></thead>
<tbody>
<tr><td>Sumber</td><td>Bil perbendaharaan, sijil pelaburan, sekuriti kerajaan; KWSP, Tabung Haji, BSN, syarikat insurans, bank</td><td>Sekuriti kerajaan di pasaran antarabangsa, Bank Dunia, Bank Pembangunan Asia</td></tr>
<tr><td>Kebaikan</td><td>Mudah diperoleh; tiada bocoran wang ke luar; tidak terjejas kadar pertukaran</td><td>Sumber lebih luas; boleh membiayai defisit imbangan pembayaran; tidak mengurangkan penciptaan kredit bank tempatan</td></tr>
<tr><td>Keburukan</td><td>Sumber terhad; mengurangkan keupayaan bank mencipta kredit; boleh memburukkan agihan pendapatan</td><td>Bocoran wang ke luar negara; terdedah kepada perubahan kadar pertukaran; kadar faedah lebih tinggi</td></tr>
</tbody></table></div>
`
    }
  ],
  kad: [
    { d: "Tiga langkah membina <b>IHP</b>", b: "Pilih tahun asas yang stabil (= 100), pilih barang pengguna yang lazim, beri wajaran mengikut kepentingan.", t: "2.1" },
    { d: "IHP berwajaran: seluar 113.33 (5), baju 125 (3), buku 160 (2)", b: "(566.65 + 375 + 320) ÷ 10 = 126.17.", t: "2.1" },
    { d: "Maksud <b>inflasi</b>", b: "Kenaikan tingkat harga purata barang dan perkhidmatan secara berterusan dalam tempoh tertentu.", t: "2.1" },
    { d: "Inflasi <b>tarikan permintaan</b>", b: "AD melebihi keupayaan pengeluaran pada guna tenaga penuh; punca kenaikan C, I, G, X − M atau bekalan wang.", t: "2.1" },
    { d: "Inflasi <b>tolakan kos</b>", b: "Kos pengeluaran naik: upah, bahan mentah atau keinginan menaikkan untung.", t: "2.1" },
    { d: "Inflasi <b>diimport</b>", b: "Harga barang import dari negara yang mengalami inflasi meningkat.", t: "2.1" },
    { d: "Hubungan <b>kos sara hidup</b> dan <b>taraf hidup</b>", b: "Songsang: kos sara hidup tinggi, taraf hidup rendah.", t: "2.4" },
    { d: "Golongan yang <b>rugi</b> dan <b>untung</b> semasa inflasi", b: "Rugi: pesara dan penerima pendapatan tetap. Untung: peniaga dan penghutang.", t: "2.5" },
    { d: "Dasar kewangan untuk <b>mengawal inflasi</b>", b: "Jual sekuriti kerajaan, naikkan kadar bank dan nisbah rizab, pujukan moral, kawalan kredit terpilih.", t: "2.6" },
    { d: "Maksud <b>dasar pendapatan</b>", b: "Mengawal kenaikan upah supaya tidak melebihi peningkatan daya pengeluaran buruh; sasaran inflasi tolakan kos.", t: "2.6" },
    { d: "Tujuan <b>dasar catuan</b>", b: "Mengagihkan barang keperluan secara adil dan mengelakkan pembelian berlebihan.", t: "2.6" },
    { d: "Bila kerajaan guna belanjawan <b>defisit</b>?", b: "Semasa kemelesetan, untuk menambah perbelanjaan dan peluang pekerjaan.", t: "2.7" },
    { d: "Komponen terbesar <b>perbelanjaan mengurus</b>", b: "Emolumen (gaji kakitangan awam).", t: "2.7" },
    { d: "Kebaikan <b>hutang dalam negara</b>", b: "Mudah diperoleh, tiada bocoran wang ke luar, tidak terjejas kadar pertukaran.", t: "2.7" },
    { d: "Keburukan <b>hutang luar negara</b>", b: "Bocoran wang ke luar, terdedah kepada kadar pertukaran, kadar faedah lebih tinggi.", t: "2.7" }
  ],
  kuiz: []
});
