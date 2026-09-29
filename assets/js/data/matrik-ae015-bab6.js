/* =========================================================
   Matrikulasi · AE015 Mikroekonomi · Bab 6 · Struktur Pasaran
   Sumber: slaid kuliah AE015 "BAB 6.1 PPS" (57 slaid), "BAB 6.2 Monopoli"
           (62 slaid) dan "Bab 6.3 Pasaran Bermonopoli" (29 slaid).
   Penomboran subtopik mengikut isi kandungan slaid: 6.1 Pengenalan,
   6.2 PPS, 6.3 Monopoli, 6.4 Bermonopoli, 6.5 Oligopoli.
   6.5 Oligopoli belum ada failnya: ditulis sebagai CADANGAN sementara.
   ========================================================= */
EKO.daftarBab({
  id: "m1-b6",
  peringkat: "matrik",
  tingkatan: 1,
  no: 6,
  tajuk: "Struktur Pasaran",
  warna: "var(--bab-rm100)",
  ringkas:
    "Struktur pasaran mengelaskan firma mengikut bilangan firma, jenis barang, kebebasan keluar masuk, kuasa menentukan harga dan persaingan bukan harga. Bab ini merangkumi pasaran persaingan sempurna, monopoli dan persaingan bermonopoli: keluk hasil, keseimbangan jangka pendek dan jangka panjang, titik tutup, diskriminasi harga, perbandingan kecekapan serta kebaikan dan kelemahan. Oligopoli ialah cadangan sementara.",
  seksyen: [
    {
      no: "6.1",
      tajuk: "Pengenalan kepada Struktur Pasaran",
      soalan: ["Apakah lima asas pengkelasan struktur pasaran?", "Apakah jenis pasaran persaingan tak sempurna?"],
      html: `
<div class="kotak def"><span class="kotak-label">Struktur pasaran</span><p>Pengkelasan firma kepada bentuk pasaran tertentu berdasarkan lima ciri asas: (1) bilangan firma, (2) jenis barang yang dihasilkan, (3) kebebasan firma keluar masuk pasaran, (4) kuasa menentukan harga, dan (5) pelaksanaan persaingan bukan harga.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Persaingan sempurna (PPS)</b><p>Ramai penjual dan pembeli yang berurus niaga barang homogen. Oleh sebab barang serba sama, tiada persaingan bukan harga.</p></div>
  <div class="kad-mini"><b>Persaingan tak sempurna</b><p>Monopoli, persaingan bermonopoli (monopolistik) dan oligopoli.</p></div>
</div>
`
    },
    {
      no: "6.2",
      tajuk: "Pasaran Persaingan Sempurna (PPS)",
      soalan: [
        "Apakah ciri PPS?",
        "Mengapakah keluk permintaan firma PPS mendatar?",
        "Bagaimanakah firma PPS memaksimumkan untung dan bilakah ia menutup operasi?",
        "Bagaimanakah keseimbangan jangka panjang dicapai?"
      ],
      html: `
<h3><span class="no">6.2.1</span> Ciri pasaran persaingan sempurna</h3>
<div class="jadual"><table><caption>Ciri PPS</caption>
<thead><tr><th>Ciri</th><th>Huraian</th></tr></thead>
<tbody>
<tr><td>Penjual dan pembeli ramai</td><td>Keluaran setiap firma sangat kecil berbanding keluaran pasaran, maka kuasa setiap firma (dan pengguna) amat kecil.</td></tr>
<tr><td>Barang homogen</td><td>Barang setiap firma serba sama dan menjadi pengganti sempurna; tiada persaingan bukan harga dan tiada kuasa menentukan harga.</td></tr>
<tr><td>Bebas keluar masuk</td><td>Pengeluaran tidak memerlukan modal besar atau teknologi tinggi, dan tiada perlu pengiklanan.</td></tr>
<tr><td>Pengetahuan sempurna</td><td>Penjual dan pembeli mengetahui harga pasaran serta kos dan harga faktor pengeluaran.</td></tr>
<tr><td>Mobiliti faktor sempurna</td><td>Faktor pengeluaran mudah bergerak; faktor yang sama mempunyai kecekapan yang sama di mana-mana firma.</td></tr>
</tbody></table></div>

<h3><span class="no">6.2.2</span> Keluk hasil dan keluk permintaan firma</h3>
<div class="kotak rumus"><span class="kotak-label">Konsep hasil</span><div class="rumus-baris">TR = P × Q &nbsp; AR = TR/Q = P &nbsp; MR = ΔTR/ΔQ</div><p>Oleh sebab harga tetap, TR bertambah dengan jumlah yang sama bagi setiap unit tambahan, maka <b>P = AR = MR</b>.</p></div>
<div class="jadual"><table><caption>Hasil firma PPS pada harga RM40</caption>
<thead><tr><th class="n">Q</th><th class="n">1</th><th class="n">2</th><th class="n">3</th><th class="n">4</th><th class="n">5</th><th class="n">6</th><th class="n">7</th><th class="n">8</th></tr></thead>
<tbody>
<tr><td>TR (RM)</td><td class="n">40</td><td class="n">80</td><td class="n">120</td><td class="n">160</td><td class="n">200</td><td class="n">240</td><td class="n">280</td><td class="n">320</td></tr>
<tr><td>AR = MR (RM)</td><td class="n">40</td><td class="n">40</td><td class="n">40</td><td class="n">40</td><td class="n">40</td><td class="n">40</td><td class="n">40</td><td class="n">40</td></tr>
</tbody></table></div>
<div class="kotak fokus"><span class="kotak-label">Keluk permintaan firma: anjal sempurna</span><p>Harga ditentukan oleh pasaran (persilangan DD dan SS pasaran). Firma boleh menjual sebanyak mana pun pada harga pasaran, tetapi jika menaikkan harga, permintaan terhadapnya menjadi sifar. Oleh itu keluk DD firma ialah garis mendatar: <b>DD = AR = MR = P</b>. Keluk TR pula garis lurus dari asalan.</p></div>

<h3><span class="no">6.2.3(a)</span> Memaksimumkan untung</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Pendekatan TR–TC</b><p>Untung maksimum pada keluaran di mana <b>beza TR − TC paling besar</b>.</p></div>
  <div class="kad-mini"><b>Pendekatan MR–MC</b><p>Untung maksimum apabila <b>MC = MR</b> dan <b>MC memotong MR dari bawah</b>.</p></div>
</div>
<div class="jadual"><table><caption>Contoh firma PPS: P = RM20</caption>
<thead><tr><th class="n">Q</th><th class="n">TR</th><th class="n">MR</th><th class="n">TC</th><th class="n">MC</th><th class="n">AC</th><th class="n">Untung (+/−)</th></tr></thead>
<tbody>
<tr><td class="n">1</td><td class="n">20</td><td class="n">20</td><td class="n">32.5</td><td class="n">–</td><td class="n">32.5</td><td class="n">−12.5</td></tr>
<tr><td class="n">2</td><td class="n">40</td><td class="n">20</td><td class="n">48</td><td class="n">15.5</td><td class="n">24</td><td class="n">−8</td></tr>
<tr><td class="n">3</td><td class="n">60</td><td class="n">20</td><td class="n">57</td><td class="n">9</td><td class="n">19</td><td class="n">3</td></tr>
<tr><td class="n">4</td><td class="n">80</td><td class="n">20</td><td class="n">62</td><td class="n">5</td><td class="n">15.5</td><td class="n">18</td></tr>
<tr><td class="n">5</td><td class="n">100</td><td class="n">20</td><td class="n">73</td><td class="n">11</td><td class="n">14.6</td><td class="n">27</td></tr>
<tr><td class="n">6</td><td class="n">120</td><td class="n">20</td><td class="n">93</td><td class="n">20</td><td class="n">15.5</td><td class="n"><b>27</b></td></tr>
<tr><td class="n">7</td><td class="n">140</td><td class="n">20</td><td class="n">122.5</td><td class="n">29.5</td><td class="n">17.5</td><td class="n">17.5</td></tr>
<tr><td class="n">8</td><td class="n">160</td><td class="n">20</td><td class="n">160</td><td class="n">37.5</td><td class="n">20</td><td class="n">0</td></tr>
</tbody></table></div>
<p>Untung maksimum RM27 dicapai pada keluaran 6 unit, apabila <b>MC = MR = RM20</b> (MC sedang naik). Pada keluaran 5 unit untung juga RM27, tetapi MR (20) masih melebihi MC (11), maka firma menambah keluaran sehingga MC = MR.</p>
<figure data-graf="carta-jadual" data-opt='{"tajuk":"Firma PPS: TR, TC, MR dan MC (jadual modul)","namaX":"Keluaran","unitX":"unit","dpX":0,"dp":1,"nilaiX":[1,2,3,4,5,6,7,8],"xAwal":6,"notaLalai":"","nota":{"1":"TC melebihi TR: rugi RM12.5.","3":"TR mula melebihi TC: untung RM3.","5":"Untung RM27 tetapi MR (20) &gt; MC (11): menambah keluaran masih menambah untung.","6":"&lt;b&gt;Keseimbangan&lt;/b&gt;: MC = MR = RM20 dan MC memotong MR dari bawah. Untung maksimum RM27.","7":"MC (29.5) &gt; MR (20): untung jatuh ke RM17.5.","8":"TR = TC: untung sifar."},"panel":[{"labelX":"Keluaran (unit)","labelY":"TR dan TC (RM)","x":[0,8.8],"y":[0,180],"tikX":[0,1,2,3,4,5,6,7,8],"tikY":[0,40,80,120,160],"siri":[{"id":"tr","nama":"TR","label":"TR","kelas":"d","rm":true,"data":[[1,20],[2,40],[3,60],[4,80],[5,100],[6,120],[7,140],[8,160]]},{"id":"tc","nama":"TC","label":"TC","kelas":"s","rm":true,"data":[[1,32.5],[2,48],[3,57],[4,62],[5,73],[6,93],[7,122.5],[8,160]],"dyLabel":-6}]},{"labelX":"Keluaran (unit)","labelY":"Hasil dan kos (RM)","x":[0,8.8],"y":[0,40],"tikX":[0,1,2,3,4,5,6,7,8],"tikY":[0,10,20,30,40],"siri":[{"id":"mr","nama":"AR = MR = P","label":"AR=MR","kelas":"d","rm":true,"licin":false,"titik":false,"data":[[1,20],[2,20],[3,20],[4,20],[5,20],[6,20],[7,20],[8,20]]},{"id":"mc","nama":"MC","label":"MC","kelas":"c4","rm":true,"data":[[2,15.5],[3,9],[4,5],[5,11],[6,20],[7,29.5],[8,37.5]]},{"id":"ac","nama":"AC","label":"AC","kelas":"c3","rm":true,"data":[[1,32.5],[2,24],[3,19],[4,15.5],[5,14.6],[6,15.5],[7,17.5],[8,20]],"dyLabel":12}],"bulat":[[6,20]]}]}'></figure>

<h3><span class="no">6.2.3(b)</span> Jenis keuntungan firma PPS jangka pendek</h3>
<div class="jadual"><table><caption>Pada MC = MR = AR = P</caption>
<thead><tr><th>Jenis untung</th><th>Syarat</th></tr></thead>
<tbody>
<tr><td>Untung lebih normal</td><td>TR &gt; TC, iaitu P &gt; AC</td></tr>
<tr><td>Untung normal</td><td>TR = TC, iaitu P = AC (titik pulang modal, AC minimum)</td></tr>
<tr><td>Untung kurang normal (rugi)</td><td>TR &lt; TC, iaitu P &lt; AC</td></tr>
</tbody></table></div>
<figure data-graf="struktur-pasaran" data-opt='{"jenis":"pps"}'></figure>

<h3><span class="no">6.2.3(c)</span> Titik tutup firma</h3>
<div class="jadual"><table><caption>Firma yang rugi: teruskan atau tutup?</caption>
<thead><tr><th>Keadaan</th><th>Keputusan</th></tr></thead>
<tbody>
<tr><td>AVC &lt; P &lt; AC</td><td><b>Teruskan</b>: hasil menampung semua kos berubah dan sebahagian kos tetap. Jika tutup, rugi = seluruh kos tetap, iaitu lebih besar.</td></tr>
<tr><td>P = AVC minimum</td><td><b>Titik tutup</b>: rugi sama dengan jumlah kos tetap. Firma boleh terus beroperasi pada keadaan minimum atau menutup operasi.</td></tr>
<tr><td>P &lt; AVC minimum</td><td><b>Tutup</b>: rugi melebihi jumlah kos tetap.</td></tr>
</tbody></table></div>
<div class="kotak tip"><span class="kotak-label">Mengapa firma rugi masih beroperasi?</span><p>Hasil masih menampung kos berubah dan sebahagian kos tetap; nama baik syarikat terjaga; pelanggan sedia ada dikekalkan; pekerja mahir dikekalkan; dan kecekapan pekerja meningkat melalui masa.</p></div>

<h3><span class="no">6.2.3(d)</span> Keluk penawaran firma dan pasaran jangka pendek</h3>
<div class="kotak fokus"><span class="kotak-label">Keluk penawaran firma PPS</span><p>Apabila harga naik dari P ke P₁, P₂, P₃, titik MC = MR bergerak di sepanjang keluk MC. Oleh itu keluk penawaran firma ialah <b>bahagian keluk MC di atas titik minimum AVC</b>.</p></div>
<div class="jadual"><table><caption>Penawaran pasaran: jumlah mendatar penawaran firma</caption>
<thead><tr><th class="n">Harga (RM)</th><th class="n">Firma X</th><th class="n">Firma Y</th><th class="n">Pasaran</th></tr></thead>
<tbody><tr><td class="n">1.00</td><td class="n">35</td><td class="n">30</td><td class="n">65</td></tr><tr><td class="n">2.00</td><td class="n">40</td><td class="n">45</td><td class="n">85</td></tr><tr><td class="n">3.00</td><td class="n">48</td><td class="n">60</td><td class="n">108</td></tr></tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Rajah penawaran pasaran (slaid 45) melabelkan 60 unit pada harga RM1. Mengikut jadual, penawaran pasaran pada RM1 ialah 35 + 30 = <b>65 unit</b>.</p></div>

<h3><span class="no">6.2.4</span> Keseimbangan firma jangka panjang</h3>
<p>Dalam jangka panjang, firma PPS memperoleh <b>untung normal sahaja</b> kerana wujud kebebasan keluar masuk:</p>
<div class="grid-2">
  <div class="kad-mini"><b>Dari untung lebih normal</b><p>Untung lebih normal menarik firma baharu masuk. Penawaran pasaran bertambah (S ke S₁), harga pasaran jatuh (P ke P₁) sehingga P = AC minimum, dan untung lebih normal hilang.</p></div>
  <div class="kad-mini"><b>Dari untung kurang normal</b><p>Firma yang rugi keluar dari industri. Penawaran pasaran berkurang, harga naik sehingga P = AC minimum, dan firma yang tinggal memperoleh untung normal.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Keseimbangan jangka panjang PPS</span><div class="rumus-baris">P = AR = MR = SMC = LMC = SAC = LAC minimum</div></div>

<h3><span class="no">6.2.5</span> Kebaikan dan kelemahan PPS</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Kebaikan</b><p>(a) <b>Kecekapan peruntukan</b>: P = MC pada keseimbangan. (b) <b>Kecekapan pengeluaran</b>: keluaran pada AC minimum (P = AC minimum). (c) Tiada persaingan bukan harga, maka kos iklan dijimatkan dan harga lebih rendah kepada pengguna.</p></div>
  <div class="kad-mini"><b>Kelemahan</b><p>(a) Pengguna tiada pilihan kerana barang homogen. (b) Tidak menggalakkan teknologi kerana untung normal tidak cukup untuk penyelidikan. (c) Kos sosial: banyak firma menyebabkan pencemaran, kesesakan dan masalah lain.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Pada slaid 51–52, huraian bagi "kecekapan peruntukan" dan "kecekapan pengeluaran" tertukar. Yang betul: <b>kecekapan peruntukan</b> berlaku apabila <b>P = MC</b>, manakala <b>kecekapan pengeluaran</b> berlaku apabila firma mengeluarkan pada <b>AC minimum</b>.</p></div>
`
    },
    {
      no: "6.3",
      tajuk: "Pasaran Monopoli",
      soalan: [
        "Apakah ciri dan faktor kewujudan monopoli?",
        "Mengapakah MR monopoli sentiasa di bawah AR?",
        "Bagaimanakah monopoli memaksimumkan untung?",
        "Apakah syarat dan darjah diskriminasi harga?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Definisi</span><p>Struktur pasaran yang mempunyai <b>satu pengeluar sahaja</b> yang mengeluarkan barang <b>tanpa pengganti hampir</b>.</p></div>
<h3><span class="no">6.3.1</span> Ciri pasaran monopoli</h3>
<div class="grid-3">
  <div class="kad-mini"><b>Pengeluar tunggal</b><p>Firma ialah industri (monopoli tulen). Ia mengawal sepenuhnya harga: <b>penentu harga</b>.</p></div>
  <div class="kad-mini"><b>Tiada pengganti hampir</b><p>Pembeli yang mahukan barang itu mesti membelinya daripada firma tersebut.</p></div>
  <div class="kad-mini"><b>Halangan kemasukan</b><p>Pemilikan eksklusif bahan mentah, ekonomi bidangan, monopoli yang diberi kerajaan dan gabungan firma.</p></div>
</div>
<h3><span class="no">6.3.2</span> Faktor kewujudan monopoli</h3>
<div class="jadual"><table><caption>Punca monopoli</caption>
<thead><tr><th>Faktor</th><th>Huraian</th></tr></thead>
<tbody>
<tr><td>Perlindungan undang-undang</td><td>Paten, lesen atau hak cipta menyekat firma lain.</td></tr>
<tr><td>Saiz modal yang besar</td><td>Ekonomi bidangan menurunkan kos purata firma besar sehingga firma kecil tidak mampu bersaing: <b>monopoli semula jadi</b>.</td></tr>
<tr><td>Keupayaan teknologi</td><td>Penguasaan teknologi tinggi, contohnya Microsoft.</td></tr>
<tr><td>Pemilikan sumber</td><td>Firma yang mengawal seluruh bekalan bahan mentah boleh menghalang pesaing.</td></tr>
<tr><td>Penggabungan firma</td><td>Firma induk membeli firma pesaing sehingga tinggal satu firma.</td></tr>
</tbody></table></div>

<h3><span class="no">6.3.3</span> Keluk permintaan dan keluk hasil monopoli</h3>
<p>Keluk permintaan firma monopoli ialah keluk permintaan industri dan mencerun ke bawah: untuk menjual lebih banyak, harga perlu diturunkan. Keluk DD juga keluk AR: <b>P = AR = a − bQ</b>.</p>
<div class="jadual"><table><caption>Jadual 6.3.3(b): TR, AR dan MR monopoli</caption>
<thead><tr><th class="n">Q</th><th class="n">P = AR (RM)</th><th class="n">TR (RM)</th><th class="n">MR (RM)</th></tr></thead>
<tbody>
<tr><td class="n">0</td><td class="n">17.50</td><td class="n">0</td><td class="n">–</td></tr>
<tr><td class="n">1</td><td class="n">16.00</td><td class="n">16.00</td><td class="n">16.00</td></tr>
<tr><td class="n">2</td><td class="n">14.50</td><td class="n">29.00</td><td class="n">13.00</td></tr>
<tr><td class="n">3</td><td class="n">13.00</td><td class="n">39.00</td><td class="n">10.00</td></tr>
<tr><td class="n">4</td><td class="n">11.50</td><td class="n">46.00</td><td class="n">7.00</td></tr>
<tr><td class="n">5</td><td class="n">10.00</td><td class="n">50.00</td><td class="n">4.00</td></tr>
<tr><td class="n">6</td><td class="n">8.50</td><td class="n">51.00</td><td class="n">1.00</td></tr>
<tr><td class="n">7</td><td class="n">7.00</td><td class="n">49.00</td><td class="n">−2.00</td></tr>
<tr><td class="n">8</td><td class="n">5.50</td><td class="n">44.00</td><td class="n">−5.00</td></tr>
<tr><td class="n">9</td><td class="n">4.00</td><td class="n">36.00</td><td class="n">−8.00</td></tr>
</tbody></table></div>
<div class="kotak rumus"><span class="kotak-label">Bukti: MR dua kali lebih curam daripada AR</span><div class="kira">
  <div class="baris">AR = P = a − bQ</div>
  <div class="baris">TR = P × Q = aQ − bQ²</div>
  <div class="baris jawapan">MR = ΔTR/ΔQ = a − 2bQ</div></div>
  <p>MR sentiasa di bawah AR kerana harga semua unit perlu diturunkan untuk menjual satu unit tambahan. Apabila MR positif, Ed &gt; 1; MR = 0 ketika TR maksimum (Ed = 1); MR negatif apabila Ed &lt; 1.</p></div>

<h3><span class="no">6.3.4</span> Keseimbangan monopoli jangka pendek</h3>
<div class="jadual"><table><caption>Keseimbangan monopoli melalui jadual (RM)</caption>
<thead><tr><th class="n">Q</th><th class="n">P</th><th class="n">TR</th><th class="n">MR</th><th class="n">TC</th><th class="n">AC</th><th class="n">MC</th><th class="n">Untung</th></tr></thead>
<tbody>
<tr><td class="n">0</td><td class="n">17.50</td><td class="n">0</td><td class="n">–</td><td class="n">10.00</td><td class="n">–</td><td class="n">–</td><td class="n">−10.00</td></tr>
<tr><td class="n">1</td><td class="n">16.00</td><td class="n">16.00</td><td class="n">16.00</td><td class="n">24.00</td><td class="n">24.00</td><td class="n">14.00</td><td class="n">−8.00</td></tr>
<tr><td class="n">2</td><td class="n">14.50</td><td class="n">29.00</td><td class="n">13.00</td><td class="n">30.00</td><td class="n">15.00</td><td class="n">6.00</td><td class="n">−1.00</td></tr>
<tr><td class="n">3</td><td class="n">13.00</td><td class="n">39.00</td><td class="n">10.00</td><td class="n">35.00</td><td class="n">11.67</td><td class="n">5.00</td><td class="n">4.00</td></tr>
<tr><td class="n">4</td><td class="n">11.50</td><td class="n">46.00</td><td class="n">7.00</td><td class="n">42.00</td><td class="n">10.50</td><td class="n">7.00</td><td class="n"><b>4.00</b></td></tr>
<tr><td class="n">5</td><td class="n">10.00</td><td class="n">50.00</td><td class="n">4.00</td><td class="n">50.00</td><td class="n">10.00</td><td class="n">8.00</td><td class="n">0.00</td></tr>
<tr><td class="n">6</td><td class="n">8.50</td><td class="n">51.00</td><td class="n">1.00</td><td class="n">58.50</td><td class="n">9.75</td><td class="n">8.50</td><td class="n">−7.50</td></tr>
<tr><td class="n">7</td><td class="n">7.00</td><td class="n">49.00</td><td class="n">−2.00</td><td class="n">71.40</td><td class="n">10.20</td><td class="n">12.90</td><td class="n">−22.40</td></tr>
<tr><td class="n">8</td><td class="n">5.50</td><td class="n">44.00</td><td class="n">−5.00</td><td class="n">98.40</td><td class="n">12.30</td><td class="n">27.00</td><td class="n">−54.40</td></tr>
<tr><td class="n">9</td><td class="n">4.00</td><td class="n">36.00</td><td class="n">−8.00</td><td class="n">126.00</td><td class="n">14.00</td><td class="n">27.60</td><td class="n">−90.00</td></tr>
</tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Jadual slaid 27 menulis AC = 14.00 pada Q = 1. AC = TC/Q = 24/1 = <b>RM24.00</b>. Jadual di atas telah dibetulkan.</p></div>
<p>Pada Q = 4, <b>MR = MC = RM7</b> (MC sedang naik). Harga RM11.50, AC RM10.50, maka untung = (11.50 − 10.50) × 4 = <b>RM4</b>, sama dengan TR − TC = 46 − 42.</p>
<figure data-graf="carta-jadual" data-opt='{"tajuk":"Monopoli: AR, MR, AC dan MC (jadual modul)","namaX":"Keluaran","unitX":"unit","dpX":0,"dp":2,"nilaiX":[1,2,3,4,5,6,7,8,9],"xAwal":4,"notaLalai":"","nota":{"1":"MR (16) &gt; MC (14): tambah keluaran.","3":"MR (10) &gt; MC (5): tambah keluaran.","4":"&lt;b&gt;Keseimbangan&lt;/b&gt;: MR = MC = RM7. P = RM11.50 &gt; AC = RM10.50: untung lebih normal RM4.","5":"MC (8) &gt; MR (4): kurangkan keluaran.","6":"TR maksimum (RM51): MR hampir sifar.","7":"MR negatif: TR menurun."},"panel":[{"labelX":"Keluaran (unit)","labelY":"Hasil dan kos (RM)","x":[0,9.8],"y":[-10,30],"tikX":[0,1,2,3,4,5,6,7,8,9],"tikY":[-10,0,10,20,30],"asalan":false,"paksiXBawah":true,"siri":[{"id":"ar","nama":"AR = P","label":"AR","kelas":"d","rm":true,"data":[[1,16],[2,14.5],[3,13],[4,11.5],[5,10],[6,8.5],[7,7],[8,5.5],[9,4]]},{"id":"mr","nama":"MR","label":"MR","kelas":"s","rm":true,"data":[[1,16],[2,13],[3,10],[4,7],[5,4],[6,1],[7,-2],[8,-5],[9,-8]]},{"id":"ac","nama":"AC","label":"AC","kelas":"c3","rm":true,"data":[[1,24],[2,15],[3,11.67],[4,10.5],[5,10],[6,9.75],[7,10.2],[8,12.3],[9,14]]},{"id":"mc","nama":"MC","label":"MC","kelas":"c4","rm":true,"data":[[1,14],[2,6],[3,5],[4,7],[5,8],[6,8.5],[7,12.9],[8,27],[9,27.6]],"dyLabel":-6}],"bulat":[[4,7]]}]}'></figure>
<div class="kotak contoh"><span class="kotak-label">Pendekatan matematik</span><div class="kira">
  <div class="baris">P = 93 − 5Q, maka MR = 93 − 10Q; MC = 5 + 12Q</div>
  <div class="baris">MR = MC: 93 − 10Q = 5 + 12Q</div>
  <div class="baris">22Q = 88 → Q = 4 unit</div>
  <div class="baris jawapan">P = 93 − 5(4) = RM73</div></div></div>
<div class="kotak fokus"><span class="kotak-label">Asas keseimbangan</span><p>Jika MR &gt; MC, firma menambah keluaran; jika MC &gt; MR, firma mengurangkan keluaran, sehingga MR = MC. Dalam jangka pendek, monopoli boleh memperoleh untung lebih normal, untung normal atau untung kurang normal.</p></div>
<figure data-graf="struktur-pasaran" data-opt='{"jenis":"mono"}'></figure>

<h3><span class="no">6.3.5</span> Keseimbangan monopoli jangka panjang</h3>
<p>Firma boleh membesarkan saiz loji (SAC₁ ke SAC₂). Keseimbangan jangka panjang tercapai apabila <b>MR = SMC = LMC</b>, dan monopoli terus menikmati untung lebih normal (malah lebih besar) kerana wujud halangan kemasukan.</p>

<h3><span class="no">6.3.6</span> Diskriminasi harga</h3>
<div class="kotak def"><span class="kotak-label">Definisi</span><p>Amalan mengenakan <b>harga berlainan</b> bagi barang atau perkhidmatan yang sama kepada kumpulan pengguna yang berlainan atau di tempat yang berlainan.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Syarat diskriminasi harga</b><p>(i) Keanjalan permintaan berbeza antara pasaran. (ii) Pasaran boleh diasingkan (umur, geografi, pekerjaan). (iii) Tambahan kos lebih kecil daripada tambahan hasil. (iv) Barang tidak boleh dijual semula.</p></div>
  <div class="kad-mini"><b>Tiga darjah (A.C. Pigou)</b><p><b>Darjah pertama (sempurna)</b>: harga berlainan bagi setiap unit, iaitu harga maksimum yang sanggup dibayar; tiada lebihan pengguna. <b>Darjah kedua (blok)</b>: harga berbeza mengikut blok kuantiti yang dibeli. <b>Darjah ketiga (pasaran)</b>: harga berbeza bagi pasaran yang keanjalan permintaannya berbeza; pasaran kurang anjal dikenakan harga lebih tinggi.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 47 menerangkan darjah kedua dengan contoh perkhidmatan kesihatan untuk golongan kaya dan berpendapatan rendah. Contoh itu membahagikan <b>pengguna</b> kepada kumpulan, iaitu ciri <b>darjah ketiga</b>. Darjah kedua (blok) mengenakan harga berbeza mengikut <b>blok kuantiti</b>, contohnya tarif elektrik yang berbeza bagi setiap blok unit yang digunakan.</p></div>

<h3><span class="no">6.3.7</span> Perbandingan PPS dengan monopoli jangka panjang</h3>
<div class="jadual"><table><caption>PPS berbanding monopoli</caption>
<thead><tr><th>Aspek</th><th>PPS</th><th>Monopoli</th></tr></thead>
<tbody>
<tr><td>Harga</td><td>Lebih rendah</td><td>Lebih tinggi kerana kuasa menentukan harga</td></tr>
<tr><td>Kuantiti</td><td>Lebih besar</td><td>Lebih kecil kerana kuasa mengawal kuantiti</td></tr>
<tr><td>Untung jangka panjang</td><td>Normal</td><td>Lebih normal</td></tr>
<tr><td>Kecekapan pengeluaran</td><td>Tercapai: keluaran pada AC minimum</td><td>Tidak: keluaran pada bahagian AC yang menurun</td></tr>
<tr><td>Kecekapan peruntukan</td><td>Tercapai: P = MC</td><td>Tidak: P &gt; MC</td></tr>
</tbody></table></div>

<h3><span class="no">6.3.8</span> Kawalan harga oleh kerajaan</h3>
<p>Untuk melindungi pengguna tanpa mengabaikan firma, kerajaan boleh menetapkan harga monopoli pada <b>AR = AC</b>. Harga turun, keluaran bertambah, dan monopoli hanya memperoleh untung normal.</p>

<h3><span class="no">6.3.9</span> Kebaikan dan kelemahan monopoli</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Kebaikan</b><p>(a) Mencapai ekonomi bidangan: pengeluaran besar-besaran, harga boleh diturunkan dan keluaran ditambah. (b) Untung lebih normal membiayai R&amp;D dan teknologi baharu.</p></div>
  <div class="kad-mini"><b>Kelemahan</b><p>(a) Tidak cekap peruntukan (P &gt; MC). (b) Tidak cekap pengeluaran (bukan AC minimum). (c) Lambakan: menjual lebih murah di luar negeri, rakyat tempatan membayar lebih. (d) Tanpa saingan, mungkin enggan menjalankan R&amp;D. (e) Agihan pendapatan semakin tidak adil.</p></div>
</div>
`
    },
    {
      no: "6.4",
      tajuk: "Pasaran Persaingan Bermonopoli (PPB)",
      soalan: ["Apakah ciri pasaran bermonopoli?", "Mengapakah firma PPB hanya memperoleh untung normal dalam jangka panjang?", "Apakah bentuk persaingan bukan harga?"],
      html: `
<div class="kotak def"><span class="kotak-label">Definisi</span><p>Pasaran yang mempunyai bilangan firma yang relatif banyak, menghasilkan barang yang sedikit berbeza (mengikut tanggapan pengguna) dan merupakan pengganti hampir antara satu sama lain.</p></div>
<h3><span class="no">6.4.1</span> Ciri pasaran bermonopoli</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Bilangan firma relatif banyak</b><p>Kurang daripada PPS; keluaran setiap firma sebahagian kecil keluaran industri; tiada kerjasama atau gabungan.</p></div>
  <div class="kad-mini"><b>Barang boleh dibezakan</b><p>Berbeza dari segi pembungkusan, bentuk, jenama, iklan dan tanda perniagaan tetapi fungsinya sama. Contoh: ubat gigi, sabun mandi.</p></div>
  <div class="kad-mini"><b>Bebas keluar masuk</b><p>Tetapi tidak semudah PPS: firma baharu perlu menghasilkan barang yang berbeza corak.</p></div>
  <div class="kad-mini"><b>Persaingan harga dan bukan harga</b><p>Penjenamaan, iklan, promosi jualan, reka bentuk baharu dan perkhidmatan selepas jualan.</p></div>
</div>
<h3><span class="no">6.4.2</span> Keluk permintaan dan hasil</h3>
<p>Keluk DD = AR mencerun ke bawah tetapi <b>lebih landai</b> daripada monopoli kerana banyak pengganti hampir; firma mempunyai sedikit kuasa menentukan harga. Keluk MR juga mencerun ke bawah dan sentiasa di bawah AR.</p>
<h3><span class="no">6.4.3–6.4.4</span> Keseimbangan jangka pendek dan jangka panjang</h3>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Jangka pendek</span><p>Keseimbangan pada <b>MC = MR</b>. Firma boleh memperoleh untung lebih normal, normal atau kurang normal.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Jangka panjang</span><p>Untung lebih normal menarik firma baharu masuk (atau firma sedia ada membesarkan kapasiti). Keluaran industri bertambah, permintaan terhadap setiap firma merosot: keluk AR dan MR beralih ke kiri (lebih anjal) sehingga <b>AR menyentuh LAC</b>. Rugi pula menyebabkan firma keluar. Akhirnya firma PPB hanya memperoleh <b>untung normal</b>.</p></div>
</div>
<figure data-graf="struktur-pasaran" data-opt='{"jenis":"bermono"}'></figure>
<h3><span class="no">6.4.5</span> Persaingan bukan harga</h3>
<p>Persaingan bukan harga dianggap lebih baik kerana persaingan harga menjatuhkan TR dengan banyak, manakala persaingan bukan harga hanya menaikkan sedikit kos purata.</p>
<div class="grid-2">
  <div class="kad-mini"><b>Pengiklanan</b><p>Menyampaikan maklumat tentang kegunaan, harga, barang baharu dan tempat membeli melalui media cetak, media elektronik, papan iklan dan kain rentang.</p></div>
  <div class="kad-mini"><b>Galakan jualan</b><p>Hadiah percuma, kupon, cabutan bertuah, baucar dan pertandingan.</p></div>
  <div class="kad-mini"><b>Perkhidmatan selepas jualan</b><p>Penghantaran dan pemasangan percuma, jaminan tempoh tertentu dan baik pulih percuma.</p></div>
  <div class="kad-mini"><b>Penjenamaan</b><p>Menjenamakan produk supaya mudah dikenali pengguna.</p></div>
</div>
<h3><span class="no">6.4.6</span> Perbandingan PPB dengan PPS jangka panjang</h3>
<div class="jadual"><table><caption>PPB berbanding PPS</caption>
<thead><tr><th>Aspek</th><th>PPS</th><th>PPB</th></tr></thead>
<tbody>
<tr><td>Harga</td><td>Lebih rendah</td><td>Lebih tinggi kerana sedikit kuasa menentukan harga</td></tr>
<tr><td>Kuantiti</td><td>Lebih besar</td><td>Lebih kecil</td></tr>
<tr><td>Untung</td><td>Normal</td><td>Normal (kebebasan keluar masuk)</td></tr>
<tr><td>Kecekapan pengeluaran</td><td>Tercapai</td><td>Tidak: keluaran pada AC yang menurun</td></tr>
<tr><td>Kecekapan peruntukan</td><td>Tercapai (P = MC)</td><td>Tidak (P &gt; MC)</td></tr>
</tbody></table></div>
<h3><span class="no">6.4.7</span> Kebaikan dan kelemahan</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Kebaikan</b><p>(a) Pilihan pengguna luas dari segi mutu, bungkusan, reka bentuk dan jenama. (b) Persaingan menggalakkan teknologi untuk mengurangkan kos. (c) Agihan pendapatan lebih setara kerana untung normal dalam jangka panjang.</p></div>
  <div class="kad-mini"><b>Kelemahan</b><p>(a) Persaingan bukan harga memerlukan modal besar dan menaikkan kos. (b) Tidak cekap pengeluaran (AC menurun) dan tidak cekap peruntukan (P &gt; MC).</p></div>
</div>
`
    },
    {
      no: "6.5",
      tajuk: "Pasaran Oligopoli (cadangan)",
      soalan: ["Apakah ciri pasaran oligopoli?", "Mengapakah harga dalam pasaran oligopoli cenderung tegar?"],
      html: `
<div class="kotak info"><span class="kotak-label">Cadangan sementara</span><p>Isi kandungan slaid Bab 6 menyenaraikan 6.5 Pasaran Oligopoli, tetapi failnya belum diterima. Bahagian ini ialah <b>cadangan</b> dan akan disemak semula apabila fail modul ada.</p></div>
<div class="kotak def"><span class="kotak-label">Definisi</span><p>Pasaran yang dikuasai oleh <b>beberapa firma besar</b> yang menghasilkan barang homogen atau barang yang berbeza, dan setiap firma saling bergantung dalam membuat keputusan.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Beberapa firma besar</b><p>Setiap firma menguasai bahagian pasaran yang besar. Contoh: industri telekomunikasi dan petroleum.</p></div>
  <div class="kad-mini"><b>Saling bergantung</b><p>Keputusan harga dan keluaran satu firma mempengaruhi firma lain, maka setiap firma mengambil kira tindak balas pesaing.</p></div>
  <div class="kad-mini"><b>Halangan kemasukan tinggi</b><p>Modal besar, ekonomi bidangan, paten dan kesetiaan jenama menyukarkan firma baharu masuk.</p></div>
  <div class="kad-mini"><b>Persaingan bukan harga</b><p>Firma lebih suka bersaing melalui iklan dan jenama kerana perang harga merugikan semua firma.</p></div>
</div>
<div class="kotak fokus"><span class="kotak-label">Kekakuan harga</span><p>Jika sebuah firma menaikkan harga, pesaing tidak turut menaikkan harga dan firma itu kehilangan banyak pelanggan. Jika firma menurunkan harga, pesaing turut menurunkan harga dan jualan hampir tidak bertambah. Oleh itu harga oligopoli cenderung <b>tegar</b>. Firma juga boleh berpakat (kolusi atau kartel) untuk menetapkan harga dan kuota keluaran.</p></div>
`
    }
  ],
  kad: [
    { d: "Lima asas pengkelasan <b>struktur pasaran</b>", b: "Bilangan firma, jenis barang, kebebasan keluar masuk, kuasa menentukan harga dan persaingan bukan harga.", t: "6.1" },
    { d: "Lima ciri <b>PPS</b>", b: "Penjual dan pembeli ramai, barang homogen, bebas keluar masuk, pengetahuan sempurna, mobiliti faktor sempurna.", t: "6.2.1" },
    { d: "Mengapa keluk DD firma PPS mendatar?", b: "Harga ditentukan pasaran; firma boleh menjual sebanyak mana pada harga itu tetapi permintaan menjadi sifar jika harga dinaikkan. DD = AR = MR = P.", t: "6.2.2" },
    { d: "Dua syarat untung maksimum", b: "MC = MR, dan MC memotong MR dari bawah.", t: "6.2.3" },
    { d: "Keseimbangan firma PPS (P = RM20, jadual modul)", b: "6 unit, MC = MR = RM20, untung maksimum RM27.", t: "6.2.3" },
    { d: "Syarat untung lebih normal, normal dan kurang normal", b: "P > AC; P = AC; P < AC (semuanya pada MC = MR).", t: "6.2.3" },
    { d: "Maksud <b>titik tutup</b>", b: "P = AVC minimum: rugi sama dengan jumlah kos tetap. Jika P < AVC minimum, firma menutup operasi.", t: "6.2.3" },
    { d: "Keluk penawaran firma PPS jangka pendek", b: "Bahagian keluk MC di atas titik minimum AVC.", t: "6.2.3" },
    { d: "Penawaran pasaran pada RM1 (firma X 35, firma Y 30)", b: "65 unit (jumlah mendatar).", t: "6.2.3" },
    { d: "Mengapa firma PPS untung normal dalam jangka panjang?", b: "Kebebasan keluar masuk: untung lebih normal menarik firma masuk dan harga jatuh; rugi menyebabkan firma keluar dan harga naik, sehingga P = LAC minimum.", t: "6.2.4" },
    { d: "Beza <b>kecekapan peruntukan</b> dan <b>kecekapan pengeluaran</b>", b: "Peruntukan: P = MC. Pengeluaran: keluaran pada AC minimum.", t: "6.2.5" },
    { d: "Tiga ciri <b>monopoli</b>", b: "Pengeluar tunggal (penentu harga), barang tanpa pengganti hampir, halangan kemasukan.", t: "6.3.1" },
    { d: "Maksud <b>monopoli semula jadi</b>", b: "Monopoli yang terbentuk kerana ekonomi bidangan: firma besar mempunyai kos purata jauh lebih rendah sehingga firma kecil tidak dapat bersaing.", t: "6.3.2" },
    { d: "Persamaan MR bagi AR = a − bQ", b: "MR = a − 2bQ: kecerunan MR dua kali ganda kecerunan AR.", t: "6.3.3" },
    { d: "Keseimbangan monopoli (jadual modul)", b: "Q = 4, MR = MC = RM7, P = RM11.50, AC = RM10.50, untung RM4.", t: "6.3.4" },
    { d: "Monopoli: P = 93 − 5Q, MC = 5 + 12Q", b: "MR = 93 − 10Q = 5 + 12Q → Q = 4, P = RM73.", t: "6.3.4" },
    { d: "Empat syarat <b>diskriminasi harga</b>", b: "Keanjalan permintaan berbeza, pasaran boleh diasingkan, tambahan kos < tambahan hasil, barang tidak boleh dijual semula.", t: "6.3.6" },
    { d: "Diskriminasi harga <b>darjah pertama</b>", b: "Harga berbeza bagi setiap unit pada harga maksimum yang sanggup dibayar; lebihan pengguna hilang sepenuhnya.", t: "6.3.6" },
    { d: "Diskriminasi harga <b>darjah ketiga</b>", b: "Harga berbeza bagi pasaran berbeza mengikut keanjalan permintaan; pasaran kurang anjal dikenakan harga lebih tinggi.", t: "6.3.6" },
    { d: "Monopoli berbanding PPS: harga, kuantiti dan kecekapan", b: "Monopoli: harga lebih tinggi, kuantiti lebih kecil, untung lebih normal, tidak cekap pengeluaran dan peruntukan (P > MC).", t: "6.3.7" },
    { d: "Kawalan harga monopoli oleh kerajaan", b: "Harga ditetapkan pada AR = AC: harga turun, keluaran naik, untung normal.", t: "6.3.8" },
    { d: "Empat ciri <b>PPB</b>", b: "Firma relatif banyak, barang boleh dibezakan, bebas keluar masuk (tidak semudah PPS), persaingan harga dan bukan harga.", t: "6.4.1" },
    { d: "Keluk DD firma PPB berbanding monopoli", b: "Lebih landai (lebih anjal) kerana banyak pengganti hampir.", t: "6.4.2" },
    { d: "Empat bentuk <b>persaingan bukan harga</b>", b: "Pengiklanan, galakan jualan, perkhidmatan selepas jualan dan penjenamaan.", t: "6.4.5" },
    { d: "Ciri utama <b>oligopoli</b> (cadangan)", b: "Beberapa firma besar yang saling bergantung, halangan kemasukan tinggi, persaingan bukan harga dan harga cenderung tegar.", t: "6.5" }
  ],
  kuiz: []
});
