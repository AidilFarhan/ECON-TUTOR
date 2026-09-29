/* =========================================================
   STPM Penggal 1 · Bab 3 · Teori Pengeluaran dan Kos Pengeluaran
   Sumber: Modul PdP Ekonomi Penggal 1 Mikroekonomi, Bab 3
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p1-b3",
  peringkat: "stpm",
  tingkatan: 1,
  no: 3,
  tajuk: "Teori Pengeluaran dan Kos Pengeluaran",
  warna: "var(--bab-rm10)",
  ringkas:
    "Firma menukar input kepada keluaran melalui fungsi pengeluaran. Bab ini merangkumi TP, AP, MP dan hukum pulangan berkurangan, kos jangka pendek dan jangka panjang, serta ekonomi dan tak ekonomi bidangan.",
  seksyen: [
    {
      no: "3.1",
      tajuk: "Firma dan Industri",
      soalan: ["Apakah beza firma dengan industri?"],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Firma</span><p>Satu unit pengeluar yang menggunakan kombinasi faktor tertentu untuk mengeluarkan suatu produk. Contoh: Syarikat Penerbitan Pelangi, Proton Holdings.</p></div>
  <div class="kotak def"><span class="kotak-label">Industri</span><p>Sekumpulan firma yang mengeluarkan produk yang sama atau hampir sama dalam suatu pasaran. Contoh: industri makanan segera (Marrybrown, KFC, A&amp;W, McDonald's, Pizza Hut).</p></div>
</div>
`
    },
    {
      no: "3.2",
      tajuk: "Fungsi Pengeluaran",
      soalan: [
        "Apakah beza input tetap dengan input berubah, dan jangka pendek dengan jangka panjang?",
        "Bagaimanakah TP, AP dan MP berkait?",
        "Apakah hukum pulangan berkurangan?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Fungsi pengeluaran</span><p>Persamaan yang menunjukkan hubungan antara kuantiti keluaran dengan kuantiti input yang digunakan: <b>Qx = f(K, L)</b>, dengan K = input tetap (contoh tanah) dan L = input berubah (contoh buruh).</p></div>
<div class="jadual"><table><caption>Konsep asas pengeluaran</caption>
<thead><tr><th>Konsep</th><th>Maksud</th></tr></thead>
<tbody>
<tr><td><b>Input tetap</b></td><td>Jumlahnya tidak berubah walaupun keluaran bertambah; wujud dalam jangka pendek sahaja. Contoh: bangunan, tanah.</td></tr>
<tr><td><b>Input berubah</b></td><td>Jumlahnya berubah mengikut keluaran; wujud dalam jangka pendek dan jangka panjang. Contoh: bahan mentah, buruh.</td></tr>
<tr><td><b>Jangka pendek</b></td><td>Masih ada input yang tidak berubah kuantitinya.</td></tr>
<tr><td><b>Jangka panjang</b></td><td>Semua input boleh berubah kuantitinya.</td></tr>
</tbody></table></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span>
<div class="rumus-baris">TP = AP × L</div>
<div class="rumus-baris">AP = <span class="pecahan"><span>TP</span><span>L</span></span></div>
<div class="rumus-baris">MP = <span class="pecahan"><span>ΔTP</span><span>ΔL</span></span></div></div>
<div class="jadual"><table><caption>Contoh penghitungan TP, AP dan MP</caption>
<thead><tr><th class="n">Input berubah</th><th class="n">TP</th><th class="n">AP</th><th class="n">MP</th></tr></thead>
<tbody>
<tr><td class="n">1</td><td class="n">5</td><td class="n">5.00</td><td class="n">5</td></tr>
<tr><td class="n">2</td><td class="n">13</td><td class="n">6.50</td><td class="n">8</td></tr>
<tr><td class="n">3</td><td class="n">23</td><td class="n">7.67</td><td class="n">10</td></tr>
<tr><td class="n">4</td><td class="n">30</td><td class="n">7.50</td><td class="n">7</td></tr>
<tr><td class="n">5</td><td class="n">35</td><td class="n">7.00</td><td class="n">5</td></tr>
<tr><td class="n">6</td><td class="n">35</td><td class="n">5.83</td><td class="n">0</td></tr>
<tr><td class="n">7</td><td class="n">33</td><td class="n">4.71</td><td class="n">−2</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Hubungan TP dan MP</span><ul>
    <li>TP meningkat → MP positif (input 0 hingga 6).</li>
    <li>TP maksimum → MP = 0 (input 6).</li>
    <li>TP menurun → MP negatif (selepas input 6).</li></ul></div>
  <div class="kotak fokus"><span class="kotak-label">Hubungan AP dan MP</span><ul>
    <li>AP meningkat → MP &gt; AP.</li>
    <li>AP maksimum → MP = AP.</li>
    <li>AP menurun → MP &lt; AP.</li></ul></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Dalam jadual di atas, AP paling tinggi pada input <b>3 unit</b> (7.67). Selepas itu MP (7) sudah lebih rendah daripada AP (7.50), maka AP mula menurun. Modul asal menyebut input 5 unit bagi AP maksimum; nilai itu tidak sepadan dengan jadual.</p></div>
<div class="kotak def"><span class="kotak-label">Hukum pulangan berkurangan</span><p>Apabila input berubah ditambah secara berterusan ke atas input tetap, <b>tambahan keluaran (MP) semakin berkurang</b>. Pada rajah, ia berlaku semasa MP menurun tetapi masih positif.</p></div>
<figure data-graf="tp-ap-mp"></figure>
`
    },
    {
      no: "3.3",
      tajuk: "Kos Pengeluaran",
      soalan: [
        "Apakah beza kos eksplisit, kos implisit, kos perakaunan dan kos ekonomi?",
        "Bagaimanakah keluk AC, AVC, AFC dan MC berkait?",
        "Mengapakah keluk AC berbentuk U dan bagaimana LAC terbentuk?"
      ],
      html: `
<h3>3.3.1 Kos pengeluaran jangka pendek</h3>
<div class="jadual"><table><caption>Jenis kos</caption>
<thead><tr><th>Kos</th><th>Maksud</th></tr></thead>
<tbody>
<tr><td><b>Kos pengeluaran</b></td><td>Jumlah perbelanjaan pengeluar untuk mendapatkan input dan mengeluarkan output.</td></tr>
<tr><td><b>Kos eksplisit</b></td><td>Kos yang dibayar untuk mendapatkan faktor pengeluaran: sewa bangunan, upah buruh, bahan mentah.</td></tr>
<tr><td><b>Kos implisit</b></td><td>Kos yang tidak dibayar kerana menggunakan input milik sendiri, contoh tapak sendiri untuk kilang.</td></tr>
<tr><td><b>Kos perakaunan</b></td><td>= Jumlah kos eksplisit.</td></tr>
<tr><td><b>Kos ekonomi</b></td><td>= Jumlah kos eksplisit + jumlah kos implisit.</td></tr>
</tbody></table></div>
<div class="kotak rumus"><span class="kotak-label">Rumus kos jangka pendek</span>
<div class="rumus-baris">TC = TFC + TVC = AC × Q</div>
<div class="rumus-baris">TFC = TC − TVC = AFC × Q</div>
<div class="rumus-baris">TVC = TC − TFC = AVC × Q</div>
<div class="rumus-baris">AC = AFC + AVC = <span class="pecahan"><span>TC</span><span>Q</span></span></div>
<div class="rumus-baris">AFC = <span class="pecahan"><span>TFC</span><span>Q</span></span>, AVC = <span class="pecahan"><span>TVC</span><span>Q</span></span></div>
<div class="rumus-baris">MC = <span class="pecahan"><span>ΔTC</span><span>ΔQ</span></span></div></div>
<div class="grid-2">
  <div class="kad-mini"><b>TFC</b><p>Perbelanjaan untuk input tetap, contoh mesin dan sewa tapak. Keluk mendatar.</p></div>
  <div class="kad-mini"><b>TVC</b><p>Perbelanjaan untuk input berubah, contoh upah buruh dan bahan mentah. Bermula dari asalan.</p></div>
</div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Hubungan AC, AVC dan AFC</span><ul>
    <li>Jarak menegak AC = AVC + AFC pada setiap keluaran.</li>
    <li>AVC mencapai minimum <b>lebih awal</b> daripada AC.</li>
    <li>AFC berbentuk hiperbola dan terus menurun.</li>
    <li>Antara Q₀ dan Q₁, AVC meningkat tetapi AC masih menurun.</li></ul></div>
  <div class="kotak fokus"><span class="kotak-label">Hubungan MC dengan AC dan AVC</span><ul>
    <li>AC (atau AVC) menurun → MC lebih rendah daripadanya.</li>
    <li>AC (atau AVC) minimum → MC = AC (atau AVC).</li>
    <li>AC (atau AVC) meningkat → MC lebih tinggi daripadanya.</li>
    <li>MC memotong AVC dahulu, kemudian AC, pada titik minimum masing-masing.</li></ul></div>
</div>
<div class="kotak def"><span class="kotak-label">Mengapa AC berbentuk U</span><ol>
<li><b>Hukum pulangan:</b> bahagian menurun kerana pulangan bertambah; bahagian menaik kerana hukum pulangan berkurangan.</li>
<li><b>Perubahan kos tetap purata:</b> mula-mula AFC dan AVC sama-sama menurun; kemudian kenaikan AVC melebihi kejatuhan AFC.</li></ol></div>
<figure data-graf="kos"></figure>
<div class="kotak contoh"><span class="kotak-label">Panduan menjawab · Bahagian C</span>
<p>Firma A: TC RM400, AFC RM4.00, AC RM5.00. Firma B: TC RM600, AFC RM5.00, AC RM8.00.</p>
<div class="kira">
<div class="baris">(i) Q = TC ÷ AC: Qa = 400 ÷ 5 = 80 unit; Qb = 600 ÷ 8 = 75 unit</div>
<div class="baris">(ii) AVC = AC − AFC: AVCa = 5 − 4 = RM1.00; AVCb = 8 − 5 = RM3.00</div>
<div class="baris">(iii) TFC = AFC × Q: TFCa = 4 × 80 = RM320; TFCb = 5 × 75 = RM375</div>
<div class="baris jawapan">(iv) TVC = TC − TFC: TVCa = 400 − 320 = RM80; TVCb = 600 − 375 = RM225</div>
</div></div>

<h3>3.3.2 Kos pengeluaran jangka panjang</h3>
<p>Dalam jangka panjang, semua input boleh berubah. <b>Keluk kos purata jangka panjang (LAC)</b> menunjukkan kos purata jangka pendek yang paling rendah yang dipilih pada pelbagai tingkat keluaran.</p>
<ul>
<li>SAC₁, SAC₂ dan SAC₃ mewakili tiga saiz loji. Firma memilih loji yang meminimumkan kos.</li>
<li>Pada 10 unit, SAC₁ dipilih kerana kos puratanya lebih rendah daripada SAC₂; pada 12 dan 20 unit, SAC₂ dipilih; pada 25 unit, SAC₂ masih lebih murah daripada SAC₃.</li>
<li>Titik-titik kos terendah yang dipilih disambung untuk membentuk keluk LAC (keluk sampul).</li>
</ul>
`
    },
    {
      no: "3.4",
      tajuk: "Ekonomi Bidangan dan Tak Ekonomi Bidangan",
      soalan: ["Apakah punca ekonomi dan tak ekonomi bidangan dalaman serta luaran?", "Bagaimanakah kesannya ke atas keluk LAC?"],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Ekonomi bidangan</span><p>Faedah yang diperoleh firma yang menyebabkan kos purata jangka panjang <b>berkurang</b> apabila mengeluarkan output secara besar-besaran.</p></div>
  <div class="kotak def"><span class="kotak-label">Tak ekonomi bidangan</span><p>Masalah yang dihadapi firma yang menyebabkan kos purata jangka panjang <b>meningkat</b> apabila mengeluarkan output secara besar-besaran.</p></div>
</div>
<p><b>Dalaman</b> berpunca daripada keadaan di dalam firma; <b>luaran</b> berpunca daripada keadaan di luar firma (dalam industri atau kawasan).</p>
<div class="jadual"><table><caption>Punca dalaman</caption>
<thead><tr><th>Ekonomi bidangan dalaman</th><th>Tak ekonomi bidangan dalaman</th></tr></thead>
<tbody>
<tr><td><b>Teknikal</b>: teknologi moden, mesin dan jentera</td><td><b>Teknikal</b>: mesin rosak dan haus, kos operasi naik</td></tr>
<tr><td><b>Pemasaran</b>: iklan meluaskan pasaran, permintaan dan hasil bertambah</td><td><b>Pemasaran</b>: iklan dan promosi tidak berkesan</td></tr>
<tr><td><b>Kewangan</b>: firma besar lebih mudah mendapat pinjaman</td><td><b>Kewangan</b>: bayaran balik pinjaman dengan kadar faedah tinggi</td></tr>
<tr><td><b>Pengurusan</b>: pengurus yang cekap</td><td><b>Pengurusan</b>: pengurus yang tidak cekap</td></tr>
<tr><td><b>Pengkhususan</b>: pembahagian kerja (pembuatan, pemasangan, pembungkusan, pemasaran)</td><td><b>Pengkhususan</b>: pekerja jemu dengan kerja berulang, kualiti terjejas</td></tr>
</tbody></table></div>
<div class="jadual"><table><caption>Punca luaran</caption>
<thead><tr><th>Ekonomi bidangan luaran</th><th>Tak ekonomi bidangan luaran</th></tr></thead>
<tbody>
<tr><td><b>Infrastruktur</b>: kemudahan asas seperti air, jalan raya dan elektrik</td><td><b>Kekurangan input</b>: input sukar diperoleh, kos pengangkutan naik</td></tr>
<tr><td><b>Integrasi</b>: mendatar (firma sama keluaran bergabung, contoh penternak ikan keli) atau menegak (firma tayar, cat, badan kereta dan alat ganti bergabung menjadi pengeluar kereta)</td><td><b>Pencemaran</b>: air dan udara menjejaskan operasi, kos tambahan tinggi</td></tr>
<tr><td><b>Bahan mentah</b>: banyak dan mudah diperoleh</td><td><b>Kesesakan</b>: penghantaran lambat, kos pengangkutan naik</td></tr>
<tr><td></td><td><b>Kenaikan harga faktor pengeluaran</b></td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Kesan dalaman ke atas LAC</span><p>Ekonomi bidangan dalaman: LAC <b>mencerun ke bawah</b> hingga Q₁. Tak ekonomi bidangan dalaman: LAC <b>mencerun ke atas</b> selepas Q₁. Hasilnya LAC berbentuk U (pergerakan di sepanjang keluk).</p></div>
  <div class="kotak fokus"><span class="kotak-label">Kesan luaran ke atas LAC</span><p>Ekonomi bidangan luaran: LAC <b>beralih ke bawah</b> (LAC₀ ke LAC₂). Tak ekonomi bidangan luaran: LAC <b>beralih ke atas</b> (LAC₀ ke LAC₁).</p></div>
</div>
`
    }
  ],
  kad: [
    { d: "Beza <b>firma</b> dan <b>industri</b>", b: "Firma: satu unit pengeluar. Industri: sekumpulan firma yang mengeluarkan produk sama atau hampir sama.", t: "3.1" },
    { d: "Maksud <b>fungsi pengeluaran</b>", b: "Hubungan antara kuantiti keluaran dengan kuantiti input: Qx = f(K, L).", t: "3.2" },
    { d: "Beza <b>input tetap</b> dan <b>input berubah</b>", b: "Input tetap tidak berubah dengan keluaran (bangunan, tanah), wujud dalam jangka pendek sahaja. Input berubah berubah dengan keluaran (buruh, bahan mentah).", t: "3.2" },
    { d: "Beza <b>jangka pendek</b> dan <b>jangka panjang</b>", b: "Jangka pendek: masih ada input tetap. Jangka panjang: semua input boleh berubah.", t: "3.2" },
    { d: "Rumus <b>AP</b> dan <b>MP</b>", b: "AP = TP ÷ L. MP = ΔTP ÷ ΔL.", t: "3.2" },
    { d: "Keadaan MP semasa TP <b>maksimum</b>", b: "MP = 0. TP meningkat semasa MP positif dan menurun semasa MP negatif.", t: "3.2" },
    { d: "Keadaan MP semasa AP <b>maksimum</b>", b: "MP = AP. Semasa AP naik, MP > AP; semasa AP turun, MP < AP.", t: "3.2" },
    { d: "<b>Hukum pulangan berkurangan</b>", b: "Apabila input berubah terus ditambah ke atas input tetap, keluaran sut semakin berkurang.", t: "3.2" },
    { d: "Beza <b>kos eksplisit</b> dan <b>kos implisit</b>", b: "Eksplisit: kos yang dibayar (sewa, upah, bahan mentah). Implisit: kos yang tidak dibayar kerana guna input sendiri.", t: "3.3" },
    { d: "Kos <b>perakaunan</b> dan kos <b>ekonomi</b>", b: "Kos perakaunan = kos eksplisit. Kos ekonomi = kos eksplisit + kos implisit.", t: "3.3" },
    { d: "Rumus <b>TC</b>, <b>AC</b> dan <b>MC</b>", b: "TC = TFC + TVC. AC = TC ÷ Q = AFC + AVC. MC = ΔTC ÷ ΔQ.", t: "3.3" },
    { d: "Bentuk keluk <b>AFC</b>", b: "Hiperbola: terus menurun apabila keluaran bertambah.", t: "3.3" },
    { d: "Di mana MC memotong AC dan AVC?", b: "Pada titik minimum AVC dahulu, kemudian titik minimum AC.", t: "3.3" },
    { d: "Dua sebab keluk AC berbentuk <b>U</b>", b: "Hukum pulangan (bertambah kemudian berkurangan) dan perubahan kos tetap purata berbanding kos berubah purata.", t: "3.3" },
    { d: "Maksud keluk <b>LAC</b>", b: "Keluk yang menunjukkan kos purata jangka pendek paling rendah yang dipilih pada pelbagai tingkat keluaran (keluk sampul SAC).", t: "3.3" },
    { d: "TC RM400, AFC RM4, AC RM5: cari Q, AVC, TFC, TVC", b: "Q = 80 unit; AVC = RM1.00; TFC = RM320; TVC = RM80.", t: "3.3" },
    { d: "Maksud <b>ekonomi bidangan</b>", b: "Faedah yang menyebabkan kos purata jangka panjang berkurang apabila firma mengeluarkan output secara besar-besaran.", t: "3.4" },
    { d: "Lima punca <b>ekonomi bidangan dalaman</b>", b: "Teknikal, pemasaran, kewangan, pengurusan, pengkhususan.", t: "3.4" },
    { d: "Punca <b>ekonomi bidangan luaran</b>", b: "Infrastruktur, integrasi (mendatar dan menegak), bahan mentah.", t: "3.4" },
    { d: "Punca <b>tak ekonomi bidangan luaran</b>", b: "Kekurangan input, pencemaran, kesesakan, kenaikan harga faktor pengeluaran.", t: "3.4" },
    { d: "Beza <b>integrasi mendatar</b> dan <b>menegak</b>", b: "Mendatar: firma dengan keluaran sama bergabung. Menegak: firma dengan keluaran berbeza yang menghasilkan barang akhir sama bergabung.", t: "3.4" },
    { d: "Kesan ekonomi bidangan <b>dalaman</b> vs <b>luaran</b> ke atas LAC", b: "Dalaman: pergerakan di sepanjang LAC (mencerun ke bawah, kemudian ke atas). Luaran: LAC beralih ke bawah (ekonomi) atau ke atas (tak ekonomi).", t: "3.4" }
  ],
  kuiz: []
});
