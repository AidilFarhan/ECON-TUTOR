/* =========================================================
   Matrikulasi · AE025 Makroekonomi · Bab 7 · Ekonomi Antarabangsa
   Sumber: slaid kuliah AE025 "7.1.1 Perdagangan Antarabangsa" (16 slaid),
           "7.1.2 Teori Faedah Mutlak" (35), "7.1.3 Teori Faedah Berbanding" (38),
           "7.1.4 KSP dan Dasar Perlindungan" (32), "7.2.1 Imbangan Pembayaran" (26),
           "7.2.2 Defisit Akaun Semasa" (13) dan "7.3 Kadar Pertukaran" (36)
   ========================================================= */
EKO.daftarBab({
  id: "m2-b7",
  peringkat: "matrik",
  tingkatan: 2,
  no: 7,
  tajuk: "Ekonomi Antarabangsa",
  warna: "var(--bab-stpm1)",
  ringkas:
    "Negara berdagang kerana perbezaan anugerah faktor, teknologi, kemahiran dan iklim. Bab ini merangkumi faedah perdagangan antarabangsa, teori faedah mutlak dan faedah berbanding, kadar syarat perdagangan, dasar perlindungan, struktur imbangan pembayaran dan langkah mengatasi defisit, serta penentuan kadar pertukaran asing dalam sistem boleh ubah dan sistem tetap.",
  seksyen: [
    {
      no: "7.1.1",
      tajuk: "Perdagangan Antarabangsa",
      soalan: ["Mengapakah perdagangan antarabangsa wujud?", "Apakah faedah perdagangan antarabangsa?"],
      html: `
<div class="kotak def"><span class="kotak-label">Perdagangan antarabangsa (PAB)</span><p>Pertukaran atau jual beli barang dan perkhidmatan antara dua negara atau lebih, merentasi sempadan negara dan politik, melalui kegiatan eksport (X) dan import (M).</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Sebab wujudnya PAB</b><p>(i) <b>Perbezaan anugerah faktor</b>: sumber alam (Malaysia kaya bahan galian), tanah (Malaysia sesuai kelapa sawit, New Zealand sesuai penternakan), modal. (ii) <b>Perbezaan teknologi</b>: negara berteknologi tinggi mengkhusus dalam barang perkilangan. (iii) <b>Perbezaan kemahiran buruh</b>: Jepun dalam elektronik, Thailand dalam pertanian. (iv) <b>Perbezaan iklim</b>: Khatulistiwa sesuai getah dan buah tropika; kawasan sejuk sesuai gandum, epal dan anggur.</p></div>
  <div class="kad-mini"><b>Faedah PAB</b><p>(i) Memperoleh barang yang tidak dapat dikeluarkan sendiri. (ii) Mempelbagai barang dan meluaskan pasaran: firma menikmati ekonomi bidangan, kos seunit dan harga turun. (iii) Kebaikan pengkhususan: pengeluaran lebih cekap. (iv) Perpindahan teknologi daripada negara maju.</p></div>
</div>
<div class="kotak fokus"><span class="kotak-label">Penggunaan di luar KKP</span><p>Negara yang berdagang mengeluarkan pada KKPnya tetapi boleh mencapai penggunaan <b>di luar</b> KKP, maka kebajikannya lebih tinggi daripada negara yang tidak berdagang.</p></div>
`
    },
    {
      no: "7.1.2",
      tajuk: "Teori Faedah Mutlak (Adam Smith)",
      soalan: ["Apakah maksud faedah mutlak?", "Bagaimanakah julat kadar pertukaran ditentukan?", "Berapakah laba perdagangan setiap negara?"],
      html: `
<div class="kotak def"><span class="kotak-label">Faedah mutlak</span><p>Faedah yang dinikmati negara yang mampu mengeluarkan sesuatu barang dengan <b>lebih cekap</b> (lebih banyak) berbanding negara lain, dengan jumlah faktor dan tingkat teknologi yang sama.</p></div>
<div class="kotak info"><span class="kotak-label">Andaian</span><p>Dua negara, dua barang; selepas pengkhususan setiap negara mengeluarkan satu barang sahaja; guna tenaga penuh; tiada sekatan dan kos pengangkutan. Setiap negara mempunyai 2 unit faktor: sebelum pengkhususan 1 unit untuk setiap barang.</p></div>
<div class="grid-3">
  <div class="jadual"><table><caption>Sebelum perdagangan</caption><thead><tr><th>Negara</th><th class="n">Makanan</th><th class="n">Pakaian</th></tr></thead><tbody><tr><td>Malaysia</td><td class="n">50</td><td class="n">25</td></tr><tr><td>Indonesia</td><td class="n">20</td><td class="n">50</td></tr><tr><td><b>Dunia</b></td><td class="n">70</td><td class="n">75</td></tr></tbody></table></div>
  <div class="jadual"><table><caption>Selepas pengkhususan</caption><thead><tr><th>Negara</th><th class="n">Makanan</th><th class="n">Pakaian</th></tr></thead><tbody><tr><td>Malaysia</td><td class="n">100</td><td class="n">0</td></tr><tr><td>Indonesia</td><td class="n">0</td><td class="n">100</td></tr><tr><td><b>Dunia</b></td><td class="n">100</td><td class="n">100</td></tr></tbody></table></div>
  <div class="jadual"><table><caption>Selepas PAB (1 makanan : 1 pakaian)</caption><thead><tr><th>Negara</th><th class="n">Makanan</th><th class="n">Pakaian</th></tr></thead><tbody><tr><td>Malaysia</td><td class="n">60</td><td class="n">40</td></tr><tr><td>Indonesia</td><td class="n">40</td><td class="n">60</td></tr><tr><td><b>Dunia</b></td><td class="n">100</td><td class="n">100</td></tr></tbody></table></div>
</div>
<p>Malaysia mempunyai faedah mutlak dalam makanan (50 &gt; 20) dan Indonesia dalam pakaian (50 &gt; 25). Selepas pengkhususan, keluaran dunia bertambah 30 unit makanan (70 → 100) dan 25 unit pakaian (75 → 100).</p>
<div class="kotak rumus"><span class="kotak-label">Julat kadar pertukaran</span><p>Harga relatif Malaysia: 1 makanan = 0.5 pakaian (25/50), atau 1 pakaian = 2 makanan. Indonesia: 1 makanan = 2.5 pakaian (50/20), atau 1 pakaian = 0.4 makanan.</p><div class="rumus-baris">0.5 pakaian ≤ 1 makanan ≤ 2.5 pakaian</div><div class="rumus-baris">0.4 makanan ≤ 1 pakaian ≤ 2 makanan</div></div>
<div class="kotak contoh"><span class="kotak-label">Laba perdagangan (1 makanan : 1 pakaian)</span><p>Malaysia mengeksport 40 makanan untuk 40 pakaian. Berbanding sebelum perdagangan, Malaysia mendapat tambahan <b>10 makanan</b> (60 − 50) dan <b>15 pakaian</b> (40 − 25); Indonesia mendapat tambahan <b>20 makanan</b> (40 − 20) dan <b>10 pakaian</b> (60 − 50). Jika kadar pertukaran sama dengan harga relatif salah sebuah negara, hanya satu pihak untung dan perdagangan tidak akan berlaku.</p></div>
<div class="kotak contoh"><span class="kotak-label">Pop kuiz modul (jawapan dikira): India dan China</span><div class="kira">
  <div class="baris">India: kapas 100, lori 30. China: kapas 80, lori 50.</div>
  <div class="baris">India faedah mutlak dalam kapas (100 &gt; 80); China dalam lori (50 &gt; 30).</div>
  <div class="baris">India: 1 kapas = 30/100 = 0.3 lori; China: 1 kapas = 50/80 = 0.625 lori</div>
  <div class="baris jawapan">Julat: 0.3 lori ≤ 1 kapas ≤ 0.625 lori</div></div></div>
`
    },
    {
      no: "7.1.3",
      tajuk: "Teori Faedah Berbanding (David Ricardo)",
      soalan: ["Mengapakah perdagangan masih menguntungkan walaupun satu negara cekap dalam kedua-dua barang?", "Bagaimanakah kos lepas menentukan pengkhususan?"],
      html: `
<div class="kotak def"><span class="kotak-label">Faedah berbanding</span><p>Faedah yang dinikmati negara yang mampu mengeluarkan sesuatu barang dengan <b>kos lepas (harga relatif) yang lebih rendah</b> berbanding negara lain. Walaupun sebuah negara cekap dalam kedua-dua barang, perdagangan masih boleh berlaku berdasarkan faedah berbanding.</p></div>
<div class="grid-2">
  <div class="jadual"><table><caption>Sebelum perdagangan (50% buruh untuk setiap barang)</caption><thead><tr><th>Negara</th><th class="n">Komputer</th><th class="n">Kereta</th></tr></thead><tbody><tr><td>Malaysia</td><td class="n">200</td><td class="n">160</td></tr><tr><td>Jepun</td><td class="n">400</td><td class="n">640</td></tr><tr><td><b>Dunia</b></td><td class="n">600</td><td class="n">800</td></tr></tbody></table></div>
  <div class="jadual"><table><caption>Kos lepas</caption><thead><tr><th>Negara</th><th>1 komputer</th><th>1 kereta</th></tr></thead><tbody><tr><td>Malaysia</td><td><b>0.8 kereta</b> (160/200)</td><td>1.25 komputer (200/160)</td></tr><tr><td>Jepun</td><td>1.6 kereta (640/400)</td><td><b>0.625 komputer</b> (400/640)</td></tr></tbody></table></div>
</div>
<p>Jepun mempunyai faedah mutlak dalam kedua-dua barang. Namun kos lepas komputer lebih rendah di <b>Malaysia</b> (0.8 &lt; 1.6) dan kos lepas kereta lebih rendah di <b>Jepun</b> (0.625 &lt; 1.25). Maka Malaysia mengkhusus dalam komputer (400 unit) dan Jepun dalam kereta (1 280 unit).</p>
<div class="kotak rumus"><span class="kotak-label">Julat kadar pertukaran</span><div class="rumus-baris">0.8 kereta ≤ 1 komputer ≤ 1.6 kereta</div><div class="rumus-baris">0.625 komputer ≤ 1 kereta ≤ 1.25 komputer</div></div>
<div class="grid-2">
  <div class="jadual"><table><caption>Selepas PAB (1 komputer : 1 kereta)</caption><thead><tr><th>Negara</th><th class="n">Komputer</th><th class="n">Kereta</th></tr></thead><tbody><tr><td>Malaysia</td><td class="n">220</td><td class="n">180</td></tr><tr><td>Jepun</td><td class="n">180</td><td class="n">1 100</td></tr><tr><td><b>Dunia</b></td><td class="n">400</td><td class="n">1 280</td></tr></tbody></table></div>
  <div class="kotak contoh"><span class="kotak-label">Laba perdagangan</span><p>Malaysia mengeksport 180 komputer untuk 180 kereta: tambahan <b>20 komputer</b> dan <b>20 kereta</b>. Jepun kehilangan 220 komputer (400 − 180) tetapi mendapat tambahan 460 kereta (1 100 − 640). Pada harga relatif Jepun, 220 komputer hanya bernilai 220 × 1.6 = 352 kereta, maka Jepun <b>untung 108 kereta</b> (460 − 352).</p></div>
</div>
<figure data-graf="faedah-berbanding"></figure>
<div class="kotak contoh"><span class="kotak-label">Pop kuiz modul: Kanada dan Jerman (skema modul)</span><div class="kira">
  <div class="baris">Kanada: X 120, Y 80. Jerman: X 20, Y 60.</div>
  <div class="baris">Kos lepas 1X: Kanada 0.67Y, Jerman 3Y → Kanada mengkhusus X; kos lepas 1Y: Kanada 1.5X, Jerman 0.33X → Jerman mengkhusus Y</div>
  <div class="baris">Selepas pengkhususan: Kanada 240X; Jerman 120Y. Julat 1X : 0.67–3Y</div>
  <div class="baris">Kadar 1X : 0.8Y, Kanada kekalkan 120X: Kanada (120X, 96Y), Jerman (120X, 24Y)</div>
  <div class="baris jawapan">Kanada untung 16Y. Jerman untung 100X dan hilang 36Y (36 × 0.33 = 12X sahaja), maka jimat 88X</div></div></div>
`
    },
    {
      no: "7.1.4",
      tajuk: "Kadar Syarat Perdagangan dan Dasar Perlindungan",
      soalan: ["Bagaimanakah kadar syarat perdagangan dikira dan ditafsir?", "Mengapakah negara mengamalkan dasar perlindungan?", "Apakah kesan tarif?"],
      html: `
<div class="kotak def"><span class="kotak-label">Kadar syarat perdagangan (KSP)</span><p>Ukuran berapa unit import boleh diperoleh daripada satu unit eksport.</p></div>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">KSP nominal</span><div class="rumus-baris">= jumlah nilai eksport ÷ jumlah nilai import × 100</div></div>
  <div class="kotak contoh"><span class="kotak-label">Malaysia 2005</span><div class="kira"><div class="baris">RM604 625 juta ÷ RM490 494 juta × 100</div><div class="baris jawapan">= 123.27</div></div><p>Dengan 100 unit eksport, Malaysia memperoleh 123.27 unit import. KSP melebihi 100 bermakna KSP bertambah baik dan menyumbang kepada imbangan pembayaran lebihan; sebaliknya jika kurang daripada 100.</p></div>
</div>
<h3>Dasar perlindungan</h3>
<p>Dasar untuk melindungi industri tempatan supaya boleh bersaing dengan barang asing, kerana PAB tidak selalu menguntungkan (defisit perdagangan, inflasi diimport, kemelesetan dari luar).</p>
<div class="grid-2">
  <div class="kad-mini"><b>Sebab dasar perlindungan</b><p>(i) Melindungi <b>industri strategik</b> seperti beras dan senjata, penting semasa kecemasan. (ii) Melindungi <b>industri muda</b> yang belum menikmati ekonomi bidangan. (iii) <b>Membaiki imbangan pembayaran</b> melalui sekatan import dan galakan eksport. (iv) <b>Mencegah lambakan</b>, iaitu penjualan barang asing pada harga jauh lebih rendah. (v) <b>Mengurangkan pergantungan</b> kepada negara asing.</p></div>
  <div class="kad-mini"><b>Jenis perlindungan</b><p><b>Tarif</b>: ad valorem (peratus harga import, contoh 50% × RM90 000 = RM45 000 bagi kereta Mercedes) dan spesifik (jumlah tetap ikut kuantiti, contoh RM40 bagi setiap 100 kg beras). <b>Bukan tarif</b>: kuota, embargo (contoh sekatan terhadap Iraq selepas menyerang Kuwait, 1991), kawalan tukaran asing, subsidi eksport (contoh minyak sawit).</p></div>
</div>
<div class="kotak fokus"><span class="kotak-label">Kesan tarif (negara kecil)</span><p>Tanpa perdagangan, keseimbangan pada E (harga Pe, kuantiti Q3). Dengan perdagangan pada harga dunia P1, pengeluaran tempatan 0Q1 dan import Q1Q5. Tarif P1P2 menaikkan harga ke P2: pengeluaran tempatan naik Q1 ke Q2, penggunaan turun Q5 ke Q4, import turun ke <b>Q2Q4</b>, dan kerajaan memperoleh hasil tarif (kawasan BFGC). Perbelanjaan import jatuh, maka imbangan pembayaran bertambah baik.</p></div>
<figure data-graf="sekatan-import"></figure>
<div class="kotak tip"><span class="kotak-label">Kesan negatif dasar perlindungan</span><p>(i) Ketidakcekapan jangka panjang: sumber beralih ke industri yang dilindungi. (ii) Kos barang meningkat tanpa kenaikan mutu. (iii) Daya saing antarabangsa berkurang: negara lain membalas dengan tarif, dan industri tempatan kurang galakan untuk cekap.</p></div>
`
    },
    {
      no: "7.2",
      tajuk: "Imbangan Pembayaran",
      soalan: ["Apakah struktur imbangan pembayaran?", "Bagaimanakah defisit akaun semasa diatasi?"],
      html: `
<div class="kotak def"><span class="kotak-label">Imbangan pembayaran</span><p>Penyata kewangan yang merekod semua urus niaga barang, perkhidmatan dan aliran modal antarabangsa untuk suatu tempoh. Penerimaan dari luar negara dicatat sebagai <b>kredit</b>, pembayaran ke luar negara sebagai <b>debit</b>. Oleh sebab kesilapan dan urus niaga yang tidak direkod, butiran <b>kesilapan dan ketinggalan</b> digunakan untuk mengimbangkan akaun.</p></div>
<div class="jadual"><table><caption>Imbangan pembayaran Malaysia (bersih, RM juta)</caption>
<thead><tr><th>Butiran</th><th class="n">2001</th><th class="n">2002</th><th class="n">2003</th><th class="n">2004</th></tr></thead>
<tbody>
<tr><td>A. Barangan dan perkhidmatan</td><td class="n">61 488</td><td class="n">66 121</td><td class="n">82 462</td><td class="n">95 695</td></tr>
<tr><td>&nbsp;&nbsp;1. Barangan (eksport − import)</td><td class="n">69 854</td><td class="n">72 117</td><td class="n">97 762</td><td class="n">104 474</td></tr>
<tr><td>&nbsp;&nbsp;2. Perkhidmatan</td><td class="n">−8 366</td><td class="n">−5 996</td><td class="n">−15 300</td><td class="n">−8 780</td></tr>
<tr><td>B. Pendapatan</td><td class="n">−25 623</td><td class="n">−25 061</td><td class="n">−22 537</td><td class="n">−24 549</td></tr>
<tr><td>C. Pindahan semasa</td><td class="n">−8 178</td><td class="n">−10 566</td><td class="n">−9 300</td><td class="n">−14 633</td></tr>
<tr><td><b>D. Imbangan akaun semasa</b></td><td class="n"><b>27 687</b></td><td class="n"><b>30 494</b></td><td class="n"><b>50 625</b></td><td class="n"><b>56 511</b></td></tr>
<tr><td>E. Akaun kewangan</td><td class="n">−14 791</td><td class="n">−11 941</td><td class="n">−12 146</td><td class="n">15 083</td></tr>
<tr><td>F. Kesilapan dan ketinggalan</td><td class="n">−9 234</td><td class="n">−4 362</td><td class="n">580</td><td class="n">11 467</td></tr>
<tr><td><b>G. Imbangan keseluruhan (D + E + F)</b></td><td class="n"><b>3 662</b></td><td class="n"><b>14 191</b></td><td class="n"><b>39 059</b></td><td class="n"><b>83 061</b></td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kad-mini"><b>Akaun semasa</b><p><b>Barangan</b>: eksport − import barang nampak (imbangan dagangan). <b>Perkhidmatan</b>: pengangkutan, perjalanan, urus niaga kerajaan dan perkhidmatan lain. <b>Pendapatan</b>: sentiasa defisit besar, maka diasingkan. <b>Pindahan semasa</b>: bayaran pindahan swasta (kiriman wang pekerja asing) dan kerajaan (biasiswa, bantuan).</p></div>
  <div class="kad-mini"><b>Akaun kewangan</b><p>Pergerakan modal: <b>pelaburan langsung</b> (jangka panjang, contoh membina kilang), <b>pelaburan portfolio</b> (sekuriti dan bon), dan <b>pelaburan lain</b>.</p></div>
</div>
<p>Imbangan pembayaran Malaysia 2002–2004 mencatat lebihan yang semakin meningkat kerana lebihan akaun semasa (barangan) yang besar; akaun kewangan bertambah baik pada 2004 hasil kemasukan pelaburan portfolio, dan rizab Bank Negara meningkat.</p>
<figure data-graf="akaun-semasa"></figure>
<div class="grid-2">
  <div class="kad-mini"><b>Membaiki imbangan barangan</b><p>Subsidi eksport (kos dan harga eksport turun, daya saing naik); cukai import (galak penggantian import); devaluasi (sesuai jika negara lain tidak turut menurunkan mata wang dan permintaan X dan M anjal); kawalan pertukaran asing.</p></div>
  <div class="kad-mini"><b>Membaiki imbangan perkhidmatan</b><p>Elaun pelaburan semula (mengurangkan defisit pendapatan pelaburan); galakan pelancongan dalam negeri dan pelancong asing; meluaskan perkhidmatan tambang dan insurans tempatan; memajukan mutu perkhidmatan lain.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Punca defisit akaun perkhidmatan dan pendapatan</span><p>Keuntungan pelaburan Malaysia di luar negara lebih kecil daripada keuntungan pelaburan asing di Malaysia; penggunaan tambang dan insurans tempatan kurang berbanding perkhidmatan luar negara.</p></div>
`
    },
    {
      no: "7.3",
      tajuk: "Kadar Pertukaran Asing",
      soalan: [
        "Apakah penentu permintaan dan penawaran mata wang asing?",
        "Bagaimanakah kadar pertukaran ditentukan dalam sistem boleh ubah dan sistem tetap?",
        "Apakah kesan terlebih nilai dan terkurang nilai?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Kadar pertukaran asing (KPA)</span><p>Harga seunit mata wang asing dalam sebutan mata wang tempatan, contohnya USD1 = RM3.60.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>USD1 = RM3.60 → RM3.90</b><p>Nilai ringgit jatuh; lebih banyak RM diperlukan untuk USD1. KPA Malaysia bertambah buruk (susut nilai).</p></div>
  <div class="kad-mini"><b>USD1 = RM3.60 → RM3.50</b><p>Nilai ringgit naik; kurang RM diperlukan untuk USD1. KPA Malaysia bertambah baik (naik nilai).</p></div>
</div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Permintaan mata wang asing (USD)</span><p>Untuk mengimport barang dan perkhidmatan dari AS, melabur di AS, serta melancong atau belajar di AS. Keluk DD mencerun ke bawah: semakin murah USD, semakin banyak diminta.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Penawaran mata wang asing (USD)</span><p>Apabila rakyat AS mengimport dari Malaysia, melabur di Malaysia, atau melancong dan belajar di Malaysia. Keluk SS mencerun ke atas.</p></div>
</div>
<h3>Sistem boleh ubah (pasaran bebas)</h3>
<p>KPA ditentukan apabila DD = SS mata wang asing. Contoh: keseimbangan S$1 = RM2.80. Jika S$1 = RM2.90, lebihan penawaran S$ menolak harga S$ turun ke RM2.80; jika S$1 = RM2.70, lebihan permintaan S$ menolak harganya naik ke RM2.80.</p>
<div class="jadual"><table><caption>Perubahan keseimbangan</caption>
<thead><tr><th>Perubahan</th><th>Kadar RM/S$</th><th>Nilai ringgit</th></tr></thead>
<tbody>
<tr><td>Import Malaysia dari Singapura naik (DD S$ naik)</td><td>RM2.80 → RM2.90</td><td>Susut nilai (depresiasi)</td></tr>
<tr><td>Import Malaysia turun (DD S$ turun)</td><td>RM2.80 → RM2.70</td><td>Naik nilai (apresiasi)</td></tr>
<tr><td>Eksport Malaysia ke Singapura naik (SS S$ naik)</td><td>RM2.80 → RM2.70</td><td>Naik nilai</td></tr>
<tr><td>Eksport Malaysia turun (SS S$ turun)</td><td>RM2.80 → RM2.90</td><td>Susut nilai</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kad-mini"><b>Kelebihan sistem boleh ubah</b><p>Keseimbangan dicapai secara automatik tanpa campur tangan; kerajaan tidak perlu menyimpan banyak rizab antarabangsa.</p></div>
  <div class="kad-mini"><b>Kelemahan</b><p>Tidak stabil akibat spekulasi, contohnya krisis kewangan Asia 1997/98: harga import dari AS naik, pengimport dan pengeksport dengan kontrak jangka panjang rugi, dan akaun semasa defisit.</p></div>
</div>
<figure data-graf="kadar-pertukaran"></figure>
<h3>Sistem kadar pertukaran tetap</h3>
<p>Kadar ditetapkan kerajaan (lebih tinggi atau lebih rendah daripada kadar pasaran) untuk memperbaiki imbangan pembayaran dan memajukan ekonomi.</p>
<div class="jadual"><table><caption>Terlebih nilai dan terkurang nilai USD</caption>
<thead><tr><th></th><th>Terlebih nilai USD (RM terkurang nilai)</th><th>Terkurang nilai USD (RM terlebih nilai)</th></tr></thead>
<tbody>
<tr><td>Kadar ditetapkan</td><td>Lebih tinggi daripada pasaran, contoh USD1 = RM3.80 berbanding RM3.70</td><td>Lebih rendah daripada pasaran</td></tr>
<tr><td>Pasaran pertukaran</td><td>Lebihan penawaran USD: kerajaan mesti membeli lebihan itu</td><td>Lebihan permintaan USD: kerajaan mesti ada rizab USD</td></tr>
<tr><td>Eksport dan import</td><td>Import lebih mahal (berkurang), eksport lebih murah (bertambah)</td><td>Import lebih murah (bertambah), eksport lebih mahal (berkurang)</td></tr>
<tr><td>Imbangan pembayaran</td><td>Bertambah baik (lebihan)</td><td>Bertambah buruk (kurangan)</td></tr>
<tr><td>Ekonomi</td><td>Industri eksport dan penggantian import berkembang; guna tenaga dan pendapatan naik</td><td>Industri eksport terjejas; guna tenaga dan pendapatan turun</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kad-mini"><b>Devaluasi</b><p>Dasar kerajaan menurunkan nilai mata wang tempatan untuk memperbaiki imbangan pembayaran: harga import naik, harga eksport turun. Berkesan jika negara lain tidak turut menurunkan nilai mata wang dan permintaan X dan M anjal.</p></div>
  <div class="kad-mini"><b>Susut nilai berbanding terkurang nilai</b><p>Punca susut nilai ialah keadaan pasaran; punca terkurang nilai ialah keputusan kerajaan. Kesannya sama: eksport naik, import turun, imbangan dagangan dan pembayaran pulih. Namun jika ekonomi sudah pada guna tenaga penuh, ia boleh menyebabkan inflasi, dan harga input import yang naik menaikkan kos pengeluaran.</p></div>
</div>
`
    }
  ],
  kad: [
    { d: "Empat sebab wujudnya <b>perdagangan antarabangsa</b>", b: "Perbezaan anugerah faktor, teknologi, kemahiran buruh dan iklim.", t: "7.1.1" },
    { d: "Definisi <b>faedah mutlak</b>", b: "Mampu mengeluarkan sesuatu barang dengan lebih cekap berbanding negara lain dengan faktor dan teknologi yang sama.", t: "7.1.2" },
    { d: "Julat kadar pertukaran Malaysia–Indonesia (faedah mutlak)", b: "0.5 pakaian ≤ 1 makanan ≤ 2.5 pakaian.", t: "7.1.2" },
    { d: "Laba Malaysia selepas PAB (1 makanan : 1 pakaian)", b: "Tambahan 10 makanan dan 15 pakaian.", t: "7.1.2" },
    { d: "Definisi <b>faedah berbanding</b>", b: "Mampu mengeluarkan sesuatu barang dengan kos lepas (harga relatif) yang lebih rendah.", t: "7.1.3" },
    { d: "Kos lepas 1 komputer: Malaysia dan Jepun", b: "Malaysia 0.8 kereta; Jepun 1.6 kereta. Malaysia mengkhusus komputer.", t: "7.1.3" },
    { d: "Mengapa Jepun masih untung walaupun hilang 220 komputer?", b: "Ia memperoleh 460 kereta, sedangkan 220 komputer hanya bernilai 352 kereta pada harga relatifnya: jimat 108 kereta.", t: "7.1.3" },
    { d: "Rumus <b>KSP nominal</b>", b: "Jumlah nilai eksport ÷ jumlah nilai import × 100.", t: "7.1.4" },
    { d: "Lima sebab <b>dasar perlindungan</b>", b: "Industri strategik, industri muda, imbangan pembayaran, mencegah lambakan, kurangkan pergantungan.", t: "7.1.4" },
    { d: "Beza tarif <b>ad valorem</b> dan <b>spesifik</b>", b: "Ad valorem: peratus harga import. Spesifik: jumlah tetap ikut kuantiti.", t: "7.1.4" },
    { d: "Kesan tarif ke atas import (negara kecil)", b: "Harga naik ke P2, pengeluaran tempatan naik, penggunaan turun, import berkurang dari Q1Q5 ke Q2Q4.", t: "7.1.4" },
    { d: "Tiga komponen <b>akaun semasa</b>", b: "Barangan dan perkhidmatan, pendapatan, pindahan semasa.", t: "7.2" },
    { d: "Imbangan keseluruhan", b: "Imbangan akaun semasa + akaun kewangan + kesilapan dan ketinggalan.", t: "7.2" },
    { d: "Langkah membaiki imbangan <b>barangan</b>", b: "Subsidi eksport, cukai import, devaluasi, kawalan pertukaran asing.", t: "7.2" },
    { d: "USD1 = RM3.60 → RM3.90: nilai ringgit?", b: "Jatuh (susut nilai): lebih banyak ringgit diperlukan untuk USD1.", t: "7.3" },
    { d: "Import Malaysia dari Singapura naik: kesan ke atas ringgit", b: "Permintaan S$ naik, RM/S$ naik (RM2.80 → RM2.90): ringgit susut nilai.", t: "7.3" },
    { d: "Kesan <b>terlebih nilai USD</b> (RM terkurang nilai)", b: "Eksport murah dan bertambah, import mahal dan berkurang, imbangan pembayaran bertambah baik.", t: "7.3" },
    { d: "Beza <b>susut nilai</b> dan <b>terkurang nilai</b>", b: "Susut nilai berpunca daripada pasaran; terkurang nilai berpunca daripada keputusan kerajaan. Kesannya sama.", t: "7.3" }
  ],
  kuiz: []
});
