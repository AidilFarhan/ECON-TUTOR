/* =========================================================
   STPM Penggal 1 · Bab 5 · Pasaran Faktor dan Agihan Pendapatan
   Sumber: Modul PdP Ekonomi Penggal 1 Mikroekonomi, Bab 5
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p1-b5",
  peringkat: "stpm",
  tingkatan: 1,
  no: 5,
  tajuk: "Pasaran Faktor dan Agihan Pendapatan",
  warna: "var(--bab-rm50)",
  ringkas:
    "Permintaan faktor ialah permintaan terbitan. Bab ini merangkumi keluaran fizikal dan keluaran hasil, keseimbangan firma pada MRP = MCF, pasaran buruh dan kesatuan sekerja, serta ganjaran faktor: upah, sewa, bunga dan untung.",
  seksyen: [
    {
      no: "5.1",
      tajuk: "Permintaan dan Penawaran Faktor Pengeluaran",
      soalan: [
        "Mengapakah permintaan faktor disebut permintaan terbitan?",
        "Bagaimanakah TPP, APP, MPP, TRP, ARP dan MRP dihitung?",
        "Mengapakah keluk permintaan buruh ialah sebahagian keluk MRP?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Permintaan terbitan</span><p>Permintaan terhadap faktor pengeluaran bergantung kepada permintaan terhadap barang dan perkhidmatan yang dihasilkan oleh faktor itu. Contoh: permintaan rumah meningkat, maka permintaan kayu dan simen turut meningkat.</p></div>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Keluaran fizikal (unit)</span>
  <div class="rumus-baris">TPP: jumlah keluaran oleh sejumlah buruh</div>
  <div class="rumus-baris">APP = <span class="pecahan"><span>TPP</span><span>L</span></span></div>
  <div class="rumus-baris">MPP = <span class="pecahan"><span>ΔTPP</span><span>ΔL</span></span></div></div>
  <div class="kotak rumus"><span class="kotak-label">Keluaran hasil (RM)</span>
  <div class="rumus-baris">TRP = TPP × P</div>
  <div class="rumus-baris">ARP = <span class="pecahan"><span>TRP</span><span>L</span></span> = APP × P</div>
  <div class="rumus-baris">MRP = <span class="pecahan"><span>ΔTRP</span><span>ΔL</span></span> = MPP × P</div></div>
</div>
<div class="jadual"><table><caption>Permintaan buruh dalam pasaran persaingan sempurna (harga keluaran RM5)</caption>
<thead><tr><th class="n">L</th><th class="n">TPP</th><th class="n">APP</th><th class="n">MPP</th><th class="n">TRP (RM)</th><th class="n">ARP (RM)</th><th class="n">MRP (RM)</th></tr></thead>
<tbody>
<tr><td class="n">1</td><td class="n">6</td><td class="n">6.00</td><td class="n">6</td><td class="n">30</td><td class="n">30.00</td><td class="n">30</td></tr>
<tr><td class="n">2</td><td class="n">14</td><td class="n">7.00</td><td class="n">8</td><td class="n">70</td><td class="n">35.00</td><td class="n">40</td></tr>
<tr><td class="n">3</td><td class="n">24</td><td class="n">8.00</td><td class="n">10</td><td class="n">120</td><td class="n">40.00</td><td class="n">50</td></tr>
<tr><td class="n">4</td><td class="n">33</td><td class="n">8.25</td><td class="n">9</td><td class="n">165</td><td class="n">41.25</td><td class="n">45</td></tr>
<tr><td class="n">5</td><td class="n">41</td><td class="n">8.20</td><td class="n">8</td><td class="n">205</td><td class="n">41.00</td><td class="n">40</td></tr>
<tr><td class="n">6</td><td class="n">47</td><td class="n">7.83</td><td class="n">6</td><td class="n">235</td><td class="n">39.17</td><td class="n">30</td></tr>
<tr><td class="n">7</td><td class="n">52</td><td class="n">7.43</td><td class="n">5</td><td class="n">260</td><td class="n">37.14</td><td class="n">25</td></tr>
<tr><td class="n">8</td><td class="n">56</td><td class="n">7.00</td><td class="n">4</td><td class="n">280</td><td class="n">35.00</td><td class="n">20</td></tr>
</tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>ARP bagi 3 unit buruh ialah 120 ÷ 3 = <b>RM40.00</b> (modul asal menulis RM30).</p></div>
<ul>
<li>Bentuk keluk APP sama dengan ARP; bentuk keluk MPP sama dengan MRP (kerana harga keluaran tetap dalam PPS).</li>
<li>MPP dan MRP menunjukkan daya pengeluaran sut buruh. Hukum pulangan berkurangan berlaku dari titik maksimum MPP/MRP hingga sifar.</li>
</ul>
<h3>Keluk permintaan buruh</h3>
<ul>
<li>Hubungan <b>songsang</b> antara kadar upah dengan kuantiti buruh diminta; keluk mencerun ke bawah.</li>
<li>Keseimbangan firma pada <b>MRP = MCF</b>. Pada setiap kadar upah (W₁, W₂, W₃), firma memilih kuantiti buruh di titik MRP bersilang dengan MCF (E₁, E₂, E₃).</li>
<li>Jika upah melebihi ARP maksimum (W₀), firma rugi dan tidak menggaji buruh.</li>
<li>Maka keluk permintaan buruh ialah <b>sebahagian keluk MRP yang positif, bermula dari ARP maksimum</b>.</li>
</ul>
<h3>Keluk penawaran faktor</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Bagi firma PPS</b><p>Upah ditentukan di pasaran; firma membayar upah yang sama bagi setiap buruh. Maka <b>MCF = ACF = W</b> dan keluk penawaran faktor firma <b>anjal sempurna</b> (mendatar).</p></div>
  <div class="kad-mini"><b>Bagi pasaran</b><p>Keluk penawaran buruh mencerun ke atas: semakin tinggi upah, semakin banyak buruh ditawarkan.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Rumus kos faktor</span><div class="rumus-baris">ACF = <span class="pecahan"><span>TCF</span><span>L</span></span>, MCF = <span class="pecahan"><span>ΔTCF</span><span>ΔL</span></span></div></div>
`
    },
    {
      no: "5.2",
      tajuk: "Upah dan Kesatuan Sekerja",
      soalan: [
        "Apakah beza upah wang dan upah benar?",
        "Bagaimanakah keseimbangan penggunaan buruh firma ditentukan?",
        "Bagaimanakah kesatuan sekerja menuntut upah yang lebih tinggi?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Upah</span><p>Bayaran kepada buruh atas sumbangan tenaga fizikal atau mental dalam proses pengeluaran.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Upah wang</b><p>Jumlah wang yang diterima sebagai bayaran upah. Contoh: gaji RM900.</p></div>
  <div class="kad-mini"><b>Upah benar</b><p>Kuasa beli upah wang, iaitu jumlah barang dan perkhidmatan yang dapat dibeli dengan upah wang itu.</p></div>
</div>
<h3>5.2.1 Keseimbangan upah dan kuantiti buruh firma</h3>
<div class="jadual"><table><caption>Firma PPS: harga keluaran RM5, upah RM35</caption>
<thead><tr><th class="n">L</th><th class="n">TPP</th><th class="n">MPP</th><th class="n">TRP (RM)</th><th class="n">MRP (RM)</th><th class="n">MCF (RM)</th></tr></thead>
<tbody>
<tr><td class="n">1</td><td class="n">8</td><td class="n">8</td><td class="n">40</td><td class="n">40</td><td class="n">35</td></tr>
<tr><td class="n">2</td><td class="n">14</td><td class="n">6</td><td class="n">70</td><td class="n">30</td><td class="n">35</td></tr>
<tr><td class="n">3</td><td class="n">22</td><td class="n">8</td><td class="n">110</td><td class="n">40</td><td class="n">35</td></tr>
<tr><td class="n">4</td><td class="n">32</td><td class="n">10</td><td class="n">160</td><td class="n">50</td><td class="n">35</td></tr>
<tr><td class="n">5</td><td class="n">39</td><td class="n">7</td><td class="n">195</td><td class="n">35</td><td class="n">35</td></tr>
<tr><td class="n">6</td><td class="n">42</td><td class="n">3</td><td class="n">210</td><td class="n">15</td><td class="n">35</td></tr>
<tr><td class="n">7</td><td class="n">41</td><td class="n">−1</td><td class="n">205</td><td class="n">−5</td><td class="n">35</td></tr>
<tr><td class="n">8</td><td class="n">38</td><td class="n">−3</td><td class="n">190</td><td class="n">−15</td><td class="n">35</td></tr>
</tbody></table></div>
<div class="kotak contoh"><span class="kotak-label">Keseimbangan</span><div class="kira">
<div class="baris">MRP = MCF = RM35 pada 5 orang buruh</div>
<div class="baris">Untung = TRP − TCF = 195 − (35 × 5)</div>
<div class="baris jawapan">= RM20</div></div></div>
<figure data-graf="keseimbangan" data-opt='{"tajuk":"Keseimbangan pasaran buruh (nilai contoh)","data":{"a":60,"b":2,"c":10,"d":1.5,"x":[0,34],"y":[0,64],"tikX":[0,5,10,15,20,25,30],"tikY":[0,10,20,30,40,50,60],"labelX":"Kuantiti buruh (orang)","labelY":"Upah (RM)","hargaAwal":45,"pMin":14,"pMaks":54,"anjak":3,"unitQ":"orang","qHujung":30}}'></figure>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Umur bersara dilanjutkan (58 → 60 tahun)</span><p>Penawaran buruh bertambah, keluk SS beralih ke kanan. Upah keseimbangan <b>turun</b> (W₀ ke W₁), kuantiti buruh <b>bertambah</b> (L₀ ke L₁).</p></div>
  <div class="kotak contoh"><span class="kotak-label">Lebih banyak pengeluar guna intensif modal</span><p>Buruh diganti dengan modal, permintaan buruh berkurang, keluk DD beralih ke kiri. Upah <b>turun</b>, kuantiti buruh <b>berkurang</b>.</p></div>
</div>
<h3>5.2.2 Kesatuan sekerja</h3>
<div class="kotak def"><span class="kotak-label">Kesatuan sekerja</span><p>Organisasi yang dianggotai sekumpulan pekerja untuk mewakili mereka dalam perundingan dengan majikan bagi menuntut kenaikan upah dan kebajikan yang lebih baik.</p></div>
<p><b>Tujuan:</b> menuntut upah yang lebih tinggi dan adil serta faedah sampingan; melindungi pekerja daripada tindakan majikan yang melampau; bekerjasama dengan kerajaan dalam dasar buruh (contoh mengurangkan pengangguran); menjamin keadaan kerja yang lebih baik (masa kerja, cuti).</p>
<div class="jadual"><table><caption>Cara kesatuan sekerja menuntut upah lebih tinggi</caption>
<thead><tr><th>Cara</th><th>Kesan</th></tr></thead>
<tbody>
<tr><td><b>Meningkatkan daya pengeluaran sut buruh</b> melalui latihan</td><td>DL beralih ke kanan: upah naik (W₁ ke W₂) dan kuantiti buruh bertambah (L₁ ke L₂)</td></tr>
<tr><td><b>Menghadkan penawaran buruh</b>: tempoh sekolah/latihan lebih panjang, hadkan buruh asing</td><td>SL beralih ke kiri: upah naik tetapi kuantiti buruh berkurang</td></tr>
<tr><td><b>Menetapkan upah minimum</b></td><td>Majikan wajib membayar sekurang-kurangnya upah minimum yang lebih tinggi daripada upah keseimbangan</td></tr>
<tr><td><b>Perundingan kolektif</b>: tawar-menawar dengan majikan</td><td>Jika gagal: mogok, berpiket, pemulauan, melambatkan atau memendekkan masa kerja</td></tr>
</tbody></table></div>
<div class="kotak fokus"><span class="kotak-label">Faktor kejayaan kesatuan sekerja</span><ul>
<li><b>Kekuatan kesatuan</b>: ahli ramai dan sumber kewangan kukuh.</li>
<li><b>Bahagian upah dalam kos pengeluaran kecil</b>: majikan lebih mudah bersetuju.</li>
<li><b>Keluaran firma tidak anjal</b>: kenaikan kos boleh dipindahkan kepada pembeli.</li>
<li><b>Ekonomi pada guna tenaga penuh</b>: kuasa tawar-menawar lebih kuat.</li></ul></div>
<div class="kotak tip"><span class="kotak-label">Tip esei</span><p>Kaedah "meningkatkan daya pengeluaran sut buruh" sering dianggap terbaik kerana upah <b>dan</b> guna tenaga sama-sama meningkat, berbanding menghadkan penawaran atau upah minimum yang boleh mengurangkan guna tenaga.</p></div>
`
    },
    {
      no: "5.3",
      tajuk: "Sewa, Kadar Bunga dan Untung",
      soalan: [
        "Apakah beza sewa ekonomi, perolehan pindahan dan sewa kuasi?",
        "Apakah beza kadar bunga nominal dan kadar bunga benar?",
        "Bagaimanakah untung ekonomi dan untung perakaunan dihitung?"
      ],
      html: `
<h3>Sewa</h3>
<p>Ganjaran kepada pemilik faktor yang penawarannya terhad, seperti tanah.</p>
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Sewa ekonomi</span><p>Lebihan bayaran yang diterima faktor berbanding bayaran daripada kegunaan kedua terbaik.</p></div>
  <div class="kotak def"><span class="kotak-label">Perolehan pindahan</span><p>Bayaran minimum kepada faktor untuk mengelakkannya berpindah ke kegunaan kedua terbaik.</p></div>
</div>
<div class="kotak contoh"><span class="kotak-label">Contoh</span><div class="kira">
<div class="baris">Tanah untuk rumah: sewa RM1 300; untuk kilang: sewa RM2 000</div>
<div class="baris">Perolehan pindahan = RM1 300</div>
<div class="baris jawapan">Sewa ekonomi = RM2 000 − RM1 300 = RM700</div></div></div>
<p>Pada rajah pasaran tanah, di bawah keluk penawaran hingga Q ialah <b>perolehan pindahan</b>, dan kawasan di atas keluk penawaran hingga sewa keseimbangan ialah <b>sewa ekonomi</b>.</p>
<div class="kotak def"><span class="kotak-label">Sewa kuasi</span><p>Lebihan jumlah hasil melebihi jumlah kos berubah: <b>sewa kuasi = TR − TVC</b>. Wujud dalam <b>jangka pendek</b> sahaja.</p></div>
<h3>Bunga</h3>
<p>Ganjaran ke atas penggunaan modal, diukur dalam bentuk peratus.</p>
<div class="grid-2">
  <div class="kad-mini"><b>Kadar bunga nominal</b><p>Kadar yang dikenakan ke atas modal yang dipinjam.</p></div>
  <div class="kad-mini"><b>Kadar bunga benar</b><p>Kadar bunga nominal ditolak kadar inflasi.</p></div>
</div>
<div class="kotak contoh"><span class="kotak-label">Contoh</span><div class="kira"><div class="baris">Pinjaman RM10 000, kadar faedah 10%, inflasi 4%</div><div class="baris jawapan">Kadar bunga benar = 10% − 4% = 6%</div></div></div>
<h3>Untung</h3>
<p>Ganjaran kepada pengusaha kerana menanggung risiko: perbezaan antara jumlah hasil dengan jumlah kos.</p>
<div class="kotak contoh"><span class="kotak-label">Contoh: firma T-shirt</span><div class="kira">
<div class="baris">Kos eksplisit = mesin RM10 000 + kain RM3 000 + upah RM500 = RM13 500</div>
<div class="baris">Kos implisit = bangunan kilang sendiri RM1 000</div>
<div class="baris">TR = RM20 × 1 000 helai = RM20 000</div>
<div class="baris">Untung ekonomi = 20 000 − (13 500 + 1 000) = RM5 500</div>
<div class="baris jawapan">Untung perakaunan = 20 000 − 13 500 = RM6 500</div></div>
<p>Untung ekonomi lebih kecil kerana mengambil kira kos implisit.</p></div>
`
    }
  ],
  kad: [
    { d: "Maksud <b>permintaan terbitan</b>", b: "Permintaan faktor bergantung kepada permintaan barang yang dihasilkannya. Contoh: permintaan rumah naik, permintaan kayu dan simen naik.", t: "5.1" },
    { d: "Rumus <b>APP</b> dan <b>MPP</b>", b: "APP = TPP ÷ L. MPP = ΔTPP ÷ ΔL.", t: "5.1" },
    { d: "Rumus <b>ARP</b> dan <b>MRP</b>", b: "ARP = TRP ÷ L = APP × P. MRP = ΔTRP ÷ ΔL = MPP × P.", t: "5.1" },
    { d: "Syarat keseimbangan firma dalam <b>pasaran faktor</b>", b: "MRP = MCF.", t: "5.1" },
    { d: "Keluk <b>permintaan buruh</b> firma PPS", b: "Sebahagian keluk MRP yang positif, bermula dari ARP maksimum; mencerun ke bawah.", t: "5.1" },
    { d: "Keluk <b>penawaran faktor</b> bagi firma PPS", b: "Anjal sempurna (mendatar) kerana upah ditentukan pasaran: MCF = ACF = W.", t: "5.1" },
    { d: "Beza <b>upah wang</b> dan <b>upah benar</b>", b: "Upah wang: jumlah wang diterima. Upah benar: kuasa beli upah wang (barang dan perkhidmatan yang dapat dibeli).", t: "5.2" },
    { d: "Harga keluaran RM5, upah RM35: berapa buruh?", b: "MRP = MCF = RM35 pada 5 orang buruh. Untung = 195 − 175 = RM20.", t: "5.2" },
    { d: "Kesan <b>umur bersara dilanjutkan</b> ke atas pasaran buruh", b: "SS buruh ke kanan: upah turun, kuantiti buruh bertambah.", t: "5.2" },
    { d: "Maksud <b>kesatuan sekerja</b>", b: "Organisasi pekerja yang mewakili ahli dalam perundingan dengan majikan untuk upah dan kebajikan yang lebih baik.", t: "5.2" },
    { d: "Empat cara kesatuan sekerja menaikkan <b>upah</b>", b: "Meningkatkan daya pengeluaran sut buruh, menghadkan penawaran buruh, menetapkan upah minimum, perundingan kolektif.", t: "5.2" },
    { d: "Tindakan jika <b>perundingan kolektif</b> gagal", b: "Mogok, berpiket, pemulauan, melambatkan atau memendekkan masa kerja.", t: "5.2" },
    { d: "Faktor kejayaan <b>kesatuan sekerja</b>", b: "Kesatuan kuat (ahli dan kewangan), bahagian upah dalam kos kecil, keluaran firma tidak anjal, ekonomi pada guna tenaga penuh.", t: "5.2" },
    { d: "Beza <b>sewa ekonomi</b> dan <b>perolehan pindahan</b>", b: "Sewa ekonomi: lebihan melebihi bayaran kegunaan kedua terbaik. Perolehan pindahan: bayaran minimum untuk mengekalkan faktor.", t: "5.3" },
    { d: "Tanah: RM1 300 (rumah) atau RM2 000 (kilang)", b: "Perolehan pindahan RM1 300; sewa ekonomi RM700.", t: "5.3" },
    { d: "Maksud <b>sewa kuasi</b>", b: "TR − TVC. Wujud dalam jangka pendek sahaja.", t: "5.3" },
    { d: "<b>Kadar bunga benar</b>", b: "Kadar bunga nominal − kadar inflasi. Contoh: 10% − 4% = 6%.", t: "5.3" },
    { d: "Untung ekonomi berbanding untung perakaunan (T-shirt)", b: "Untung ekonomi RM5 500 (tolak kos eksplisit dan implisit); untung perakaunan RM6 500 (tolak kos eksplisit sahaja).", t: "5.3" }
  ],
  kuiz: []
});
