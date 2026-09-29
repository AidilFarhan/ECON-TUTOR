/* =========================================================
   Matrikulasi · AE015 Mikroekonomi · Bab 5 · Teori Pengeluaran dan Kos
   Sumber: slaid kuliah AE015 "Bab 5.1 Teori Pengeluaran" (31 slaid)
           dan "Bab 5.2 Teori Kos" (52 slaid)
   ========================================================= */
EKO.daftarBab({
  id: "m1-b5",
  peringkat: "matrik",
  tingkatan: 1,
  no: 5,
  tajuk: "Teori Pengeluaran dan Kos",
  warna: "var(--bab-rm50)",
  ringkas:
    "Pengeluaran menukar input kepada output. Bab ini merangkumi konsep loji, firma dan industri, fungsi pengeluaran satu input berubah, TP, AP dan MP, hukum pulangan berkurangan dan tahap pengeluaran, konsep kos, struktur kos jangka pendek, kos purata jangka panjang serta ekonomi dan tak ekonomi bidangan.",
  seksyen: [
    {
      no: "5.1.1(a)",
      tajuk: "Konsep Asas Pengeluaran",
      soalan: ["Apakah maksud pengeluaran?", "Apakah beza loji, firma dan industri?", "Apakah beza jangka pendek dan jangka panjang?"],
      html: `
<div class="kotak def"><span class="kotak-label">Pengeluaran</span><p>Satu proses menukar faktor pengeluaran (<b>input</b>) kepada barang dan perkhidmatan (<b>output</b>). Tiga komponennya: input, unit pengeluaran dan output.</p></div>
<div class="grid-3">
  <div class="kad-mini"><b>Loji</b><p>Alat fizikal yang digunakan dalam pengeluaran: bangunan pejabat dan kilang, mesin dan peralatan, alat pengangkutan.</p></div>
  <div class="kad-mini"><b>Firma</b><p>Unit ekonomi yang menggunakan faktor pengeluaran untuk menghasilkan barang atau perkhidmatan, dengan tujuan memaksimumkan keuntungan.</p></div>
  <div class="kad-mini"><b>Industri</b><p>Sekumpulan firma yang mengeluarkan barang yang sama atau hampir sama. Contoh: industri kereta (Proton, Honda, Toyota, Hyundai).</p></div>
</div>
<div class="jadual"><table><caption>Jangka masa pengeluaran</caption>
<thead><tr><th>Jangka pendek</th><th>Jangka panjang</th></tr></thead>
<tbody>
<tr><td>Firma tidak dapat menyesuaikan tingkat keluaran sepenuhnya mengikut kehendak pasaran</td><td>Firma dapat menyelaras tingkat keluaran mengikut kehendak pasaran</td></tr>
<tr><td>Ada faktor tetap dan faktor berubah</td><td>Semua faktor ialah faktor berubah</td></tr>
<tr><td>Wujud kos tetap dan kos berubah</td><td>Hanya kos berubah</td></tr>
</tbody></table></div>
`
    },
    {
      no: "5.1.1(b)",
      tajuk: "Fungsi Pengeluaran Satu Input Berubah",
      soalan: ["Apakah andaian fungsi pengeluaran satu input berubah?", "Bagaimanakah TP, AP dan MP dikira dan berkait?"],
      html: `
<div class="kotak def"><span class="kotak-label">Definisi</span><p>Fungsi yang menunjukkan <b>output maksimum</b> yang dapat dihasilkan oleh pelbagai kombinasi satu input berubah dengan input tetap pada satu tingkat teknologi tertentu: <b>Qx = f(K, L)</b>.</p></div>
<div class="kotak info"><span class="kotak-label">Andaian</span><p>(1) Hanya dua faktor: faktor berubah (buruh, L) dan faktor tetap (modal, K). (2) Semua buruh homogen. (3) Tingkat teknologi tetap.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Input tetap</b><p>Tidak dapat diubah kuantiti atau saiznya dalam jangka pendek. Contoh: tanah.</p></div>
  <div class="kad-mini"><b>Input berubah</b><p>Boleh diubah kuantitinya selaras dengan tingkat keluaran. Contoh: buruh tidak mahir.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">AP = TP ÷ L &nbsp;&nbsp; MP = ΔTP ÷ ΔL</div><p>Contoh: buruh ke-3, TP = 50 unit, maka AP = 50 ÷ 3 = 16.67 unit seorang. Buruh bertambah 2 → 3 orang, TP naik 25 → 50 unit, maka MP = (50 − 25) ÷ (3 − 2) = 25 unit.</p></div>
<div class="jadual"><table><caption>Hubung kait TP, AP dan MP</caption>
<thead><tr><th>Kombinasi</th><th class="n">Buruh</th><th class="n">TP</th><th class="n">AP</th><th class="n">MP</th></tr></thead>
<tbody>
<tr><td>A</td><td class="n">0</td><td class="n">0</td><td class="n">–</td><td class="n">–</td></tr>
<tr><td>B</td><td class="n">1</td><td class="n">10</td><td class="n">10.00</td><td class="n">10</td></tr>
<tr><td>C</td><td class="n">2</td><td class="n">25</td><td class="n">12.50</td><td class="n">15</td></tr>
<tr><td>D</td><td class="n">3</td><td class="n">50</td><td class="n">16.67</td><td class="n">25</td></tr>
<tr><td>E</td><td class="n">4</td><td class="n">70</td><td class="n">17.50</td><td class="n">20</td></tr>
<tr><td>F</td><td class="n">5</td><td class="n">73</td><td class="n">14.60</td><td class="n">3</td></tr>
<tr><td>G</td><td class="n">6</td><td class="n">74</td><td class="n">12.33</td><td class="n">1</td></tr>
<tr><td>H</td><td class="n">7</td><td class="n">73</td><td class="n">10.43</td><td class="n">−1</td></tr>
<tr><td>I</td><td class="n">8</td><td class="n">70</td><td class="n">8.75</td><td class="n">−3</td></tr>
</tbody></table></div>
<figure data-graf="carta-jadual" data-opt='{"tajuk":"TP, AP, MP dan tahap pengeluaran (jadual modul)","namaX":"Buruh","unitX":"orang","dpX":0,"dp":2,"nilaiX":[0,1,2,3,4,5,6,7,8],"xAwal":3,"notaLalai":"","nota":{"0":"Tanpa buruh, tiada keluaran.","1":"&lt;b&gt;Tahap I&lt;/b&gt;: TP bertambah dengan kadar semakin cepat; AP dan MP meningkat.","2":"&lt;b&gt;Tahap I&lt;/b&gt;: MP (15) sedang meningkat.","3":"&lt;b&gt;Tahap I&lt;/b&gt;: MP maksimum 25 unit. Input berubah masih terlalu sedikit berbanding input tetap: pembaziran input tetap.","4":"&lt;b&gt;AP maksimum&lt;/b&gt; 17.50 unit. MP mula lebih kecil daripada AP selepas titik ini; Tahap II bermula.","5":"&lt;b&gt;Tahap II&lt;/b&gt; (rasional): TP bertambah dengan kadar berkurangan, AP dan MP menurun tetapi positif.","6":"&lt;b&gt;TP maksimum&lt;/b&gt; 74 unit. MP hampir sifar; akhir Tahap II.","7":"&lt;b&gt;Tahap III&lt;/b&gt;: MP negatif (−1), TP menurun. Pembaziran input berubah.","8":"&lt;b&gt;Tahap III&lt;/b&gt;: MP = −3, TP turun ke 70 unit."},"panel":[{"labelX":"Buruh (orang)","labelY":"Jumlah keluaran, TP (unit)","x":[0,8.8],"y":[0,90],"tikX":[0,1,2,3,4,5,6,7,8],"tikY":[0,20,40,60,80],"zon":[{"dari":0,"ke":4,"kelas":"z1","label":"I"},{"dari":4,"ke":6,"kelas":"z2","label":"II"},{"dari":6,"ke":8.8,"kelas":"z3","label":"III"}],"siri":[{"id":"tp","nama":"TP","label":"TP","kelas":"d","unit":"unit","dp":0,"data":[[0,0],[1,10],[2,25],[3,50],[4,70],[5,73],[6,74],[7,73],[8,70]]}]},{"labelX":"Buruh (orang)","labelY":"AP dan MP (unit)","x":[0,8.8],"y":[-5,30],"tikX":[0,1,2,3,4,5,6,7,8],"tikY":[-5,0,5,10,15,20,25,30],"asalan":false,"paksiXBawah":true,"zon":[{"dari":0,"ke":4,"kelas":"z1","label":"I"},{"dari":4,"ke":6,"kelas":"z2","label":"II"},{"dari":6,"ke":8.8,"kelas":"z3","label":"III"}],"siri":[{"id":"ap","nama":"AP","label":"AP","kelas":"c3","unit":"unit","data":[[1,10],[2,12.5],[3,16.67],[4,17.5],[5,14.6],[6,12.33],[7,10.43],[8,8.75]]},{"id":"mp","nama":"MP","label":"MP","kelas":"s","unit":"unit","dp":0,"data":[[1,10],[2,15],[3,25],[4,20],[5,3],[6,1],[7,-1],[8,-3]]}]}]}'></figure>
<div class="grid-3">
  <div class="kad-mini"><b>Keluk TP</b><p>Mula-mula bertambah dengan kadar bertambah, kemudian dengan kadar berkurangan sehingga maksimum (buruh ke-6), lalu menurun.</p></div>
  <div class="kad-mini"><b>Keluk AP</b><p>Meningkat hingga maksimum, kemudian menurun tetapi kekal positif.</p></div>
  <div class="kad-mini"><b>Keluk MP</b><p>Meningkat hingga maksimum, kemudian menurun dan memotong AP pada titik maksimum AP, seterusnya sifar dan negatif.</p></div>
</div>
`
    },
    {
      no: "5.1.1(c)",
      tajuk: "Hukum Pulangan Berkurangan dan Tahap Pengeluaran",
      soalan: ["Apakah hukum pulangan berkurangan?", "Apakah ciri tiga tahap pengeluaran dan tahap manakah yang rasional?"],
      html: `
<div class="kotak def"><span class="kotak-label">Hukum pulangan berkurangan</span><p>Dengan teknologi tidak berubah, penambahan input berubah secara berterusan kepada input tetap menyebabkan TP mula-mula bertambah dengan kadar bertambah, kemudian bertambah dengan kadar berkurangan, dan akhirnya berkurang.</p></div>
<div class="grid-3">
  <div class="kad-mini"><b>Pulangan sut bertambah</b><p>Tambahan keluaran semakin besar bagi setiap input berubah tambahan; keluk MP naik ke maksimum.</p></div>
  <div class="kad-mini"><b>Pulangan sut berkurangan</b><p>Tambahan keluaran semakin kecil; TP bertambah dengan kadar berkurangan dan MP menurun ke sifar.</p></div>
  <div class="kad-mini"><b>Pulangan sut negatif</b><p>Input tambahan mengurangkan keluaran; MP negatif dan TP menurun.</p></div>
</div>
<div class="jadual"><table><caption>Tiga tahap pengeluaran</caption>
<thead><tr><th>Tahap</th><th>Ciri</th><th>Rasional?</th></tr></thead>
<tbody>
<tr><td><b>Tahap I</b></td><td>TP meningkat; AP meningkat hingga maksimum; MP naik ke maksimum kemudian turun dan memotong AP pada AP maksimum</td><td>Tidak: input berubah terlalu sedikit berbanding input tetap, maka input tetap dibazirkan</td></tr>
<tr><td><b>Tahap II</b></td><td>TP meningkat hingga maksimum; AP menurun tetapi positif; MP menurun hingga sifar</td><td><b>Ya</b>: MP menurun tetapi masih positif; gabungan input tetap dan input berubah paling cekap</td></tr>
<tr><td><b>Tahap III</b></td><td>TP menurun; AP terus menurun tetapi positif; MP negatif</td><td>Tidak: mengurangkan input berubah boleh menambah keluaran; input berubah dibazirkan</td></tr>
</tbody></table></div>
`
    },
    {
      no: "5.2.1(a)",
      tajuk: "Konsep Kos Pengeluaran",
      soalan: ["Apakah beza kos eksplisit, kos implisit dan kos sosial?", "Bagaimanakah kos eksplisit dan implisit dikira?"],
      html: `
<div class="kotak def"><span class="kotak-label">Kos pengeluaran</span><p>Jumlah perbelanjaan yang ditanggung firma untuk memperoleh input yang digunakan dalam proses pengeluaran barang dan perkhidmatan.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Kos lepas</b><p>Pilihan kedua terbaik yang dilepaskan bagi memperoleh pilihan terbaik.</p></div>
  <div class="kad-mini"><b>Kos implisit (kos tersembunyi)</b><p>Kos apabila firma menggunakan input milik sendiri; nilainya sama dengan kos lepas. Contoh: gaji yang dilepaskan pengusaha jika dia bekerja dengan orang lain, atau sewa yang dilepaskan jika premis sendiri disewakan.</p></div>
  <div class="kad-mini"><b>Kos eksplisit (kos nyata)</b><p>Perbelanjaan tunai sebenar untuk membeli input. Contoh: upah pekerja, kos bahan mentah.</p></div>
  <div class="kad-mini"><b>Kos sosial</b><p>Kos yang ditanggung seluruh masyarakat akibat eksternaliti negatif kegiatan firma. Contoh: pencemaran alam sekitar.</p></div>
</div>
<div class="kotak contoh"><span class="kotak-label">Contoh: perniagaan Justin</span>
<p>Justin bergaji RM30 000 setahun meninggalkan kerjanya untuk memulakan perniagaan dengan modal sendiri RM50 000 (kadar bunga 7%). Bangunan miliknya yang sebelum ini disewakan RM1 400 sebulan digunakan untuk perniagaan. Perbelanjaan tunai: iklan RM5 000, sewa mesin fotostat RM10 000, cukai RM5 000, upah pekerja RM40 000, bekalan RM5 000.</p>
<div class="kira">
  <div class="baris">Kos eksplisit = 5 000 + 10 000 + 5 000 + 40 000 + 5 000 = RM65 000</div>
  <div class="baris">Kos implisit: gaji dilepaskan RM30 000; bunga dilepaskan 7% × RM50 000 = RM3 500; sewa premis dilepaskan RM1 400 × 12 = RM16 800</div>
  <div class="baris">Jumlah kos implisit = 30 000 + 3 500 + 16 800 = RM50 300</div>
  <div class="baris jawapan">Jumlah kos (eksplisit + implisit) = RM115 300</div></div></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 9 menulis kos lepas premis sebagai RM18 000. Sewa RM1 400 sebulan untuk 12 bulan ialah <b>RM16 800</b>. Jumlah kos implisit dan jumlah kos di atas menggunakan nilai yang telah dibetulkan.</p></div>
`
    },
    {
      no: "5.2.1(b)–(d)",
      tajuk: "Kos Pengeluaran Jangka Pendek",
      soalan: ["Bagaimanakah TC, TFC, TVC, AFC, AVC, AC dan MC dikira?", "Mengapakah keluk AVC, AC dan MC berbentuk U?", "Apakah hubungan MC dengan AVC dan AC?"],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Kos tetap (TFC)</span><p>Perbelanjaan atas input tetap; tidak bergantung pada tingkat keluaran dan tetap ditanggung walaupun keluaran sifar. Contoh: sewa kilang.</p></div>
  <div class="kotak def"><span class="kotak-label">Kos berubah (TVC)</span><p>Perbelanjaan atas input berubah; berubah mengikut tingkat keluaran dan sifar jika tiada keluaran. Contoh: kos buruh.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Rumus kos jangka pendek</span><div class="rumus-baris">TC = TFC + TVC</div><div class="rumus-baris">AFC = TFC/Q &nbsp; AVC = TVC/Q &nbsp; AC = TC/Q = AFC + AVC</div><div class="rumus-baris">MC = ΔTC/ΔQ</div></div>
<div class="jadual"><table><caption>Jadual kos pengeluaran jangka pendek (RM)</caption>
<thead><tr><th class="n">Q</th><th class="n">TFC</th><th class="n">TVC</th><th class="n">TC</th><th class="n">AFC</th><th class="n">AVC</th><th class="n">AC</th><th class="n">MC</th></tr></thead>
<tbody>
<tr><td class="n">0</td><td class="n">20</td><td class="n">0</td><td class="n">20</td><td class="n">–</td><td class="n">–</td><td class="n">–</td><td class="n">–</td></tr>
<tr><td class="n">1</td><td class="n">20</td><td class="n">17</td><td class="n">37</td><td class="n">20.0</td><td class="n">17.0</td><td class="n">37.0</td><td class="n">17</td></tr>
<tr><td class="n">2</td><td class="n">20</td><td class="n">24</td><td class="n">44</td><td class="n">10.0</td><td class="n">12.0</td><td class="n">22.0</td><td class="n">7</td></tr>
<tr><td class="n">3</td><td class="n">20</td><td class="n">29</td><td class="n">49</td><td class="n">6.7</td><td class="n">9.7</td><td class="n">16.3</td><td class="n">5</td></tr>
<tr><td class="n">4</td><td class="n">20</td><td class="n">31</td><td class="n">51</td><td class="n">5.0</td><td class="n">7.8</td><td class="n">12.8</td><td class="n">2</td></tr>
<tr><td class="n">5</td><td class="n">20</td><td class="n">34</td><td class="n">54</td><td class="n">4.0</td><td class="n">6.8</td><td class="n">10.8</td><td class="n">3</td></tr>
<tr><td class="n">6</td><td class="n">20</td><td class="n">43</td><td class="n">63</td><td class="n">3.3</td><td class="n">7.2</td><td class="n">10.5</td><td class="n">9</td></tr>
<tr><td class="n">7</td><td class="n">20</td><td class="n">65</td><td class="n">85</td><td class="n">2.9</td><td class="n">9.3</td><td class="n">12.2</td><td class="n">22</td></tr>
<tr><td class="n">8</td><td class="n">20</td><td class="n">88</td><td class="n">108</td><td class="n">2.5</td><td class="n">11.0</td><td class="n">13.5</td><td class="n">23</td></tr>
<tr><td class="n">9</td><td class="n">20</td><td class="n">113</td><td class="n">133</td><td class="n">2.2</td><td class="n">12.6</td><td class="n">14.8</td><td class="n">25</td></tr>
</tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Jadual slaid 14 memberi MC = 18 pada Q = 7. Pengiraan: MC = 85 − 63 = <b>RM22</b>. Jadual di atas telah dibetulkan.</p></div>
<figure data-graf="carta-jadual" data-opt='{"tajuk":"Keluk kos jangka pendek (jadual modul)","namaX":"Keluaran","unitX":"unit","dpX":0,"dp":1,"nilaiX":[0,1,2,3,4,5,6,7,8,9],"xAwal":5,"notaLalai":"","nota":{"0":"Keluaran sifar: TC = TFC = RM20, TVC = 0.","4":"MC minimum (RM2): selepas ini MC naik kerana hukum pulangan berkurangan.","5":"AVC minimum (RM6.8): MC &lt; AVC sebelum ini, dan MC &gt; AVC selepas ini.","6":"AC minimum (RM10.5): MC memotong AC berhampiran titik minimumnya.","7":"MC melebihi AVC dan AC, maka kedua-duanya meningkat."},"panel":[{"labelX":"Keluaran (unit)","labelY":"Jumlah kos (RM)","x":[0,9.8],"y":[0,150],"tikX":[0,1,2,3,4,5,6,7,8,9],"tikY":[0,25,50,75,100,125,150],"siri":[{"id":"tc","nama":"TC","label":"TC","kelas":"c5","rm":true,"dp":0,"data":[[0,20],[1,37],[2,44],[3,49],[4,51],[5,54],[6,63],[7,85],[8,108],[9,133]]},{"id":"tvc","nama":"TVC","label":"TVC","kelas":"s","rm":true,"dp":0,"data":[[0,0],[1,17],[2,24],[3,29],[4,31],[5,34],[6,43],[7,65],[8,88],[9,113]]},{"id":"tfc","nama":"TFC","label":"TFC","kelas":"c6","rm":true,"dp":0,"licin":false,"titik":false,"data":[[0,20],[1,20],[2,20],[3,20],[4,20],[5,20],[6,20],[7,20],[8,20],[9,20]]}]},{"labelX":"Keluaran (unit)","labelY":"Kos purata dan kos sut (RM)","x":[0,9.8],"y":[0,40],"tikX":[0,1,2,3,4,5,6,7,8,9],"tikY":[0,10,20,30,40],"siri":[{"id":"ac","nama":"AC","label":"AC","kelas":"d","rm":true,"data":[[1,37],[2,22],[3,16.3],[4,12.8],[5,10.8],[6,10.5],[7,12.2],[8,13.5],[9,14.8]]},{"id":"avc","nama":"AVC","label":"AVC","kelas":"c3","rm":true,"data":[[1,17],[2,12],[3,9.7],[4,7.8],[5,6.8],[6,7.2],[7,9.3],[8,11],[9,12.6]]},{"id":"afc","nama":"AFC","label":"AFC","kelas":"c6","rm":true,"data":[[1,20],[2,10],[3,6.7],[4,5],[5,4],[6,3.3],[7,2.9],[8,2.5],[9,2.2]]},{"id":"mc","nama":"MC","label":"MC","kelas":"c4","rm":true,"dp":0,"data":[[1,17],[2,7],[3,5],[4,2],[5,3],[6,9],[7,22],[8,23],[9,25]]}]}]}'></figure>
<div class="grid-2">
  <div class="kad-mini"><b>Keluk TFC, TVC dan TC</b><p>TFC mendatar (RM20 pada setiap keluaran). TVC bermula dari asalan; mula-mula bertambah dengan kadar berkurang (pulangan bertambah), kemudian dengan kadar meningkat (pulangan berkurang). TC = TFC + TVC, bermula pada RM20.</p></div>
  <div class="kad-mini"><b>Keluk AFC</b><p>AFC = TFC/Q sentiasa menurun apabila keluaran bertambah, tetapi sentiasa positif.</p></div>
</div>
<div class="kotak fokus"><span class="kotak-label">Mengapa AC berbentuk U?</span><p>Mula-mula AC menurun kerana AVC menurun (pulangan bertambah) dan AFC semakin kecil. Selepas AVC minimum, AC masih menurun seketika kerana kejatuhan AFC melebihi kenaikan AVC. Selepas AC minimum, AC naik kerana kenaikan AVC melebihi kejatuhan AFC. Jarak menegak antara AC dan AVC ialah AFC; AVC mencapai minimum lebih awal daripada AC.</p></div>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Hubungan MC dan AVC</span><p>MC &lt; AVC: AVC sedang menurun. MC = AVC: pada AVC minimum. MC &gt; AVC: AVC sedang meningkat.</p></div>
  <div class="kotak rumus"><span class="kotak-label">Hubungan MC dan AC</span><p>MC &lt; AC: AC sedang menurun. MC = AC: pada AC minimum. MC &gt; AC: AC sedang meningkat.</p></div>
</div>
`
    },
    {
      no: "5.2.1(e)",
      tajuk: "Kos Pengeluaran Jangka Panjang",
      soalan: ["Mengapakah LRAC disebut keluk sampul?", "Bagaimanakah SAC menyentuh LRAC semasa LRAC menurun, minimum dan meningkat?"],
      html: `
<div class="kotak def"><span class="kotak-label">Jangka panjang</span><p>Firma mempunyai masa yang cukup untuk mengubah <b>semua</b> faktor pengeluaran. Semua input berubah, maka hanya ada kos berubah. Jangka panjang juga dikenali sebagai <b>jangka masa perancangan</b> kerana firma boleh memilih saiz loji yang meminimumkan kos.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Tiga saiz loji</b><p>Setiap keluk SAC mewakili satu saiz loji. Pada setiap tingkat keluaran, firma memilih loji yang memberi AC paling rendah. LAC terbentuk daripada bahagian setiap SAC yang paling rendah (garis abc). Pada titik persilangan dua SAC, firma boleh memilih mana-mana loji kerana AC sama.</p></div>
  <div class="kad-mini"><b>Banyak saiz loji</b><p>Dalam keadaan sebenar terdapat banyak saiz loji. LRAC ialah keluk licin berbentuk U yang menyambungkan titik kos seunit terendah setiap SAC, dan dikenali sebagai <b>keluk sampul</b>.</p></div>
</div>
<figure data-graf="lrac"></figure>
<div class="jadual"><table><caption>Hubungan SAC dengan LRAC</caption>
<thead><tr><th>Keadaan LRAC</th><th>Titik sentuhan SAC</th></tr></thead>
<tbody>
<tr><td>LRAC sedang menurun</td><td>SAC menyentuh LRAC pada bahagian SAC yang <b>menurun</b></td></tr>
<tr><td>LRAC minimum</td><td>SAC menyentuh LRAC pada titik <b>minimum</b> SAC</td></tr>
<tr><td>LRAC sedang meningkat</td><td>SAC menyentuh LRAC pada bahagian SAC yang <b>meningkat</b></td></tr>
</tbody></table></div>
<div class="kotak tip"><span class="kotak-label">Punca bentuk U</span><p>SAC berbentuk U kerana <b>hukum pulangan berkurangan</b>. LRAC berbentuk U kerana <b>ekonomi bidangan dalaman</b> (bahagian menurun) dan <b>tak ekonomi bidangan dalaman</b> (bahagian meningkat).</p></div>
`
    },
    {
      no: "5.2.2",
      tajuk: "Ekonomi Bidangan dan Tak Ekonomi Bidangan",
      soalan: ["Apakah punca ekonomi dan tak ekonomi bidangan dalaman dan luaran?", "Bagaimanakah kesannya ditunjukkan pada keluk LRAC?"],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Ekonomi bidangan</span><p>Faedah yang dinikmati firma apabila firma mengembangkan skala pengeluaran (<b>dalaman</b>) atau apabila industri berkembang secara keseluruhan (<b>luaran</b>), sehingga kos purata firma jatuh.</p></div>
  <div class="kotak def"><span class="kotak-label">Tak ekonomi bidangan</span><p>Kemerosotan kecekapan yang menaikkan kos purata firma akibat pembesaran skala firma itu sendiri (<b>dalaman</b>) atau perkembangan industri (<b>luaran</b>).</p></div>
</div>
<div class="jadual"><table><caption>Punca ekonomi dan tak ekonomi bidangan dalaman</caption>
<thead><tr><th>Jenis</th><th>Ekonomi bidangan dalaman</th><th>Tak ekonomi bidangan dalaman</th></tr></thead>
<tbody>
<tr><td>Pengkhususan</td><td>Pembahagian kerja meningkatkan kecekapan dan daya pengeluaran pekerja</td><td>Kerja berulang menjemukan pekerja; kepuasan dan prestasi kerja merosot</td></tr>
<tr><td>Pengurusan</td><td>Bilangan pengurus sama boleh mengendalikan kerja yang bertambah; kos pengurus seunit berkurang</td><td>Kakitangan terlalu ramai; kawalan tidak cekap dan kualiti terjejas</td></tr>
<tr><td>Kewangan</td><td>Pinjaman bank lebih mudah dengan kadar bunga rendah dan tempoh panjang</td><td>–</td></tr>
<tr><td>Pemasaran</td><td>Membeli bahan mentah secara pukal dengan harga murah; kos iklan seunit lebih rendah</td><td>Penyelarasan antara jabatan tidak cekap, pemasaran terjejas</td></tr>
<tr><td>Teknikal</td><td>Mesin digunakan secara optimum; mampu membeli mesin canggih yang menjimatkan kos</td><td>Mesin rosak atau haus apabila digunakan berterusan; kos pembaikan dan penggantian</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kad-mini"><b>Punca ekonomi bidangan luaran</b><p>Pembangunan tenaga buruh mahir di kawasan perindustrian; perubahan teknologi dalam industri; kemajuan infrastruktur hasil pemusatan firma; bekalan input dan modal yang murah; maklumat dan pameran perdagangan pada kos rendah.</p></div>
  <div class="kad-mini"><b>Punca tak ekonomi bidangan luaran</b><p>Kekurangan faktor pengeluaran (bahan mentah, tempat tinggal pekerja); kos sosial seperti kesesakan, pencemaran dan masalah sosial.</p></div>
</div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Dalaman: pergerakan di sepanjang LRAC</span><p>Ekonomi bidangan dalaman ditunjukkan oleh bahagian LRAC yang menurun; tak ekonomi bidangan dalaman oleh bahagian yang meningkat.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Luaran: peralihan LRAC</span><p>Ekonomi bidangan luaran mengalihkan LRAC ke <b>bawah</b> (LAC₁ ke LAC₂); tak ekonomi bidangan luaran mengalihkan LRAC ke <b>atas</b> (LAC₁ ke LAC₃).</p></div>
</div>
`
    }
  ],
  kad: [
    { d: "Maksud <b>pengeluaran</b>", b: "Proses menukar faktor pengeluaran (input) kepada barang dan perkhidmatan (output).", t: "5.1.1" },
    { d: "Beza <b>firma</b> dan <b>industri</b>", b: "Firma: unit yang menggunakan faktor untuk menghasilkan output. Industri: sekumpulan firma yang mengeluarkan barang yang sama atau hampir sama.", t: "5.1.1" },
    { d: "Beza jangka pendek dan jangka panjang (pengeluaran)", b: "Jangka pendek: ada faktor tetap dan berubah. Jangka panjang: semua faktor berubah, hanya kos berubah.", t: "5.1.1" },
    { d: "Tiga andaian fungsi pengeluaran satu input berubah", b: "Dua faktor sahaja (buruh berubah, modal tetap); buruh homogen; teknologi tetap.", t: "5.1.1" },
    { d: "Rumus <b>AP</b> dan <b>MP</b>", b: "AP = TP ÷ L. MP = ΔTP ÷ ΔL.", t: "5.1.1" },
    { d: "MP buruh ke-3 (TP 25 → 50)", b: "25 unit.", t: "5.1.1" },
    { d: "Di manakah MP memotong AP?", b: "Pada titik maksimum AP.", t: "5.1.1" },
    { d: "<b>Hukum pulangan berkurangan</b>", b: "Tambahan input berubah secara berterusan kepada input tetap menyebabkan TP bertambah dengan kadar bertambah, kemudian berkurangan, dan akhirnya TP berkurang.", t: "5.1.1" },
    { d: "Mengapa <b>Tahap II</b> rasional?", b: "MP menurun tetapi masih positif; gabungan input tetap dan input berubah paling cekap dan TP masih bertambah.", t: "5.1.1" },
    { d: "Mengapa Tahap I dan Tahap III tidak rasional?", b: "Tahap I: pembaziran input tetap. Tahap III: MP negatif, pembaziran input berubah.", t: "5.1.1" },
    { d: "Beza <b>kos eksplisit</b> dan <b>kos implisit</b>", b: "Eksplisit: bayaran tunai sebenar untuk input. Implisit: kos lepas penggunaan input milik sendiri.", t: "5.2.1" },
    { d: "Kos implisit Justin", b: "Gaji RM30 000 + bunga 7% × RM50 000 = RM3 500 + sewa RM1 400 × 12 = RM16 800. Jumlah RM50 300.", t: "5.2.1" },
    { d: "Maksud <b>kos sosial</b>", b: "Kos yang ditanggung masyarakat akibat eksternaliti negatif firma, contohnya pencemaran.", t: "5.2.1" },
    { d: "Rumus <b>MC</b> dan <b>AC</b>", b: "MC = ΔTC ÷ ΔQ. AC = TC ÷ Q = AFC + AVC.", t: "5.2.1" },
    { d: "Mengapa keluk AFC sentiasa menurun?", b: "TFC tetap dibahagikan dengan keluaran yang semakin besar; AFC semakin kecil tetapi sentiasa positif.", t: "5.2.1" },
    { d: "Hubungan MC dengan AC", b: "MC < AC: AC menurun. MC = AC: AC minimum. MC > AC: AC meningkat.", t: "5.2.1" },
    { d: "Mengapa SAC berbentuk U?", b: "Hukum pulangan berkurangan.", t: "5.2.1" },
    { d: "Mengapa LRAC berbentuk U?", b: "Ekonomi bidangan dalaman (menurun) dan tak ekonomi bidangan dalaman (meningkat).", t: "5.2.1" },
    { d: "Titik sentuhan SAC apabila LRAC sedang <b>menurun</b>", b: "Pada bahagian SAC yang sedang menurun.", t: "5.2.1" },
    { d: "Lima punca <b>ekonomi bidangan dalaman</b>", b: "Pengkhususan, pengurusan, kewangan, pemasaran dan teknikal.", t: "5.2.2" },
    { d: "Kesan ekonomi bidangan <b>luaran</b> pada LRAC", b: "LRAC beralih ke bawah. Tak ekonomi bidangan luaran mengalihkannya ke atas.", t: "5.2.2" }
  ],
  kuiz: []
});
