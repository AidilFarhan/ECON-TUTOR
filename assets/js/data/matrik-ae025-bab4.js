/* =========================================================
   Matrikulasi · AE025 Makroekonomi · Bab 4 · Wang dan Institusi Kewangan
   Sumber: slaid kuliah AE025 "4.1 Wang" (30 slaid, termasuk 4.2 Bekalan Wang),
           "4.3 Teori Kewangan Keynes" (45), "4.4 Institusi Kewangan" (43)
           dan "4.5 Penciptaan Kredit" (40)
   ========================================================= */
EKO.daftarBab({
  id: "m2-b4",
  peringkat: "matrik",
  tingkatan: 2,
  no: 4,
  tajuk: "Wang dan Institusi Kewangan",
  warna: "var(--bab-rm20)",
  ringkas:
    "Wang mengatasi kelemahan sistem barter. Bab ini merangkumi ciri dan fungsi wang, bekalan wang M1, M2 dan M3, teori kewangan Keynes (motif permintaan wang, keseimbangan pasaran wang, perangkap kecairan), fungsi bank pusat dan bank perdagangan, serta proses penciptaan kredit.",
  seksyen: [
    {
      no: "4.1",
      tajuk: "Wang",
      soalan: ["Apakah kelemahan sistem barter?", "Apakah ciri dan fungsi wang?"],
      html: `
<div class="kotak def"><span class="kotak-label">4.1.1 Sistem barter</span><p>Sistem ekonomi tanpa wang, iaitu barang ditukar secara langsung dengan barang lain.</p></div>
<div class="jadual"><table><caption>Kelemahan sistem barter</caption>
<thead><tr><th>Kelemahan</th><th>Huraian</th></tr></thead>
<tbody>
<tr><td>Kehendak serentak</td><td>Kedua-dua pihak mesti mahukan barang pihak yang lain pada masa yang sama. Ali yang ada ayam dan mahukan itik mesti mencari orang yang ada itik dan mahukan ayam; ini memakan masa, kos dan tenaga.</td></tr>
<tr><td>Pengukuran nilai</td><td>Tiada alat ukuran piawai: seekor lembu bersamaan berapa ekor ayam?</td></tr>
<tr><td>Penyimpanan nilai</td><td>Barang seperti hasil pertanian mudah rosak dan nilainya merosot.</td></tr>
<tr><td>Pembahagian kepada unit kecil</td><td>Banyak barang tidak boleh dibahagikan, contohnya 20 ekor ayam bersamaan sebahagian kaki lembu.</td></tr>
<tr><td>Bayaran tertunda</td><td>Barang yang dibayar balik mungkin berbeza kualiti, telah merosot nilai atau rosak.</td></tr>
</tbody></table></div>
<div class="kotak def"><span class="kotak-label">4.1.2 Wang</span><p>Benda yang dikenali dan diterima umum oleh masyarakat sebagai alat perantaraan pertukaran barang dan perkhidmatan.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Ciri wang</b><p>(1) Diterima umum. (2) Tahan lama. (3) Mudah dikenali (sukar dipalsukan) dan mudah dibawa. (4) Penawaran terhad supaya nilainya stabil. (5) Boleh dibahagikan kepada unit kecil tanpa hilang nilai (RM1, 50 sen, 20 sen, 10 sen). (6) Kualiti seragam.</p></div>
  <div class="kad-mini"><b>Fungsi wang</b><p>(1) <b>Alat perantaraan pertukaran</b>: mengatasi masalah kehendak serentak. (2) <b>Alat pengukur nilai dan unit akaun</b>: nilai dinyatakan sebagai harga. (3) <b>Alat bayaran tertunda</b>: memudahkan urus niaga kredit. (4) <b>Alat penyimpan nilai</b>: tahan lama dan boleh disimpan sebagai deposit.</p></div>
</div>
`
    },
    {
      no: "4.2",
      tajuk: "Bekalan Wang",
      soalan: ["Apakah komponen M1, M2 dan M3?", "Bagaimanakah kadar pertumbuhan bekalan wang dikira?"],
      html: `
<div class="kotak def"><span class="kotak-label">Bekalan wang</span><p>Jumlah semua wang yang ditawarkan dalam ekonomi pada suatu tempoh tertentu.</p></div>
<div class="jadual"><table><caption>Tiga ukuran bekalan wang di Malaysia</caption>
<thead><tr><th>Ukuran</th><th>Komponen</th></tr></thead>
<tbody>
<tr><td><b>M1</b> (sempit)</td><td>Wang dalam edaran (syiling dan wang kertas) + deposit semasa</td></tr>
<tr><td><b>M2</b> (luas)</td><td>M1 + wang hampir (separa wang): deposit tetap dan tabungan swasta di bank perdagangan dan Bank Negara, sijil deposit boleh niaga, sijil Bank Negara</td></tr>
<tr><td><b>M3</b> (sangat luas)</td><td>M2 + deposit swasta di syarikat kewangan, bank saudagar dan syarikat diskaun</td></tr>
</tbody></table></div>
<div class="jadual"><table><caption>Bekalan wang di Malaysia, 2002–2005 (RM juta)</caption>
<thead><tr><th>Tahun</th><th class="n">Wang dalam edaran</th><th class="n">Deposit semasa</th><th class="n">M1</th><th class="n">Separa wang</th><th class="n">M2</th></tr></thead>
<tbody>
<tr><td>2002</td><td class="n">23 896.80</td><td class="n">65 175.30</td><td class="n">89 072.10</td><td class="n">294 469.80</td><td class="n">383 541.90</td></tr>
<tr><td>2003</td><td class="n">26 101.40</td><td class="n">76 002.70</td><td class="n">102 104.10</td><td class="n">323 956.80</td><td class="n">426 060.90</td></tr>
<tr><td>2004</td><td class="n">28 617.00</td><td class="n">85 651.50</td><td class="n">114 268.50</td><td class="n">419 894.20</td><td class="n">534 162.70</td></tr>
<tr><td>2005</td><td class="n">30 177.60</td><td class="n">93 845.50</td><td class="n">124 023.10</td><td class="n">492 154.80</td><td class="n">616 177.90</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Kadar pertumbuhan M1, 2005</span><div class="kira"><div class="baris">(124 023.10 − 114 268.50) ÷ 114 268.50 × 100%</div><div class="baris jawapan">= 8.54%</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Kadar pertumbuhan M2, 2005</span><div class="kira"><div class="baris">(616 177.90 − 534 162.70) ÷ 534 162.70 × 100%</div><div class="baris jawapan">= 15.35%</div></div></div>
</div>
`
    },
    {
      no: "4.3",
      tajuk: "Teori Kewangan Keynes",
      soalan: [
        "Apakah tiga motif permintaan wang menurut Keynes?",
        "Bagaimanakah keseimbangan pasaran wang dicapai dan berubah?",
        "Apakah perangkap kecairan?",
        "Bagaimanakah perubahan bekalan wang mempengaruhi pendapatan negara?"
      ],
      html: `
<h3><span class="no">4.3.1</span> Motif permintaan wang</h3>
<div class="jadual"><table><caption>Tiga motif (Keynes)</caption>
<thead><tr><th>Motif</th><th>Tujuan</th><th>Dipengaruhi oleh</th><th>Keluk terhadap kadar bunga</th></tr></thead>
<tbody>
<tr><td><b>Urus niaga</b> (MDt)</td><td>Perbelanjaan harian individu ke atas barang dan perbelanjaan firma ke atas faktor</td><td>Pendapatan (hubungan langsung)</td><td>Tegak: tidak dipengaruhi kadar bunga</td></tr>
<tr><td><b>Berjaga-jaga / awasan</b> (MDp)</td><td>Perbelanjaan luar jangka, contoh bil hospital akibat kemalangan atau pembaikan kilang</td><td>Pendapatan (hubungan langsung)</td><td>Tegak: tidak dipengaruhi kadar bunga</td></tr>
<tr><td><b>Spekulasi</b> (MDs)</td><td>Mencari keuntungan dengan membeli bon atau saham semasa harganya rendah dan menjualnya pada harga tinggi</td><td>Kadar bunga (hubungan songsang); tidak dipengaruhi pendapatan</td><td>Mencerun ke bawah</td></tr>
</tbody></table></div>
<div class="kotak fokus"><span class="kotak-label">Mengapa MDs songsang dengan kadar bunga?</span><p>Apabila r tinggi, harga bon rendah: orang ramai membeli bon, maka baki wang untuk spekulasi sedikit. Apabila r rendah, harga bon tinggi: orang ramai menjual bon dan memegang wang untuk membeli bon kemudian (laba modal).</p></div>
<div class="kotak rumus"><span class="kotak-label">4.3.2 Jumlah permintaan wang</span><div class="rumus-baris">MD = MDt + MDp + MDs</div><p>Bahagian MDt + MDp tegak; tambah MDs yang mencerun ke bawah memberi keluk MD yang mencerun ke bawah.</p></div>
<div class="kotak def"><span class="kotak-label">4.3.3 Penawaran wang</span><p>Ditentukan oleh bank pusat. Keluk MS <b>tegak</b> kerana tidak dipengaruhi kadar bunga.</p></div>
<h3><span class="no">4.3.4–4.3.5</span> Keseimbangan dan perubahannya</h3>
<p>Keseimbangan apabila MD = MS pada kadar bunga r₁. Pada kadar bunga lebih tinggi, lebihan penawaran wang menekan r turun; pada kadar bunga lebih rendah, lebihan permintaan wang (orang ramai menjual bon) menaikkan r.</p>
<div class="jadual"><table><caption>Perubahan keseimbangan</caption>
<thead><tr><th>Perubahan</th><th>Kesan pada kadar bunga</th></tr></thead>
<tbody><tr><td>MD bertambah</td><td>Naik</td></tr><tr><td>MD berkurang</td><td>Turun</td></tr><tr><td>MS bertambah</td><td>Turun</td></tr><tr><td>MS berkurang</td><td>Naik</td></tr></tbody></table></div>
<div class="kotak def"><span class="kotak-label">4.3.6 Perangkap kecairan</span><p>Keadaan apabila permintaan wang menjadi <b>anjal sempurna</b> (keluk MD mendatar), biasanya semasa kemelesetan yang teruk. Pertambahan bekalan wang tidak lagi menurunkan kadar bunga, maka pelaburan dan AE tidak berubah: hubungan antara pasaran wang dengan pasaran barang terputus.</p></div>
<h3><span class="no">4.3.7</span> Kesan perubahan bekalan wang</h3>
<div class="aliran"><span>MS bertambah</span><i>→</i><span>Kadar bunga turun</span><i>→</i><span>Pelaburan naik</span><i>→</i><span>AE naik</span><i>→</i><span>Y naik</span></div>
<div class="aliran"><span>MS berkurang</span><i>→</i><span>Kadar bunga naik</span><i>→</i><span>Pelaburan turun</span><i>→</i><span>AE turun</span><i>→</i><span>Y turun</span></div>
<figure data-graf="pasaran-wang"></figure>
`
    },
    {
      no: "4.4",
      tajuk: "Institusi Kewangan",
      soalan: ["Apakah fungsi bank pusat?", "Apakah fungsi bank perdagangan?", "Bagaimanakah rizab berkanun dikira?"],
      html: `
<h3><span class="no">4.4.1</span> Bank pusat (Bank Negara Malaysia)</h3>
<div class="jadual"><table><caption>Lima fungsi bank pusat</caption>
<thead><tr><th>Fungsi</th><th>Huraian</th></tr></thead>
<tbody>
<tr><td>(a) Mengeluarkan mata wang</td><td>Mencetak wang kertas dan mengeluarkan syiling mengikut permintaan. Edaran berlebihan boleh menyebabkan inflasi; kekurangan melambatkan pertumbuhan.</td></tr>
<tr><td>(b) Jurubank kepada kerajaan</td><td>Mengurus akaun kerajaan (hasil dan perbelanjaan), mengurus hutang negara (bil perbendaharaan, bon kerajaan), memberi pinjaman sementara apabila perbelanjaan melebihi hasil, dan memberi nasihat kewangan.</td></tr>
<tr><td>(c) Jurubank kepada institusi kewangan</td><td>Mengawal rizab berkanun dan harta mudah tunai bank perdagangan, serta menjadi <b>sumber pinjaman terakhir</b> (mendiskaun semula bil perbendaharaan, pinjaman bercagar) untuk mengekalkan keyakinan orang ramai.</td></tr>
<tr><td>(d) Melaksanakan dasar kewangan</td><td>Mengawal bekalan wang dan kredit: terlalu banyak menyebabkan inflasi, terlalu sedikit menyebabkan kemelesetan.</td></tr>
<tr><td>(e) Mengawal kadar pertukaran dan imbangan pembayaran</td><td>Menjual rizab mata wang asing jika ringgit merosot, atau menetapkan kadar pertukaran (contoh AS$1 = RM3.80); memastikan kestabilan imbangan perdagangan.</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Nisbah rizab berkanun</span><div class="rumus-baris">= rizab berkanun ÷ deposit semasa × 100%</div><p>Rizab berkanun ialah simpanan wajib bank perdagangan di Bank Negara.</p></div>
  <div class="kotak contoh"><span class="kotak-label">Contoh</span><div class="kira"><div class="baris">Deposit semasa Bank A = RM1 000; nisbah rizab = 25%</div><div class="baris jawapan">Rizab berkanun = 25% × RM1 000 = RM250</div></div></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Nisbah mudah tunai</span><div class="rumus-baris">= harta mudah tunai ÷ deposit semasa × 100%</div><p>Harta mudah tunai: tunai dalam bank sendiri, baki penjelasan di Bank Negara dan pinjaman jangka pendek kepada gedung diskaun.</p></div>
<h3><span class="no">4.4.2</span> Bank perdagangan</h3>
<p>Institusi kewangan milik swasta yang bermatlamat mendapatkan untung, dan sangat mempengaruhi bekalan wang.</p>
<div class="grid-2">
  <div class="kad-mini"><b>(a) Menerima deposit</b><p><b>Semasa</b>: dikeluarkan dengan cek, tiada faedah (dikenakan caj perkhidmatan). <b>Tabungan</b>: boleh dikeluarkan bila-bila masa, faedah lebih rendah daripada deposit tetap, tiada cek. <b>Tetap</b>: tempoh tertentu (1, 3, 6 bulan), faedah lebih tinggi, tidak boleh dikeluarkan sebelum matang.</p></div>
  <div class="kad-mini"><b>(b) Memberi pinjaman</b><p>Aktiviti paling menguntungkan: pinjaman melalui akaun semasa, kemudahan overdraf, dan mendiskaun bil pertukaran.</p></div>
  <div class="kad-mini"><b>(c) Membuat dan menerima bayaran</b><p>Membayar cek bagi pihak pelanggan dan menjelaskan cek yang dimasukkan ke akaun pelanggan.</p></div>
  <div class="kad-mini"><b>(d) Pelaburan dan (e) perkhidmatan lain</b><p>Membeli bil perbendaharaan dan sekuriti kerajaan; menjual dan membeli mata wang asing, menjual draf bank dan cek kembara, serta menyewakan peti simpanan selamat.</p></div>
</div>
`
    },
    {
      no: "4.5",
      tajuk: "Penciptaan Kredit",
      soalan: [
        "Apakah andaian proses penciptaan kredit?",
        "Bagaimanakah bank mencipta deposit dalam sistem satu bank dan banyak bank?",
        "Apakah had proses penciptaan kredit?"
      ],
      html: `
<p>Bank perdagangan boleh mencipta <b>deposit semasa</b> berkali ganda daripada deposit yang diterima, kerana ia boleh mengeluarkan cek dan pelanggannya berurus niaga dengan cek. Sebahagian deposit disimpan sebagai rizab; bakinya dipinjamkan.</p>
<div class="grid-2">
  <div class="kad-mini"><b>Deposit semasa utama</b><p>Dicipta apabila bank menerima simpanan tunai atau cek daripada pelanggan.</p></div>
  <div class="kad-mini"><b>Deposit semasa derivatif</b><p>Dicipta apabila bank memberi pinjaman kepada pelanggan, tanpa tunai atau cek dimasukkan.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">4.5.1(a) Andaian</span><p>Semua deposit ialah deposit semasa; nisbah rizab 20%; semua lebihan rizab dipinjamkan; tiada bocoran tunai daripada sistem bank; semua urus niaga dibayar dengan cek; pada mulanya tiada lebihan rizab.</p></div>
<h3>Sistem satu bank</h3>
<p>Individu A memasukkan tunai RM10 000 ke Bank Pertama. Bank menyimpan 20% (RM2 000) sebagai rizab dan meminjamkan RM8 000 kepada B dengan membuka akaun semasa B. Daripada deposit B, bank menyimpan RM1 600 dan meminjamkan RM6 400 kepada C, dan seterusnya.</p>
<div class="kotak contoh"><span class="kotak-label">Kunci kira-kira Bank Pertama selepas pinjaman kepada C</span><div class="kira">
  <div class="baris">Aset: tunai 10 000 + pinjaman B 8 000 + pinjaman C 6 400</div>
  <div class="baris">Liabiliti: deposit A 10 000 + deposit B 8 000 + deposit C 6 400</div>
  <div class="baris jawapan">Jumlah = RM24 400 di kedua-dua belah</div></div></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 16 menulis jumlah kunci kira-kira sebagai RM24 000. Jumlah yang betul ialah 10 000 + 8 000 + 6 400 = <b>RM24 400</b>. Slaid 14 dan 20 juga menulis "RM1 000 − RM200"; yang dimaksudkan ialah RM10 000 − RM2 000 = RM8 000.</p></div>
<h3>Sistem banyak bank</h3>
<p>Individu I memasukkan RM10 000 ke Bank A. Bank A menyimpan RM2 000 dan meminjamkan RM8 000 kepada X, yang memasukkannya ke Bank B. Bank B menyimpan RM1 600 dan meminjamkan RM6 400 kepada Y, yang memasukkannya ke Bank C, dan seterusnya.</p>
<div class="jadual"><table><caption>Penciptaan kredit (RM)</caption>
<thead><tr><th>Bank / peringkat</th><th class="n">Deposit</th><th class="n">Pinjaman</th><th class="n">Rizab</th></tr></thead>
<tbody>
<tr><td>A</td><td class="n">10 000</td><td class="n">8 000</td><td class="n">2 000</td></tr>
<tr><td>B</td><td class="n">8 000</td><td class="n">6 400</td><td class="n">1 600</td></tr>
<tr><td>C</td><td class="n">6 400</td><td class="n">5 120</td><td class="n">1 280</td></tr>
<tr><td>Lain-lain</td><td class="n">25 600</td><td class="n">20 480</td><td class="n">5 120</td></tr>
<tr><td><b>Jumlah</b></td><td class="n"><b>50 000</b></td><td class="n"><b>40 000</b></td><td class="n"><b>10 000</b></td></tr>
</tbody></table></div>
<div class="kotak rumus"><span class="kotak-label">4.5.1(c) Rumus</span><div class="rumus-baris">Pengganda wang = 1 ÷ nisbah rizab = 1 ÷ 20% = 5</div><div class="rumus-baris">Jumlah deposit = deposit asal × pengganda = 10 000 × 5 = RM50 000</div><div class="rumus-baris">Jumlah pinjaman (kredit) = pinjaman asal × pengganda = 8 000 × 5 = RM40 000</div><div class="rumus-baris">Jumlah rizab = rizab asal × pengganda = 2 000 × 5 = RM10 000</div><div class="rumus-baris">Tambahan penawaran wang = 50 000 − 10 000 = RM40 000</div></div>
<div class="kotak tip"><span class="kotak-label">Tunai atau cek?</span><p>Jika deposit asal ialah <b>tunai</b>, tambahan bekalan wang ialah RM40 000 (tunai yang masuk ke bank asalnya sudah dikira dalam M1). Jika deposit asal ialah <b>cek</b>, tambahan bekalan wang ialah RM50 000. Perubahan M1 = perubahan wang dalam edaran + perubahan deposit semasa.</p></div>
<div class="kotak fokus"><span class="kotak-label">4.5.1(d) Had penciptaan kredit</span><p>(a) Bocoran tunai: peminjam menunaikan cek dan berbelanja dengan tunai. (b) Bank pusat menaikkan nisbah rizab. (c) Suasana pelaburan tidak baik (kemelesetan, kadar faedah tinggi). (d) Wang dalam edaran dikurangkan oleh bank pusat. (e) Urus niaga tidak menggunakan cek. (f) Pelabur tidak mampu menyediakan cagaran.</p></div>
`
    }
  ],
  kad: [
    { d: "Lima kelemahan <b>sistem barter</b>", b: "Kehendak serentak, pengukuran nilai, penyimpanan nilai, pembahagian kepada unit kecil, bayaran tertunda.", t: "4.1" },
    { d: "Empat <b>fungsi wang</b>", b: "Alat perantaraan pertukaran, pengukur nilai dan unit akaun, alat bayaran tertunda, alat penyimpan nilai.", t: "4.1" },
    { d: "Komponen <b>M1</b>", b: "Wang dalam edaran + deposit semasa.", t: "4.2" },
    { d: "Komponen <b>M2</b>", b: "M1 + wang hampir (deposit tetap dan tabungan, sijil deposit boleh niaga, sijil Bank Negara).", t: "4.2" },
    { d: "Pertumbuhan M1 2005 (114 268.50 → 124 023.10)", b: "8.54%.", t: "4.2" },
    { d: "Tiga motif permintaan wang Keynes", b: "Urus niaga, berjaga-jaga (awasan) dan spekulasi.", t: "4.3" },
    { d: "Motif yang dipengaruhi <b>kadar bunga</b>", b: "Spekulasi: hubungan songsang. Urus niaga dan berjaga-jaga dipengaruhi pendapatan.", t: "4.3" },
    { d: "Mengapa keluk MS tegak?", b: "Bekalan wang ditentukan bank pusat dan tidak dipengaruhi kadar bunga.", t: "4.3" },
    { d: "Maksud <b>perangkap kecairan</b>", b: "Permintaan wang anjal sempurna; tambahan bekalan wang tidak menurunkan kadar bunga, maka I, AE dan Y tidak berubah.", t: "4.3" },
    { d: "Rantaian kesan MS bertambah", b: "r turun → I naik → AE naik → Y naik.", t: "4.3" },
    { d: "Lima fungsi <b>bank pusat</b>", b: "Mengeluarkan mata wang, jurubank kerajaan, jurubank institusi kewangan, melaksanakan dasar kewangan, mengawal kadar pertukaran dan imbangan pembayaran.", t: "4.4" },
    { d: "Maksud <b>sumber pinjaman terakhir</b>", b: "Bank pusat memberi pinjaman kepada bank perdagangan yang kekurangan tunai untuk mengekalkan keyakinan orang ramai.", t: "4.4" },
    { d: "Rizab berkanun: deposit RM1 000, nisbah 25%", b: "RM250.", t: "4.4" },
    { d: "Beza deposit semasa, tabungan dan tetap", b: "Semasa: cek, tiada faedah. Tabungan: bila-bila masa, faedah rendah. Tetap: tempoh tertentu, faedah tertinggi.", t: "4.4" },
    { d: "Beza deposit <b>utama</b> dan <b>derivatif</b>", b: "Utama: daripada simpanan tunai atau cek. Derivatif: dicipta apabila bank memberi pinjaman.", t: "4.5" },
    { d: "Deposit RM10 000, nisbah rizab 20%", b: "Pengganda 5; jumlah deposit RM50 000; kredit RM40 000; rizab RM10 000.", t: "4.5" },
    { d: "Enam had penciptaan kredit", b: "Bocoran tunai, nisbah rizab dinaikkan, suasana pelaburan lemah, wang dalam edaran dikurangkan, urus niaga tanpa cek, tiada cagaran.", t: "4.5" }
  ],
  kuiz: []
});
