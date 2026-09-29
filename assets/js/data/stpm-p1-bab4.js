/* =========================================================
   STPM Penggal 1 · Bab 4 · Struktur Pasaran, Penentuan Harga dan Output
   Sumber: Modul PdP Ekonomi Penggal 1 Mikroekonomi, Bab 4
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p1-b4",
  peringkat: "stpm",
  tingkatan: 1,
  no: 4,
  tajuk: "Struktur Pasaran, Penentuan Harga dan Output",
  warna: "var(--bab-rm20)",
  ringkas:
    "Firma memaksimumkan untung pada MR = MC. Bab ini membandingkan pasaran persaingan sempurna, monopoli dan persaingan bermonopoli dari segi ciri, keseimbangan jangka pendek dan jangka panjang, kecekapan serta dasar kawalan monopoli.",
  seksyen: [
    {
      no: "4.1",
      tajuk: "Konsep Hasil dan Untung",
      soalan: ["Apakah TR, AR dan MR?", "Apakah beza untung perakaunan dengan untung ekonomi?"],
      html: `
<div class="grid-3">
  <div class="kad-mini"><b>Jumlah hasil (TR)</b><p>Jumlah bayaran yang diterima firma daripada kuantiti keluaran yang dijual. <b>TR = P × Q</b></p></div>
  <div class="kad-mini"><b>Hasil purata (AR)</b><p>Hasil jualan seunit keluaran. <b>AR = TR ÷ Q</b> (= P)</p></div>
  <div class="kad-mini"><b>Hasil sut (MR)</b><p>Perubahan TR akibat jualan tambahan satu unit. <b>MR = ΔTR ÷ ΔQ</b></p></div>
</div>
<div class="kotak def"><span class="kotak-label">Untung</span><p>Ganjaran kepada usahawan kerana menanggung risiko ketidakpastian: perbezaan antara jumlah hasil dengan jumlah kos, <b>π = TR − TC</b>.</p></div>
<div class="jadual"><table><caption>Jenis untung</caption>
<thead><tr><th>Jenis</th><th>Rumus</th></tr></thead>
<tbody>
<tr><td>Untung perakaunan</td><td>π = TR − kos eksplisit</td></tr>
<tr><td>Untung ekonomi</td><td>π = TR − (kos eksplisit + kos implisit)</td></tr>
</tbody></table></div>
`
    },
    {
      no: "4.2",
      tajuk: "Struktur Pasaran",
      soalan: ["Apakah ciri yang membezakan struktur pasaran?"],
      html: `
<div class="kotak def"><span class="kotak-label">Struktur pasaran</span><p>Pengelasan firma kepada pelbagai pasaran berdasarkan jenis barang, bilangan firma, kebebasan keluar masuk, kuasa menentukan harga dan persaingan bukan harga.</p></div>
<div class="jadual"><table><caption>Perbandingan ciri struktur pasaran</caption>
<thead><tr><th>Ciri</th><th>Persaingan sempurna (PPS)</th><th>Monopoli</th><th>Persaingan bermonopoli</th></tr></thead>
<tbody>
<tr><td>Definisi</td><td>Banyak firma menjual barang yang sama (homogen)</td><td>Satu firma menjual barang tanpa pengganti hampir</td><td>Banyak firma menjual barang yang boleh dibezakan</td></tr>
<tr><td>Bilangan firma</td><td>Ramai firma kecil</td><td>Satu pengeluar tunggal</td><td>Banyak, tetapi kurang daripada PPS; tidak bekerjasama</td></tr>
<tr><td>Jenis barang</td><td>Homogen, pengganti sempurna</td><td>Tiada pengganti</td><td>Boleh dibezakan</td></tr>
<tr><td>Keluar masuk</td><td>Bebas</td><td>Tidak bebas (ada halangan)</td><td>Bebas</td></tr>
<tr><td>Kuasa harga</td><td>Tiada; firma <b>penerima harga</b></td><td>Ada kuasa menentukan harga</td><td>Sedikit kuasa</td></tr>
<tr><td>Persaingan bukan harga</td><td>Tidak perlu</td><td>Tidak perlu</td><td>Ada: iklan, galakan jualan, pembezaan produk, khidmat selepas jualan</td></tr>
<tr><td>Keluk DD firma</td><td>Mendatar (anjal sempurna): DD = P = AR = MR</td><td>Bercerun negatif, kurang anjal</td><td>Bercerun negatif, lebih anjal</td></tr>
</tbody></table></div>
`
    },
    {
      no: "4.3",
      tajuk: "Pasaran Persaingan Sempurna",
      soalan: [
        "Mengapakah firma memilih keluaran pada MR = MC?",
        "Bilakah firma PPS terus beroperasi atau menutup perniagaan?",
        "Bagaimanakah keseimbangan jangka panjang dicapai?"
      ],
      html: `
<h3>4.3.1 Penentuan output firma jangka pendek</h3>
<p>Harga ditentukan oleh permintaan dan penawaran pasaran. Firma PPS menerima harga itu, maka keluk permintaan firma <b>mendatar</b>: DD = P = AR = MR.</p>
<div class="kotak def"><span class="kotak-label">Syarat keseimbangan firma</span><p><b>MR = MC</b> (dengan MC sedang meningkat). Pada keluaran Q₁ &lt; Q₀, MR &gt; MC: tambahan hasil melebihi tambahan kos, maka firma menambah keluaran. Pada Q₂ &gt; Q₀, MR &lt; MC: firma mengurangkan keluaran. Untung maksimum pada Q₀.</p></div>
<div class="jadual"><table><caption>Keseimbangan jangka pendek firma PPS</caption>
<thead><tr><th>Keadaan</th><th>Syarat</th><th>Keputusan</th></tr></thead>
<tbody>
<tr><td>Untung lebih normal</td><td>AR &gt; AC (TR &gt; TC)</td><td>Untung = (P − AC) × Q</td></tr>
<tr><td>Untung normal</td><td>AR = AC (TR = TC)</td><td>Untung ekonomi sifar</td></tr>
<tr><td>Untung kurang normal (rugi)</td><td>AR &lt; AC (TR &lt; TC)</td><td>Rugi = (AC − P) × Q</td></tr>
</tbody></table></div>
<div class="jadual"><table><caption>Tindakan firma apabila rugi dalam jangka pendek</caption>
<thead><tr><th>Keadaan</th><th>Tindakan</th><th>Sebab</th></tr></thead>
<tbody>
<tr><td>TR &gt; TVC (P &gt; AVC)</td><td><b>Teruskan</b> perniagaan</td><td>TR menampung semua kos berubah dan sebahagian kos tetap</td></tr>
<tr><td>TR = TVC (P = AVC)</td><td>Membuat pilihan (titik tutup)</td><td>TR hanya menampung kos berubah</td></tr>
<tr><td>TR &lt; TVC (P &lt; AVC)</td><td><b>Tutup</b> perniagaan</td><td>TR tidak dapat menampung kos berubah</td></tr>
</tbody></table></div>
<figure data-graf="struktur-pasaran" data-opt='{"jenis":"pps"}'></figure>
<h3>Keseimbangan jangka panjang</h3>
<p>Syarat: <b>LMR = LMC</b>. Jika firma mendapat untung lebih normal, firma baharu masuk, penawaran pasaran bertambah, harga turun sehingga untung normal. Jika firma rugi, firma keluar, penawaran berkurang, harga naik sehingga untung normal. Dalam jangka panjang firma PPS memperoleh <b>untung normal</b> pada LAC minimum.</p>
`
    },
    {
      no: "4.4",
      tajuk: "Pasaran Monopoli",
      soalan: [
        "Apakah faktor yang mewujudkan monopoli?",
        "Bagaimanakah monopoli dibandingkan dengan persaingan sempurna?",
        "Apakah dasar kawalan monopoli?"
      ],
      html: `
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Faktor mewujudkan monopoli</span><ol>
    <li>Halangan undang-undang (contoh hak cipta, lesen)</li>
    <li>Kawalan atas sumber penting</li>
    <li>Wujud ekonomi bidangan</li>
    <li>Penggabungan dan pengambilalihan firma baharu</li></ol></div>
  <div class="kotak fokus"><span class="kotak-label">Keluk permintaan monopoli</span><p>Keluk DD = AR bercerun negatif dan kurang anjal. Keluk MR terletak di bawah AR.</p></div>
</div>
<h3>4.4.1 Keseimbangan monopoli</h3>
<p>Keseimbangan pada <b>MR = MC</b> (keluaran Q₀). Harga dibaca pada keluk AR di atas Q₀. Monopoli boleh mendapat untung lebih normal atau rugi dalam jangka pendek, dan boleh mengekalkan untung lebih normal dalam jangka panjang kerana ada halangan kemasukan.</p>
<figure data-graf="struktur-pasaran" data-opt='{"jenis":"mono"}'></figure>
<h3>4.4.2 Monopoli semula jadi</h3>
<p>Monopoli yang beroperasi ketika kos purata jangka panjang <b>sedang menurun</b> (monopoli kos menurun). Keseimbangan pada MR = MC dan firma memperoleh untung lebih normal.</p>
<h3>4.4.3 Perbandingan PPS dan monopoli pada keseimbangan</h3>
<div class="jadual"><table><caption>PPS berbanding monopoli</caption>
<thead><tr><th>Aspek</th><th>PPS</th><th>Monopoli</th></tr></thead>
<tbody>
<tr><td>Harga</td><td>Lebih rendah</td><td>Lebih tinggi</td></tr>
<tr><td>Kuantiti</td><td>Lebih banyak</td><td>Lebih sedikit</td></tr>
<tr><td>Untung jangka panjang</td><td>Normal</td><td>Lebih normal</td></tr>
<tr><td>Lebihan pengguna</td><td>Lebih besar</td><td>Lebih kecil</td></tr>
<tr><td>Lebihan pengeluar</td><td>Lebih kecil</td><td>Lebih besar</td></tr>
<tr><td>Kecekapan peruntukan (P = MC)</td><td>Cekap</td><td>Tidak cekap (P &gt; MC)</td></tr>
<tr><td>Kecekapan pengeluaran (LAC minimum)</td><td>Cekap</td><td>Tidak cekap (LAC masih menurun)</td></tr>
</tbody></table></div>
<h3>4.4.4 Dasar kawalan monopoli</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Peletakan harga kos purata (P = AC)</b><p>Harga turun, kuantiti bertambah, firma memperoleh <b>untung normal</b>.</p></div>
  <div class="kad-mini"><b>Peletakan harga kos sut (P = MC)</b><p>Harga turun, kuantiti bertambah, untung semakin kecil. Peruntukan sumber menjadi cekap kerana P = MC.</p></div>
</div>
<div class="kotak contoh"><span class="kotak-label">Panduan menjawab · Bahagian C (dibaca daripada rajah modul)</span>
<div class="kira">
<div class="baris">(a)(i) MR = MC: harga RM20, kuantiti 50 unit</div>
<div class="baris">(a)(ii) Untung = (20 × 50) − (12 × 50) = RM400</div>
<div class="baris">(a)(iii) Lebihan pengguna = ½ × (30 − 20) × 50 = RM250</div>
<div class="baris">(b)(i) P = MC: harga RM15, kuantiti 70 unit</div>
<div class="baris jawapan">(b)(ii) Lebihan pengguna baharu = ½ × (30 − 15) × 70 = RM525; bertambah RM275</div>
</div></div>
`
    },
    {
      no: "4.5",
      tajuk: "Pasaran Persaingan Bermonopoli",
      soalan: ["Bagaimanakah firma bermonopoli mencapai keseimbangan jangka pendek dan jangka panjang?", "Apakah bentuk persaingan bukan harga?"],
      html: `
<p>Keluk permintaan firma bercerun negatif dan <b>lebih anjal</b> kerana ada banyak barang pengganti hampir. Keseimbangan pada <b>MR = MC</b>.</p>
<div class="jadual"><table><caption>Keseimbangan jangka pendek dan tindakan apabila rugi</caption>
<thead><tr><th>Keadaan</th><th>Keterangan</th></tr></thead>
<tbody>
<tr><td>Untung lebih normal</td><td>AR &gt; AC pada Q₀</td></tr>
<tr><td>Untung normal</td><td>AR = AC pada Q₀</td></tr>
<tr><td>Rugi, TR &gt; TVC</td><td>Teruskan perniagaan</td></tr>
<tr><td>Rugi, TR = TVC</td><td>Membuat pilihan</td></tr>
<tr><td>Rugi, TR &lt; TVC</td><td>Tutup perniagaan</td></tr>
</tbody></table></div>
<p><b>Jangka panjang (LMR = LMC):</b> untung lebih normal menarik firma baharu masuk sehingga keluk DD firma beralih ke kiri dan menyentuh LAC; rugi menyebabkan firma keluar. Akhirnya firma memperoleh <b>untung normal</b>, dengan keluk AR bersentuhan dengan LAC.</p>
<figure data-graf="struktur-pasaran" data-opt='{"jenis":"bermono"}'></figure>
<h3>4.5.2 Persaingan bukan harga</h3>
<div class="kotak def"><span class="kotak-label">Maksud</span><p>Usaha firma untuk menarik pengguna dan meluaskan pasaran <b>tanpa menggunakan harga</b> untuk bersaing.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Pembezaan produk</b><p>Reka bentuk, jenama, corak, pembungkusan.</p></div>
  <div class="kad-mini"><b>Pengiklanan</b><p>Memberi maklumat tentang barang.</p></div>
  <div class="kad-mini"><b>Galakan jualan</b><p>Contoh sampel percuma.</p></div>
  <div class="kad-mini"><b>Khidmat selepas jualan</b><p>Jaminan, servis percuma, penghantaran percuma.</p></div>
</div>
<div class="kotak tip"><span class="kotak-label">Tip esei</span><p>Soalan "lima perbezaan PPS dan monopoli" boleh dijawab dengan: jenis barang, bilangan firma, kebebasan keluar masuk, kuasa menentukan harga, harga keluaran, kuantiti keluaran dan lebihan pengguna. Ingat: barang monopoli <b>tiada pengganti hampir</b>; barang yang boleh dibezakan ialah ciri persaingan bermonopoli.</p></div>
`
    }
  ],
  kad: [
    { d: "Rumus <b>TR</b>, <b>AR</b> dan <b>MR</b>", b: "TR = P × Q. AR = TR ÷ Q. MR = ΔTR ÷ ΔQ.", t: "4.1" },
    { d: "Beza <b>untung perakaunan</b> dan <b>untung ekonomi</b>", b: "Perakaunan: TR − kos eksplisit. Ekonomi: TR − (kos eksplisit + kos implisit).", t: "4.1" },
    { d: "Lima ciri pengelasan <b>struktur pasaran</b>", b: "Jenis barang, bilangan firma, kebebasan keluar masuk, kuasa menentukan harga, persaingan bukan harga.", t: "4.2" },
    { d: "Ciri <b>pasaran persaingan sempurna</b>", b: "Ramai firma kecil, barang homogen, bebas keluar masuk, firma penerima harga, tiada persaingan bukan harga.", t: "4.2" },
    { d: "Bentuk keluk permintaan firma <b>PPS</b>", b: "Mendatar (anjal sempurna): DD = P = AR = MR.", t: "4.3" },
    { d: "Syarat <b>keseimbangan firma</b>", b: "MR = MC, dengan MC sedang meningkat.", t: "4.3" },
    { d: "Mengapa firma menambah keluaran apabila MR > MC?", b: "Tambahan hasil daripada seunit lagi melebihi tambahan kosnya, jadi untung bertambah.", t: "4.3" },
    { d: "Firma PPS rugi tetapi <b>TR > TVC</b>", b: "Teruskan operasi dalam jangka pendek: TR menampung semua kos berubah dan sebahagian kos tetap.", t: "4.3" },
    { d: "Bila firma <b>menutup</b> perniagaan dalam jangka pendek?", b: "Apabila TR < TVC (P < AVC).", t: "4.3" },
    { d: "Keseimbangan jangka panjang firma <b>PPS</b>", b: "LMR = LMC; untung normal kerana firma bebas keluar masuk, pada LAC minimum.", t: "4.3" },
    { d: "Empat faktor mewujudkan <b>monopoli</b>", b: "Halangan undang-undang, kawalan sumber penting, ekonomi bidangan, penggabungan dan pengambilalihan.", t: "4.4" },
    { d: "Maksud <b>monopoli semula jadi</b>", b: "Monopoli yang beroperasi ketika kos purata jangka panjang sedang menurun (monopoli kos menurun).", t: "4.4" },
    { d: "Harga dan kuantiti: PPS berbanding monopoli", b: "PPS: harga lebih rendah, kuantiti lebih banyak. Monopoli: harga lebih tinggi, kuantiti lebih sedikit.", t: "4.4" },
    { d: "Kecekapan <b>peruntukan</b> dan <b>pengeluaran</b> dalam PPS", b: "Peruntukan: P = MC. Pengeluaran: keluaran pada LAC minimum. Monopoli tidak mencapai kedua-duanya.", t: "4.4" },
    { d: "Dasar peletakan harga <b>kos purata</b>", b: "P = AC: harga turun, kuantiti naik, monopoli memperoleh untung normal.", t: "4.4" },
    { d: "Dasar peletakan harga <b>kos sut</b>", b: "P = MC: harga turun, kuantiti naik, untung semakin kecil, peruntukan sumber cekap.", t: "4.4" },
    { d: "Ciri <b>persaingan bermonopoli</b>", b: "Banyak firma, barang boleh dibezakan, bebas keluar masuk, sedikit kuasa harga, ada persaingan bukan harga.", t: "4.5" },
    { d: "Keseimbangan jangka panjang <b>persaingan bermonopoli</b>", b: "LMR = LMC; firma baharu masuk atau keluar sehingga untung normal, AR bersentuhan dengan LAC.", t: "4.5" },
    { d: "Maksud <b>persaingan bukan harga</b>", b: "Usaha menarik pengguna dan meluaskan pasaran tanpa bersaing melalui harga.", t: "4.5" },
    { d: "Empat bentuk <b>persaingan bukan harga</b>", b: "Pembezaan produk, pengiklanan, galakan jualan, khidmat selepas jualan.", t: "4.5" }
  ],
  kuiz: []
});
