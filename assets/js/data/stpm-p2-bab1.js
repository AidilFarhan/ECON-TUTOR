/* =========================================================
   STPM Penggal 2 · Bab 1 · Pengenalan (Makroekonomi)
   Sumber: Modul PdP Ekonomi P2 Makroekonomi, Bab 1
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p2-b1",
  peringkat: "stpm",
  tingkatan: 2,
  no: 1,
  tajuk: "Pengenalan Makroekonomi",
  warna: "var(--bab-stpm1)",
  ringkas:
    "Makroekonomi mengkaji ekonomi secara keseluruhan. Bab ini merangkumi aliran pusingan pendapatan negara, matlamat dan isu makroekonomi, dasar untuk menstabilkan ekonomi, serta petunjuk makroekonomi utama.",
  seksyen: [
    {
      no: "1.1",
      tajuk: "Aliran Pusingan Pendapatan Negara",
      soalan: ["Apakah peranan setiap sektor dalam ekonomi?", "Apakah beza ekonomi dua, tiga dan empat sektor?"],
      html: `
<div class="grid-2">
  <div class="kad-mini"><b>Sektor isi rumah</b><p>Menawarkan faktor pengeluaran kepada firma, membeli barang dan perkhidmatan, membayar cukai pendapatan, mengimport barang dan perkhidmatan.</p></div>
  <div class="kad-mini"><b>Sektor firma</b><p>Membeli faktor pengeluaran daripada isi rumah, melakukan pelaburan swasta, membayar cukai keuntungan syarikat, mengeksport barang serta mengimport barang modal dan bahan mentah.</p></div>
  <div class="kad-mini"><b>Sektor kerajaan</b><p>Menjalankan dan mengawal aktiviti ekonomi, melakukan pelaburan awam, memungut cukai daripada isi rumah dan firma, mengimport kelengkapan pertahanan.</p></div>
  <div class="kad-mini"><b>Sektor luar negeri</b><p>Menjalankan aktiviti eksport dan import dengan isi rumah, firma dan kerajaan.</p></div>
</div>
<div class="jadual"><table><caption>Jenis ekonomi dan aliran perbelanjaan</caption>
<thead><tr><th>Ekonomi</th><th>Sektor</th><th>Perbelanjaan</th></tr></thead>
<tbody>
<tr><td><b>Dua sektor</b> (tertutup, tanpa kerajaan)</td><td>Isi rumah, firma</td><td>C + I</td></tr>
<tr><td><b>Tiga sektor</b> (tertutup, dengan kerajaan)</td><td>Isi rumah, firma, kerajaan</td><td>C + I + G</td></tr>
<tr><td><b>Empat sektor</b> (terbuka)</td><td>Isi rumah, firma, kerajaan, luar negeri</td><td>C + I + G + (X − M)</td></tr>
</tbody></table></div>
<ul>
<li><b>C</b>: perbelanjaan penggunaan isi rumah ke atas barang dan perkhidmatan.</li>
<li><b>I</b>: perbelanjaan pelaburan firma ke atas barang modal.</li>
<li><b>G</b>: perbelanjaan kerajaan: gaji kakitangan awam (perbelanjaan mengurus) dan pelaburan awam (perbelanjaan pembangunan).</li>
<li><b>X − M</b>: eksport bersih dengan sektor luar negeri.</li>
</ul>
`
    },
    {
      no: "1.2",
      tajuk: "Matlamat dan Isu Makroekonomi",
      soalan: [
        "Apakah empat matlamat makroekonomi?",
        "Mengapakah pengangguran, inflasi dan imbangan pembayaran kurangan perlu ditangani?",
        "Apakah dasar untuk menstabilkan ekonomi?"
      ],
      html: `
<div class="jadual"><table><caption>Matlamat makroekonomi dan kepentingannya</caption>
<thead><tr><th>Matlamat</th><th>Kepentingan</th></tr></thead>
<tbody>
<tr><td><b>Guna tenaga penuh</b> (pengangguran 3%–4%, iaitu pengangguran geseran)</td><td>Meningkatkan taraf hidup, mengelakkan pembaziran sumber, meningkatkan pendapatan negara dan pertumbuhan ekonomi.</td></tr>
<tr><td><b>Memperbaiki imbangan pembayaran</b></td><td>Mengukuhkan nilai ringgit, meningkatkan rizab mata wang asing, menggalakkan pelaburan asing dan portfolio, menstabilkan harga dalam negeri.</td></tr>
<tr><td><b>Kestabilan tingkat harga</b></td><td>Mengekalkan kuasa beli dan taraf hidup, meningkatkan AE, menggalakkan tabungan (pulangan benar stabil) dan pelaburan (kos stabil), meningkatkan eksport dan mengurangkan import.</td></tr>
<tr><td><b>Pertumbuhan ekonomi yang tinggi</b></td><td>Meningkatkan pendapatan per kapita dan taraf hidup, mewujudkan peluang pekerjaan, meningkatkan pelaburan, mengatasi kemiskinan.</td></tr>
</tbody></table></div>
<h3>Isu makroekonomi</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Pengangguran</b><p>Pembaziran sumber, pendapatan negara berkurang, kemahiran buruh hilang, pendapatan per kapita dan taraf hidup turun, kemiskinan meningkat, pertumbuhan terjejas.</p></div>
  <div class="kad-mini"><b>Inflasi</b><p>Kos hidup meningkat, taraf hidup dan kuasa beli jatuh kerana nilai wang jatuh, pertumbuhan ekonomi terjejas.</p></div>
  <div class="kad-mini"><b>Pertumbuhan menurun atau negatif</b><p>Kemerosotan dan kemelesetan, pelaburan berkurang, peluang pekerjaan berkurang, kuasa beli dan kebajikan merosot.</p></div>
  <div class="kad-mini"><b>Imbangan pembayaran kurangan</b><p>Rizab mata wang asing merosot, nilai ringgit merosot, pelaburan asing dan portfolio berkurang, kegiatan ekonomi terjejas.</p></div>
</div>
<h3>Dasar untuk menstabilkan ekonomi</h3>
<div class="jadual"><table><caption>Langkah mengatasi masalah makroekonomi</caption>
<thead><tr><th>Masalah</th><th>Langkah</th></tr></thead>
<tbody>
<tr><td><b>Inflasi</b></td><td><b>Fiskal menguncup</b>: kurangkan G dan/atau naikkan T → AE dan AD turun → harga turun. <b>Kewangan menguncup</b>: kurangkan penawaran wang atau naikkan kadar bunga → pelaburan dan AE turun. <b>Kawalan langsung</b>: harga maksimum. <b>Sebelah penawaran</b>: turunkan cukai syarikat → pengeluaran dan AS bertambah → harga turun.</td></tr>
<tr><td><b>Pengangguran</b></td><td><b>Fiskal mengembang</b>: turunkan T atau tambah G → AE, AD dan Y naik. <b>Kewangan mengembang</b>: tambah bekalan wang dan turunkan kadar bunga. <b>Kemahiran dan pendidikan</b> yang sesuai untuk meningkatkan kebolehpasaran.</td></tr>
<tr><td><b>Pertumbuhan ekonomi</b></td><td>Membangunkan infrastruktur (pengangkutan, pelabuhan, teknologi maklumat), meningkatkan taraf pendidikan terutamanya sains dan teknologi, menggalakkan pelaburan langsung asing (taraf perintis, elaun pelaburan).</td></tr>
<tr><td><b>Imbangan pembayaran defisit</b></td><td>Menggalakkan eksport (subsidi eksport, taraf perintis), mengawal import (tarif, kuota), kawalan pertukaran asing.</td></tr>
</tbody></table></div>
<figure data-graf="ad-as"></figure>
`
    },
    {
      no: "1.3",
      tajuk: "Petunjuk Makroekonomi",
      soalan: ["Bagaimanakah kadar pengangguran, inflasi dan pertumbuhan ekonomi dihitung?", "Apakah kitaran perniagaan dan akaun dagangan?"],
      html: `
<div class="kotak rumus"><span class="kotak-label">Rumus petunjuk</span>
<div class="rumus-baris">Kadar pengangguran = <span class="pecahan"><span>Tenaga buruh − Guna tenaga</span><span>Tenaga buruh</span></span> × 100</div>
<div class="rumus-baris">Kadar inflasi = <span class="pecahan"><span>IHP<sub>t1</sub> − IHP<sub>t0</sub></span><span>IHP<sub>t0</sub></span></span> × 100</div>
<div class="rumus-baris">Kadar pertumbuhan ekonomi = <span class="pecahan"><span>KDNK benar<sub>t1</sub> − KDNK benar<sub>t0</sub></span><span>KDNK benar<sub>t0</sub></span></span> × 100</div>
<div class="rumus-baris">KDNK per kapita benar = <span class="pecahan"><span>KDNK benar</span><span>Jumlah penduduk</span></span></div></div>
<div class="grid-2">
  <div class="kad-mini"><b>Keluaran negara kasar (KNK)</b><p>Nilai barang dan perkhidmatan akhir yang dikeluarkan dalam setahun oleh faktor milik negara, di dalam dan di luar negara. PFBLN positif menambah KNK; negatif mengurangkannya.</p></div>
  <div class="kad-mini"><b>Kitaran perniagaan</b><p>Ekonomi melambung dan meleset dalam jangka masa tertentu. KNK sebenar &gt; KNK potensi: inflasi. KNK sebenar &lt; KNK potensi: deflasi. Sama: guna tenaga penuh.</p></div>
  <div class="kad-mini"><b>Akaun dagangan</b><p>Nilai eksport barang tolak nilai import barang: lebihan, kurangan atau seimbang.</p></div>
</div>
<div class="jadual"><table><caption>Panduan menjawab · Bahagian C: Malaysia 2010–2013</caption>
<thead><tr><th>Tahun</th><th class="n">KDNK benar (RM juta)</th><th class="n">Penduduk (juta)</th><th class="n">Tenaga buruh (ribu)</th><th class="n">Guna tenaga (ribu)</th><th class="n">Pertumbuhan (%)</th><th class="n">KDNK per kapita (RM)</th><th class="n">Pengangguran (%)</th></tr></thead>
<tbody>
<tr><td>2010</td><td class="n">599 554</td><td class="n">28.25</td><td class="n">12 361.3</td><td class="n">11 937.1</td><td class="n">–</td><td class="n">–</td><td class="n">–</td></tr>
<tr><td>2011</td><td class="n">608 374</td><td class="n">28.55</td><td class="n">12 645.7</td><td class="n">12 226.7</td><td class="n">1.47</td><td class="n">21 309.07</td><td class="n">3.31</td></tr>
<tr><td>2012</td><td class="n">620 515</td><td class="n">28.85</td><td class="n">12 923.9</td><td class="n">12 502.6</td><td class="n">2.00</td><td class="n">21 508.32</td><td class="n">3.26</td></tr>
<tr><td>2013</td><td class="n">645 721</td><td class="n">29.15</td><td class="n">13 272.3</td><td class="n">12 849.7</td><td class="n">4.06</td><td class="n">22 151.66</td><td class="n">3.18</td></tr>
</tbody></table></div>
<p>Taraf hidup meningkat dari 2011 hingga 2013 kerana KDNK per kapita benar terus meningkat.</p>
<div class="kotak contoh"><span class="kotak-label">Panduan menjawab · Bahagian B</span>
<p><b>Mengapa pengangguran perlu ditangani?</b> Pembaziran sumber, pendapatan negara merosot, guna tenaga penuh tidak tercapai, pertumbuhan menurun, masalah sosial (kecurian, penceraian, kemiskinan).</p>
<p><b>Belanjawan kurangan untuk mengatasi pengangguran:</b> kerajaan menurunkan cukai (pendapatan boleh guna dan penggunaan naik) dan menambah perbelanjaan. Permintaan agregat meningkat, maka keperluan guna tenaga bertambah untuk menambah penawaran agregat.</p></div>
`
    }
  ],
  kad: [
    { d: "Peranan <b>sektor isi rumah</b> dalam aliran pusingan", b: "Menawarkan faktor pengeluaran, membeli barang, membayar cukai pendapatan, mengimport.", t: "1.1" },
    { d: "Perbelanjaan dalam ekonomi <b>dua</b>, <b>tiga</b> dan <b>empat</b> sektor", b: "Dua: C + I. Tiga: C + I + G. Empat: C + I + G + (X − M).", t: "1.1" },
    { d: "Beza <b>perbelanjaan mengurus</b> dan <b>perbelanjaan pembangunan</b> kerajaan", b: "Mengurus: gaji kakitangan awam. Pembangunan: pelaburan awam.", t: "1.1" },
    { d: "Empat <b>matlamat makroekonomi</b>", b: "Guna tenaga penuh, imbangan pembayaran yang baik, kestabilan tingkat harga, pertumbuhan ekonomi yang tinggi.", t: "1.2" },
    { d: "Kadar pengangguran pada <b>guna tenaga penuh</b>", b: "Sekitar 3%–4% (pengangguran geseran).", t: "1.2" },
    { d: "Kesan <b>imbangan pembayaran kurangan</b>", b: "Rizab mata wang asing merosot, nilai ringgit merosot, pelaburan asing berkurang, kegiatan ekonomi terjejas.", t: "1.2" },
    { d: "Dasar fiskal untuk mengatasi <b>inflasi</b>", b: "Fiskal menguncup: kurangkan G dan/atau naikkan T, AE dan AD turun, harga turun.", t: "1.2" },
    { d: "Dasar kewangan untuk mengatasi <b>pengangguran</b>", b: "Kewangan mengembang: tambah penawaran wang, turunkan kadar bunga, AE, AD dan Y naik.", t: "1.2" },
    { d: "Dasar <b>sebelah penawaran</b> untuk inflasi", b: "Turunkan cukai syarikat, untung selepas cukai naik, pengeluaran dan AS bertambah, harga turun.", t: "1.2" },
    { d: "Langkah memperbaiki <b>imbangan pembayaran defisit</b>", b: "Galakkan eksport (subsidi, taraf perintis), kawal import (tarif, kuota), kawalan pertukaran asing.", t: "1.2" },
    { d: "Rumus <b>kadar pengangguran</b>", b: "(Tenaga buruh − Guna tenaga) ÷ Tenaga buruh × 100.", t: "1.3" },
    { d: "Rumus <b>kadar inflasi</b>", b: "(IHP tahun semasa − IHP tahun lepas) ÷ IHP tahun lepas × 100.", t: "1.3" },
    { d: "Rumus <b>kadar pertumbuhan ekonomi</b>", b: "(KDNK benar t1 − KDNK benar t0) ÷ KDNK benar t0 × 100.", t: "1.3" },
    { d: "Maksud <b>KNK</b>", b: "Nilai barang dan perkhidmatan akhir yang dikeluarkan dalam setahun oleh faktor milik negara, di dalam dan luar negara.", t: "1.3" },
    { d: "Kitaran perniagaan: KNK sebenar berbanding KNK potensi", b: "Lebih: inflasi. Kurang: deflasi. Sama: guna tenaga penuh.", t: "1.3" },
    { d: "KDNK benar Malaysia 2012 → 2013 (RM620 515 j → RM645 721 j)", b: "Kadar pertumbuhan = 4.06%.", t: "1.3" }
  ],
  kuiz: []
});
