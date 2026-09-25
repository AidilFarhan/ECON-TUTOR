/* =========================================================
   Tingkatan 4 · Bab 2 · Pasaran
   Sumber: Buku Teks Ekonomi Tingkatan 4 (KSSM)
   ========================================================= */
EKO.daftarBab({
  id: "t4-b2",
  tingkatan: 4,
  no: 2,
  tajuk: "Pasaran",
  warna: "var(--bab-rm5)",
  ringkas:
    "Pasaran ialah interaksi antara permintaan pengguna dengan penawaran pengeluar. Harga memainkan peranan penting dalam menentukan kuantiti diminta dan ditawarkan, di samping penentu lain. Bab ini turut membincangkan keanjalan harga permintaan dan penawaran serta kepentingannya.",
  seksyen: [
    {
      no: "2.1",
      tajuk: "Keseimbangan Pasaran",
      soalan: [
        "Apakah yang dijelaskan oleh hukum permintaan dan hukum penawaran?",
        "Bagaimanakah keluk permintaan atau penawaran individu dan pasaran dibentuk?",
        "Apakah faktor yang mempengaruhi permintaan dan penawaran sesuatu barang?",
        "Apakah beza pengembangan permintaan dengan pertambahan permintaan?",
        "Bilakah pasaran mencapai keseimbangan, dan apa berlaku apabila permintaan atau penawaran berubah?"
      ],
      html: `
<div class="kotak contoh"><span class="kotak-label">Sepintas lalu</span><p>Turun naik harga ialah norma pasaran. Apabila permintaan melebihi penawaran, harga naik; apabila penawaran melebihi permintaan, harga jatuh. Adam Smith menyifatkan sistem harga sebagai <b>tangan tak nampak</b> (<i>invisible hand</i>) yang mengatasi masalah lebihan atau kurangan sehingga pasaran mencapai keseimbangan.</p></div>

<h3><span class="no">2.1.1</span> Hukum Permintaan</h3>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Permintaan</b> merujuk kepada keinginan dan kemampuan seseorang individu untuk membeli sesuatu barang atau perkhidmatan pada suatu tingkat harga tertentu dan dalam jangka masa tertentu.</p></div>
<p>Keinginan sahaja tidak cukup. <span class="istilah">Permintaan berkesan</span> ialah permintaan yang disokong oleh kuasa beli atau kemampuan membayar. Jika seseorang ingin membeli rumah tetapi tidak mampu, permintaan berkesan tidak wujud.</p>
<div class="kotak contoh"><span class="kotak-label">Contoh</span><p>Pada hari pertama Pesta Buku Antarabangsa Kuala Lumpur, Puan Norita membeli 3 buah buku cerita pada harga RM12.00 sebuah. Pada hari terakhir, harga jatuh kepada RM7.00 dan dia membeli 5 buah.</p></div>
<div class="kotak def"><span class="kotak-label">Hukum permintaan</span><p>Semakin tinggi harga sesuatu barang, semakin kurang kuantiti diminta terhadap barang tersebut dan sebaliknya, semakin rendah harga, semakin banyak kuantiti diminta, dengan andaian <i>ceteris paribus</i>.</p></div>
<p><b><i>Ceteris paribus</i></b> bermaksud faktor lain tidak berubah. Hubungan antara harga dengan kuantiti diminta adalah <b>negatif (songsang)</b>: harga naik → kuantiti diminta turun; harga turun → kuantiti diminta naik.</p>

<h3><span class="no">2.1.2</span> Keluk Permintaan Individu dan Pasaran</h3>
<p><span class="istilah">Permintaan individu</span> ialah kuantiti sesuatu barang yang diminta oleh seseorang individu pada suatu tingkat harga dalam jangka masa tertentu. Hubungan negatif harga dan kuantiti digambarkan melalui <b>jadual permintaan</b> dan <b>keluk permintaan</b>.</p>
<div class="jadual"><table><caption>Jadual 2.1 Permintaan Han Boon terhadap buah durian (sebulan)</caption>
<thead><tr><th>Titik</th><th class="n">Harga (RM/kg)</th><th class="n">Kuantiti diminta (kg)</th></tr></thead>
<tbody><tr><td>a</td><td class="n">5</td><td class="n">4</td></tr><tr><td>b</td><td class="n">4</td><td class="n">6</td></tr><tr><td>c</td><td class="n">3</td><td class="n">8</td></tr><tr><td>d</td><td class="n">2</td><td class="n">10</td></tr></tbody></table></div>
<figure data-graf="permintaan"></figure>
<p>Keluk permintaan (DD) dibentuk dengan menyambungkan titik a, b, c dan d. Keluk permintaan <b>mencerun ke bawah dari kiri ke kanan</b>, menunjukkan hubungan negatif antara harga dan kuantiti diminta.</p>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Permintaan pasaran</b> ialah kuantiti sesuatu barang yang diminta oleh semua individu dalam pasaran pada suatu tingkat harga dalam jangka masa tertentu. Ia diperoleh dengan <b>menjumlahkan secara mendatar</b> kuantiti diminta setiap individu pada setiap tingkat harga.</p></div>
<div class="jadual"><table><caption>Jadual 2.2 Permintaan pasaran terhadap baju kemeja</caption>
<thead><tr><th class="n">Harga (RM)</th><th class="n">Rani (unit)</th><th class="n">Sofea (unit)</th><th class="n">Pasaran (unit)</th></tr></thead>
<tbody><tr><td class="n">50</td><td class="n">1</td><td class="n">2</td><td class="n">3</td></tr><tr><td class="n">40</td><td class="n">2</td><td class="n">3</td><td class="n">5</td></tr><tr><td class="n">30</td><td class="n">3</td><td class="n">4</td><td class="n">7</td></tr><tr><td class="n">20</td><td class="n">4</td><td class="n">5</td><td class="n">9</td></tr></tbody></table></div>
<figure data-graf="jumlah-pasaran" data-opt='{"jenis":"dd"}'></figure>
<p>Keluk permintaan individu lebih <b>curam</b>, manakala keluk permintaan pasaran lebih <b>landai</b> kerana ia terbentuk daripada jumlah mendatar kuantiti diminta semua individu.</p>

<h3><span class="no">2.1.3</span> Penentu Permintaan</h3>
<p>Penentu permintaan dibahagikan kepada <b>harga barang itu</b> dan <b>penentu bukan harga barang itu</b>.</p>
<h4>Harga barang itu</h4>
<p>Faktor utama. Apabila harga sayur naik dari P₀ ke P₁, kuantiti diminta turun dari Q₀ ke Q₁. Perubahan harga barang itu menyebabkan <b>pergerakan di sepanjang keluk permintaan yang sama</b>.</p>
<h4>Penentu bukan harga barang itu</h4>
<p>Walaupun harga tetap, permintaan boleh berubah. Contohnya harga minyak tetap tetapi permintaannya menurun kerana harga kereta naik. Penentu bukan harga menyebabkan keluk permintaan <b>beralih</b>.</p>
<div class="grid-2">
  <div class="kad-mini"><b>Harga barang lain</b><ul><li><b>Barang pengganti</b>: boleh diganti dengan mudah (daging dan ikan). Harga daging naik → permintaan ikan naik. Hubungan <b>positif</b>.</li><li><b>Barang penggenap</b>: digunakan bersama (mesin pencetak dan kartrij dakwat). Harga pencetak naik → permintaan kartrij turun. Hubungan <b>negatif</b>.</li></ul></div>
  <div class="kad-mini"><b>Cita rasa</b><p>Kegemaran pengguna terhadap sesuatu barang. Iklan, fesyen dan kesedaran kesihatan boleh mengubah cita rasa. Contoh: iklan Tahun Melawat Malaysia meningkatkan permintaan pakej pelancongan; gaya hidup sihat meningkatkan permintaan vitamin.</p></div>
  <div class="kad-mini"><b>Pendapatan</b><p>Pendapatan naik → pendapatan boleh guna dan kuasa beli naik → permintaan naik, keluk ke kanan. Nota: bagi barang mesti (garam) permintaan tetap; bagi barang bawahan (beras hancur) permintaan turun apabila pendapatan naik.</p></div>
  <div class="kad-mini"><b>Musim</b><p>Awal persekolahan, Hari Raya Aidilfitri, Tahun Baru Cina dan Deepavali meningkatkan permintaan. Cuaca panas meningkatkan permintaan air batu dan aiskrim; jerebu meningkatkan permintaan topeng muka.</p></div>
  <div class="kad-mini"><b>Jangkaan harga masa depan</b><p>Jika harga dijangka naik (contoh harga kereta), permintaan sekarang meningkat. Jika harga dijangka turun, permintaan sekarang berkurang.</p></div>
  <div class="kad-mini"><b>Dasar kerajaan</b><p>Kenaikan kadar cukai pendapatan individu mengurangkan pendapatan boleh guna, maka permintaan turun (keluk ke kiri). Bantuan seperti BR1M meningkatkan pendapatan boleh guna dan permintaan.</p></div>
</div>

<h3><span class="no">2.1.4</span> Perubahan dalam Kuantiti Diminta</h3>
<p><span class="istilah">Perubahan dalam kuantiti diminta</span> ialah pergerakan di sepanjang keluk permintaan yang sama akibat perubahan <b>harga barang itu</b>.</p>
<ul><li><b>Pengembangan permintaan</b>: pergerakan ke bawah di sepanjang keluk, kuantiti diminta naik kerana harga turun.</li><li><b>Penguncupan permintaan</b>: pergerakan ke atas di sepanjang keluk, kuantiti diminta turun kerana harga naik.</li></ul>

<h3><span class="no">2.1.5</span> Perubahan Permintaan</h3>
<p><span class="istilah">Perubahan permintaan</span> ditunjukkan oleh <b>peralihan keluk permintaan</b> ke kiri atau ke kanan selari dengan keluk asal, akibat perubahan penentu <b>bukan harga</b> barang itu.</p>
<ul><li><b>Pertambahan permintaan</b>: keluk beralih ke kanan (D₀D₀ ke D₁D₁). Pada harga yang sama, kuantiti diminta lebih banyak. Contoh: pendapatan pengguna naik.</li><li><b>Pengurangan permintaan</b>: keluk beralih ke kiri. Contoh: harga barang pengganti turun.</li></ul>
<figure data-graf="permintaan" data-opt='{"mod":"alih"}'></figure>
<div class="kotak tip"><span class="kotak-label">Jangan keliru</span><p><b>Pengembangan/penguncupan</b> = pergerakan di sepanjang keluk (sebab: harga barang itu). <b>Pertambahan/pengurangan</b> = peralihan keluk (sebab: faktor bukan harga). Istilah yang sama digunakan untuk penawaran.</p></div>

<h3><span class="no">2.1.6</span> Hukum Penawaran</h3>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Penawaran</b> merujuk kepada kuantiti sesuatu barang atau perkhidmatan yang sanggup dan mampu dikeluarkan oleh pengeluar atau firma pada suatu tingkat harga tertentu dalam tempoh masa tertentu.</p></div>
<div class="kotak contoh"><span class="kotak-label">Contoh</span><p>Apabila harga roti naik daripada RM1.70 kepada RM1.80 sebungkus, Syarikat Roti Liana menambah penawaran daripada 800 bungkus kepada 1 000 bungkus sehari kerana untung meningkat.</p></div>
<div class="kotak def"><span class="kotak-label">Hukum penawaran</span><p>Semakin tinggi harga sesuatu barang, semakin banyak kuantiti ditawarkan dan sebaliknya, semakin rendah harga, semakin kurang kuantiti ditawarkan, dengan andaian <i>ceteris paribus</i>. Hubungan harga dengan kuantiti ditawarkan adalah <b>positif</b>.</p></div>

<h3><span class="no">2.1.7</span> Keluk Penawaran Firma dan Pasaran</h3>
<p><span class="istilah">Penawaran firma</span> ialah kuantiti yang ditawarkan oleh sesebuah firma pada suatu tingkat harga dalam jangka masa tertentu.</p>
<div class="jadual"><table><caption>Jadual 2.5 Penawaran kasut oleh Syarikat Kasut Teguh (seminggu)</caption>
<thead><tr><th>Titik</th><th class="n">Harga (RM)</th><th class="n">Kuantiti ('000 pasang)</th></tr></thead>
<tbody><tr><td>a</td><td class="n">20</td><td class="n">4</td></tr><tr><td>b</td><td class="n">40</td><td class="n">6</td></tr><tr><td>c</td><td class="n">60</td><td class="n">8</td></tr><tr><td>d</td><td class="n">80</td><td class="n">10</td></tr></tbody></table></div>
<figure data-graf="penawaran"></figure>
<p>Keluk penawaran (SS) <b>mencerun ke atas dari kiri ke kanan</b>, menunjukkan hubungan positif antara harga dan kuantiti ditawarkan.</p>
<p><span class="istilah">Penawaran pasaran</span> ialah kuantiti yang ditawarkan oleh semua firma dalam pasaran pada suatu tingkat harga, diperoleh dengan menjumlahkan secara mendatar kuantiti ditawarkan setiap firma.</p>
<div class="jadual"><table><caption>Jadual 2.6 Penawaran pasaran beg galas</caption>
<thead><tr><th class="n">Harga (RM)</th><th class="n">Syarikat Jenas</th><th class="n">Syarikat Kiwis</th><th class="n">Pasaran</th></tr></thead>
<tbody><tr><td class="n">15</td><td class="n">20</td><td class="n">10</td><td class="n">30</td></tr><tr><td class="n">30</td><td class="n">25</td><td class="n">15</td><td class="n">40</td></tr><tr><td class="n">45</td><td class="n">30</td><td class="n">20</td><td class="n">50</td></tr><tr><td class="n">60</td><td class="n">35</td><td class="n">25</td><td class="n">60</td></tr></tbody></table></div>
<figure data-graf="jumlah-pasaran" data-opt='{"jenis":"ss"}'></figure>
<p>Keluk penawaran pasaran lebih <b>landai</b> daripada keluk penawaran setiap firma.</p>

<h3><span class="no">2.1.8</span> Penentu Penawaran</h3>
<p>Perubahan <b>harga barang itu</b> menyebabkan pergerakan di sepanjang keluk penawaran (contoh minyak sawit: harga naik P₀ ke P₁, kuantiti ditawarkan naik Q₀ ke Q₁). Penentu <b>bukan harga</b> menyebabkan peralihan keluk:</p>
<div class="grid-2">
  <div class="kad-mini"><b>Harga faktor pengeluaran</b><p>Sewa tanah, upah atau bahan mentah naik → kos naik, untung turun → penawaran berkurang (keluk ke kiri). Harga faktor turun → penawaran bertambah.</p></div>
  <div class="kad-mini"><b>Jangkaan harga masa depan</b><p>Harga dijangka naik → firma mengurangkan penawaran sekarang (keluk ke kiri). Harga dijangka turun → penawaran sekarang bertambah.</p></div>
  <div class="kad-mini"><b>Cuaca</b><p>Banjir, kemarau atau tanah runtuh (contoh Cameron Highlands) mengurangkan penawaran sayur. Musim tengkujuh mengurangkan penawaran ikan. Cuaca baik menambah penawaran.</p></div>
  <div class="kad-mini"><b>Tingkat teknologi</b><p>Mesin lebih moden dan teknik lebih cekap meningkatkan daya pengeluaran, mengurangkan kos dan masa. Penawaran bertambah, keluk ke kanan.</p></div>
  <div class="kad-mini"><b>Matlamat pengeluar</b><p><b>Memaksimumkan keuntungan</b>: firma tidak mengeluarkan secara berlebihan supaya harga tidak jatuh, penawaran berkurang. <b>Memaksimumkan jualan</b>: firma mengeluarkan sebanyak mungkin untuk menguasai pasaran, penawaran bertambah.</p></div>
  <div class="kad-mini"><b>Dasar kerajaan</b><p>Cukai ke atas input menambah kos, penawaran berkurang. Subsidi, <b>taraf perintis</b> dan pelepasan cukai mengurangkan kos, penawaran bertambah.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Taraf perintis</span><p>Insentif cukai kepada pengeluar yang melabur dalam industri baharu atau aktiviti yang digalakkan kerajaan: pengecualian cukai 70% hingga 100% daripada pendapatan berkanun selama 5 hingga 10 tahun.</p></div>

<h3><span class="no">2.1.9</span> Perubahan dalam Kuantiti Ditawarkan</h3>
<p>Pergerakan di sepanjang keluk penawaran yang sama akibat perubahan harga barang itu.</p>
<ul><li><b>Pengembangan penawaran</b>: pergerakan ke atas, kuantiti ditawarkan naik kerana harga naik.</li><li><b>Penguncupan penawaran</b>: pergerakan ke bawah, kuantiti ditawarkan turun kerana harga turun.</li></ul>

<h3><span class="no">2.1.10</span> Perubahan Penawaran</h3>
<p>Peralihan keluk penawaran ke kiri atau ke kanan akibat perubahan penentu bukan harga.</p>
<ul><li><b>Pertambahan penawaran</b>: keluk ke kanan (S₀S₀ ke S₁S₁). Contoh: kemajuan teknologi.</li><li><b>Pengurangan penawaran</b>: keluk ke kiri. Contoh: cuaca buruk.</li></ul>
<figure data-graf="penawaran" data-opt='{"mod":"alih"}'></figure>

<h3><span class="no">2.1.11</span> Keseimbangan Pasaran</h3>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Pasaran</b> ialah suatu tempat atau situasi yang membolehkan penjual dan pembeli berinteraksi sama ada secara langsung atau tidak langsung untuk menjalankan urus niaga pada suatu tingkat harga dalam tempoh masa tertentu.</p></div>
<div class="grid-2"><div class="kad-mini"><b>Pasaran langsung</b><p>Pembeli berdepan dengan penjual semasa urus niaga, contoh bazar.</p></div><div class="kad-mini"><b>Pasaran tidak langsung</b><p>Urus niaga tanpa bersemuka, contoh e-dagang secara atas talian yang luas dan tanpa sempadan.</p></div></div>
<p>Pasaran mencapai <span class="istilah">keseimbangan</span> apabila <b>kuantiti diminta sama dengan kuantiti ditawarkan</b>, iaitu apabila keluk permintaan bersilang dengan keluk penawaran. Pada titik ini harga dan kuantiti keseimbangan ditentukan dan tidak cenderung berubah.</p>

<h3><span class="no">2.1.12</span> Jadual dan Rajah Keseimbangan Pasaran</h3>
<div class="jadual"><table><caption>Jadual 2.7 Permintaan dan penawaran seluar sukan di pasaran</caption>
<thead><tr><th class="n">Harga (RM/helai)</th><th class="n">Kuantiti permintaan ('000)</th><th class="n">Kuantiti penawaran ('000)</th></tr></thead>
<tbody><tr><td class="n">10</td><td class="n">15</td><td class="n">3</td></tr><tr><td class="n">20</td><td class="n">12</td><td class="n">6</td></tr><tr><td class="n"><b>30</b></td><td class="n"><b>9</b></td><td class="n"><b>9</b></td></tr><tr><td class="n">40</td><td class="n">6</td><td class="n">12</td></tr><tr><td class="n">50</td><td class="n">3</td><td class="n">15</td></tr></tbody></table></div>
<p>Keseimbangan dicapai pada harga <b>RM30</b> dan kuantiti <b>9 000 helai</b> (titik E). Seret garis harga dalam graf untuk melihat apa yang berlaku pada harga lain, kemudian tekan <b>Biarkan pasaran menyesuaikan</b>.</p>
<figure data-graf="keseimbangan" data-opt='{"preset":"seluar"}'></figure>

<h3><span class="no">2.1.13</span> Ketidakseimbangan Pasaran</h3>
<p>Pasaran berada dalam <span class="istilah">ketidakseimbangan</span> apabila jumlah permintaan tidak sama dengan jumlah penawaran.</p>
<div class="grid-2">
  <div class="kad-mini"><b>Lebihan permintaan</b><p>Kuantiti diminta melebihi kuantiti ditawarkan pada suatu harga (harga pasaran &lt; harga keseimbangan). Harga cenderung <b>naik</b>: penawaran bertambah (pengembangan penawaran), permintaan berkurang (penguncupan permintaan).</p></div>
  <div class="kad-mini"><b>Lebihan penawaran</b><p>Kuantiti ditawarkan melebihi kuantiti diminta (harga pasaran &gt; harga keseimbangan). Harga cenderung <b>turun</b>: permintaan bertambah (pengembangan permintaan), penawaran berkurang (penguncupan penawaran).</p></div>
</div>
<div class="jadual"><table><caption>Jadual 2.8 Keadaan pasaran seluar sukan</caption>
<thead><tr><th class="n">Harga (RM)</th><th class="n">Diminta (helai)</th><th class="n">Ditawarkan (helai)</th><th>Keadaan</th><th>Kecenderungan harga</th></tr></thead>
<tbody>
<tr><td class="n">10</td><td class="n">15 000</td><td class="n">3 000</td><td>Lebihan permintaan 12 000</td><td>Naik</td></tr>
<tr><td class="n">20</td><td class="n">12 000</td><td class="n">6 000</td><td>Lebihan permintaan 6 000</td><td>Naik</td></tr>
<tr><td class="n">40</td><td class="n">6 000</td><td class="n">12 000</td><td>Lebihan penawaran 6 000</td><td>Turun</td></tr>
<tr><td class="n">50</td><td class="n">3 000</td><td class="n">15 000</td><td>Lebihan penawaran 12 000</td><td>Turun</td></tr>
</tbody></table></div>
<p>Proses penyesuaian berterusan sehingga keseimbangan dicapai semula pada RM30 dan 9 000 helai.</p>
<div class="kotak tip"><span class="kotak-label">Skema Kertas 2</span><p>Untuk menerangkan lebihan penawaran, tulis: berlaku ketidakseimbangan pasaran; tiada persetujuan antara penjual dan pembeli; SS &gt; DD; harga cenderung turun; berlaku pengembangan permintaan dan penguncupan penawaran; sertakan rajah lebihan penawaran.</p></div>

<h3><span class="no">2.1.14</span> Perubahan Keseimbangan</h3>
<p>Apabila penentu bukan harga berubah, keluk permintaan atau penawaran beralih dan keseimbangan pasaran turut berubah. Cuba butang dalam graf di atas.</p>
<div class="jadual"><table><caption>Ringkasan perubahan keseimbangan</caption>
<thead><tr><th>Perubahan</th><th>Keluk</th><th>Harga keseimbangan</th><th>Kuantiti keseimbangan</th></tr></thead>
<tbody>
<tr><td>Pertambahan permintaan</td><td>DD ke kanan</td><td>Naik</td><td>Naik</td></tr>
<tr><td>Pengurangan permintaan</td><td>DD ke kiri</td><td>Turun</td><td>Turun</td></tr>
<tr><td>Pertambahan penawaran</td><td>SS ke kanan</td><td>Turun</td><td>Naik</td></tr>
<tr><td>Pengurangan penawaran</td><td>SS ke kiri</td><td>Naik</td><td>Turun</td></tr>
</tbody></table></div>
<p>Contoh pertambahan permintaan: pada harga asal P₀, permintaan melebihi penawaran (lebihan permintaan), maka harga naik ke P₁ dan keseimbangan baharu E₁ tercapai pada harga dan kuantiti yang lebih tinggi.</p>
`
    },
    {
      no: "2.2",
      tajuk: "Keanjalan Harga",
      soalan: [
        "Apakah maksud keanjalan harga permintaan dan keanjalan harga penawaran?",
        "Bagaimanakah mentafsir Ed = 2.5 dan Es = 0.8?",
        "Apakah faktor yang mempengaruhi keanjalan harga permintaan dan penawaran?",
        "Mengapakah pengeluar perlu menurunkan harga bagi barang yang permintaannya anjal?"
      ],
      html: `
<div class="kotak contoh"><span class="kotak-label">Cuti-cuti Malaysia</span><p>Harga tiket kereta api funikular Bukit Bendera berbeza mengikut kategori: warganegara dan bukan warganegara, kanak-kanak, pelajar, dewasa, warga emas, serta harga promosi pada waktu tertentu dan pas bulanan. Mengapa? Kerana setiap kumpulan mempunyai tindak balas yang berbeza terhadap perubahan harga, iaitu <b>keanjalan harga permintaan</b>.</p></div>

<h3><span class="no">2.2.1</span> Keanjalan Harga Permintaan</h3>
<p>Tindak balas kuantiti diminta terhadap perubahan harga berbeza bagi setiap barang. Barang kosmetik yang banyak pengganti sangat responsif; barang yang mempunyai kesetiaan pengguna tinggi kurang responsif.</p>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Keanjalan harga permintaan (E<sub>d</sub>)</b> mengukur peratus perubahan dalam kuantiti diminta kesan daripada peratus perubahan harga barang itu dengan andaian <i>ceteris paribus</i>.</p></div>
<p>Konsep ini penting kepada <b>firma</b> untuk menentukan strategi harga dan kepada <b>kerajaan</b> semasa membuat keputusan tentang subsidi dan cukai.</p>

<h3><span class="no">2.2.2</span> Pengiraan Keanjalan Harga Permintaan</h3>
<div class="kotak rumus"><span class="kotak-label">Rumus</span>
<div class="rumus-baris">E<sub>d</sub> = <span class="pecahan"><span>% perubahan kuantiti diminta (%ΔQ)</span><span>% perubahan harga barang (%ΔP)</span></span></div>
<div class="rumus-baris">%ΔQ = <span class="pecahan"><span>Q₁ − Q₀</span><span>Q₀</span></span> × 100 &nbsp; %ΔP = <span class="pecahan"><span>P₁ − P₀</span><span>P₀</span></span> × 100</div></div>
<div class="kotak contoh"><span class="kotak-label">Contoh pengiraan: beras</span><div class="kira">
<div class="baris">Harga naik RM5.00 → RM6.00; kuantiti diminta turun 20 kg → 18 kg.</div>
<div class="baris">%ΔQ = (18 − 20) ÷ 20 × 100 = −10%</div>
<div class="baris">%ΔP = (6 − 5) ÷ 5 × 100 = 20%</div>
<div class="baris jawapan">E<sub>d</sub> = −10% ÷ 20% = −0.5, dinyatakan sebagai 0.5</div></div></div>
<p>Tanda <b>negatif</b> menunjukkan hubungan songsang antara harga dan kuantiti diminta; dalam ekonomi tanda ini diabaikan (ambil nilai mutlak). E<sub>d</sub> = 0.5 bermaksud apabila harga naik 1%, kuantiti diminta turun 0.5%.</p>

<h3><span class="no">2.2.3</span> Keanjalan Harga Permintaan Anjal dan Tak Anjal</h3>
<div class="jadual"><table><thead><tr><th>Ciri</th><th>Anjal</th><th>Tak anjal</th></tr></thead><tbody>
<tr><td>Pekali</td><td>E<sub>d</sub> &gt; 1</td><td>E<sub>d</sub> &lt; 1</td></tr>
<tr><td>Perbandingan</td><td>%ΔQ &gt; %ΔP (sangat responsif)</td><td>%ΔQ &lt; %ΔP (kurang responsif)</td></tr>
<tr><td>Bentuk keluk</td><td>Landai</td><td>Curam</td></tr>
<tr><td>Contoh barang</td><td>Barang mewah (rumah mewah, barang kemas, pakej pelancongan)</td><td>Barang keperluan dan barang yang mempunyai kesetiaan pengguna tinggi</td></tr>
</tbody></table></div>
<div class="kotak info"><span class="kotak-label">Nota tambahan</span><p>Jika E<sub>d</sub> = 1, peratus perubahan kuantiti sama dengan peratus perubahan harga. Keadaan ini dikenal sebagai <b>anjal uniti</b>.</p></div>

<h3><span class="no">2.2.4</span> Penentu Keanjalan Harga Permintaan</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Jenis barangan</b><p>Barang mewah: anjal. Barang keperluan (beras): tak anjal.</p></div>
  <div class="kad-mini"><b>Faktor jangka masa</b><p>Jangka pendek: tak anjal kerana sukar mencari pengganti. Jangka panjang: anjal kerana pengguna sempat mencari pengganti.</p></div>
  <div class="kad-mini"><b>Bilangan barang pengganti</b><p>Banyak pengganti (minuman berperisa): anjal. Sedikit atau tiada pengganti: tak anjal.</p></div>
  <div class="kad-mini"><b>Nisbah perbelanjaan dengan pendapatan</b><p>Bahagian besar pendapatan (telefon pintar): anjal. Bahagian kecil (makanan): tak anjal.</p></div>
  <div class="kad-mini"><b>Bilangan kegunaan</b><p>Banyak kegunaan (tepung gandum): anjal. Kegunaan terhad (tepung atta untuk capati): tak anjal.</p></div>
  <div class="kad-mini"><b>Ketagihan</b><p>Tahap ketagihan tinggi (rokok, kopi): tak anjal.</p></div>
  <div class="kad-mini"><b>Ketahanan barang</b><p>Barang tahan lama (perabot, barang elektrik) boleh disimpan: anjal. Barang tidak tahan lama (susu segar): tak anjal.</p></div>
</div>

<h3><span class="no">2.2.5</span> Perhubungan antara Keanjalan Harga Permintaan dengan Jumlah Hasil</h3>
<p><span class="istilah">Jumlah hasil</span> ialah pendapatan yang diterima oleh pengeluar daripada perbelanjaan pengguna, sama dengan jumlah perbelanjaan pengguna.</p>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">Jumlah hasil (TR) = Harga (P) × Kuantiti (Q)</div></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Anjal</span><div class="kira"><div class="baris">Harga RM20 → RM16; kuantiti 60 → 90 unit.</div><div class="baris">%ΔQ = 50%, %ΔP = −20%, E<sub>d</sub> = 2.5</div><div class="baris">TR asal = RM20 × 60 = RM1 200</div><div class="baris">TR baharu = RM16 × 90 = RM1 440</div><div class="baris jawapan">Harga turun, TR naik RM240</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Tak anjal</span><div class="kira"><div class="baris">Harga RM40 → RM72; kuantiti 100 → 80 unit.</div><div class="baris">%ΔQ = −20%, %ΔP = 80%, E<sub>d</sub> = 0.25</div><div class="baris">TR asal = RM40 × 100 = RM4 000</div><div class="baris">TR baharu = RM72 × 80 = RM5 760</div><div class="baris jawapan">Harga naik, TR naik RM1 760</div></div></div>
</div>
<figure data-graf="keanjalan" data-opt='{"jenis":"dd"}'></figure>
<div class="jadual"><table><caption>Strategi harga untuk meningkatkan jumlah hasil</caption>
<thead><tr><th>Keanjalan</th><th>Harga turun</th><th>Harga naik</th><th>Strategi</th></tr></thead>
<tbody><tr><td>Anjal (E<sub>d</sub> &gt; 1)</td><td>TR naik</td><td>TR turun</td><td>Turunkan harga</td></tr><tr><td>Tak anjal (E<sub>d</sub> &lt; 1)</td><td>TR turun</td><td>TR naik</td><td>Naikkan harga</td></tr></tbody></table></div>

<h3><span class="no">2.2.6</span> Keanjalan Harga Penawaran</h3>
<p>Tindak balas penawaran juga berbeza. Barang pertanian sukar ditambah dalam jangka pendek; barang perkilangan sangat responsif.</p>
<div class="kotak def"><span class="kotak-label">Definisi</span><p><b>Keanjalan harga penawaran (E<sub>s</sub>)</b> mengukur peratus perubahan dalam kuantiti ditawarkan kesan daripada peratus perubahan harga barang itu dengan andaian <i>ceteris paribus</i>.</p></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span><div class="rumus-baris">E<sub>s</sub> = <span class="pecahan"><span>% perubahan kuantiti ditawarkan (%ΔQ)</span><span>% perubahan harga barang (%ΔP)</span></span></div></div>
<div class="kotak contoh"><span class="kotak-label">Contoh pengiraan: kasut</span><div class="kira"><div class="baris">Harga RM50 → RM52; kuantiti ditawarkan 150 → 180 pasang.</div><div class="baris">%ΔQ = (180 − 150) ÷ 150 × 100 = 20%</div><div class="baris">%ΔP = (52 − 50) ÷ 50 × 100 = 4%</div><div class="baris jawapan">E<sub>s</sub> = 20% ÷ 4% = 5</div></div></div>
<p>Tanda <b>positif</b> menunjukkan hubungan positif antara harga dan kuantiti ditawarkan. E<sub>s</sub> = 5 bermaksud apabila harga naik 1%, kuantiti ditawarkan naik 5%.</p>

<h3><span class="no">2.2.7</span> Keanjalan Harga Penawaran Anjal dan Tak Anjal</h3>
<div class="jadual"><table><thead><tr><th>Ciri</th><th>Anjal</th><th>Tak anjal</th></tr></thead><tbody>
<tr><td>Pekali</td><td>E<sub>s</sub> &gt; 1</td><td>E<sub>s</sub> &lt; 1</td></tr>
<tr><td>Perbandingan</td><td>%ΔQ &gt; %ΔP</td><td>%ΔQ &lt; %ΔP</td></tr>
<tr><td>Bentuk keluk</td><td>Landai</td><td>Curam</td></tr>
<tr><td>Contoh barang</td><td>Barang perkilangan (kereta, pakaian, alatan elektrik): pengeluaran mudah ditambah</td><td>Barang pertanian (kopi, koko): pengeluaran tidak dapat ditambah serta-merta</td></tr>
</tbody></table></div>
<figure data-graf="keanjalan" data-opt='{"jenis":"ss"}'></figure>

<h3><span class="no">2.2.8</span> Penentu Keanjalan Harga Penawaran</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Tambahan kos</b><p>Penambahan kuantiti memerlukan tambahan kos yang tinggi: tak anjal. Tambahan kos rendah: anjal.</p></div>
  <div class="kad-mini"><b>Corak penggunaan faktor</b><p>Memerlukan faktor tertentu atau sukar mendapat input pengganti: tak anjal. Faktor mudah diperoleh atau ada pengganti: anjal.</p></div>
  <div class="kad-mini"><b>Faktor masa</b><p>Jangka pendek: tak anjal kerana penambahan pengeluaran terhad. Jangka panjang: anjal kerana semua faktor boleh diubah.</p></div>
  <div class="kad-mini"><b>Bilangan firma dalam pasaran</b><p>Banyak firma: anjal. Sedikit firma: tak anjal.</p></div>
  <div class="kad-mini"><b>Mobiliti faktor pengeluaran</b><p>Faktor mudah dipindahkan antara tempat atau keluaran: anjal. Sukar dipindahkan: tak anjal.</p></div>
  <div class="kad-mini"><b>Ketersediaan stok atau inventori</b><p>Firma yang mempunyai stok bahan mentah, barang separuh siap atau barang siap boleh bertindak cepat: anjal.</p></div>
</div>

<h3><span class="no">2.2.9</span> Kepentingan Keanjalan Harga</h3>
<h4>Firma</h4>
<p>Firma boleh mempengaruhi jumlah hasil dengan mengubah harga mengikut keanjalan barang. Pada bahagian keluk permintaan yang <b>anjal</b>, penurunan harga meningkatkan jumlah hasil; pada bahagian <b>tak anjal</b>, penurunan harga menurunkan jumlah hasil. Contohnya jualan murah biasanya diadakan untuk barang yang responsif terhadap harga.</p>
<div class="grid-3"><div class="kad-mini"><b>Jumlah hasil (TR)</b><p>Jumlah nilai penerimaan firma daripada jumlah outputnya.</p></div><div class="kad-mini"><b>Hasil purata (AR)</b><p>Hasil yang diperoleh daripada seunit output.</p></div><div class="kad-mini"><b>Hasil marginal (MR)</b><p>Perubahan jumlah hasil kesan daripada perubahan seunit output.</p></div></div>
<h4>Kerajaan: percukaian dan subsidi</h4>
<p><span class="istilah">Cukai tak langsung</span> (duti import, duti eksport, cukai eksais) dikenakan kepada firma tetapi bebannya boleh dipindahkan kepada pengguna. Cukai menambah kos, maka keluk penawaran beralih ke kiri. Siapa menanggung beban bergantung kepada keanjalan:</p>
<ul><li>Permintaan <b>anjal</b>: beban cukai pengeluar lebih besar daripada beban pembeli.</li><li>Permintaan <b>tak anjal</b>: beban cukai pembeli lebih besar. Contoh: cukai jualan rokok naik 20 sen, harga rokok dinaikkan 20 sen.</li></ul>
<p><span class="istilah">Subsidi</span> mengurangkan kos, maka keluk penawaran beralih ke kanan:</p>
<ul><li>Permintaan <b>anjal</b>: pengeluar menikmati subsidi lebih besar.</li><li>Permintaan <b>tak anjal</b>: pembeli menikmati subsidi lebih besar.</li></ul>
<figure data-graf="cukai-subsidi"></figure>
<div class="kotak info"><span class="kotak-label">Masyarakat ASEAN</span><p>Kerajaan menghapuskan subsidi secara berperingkat dan menyalurkannya dalam bentuk tunai seperti BR1M. Singapura dan Indonesia juga mengamalkan pemberian tunai.</p></div>
`
    }
  ],
  kad: [
    { d: "Takrif <b>permintaan</b>", b: "Keinginan dan kemampuan seseorang individu untuk membeli sesuatu barang atau perkhidmatan pada suatu tingkat harga tertentu dan dalam jangka masa tertentu.", t: "2.1.1" },
    { d: "Maksud <b>permintaan berkesan</b>", b: "Permintaan yang disokong oleh kuasa beli atau kemampuan membayar.", t: "2.1.1" },
    { d: "Maksud <i>ceteris paribus</i>", b: "Faktor lain tidak berubah; andaian penting dalam analisis ekonomi.", t: "2.1.1" },
    { d: "Nyatakan <b>hukum permintaan</b>", b: "Semakin tinggi harga, semakin kurang kuantiti diminta dan sebaliknya, <i>ceteris paribus</i>. Hubungan <b>negatif</b>.", t: "2.1.1" },
    { d: "Bagaimanakah keluk permintaan pasaran dibentuk?", b: "Menjumlahkan <b>secara mendatar</b> kuantiti diminta semua individu pada setiap tingkat harga. Keluk pasaran lebih landai.", t: "2.1.2" },
    { d: "Penentu permintaan <b>bukan harga</b>", b: "Harga barang lain (pengganti, penggenap), cita rasa, pendapatan, musim, jangkaan harga masa depan, dasar kerajaan.", t: "2.1.3" },
    { d: "Hubungan harga barang dengan permintaan <b>barang pengganti</b>", b: "<b>Positif</b>. Harga daging naik → permintaan ikan naik.", t: "2.1.3" },
    { d: "Hubungan harga barang dengan permintaan <b>barang penggenap</b>", b: "<b>Negatif</b>. Harga mesin pencetak naik → permintaan kartrij dakwat turun.", t: "2.1.3" },
    { d: "Kesan pendapatan naik terhadap barang biasa, barang mesti dan barang bawahan", b: "Barang biasa: permintaan naik. Barang mesti (garam): tetap. Barang bawahan (beras hancur): turun.", t: "2.1.3" },
    { d: "Beza <b>pengembangan permintaan</b> dan <b>pertambahan permintaan</b>", b: "Pengembangan: pergerakan ke bawah di sepanjang keluk kerana harga turun. Pertambahan: keluk beralih ke kanan kerana faktor bukan harga.", t: "2.1.5" },
    { d: "Takrif <b>penawaran</b>", b: "Kuantiti barang atau perkhidmatan yang sanggup dan mampu dikeluarkan oleh pengeluar pada suatu tingkat harga dalam tempoh masa tertentu.", t: "2.1.6" },
    { d: "Nyatakan <b>hukum penawaran</b>", b: "Semakin tinggi harga, semakin banyak kuantiti ditawarkan dan sebaliknya, <i>ceteris paribus</i>. Hubungan <b>positif</b>.", t: "2.1.6" },
    { d: "Penentu penawaran <b>bukan harga</b>", b: "Harga faktor pengeluaran, jangkaan harga masa depan, cuaca, tingkat teknologi, matlamat pengeluar, dasar kerajaan.", t: "2.1.8" },
    { d: "Kesan matlamat <b>memaksimumkan untung</b> dan <b>memaksimumkan jualan</b> terhadap penawaran", b: "Untung maksimum: penawaran dikurangkan (keluk ke kiri). Jualan maksimum: penawaran ditambah (keluk ke kanan).", t: "2.1.8" },
    { d: "Maksud <b>taraf perintis</b>", b: "Insentif cukai kepada pelabur dalam industri baharu yang digalakkan: pengecualian cukai 70% hingga 100% pendapatan berkanun selama 5 hingga 10 tahun.", t: "2.1.8" },
    { d: "Beza <b>pengembangan penawaran</b> dan <b>pertambahan penawaran</b>", b: "Pengembangan: pergerakan ke atas di sepanjang keluk kerana harga naik. Pertambahan: keluk beralih ke kanan kerana faktor bukan harga.", t: "2.1.10" },
    { d: "Takrif <b>pasaran</b>", b: "Tempat atau situasi yang membolehkan penjual dan pembeli berinteraksi secara langsung atau tidak langsung untuk berurus niaga pada suatu tingkat harga dalam tempoh tertentu.", t: "2.1.11" },
    { d: "Bilakah <b>keseimbangan pasaran</b> tercapai?", b: "Apabila kuantiti diminta sama dengan kuantiti ditawarkan, iaitu keluk DD bersilang dengan SS.", t: "2.1.11" },
    { d: "Maksud <b>lebihan permintaan</b> dan kesannya", b: "Kuantiti diminta melebihi kuantiti ditawarkan (harga pasaran &lt; harga keseimbangan). Harga cenderung naik.", t: "2.1.13" },
    { d: "Maksud <b>lebihan penawaran</b> dan kesannya", b: "Kuantiti ditawarkan melebihi kuantiti diminta (harga pasaran &gt; harga keseimbangan). Harga cenderung turun.", t: "2.1.13" },
    { d: "Kesan <b>pertambahan penawaran</b> terhadap keseimbangan", b: "Harga keseimbangan turun, kuantiti keseimbangan naik.", t: "2.1.14" },
    { d: "Kesan <b>pengurangan penawaran</b> terhadap keseimbangan", b: "Harga keseimbangan naik, kuantiti keseimbangan turun.", t: "2.1.14" },
    { d: "Takrif <b>keanjalan harga permintaan</b>", b: "Mengukur peratus perubahan kuantiti diminta kesan daripada peratus perubahan harga barang itu, <i>ceteris paribus</i>.", t: "2.2.1" },
    { d: "Rumus E<sub>d</sub>", b: "E<sub>d</sub> = %ΔQ ÷ %ΔP; %ΔQ = (Q₁ − Q₀)/Q₀ × 100; %ΔP = (P₁ − P₀)/P₀ × 100. Tanda negatif diabaikan.", t: "2.2.2" },
    { d: "Ciri permintaan <b>anjal</b>", b: "E<sub>d</sub> &gt; 1, %ΔQ &gt; %ΔP, keluk landai, contoh barang mewah.", t: "2.2.3" },
    { d: "Ciri permintaan <b>tak anjal</b>", b: "E<sub>d</sub> &lt; 1, %ΔQ &lt; %ΔP, keluk curam, contoh barang keperluan.", t: "2.2.3" },
    { d: "Tujuh penentu keanjalan harga permintaan", b: "Jenis barangan, jangka masa, bilangan pengganti, nisbah perbelanjaan dengan pendapatan, bilangan kegunaan, ketagihan, ketahanan barang.", t: "2.2.4" },
    { d: "Strategi harga untuk menambah jumlah hasil", b: "Permintaan anjal: <b>turunkan</b> harga. Permintaan tak anjal: <b>naikkan</b> harga.", t: "2.2.5" },
    { d: "Takrif <b>keanjalan harga penawaran</b>", b: "Mengukur peratus perubahan kuantiti ditawarkan kesan daripada peratus perubahan harga barang itu, <i>ceteris paribus</i>. Tanda positif.", t: "2.2.6" },
    { d: "Mengapa penawaran barang pertanian <b>tak anjal</b>?", b: "Pengeluarannya tidak dapat ditambah serta-merta apabila harga naik (perlu masa untuk tanam dan tuai).", t: "2.2.7" },
    { d: "Enam penentu keanjalan harga penawaran", b: "Tambahan kos, corak penggunaan faktor, faktor masa, bilangan firma, mobiliti faktor pengeluaran, ketersediaan stok atau inventori.", t: "2.2.8" },
    { d: "Siapa menanggung beban cukai lebih besar jika permintaan tak anjal?", b: "<b>Pembeli (pengguna)</b>. Jika permintaan anjal, pengeluar menanggung lebih.", t: "2.2.9" },
    { d: "Siapa menikmati subsidi lebih besar jika permintaan anjal?", b: "<b>Pengeluar</b>. Jika permintaan tak anjal, pembeli menikmati lebih.", t: "2.2.9" }
  ],
  kuiz: [
    { s: "Permintaan berkesan wujud apabila keinginan membeli", p: ["disokong oleh kuasa beli", "disokong oleh iklan", "berlaku pada musim perayaan", "tidak dipengaruhi harga"], j: 0, e: "Permintaan berkesan mesti disokong oleh kemampuan membayar." },
    { s: "Hukum permintaan menyatakan bahawa", p: ["harga naik, kuantiti diminta naik", "harga naik, kuantiti diminta turun, ceteris paribus", "pendapatan naik, permintaan naik", "harga turun, penawaran naik"], j: 1, e: "Hubungan harga dengan kuantiti diminta adalah negatif, dengan andaian faktor lain tetap." },
    { s: "Berdasarkan Jadual 2.2, pada harga RM30, Rani meminta 3 unit dan Sofea 4 unit. Permintaan pasaran ialah", p: ["1 unit", "3.5 unit", "7 unit", "12 unit"], j: 2, e: "Permintaan pasaran = jumlah mendatar = 3 + 4 = 7 unit." },
    { s: "Harga daging meningkat. Apakah kesan terhadap permintaan ikan, ceteris paribus?", p: ["Keluk permintaan ikan beralih ke kiri", "Keluk permintaan ikan beralih ke kanan", "Kuantiti diminta ikan bergerak di sepanjang keluk", "Tiada kesan"], j: 1, e: "Daging dan ikan ialah barang pengganti. Hubungannya positif, maka permintaan ikan bertambah." },
    { s: "Harga mesin pencetak meningkat. Permintaan terhadap kartrij dakwat akan", p: ["bertambah kerana barang pengganti", "berkurang kerana barang penggenap", "bertambah kerana barang penggenap", "tidak berubah"], j: 1, e: "Pencetak dan kartrij digunakan bersama; hubungan negatif." },
    { s: "Antara berikut, yang manakah menyebabkan <b>pergerakan di sepanjang</b> keluk permintaan kopi?", p: ["Pendapatan pengguna meningkat", "Harga teh meningkat", "Harga kopi turun", "Iklan kopi yang berkesan"], j: 2, e: "Hanya perubahan harga barang itu sendiri menyebabkan pergerakan di sepanjang keluk (perubahan dalam kuantiti diminta)." },
    { s: "Kerajaan menaikkan kadar cukai pendapatan individu. Kesan terhadap keluk permintaan barang biasa ialah", p: ["beralih ke kanan", "beralih ke kiri", "pengembangan permintaan", "penguncupan permintaan"], j: 1, e: "Pendapatan boleh guna berkurang, kuasa beli turun, maka permintaan berkurang." },
    { s: "Hukum penawaran menunjukkan hubungan antara harga dengan kuantiti ditawarkan adalah", p: ["negatif", "positif", "tiada hubungan", "songsang"], j: 1, e: "Harga naik → untung naik → firma menambah kuantiti ditawarkan." },
    { s: "Kemajuan teknologi dalam pengeluaran telefon pintar akan menyebabkan", p: ["penguncupan penawaran", "pengurangan penawaran", "pertambahan penawaran", "pengembangan permintaan"], j: 2, e: "Teknologi mengurangkan kos dan meningkatkan daya pengeluaran, keluk penawaran beralih ke kanan." },
    { s: "Jika firma bermatlamat memaksimumkan keuntungan, firma akan", p: ["mengeluarkan sebanyak mungkin", "mengurangkan pengeluaran supaya harga tidak jatuh", "menurunkan harga", "menambah penawaran"], j: 1, e: "Pengeluaran berlebihan menjatuhkan harga dan menjejaskan untung, maka penawaran dikurangkan." },
    { s: "Berdasarkan Jadual 2.7, apakah keadaan pasaran seluar sukan pada harga RM40?", p: ["Keseimbangan", "Lebihan permintaan 6 000 helai", "Lebihan penawaran 6 000 helai", "Lebihan penawaran 12 000 helai"], j: 2, e: "Pada RM40, diminta 6 000 dan ditawarkan 12 000; lebihan penawaran 6 000 helai. Harga cenderung turun." },
    { s: "Rajah di bawah menunjukkan pasaran barang X. Pada harga P₁, apakah yang akan berlaku?", p: ["Harga cenderung naik kerana lebihan permintaan", "Harga cenderung turun kerana lebihan penawaran", "Pasaran berada dalam keseimbangan", "Keluk permintaan beralih ke kanan"], j: 0, e: "P₁ lebih rendah daripada harga keseimbangan, maka kuantiti diminta melebihi kuantiti ditawarkan. Harga cenderung naik.", g: { lebar: 360, tinggi: 250, x: [0, 10], y: [0, 10], keluk: [{ dari: [1, 9], ke: [9, 1], kelas: "d", label: "DD", dx: 4, dy: -6 }, { dari: [1, 1], ke: [9, 9], kelas: "s", label: "SS", dx: 4, dy: 4 }], panduan: [{ q: 5, p: 5, ly: "P₀", lx: "Q₀" }, { q: 7, p: 3, keX: false, ly: "P₁" }], titik: [{ q: 5, p: 5, label: "E" }] } },
    { s: "Pertambahan permintaan dengan penawaran tidak berubah akan menyebabkan harga keseimbangan", p: ["naik dan kuantiti keseimbangan naik", "naik dan kuantiti keseimbangan turun", "turun dan kuantiti keseimbangan naik", "turun dan kuantiti keseimbangan turun"], j: 0, e: "DD ke kanan: lebihan permintaan pada harga asal, harga dan kuantiti keseimbangan kedua-duanya naik." },
    { s: "Banjir besar memusnahkan tanaman sayur. Kesan terhadap pasaran sayur ialah", p: ["harga turun, kuantiti naik", "harga naik, kuantiti turun", "harga dan kuantiti naik", "harga dan kuantiti turun"], j: 1, e: "Penawaran berkurang (SS ke kiri): harga keseimbangan naik, kuantiti keseimbangan turun." },
    { s: "Harga beras naik daripada RM5 kepada RM6 dan kuantiti diminta turun daripada 20 kg kepada 18 kg. Nilai E<sub>d</sub> ialah", p: ["0.2", "0.5", "2.0", "5.0"], j: 1, e: "%ΔQ = −10%, %ΔP = 20%. E<sub>d</sub> = 10 ÷ 20 = 0.5 (tak anjal)." },
    { s: "Nilai E<sub>d</sub> = 2.5 bermaksud", p: ["harga naik 1%, kuantiti diminta turun 2.5%", "harga naik 2.5%, kuantiti diminta turun 1%", "permintaan tak anjal", "keluk permintaan curam"], j: 0, e: "E<sub>d</sub> ialah nisbah %ΔQ kepada %ΔP. Nilai lebih daripada 1 bermaksud anjal." },
    { s: "Barang yang manakah permintaannya paling <b>tak anjal</b>?", p: ["Pakej pelancongan", "Barang kemas", "Garam", "Minuman berperisa"], j: 2, e: "Garam ialah barang keperluan, sedikit pengganti dan mengambil bahagian kecil pendapatan." },
    { s: "Permintaan terhadap sesuatu barang adalah anjal. Untuk menambah jumlah hasil, firma patut", p: ["menaikkan harga", "menurunkan harga", "mengekalkan harga", "mengurangkan penawaran"], j: 1, e: "Bagi barang anjal, penurunan harga menyebabkan kuantiti diminta naik lebih besar, maka TR naik." },
    { s: "Harga suatu barang naik daripada RM40 kepada RM72, kuantiti diminta turun daripada 100 kepada 80 unit. Apakah perubahan jumlah hasil?", p: ["Turun RM1 760", "Naik RM1 760", "Naik RM240", "Tidak berubah"], j: 1, e: "TR asal RM4 000, TR baharu RM72 × 80 = RM5 760. Naik RM1 760 kerana permintaan tak anjal (E<sub>d</sub> = 0.25)." },
    { s: "Harga kasut naik daripada RM50 kepada RM52 dan kuantiti ditawarkan naik daripada 150 kepada 180 pasang. Nilai E<sub>s</sub> ialah", p: ["0.2", "4", "5", "20"], j: 2, e: "%ΔQ = 20%, %ΔP = 4%. E<sub>s</sub> = 20 ÷ 4 = 5 (anjal)." },
    { s: "Penawaran barang pertanian seperti koko adalah tak anjal kerana", p: ["banyak firma dalam pasaran", "pengeluaran tidak dapat ditambah serta-merta", "tambahan kos pengeluaran rendah", "stok mudah disimpan"], j: 1, e: "Tanaman memerlukan masa untuk tumbuh, maka kuantiti ditawarkan kurang responsif dalam jangka pendek." },
    { s: "Antara berikut, yang manakah menjadikan penawaran sesuatu barang lebih <b>anjal</b>?", p: ["Jangka masa pendek", "Bilangan firma yang sedikit", "Ketersediaan stok yang banyak", "Faktor pengeluaran sukar dipindahkan"], j: 2, e: "Stok membolehkan firma menambah kuantiti ditawarkan dengan cepat apabila harga naik." },
    { s: "Jika permintaan terhadap rokok tak anjal dan kerajaan mengenakan cukai, siapakah menanggung beban cukai yang lebih besar?", p: ["Pengeluar", "Pengguna", "Kerajaan", "Dikongsi sama rata"], j: 1, e: "Permintaan tak anjal membolehkan pengeluar memindahkan cukai melalui harga yang lebih tinggi." }
  ]
});
