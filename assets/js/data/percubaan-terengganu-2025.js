/* =========================================================
   Modul Perkembangan Pembelajaran SPM 2025 (MPP3) Terengganu
   Ekonomi 3767 · disediakan oleh Panel AKRAM Negeri Terengganu.
   Soalan ditaip semula daripada kertas asal; jawapan dan isi
   markah mengikut peraturan pemarkahan (skema) dalam repo.
   ========================================================= */
(function () {
  "use strict";
  var E = window.EKO;

  function p(teks) {
    return "<p>" + teks + "</p>";
  }
  function petik(html) {
    return '<div class="petik">' + html + "</div>";
  }
  function petikan(tajuk, isi, sumber) {
    return (tajuk ? '<b class="tajuk-petikan">' + tajuk + "</b>" : "") + "<p>" + isi + "</p>" + (sumber ? '<p class="sumber" style="text-align:right">' + sumber + "</p>" : "");
  }
  function roman(senarai) {
    return '<ol class="roman">' + senarai.map(function (x) {
      return "<li>" + x + "</li>";
    }).join("") + "</ol>";
  }
  function jadual(kepala, baris, kapsyen) {
    return (
      '<div class="jadual"><table>' + (kapsyen ? "<caption>" + kapsyen + "</caption>" : "") +
      "<thead><tr>" + kepala.map(function (k) {
        return "<th>" + k + "</th>";
      }).join("") + "</tr></thead><tbody>" +
      baris.map(function (b) {
        return "<tr>" + b.map(function (x) {
          return "<td>" + x + "</td>";
        }).join("") + "</tr>";
      }).join("") +
      "</tbody></table></div>"
    );
  }
  var DUA = ["I dan II", "I dan IV", "II dan III", "III dan IV"];
  var BS = ["I betul, II salah", "I salah, II betul", "I salah, II salah", "I betul, II betul"];
  var CADANGAN = "Cadangan isi (disediakan untuk latihan, bukan skema rasmi)";

  /* ---------- rajah statik ---------- */
  var KECIL = { lebar: 300, tinggi: 220, x: [0, 10], y: [0, 10], labelX: "Kuantiti (kg)" };
  function rajah(o) {
    return Object.assign({}, KECIL, o);
  }

  // S5: permintaan berkurang pada harga P
  var RAJAH_S5 = {
    lebar: 360,
    tinggi: 250,
    keluk: [
      { dari: [2.5, 9], ke: [9, 2.5], kelas: "d nipis", label: "D₀", dx: 4, dy: 4 },
      { dari: [1, 7.5], ke: [7.5, 1], kelas: "d", label: "D₁", dx: 4, dy: 4 }
    ],
    panduan: [
      { q: 5.5, p: 6, ly: "P", lx: "Q₀" },
      { q: 2.5, p: 6, lx: "Q₁" }
    ],
    panah: [{ dari: [4.3, 8.1], ke: [2.6, 8.1], kelas: "d" }]
  };

  // S6: empat pilihan rajah
  var RAJAH_S6 = [
    rajah({
      label: "A",
      keluk: [
        { dari: [1, 8], ke: [7, 2], kelas: "d nipis", label: "D₀", dx: 3, dy: 4 },
        { dari: [2.5, 8], ke: [8.5, 2], kelas: "d", label: "D₁", dx: 3, dy: 4 }
      ],
      panduan: [
        { q: 3, p: 6, ly: "P₀", lx: "Q₀" },
        { q: 4.5, p: 6, lx: "Q₁" }
      ],
      panah: [{ dari: [2.4, 7.4], ke: [3.8, 7.4], kelas: "d" }]
    }),
    rajah({
      label: "B",
      keluk: [
        { dari: [1, 2], ke: [6.5, 8.5], kelas: "s nipis", label: "S₀", dx: 3, dy: 0 },
        { dari: [3, 2], ke: [8.5, 8.5], kelas: "s", label: "S₁", dx: 3, dy: 0 }
      ],
      panduan: [
        { q: 4.4, p: 6, ly: "P₀", lx: "Q₀" },
        { q: 6.4, p: 6, lx: "Q₁" }
      ],
      panah: [{ dari: [5.6, 7.2], ke: [7.2, 7.2], kelas: "s" }]
    }),
    rajah({
      label: "C",
      keluk: [
        { dari: [3, 2], ke: [8.5, 8.5], kelas: "s nipis", label: "S₀", dx: 3, dy: 0 },
        { dari: [1, 2], ke: [6.5, 8.5], kelas: "s", label: "S₁", dx: 3, dy: 0 }
      ],
      panduan: [
        { q: 6.4, p: 6, ly: "P₀", lx: "Q₀" },
        { q: 4.4, p: 6, lx: "Q₁" }
      ],
      panah: [{ dari: [7.2, 7.2], ke: [5.6, 7.2], kelas: "s" }]
    }),
    rajah({
      label: "D",
      keluk: [
        { dari: [2.5, 8], ke: [8.5, 2], kelas: "d nipis", label: "D₀", dx: 3, dy: 4 },
        { dari: [1, 8], ke: [7, 2], kelas: "d", label: "D₁", dx: 3, dy: 4 }
      ],
      panduan: [
        { q: 4.5, p: 6, ly: "P₀", lx: "Q₀" },
        { q: 3, p: 6, lx: "Q₁" }
      ],
      panah: [{ dari: [3.8, 7.4], ke: [2.4, 7.4], kelas: "d" }]
    })
  ];

  // S7: penawaran bertambah, titik x ke y
  var RAJAH_S7 = {
    lebar: 360,
    tinggi: 250,
    labelX: "Kuantiti (unit)",
    keluk: [
      { dari: [1, 1.5], ke: [6, 9], kelas: "s nipis", label: "S₀", dx: 3, dy: 0 },
      { dari: [3, 1.5], ke: [8, 9], kelas: "s", label: "S₁", dx: 3, dy: 0 }
    ],
    panduan: [
      { q: 4, p: 6, ly: "P₀", lx: "Q₀" },
      { q: 6, p: 6, lx: "Q₁" }
    ],
    titik: [
      { q: 4, p: 6, label: "x", dx: -12, dy: -8 },
      { q: 6, p: 6, label: "y", dx: 6, dy: -8 }
    ],
    panah: [{ dari: [5.4, 8.2], ke: [7, 8.2], kelas: "s" }]
  };

  // S8: pasaran kasut sekolah, penawaran berkurang
  var RAJAH_S8 = {
    lebar: 360,
    tinggi: 250,
    labelX: "Kuantiti (unit)",
    keluk: [
      { dari: [1.5, 9], ke: [9, 1.5], kelas: "d", label: "D₀", dx: 4, dy: 4 },
      { dari: [2, 1], ke: [9, 8], kelas: "s nipis", label: "S₀", dx: 3, dy: 0 },
      { dari: [0.5, 2], ke: [7.5, 9], kelas: "s", label: "S₁", dx: 3, dy: 0 }
    ],
    panduan: [
      { q: 5.75, p: 4.75, ly: "P₀", lx: "Q₀" },
      { q: 4.5, p: 6, ly: "P₁", lx: "Q₁" }
    ],
    titik: [
      { q: 5.75, p: 4.75, label: "E₀", dx: 8, dy: 4 },
      { q: 4.5, p: 6, label: "E₁", dx: -2, dy: -9, anchor: "end" }
    ],
    panah: [{ dari: [8.2, 7.4], ke: [6.4, 7.4], kelas: "s" }]
  };

  // S9: keluk permintaan dengan dua titik
  var RAJAH_S9 = {
    lebar: 360,
    tinggi: 250,
    x: [0, 50],
    y: [0, 8],
    labelX: "Kuantiti (unit)",
    keluk: [{ dari: [8, 7.6], ke: [47, 2.4], kelas: "d", label: "D", dx: 4, dy: 4 }],
    panduan: [
      { q: 20, p: 6, ly: "6", lx: "20" },
      { q: 35, p: 4, ly: "4", lx: "35" }
    ],
    panah: [{ dari: [11, 4.3], ke: [11, 5.7], kelas: "" }]
  };

  // S10: perubahan harga 2%, perubahan kuantiti 10%
  var RAJAH_S10 = {
    lebar: 360,
    tinggi: 250,
    labelX: "Kuantiti (unit)",
    keluk: [{ dari: [1, 8.2], ke: [9.4, 3.4], kelas: "d", label: "D", dx: 4, dy: 4 }],
    panduan: [
      { q: 3.5, p: 6.77 },
      { q: 7, p: 4.77 }
    ],
    teks: [
      { q: 1.4, p: 5.6, t: "2%" },
      { q: 4.6, p: 1.6, t: "10%" }
    ]
  };

  // S12: keluk penawaran bermula dari paksi harga
  var RAJAH_S12 = {
    lebar: 360,
    tinggi: 250,
    labelX: "Kuantiti (unit)",
    keluk: [{ dari: [0, 3], ke: [8, 7], kelas: "s", label: "S", dx: 4, dy: 0 }],
    panduan: [
      { q: 2, p: 4, ly: "P₀", lx: "Q₀" },
      { q: 6, p: 6, ly: "P₁", lx: "Q₁" }
    ]
  };

  /* =========================================================
     KERTAS 1 (3767/1) · 40 soalan objektif
     ========================================================= */
  E.daftarSet({
    id: "trg25-k1",
    label: "MPP3 SPM 2025 Terengganu · Kertas 1",
    labelPendek: "MPP3 Terengganu 2025 K1",
    soalan: [
      {
        bab: "t4-b1",
        s: p("Maklumat berikut berkaitan dengan satu faktor pengeluaran.") + petik("Menyumbangkan tenaga fizikal dan mental dalam menghasilkan barang dan perkhidmatan") + p("Sumber tersebut mestilah"),
        p: ["mampu menanggung risiko tinggi", "menerima faedah yang tinggi", "mempunyai mobiliti geografi", "mampu menghadapi risiko"],
        j: 2,
        e: "Faktor itu ialah buruh. Buruh mempunyai mobiliti geografi (boleh berpindah tempat kerja). Menanggung risiko ialah ciri usahawan, manakala faedah ialah ganjaran kepada modal."
      },
      {
        bab: "t4-b1",
        s: p("Jadual berikut menunjukkan pengeluaran sebuah firma bagi dua jenis barang.") + jadual(["Produk", "Kombinasi A", "Kombinasi B"], [["Kopi", "20 unit", "60 unit"], ["Teh", "85 unit", "55 unit"]]) + p("Berapakah kos lepas jika kombinasi keluaran berubah daripada A ke B?"),
        p: ["20 unit kopi", "40 unit kopi", "30 unit teh", "60 unit teh"],
        j: 2,
        e: "Dari A ke B, kopi bertambah 40 unit tetapi teh berkurang daripada 85 kepada 55 unit. Kos lepas ialah barang yang dikorbankan, iaitu 30 unit teh."
      },
      {
        bab: "t4-b1",
        s: p("Maklumat berikut berkaitan dengan masalah asas ekonomi.") + petik("Syarikat A membekalkan peralatan pejabat dengan menggunakan 20 orang pekerja tempatan bagi memenuhi permintaan pasaran.") + p("Antara berikut, masalah apakah yang telah diselesaikan?") + roman(["Apa yang hendak dikeluarkan", "Bagaimana hendak dikeluarkan", "Untuk siapa hendak dikeluarkan", "Berapa yang hendak dikeluarkan"]),
        p: ["I dan II", "I dan IV", "II dan III", "III dan IV"],
        j: 0,
        e: "Syarikat telah menentukan apa yang dikeluarkan (peralatan pejabat) dan bagaimana mengeluarkannya (menggunakan 20 pekerja tempatan)."
      },
      {
        bab: "t4-b1",
        s: "Apakah ciri sistem ekonomi perancangan pusat?",
        p: ["Pilihan pengguna pelbagai", "Harga ditentukan oleh kuasa pasaran", "Wujud persaingan bebas antara firma", "Motif adalah memaksimumkan kebajikan rakyat"],
        j: 3,
        e: "Dalam sistem ekonomi perancangan pusat, kerajaan membuat semua keputusan dengan motif memaksimumkan kebajikan rakyat. A, B dan C ialah ciri sistem ekonomi pasaran bebas."
      },
      {
        bab: "t4-b2",
        s: "Rajah berikut menunjukkan keluk permintaan bagi suatu barang. Penentu yang manakah menyebabkan peralihan keluk tersebut?",
        g: RAJAH_S5,
        p: ["Pendapatan individu menurun", "Kadar cukai pendapatan turun", "Harga barang penggenap jatuh", "Objektif firma meminimumkan kos"],
        j: 0,
        e: "Keluk permintaan beralih ke kiri pada harga yang sama (permintaan berkurang). Pendapatan yang menurun mengurangkan kuasa beli. B dan C menambah permintaan, manakala D ialah penentu penawaran."
      },
      {
        bab: "t4-b2",
        s: "Rajah yang manakah betul tentang peningkatan pendapatan?",
        g: RAJAH_S6,
        p: ["A", "B", "C", "D"],
        j: 0,
        e: "Peningkatan pendapatan menambah permintaan barang normal, maka keluk DD beralih ke kanan pada harga yang sama (Rajah A). Rajah B dan C menunjukkan perubahan penawaran, manakala D menunjukkan permintaan berkurang."
      },
      {
        bab: "t4-b2",
        s: p("Rajah berikut berkaitan dengan keluk penawaran. Antara berikut, yang manakah menyebabkan berlaku peralihan titik dari <b>x</b> ke <b>y</b>?") + roman(["Bayaran upah pekerja meningkat", "Cukai import meningkat oleh kerajaan", "Jangkaan harga pada masa depan menurun", "Objektif firma adalah memaksimumkan jualan"]),
        g: RAJAH_S7,
        p: DUA,
        j: 3,
        e: "Titik x ke y menunjukkan penawaran bertambah (keluk beralih ke kanan). Jangkaan harga jatuh mendorong firma menjual lebih banyak sekarang, dan firma yang memaksimumkan jualan menawarkan lebih banyak. Kenaikan upah dan cukai import menambah kos, maka penawaran berkurang."
      },
      {
        bab: "t4-b2",
        s: "Rajah berikut menunjukkan keseimbangan dalam pasaran kasut sekolah. Pilih pernyataan yang betul berkenaan dengan rajah tersebut.",
        g: RAJAH_S8,
        p: ["Jangkaan harga menurun pada masa depan", "Berlaku penurunan harga kasut sekolah", "Kerajaan menurunkan cukai jualan", "Tingkat teknologi menurun"],
        j: 3,
        e: "Keluk penawaran beralih ke kiri (S₀ ke S₁) dan harga keseimbangan naik (P₀ ke P₁). Penurunan teknologi menaikkan kos dan mengurangkan penawaran. A dan C menambah penawaran; B tidak menyebabkan peralihan keluk."
      },
      {
        bab: "t4-b2",
        s: "Rajah berikut ialah keluk permintaan suatu barang. Berapakah nilai pekali keanjalan barang tersebut?",
        g: RAJAH_S9,
        p: ["0.21", "0.43", "0.86", "4.65"],
        j: 2,
        e: "Ed = %ΔQ ÷ %ΔP = [(20 − 35) ÷ 35] ÷ [(6 − 4) ÷ 4] = 0.4286 ÷ 0.5 = 0.86 (tidak anjal)."
      },
      {
        bab: "t4-b2",
        s: "Rajah tersebut ialah keluk permintaan suatu barang. Pilih pernyataan yang betul tentang rajah tersebut.",
        g: RAJAH_S10,
        p: ["Contoh barang adalah beras", "Nilai pekali keanjalan ialah 5", "Pengguna kurang responsif terhadap harga", "Jumlah hasil meningkat jika harga dinaikkan"],
        j: 1,
        e: "Ed = 10% ÷ 2% = 5 (anjal). Pengguna sangat responsif terhadap harga; menaikkan harga akan mengurangkan jumlah hasil. Beras ialah barang keperluan yang tidak anjal."
      },
      {
        bab: "t4-b2",
        s: p("Maklumat berikut berkaitan dengan keanjalan harga permintaan barang A.") + petik("Tindakan penjual menurunkan harga barang A menyebabkan jumlah hasil diterimanya meningkat.") + p("Pernyataan yang manakah betul mengenai barang A?"),
        p: ["Merupakan barang anjal", "Bentuk keluk adalah curam", "Nilai pekali keanjalan kurang daripada 1", "Contoh barang A ialah barang keperluan"],
        j: 0,
        e: "Penurunan harga menambah jumlah hasil hanya jika permintaan anjal (Ed > 1). Keluk anjal lebih landai, dan barang keperluan biasanya tidak anjal."
      },
      {
        bab: "t4-b2",
        s: "Rajah berikut merupakan keluk penawaran suatu barang. Pernyataan yang manakah betul?",
        g: RAJAH_S12,
        p: ["Peratus perubahan harga melebihi peratus perubahan kuantiti", "Berlakunya perubahan dalam kuantiti ditawar", "Contoh barang adalah barang kemas", "Keluk penawaran adalah tidak anjal"],
        j: 1,
        e: "Perubahan harga P₀ ke P₁ menyebabkan pergerakan di sepanjang keluk, iaitu perubahan kuantiti ditawar Q₀ ke Q₁. Keluk yang bermula dari paksi harga menunjukkan penawaran anjal."
      },
      {
        bab: "t4-b2",
        s: "Sesuatu barang cenderung menjadi tak anjal harga permintaan jika barang itu",
        p: ["ialah barang kehendak", "banyak barang pengganti", "mempunyai banyak kegunaan", "perbelanjaan merupakan sebahagian kecil daripada pendapatan"],
        j: 3,
        e: "Jika perbelanjaan ke atas barang itu kecil berbanding pendapatan (contoh garam atau mancis), perubahan harga hampir tidak mempengaruhi kuantiti diminta. A, B dan C menjadikan permintaan anjal."
      },
      {
        bab: "t4-b3",
        s: "Situasi yang manakah menunjukkan fungsi wang sebagai alat penyimpan nilai?",
        p: ["Encik Lokman membayar kereta RM700 sebulan", "Cik Alisa memotong sebahagian gajinya ke akaun Tabung Haji", "Mak Esah membuat bayaran terus barang runcit yang dibelinya", "Puan Wana pergi ke beberapa buah kedai emas untuk banding harga gelang emas"],
        j: 1,
        e: "Menyimpan wang di Tabung Haji menunjukkan fungsi alat penyimpan nilai. A ialah alat bayaran tertunda, C alat perantaraan pertukaran dan D alat pengukur nilai."
      },
      {
        bab: "t4-b3",
        s: p("Antara berikut, yang manakah menunjukkan persamaan antara pinjaman bercagar dengan pinjaman peribadi di bank perdagangan?") + roman(["Memerlukan penjamin", "Dikenakan kadar faedah", "Peminjam mestilah berpendapatan tetap", "Hartanah diperlukan untuk dapat pinjaman"]),
        p: DUA,
        j: 2,
        e: "Kedua-dua pinjaman dikenakan faedah dan memerlukan peminjam yang berpendapatan tetap. Cagaran hartanah hanya diperlukan untuk pinjaman bercagar."
      },
      {
        bab: "t4-b3",
        s: p("Maklumat berikut berkaitan prinsip dalam perbankan Islam.") + petik("Bertindak sebagai wakil untuk menjaga harta pelanggan") + p("Apakah prinsip tersebut?"),
        p: ["Bai Bithaman Ajil", "Mudharabah", "Wadiah", "Takjiri"],
        j: 2,
        e: "Wadiah ialah prinsip simpanan: bank bertindak sebagai pemegang amanah yang menjaga harta pelanggan. Mudharabah ialah perkongsian untung, manakala Bai Bithaman Ajil ialah jual beli dengan bayaran tertangguh."
      },
      {
        bab: "t4-b3",
        s: p("Maklumat berikut berkaitan dengan pemilihan pekerjaan Puan Fatin.") + petik("<b>Jawatan Pensyarah</b><br>• Mempunyai Ijazah Sarjana Ekonomi<br>• Cuti tahunan 30 hari setahun<br>• Berminat boleh hubungi Encik Alias") + p("Antara berikut, yang manakah merupakan faktor pemilihan pekerjaan Puan Fatin untuk memohon jawatan tersebut?") + roman(["Upah wang", "Waktu bekerja", "Faedah sampingan", "Kelayakan akademik"]),
        p: DUA,
        j: 3,
        e: "Cuti tahunan ialah faedah sampingan dan ijazah sarjana ialah kelayakan akademik. Maklumat upah dan waktu bekerja tidak dinyatakan."
      },
      {
        bab: "t4-b3",
        s: p("Maklumat berikut adalah berkaitan upah benar Encik Asmuni bagi tahun 2024.") + petik("<b>Tahun 2024</b><br>• Upah wang: RM3 000<br>• Harga barang A: RM20<br>• Harga barang B: RM10") + p("Apakah yang berlaku jika harga purata meningkat kepada RM20?"),
        p: ["Meningkatkan kuasa beli", "Upah wang akan merosot", "Upah benar akan menurun", "Memperolehi lebih banyak barang"],
        j: 2,
        e: "Harga purata asal ialah (20 + 10) ÷ 2 = RM15, maka upah benar = 3 000 ÷ 15 = 200 unit. Jika harga purata naik kepada RM20, upah benar menjadi 150 unit. Upah wang kekal RM3 000."
      },
      {
        bab: "t4-b3",
        s: "Padanan yang manakah betul, kaitan antara pelbagai kerjaya dengan matlamat pendapatan peribadi?",
        p: [
          "<b>Kemahiran</b>: individu yang mempunyai kemahiran komunikasi dan literasi komputer menerima pendapatan yang tinggi",
          "<b>Pilihan pendidikan</b>: risiko yang tinggi dibayar gaji yang lebih tinggi berbanding dengan pekerjaan berisiko rendah",
          "<b>Keusahawanan</b>: individu yang mempunyai kelayakan akademik yang tinggi akan menerima pendapatan yang lebih tinggi",
          "<b>Pilihan kerjaya</b>: individu yang bijak merebut peluang berupaya menjana pendapatan peribadi yang tinggi"
        ],
        j: 0,
        e: "B sebenarnya menerangkan pilihan kerjaya berisiko, C menerangkan pilihan pendidikan dan D menerangkan keusahawanan."
      },
      {
        bab: "t4-b3",
        s: "Pasangan yang manakah betul?",
        p: [
          "<b>Bayaran pindahan</b>: pulangan kepada individu yang memberi hak penggunaan sumber kepada orang lain",
          "<b>Faedah</b>: ganjaran diterima kerana sanggup menangguhkan perbelanjaan semasa",
          "<b>Dividen</b>: pendapatan kepada faktor pengeluaran yang tidak produktif",
          "<b>Sewa</b>: ganjaran kepada pemegang saham syarikat"
        ],
        j: 1,
        e: "Faedah ialah ganjaran kerana menabung (menangguhkan penggunaan semasa). A menerangkan sewa, D menerangkan dividen, manakala bayaran pindahan diterima tanpa sumbangan faktor pengeluaran."
      },
      {
        bab: "t4-b3",
        s: p("Maklumat berikut berkaitan dengan satu jenis pelaburan dalam ekonomi.") + petik("Pelaburan ini mempunyai risiko yang rendah kerana kurang terdedah kepada ketidakstabilan nilai") + p("Apakah pelaburan tersebut?"),
        p: ["Hartanah", "Saham syarikat", "Logam berharga", "Urus niaga pertukaran asing (FOREX)"],
        j: 2,
        e: "Logam berharga seperti emas mempunyai nilai yang stabil dan berisiko rendah. Saham dan FOREX mudah terdedah kepada turun naik nilai."
      },
      {
        bab: "t4-b4",
        s: p("Gambar berikut menunjukkan satu input yang digunakan dalam proses pengeluaran.") + petik('<b>Syarikat perikanan Labuan muncul pemain utama pasaran tuna, makanan laut global</b><br><span class="teks-lemah">[Gambar: ikan tuna]<br>Sumber: www.bhonline.com.my, 25 Mei 2025</span>') + p("Pernyataan yang manakah betul tentang input tersebut?"),
        p: ["Perbelanjaan yang ditanggung ialah kos tetap", "Jumlah penggunaan tetap pada setiap tingkat output", "Kewujudan berlaku pada masa keluaran belum bermula", "Berhubung secara langsung dengan perubahan keluaran"],
        j: 3,
        e: "Ikan tuna ialah bahan mentah, iaitu input berubah. Kos berubah berubah secara langsung dengan jumlah keluaran dan sifar apabila tiada keluaran."
      },
      {
        bab: "t4-b4",
        s: p("Jadual berikut menunjukkan hubungan antara jumlah keluaran dengan kos berubah.") + jadual(["Jumlah keluaran (unit)", "Kos berubah (RM)"], [["20", "40"], ["40", "60"]]) + p("Berapakah kos purata pada tingkat keluaran 40 unit, jika kos tetap adalah RM100?"),
        p: ["RM1.50", "RM2.50", "RM4.00", "RM5.00"],
        j: 2,
        e: "TC = TFC + TVC = 100 + 60 = RM160. AC = 160 ÷ 40 = RM4.00."
      },
      {
        bab: "t4-b4",
        s: p("Maklumat berikut berkaitan sebuah projek pembangunan Kerajaan Persekutuan.") + petik(petikan("Projek ECRL capai kemajuan 82 peratus.", "Menteri Pengangkutan berkata kerja-kerja pemasangan landasan yang merupakan komponen utama bagi Projek ECRL telah berjaya disempurnakan sepanjang 400 kilometer meliputi landasan jajaran utama dari Maran, Pahang ke Kota Bharu, Kelantan.", "Sumber: www.sinarharian.com.my, 6 Mei 2025")) + p("Apakah kos sosial yang terlibat?"),
        p: ["Pertambahan dalam perbelanjaan pembangunan", "Kenaikan nilai hartanah di kawasan sekitar", "Pertambahan gaji pengawal keselamatan", "Kenaikan pembayaran bil perubatan"],
        j: 3,
        e: "Kos sosial ialah kos luaran yang ditanggung masyarakat, contohnya pencemaran habuk dan bunyi semasa pembinaan yang menjejaskan kesihatan penduduk. A dan C ialah kos persendirian; B ialah faedah luaran."
      },
      {
        bab: "t5-b1",
        s: "Kerajaan mengawal kesan luaran negatif dengan",
        p: ["melaksanakan dasar fiskal", "menggunakan dasar kewangan", "menggubal akta dan undang-undang", "mengenakan kawalan harga keluaran firma"],
        j: 2,
        e: "Buku teks 1.1.3: kerajaan mengawal selia eksternaliti negatif melalui undang-undang dan peraturan, subsidi dan cukai."
      },
      {
        bab: "t5-b1",
        s: "Pernyataan yang manakah betul tentang objektif makroekonomi negara?",
        p: ["Ketidakstabilan harga menjamin kestabilan kuasa beli masyarakat", "Pertumbuhan ekonomi dapat meningkatkan taraf hidup masyarakat", "Pengangguran mengukur jumlah tenaga buruh yang terlibat dalam sebarang kegiatan ekonomi", "Imbangan pembayaran merekodkan aliran wang masuk perdagangan antarabangsa dalam tempoh satu tahun"],
        j: 1,
        e: "Pertumbuhan ekonomi menambah pendapatan dan pekerjaan, maka taraf hidup meningkat. Imbangan pembayaran merekod penerimaan dan pembayaran, bukan aliran masuk sahaja."
      },
      {
        bab: "t5-b1",
        s: p("Maklumat berikut berkaitan dengan satu penunjuk ekonomi.") + petik(petikan("", "Indeks Harga Pengguna (IHP) Julai 2023 naik 4.7% berbanding tahun sebelumnya.", "Sumber: BH Online, 27 Ogos 2023")) + p("Situasi yang manakah berkaitan dengan maklumat tersebut?"),
        p: ["Dasar fiskal mengembang dilaksanakan oleh kerajaan", "Kos sara hidup masyarakat bertambah", "Eksport negara cenderung meningkat", "Pelaburan firma tinggi"],
        j: 1,
        e: "Kenaikan IHP bermaksud tingkat harga umum naik (inflasi), maka kos sara hidup bertambah dan kuasa beli merosot."
      },
      {
        bab: "t5-b1",
        s: "Pilih pasangan yang betul.",
        p: [
          "<b>Tarikan permintaan</b>: negara rakan dagang mengalami peningkatan harga secara berterusan",
          "<b>Tolakan kos</b>: sukar menambah keluaran semasa ekonomi mencapai guna tenaga penuh",
          "<b>Tarikan permintaan</b>: wujud akibat kejatuhan nilai mata wang tempatan negara",
          "<b>Tolakan kos</b>: berlaku apabila pengeluar ingin mengekalkan margin untung"
        ],
        j: 3,
        e: "Pengeluar memindahkan kenaikan kos kepada pengguna untuk mengekalkan margin keuntungan (tolakan kos). A dan C menerangkan inflasi diimport; B menerangkan tarikan permintaan."
      },
      {
        bab: "t5-b1",
        s: "Apakah kesan ke atas firma apabila kadar faedah tinggi dalam pasaran?",
        p: ["Tekanan inflasi menjadi tinggi", "Bilangan penganggur meningkat", "Kos pinjaman perniagaan bertambah", "Perbelanjaan penggunaan lebih banyak"],
        j: 2,
        e: "Kadar faedah ialah kos pinjaman. Kadar yang tinggi menambah kos pinjaman firma, maka pelaburan berkurang."
      },
      {
        bab: "t5-b1",
        s: "Maklumat yang manakah betul tentang pelaksanaan dasar kewangan dalam mencapai objektif makroekonomi?",
        p: [
          "Imbangan pembayaran · melonggarkan syarat sewa beli · aliran masuk wang meningkat",
          "Kestabilan harga · menjual surat jaminan kerajaan · tingkat harga umum naik",
          "Pertumbuhan ekonomi · menaikkan kadar faedah pinjaman · kos pengeluaran berkurang",
          "Guna tenaga penuh · menurunkan nisbah rizab berkanun · peluang pekerjaan menurun"
        ],
        j: 0,
        e: "Buku teks 1.3.9: syarat sewa beli yang longgar menambah peluang pelaburan, maka aliran masuk wang meningkat. B, C dan D mempunyai kesan yang terbalik."
      },
      {
        bab: "t5-b2",
        s: "Apakah faktor yang menyebabkan berlakunya kegiatan import dalam perdagangan antarabangsa?",
        p: ["Cita rasa masyarakat yang cenderung menggunakan keluaran tempatan", "Upah buruh tempatan yang secara relatif lebih murah", "Kekayaan sumber semula jadi dalam negara", "Tarikan perbezaan budaya luar"],
        j: 3,
        e: "Perbezaan budaya dan cita rasa mendorong rakyat membeli barang dari luar negara. A, B dan C menggalakkan pengeluaran tempatan atau eksport."
      },
      {
        bab: "t5-b2",
        s: "Apakah kesan negatif pelaksanaan tarif dalam kegiatan perdagangan antarabangsa?",
        p: ["Jumlah pengeluaran kereta tempatan kurang berbanding kereta import", "Kecekapan pengeluaran industri penggantian import jatuh", "Masyarakat menggunakan barang yang bermutu rendah", "Perbelanjaan pengguna semakin merosot"],
        j: 3,
        e: "Skema memberi D: tarif menaikkan harga barang import, maka kuasa beli dan perbelanjaan pengguna merosot. Nota: B dan C juga disenaraikan dalam buku teks (2.2.4) sebagai kesan negatif tarif, tetapi jawapan skema ialah D."
      },
      {
        bab: "t5-b2",
        s: "Pasangan yang manakah betul?",
        p: [
          "<b>Eksport barang nampak</b>: Kerajaan Korea memberi bantuan kewangan kepada mangsa banjir di Pahang",
          "<b>Import barang tak nampak</b>: Persatuan Badminton Malaysia menggunakan khidmat jurulatih Hendrawan dari Indonesia",
          "<b>Import barang nampak</b>: Syarikat pengangkutan dari Thailand menyewa kapal kargo milik Malaysia",
          "<b>Eksport barang tak nampak</b>: Encik Anuar dari Perlis menghantar anaknya belajar dalam bidang Ekonomi di Jerman"
        ],
        j: 1,
        e: "Khidmat jurulatih asing ialah perkhidmatan yang dibeli daripada rakyat asing. A ialah pendapatan sekunder (bantuan), C ialah eksport barang tak nampak dan D ialah import barang tak nampak."
      },
      {
        bab: "t5-b2",
        s: "Situasi yang manakah menyebabkan berlakunya permintaan mata wang asing?",
        p: ["Syarikat Hong Kong yang beroperasi di Kemaman menyewa kapal milik MISC Berhad untuk menghantar barang", "Kerajaan membeli vaksin Pfizer dari Jerman bagi melaksanakan program imunisasi kebangsaan", "MARA membayar gaji pensyarah dari United Kingdom di Kolej Profesional Mara Ayer Keroh", "Syarikat Berkuasa mengambil alih sebuah kilang pakaian milik Jepun di Kelantan"],
        j: 1,
        e: "Kerajaan perlu membayar pengeksport di Jerman dalam mata wang asing, maka wujud permintaan terhadap mata wang asing (import). A pula mewujudkan penerimaan dan permintaan terhadap ringgit."
      },
      {
        bab: "t4-b1",
        s: p("Tentukan sama ada pernyataan berikut betul atau salah.") + roman(["Firma menghadapi masalah kekurangan sumber ekonomi", "Kekurangan sumber ekonomi mewujudkan pilihan yang memaksimumkan kepuasan"]),
        p: BS,
        j: 0,
        e: "Semua unit ekonomi, termasuk firma, menghadapi kekurangan. Pernyataan II salah kerana pilihan firma bertujuan memaksimumkan keuntungan; hanya isi rumah memaksimumkan kepuasan."
      },
      {
        bab: "t4-b2",
        s: p("Tentukan sama ada pernyataan berikut betul atau salah.") + roman(["Nilai pekali keanjalan harga permintaan lebih daripada 1 adalah tak anjal", "Barang kemas adalah contoh barang anjal"]),
        p: BS,
        j: 1,
        e: "Ed > 1 bermaksud permintaan anjal, maka I salah. Barang kemas ialah barang mewah yang permintaannya anjal, maka II betul."
      },
      {
        bab: "t4-b4",
        s: p("Tentukan sama ada pernyataan berikut betul atau salah.") + roman(["Kos implisit merupakan kos yang dibayar dengan nyata oleh firma terhadap penggunaan input dalam proses pengeluaran barang dan perkhidmatan", "Contoh kos implisit seperti ganjaran upah yang sepatutnya dibayar kepada pemilik sendiri"]),
        p: BS,
        j: 1,
        e: "Kos yang dibayar dengan nyata ialah kos eksplisit, maka I salah. Upah pemilik sendiri yang tidak dibayar ialah contoh kos implisit, maka II betul."
      },
      {
        bab: "t4-b4",
        s: p("Tentukan sama ada pernyataan berikut betul atau salah.") + roman(["Produktiviti atau daya pengeluaran ialah keupayaan untuk meningkatkan penghasilan output daripada sejumlah input yang diberikan", "Faktor yang mempengaruhi produktiviti ada dua sahaja iaitu tenaga manusia dan bahan-bahan"]),
        p: BS,
        j: 0,
        e: "I ialah maksud produktiviti. II salah kerana produktiviti dipengaruhi oleh banyak faktor, termasuk teknologi, modal, pengurusan dan kemahiran buruh."
      },
      {
        bab: "t5-b2",
        s: p("Tentukan sama ada pernyataan berikut betul atau salah.") + roman(["Kaedah komunikasi baharu merupakan ciri globalisasi", "Kemudahan infrastruktur yang baik menggalakkan proses globalisasi"]),
        p: BS,
        j: 3,
        e: "Kaedah komunikasi baharu ialah salah satu ciri globalisasi, dan infrastruktur ICT serta pengangkutan yang baik ialah faktor penggalak globalisasi."
      },
      {
        bab: "t5-b2",
        s: p("Tentukan sama ada pernyataan berikut betul atau salah.") + roman(["Akaun semasa mengalami kurangan disebabkan pembayaran kewangan meningkat", "Akaun semasa merekodkan akaun modal dan akaun kewangan"]),
        p: BS,
        j: 0,
        e: "Defisit akaun semasa berlaku apabila pembayaran melebihi penerimaan, maka I betul. Akaun semasa, akaun modal dan akaun kewangan ialah tiga komponen berasingan dalam imbangan pembayaran, maka II salah."
      }
    ]
  });

  /* =========================================================
     KERTAS 2 (3767/2) · rajah skema
     ========================================================= */
  var RAJAH_K2_DD_KANAN = {
    lebar: 360,
    tinggi: 250,
    keluk: [
      { dari: [1, 8], ke: [7, 2], kelas: "d nipis", label: "D₀", dx: 4, dy: 4 },
      { dari: [3, 8], ke: [9, 2], kelas: "d", label: "D₁", dx: 4, dy: 4 }
    ],
    panduan: [
      { q: 4, p: 5, ly: "P", lx: "Q₀" },
      { q: 6, p: 5, lx: "Q₁" }
    ],
    panah: [{ dari: [2.6, 6.8], ke: [4.4, 6.8], kelas: "d" }]
  };

  // S4(b): penawaran bertambah (geran), lebihan penawaran Q₀Q₂ pada P₀
  var RAJAH_K2_SS_KANAN = {
    lebar: 380,
    tinggi: 260,
    keluk: [
      { dari: [1, 9], ke: [9, 1], kelas: "d", label: "D₀", dx: 4, dy: 4 },
      { dari: [1.5, 1], ke: [8.5, 8], kelas: "s nipis", label: "S₀", dx: 3, dy: 0 },
      { dari: [3, 1], ke: [10, 8], kelas: "s", label: "S₁", dx: -14, dy: -4 }
    ],
    panduan: [
      { q: 4.75, p: 5.25, ly: "P₀", lx: "Q₀" },
      { q: 5.5, p: 4.5, ly: "P₁", lx: "Q₁" },
      { q: 7.25, p: 5.25, keY: false, lx: "Q₂" }
    ],
    titik: [
      { q: 4.75, p: 5.25, label: "E₀", dx: -2, dy: -9, anchor: "end" },
      { q: 5.5, p: 4.5, label: "E₁", dx: 8, dy: 12 }
    ],
    panah: [{ dari: [6.6, 7.6], ke: [8.2, 7.6], kelas: "s" }]
  };

  // S7(b): penawaran barang import berkurang (tarif), lebihan permintaan Q₂Q₀ pada P₀
  var RAJAH_K2_SS_KIRI = {
    lebar: 380,
    tinggi: 260,
    keluk: [
      { dari: [1, 9], ke: [9, 1], kelas: "d", label: "D", dx: 4, dy: 4 },
      { dari: [3, 1], ke: [10, 8], kelas: "s nipis", label: "S", dx: -12, dy: -4 },
      { dari: [1.5, 1], ke: [8.5, 8], kelas: "s", label: "S₁", dx: 3, dy: 0 }
    ],
    panduan: [
      { q: 5.5, p: 4.5, ly: "P₀", lx: "Q₀" },
      { q: 4.75, p: 5.25, ly: "P₁", lx: "Q₁" },
      { q: 4, p: 4.5, keY: false, lx: "Q₂" }
    ],
    titik: [
      { q: 5.5, p: 4.5, label: "E", dx: 8, dy: 12 },
      { q: 4.75, p: 5.25, label: "E₁", dx: -2, dy: -9, anchor: "end" }
    ],
    panah: [{ dari: [8.2, 7.6], ke: [6.6, 7.6], kelas: "s" }]
  };

  var RUBRIK_S4 = [
    ["Tahap 1 (1–3 markah)", ["Menyatakan pendirian secara umum yang tidak jelas atau tiada pendirian", "Penjelasan umum dan terhad", "Menyenaraikan fakta sahaja atau fakta tidak dijelaskan", "Tidak menyatakan huraian lanjut atau contoh yang relevan"]],
    ["Tahap 2 (4–6 markah)", ["Menyatakan pendirian dengan jelas", "Dapat menjelaskan atau mengaplikasi teori dan konsep ekonomi dengan situasi yang diberikan dengan betul", "Huraian atau keterangan yang relevan", "Boleh menghubungkait isu yang diberi tetapi kurang relevan", "Huraian rajah terhad"]],
    ["Tahap 3 (7–9 markah)", ["Menyatakan pendirian dengan jelas", "Kehendak soalan difahami sepenuhnya dengan menggunakan contoh atau rajah yang betul berdasarkan situasi atau tanpa situasi", "Konsep, teori atau prinsip ekonomi difahami secara mendalam, digunakan, dianalisis dan dinilai", "Boleh menghubungkait isu yang diberi dengan contoh yang betul dan tepat", "Huraian, keterangan, contoh, rajah atau jadual yang diberi adalah betul dan tepat", "Membuat rumusan atau kesimpulan yang relevan"]]
  ];
  var RUBRIK_B = [
    ["Tahap 1 (1–3 markah)", ["Pengetahuan yang terhad tentang teori atau konsep ekonomi", "Penjelasan umum dan terhad", "Menyenaraikan fakta sahaja atau fakta tidak dijelaskan"]],
    ["Tahap 2 (4–6 markah)", ["Dapat menjelaskan atau mengaplikasi teori dan konsep ekonomi dengan situasi yang diberikan dengan betul", "Huraian atau keterangan yang relevan", "Boleh menghubungkait isu yang diberikan tetapi kurang relevan", "Huraian atau fakta hanya satu sisi sahaja"]],
    ["Tahap 3 (7–9 markah)", ["Kehendak soalan difahami sepenuhnya dengan menggunakan contoh atau rajah yang betul berdasarkan situasi atau tanpa situasi", "Konsep, teori atau prinsip ekonomi difahami secara mendalam, digunakan, dianalisis dan dinilai", "Boleh menghubungkait isu yang diberikan dengan contoh yang betul dan tepat", "Huraian, keterangan, contoh, rajah atau jadual yang diberikan adalah betul dan tepat", "Jawapan dalam dua sisi", "Menyatakan pendirian dengan jelas atau membuat rumusan dan kesimpulan yang relevan, mendalam dan matang"]]
  ];

  var JADUAL_KEMEJA = jadual(
    ["Harga (RM)", "Kuantiti diminta Haris (unit)", "Kuantiti diminta Syafiq (unit)", "Kuantiti penawaran (unit)"],
    [["5", "140", "130", "100"], ["10", "125", "120", "125"], ["15", "75", "55", "130"], ["20", "60", "40", "150"]],
    "Jadual 1 Permintaan dan penawaran pasaran baju kemeja"
  );
  var JADUAL_FARHAN = jadual(
    ["Butiran", "Jumlah (RM)"],
    [["Gaji", "3 000"], ["Caruman PERKESO", "15"], ["Caruman KWSP", "11%"], ["Sewa rumah", "450"], ["Cukai pendapatan", "120"], ["Perubatan", "200"], ["Ansuran kereta", "500"], ["Bil utiliti", "300"], ["Makanan", "700"], ["Minyak petrol", "300"], ["Sumbangan ibu bapa", "200"]],
    "Jadual 1 Pendapatan dan perbelanjaan Encik Farhan bagi bulan September"
  );
  var JADUAL_TP = jadual(
    ["Buruh", "Jumlah keluaran TP (unit)", "Keluaran purata AP (unit)", "Keluaran marginal MP (unit)"],
    [["0", "0", "–", "–"], ["1", "10", "10", "10"], ["2", "22", "11", "12"], ["3", "33", "11", "<b>X</b>"], ["4", "42", "10.5", "9"], ["5", "47", "<b>Y</b>", "5"], ["6", "49", "8.17", "2"], ["7", "49", "7", "0"], ["8", "46", "5.75", "−3"]],
    "Jadual 2 Fungsi pengeluaran jangka pendek sebuah firma"
  );
  var BELANJAWAN_FARHAN = jadual(
    ["Butiran", "RM", "RM"],
    [["Pendapatan boleh guna", "", "2 535"], ["<b>Tolak perbelanjaan tetap:</b>", "", ""], ["Sewa rumah", "450", ""], ["Ansuran kereta", "500", ""], ["<b>Tolak perbelanjaan tidak tetap:</b>", "", ""], ["Bil utiliti", "150", ""], ["Sumbangan ibu bapa", "150", ""], ["Petrol", "250", ""], ["Makanan", "500", ""], ["Perubatan", "150", ""], ["Jumlah perbelanjaan", "", "2 150"], ["<b>Tabungan</b>", "", "<b>385</b>"]],
    "Contoh penyata belanjawan peribadi dalam skema"
  );

  /* =========================================================
     KERTAS 2 (3767/2)
     ========================================================= */
  E.daftarK2({
    id: "trg25",
    k1: "trg25-k1",
    nama: "MPP3 Terengganu 2025",
    label: "Modul Perkembangan Pembelajaran SPM 2025 (MPP3) Terengganu",
    sumber: "Disediakan oleh Panel AKRAM Negeri Terengganu, Jabatan Pendidikan Negeri Terengganu",
    bahagianA: "Bahagian A (3 soalan wajib, 60 markah)",
    bahagianB: "Bahagian B (pilih 2 daripada 4, 40 markah)",
    soalan: [
      /* ---------------- SOALAN 1 ---------------- */
      {
        no: 1,
        seksyen: "A",
        tajuk: "Faktor pengeluaran, sistem ekonomi dan pasaran",
        bahagian: [
          {
            kod: "(a)(i)",
            konteks: petikan("", "Encik Ariffin merupakan penternak kambing di daerah Setiu. Dia mengusahakan ternakan kambing dengan bantuan 3 orang pekerja.", ""),
            s: "Maklumat di atas berkaitan dengan faktor pengeluaran dan masalah asas ekonomi. Bezakan faktor pengeluaran tersebut.",
            m: 4,
            bab: "t4-b1",
            topik: "Faktor pengeluaran",
            skema: [
              {
                label: "Encik Ariffin (usahawan) lawan pekerja (buruh), 1 + 1 bagi setiap pasangan",
                isi: [
                  ["H1a", "Encik Ariffin ialah <b>usahawan</b>"],
                  ["H1b", "Pekerja ialah <b>buruh</b>"],
                  ["H2a", "Usahawan menerima ganjaran <b>untung</b>"],
                  ["H2b", "Buruh menerima ganjaran <b>upah</b>"],
                  ["H3a", "Usahawan ialah unit yang menggabungkan dan menyelaras faktor pengeluaran yang lain"],
                  ["H3b", "Buruh ialah individu yang menyumbang tenaga fizikal atau mental dalam proses pengeluaran"],
                  ["H4a", "Usahawan bebas membuat keputusan"],
                  ["H4b", "Buruh mengikut arahan majikan atau tidak bebas membuat keputusan"],
                  ["H5a", "Usahawan menghasilkan barang atau perkhidmatan"],
                  ["H5b", "Buruh ialah pengguna barang dan perkhidmatan"],
                  ["H6a", "Usahawan bekerja sendiri"],
                  ["H6b", "Buruh bekerja dengan orang lain"]
                ]
              }
            ],
            nota: "Perbezaan mesti ditulis berpasangan. Maksimum 4 markah."
          },
          {
            kod: "(a)(ii)",
            s: "Terangkan masalah asas ekonomi yang belum diselesaikan.",
            m: 2,
            bab: "t4-b1",
            topik: "Masalah asas ekonomi",
            skema: [
              {
                label: "Berapa hendak dikeluarkan",
                isi: [
                  ["F1", "Berapa hendak dikeluarkan"],
                  ["H1a", "Penentuan kuantiti barang yang hendak dikeluarkan"],
                  ["H1b", "Ditentukan berdasarkan mekanisme pasaran"],
                  ["H1c", "Memastikan tidak berlaku masalah kekurangan atau lebihan"],
                  ["H1d", "Masalah kekurangan menyebabkan kenaikan harga barang"],
                  ["H1e", "Masalah lebihan menyebabkan penurunan harga barang"]
                ]
              },
              {
                label: "Untuk siapa dikeluarkan",
                isi: [
                  ["F2", "Untuk siapa dikeluarkan"],
                  ["H2a", "Penentuan corak pengagihan barangan"],
                  ["H2b", "Diselesaikan berdasarkan corak agihan pendapatan wang"],
                  ["H2c", "Berdasarkan kuasa beli masyarakat"],
                  ["H2d", "Golongan berpendapatan tinggi mendapat lebih banyak barang dan perkhidmatan, dan sebaliknya"]
                ]
              }
            ],
            nota: "Terima 1F + 1H. Maksimum 2 markah."
          },
          {
            kod: "(b)(i)",
            konteks: jadual(["Negara X", "Negara Y"], [["Kerajaan membuat semua keputusan ekonomi", "Firma dan isi rumah bebas membuat keputusan ekonomi dengan kawalan kerajaan"]]),
            s: "Maklumat di atas berkaitan dengan sistem ekonomi bagi Negara X dan Negara Y. Jelaskan persamaan peranan kerajaan dalam sistem ekonomi tersebut.",
            m: 2,
            bab: "t4-b1",
            topik: "Sistem ekonomi",
            skema: [
              {
                isi: [
                  ["H1", "Kerajaan sebagai pengeluar"],
                  ["H2", "Kerajaan mengeluarkan barang awam"],
                  ["H3", "Membina hospital atau contoh lain"],
                  ["H4", "Kerajaan mengeluarkan barang sosial"],
                  ["H5", "Rawatan air bersih atau barang sosial lain"],
                  ["H6", "Kerajaan penentu harga barang awam"],
                  ["H7", "Memastikan pengagihan sumber yang lebih adil"],
                  ["H8", "Bermotifkan memaksimumkan kebajikan masyarakat"],
                  ["H9", "Kerajaan sebagai majikan"],
                  ["H10", "Mewujudkan peluang pekerjaan"],
                  ["H11", "Kawalan harga"],
                  ["H12", "Subsidi"],
                  ["H13", "Menggunakan cukai dan mengagihkan semula pendapatan"]
                ]
              }
            ],
            nota: "Maksimum 2 markah."
          },
          {
            kod: "(b)(ii)",
            s: "Negara X mempraktikkan unsur kebajikan lebih menyeluruh berbanding Negara Y. Beri alasan anda.",
            m: 2,
            bab: "t4-b1",
            topik: "Sistem ekonomi",
            skema: [
              {
                isi: [
                  ["H1", "Kerajaan membuat semua keputusan ekonomi"],
                  ["H2", "Untuk memastikan perkhidmatan asas diberikan secara meluas"],
                  ["H3", "Harga berpatutan kepada semua"],
                  ["H4", "Kerajaan menyediakan pelbagai program sosial yang menyeluruh"],
                  ["H5", "Seperti subsidi, bantuan kewangan atau perlindungan sosial"],
                  ["H6", "Tiada eksploitasi oleh sektor swasta terhadap pekerja"],
                  ["H7", "Contoh eksploitasi buruh atau penetapan harga berasaskan keuntungan"],
                  ["H8", "Sumber ekonomi diagihkan secara adil"],
                  ["H9", "Tidak wujud diskriminasi pemilikan sumber"],
                  ["H10", "Tiada jurang antara kaya dan miskin"],
                  ["H11", "Kerajaan mengawal pendapatan"],
                  ["H12", "Kerajaan mengawal pemilikan harta"]
                ]
              }
            ],
            nota: "Terima mana-mana jawapan munasabah. Maksimum 2 markah."
          },
          {
            kod: "(c)",
            konteks: petikan("", "Bantuan Khas Kewangan sebanyak RM500 akan diberikan kepada semua penjawat awam dan RM250 kepada semua pesara kerajaan menjelang hari perayaan Aidilfitri.", ""),
            s: "Maklumat di atas berkaitan inisiatif kerajaan untuk kakitangan awam. Dengan bantuan rajah, jelaskan kesan inisiatif tersebut terhadap permintaan barang.",
            m: 6,
            bab: "t4-b2",
            topik: "Penentu permintaan",
            rajah: RAJAH_K2_DD_KANAN,
            skema: [
              {
                label: "Rajah (maksimum 3 markah)",
                isi: [
                  ["R1", "Paksi harga dan paksi kuantiti mempunyai titik asalan"],
                  ["R2", "Keluk permintaan berlabel D₀D₀ dan D₁D₁"],
                  ["R3", "Anak panah menunjukkan peralihan keluk ke kanan"]
                ]
              },
              {
                label: "Huraian (maksimum 3 markah)",
                isi: [
                  ["H1", "Faktor peningkatan pendapatan"],
                  ["H2", "Berlaku pertambahan permintaan"],
                  ["H3", "Keluk permintaan beralih ke kanan, D₀D₀ ke D₁D₁"],
                  ["H4", "Kuantiti permintaan meningkat, Q₀ ke Q₁"],
                  ["H5", "Harga tidak berubah atau kekal"]
                ]
              }
            ],
            nota: "Rajah lengkap dengan huraian: 3R + 3H (rajah mesti ada anak panah). Huraian tanpa rajah: terima H1 dan H2 sahaja."
          },
          {
            kod: "(d)(i)",
            konteks: JADUAL_KEMEJA,
            s: "Berdasarkan jadual, tentukan harga dan kuantiti keseimbangan bagi baju kemeja.",
            m: 2,
            bab: "t4-b2",
            topik: "Keseimbangan pasaran",
            skema: [
              {
                isi: [
                  ["H1", "Harga keseimbangan: RM15"],
                  ["H2", "Kuantiti keseimbangan: 130 unit"]
                ]
              }
            ],
            nota: "Permintaan pasaran ialah jumlah permintaan Haris dan Syafiq. Pada RM15, 75 + 55 = 130 unit, sama dengan kuantiti penawaran."
          },
          {
            kod: "(d)(ii)",
            s: "Jelaskan keadaan pasaran pada harga RM20.",
            m: 2,
            bab: "t4-b2",
            topik: "Ketidakseimbangan pasaran",
            skema: [
              {
                isi: [
                  ["H1", "Berlaku lebihan penawaran"],
                  ["H2", "Sebanyak 50 unit"],
                  ["H3", "Kuantiti penawaran melebihi kuantiti permintaan"],
                  ["H4", "Harga barang cenderung turun"]
                ]
              }
            ],
            nota: "Pada RM20, permintaan pasaran 60 + 40 = 100 unit dan penawaran 150 unit. Maksimum 2 markah."
          }
        ]
      },
      /* ---------------- SOALAN 2 ---------------- */
      {
        no: 2,
        seksyen: "A",
        tajuk: "Bank pusat, sektor ekonomi, kewangan peribadi dan fungsi pengeluaran",
        bahagian: [
          {
            kod: "(a)",
            s: "Bagaimanakah bank pusat menguruskan hutang kerajaan?",
            m: 3,
            bab: "t4-b3",
            topik: "Bank pusat",
            skema: [
              {
                isi: [
                  ["H1", "Mendapatkan pinjaman kerajaan"],
                  ["H2", "Pinjaman diperoleh daripada sumber dalam negara atau luar negara"],
                  ["H3", "KWSP atau contoh lain"],
                  ["H4", "Menjual surat jaminan kerajaan, sekuriti kerajaan atau bon kerajaan"],
                  ["H5", "Menjual bil perbendaharaan"],
                  ["H6", "Kepada institusi kewangan atau pasaran modal antarabangsa"],
                  ["H7", "Menerbitkan atau menjual sijil pelaburan"],
                  ["H8", "Kepada institusi kewangan Islam"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(b)",
            konteks: '<p style="text-align:center"><b>Gambar 1</b>: petani bekerja di sawah padi</p>',
            s: "Gambar 1 berkaitan dengan satu sektor ekonomi. Huraikan kepentingan sektor ekonomi tersebut.",
            m: 5,
            bab: "t4-b3",
            topik: "Sektor ekonomi",
            skema: [
              {
                isi: [
                  ["F1", "Sektor utama atau primer"],
                  ["H2", "Subsektor pertanian"],
                  ["H3", "Sektor ekstraktif atau menggunakan hasil bumi untuk menghasilkan keluaran"],
                  ["H4", "Membekalkan sumber makanan"],
                  ["H5", "Membekalkan bahan mentah untuk sektor lain"],
                  ["H6", "Peluang pekerjaan yang tinggi"],
                  ["H7", "Pesawah, pemandu jengkaut atau contoh lain"],
                  ["H8", "Membangunkan industri hiliran atau menjadi asas pembangunan industri"],
                  ["H9", "Pemprosesan padi, emping atau contoh lain"],
                  ["H10", "Merangsang peluang perniagaan"],
                  ["H11", "Contoh pemborong beras atau perkhidmatan dron"],
                  ["H12", "Menyumbang kepada pendapatan negara"],
                  ["H13", "Mengurangkan kebergantungan kepada import"],
                  ["H14", "Menjamin keselamatan makanan"]
                ]
              }
            ],
            nota: "Mesti ada F1. Maksimum 5 markah."
          },
          {
            kod: "(c)(i)",
            konteks: JADUAL_FARHAN,
            s: "Hitung pendapatan boleh guna Encik Farhan pada bulan tersebut.",
            m: 3,
            bab: "t4-b3",
            topik: "Pengurusan kewangan peribadi",
            skema: [
              {
                isi: [
                  ["1", "Jumlah pendapatan RM3 000"],
                  ["2", "KWSP: 11% × RM3 000 = RM330"],
                  ["3", "Cukai pendapatan RM120"],
                  ["4", "PERKESO RM15"],
                  ["5", "Jumlah potongan wajib RM465"],
                  ["6", "Pendapatan boleh guna = RM3 000 − RM465 = <b>RM2 535</b>"]
                ]
              }
            ],
            nota: "Jawapan lengkap dan betul: 3 markah. Maksimum 3 markah."
          },
          {
            kod: "(c)(ii)",
            s: "Penyata belanjawan Encik Farhan tersebut didapati kurang berhemat. Sediakan satu penyata belanjawan peribadi Encik Farhan yang lebih berhemat untuk bulan seterusnya.",
            m: 3,
            bab: "t4-b3",
            topik: "Belanjawan peribadi",
            contoh: BELANJAWAN_FARHAN,
            skema: [
              {
                isi: [
                  ["1", "Pendapatan boleh guna RM2 535"],
                  ["2", "Perbelanjaan tetap: sewa rumah RM450 dan ansuran kereta RM500"],
                  ["3", "Perbelanjaan tidak tetap dikurangkan: bil utiliti, sumbangan ibu bapa, petrol, makanan dan perubatan"],
                  ["4", "Jumlah perbelanjaan RM2 150"],
                  ["5", "Tabungan RM385"]
                ]
              }
            ],
            nota: "Contoh jawapan skema ditunjukkan di atas. Nilai perbelanjaan tidak tetap lain yang munasabah boleh diterima asalkan penyata seimbang dan ada tabungan. Maksimum 3 markah."
          },
          {
            kod: "(d)(i)",
            konteks: JADUAL_TP,
            s: "Berapakah nilai X dan Y?",
            m: 2,
            bab: "t4-b4",
            topik: "Fungsi pengeluaran",
            skema: [
              {
                isi: [
                  ["1", "X = 33 − 22 = <b>11 unit</b>"],
                  ["2", "Y = 47 ÷ 5 = <b>9.4 unit</b>"]
                ]
              }
            ]
          },
          {
            kod: "(d)(ii)",
            s: "Mengapakah bilangan buruh 3 hingga 7 merupakan tahap pengeluaran paling cekap bagi firma tersebut?",
            m: 4,
            bab: "t4-b4",
            topik: "Hukum pulangan berkurangan",
            skema: [
              {
                isi: [
                  ["H1", "Merupakan pengeluaran pada tahap dua"],
                  ["H2", "Bermula apabila keluaran purata sama dengan keluaran marginal"],
                  ["H3", "Berakhir apabila keluaran marginal sama dengan sifar"],
                  ["H4", "Dikenali sebagai hukum pulangan berkurangan, iaitu jumlah keluaran meningkat dengan kadar berkurangan"],
                  ["H5", "Nilai keluaran purata melebihi keluaran marginal (AP > MP)"],
                  ["H6", "Jumlah keluaran meningkat"],
                  ["H7", "Keluaran maksimum pada buruh ke-7, iaitu 49 unit"],
                  ["H8", "Keluaran marginal masih positif"],
                  ["H9", "Keluaran purata semakin menurun"],
                  ["H10", "Keluaran marginal menurun"],
                  ["H11", "Gabungan input berubah dan input tetap paling cekap"]
                ]
              }
            ],
            nota: "Maksimum 4 markah."
          }
        ]
      },
      /* ---------------- SOALAN 3 ---------------- */
      {
        no: 3,
        seksyen: "A",
        tajuk: "Monopoli semula jadi, inflasi, cukai dan kadar pertukaran asing",
        bahagian: [
          {
            kod: "(a)",
            konteks: '<p style="text-align:center"><b>Gambar 2</b>: logo Tenaga Nasional Berhad (contoh perkhidmatan GLC)</p>',
            s: "Gambar 2 menunjukkan satu perkhidmatan yang disediakan oleh Syarikat Berkaitan Kerajaan (GLC). Mengapakah syarikat tersebut mempunyai autoriti dalam menentukan harga?",
            m: 4,
            bab: "t5-b1",
            topik: "Monopoli semula jadi",
            skema: [
              {
                isi: [
                  ["H1", "Monopoli semula jadi kerajaan atau milik kerajaan"],
                  ["H2", "Satu firma sahaja atau pengeluar tunggal"],
                  ["H3", "Keluaran tidak ada pengganti"],
                  ["H4", "Tiada kebebasan keluar masuk industri"],
                  ["H5", "Kos modal yang tinggi yang mampu dibiayai oleh kerajaan sahaja"],
                  ["H6", "Menjamin kebajikan masyarakat"],
                  ["H7", "Melindungi kepentingan rakyat"],
                  ["H8", "Harga berpatutan"],
                  ["H9", "Menjamin kestabilan harga"],
                  ["H10", "Mengawal kos sara hidup"]
                ]
              }
            ],
            nota: "Maksimum 4 markah."
          },
          {
            kod: "(b)(i)",
            konteks: petikan("", "<b>KUALA LUMPUR:</b> Ketidakstabilan harga komoditi global seperti gula, koko dan biji kopi dijangka terus meningkatkan kos pengeluaran syarikat yang terlibat dengan industri makanan dan minuman (F&amp;B).", "Sumber: www.astroawani.com, 8 Mac 2024"),
            s: "Maklumat di atas berkaitan dengan keadaan ketidakstabilan harga komoditi dalam ekonomi. Jelaskan jenis inflasi daripada maklumat tersebut.",
            m: 3,
            bab: "t5-b1",
            topik: "Jenis inflasi",
            skema: [
              {
                isi: [
                  ["H1", "Inflasi tolakan kos"],
                  ["H2", "Kenaikan tingkat harga umum apabila kos pengeluaran meningkat"],
                  ["H3", "Kos bahan mentah meningkat"],
                  ["H4", "Pengeluar memindahkan beban peningkatan kos kepada pengguna"],
                  ["H5", "Untuk mengekalkan margin keuntungan"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(b)(ii)",
            s: "Jelaskan kesan keadaan di 3(b)(i) tersebut terhadap pengangguran.",
            m: 3,
            bab: "t5-b1",
            topik: "Kesan inflasi",
            skema: [
              {
                isi: [
                  ["H1", "Inflasi sederhana membawa kesan positif terhadap kadar pengangguran"],
                  ["H2", "Menggalakkan firma untuk menambahkan pengeluaran"],
                  ["H3", "Firma mewujudkan peluang pekerjaan"],
                  ["H4", "Kadar pengangguran menurun"]
                ]
              },
              {
                label: "ATAU (catatan tambahan dalam skema)",
                isi: [
                  ["H5", "Kos pengeluaran meningkat, maka firma mengurangkan pengeluaran atau pelaburan"],
                  ["H6", "Firma menanggung kerugian atau menutup operasi"],
                  ["H7", "Pekerja diberhentikan dan kadar pengangguran meningkat"]
                ]
              }
            ],
            nota: "Fakta boleh dicampur. Maksimum 3 markah."
          },
          {
            kod: "(c)",
            s: "Jelaskan konsep cukai progresif.",
            m: 4,
            bab: "t5-b1",
            topik: "Cukai progresif",
            skema: [
              {
                isi: [
                  ["H1", "Cukai yang kadarnya semakin tinggi apabila pendapatan bertambah"],
                  ["H2", "Berdasarkan agihan pendapatan individu"],
                  ["H3", "Beban cukai lebih tinggi ditanggung oleh golongan berpendapatan tinggi, dan sebaliknya"],
                  ["H4", "Kadar cukai meningkat secara berperingkat mengikut taraf pendapatan"],
                  ["H5", "Digunakan untuk mengurangkan jurang pendapatan atau meningkatkan keadilan sosial"],
                  ["H6", "Dipungut oleh Lembaga Hasil Dalam Negeri Malaysia"],
                  ["H7", "Contoh: cukai pendapatan individu"]
                ]
              }
            ],
            nota: "Maksimum 4 markah."
          },
          {
            kod: "(d)(i)",
            konteks: jadual(["Januari 2025", "Mei 2025"], [["USD1 = RM4.48", "USD1 = RM4.29"]]),
            s: "Maklumat di atas berkaitan dengan kadar pertukaran asing antara Dolar Amerika (USD) dengan Ringgit Malaysia (RM). Jason membeli tali pinggang berharga USD180 secara dalam talian pada bulan Januari 2025. Hitungkan nilai tali pinggang tersebut dalam nilai RM.",
            m: 2,
            bab: "t5-b2",
            topik: "Pengiraan kadar pertukaran",
            skema: [
              {
                isi: [
                  ["1", "USD180 ÷ USD1 × RM4.48"],
                  ["2", "= <b>RM806.40</b>"]
                ]
              }
            ]
          },
          {
            kod: "(d)(ii)",
            s: "Bagaimanakah perubahan kadar pertukaran asing tersebut mempengaruhi imbangan dagangan Malaysia?",
            m: 4,
            bab: "t5-b2",
            topik: "Kesan perubahan kadar pertukaran",
            skema: [
              {
                isi: [
                  ["H1", "Nilai RM naik"],
                  ["H2", "Harga eksport lebih mahal"],
                  ["H3", "Permintaan atau jumlah eksport jatuh"],
                  ["H4", "Nilai eksport Malaysia menurun"],
                  ["H5", "Harga barangan import dari Amerika Syarikat lebih murah"],
                  ["H6", "Permintaan atau jumlah import meningkat"],
                  ["H7", "Nilai import dari Amerika Syarikat meningkat"],
                  ["H8", "Nilai import melebihi nilai eksport"],
                  ["H8a", "Aliran keluar wang melebihi aliran masuk, atau jumlah bayaran melebihi penerimaan"],
                  ["H9", "Imbangan dagangan kurang, negatif atau defisit"]
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
        tajuk: "Geran Agropreneur Muda dan guna tenaga",
        konteks: petikan("", "<b>Georgetown:</b> Usahawan tani muda dan agromakanan di Pulau Pinang disaran memohon 'Geran Agropreneur Muda (GAM)' yang menawarkan hingga RM30,000 bagi memulakan dan mengembangkan bidang yang mereka ceburi. Program ini bertujuan untuk membantu dan menggalakkan penglibatan golongan muda dalam bidang keusahawanan agro berasaskan semua aktiviti rantaian sektor pertanian seperti pengeluaran tanaman, ternakan dan perikanan serta industri makanan.", "Ubah suai: www.mymetro.com.my, 20 April 2025"),
        bahagian: [
          {
            kod: "(a)",
            s: "Maklumat di atas berkaitan dengan saranan kerajaan untuk meningkatkan penggunaan sumber ekonomi. Jelaskan ciri faktor pengeluaran tersebut.",
            m: 5,
            bab: "t4-b1",
            topik: "Usahawan",
            skema: [
              {
                isi: [
                  ["H1", "Usahawan"],
                  ["H2", "Menggabung dan menyelaras faktor pengeluaran"],
                  ["H3", "Mengeluarkan barang atau perkhidmatan"],
                  ["H4", "Mendapat untung"],
                  ["H5", "Sanggup menanggung risiko"],
                  ["H6", "Mempunyai ciri-ciri usahawan"],
                  ["H7", "Kreatif dan inovatif atau contoh lain"],
                  ["H8", "Bekerja sendiri"],
                  ["H9", "Bebas membuat keputusan"],
                  ["H10", "Masa bekerja fleksibel"],
                  ["H11", "Mewujudkan peluang pekerjaan"]
                ]
              }
            ],
            nota: "Maksimum 5 markah."
          },
          {
            kod: "(b)",
            s: "Dengan menggunakan rajah, jelaskan kesan pelaksanaan saranan tersebut terhadap pasaran barang.",
            m: 6,
            bab: "t4-b2",
            topik: "Penentu penawaran",
            rajah: RAJAH_K2_SS_KANAN,
            skema: [
              {
                label: "Rajah (3 markah)",
                isi: [["R", "Rajah lengkap dengan sekurang-kurangnya satu anak panah yang tepat", 3]]
              },
              {
                label: "Huraian",
                isi: [
                  ["H1", "Penentu: dasar kerajaan, pemberian geran atau subsidi"],
                  ["H2", "Penawaran barang pertanian meningkat"],
                  ["H3", "Keseimbangan asal pada E₀, iaitu harga dan kuantiti keseimbangan pada P₀ dan Q₀"],
                  ["H4", "Keluk penawaran beralih ke kanan, S₀S₀ ke S₁S₁"],
                  ["H5", "Lebihan penawaran pada Q₀Q₂"],
                  ["H6", "Keseimbangan baharu pada E₁"],
                  ["H7", "Harga keseimbangan pada P₁"],
                  ["H8", "Kuantiti keseimbangan pada Q₁"],
                  ["H9", "Harga keseimbangan menurun, P₀ ke P₁"],
                  ["H10", "Kuantiti keseimbangan meningkat, Q₀ ke Q₁"]
                ]
              }
            ],
            nota: "3R + 3H (maksimum 6 markah). Jawapan tanpa rajah: terima H1 dan H2 sahaja."
          },
          {
            kod: "(c)",
            s: "Pelaksanaan saranan tersebut memberi impak kepada guna tenaga dalam negara. Setujukah anda dengan pernyataan tersebut? Beri alasan anda.",
            m: 9,
            bab: "t5-b1",
            topik: "Guna tenaga",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Pendirian: setuju, geran menggalakkan golongan muda menceburi keusahawanan agro"],
                  ["C2", "Lebih banyak projek tanaman, ternakan dan perikanan dimulakan, maka pengeluaran sektor pertanian meningkat"],
                  ["C3", "Permintaan terhadap buruh ialah permintaan terbitan: apabila pengeluaran meningkat, lebih ramai pekerja diperlukan"],
                  ["C4", "Peluang pekerjaan wujud di sepanjang rantaian: ladang, pemprosesan makanan, pembungkusan, pengangkutan dan pemasaran"],
                  ["C5", "Pengangguran belia berkurang; pendapatan dan kuasa beli isi rumah meningkat"],
                  ["C6", "Industri hiliran berkembang dan kebergantungan kepada import makanan berkurang"],
                  ["C7", "Sisi lain: geran terhad (maksimum RM30,000) dan sebahagian usahawan mungkin gagal"],
                  ["C8", "Penggunaan mesin dan dron atau pekerja asing boleh mengehadkan pertambahan pekerjaan untuk rakyat tempatan"],
                  ["C9", "Rumusan: setuju, dengan syarat disertai latihan, pemantauan dan akses kepada pasaran"]
                ]
              }
            ],
            rubrik: RUBRIK_S4
          }
        ]
      },
      /* ---------------- SOALAN 5 ---------------- */
      {
        no: 5,
        seksyen: "B",
        tajuk: "Harga siling bergerak",
        konteks: petikan("", "<b>KUALA LUMPUR:</b> Langkah kerajaan untuk memperkenalkan harga siling bergerak yang berubah kepada faktor harga input perlu dilaksanakan secara bijak. Kebaikan pelaksanaan harga siling bergerak bagi jangka pendek ialah kerajaan akan dapat mengawal harga melampau yang dikenakan oleh penjual. Hal ini membolehkan pengguna dapat menikmati harga yang berpatutan di samping pengeluar tidak mengalami kerugian.", "Ubah suai: www.astroawani.com, 15 Jun 2022"),
        bahagian: [
          {
            kod: "(a)",
            s: "Maklumat di atas berkaitan dengan satu situasi ekonomi. Mengapakah kerajaan melaksanakan tindakan tersebut?",
            m: 6,
            bab: "t5-b1",
            topik: "Dasar harga",
            skema: [
              {
                isi: [
                  ["H1", "Menjaga kebajikan pengguna"],
                  ["H2", "Mengelakkan eksploitasi pengguna oleh pengeluar"],
                  ["H3", "Memastikan pengguna dapat memiliki barang keperluan"],
                  ["H4", "Pengguna menikmati harga yang berpatutan"],
                  ["H5", "Kuasa beli meningkat"],
                  ["H6", "Menurunkan kos sara hidup pengguna"],
                  ["H7", "Meningkatkan taraf hidup pengguna"],
                  ["H8", "Menjaga kebajikan pengeluar"],
                  ["H9", "Mendapat untung yang tinggi"],
                  ["H10", "Mengelakkan inflasi berlaku"]
                ]
              }
            ],
            nota: "Maksimum 6 markah."
          },
          {
            kod: "(b)",
            s: "Bagaimanakah langkah tersebut dapat menyelesaikan masalah inflasi?",
            m: 5,
            bab: "t5-b1",
            topik: "Kawalan inflasi",
            skema: [
              {
                isi: [
                  ["H1", "Mengawal kenaikan harga barang keperluan"],
                  ["H2", "Menggunakan dasar harga maksimum dalam bentuk peraturan"],
                  ["H3a", "Harga boleh dinaikkan mengikut keadaan pasaran atau masa"],
                  ["H3b", "Harga boleh dilaraskan mengikut kos semasa (fleksibel)"],
                  ["H4", "Barang keperluan, contohnya minyak masak, petrol dan elektrik"],
                  ["H5", "Penjual tidak boleh menjual pada harga yang lebih tinggi daripada harga yang ditetapkan"],
                  ["H6", "Mewujudkan kestabilan harga"]
                ]
              }
            ],
            nota: "Maksimum 5 markah."
          },
          {
            kod: "(c)",
            s: "Langkah kerajaan tersebut dapat memberi impak kepada ekonomi negara. Bincangkan.",
            m: 9,
            bab: "t5-b1",
            topik: "Kesan kawalan harga",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Harga barang keperluan stabil, maka kos sara hidup terkawal dan kuasa beli pengguna terpelihara"],
                  ["C2", "Tekanan inflasi berkurang dan objektif kestabilan harga lebih mudah dicapai"],
                  ["C3", "Harga yang dilaraskan mengikut kos input membolehkan pengeluar tidak rugi dan bekalan berterusan"],
                  ["C4", "Kebajikan golongan berpendapatan rendah dan tetap lebih terjaga"],
                  ["C5", "Sisi lain: jika harga siling di bawah harga keseimbangan, berlaku lebihan permintaan dan kekurangan barang"],
                  ["C6", "Mungkin wujud pasaran gelap, penyorokan barang dan barisan panjang"],
                  ["C7", "Kerajaan menanggung kos pemantauan dan penguatkuasaan, dan mungkin perlu memberi subsidi"],
                  ["C8", "Pengeluar kurang insentif untuk menambah pengeluaran atau meningkatkan mutu"],
                  ["C9", "Rumusan: berkesan dalam jangka pendek jika dilaksanakan secara bijak dan dipantau"]
                ]
              }
            ],
            rubrik: RUBRIK_B
          }
        ]
      },
      /* ---------------- SOALAN 6 ---------------- */
      {
        no: 6,
        seksyen: "B",
        tajuk: "Larangan penjualan vape",
        konteks: petikan("Terengganu Haramkan Vape Secara Total Bermula 1 Ogos", "KUALA TERENGGANU, 24 April: Kerajaan negeri akan melaksanakan Larangan Penjualan Produk Rokok Elektronik (Vape) di semua premis perniagaan dalam kawasan Pihak Berkuasa Tempatan (PBT) di seluruh Terengganu berkuat kuasa mulai 1 Ogos 2025. Lesen perniagaan tidak akan diluluskan kepada premis yang menjual vape. Langkah ini diambil bagi membendung kesan negatif terhadap kesihatan, khususnya dalam kalangan generasi muda.", "Sumber: diubah suai daripada www.trdi.my, 24 April 2025"),
        bahagian: [
          {
            kod: "(a)",
            s: "Maklumat di atas berkaitan dengan tindakan kerajaan negeri dalam mengawal penjualan satu jenis barangan. Mengapakah kerajaan negeri tersebut bertindak sedemikian?",
            m: 7,
            bab: "t5-b1",
            topik: "Kawalan eksternaliti negatif",
            skema: [
              {
                isi: [
                  ["H1", "Melindungi kesihatan awam"],
                  ["H2", "Membendung ketagihan dalam kalangan remaja"],
                  ["H3", "Mengurangkan beban kos kesihatan kerajaan"],
                  ["H3a", "Vape mengandungi nikotin"],
                  ["H4", "Mengelak penyalahgunaan produk"],
                  ["H5", "Menjamin kualiti hidup jangka panjang"],
                  ["H6", "Mengawal aktiviti perniagaan yang tidak patuh lesen"],
                  ["H7", "Menggalakkan corak penggunaan sihat dalam kalangan rakyat"],
                  ["H8", "Vape mengandungi bahan kimia berbahaya"],
                  ["H9", "Menjejaskan tumpuan dalam pembelajaran"],
                  ["H10", "Masyarakat lebih sihat"],
                  ["H11", "Boleh mencetuskan masalah disiplin di sekolah atau tempat awam"]
                ]
              }
            ],
            nota: "Maksimum 7 markah."
          },
          {
            kod: "(b)(i)",
            s: "Nyatakan unit ekonomi yang mendapat manfaat daripada dasar tersebut.",
            m: 1,
            bab: "t4-b1",
            topik: "Unit ekonomi",
            skema: [{ isi: [["1", "Isi rumah"]] }]
          },
          {
            kod: "(b)(ii)",
            s: "Jelaskan unit ekonomi di 6(b)(i).",
            m: 3,
            bab: "t4-b1",
            topik: "Isi rumah",
            skema: [
              {
                isi: [
                  ["H1", "Individu atau sekumpulan individu yang tinggal bersama"],
                  ["H2", "Mereka bertindak sebagai pengguna"],
                  ["H3", "Menghadapi kekurangan pendapatan atau wang"],
                  ["H4", "Matlamat pilihan: memaksimumkan kepuasan"],
                  ["H5", "Membekalkan faktor pengeluaran"],
                  ["H6", "Contohnya buruh"],
                  ["H7", "Menerima ganjaran seperti upah"],
                  ["H8", "Membayar cukai kepada kerajaan"],
                  ["H9", "Contohnya cukai pendapatan atau SST"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(c)",
            s: "Bincangkan impak larangan tersebut terhadap ekonomi.",
            m: 9,
            bab: "t5-b1",
            topik: "Peranan kerajaan",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Kesihatan awam bertambah baik dan eksternaliti negatif (kos sosial) berkurang"],
                  ["C2", "Kos rawatan dan beban perbelanjaan kesihatan kerajaan berkurang"],
                  ["C3", "Modal insan generasi muda lebih sihat, maka produktiviti tenaga buruh meningkat"],
                  ["C4", "Isi rumah boleh mengalihkan perbelanjaan kepada barang dan perkhidmatan lain atau menabung"],
                  ["C5", "Sisi lain: peniaga vape hilang pendapatan dan premis mungkin ditutup"],
                  ["C6", "Pekerja dalam industri vape mungkin kehilangan pekerjaan"],
                  ["C7", "Hasil kerajaan daripada lesen dan cukai berkurang"],
                  ["C8", "Risiko pasaran gelap, penyeludupan atau pembelian di negeri lain; kos penguatkuasaan meningkat"],
                  ["C9", "Rumusan: faedah jangka panjang kepada kesihatan dan produktiviti melebihi kos jangka pendek"]
                ]
              }
            ],
            rubrik: RUBRIK_B
          }
        ]
      },
      /* ---------------- SOALAN 7 ---------------- */
      {
        no: 7,
        seksyen: "B",
        tajuk: "Kenaikan cukai import dalam Belanjawan 2025",
        konteks: petikan("", "<b>KUALA LUMPUR:</b> Dalam Belanjawan 2025, kerajaan mengumumkan peningkatan cukai import ke atas barangan tekstil, makanan proses dan peralatan dapur dari luar negara. Langkah ini bertujuan melindungi industri kecil dan sederhana (IKS) tempatan daripada saingan produk asing yang lebih murah. Kementerian Perdagangan menyatakan, langkah itu adalah sebahagian daripada dasar perlindungan jangka pendek bagi meningkatkan daya saing pengeluar domestik dan menggalakkan penggunaan barangan tempatan.", "Sumber: diubah suai daripada bharian.com.my, 26 November 2024"),
        bahagian: [
          {
            kod: "(a)(i)",
            s: "Maklumat di atas berkaitan dengan tindakan kerajaan terhadap kemasukan barangan dari luar negara. Huraikan jenis cukai tersebut.",
            m: 3,
            bab: "t5-b2",
            topik: "Tarif",
            skema: [
              {
                isi: [
                  ["F1", "Cukai import, duti import atau tarif"],
                  ["H1", "Cukai yang dikenakan oleh kerajaan ke atas barangan yang dibawa masuk dari luar negara"],
                  ["H2", "Merupakan cukai tidak langsung"],
                  ["H3", "Dikenakan ke atas pengimport"],
                  ["H4", "Beban cukai boleh dipindahkan kepada pengguna"],
                  ["H5", "Harga barang akan meningkat"]
                ]
              }
            ],
            nota: "Mesti ada F1. Maksimum 3 markah. Skema asal menaip H2 sebagai 'cukai langsung', tetapi duti import ialah cukai tidak langsung kerana bebannya boleh dipindahkan (lihat H4)."
          },
          {
            kod: "(a)(ii)",
            s: "Jelaskan rasional kerajaan bertindak demikian terhadap barangan luar negara.",
            m: 3,
            bab: "t5-b2",
            topik: "Tujuan sekatan perdagangan",
            skema: [
              {
                isi: [
                  ["H1", "Melindungi pengeluar tempatan atau industri muda"],
                  ["H2", "Daripada persaingan harga barangan asing yang lebih murah"],
                  ["H3", "Meningkatkan penggunaan barangan tempatan"],
                  ["H4", "Merangsang pertumbuhan industri domestik"],
                  ["H5", "Mengurangkan kebergantungan terhadap import"],
                  ["H6", "Membantu memperbaiki imbangan pembayaran negara"],
                  ["H7", "Meningkatkan hasil negara"],
                  ["H9", "Membantu syarikat tempatan meneruskan operasi"],
                  ["H10", "Dapat mengekalkan atau mewujudkan peluang pekerjaan"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(b)",
            s: "Jelaskan kesan jangka pendek terhadap penawaran barang susulan tindakan tersebut.",
            m: 5,
            bab: "t5-b2",
            topik: "Kesan tarif",
            rajah: RAJAH_K2_SS_KIRI,
            skema: [
              {
                label: "Rajah",
                isi: [["R", "Rajah lengkap dengan sekurang-kurangnya satu anak panah yang tepat"]]
              },
              {
                label: "Huraian",
                isi: [
                  ["H1", "Tarif, duti atau cukai import meningkat"],
                  ["H2", "Penawaran barang import menurun"],
                  ["H3", "Keseimbangan asal pada E, iaitu P₀ dan Q₀"],
                  ["H4", "Keluk penawaran beralih ke kiri, SS ke S₁S₁"],
                  ["H5", "Berlaku lebihan permintaan pada Q₂Q₀"],
                  ["H6", "Keseimbangan baharu pada E₁, harga naik"],
                  ["H7", "Harga naik dari P₀ ke P₁ dan kuantiti turun dari Q₀ ke Q₁"]
                ]
              }
            ],
            nota: "Rajah dan huraian, maksimum 5 markah. Jawapan tanpa rajah: terima H1 dan H2 sahaja."
          },
          {
            kod: "(c)",
            s: "Keputusan kerajaan akan memberi kesan terhadap pasaran domestik. Bincangkan.",
            m: 9,
            bab: "t5-b2",
            topik: "Kebaikan dan keburukan sekatan perdagangan",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Harga barang import naik, maka barang tempatan secara relatif lebih murah"],
                  ["C2", "Permintaan terhadap barang tempatan meningkat dan IKS tempatan terlindung"],
                  ["C3", "Pengeluaran dan guna tenaga dalam negara meningkat, kadar pengangguran menurun"],
                  ["C4", "Hasil kerajaan daripada duti import bertambah; import berkurang dan imbangan dagangan bertambah baik"],
                  ["C5", "Sisi lain: pengguna menanggung harga yang lebih tinggi dan pilihan barang berkurang"],
                  ["C6", "Kos sara hidup meningkat dan mungkin berlaku inflasi diimport jika barang itu input pengeluaran"],
                  ["C7", "Kurang persaingan menyebabkan IKS kurang insentif untuk cekap dan meningkatkan mutu"],
                  ["C8", "Negara lain mungkin bertindak balas, maka eksport Malaysia berkurang; risiko penyeludupan"],
                  ["C9", "Rumusan: wajar sebagai perlindungan jangka pendek jika disertai usaha meningkatkan mutu dan daya saing"]
                ]
              }
            ],
            rubrik: RUBRIK_B
          }
        ]
      }
    ]
  });
})();
