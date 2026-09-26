/* =========================================================
   Peperiksaan Percubaan SPM 2024 (Perak) · Modul Gempur SPM 2024
   Ekonomi 3767. Soalan ditaip semula daripada kertas asal; rajah dan
   gambar dipotong terus daripada PDF. Jawapan dan isi markah mengikut
   peraturan pemarkahan (skema) dalam repo.
   ========================================================= */
(function () {
  "use strict";
  var E = window.EKO;

  /* ---------- gambar daripada kertas asal ---------- */
  var D = "assets/img/percubaan/prk24/";
  var G = {
    "k1-s3": { src: D + "k1-s3.webp", w: 772, h: 552 },
    "k1-s7": { src: D + "k1-s7.webp", w: 505, h: 470 },
    "k1-s8": { src: D + "k1-s8.webp", w: 625, h: 519 },
    "k1-s26": { src: D + "k1-s26.webp", w: 884, h: 553 },
    "k2-1d": { src: D + "k2-1d.webp", w: 516, h: 453 },
    "k2-2c": { src: D + "k2-2c.webp", w: 895, h: 492 },
    "skema-1ai": { src: D + "skema-1ai.webp", w: 974, h: 873 },
    "skema-4c": { src: D + "skema-4c.webp", w: 912, h: 573 }
  };
  function gb(k, alt, kapsyen) {
    return Object.assign({ alt: alt, kapsyen: kapsyen }, G[k]);
  }

  /* ---------- rangka HTML kecil ---------- */
  function p(teks) {
    return "<p>" + teks + "</p>";
  }
  function petik(html) {
    return '<div class="petik">' + html + "</div>";
  }
  function petikan(tajuk, isi, sumber) {
    return (
      (tajuk ? '<b class="tajuk-petikan">' + tajuk + "</b>" : "") +
      isi.map(p).join("") +
      (sumber ? '<p class="sumber" style="text-align:right">' + sumber + "</p>" : "")
    );
  }
  function roman(senarai) {
    return '<ol class="roman">' + senarai.map(function (x) {
      return "<li>" + x + "</li>";
    }).join("") + "</ol>";
  }
  // jadual(kapsyen, [tajuk lajur], [[sel, ...], ...], lajurNombor)
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
    id: "prk24-k1",
    label: "Percubaan SPM Perak 2024 (Modul Gempur SPM) · Kertas 1",
    labelPendek: "Percubaan Perak 2024 K1",
    soalan: [
      {
        bab: "t4-b1",
        s: "Pernyataan yang manakah paling tepat mengenai definisi ekonomi?",
        p: ["Sains praktikal tentang pengeluaran dan pengagihan", "Satu kajian tentang cara manusia memenuhi sumber yang terhad", "Satu kajian bagaimana manusia dapat memenuhi kehendak yang tidak terhad", "Sains kekayaan yang mengkaji keadaan dan sebab terdapatnya kekayaan negara"],
        j: 2,
        e: "Ekonomi ialah kajian tentang cara manusia menggunakan sumber yang terhad untuk memenuhi kehendak yang tidak terhad. B salah kerana yang dipenuhi ialah kehendak, bukan sumber. A dan D ialah takrif awal yang tidak lengkap."
      },
      {
        bab: "t4-b1",
        s: "Pernyataan manakah yang benar tentang sumber ekonomi?",
        p: ["Tanah merupakan sumber yang penawarannya tidak terhad", "Modal merupakan alat ciptaan manusia yang mempunyai mobiliti yang tinggi", "Buruh merupakan individu yang berperanan menghasilkan output maksimum", "Usahawan merupakan input yang menyumbangkan tenaga dalam proses pengeluaran"],
        j: 1,
        e: "Modal ialah barang buatan manusia yang digunakan untuk mengeluarkan barang lain, dan kebanyakannya mudah dipindahkan (mobiliti tinggi). A salah kerana penawaran tanah terhad. D menerangkan buruh; usahawan menggabungkan faktor pengeluaran dan menanggung risiko."
      },
      {
        bab: "t4-b1",
        s: p("Rajah 1 berkaitan dengan keluk kemungkinan pengeluaran (KKP).") ,
        gambar: gb("k1-s3", "Keluk kemungkinan pengeluaran Barang A lawan Barang B dengan titik M (0, 16), N (10, 14), O (20, 10), P (30, 8) dan Q (40, 0) pada keluk, titik R di dalam keluk dan titik S di luar keluk", "Rajah 1"),
        s2: p("Pernyataan manakah yang betul berkaitan dengan KKP di atas?") + roman(["Titik R menunjukkan kombinasi pengeluaran yang cekap", "Titik MNOPQ menunjukkan masalah pilihan di sepanjang KKP", "Titik P menunjukkan berlaku kos lepas terhadap Barang A sebanyak 8 unit", "Titik S menunjukkan ketidakupayaan ekonomi dalam mengeluarkan Barang A dan Barang B"]),
        p: ["I dan II", "I dan III", "II dan IV", "III dan IV"],
        j: 2,
        e: "II betul: semua titik pada KKP (M hingga Q) ialah kombinasi cekap, maka masalahnya ialah memilih antara kombinasi. IV betul: titik S di luar KKP tidak dapat dicapai dengan sumber dan teknologi sedia ada. I salah kerana R di dalam KKP menunjukkan pengeluaran tidak cekap. III tidak diterima oleh skema: kos lepas diukur apabila ekonomi berubah daripada satu kombinasi kepada kombinasi lain (contohnya dari O ke P, 2 unit Barang A dikorbankan)."
      },
      {
        bab: "t4-b1",
        s: "Apakah ciri sistem ekonomi perancangan pusat?",
        p: ["Motif pengeluaran adalah memaksimumkan keuntungan", "Harga ditentukan melalui kuasa pasaran", "Persaingan wujud antara firma", "Pilihan pengguna terbatas"],
        j: 3,
        e: "Dalam sistem perancangan pusat, kerajaan menentukan apa, bagaimana dan untuk siapa barang dikeluarkan, maka pilihan pengguna terbatas. A, B dan C ialah ciri sistem ekonomi kapitalis."
      },
      {
        bab: "t4-b1",
        s: "Pernyataan manakah yang betul tentang ekonomi Islam?",
        p: ["Individu bebas memiliki sumber kekayaan", "Pengeluar mengeluarkan barang untuk memperoleh keuntungan", "Wujud persaingan yang adil dalam kalangan pengeluar dalam ekonomi", "Individu dan pengeluar tidak mempunyai kebebasan untuk memiliki faktor pengeluaran"],
        j: 2,
        e: "Ekonomi Islam menggalakkan persaingan yang adil dan sihat. A dan B tidak tepat kerana pemilikan dan keuntungan dibatasi syariat (harta milik mutlak Allah; matlamatnya kebahagiaan dunia dan akhirat). D salah kerana individu boleh memiliki faktor pengeluaran mengikut syariat."
      },
      {
        bab: "t4-b2",
        s: "Pernyataan manakah betul tentang keluk permintaan?",
        p: ["Hubungan antara harga dan kuantiti ialah positif", "Keluk permintaan mencerun ke atas dari kiri ke kanan", "Penurunan harga menyebabkan kuantiti diminta berkurang", "Peningkatan harga menyebabkan kuantiti diminta menurun"],
        j: 3,
        e: "Hukum permintaan: harga naik, kuantiti diminta turun (hubungan negatif), maka keluk permintaan mencerun ke bawah dari kiri ke kanan. A, B dan C menggambarkan hubungan positif."
      },
      {
        bab: "t4-b2",
        s: p("Rajah 2 menunjukkan keluk permintaan bagi kereta tempatan."),
        gambar: gb("k1-s7", "Keluk permintaan kereta tempatan beralih ke kiri dari D0D0 ke D1D1 pada harga P, kuantiti berkurang dari Q0 ke Q1", "Rajah 2"),
        s2: p("Apakah yang menyebabkan peralihan keluk dari D₀D₀ ke D₁D₁?"),
        p: ["Harga kereta import menurun", "Kadar cukai pendapatan menurun", "Harga kereta tempatan meningkat", "Jangkaan harga akan meningkat pada masa hadapan"],
        j: 0,
        e: "Keluk beralih ke kiri: permintaan kereta tempatan berkurang pada harga yang sama. Kereta import ialah barang pengganti; apabila harganya turun, pengguna beralih kepadanya. B dan D menambah permintaan (keluk ke kanan). C menyebabkan pergerakan di sepanjang keluk, bukan peralihan."
      },
      {
        bab: "t4-b2",
        s: p("Rajah 3 berkaitan dengan keseimbangan pasaran sarung tangan getah."),
        gambar: gb("k1-s8", "Keluk penawaran beralih ke kanan dari S0 ke S1; keseimbangan berubah dari E0 ke E1, harga turun dari P0 ke P1 dan kuantiti naik dari Q0 ke Q1", "Rajah 3"),
        s2: p("Situasi yang manakah menyebabkan perubahan di atas?"),
        p: ["Upah buruh meningkat", "Harga getah sintetik naik", "Inovasi dalam pengeluaran", "Objektif pengeluaran adalah untuk memaksimumkan keuntungan"],
        j: 2,
        e: "Penawaran bertambah (S₀ ke S₁), jadi harga keseimbangan turun dan kuantiti keseimbangan naik. Inovasi meningkatkan kecekapan dan mengurangkan kos, lalu penawaran bertambah. A dan B menaikkan kos pengeluaran (penawaran berkurang); D bukan penyebab peralihan keluk."
      },
      {
        bab: "t4-b2",
        s: p("Jadual 1 menunjukkan nilai pekali keanjalan harga permintaan bagi gelang emas dan beras.") + jadual("Jadual 1", ["Gelang emas", "Beras"], [["2.2", "0.7"]], [0, 1]) + p("Pernyataan yang manakah betul tentang jadual tersebut?"),
        p: ["Nilai pekali keanjalan gelang emas ialah tak anjal", "Jumlah hasil meningkat jika harga beras dinaikkan", "Pengguna sangat responsif terhadap perubahan harga beras", "Peratus perubahan kuantiti gelang emas lebih kecil berbanding peratus perubahan harga"],
        j: 1,
        e: "Permintaan beras tidak anjal (0.7 < 1): apabila harga naik, peratus penurunan kuantiti diminta lebih kecil daripada peratus kenaikan harga, maka jumlah hasil meningkat. A dan D salah kerana gelang emas anjal (2.2 > 1). C salah kerana pengguna kurang responsif terhadap harga beras."
      },
      {
        bab: "t4-b2",
        s: "Apakah yang berlaku jika harga turun sebanyak 25% bagi permintaan barang yang tidak anjal?",
        p: ["Kuantiti diminta turun lebih daripada 25%", "Kuantiti diminta turun kurang daripada 25%", "Kuantiti diminta meningkat lebih daripada 25%", "Kuantiti diminta meningkat kurang daripada 25%"],
        j: 3,
        e: "Harga turun, maka kuantiti diminta meningkat (hukum permintaan). Bagi permintaan tidak anjal, peratus perubahan kuantiti lebih kecil daripada peratus perubahan harga, iaitu meningkat kurang daripada 25%."
      },
      {
        bab: "t4-b2",
        s: "Penawaran roti bertambah daripada 160 unit kepada 260 unit apabila harga roti meningkat daripada RM1.50 kepada RM2.00. Berapakah nilai keanjalan harga penawaran roti tersebut?",
        p: ["0.33", "0.62", "1.54", "1.88"],
        j: 3,
        e: "Es = %ΔQ ÷ %ΔP. %ΔQ = (260 − 160) ÷ 160 × 100 = 62.5%. %ΔP = (2.00 − 1.50) ÷ 1.50 × 100 = 33.33%. Es = 62.5 ÷ 33.33 = 1.88."
      },
      {
        bab: "t4-b2",
        s: p("Jadual 2 menunjukkan hubungan antara harga dengan kuantiti yang ditawarkan.") + jadual("Jadual 2", ["Harga (RM)", "Kuantiti penawaran (unit)"], [["2", "8"], ["4", "Q"]], [0, 1]) + p("Jika harga meningkat dari RM2 ke RM4, berapakah nilai Q jika keanjalan harga penawaran barang tersebut ialah 0.5?"),
        p: ["10 unit", "12 unit", "16 unit", "24 unit"],
        j: 1,
        e: "%ΔP = (4 − 2) ÷ 2 × 100 = 100%. Es = %ΔQ ÷ %ΔP, maka %ΔQ = 0.5 × 100% = 50%. Q = 8 + (50% × 8) = 12 unit."
      },
      {
        bab: "t4-b3",
        s: p("Antara yang berikut, kaedah manakah yang dilakukan oleh bank pusat untuk menstabilkan nilai mata wang?") + roman(["Mewujudkan sandaran minimum dengan memperuntukkan 80.59% dalam bentuk emas", "Menjual Ringgit Malaysia dan membeli Dolar Amerika ketika nilai Ringgit Malaysia rendah", "Membuat pelaburan di dalam dan luar negara bagi meningkatkan pendapatan kepada negara", "Menggunakan alat dasar kewangan bagi memastikan kadar inflasi berada pada paras terkawal"]),
        p: ["I dan II", "I dan IV", "II dan III", "III dan IV"],
        j: 1,
        e: "Bank pusat menyokong nilai mata wang dengan rizab sandaran seperti emas (I) dan menggunakan dasar kewangan untuk mengawal inflasi supaya kuasa beli ringgit terpelihara (IV). II salah: ketika nilai ringgit rendah, bank pusat membeli ringgit (bukan menjualnya). III ialah aktiviti pelaburan, bukan kaedah menstabilkan nilai mata wang."
      },
      {
        bab: "t4-b3",
        s: "Encik Amin membeli sebuah kereta Proton Persona dengan bayaran ansuran sebanyak RM600 sebulan. Apakah perkhidmatan bank perdagangan yang memudahkan Encik Amin untuk membuat pembayaran ansuran kereta tersebut?",
        p: ["Draf bank", "Debit langsung", "Pindahan kredit", "Perintah sedia ada"],
        j: 3,
        e: "Perintah sedia ada (arahan tetap) ialah arahan pelanggan supaya bank memindahkan jumlah tetap secara berkala daripada akaunnya, sesuai untuk ansuran bulanan yang sama. Draf bank dan pindahan kredit digunakan untuk bayaran sekali."
      },
      {
        bab: "t4-b3",
        s: "Manakah yang menunjukkan pekerjaan dalam sektor ketiga?",
        p: ["Menangkap ikan", "Operator kilang kicap", "Mengajar di pusat tuisyen", "Memproses ikan menjadi keropok segera"],
        j: 2,
        e: "Sektor ketiga (tertiari) ialah sektor perkhidmatan, contohnya mengajar. A ialah sektor pertama (primer); B dan D ialah sektor kedua (pembuatan)."
      },
      {
        bab: "t4-b3",
        s: p("Maklumat berikut berkaitan dengan jenis pendapatan individu.") + petik("Pendapatan individu = Upah + Sewa + Faedah + Dividen + <b>X</b> + Bayaran pindahan") + p("Situasi manakah yang menerangkan X?"),
        p: ["Encik Adli mendapat RM1 500 setahun bagi akaun Amanah Saham Bumiputera", "Cik Nor memenangi baucar buku daripada Kedai Buku Rahim bernilai RM100", "Encik Lee menerima RM3 000 atas penggunaan rumah kedai miliknya", "Puan Jannah memperoleh RM380 sebulan atas jualan kerepek ubinya"],
        j: 3,
        e: "X ialah untung, iaitu ganjaran kepada usahawan. Puan Jannah menjalankan perniagaan kerepek, maka pendapatannya ialah untung. A ialah dividen; C ialah sewa; B ialah hadiah, bukan ganjaran faktor pengeluaran."
      },
      {
        bab: "t4-b3",
        s: "Apakah kelemahan menggunakan tunai dalam sesuatu urus niaga?",
        p: ["Diterima secara meluas dalam urus niaga", "Tidak sesuai membeli barang yang mahal seperti kereta", "Memperoleh diskaun tunai mengikut syarat yang ditentukan", "Menikmati harga yang murah kerana tidak melibatkan faedah"],
        j: 1,
        e: "Pembelian tunai memerlukan jumlah wang yang besar sekali gus, maka kurang sesuai untuk barang mahal seperti kereta. A, C dan D ialah kelebihan pembayaran tunai."
      },
      {
        bab: "t4-b3",
        s: "Pernyataan manakah yang betul tentang belanjawan peribadi?",
        p: ["Dapat mengawal kejatuhan harga barang", "Membantu individu berbelanja secara berhemah", "Menggalakkan individu untuk berbelanja sesuka hati", "Membolehkan individu membeli barang kehendak dengan mudah"],
        j: 1,
        e: "Belanjawan peribadi ialah rancangan pendapatan dan perbelanjaan yang membantu individu mengawal perbelanjaan dan berbelanja secara berhemah mengikut kemampuan."
      },
      {
        bab: "t4-b4",
        s: p("Antara yang berikut, manakah yang benar tentang firma?") + roman(["Berbeza dari segi saiz dan modal", "Terdapat firma swasta dan firma awam", "Firma membekalkan faktor pengeluaran", "Firma awam mementingkan keuntungan yang maksimum"]),
        p: ["I dan II", "II dan III", "II dan IV", "I dan IV"],
        j: 0,
        e: "Firma berbeza dari segi saiz dan modal (I) dan terdiri daripada firma swasta dan firma awam (II). III salah kerana isi rumah yang membekalkan faktor pengeluaran; firma menggunakannya. IV salah kerana firma awam mengutamakan kebajikan masyarakat."
      },
      {
        bab: "t4-b4",
        s: "Puan Suri memerlukan tepung, mesin penguli dan pekerja untuk membuat roti. Apakah input berubah yang terlibat dalam proses tersebut?",
        p: ["Tepung, mesin penguli dan pekerja", "Tepung dan mesin penguli", "Tepung dan pekerja", "Mesin penguli"],
        j: 2,
        e: "Input berubah ialah input yang kuantitinya berubah mengikut tingkat output, iaitu tepung (bahan mentah) dan pekerja. Mesin penguli ialah input tetap dalam jangka pendek."
      },
      {
        bab: "t4-b4",
        s: p("Jadual 3 menunjukkan hubungan antara jumlah output dengan kos.") + jadual("Jadual 3", ["Jumlah output (unit)", "Kos tetap (RM)", "Kos berubah (RM)"], [["1", "200", "30"], ["2", "200", "60"], ["3", "200", "90"]], [0, 1, 2]) + p("Berapakah kos purata pada output ke-2?"),
        p: ["RM130", "RM200", "RM260", "RM290"],
        j: 0,
        e: "Kos purata = jumlah kos ÷ output. Pada output ke-2, jumlah kos = RM200 + RM60 = RM260, maka kos purata = RM260 ÷ 2 = RM130."
      },
      {
        bab: "t4-b4",
        s: p("Jadual 4 menunjukkan output dan kos purata sebuah firma.") + jadual("Jadual 4", ["Output (unit)", "Kos purata (RM)"], [["100", "50"], ["300", "30"]], [0, 1]) + p("Jika kos tetap ialah RM1 000, berapakah kos berubah pada output ke-300?"),
        p: ["RM5 000", "RM8 000", "RM9 000", "RM10 000"],
        j: 1,
        e: "Jumlah kos pada 300 unit = kos purata × output = RM30 × 300 = RM9 000. Kos berubah = jumlah kos − kos tetap = RM9 000 − RM1 000 = RM8 000."
      },
      {
        bab: "t4-b4",
        s: "Pernyataan yang manakah betul tentang untung?",
        p: ["Sejenis pendapatan tidak produktif", "Wujud apabila jumlah kos pengeluaran lebih kecil daripada penerimaan hasil", "Merupakan jumlah nilai yang diterima oleh firma hasil daripada jualan produk", "Ganjaran kepada faktor yang menyumbangkan tenaga fizikal dan mental dalam proses pengeluaran"],
        j: 1,
        e: "Untung = jumlah hasil − jumlah kos, maka untung wujud apabila jumlah kos lebih kecil daripada jumlah hasil. C ialah takrif jumlah hasil; D ialah upah (ganjaran buruh); untung ialah pendapatan produktif usahawan."
      },
      {
        bab: "t4-b4",
        s: "Bagaimanakah struktur organisasi dapat meningkatkan produktiviti?",
        p: ["Prosedur kerja yang ringkas dan mudah", "Setiap unit menjalankan tugas masing-masing", "Majikan yang sentiasa memotivasikan pekerjanya", "Tenaga manusia ditempatkan di posisi kerja yang sesuai dengan kemahirannya"],
        j: 1,
        e: "Struktur organisasi yang jelas membahagikan tugas mengikut unit supaya setiap unit menjalankan tugas masing-masing tanpa pertindihan, maka kerja lebih cekap. Skema memberi B; D lebih berkaitan pengurusan sumber manusia."
      },
      {
        bab: "t4-b4",
        s: "Pernyataan yang manakah menunjukkan kos sosial?",
        p: ["Kos yang terpaksa dilepaskan akibat masalah kekurangan", "Contoh kos sosial ialah peningkatan tahap pendidikan masyarakat", "Kos yang sepatutnya dibayar tetapi tidak diambil kira dalam kos pengeluaran", "Kos kepada pihak ketiga yang tidak dimasukkan dalam penentuan harga pasaran"],
        j: 3,
        e: "Kos sosial (eksternaliti negatif) ditanggung oleh pihak ketiga dan tidak diambil kira dalam harga pasaran. A ialah kos lepas; B ialah faedah sosial."
      },
      {
        bab: "t5-b1",
        s: p("Rajah 4 berkaitan dengan jenis inflasi."),
        gambar: gb("k1-s26", "Rajah jenis inflasi: Inflasi diimport, X dan Inflasi tarikan permintaan", "Rajah 4"),
        s2: p("Pernyataan yang manakah menyebabkan inflasi <b>X</b> berlaku?"),
        p: ["Wujud lebihan permintaan barang", "Pendapatan individu semakin meningkat", "Kadar inflasi negara pengeksport meningkat", "Upah buruh dan kos bahan mentah bertambah"],
        j: 3,
        e: "Jenis inflasi ialah inflasi tarikan permintaan, inflasi tolakan kos dan inflasi diimport, maka X ialah inflasi tolakan kos, iaitu kenaikan kos pengeluaran seperti upah dan bahan mentah. A dan B menyebabkan inflasi tarikan permintaan; C menyebabkan inflasi diimport."
      },
      {
        bab: "t5-b1",
        s: "Pasangan yang manakah betul?",
        p: ["Dasar kewangan mengembang: bertujuan untuk mengurangkan permintaan agregat", "Dasar kewangan mengembang: bertindak dengan menurunkan kadar cukai pendapatan", "Dasar kewangan menguncup: berupaya untuk mengurangkan jumlah penciptaan kredit", "Dasar kewangan menguncup: berlaku apabila kerajaan menambah perbelanjaan pembangunan"],
        j: 2,
        e: "Dasar kewangan menguncup (contohnya menaikkan kadar faedah atau nisbah rizab berkanun) mengurangkan penciptaan kredit dan bekalan wang. A salah kerana dasar mengembang menambah permintaan agregat. B dan D ialah alat dasar fiskal (cukai dan perbelanjaan kerajaan)."
      },
      {
        bab: "t5-b1",
        s: p("Maklumat berikut berkaitan dengan satu alat dasar kewangan.") + jadual("", ["Tahun", "Kadar Dasar Semalaman (OPR)"], [["2020", "2.5%"], ["2022", "3.0%"]], [1]) + p("Apakah kesan tindakan tersebut kepada firma?"),
        p: ["Daya saing meningkat", "Produktiviti bertambah", "Pelaburan agregat meningkat", "Aktiviti penyelidikan dan pembangunan produk berkurang"],
        j: 3,
        e: "OPR naik menyebabkan kadar faedah pinjaman meningkat. Kos meminjam firma bertambah, maka pelaburan termasuk aktiviti penyelidikan dan pembangunan berkurang. A, B dan C ialah kesan penurunan kadar faedah."
      },
      {
        bab: "t5-b2",
        s: p("Antara berikut, yang manakah keburukan pelaburan langsung asing?") + roman(["Meningkatkan keupayaan pengeluaran barang", "Mendorong aliran masuk modal ke dalam negara", "Penerokaan dan pengeluaran sumber alam yang tidak terkawal", "Syarikat-syarikat gergasi akan menguasai sektor-sektor yang menguntungkan"]),
        p: ["I dan II", "I dan IV", "II dan III", "III dan IV"],
        j: 3,
        e: "Keburukan pelaburan langsung asing ialah eksploitasi sumber alam yang tidak terkawal (III) dan penguasaan syarikat gergasi asing dalam sektor yang menguntungkan (IV). I dan II ialah kebaikannya."
      },
      {
        bab: "t5-b2",
        s: "Pasangan yang manakah betul?",
        p: ["Subsidi: menjamin keselamatan dan kesihatan rakyat", "Tarif: menghalang kemasukan barang import dari negara tertentu", "Kuota: mengehadkan jumlah maksimum yang boleh diimport dari sesebuah negara", "Embargo: menyebabkan harga barang import relatif lebih mahal berbanding barang tempatan"],
        j: 2,
        e: "Kuota ialah had maksimum kuantiti barang yang boleh diimport. B menerangkan embargo, D menerangkan kesan tarif, manakala subsidi membantu pengeluar tempatan mengurangkan kos."
      },
      {
        bab: "t5-b2",
        s: "Situasi yang manakah cenderung memberi kesan imbangan dagangan negatif?",
        p: ["Peningkatan penggunaan barang dari luar negara", "Aliran masuk pelaburan asing yang tinggi di sektor perkilangan", "Kiriman wang oleh pekerja asing ke luar negara semakin meningkat", "Kemasukan pelancong asing bertambah selepas kempen Tahun Melawat Malaysia"],
        j: 0,
        e: "Imbangan dagangan = eksport barangan − import barangan. Penggunaan barang import yang meningkat menambah import, maka imbangan dagangan cenderung negatif. B melibatkan akaun kewangan, C akaun pendapatan sekunder dan D akaun perkhidmatan."
      },
      {
        bab: "t5-b2",
        s: "Pilih pasangan yang betul berkaitan dengan permintaan dan penawaran Ringgit Malaysia.",
        p: ["Proton memasarkan kereta SUV X70 ke Singapura: penawaran RM", "Encik Syafiq menghantar anaknya belajar ke New Zealand: penawaran RM", "BERNAS Berhad mendapatkan bekalan beras wangi dari Vietnam: permintaan RM", "Malaysia Care menyediakan sumbangan RM200 000 kepada mangsa banjir di Pakistan: permintaan RM"],
        j: 1,
        e: "Yuran pengajian di New Zealand dibayar dalam dolar New Zealand, maka ringgit ditukar dan ditawarkan. A mewujudkan permintaan RM (eksport). C dan D ialah bayaran ke luar negara, jadi mewujudkan penawaran RM."
      },
      {
        bab: "t4-b1",
        s: pernyataan("Ekonomi ialah mengurus semua sumber ekonomi yang ada bagi memenuhi kehendak yang tidak terbatas.", "Kehendak manusia tetap dan tidak berubah dari semasa ke semasa."),
        p: BS,
        j: 0,
        e: "I betul. II salah kerana kehendak manusia sentiasa bertambah dan berubah mengikut masa."
      },
      {
        bab: "t4-b2",
        s: pernyataan("Hukum permintaan menyatakan apabila harga menurun maka kuantiti diminta menurun.", "Hukum permintaan digambarkan melalui hubungan positif antara harga dan kuantiti diminta."),
        p: BS,
        j: 3,
        e: "Kedua-duanya salah. Apabila harga turun, kuantiti diminta meningkat; hubungan antara harga dengan kuantiti diminta adalah negatif (songsang)."
      },
      {
        bab: "t4-b2",
        s: pernyataan("Hubungan positif ditunjukkan oleh keluk penawaran yang mencerun ke bawah dari kiri ke kanan.", "Jika harga kereta meningkat, penawaran terhadap kereta akan berkurang."),
        p: BS,
        j: 3,
        e: "Kedua-duanya salah. Keluk penawaran mencerun ke atas dari kiri ke kanan, dan harga yang lebih tinggi menyebabkan kuantiti ditawarkan meningkat (hukum penawaran)."
      },
      {
        bab: "t4-b3",
        s: pernyataan("Contoh potongan wajib ialah caruman KWSP.", "Peningkatan kadar caruman KWSP pekerja menyebabkan pendapatan boleh guna berkurang."),
        p: BS,
        j: 2,
        e: "Kedua-duanya betul. Caruman KWSP ialah potongan wajib, maka kadar caruman yang lebih tinggi mengurangkan pendapatan boleh guna."
      },
      {
        bab: "t4-b4",
        s: pernyataan("Proses pengeluaran memerlukan gabungan input untuk menghasilkan barang dan perkhidmatan.", "Input berubah wujud dalam jangka masa pendek dan panjang."),
        p: BS,
        j: 2,
        e: "Kedua-duanya betul. Dalam jangka panjang semua input menjadi input berubah."
      },
      {
        bab: "t4-b4",
        s: pernyataan("Faedah sosial adalah faedah kepada pihak ketiga selain pengguna dan pengeluar.", "Pembinaan projek tebatan banjir yang mengurangkan risiko kerosakan harta benda merupakan contoh faedah sosial."),
        p: BS,
        j: 2,
        e: "Kedua-duanya betul mengikut skema. Projek tebatan banjir memberi manfaat kepada masyarakat sekitar (pihak ketiga)."
      },
      {
        bab: "t5-b1",
        s: pernyataan("Dasar fiskal dilaksanakan melalui perubahan kadar faedah dan pelaksanaan cukai.", "Dasar fiskal mempengaruhi permintaan dalam kalangan rakyat."),
        p: BS,
        j: 1,
        e: "I salah: kadar faedah ialah alat dasar kewangan; dasar fiskal menggunakan cukai dan perbelanjaan kerajaan. II betul: dasar fiskal mempengaruhi permintaan agregat."
      },
      {
        bab: "t5-b2",
        s: pernyataan("Pertukaran asing merujuk kepada mata wang negara lain yang dimiliki oleh sesebuah negara.", "Apabila nilai eksport Malaysia meningkat, maka nilai mata wang negara akan meningkat."),
        p: BS,
        j: 2,
        e: "Kedua-duanya betul. Eksport yang meningkat menambah permintaan terhadap ringgit, maka nilai ringgit meningkat."
      }
    ]
  });

  /* =========================================================
     KERTAS 2 (3767/2)
     ========================================================= */
  var RUBRIK_UMUM = function (topik) {
    return [
      ["Tahap 1 (1–3 markah)", ["Pengetahuan terhad tentang fakta dan konsep " + topik, "Menyenaraikan fakta atau isi tanpa huraian", "Huraian tidak dijelaskan dengan baik dan kurang difahami"]],
      ["Tahap 2 (4–6 markah)", ["Berupaya mengaplikasikan fakta dan konsep " + topik + " dengan betul", "Menghuraikan fakta yang sesuai dan betul", "Sebahagian besar huraian masih tepat tetapi kurang mendalam", "Jawapan satu sisi"]],
      ["Tahap 3 (7–9 markah)", ["Berupaya menganalisis fakta dan konsep " + topik + " dengan betul, tepat dan jelas", "Menghuraikan fakta dengan tepat, betul dan jelas", "Menilai kesan dengan tepat dan matang", "Jawapan dua sisi", "Menghubungkaitkan jawapan dengan pelbagai tajuk", "Membuat pertimbangan secara rasional", "Membuat kesimpulan, rumusan, pandangan atau cadangan dan memberi bukti yang relevan"]]
    ];
  };

  E.daftarK2({
    id: "prk24",
    k1: "prk24-k1",
    nama: "Perak 2024",
    label: "Percubaan SPM Perak 2024 (Modul Gempur SPM)",
    sumber: "Modul Gempur SPM 2024 · Peperiksaan Percubaan SPM 2024 (Perak)",
    bahagianA: "Bahagian A (3 soalan wajib, 60 markah)",
    bahagianB: "Bahagian B (pilih 2 daripada 4, 40 markah)",
    soalan: [
      /* ---------------- SOALAN 1 ---------------- */
      {
        no: 1,
        seksyen: "A",
        tajuk: "KKP, sistem ekonomi, keseimbangan dan keanjalan",
        bahagian: [
          {
            kod: "(a)(i)",
            konteks: p("Jadual 1 menunjukkan kombinasi pengeluaran bagi dua jenis barang dalam ekonomi.") + jadual("Jadual 1", ["Kombinasi penge&shy;luaran", "Pakaian (ribu helai)", "Makanan (tan metrik)"], [["A", "0", "25"], ["B", "5", "24"], ["C", "10", "22"], ["D", "15", "19"], ["E", "20", "0"]], [1, 2]),
            s: "Dengan menggunakan kertas graf, lukiskan keluk kemungkinan pengeluaran.",
            m: 3,
            bab: "t4-b1",
            topik: "Keluk kemungkinan pengeluaran",
            gambarSkema: gb("skema-1ai", "Jawapan skema: KKP melalui titik A (0, 25), B (5, 24), C (10, 22), D (15, 19) dan E (20, 0), dengan paksi pakaian (ribu helai) dan makanan (tan metrik)", "Rajah jawapan dalam skema"),
            skema: [
              {
                isi: [
                  ["H1", "Paksi pakaian (ribu helai) dengan skala betul"],
                  ["H2", "Paksi makanan (tan metrik) dengan skala betul"],
                  ["H3", "Koordinat KKP yang betul"],
                  ["H4", "Plot kombinasi pengeluaran A, B, C, D dan E"],
                  ["H5", "Bentuk KKP cembung (melengkung ke luar)"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(a)(ii)",
            s: "Jelaskan implikasi jika pengeluar memilih kombinasi pengeluaran 7 ribu helai pakaian dan 15 tan metrik makanan.",
            m: 3,
            bab: "t4-b1",
            topik: "Keluk kemungkinan pengeluaran",
            skema: [
              {
                isi: [
                  ["H1", "Kombinasi pengeluaran berada di dalam KKP (plot pada keluk 1(a)(i))"],
                  ["H2", "Kombinasi pengeluaran tidak cekap / berlaku ketidakcekapan pengeluaran"],
                  ["H3", "Firma tidak menggunakan faktor pengeluaran sepenuhnya"],
                  ["H4", "Masih berlaku masalah pengangguran / pembaziran sumber"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(b)(i)",
            konteks: p("Maklumat berikut berkaitan dengan sistem ekonomi.") + petik("Kerajaan akan campur tangan jika berlaku ketidakstabilan dan penyelewengan dalam aktiviti ekonomi.") + p("Bagaimanakah sistem ekonomi tersebut menyelesaikan masalah asas ekonomi berikut?"),
            s: "Apa yang hendak dikeluarkan?",
            m: 3,
            bab: "t4-b1",
            topik: "Sistem ekonomi campuran",
            skema: [
              {
                isi: [
                  ["H1", "Pihak swasta mengeluarkan barang ekonomi"],
                  ["H2", "Melalui kuasa pasaran / mekanisme harga"],
                  ["H3", "Pihak kerajaan mengeluarkan barang awam / sosial"],
                  ["H4", "Diselesaikan melalui kuasa pasaran dan kuasa kerajaan"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(b)(ii)",
            s: "Untuk siapa hendak dikeluarkan?",
            m: 2,
            bab: "t4-b1",
            topik: "Sistem ekonomi campuran",
            skema: [
              {
                isi: [
                  ["H1", "Barang ekonomi diagihkan melalui corak agihan pendapatan wang"],
                  ["H2", "Golongan berpendapatan tinggi mempunyai kuasa beli yang tinggi"],
                  ["H3", "Kerajaan campur tangan dalam agihan barang melalui cukai / subsidi"],
                  ["H4", "Golongan berpendapatan rendah memperoleh barang keperluan yang mencukupi"],
                  ["H5", "Barang awam dikeluarkan untuk semua rakyat"]
                ]
              }
            ],
            nota: "Maksimum 2 markah."
          },
          {
            kod: "(c)",
            konteks: p("Jadual 2 menunjukkan permintaan dan penawaran bagi barang X.") + jadual("Jadual 2", ["Harga (RM)", "Kuantiti diminta (unit)", "Kuantiti ditawar (unit)"], [["5.20", "175", "130"], ["5.50", "150", "150"], ["5.70", "125", "170"]], [0, 1, 2]),
            s: "Jelaskan keadaan pasaran pada harga RM5.20.",
            m: 3,
            bab: "t4-b2",
            topik: "Keseimbangan pasaran",
            skema: [
              {
                isi: [
                  ["H1", "Berlaku lebihan permintaan"],
                  ["H2", "Sebanyak 45 unit"],
                  ["H3", "Kuantiti diminta 175 unit dan kuantiti ditawarkan 130 unit"],
                  ["H4", "Harga cenderung naik"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(d)(i)",
            konteks: p("Rajah 1 menunjukkan hubungan antara tingkat harga dengan kuantiti diminta suatu barang."),
            gambar: gb("k2-1d", "Keluk permintaan DD; harga naik dari RM6 ke RM9 dan kuantiti diminta turun dari 12 unit ke 10 unit", "Rajah 1"),
            s: "Hitung nilai keanjalan harga permintaan barang tersebut.",
            m: 2,
            bab: "t4-b2",
            topik: "Keanjalan harga permintaan",
            skema: [
              {
                isi: [
                  ["K1", "Ed = %ΔQ ÷ %ΔP"],
                  ["K2", "%ΔQ = (10 − 12) ÷ 12 × 100 = −16.67%; %ΔP = (9 − 6) ÷ 6 × 100 = 50%, maka Ed = 16.67% ÷ 50%"],
                  ["K3", "Ed = 0.33"]
                ]
              }
            ],
            nota: "Maksimum 2 markah."
          },
          {
            kod: "(d)(ii)",
            s: "Jelaskan hubungan jumlah hasil dengan permintaan barang apabila harga meningkat dari RM6 ke RM9.",
            m: 4,
            bab: "t4-b2",
            topik: "Keanjalan dan jumlah hasil",
            skema: [
              {
                isi: [
                  ["H1", "Jumlah hasil meningkat"],
                  ["H2", "Permintaan tidak anjal"],
                  ["H3", "Jumlah hasil asal = RM6 × 12 unit = RM72"],
                  ["H4", "Jumlah hasil baharu = RM9 × 10 unit = RM90"],
                  ["H5", "Beza jumlah hasil = RM90 − RM72 = RM18"]
                ]
              }
            ],
            nota: "Maksimum 4 markah. Skema asal tertulis \"RM90 – RM92\"; nilai yang betul ialah RM90 − RM72 = RM18."
          }
        ]
      },

      /* ---------------- SOALAN 2 ---------------- */
      {
        no: 2,
        seksyen: "A",
        tajuk: "Overdraf, sewa beli, input dan eksternaliti",
        bahagian: [
          {
            kod: "(a)",
            konteks: petik("Encik Azman boleh mengeluarkan wang lebih daripada baki simpanannya berdasarkan had yang telah ditetapkan oleh bank."),
            s: "Jelaskan kelebihan yang diperoleh daripada pinjaman tersebut.",
            m: 3,
            bab: "t4-b3",
            topik: "Overdraf",
            skema: [
              {
                isi: [
                  ["H1", "Tidak memerlukan cagaran"],
                  ["H2", "Tidak memerlukan penjamin"],
                  ["H3", "Boleh mengeluarkan wang mengikut keperluan"],
                  ["H4", "Dikenakan faedah untuk jumlah yang digunakan sahaja"],
                  ["H5", "Boleh digunakan oleh peniaga yang mengalami masalah aliran tunai"],
                  ["H6", "Untuk membayar gaji / sewa / membeli stok"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(b)(i)",
            konteks: p("Encik Ali ingin membeli kereta Perodua Axia 1.0 SE secara sewa beli untuk kegunaannya berulang-alik ke tempat kerja. Berikut ialah maklumat yang perlu diteliti oleh Encik Ali sebelum membuat pembelian.") + jadual("", null, [["Harga kereta", "RM38 942.89"], ["Bayaran pendahuluan", "10%"], ["Kadar faedah", "3.0% setahun"], ["Tempoh kredit", "9 tahun"]], [1]),
            s: "Hitung ansuran bulanan yang perlu dibayar oleh Encik Ali.",
            m: 3,
            bab: "t4-b3",
            topik: "Sewa beli",
            skema: [
              {
                isi: [
                  ["H1", "Jumlah pinjaman = RM38 942.89 − RM3 894.29 (pendahuluan 10%) = RM35 048.60"],
                  ["H2", "Faedah untuk 9 tahun = RM35 048.60 × 3.0% × 9 = RM9 463.12"],
                  ["H3", "Bayaran ansuran = (RM35 048.60 + RM9 463.12) ÷ 108 bulan = RM44 511.72 ÷ 108"],
                  ["H4", "= RM412.15 sebulan"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(b)(ii)",
            s: "Mengapakah kaedah pembelian di atas dipilih?",
            m: 4,
            bab: "t4-b3",
            topik: "Sewa beli",
            skema: [
              {
                isi: [
                  ["H1", "Kaedah pembayaran secara kredit / ansuran / bayaran bulanan"],
                  ["H2", "Meringankan beban kewangan pembeli berbanding bayaran tunai yang perlu dibayar sekali gus"],
                  ["H3", "Dapat menikmati barang walaupun harga penuh belum dijelaskan"],
                  ["H4", "Dapat menggunakan barang yang mahal / barang kehendak / mewah"],
                  ["H5", "Menggalakkan pembeli merancang perbelanjaan kerana perlu membayar ansuran bulanan"],
                  ["H6", "Pembeli boleh menggunakan barang yang dibeli secara kredit untuk menjana pendapatan / memulakan perniagaan"],
                  ["H7", "Lebihan wang yang sepatutnya digunakan untuk membayar boleh digunakan untuk perbelanjaan lain"],
                  ["H8", "Taraf hidup pengguna meningkat"]
                ]
              }
            ],
            nota: "Maksimum 4 markah."
          },
          {
            kod: "(c)",
            konteks: p("Gambar di bawah menunjukkan dua input yang digunakan dalam proses pengeluaran kek."),
            gambar: gb("k2-2c", "Gambar 1: mesin pengadun kek. Gambar 2: telur di dalam bakul"),
            s: "Bandingkan kedua-dua input tersebut.",
            m: 5,
            bab: "t4-b4",
            topik: "Input tetap dan input berubah",
            skema: [
              {
                label: "Persamaan",
                isi: [
                  ["H1", "Merupakan faktor pengeluaran"],
                  ["H2", "Digunakan dalam proses pengeluaran barang dan perkhidmatan"]
                ]
              },
              {
                label: "Perbezaan (Gambar 1: mesin · Gambar 2: telur)",
                isi: [
                  ["H3", "Gambar 1 ialah input tetap; Gambar 2 ialah input berubah", 2],
                  ["H4", "Mesin: kuantitinya tetap pada setiap tingkat output; telur: berubah mengikut tingkat output", 2],
                  ["H5", "Mesin: wujud pada output sifar; telur: tidak wujud pada output sifar", 2],
                  ["H6", "Mesin: berlaku dalam jangka pendek; telur: wujud dalam jangka pendek dan jangka panjang", 2],
                  ["H7", "Mesin: kuantiti sukar diubah; telur: kuantiti mudah diubah", 2]
                ]
              }
            ],
            nota: "Setiap perbezaan bernilai 1 + 1. Gabungan yang diterima (persamaan + perbezaan): 1 + 4, 2 + 3, 3 + 2 atau 0 + 4. Maksimum 5 markah."
          },
          {
            kod: "(d)",
            konteks: p("Maklumat berikut berkaitan dengan aspek eksternaliti.") + petikan("Empat lagi seksyen WCE dijangka siap akhir tahun ini", ["IPOH: West Coast Expressway Sdn Bhd (WCESB) menyasarkan empat lagi seksyen Projek Lebuhraya Pesisiran Pantai Barat (WCE) disiapkan hujung tahun ini.", "Ketua Operasi Lebuh Raya WCE, Syed Muhd Naguib Syed Mohd, berkata ia membabitkan Seksyen SKVE, Banting, Assam Jawa dan Taiping Selatan."], "Sumber: Ubahsuai bharian.com.my, 10 Julai 2023"),
            s: "Mengapakah lebuh raya tersebut perlu dibina?",
            m: 5,
            bab: "t4-b4",
            topik: "Eksternaliti: faedah sosial",
            skema: [
              {
                isi: [
                  ["H1", "Wujud peluang pekerjaan"],
                  ["H2", "Pendapatan / kuasa beli masyarakat meningkat"],
                  ["H3", "Taraf hidup meningkat"],
                  ["H4", "Meningkatkan kecekapan / produktiviti"],
                  ["H5", "Infrastruktur / pengangkutan bertambah baik"],
                  ["H6", "Imej negara meningkat"],
                  ["H7", "Memudahkan perjalanan / kurang kesesakan"],
                  ["H8", "Kemajuan ekonomi kawasan setempat / perniagaan meningkat"],
                  ["H9", "Membolehkan penduduk luar bandar memasarkan barangan ke bandar"],
                  ["H10", "Harga hartanah meningkat"],
                  ["H11", "Memendekkan masa perjalanan"],
                  ["H12", "Lebih selamat"],
                  ["H13", "Meningkatkan keselesaan pengguna"],
                  ["H14", "Mengurangkan kos penggunaan bahan api"],
                  ["H15", "Memajukan sektor pelancongan sekitar / akses ke kawasan pelancongan"],
                  ["H16", "Memajukan sektor pertanian sekitar / hasil mudah dibawa keluar"],
                  ["H17", "Akses penduduk kepada kemudahan kesihatan / pendidikan meningkat"],
                  ["H18", "Mendorong pertumbuhan ekonomi"]
                ]
              }
            ],
            nota: "Maksimum 5 markah. Terima jawapan munasabah."
          }
        ]
      },

      /* ---------------- SOALAN 3 ---------------- */
      {
        no: 3,
        seksyen: "A",
        tajuk: "Dasar kewangan, KDNK, sekatan perdagangan dan kadar pertukaran",
        bahagian: [
          {
            kod: "(a)(i)",
            konteks: p("Bank Negara menurunkan kadar faedah semasa ekonomi mengalami pengangguran. Jelaskan kesan pendekatan tersebut ke atas:"),
            s: "Pengguna",
            m: 3,
            bab: "t5-b1",
            topik: "Dasar kewangan mengembang",
            skema: [
              {
                isi: [
                  ["H1", "Kos pinjaman menurun"],
                  ["H2", "Pengguna meningkatkan jumlah pinjaman"],
                  ["H3", "Pengguna lebih banyak menggunakan kaedah bayaran secara kredit"],
                  ["H4", "Dapat memperoleh barang yang dikehendaki"],
                  ["H5", "Perbelanjaan pengguna meningkat"],
                  ["H6", "Perbelanjaan agregat meningkat"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(a)(ii)",
            s: "Firma",
            m: 3,
            bab: "t5-b1",
            topik: "Dasar kewangan mengembang",
            skema: [
              {
                isi: [
                  ["H1", "Kos pinjaman menurun"],
                  ["H2", "Firma meningkatkan jumlah pinjaman"],
                  ["H3", "Modal kewangan firma bertambah"],
                  ["H4", "Firma tidak menghadapi masalah kecairan tunai"],
                  ["H5", "Pelaburan firma meningkat"],
                  ["H6", "Pelaburan agregat meningkat"],
                  ["H7", "Daya saing firma meningkat"],
                  ["H8", "Mempunyai modal untuk meningkatkan produktiviti / mengembangkan operasi"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(b)(i)",
            konteks: p("Maklumat berikut berkaitan dengan Keluaran Dalam Negara Kasar (KDNK) Malaysia dalam tempoh tiga tahun.") + jadual("", ["Tahun", "2019", "2020", "2021"], [["KDNK (RM bilion)", "1 424.3", "1 343.9", "1 386.7"]], [1, 2, 3]),
            s: "Tentukan arah aliran KDNK Malaysia bagi tahun 2019 hingga 2021.",
            m: 2,
            bab: "t5-b1",
            topik: "KDNK",
            skema: [
              {
                isi: [
                  ["H1", "Arah aliran KDNK turun kemudian naik"],
                  ["H2", "Berlaku penurunan dari tahun 2019 ke 2020"],
                  ["H3", "Menurun dari RM1 424.3 bilion kepada RM1 343.9 bilion"],
                  ["H4", "Menurun sebanyak RM80.4 bilion"],
                  ["H5", "Berlaku peningkatan dari tahun 2020 ke 2021"],
                  ["H6", "Meningkat dari RM1 343.9 bilion kepada RM1 386.7 bilion"],
                  ["H7", "Meningkat sebanyak RM42.8 bilion"]
                ]
              }
            ],
            nota: "Maksimum 2 markah."
          },
          {
            kod: "(b)(ii)",
            s: "Berikan justifikasi perubahan KDNK pada tahun 2019 hingga 2020.",
            m: 3,
            bab: "t5-b1",
            topik: "KDNK",
            skema: [
              {
                isi: [
                  ["H1", "Berlaku kemelesetan ekonomi pada tahun 2020"],
                  ["H2", "Kadar pertumbuhan ekonomi menurun"],
                  ["H3", "Kemasukan pelaburan langsung asing (FDI) berkurang"],
                  ["H4", "Menurun sebanyak RM80.4 bilion / 5.64%"],
                  ["H5", "Disebabkan pandemik COVID-19 / Perintah Kawalan Pergerakan"],
                  ["H6", "Penutupan perniagaan"],
                  ["H7", "Pengangguran meningkat"],
                  ["H8", "Rakyat hilang sumber pendapatan"],
                  ["H9", "Permintaan barang dan perkhidmatan menurun"]
                ]
              }
            ],
            nota: "Maksimum 3 markah."
          },
          {
            kod: "(c)(i)",
            konteks: p("Maklumat berikut berkaitan dengan dua sekatan perdagangan antarabangsa.") + jadual("", ["Sekatan A", "Sekatan B"], [["Malaysia mengenakan cukai sebanyak RM30 ke atas setiap unit mesin pemotong daging yang diimport.", "Malaysia mengehadkan kuantiti beras yang diimport sebanyak 10 000 tan sebulan."]]),
            s: "Kenal pasti kedua-dua sekatan perdagangan antarabangsa tersebut.",
            m: 2,
            bab: "t5-b2",
            topik: "Sekatan perdagangan",
            skema: [
              {
                isi: [
                  ["H1", "Sekatan A: tarif / tarif spesifik / duti import"],
                  ["H2", "Sekatan B: kuota"]
                ]
              }
            ]
          },
          {
            kod: "(c)(ii)(a)",
            s: "Bandingkan antara sekatan A dengan sekatan B: persamaan.",
            m: 2,
            bab: "t5-b2",
            topik: "Sekatan perdagangan",
            skema: [
              {
                isi: [
                  ["H1", "Membantu meningkatkan permintaan barang tempatan"],
                  ["H2", "Melindungi industri muda tempatan"],
                  ["H3", "Memperbaiki imbangan pembayaran"],
                  ["H4", "Mengatasi masalah lambakan"]
                ]
              }
            ],
            nota: "Maksimum 2 markah."
          },
          {
            kod: "(c)(ii)(b)",
            s: "Bandingkan antara sekatan A dengan sekatan B: perbezaan.",
            m: 2,
            bab: "t5-b2",
            topik: "Sekatan perdagangan",
            skema: [
              {
                isi: [
                  ["H1", "Sekatan A ialah cukai yang dikenakan ke atas barang import; sekatan B ialah had maksimum jumlah barang yang boleh diimport", 2],
                  ["H2", "Sekatan A menyebabkan harga barang import meningkat; sekatan B menyebabkan penawaran barang import berkurang", 2]
                ]
              }
            ],
            nota: "Setiap perbezaan bernilai 1 + 1. Maksimum 2 markah."
          },
          {
            kod: "(d)",
            konteks: p("Jadual berikut menunjukkan kadar pertukaran antara Ringgit Malaysia berbanding Dolar Amerika Syarikat (USD).") + jadual("", ["Bulan", "USD1.00"], [["Ogos", "RM4.60"], ["September", "RM4.46"]], [1]),
            s: "Puan Siti ingin melancong ke Amerika Syarikat pada bulan September. Wajarkah beliau melancong ke Amerika Syarikat pada masa tersebut? Jelaskan.",
            m: 3,
            bab: "t5-b2",
            topik: "Kadar pertukaran asing",
            skema: [
              {
                isi: [
                  ["F", "Wajar / Ya"],
                  ["H1", "Kadar pertukaran RM berbanding USD bertambah baik (RM4.60 kepada RM4.46 bagi USD1)"],
                  ["H2", "Nilai Ringgit Malaysia naik"],
                  ["H3", "Harga barang import menjadi lebih murah"],
                  ["H4", "Dapat membeli barang import lebih banyak"],
                  ["H5", "Kos melancong menurun"],
                  ["H6", "Dapat meningkatkan kepuasan"]
                ]
              }
            ],
            nota: "Maksimum 3 markah. Terima jawapan lain yang sesuai."
          }
        ]
      },

      /* ---------------- SOALAN 4 ---------------- */
      {
        no: 4,
        seksyen: "B",
        tajuk: "Dasar kewangan: kenaikan OPR",
        konteks: p("Maklumat berikut berkaitan dengan dasar kewangan yang dijalankan oleh Bank Negara dalam menjaga kestabilan ekonomi.") + petikan("BNM umum OPR naik kepada 3.0 peratus", ["KUALA LUMPUR: Jawatankuasa Dasar Monetari (MPC) Bank Negara Malaysia (BNM) mengumumkan kadar dasar semalaman (OPR) meningkat 25 mata asas kepada 3 peratus.", "Dalam satu kenyataan, bank pusat berkenaan menyatakan kenaikan ini akan menyebabkan kadar siling dan lantai OPR masing-masing kini meningkat kepada 3.25 peratus dan 2.75 peratus.", "BNM turut memaklumkan kebanyakan bank pusat mengekalkan dasar kewangan yang ketat memandangkan prospek pertumbuhan dalam negeri yang terus berdaya tahan."], "Sumber: Ubahsuai astroawani.com, 03 Mei 2023"),
        bahagian: [
          {
            kod: "(a)",
            s: "Perubahan OPR yang dijalankan oleh Bank Negara ini dapat menyelesaikan inflasi dalam negara. Jelaskan.",
            m: 6,
            bab: "t5-b1",
            topik: "Dasar kewangan menguncup",
            skema: [
              {
                isi: [
                  ["H1", "Dasar kewangan menguncup"],
                  ["H2", "Kos meminjam meningkat / beban hutang meningkat"],
                  ["H3", "Jumlah pinjaman masyarakat berkurang"],
                  ["H4", "Mengurangkan bekalan wang dalam ekonomi"],
                  ["H5", "Kuasa beli berkurang"],
                  ["H6", "Permintaan barang dan perkhidmatan berkurang / permintaan agregat turun / perbelanjaan agregat menurun"],
                  ["H7", "Tingkat harga barangan cenderung menurun"],
                  ["H8", "Firma mengurangkan pinjaman"],
                  ["H9", "Modal kewangan firma berkurangan"],
                  ["H10", "Pelaburan firma terhad / pelaburan agregat berkurangan"],
                  ["H11", "Pengeluaran barang dan perkhidmatan berkurang"],
                  ["H12", "Pertumbuhan ekonomi perlahan"],
                  ["H13", "Firma mengurangkan bilangan pekerja"],
                  ["H14", "Pendapatan pengguna menurun"],
                  ["H15", "Inflasi dapat diatasi"]
                ]
              }
            ],
            nota: "Maksimum 6 markah."
          },
          {
            kod: "(b)",
            s: "Langkah Bank Negara mengubah dasar kewangan negara ini memberi kesan kepada ekonomi negara. Bincangkan.",
            m: 9,
            bab: "t5-b1",
            topik: "Kesan kenaikan kadar faedah",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Positif: perbelanjaan agregat berkurang, maka kadar inflasi dapat dikawal"],
                  ["C2", "Positif: kuasa beli dan nilai ringgit terpelihara"],
                  ["C3", "Positif: pulangan simpanan lebih tinggi, maka tabungan masyarakat meningkat"],
                  ["C4", "Positif: menarik aliran masuk modal asing, nilai ringgit cenderung meningkat"],
                  ["C5", "Positif: mengurangkan hutang isi rumah yang berlebihan"],
                  ["C6", "Negatif: kos pinjaman firma meningkat, pelaburan berkurang"],
                  ["C7", "Negatif: pengeluaran berkurang, pertumbuhan ekonomi menjadi perlahan"],
                  ["C8", "Negatif: peluang pekerjaan berkurang, pengangguran boleh meningkat"],
                  ["C9", "Negatif: ansuran pinjaman rumah dan kereta meningkat, beban isi rumah bertambah"],
                  ["C10", "Rumusan: kenaikan OPR perlu seimbang supaya inflasi terkawal tanpa menjejaskan pertumbuhan"]
                ]
              }
            ],
            rubrik: RUBRIK_UMUM("kenaikan kadar faedah")
          },
          {
            kod: "(c)",
            s: "Jelaskan kesan pelaksanaan dasar kewangan ini terhadap permintaan barang dan perkhidmatan.",
            m: 5,
            bab: "t4-b2",
            topik: "Perubahan permintaan",
            gambarSkema: gb("skema-4c", "Jawapan skema: keluk permintaan beralih ke kiri dari D0D0 ke D1D1 pada harga P0; kuantiti diminta turun dari Q0 ke Q1", "Rajah jawapan dalam skema"),
            skema: [
              {
                isi: [
                  ["R", "Rajah lengkap: paksi berlabel dengan asalan 0, keluk D₀D₀ dan D₁D₁, anak panah, garis putus-putus P₀, Q₀ dan Q₁", 2],
                  ["H1", "Kuasa beli turun / permintaan berkurang"],
                  ["H2", "Keluk permintaan beralih ke kiri (D₀D₀ ke D₁D₁)"],
                  ["H3", "Harga kekal pada P₀"],
                  ["H4", "Kuantiti diminta jatuh dari Q₀ ke Q₁"]
                ]
              }
            ],
            nota: "Rajah lengkap 2 markah; tiada anak panah atau satu keluk sahaja: 1 markah; tiada titik asalan: penalti 1 markah; tiada garis putus-putus atau label P dan Q: maksimum 3 markah; huraian tanpa rajah: 1 markah. Maksimum 5 markah."
          }
        ]
      },

      /* ---------------- SOALAN 5 ---------------- */
      {
        no: 5,
        seksyen: "B",
        tajuk: "Subsidi bersasar",
        konteks: p("Maklumat berikut berkaitan dengan satu situasi yang berlaku di Malaysia.") + petikan("Subsidi bersasar langkah bertanggungjawab selamatkan ekonomi negara", ["SHAH ALAM: Datuk Seri Anwar Ibrahim berkata pelaksanaan subsidi bersasar khususnya ke atas RON95 dan diesel adalah langkah bertanggungjawab kerajaan menyelamatkan ekonomi negara walaupun dianggap tidak popular.", "Subsidi bersasar adalah untuk memastikan golongan rakyat bawahan yang berpendapatan rendah didahulukan. Wang subsidi perlu disalur tepat kepada sasaran.", "Perdana Menteri berkata, langkah itu yang bertujuan mengurangkan tanggungan subsidi negara akan dimulakan dengan diesel, sebelum diikuti beberapa lagi produk bahan api lain."], "Sumber: Ubahsuai sinarharian.com.my, 13 Jun 2024"),
        bahagian: [
          {
            kod: "(a)",
            s: "Apakah matlamat utama pelaksanaan penyasaran subsidi oleh kerajaan?",
            m: 5,
            bab: "t5-b1",
            topik: "Subsidi",
            skema: [
              {
                isi: [
                  ["H1", "Memaksimumkan kebajikan masyarakat"],
                  ["H2", "Memastikan golongan rakyat bawahan berpendapatan rendah didahulukan"],
                  ["H3", "Menjimatkan perbelanjaan kerajaan"],
                  ["H4", "Dana tersebut boleh digunakan untuk meningkatkan kemudahan sosial lain"],
                  ["H5", "Mengurangkan kesan kenaikan kos sara hidup rakyat"],
                  ["H6", "Menstabilkan harga barangan"],
                  ["H7", "Mengelakkan penyeludupan diesel di sempadan negara"],
                  ["H8", "Mengurangkan ketirisan / penyelewengan"],
                  ["H9", "Penyelewengan diesel mengakibatkan kerugian berbilion ringgit kepada rakyat dan negara"]
                ]
              }
            ],
            nota: "Kertas soalan memberi 5 markah (skema asal menulis Mak. 4m). Terima jawapan lain yang sesuai."
          },
          {
            kod: "(b)",
            s: "Jelaskan jenis perbelanjaan tersebut.",
            m: 6,
            bab: "t5-b1",
            topik: "Perbelanjaan kerajaan",
            skema: [
              {
                isi: [
                  ["H1", "Perbelanjaan mengurus"],
                  ["H2", "Pemberian subsidi bersasar"],
                  ["H3", "Perbelanjaan semasa kerajaan"],
                  ["H4", "Bantuan kerajaan untuk mengurangkan beban rakyat / golongan miskin"],
                  ["H5", "Tidak dipengaruhi oleh tingkat pendapatan negara"],
                  ["H6", "Meningkatkan kebajikan / taraf hidup rakyat"],
                  ["H7", "Merupakan perbelanjaan besar kerajaan"],
                  ["H8", "Dibiayai daripada kutipan hasil kerajaan"],
                  ["H9", "Perbelanjaan yang berulang-ulang"]
                ]
              }
            ],
            nota: "Kertas soalan memberi 6 markah (skema asal menulis Mak. 4m)."
          },
          {
            kod: "(c)",
            s: "Subsidi bersasar adalah langkah yang tepat untuk membantu mengatasi kenaikan kos sara hidup rakyat berpendapatan rendah. Setujukah anda dengan kenyataan di atas? Berikan alasan.",
            m: 9,
            bab: "t5-b1",
            topik: "Subsidi bersasar",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Setuju: bantuan disalurkan tepat kepada golongan berpendapatan rendah"],
                  ["C2", "Setuju: beban kos sara hidup berkurang, kuasa beli terpelihara"],
                  ["C3", "Setuju: perbelanjaan kerajaan dijimatkan dan boleh digunakan untuk kemudahan awam"],
                  ["C4", "Setuju: ketirisan dan penyeludupan bahan api berkurang"],
                  ["C5", "Setuju: kebajikan dan taraf hidup golongan sasar meningkat"],
                  ["C6", "Sisi lain: harga bahan api bagi golongan bukan sasar meningkat, kos pengangkutan naik"],
                  ["C7", "Sisi lain: kos pengeluaran firma meningkat, harga barang boleh naik (inflasi tolakan kos)"],
                  ["C8", "Sisi lain: golongan berpendapatan sederhana yang tidak layak turut terbeban"],
                  ["C9", "Sisi lain: ketepatan data penerima perlu dipastikan supaya bantuan tidak tersasar"],
                  ["C10", "Pendirian dan rumusan yang disokong alasan"]
                ]
              }
            ],
            rubrik: [
              ["Tahap 1 (1–3 markah)", ["Pengetahuan terhad tentang kesan subsidi bersasar kepada golongan berpendapatan rendah", "Menyenaraikan fakta atau isi sahaja tanpa huraian", "Huraian tidak dijelaskan dengan baik dan kurang difahami"]],
              ["Tahap 2 (4–6 markah)", ["Berupaya mengaplikasikan fakta dan kesan subsidi bersasar kepada golongan berpendapatan rendah dengan betul berdasarkan situasi", "Menghuraikan fakta yang sesuai dan betul", "Sebahagian besar huraian masih tepat tetapi kurang mendalam", "Mengemukakan idea yang rasional dan masih sesuai serta relevan"]],
              ["Tahap 3 (7–9 markah)", ["Berupaya mengaplikasikan fakta dan kesan bantuan terhadap penerima dengan betul, tepat dan jelas berdasarkan situasi", "Menghuraikan fakta dengan tepat, betul dan jelas", "Menilai kesan positif atau negatif bantuan terhadap penerima dengan tepat dan matang", "Mengemukakan idea yang bernas, kreatif dan rasional", "Menghubungkaitkan jawapan dengan pelbagai tajuk", "Membuat pertimbangan secara rasional", "Membuat kesimpulan, rumusan, pandangan atau cadangan dan memberi bukti yang relevan"]]
            ]
          }
        ]
      },

      /* ---------------- SOALAN 6 ---------------- */
      {
        no: 6,
        seksyen: "B",
        tajuk: "Kebergantungan kepada pekerja asing",
        konteks: p("Maklumat berikut berkaitan dengan isu pekerja asing di Malaysia.") + petikan("Kerajaan Perlu Mengurangkan Kebergantungan Pekerja Asing", ["CYBERJAYA: Kerajaan diminta untuk mengurangkan kebergantungan terhadap tenaga kerja asing dengan melaksanakan beberapa inisiatif termasuk meningkatkan program peningkatan kemahiran dan latihan semula atau 'reskilling and upskilling' pekerja tempatan.", "\"Selain itu, lambakan pekerja asing di negara ini juga memberi impak kepada ekonomi kerana pengaliran wang yang keluar dari negara ini secara rasmi berjumlah RM34 bilion setahun. Kos berkenaan tidak termasuk pekerja asing yang datang secara tidak sah dan sebagainya.\""], "Sumber: Ubahsuai sinarharian.com.my, 5 Ogos 2024"),
        bahagian: [
          {
            kod: "(a)",
            s: "Mengapakah majikan tempatan cenderung menggaji pekerja asing?",
            m: 4,
            bab: "t5-b1",
            topik: "Guna tenaga dan pekerja asing",
            skema: [
              {
                isi: [
                  ["H1", "Jimat kos operasi"],
                  ["H2", "Tidak perlu membayar caruman pekerja / insurans"],
                  ["H3", "Bayaran upah lebih rendah"],
                  ["H4", "Majikan mahu memaksimumkan keuntungan"],
                  ["H5", "Komitmen pekerja asing lebih tinggi / sanggup bekerja lebih masa / daya tahan tinggi"],
                  ["H6", "Pekerja tempatan tidak berminat dalam sektor 3D / kerja berat"],
                  ["H7", "Pekerja tempatan tidak sanggup bekerja di tempat panas"],
                  ["H8", "Memenuhi keperluan tenaga kerja yang kurang diminati pekerja tempatan"]
                ]
              }
            ],
            nota: "Maksimum 4 markah. Terima jawapan lain yang sesuai. (Jumlah markah soalan ini dalam kertas asal ialah 19.)"
          },
          {
            kod: "(b)",
            s: "Apakah langkah yang boleh diambil oleh kerajaan bagi meningkatkan kebolehpasaran pekerja tempatan?",
            m: 6,
            bab: "t5-b1",
            topik: "Guna tenaga dan pekerja asing",
            skema: [
              {
                isi: [
                  ["H1", "Menambah baik kadar gaji / pakej pekerjaan / kemajuan kerjaya"],
                  ["H2", "Menghasilkan graduan yang menepati keperluan industri"],
                  ["H3", "Meningkatkan kemahiran pekerja dan graduan secara berkala"],
                  ["H4", "Mempunyai nilai tambah sebagai kelebihan untuk diambil bekerja"],
                  ["H5", "Membina program latihan yang lebih relevan dengan keperluan pasaran kerja"],
                  ["H6", "Contoh: Pendidikan dan Latihan Teknikal dan Vokasional (TVET)"],
                  ["H7", "Kerajaan bekerjasama dengan pihak industri dan badan profesional"],
                  ["H8", "Mengeluarkan sijil kompetensi"],
                  ["H9", "Menubuhkan hab ekonomi gig di setiap IPT"],
                  ["H10", "Program Latihan Industri Berstruktur"],
                  ["H11", "Program pengajian berasaskan pembelajaran di tempat kerja (Work-Based Learning)"],
                  ["H12", "Mendapat pengalaman kerja sebenar melalui latihan amali yang berkualiti dan berstruktur"],
                  ["H13", "Meningkatkan penguasaan bahasa Inggeris"],
                  ["H14", "Meningkatkan kemahiran insaniah dan kemahiran asas graduan"],
                  ["H15", "Menggalakkan penerokaan pekerjaan berkualiti tinggi dan mobiliti graduan"],
                  ["H16", "Menerapkan kesedaran sivik dan nilai murni"]
                ]
              }
            ],
            nota: "Maksimum 6 markah. Terima jawapan lain yang sesuai."
          },
          {
            kod: "(c)",
            s: "Ramalkan impak yang akan berlaku terhadap pembangunan dan ekonomi negara berdasarkan tindakan kerajaan di atas. Jelaskan.",
            m: 9,
            bab: "t5-b1",
            topik: "Guna tenaga dan pekerja asing",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Aliran keluar wang (RM34 bilion setahun) berkurang, imbangan pembayaran bertambah baik"],
                  ["C2", "Peluang pekerjaan pekerja tempatan bertambah, pengangguran berkurang"],
                  ["C3", "Pendapatan dan kuasa beli rakyat meningkat, perbelanjaan dalam negara bertambah"],
                  ["C4", "Program kemahiran meningkatkan produktiviti dan daya saing tenaga kerja"],
                  ["C5", "Firma beralih kepada automasi dan teknologi yang lebih cekap"],
                  ["C6", "Masalah sosial berkaitan pekerja asing tanpa izin berkurang"],
                  ["C7", "Sisi lain: kekurangan tenaga kerja dalam sektor 3D seperti pembinaan dan perladangan"],
                  ["C8", "Sisi lain: kos buruh firma meningkat, harga barang boleh naik"],
                  ["C9", "Sisi lain: pengeluaran dan pelaburan mungkin terjejas dalam jangka pendek"],
                  ["C10", "Rumusan yang disokong alasan"]
                ]
              }
            ],
            rubrik: [
              ["Tahap 1 (1–3 markah)", ["Pengetahuan terhad tentang kesan tindakan kerajaan mengurangkan kemasukan pekerja asing terhadap pembangunan dan ekonomi negara", "Menyenaraikan fakta atau isi sahaja tanpa huraian", "Huraian tidak dijelaskan dengan baik dan kurang difahami"]],
              ["Tahap 2 (4–6 markah)", ["Berupaya mengaplikasikan fakta tentang tindakan kerajaan mengurangkan pekerja asing terhadap pembangunan dan ekonomi negara dengan betul berdasarkan situasi", "Menghuraikan fakta yang sesuai dan betul", "Sebahagian besar huraian masih tepat tetapi kurang mendalam", "Mengemukakan idea yang rasional dan masih sesuai serta relevan"]],
              ["Tahap 3 (7–9 markah)", ["Berupaya mengaplikasikan fakta dengan betul, tepat dan jelas berdasarkan situasi", "Menghuraikan fakta dengan tepat, betul dan jelas", "Mengemukakan idea yang bernas, kreatif dan rasional", "Menghubungkaitkan jawapan dengan pelbagai tajuk", "Membuat pertimbangan secara rasional", "Membuat kesimpulan, rumusan, pandangan atau cadangan dan memberi bukti yang relevan"]]
            ]
          }
        ]
      },

      /* ---------------- SOALAN 7 ---------------- */
      {
        no: 7,
        seksyen: "B",
        tajuk: "Kenaikan gaji penjawat awam",
        konteks: p("Maklumat berikut berkaitan dengan pengumuman kenaikan gaji penjawat awam di Malaysia.") + petikan("Gaji, Kualiti Kerja Penjawat Awam 'Sama-Sama Naik'", ["Hari Pekerja tahun ini memberi makna sangat istimewa kepada kira-kira 1.6 juta penjawat awam di seluruh negara. Pengumuman oleh Perdana Menteri, Datuk Seri Anwar Ibrahim mengenai kenaikan gaji penjawat awam lebih 13 peratus pada Disember ini sememangnya berita gembira yang ditunggu-tunggu mereka.", "Seiring dengan kenaikan gaji tersebut, semua penjawat awam harus memastikan perkhidmatan diberikan kepada rakyat juga adalah yang terbaik. Produktiviti, kemahiran dan kecekapan bekerja mestilah cemerlang, sekali gus dapat mengurangkan aduan serta rungutan rakyat terhadap perkhidmatan sektor kerajaan."], "Sumber: Ubahsuai Sinar Harian Online, 3 Mei 2024"),
        bahagian: [
          {
            kod: "(a)",
            s: "Jelaskan faktor pengeluaran yang terlibat dalam petikan di atas.",
            m: 5,
            bab: "t4-b1",
            topik: "Faktor pengeluaran: buruh",
            skema: [
              {
                isi: [
                  ["F1", "Buruh"],
                  ["H1", "Menyumbangkan tenaga fizikal dan mental dalam proses pengeluaran"],
                  ["H2", "Menerima ganjaran upah"],
                  ["H3", "Mempunyai mobiliti geografi yang tinggi / boleh berpindah tempat kerja"],
                  ["H4", "Mempunyai mobiliti pekerjaan"],
                  ["H5", "Bekerja dengan orang lain"],
                  ["H6", "Ada buruh mahir dan buruh tidak mahir"],
                  ["H7", "Buruh mahir berpendidikan tinggi / mempunyai kemahiran profesional / contoh buruh mahir"],
                  ["H8", "Buruh tidak mahir berpendidikan rendah / tiada kemahiran profesional / contoh buruh tidak mahir"]
                ]
              }
            ],
            nota: "Maksimum 5 markah."
          },
          {
            kod: "(b)",
            s: "Mengapakah golongan belia pada masa kini lebih berminat untuk bekerja di sektor awam?",
            m: 6,
            bab: "t4-b3",
            topik: "Pemilihan pekerjaan",
            skema: [
              {
                isi: [
                  ["H1", "Pekerjaan lebih terjamin / selamat / sukar diberhentikan"],
                  ["H2", "Mendapat upah bulanan yang tetap / lebih stabil"],
                  ["H3", "Menikmati kenaikan gaji tahunan"],
                  ["H4", "Mendapat pelbagai faedah sampingan"],
                  ["H5", "Contohnya elaun sara hidup / elaun perumahan / cuti bersalin / cuti tahunan / rawatan percuma"],
                  ["H6", "Menikmati skim pencen / ganjaran selepas bersara"],
                  ["H7", "Mendapat tajaan / peluang melanjutkan pelajaran"],
                  ["H8", "Mudah membuat pinjaman, contohnya pinjaman perumahan LPPSA"],
                  ["H9", "Boleh membuat tuntutan perjalanan / makan jika bertugas di luar kawasan"],
                  ["H10", "Kenaikan pangkat jika menepati kelayakan dan tempoh perkhidmatan"],
                  ["H11", "Waktu bekerja yang tetap / lebih pendek"],
                  ["H12", "Mempunyai lebih banyak masa bersama keluarga"],
                  ["H13", "Menikmati diskaun khas hotel / rumah peranginan"],
                  ["H14", "Berpeluang memberi perkhidmatan / sumbangan kepada masyarakat"],
                  ["H15", "Dapat mengejar minat peribadi kerana pengurusan cuti yang teratur"]
                ]
              }
            ],
            nota: "Kertas soalan memberi 6 markah (skema asal menulis Mak. 5m)."
          },
          {
            kod: "(c)",
            s: "Tindakan kerajaan tersebut memberi kesan terhadap objektif makroekonomi negara. Bincangkan.",
            m: 9,
            bab: "t5-b1",
            topik: "Objektif makroekonomi",
            skema: [
              {
                label: CADANGAN,
                isi: [
                  ["C1", "Pertumbuhan ekonomi: kuasa beli meningkat, perbelanjaan penggunaan dan permintaan agregat bertambah, KDNK meningkat"],
                  ["C2", "Guna tenaga penuh: firma menambah pengeluaran dan pekerja untuk memenuhi permintaan"],
                  ["C3", "Produktiviti dan kecekapan perkhidmatan awam meningkat"],
                  ["C4", "Taraf hidup penjawat awam meningkat; agihan pendapatan lebih saksama"],
                  ["C5", "Kestabilan harga (sisi lain): permintaan agregat meningkat boleh mencetuskan inflasi tarikan permintaan"],
                  ["C6", "Sisi lain: perbelanjaan mengurus kerajaan meningkat, defisit belanjawan boleh bertambah"],
                  ["C7", "Sisi lain: sektor swasta terpaksa menaikkan gaji untuk bersaing, kos pengeluaran naik"],
                  ["C8", "Rumusan yang disokong alasan"]
                ]
              }
            ],
            rubrik: [
              ["Tahap 1 (1–3 markah)", ["Menyenaraikan fakta atau isi sahaja tanpa huraian", "Huraian tidak dijelaskan dengan baik dan kurang difahami"]],
              ["Tahap 2 (4–6 markah)", ["Berupaya mengaplikasikan fakta berkaitan kesan kenaikan gaji terhadap objektif makroekonomi negara", "Sebahagian besar huraian adalah tepat", "Mengemukakan idea yang rasional dan masih sesuai atau relevan", "Jawapan satu sisi"]],
              ["Tahap 3 (7–9 markah)", ["Berupaya mengaplikasikan fakta berkaitan kesan kenaikan gaji terhadap objektif makroekonomi negara dengan tepat dan jelas", "Mengemukakan idea yang bernas dan rasional atau dianalisis secara mendalam", "Membuat kesimpulan, rumusan, pandangan atau cadangan dan memberi bukti atau data yang relevan", "Jawapan dua sisi"]]
            ]
          }
        ]
      }
    ]
  });
})();
