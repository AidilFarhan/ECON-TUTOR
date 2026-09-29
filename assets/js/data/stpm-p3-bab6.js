/* =========================================================
   STPM Penggal 3 · Bab 6 · Kemiskinan dan Agihan Pendapatan
   Sumber rujukan: nota ulang kaji STPM Ekonomi Penggal 3 (ditulis semula)
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p3-b6",
  peringkat: "stpm",
  tingkatan: 3,
  no: 6,
  tajuk: "Kemiskinan dan Agihan Pendapatan",
  warna: "var(--bab-rm100)",
  ringkas:
    "Konsep kemiskinan mutlak, relatif dan tegar, garis kemiskinan, punca kemiskinan di Malaysia, pengukuran agihan pendapatan (persentil, keluk Lorenz, pekali Gini), sumber pendapatan, serta dasar, agensi dan program membasmi kemiskinan.",
  seksyen: [
    {
      no: "6.1",
      tajuk: "Konsep Kemiskinan",
      soalan: ["Apakah beza kemiskinan mutlak, relatif dan tegar?", "Bagaimanakah garis kemiskinan dan kadar kemiskinan ditentukan?"],
      html: `
<div class="kotak def"><span class="kotak-label">Kemiskinan</span><p>Keadaan seseorang tidak mampu memenuhi piawaian minimum keperluan asas makanan dan bukan makanan seperti tempat tinggal, pendidikan dan kesihatan.</p></div>
<div class="grid-3">
  <div class="kad-mini"><b>Kemiskinan mutlak</b><p>Pendapatan tidak mencukupi untuk keperluan minimum berdasarkan <b>pendapatan garis kemiskinan (PGK)</b>.</p></div>
  <div class="kad-mini"><b>Kemiskinan relatif</b><p>Perbandingan taraf hidup antara kumpulan: ketidaksamaan pendapatan antara etnik, strata (bandar dan luar bandar) dan negeri.</p></div>
  <div class="kad-mini"><b>Miskin tegar</b><p>Pendapatan purata bulanan kurang daripada <b>PGK makanan</b>.</p></div>
</div>
<ul>
<li>PGK ialah pendapatan yang setakat cukup untuk keperluan asas: makanan, pakaian dan tempat tinggal.</li>
<li>PGK makanan berdasarkan pandangan pakar pemakanan dan perubatan serta IHP makanan; PGK bukan makanan berdasarkan keperluan isi rumah dan IHP bukan makanan.</li>
<li>PGK ditentukan mengikut saiz isi rumah, komposisi demografi dan lokasi.</li>
</ul>
<div class="kotak rumus"><span class="kotak-label">Rumus</span>
<div class="rumus-baris">Kadar kemiskinan = <span class="pecahan"><span>Bilangan isi rumah miskin</span><span>Jumlah isi rumah</span></span> × 100</div>
<div class="rumus-baris">Kadar kemiskinan tegar = <span class="pecahan"><span>Bilangan isi rumah miskin tegar</span><span>Jumlah isi rumah</span></span> × 100</div></div>
<div class="kotak fokus"><span class="kotak-label">Punca kemiskinan di Malaysia</span><ol>
<li><b>Akses pasaran</b>: kuasa monopoli firma besar; firma kecil tidak mencapai ekonomi bidangan dan terkeluar.</li>
<li><b>Modal</b>: petani dan pekebun kecil sukar mendapat pinjaman untuk mesin dan teknologi.</li>
<li><b>Teknologi</b>: kaedah tradisional menghadkan daya pengeluaran dan pendapatan.</li>
<li><b>Pendidikan</b>: taraf pendidikan rendah menyukarkan penguasaan kemahiran dan pekerjaan berpendapatan tinggi.</li></ol></div>
`
    },
    {
      no: "6.2",
      tajuk: "Agihan Pendapatan",
      soalan: ["Bagaimanakah agihan pendapatan diukur?", "Apakah sumber pendapatan isi rumah?"],
      html: `
<div class="grid-3">
  <div class="kad-mini"><b>Kaedah persentil</b><p>Penduduk dibahagikan kepada lima kumpulan 20% (persentil ke-20, 40, 60, 80, 100) dan bahagian pendapatan setiap kumpulan dibandingkan.</p></div>
  <div class="kad-mini"><b>Keluk Lorenz</b><p>Menunjukkan peratus kumulatif pendapatan yang diterima oleh peratus kumulatif penduduk; semakin jauh daripada garis 45°, semakin tidak setara.</p></div>
  <div class="kad-mini"><b>Pekali Gini</b><p>Mengukur ketidaksetaraan: antara <b>0</b> (saksama sepenuhnya) dan <b>1</b> (paling tidak saksama).</p></div>
</div>
<figure data-graf="lorenz"></figure>
<div class="jadual"><table><caption>Sumber pendapatan</caption>
<thead><tr><th>Sumber</th><th>Huraian</th></tr></thead>
<tbody>
<tr><td><b>Upah</b></td><td>Gaji, elaun, komisen dan bonus atas sumbangan tenaga fizikal dan mental.</td></tr>
<tr><td><b>Sewa</b></td><td>Ganjaran kerana membenarkan pihak lain menggunakan harta; faktor berpenawaran terhad.</td></tr>
<tr><td><b>Dividen</b></td><td>Keuntungan syarikat kepada pemegang saham, termasuk dividen KWSP dan institusi kewangan Islam.</td></tr>
<tr><td><b>Bunga</b></td><td>Pendapatan daripada tabungan dalam institusi konvensional; ganjaran menangguhkan perbelanjaan.</td></tr>
<tr><td><b>Untung</b></td><td>Ganjaran usahawan yang menanggung risiko dan menggabungkan faktor pengeluaran.</td></tr>
<tr><td><b>Harta pusaka</b></td><td>Harta yang diwarisi: tanah, wang tunai, barang kemas.</td></tr>
<tr><td><b>Bayaran pindahan</b></td><td>Pendapatan tanpa sumbangan produktif: pencen, elaun pengangguran, derma.</td></tr>
</tbody></table></div>
`
    },
    {
      no: "6.3",
      tajuk: "Dasar, Agensi dan Program Membasmi Kemiskinan",
      soalan: ["Apakah dasar kerajaan untuk membasmi kemiskinan dan ketaksetaraan?", "Apakah peranan agensi dan program kerajaan?"],
      html: `
<div class="jadual"><table><caption>Dasar kerajaan</caption>
<thead><tr><th>Dasar</th><th>Matlamat dan strategi</th></tr></thead>
<tbody>
<tr><td><b>Dasar Ekonomi Baru (DEB)</b></td><td>Membasmi kemiskinan tanpa mengira kaum dengan meningkatkan pendapatan dan peluang pekerjaan; menyusun semula masyarakat untuk merapatkan jurang sosioekonomi antara kaum.</td></tr>
<tr><td><b>Dasar Pembangunan Nasional (DPN)</b></td><td>Meneruskan matlamat DEB: menghapuskan kemiskinan tegar, mengurangkan kemiskinan relatif, latihan kemahiran untuk belia luar bandar, subsidi untuk produktiviti penanam padi dan nelayan, mengurangkan ketidaksetaraan antara kaum.</td></tr>
<tr><td><b>Dasar Wawasan Negara (DWN)</b></td><td>Menggabungkan teras DEB dan DPN: pertumbuhan mampan dan daya tahan ekonomi, masyarakat bersatu dan saksama, masyarakat berpengetahuan, membasmi kemiskinan di kawasan terpencil (Orang Asli, minoriti bumiputera Sabah dan Sarawak), sasaran 30% pemilikan ekuiti bumiputera.</td></tr>
<tr><td><b>Dasar Pendidikan Negara</b></td><td>Perpaduan, cara hidup demokrasi, masyarakat adil, budaya nasional, masyarakat maju berasaskan sains dan teknologi.</td></tr>
</tbody></table></div>
<div class="jadual"><table><caption>Agensi kerajaan</caption>
<thead><tr><th>Agensi</th><th>Peranan</th></tr></thead>
<tbody>
<tr><td>Jabatan Kebajikan Masyarakat (JKM)</td><td>Perlindungan dan pemulihan kumpulan sasar: kanak-kanak bawah 18 tahun, OKU, warga emas 60 tahun ke atas, orang papa, mangsa bencana.</td></tr>
<tr><td>Amanah Ikhtiar Malaysia (AIM)</td><td>Pembiayaan ikhtiar untuk menambah pendapatan golongan kurang berkemampuan.</td></tr>
<tr><td>Baitulmal</td><td>Menggunakan kutipan zakat untuk mengurangkan kemiskinan tegar dalam kalangan umat Islam.</td></tr>
<tr><td>Agensi pembangunan wilayah</td><td>FELDA (pembangunan tanah), FELCRA (penyusunan semula kampung), RISDA (tanam semula getah), KEMAS (kelas bimbingan, membasmi buta huruf), KARYANEKA (memasarkan kraf).</td></tr>
<tr><td>FAMA</td><td>Memastikan petani mendapat harga berpatutan melalui infrastruktur dan rantaian bekalan pemasaran yang cekap.</td></tr>
</tbody></table></div>
<div class="grid-3">
  <div class="kad-mini"><b>PPRT</b><p>Program Pembangunan Rakyat Termiskin: kemudahan untuk isi rumah termiskin; diperkukuh melalui Skim Pembangunan Kesejahteraan Rakyat (SPKR).</p></div>
  <div class="kad-mini"><b>RMT</b><p>Rancangan Makanan Tambahan: makanan seimbang untuk murid supaya dapat menumpukan perhatian dalam pembelajaran.</p></div>
  <div class="kad-mini"><b>SBT</b><p>Skim Baucar Tuisyen: tuisyen berstruktur bagi murid miskin Tahun 4 hingga 6 dalam BM, BI, Sains dan Matematik.</p></div>
</div>
`
    }
  ],
  kad: [
    { d: "Maksud <b>kemiskinan mutlak</b>", b: "Pendapatan tidak mencukupi untuk keperluan minimum berdasarkan pendapatan garis kemiskinan (PGK).", t: "6.1" },
    { d: "Maksud <b>kemiskinan relatif</b>", b: "Ketidaksamaan taraf hidup atau pendapatan antara kumpulan: etnik, strata dan negeri.", t: "6.1" },
    { d: "Maksud <b>miskin tegar</b>", b: "Pendapatan purata bulanan kurang daripada PGK makanan.", t: "6.1" },
    { d: "Rumus <b>kadar kemiskinan</b>", b: "Bilangan isi rumah miskin ÷ jumlah isi rumah × 100.", t: "6.1" },
    { d: "Empat <b>punca kemiskinan</b> di Malaysia", b: "Akses pasaran, modal, teknologi, pendidikan.", t: "6.1" },
    { d: "Tiga kaedah mengukur <b>agihan pendapatan</b>", b: "Kaedah persentil, keluk Lorenz, pekali Gini.", t: "6.2" },
    { d: "Julat dan maksud <b>pekali Gini</b>", b: "0 (saksama sepenuhnya) hingga 1 (paling tidak saksama).", t: "6.2" },
    { d: "Tafsiran <b>keluk Lorenz</b>", b: "Semakin jauh keluk daripada garis kesaksamaan 45°, semakin tidak setara agihan pendapatan.", t: "6.2" },
    { d: "Contoh <b>bayaran pindahan</b>", b: "Pencen, elaun pengangguran, derma: pendapatan tanpa sumbangan produktif.", t: "6.2" },
    { d: "Dua matlamat <b>Dasar Ekonomi Baru</b>", b: "Membasmi kemiskinan tanpa mengira kaum; menyusun semula masyarakat.", t: "6.3" },
    { d: "Sasaran pemilikan ekuiti bumiputera dalam <b>DWN</b>", b: "Sekurang-kurangnya 30%.", t: "6.3" },
    { d: "Peranan <b>Baitulmal</b>", b: "Menggunakan kutipan zakat untuk mengurangkan kemiskinan tegar umat Islam.", t: "6.3" },
    { d: "Peranan <b>RISDA</b> dan <b>FELCRA</b>", b: "RISDA: tanam semula getah pekebun kecil. FELCRA: penyatuan dan pemulihan tanah serta penyusunan semula kampung.", t: "6.3" },
    { d: "Tujuan <b>RMT</b> dan <b>SBT</b>", b: "RMT: makanan tambahan untuk murid. SBT: baucar tuisyen murid miskin Tahun 4–6.", t: "6.3" }
  ],
  kuiz: []
});
