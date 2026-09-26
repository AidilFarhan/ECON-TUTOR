/* =========================================================
   Peperiksaan Percubaan SPM 2025 (Seberang Perai) · Ekonomi 3767
   Soalan ditaip semula daripada kertas asal; rajah dan gambar dipotong
   terus daripada PDF. Jawapan dan isi markah mengikut peraturan
   pemarkahan (skema) dalam repo. Skema Soalan 5 dalam fail asal adalah
   untuk soalan lain, jadi isi Soalan 5 ialah cadangan (ditanda).
   ========================================================= */
(function () {
  "use strict";
  var E = window.EKO;

  /* ---------- gambar daripada kertas asal ---------- */
  var D = "assets/img/percubaan/sp25/";
  var G = {
    "k1-s3": { src: D + "k1-s3.webp", w: 1054, h: 217 },
    "k1-s5": { src: D + "k1-s5.webp", w: 912, h: 454 },
    "k1-s7a": { src: D + "k1-s7a.webp", w: 541, h: 349 },
    "k1-s7b": { src: D + "k1-s7b.webp", w: 541, h: 376 },
    "k1-s7c": { src: D + "k1-s7c.webp", w: 530, h: 373 },
    "k1-s7d": { src: D + "k1-s7d.webp", w: 516, h: 381 },
    "k1-s8": { src: D + "k1-s8.webp", w: 912, h: 454 },
    "k1-s10a": { src: D + "k1-s10a.webp", w: 458, h: 267 },
    "k1-s10b": { src: D + "k1-s10b.webp", w: 458, h: 266 },
    "k1-s10c": { src: D + "k1-s10c.webp", w: 458, h: 268 },
    "k1-s10d": { src: D + "k1-s10d.webp", w: 459, h: 266 },
    "k1-s13": { src: D + "k1-s13.webp", w: 604, h: 381 },
    "k1-s21": { src: D + "k1-s21.webp", w: 743, h: 394 },
    "k1-s22": { src: D + "k1-s22.webp", w: 564, h: 466 },
    "k1-s23": { src: D + "k1-s23.webp", w: 614, h: 461 },
    "k1-s26": { src: D + "k1-s26.webp", w: 461, h: 480 },
    "k2-1a": { src: D + "k2-1a.webp", w: 794, h: 418 },
    "k2-1c": { src: D + "k2-1c.webp", w: 605, h: 361 },
    "k2-1d": { src: D + "k2-1d.webp", w: 655, h: 518 },
    "k2-2c": { src: D + "k2-2c.webp", w: 1195, h: 443 },
    "k2-2d": { src: D + "k2-2d.webp", w: 1133, h: 528 },
    "skema-4b": { src: D + "skema-4b.webp", w: 438, h: 253 },
    "skema-6b": { src: D + "skema-6b.webp", w: 707, h: 352 }
  };
  function gb(k, alt, kapsyen) {
    return Object.assign({ alt: alt, kapsyen: kapsyen }, G[k]);
  }
  // gambar kecil dalam butang pilihan jawapan
  function pilihanGambar(teks, k, alt) {
    return (teks ? "<span>" + teks + "</span>" : "") + E.gambar(gb(k, alt), true);
  }

  /* ---------- rangka HTML kecil ---------- */
  function p(teks) {
    return "<p>" + teks + "</p>";
  }
  function petik(html) {
    return '<div class="petik">' + html + "</div>";
  }
  function sumber(teks) {
    return '<p class="sumber" style="text-align:right"><i>' + teks + "</i></p>";
  }
  function petikan(tajuk, isi, sbr) {
    return (tajuk ? '<b class="tajuk-petikan">' + tajuk + "</b>" : "") + isi.map(p).join("") + (sbr ? sumber(sbr) : "");
  }
  function roman(senarai) {
    return '<ol class="roman">' + senarai.map(function (x) {
      return "<li>" + x + "</li>";
    }).join("") + "</ol>";
  }
  function jadual(kapsyen, kepala, baris, nombor) {
    nombor = nombor || [];
    function sel(tag, x, i) {
      return "<" + tag + (nombor.indexOf(i) > -1 ? ' class="n"' : "") + ">" + x + "</" + tag + ">";
    }
    return (
      '<div class="jadual" style="max-width:560px">' +
      "<table>" + (kapsyen ? "<caption>" + kapsyen + "</caption>" : "") +
      (kepala ? "<thead><tr>" + kepala.map(function (x, i) {
        return sel("th", x, i);
      }).join("") + "</tr></thead>" : "") +
      "<tbody>" + baris.map(function (r) {
        return "<tr>" + r.map(function (x, i) {
          return sel("td", x, i);
        }).join("") + "</tr>";
      }).join("") + "</tbody></table></div>"
    );
  }
  var BS = ["I Betul, II Salah", "I Salah, II Betul", "I Betul, II Betul", "I Salah, II Salah"];
  function pernyataan(i, ii) {
    return p("Tentukan sama ada pernyataan berikut betul atau salah.") + roman([i, ii]);
  }
  var CADANGAN = "Cadangan isi (disediakan untuk latihan, bukan skema rasmi)";

  /* =========================================================
     KERTAS 1 (3767/1) · 40 soalan objektif
     ========================================================= */
  E.daftarSet({
    id: "sp25-k1",
    label: "Percubaan SPM Seberang Perai 2025 · Kertas 1",
    labelPendek: "Percubaan Seberang Perai 2025 K1",
    soalan: [
      {
        bab: "t4-b1",
        s: p("Maklumat berikut berkaitan dengan satu unit ekonomi.") + petik("Unit ekonomi X membuat pilihan kerana kekurangan sumber ekonomi") + p("Pernyataan manakah yang betul tentang unit ekonomi X?"),
        p: ["Meningkatkan keuntungan dengan meminimumkan kos pengeluaran", "Mengutamakan kebajikan rakyat daripada projek pembangunan", "Memaksimumkan kepuasan melalui perbelanjaan berhemah", "Membolehkan keperluan demi keselesaan pengguna"],
        j: 0,
        e: "Skema memberi A: unit ekonomi X dianggap firma, yang membuat pilihan untuk memaksimumkan untung dengan meminimumkan kos. Nota: semua unit ekonomi membuat pilihan kerana kekurangan; B ialah objektif kerajaan dan C objektif isi rumah."
      },
      {
        bab: "t4-b1",
        s: p("Maklumat berikut menunjukkan pilihan teknik pengeluaran Syarikat X.") + jadual("", ["Keluaran (unit)", "Intensif buruh", "Intensif modal"], [["Baju", "100", "60"], ["Seluar", "60", "100"]], [1, 2]) + p("Apakah kos lepas yang dihadapi oleh Syarikat X sekiranya teknik intensif modal digunakan?"),
        p: ["40 unit baju", "60 unit baju", "100 unit seluar", "160 unit seluar"],
        j: 0,
        e: "Teknik intensif buruh menghasilkan 100 baju, manakala intensif modal hanya 60 baju. Dengan memilih intensif modal, 40 unit baju (100 − 60) dikorbankan; itulah kos lepasnya."
      },
      {
        bab: "t4-b1",
        s: p("Maklumat berikut berkaitan penyelesaian satu masalah asas ekonomi oleh dua buah negara."),
        gambar: gb("k1-s3", "Negara X: teknik pengeluaran yang meminimumkan kos; Negara Y: teknik pengeluaran yang tidak berdasarkan kos; kedua-duanya berkongsi kebajikan masyarakat"),
        s2: p("Apakah sistem ekonomi yang diamalkan oleh kedua-dua negara tersebut?"),
        p: ["Negara X: Campuran · Negara Y: Kapitalis", "Negara X: Kapitalis · Negara Y: Campuran", "Negara X: Campuran · Negara Y: Perancangan pusat", "Negara X: Perancangan pusat · Negara Y: Campuran"],
        j: 2,
        e: "Negara X menggunakan teknik yang meminimumkan kos (ciri kapitalis) dan mengambil kira kebajikan masyarakat (ciri perancangan pusat), maka X mengamalkan ekonomi campuran. Negara Y menggunakan teknik yang tidak berdasarkan kos demi kebajikan masyarakat, iaitu ciri perancangan pusat."
      },
      {
        bab: "t4-b1",
        s: "Pernyataan manakah menunjukkan matlamat utama dalam ekonomi Islam?",
        p: ["Membasmi kemiskinan dalam negara", "Mencapai kebahagiaan dunia dan akhirat", "Kekayaan negara mesti diagihkan secara adil dan saksama", "Merapatkan jurang pendapatan golongan kaya dengan golongan miskin"],
        j: 1,
        e: "Matlamat utama ekonomi Islam ialah al-falah, iaitu kebahagiaan di dunia dan di akhirat. A, C dan D ialah prinsip atau cara untuk mencapainya."
      },
      {
        bab: "t4-b2",
        s: p("Rajah 1 menunjukkan perubahan kuantiti permintaan suatu barang."),
        gambar: gb("k1-s5", "Keluk D0 dan D1; titik X pada P1 dan Q1, titik Y pada P0 dan Q0 di atas D0, titik Z pada P0 dan Q2 di atas D1", "Rajah 1"),
        s2: p("Antara yang berikut, maklumat manakah yang betul tentang rajah di atas?"),
        p: ["Perubahan titik Z ke Y disebabkan oleh peningkatan subsidi", "Perubahan titik X ke Y disebabkan oleh pengurangan kuasa beli", "Perubahan titik Y ke Z disebabkan oleh kenaikan harga barang penggenap", "Perubahan titik Y ke Z disebabkan oleh pengurangan cukai pendapatan individu oleh kerajaan"],
        j: 3,
        e: "Y (di atas D₀) ke Z (di atas D₁) pada harga P₀ yang sama ialah pertambahan permintaan (keluk beralih ke kanan). Pengurangan cukai pendapatan menambah pendapatan boleh guna, maka permintaan bertambah. X ke Y ialah pergerakan di sepanjang keluk akibat harga barang itu turun. C mengurangkan permintaan; subsidi (A) mempengaruhi penawaran."
      },
      {
        bab: "t4-b2",
        s: p("Maklumat berikut menunjukkan harga barang A dan kuantiti diminta barang B.") + jadual("", ["Harga barang A (RM)", "Kuantiti diminta barang B (unit)"], [["Meningkat", "Menurun"], ["Menurun", "Meningkat"]]) + p("Contoh pasangan yang manakah <b>betul</b> tentang kedua-dua barang tersebut?"),
        p: ["Barang A: Milo · Barang B: Kopi", "Barang A: Garam · Barang B: Gula", "Barang A: Kereta · Barang B: Petrol", "Barang A: Komputer · Barang B: Televisyen"],
        j: 2,
        e: "Harga A naik menyebabkan kuantiti diminta B turun, maka A dan B ialah barang penggenap (digunakan bersama), contohnya kereta dan petrol. Milo dan kopi ialah barang pengganti."
      },
      {
        bab: "t4-b2",
        s: "Pilih pasangan yang <b>betul</b> tentang perubahan permintaan terhadap suatu barang di pasaran (penentu permintaan dan keluk permintaan).",
        p: [
          pilihanGambar("Harga barang penggenap menurun", "k1-s7a", "Keluk permintaan beralih ke kiri dari D0 ke D1 pada harga P, dari titik a ke titik b"),
          pilihanGambar("Kerajaan meningkatkan jumlah pelepasan cukai pendapatan individu", "k1-s7b", "Keluk permintaan beralih ke kanan dari D0 ke D1 pada harga P, dari titik a ke titik b"),
          pilihanGambar("Peningkatan dalam pendapatan individu", "k1-s7c", "Pergerakan ke bawah di sepanjang keluk D dari titik a (P0, Q0) ke titik b (P1, Q1)"),
          pilihanGambar("Harga barangan dijangka meningkat pada masa hadapan", "k1-s7d", "Pergerakan ke atas di sepanjang keluk D dari titik a (P0, Q0) ke titik b (P1, Q)")
        ],
        j: 1,
        e: "Pelepasan cukai yang lebih besar menambah pendapatan boleh guna, maka permintaan bertambah: keluk beralih ke kanan dari D₀ ke D₁ pada harga P. A tidak sepadan kerana harga barang penggenap turun sepatutnya menambah permintaan, tetapi rajahnya menunjukkan keluk ke kiri. C dan D menunjukkan pergerakan di sepanjang keluk (perubahan harga barang itu sendiri), bukan perubahan permintaan."
      },
      {
        bab: "t4-b2",
        s: p("Rajah 2 merupakan keluk penawaran suatu barang."),
        gambar: gb("k1-s8", "Keluk penawaran SS yang landai; harga naik dari P0 ke P1 dan kuantiti bertambah dari Q0 ke Q1", "Rajah 2"),
        s2: p("Pernyataan yang manakah betul?"),
        p: ["Perubahan harga melebihi perubahan kuantiti", "Keluk penawaran adalah tidak anjal", "Berlakunya perubahan penawaran", "Contoh barang adalah kamera"],
        j: 3,
        e: "Keluk dalam Rajah 2 landai: perubahan kuantiti (Q₀ ke Q₁) lebih besar daripada perubahan harga (P₀ ke P₁), maka penawaran anjal. Barang kilang seperti kamera mempunyai penawaran anjal kerana pengeluarannya mudah ditambah. A dan B menggambarkan penawaran tidak anjal; C salah kerana rajah menunjukkan pergerakan di sepanjang keluk."
      },
      {
        bab: "t4-b2",
        s: p("Jadual di bawah menunjukkan harga dan kuantiti diminta suatu barang.") + jadual("", ["Bulan", "Harga (RM)", "Kuantiti diminta (unit)"], [["Mac", "8", "6"], ["April", "10", "4"]], [1, 2]) + p("Berapakah nilai keanjalan harga permintaan apabila harga naik dari RM8 ke RM10?"),
        p: ["0.40", "0.75", "1.33", "2.50"],
        j: 2,
        e: "%ΔQ = (4 − 6) ÷ 6 × 100 = −33.33%. %ΔP = (10 − 8) ÷ 8 × 100 = 25%. Ed = 33.33 ÷ 25 = 1.33."
      },
      {
        bab: "t4-b2",
        s: p("Maklumat berikut berkaitan dengan pasaran kenderaan elektrik.") + petik(p("Kerajaan menawarkan insentif dalam bentuk pengecualian cukai langsung dan tidak langsung bagi aktiviti pemasangan atau pengilangan kenderaan elektrik.") + sumber("Sumber: Diubah suai daripada astroawani.com, 5 Oktober 2021")) + p("Rajah yang manakah betul bagi situasi tersebut?"),
        p: [
          pilihanGambar("", "k1-s10a", "Rajah A: keluk permintaan beralih ke kiri dari D0 ke D1; keseimbangan E0 ke E1"),
          pilihanGambar("", "k1-s10b", "Rajah B: keluk permintaan beralih ke kanan dari D0 ke D1; keseimbangan E0 ke E1"),
          pilihanGambar("", "k1-s10c", "Rajah C: keluk penawaran beralih ke kanan dari S0 ke S1; keseimbangan E0 ke E1"),
          pilihanGambar("", "k1-s10d", "Rajah D: keluk penawaran beralih ke kiri dari S0 ke S1; keseimbangan E0 ke E1")
        ],
        j: 2,
        e: "Insentif cukai kepada pengilang mengurangkan kos pengeluaran, maka penawaran kenderaan elektrik bertambah: keluk penawaran beralih ke kanan (S₀ ke S₁), harga keseimbangan turun dan kuantiti meningkat. A dan B menunjukkan perubahan permintaan; D menunjukkan penawaran berkurang."
      },
      {
        bab: "t4-b2",
        s: "Nilai pekali keanjalan permintaan telefon bimbit adalah lebih daripada satu manakala pekali keanjalan makanan kurang daripada satu. Pernyataan manakah benar berkaitan tindakan pengeluar untuk meningkatkan hasil?",
        p: ["Menurunkan harga telefon bimbit dan harga makanan supaya permintaan meningkat", "Meningkatkan harga telefon bimbit dan menurunkan harga makanan", "Menurunkan harga telefon bimbit dan menaikkan harga makanan", "Meningkatkan harga telefon bimbit dan harga makanan"],
        j: 2,
        e: "Permintaan telefon bimbit anjal (Ed > 1): menurunkan harga meningkatkan jumlah hasil. Permintaan makanan tidak anjal (Ed < 1): menaikkan harga meningkatkan jumlah hasil."
      },
      {
        bab: "t4-b2",
        s: p("Jadual 1 menunjukkan hubungan antara harga dengan kuantiti daging diminta.") + jadual("Jadual 1", ["Bulan", "Harga daging (RM)", "Kuantiti diminta (kg)"], [["Mac", "10", "20"], ["April", "8", "30"]], [1, 2]) + p("Pernyataan yang manakah benar apabila harga turun dari RM10 ke RM8?"),
        p: ["Penurunan kuantiti daging yang diminta kerana pengeluar yang bermatlamatkan keuntungan", "Faktor penentu permintaan daging adalah faktor ramai penternak lembu", "Pekali keanjalan permintaan daging lebih daripada satu", "Kuantiti daging diminta berubah akibat musim perayaan"],
        j: 2,
        e: "%ΔQ = (30 − 20) ÷ 20 × 100 = 50%; %ΔP = (8 − 10) ÷ 10 × 100 = −20%. Ed = 50 ÷ 20 = 2.5, iaitu lebih daripada satu (anjal). A salah kerana kuantiti diminta meningkat; B dan D bukan punca perubahan kuantiti diminta akibat perubahan harga."
      },
      {
        bab: "t4-b2",
        s: p("Rajah 3 berkaitan dengan penawaran rumah mampu milik oleh pengeluar."),
        gambar: gb("k1-s13", "Keluk penawaran beralih ke kanan dari S0S0 ke S1S1; pada harga RM20, kuantiti bertambah dari 200 ke 300 unit", "Rajah 3"),
        s2: p("Mengapakah berlaku perubahan keluk <b>S₀S₀ ke S₁S₁</b>?"),
        p: ["Matlamat pengeluar adalah memaksimumkan keuntungan", "Kerajaan mengenakan harga kawalan ke atas simen", "Dasar kerajaan memberi subsidi kepada pengeluar", "Kerajaan menetapkan upah minimum"],
        j: 2,
        e: "Keluk penawaran beralih ke kanan: pada harga yang sama, kuantiti ditawarkan bertambah dari 200 ke 300 unit. Subsidi kepada pengeluar mengurangkan kos pengeluaran, maka penawaran bertambah. D (upah minimum) menaikkan kos dan mengurangkan penawaran. Skema memberi C."
      },
      {
        bab: "t4-b3",
        s: "Antara berikut, yang manakah fungsi bank pusat menguruskan hutang negara?",
        p: ["Menguruskan pinjaman kerajaan dari dalam dan luar negara", "Menguruskan akaun penjelasan antara bank perdagangan", "Memberi nasihat pelaburan kepada bank perdagangan", "Memberi pendahuluan sementara kepada kerajaan"],
        j: 0,
        e: "Sebagai bank kepada kerajaan, bank pusat menguruskan hutang negara, termasuk pinjaman kerajaan dari dalam dan luar negara. B ialah fungsi bank kepada bank-bank."
      },
      {
        bab: "t4-b3",
        s: "Perbezaan upah pekerjaan antara individu disebabkan oleh faktor berikut <b>kecuali</b>",
        p: ["kelayakan akademik yang tinggi maka gajinya tinggi", "risiko dalam pekerjaan tinggi maka gajinya tinggi", "kekuatan kesatuan sekerja", "kekuatan fizikal"],
        j: 3,
        e: "Perbezaan upah dipengaruhi oleh kelayakan akademik, risiko pekerjaan dan kekuatan kesatuan sekerja. Kekuatan fizikal bukan faktor perbezaan upah yang dinyatakan."
      },
      {
        bab: "t4-b3",
        s: "Puan Mariam guru berpencen. Beliau menerima pencen bulanan RM4 500 dan ganjaran RM270 000 digunakan untuk membuka perniagaan IKS. Sebahagian daripada ganjaran digunakan untuk menabung di Permodalan Nasional dengan cara membeli Amanah Saham Bumiputera. Antara berikut, yang manakah jenis pendapatan yang diperoleh Puan Mariam?",
        p: ["Bayaran pindahan, untung dan dividen", "Sewa, dividen dan bayaran pindahan", "Untung, sewa dan untung", "Upah, untung dan sewa"],
        j: 0,
        e: "Pencen ialah bayaran pindahan; hasil perniagaan IKS ialah untung; pulangan Amanah Saham Bumiputera ialah dividen."
      },
      {
        bab: "t4-b3",
        s: p("Antara berikut, yang manakah berkaitan dengan ciri barang keperluan?") + roman(["Tidak dipengaruhi oleh saiz pendapatan", "Mempunyai pilihan barang yang pelbagai jenis", "Dimiliki untuk mengamalkan gaya hidup masa kini", "Wujud campur tangan kerajaan dalam penentuan harga barang"]),
        p: ["I dan II", "I dan IV", "II dan III", "III dan IV"],
        j: 1,
        e: "Barang keperluan dibeli tanpa mengira saiz pendapatan (I) dan harganya sering dikawal kerajaan, contohnya barang kawalan (IV). II dan III ialah ciri barang kehendak."
      },
      {
        bab: "t4-b4",
        s: "Pernyataan yang manakah betul tentang pengeluaran?",
        p: ["Fungsi pengeluaran jangka pendek merujuk kepada hubungan input tetap dengan output dalam proses pengeluaran", "Firma berupaya menyesuaikan tingkat keluaran mengikut kehendak pasaran dalam jangka masa pendek", "Input berubah mempunyai hubungan yang negatif dengan tingkat output", "Input tetap boleh menjadi input berubah dalam jangka masa panjang"],
        j: 3,
        e: "Dalam jangka panjang semua input boleh diubah, maka input tetap menjadi input berubah. A salah kerana fungsi pengeluaran jangka pendek menunjukkan hubungan input berubah dengan output. B salah kerana dalam jangka pendek firma tidak dapat menambah input tetap. C salah kerana hubungan input berubah dengan output adalah positif."
      },
      {
        bab: "t4-b4",
        s: "Fungsi pengeluaran dapat menunjukkan",
        p: ["Gabungan input yang cekap untuk mengeluarkan output", "Penggunaan input berubah bermula pada pengeluaran sifar", "Kombinasi input tetap dan input berubah dalam jangka panjang", "Penambahan input tetap akan meningkatkan pengeluaran jangka pendek"],
        j: 0,
        e: "Fungsi pengeluaran menunjukkan hubungan antara input dengan output maksimum yang dapat dikeluarkan, iaitu gabungan input yang cekap. C salah kerana dalam jangka panjang tiada input tetap; D salah kerana input tetap tidak boleh ditambah dalam jangka pendek."
      },
      {
        bab: "t4-b4",
        s: p("Maklumat berikut berkaitan dengan pengeluaran sebuah firma.") + jadual("", null, [["Output", "1 200 unit"], ["Harga jualan seunit", "RM30.00"], ["Kos purata", "RM20.00"]], [1]) + p("Berapakah untung firma tersebut?"),
        p: ["RM10 000", "RM12 000", "RM16 000", "RM20 000"],
        j: 1,
        e: "Untung = jumlah hasil − jumlah kos = (RM30 × 1 200) − (RM20 × 1 200) = RM36 000 − RM24 000 = RM12 000."
      },
      {
        bab: "t4-b4",
        s: p("Rajah 4 berkaitan dengan perbelanjaan pembangunan kerajaan dalam sektor ekonomi."),
        gambar: gb("k1-s21", "Gambar kerja-kerja pembinaan landasan kereta api dengan jentera berat", "Rajah 4"),
        s2: p("Apakah kos sosial yang berlaku?"),
        p: ["Kawasan berhampiran berpotensi berkembang pesat", "Meningkatkan akses kepada kemudahan sosial", "Kemusnahan tapak warisan dan budaya", "Harga tiket keretapi yang tinggi"],
        j: 2,
        e: "Kos sosial ialah kesan negatif kepada pihak ketiga, contohnya pembinaan landasan yang memusnahkan tapak warisan dan budaya. A dan B ialah faedah sosial; D ialah kos yang ditanggung pengguna sendiri."
      },
      {
        bab: "t5-b1",
        s: p("Rajah 5 menunjukkan perbualan antara beberapa orang suri rumah."),
        gambar: gb("k1-s22", "Perbualan suri rumah: harga barang di pasaraya Kenari sangat mahal berbanding beberapa bulan lepas; harga barang meningkat di tempat lain juga", "Rajah 5"),
        s2: p("Apakah langkah yang wajar dilaksanakan oleh kerajaan?"),
        p: ["Meningkatkan perbelanjaan pembangunan", "Mengurangkan pelepasan cukai pendapatan", "Menambah subsidi dan bantuan tunai kepada B40", "Mengambil tindakan tegas terhadap peniaga yang menaikkan harga"],
        j: 1,
        e: "Harga barang meningkat di semua tempat menunjukkan inflasi. Kerajaan boleh melaksanakan dasar fiskal menguncup, contohnya mengurangkan pelepasan cukai pendapatan supaya pendapatan boleh guna dan permintaan agregat berkurang. A dan C menambah perbelanjaan agregat, maka inflasi bertambah."
      },
      {
        bab: "t5-b1",
        s: p("Rajah 6 menunjukkan peranan kerajaan dalam mengawal selia pengeluar."),
        gambar: gb("k1-s23", "Keluk DD dan SS bersilang di E; garis harga P ditetapkan di bawah harga keseimbangan", "Rajah 6"),
        s2: p("Mengapakah kerajaan melaksanakan dasar tersebut?"),
        p: ["Pengeluar mampu menampung kos pengeluaran", "Mengelakkan eksploitasi terhadap pengguna", "Mengawal keuntungan syarikat besar", "Berlaku lebihan penawaran"],
        j: 1,
        e: "Rajah menunjukkan harga maksimum (siling) P yang ditetapkan di bawah harga keseimbangan E. Harga maksimum melindungi pengguna daripada eksploitasi harga yang tinggi. D salah kerana harga maksimum menyebabkan lebihan permintaan."
      },
      {
        bab: "t5-b1",
        s: "Apakah punca utama inflasi tarikan permintaan?",
        p: ["Penurunan kos bahan mentah", "Peningkatan pelepasan cukai", "Eksport melebihi import", "Kejatuhan nilai RM"],
        j: 1,
        e: "Inflasi tarikan permintaan berlaku apabila permintaan agregat melebihi penawaran agregat. Pelepasan cukai yang meningkat menambah pendapatan boleh guna, maka perbelanjaan dan permintaan agregat bertambah. Skema memberi B."
      },
      {
        bab: "t5-b1",
        s: "Pernyataan yang manakah benar tentang kesan kenaikan harga barang secara berterusan?",
        p: ["Harga barangan eksport menjadi murah", "Kadar pengangguran meningkat", "Jumlah tabungan meningkat", "Kadar faedah meningkat"],
        j: 3,
        e: "Kenaikan harga berterusan (inflasi) mendorong bank pusat menaikkan kadar faedah untuk mengawalnya, dan pemberi pinjaman menuntut pulangan lebih tinggi. A salah kerana barang eksport menjadi lebih mahal; C salah kerana nilai wang merosot dan tabungan cenderung berkurang."
      },
      {
        bab: "t5-b1",
        s: p("Jadual 2 menunjukkan harga beberapa barang runcit."),
        gambar: gb("k1-s26", "Senarai harga barang terkini 2021 dan 2022: brokoli RM8 ke RM20, cili RM13 ke RM19, ayam RM5.90 ke RM7.99 sekilo, telur gred C RM6 ke RM11.69", "Jadual 2"),
        s2: p("Berdasarkan perubahan harga barang-barang tersebut, apakah tindakan yang perlu diambil oleh bank pusat?"),
        p: ["Meningkatkan kadar cukai pendapatan", "Meningkatkan kadar rizab berkanun", "Mengurangkan keperluan cagaran", "Menurunkan kadar faedah"],
        j: 1,
        e: "Harga barang runcit meningkat dengan ketara dari 2021 ke 2022 (inflasi). Bank pusat melaksanakan dasar kewangan menguncup, contohnya menaikkan nisbah rizab berkanun supaya keupayaan bank memberi pinjaman berkurang. A ialah alat dasar fiskal; C dan D ialah langkah mengembang."
      },
      {
        bab: "t5-b1",
        s: "Apakah tujuan utama dasar fiskal mengembang?",
        p: ["Menyelesaikan masalah lebihan permintaan", "Meningkatkan permintaan agregat", "Mengurangkan kadar inflasi", "Meningkatkan hasil negara"],
        j: 1,
        e: "Dasar fiskal mengembang (menambah perbelanjaan kerajaan atau mengurangkan cukai) bertujuan meningkatkan permintaan agregat, terutamanya ketika kemelesetan. A dan C ialah tujuan dasar menguncup."
      },
      {
        bab: "t5-b2",
        s: "Pernyataan yang manakah menjelaskan kepentingan perdagangan antarabangsa terhadap pertumbuhan ekonomi negara?",
        p: ["Perluasan pilihan pengguna", "Menikmati harga barang yang lebih murah", "Meningkatkan mobiliti buruh ke negara lain", "Pemindahan dan penggunaan teknologi lebih pesat"],
        j: 3,
        e: "Perdagangan antarabangsa membolehkan pemindahan teknologi yang meningkatkan kecekapan dan kapasiti pengeluaran, lalu mendorong pertumbuhan ekonomi. A dan B lebih kepada manfaat kepada pengguna."
      },
      {
        bab: "t5-b2",
        s: "Apakah cara yang paling berkesan untuk mengehadkan kuantiti barang yang diimport?",
        p: ["Tarif", "Kuota", "Embargo", "Kawalan pertukaran asing"],
        j: 1,
        e: "Kuota menetapkan had maksimum kuantiti barang yang boleh diimport. Tarif hanya menaikkan harga barang import, manakala embargo melarang import sepenuhnya."
      },
      {
        bab: "t5-b2",
        s: "Pernyataan yang manakah betul berkaitan peranan khusus kerajaan dalam menggalakkan globalisasi?",
        p: ["Mengecualikan visa semasa ketibaan pelancong", "Pengembangan industri penggantian import", "Pembukaan lapangan terbang baharu", "Memiliki ICT yang lengkap"],
        j: 0,
        e: "Pengecualian visa semasa ketibaan memudahkan pergerakan pelancong dan pelabur antara negara, satu peranan khusus kerajaan dalam menggalakkan globalisasi. B ialah dasar melindungi industri tempatan."
      },
      {
        bab: "t5-b2",
        s: p("Antara yang berikut, manakah yang merupakan komponen yang terdapat dalam akaun semasa?") + roman(["Akaun barangan", "Derivatif kewangan", "Akaun pelaburan langsung", "Akaun pendapatan sekunder"]),
        p: ["I dan II", "I dan IV", "II dan III", "III dan IV"],
        j: 1,
        e: "Akaun semasa terdiri daripada akaun barangan, akaun perkhidmatan, akaun pendapatan primer dan akaun pendapatan sekunder. Derivatif kewangan dan pelaburan langsung ialah komponen akaun kewangan."
      },
      {
        bab: "t5-b2",
        s: p("Maklumat di bawah berkaitan dengan suatu fenomena ekonomi.") + petik("Dalam tempoh enam bulan kebelakangan ini, trend harga minyak mentah global telah menjunam lebih 50%.") + p("Antara yang berikut, akaun manakah dalam imbangan pembayaran akan terjejas?"),
        p: ["Akaun dagangan dan akaun semasa", "Akaun perkhidmatan dan akaun modal", "Akaun pendapatan dan akaun pelaburan langsung", "Akaun pindahan semasa dan akaun pelaburan portfolio"],
        j: 0,
        e: "Minyak mentah ialah barangan eksport Malaysia. Kejatuhan harganya mengurangkan nilai eksport dalam akaun dagangan (barangan), seterusnya menjejaskan imbangan akaun semasa."
      },
      {
        bab: "t5-b2",
        s: "Mengapakah sesebuah negara memerlukan pertukaran asing?",
        p: ["Untuk membiayai import negara", "Untuk membiayai eksport negara", "Untuk membiayai perbelanjaan mengurus", "Untuk membiayai perbelanjaan pembangunan"],
        j: 0,
        e: "Pertukaran asing diperlukan untuk membayar import barang dan perkhidmatan dari negara lain."
      },
      {
        bab: "t4-b2",
        s: pernyataan("Keluk permintaan menunjukkan kuantiti diminta pada setiap tingkat harga.", "Keluk permintaan mencerun ke bawah dari kiri ke kanan."),
        p: BS,
        j: 2,
        e: "Kedua-duanya betul."
      },
      {
        bab: "t4-b3",
        s: pernyataan("Pendapatan boleh guna boleh dibelanjakan untuk membeli barang dan perkhidmatan.", "Zakat merupakan potongan wajib dalam pengiraan pendapatan boleh guna."),
        p: BS,
        j: 2,
        e: "Kedua-duanya betul. Pendapatan boleh guna ialah pendapatan selepas potongan wajib seperti cukai pendapatan, caruman KWSP, PERKESO dan zakat."
      },
      {
        bab: "t4-b3",
        s: pernyataan("Bayaran secara kredit menggalakkan pembeli berbelanja secara berhemah.", "Bayaran secara kredit menyenangkan pembeli mendapat perkhidmatan selepas jualan."),
        p: BS,
        j: 1,
        e: "Skema memberi B. I salah kerana pembelian secara kredit boleh mendorong pembeli berbelanja melebihi kemampuan. II betul."
      },
      {
        bab: "t4-b4",
        s: pernyataan("Keluaran purata ialah perubahan jumlah keluaran akibat perubahan seunit input berubah.", "Jumlah keluaran ialah jumlah output yang dapat dihasilkan oleh firma dalam sesuatu jangka masa tertentu."),
        p: BS,
        j: 1,
        e: "I salah: pernyataan itu ialah takrif keluaran marginal (MP). Keluaran purata = jumlah keluaran ÷ bilangan input berubah. II betul."
      },
      {
        bab: "t4-b4",
        s: pernyataan("Produktiviti ialah keupayaan untuk meningkatkan jumlah output daripada sejumlah input.", "Produktiviti dapat ditingkatkan melalui penggunaan pakar dari luar negara."),
        p: BS,
        j: 0,
        e: "I betul. II tidak diterima oleh skema; faktor peningkatan produktiviti dalam buku teks termasuk latihan dan kemahiran pekerja, teknologi, penyelidikan dan pembangunan serta pengurusan yang cekap."
      },
      {
        bab: "t4-b4",
        s: pernyataan("Eksternaliti ialah kos atau faedah yang tidak diambil kira dalam pengeluaran dan penggunaan sesuatu barang dan perkhidmatan.", "Contoh kos sosial ialah kesan pencemaran udara kepada masyarakat akibat aktiviti pembakaran sampah secara terbuka."),
        p: BS,
        j: 2,
        e: "Kedua-duanya betul."
      },
      {
        bab: "t5-b2",
        s: pernyataan("Tarif ad valorem ialah cukai import yang dihitung berdasarkan jumlah nilai barang import.", "Contoh tarif ad valorem ialah Kastam Diraja Malaysia mengenakan tarif sebanyak 20% daripada jumlah nilai tayar import."),
        p: BS,
        j: 2,
        e: "Kedua-duanya betul: tarif ad valorem dikira sebagai peratusan daripada nilai barang import."
      }
    ]
  });

  /* =========================================================
     KERTAS 2 (3767/2)
     ========================================================= */
  function rubrik(topik) {
    return [
      ["Tahap 1 (1–3 markah)", ["Pengetahuan terhad tentang " + topik, "Menyenaraikan fakta atau isi sahaja tanpa huraian", "Huraian tidak dijelaskan dengan baik dan kurang difahami"]],
      ["Tahap 2 (4–6 markah)", ["Berupaya mengaplikasikan fakta dan konsep tentang " + topik + " dengan betul berdasarkan situasi", "Fakta yang sesuai, betul dan jelas", "Sebahagian besar huraian masih tepat tetapi kurang mendalam", "Mengemukakan idea yang rasional dan masih sesuai serta relevan"]],
      ["Tahap 3 (7–9 markah)", ["Berupaya mengaplikasikan fakta dan konsep tentang " + topik + " dengan betul, tepat dan jelas", "Mengemukakan idea yang bernas, kreatif dan rasional", "Huraian sangat jelas, matang dan mendalam", "Jawapan dua sisi", "Menghubungkaitkan teori ekonomi dengan pelbagai topik", "Membuat kesimpulan, rumusan, pandangan atau cadangan dan memberi bukti atau data yang relevan"]]
    ];
  }

  E.daftarK2({
    id: "sp25",
    k1: "sp25-k1",
    nama: "Seberang Perai 2025",
    label: "Percubaan SPM Seberang Perai 2025",
    sumber: "Peperiksaan Percubaan SPM 2025 (Seberang Perai)",
    bahagianA: "Bahagian A (3 soalan wajib, 60 markah)",
    bahagianB: "Bahagian B (pilih 2 daripada 4, 40 markah)",
    soalan: [
      /* ---------------- SOALAN 1 ---------------- */
      {
        no: 1,
        seksyen: "A",
        tajuk: "Faktor pengeluaran, sistem ekonomi, penawaran dan keanjalan",
        bahagian: [
          {
            kod: "(a)",
            konteks: p("Rajah 1 menunjukkan faktor-faktor pengeluaran yang digunakan dalam proses pengeluaran."),
            gambar: gb("k2-1a", "Seorang pekerja membaiki kereta yang diangkat oleh jentera pengangkat di bengkel", "Rajah 1"),
            s: "Terangkan ciri-ciri faktor pengeluaran tersebut.",
            m: 6,
            bab: "t4-b1",
            topik: "Faktor pengeluaran: buruh dan modal",
            skema: [
              {
                label: "Buruh",
                isi: [
                  ["F1", "Buruh"],
                  ["H1a", "Individu yang menyumbangkan tenaga fizikal dan mental dalam proses pengeluaran"],
                  ["H1b", "Buruh mahir (berpendidikan tinggi / berkemahiran profesional) dan buruh tidak mahir (berpendidikan rendah / tiada kemahiran profesional)"],
                  ["H1c", "Mempunyai mobiliti geografi / pekerjaan"],
                  ["H1d", "Menerima upah"]
                ]
              },
              {
                label: "Modal",
                isi: [
                  ["F2", "Modal"],
                  ["H2a", "Alat ciptaan manusia yang digunakan untuk mengeluarkan barang dan perkhidmatan"],
                  ["H2b", "Contoh modal: peralatan / jentera / mesin"],
                  ["H2c", "Mobiliti geografi tinggi, contohnya jentera / mesin"],
                  ["H2d", "Pemilik modal menerima faedah"]
                ]
              }
            ],
            nota: "2F + 4H (mana-mana huraian). Maksimum 6 markah."
          },
          {
            kod: "(b)(i)",
            konteks: p("Maklumat berikut berkaitan dengan negara P.") + petik("<b>Negara P</b><ul style=\"margin:6px 0 0;padding-left:18px\"><li>Kerajaan tidak campur tangan dalam ekonomi</li><li>Mekanisme harga menentukan harga pasaran</li></ul>") + p("Jelaskan cara negara P menyelesaikan masalah asas ekonomi berikut:"),
            s: "Apa yang hendak dikeluarkan?",
            m: 2,
            bab: "t4-b1",
            topik: "Sistem ekonomi kapitalis",
            skema: [
              {
                isi: [
                  ["H1", "Diselesaikan melalui kuasa permintaan dan penawaran / mekanisme pasaran / mekanisme harga"],
                  ["H2", "Pengguna bebas memilih barang yang diingini"],
                  ["H3", "Mencapai kepuasan maksimum"],
                  ["H4", "Pengeluar bebas mengeluarkan barang yang mempunyai permintaan yang tinggi"],
                  ["H5", "Mencapai keuntungan maksimum"]
                ]
              }
            ],
            nota: "Maksimum 2 markah."
          },
          {
            kod: "(b)(ii)",
            s: "Bagaimana hendak dikeluarkan?",
            m: 2,
            bab: "t4-b1",
            topik: "Sistem ekonomi kapitalis",
            skema: [
              {
                isi: [
                  ["H1", "Penentuan cara / kaedah / teknik pengeluaran barang dan perkhidmatan"],
                  ["H2", "Kaedah yang paling cekap"],
                  ["H3", "Kaedah berintensif modal / berintensif buruh"],
                  ["H4", "Menggabungkan faktor pengeluaran secara optimum / meminimumkan kos pengeluaran / memaksimumkan keuntungan"]
                ]
              }
            ],
            nota: "Maksimum 2 markah."
          },
          {
            kod: "(c)",
            konteks: p("Rajah 2 menunjukkan perubahan penawaran suatu barang."),
            gambar: gb("k2-1c", "Keluk penawaran beralih ke kanan dari S0S0 ke S1S1; pada harga P, kuantiti bertambah dari Q0 ke Q1", "Rajah 2"),
            s: "Terangkan penentu yang menyebabkan peralihan keluk S₀S₀ ke S₁S₁.",
            m: 6,
            bab: "t4-b2",
            topik: "Penentu penawaran",
            skema: [
              {
                isi: [
                  ["F1", "Tingkat teknologi"],
                  ["H1", "Teknologi canggih / cekap / moden"],
                  ["F2", "Harga faktor pengeluaran"],
                  ["H2", "Menurun"],
                  ["F3", "Matlamat pengeluar"],
                  ["H3", "Memaksimumkan jualan"],
                  ["F4", "Jangkaan harga masa depan"],
                  ["H4", "Menurun"],
                  ["F5", "Dasar kerajaan"],
                  ["H5", "Pemberian subsidi / pelepasan cukai"],
                  ["F6", "Cuaca"],
                  ["H6", "Cerah / sesuai"]
                ]
              }
            ],
            nota: "Mana-mana 3F + 3H. Maksimum 6 markah."
          },
          {
            kod: "(d)(i)",
            konteks: p("Rajah 3 menunjukkan hubungan antara tingkat harga dengan kuantiti yang diminta suatu barang."),
            gambar: gb("k2-1d", "Keluk permintaan DD yang curam; harga naik 25% dari P0 ke P1 dan kuantiti diminta berubah 7% antara Q1 dan Q0", "Rajah 3"),
            s: "Hitung nilai keanjalan harga permintaan barang tersebut.",
            m: 2,
            bab: "t4-b2",
            topik: "Keanjalan harga permintaan",
            skema: [
              {
                isi: [
                  ["K1", "Ed = %ΔQ ÷ %ΔP"],
                  ["K2", "= 7% ÷ 25%"],
                  ["K3", "= 0.28"]
                ]
              }
            ],
            nota: "Jawapan betul tanpa jalan kira diberi 2 markah. Maksimum 2 markah. Skema asal menulis Es dan \"7 / 125\"; soalan meminta keanjalan harga permintaan, dan pengiraan yang betul ialah 7% ÷ 25% = 0.28."
          },
          {
            kod: "(d)(ii)",
            s: "Tafsirkan nilai keanjalan harga permintaan barang di 1(d)(i).",
            m: 2,
            bab: "t4-b2",
            topik: "Keanjalan harga permintaan",
            skema: [
              {
                isi: [
                  ["H1", "Kenaikan harga 1% menyebabkan kuantiti diminta berkurang 0.28% / penurunan harga 1% menyebabkan kuantiti diminta meningkat 0.28%"],
                  ["H2", "Ed < 1 / tidak anjal / %ΔQ < %ΔP / keluk DD curam"]
                ]
              }
            ],
            nota: "Skema asal ditulis untuk penawaran (kuantiti ditawar, keluk SS); isi di sini disesuaikan dengan soalan permintaan."
          }
        ]
      },

      /* ---------------- SOALAN 2 ---------------- */
      {
        no: 2,
        seksyen: "A",
        tajuk: "Pemilihan pekerjaan, bayaran pindahan, input dan kos sosial",
        bahagian: [
          {
            kod: "(a)",
            konteks: p("Maklumat berikut berkaitan dengan peralihan kerjaya Juraidah.") + jadual("", ["Januari 2020 – Disember 2022", "Januari 2023 – sekarang"], [["Luar bandar", "Bandar"], ["Kerani akaun", "Penyelia kilang"], ["Kilang kelapa sawit, Setiu", "Kilang ais, Gong Badak, Kuala Nerus"], ["Gaji: RM1 500", "Gaji: RM4 000"]]),
            s: "Terangkan faktor yang mempengaruhi Juraidah memilih pekerjaan tersebut.",
            m: 6,
            bab: "t4-b3",
            topik: "Pemilihan pekerjaan",
            skema: [
              {
                isi: [
                  ["F1", "Upah"],
                  ["H1", "Upah yang tinggi berbanding kerjaya lama (RM4 000 berbanding RM1 500)"],
                  ["F2", "Lokasi tempat kerja"],
                  ["H2", "Tempat kerja di kawasan bandar menepati cita rasa"],
                  ["F3", "Prospek pekerjaan"],
                  ["H3", "Berpeluang untuk kenaikan pangkat"],
                  ["F4", "Minat"],
                  ["H4", "Minat kerjaya sebagai penyelia berbanding kerani"]
                ]
              }
            ],
            nota: "Mana-mana 3F + 3H. Maksimum 6 markah."
          },
          {
            kod: "(b)",
            konteks: p("Maklumat berikut berkaitan dengan jenis pendapatan individu.") + petikan("", ["PUTRAJAYA: Kerajaan menyalurkan bantuan langsung kepada golongan yang memerlukan berjumlah RM32.1 bilion sejak negara dilanda COVID-19 pada Mac tahun lepas.", "Menteri Kewangan, Tengku Datuk Seri Zafrul Tengku Abdul Aziz, berkata bantuan langsung berkenaan merangkumi Bantuan Prihatin Nasional (BPN) dan Bantuan Prihatin Rakyat (BPR)."], "Sumber: Diubah suai daripada mof.gov.my/portal, 1 September 2021"),
            s: "Jelaskan jenis pendapatan tersebut.",
            m: 4,
            bab: "t4-b3",
            topik: "Bayaran pindahan",
            skema: [
              {
                isi: [
                  ["H1", "Bayaran pindahan"],
                  ["H2", "Bantuan Prihatin Nasional (BPN) dan Bantuan Prihatin Rakyat (BPR) yang diberi oleh kerajaan"],
                  ["H3", "Pendapatan tidak produktif"],
                  ["H4", "Penerima tidak perlu menyumbang apa-apa dalam proses pengeluaran"],
                  ["H5", "Tidak perlu dibayar balik"]
                ]
              }
            ],
            nota: "Maksimum 4 markah."
          },
          {
            kod: "(c)",
            konteks: p("Gambar menunjukkan input yang digunakan dalam pembuatan keropok lekor."),
            gambar: gb("k2-2c", "Gambar A: ikan. Gambar B: mesin pembuat keropok lekor"),
            s: "Bandingkan kedua-dua input pengeluaran tersebut.",
            m: 5,
            bab: "t4-b4",
            topik: "Input tetap dan input berubah",
            skema: [
              {
                label: "Persamaan",
                isi: [
                  ["H1", "Faktor pengeluaran yang digunakan dalam proses pengeluaran untuk menghasilkan barang dan perkhidmatan"],
                  ["H2", "Wujud dalam jangka masa pendek"]
                ]
              },
              {
                label: "Perbezaan (Input A: ikan · Input B: mesin)",
                isi: [
                  ["H3", "Input A ialah input berubah; input B ialah input tetap", 2],
                  ["H4", "Kuantiti input A berubah mengikut tingkat output; kuantiti input B tetap pada sebarang tingkat output", 2],
                  ["H5", "Pada output sifar, input A tidak wujud; input B masih wujud", 2],
                  ["H6", "Input A wujud dalam jangka pendek dan jangka panjang; input B hanya dalam jangka pendek", 2],
                  ["H7", "Contoh input A: bahan mentah dan buruh; contoh input B: mesin, loji, bangunan kilang dan tanah", 2]
                ]
              }
            ],
            nota: "Setiap perbezaan bernilai 1 + 1. Gabungan 1 + 4 (persamaan + perbezaan). Maksimum 5 markah."
          },
          {
            kod: "(d)",
            konteks: p("Gambar berikut berkaitan dengan satu kempen kerajaan."),
            gambar: gb("k2-2d", "Poster kempen 'Kenali tanda-tanda bahaya merokok' dengan gambar paru-paru dan simbol larangan merokok", "Sumber: Diubah suai daripada https://rsudsekayu.mubakab.go.id/, 12 Julai 2023"),
            s: "Jelaskan kos sosial yang timbul daripada situasi tersebut.",
            m: 5,
            bab: "t4-b4",
            topik: "Eksternaliti: kos sosial",
            skema: [
              {
                isi: [
                  ["H1", "Juga dikenali sebagai eksternaliti negatif"],
                  ["H2", "Kos kepada pihak ketiga yang tidak termasuk dalam harga pasaran"],
                  ["H3", "Kos sosial = kos persendirian + kos luaran"],
                  ["H4", "Kos persendirian atas pengeluaran dan penggunaan ialah kos nyata firma, individu atau kerajaan"],
                  ["H5", "Kos luaran ialah kesan sampingan negatif yang ditanggung oleh pihak ketiga tanpa sebarang pampasan"],
                  ["H6", "Kanak-kanak berisiko menghidap asma / alahan / batuk dan radang paru-paru"],
                  ["H7", "Wanita hamil berisiko keguguran / melahirkan bayi pramatang / komplikasi kesihatan"],
                  ["H8", "Kos perubatan yang tinggi"],
                  ["H9", "Pencemaran udara"]
                ]
              }
            ],
            nota: "Maksimum 5 markah. Terima mana-mana jawapan yang munasabah."
          }
        ]
      },

      /* ---------------- SOALAN 3 ---------------- */
      {
        no: 3,
        seksyen: "A",
        tajuk: "Perbelanjaan kerajaan, pengangguran, tarif dan kadar pertukaran",
        bahagian: [
          {
            kod: "(a)",
            konteks: p("Maklumat berikut berkaitan dengan perbelanjaan kerajaan.") + petik(p("<b>Projek Pembinaan Hospital Pasir Gudang Dijangka Siap pada Mac 2025.</b>") + sumber("Sumber: Diubah suai daripada https://www.kkr.gov.my/, 13 Jun 2024")),
            s: "Mengapakah kerajaan perlu membina hospital tersebut?",
            m: 5,
            bab: "t5-b1",
            topik: "Barang awam dan perbelanjaan kerajaan",
            skema: [
              {
                isi: [
                  ["H1", "Barang awam"],
                  ["H2", "Peranan kerajaan sebagai pengeluar"],
                  ["H3", "Barang yang dapat digunakan oleh seseorang individu tanpa mengurangkan faedah penggunaan individu lain"],
                  ["H4", "Semua orang boleh menggunakannya / tidak boleh menghalang orang lain daripada menggunakannya"],
                  ["H5", "Tidak dikenakan bayaran / dikenakan bayaran minimum sahaja"],
                  ["H6", "Penawaran terhad"],
                  ["H7", "Mempunyai kos lepas"],
                  ["H8", "Untuk memaksimumkan kebajikan rakyat"],
                  ["H9", "Meningkatkan taraf kesihatan rakyat"],
                  ["H10", "Sektor perkhidmatan sosial"],
                  ["H11", "Memerlukan kos perbelanjaan yang besar"]
                ]
              }
            ],
            nota: "Maksimum 5 markah."
          },
          {
            kod: "(b)(i)",
            konteks: p("Maklumat berikut berkaitan dengan ketidakstabilan ekonomi negara.") + petik(p("Seramai 293 639 pekerja telah kehilangan pekerjaan dalam pelbagai sektor dari tahun 2020 hingga 27 September 2023.") + sumber("Sumber: Diubah suai daripada https://berita.rtm.gov.my/, 21 Oktober 2024")),
            s: "Jelaskan situasi ekonomi tersebut.",
            m: 2,
            bab: "t5-b1",
            topik: "Pengangguran",
            skema: [
              {
                isi: [
                  ["F1", "Kemelesetan ekonomi / pengangguran berlaku"],
                  ["H1", "Pendapatan boleh guna menurun"],
                  ["H2", "Kuasa beli menurun"],
                  ["H3", "Permintaan agregat menurun"]
                ]
              }
            ],
            nota: "1F + 1H. Maksimum 2 markah."
          },
          {
            kod: "(b)(ii)",
            s: "Bagaimanakah kerajaan mengatasi masalah di (b)(i) menggunakan dasar fiskal?",
            m: 4,
            bab: "t5-b1",
            topik: "Dasar fiskal mengembang",
            skema: [
              {
                isi: [
                  ["H1", "Kerajaan melaksanakan dasar fiskal mengembang"],
                  ["H2", "Menambah perbelanjaan kerajaan"],
                  ["H3", "Dapat meningkatkan peluang pekerjaan"],
                  ["H4", "Mengurangkan kadar cukai"],
                  ["H5", "Dapat meningkatkan pendapatan boleh guna"],
                  ["H6", "Kuasa beli / permintaan barang bertambah"],
                  ["H7", "Menggalakkan pertumbuhan ekonomi"],
                  ["H8", "Permintaan agregat meningkat"]
                ]
              }
            ],
            nota: "Maksimum 4 markah."
          },
          {
            kod: "(c)(i)",
            konteks: p("Maklumat berikut berkaitan dengan bentuk sekatan perdagangan antarabangsa.") + petik(p("Harga kenderaan elektrik (EV) import sepenuhnya (CBU) dijangka meningkat tinggi selepas tamat tempoh pengecualian duti pada akhir tahun 2025.") + sumber("Sumber: Diubah suai daripada https://www.bharian.com.my/, 29 Disember 2024")),
            s: "Nyatakan bentuk sekatan tersebut.",
            m: 1,
            bab: "t5-b2",
            topik: "Sekatan perdagangan",
            skema: [
              {
                isi: [["F1", "Tarif / duti import / cukai import"]]
              }
            ]
          },
          {
            kod: "(c)(ii)",
            s: "Jelaskan tujuan sekatan perdagangan antarabangsa tersebut dilaksanakan.",
            m: 4,
            bab: "t5-b2",
            topik: "Sekatan perdagangan",
            skema: [
              {
                isi: [
                  ["H1", "Melindungi industri muda tempatan"],
                  ["H2", "Sebagai sumber pendapatan kerajaan"],
                  ["H3", "Dapat mengurangkan persaingan dengan barangan tempatan"],
                  ["H4", "Membolehkan industri muda tempatan berkembang maju"],
                  ["H5", "Membolehkan pengeluaran secara besar-besaran / menikmati kos pengeluaran seunit yang lebih rendah"],
                  ["H6", "Menggalakkan barang keluaran tempatan dieksport ke luar negara"],
                  ["H7", "Menawarkan lebih banyak peluang pekerjaan"],
                  ["H8", "Membaiki imbangan pembayaran"],
                  ["H9", "Mengatasi masalah lambakan kereta import dalam negara"]
                ]
              }
            ],
            nota: "Maksimum 4 markah."
          },
          {
            kod: "(d)",
            konteks: p("Jadual berikut menunjukkan kadar pertukaran antara Ringgit Malaysia (RM) berbanding Dolar Amerika Syarikat (USD) bagi dua tempoh masa.") + jadual("", ["Bulan", "Amerika Syarikat (USD)", "Malaysia (RM)"], [["Januari 2025", "1", "4.4700"], ["April 2025", "1", "4.4290"]], [1, 2]),
            s: "Jelaskan kesan ke atas imbangan dagangan Malaysia akibat perubahan tersebut.",
            m: 4,
            bab: "t5-b2",
            topik: "Kadar pertukaran asing",
            skema: [
              {
                isi: [
                  ["H1", "Nilai RM meningkat / naik"],
                  ["H2", "Harga barang eksport menjadi lebih mahal"],
                  ["H3", "Nilai eksport berkurang / menurun"],
                  ["H4", "Harga barang import lebih murah"],
                  ["H5", "Nilai import meningkat"],
                  ["H6", "Nilai import melebihi nilai eksport"],
                  ["H7", "Imbangan dagangan defisit / imbangan pembayaran defisit / akaun semasa defisit"]
                ]
              }
            ],
            nota: "Maksimum 4 markah (skema asal tertulis Mak. 9m, tetapi soalan bernilai 4 markah)."
          }
        ]
      },

      /* ---------------- SOALAN 4 ---------------- */
      {
        no: 4,
        seksyen: "B",
        tajuk: "Kenaikan gaji minimum",
        konteks: p("Maklumat di bawah berkaitan dengan masalah ekonomi.") + petikan("Kenaikan gaji minimum RM1 700 rangsang ekonomi negara", ["KUALA LUMPUR: Peningkatan gaji minimum dijangka merangsang kuasa beli rakyat sekali gus menggerakkan ekonomi negara dan dapat memberi manfaat kepada semua pihak. Beliau berkata keputusan menaikkan gaji minimum kepada RM1 700 adalah langkah positif namun pelaksanaannya perlu mengambil kira keadaan ekonomi semasa negara dan serantau bagi mengelakkan tekanan inflasi yang ketara terhadap rakyat."], "Sumber: Diubah suai daripada Astro Awani, 3 Februari 2025"),
        bahagian: [
          {
            kod: "(a)",
            s: "Mengapakah kerajaan mengambil tindakan sedemikian?",
            m: 4,
            bab: "t5-b1",
            topik: "Gaji minimum",
            skema: [
              {
                isi: [
                  ["H1", "Meningkatkan pendapatan"],
                  ["H2", "Meningkatkan kuasa beli"],
                  ["H3", "Dapat meningkatkan perbelanjaan"],
                  ["H4", "Mengurangkan tekanan kenaikan harga barang"],
                  ["H5", "Meningkatkan permintaan agregat"],
                  ["H6", "Firma meningkatkan pengeluaran / penawaran"],
                  ["H7", "Firma meningkatkan untung"],
                  ["H8", "Kerajaan dapat meningkatkan kutipan cukai"],
                  ["H9", "Kutipan cukai SST meningkat"],
                  ["H10", "Pendapatan negara meningkat"],
                  ["H11", "Meningkatkan peluang pekerjaan"],
                  ["H12", "Meningkatkan tarikan kepada pekerja tempatan"],
                  ["H13", "Mengurangkan pengambilan pekerja asing"]
                ]
              }
            ],
            nota: "Maksimum 4 markah."
          },
          {
            kod: "(b)",
            s: "Dengan bantuan gambar rajah, jelaskan kesan tindakan tersebut kepada pasaran.",
            m: 7,
            bab: "t4-b2",
            topik: "Perubahan permintaan dan keseimbangan",
            gambarSkema: gb("skema-4b", "Jawapan skema: keluk permintaan beralih ke kanan dari D0 ke D1 dengan penawaran S0 tetap; keseimbangan berubah dari E0 ke E1, harga naik dari P0 ke P1 dan kuantiti naik dari Q0 ke Q1", "Rajah jawapan dalam skema"),
            skema: [
              {
                label: "Rajah (maksimum 4 markah)",
                isi: [
                  ["H1", "Paksi X dan Y serta titik asalan"],
                  ["H2", "Keseimbangan asal"],
                  ["H3", "Keluk DD baharu"],
                  ["H4", "Keseimbangan baharu"]
                ]
              },
              {
                label: "Penerangan keluk (maksimum 3 markah)",
                isi: [
                  ["H5", "Keseimbangan asal E₀: harga P₀ dan kuantiti Q₀"],
                  ["H6", "Keluk DD beralih ke kanan (D₀D₀ ke D₁D₁)"],
                  ["H7", "Keseimbangan baharu E₁: harga P₁ dan kuantiti Q₁"],
                  ["H8", "Kuantiti permintaan meningkat dari Q₀ ke Q₁"],
                  ["H9", "Harga meningkat dari P₀ ke P₁"]
                ]
              }
            ],
            nota: "Maksimum 7 markah."
          },
          {
            kod: "(c)",
            s: "Tindakan tersebut memberikan implikasi kepada ekonomi negara. Bincangkan.",
            m: 9,
            bab: "t5-b1",
            topik: "Implikasi gaji minimum",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Kuasa beli pekerja meningkat, perbelanjaan penggunaan dan permintaan agregat bertambah"],
                  ["C2", "Firma menambah pengeluaran, pertumbuhan ekonomi dan KDNK meningkat"],
                  ["C3", "Kutipan cukai (termasuk SST) bertambah, hasil kerajaan meningkat"],
                  ["C4", "Menarik pekerja tempatan dan mengurangkan kebergantungan kepada pekerja asing"],
                  ["C5", "Taraf hidup pekerja berpendapatan rendah meningkat"],
                  ["C6", "Sisi lain: kos buruh firma meningkat, untung firma berkurang"],
                  ["C7", "Sisi lain: harga barang boleh naik (inflasi tolakan kos)"],
                  ["C8", "Sisi lain: firma, terutama PKS, mungkin mengurangkan pekerja atau beralih kepada automasi"],
                  ["C9", "Sisi lain: daya saing harga barang eksport berkurang"],
                  ["C10", "Rumusan yang disokong alasan"]
                ]
              }
            ],
            rubrik: [
              ["Tahap 1 (1–3 markah)", ["Pengetahuan yang terhad tentang kesan terhadap firma", "Menyenaraikan fakta atau isi sahaja tanpa huraian", "Pernyataan atau keterangan umum", "Keterangan jawapan satu sisi sahaja (pro atau kontra)", "Tiada sokongan rajah atau bukti yang bersesuaian"]],
              ["Tahap 2 (4–6 markah)", ["Fakta dan huraian atau idea masih tepat, betul, logik dan berkaitan", "Keterangan bercampur: tepat dan kurang tepat", "Keterangan jawapan satu sisi sahaja (pro atau kontra)", "Bukti: rajah umum atau tidak lengkap", "Huraian rajah terhad"]],
              ["Tahap 3 (7–9 markah)", ["Mengemukakan idea atau pandangan yang bernas, kreatif dan rasional", "Fakta tepat dan lengkap", "Keterangan betul, sangat jelas, matang dan mendalam", "Keterangan jawapan dua sisi (pro dan kontra)", "Bukti: rajah lengkap, tepat dan bersesuaian", "Huraian rajah lengkap", "Mengemukakan kesimpulan, dapatan atau rumusan sendiri"]]
            ],
            nota: "Rubrik dalam skema asal merujuk kesan kepada firma; soalan meminta implikasi kepada ekonomi negara."
          }
        ]
      },

      /* ---------------- SOALAN 5 ---------------- */
      {
        no: 5,
        seksyen: "B",
        tajuk: "Indeks Harga Pengguna dan inflasi",
        konteks: p("Maklumat berikut berkaitan dengan satu situasi dalam ekonomi.") + petikan("Indeks Harga Pengguna rekod peningkatan perlahan", ["Laporan terbaharu Indeks Harga Pengguna (IHP) yang dikeluarkan Jabatan Perangkaan Malaysia (DOSM), bacaan mata indeks IHP adalah 134.1, meningkat daripada 132.2 pada bulan sama tahun lalu."], "Sumber: Diubah suai daripada https://www.astroawani.com.my, 20 Februari 2025"),
        bahagian: [
          {
            kod: "(a)",
            s: "Jelaskan situasi ekonomi yang terdapat dalam petikan di atas.",
            m: 4,
            bab: "t5-b1",
            topik: "Inflasi dan IHP",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Berlaku inflasi: tingkat harga umum meningkat"],
                  ["C2", "IHP meningkat daripada 132.2 kepada 134.1"],
                  ["C3", "Kadar inflasi = (134.1 − 132.2) ÷ 132.2 × 100 = 1.44%"],
                  ["C4", "Inflasi berlaku pada kadar yang rendah (peningkatan perlahan)"],
                  ["C5", "Kos sara hidup meningkat"],
                  ["C6", "Nilai atau kuasa beli wang menurun"]
                ]
              }
            ],
            nota: "Fail skema asal tidak mengandungi skema bagi soalan ini (skema Soalan 5 di dalamnya adalah untuk soalan lain), jadi isi di atas ialah cadangan berdasarkan buku teks T5 Bab 1."
          },
          {
            kod: "(b)",
            s: "Situasi ekonomi tersebut memberi kesan kepada pengguna. Jelaskan.",
            m: 7,
            bab: "t5-b1",
            topik: "Kesan inflasi",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Kuasa beli wang menurun"],
                  ["C2", "Pendapatan benar menurun walaupun pendapatan wang tidak berubah"],
                  ["C3", "Kuantiti barang dan perkhidmatan yang dapat dibeli berkurang"],
                  ["C4", "Kos sara hidup meningkat"],
                  ["C5", "Taraf hidup menurun, terutama golongan berpendapatan tetap dan rendah"],
                  ["C6", "Tabungan berkurang kerana lebih banyak pendapatan dibelanjakan untuk keperluan"],
                  ["C7", "Pengguna beralih kepada barang pengganti yang lebih murah"],
                  ["C8", "Pemiutang dan penyimpan rugi kerana nilai wang merosot"],
                  ["C9", "Penghutang untung kerana nilai benar hutang berkurang"]
                ]
              }
            ],
            nota: "Isi cadangan (lihat nota di (a))."
          },
          {
            kod: "(c)",
            s: "Bagaimanakah kerajaan dapat mengawal situasi tersebut?",
            m: 9,
            bab: "t5-b1",
            topik: "Mengawal inflasi",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Dasar fiskal menguncup: mengurangkan perbelanjaan kerajaan"],
                  ["C2", "Menaikkan kadar cukai / mengurangkan pelepasan cukai, maka pendapatan boleh guna berkurang"],
                  ["C3", "Dasar kewangan menguncup: bank pusat menaikkan OPR / kadar faedah"],
                  ["C4", "Menaikkan nisbah rizab berkanun"],
                  ["C5", "Menjual sekuriti kerajaan melalui operasi pasaran terbuka"],
                  ["C6", "Bekalan wang dan permintaan agregat berkurang, maka tingkat harga lebih stabil"],
                  ["C7", "Menetapkan harga maksimum bagi barang keperluan"],
                  ["C8", "Memberi subsidi kepada pengeluar untuk mengurangkan kos pengeluaran"],
                  ["C9", "Meningkatkan penawaran dan produktiviti, contohnya sektor pertanian"],
                  ["C10", "Kempen berbelanja secara berhemah"],
                  ["C11", "Rumusan yang disokong alasan"]
                ]
              }
            ],
            rubrik: rubrik("langkah kerajaan mengawal inflasi"),
            nota: "Isi dan rubrik cadangan (lihat nota di (a))."
          }
        ]
      },

      /* ---------------- SOALAN 6 ---------------- */
      {
        no: 6,
        seksyen: "B",
        tajuk: "Sumbangan Tunai Rahmah (STR)",
        konteks: p("Maklumat berikut berkaitan dengan satu program kerajaan.") + petikan("8.5 juta rakyat bakal terima STR Fasa 2 sebelum Aidilfitri", ["PETALING JAYA: Kerajaan akan mula menyalurkan pembayaran STR Fasa 2 bermula 24 Mac ini dengan peruntukan sebanyak RM1.7 bilion berbanding RM1.5 bilion pada tahun lalu.", "Peningkatan peruntukan STR dan Sumbangan Asas Rahmah (SARA) pada tahun ini sebanyak RM3 bilion atau 30 peratus kepada RM13 bilion adalah ikhtiar untuk meningkatkan martabat hidup rakyat secara saksama."], "Sumber: Diubah suai daripada Utusan Malaysia, 21 Mac 2025"),
        bahagian: [
          {
            kod: "(a)",
            s: "Huraikan jenis perbelanjaan kerajaan tersebut.",
            m: 5,
            bab: "t5-b1",
            topik: "Perbelanjaan mengurus",
            skema: [
              {
                isi: [
                  ["H1", "Perbelanjaan mengurus"],
                  ["H2", "Perbelanjaan berulang / perbelanjaan semasa kerajaan"],
                  ["H3", "Bantuan kerajaan untuk golongan berpendapatan rendah"],
                  ["H4", "Bertujuan meringankan beban golongan sasar / golongan B40"],
                  ["H5", "Tidak dipengaruhi oleh tingkat pendapatan negara"],
                  ["H6", "Contoh lain: pemberian wang kepada murid-murid / Bantuan Awal Persekolahan (BAP)"],
                  ["H7", "Membolehkan pengurusan dan pentadbiran harian kerajaan beroperasi dengan lancar"]
                ]
              }
            ],
            nota: "Maksimum 5 markah."
          },
          {
            kod: "(b)",
            s: "Jelaskan kesan tindakan tersebut terhadap permintaan barang.",
            m: 6,
            bab: "t4-b2",
            topik: "Perubahan permintaan",
            gambarSkema: gb("skema-6b", "Jawapan skema: keluk permintaan beralih ke kanan dari D0D0 ke D1D1 pada harga P; kuantiti diminta meningkat dari Q0 ke Q1", "Rajah jawapan dalam skema"),
            skema: [
              {
                label: "Rajah lengkap (maksimum 3 markah) dan huraian",
                isi: [
                  ["H1", "Paksi X dan paksi Y yang lengkap serta titik asalan"],
                  ["H2", "Keluk DD beralih ke kanan (D₀D₀ ke D₁D₁)"],
                  ["H3", "Arah anak panah"],
                  ["H4", "Kuantiti permintaan meningkat dari Q₀ ke Q₁"],
                  ["H5", "Permintaan terhadap barang meningkat"]
                ]
              },
              {
                label: CADANGAN,
                isi: [["C1", "STR menambah pendapatan boleh guna dan kuasa beli penerima, maka mereka membeli lebih banyak barang pada setiap tingkat harga"]]
              }
            ],
            nota: "Maksimum 6 markah."
          },
          {
            kod: "(c)",
            s: "Pada pandangan anda, sejauh manakah pemberian tersebut dapat membantu meningkatkan taraf hidup masyarakat?",
            m: 9,
            bab: "t5-b1",
            topik: "Bantuan kerajaan dan taraf hidup",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Menambah pendapatan boleh guna golongan B40, kuasa beli meningkat"],
                  ["C2", "Membantu membeli barang keperluan dan mengurangkan beban kos sara hidup"],
                  ["C3", "Peruntukan meningkat 30% kepada RM13 bilion, maka lebih ramai penerima dibantu"],
                  ["C4", "Perbelanjaan penggunaan meningkat, merancakkan perniagaan tempatan"],
                  ["C5", "Mengurangkan jurang pendapatan dan meningkatkan kesejahteraan secara saksama"],
                  ["C6", "Sisi lain: bantuan bersifat sementara dan tidak menambah pendapatan jangka panjang"],
                  ["C7", "Sisi lain: boleh menimbulkan budaya bergantung kepada bantuan"],
                  ["C8", "Sisi lain: perbelanjaan mengurus kerajaan meningkat, defisit belanjawan bertambah"],
                  ["C9", "Sisi lain: permintaan meningkat boleh menaikkan harga barang"],
                  ["C10", "Pendirian yang jelas dan rumusan yang disokong bukti"]
                ]
              }
            ],
            rubrik: [
              ["Tahap 1 (1–3 markah)", ["Pengetahuan terhad tentang teori atau konsep permintaan dan bantuan kerajaan (STR)", "Menyenaraikan kesan pemberian STR atau jawapan secara umum", "Huraian tentang kesan tidak dijelaskan dengan baik dan kurang difahami"]],
              ["Tahap 2 (4–6 markah)", ["Mengaplikasikan fakta dan konsep ekonomi dengan jelas berkaitan kesan pemberian STR", "Fakta yang sesuai, betul dan jelas", "Sebahagian besar huraian tentang kesan masih tepat", "Mengemukakan idea yang rasional dan masih sesuai atau relevan"]],
              ["Tahap 3 (7–9 markah)", ["Mengaplikasikan fakta dan konsep ekonomi tentang kesan pemberian STR dengan betul dan sesuai dengan situasi", "Huraian sangat jelas dan terperinci", "Mengemukakan idea yang bernas, kreatif dan rasional", "Membuat kesimpulan, rumusan, pandangan atau cadangan dan memberi bukti atau data relevan", "Mempunyai pendirian yang jelas", "Mengemukakan bukti atau contoh yang betul dan tepat"]]
            ]
          }
        ]
      },

      /* ---------------- SOALAN 7 ---------------- */
      {
        no: 7,
        seksyen: "B",
        tajuk: "Syarikat multinasional Mercedes-Benz Malaysia",
        konteks: p("Maklumat di bawah berkaitan dengan sebuah syarikat automobil yang beroperasi di Malaysia.") + petikan("Kilang Mercedes-Benz Malaysia satu-satunya di Asia Tenggara menghasilkan kenderaan pemanduan kiri dan kanan", ["Mercedes-Benz Malaysia (MBM) mencipta kejayaan baharu apabila menjadi satu-satunya kilang pemasangan pertama di Asia Tenggara yang menghasilkan kereta untuk pemanduan kiri dan kanan.", "Kejayaan ini menjadi satu pencapaian baharu buat MBM selepas syarikatnya bakal mengeksport kenderaan yang dipasang di kilang Pekan, Pahang bagi pasaran Filipina bermula bulan ini."], "Sumber: Diubah suai daripada Gempak.com, 22 Ogos 2019"),
        bahagian: [
          {
            kod: "(a)",
            s: "Mengapakah syarikat tersebut dianggap sebagai sebuah syarikat multinasional?",
            m: 5,
            bab: "t5-b2",
            topik: "Syarikat multinasional",
            skema: [
              {
                isi: [
                  ["H1", "Mempunyai francais / cawangan di seluruh dunia"],
                  ["H2", "Semua cawangan dikawal oleh firma induk di negara asal"],
                  ["H3", "Berlaku pemindahan teknologi antara cawangan di negara yang berbeza"],
                  ["H4", "Syarikat besar dan berpengaruh"],
                  ["H5", "Perniagaan dijalankan dalam pelbagai bahasa"],
                  ["H6", "Beroperasi secara serentak di beberapa buah negara"],
                  ["H7", "Mempunyai pasaran yang luas"],
                  ["H8", "Syarikat induk mengawal modal pelaburan setiap cawangan"],
                  ["H9", "Syarikat induk mengagihkan bahan mentah kepada setiap cawangan"],
                  ["H10", "Mempunyai pekerja dari pelbagai negara"],
                  ["H11", "Pengkhususan / ekonomi bidangan / pengeluaran dalam skala besar"],
                  ["H12", "Pengeluaran firma menjadi lebih cekap"]
                ]
              }
            ],
            nota: "Maksimum 5 markah. Terima mana-mana jawapan yang munasabah."
          },
          {
            kod: "(b)",
            s: "Infrastruktur pengangkutan yang baik di Malaysia merupakan antara faktor mendorong kemasukan syarikat tersebut. Jelaskan.",
            m: 6,
            bab: "t5-b2",
            topik: "Pelaburan langsung asing",
            skema: [
              {
                isi: [
                  ["H1", "Malaysia mempunyai sistem pengangkutan yang cekap"],
                  ["H2", "Merangkumi pengangkutan darat, udara dan air"],
                  ["H3", "Contoh: lebuh raya / jalan raya / lapangan terbang / pelabuhan"],
                  ["H4", "Menggunakan kapal laut untuk menghantar komponen kereta"],
                  ["H5", "Kerana komponen kereta ialah barang tahan lama / besar / berat"],
                  ["H6", "Menjimatkan kos pengangkutan"],
                  ["H7", "Pengangkutan laut mengurangkan kos berbanding pengangkutan udara"],
                  ["H8", "Pengeluar dapat menawarkan barang dengan harga yang lebih murah"],
                  ["H9", "Menjimatkan masa / menepati tarikh penghantaran yang dijanjikan"],
                  ["H10", "Memudahkan aktiviti pemindahan barang"],
                  ["H11", "Contoh: komponen tiba di pelabuhan dan dibawa ke kilang menggunakan lori"],
                  ["H12", "Pengangkutan udara (MAS) memudahkan pergerakan pekerja"]
                ]
              }
            ],
            nota: "Kertas soalan memberi 6 markah (skema asal menulis Mak. 7m). Terima mana-mana jawapan yang munasabah."
          },
          {
            kod: "(c)",
            s: "Kejayaan syarikat tersebut memberi impak positif kepada ekonomi negara. Kemukakan hujah anda.",
            m: 9,
            bab: "t5-b2",
            topik: "Impak syarikat multinasional",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Eksport kenderaan ke Filipina meningkatkan nilai eksport dan imbangan dagangan"],
                  ["C2", "Pemindahan teknologi dan kepakaran kepada pekerja tempatan"],
                  ["C3", "Mewujudkan peluang pekerjaan, pendapatan dan kuasa beli rakyat meningkat"],
                  ["C4", "Kerajaan memperoleh hasil cukai yang lebih tinggi"],
                  ["C5", "Industri sokongan dan vendor komponen tempatan berkembang"],
                  ["C6", "Imej Malaysia sebagai hab automotif serantau meningkat, menarik lebih banyak pelaburan asing"],
                  ["C7", "Pembangunan wilayah di sekitar Pekan, Pahang"],
                  ["C8", "Menyumbang kepada pertumbuhan KDNK"],
                  ["C9", "Rumusan yang disokong bukti"]
                ]
              }
            ],
            rubrik: [
              ["Tahap 1 (1–3 markah)", ["Pengetahuan yang terhad tentang kesan positif perdagangan antarabangsa terhadap ekonomi negara", "Penjelasan umum dan terhad", "Menyenaraikan fakta sahaja"]],
              ["Tahap 2 (4–6 markah)", ["Dapat menjelaskan atau mengaplikasikan kesan positif perdagangan antarabangsa terhadap ekonomi negara dengan situasi yang diberikan dengan betul", "Huraian atau keterangan yang relevan", "Fakta yang sesuai disokong dengan teori ekonomi", "Huraian idea terhad"]],
              ["Tahap 3 (7–9 markah)", ["Fakta dan huraian tepat dan lengkap tentang kesan positif perdagangan antarabangsa terhadap ekonomi negara", "Terdapat sokongan huraian lanjut atau contoh yang relevan", "Keterangan betul, tepat, sangat jelas dan matang", "Mengemukakan idea yang bernas, kreatif dan rasional", "Membuat kesimpulan, rumusan, pandangan, pendapat atau cadangan dan memberi bukti atau data relevan"]]
            ]
          }
        ]
      }
    ]
  });
})();
