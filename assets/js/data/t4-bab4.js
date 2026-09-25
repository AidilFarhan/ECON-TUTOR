/* =========================================================
   Tingkatan 4 · Bab 4 · Pengeluaran
   Sumber: Buku Teks Ekonomi Tingkatan 4 (KSSM)
   ========================================================= */
EKO.daftarBab({
  id: "t4-b4",
  tingkatan: 4,
  no: 4,
  tajuk: "Pengeluaran",
  warna: "var(--bab-rm20)",
  ringkas:
    "Pengeluaran ialah satu proses transformasi input kepada output. Perbelanjaan firma untuk input ialah kos pengeluaran; semakin tinggi kos, semakin rendah untung. Bab ini merangkumi fungsi pengeluaran jangka pendek, kos, hasil dan untung, tahap pengeluaran paling cekap, produktiviti dan eksternaliti.",
  seksyen: [
    {
      no: "4.1",
      tajuk: "Konsep Pengeluaran, Kos dan Hasil",
      soalan: [
        "Apakah maksud pengeluaran dan fungsi pengeluaran jangka pendek?",
        "Apakah perbelanjaan yang ditanggung oleh pengeluar?",
        "Bagaimanakah jumlah hasil dan untung firma dikira?",
        "Bagaimanakah menentukan tahap pengeluaran yang paling cekap?"
      ],
      html: `
<div class="kotak contoh"><span class="kotak-label">Sepintas lalu</span><p>Syarikat Auf Enterprise, pengeluar produk rotan, bermula di bengkel kecil pada tahun 1990. Apabila permintaan meningkat, Encik Abu Halim membeli peralatan dan bangunan kilang. Rahsianya: memilih bahan mentah berkos rendah, mempelbagaikan reka cipta dan mencari pasaran yang lebih luas.</p></div>

<h3><span class="no">4.1.1</span> Pengeluaran</h3>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Firma</b> ialah unit ekonomi yang produktif, iaitu organisasi yang merancang dan menggabungkan faktor pengeluaran yang terhad untuk menghasilkan barang dan perkhidmatan. Gabungan semua firma yang mengeluarkan keluaran yang sama atau hampir sama membentuk <b>industri</b> (contoh industri kereta: Proton, Perodua, DRB-HICOM).</p></div>
<div class="grid-3">
  <div class="kad-mini"><b>Jenis firma</b><p>Swasta dan awam. Saiz kecil (milikan tunggal, perkongsian) atau besar (syarikat berhad).</p></div>
  <div class="kad-mini"><b>Objektif</b><p>Firma swasta: memaksimumkan keuntungan atau jualan. Firma awam: memaksimumkan kebajikan masyarakat.</p></div>
  <div class="kad-mini"><b>Peranan</b><p>Pembekal barang dan perkhidmatan, pengguna faktor pengeluaran daripada isi rumah, dan pemberi pendapatan kepada isi rumah.</p></div>
</div>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Pengeluaran</b> ialah suatu proses yang menggabungkan faktor pengeluaran (buruh, tanah, modal, usahawan) untuk menghasilkan barang dan perkhidmatan, atau proses mengubah bentuk <b>input</b> kepada <b>output</b>. Contoh: batang pokok → kepingan kayu → perabot, dengan tambahan nilai.</p></div>
<div class="jadual"><table><caption>Input tetap lawan input berubah</caption><thead><tr><th>Input tetap</th><th>Input berubah</th></tr></thead><tbody>
<tr><td>Kuantitinya tetap pada sebarang tingkat output</td><td>Kuantitinya berubah mengikut tingkat output</td></tr>
<tr><td>Wujud pada output sifar</td><td>Tidak wujud pada output sifar</td></tr>
<tr><td>Hanya dalam jangka masa pendek</td><td>Dalam jangka pendek dan jangka panjang</td></tr>
<tr><td>Contoh: mesin, loji, bangunan kilang, tanah</td><td>Contoh: bahan mentah, buruh</td></tr>
</tbody></table></div>
<div class="jadual"><table><caption>Jadual 4.1 Penggunaan input dalam pengeluaran pakaian</caption><thead><tr><th class="n">Output (helai)</th><th class="n">Mesin jahit (input tetap)</th><th class="n">Buruh (input berubah)</th></tr></thead>
<tbody><tr><td class="n">0</td><td class="n">6</td><td class="n">0</td></tr><tr><td class="n">500</td><td class="n">6</td><td class="n">6</td></tr><tr><td class="n">1 000</td><td class="n">6</td><td class="n">10</td></tr><tr><td class="n">2 500</td><td class="n">6</td><td class="n">16</td></tr></tbody></table></div>
<p><span class="istilah">Output</span> ialah barang atau perkhidmatan yang dihasilkan, terdiri daripada <b>barang perantaraan</b> (digunakan dalam pengeluaran seterusnya, contoh tepung untuk kilang biskut) dan <b>barang akhir</b> (barang siap untuk pengguna, contoh biskut).</p>
<div class="grid-2">
  <div class="kad-mini"><b>Jangka masa pendek</b><p>Tempoh apabila wujud sekurang-kurangnya <b>satu input tetap</b>. Output hanya boleh diubah dengan mengubah input berubah, contohnya menambah buruh dengan mesin yang sama.</p></div>
  <div class="kad-mini"><b>Jangka masa panjang</b><p>Tempoh apabila <b>semua input adalah input berubah</b>. Firma boleh menambah mesin, bangunan, tanah, saiz loji dan teknologi.</p></div>
</div>

<h3><span class="no">4.1.2</span> Fungsi Pengeluaran Jangka Pendek</h3>
<p><span class="istilah">Fungsi pengeluaran</span> ialah hubungan antara jumlah input dengan output. Fungsi pengeluaran <b>jangka pendek</b> menunjukkan hubungan antara input berubah dengan output pada suatu tingkat input tetap: Q = f(K̄, L), dengan Q output, K̄ input tetap (mesin) dan L input berubah (buruh).</p>
<p><b>Andaian</b>: hanya dua input (buruh berubah, mesin tetap); buruh mempunyai kemahiran yang sama cekap; tingkat teknologi tetap.</p>
<div class="jadual"><table><caption>Jadual 4.2 Pengeluaran baju sukan (mesin = 2 unit)</caption>
<thead><tr><th class="n">Buruh (L)</th><th class="n">TP (helai)</th><th class="n">AP = TP ÷ L</th><th class="n">MP = ΔTP ÷ ΔL</th></tr></thead><tbody>
<tr><td class="n">0</td><td class="n">0</td><td class="n">0</td><td class="n">–</td></tr><tr><td class="n">1</td><td class="n">4</td><td class="n">4</td><td class="n">4</td></tr><tr><td class="n">2</td><td class="n">10</td><td class="n">5</td><td class="n">6</td></tr><tr><td class="n">3</td><td class="n">24</td><td class="n">8</td><td class="n">14</td></tr><tr><td class="n">4</td><td class="n">36</td><td class="n">9</td><td class="n">12</td></tr><tr><td class="n">5</td><td class="n">40</td><td class="n">8</td><td class="n">4</td></tr><tr><td class="n">6</td><td class="n">42</td><td class="n">7</td><td class="n">2</td></tr><tr><td class="n">7</td><td class="n">42</td><td class="n">6</td><td class="n">0</td></tr><tr><td class="n">8</td><td class="n">40</td><td class="n">5</td><td class="n">−2</td></tr><tr><td class="n">9</td><td class="n">36</td><td class="n">4</td><td class="n">−4</td></tr></tbody></table></div>
<div class="grid-3">
  <div class="kad-mini"><b>Jumlah keluaran (TP)</b><p>Jumlah output daripada sejumlah input. TP = AP × L. TP meningkat, maksimum 42 helai pada buruh ke-7, kemudian menurun.</p></div>
  <div class="kad-mini"><b>Keluaran purata (AP)</b><p>Keluaran seunit input berubah (daya pengeluaran seorang buruh). AP = TP ÷ L. AP maksimum 9 helai pada buruh ke-4; tidak sifar selagi TP positif.</p></div>
  <div class="kad-mini"><b>Keluaran marginal (MP)</b><p>Perubahan TP akibat perubahan seunit input berubah. MP = ΔTP ÷ ΔL. Maksimum 14 helai pada buruh ke-3, sifar pada buruh ke-7, negatif selepas itu.</p></div>
</div>

<h3><span class="no">4.1.3</span> Kos Pengeluaran</h3>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Kos pengeluaran</b> ialah segala perbelanjaan terhadap input yang digunakan dalam proses pengeluaran. Dalam jangka pendek kos terdiri daripada <b>kos tetap</b> dan <b>kos berubah</b>; dalam jangka panjang semua kos adalah kos berubah.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Kos tetap (FC)</b><p>Bayaran terhadap input tetap: sewa bangunan dan tanah, faedah pinjaman, premium insurans kebakaran. Tidak berubah pada setiap tingkat output, wujud pada output sifar, hanya dalam jangka pendek. Keluk FC mendatar. FC = harga input tetap × kuantiti input tetap.</p></div>
  <div class="kad-mini"><b>Kos berubah (VC)</b><p>Bayaran terhadap input berubah: upah buruh, bahan mentah, bil elektrik dan air. Berubah secara langsung dengan output; sifar pada output sifar. VC = harga input berubah × kuantiti input berubah.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Rumus kos</span>
<div class="rumus-baris">TC = FC + VC</div>
<div class="rumus-baris">AC = <span class="pecahan"><span>TC</span><span>Q</span></span> &nbsp; AVC = <span class="pecahan"><span>VC</span><span>Q</span></span> &nbsp; MC = <span class="pecahan"><span>ΔTC</span><span>ΔQ</span></span> = <span class="pecahan"><span>ΔVC</span><span>ΔQ</span></span></div>
<p>Dalam jangka pendek perubahan TC sama dengan perubahan VC kerana FC malar. AVC mula-mula menurun kemudian meningkat kerana <b>hukum pulangan berkurangan</b>.</p></div>

<h3><span class="no">4.1.4</span> Pengiraan Kos Pengeluaran</h3>
<div class="jadual"><table><caption>Jadual 4.3 Kos pengeluaran jangka pendek sebuah firma (RM)</caption>
<thead><tr><th class="n">Q</th><th class="n">FC</th><th class="n">VC</th><th class="n">TC</th><th class="n">AC</th><th class="n">MC</th><th class="n">AVC</th></tr></thead><tbody>
<tr><td class="n">0</td><td class="n">100</td><td class="n">0</td><td class="n">100</td><td class="n">–</td><td class="n">–</td><td class="n">–</td></tr>
<tr><td class="n">1</td><td class="n">100</td><td class="n">50</td><td class="n">150</td><td class="n">150</td><td class="n">50</td><td class="n">50</td></tr>
<tr><td class="n">2</td><td class="n">100</td><td class="n">95</td><td class="n">195</td><td class="n">97.5</td><td class="n">45</td><td class="n">47.5</td></tr>
<tr><td class="n">3</td><td class="n">100</td><td class="n">130</td><td class="n">230</td><td class="n">76.7</td><td class="n">35</td><td class="n">43.3</td></tr>
<tr><td class="n">4</td><td class="n">100</td><td class="n">160</td><td class="n">260</td><td class="n">65</td><td class="n">30</td><td class="n">40</td></tr>
<tr><td class="n">5</td><td class="n">100</td><td class="n">195</td><td class="n">295</td><td class="n">59</td><td class="n">35</td><td class="n">39</td></tr>
<tr><td class="n">6</td><td class="n">100</td><td class="n">245</td><td class="n">345</td><td class="n">57.5</td><td class="n">50</td><td class="n">40.8</td></tr>
<tr><td class="n">7</td><td class="n">100</td><td class="n">315</td><td class="n">415</td><td class="n">59.3</td><td class="n">70</td><td class="n">45</td></tr>
<tr><td class="n">8</td><td class="n">100</td><td class="n">395</td><td class="n">495</td><td class="n">61.9</td><td class="n">80</td><td class="n">49.4</td></tr>
</tbody></table></div>
<div class="kotak contoh"><span class="kotak-label">Contoh pengiraan</span><div class="kira">
<div class="baris">FC (output ke-7) = TC − VC = RM415 − RM315 = RM100</div>
<div class="baris">VC (output ke-2) = TC − FC = RM195 − RM100 = RM95</div>
<div class="baris">TC (output ke-4) = FC + VC = RM100 + RM160 = RM260</div>
<div class="baris">AC (output ke-5) = RM295 ÷ 5 = RM59</div>
<div class="baris">MC (output ke-6) = (RM345 − RM295) ÷ (6 − 5) = RM50</div>
<div class="baris">AVC (output ke-6) = RM245 ÷ 6 = RM40.80</div></div></div>

<h3><span class="no">4.1.5</span> Hubungan antara Perubahan Output dengan Kos</h3>
<figure data-graf="kos"></figure>
<ul>
  <li><b>Jumlah kos</b> berhubung positif dengan output: meningkat daripada RM100 kepada RM495. Perubahan TC sama dengan perubahan VC.</li>
  <li><b>Kos purata</b> menurun daripada RM150 kepada minimum RM57.50 (output ke-6), kemudian meningkat.</li>
  <li><b>Kos marginal</b> menurun kepada minimum RM30 (output ke-4), kemudian meningkat.</li>
  <li><b>Kos berubah purata</b> menurun kepada minimum RM39 (output ke-5), kemudian meningkat.</li>
</ul>
<div class="kotak rumus"><span class="kotak-label">Hubungan AC dengan MC</span><ul><li>Apabila AC menurun, <b>MC &lt; AC</b>.</li><li>Apabila AC minimum, <b>MC = AC</b> (antara output ke-6 dan ke-7).</li><li>Apabila AC meningkat, <b>MC &gt; AC</b>.</li></ul><p>Keluk MC memotong keluk AC pada titik minimum AC.</p></div>
<div class="kotak info"><span class="kotak-label">Ekstra: bila firma patut berhenti operasi?</span><p>Jika harga (P) lebih rendah daripada AC, firma rugi. Namun firma wajar meneruskan operasi jika jumlah hasil sekurang-kurangnya menampung kos berubah. <b>P &gt; AVC</b>: teruskan (rugi hanya sebahagian kos tetap). <b>P = AVC</b>: sama sahaja sama ada teruskan atau tutup (rugi semua kos tetap). <b>P &lt; AVC</b>: berhenti operasi untuk mengurangkan kerugian.</p></div>

<h3><span class="no">4.1.6</span> Konsep Hasil dan Untung</h3>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Hasil</b> ialah jumlah nilai penerimaan yang diperoleh firma daripada jualan keluarannya. <b>Untung</b> ialah perbezaan antara jumlah hasil dengan jumlah kos; ganjaran kepada usahawan kerana menggabungkan faktor dan menanggung risiko ketidakpastian.</p></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">Jumlah hasil (TR) = Harga (P) × Kuantiti jualan (Q)</div><div class="rumus-baris">Untung = Jumlah hasil − Jumlah kos</div><div class="rumus-baris">Untung ekonomi = Jumlah hasil − (Kos eksplisit + Kos implisit)</div></div>
<p>Contoh: Syarikat HHT menjual 120 jam tangan kanak-kanak pada RM15 seunit, TR = <b>RM1 800</b>. Firma boleh menambah jumlah hasil dengan meningkatkan harga atau menambah kuantiti jualan.</p>
<div class="grid-2">
  <div class="kad-mini"><b>Kos eksplisit</b><p>Kos yang dibayar dengan nyata oleh firma untuk input: upah buruh, bahan mentah, bahan api, perkhidmatan pengangkutan, faedah pinjaman bank.</p></div>
  <div class="kad-mini"><b>Kos implisit</b><p>Kos yang sepatutnya dibayar kepada faktor milik sendiri tetapi tidak diambil kira: gaji pemilik sendiri, sewa bangunan milik sendiri, faedah atas modal sendiri. Ia merupakan kos lepas.</p></div>
</div>

<h3><span class="no">4.1.7</span> Pengiraan Jumlah Hasil dan Untung</h3>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Syarikat Bina Jaya</span><div class="kira"><div class="baris">Jumlah hasil RM56 000</div><div class="baris">Kos: bahan mentah RM20 000, upah buruh RM6 800, sewa kilang RM5 600, bahan api RM2 400 = RM34 800</div><div class="baris jawapan">Untung = RM56 000 − RM34 800 = RM21 200</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Kedai bakeri Puan Surayati</span><div class="kira"><div class="baris">Meninggalkan gaji RM3 000 sebulan; menggunakan simpanan RM12 000 (faedah 4% setahun = RM40 sebulan). TR sebulan RM10 000.</div><div class="baris">Kos eksplisit: bahan mentah RM3 000 + gaji pembantu RM900 + bil RM1 000 = RM4 900</div><div class="baris jawapan">Untung = RM10 000 − RM4 900 = RM5 100</div><div class="baris jawapan">Untung ekonomi = RM10 000 − (RM4 900 + RM3 040) = RM2 060</div></div></div>
</div>
<figure data-graf="untung"></figure>

<h3><span class="no">4.1.8</span> Tahap Pengeluaran Paling Cekap</h3>
<div class="kotak def"><span class="kotak-label">Hukum pulangan berkurangan</span><p>Apabila suatu input berubah (contoh buruh) ditambahkan secara berterusan kepada satu input tetap (contoh tanah), maka jumlah keluaran semakin bertambah, tetapi tambahannya semakin berkurangan bagi setiap unit tambahan input berubah. Hukum ini berdasarkan andaian: input berubah homogen (sifat sama), input tetap tidak berubah, dan tingkat teknologi tetap.</p></div>
<div class="jadual"><table><caption>Jadual 4.8 Tahap pengeluaran (tanah = input tetap)</caption>
<thead><tr><th class="n">Buruh</th><th class="n">TP</th><th class="n">AP</th><th class="n">MP</th><th>Tahap</th></tr></thead><tbody>
<tr><td class="n">1</td><td class="n">6</td><td class="n">6</td><td class="n">6</td><td rowspan="3">I: tidak cekap (pembaziran input tetap)</td></tr>
<tr><td class="n">2</td><td class="n">14</td><td class="n">7</td><td class="n">8</td></tr>
<tr><td class="n">3</td><td class="n">24</td><td class="n">8</td><td class="n">10</td></tr>
<tr><td class="n">4</td><td class="n">32</td><td class="n">8</td><td class="n">8</td><td rowspan="6">II: paling cekap (hukum pulangan berkurangan mula di sini)</td></tr>
<tr><td class="n">5</td><td class="n">37</td><td class="n">7.4</td><td class="n">5</td></tr>
<tr><td class="n">6</td><td class="n">41</td><td class="n">6.83</td><td class="n">4</td></tr>
<tr><td class="n">7</td><td class="n">44</td><td class="n">6.28</td><td class="n">3</td></tr>
<tr><td class="n">8</td><td class="n">46</td><td class="n">5.75</td><td class="n">2</td></tr>
<tr><td class="n">9</td><td class="n">46</td><td class="n">5.1</td><td class="n">0</td></tr>
<tr><td class="n">10</td><td class="n">45</td><td class="n">4.5</td><td class="n">−1</td><td>III: tidak cekap (pembaziran input berubah)</td></tr>
</tbody></table></div>
<figure data-graf="tp-ap-mp"></figure>
<div class="grid-3">
  <div class="kad-mini"><b>Tahap I (buruh 1 – 3)</b><p>Dari 0 unit input berubah hingga MP = AP dan AP maksimum. TP naik daripada 6 kepada 24 unit; MP naik lebih cepat daripada AP dan maksimum pada buruh ke-3. Tidak cekap kerana input berubah terlalu kecil berbanding input tetap. Pengeluar rasional tidak berhenti di sini.</p></div>
  <div class="kad-mini"><b>Tahap II (buruh 4 – 9)</b><p>Bermula MP = AP dan berakhir apabila MP = 0. TP naik daripada 32 kepada maksimum 46 unit dengan kadar berkurangan; AP dan MP menurun. Gabungan input paling optimum: tahap paling rasional dan cekap.</p></div>
  <div class="kad-mini"><b>Tahap III (buruh 10 ke atas)</b><p>Bermula MP = 0 (TP maksimum). Menambah buruh menyebabkan TP merosot kepada 45 unit dan MP negatif. Berlaku pembaziran buruh; pengeluar rasional tidak akan mengeluarkan di sini.</p></div>
</div>
`
    },
    {
      no: "4.2",
      tajuk: "Produktiviti dan Eksternaliti",
      soalan: ["Apakah maksud produktiviti dan bagaimana ia diukur?", "Apakah faktor yang mempengaruhi produktiviti?", "Apakah maksud eksternaliti, kos sosial dan faedah sosial?"],
      html: `
<h3><span class="no">4.2.1</span> Konsep Produktiviti</h3>
<p>Pertumbuhan ekonomi boleh dicapai melalui dua cara: <b>menambah kuantiti input</b> (buruh, modal, tanah, usahawan) atau <b>meningkatkan kecekapan penggunaan input</b>. Cara kedua berkait dengan produktiviti: menghasilkan output lebih tinggi dengan sumber yang sama atau kurang.</p>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Produktiviti</b> atau daya pengeluaran ialah keupayaan untuk meningkatkan penghasilan output daripada sejumlah input yang diberikan. Ia mengukur kecekapan dan keberkesanan penggunaan input seperti tenaga buruh, teknologi, peralatan, sistem dan pengurusan.</p></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">Produktiviti = <span class="pecahan"><span>Output</span><span>Input</span></span></div><p>Produktiviti juga boleh diukur sebagai kos seunit output, masa untuk menghasilkan seunit output atau jumlah guna tenaga bagi seunit output.</p></div>
<div class="kotak contoh"><span class="kotak-label">Contoh</span><p>Kilang A menghasilkan 120 helai baju dengan 5 pekerja: produktiviti = 120 ÷ 5 = <b>24</b>. Kilang B menghasilkan 100 helai dengan 4 pekerja: 100 ÷ 4 = <b>25</b>. Kilang B lebih produktif. Semakin tinggi nilai, semakin tinggi produktiviti, maka kos pengeluaran lebih rendah dan daya pengeluaran firma meningkat.</p></div>
<figure data-graf="produktiviti"></figure>
<div class="aliran"><span>Peningkatan produktiviti</span><i>→</i><span>Output meningkat</span><i>→</i><span>Keuntungan dan daya saing firma</span><i>→</i><span>Upah pekerja meningkat</span><i>→</i><span>Pendapatan negara meningkat</span><i>→</i><span>Taraf hidup rakyat meningkat</span></div>
<div class="kotak info"><span class="kotak-label">Data</span><p>Produktiviti buruh Malaysia pada tahun 2013 sebanyak US$24 934 masih ketinggalan berbanding Amerika Syarikat, iaitu US$70 293 (Laporan Produktiviti 2013/2014, MPC).</p></div>

<h3><span class="no">4.2.2</span> Faktor yang Mempengaruhi Produktiviti</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Tenaga manusia</b><p>Kemahiran dan motivasi. Tempatkan pekerja ikut kebolehan; tingkatkan melalui latihan; motivasi melalui ganjaran kewangan atau bukan kewangan.</p></div>
  <div class="kad-mini"><b>Sistem dan prosedur</b><p>Ringkas, selaras dengan matlamat organisasi dan membantu mengesan kelemahan.</p></div>
  <div class="kad-mini"><b>Struktur organisasi</b><p>Bahagian dengan tanggungjawab dan skop kerja sendiri; pengkhususan meningkatkan produktiviti.</p></div>
  <div class="kad-mini"><b>Gaya kepimpinan</b><p>Membentuk budaya organisasi; pemimpin berwibawa membuat keputusan tepat dan memotivasikan ahli.</p></div>
  <div class="kad-mini"><b>Persekitaran kerja</b><p>Susun atur dan kemudahan yang kondusif, selesa dan selamat (contoh garisan amaran kuning).</p></div>
  <div class="kad-mini"><b>Bahan-bahan</b><p>Kualiti dan bekalan bahan mentah; pengurusan inventori yang sistematik mengelakkan pembaziran.</p></div>
  <div class="kad-mini"><b>Teknologi</b><p>Mesin moden dan automasi menjimatkan masa dan tenaga; R&amp;D membawa inovasi.</p></div>
  <div class="kad-mini"><b>Kelengkapan modal</b><p>Penyelenggaraan dan pemeriksaan berkala supaya modal berfungsi baik dan digunakan secara optimum.</p></div>
</div>
<div class="kotak tip"><span class="kotak-label">Skema Kertas 2</span><p>Soalan cara meningkatkan produktiviti biasanya memberi markah fakta dan contoh: tenaga manusia yang mahir dan bermotivasi, sistem dan prosedur cekap, struktur organisasi sesuai, gaya kepimpinan berwibawa, persekitaran kerja kondusif, bahan berkualiti, teknologi canggih dan kelengkapan modal yang berfungsi baik.</p></div>

<h3><span class="no">4.2.3</span> Eksternaliti</h3>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Eksternaliti</b> (kesan luaran) ialah kos atau faedah yang tidak diambil kira dalam pengeluaran dan penggunaan sesuatu barang atau perkhidmatan. Ia berlaku kepada <b>pihak ketiga</b> (selain pengeluar dan pengguna) dan tidak dimasukkan dalam harga pasaran, maka menggambarkan kegagalan sistem harga.</p></div>
<p>Contoh: kilang besar mencemarkan sungai (kos kepada masyarakat) tetapi pada masa yang sama mewujudkan peluang pekerjaan kepada penduduk (faedah kepada masyarakat). Kedua-duanya tidak dimasukkan dalam harga pasaran.</p>

<h3><span class="no">4.2.4</span> Kos Sosial dan Faedah Sosial</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Kos sosial (eksternaliti negatif)</b><p>Kos kepada pihak ketiga yang tidak termasuk dalam harga pasaran. Contoh: pengeluaran petroleum dan pembuangan sisa toksik yang merugikan nelayan; penggunaan rokok, minuman keras, perjudian dan kenderaan bermotor yang menjejaskan kesihatan masyarakat.</p></div>
  <div class="kad-mini"><b>Faedah sosial (eksternaliti positif)</b><p>Faedah kepada pihak ketiga selain pengguna dan pengeluar. Contoh: latihan kemahiran oleh syarikat yang menguntungkan syarikat lain apabila pekerja berpindah; pendidikan, perubatan, alat pengesan asap dan alat pemadam kebakaran.</p></div>
</div>

<h3><span class="no">4.2.5</span> Contoh Kos Sosial dan Faedah Sosial</h3>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">Kos sosial = Kos peribadi + Kos luaran</div><div class="rumus-baris">Faedah sosial = Faedah peribadi + Faedah luaran</div></div>
<div class="grid-2">
  <div class="kad-mini"><b>Contoh: memandu kereta</b><p><b>Kos peribadi</b>: harga kereta, insurans, cukai jalan, petrol (ditanggung pemilik). <b>Kos luaran</b>: kesesakan lalu lintas dan pencemaran udara yang ditanggung orang lain tanpa pampasan. Contoh kos luaran lain: sisa kilang, bunyi kelab malam, asap rokok, iklan berlebihan yang menjejaskan penglihatan.</p></div>
  <div class="kad-mini"><b>Contoh: menunggang basikal</b><p><b>Faedah peribadi</b>: kos pengangkutan rendah, kesihatan, mengelak kesesakan dan menjimatkan masa. <b>Faedah luaran</b>: kesesakan dan pencemaran berkurang, kos perubatan orang ramai lebih rendah. Jika faedah luaran besar, faedah sosial lebih besar daripada faedah peribadi.</p></div>
</div>
`
    }
  ],
  kad: [
    { d: "Takrif <b>firma</b>", b: "Unit ekonomi yang produktif yang merancang dan menggabungkan faktor pengeluaran yang terhad untuk menghasilkan barang dan perkhidmatan.", t: "4.1.1" },
    { d: "Maksud <b>industri</b>", b: "Gabungan semua firma yang mengeluarkan keluaran yang sama atau hampir sama, contohnya industri kereta.", t: "4.1.1" },
    { d: "Takrif <b>pengeluaran</b>", b: "Proses menggabungkan faktor pengeluaran untuk menghasilkan barang dan perkhidmatan, atau mengubah input kepada output.", t: "4.1.1" },
    { d: "Beza <b>input tetap</b> dan <b>input berubah</b>", b: "Tetap: kuantiti tetap pada semua tingkat output, wujud pada output sifar, jangka pendek sahaja (mesin, bangunan). Berubah: ikut tingkat output, sifar pada output sifar (buruh, bahan mentah).", t: "4.1.1" },
    { d: "Beza <b>barang perantaraan</b> dan <b>barang akhir</b>", b: "Perantaraan: digunakan dalam pengeluaran seterusnya (tepung). Akhir: barang siap untuk pengguna (biskut).", t: "4.1.1" },
    { d: "Beza jangka masa pendek dan panjang pengeluaran", b: "Pendek: sekurang-kurangnya satu input tetap. Panjang: semua input adalah input berubah.", t: "4.1.1" },
    { d: "Maksud <b>fungsi pengeluaran jangka pendek</b>", b: "Hubungan antara input berubah dengan output pada suatu tingkat input tetap. Q = f(K, L).", t: "4.1.2" },
    { d: "Rumus TP, AP dan MP", b: "TP = AP × L. AP = TP ÷ L. MP = ΔTP ÷ ΔL.", t: "4.1.2" },
    { d: "Takrif <b>kos pengeluaran</b>", b: "Segala perbelanjaan terhadap input yang digunakan dalam proses pengeluaran.", t: "4.1.3" },
    { d: "Ciri <b>kos tetap</b>", b: "Bayaran untuk input tetap; tidak berubah dengan output; wujud pada output sifar; jangka pendek sahaja; keluk mendatar. Contoh: sewa, insurans kebakaran.", t: "4.1.3" },
    { d: "Ciri <b>kos berubah</b>", b: "Bayaran untuk input berubah; berubah secara langsung dengan output; sifar pada output sifar. Contoh: upah, bahan mentah, bil utiliti.", t: "4.1.3" },
    { d: "Rumus TC, AC, AVC dan MC", b: "TC = FC + VC. AC = TC ÷ Q. AVC = VC ÷ Q. MC = ΔTC ÷ ΔQ.", t: "4.1.3" },
    { d: "Mengapa AVC menurun kemudian meningkat?", b: "Kerana hukum pulangan berkurangan: semakin banyak input berubah, tambahan output semakin kurang, jadi kos input berubah seunit output meningkat.", t: "4.1.3" },
    { d: "Hubungan <b>MC dengan AC</b>", b: "AC menurun: MC &lt; AC. AC minimum: MC = AC. AC meningkat: MC &gt; AC. MC memotong AC pada titik minimum AC.", t: "4.1.5" },
    { d: "Bilakah firma patut <b>berhenti operasi</b> dalam jangka pendek?", b: "Apabila harga kurang daripada kos berubah purata (P &lt; AVC).", t: "4.1.5" },
    { d: "Takrif <b>hasil</b> dan rumus jumlah hasil", b: "Jumlah nilai penerimaan firma daripada jualan keluarannya. TR = P × Q.", t: "4.1.6" },
    { d: "Beza <b>kos eksplisit</b> dan <b>kos implisit</b>", b: "Eksplisit: dibayar secara nyata (upah, bahan mentah). Implisit: kos faktor milik sendiri yang tidak dibayar (gaji pemilik, sewa bangunan sendiri, faedah modal sendiri).", t: "4.1.6" },
    { d: "Rumus <b>untung ekonomi</b>", b: "Jumlah hasil − (kos eksplisit + kos implisit).", t: "4.1.6" },
    { d: "Puan Surayati: TR RM10 000, kos eksplisit RM4 900, kos implisit RM3 040. Berapakah untung dan untung ekonomi?", b: "Untung RM5 100; untung ekonomi RM2 060.", t: "4.1.7" },
    { d: "Nyatakan <b>hukum pulangan berkurangan</b>", b: "Apabila input berubah ditambah secara berterusan kepada input tetap, jumlah keluaran bertambah tetapi tambahannya semakin berkurangan.", t: "4.1.8" },
    { d: "Tiga tahap pengeluaran", b: "Tahap I: 0 hingga AP maksimum (MP = AP). Tahap II: AP maksimum hingga MP = 0. Tahap III: MP = 0 dan seterusnya (MP negatif).", t: "4.1.8" },
    { d: "Tahap pengeluaran paling cekap", b: "<b>Tahap II</b>, kerana kombinasi input berubah dan input tetap paling optimum.", t: "4.1.8" },
    { d: "Takrif <b>produktiviti</b>", b: "Keupayaan meningkatkan penghasilan output daripada sejumlah input. Produktiviti = output ÷ input.", t: "4.2.1" },
    { d: "Kilang A: 120 helai, 5 pekerja. Kilang B: 100 helai, 4 pekerja. Siapa lebih produktif?", b: "Kilang B (25 berbanding 24 helai seorang).", t: "4.2.1" },
    { d: "Lapan faktor yang mempengaruhi produktiviti", b: "Tenaga manusia, sistem dan prosedur, struktur organisasi, gaya kepimpinan, persekitaran kerja, bahan-bahan, teknologi, kelengkapan modal.", t: "4.2.2" },
    { d: "Takrif <b>eksternaliti</b>", b: "Kos atau faedah yang tidak diambil kira dalam pengeluaran dan penggunaan sesuatu barang, yang berlaku kepada pihak ketiga dan tidak dimasukkan dalam harga pasaran.", t: "4.2.3" },
    { d: "Beza <b>kos sosial</b> dan <b>faedah sosial</b>", b: "Kos sosial: eksternaliti negatif, kos kepada pihak ketiga (pencemaran). Faedah sosial: eksternaliti positif, faedah kepada pihak ketiga (pendidikan, latihan).", t: "4.2.4" },
    { d: "Rumus kos sosial dan faedah sosial", b: "Kos sosial = kos peribadi + kos luaran. Faedah sosial = faedah peribadi + faedah luaran.", t: "4.2.5" }
  ],
  kuiz: [
    { s: "Antara berikut, yang manakah <b>input tetap</b> dalam pengeluaran perabot?", p: ["Kayu", "Cat", "Bangunan kilang", "Kuasa elektrik"], j: 2, e: "Bangunan kilang tidak berubah dengan tingkat output dalam jangka pendek." },
    { s: "Jangka masa panjang dalam pengeluaran bermaksud", p: ["tempoh melebihi lima tahun", "semua input adalah input berubah", "sekurang-kurangnya satu input tetap", "output tidak boleh diubah"], j: 1, e: "Jangka masa ditakrifkan mengikut keupayaan mengubah input tetap, bukan bilangan tahun." },
    { s: "Tepung yang digunakan oleh kilang biskut ialah contoh", p: ["barang akhir", "barang perantaraan", "input tetap", "barang awam"], j: 1, e: "Barang perantaraan digunakan dalam proses pengeluaran seterusnya." },
    { s: "Syarikat Suiwa menggunakan 4 orang buruh dengan keluaran purata 12 unit. Jumlah keluarannya ialah", p: ["3 unit", "12 unit", "16 unit", "48 unit"], j: 3, e: "TP = AP × L = 12 × 4 = 48 unit." },
    { s: "Berdasarkan Jadual 4.2, keluaran marginal buruh ke-3 ialah", p: ["8 helai", "10 helai", "14 helai", "24 helai"], j: 2, e: "MP = 24 − 10 = 14 helai (MP maksimum)." },
    { s: "Antara berikut, yang manakah <b>kos tetap</b>?", p: ["Upah buruh harian", "Bahan mentah", "Premium insurans kebakaran", "Bil elektrik kilang"], j: 2, e: "Premium insurans kebakaran perlu dibayar walaupun output sifar." },
    { s: "Jumlah kos sebuah firma pada output sifar ialah RM1 200. Nilai ini ialah", p: ["kos berubah", "kos tetap", "kos marginal", "kos purata"], j: 1, e: "Pada output sifar, VC = 0 maka TC = FC." },
    { s: "Kos tetap RM100. Pada output 6 unit, kos berubah RM245. Kos purata ialah", p: ["RM40.80", "RM50.00", "RM57.50", "RM345.00"], j: 2, e: "AC = (100 + 245) ÷ 6 = RM57.50." },
    { s: "Jumlah kos pada output 5 ialah RM295 dan pada output 6 ialah RM345. Kos marginal output ke-6 ialah", p: ["RM49", "RM50", "RM57.50", "RM59"], j: 1, e: "MC = (345 − 295) ÷ 1 = RM50." },
    { s: "Apabila kos purata sedang menurun,", p: ["MC &gt; AC", "MC = AC", "MC &lt; AC", "MC = 0"], j: 2, e: "MC di bawah AC menarik purata turun." },
    { s: "Keluk kos marginal memotong keluk kos purata pada", p: ["titik maksimum AC", "titik minimum AC", "titik asalan", "titik minimum MC"], j: 1, e: "MC = AC apabila AC minimum." },
    { s: "Firma patut berhenti operasi dalam jangka pendek apabila", p: ["P &gt; AC", "P &lt; AC tetapi P &gt; AVC", "P &lt; AVC", "P = AC"], j: 2, e: "Jika harga tidak dapat menampung kos berubah, kerugian lebih kecil jika firma berhenti." },
    { s: "Kos implisit ialah", p: ["upah yang dibayar kepada pekerja", "kos bahan mentah", "gaji yang dilepaskan oleh pemilik yang mengusahakan perniagaan sendiri", "faedah pinjaman bank"], j: 2, e: "Kos implisit ialah kos faktor milik sendiri yang tidak dibayar secara nyata." },
    { s: "Jumlah hasil sebuah kedai ialah RM10 000, kos eksplisit RM4 900 dan kos implisit RM3 040. Untung ekonomi ialah", p: ["RM2 060", "RM5 100", "RM6 960", "RM7 940"], j: 0, e: "Untung ekonomi = 10 000 − (4 900 + 3 040) = RM2 060." },
    { s: "Hukum pulangan berkurangan berlaku apabila", p: ["semua input ditambah serentak", "input berubah ditambah kepada input tetap", "teknologi bertambah baik", "harga input meningkat"], j: 1, e: "Hukum ini berlaku dalam jangka pendek apabila wujud input tetap." },
    { s: "Tahap II pengeluaran bermula apabila ______ dan berakhir apabila ______", p: ["MP maksimum; AP maksimum", "MP = AP; MP = 0", "TP maksimum; AP = 0", "AP = 0; MP negatif"], j: 1, e: "Tahap II: dari AP maksimum (MP = AP) hingga TP maksimum (MP = 0)." },
    { s: "Mengapakah Tahap III tidak cekap?", p: ["Berlaku pembaziran input tetap", "MP negatif dan TP merosot", "AP sedang meningkat", "Kos tetap terlalu tinggi"], j: 1, e: "Menambah input berubah menjadikan jumlah keluaran semakin kurang: pembaziran input berubah." },
    { s: "Kilang P menghasilkan 180 unit dengan 6 pekerja; Kilang Q menghasilkan 150 unit dengan 4 pekerja. Pernyataan yang betul ialah", p: ["P lebih produktif", "Q lebih produktif", "Kedua-duanya sama produktif", "Produktiviti tidak dapat dikira"], j: 1, e: "P = 30 unit seorang; Q = 37.5 unit seorang." },
    { s: "Antara berikut, yang manakah faktor yang mempengaruhi produktiviti?<ol class=\"roman\"><li>Gaya kepimpinan</li><li>Teknologi</li><li>Kadar cukai pendapatan</li><li>Persekitaran kerja</li></ol>", p: ["I, II dan III", "I, II dan IV", "I, III dan IV", "II, III dan IV"], j: 1, e: "Lapan faktor produktiviti tidak termasuk kadar cukai." },
    { s: "Kilang yang membuang sisa ke sungai sehingga menjejaskan nelayan menimbulkan", p: ["faedah sosial", "kos sosial", "kos eksplisit", "untung ekonomi"], j: 1, e: "Pencemaran ialah eksternaliti negatif yang ditanggung pihak ketiga." },
    { s: "Kos sosial ialah", p: ["kos peribadi − kos luaran", "kos peribadi + kos luaran", "kos tetap + kos berubah", "faedah peribadi + faedah luaran"], j: 1, e: "Kos sosial = kos peribadi + kos luaran." },
    { s: "Pemasangan alat pemadam kebakaran di rumah memberi faedah kepada jiran tanpa bayaran. Ini ialah contoh", p: ["kos luaran", "faedah luaran", "kos peribadi", "kos implisit"], j: 1, e: "Faedah yang dinikmati pihak ketiga ialah faedah luaran (eksternaliti positif)." }
  ]
});
