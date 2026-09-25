/* =========================================================
   Kertas Percubaan SPM Kelantan 2025 · Ekonomi 3767
   Modul Koleksi Item Peperiksaan Percubaan SPM 2025.
   Soalan ditaip semula daripada kertas asal; jawapan dan isi
   markah mengikut peraturan pemarkahan (skema) dalam repo.
   ========================================================= */
(function () {
  "use strict";
  var E = window.EKO;
  var G = E.graf;

  /* ---------- rajah statik ---------- */
  var KECIL = { lebar: 300, tinggi: 220, x: [0, 10], y: [0, 10] };
  function rajah(o) {
    return Object.assign({}, KECIL, o);
  }

  // Rajah 1 (S6) dan Rajah 7(a): permintaan bertambah pada harga tetap
  var RAJAH_DD_KANAN = {
    lebar: 360,
    tinggi: 250,
    x: [0, 10],
    y: [0, 10],
    labelX: "Kuantiti (unit)",
    labelY: "Harga (RM)",
    keluk: [
      { dari: [1, 8], ke: [8, 1], kelas: "d nipis", label: "D₀", dx: 4, dy: 4 },
      { dari: [3, 8], ke: [9.6, 1.4], kelas: "d", label: "D₁", dx: 4, dy: 4 }
    ],
    panduan: [
      { q: 4, p: 5, ly: "P₀", lx: "Q₀" },
      { q: 6, p: 5, lx: "Q₁" }
    ],
    panah: [{ dari: [2.8, 6.5], ke: [4.2, 6.5], kelas: "d" }]
  };

  // Rajah 2 (S9): permintaan bertambah, penawaran tetap
  var RAJAH_S9 = {
    lebar: 360,
    tinggi: 250,
    x: [0, 10],
    y: [0, 10],
    keluk: [
      { dari: [1, 8], ke: [8, 1], kelas: "d nipis", label: "D₀", dx: 4, dy: 4 },
      { dari: [3, 8], ke: [9.6, 1.4], kelas: "d", label: "D₁", dx: 4, dy: 4 },
      { dari: [1, 1], ke: [9, 9], kelas: "s", label: "S", dx: 4, dy: 0 }
    ],
    panah: [{ dari: [1.7, 7.6], ke: [3.1, 7.6], kelas: "d" }]
  };

  // Rajah 3 (S12): keluk penawaran barang Y
  var RAJAH_S12 = {
    lebar: 360,
    tinggi: 250,
    x: [0, 20],
    y: [0, 500],
    labelX: "Kuantiti ditawarkan (unit)",
    labelY: "Harga (RM)",
    keluk: [{ dari: [6, 40], ke: [17, 480], kelas: "s", label: "S", dx: 4, dy: 0 }],
    panduan: [
      { q: 10, p: 200, ly: "200", lx: "10" },
      { q: 15, p: 400, ly: "400", lx: "15" }
    ],
    panah: [{ dari: [2.6, 230], ke: [2.6, 370], kelas: "" }]
  };

  // S31: empat pilihan rajah
  var RAJAH_S31 = [
    rajah({
      label: "A",
      keluk: [
        { dari: [1.5, 8.5], ke: [8.5, 1.5], kelas: "d", label: "D₀", dx: 3, dy: 4 },
        { dari: [2, 1], ke: [9, 8], kelas: "s nipis", label: "S₀", dx: 3, dy: 0 },
        { dari: [1, 2], ke: [7.8, 8.8], kelas: "s", label: "S₁", dx: 3, dy: 0 }
      ],
      panduan: [
        { q: 5.5, p: 4.5, ly: "P1", lx: "Q2" },
        { q: 4.5, p: 5.5, ly: "P2", lx: "Q1" }
      ],
      titik: [
        { q: 5.5, p: 4.5, label: "E₀", dx: 8, dy: 4 },
        { q: 4.5, p: 5.5, label: "E₁", dx: -2, dy: -9, anchor: "end" }
      ],
      panah: [{ dari: [7.3, 6.6], ke: [5.9, 6.6], kelas: "s" }]
    }),
    rajah({
      label: "B",
      keluk: [
        { dari: [1.5, 8.5], ke: [8.5, 1.5], kelas: "d", label: "D₀", dx: 3, dy: 4 },
        { dari: [1, 2], ke: [7.8, 8.8], kelas: "s nipis", label: "S₀", dx: 3, dy: 0 },
        { dari: [2, 1], ke: [9, 8], kelas: "s", label: "S₁", dx: 3, dy: 0 }
      ],
      panduan: [
        { q: 4.5, p: 5.5, ly: "P2", lx: "Q1" },
        { q: 5.5, p: 4.5, ly: "P1", lx: "Q2" }
      ],
      titik: [
        { q: 4.5, p: 5.5, label: "E₀", dx: -2, dy: -9, anchor: "end" },
        { q: 5.5, p: 4.5, label: "E₁", dx: 8, dy: 4 }
      ],
      panah: [{ dari: [5.9, 6.6], ke: [7.3, 6.6], kelas: "s" }]
    }),
    rajah({
      label: "C",
      keluk: [
        { dari: [1.5, 8.5], ke: [8.5, 1.5], kelas: "d nipis", label: "D₀", dx: 3, dy: 4 },
        { dari: [1, 7], ke: [7, 1], kelas: "d", label: "D₁", dx: 3, dy: 4 },
        { dari: [2, 1], ke: [9, 8], kelas: "s", label: "S₀", dx: 3, dy: 0 }
      ],
      panduan: [
        { q: 5.5, p: 4.5, ly: "P2", lx: "Q2" },
        { q: 4.5, p: 3.5, ly: "P1", lx: "Q1" }
      ],
      titik: [
        { q: 5.5, p: 4.5, label: "E₀", dx: 8, dy: -2 },
        { q: 4.5, p: 3.5, label: "E₁", dx: -4, dy: 14, anchor: "end" }
      ],
      panah: [{ dari: [3.6, 6.4], ke: [2.4, 5.6], kelas: "d" }]
    }),
    rajah({
      label: "D",
      keluk: [
        { dari: [1.5, 8.5], ke: [8.5, 1.5], kelas: "d nipis", label: "D₀", dx: 3, dy: 4 },
        { dari: [3.5, 8.5], ke: [9.5, 2.5], kelas: "d", label: "D₁", dx: 3, dy: 4 },
        { dari: [2, 1], ke: [9, 8], kelas: "s", label: "S₀", dx: 3, dy: 0 }
      ],
      panduan: [
        { q: 5.5, p: 4.5, ly: "P1", lx: "Q1" },
        { q: 6.5, p: 5.5, ly: "P2", lx: "Q2" }
      ],
      titik: [
        { q: 5.5, p: 4.5, label: "E₀", dx: -4, dy: 14, anchor: "end" },
        { q: 6.5, p: 5.5, label: "E₁", dx: 8, dy: -2 }
      ],
      panah: [{ dari: [2.6, 6.2], ke: [3.8, 7.0], kelas: "d" }]
    })
  ];

  /* ---------- rangka HTML kecil ---------- */
  // Stem disusun seperti kertas asal: ayat pengenalan, petikan, soalan.
  function p(teks) {
    return "<p>" + teks + "</p>";
  }
  function petik(html) {
    return '<div class="petik">' + html + "</div>";
  }
  function aliran(senarai, pemisah) {
    return '<div class="aliran" style="justify-content:center">' + senarai.map(function (x) {
      return "<span>" + x + "</span>";
    }).join(pemisah ? "<i>" + pemisah + "</i>" : "") + "</div>";
  }
  function petikan(tajuk, isi, sumber) {
    return (tajuk ? '<b class="tajuk-petikan">' + tajuk + "</b>" : "") + "<p>" + isi + "</p>" + (sumber ? '<p class="sumber" style="text-align:right">' + sumber + "</p>" : "");
  }
  function roman(senarai) {
    return '<ol class="roman">' + senarai.map(function (x) {
      return "<li>" + x + "</li>";
    }).join("") + "</ol>";
  }
  var DUA = ["I dan II", "I dan IV", "II dan III", "III dan IV"];
  var BS = ["I Betul, II Salah", "I Salah, II Betul", "I Betul, II Betul", "I Salah, II Salah"];
  function pernyataan(i, ii) {
    return p("Tentukan sama ada pernyataan berikut betul atau salah.") + roman([i, ii]);
  }

  /* =========================================================
     KERTAS 1 (3767/1) · 40 soalan objektif
     ========================================================= */
  E.daftarSet({
    id: "kel25-k1",
    label: "Kertas Percubaan SPM Kelantan 2025 · Kertas 1",
    labelPendek: "Percubaan Kelantan 2025 K1",
    soalan: [
      {
        bab: "t4-b1",
        s: "Pernyataan manakah yang betul tentang pilihan?",
        p: ["Isi rumah memilih produk pilihan yang terbaik", "Ketiga-tiga unit ekonomi mempunyai objektif pilihan yang sama", "Firma terpaksa memilih output yang dapat meminimumkan kos", "Kerajaan memilih barang yang memberikan kebajikan kepada rakyat"],
        j: 2,
        e: "Skema memberi C: firma membuat pilihan untuk memaksimumkan untung, iaitu memilih output dan kaedah yang meminimumkan kos. A kurang tepat kerana isi rumah memilih untuk memaksimumkan kepuasan; B salah kerana objektif setiap unit ekonomi berbeza. Nota: D juga menghampiri objektif kerajaan (memaksimumkan kebajikan), tetapi jawapan skema ialah C."
      },
      {
        bab: "t4-b1",
        s: "Encik Rosman ialah pemilik Syarikat Jalur Emas. Beliau terpaksa memilih antara dua produk, iaitu produk A dan produk B. Mengapakah Encik Rosman terpaksa membuat pilihan?",
        p: ["Tidak dapat memilih produk A dan produk B secara serentak", "Kekurangan sumber ekonomi untuk mengeluarkan kedua-duanya", "Mendapati kos lepasnya ialah produk kedua yang terpaksa dilepaskan", "Terpaksa membuat pilihan barang terbaik yang dapat memaksimumkan untung"],
        j: 1,
        e: "Punca pilihan ialah kekurangan: sumber terhad tidak mencukupi untuk mengeluarkan kedua-dua produk. C ialah kos lepas yang timbul selepas pilihan dibuat, bukan sebab pilihan."
      },
      {
        bab: "t4-b1",
        s: "Pernyataan manakah yang betul tentang keluk kemungkinan pengeluaran (KKP)?",
        p: ["Pembaziran berlaku pada titik di luar keluk", "Sumber ekonomi yang digunakan tidak terhad", "Ekonomi tidak berupaya mencapai titik di luar keluk", "Keluk menerangkan perkaitan kekurangan dan pilihan"],
        j: 2,
        e: "Titik di luar KKP tidak dapat dicapai dengan sumber dan teknologi sedia ada. A salah kerana pembaziran berlaku pada titik di dalam keluk; B salah kerana sumber adalah terhad. Nota: D turut menggambarkan konsep KKP, tetapi jawapan skema ialah C."
      },
      {
        bab: "t4-b1",
        s: "Syarikat Reza Sdn Bhd mempunyai pekerja seramai 10 orang yang mengeluarkan 1 000 paket laksa kering setiap hari. Apakah masalah asas ekonomi yang belum diselesaikan oleh syarikat tersebut?",
        p: ["Apa yang hendak dikeluarkan", "Berapa yang hendak dikeluarkan", "Bagaimana hendak dikeluarkan", "Untuk siapa hendak dikeluarkan"],
        j: 3,
        e: "Syarikat sudah menentukan apa (laksa kering), berapa (1 000 paket sehari) dan bagaimana (10 pekerja). Yang belum diputuskan ialah untuk siapa barang itu dikeluarkan."
      },
      {
        bab: "t4-b2",
        s: p("Maklumat di bawah menunjukkan hubungan antara dua barang.") + petik("Apabila harga barang X meningkat, kuantiti permintaan barang Y jatuh.") + p("Pernyataan manakah yang betul?"),
        p: ["Barang X dan barang Y ialah barang pengganti", "Barang X dan barang Y ialah barang penggenap", "Contoh barang X ialah kopi dan barang Y ialah teh", "Harga barang X berubah secara langsung dengan kuantiti barang Y"],
        j: 1,
        e: "Hubungan negatif antara harga sesuatu barang dengan permintaan barang lain menunjukkan barang penggenap. Kopi dan teh ialah barang pengganti (hubungan positif)."
      },
      {
        bab: "t4-b2",
        s: "Rajah 1 menunjukkan perubahan keluk permintaan suatu barang. Apakah yang menyebabkan keluk permintaan beralih dari D₀D₀ ke D₁D₁?",
        g: RAJAH_DD_KANAN,
        kapsyen: "Rajah 1",
        p: ["Peningkatan teknologi", "Kerajaan menurunkan cukai barangan", "Peningkatan harga faktor pengeluaran", "Harga dijangkakan jatuh bulan hadapan"],
        j: 1,
        e: "Keluk beralih ke kanan pada harga yang sama: permintaan bertambah akibat faktor bukan harga. Dasar kerajaan seperti pengurangan cukai menambah kuasa beli pengguna. Teknologi dan harga faktor mempengaruhi penawaran; jangkaan harga jatuh mengurangkan permintaan semasa."
      },
      {
        bab: "t4-b2",
        s: "Berdasarkan konsep penawaran, apakah yang akan berlaku apabila harga sesuatu barang turun?",
        p: ["Penguncupan penawaran", "Pengembangan penawaran", "Keluk penawaran beralih ke kiri", "Keluk penawaran beralih ke kanan"],
        j: 0,
        e: "Perubahan harga barang itu sendiri menyebabkan pergerakan di sepanjang keluk yang sama. Harga turun, kuantiti ditawarkan berkurang: penguncupan penawaran."
      },
      {
        bab: "t4-b2",
        s: "Antara yang berikut, yang manakah menyebabkan peralihan keluk penawaran ke kiri?",
        p: ["Kerajaan memberi subsidi", "Kenaikan harga barang itu", "Harga barang dijangka naik", "Kos pengeluaran menurun"],
        j: 2,
        e: "Jika harga dijangka naik, pengeluar menyimpan stok untuk dijual kemudian, maka penawaran semasa berkurang. Subsidi dan kos yang menurun menambah penawaran; kenaikan harga barang itu menyebabkan pergerakan di sepanjang keluk."
      },
      {
        bab: "t4-b2",
        s: "Rajah 2 menunjukkan perubahan keseimbangan dalam pasaran barangan. Apakah yang terjadi jika berlaku peralihan keluk permintaan?",
        g: RAJAH_S9,
        kapsyen: "Rajah 2",
        p: ["Harga keseimbangan meningkat", "Harga keseimbangan akan menurun", "Kuantiti keseimbangan tidak berubah", "Wujud lebihan penawaran dalam pasaran"],
        j: 0,
        e: "Permintaan bertambah (D₀ ke D₁) manakala penawaran tetap, maka harga dan kuantiti keseimbangan kedua-duanya meningkat."
      },
      {
        bab: "t4-b2",
        s: p("Jadual 1 berkaitan dengan permintaan suatu majalah.") + '<div class="jadual" style="max-width:420px"><table><caption>Jadual 1</caption><thead><tr><th class="n">Harga (RM)</th><th class="n">Kuantiti diminta (unit)</th></tr></thead><tbody><tr><td class="n">20</td><td class="n">60</td></tr><tr><td class="n">16</td><td class="n">X</td></tr></tbody></table></div>' + p("Sekiranya harga telah jatuh dan nilai keanjalan harga permintaan ialah 1.5, berapakah nilai X?"),
        p: ["55", "65", "72", "78"],
        j: 3,
        e: "%ΔP = (16 − 20) ÷ 20 × 100 = −20%. %ΔQ = 1.5 × 20% = 30%. X = 60 + 30% × 60 = 78 unit."
      },
      {
        bab: "t4-b2",
        s: "Suatu barang cenderung menjadi tidak anjal harga permintaan jika barang tersebut",
        p: ["merupakan barang tidak tahan lama", "mempunyai banyak pengganti", "ada banyak kegunaan", "ialah barang mewah"],
        j: 0,
        e: "Barang tidak tahan lama seperti makanan segar biasanya perlu dibeli segera, maka permintaannya tidak anjal. Banyak pengganti, banyak kegunaan dan barang mewah menjadikan permintaan anjal."
      },
      {
        bab: "t4-b2",
        s: "Rajah 3 menunjukkan keluk penawaran barang Y. Berapakah nilai keanjalan penawaran barang Y?",
        g: RAJAH_S12,
        kapsyen: "Rajah 3",
        p: ["0.30", "0.50", "1.00", "3.00"],
        j: 1,
        e: "Es = %ΔQs ÷ %ΔP = [(15 − 10) ÷ 10] ÷ [(400 − 200) ÷ 200] = 0.5 ÷ 1 = 0.5 (tidak anjal)."
      },
      {
        bab: "t4-b3",
        s: p("Rajah 4 menunjukkan antara fungsi bank pusat di Malaysia.") + p('<span class="teks-lemah" style="font-size:13.5px">Rajah 4 · Fungsi bank pusat</span>') + aliran(["Jurubank kepada kerajaan", "<b>X</b>", "Jurubank kepada bank perdagangan", "Mengawal kestabilan ekonomi"]) + p("Apakah fungsi X?"),
        p: ["Menjaga rizab berkanun", "Mentadbir akaun negara", "Mengawal kestabilan mata wang", "Memberi pendahuluan sementara"],
        j: 2,
        e: "Bank pusat mengeluarkan mata wang dan mengawal kestabilan nilainya. Mentadbir akaun negara dan memberi pendahuluan sementara ialah sebahagian daripada fungsi jurubank kepada kerajaan; menjaga rizab berkanun termasuk dalam fungsi jurubank kepada bank perdagangan."
      },
      {
        bab: "t4-b3",
        s: "Pilih padanan yang betul antara <b>akaun simpanan</b> dan <b>akaun simpanan tetap</b>.",
        p: [
          "Akaun simpanan dibayar faedah lebih tinggi; akaun simpanan tetap dibayar faedah lebih rendah",
          "Jumlah simpanan permulaan akaun simpanan lebih rendah; akaun simpanan tetap lebih tinggi",
          "Pemegang akaun simpanan diberi sijil simpanan; pemegang akaun simpanan tetap diberi buku simpanan",
          "Akaun simpanan mempunyai tempoh masa tertentu; akaun simpanan tetap boleh dikeluarkan pada bila-bila masa"
        ],
        j: 1,
        e: "Akaun simpanan boleh dibuka dengan jumlah permulaan yang rendah. Simpanan tetap memerlukan jumlah yang lebih tinggi, diberi faedah lebih tinggi, pemegangnya menerima sijil simpanan tetap dan wangnya disimpan bagi tempoh tertentu."
      },
      {
        bab: "t4-b3",
        s: p("Maklumat berikut berkaitan dengan kerjaya keluarga Encik Yusof.") + petik('<ul style="margin:0;padding-left:18px"><li>Encik Yusof mengusahakan perniagaan batik warisan keluarganya.</li><li>Isterinya merupakan pesara kerajaan.</li></ul>') + p("Apakah jenis pendapatan yang diterima oleh mereka?") + roman(["Upah", "Faedah", "Untung", "Bayaran pindahan"]),
        p: DUA,
        j: 3,
        e: "Encik Yusof sebagai usahawan menerima untung; isterinya sebagai pesara menerima pencen, iaitu bayaran pindahan."
      },
      {
        bab: "t4-b3",
        s: p("Rumus berikut berkaitan dengan pendapatan boleh guna.") + '<div class="aliran" style="justify-content:center"><span>Pendapatan − <b>R</b></span><i>⇐</i><span>Pendapatan boleh guna</span><i>⇒</i><span><b>Q</b> + Perbelanjaan</span></div>' + p("Apakah R dan Q?"),
        p: ["R: bayaran pindahan; Q: premium insurans", "R: bayaran zakat; Q: simpanan di bank", "R: caruman KWSP; Q: bayaran utiliti", "R: simpanan tetap; Q: cukai pendapatan"],
        j: 1,
        e: "PBG = pendapatan − potongan wajib (zakat, KWSP, PERKESO, cukai pendapatan). PBG digunakan untuk tabungan dan perbelanjaan, maka Q ialah simpanan di bank. Dalam C, caruman KWSP betul tetapi bayaran utiliti ialah perbelanjaan."
      },
      {
        bab: "t4-b3",
        s: "Situasi yang manakah berkaitan dengan kepentingan belanjawan peribadi?",
        p: ["Puan Siti meningkatkan pemberian wang belanja harian anaknya", "Cik Kamilia mengutamakan kehendaknya dalam membeli barang", "Encik Haris menggalakkan anak-anaknya menyimpan untuk masa depan", "Puan Laila selalu membuat pembelian barang secara hutang berbanding tunai"],
        j: 2,
        e: "Belanjawan peribadi membantu merancang perbelanjaan dan menabung untuk masa depan. Situasi lain menunjukkan perbelanjaan yang tidak berhemat."
      },
      {
        bab: "t4-b4",
        s: p("Maklumat berikut berkaitan dengan kos pengeluaran sebuah firma.") + petik("Jumlah kos yang ditanggung untuk mengeluarkan 40 pasang kasut ialah RM8 000. Apabila firma menambahkan (pengeluaran kepada) 43 pasang kasut, kos pengeluaran meningkat sebanyak 10%.") + p("Berapakah kos marginal firma tersebut?"),
        p: ["RM200.00", "RM204.65", "RM220.00", "RM266.67"],
        j: 3,
        e: "TC baharu = RM8 000 × 1.10 = RM8 800. MC = ΔTC ÷ ΔQ = (8 800 − 8 000) ÷ (43 − 40) = RM266.67."
      },
      {
        bab: "t4-b4",
        s: p("Maklumat berikut berkaitan dengan kos pengeluaran Syarikat Mirra Jaya.") + petik("Syarikat Mirra Jaya menanggung kos tetap sebanyak RM60 dan kos berubah ialah RM50 bagi mengeluarkan 20 batang pen.") + p("Berapakah kos purata firma tersebut?"),
        p: ["RM2.50", "RM3.00", "RM5.00", "RM5.50"],
        j: 3,
        e: "AC = TC ÷ Q = (RM60 + RM50) ÷ 20 = RM5.50."
      },
      {
        bab: "t4-b4",
        s: p("Maklumat berikut mengenai kos pengeluaran Roti Canai Arif dalam tempoh sebulan.") + petik("Kos bahan mentah: RM500<br>Upah pekerja: RM600") + p("Jika Arif berjaya menjual sebanyak 4 500 keping pada harga RM1.50 sekeping, berapakah untung yang diperoleh dalam tempoh tersebut?"),
        p: ["RM5 100.00", "RM5 650.00", "RM6 250.00", "RM6 750.00"],
        j: 1,
        e: "TR = 4 500 × RM1.50 = RM6 750. TC = RM500 + RM600 = RM1 100. Untung = RM6 750 − RM1 100 = RM5 650."
      },
      {
        bab: "t4-b4",
        s: p("Antara yang berikut, yang manakah merupakan faktor peningkatan produktiviti?") + roman(["Meningkatkan pemasaran ke luar negara", "Mempelbagaikan pilihan pengguna", "Penyelenggaraan mesin berkala", "Penggunaan teknologi canggih"]),
        p: DUA,
        j: 3,
        e: "Kelengkapan modal yang diselenggara dan teknologi canggih meningkatkan output seunit input. Pemasaran dan pilihan pengguna tidak meningkatkan produktiviti."
      },
      {
        bab: "t4-b4",
        s: p("Maklumat berikut berkaitan dengan pembinaan kilang di Malaysia.") + petik("<b>Kellogg buka kilang di Bandar Enstek</b><br>Nilai: Kellogg Company, pengeluar terbesar bijirin sarapan dunia dan pengeluar kedua terbesar snek, biskut dan keropok, mengumumkan pelaburan mencecah RM428.2 juta bagi pembangunan kilang pertama di negara ini.") + p("Antara berikut, yang manakah benar tentang faedah sosial daripada aktiviti di atas?") + roman(["Aktiviti ekonomi setempat meningkat", "Peningkatan peluang pekerjaan di kilang tersebut", "Pengguna di Bandar Enstek mudah mendapat bekalan produk", "Berlaku peningkatan dalam harga hartanah di kawasan tersebut"]),
        p: DUA,
        j: 1,
        e: "Skema: I dan IV. Faedah sosial ialah faedah luaran kepada masyarakat sekitar (pihak ketiga): kegiatan ekonomi setempat bertambah dan nilai hartanah meningkat. Pekerjaan di kilang itu dan bekalan produk dianggap faedah langsung kepada pekerja dan pengguna."
      },
      {
        bab: "t5-b1",
        s: p("Antara yang berikut, yang manakah merupakan tindakan kerajaan untuk mengawal kesan eksternaliti negatif?") + roman(["Menetapkan dasar harga minimum", "Menentukan penempatan perindustrian", "Memantau aktiviti pengeluaran firma oleh agensi kerajaan", "Mengisytiharkan sesetengah barang pengguna sebagai barang kawalan"]),
        p: DUA,
        j: 2,
        e: "Pencemaran dikawal dengan menentukan zon perindustrian jauh dari kawasan kediaman dan memantau aktiviti firma. Harga minimum dan barang kawalan ialah dasar harga, bukan tindakan terhadap eksternaliti."
      },
      {
        bab: "t5-b1",
        s: "Pernyataan yang manakah merupakan kesan positif inflasi sederhana?",
        p: ["Tabungan bertambah", "Pendapatan benar naik", "Guna tenaga meningkat", "Lebihan imbangan pembayaran"],
        j: 2,
        e: "Inflasi sederhana menggalakkan firma menambah pengeluaran kerana harga dan untung meningkat, maka guna tenaga bertambah. Inflasi biasanya mengurangkan tabungan dan pendapatan benar."
      },
      {
        bab: "t5-b1",
        s: p("Gambar 1 berkaitan dengan sejenis pengangguran.") + petik("<b>Siswazah B40 paling ramai menganggur</b><br>Ijazah atau diploma tidak lagi mampu menangani masalah kitaran ganas kemiskinan. Mengikut Kajian Pengesanan Siswazah, lepasan universiti daripada keluarga kelompok pendapatan isi rumah terendah (B40) adalah paling ramai menganggur.<br><span class=\"teks-lemah\" style=\"font-size:13px\">Gambar 1 (keratan akhbar)</span>") + p("Pernyataan yang manakah berkaitan dengan pengangguran di atas?"),
        p: ["Bersifat jangka panjang", "Mengutamakan gaji tinggi", "Semasa kemelesetan ekonomi", "Intensif modal dalam pengeluaran"],
        j: 1,
        e: "Siswazah baharu yang sedang mencari kerja mengalami pengangguran geseran; sebahagiannya memilih pekerjaan bergaji tinggi sehingga tempoh menganggur lebih panjang. Pengangguran geseran bersifat jangka pendek; kemelesetan menyebabkan pengangguran kitaran; pengeluaran intensif modal berkaitan pengangguran berstruktur."
      },
      {
        bab: "t5-b1",
        s: p("Gambar 2 berkaitan dengan hasil kerajaan.") + aliran(["Duti eksport", "Duti import", "Duti eksais", "Cukai barang &amp; perkhidmatan"]) + p("Pernyataan yang manakah betul?"),
        p: ["Contoh lain ialah duti setem", "Sumbangan terbesar hasil kerajaan", "Bebanan boleh dipindah kepada pihak lain", "Merapatkan jurang pendapatan antara masyarakat"],
        j: 2,
        e: "Keempat-empatnya ialah cukai tidak langsung: bebannya boleh dipindahkan kepada pengguna. Duti setem ialah cukai langsung; sumber hasil terbesar dan alat merapatkan jurang pendapatan ialah cukai langsung."
      },
      {
        bab: "t5-b1",
        s: p("Pernyataan yang manakah berkaitan dengan perbelanjaan pembangunan?") + roman(["Bertujuan untuk meningkatkan pembentukan modal tetap negara", "Contoh perbelanjaan yang terlibat ialah keselamatan dan pentadbiran am", "Merupakan perbelanjaan semasa kerajaan yang berulang-ulang setiap tahun", "Membolehkan pengurusan dan pentadbiran kerajaan beroperasi dengan lancar"]),
        p: ["I dan II", "II dan III", "I dan IV", "III dan IV"],
        j: 0,
        e: "Perbelanjaan pembangunan ialah perbelanjaan pelaburan kerajaan untuk membentuk modal tetap, meliputi sektor ekonomi, sosial, keselamatan dan pentadbiran am. III dan IV ialah ciri perbelanjaan mengurus."
      },
      {
        bab: "t5-b1",
        s: "Mengapakah bank pusat akan meningkatkan kadar faedah untuk mengekang masalah inflasi?",
        p: ["Perbelanjaan pengguna ke atas barang mewah meningkat", "Perbelanjaan pengguna ke atas pembelian kredit meningkat", "Perbelanjaan pengguna untuk membayar balik pinjaman berkurang", "Perbelanjaan agregat pengguna dalam ekonomi semakin berkurang"],
        j: 3,
        e: "Kadar faedah yang tinggi menaikkan kos pinjaman, maka penggunaan dan pelaburan secara kredit berkurang. Perbelanjaan agregat jatuh dan tekanan inflasi berkurang."
      },
      {
        bab: "t5-b2",
        s: "Apakah kesan negatif daripada wujudnya pelaburan langsung asing di Malaysia?",
        p: ["Syarikat gergasi akan menguasai sektor-sektor yang menguntungkan", "Penerokaan dan pengeluaran sumber alam yang boleh dikawal", "Imbangan pembayaran dalam negara semakin meningkat", "Negara mudah mengawal aliran keluar untung"],
        j: 0,
        e: "Syarikat asing yang besar boleh menguasai sektor yang menguntungkan sehingga firma tempatan sukar bersaing. Pilihan lain ialah kesan positif atau tidak tepat."
      },
      {
        bab: "t5-b2",
        s: "Apakah tujuan utama kerajaan melaksanakan sekatan bukan ekonomi dalam perdagangan antarabangsa?",
        p: ["Meningkatkan sumber hasil negara", "Mengehadkan pembelian pertukaran asing", "Menjamin keselamatan dan kesihatan rakyat Malaysia", "Menggalakkan perkembangan industri penggantian import negara"],
        j: 2,
        e: "Sekatan bukan ekonomi menggunakan undang-undang, peraturan dan piawaian untuk menjamin keselamatan dan kesihatan rakyat. Mengehadkan pembelian pertukaran asing ialah kawalan pertukaran asing."
      },
      {
        bab: "t5-b2",
        s: "Pernyataan yang manakah menunjukkan kesan pelaksanaan kuota dalam perdagangan antarabangsa terhadap keseimbangan pasaran suatu barang?",
        g: RAJAH_S31,
        p: ["Rajah A", "Rajah B", "Rajah C", "Rajah D"],
        j: 0,
        e: "Kuota mengehadkan kuantiti barang import, maka penawaran di pasaran tempatan berkurang: keluk S₀ beralih ke kiri (S₁). Harga keseimbangan naik (P1 ke P2) dan kuantiti keseimbangan turun (Q2 ke Q1)."
      },
      {
        bab: "t5-b2",
        s: p("Antara yang berikut, yang manakah merupakan komponen akaun semasa?") + roman(["Akaun modal", "Akaun kewangan", "Akaun perkhidmatan", "Akaun pendapatan primer"]),
        p: DUA,
        j: 3,
        e: "Akaun semasa terdiri daripada akaun barangan, akaun perkhidmatan, akaun pendapatan primer dan akaun pendapatan sekunder. Akaun modal dan akaun kewangan ialah akaun berasingan."
      },
      {
        bab: "t5-b2",
        s: p("Maklumat di bawah menunjukkan kadar pertukaran antara Ringgit Malaysia (RM) dengan Dolar Singapura (SGD).") + aliran(["1.00 Ringgit Malaysia (MYR)", "0.30 Dolar Singapura (SGD)"], "=") + p("Berapakah nilai dalam Ringgit Malaysia yang diperlukan oleh seorang mahasiswa universiti tempatan untuk membeli sebuah buku terbitan syarikat Singapura berharga SGD1 200 melalui sebuah portal dalam talian?"),
        p: ["RM360.00", "RM1 200.00", "RM3 000.00", "RM4 000.00"],
        j: 3,
        e: "RM1 = SGD0.30, maka SGD1 200 = 1 200 ÷ 0.30 = RM4 000. RM360 ialah jawapan jika tersilap mendarab."
      },
      {
        bab: "t5-b2",
        s: "Apakah kesan terhadap eksport Malaysia jika berlaku kenaikan kadar pertukaran asing?",
        p: ["Pengimport terpaksa membayar dengan harga yang lebih tinggi", "Pengeksport Malaysia akan menambahkan pengeluarannya", "Permintaan barang buatan Malaysia akan meningkat", "Harga barang eksport menjadi lebih murah"],
        j: 0,
        e: "Kenaikan kadar pertukaran (ringgit meningkat nilai) menjadikan barang eksport Malaysia lebih mahal dalam mata wang asing, maka pengimport di luar negara membayar harga yang lebih tinggi. B, C dan D ialah kesan apabila ringgit susut nilai."
      },
      {
        bab: "t4-b1",
        s: pernyataan("Modal adalah alat ciptaan manusia untuk kegunaan pengeluaran", "Tanah merupakan faktor pengeluaran yang tidak terhad"),
        p: BS,
        j: 0,
        e: "I betul: modal ialah barang buatan manusia untuk mengeluarkan barang lain. II salah: semua faktor pengeluaran, termasuk tanah, adalah terhad."
      },
      {
        bab: "t4-b2",
        s: pernyataan("Keluk permintaan mencerun ke atas dari kiri ke kanan", "Hukum permintaan menyatakan hubungan antara harga dan kuantiti diminta adalah songsang"),
        p: BS,
        j: 1,
        e: "I salah: keluk permintaan mencerun ke bawah dari kiri ke kanan. II betul: hubungan harga dengan kuantiti diminta adalah songsang."
      },
      {
        bab: "t4-b3",
        s: pernyataan("Barang keperluan tidak dipengaruhi oleh tingkat pendapatan", "Barang keperluan tiada barang pengganti yang hampir"),
        p: BS,
        j: 2,
        e: "Kedua-duanya betul mengikut skema: barang keperluan tetap dibeli walaupun pendapatan berubah dan tiada pengganti hampir, maka permintaannya tidak anjal."
      },
      {
        bab: "t4-b4",
        s: pernyataan("Input tetap dan input berubah wujud dalam pengeluaran jangka pendek", "Tingkat teknologi adalah tetap dalam pengeluaran jangka panjang"),
        p: BS,
        j: 0,
        e: "I betul: jangka pendek mempunyai sekurang-kurangnya satu input tetap. II salah: dalam jangka panjang semua input berubah, termasuk teknologi."
      },
      {
        bab: "t5-b1",
        s: pernyataan("Kerajaan akan menggunakan dasar fiskal mengembang untuk mengatasi inflasi", "Dasar fiskal mengembang ialah kerajaan menaikkan kadar cukai"),
        p: BS,
        j: 3,
        e: "Kedua-duanya salah. Inflasi diatasi dengan dasar fiskal menguncup. Dasar fiskal mengembang bermaksud cukai dikurangkan dan perbelanjaan kerajaan ditambah."
      },
      {
        bab: "t5-b2",
        s: pernyataan("Perdagangan antarabangsa mewujudkan persaingan antara pengeluar dan barang yang dihasilkan oleh sesebuah negara", "Persaingan dalam pasaran dunia akan mengurangkan usaha penyelidikan dan pembangunan (R&amp;D) dalam sesebuah ekonomi"),
        p: BS,
        j: 0,
        e: "I betul. II salah: persaingan global mendorong firma meningkatkan R&amp;D supaya kekal berdaya saing."
      }
    ]
  });

  /* =========================================================
     KERTAS 2 (3767/2) · Bahagian A (wajib) & B (pilih 2)
     ========================================================= */
  var CADANGAN = "Cadangan isi (disediakan untuk latihan, bukan skema rasmi)";

  // Carta pai sumber hasil kerajaan (S3b)
  var PAI =
    '<svg viewBox="0 0 360 190" width="360" height="190" role="img" aria-label="Carta pai sumber hasil kerajaan: X, cukai tak langsung dan hasil bukan cukai" style="max-width:100%;height:auto;display:block;margin:6px auto">' +
    '<path d="M120 95 L120 17 A78 78 0 0 1 197.85 99.9 Z" style="fill:var(--c-d);stroke:var(--bg);stroke-width:2"/>' +
    '<path d="M120 95 L197.85 99.9 A78 78 0 0 1 100.6 170.55 Z" style="fill:var(--c-3);stroke:var(--bg);stroke-width:2"/>' +
    '<path d="M120 95 L100.6 170.55 A78 78 0 0 1 120 17 Z" style="fill:var(--c-s);stroke:var(--bg);stroke-width:2"/>' +
    '<text x="78" y="101" style="fill:var(--bg);font-weight:800;font-size:22px" text-anchor="middle">X</text>' +
    '<text x="204" y="36" style="fill:var(--ink);font-weight:700;font-size:13px">Cukai tak langsung</text>' +
    '<text x="186" y="166" style="fill:var(--ink);font-weight:700;font-size:13px">Hasil bukan cukai</text>' +
    "</svg>";

  var RAJAH_LEBIHAN_SS = {
    lebar: 360,
    tinggi: 250,
    x: [0, 10],
    y: [0, 10],
    keluk: [
      { dari: [1, 9], ke: [9, 1], kelas: "d", label: "DD", dx: 4, dy: 4 },
      { dari: [1, 1], ke: [9, 9], kelas: "s", label: "SS", dx: 4, dy: 0 }
    ],
    panduan: [
      { q: 5, p: 5, ly: "P₀", lx: "Q₀" },
      { q: 7, p: 7, ly: "P₁", lx: "Qs" },
      { q: 3, p: 7, keY: false, lx: "Qd" }
    ],
    titik: [{ q: 5, p: 5, label: "E" }],
    teks: [{ q: 5, p: 7.4, t: "Lebihan penawaran", kelas: "s", anchor: "middle" }]
  };

  var RAJAH_PENGGENAP = {
    lebar: 360,
    tinggi: 250,
    x: [0, 10],
    y: [0, 10],
    labelX: "Kuantiti diminta makanan bersantan",
    labelY: "Harga santan (RM)",
    keluk: [{ dari: [1, 9], ke: [9, 1], kelas: "d", label: "DD", dx: 4, dy: 4 }],
    panduan: [
      { q: 3, p: 7, ly: "P₁", lx: "Q₁" },
      { q: 6, p: 4, ly: "P₀", lx: "Q₀" }
    ]
  };

  var RAJAH_SS_KIRI = {
    lebar: 360,
    tinggi: 250,
    x: [0, 10],
    y: [0, 10],
    labelX: "Kuantiti makanan (unit)",
    keluk: [
      { dari: [1.5, 8.5], ke: [8.5, 1.5], kelas: "d", label: "DD", dx: 3, dy: 4 },
      { dari: [2, 1], ke: [9, 8], kelas: "s nipis", label: "S₀", dx: 3, dy: 0 },
      { dari: [1, 2], ke: [7.8, 8.8], kelas: "s", label: "S₁", dx: 3, dy: 0 }
    ],
    panduan: [
      { q: 5.5, p: 4.5, ly: "P₀", lx: "Q₀" },
      { q: 4.5, p: 5.5, ly: "P₁", lx: "Q₁" }
    ],
    titik: [
      { q: 5.5, p: 4.5, label: "E₀", dx: 8, dy: 4 },
      { q: 4.5, p: 5.5, label: "E₁", dx: -2, dy: -9, anchor: "end" }
    ],
    panah: [{ dari: [7.3, 6.6], ke: [5.9, 6.6], kelas: "s" }]
  };

  E.daftarK2({
    id: "kel25",
    k1: "kel25-k1",
    nama: "Kelantan 2025",
    label: "Kertas Percubaan SPM Kelantan 2025",
    sumber: "Modul Koleksi Item Peperiksaan Percubaan SPM 2025 (Kelantan)",
    bahagianA: "Bahagian A (3 soalan wajib, 60 markah)",
    bahagianB: "Bahagian B (pilih 2 daripada 4, 40 markah)",
    kunciLama: true,
    soalan: [
    /* ---------------- SOALAN 1 ---------------- */
    {
      no: 1,
      seksyen: "A",
      tajuk: "Faktor pengeluaran, sistem ekonomi dan pasaran",
      bahagian: [
        {
          kod: "(a)",
          s: "Bezakan buruh dan usahawan dalam sesuatu pengeluaran.",
          m: 6,
          bab: "t4-b1",
          topik: "Faktor pengeluaran",
          skema: [
            {
              label: "Buruh lawan usahawan (1 + 1 bagi setiap pasangan)",
              isi: [
                ["H1a", "Buruh mendapat ganjaran <b>upah</b>"],
                ["H1b", "Usahawan mendapat ganjaran <b>untung</b>"],
                ["H2a", "Buruh bekerja dengan orang lain"],
                ["H2b", "Usahawan bekerja sendiri"],
                ["H3a", "Buruh menggunakan barang dan perkhidmatan"],
                ["H3b", "Usahawan mengeluarkan barang dan perkhidmatan"],
                ["H4a", "Buruh memaksimumkan kepuasan"],
                ["H4b", "Usahawan memaksimumkan untung"],
                ["H5a", "Buruh tiada risiko atau risiko rendah"],
                ["H5b", "Usahawan menanggung risiko atau risiko tinggi"],
                ["H6a", "Buruh memberi sumbangan mental dan fizikal dalam pengeluaran"],
                ["H6b", "Usahawan menggabungkan dan menyelaras faktor pengeluaran"],
                ["H7a", "Buruh tidak bebas membuat keputusan"],
                ["H7b", "Usahawan bebas membuat keputusan"],
                ["H8a", "Waktu bekerja buruh tetap"],
                ["H8b", "Waktu bekerja usahawan fleksibel"]
              ]
            }
          ],
          nota: "Perbezaan mesti ditulis berpasangan. Maksimum 6 markah."
        },
        {
          kod: "(b)(i)",
          konteks: '<p style="text-align:center"><b>Syarikat Mentari memaksimumkan keuntungan manakala kerajaan pula memaksimumkan kebajikan rakyat.</b></p>',
          s: "Maklumat di atas berkaitan dengan suatu sistem ekonomi. Apakah sistem ekonomi tersebut?",
          m: 1,
          bab: "t4-b1",
          topik: "Sistem ekonomi",
          skema: [{ isi: [["1", "Sistem ekonomi campuran"]] }]
        },
        {
          kod: "(b)(ii)(a)",
          s: "Bagaimanakah sistem ekonomi di (b)(i) menyelesaikan masalah asas berikut: <b>apa yang hendak dikeluarkan</b>?",
          m: 2,
          bab: "t4-b1",
          topik: "Masalah asas ekonomi",
          skema: [
            {
              isi: [
                ["H1", "Penentuan jenis barang yang hendak dikeluarkan"],
                ["H2", "Swasta mengeluarkan barang ekonomi"],
                ["H3", "Mengikut mekanisme harga"],
                ["H4", "Kerajaan mengeluarkan barang awam"],
                ["H5", "Mengikut objektif ekonomi atau kepentingan awam"]
              ]
            }
          ],
          nota: "Maksimum 2 markah."
        },
        {
          kod: "(b)(ii)(b)",
          s: "Bagaimanakah sistem ekonomi di (b)(i) menyelesaikan masalah asas berikut: <b>untuk siapa dikeluarkan</b>?",
          m: 2,
          bab: "t4-b1",
          topik: "Masalah asas ekonomi",
          skema: [
            {
              isi: [
                ["H1", "Berkaitan dengan agihan barang"],
                ["H2", "Swasta mengeluarkan barang ekonomi mengikut agihan pendapatan atau kuasa beli"],
                ["H3", "Golongan berpendapatan tinggi mendapat lebih banyak barang, golongan berpendapatan rendah mendapat kurang"],
                ["H4", "Kerajaan mengeluarkan barang awam untuk semua rakyat"],
                ["H5", "Kerajaan campur tangan dalam agihan barang melalui cukai atau subsidi"]
              ]
            }
          ],
          nota: "Maksimum 2 markah."
        },
        {
          kod: "(c)",
          konteks: '<div class="jadual"><table><caption>Rajah 1 Jadual permintaan barang X</caption><thead><tr><th></th><th class="n">Harga (RM)</th><th class="n">Kuantiti (unit)</th></tr></thead><tbody><tr><td>Januari 2025</td><td class="n">15.00</td><td class="n">1 000</td></tr><tr><td>Jun 2025</td><td class="n">15.00</td><td class="n">1 500</td></tr></tbody></table></div>',
          s: "Terangkan faktor yang menyebabkan berlakunya permintaan pada Jun 2025.",
          m: 6,
          bab: "t4-b2",
          topik: "Penentu permintaan",
          skema: [
            {
              label: "Fakta (F) dan huraian (H)",
              isi: [
                ["F1", "Harga barang lain (barang pengganti atau penggenap)"],
                ["H1", "Harga barang pengganti naik atau harga barang penggenap jatuh"],
                ["F2", "Pendapatan"],
                ["H2", "Pendapatan pengguna meningkat"],
                ["F3", "Cita rasa"],
                ["H3", "Cita rasa terhadap barang X meningkat"],
                ["F4", "Jangkaan harga pada masa depan"],
                ["H4", "Harga dijangka naik pada masa depan"],
                ["F5", "Dasar kerajaan"],
                ["H5", "Kerajaan mengurangkan cukai"],
                ["F6", "Musim"],
                ["H6", "Musim perayaan menyebabkan permintaan meningkat"]
              ]
            }
          ],
          nota: "Mana-mana 3 fakta dan 3 huraian. Harga tidak berubah (RM15) tetapi kuantiti bertambah, maka permintaan meningkat akibat faktor selain harga."
        },
        {
          kod: "(d)",
          s: "Jelaskan keadaan pasaran apabila berlaku lebihan penawaran.",
          m: 3,
          bab: "t4-b2",
          topik: "Keseimbangan pasaran",
          rajah: RAJAH_LEBIHAN_SS,
          skema: [
            {
              isi: [
                ["H1", "Berlaku ketidakseimbangan pasaran"],
                ["H2", "Tidak wujud persetujuan antara penjual dan pembeli"],
                ["H3", "Penawaran melebihi permintaan (SS &gt; DD)"],
                ["H4", "Harga cenderung turun"],
                ["H5", "Wujud pengembangan permintaan"],
                ["H6", "Berlaku penguncupan penawaran"],
                ["H7", "Rajah lebihan penawaran"]
              ]
            }
          ],
          nota: "Maksimum 3 markah."
        }
      ]
    },

    /* ---------------- SOALAN 2 ---------------- */
    {
      no: 2,
      seksyen: "A",
      tajuk: "Wang, pendapatan individu dan pengeluaran",
      bahagian: [
        {
          kod: "(a)",
          konteks: petikan("", "KUALA LUMPUR: Ringgit mencatatkan prestasi tidak menentu pada 2023. Gabenor Bank Negara Malaysia (BNM) memberi jaminan akan melakukan apa sahaja untuk memastikan ringgit terus diselaras secara teratur.", "Sumber ubah suai: BH online, 27 Disember 2023"),
          s: "Maklumat di atas berkaitan dengan ketidakstabilan nilai Ringgit Malaysia. Bagaimanakah kerajaan melalui Bank Negara Malaysia mengawal prestasi tersebut?",
          m: 3,
          bab: "t4-b3",
          topik: "Bank pusat",
          skema: [
            {
              isi: [
                ["H1", "Mewujudkan sandaran minimum mata wang"],
                ["H2", "BNM memperuntukkan sandaran minimum 80.59%"],
                ["H3", "Sandaran dalam bentuk emas atau rizab antarabangsa"],
                ["H4", "Mengawal kadar faedah (OPR)"],
                ["H5", "Contoh: menaikkan OPR menarik pelabur asing menyimpan aset dalam ringgit kerana pulangan lebih tinggi, sekali gus mengukuhkan nilai ringgit"],
                ["H6", "Memastikan rizab antarabangsa kukuh"],
                ["H7", "Campur tangan dalam pasaran pertukaran asing"],
                ["H8", "Contoh: jika ringgit lemah, BNM menjual dolar AS dan membeli ringgit untuk meningkatkan permintaan dan nilai ringgit"]
              ]
            }
          ],
          nota: "Maksimum 3 markah."
        },
        {
          kod: "(b)",
          konteks: petikan("40 peratus orang muda berbelanja di luar kemampuan", "Kuala Lumpur: Empat puluh peratus generasi milenium telah berbelanja melebihi kemampuan mereka.", "Sumber: Diubah suai daripada hmetro.com.my, 9 Mac 2021"),
          s: "Maklumat di atas berkaitan dengan perbelanjaan individu dalam negara. Bersetujukah anda dengan perbelanjaan generasi milenium tersebut? Beri alasan.",
          m: 5,
          bab: "t4-b3",
          topik: "Penggunaan pendapatan individu",
          skema: [
            {
              label: "Setuju",
              isi: [
                ["F1", "Setuju"],
                ["H1", "Kos sara hidup dan perbelanjaan harian meningkat"],
                ["H2", "Tekanan sosial"],
                ["H3", "Gaya hidup"],
                ["H4", "Menjaga penampilan dan status"],
                ["H5", "Untuk memaksimumkan kepuasan"],
                ["H6", "Kurang ilmu pengurusan kewangan"],
                ["H7", "Tidak dapat membezakan keperluan dan kehendak"],
                ["H8", "Tekanan hidup meningkat"],
                ["H9", "Kemudahan akses kredit dan pinjaman, contohnya beli sekarang bayar kemudian (BNPL) dan kad kredit"]
              ]
            },
            {
              label: "ATAU Tidak setuju",
              isi: [
                ["F2", "Tidak setuju"],
                ["H10", "Terpaksa menanggung hutang, beban meningkat"],
                ["H11", "Tekanan emosi dan kesihatan"],
                ["H12", "Tiada simpanan kecemasan"],
                ["H13", "Masalah sosial meningkat"],
                ["H14", "Perlu lebih berjimat"],
                ["H15", "Terpaksa mengorbankan perbelanjaan untuk barang keperluan"],
                ["H16", "Beli apabila perlu"],
                ["H17", "Ubah gaya hidup"],
                ["H18", "Cenderung mewujudkan inflasi"],
                ["H19", "Sikap boros berbelanja"]
              ]
            }
          ],
          nota: "Pilih satu pendirian sahaja (F1 atau F2) dan huraikan hujah bagi pendirian itu. Maksimum 5 markah."
        },
        {
          kod: "(c)(i)(a)",
          konteks: '<div class="jadual"><table><caption>Kos pengeluaran sebuah kilang pakaian pada bulan April 2025</caption><thead><tr><th>Perkara</th><th class="n">Jumlah (RM)</th></tr></thead><tbody><tr><td>Gaji pekerja</td><td class="n">20 000</td></tr><tr><td>Insurans kebakaran</td><td class="n">1 200</td></tr><tr><td>Sewa bangunan</td><td class="n">9 000</td></tr><tr><td>Bahan mentah</td><td class="n">30 000</td></tr><tr><td>Bayaran bil utiliti</td><td class="n">1 800</td></tr></tbody></table></div>',
          s: "Tentukan jenis kos pengeluaran bagi insurans kebakaran.",
          m: 1,
          bab: "t4-b4",
          topik: "Kos pengeluaran",
          skema: [{ isi: [["1", "Kos tetap"]] }]
        },
        {
          kod: "(c)(i)(b)",
          s: "Jelaskan jawapan di (c)(i)(a).",
          m: 3,
          bab: "t4-b4",
          topik: "Kos pengeluaran",
          skema: [
            {
              isi: [
                ["H1", "Pembayaran terhadap input tetap"],
                ["H2", "Nilainya RM1 200"],
                ["H3", "Wujud pada output sifar"],
                ["H4", "Tidak berubah secara langsung dengan tingkat output"],
                ["H5", "Wujud dalam jangka pendek"],
                ["H6", "Melindungi risiko kebakaran kilang pakaian"],
                ["H7", "Memastikan syarikat terus beroperasi jika berlaku kebakaran"]
              ]
            }
          ],
          nota: "Maksimum 3 markah."
        },
        {
          kod: "(c)(ii)",
          s: "Hitung jumlah kos berubah kilang tersebut.",
          m: 2,
          bab: "t4-b4",
          topik: "Kos pengeluaran",
          skema: [
            {
              isi: [
                ["R", "Kos berubah = gaji pekerja + bahan mentah + bil utiliti"],
                ["J", "= RM20 000 + RM30 000 + RM1 800 = <b>RM51 800.00</b>"]
              ]
            }
          ],
          nota: "Sewa bangunan dan insurans kebakaran ialah kos tetap, maka tidak dimasukkan."
        },
        {
          kod: "(d)",
          s: "Bagaimanakah sesebuah organisasi dapat meningkatkan produktiviti?",
          m: 6,
          bab: "t4-b4",
          topik: "Produktiviti",
          skema: [
            {
              label: "Fakta dan contoh (terima contoh lain yang sesuai)",
              isi: [
                ["H1", "Tenaga manusia yang mahir dan bermotivasi"],
                ["H2", "Contoh: kursus latihan kemahiran, bonus dan anugerah pekerja cemerlang"],
                ["H3", "Sistem dan prosedur organisasi yang cekap"],
                ["H4", "Contoh: prosedur kerja yang ringkas dan sistem digital untuk urusan pesanan"],
                ["H5", "Struktur organisasi yang sesuai dan cekap"],
                ["H6", "Contoh: pembahagian tugas mengikut bahagian dan pengkhususan kerja"],
                ["H7", "Gaya kepimpinan berwibawa yang membentuk budaya organisasi produktif"],
                ["H8", "Contoh: pengurus yang adil, tegas dan memberi motivasi"],
                ["H9", "Persekitaran kerja yang kondusif dan selesa"],
                ["H10", "Contoh: ruang kerja yang bersih, selamat dan susun atur yang teratur"],
                ["H11", "Bahan yang berkualiti"],
                ["H12", "Contoh: bahan mentah bermutu dan pengurusan inventori yang sistematik"],
                ["H13", "Teknologi canggih"],
                ["H14", "Contoh: mesin automatik dan perisian pengurusan pengeluaran"],
                ["H15", "Kelengkapan modal yang berfungsi dengan baik"],
                ["H16", "Contoh: penyelenggaraan mesin secara berkala"]
              ]
            }
          ],
          nota: "Maksimum 6 markah."
        }
      ]
    },

    /* ---------------- SOALAN 3 ---------------- */
    {
      no: 3,
      seksyen: "A",
      tajuk: "Kerajaan, hasil negara dan ekonomi global",
      bahagian: [
        {
          kod: "(a)",
          konteks: '<p style="text-align:center"><b class="tajuk-petikan">WASPADA! Bahan kimia dalam makanan anda</b>Racun perosak pada sayur-sayuran</p><p class="sumber" style="text-align:center">Gambar 1 (poster)</p>',
          s: "Gambar 1 berkaitan dengan peranan kerajaan dalam ekonomi. Bagaimanakah kerajaan akan menangani masalah tersebut?",
          m: 5,
          bab: "t5-b1",
          topik: "Peranan kerajaan: eksternaliti negatif dan perlindungan pengguna",
          skema: [
            {
              isi: [
                ["H1", "Menggubal undang-undang atau peraturan baharu"],
                ["H2", "Menguatkuasakan atau mengemas kini undang-undang sedia ada"],
                ["H3", "Menggantung atau menarik balik lesen firma yang terlibat"],
                ["H4", "Memantau aktiviti pengeluaran firma"],
                ["H5", "Meningkatkan denda maksimum"],
                ["H6", "Mengenakan cukai yang tinggi kepada firma berkenaan"],
                ["H7", "Menarik balik pemberian subsidi"],
                ["H8", "Memberi kuasa penuh kepada kementerian berkaitan (pertanian, kesihatan) untuk mengawal selia firma yang melanggar peraturan"],
                ["H9", "Hebahan melalui media arus perdana"],
                ["H10", "Pujukan moral, atau pengurangan cukai dan subsidi kepada firma yang mematuhi peraturan"],
                ["H11", "Insentif khas kepada pemberi maklumat tentang pelanggaran undang-undang, dengan identiti dirahsiakan"],
                ["H12", "Kerjasama dengan kerajaan negara luar yang berkaitan"]
              ]
            }
          ],
          nota: "Terima jawapan dalam bentuk contoh. Maksimum 5 markah."
        },
        {
          kod: "(b)(i)",
          konteks: PAI + '<p class="sumber" style="text-align:center">Gambar 2 Sumber hasil kerajaan</p>',
          s: "Gambar 2 berkaitan dengan sumber hasil kerajaan. Apakah X?",
          m: 1,
          bab: "t5-b1",
          topik: "Hasil kerajaan",
          skema: [{ isi: [["1", "Cukai langsung"]] }]
        },
        {
          kod: "(b)(ii)",
          s: "Jelaskan jawapan di (b)(i).",
          m: 4,
          bab: "t5-b1",
          topik: "Hasil kerajaan",
          skema: [
            {
              isi: [
                ["H1", "Sumber hasil cukai terbesar kerajaan"],
                ["H2", "Beban cukai tidak boleh dipindahkan kepada orang lain"],
                ["H3", "Dikenakan ke atas individu atau firma atas sejumlah pendapatan tertentu"],
                ["H4", "Dikenakan setiap tahun (berulang)"],
                ["H5", "Digunakan untuk membiayai perbelanjaan kerajaan"],
                ["H6", "Bertujuan merapatkan jurang pendapatan"],
                ["H7", "Alat kawalan kerajaan untuk mengatasi ketidakseimbangan ekonomi"],
                ["H8", "Berkadar progresif, regresif atau malar"],
                ["H9", "Contoh: cukai pendapatan individu, cukai pendapatan syarikat"]
              ]
            }
          ],
          nota: "Maksimum 4 markah."
        },
        {
          kod: "(c)",
          konteks: petikan("", "Malaysia menjadi negara yang semakin mendapat tumpuan di Asia Tenggara dengan pelabur berminat melabur di negara ini atas beberapa faktor yang berkaitan.", "Sumber: Bernama, 23 Ogos 2024"),
          s: "Maklumat di atas berkaitan dengan perkembangan ekonomi Malaysia. Mengapakah Malaysia menjadi tumpuan tersebut?",
          m: 4,
          bab: "t5-b2",
          topik: "Pelaburan langsung asing",
          skema: [
            {
              isi: [
                ["H1", "Kekayaan sumber alam"],
                ["H2", "Lokasi yang strategik"],
                ["H3", "Kestabilan politik negara"],
                ["H4", "Peranan kerajaan"],
                ["H5", "Dasar mesra pelaburan: pengecualian cukai, kredit pelaburan, pelepasan cukai"],
                ["H6", "Hubungan diplomatik yang seimbang"],
                ["H7", "Kemudahan infrastruktur yang baik: pengangkutan, ICT, komunikasi"],
                ["H8", "Kepakaran tenaga kerja: buruh mahir dan profesional"],
                ["H9", "Kos operasi yang kompetitif untuk firma"],
                ["H10", "Kos sara hidup yang stabil untuk pekerja"],
                ["H11", "Model pelaburan yang mudah dan menguntungkan pelabur"]
              ]
            }
          ],
          nota: "Maksimum 4 markah."
        },
        {
          kod: "(d)(i)(a)",
          s: "Berikan maksud <b>pertukaran asing</b>.",
          m: 1,
          bab: "t5-b2",
          topik: "Pertukaran asing",
          skema: [
            {
              isi: [
                ["H1", "Mata wang negara lain yang dimiliki oleh sesebuah negara"],
                ["H2", "Contoh: Malaysia memiliki dolar Singapura (SGD)"]
              ]
            }
          ],
          nota: "Maksimum 1 markah."
        },
        {
          kod: "(d)(i)(b)",
          s: "Berikan maksud <b>kadar pertukaran asing</b>.",
          m: 1,
          bab: "t5-b2",
          topik: "Pertukaran asing",
          skema: [
            {
              isi: [
                ["H1", "Harga mata wang sesebuah negara yang dinyatakan dalam nilai mata wang asing"],
                ["H2", "Contoh: USD1 = RM4.4250"]
              ]
            }
          ],
          nota: "Maksimum 1 markah."
        },
        {
          kod: "(d)(ii)",
          s: "Jelaskan kepentingan pertukaran asing kepada sesebuah negara.",
          m: 4,
          bab: "t5-b2",
          topik: "Pertukaran asing",
          skema: [
            {
              label: "Fakta dan contoh (terima contoh lain yang sesuai)",
              isi: [
                ["H1", "Membiayai import negara"],
                ["H2", "Contoh: membayar import mesin dari Jepun dalam yen"],
                ["H3", "Membayar balik pinjaman luar negara"],
                ["H4", "Contoh: membayar balik pinjaman dalam dolar AS"],
                ["H5", "Membuat pelaburan di luar negara"],
                ["H6", "Contoh: syarikat Malaysia membeli aset atau membuka cawangan di luar negara"],
                ["H7", "Mempertahankan nilai mata wang negara (ringgit)"],
                ["H8", "Contoh: BNM menjual mata wang asing dan membeli ringgit apabila ringgit lemah"]
              ]
            }
          ],
          nota: "Maksimum 4 markah."
        }
      ]
    },

    /* ---------------- SOALAN 4 ---------------- */
    {
      no: 4,
      seksyen: "B",
      tajuk: "Kenaikan harga santan",
      konteks: petikan("Kerana santan harga makanan naik", "PETALING JAYA – Kenaikan harga santan sehingga RM20 sekilo sejak Ramadan lalu membuatkan peniaga yang menggunakan bahan itu untuk masakan tidak ada pilihan selain menaikkan harga makanan. Rata-rata peniaga bertindak menaikkan harga makanan yang dijual antara 20 sen hingga RM1 kerana tidak tahan harga santan yang semakin naik.", "Sumber: Diubah suai daripada Kosmo, 24 April 2025"),
      bahagian: [
        {
          kod: "(a)",
          s: "Bagaimanakah santan mempengaruhi harga makanan?",
          m: 4,
          bab: "t4-b2",
          topik: "Barang penggenap",
          rajah: RAJAH_PENGGENAP,
          skema: [
            {
              isi: [
                ["H1", "Santan ialah barang penggenap"],
                ["H2", "Barang yang perlu digunakan bersama barang lain"],
                ["H3", "Apabila harga santan meningkat, harga makanan berasaskan santan naik"],
                ["H4", "Santan diperlukan dalam kebanyakan masakan"],
                ["H5", "Permintaan terhadap makanan berasaskan santan jatuh"],
                ["H6", "Tiada barang pengganti yang hampir atau sempurna"],
                ["H7", "Hubungan antara harga sesuatu barang dengan permintaan barang penggenapnya adalah negatif"],
                ["H8", "Rajah barang penggenap"]
              ]
            }
          ],
          nota: "Maksimum 4 markah."
        },
        {
          kod: "(b)",
          s: "Kenaikan harga makanan memberi kesan kepada pasaran makanan. Bincangkan.",
          m: 9,
          bab: "t4-b2",
          topik: "Keseimbangan pasaran",
          rajah: RAJAH_SS_KIRI,
          skema: [
            {
              label: CADANGAN,
              isi: [
                ["C1", "Kos pengeluaran peniaga meningkat, maka penawaran makanan bersantan berkurang (keluk S₀ beralih ke kiri ke S₁)"],
                ["C2", "Harga keseimbangan naik (P₀ ke P₁) dan kuantiti keseimbangan turun (Q₀ ke Q₁)"],
                ["C3", "Mengikut hukum permintaan, harga yang lebih tinggi menyebabkan kuantiti diminta berkurang (penguncupan permintaan)"],
                ["C4", "Pengguna beralih kepada makanan pengganti yang lebih murah, maka permintaan barang pengganti meningkat"],
                ["C5", "Pendapatan benar dan kuasa beli pengguna menurun; kos sara hidup meningkat"],
                ["C6", "Jika permintaan anjal, jumlah hasil peniaga berkurang; jika tidak anjal, jumlah hasil mungkin meningkat"],
                ["C7", "Sisi lain: peniaga yang mengekalkan harga menanggung untung yang lebih kecil"],
                ["C8", "Rumusan: kerajaan boleh campur tangan melalui subsidi atau kawalan harga untuk menstabilkan pasaran"]
              ]
            }
          ],
          rubrik: [
            ["Tahap 1 (1–3 markah)", ["Pengetahuan terhad tentang teori atau konsep penentu permintaan dalam pasaran", "Menyenaraikan fakta atau isi sahaja tanpa huraian", "Huraian tentang penentu permintaan dalam pasaran tidak dijelaskan dengan baik dan kurang difahami"]],
            ["Tahap 2 (4–6 markah)", ["Berupaya mengaplikasikan fakta dan konsep penentu permintaan dalam pasaran sesuai dengan situasi yang diberikan", "Menghuraikan fakta yang sesuai dan betul", "Sebahagian besar huraian masih tepat tetapi kurang mendalam", "Mengemukakan idea yang rasional dan masih sesuai serta relevan", "Jawapan satu sisi", "Rajah umum, asas atau tidak lengkap", "Huraian rajah terhad"]],
            ["Tahap 3 (7–9 markah)", ["Berupaya mengaplikasikan fakta dan konsep penentu permintaan dalam pasaran dengan betul, tepat dan jelas berdasarkan situasi", "Menghuraikan fakta dengan tepat, betul dan jelas", "Menilai kesan penentu permintaan dalam pasaran dengan tepat dan matang", "Mengemukakan idea yang bernas, kreatif dan rasional", "Jawapan dua sisi", "Rajah lengkap dan tepat", "Huraian rajah lengkap", "Menghubungkaitkan jawapan dengan pelbagai tajuk", "Menyatakan pendirian atau membuat rumusan yang relevan, mendalam dan matang"]]
          ]
        },
        {
          kod: "(c)",
          s: "Pemberian subsidi oleh kerajaan dapat mengurangkan kesan tindakan peniaga. Jelaskan.",
          m: 7,
          bab: "t5-b1",
          topik: "Subsidi",
          skema: [
            {
              isi: [
                ["H1", "Subsidi ialah bantuan kewangan kerajaan kepada pengeluar"],
                ["H2", "Mengurangkan kos pengeluaran makanan"],
                ["H3", "Mengurangkan harga santan dalam pasaran"],
                ["H4", "Makanan bersantan menjadi lebih murah"],
                ["H5", "Meningkatkan penawaran"],
                ["H6", "Pengguna dapat memaksimumkan kepuasan"],
                ["H7", "Dapat menikmati lebih banyak pilihan makanan atau membeli lebih banyak barang keperluan"],
                ["H8", "Perbelanjaan penggunaan jatuh"],
                ["H9", "Kos sara hidup jatuh"],
                ["H10", "Tabungan meningkat"],
                ["H11", "Ada simpanan untuk kecemasan"],
                ["H12", "Boleh digunakan sebagai modal perniagaan"],
                ["H13", "Peniaga mendapat untung"]
              ]
            }
          ],
          nota: "Maksimum 7 markah."
        }
      ]
    },

    /* ---------------- SOALAN 5 ---------------- */
    {
      no: 5,
      seksyen: "B",
      tajuk: "Kenaikan gaji penjawat awam",
      konteks: petikan("Kenaikan gaji penjawat awam rangsang ekonomi domestik", "PETALING JAYA: Kenaikan gaji penjawat awam yang bakal diumumkan Jumaat ini dijangka merangsang ekonomi melalui peningkatan dalam permintaan domestik. Kenaikan itu akan meningkatkan motivasi dan kepuasan kerja penjawat awam, seterusnya meningkatkan produktiviti dan kualiti perkhidmatan awam. Di samping itu, kenaikan gaji dalam sektor awam mungkin menarik lebih ramai individu untuk bekerja dalam sektor ini.", "Sumber: Diubah suai daripada utusan.com.my, 14 Ogos 2024"),
      bahagian: [
        {
          kod: "(a)",
          s: "Jelaskan jenis inflasi yang terlibat kesan perubahan gaji tersebut.",
          m: 4,
          bab: "t5-b1",
          topik: "Inflasi",
          skema: [
            {
              isi: [
                ["H1", "Inflasi tarikan permintaan"],
                ["H2", "Berlaku apabila permintaan agregat meningkat melebihi penawaran"],
                ["H3", "Ekonomi mencapai guna tenaga penuh"],
                ["H4", "Kuasa beli meningkat"],
                ["H5", "Berlaku peningkatan pendapatan"],
                ["H6", "Bekalan wang di pasaran meningkat"],
                ["H7", "Penciptaan kredit meningkat"]
              ]
            }
          ],
          nota: "Maksimum 4 markah."
        },
        {
          kod: "(b)",
          s: "Jelaskan kesan kenaikan tersebut terhadap ekonomi negara.",
          m: 7,
          bab: "t5-b1",
          topik: "Kerajaan sebagai majikan",
          skema: [
            {
              isi: [
                ["H1", "Meningkatkan pendapatan penjawat awam"],
                ["H2", "Taraf hidup naik"],
                ["H3", "Permintaan agregat naik"],
                ["H4", "Harga barang akan meningkat"],
                ["H5", "Cenderung berlaku kenaikan inflasi"],
                ["H6", "Meningkatkan motivasi, kualiti, kepuasan dan produktiviti penjawat awam"],
                ["H7", "Menghargai sumbangan penjawat awam"],
                ["H8", "Menjaga kebajikan penjawat awam"],
                ["H9", "Imej sektor awam meningkat"],
                ["H10", "Merangsang pertumbuhan ekonomi"],
                ["H11", "Mengurangkan penghijrahan penjawat awam ke sektor swasta; sektor awam lebih popular"],
                ["H12", "Menampung kos sara hidup"],
                ["H13", "KDNK meningkat"],
                ["H14", "Perbelanjaan mengurus (emolumen) meningkat"],
                ["H15", "Peruntukan perbelanjaan kerajaan yang lain dikurangkan"]
              ]
            }
          ],
          nota: "Maksimum 7 markah."
        },
        {
          kod: "(c)",
          s: "Bersetujukah anda kenaikan tersebut mendorong individu memilih untuk bekerja di sektor awam? Beri alasan.",
          m: 9,
          bab: "t5-b1",
          topik: "Kerajaan sebagai majikan",
          skema: [
            {
              label: CADANGAN,
              isi: [
                ["C1", "Pendirian: setuju (atau tidak setuju) dinyatakan dengan jelas"],
                ["C2", "Setuju: gaji sektor awam lebih kompetitif dan menampung kos sara hidup"],
                ["C3", "Setuju: jaminan dan kestabilan pekerjaan"],
                ["C4", "Setuju: faedah lain seperti pencen, cuti, kemudahan perubatan dan pinjaman perumahan"],
                ["C5", "Setuju: peluang kenaikan pangkat dan latihan; imej sektor awam meningkat"],
                ["C6", "Sisi lain: sektor swasta mungkin menawarkan gaji dan bonus yang lebih tinggi"],
                ["C7", "Sisi lain: pilihan kerjaya bergantung pada minat, kelayakan dan peluang keusahawanan"],
                ["C8", "Sisi lain: jika kenaikan gaji mencetuskan inflasi, pendapatan benar tidak banyak meningkat"],
                ["C9", "Rumusan: kerajaan sebagai majikan terbesar perlu mengimbangi kebajikan penjawat awam dengan perbelanjaan mengurus"]
              ]
            }
          ],
          rubrik: [
            ["Tahap 1 (1–3 markah)", ["Pengetahuan terhad tentang teori atau konsep peranan kerajaan sebagai majikan sesuai dengan situasi", "Menyenaraikan fakta atau isi sahaja tanpa huraian", "Huraian tidak dijelaskan dengan baik dan kurang difahami", "Tiada pendirian"]],
            ["Tahap 2 (4–6 markah)", ["Berupaya mengaplikasikan fakta dan konsep peranan kerajaan sebagai majikan sesuai dengan situasi", "Menghuraikan fakta yang sesuai dan betul", "Sebahagian besar huraian masih tepat tetapi kurang mendalam", "Mengemukakan idea yang rasional dan masih sesuai serta relevan", "Ada pendirian", "Rajah umum, asas atau tidak lengkap", "Huraian rajah terhad"]],
            ["Tahap 3 (7–9 markah)", ["Berupaya mengaplikasikan fakta dan konsep peranan kerajaan sebagai majikan dengan betul, tepat dan jelas berdasarkan situasi", "Menghuraikan fakta dengan tepat, betul dan jelas", "Menilai kesan peranan kerajaan sebagai majikan dengan tepat dan matang", "Mengemukakan idea yang bernas, kreatif dan rasional", "Ada pendirian", "Rajah lengkap dan tepat", "Huraian rajah lengkap", "Menghubungkaitkan jawapan dengan pelbagai tajuk", "Membuat rumusan atau komen yang relevan, mendalam dan matang"]]
          ]
        }
      ]
    },

    /* ---------------- SOALAN 6 ---------------- */
    {
      no: 6,
      seksyen: "B",
      tajuk: "Penamatan subsidi telur ayam",
      konteks: petikan("Penamatan subsidi telur ayam: jangan buat pembelian panik", "PETALING JAYA – Orang ramai dinasihatkan agar tidak membuat pembelian panik susulan penamatan subsidi telur ayam secara berperingkat yang berkuat kuasa mulai 1 Mei 2025. Dijangkakan harga makanan berasaskan telur mungkin meningkat antara 30 hingga 40 peratus bermula bulan depan kerana peniaga perlu menyesuaikan operasi mereka akibat peningkatan kos. Situasi yang berterusan dibimbangkan akan menyebabkan orang ramai mula mengubah kaedah pembelian secara tunai kepada pembelian secara kredit.", "Sumber: Diubah suai daripada Kosmo online, 30 April 2025"),
      bahagian: [
        {
          kod: "(a)",
          s: "Jelaskan keadaan ekonomi yang akan berlaku dengan tindakan kerajaan tersebut.",
          m: 7,
          bab: "t5-b1",
          topik: "Inflasi tolakan kos",
          skema: [
            {
              isi: [
                ["H1", "Berlaku inflasi"],
                ["H2", "Inflasi tolakan kos"],
                ["H3", "Berlaku kenaikan kos pengeluaran"],
                ["H4", "Pengeluar memindahkan kenaikan kos pengeluaran kepada pengguna"],
                ["H5", "Pengguna panik dengan tindakan kerajaan menghapuskan subsidi telur"],
                ["H6", "Jangkaan harga masa depan meningkat (atau penentu permintaan lain)"],
                ["H7", "Pengguna meningkatkan permintaan"],
                ["H8", "Penawaran tidak berubah atau tetap"],
                ["H9", "Berlaku lebihan permintaan atau kekurangan penawaran"],
                ["H10", "Pengeluar tidak dapat menambah penawaran dalam jangka pendek"],
                ["H11", "Kapasiti pengeluaran ladang ternakan dan buruh terhad"],
                ["H12", "Telur ialah barang pertanian yang penawarannya tidak anjal"],
                ["H13", "Harga barang berasaskan telur dinaikkan"]
              ]
            }
          ],
          nota: "Maksimum 7 markah."
        },
        {
          kod: "(b)",
          s: "Adakah anda bersetuju dengan tindakan pembelian barangan yang dilakukan oleh orang ramai? Beri alasan.",
          m: 9,
          bab: "t5-b1",
          topik: "Inflasi",
          skema: [
            {
              label: CADANGAN,
              isi: [
                ["C1", "Pendirian: tidak setuju (atau setuju) dinyatakan dengan jelas"],
                ["C2", "Pembelian panik meningkatkan permintaan secara mendadak sedangkan penawaran tetap, maka berlaku lebihan permintaan"],
                ["C3", "Harga naik lebih tinggi dan inflasi semakin buruk"],
                ["C4", "Kekurangan bekalan dan penyorokan barang; golongan berpendapatan rendah paling terjejas"],
                ["C5", "Pembaziran kerana telur ialah barang tidak tahan lama"],
                ["C6", "Pembelian secara kredit menambah beban hutang dan mengurangkan tabungan"],
                ["C7", "Sisi lain: membeli lebih awal sebelum harga naik boleh menjimatkan perbelanjaan jangka pendek"],
                ["C8", "Rumusan: beli mengikut keperluan dan rancang belanjawan peribadi"]
              ]
            }
          ],
          rubrik: [
            ["Tahap 1 (1–3 markah)", ["Tiada pendirian", "Pengetahuan terhad tentang fakta dan konsep inflasi sesuai dengan situasi", "Menyenaraikan fakta atau isi sahaja tanpa huraian", "Huraian tentang konsep inflasi tidak dijelaskan dengan baik dan kurang difahami"]],
            ["Tahap 2 (4–6 markah)", ["Ada pendirian", "Berupaya mengaplikasikan fakta dan konsep inflasi dengan betul dan sesuai berdasarkan situasi", "Menghuraikan fakta atau isi dengan betul dan sesuai", "Sebahagian besar huraian masih tepat tetapi kurang mendalam", "Mengemukakan idea yang rasional dan masih sesuai serta relevan", "Membuat pertimbangan secara rasional"]],
            ["Tahap 3 (7–9 markah)", ["Berupaya mengaplikasikan fakta dan konsep inflasi dengan tepat, betul dan jelas berdasarkan situasi", "Menghuraikan fakta atau isi dengan tepat, betul dan jelas", "Menghuraikan dan menilai inflasi dengan tepat dan matang", "Mengemukakan idea yang bernas dan kreatif", "Membuat pertimbangan secara rasional", "Menghubungkaitkan jawapan dengan pelbagai tajuk", "Membuat kesimpulan, cadangan atau memberikan bukti dan data yang relevan"]]
          ]
        },
        {
          kod: "(c)",
          s: "Bagaimanakah kerajaan menggunakan syarat sewa beli untuk memastikan orang ramai tidak mengubah kaedah pembelian tersebut?",
          m: 4,
          bab: "t5-b1",
          topik: "Dasar kewangan: syarat sewa beli",
          skema: [
            {
              isi: [
                ["H1", "Mengetatkan syarat sewa beli"],
                ["H2", "Dasar kewangan menguncup"],
                ["H3", "Deposit pinjaman dinaikkan"],
                ["H4", "Tempoh bayaran balik pinjaman dipendekkan"],
                ["H5", "Kadar faedah pinjaman dinaikkan"],
                ["H6", "Kos pinjaman dan beban hutang meningkat"],
                ["H7", "Jumlah pinjaman jatuh"],
                ["H8", "Jumlah tabungan meningkat"],
                ["H9", "Pegangan tunai dan bekalan wang berkurang"],
                ["H10", "Kuasa beli dan permintaan jatuh"],
                ["H11", "Pembelian secara kredit dikurangkan"],
                ["H12", "Tingkat harga umum cenderung jatuh; inflasi terkawal"]
              ]
            }
          ],
          nota: "Maksimum 4 markah."
        }
      ]
    },

    /* ---------------- SOALAN 7 ---------------- */
    {
      no: 7,
      seksyen: "B",
      tajuk: "Prestasi ekonomi negara",
      konteks: petikan("Ekonomi Malaysia tumbuh 4.4 peratus suku pertama 2025, dipacu perbelanjaan isi rumah", "Ekonomi Malaysia berkembang pada kadar 4.4 peratus dalam suku pertama 2025 didorong oleh perbelanjaan isi rumah, berbanding 4.2 peratus dalam tempoh yang sama 2024. Beberapa dasar berkaitan gaji baharu diperkenalkan menyokong permintaan isi rumah.</p><p>Selain itu, lebihan akaun semasa lebih besar, iaitu 3.4 peratus dalam suku pertama 2025 berbanding 2.6 peratus pada suku keempat 2024, berikutan aliran masuk berterusan pelaburan langsung asing (FDI).", "Sumber: Diubah suai daripada sinarharian.com.my, 16 Mei 2025"),
      bahagian: [
        {
          kod: "(a)",
          s: "Dengan bantuan rajah, jelaskan kesan dasar gaji baharu terhadap permintaan isi rumah.",
          m: 7,
          bab: "t4-b2",
          topik: "Perubahan permintaan",
          rajah: RAJAH_DD_KANAN,
          skema: [
            {
              label: "Rajah",
              isi: [["Rajah", "Rajah lengkap: paksi berlabel, keluk D₀D₀ dan D₁D₁, harga P₀ serta kuantiti Q₀ dan Q₁", 3]]
            },
            {
              label: "Huraian (mana-mana 4)",
              isi: [
                ["H1", "Berlaku perubahan permintaan (permintaan meningkat)"],
                ["H2", "Disebabkan oleh penentu bukan harga, iaitu dasar kerajaan"],
                ["H3", "Pendapatan isi rumah meningkat"],
                ["H4", "Perubahan permintaan"],
                ["H5", "Keluk D₀D₀ beralih ke kanan menjadi D₁D₁"],
                ["H6", "Harga barangan tidak berubah, kekal pada P₀"],
                ["H7", "Kuantiti diminta meningkat daripada Q₀ kepada Q₁"]
              ]
            }
          ],
          nota: "Rajah lengkap 3 markah; keluk D₀D₀ sahaja 1 markah; keluk D₀D₀ dan D₁D₁ tetapi tidak lengkap 2 markah. Jawapan tanpa rajah: terima H1, H2, H3 dan H4 (maksimum 3 markah). Rajah 3 markah + mana-mana 4 huraian."
        },
        {
          kod: "(b)",
          s: "Sebagai warga negara yang rasional, anda mempunyai peranan mengukuhkan keadaan akaun semasa seperti suku pertama 2025. Kemukakan hujah anda.",
          m: 9,
          bab: "t5-b2",
          topik: "Akaun semasa",
          skema: [
            {
              label: CADANGAN,
              isi: [
                ["C1", "Membeli barangan buatan Malaysia supaya import barang nampak berkurang (akaun barangan)"],
                ["C2", "Melancong dalam negara supaya import perkhidmatan berkurang (akaun perkhidmatan)"],
                ["C3", "Menggunakan perkhidmatan pengangkutan, insurans dan perbankan tempatan"],
                ["C4", "Menjadi usahawan atau pengeksport yang menghasilkan produk berkualiti untuk pasaran luar"],
                ["C5", "Mempromosikan pelancongan Malaysia kepada rakan asing melalui media sosial (eksport perkhidmatan)"],
                ["C6", "Melabur di dalam negara dan membawa pulang pendapatan dari luar negara (pendapatan primer)"],
                ["C7", "Mengurangkan kebergantungan kepada pekerja asing supaya kiriman wang keluar berkurang (pendapatan sekunder)"],
                ["C8", "Rumusan: lebihan akaun semasa menambah rizab pertukaran asing dan mengukuhkan ringgit"]
              ]
            }
          ],
          rubrik: [
            ["Tahap 1 (1–3 markah)", ["Pengetahuan terhad tentang teori atau konsep akaun semasa dan komposisi eksport dan import", "Menyenaraikan fakta atau isi sahaja tanpa huraian", "Huraian tentang akaun semasa dan komposisi eksport dan import tidak dijelaskan dengan baik dan kurang difahami"]],
            ["Tahap 2 (4–6 markah)", ["Berupaya mengaplikasikan fakta dan konsep akaun semasa dan komposisi eksport dan import", "Menghuraikan fakta yang sesuai dan betul", "Sebahagian besar huraian masih tepat tetapi kurang mendalam", "Mengemukakan idea yang rasional dan masih sesuai serta relevan", "Rajah umum, asas atau tidak lengkap", "Huraian rajah terhad"]],
            ["Tahap 3 (7–9 markah)", ["Berupaya mengaplikasikan fakta dan konsep akaun semasa dengan betul, tepat dan jelas berdasarkan situasi", "Menghuraikan fakta dengan tepat, betul dan jelas", "Menilai kesan akaun semasa dan komposisi eksport dan import dengan tepat dan matang", "Mengemukakan idea yang bernas, kreatif dan rasional", "Rajah lengkap dan tepat", "Huraian rajah lengkap", "Menghubungkaitkan jawapan dengan pelbagai tajuk", "Menyatakan pendirian atau membuat rumusan yang relevan, mendalam dan matang"]]
          ]
        },
        {
          kod: "(c)",
          s: "Keadaan pelaburan langsung asing (FDI) memberi kebaikan kepada ekonomi negara. Setujukah anda dengan pernyataan tersebut? Kemukakan alasan.",
          m: 4,
          bab: "t5-b2",
          topik: "Pelaburan langsung asing",
          skema: [
            {
              label: "Setuju",
              isi: [
                ["F1", "Setuju"],
                ["H1", "Berlaku pertumbuhan ekonomi"],
                ["H2", "Pengeluaran barang dan perkhidmatan serta produktiviti meningkat"],
                ["H3", "Penggunaan teknologi canggih meningkat"],
                ["H4", "Kemahiran modal insan meningkat"],
                ["H5", "Modal pelaburan meningkat"],
                ["H6", "Produktiviti dan kemahiran pekerja meningkat"],
                ["H7", "Berlaku pemindahan teknologi; teknologi terkini dibawa masuk"],
                ["H8", "Kualiti keluaran meningkat"],
                ["H9", "Daya saing keluaran tempatan meningkat"],
                ["H10", "Keuntungan firma tempatan meningkat"],
                ["H11", "Eksport meningkat"],
                ["H12", "Aliran masuk wang meningkat"],
                ["H13", "Pendapatan negara meningkat"]
              ]
            },
            {
              label: "ATAU Tidak setuju",
              isi: [
                ["F2", "Tidak setuju"],
                ["H14", "Berlaku ketidakseimbangan pendapatan dalam negara"],
                ["H15", "Perbezaan upah atau gaji firma asing dengan firma tempatan"],
                ["H16", "Jurang pendapatan rakyat semakin besar"],
                ["H17", "Kemusnahan alam semula jadi"],
                ["H18", "Eksploitasi sumber negara"],
                ["H19", "Aliran untung ke luar negara"],
                ["H20", "Aliran keluar modal atau wang"],
                ["H21", "Menjejaskan imbangan pembayaran negara dan nilai ringgit"]
              ]
            }
          ],
          nota: "F + mana-mana 3 H (maksimum 4 markah)."
        }
      ]
    }
    ]
  });
})();
