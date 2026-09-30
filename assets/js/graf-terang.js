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
    definisi:
      "<b>Permintaan</b> merujuk kepada keinginan dan kemampuan seseorang individu untuk membeli sesuatu barang atau perkhidmatan pada suatu tingkat harga tertentu dan dalam jangka masa tertentu.",
    hubungan: "Keluk ini menunjukkan hubungan <b>songsang (negatif)</b> antara harga dan kuantiti diminta, <i>ceteris paribus</i>.",
    hukum: ["Harga meningkat → kuantiti diminta menurun.", "Harga menurun → kuantiti diminta meningkat."],
    gerak: {
      sebab: "Berlaku apabila <b>harga barang itu sendiri</b> berubah. Ini ialah perubahan dalam <b>kuantiti diminta</b>.",
      atas: { istilah: "Penguncupan permintaan", ayat: "Harga naik, maka kuantiti diminta berkurang. Titik bergerak ke atas di sepanjang keluk permintaan yang sama." },
      bawah: { istilah: "Pengembangan permintaan", ayat: "Harga turun, maka kuantiti diminta bertambah. Titik bergerak ke bawah di sepanjang keluk permintaan yang sama." }
    },
    alih: {
      sebab: "Berlaku apabila <b>faktor bukan harga</b> berubah. Ini ialah perubahan dalam <b>permintaan</b>; keseluruhan keluk beralih.",
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
    definisi:
      "<b>Penawaran</b> merujuk kepada kuantiti sesuatu barang atau perkhidmatan yang sanggup dan mampu dikeluarkan oleh pengeluar atau firma pada suatu tingkat harga tertentu dalam tempoh masa tertentu.",
    hubungan: "Keluk ini menunjukkan hubungan <b>positif</b> antara harga dan kuantiti ditawarkan, <i>ceteris paribus</i>.",
    hukum: ["Harga meningkat → kuantiti ditawarkan meningkat.", "Harga menurun → kuantiti ditawarkan menurun."],
    gerak: {
      sebab: "Berlaku apabila <b>harga barang itu sendiri</b> berubah. Ini ialah perubahan dalam <b>kuantiti ditawarkan</b>.",
      atas: { istilah: "Pengembangan penawaran", ayat: "Harga naik, maka kuantiti ditawarkan bertambah. Titik bergerak ke atas di sepanjang keluk penawaran yang sama." },
      bawah: { istilah: "Penguncupan penawaran", ayat: "Harga turun, maka kuantiti ditawarkan berkurang. Titik bergerak ke bawah di sepanjang keluk penawaran yang sama." }
    },
    alih: {
      sebab: "Berlaku apabila <b>faktor bukan harga</b> berubah. Ini ialah perubahan dalam <b>penawaran</b>; keseluruhan keluk beralih.",
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
    var arah = B.arahAnjak(k.anjak);
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
    var paksiPasaran = RE_HARGA.test(graf.paksi.y.label || "") && RE_KUANTITI.test(graf.paksi.x.label || "");
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
        if (paksiPasaran) {
          skor += 0.1;
          sebab.push("paksi harga dan kuantiti");
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

  /* ---------- penerangan ---------- */
  function senarai(items) {
    return "<ul>" + items.map(function (s) {
      return "<li>" + s + "</li>";
    }).join("") + "</ul>";
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
      ? "<p><b>Dalam graf ini:</b> titik bergerak dari A ke B ke " + arahG + " di sepanjang keluk " + nama + ", iaitu <b>" + j.gerak[arahG].istilah.toLowerCase() + "</b>.</p>"
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
        "<p><b>Dalam graf ini:</b> " + asas + "₀ → " + asas + "₁ ialah <b>" + alih.istilah.toLowerCase() + "</b>.</p>" +
        (kumpulan ? "<p>Antara faktor bukan harga yang boleh menyebabkannya:</p>" + senaraiFaktor(kumpulan) : "");
    } else {
      htmlAlih += "<p><b>Dalam graf ini:</b> keluk belum beralih. Seret keseluruhan keluk ke kiri atau ke kanan.</p>";
      faktor.forEach(function (kum) {
        htmlAlih += "<details class=\"bina-faktor\"><summary>" + esc(kum.label) + "</summary>" + senaraiFaktor(kum) + "</details>";
      });
    }
    blok.push({ jenis: "fokus", konsep: "alih", tajuk: "Peralihan keluk", html: htmlAlih });

    return { tajuk: j.nama + " (" + nama + ")", jenis: j.id, blok: tapis(blok, mod), cadangan: [] };
  };
})();
