/* =========================================================
   Econ Tutor · latihan senario graf (EKO.senario)
   Fungsi tulen tanpa DOM: boleh diuji dalam Node.

   Kandungan soalan ialah data (assets/js/data/senario-*.js), bukan kod UI:
   EKO.senario.daftar({
     id, bab?, no?, tajuk, soalan, petunjuk?,
     graf: "d" | "s" | "ds",                  // graf awal: permintaan, penawaran, atau pasaran
     paksi?: { x: "…", y: "…" },
     jawapan: { tindakan: "anjak" | "gerak", keluk: "permintaan" | "penawaran", arah: "kanan" | "kiri" | "atas" | "bawah" }
            | [ {…}, {…} ],                    // lebih daripada satu keluk berubah
     maklumBalas: { betul, salahGerak?, salahAnjak?, salahArah?, salahKeluk?, belumLengkap?, tiadaTindakan? }
   });
   Semakan berasaskan peraturan: keadaan akhir graf (anjakan setiap keluk, pergerakan titik)
   dibandingkan dengan jawapan. Tiada AI.
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var B = E.bina;
  var SN = (E.senario = {});

  var daftar = {};
  var tertib = [];
  var MIN_ANJAK = 0.02; // anjakan < 2% paksi dianggap tidak sengaja
  var MIN_GERAK = 0.02; // pergerakan titik < 2% panjang keluk dianggap tidak sengaja

  function senaraiJawapan(sn) {
    return Array.isArray(sn.jawapan) ? sn.jawapan : [sn.jawapan];
  }

  SN.daftar = function (sn) {
    if (!sn || !sn.id || !sn.soalan || !sn.jawapan || !/^(d|s|ds)$/.test(sn.graf || "")) {
      throw new Error("Senario tidak lengkap: " + (sn && sn.id));
    }
    senaraiJawapan(sn).forEach(function (j) {
      var ok =
        (j.tindakan === "anjak" && (j.arah === "kanan" || j.arah === "kiri")) ||
        (j.tindakan === "gerak" && (j.arah === "atas" || j.arah === "bawah"));
      if (!ok || (j.keluk !== "permintaan" && j.keluk !== "penawaran")) throw new Error("Jawapan senario tidak sah: " + sn.id);
      if (sn.graf.indexOf(j.keluk === "permintaan" ? "d" : "s") === -1) throw new Error("Keluk jawapan tiada dalam graf: " + sn.id);
    });
    if (!daftar[sn.id]) tertib.push(sn.id);
    daftar[sn.id] = sn;
  };
  SN.dapat = function (id) {
    return daftar[id] || null;
  };
  SN.senarai = function () {
    return tertib.map(function (id) {
      return daftar[id];
    });
  };

  // Graf awal senario: keluk konsep dengan jenis yang diketahui
  SN.grafAwal = function (sn) {
    var g = B.buatGraf({ paksi: sn.paksi ? { x: { label: sn.paksi.x }, y: { label: sn.paksi.y } } : null });
    if (sn.graf.indexOf("d") !== -1) {
      g = B.tambahKeluk(g, { label: "D", warna: "d", titik: B.TEMPLAT["menurun-cembung"].titik, s: 0.42, jenis: "permintaan", sumber: "senario" });
    }
    if (sn.graf.indexOf("s") !== -1) {
      g = B.tambahKeluk(g, { label: "S", warna: "s", titik: B.TEMPLAT.menaik.titik, s: 0.45, jenis: "penawaran", sumber: "senario" });
    }
    return g;
  };

  // Tindakan pelajar yang kelihatan dalam graf: [{ tindakan, keluk (jenis), id, arah }]
  SN.tindakan = function (graf) {
    var out = [];
    graf.keluk.forEach(function (k) {
      if (!k.jenis) return;
      if (Math.abs(k.anjak.x) >= MIN_ANJAK) out.push({ tindakan: "anjak", keluk: k.jenis, id: k.id, arah: k.anjak.x > 0 ? "kanan" : "kiri" });
      else if (Math.abs(k.anjak.y) >= MIN_ANJAK) out.push({ tindakan: "anjak", keluk: k.jenis, id: k.id, arah: k.anjak.y > 0 ? "atas" : "bawah" });
      var t = B.titikKeluk(graf, k.id);
      if (t && Math.abs(t.s - t.sAwal) >= MIN_GERAK) {
        var poli = B.laluan(k);
        var a = B.titikPadaS(poli, t.sAwal),
          b = B.titikPadaS(poli, t.s);
        if (Math.abs(b[1] - a[1]) > 0.002) out.push({ tindakan: "gerak", keluk: k.jenis, id: k.id, arah: b[1] > a[1] ? "atas" : "bawah" });
      }
    });
    return out;
  };

  function namaJenis(jenis) {
    var j = E.jenisKeluk && E.jenisKeluk.dapat(jenis);
    return j ? j.pendek : jenis;
  }

  // Maklum balas lalai bagi setiap kod (kandungan senario boleh menggantikannya)
  function mesejLalai(kod, j) {
    var n = namaJenis(j.keluk);
    switch (kod) {
      case "salahGerak":
        return "Situasi ini melibatkan faktor bukan harga, jadi <b>keseluruhan keluk " + n + "</b> perlu beralih. Menggerakkan titik di sepanjang keluk hanya menunjukkan perubahan harga barang itu sendiri.";
      case "salahAnjak":
        return "Perubahan <b>harga barang itu sendiri</b> menyebabkan <b>pergerakan di sepanjang keluk " + n + "</b>, bukan peralihan keluk. Kembalikan keluk (Cuba semula) dan gerakkan titik.";
      case "salahArah":
        return j.tindakan === "anjak"
          ? "Keluk " + n + " perlu beralih ke arah yang lain. Fikirkan sama ada " + n + " bertambah atau berkurang."
          : "Arah pergerakan belum tepat. Fikirkan sama ada harga naik atau turun.";
      case "salahKeluk":
        return "Keluk yang berubah belum tepat. Situasi ini mempengaruhi keluk <b>" + n + "</b> sahaja.";
      case "belumLengkap":
        return "Hampir betul, tetapi belum lengkap. Situasi ini mempengaruhi lebih daripada satu keluk.";
      case "tiadaTindakan":
        return "Belum ada perubahan pada graf. Pilih mod yang sesuai, kemudian ubah graf.";
    }
    return "";
  }

  // Semak graf pelajar. Pulang { betul, kod, mesej, jangka (jawapan berkaitan), tindakan }
  SN.semak = function (sn, graf) {
    var J = senaraiJawapan(sn);
    var T = SN.tindakan(graf);
    var anjakS = T.filter(function (t) {
      return t.tindakan === "anjak";
    });
    var gerakS = T.filter(function (t) {
      return t.tindakan === "gerak";
    });
    var anjakJ = J.filter(function (j) {
      return j.tindakan === "anjak";
    });

    function hasil(kod, j) {
      var mb = sn.maklumBalas || {};
      return { betul: kod === "betul", kod: kod, mesej: mb[kod] || mesejLalai(kod, j || J[0]), jangka: j || J[0], tindakan: T };
    }
    function cari(senarai, jenis) {
      for (var i = 0; i < senarai.length; i++) if (senarai[i].keluk === jenis) return senarai[i];
      return null;
    }

    if (!T.length) return hasil("tiadaTindakan");

    if (anjakJ.length) {
      var tepat = 0;
      for (var i = 0; i < anjakJ.length; i++) {
        var j = anjakJ[i];
        var s = cari(anjakS, j.keluk);
        if (!s) {
          if (tepat > 0 || anjakS.some(function (x) {
            return cari(anjakJ, x.keluk) && cari(anjakJ, x.keluk).arah === x.arah;
          })) return hasil("belumLengkap", j);
          if (!anjakS.length && gerakS.length) return hasil("salahGerak", j);
          if (anjakS.length) return hasil("salahKeluk", j);
          return hasil("tiadaTindakan", j);
        }
        if (s.arah !== j.arah) return hasil("salahArah", j);
        tepat++;
      }
      // keluk lain yang tidak sepatutnya beralih
      var lebih = anjakS.filter(function (x) {
        return !cari(anjakJ, x.keluk);
      });
      if (lebih.length) return hasil("salahKeluk", anjakJ[0]);
      return hasil("betul");
    }

    // jawapan: pergerakan di sepanjang keluk
    var jg = J[0];
    if (anjakS.length) return hasil("salahAnjak", jg);
    var sg = cari(gerakS, jg.keluk);
    if (!sg) return hasil(gerakS.length ? "salahKeluk" : "tiadaTindakan", jg);
    if (sg.arah !== jg.arah) return hasil("salahArah", jg);
    return hasil("betul");
  };
})();
