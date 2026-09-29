/* =========================================================
   STPM Penggal 2 · Bab 4 · Wang, Bank dan Dasar Kewangan
   Sumber: Modul PdP Ekonomi P2 Makroekonomi, Bab 4
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p2-b4",
  peringkat: "stpm",
  tingkatan: 2,
  no: 4,
  tajuk: "Wang, Bank dan Dasar Kewangan",
  warna: "var(--bab-rm20)",
  ringkas:
    "Wang memudahkan urus niaga dan bank perdagangan mencipta kredit. Bab ini merangkumi fungsi dan nilai wang, penawaran wang M1 dan M2, penciptaan kredit, Teori Kuantiti Wang Fisher, Teori Keutamaan Kecairan Keynes, keseimbangan pasaran wang, bank pusat serta dasar kewangan.",
  seksyen: [
    {
      no: "4.1",
      tajuk: "Wang",
      soalan: ["Apakah fungsi wang?", "Bagaimanakah nilai wang berkait dengan indeks harga?"],
      html: `
<div class="kotak def"><span class="kotak-label">Wang</span><p>Satu benda atau alat yang diterima umum sebagai alat pertukaran dan perantaraan. Ciri: mudah dibawa, tahan lama, bentuk seragam, nilai stabil dan diterima umum.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Alat perantaraan pertukaran</b><p>Untuk membeli barang dan perkhidmatan; mengatasi masalah kehendak serentak dalam sistem barter.</p></div>
  <div class="kad-mini"><b>Alat pengukur nilai</b><p>Nilai barang ditunjukkan oleh harganya; menyelesaikan masalah penentuan nilai.</p></div>
  <div class="kad-mini"><b>Alat penyimpan nilai</b><p>Wang boleh disimpan kerana nilainya stabil dan tahan lama; mengatasi masalah barang mudah rosak.</p></div>
  <div class="kad-mini"><b>Alat bayaran tertunda</b><p>Membolehkan urus niaga secara kredit; tidak dapat dilaksanakan dalam sistem barter.</p></div>
</div>
<div class="kotak rumus"><span class="kotak-label">Nilai wang</span><div class="rumus-baris">Indeks nilai wang = <span class="pecahan"><span>IHP tahun asas</span><span>IHP tahun semasa</span></span> × 100</div><p>Indeks nilai wang <b>kurang daripada 100</b>: nilai wang merosot kerana harga meningkat. <b>Lebih daripada 100</b>: nilai wang meningkat, lebih banyak barang dapat dibeli.</p></div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Modul asal menyatakan tafsiran ini secara terbalik. Contoh: IHP tahun semasa 125 (asas 100) memberi indeks nilai wang 80, iaitu nilai wang merosot 20%.</p></div>
<div class="kotak contoh"><span class="kotak-label">Panduan menjawab: inflasi dan fungsi wang</span><p><b>Alat perantaraan pertukaran:</b> inflasi menurunkan nilai wang dan kuasa beli; masyarakat mungkin beralih kepada pertukaran barang dengan barang. <b>Alat penyimpan nilai:</b> nilai wang simpanan berkurang sedangkan nilai aset tetap meningkat, jadi orang ramai menyimpan kekayaan dalam bentuk bangunan, rumah dan tanah.</p></div>
`
    },
    {
      no: "4.2",
      tajuk: "Penawaran Wang dan Penciptaan Kredit",
      soalan: [
        "Apakah komponen M1 dan M2?",
        "Bagaimanakah bank perdagangan mencipta kredit?",
        "Apakah andaian dan rumusan Teori Kuantiti Wang Fisher?"
      ],
      html: `
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">M1</span><p>Wang dalam edaran (syiling dan wang kertas) + deposit permintaan (simpanan semasa yang membolehkan penggunaan cek).</p></div>
  <div class="kotak def"><span class="kotak-label">M2</span><p>M1 + separa wang (wang hampir): akaun simpanan tabungan dan simpanan tetap.</p></div>
</div>
<h3>Penciptaan kredit oleh bank perdagangan</h3>
<p><b>Andaian:</b> urus niaga menggunakan cek; nisbah rizab tunai 20%; semua lebihan rizab dipinjamkan; tiada bocoran tunai; deposit asal RM10 000.</p>
<div class="jadual"><table><caption>Proses penciptaan kredit (nisbah rizab 20%)</caption>
<thead><tr><th>Peringkat</th><th class="n">Deposit baharu (RM)</th><th class="n">Pinjaman (RM)</th><th class="n">Rizab (RM)</th></tr></thead>
<tbody>
<tr><td>I (Bank X)</td><td class="n">10 000</td><td class="n">8 000</td><td class="n">2 000</td></tr>
<tr><td>II (Bank Y)</td><td class="n">8 000</td><td class="n">6 400</td><td class="n">1 600</td></tr>
<tr><td>III</td><td class="n">6 400</td><td class="n">5 120</td><td class="n">1 280</td></tr>
<tr><td>IV</td><td class="n">5 120</td><td class="n">4 096</td><td class="n">1 024</td></tr>
<tr><td>…</td><td class="n">…</td><td class="n">…</td><td class="n">…</td></tr>
<tr><td><b>Jumlah</b></td><td class="n"><b>50 000</b></td><td class="n"><b>40 000</b></td><td class="n"><b>10 000</b></td></tr>
</tbody></table></div>
<div class="kotak rumus"><span class="kotak-label">Rumus</span>
<div class="rumus-baris">Pengganda wang = <span class="pecahan"><span>1</span><span>Nisbah rizab</span></span> = <span class="pecahan"><span>1</span><span>0.2</span></span> = 5</div>
<div class="rumus-baris">Jumlah deposit = 5 × 10 000 = RM50 000</div>
<div class="rumus-baris">Jumlah pinjaman = 5 × 8 000 = RM40 000</div>
<div class="rumus-baris">Jumlah rizab = 5 × 2 000 = RM10 000</div></div>
<p>Penawaran wang bertambah RM50 000 − RM10 000 = <b>RM40 000</b> (kredit baharu yang dicipta).</p>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Rizab peringkat II ialah 20% × 8 000 = <b>RM1 600</b> (modul asal menulis 1 500).</p></div>
<div class="jadual"><table><caption>Faktor mempengaruhi penciptaan kredit</caption>
<thead><tr><th>Faktor</th><th>Kesan</th></tr></thead>
<tbody>
<tr><td>Nisbah rizab</td><td>Lebih tinggi → kurang pinjaman → penciptaan kredit lebih kecil</td></tr>
<tr><td>Kadar bank</td><td>Lebih tinggi → kadar bunga pinjaman dan kos meminjam naik → pinjaman berkurang</td></tr>
<tr><td>Keperluan cagaran</td><td>Syarat cagaran menyukarkan pinjaman</td></tr>
<tr><td>Kurang minat meminjam</td><td>Contoh semasa ekonomi meleset</td></tr>
<tr><td>Bank memegang lebihan rizab</td><td>Tidak semua lebihan dipinjamkan</td></tr>
</tbody></table></div>
<div class="kotak tip"><span class="kotak-label">Tip esei</span><p>Mengapa kredit tidak berganda sepenuhnya (contoh 10 kali bagi nisbah 10%)? Bocoran wang tunai, bank mencatu kredit untuk keteguhan, syarat cagaran ketat, kurang minat meminjam, serta ekonomi dan politik tidak stabil.</p></div>
<h3>Teori Kuantiti Wang Fisher</h3>
<div class="kotak rumus"><span class="kotak-label">Persamaan pertukaran</span><div class="rumus-baris">MV = PT</div><p>M = bekalan wang (M1), V = halaju pusingan wang, P = tingkat harga umum, T = jumlah urus niaga.</p></div>
<p>Teori klasik mengandaikan <b>V tetap</b> (sistem pembayaran gaji tetap) dan <b>T tetap</b> (ekonomi sentiasa pada guna tenaga penuh). Maka apabila M bertambah 10%, P turut naik 10%; M turun 10%, P turun 10%.</p>
<div class="jadual"><table><caption>Panduan menjawab · Bahagian C: Malaysia 2008–2011</caption>
<thead><tr><th>Tahun</th><th class="n">M1 (RM juta)</th><th class="n">IHP</th><th class="n">Pertumbuhan M1 (%)</th><th class="n">Inflasi (%)</th></tr></thead>
<tbody>
<tr><td>2008</td><td class="n">78 216.4</td><td class="n">133.7</td><td class="n">–</td><td class="n">–</td></tr>
<tr><td>2009</td><td class="n">80 728.2</td><td class="n">137.8</td><td class="n">3.21</td><td class="n">3.07</td></tr>
<tr><td>2010</td><td class="n">89 071.5</td><td class="n">140.3</td><td class="n">10.34</td><td class="n">1.81</td></tr>
<tr><td>2011</td><td class="n">92 628.3</td><td class="n">148.2</td><td class="n">3.99</td><td class="n">5.63</td></tr>
</tbody></table></div>
<p>Data ini <b>tidak</b> menepati Teori Kuantiti Wang: peratus pertambahan bekalan wang tidak sama dengan peratus kenaikan harga.</p>
`
    },
    {
      no: "4.3 & 4.4",
      tajuk: "Permintaan Wang dan Keseimbangan Pasaran Wang",
      soalan: [
        "Apakah tiga tujuan permintaan wang menurut Keynes?",
        "Apakah perangkap kecairan?",
        "Bagaimanakah perubahan Md dan MS mempengaruhi kadar bunga dan pendapatan negara?"
      ],
      html: `
<div class="jadual"><table><caption>Teori Keutamaan Kecairan Keynes</caption>
<thead><tr><th>Tujuan</th><th>Maksud</th><th>Dipengaruhi oleh</th></tr></thead>
<tbody>
<tr><td><b>Urus niaga</b></td><td>Membeli barang dan perkhidmatan</td><td>Pendapatan (hubungan positif)</td></tr>
<tr><td><b>Awasan</b></td><td>Kecemasan seperti bayaran perubatan</td><td>Pendapatan (hubungan positif)</td></tr>
<tr><td><b>Spekulasi</b></td><td>Untung modal: beli bon ketika harga rendah (kadar bunga tinggi), jual ketika harga tinggi (kadar bunga rendah)</td><td>Kadar bunga (hubungan negatif)</td></tr>
</tbody></table></div>
<div class="kotak def"><span class="kotak-label">Perangkap kecairan</span><p>Pada kadar bunga paling rendah, harga bon paling tinggi; orang ramai menjual semua bon dan memegang wang tunai. Keluk permintaan wang untuk spekulasi menjadi <b>anjal sempurna</b> (mendatar). Pertambahan penawaran wang tidak lagi mengubah kadar bunga.</p></div>
<p><b>Keluk permintaan wang (Md)</b> ialah jumlah permintaan untuk urus niaga, awasan dan spekulasi. <b>Keluk penawaran wang (MS)</b> ditentukan bank pusat, tidak dipengaruhi kadar bunga, maka <b>tegak</b>.</p>
<p><b>Keseimbangan:</b> Md = MS pada kadar bunga r₀. Lebihan penawaran wang → orang ramai membeli bon → harga bon naik → kadar bunga turun. Lebihan permintaan wang → orang ramai menjual bon → harga bon turun → kadar bunga naik.</p>
<figure data-graf="pasaran-wang"></figure>
<div class="jadual"><table><caption>Kesan perubahan pasaran wang</caption>
<thead><tr><th>Perubahan</th><th>Kadar bunga</th><th>Kuantiti wang</th></tr></thead>
<tbody>
<tr><td>MS bertambah</td><td>Turun</td><td>Bertambah</td></tr>
<tr><td>MS berkurang</td><td>Naik</td><td>Berkurang</td></tr>
<tr><td>Md berkurang</td><td>Turun</td><td>Tetap</td></tr>
<tr><td>Md bertambah</td><td>Naik</td><td>Tetap</td></tr>
</tbody></table></div>
<div class="aliran"><span>MS bertambah</span><i>→</i><span>Kadar bunga turun</span><i>→</i><span>Pelaburan naik (MEI)</span><i>→</i><span>AE dan AD naik</span><i>→</i><span>Y naik (dan P naik dalam AD–AS)</span></div>
`
    },
    {
      no: "4.5",
      tajuk: "Bank Pusat dan Dasar Kewangan",
      soalan: ["Apakah fungsi bank pusat?", "Bagaimanakah alat dasar kewangan digunakan semasa inflasi dan pengangguran?"],
      html: `
<div class="grid-3">
  <div class="kad-mini"><b>Mengeluarkan mata wang</b><p>Mencetak syiling dan wang kertas mengikut keperluan ekonomi.</p></div>
  <div class="kad-mini"><b>Jurubank kepada kerajaan</b><p>Mentadbir akaun kerajaan, memberi pendahuluan, mengurus hutang kerajaan (jualan bon), memberi nasihat kewangan.</p></div>
  <div class="kad-mini"><b>Jurubank kepada bank perdagangan</b><p>Menjamin kestabilan sistem kewangan, pelesenan dan pemeriksaan, mengawal melalui dasar kewangan, akaun penjelasan cek, pemberi pinjaman terakhir.</p></div>
</div>
<div class="kotak def"><span class="kotak-label">Dasar kewangan</span><p>Dasar bank pusat mengawal <b>penawaran wang</b> atau <b>kadar bunga</b> untuk mengatasi pengangguran, kemelesetan dan inflasi.</p></div>
<div class="jadual"><table><caption>Alat dasar kewangan</caption>
<thead><tr><th>Alat</th><th>Semasa inflasi (menguncup)</th><th>Semasa pengangguran (mengembang)</th></tr></thead>
<tbody>
<tr><td colspan="3"><b>Kuantitatif</b></td></tr>
<tr><td>Operasi pasaran terbuka</td><td>Jual sekuriti kerajaan</td><td>Beli sekuriti kerajaan</td></tr>
<tr><td>Nisbah rizab berkanun (disimpan di bank pusat)</td><td>Naikkan</td><td>Turunkan</td></tr>
<tr><td>Nisbah rizab tunai</td><td>Naikkan</td><td>Turunkan</td></tr>
<tr><td>Kadar diskaun (kadar bank)</td><td>Naikkan</td><td>Turunkan</td></tr>
<tr><td>Kadar bunga semalaman</td><td>Naikkan</td><td>Turunkan</td></tr>
<tr><td colspan="3"><b>Kualitatif</b></td></tr>
<tr><td>Kawalan kredit terpilih: syarat margin</td><td>Naikkan (contoh tunai 80 : pinjaman 20)</td><td>Turunkan (contoh 20 : 80)</td></tr>
<tr><td>Kawalan kredit terpilih: kredit ansuran</td><td>Naikkan bayaran pendahuluan, pendekkan tempoh</td><td>Turunkan bayaran pendahuluan, panjangkan tempoh</td></tr>
<tr><td>Kawalan gadai janji</td><td>Ketatkan syarat</td><td>Longgarkan syarat</td></tr>
<tr><td>Pujukan moral</td><td>Pujuk bank kurangkan pinjaman tidak produktif</td><td>Pujuk bank tingkatkan pinjaman</td></tr>
</tbody></table></div>
<div class="aliran"><span>Dasar menguncup</span><i>→</i><span>Penawaran wang turun</span><i>→</i><span>Kadar bunga naik</span><i>→</i><span>Pelaburan, AE, AD turun</span><i>→</i><span>Inflasi turun</span></div>
`
    }
  ],
  kad: [
    { d: "Maksud <b>wang</b>", b: "Alat yang diterima umum sebagai alat pertukaran dan perantaraan.", t: "4.1" },
    { d: "Empat <b>fungsi wang</b>", b: "Alat perantaraan pertukaran, alat pengukur nilai, alat penyimpan nilai, alat bayaran tertunda.", t: "4.1" },
    { d: "Fungsi wang yang mengatasi masalah <b>kehendak serentak</b>", b: "Alat perantaraan pertukaran.", t: "4.1" },
    { d: "Rumus <b>indeks nilai wang</b>", b: "IHP tahun asas ÷ IHP tahun semasa × 100. Kurang daripada 100: nilai wang merosot.", t: "4.1" },
    { d: "Komponen <b>M1</b> dan <b>M2</b>", b: "M1: wang dalam edaran + deposit permintaan. M2: M1 + wang hampir (simpanan tabungan dan tetap).", t: "4.2" },
    { d: "Deposit RM10 000, nisbah rizab 20%: penciptaan kredit", b: "Pengganda 5; jumlah deposit RM50 000; pinjaman RM40 000; rizab RM10 000.", t: "4.2" },
    { d: "Rumus <b>pengganda wang</b>", b: "1 ÷ nisbah rizab.", t: "4.2" },
    { d: "Lima faktor mempengaruhi <b>penciptaan kredit</b>", b: "Nisbah rizab, kadar bank, keperluan cagaran, minat meminjam, bank memegang lebihan rizab.", t: "4.2" },
    { d: "Persamaan <b>Fisher</b> dan andaiannya", b: "MV = PT; V dan T tetap, maka perubahan M menyebabkan perubahan P dengan kadar yang sama.", t: "4.2" },
    { d: "Tiga tujuan <b>permintaan wang</b> Keynes", b: "Urus niaga, awasan (bergantung pendapatan) dan spekulasi (bergantung kadar bunga).", t: "4.3" },
    { d: "Hubungan kadar bunga dan <b>harga bon</b>", b: "Songsang: kadar bunga naik, harga bon turun.", t: "4.3" },
    { d: "Maksud <b>perangkap kecairan</b>", b: "Pada kadar bunga paling rendah, orang ramai memegang wang tunai; Md spekulasi anjal sempurna, MS bertambah tidak menurunkan kadar bunga.", t: "4.3" },
    { d: "Bentuk keluk <b>penawaran wang</b>", b: "Tegak (tak anjal sempurna) kerana ditentukan bank pusat, bukan kadar bunga.", t: "4.3" },
    { d: "Kesan <b>MS bertambah</b> ke atas ekonomi", b: "Kadar bunga turun, pelaburan naik, AE dan AD naik, pendapatan negara naik.", t: "4.4" },
    { d: "Kesan <b>Md bertambah</b> ke atas kadar bunga", b: "Lebihan permintaan wang, orang ramai menjual bon, harga bon turun, kadar bunga naik.", t: "4.4" },
    { d: "Tiga fungsi <b>bank pusat</b>", b: "Mengeluarkan mata wang, jurubank kepada kerajaan, jurubank kepada bank perdagangan.", t: "4.5" },
    { d: "Maksud <b>dasar kewangan</b>", b: "Dasar bank pusat mengawal penawaran wang atau kadar bunga untuk menstabilkan ekonomi.", t: "4.5" },
    { d: "Lima alat dasar kewangan <b>kuantitatif</b>", b: "Operasi pasaran terbuka, nisbah rizab berkanun, nisbah rizab tunai, kadar diskaun, kadar bunga semalaman.", t: "4.5" },
    { d: "Alat dasar kewangan <b>kualitatif</b>", b: "Kawalan kredit terpilih (syarat margin, kredit ansuran, gadai janji) dan pujukan moral.", t: "4.5" },
    { d: "Operasi pasaran terbuka semasa <b>inflasi</b>", b: "Bank pusat menjual sekuriti kerajaan: penawaran wang turun, kadar bunga naik, pelaburan turun, inflasi turun.", t: "4.5" }
  ],
  kuiz: []
});
