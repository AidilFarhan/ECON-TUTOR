/* =========================================================
   Matrikulasi · AE015 Mikroekonomi · Bab 3 · Keanjalan Permintaan dan Penawaran
   Sumber: slaid kuliah AE015 "BAB 3.1 Keanjalan Permintaan" (55 slaid)
           dan "BAB 3.2 Keanjalan Penawaran" (14 slaid)
   ========================================================= */
EKO.daftarBab({
  id: "m1-b3",
  peringkat: "matrik",
  tingkatan: 1,
  no: 3,
  tajuk: "Keanjalan Permintaan dan Penawaran",
  warna: "var(--bab-rm10)",
  ringkas:
    "Keanjalan mengukur darjah tindak balas kuantiti diminta atau ditawar terhadap perubahan sesuatu pemboleh ubah. Bab ini merangkumi keanjalan permintaan harga (kaedah biasa, titik tengah dan keanjalan titik), darjah keanjalan dan penentunya, hubungan keanjalan dengan jumlah hasil, keanjalan silang, keanjalan pendapatan serta keanjalan penawaran.",
  seksyen: [
    {
      no: "3.1",
      tajuk: "Keanjalan Permintaan Harga (Ed)",
      soalan: [
        "Apakah maksud keanjalan dan tiga jenis keanjalan permintaan?",
        "Mengapakah kaedah titik tengah diperlukan?",
        "Bagaimanakah keanjalan titik berubah di sepanjang keluk permintaan linear?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Definisi keanjalan</span><p>Konsep yang mengukur <b>darjah tindak balas</b> kuantiti diminta atau ditawar akibat perubahan sesuatu pemboleh ubah. Bagi permintaan, pemboleh ubahnya ialah harga barang itu sendiri, harga barang lain dan pendapatan pengguna. Bagi penawaran, pemboleh ubahnya ialah harga barang itu sendiri.</p></div>
<div class="grid-3">
  <div class="kad-mini"><b>Keanjalan permintaan harga (Ed)</b><p>Tindak balas kuantiti diminta terhadap perubahan harga barang itu sendiri.</p></div>
  <div class="kad-mini"><b>Keanjalan permintaan silang (Exy)</b><p>Tindak balas kuantiti diminta barang X terhadap perubahan harga barang Y.</p></div>
  <div class="kad-mini"><b>Keanjalan permintaan pendapatan (Ey)</b><p>Tindak balas kuantiti diminta terhadap perubahan pendapatan pengguna.</p></div>
</div>

<h3>Keanjalan lengkuk: kaedah biasa</h3>
<p>Keanjalan lengkuk mengukur keanjalan di antara dua titik pada keluk permintaan yang sama. Ia boleh dikira dengan kaedah biasa atau kaedah titik tengah.</p>
<div class="kotak rumus"><span class="kotak-label">Kaedah biasa</span><div class="rumus-baris">Ed = %ΔQd ÷ %ΔP = (Qd₁ − Qd₀)/Qd₀ × P₀/(P₁ − P₀)</div></div>
<div class="kotak contoh"><span class="kotak-label">Contoh: rambutan</span><div class="kira">
  <div class="baris">Harga naik RM2 → RM4, kuantiti diminta turun 50 → 40 kg</div>
  <div class="baris">Ed = (40 − 50)/50 × 2/(4 − 2)</div>
  <div class="baris jawapan">Ed = −0.2</div></div>
  <p>Harga naik 1%, kuantiti diminta berkurang 0.2%. Tanda negatif menunjukkan hubungan songsang antara harga dengan kuantiti.</p></div>

<h3>Masalah kaedah biasa dan kaedah titik tengah</h3>
<p>Pada keluk DD barang X yang melalui (RM2, 10 unit) dan (RM4, 8 unit), kaedah biasa memberi dua jawapan berbeza bagi julat harga yang sama:</p>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Harga naik RM2 → RM4</span><div class="kira"><div class="baris">(8 − 10)/10 × 2/(4 − 2)</div><div class="baris jawapan">Ed = −0.2</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Harga turun RM4 → RM2</span><div class="kira"><div class="baris">(10 − 8)/8 × 4/(2 − 4)</div><div class="baris jawapan">Ed = −0.5</div></div></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Kaedah titik tengah</span><div class="rumus-baris">Ed = (Qd₁ − Qd₀)/½(Qd₀ + Qd₁) × ½(P₀ + P₁)/(P₁ − P₀)</div></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Harga naik RM2 → RM4</span><div class="kira"><div class="baris">(8 − 10)/½(10 + 8) × ½(2 + 4)/(4 − 2)</div><div class="baris">= (−2/9) × (3/2)</div><div class="baris jawapan">Ed = −0.33</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Harga turun RM4 → RM2</span><div class="kira"><div class="baris">(10 − 8)/½(10 + 8) × ½(4 + 2)/(2 − 4)</div><div class="baris">= (2/9) × (3/−2)</div><div class="baris jawapan">Ed = −0.33</div></div></div>
</div>
<p>Kaedah titik tengah memberi nilai yang sama, −0.33, sama ada harga naik atau turun dalam julat yang sama.</p>

<h3>Keanjalan titik</h3>
<p>Keanjalan titik mengukur tindak balas kuantiti diminta apabila perubahan harga sangat kecil sehingga tidak kelihatan dua titik pada keluk.</p>
<div class="kotak rumus"><span class="kotak-label">Rumus keanjalan titik</span><div class="rumus-baris">Ed = (ΔQ/ΔP) × (P/Q)</div><p>Bagi keluk DD linear, ΔQ/ΔP adalah malar sepanjang keluk.</p></div>
<div class="jadual"><table><caption>Keluk DD linear: ΔQ/ΔP = −1</caption>
<thead><tr><th>Titik</th><th class="n">P (RM)</th><th class="n">Qd (unit)</th><th class="n">Ed = −1 × P/Q</th></tr></thead>
<tbody><tr><td>V</td><td class="n">1</td><td class="n">5</td><td class="n">−0.2</td></tr><tr><td>W</td><td class="n">2</td><td class="n">4</td><td class="n">−0.5</td></tr><tr><td>X</td><td class="n">3</td><td class="n">3</td><td class="n">−1.0</td></tr><tr><td>Y</td><td class="n">4</td><td class="n">2</td><td class="n">−2.0</td></tr><tr><td>Z</td><td class="n">5</td><td class="n">1</td><td class="n">−5.0</td></tr></tbody></table></div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Nilai Ed di sepanjang keluk DD linear</span><p>Di titik tengah keluk, <b>Ed = 1</b>. Pada harga lebih tinggi daripada titik tengah, Ed &gt; 1 dan menuju infiniti di pintasan harga. Pada harga lebih rendah, Ed &lt; 1 dan menuju sifar di pintasan kuantiti. Semakin tinggi harga, semakin tinggi nilai keanjalan titik.</p></div>
  <div class="kotak contoh"><span class="kotak-label">Dua keluk DD selari</span><div class="kira">
    <div class="baris">Pada harga yang sama: keluk A (pintasan Q = 16, Q = 8), keluk B (pintasan Q = 24, Q = 16)</div>
    <div class="baris">Ed(A) = (16 − 8)/(8 − 0) = 1</div>
    <div class="baris">Ed(B) = (24 − 16)/(16 − 0) = 0.5</div>
    <div class="baris jawapan">Keluk lebih jauh dari asalan kurang anjal</div></div></div>
</div>
<figure data-graf="keanjalan" data-opt='{"jenis":"dd"}'></figure>
`
    },
    {
      no: "3.1.1",
      tajuk: "Darjah dan Penentu Keanjalan Permintaan Harga",
      soalan: ["Apakah lima darjah keanjalan permintaan harga?", "Apakah faktor yang menentukan keanjalan permintaan?"],
      html: `
<div class="jadual"><table><caption>Lima darjah keanjalan permintaan harga (nilai mutlak)</caption>
<thead><tr><th>Darjah</th><th>Maksud</th><th>Nilai</th><th>Bentuk keluk DD</th></tr></thead>
<tbody>
<tr><td><b>Anjal</b></td><td>%ΔQd lebih besar daripada %ΔP</td><td>1 &lt; Ed &lt; ∞</td><td>Landai</td></tr>
<tr><td><b>Tidak anjal</b></td><td>%ΔQd lebih kecil daripada %ΔP</td><td>0 &lt; Ed &lt; 1</td><td>Curam</td></tr>
<tr><td><b>Anjal satu</b></td><td>%ΔQd sama dengan %ΔP</td><td>Ed = 1</td><td>Hiperbola segi empat tepat</td></tr>
<tr><td><b>Anjal sempurna</b></td><td>Pada satu harga, kuantiti diminta tidak terhad; sedikit kenaikan harga menjatuhkan kuantiti diminta kepada sifar</td><td>Ed = ∞</td><td>Mendatar</td></tr>
<tr><td><b>Tidak anjal sempurna</b></td><td>Perubahan harga tidak mengubah kuantiti diminta</td><td>Ed = 0</td><td>Tegak</td></tr>
</tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 26 menyenaraikan "Tidak anjal" sebanyak dua kali; darjah yang keempat sepatutnya <b>anjal sempurna</b>. Slaid 30 pula menerangkan anjal sempurna sebagai "kuantiti diminta tidak dipengaruhi oleh harga"; itu sebenarnya ciri <b>tidak anjal sempurna</b>. Jadual di atas telah dibetulkan.</p></div>
<div class="jadual"><table><caption>Penentu keanjalan permintaan harga</caption>
<thead><tr><th>Penentu</th><th>Kesan</th></tr></thead>
<tbody>
<tr><td>Kewujudan barang pengganti</td><td>Semakin banyak pengganti, semakin anjal</td></tr>
<tr><td>Peratus perbelanjaan daripada pendapatan</td><td>Semakin tinggi peratusnya, semakin anjal</td></tr>
<tr><td>Kepentingan barang</td><td>Semakin penting barang, semakin tidak anjal</td></tr>
<tr><td>Kesetiaan kepada jenama</td><td>Semakin setia, semakin tidak anjal</td></tr>
<tr><td>Kepelbagaian kegunaan barang</td><td>Semakin banyak kegunaan, semakin anjal</td></tr>
</tbody></table></div>
`
    },
    {
      no: "3.1.2",
      tajuk: "Keanjalan Permintaan Harga dan Jumlah Hasil",
      soalan: ["Bagaimanakah perubahan harga mempengaruhi jumlah hasil (TR) mengikut darjah keanjalan?"],
      html: `
<div class="kotak rumus"><span class="kotak-label">Jumlah hasil</span><div class="rumus-baris">TR = P × Q</div><p>Jumlah hasil pengeluar sama dengan jumlah perbelanjaan pengguna.</p></div>
<div class="jadual"><table><caption>Kesan perubahan harga terhadap TR</caption>
<thead><tr><th>Darjah</th><th>Harga naik</th><th>Harga turun</th><th>Sebab</th></tr></thead>
<tbody>
<tr><td><b>Anjal</b> (Ed &gt; 1)</td><td>TR berkurang</td><td>TR bertambah</td><td>Perubahan kuantiti lebih besar daripada perubahan harga: kawasan TR yang hilang melebihi kawasan yang diperoleh</td></tr>
<tr><td><b>Tidak anjal</b> (Ed &lt; 1)</td><td>TR bertambah</td><td>TR berkurang</td><td>Perubahan kuantiti lebih kecil daripada perubahan harga</td></tr>
<tr><td><b>Anjal satu</b> (Ed = 1)</td><td>TR tetap</td><td>TR tetap</td><td>Pertambahan dan pengurangan TR adalah sama besar</td></tr>
</tbody></table></div>
<div class="kotak fokus"><span class="kotak-label">Keluk TR dan keluk DD linear</span><p>Di bahagian anjal keluk DD, harga turun menaikkan TR; TR maksimum apabila Ed = 1 (titik tengah); di bahagian tidak anjal, harga turun lagi menjatuhkan TR.</p></div>
`
    },
    {
      no: "3.1.3",
      tajuk: "Keanjalan Permintaan Silang (Exy)",
      soalan: ["Bagaimanakah nilai Exy menunjukkan hubungan dua barang?"],
      html: `
<div class="kotak def"><span class="kotak-label">Definisi</span><p>Mengukur darjah tindak balas kuantiti diminta barang X akibat perubahan harga barang Y.</p></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">Exy = %ΔQx ÷ %ΔPy = (ΔQx/ΔPy) × (Py₀/Qx₀)</div><p>ΔQx = perubahan kuantiti diminta barang X; ΔPy = perubahan harga barang Y; Qx₀ = kuantiti asal barang X; Py₀ = harga asal barang Y.</p></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 39 menerangkan Qxo sebagai "harga asal" dan Pyo sebagai "harga baru". Yang betul: <b>Qx₀ ialah kuantiti asal barang X</b> dan <b>Py₀ ialah harga asal barang Y</b>.</p></div>
<div class="jadual"><table><caption>Nilai Exy dan hubungan barang</caption>
<thead><tr><th>Nilai Exy</th><th>Hubungan</th><th>Contoh</th></tr></thead>
<tbody>
<tr><td>Negatif (−)</td><td>Barang penggenap</td><td>Kereta dan petrol; telefon bimbit dan kad SIM</td></tr>
<tr><td>Positif (+)</td><td>Barang pengganti</td><td>Komputer meja dan komputer riba</td></tr>
<tr><td>Sifar (0)</td><td>Tiada hubungan (tidak berkait)</td><td>Kereta dan roti</td></tr>
</tbody></table></div>
<div class="jadual"><table><caption>Contoh pengiraan: harga barang X naik RM2 → RM3</caption>
<thead><tr><th class="n">Harga X (RM)</th><th class="n">Qd barang S</th><th class="n">Qd barang T</th><th class="n">Qd barang U</th></tr></thead>
<tbody><tr><td class="n">2</td><td class="n">6</td><td class="n">12</td><td class="n">9</td></tr><tr><td class="n">3</td><td class="n">4</td><td class="n">13</td><td class="n">9</td></tr></tbody></table></div>
<div class="grid-3">
  <div class="kotak contoh"><span class="kotak-label">Barang S</span><div class="kira"><div class="baris">(4 − 6)/(3 − 2) × 2/6</div><div class="baris jawapan">Exy = −0.67: penggenap</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Barang T</span><div class="kira"><div class="baris">(13 − 12)/(3 − 2) × 2/12</div><div class="baris jawapan">Exy = 0.17: pengganti</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Barang U</span><div class="kira"><div class="baris">(9 − 9)/(3 − 2) × 2/9</div><div class="baris jawapan">Exy = 0: tidak berkait</div></div></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Jawapan slaid 45 bagi barang T menyebut "barang S" dan melabelkannya sebagai barang penggenap. Oleh sebab Exy = +0.17 (positif), barang X dan <b>barang T</b> ialah <b>barang pengganti</b>: kenaikan harga X sebanyak 1% menambah kuantiti diminta T sebanyak 0.17%. Slaid 47 juga menyebut "barang S" untuk barang U; yang dimaksudkan ialah <b>barang U</b> (tidak berkait).</p></div>
`
    },
    {
      no: "3.1.4",
      tajuk: "Keanjalan Permintaan Pendapatan (Ey)",
      soalan: ["Bagaimanakah nilai Ey mengenal pasti jenis barang?"],
      html: `
<div class="kotak def"><span class="kotak-label">Definisi</span><p>Mengukur darjah tindak balas kuantiti diminta sesuatu barang akibat perubahan pendapatan pengguna.</p></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">Ey = %ΔQx ÷ %ΔY = (ΔQx/ΔY) × (Y₀/Qx₀)</div><p>Y₀ = pendapatan asal; Qx₀ = kuantiti diminta asal barang X.</p></div>
<div class="jadual"><table><caption>Nilai Ey dan jenis barang</caption>
<thead><tr><th>Nilai Ey</th><th>Jenis barang</th></tr></thead>
<tbody>
<tr><td>Positif, 0 &lt; Ey &lt; 1</td><td>Barang normal: barang keperluan</td></tr>
<tr><td>Positif, Ey &gt; 1</td><td>Barang normal: barang mewah</td></tr>
<tr><td>Negatif, Ey &lt; 0</td><td>Barang bawahan</td></tr>
<tr><td>Sifar, Ey = 0</td><td>Barang mesti</td></tr>
</tbody></table></div>
<div class="jadual"><table><caption>Contoh: pendapatan naik RM2 000 → RM7 000</caption>
<thead><tr><th class="n">Pendapatan (RM)</th><th class="n">Qd barang A</th><th class="n">Qd barang B</th><th class="n">Qd barang C</th></tr></thead>
<tbody><tr><td class="n">2 000</td><td class="n">4</td><td class="n">10</td><td class="n">8</td></tr><tr><td class="n">7 000</td><td class="n">20</td><td class="n">5</td><td class="n">9</td></tr></tbody></table></div>
<div class="grid-3">
  <div class="kotak contoh"><span class="kotak-label">Barang A</span><div class="kira"><div class="baris">(20 − 4)/(7 000 − 2 000) × 2 000/4</div><div class="baris jawapan">Ey = 1.6: barang mewah</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Barang B</span><div class="kira"><div class="baris">(5 − 10)/(7 000 − 2 000) × 2 000/10</div><div class="baris jawapan">Ey = −0.2: barang bawahan</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Barang C</span><div class="kira"><div class="baris">(9 − 8)/(7 000 − 2 000) × 2 000/8</div><div class="baris jawapan">Ey = 0.05: barang keperluan</div></div></div>
</div>
`
    },
    {
      no: "3.2",
      tajuk: "Keanjalan Penawaran (Es)",
      soalan: ["Bagaimanakah keanjalan penawaran dikira daripada data dan daripada persamaan?", "Apakah lima darjah dan penentu keanjalan penawaran?"],
      html: `
<div class="kotak def"><span class="kotak-label">Definisi</span><p>Mengukur darjah tindak balas perubahan kuantiti ditawar akibat perubahan harga barang itu sendiri.</p></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">Es = %ΔQs ÷ %ΔP = [(Q₁ − Q₀)/Q₀ × 100] ÷ [(P₁ − P₀)/P₀ × 100]</div></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Contoh: durian</span><div class="kira">
    <div class="baris">Harga turun RM6 → RM4, kuantiti ditawar turun 30 → 16 biji</div>
    <div class="baris">%ΔQs = (16 − 30)/30 × 100 = −46.67%</div>
    <div class="baris">%ΔP = (4 − 6)/6 × 100 = −33.33%</div>
    <div class="baris jawapan">Es = 1.4 (anjal)</div></div>
    <p>Harga berubah 1%, kuantiti ditawar berubah 1.4% dalam arah yang sama.</p></div>
  <div class="kotak contoh"><span class="kotak-label">Daripada persamaan</span><div class="kira">
    <div class="baris">Qs = 20 + 2P, pada P = RM2: Q = 24</div>
    <div class="baris">Es = (dQ/dP) × (P/Q) = 2 × 2/24</div>
    <div class="baris jawapan">Es = 1/6 ≈ 0.17</div></div></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 5 memberi jawapan Es = 0.4 bagi contoh durian. Pengiraan sebenar: (−14/30) ÷ (−2/6) = −0.4667 ÷ −0.3333 = <b>1.4</b>. Nilai 0.4 dalam slaid tidak sepadan dengan data yang diberi. Oleh itu penawaran durian dalam julat ini <b>anjal</b>.</p></div>
<div class="jadual"><table><caption>Lima darjah keanjalan penawaran</caption>
<thead><tr><th>Darjah</th><th>Maksud</th><th>Nilai</th><th>Bentuk keluk SS</th></tr></thead>
<tbody>
<tr><td><b>Anjal</b></td><td>%ΔQs melebihi %ΔP</td><td>1 &lt; Es &lt; ∞</td><td>Landai, bermula dari paksi harga</td></tr>
<tr><td><b>Tidak anjal</b></td><td>%ΔQs kurang daripada %ΔP</td><td>0 &lt; Es &lt; 1</td><td>Curam, bermula dari paksi kuantiti</td></tr>
<tr><td><b>Anjal satu</b></td><td>%ΔQs sama dengan %ΔP</td><td>Es = 1</td><td>Garis lurus bermula dari asalan</td></tr>
<tr><td><b>Anjal sempurna</b></td><td>Pada satu harga, kuantiti ditawar tidak terhingga</td><td>Es = ∞</td><td>Mendatar, selari paksi kuantiti</td></tr>
<tr><td><b>Tidak anjal sempurna</b></td><td>Kuantiti ditawar tidak berubah walaupun harga berubah</td><td>Es = 0</td><td>Tegak, selari paksi harga</td></tr>
</tbody></table></div>
<figure data-graf="keanjalan" data-opt='{"jenis":"ss"}'></figure>
<div class="jadual"><table><caption>Penentu keanjalan penawaran</caption>
<thead><tr><th>Penentu</th><th>Kesan</th></tr></thead>
<tbody>
<tr><td>Faktor masa</td><td>Jangka masa singkat: tidak anjal sempurna (output tidak dapat ditambah). Jangka pendek: tidak anjal (output dapat ditambah sedikit). Jangka panjang: anjal (output dapat ditambah dengan banyak).</td></tr>
<tr><td>Jangka masa pengeluaran</td><td>Barang yang lama dihasilkan: tidak anjal. Barang yang cepat dihasilkan: anjal.</td></tr>
<tr><td>Tambahan kos</td><td>Tambahan kos besar: tidak anjal. Tambahan kos sedikit: anjal.</td></tr>
<tr><td>Mobiliti input</td><td>Mobiliti tinggi meningkatkan daya pengeluaran, maka penawaran lebih anjal.</td></tr>
<tr><td>Bilangan firma</td><td>Ramai firma: anjal. Sedikit firma: tidak anjal.</td></tr>
<tr><td>Penggantian faktor</td><td>Input mudah diganti: anjal. Input sukar diganti: tidak anjal.</td></tr>
</tbody></table></div>
`
    }
  ],
  kad: [
    { d: "Definisi <b>keanjalan</b>", b: "Ukuran darjah tindak balas kuantiti diminta atau ditawar akibat perubahan sesuatu pemboleh ubah.", t: "3.1" },
    { d: "Tiga jenis keanjalan permintaan", b: "Keanjalan permintaan harga (Ed), silang (Exy) dan pendapatan (Ey).", t: "3.1" },
    { d: "Rumus Ed <b>kaedah biasa</b>", b: "Ed = (Qd₁ − Qd₀)/Qd₀ × P₀/(P₁ − P₀).", t: "3.1" },
    { d: "Ed rambutan: RM2 → RM4, 50 → 40 kg", b: "(40 − 50)/50 × 2/2 = −0.2. Harga naik 1%, kuantiti diminta turun 0.2%.", t: "3.1" },
    { d: "Mengapa <b>kaedah titik tengah</b> digunakan?", b: "Kaedah biasa memberi nilai berbeza bagi harga naik dan harga turun dalam julat yang sama (−0.2 dan −0.5). Titik tengah memberi nilai yang sama (−0.33).", t: "3.1" },
    { d: "Rumus Ed <b>kaedah titik tengah</b>", b: "Ed = (Q₁ − Q₀)/½(Q₀ + Q₁) × ½(P₀ + P₁)/(P₁ − P₀).", t: "3.1" },
    { d: "Rumus <b>keanjalan titik</b>", b: "Ed = (ΔQ/ΔP) × (P/Q).", t: "3.1" },
    { d: "Nilai Ed di <b>titik tengah</b> keluk DD linear", b: "Ed = 1. Di atasnya Ed > 1 (menuju ∞); di bawahnya Ed < 1 (menuju 0).", t: "3.1" },
    { d: "Dua keluk DD selari pada harga yang sama", b: "Keluk yang lebih jauh dari asalan kurang anjal (contoh Ed = 1 berbanding Ed = 0.5).", t: "3.1" },
    { d: "Keluk DD <b>anjal sempurna</b> dan <b>tidak anjal sempurna</b>", b: "Anjal sempurna: mendatar, Ed = ∞. Tidak anjal sempurna: tegak, Ed = 0.", t: "3.1.1" },
    { d: "Lima <b>penentu</b> keanjalan permintaan harga", b: "Barang pengganti, peratus perbelanjaan daripada pendapatan, kepentingan barang, kesetiaan jenama, kepelbagaian kegunaan.", t: "3.1.1" },
    { d: "Harga naik bagi permintaan <b>anjal</b>: kesan ke atas TR", b: "TR berkurang kerana peratus penurunan kuantiti melebihi peratus kenaikan harga.", t: "3.1.2" },
    { d: "Harga naik bagi permintaan <b>tidak anjal</b>: kesan ke atas TR", b: "TR bertambah.", t: "3.1.2" },
    { d: "Tafsiran nilai <b>Exy</b>", b: "Negatif: penggenap. Positif: pengganti. Sifar: tidak berkait.", t: "3.1.3" },
    { d: "Exy barang S: harga X RM2 → RM3, Qd S 6 → 4", b: "(4 − 6)/1 × 2/6 = −0.67: X dan S ialah barang penggenap.", t: "3.1.3" },
    { d: "Tafsiran nilai <b>Ey</b>", b: "0 < Ey < 1: keperluan. Ey > 1: mewah. Ey < 0: bawahan. Ey = 0: mesti.", t: "3.1.4" },
    { d: "Ey barang A: pendapatan RM2 000 → RM7 000, Qd 4 → 20", b: "16/5 000 × 2 000/4 = 1.6: barang mewah.", t: "3.1.4" },
    { d: "Es durian: harga RM6 → RM4, kuantiti 30 → 16 biji", b: "(−14/30) ÷ (−2/6) = 1.4: penawaran anjal.", t: "3.2" },
    { d: "Es daripada Qs = 20 + 2P pada P = RM2", b: "Q = 24; Es = 2 × 2/24 = 1/6.", t: "3.2" },
    { d: "Keluk SS <b>anjal satu</b>", b: "Garis lurus yang bermula dari asalan; Es = 1.", t: "3.2" },
    { d: "Penawaran dalam jangka masa <b>singkat</b>, <b>pendek</b> dan <b>panjang</b>", b: "Singkat: tidak anjal sempurna. Pendek: tidak anjal. Panjang: anjal.", t: "3.2" }
  ],
  kuiz: []
});
