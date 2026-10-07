/* =========================================================
   Econ Tutor · daftar jenis keluk (EKO.jenisKeluk) + enjin penerangan (EKO.terang)
   Fungsi tulen tanpa DOM: boleh diuji dalam Node.

   - Setiap jenis keluk ialah data (definisi, hubungan, pergerakan, peralihan, faktor),
     ditulis mengikut istilah buku teks. Jenis baharu (KKP, AD/AS, Lorenz…) ditambah dengan
     JK.daftar({...}) tanpa mengubah enjin graf.
   - Penerangan dibina daripada templat + keadaan graf (anjak, titik) dan bukan dijana AI.
   - Jenis keluk TIDAK pernah diandaikan daripada bentuk sahaja: T.cadang memberi cadangan
     berserta sebab, dan pelajar yang menetapkannya.
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var B = E.bina;
  var JK = (E.jenisKeluk = {});
  var T = (E.terang = {});

  var daftar = {};
  var tertib = [];
  var RE_BARANG = /barang|modal|pengguna/i; // paksi KKP (dua barang)

  JK.daftar = function (j) {
    if (!daftar[j.id]) tertib.push(j.id);
    daftar[j.id] = j;
  };
  JK.dapat = function (id) {
    return (id && daftar[id]) || null;
  };
  JK.senarai = function () {
    return tertib.map(function (id) {
      return daftar[id];
    });
  };

  /* ---------- jenis: permintaan & penawaran (Tingkatan 4 Bab 2) ---------- */
  JK.daftar({
    id: "permintaan",
    nama: "Keluk Permintaan",
    pendek: "permintaan",
    kuantiti: "kuantiti diminta",
    label: "D",
    warna: "d",
    arahBiasa: "menurun",
    labelPadan: /^(D|DD|Dd|Qd)$/,
    paksiPadan: function (p) {
      return RE_HARGA.test(p.y.label || "") && RE_KUANTITI.test(p.x.label || "");
    },
    definisi:
      "<b>Permintaan</b> merujuk kepada keinginan dan kemampuan seseorang individu untuk membeli sesuatu barang atau perkhidmatan pada suatu tingkat harga tertentu dan dalam jangka masa tertentu.",
    hubungan: "Keluk ini menunjukkan hubungan <b>songsang (negatif)</b> antara harga dan kuantiti diminta, <i>ceteris paribus</i>.",
    hukum: ["Harga meningkat → kuantiti diminta menurun.", "Harga menurun → kuantiti diminta meningkat."],
    gerak: {
      sebab: "Berlaku apabila <b>harga barang itu sendiri</b> berubah. Ini ialah perubahan dalam <b>kuantiti diminta</b>.",
      ringkas: "ini perubahan dalam <b>kuantiti diminta</b>, yang berlaku apabila <b>harga barang itu sendiri</b> berubah.",
      atas: { istilah: "Penguncupan permintaan", ayat: "Harga naik, maka kuantiti diminta berkurang. Titik bergerak ke atas di sepanjang keluk permintaan yang sama." },
      bawah: { istilah: "Pengembangan permintaan", ayat: "Harga turun, maka kuantiti diminta bertambah. Titik bergerak ke bawah di sepanjang keluk permintaan yang sama." }
    },
    alih: {
      sebab: "Berlaku apabila <b>faktor bukan harga</b> berubah. Ini ialah perubahan dalam <b>permintaan</b>; keseluruhan keluk beralih.",
      ringkas: "Peralihan keluk permintaan berlaku apabila <b>faktor bukan harga</b> berubah.",
      kanan: { istilah: "Pertambahan permintaan", ayat: "Keluk permintaan beralih ke kanan: pada setiap tingkat harga, kuantiti diminta lebih banyak." },
      kiri: { istilah: "Pengurangan permintaan", ayat: "Keluk permintaan beralih ke kiri: pada setiap tingkat harga, kuantiti diminta lebih sedikit." },
      faktor: function () {
        return (E.graf && E.graf.FAKTOR_D) || [];
      }
    },
    khas: {
      mendatar: "Keluk permintaan yang mendatar menunjukkan permintaan <b>anjal sempurna</b>: pada harga itu, kuantiti diminta boleh berubah tanpa had.",
      tegak: "Keluk permintaan yang tegak menunjukkan permintaan <b>tidak anjal sempurna</b>: perubahan harga tidak mengubah kuantiti diminta."
    }
  });

  JK.daftar({
    id: "penawaran",
    nama: "Keluk Penawaran",
    pendek: "penawaran",
    kuantiti: "kuantiti ditawarkan",
    label: "S",
    warna: "s",
    arahBiasa: "menaik",
    labelPadan: /^(S|SS|Ss|Qs)$/,
    paksiPadan: function (p) {
      return RE_HARGA.test(p.y.label || "") && RE_KUANTITI.test(p.x.label || "");
    },
    definisi:
      "<b>Penawaran</b> merujuk kepada kuantiti sesuatu barang atau perkhidmatan yang sanggup dan mampu dikeluarkan oleh pengeluar atau firma pada suatu tingkat harga tertentu dalam tempoh masa tertentu.",
    hubungan: "Keluk ini menunjukkan hubungan <b>positif</b> antara harga dan kuantiti ditawarkan, <i>ceteris paribus</i>.",
    hukum: ["Harga meningkat → kuantiti ditawarkan meningkat.", "Harga menurun → kuantiti ditawarkan menurun."],
    gerak: {
      sebab: "Berlaku apabila <b>harga barang itu sendiri</b> berubah. Ini ialah perubahan dalam <b>kuantiti ditawarkan</b>.",
      ringkas: "ini perubahan dalam <b>kuantiti ditawarkan</b>, yang berlaku apabila <b>harga barang itu sendiri</b> berubah.",
      atas: { istilah: "Pengembangan penawaran", ayat: "Harga naik, maka kuantiti ditawarkan bertambah. Titik bergerak ke atas di sepanjang keluk penawaran yang sama." },
      bawah: { istilah: "Penguncupan penawaran", ayat: "Harga turun, maka kuantiti ditawarkan berkurang. Titik bergerak ke bawah di sepanjang keluk penawaran yang sama." }
    },
    alih: {
      sebab: "Berlaku apabila <b>faktor bukan harga</b> berubah. Ini ialah perubahan dalam <b>penawaran</b>; keseluruhan keluk beralih.",
      ringkas: "Peralihan keluk penawaran berlaku apabila <b>faktor bukan harga</b> berubah.",
      kanan: { istilah: "Pertambahan penawaran", ayat: "Keluk penawaran beralih ke kanan: pada setiap tingkat harga, kuantiti ditawarkan lebih banyak." },
      kiri: { istilah: "Pengurangan penawaran", ayat: "Keluk penawaran beralih ke kiri: pada setiap tingkat harga, kuantiti ditawarkan lebih sedikit." },
      faktor: function () {
        return (E.graf && E.graf.FAKTOR_S) || [];
      }
    },
    khas: {
      mendatar: "Keluk penawaran yang mendatar menunjukkan penawaran <b>anjal sempurna</b>: pada harga itu, kuantiti ditawarkan boleh berubah tanpa had.",
      tegak: "Keluk penawaran yang tegak menunjukkan penawaran <b>tidak anjal sempurna</b>: perubahan harga tidak mengubah kuantiti ditawarkan."
    }
  });

  /* ---------- jenis: keluk kemungkinan pengeluaran (Tingkatan 4 Bab 1; STPM P1 Bab 1) ---------- */
  // Punca peralihan selari (kedua-dua barang), mengikut nota KKP STPM (PUNCA dalam graf-stpm.js)
  var FAKTOR_KKP = [
    {
      label: "KKP beralih ke kanan (pertumbuhan ekonomi)",
      pilihan: [
        ["sumber+", "Pertambahan anugerah sumber: pertambahan penduduk atau kemasukan buruh asing, penemuan sumber alam baharu, pertambahan pelaburan"],
        ["teknologi+", "Kemajuan teknologi dalam pengeluaran kedua-dua barang"]
      ]
    },
    {
      label: "KKP beralih ke kiri",
      pilihan: [
        ["sumber-", "Pengurangan anugerah sumber: kepupusan bahan galian, pengurangan tenaga kerja asing, kemerosotan pelaburan"],
        ["teknologi-", "Kemunduran teknologi dalam pengeluaran kedua-dua barang"]
      ]
    }
  ];

  JK.daftar({
    id: "kkp",
    nama: "Keluk Kemungkinan Pengeluaran (KKP)",
    pendek: "KKP",
    label: "KKP",
    warna: "c3",
    arahBiasa: "menurun",
    cara: "skala", // KKP beralih dengan mengembang/mengecut dari asalan, bukan digeser
    labelPadan: /^(KKP|PPC|AB)$/i,
    paksiLalai: { x: "Barang X", y: "Barang Y" },
    paksiPadan: function (p) {
      return RE_BARANG.test(p.x.label || "") || RE_BARANG.test(p.y.label || "");
    },
    definisi:
      "<b>Keluk kemungkinan pengeluaran (KKP)</b> ialah keluk yang menunjukkan had maksimum tingkat pengeluaran yang dapat dicapai oleh sebuah ekonomi dengan menggunakan faktor pengeluaran yang ada dan tingkat teknologi tertentu.",
    hubungan:
      "KKP yang cembung ke titik asalan menunjukkan <b>kos lepas yang semakin meningkat</b>: semakin banyak barang lain perlu dikorbankan untuk setiap unit tambahan kerana faktor pengeluaran tidak sama cekap.",
    hukum: [
      "Titik pada KKP: pengeluaran maksimum; faktor pengeluaran digunakan sepenuhnya dan cekap.",
      "Titik di dalam KKP: tidak cekap; berlaku pengangguran atau pembaziran.",
      "Titik di luar KKP: tidak dapat dicapai dengan sumber sedia ada; menggambarkan masalah kekurangan."
    ],
    gerak: {
      sebab: "Pergerakan di sepanjang KKP menunjukkan <b>pilihan</b> dan <b>kos lepas</b>: kerana sumber terhad, menambah pengeluaran satu barang bermakna mengurangkan pengeluaran barang yang lain.",
      ringkas: "ini menunjukkan <b>kos lepas</b>: menambah pengeluaran satu barang bermakna mengorbankan barang yang lain.",
      atas: {
        istilah: "Tambah barang Y (paksi tegak)",
        ayat: "Titik bergerak ke atas di sepanjang KKP: pengeluaran barang Y bertambah dan pengeluaran barang X berkurang. Kos lepasnya ialah barang X yang dikorbankan."
      },
      bawah: {
        istilah: "Tambah barang X (paksi datar)",
        ayat: "Titik bergerak ke bawah di sepanjang KKP: pengeluaran barang X bertambah dan pengeluaran barang Y berkurang. Kos lepasnya ialah barang Y yang dikorbankan."
      }
    },
    alih: {
      sebab: "KKP beralih apabila <b>jumlah faktor pengeluaran</b> atau <b>tingkat teknologi</b> berubah. Pertumbuhan ekonomi ditunjukkan oleh KKP yang beralih ke kanan.",
      ringkas: "Peralihan KKP berlaku apabila jumlah faktor pengeluaran atau tingkat teknologi berubah.",
      bentuk: "Kedua-dua pintasan KKP berubah dengan nisbah yang sama (peralihan selari).",
      kanan: { istilah: "Pertumbuhan ekonomi", ayat: "KKP beralih ke kanan: ekonomi dapat mengeluarkan lebih banyak kedua-dua barang." },
      kiri: { istilah: "Pengurangan keupayaan pengeluaran", ayat: "KKP beralih ke kiri: ekonomi hanya dapat mengeluarkan lebih sedikit kedua-dua barang." },
      faktorTajuk: "Antara punca yang boleh menyebabkannya:",
      nota: "Jika hanya satu barang terlibat (contohnya kemajuan teknologi dalam pengeluaran barang X sahaja), KKP berpusing pada satu paksi sahaja. Bina graf menunjukkan peralihan selari; lihat graf KKP dalam nota bab untuk kes berpusing.",
      faktor: function () {
        return FAKTOR_KKP;
      }
    },
    khas: {}
  });

  /* ---------- istilah bagi keadaan semasa ---------- */
  // Pergerakan A → B: "atas" jika harga (paksi Y) naik, "bawah" jika turun
  T.arahGerak = function (k, t) {
    var poli = B.laluan(k);
    var a = B.titikPadaS(poli, t.sAwal),
      b = B.titikPadaS(poli, t.s);
    if (Math.abs(t.s - t.sAwal) <= 0.004) return null;
    var dy = b[1] - a[1];
    return dy > 0.002 ? "atas" : dy < -0.002 ? "bawah" : null;
  };

  // Istilah buku teks bagi pergerakan semasa (null jika tiada jenis atau tiada pergerakan)
  T.istilahGerak = function (graf, k) {
    var j = JK.dapat(k.jenis);
    var t = B.titikKeluk(graf, k.id);
    var arah = j && t ? T.arahGerak(k, t) : null;
    return arah ? j.gerak[arah] : null;
  };

  // Istilah buku teks bagi peralihan semasa (kanan/kiri sahaja)
  T.istilahAlih = function (k) {
    var j = JK.dapat(k.jenis);
    if (!j) return null;
    var arah = B.arahAlih(k);
    if (arah.indexOf("kanan") !== -1) return j.alih.kanan;
    if (arah.indexOf("kiri") !== -1) return j.alih.kiri;
    return null;
  };

  /* ---------- cadangan jenis (tidak pernah ditetapkan secara automatik) ---------- */
  var RE_HARGA = /harga|\bP\b/i,
    RE_KUANTITI = /kuantiti|\bQ/i;

  T.cadang = function (graf, id) {
    var k = B.cari(graf, id);
    if (!k) return [];
    var asas = B.asasLabel(k.label).replace(/′+$/, "");
    return JK.senarai()
      .map(function (j) {
        var skor = 0,
          sebab = [];
        if (k.persamaan && k.persamaan.jenis === j.id) {
          skor += 0.6;
          sebab.push("persamaan menggunakan " + (j.id === "permintaan" ? "Qd" : "Qs"));
        }
        if (j.labelPadan.test(asas)) {
          skor += 0.4;
          sebab.push("berlabel " + asas);
        }
        if (k.meta.arah === j.arahBiasa) {
          skor += 0.3;
          sebab.push("keluk " + k.meta.arah);
        } else if (k.meta.arah === "menurun" || k.meta.arah === "menaik") skor -= 0.4;
        if (j.paksiPadan && j.paksiPadan(graf.paksi)) {
          skor += 0.1;
          sebab.push(j.id === "kkp" ? "paksi dua barang" : "paksi harga dan kuantiti");
        }
        return { jenis: j.id, nama: j.nama, skor: Math.max(0, Math.min(1, Math.round(skor * 100) / 100)), sebab: sebab };
      })
      .filter(function (c) {
        return c.skor > 0;
      })
      .sort(function (a, b) {
        return b.skor - a.skor;
      });
  };

  // Tetapkan jenis (atau null). Label generik (K, L, M… atau K′) ditukar kepada label jenis (D, S).
  T.tetapkan = function (graf, id, jenisId) {
    var g = B.klon(graf);
    var k = B.cari(g, id);
    if (!k) return g;
    var j = JK.dapat(jenisId);
    k.jenis = j ? j.id : null;
    // cara peralihan ikut jenis: KKP mengembang dari asalan (skala), keluk lain digeser (translasi)
    var cara = j && j.cara === "skala" ? "skala" : B.arahSeretLalai(k.meta.arah);
    if (cara !== k.arahSeret && (cara === "skala" || k.arahSeret === "skala")) {
      k.anjak = { x: 0, y: 0 };
      k.skala = 1;
    }
    k.arahSeret = cara;
    // label paksi lalai jenis (contoh KKP: Barang X / Barang Y) jika paksi masih label pasaran lalai
    // dan tiada keluk berjenis lain (contohnya D/S) yang memerlukan paksi harga dan kuantiti
    var jenisLain = g.keluk.some(function (x) {
      return x.id !== k.id && x.jenis && x.jenis !== k.jenis;
    });
    if (j && j.paksiLalai && !jenisLain && g.paksi.x.label === "Kuantiti (unit)" && g.paksi.y.label === "Harga (RM)") {
      g.paksi.x.label = j.paksiLalai.x;
      g.paksi.y.label = j.paksiLalai.y;
    }
    if (j) {
      if (/^[KLMNRTUV]′*$/.test(k.label)) {
        k.label = "";
        k.label = B.labelBebas(g, j.label);
      }
      var dipakai = g.keluk.some(function (x) {
        return x.id !== k.id && x.warna === j.warna;
      });
      if (!dipakai) k.warna = j.warna;
    }
    return g;
  };

  /* ---------- keseimbangan pasaran (Tingkatan 4 Bab 2) ---------- */
  // Mekanisme buku teks bagi setiap kes asas: lebihan pada harga asal → harga berubah → E₁
  var MEKANISME = {
    "D+": "Pertambahan permintaan: pada harga asal P₀ berlaku <b>lebihan permintaan</b> (DD &gt; SS), maka harga naik. Keseimbangan baharu E₁ tercapai pada harga dan kuantiti keseimbangan yang <b>lebih tinggi</b>.",
    "D-": "Pengurangan permintaan: pada harga asal P₀ berlaku <b>lebihan penawaran</b> (SS &gt; DD), maka harga turun. Keseimbangan baharu E₁ tercapai pada harga dan kuantiti keseimbangan yang <b>lebih rendah</b>.",
    "S+": "Pertambahan penawaran: pada harga asal P₀ berlaku <b>lebihan penawaran</b> (SS &gt; DD), maka harga turun. Keseimbangan baharu E₁ tercapai pada harga keseimbangan yang <b>lebih rendah</b> dan kuantiti keseimbangan yang <b>lebih tinggi</b>.",
    "S-": "Pengurangan penawaran: pada harga asal P₀ berlaku <b>lebihan permintaan</b> (DD &gt; SS), maka harga naik. Keseimbangan baharu E₁ tercapai pada harga keseimbangan yang <b>lebih tinggi</b> dan kuantiti keseimbangan yang <b>lebih rendah</b>.",
    DS: "Kedua-dua keluk permintaan dan penawaran beralih. Kesan bersih terhadap harga dan kuantiti keseimbangan bergantung pada <b>magnitud</b> peralihan setiap keluk."
  };

  function fmtW(v) {
    return E.fmt(v, 2);
  }

  function ubahTeks(arah, naik, turun) {
    return arah > 0 ? naik : arah < 0 ? turun : "tidak berubah";
  }

  // Blok penerangan keseimbangan untuk keluk `id` (null jika tiada pasangan D/S atau keluk ini bukan sebahagiannya)
  T.keseimbangan = function (graf, id) {
    var KS = E.keseimbangan;
    var r = KS && KS.kira(graf, id);
    if (!r || (r.d !== id && r.s !== id)) return null;
    var def =
      "<p><b>Keseimbangan pasaran</b> tercapai apabila kuantiti diminta sama dengan kuantiti ditawarkan, iaitu keluk DD bersilang dengan SS.</p>";
    if (r.ralat || !r.E1) {
      return { jenis: "contoh", konsep: "alih", tajuk: "Keseimbangan pasaran", html: def + "<p>Dalam graf ini, keluk permintaan dan penawaran tidak bersilang, jadi tiada keseimbangan yang kelihatan.</p>" };
    }
    if (!r.berubah) {
      var nilai0 = r.bernilai ? " Harga keseimbangan = <b>" + fmtW(r.E1.w[1]) + "</b>, kuantiti keseimbangan = <b>" + fmtW(r.E1.w[0]) + "</b>." : "";
      return { jenis: "contoh", konsep: "alih", tajuk: "Keseimbangan pasaran", html: def + "<p><b>Dalam graf ini:</b> keseimbangan di E." + nilai0 + " Alihkan keluk permintaan atau penawaran untuk melihat kesannya.</p>" };
    }
    var jangka = KS.JANGKA[r.kes];
    var sepadan = !jangka || (jangka.p === r.arahP && jangka.q === r.arahQ);
    var html = def + (sepadan ? "<p>" + MEKANISME[r.kes] + "</p>" : "");
    var p = ubahTeks(r.arahP, "naik", "turun"),
      q = ubahTeks(r.arahQ, "bertambah", "berkurang");
    html +=
      "<p><b>Dalam graf ini:</b> keseimbangan beralih dari E₀ ke E₁. Harga keseimbangan <b>" + p + "</b>" +
      (r.bernilai && r.arahP ? " (P₀ = " + fmtW(r.E0.w[1]) + " → P₁ = " + fmtW(r.E1.w[1]) + ")" : "") +
      " dan kuantiti keseimbangan <b>" + q + "</b>" +
      (r.bernilai && r.arahQ ? " (Q₀ = " + fmtW(r.E0.w[0]) + " → Q₁ = " + fmtW(r.E1.w[0]) + ")" : "") + ".</p>";
    if (!r.E1.nampak) html += "<p>E₁ berada di luar kawasan graf.</p>";
    return { jenis: "contoh", konsep: "alih", tajuk: "Kesan terhadap keseimbangan pasaran", html: html };
  };

  // Keanjalan harga yang ditunjukkan oleh peralihan satu keluk: apabila penawaran beralih, keseimbangan
  // bergerak di sepanjang keluk permintaan (Ed); apabila permintaan beralih, di sepanjang keluk penawaran (Es).
  // Dikira daripada E₀ dan E₁: nilai paksi jika ada, jika tidak kedudukan dalam rajah (paksi dari 0, jadi
  // peratus perubahan tidak bergantung pada unit). Pulang { e, jenis, pP, pQ, … } atau null.
  T.kiraKeanjalan = function (graf, id) {
    var KS = E.keseimbangan;
    var r = KS && KS.kira(graf, id);
    if (!r || !r.E0 || !r.E1 || !r.berubah || !r.kes || r.kes === "DS") return null;
    var a = r.bernilai ? r.E0.w : r.E0.n,
      b = r.bernilai ? r.E1.w : r.E1.n;
    if (!(a[0] > 0) || !(a[1] > 0)) return null;
    var pQ = ((b[0] - a[0]) / a[0]) * 100,
      pP = ((b[1] - a[1]) / a[1]) * 100;
    if (Math.abs(pQ) < 0.5 && Math.abs(pP) < 0.5) return null;
    var e = Math.abs(pP) < 0.5 ? Infinity : Math.abs(pQ) < 0.5 ? 0 : Math.abs(pQ / pP);
    var jenis = e === Infinity ? "anjal sempurna" : e === 0 ? "tak anjal sempurna" : Math.abs(e - 1) < 0.05 ? "anjal uniti" : e > 1 ? "anjal" : "tak anjal";
    return { sepanjang: r.kes.charAt(0) === "S" ? "permintaan" : "penawaran", e: e, jenis: jenis, pP: pP, pQ: pQ, bernilai: r.bernilai, P0: a[1], P1: b[1], Q0: a[0], Q1: b[0] };
  };

  function imbasan(graf) {
    return graf.keluk.some(function (k) {
      return k.meta && k.meta.sumber === "imbas";
    });
  }

  T.keanjalan = function (graf, id) {
    var k = T.kiraKeanjalan(graf, id);
    if (!k) return null;
    var D = k.sepanjang === "permintaan";
    var simbol = D ? "Ed" : "Es",
      nama = D ? "keanjalan harga permintaan" : "keanjalan harga penawaran",
      kuantiti = D ? "kuantiti diminta" : "kuantiti ditawarkan",
      keluk = D ? "permintaan" : "penawaran";
    function pc(v) {
      return (v > 0 ? "+" : v < 0 ? "−" : "") + E.fmt(Math.abs(v), 1) + "%";
    }
    function beza(v0, v1) {
      var d = v1 - v0;
      return fmtW(v0) + " → " + fmtW(v1) + " (" + (d > 0 ? "+" : d < 0 ? "−" : "") + fmtW(Math.abs(d)) + ", " + pc(((v1 - v0) / v0) * 100) + ")";
    }
    var html =
      "<p>Keluk " + (D ? "penawaran" : "permintaan") + " beralih, jadi keseimbangan bergerak dari E₀ ke E₁ <b>di sepanjang keluk " + keluk + "</b>. Pergerakan itu menunjukkan <b>" + nama + " (" + simbol + ")</b>.</p>" +
      "<ul><li>Harga: " + (k.bernilai ? "P₀ → P₁ = " + beza(k.P0, k.P1) : "P₀ → P₁, perubahan kira-kira <b>" + pc(k.pP) + "</b>") + "</li>" +
      "<li>" + kuantiti.charAt(0).toUpperCase() + kuantiti.slice(1) + ": " + (k.bernilai ? "Q₀ → Q₁ = " + beza(k.Q0, k.Q1) : "Q₀ → Q₁, perubahan kira-kira <b>" + pc(k.pQ) + "</b>") + "</li></ul>" +
      "<p>" + simbol + " = %ΔQ ÷ %ΔP" +
      (isFinite(k.e) && k.e > 0 ? " = " + E.fmt(Math.abs(k.pQ), 1) + "% ÷ " + E.fmt(Math.abs(k.pP), 1) + "% ≈ <b>" + E.fmt(k.e, 2) + "</b> (nilai mutlak)" : "") + ".</p>";
    var sebab = {
      anjal: simbol + " &gt; 1: peratus perubahan " + kuantiti + " <b>lebih besar</b> daripada peratus perubahan harga.",
      "tak anjal": simbol + " &lt; 1: peratus perubahan " + kuantiti + " <b>lebih kecil</b> daripada peratus perubahan harga.",
      "anjal uniti": simbol + " = 1: peratus perubahan " + kuantiti + " <b>sama</b> dengan peratus perubahan harga.",
      "anjal sempurna": simbol + " = ∞: " + kuantiti + " berubah walaupun harga tidak berubah (keluk mendatar).",
      "tak anjal sempurna": simbol + " = 0: " + kuantiti + " tidak berubah walaupun harga berubah (keluk tegak)."
    };
    html += "<p><b>" + keluk.charAt(0).toUpperCase() + keluk.slice(1) + " " + k.jenis + "</b> di antara E₀ dan E₁. " + sebab[k.jenis] + "</p>";
    html += "<p class=\"teks-lemah\">" + (k.bernilai ? "Nilai dibaca daripada skala paksi graf ini" + (imbasan(graf) ? "; bagi graf yang diimbas, nilai itu boleh lari sedikit daripada gambar, jadi kira semula dengan nilai sebenar jika perlu." : ".") : "Anggaran daripada kedudukan E₀ dan E₁ dalam rajah (paksi bermula dari 0), kerana paksi tiada nombor.") + "</p>";
    return { jenis: "rumus", konsep: "alih", tajuk: "Keanjalan (" + simbol + ") daripada graf ini", html: html };
  };

  /* ---------- penerangan ---------- */
  function senarai(items) {
    return "<ul>" + items.map(function (s) {
      return "<li>" + s + "</li>";
    }).join("") + "</ul>";
  }

  // huruf pertama sahaja dikecilkan ("Tambah barang Y" → "tambah barang Y")
  function kecil(t) {
    return t.charAt(0).toLowerCase() + t.slice(1);
  }

  function esc(s) {
    return E.esc(s);
  }

  function senaraiFaktor(kumpulan) {
    return senarai(
      kumpulan.pilihan.map(function (p) {
        return esc(p[1]);
      })
    );
  }

  // Hanya konsep bagi mod semasa: mod "alih" → peralihan sahaja, mod "gerak" → pergerakan sahaja.
  // Tanpa mod, kedua-duanya dipulangkan.
  function tapis(blok, mod) {
    if (mod !== "gerak" && mod !== "alih") return blok;
    return blok.filter(function (b) {
      return !b.konsep || b.konsep === mod;
    });
  }

  // Pulang { tajuk, jenis, blok: [{ jenis, konsep?, tajuk, html }], cadangan }. mod: "gerak" | "alih" (pilihan)
  T.keluk = function (graf, id, mod) {
    var k = B.cari(graf, id);
    if (!k) return { tajuk: "Tiada keluk dipilih", jenis: null, blok: [], cadangan: [] };
    var j = JK.dapat(k.jenis);
    var nama = esc(k.label);
    var asas = esc(B.asasLabel(k.label));
    var blok = [];
    var t = B.titikKeluk(graf, k.id);

    if (!j) {
      blok.push({
        jenis: "info",
        tajuk: "Jenis keluk belum ditetapkan",
        html:
          "<p>Bentuk keluk sahaja tidak cukup untuk menentukan maknanya. Contohnya, keluk yang menurun tidak semestinya keluk permintaan. Pilih jenis keluk <b>" + nama +
          "</b> di atas jika anda tahu maknanya.</p>"
      });
      blok.push({
        jenis: "tip",
        konsep: "gerak",
        tajuk: "Pergerakan di sepanjang keluk",
        html: "<p>Titik bergerak di sepanjang keluk yang sama apabila pemboleh ubah pada paksi itu sendiri berubah. Keluk tidak beralih.</p>"
      });
      blok.push({
        jenis: "fokus",
        konsep: "alih",
        tajuk: "Peralihan keluk",
        html: "<p>Keseluruhan keluk beralih apabila faktor selain pemboleh ubah pada paksi berubah. Bentuk keluk kekal.</p>"
      });
      return { tajuk: "Keluk " + nama, jenis: null, blok: tapis(blok, mod), cadangan: T.cadang(graf, id) };
    }

    blok.push({
      jenis: "def",
      tajuk: j.nama,
      // mod peralihan: jenis keluk dan definisi sahaja (hukum harga–kuantiti ialah konsep pergerakan)
      html: mod === "alih" ? "<p>" + j.definisi + "</p>" : "<p>" + j.hubungan + "</p>" + senarai(j.hukum) + "<p>" + j.definisi + "</p>"
    });

    // bentuk tidak sepadan dengan jenis
    if (j.khas[k.meta.arah]) {
      blok.push({ jenis: "info", tajuk: "Bentuk keluk", html: "<p>" + j.khas[k.meta.arah] + "</p>" });
    } else if (k.meta.arah !== j.arahBiasa) {
      blok.push({
        jenis: "info",
        tajuk: "Semak bentuk keluk",
        html:
          "<p>Keluk <b>" + nama + "</b> " + (k.meta.arah === "lain" ? "tidak menurun atau menaik secara konsisten" : k.meta.arah) + ", tetapi keluk " + j.pendek +
          " biasanya <b>" + j.arahBiasa + "</b> (hukum " + j.pendek + "). Semak jenis keluk atau bentuknya.</p>"
      });
    }

    // pergerakan di sepanjang keluk
    var arahG = t ? T.arahGerak(k, t) : null;
    var dalamGraf = arahG
      ? "<p><b>Dalam graf ini:</b> titik bergerak dari A ke B ke " + arahG + " di sepanjang keluk " + nama + ", iaitu <b>" + kecil(j.gerak[arahG].istilah) + "</b>.</p>"
      : "<p><b>Dalam graf ini:</b> titik belum digerakkan. Seret titik A di sepanjang keluk.</p>";
    blok.push({
      jenis: "tip",
      konsep: "gerak",
      tajuk: "Pergerakan di sepanjang keluk",
      html:
        "<p>" + j.gerak.sebab + "</p>" +
        senarai(["<b>" + j.gerak.atas.istilah + "</b>: " + j.gerak.atas.ayat, "<b>" + j.gerak.bawah.istilah + "</b>: " + j.gerak.bawah.ayat]) +
        dalamGraf
    });

    // peralihan keluk
    var alih = T.istilahAlih(k);
    var faktor = j.alih.faktor();
    var htmlAlih = "<p>" + j.alih.sebab + "</p>" + senarai(["<b>" + j.alih.kanan.istilah + "</b>: " + j.alih.kanan.ayat, "<b>" + j.alih.kiri.istilah + "</b>: " + j.alih.kiri.ayat]);
    if (alih) {
      var kumpulan = faktor[alih === j.alih.kanan ? 0 : 1];
      htmlAlih +=
        "<p><b>Dalam graf ini:</b> " + asas + "₀ → " + asas + "₁ ialah <b>" + kecil(alih.istilah) + "</b>.</p>" +
        (kumpulan ? "<p>" + (j.alih.faktorTajuk || "Antara faktor bukan harga yang boleh menyebabkannya:") + "</p>" + senaraiFaktor(kumpulan) : "");
    } else {
      htmlAlih += "<p><b>Dalam graf ini:</b> keluk belum beralih. Seret keseluruhan keluk ke kiri atau ke kanan.</p>";
      faktor.forEach(function (kum) {
        htmlAlih += "<details class=\"bina-faktor\"><summary>" + esc(kum.label) + "</summary>" + senaraiFaktor(kum) + "</details>";
      });
    }
    if (j.alih.nota) htmlAlih += "<p class=\"teks-lemah\">" + j.alih.nota + "</p>";
    blok.push({ jenis: "fokus", konsep: "alih", tajuk: "Peralihan keluk", html: htmlAlih });

    // kesan terhadap keseimbangan pasaran (hanya jika keluk ini sebahagian pasangan D/S)
    var imbang = T.keseimbangan(graf, k.id);
    if (imbang) blok.push(imbang);
    var anjal = T.keanjalan(graf, k.id);
    if (anjal) blok.push(anjal);

    return { tajuk: j.nama + " (" + nama + ")", jenis: j.id, blok: tapis(blok, mod), cadangan: [] };
  };
})();
