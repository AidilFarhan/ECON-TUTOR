/* =========================================================
   Econ Tutor · Kalkulator Ekonomi
   Semua rumus dan pengiraan dalam silibus Ekonomi KSSM T4 & T5, STPM serta Matrikulasi.
   Setiap kalkulator memaparkan jawapan, jalan kira dan tafsiran.
   Nilai awal ialah contoh daripada nota (buku teks) jika ada.
   Laluan: #kalkulator, #kalkulator-t4, #kalkulator-t4-b2, #kalkulator-<id>
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var esc = E.esc;

  /* ---------- pembantu format ---------- */
  function nom(v, dp) {
    return E.fmt(v, dp == null ? 2 : dp);
  }
  // Nombor dalam kurungan jika negatif, contoh 12 − (−3)
  function kr(v, dp) {
    return v < 0 ? "(" + nom(v, dp) + ")" : nom(v, dp);
  }
  // RM tanpa sen jika nilai bulat: RM80 000, RM1 377.78, RM0.60
  function wang(v) {
    if (v == null || !isFinite(v)) return "–";
    return Math.abs(E.bundar(v, 2) % 1) < 1e-9 ? E.rm(v, 0) : E.rm(v, 2, true);
  }
  function pc(v, dp) {
    return nom(v, dp) + "%";
  }
  // Peratus dalam kurungan jika negatif, contoh −10% ÷ (−20%)
  function krp(v, dp) {
    return v < 0 ? "(" + pc(v, dp) + ")" : pc(v, dp);
  }
  // Kadar pertukaran: 4 tempat perpuluhan jika perlu (RM4.4290), jika tidak 2 (RM4.30)
  function kadar(v) {
    return "RM" + (sama(E.bundar(v, 2), v) ? E.fmt(v, 2, true) : E.fmt(v, 4, true));
  }
  function frac(a, b) {
    return '<span class="pecahan"><span>' + a + "</span><span>" + b + "</span></span>";
  }
  // Jumlah mata wang asing: USD500, USD477.27
  function mw(kod, v) {
    return kod + (sama(E.bundar(v, 2) % 1, 0) ? E.fmt(v, 0) : E.fmt(v, 2, true));
  }
  // Satu jawapan: label, nilai, kelas status (pilihan), keterangan kecil (pilihan)
  function H(l, v, s, ket) {
    return { l: l, v: v, s: s || "", ket: ket || "" };
  }
  // Baris ayat ekonomi di atas setiap langkah jalan kira: maksud pengangka dan penyebut
  function ay(t) {
    return '<span class="kalk-ayat">' + t + "</span>";
  }
  function sama(a, b) {
    return Math.abs(a - b) < 1e-9;
  }
  function jumlah(arr) {
    return arr.reduce(function (a, b) {
      return a + (b || 0);
    }, 0);
  }

  var K = [];
  function tambah(k) {
    K.push(k);
  }

  /* =========================================================
     TINGKATAN 4 · BAB 1 · Pengenalan kepada Ekonomi
     ========================================================= */
  tambah({
    id: "kos-lepas",
    bab: "t4-b1",
    no: "1.1.7",
    tajuk: "Kos lepas pada keluk kemungkinan pengeluaran (KKP)",
    kunci: "kkp kecerunan pakaian makanan pilihan korban",
    rumus: ["Kos lepas = " + frac("Perubahan unit barang yang dikorbankan", "Perubahan unit barang yang ditambah")],
    petunjuk: "Contoh buku teks (Jadual 1.2): barang X = pakaian (ribu helai), barang Y = makanan (tan metrik).",
    medan: [
      { k: "x0", l: "Barang X di titik asal" },
      { k: "y0", l: "Barang Y di titik asal" },
      { k: "x1", l: "Barang X di titik baharu" },
      { k: "y1", l: "Barang Y di titik baharu" }
    ],
    contoh: [
      { n: "T → U", v: { x0: 8, y0: 17, x1: 12, y1: 13 } },
      { n: "S → T", v: { x0: 4, y0: 19, x1: 8, y1: 17 } },
      { n: "U → V", v: { x0: 12, y0: 13, x1: 16, y1: 0 } }
    ],
    kira: kiraKosLepas
  });

  // Kos lepas di antara dua titik KKP (dikongsi oleh kalkulator T4 dan STPM).
  function kiraKosLepas(x) {
    var dx = x.x1 - x.x0;
    var dy = x.y1 - x.y0;
    if (dx === 0) return { ralat: "Perubahan barang X tidak boleh sifar." };
    var c = dy / dx;
    var L = [
      ay("Perubahan barang Y = kuantiti Y di titik baharu − kuantiti Y di titik asal") + "Perubahan barang Y = " + nom(x.y1) + " − " + kr(x.y0) + " = " + nom(dy),
      ay("Perubahan barang X = kuantiti X di titik baharu − kuantiti X di titik asal") + "Perubahan barang X = " + nom(x.x1) + " − " + kr(x.x0) + " = " + nom(dx),
      ay("Kecerunan KKP = perubahan barang Y (pengangka) ÷ perubahan barang X (penyebut)") + "Kecerunan KKP = " + nom(dy) + " ÷ " + kr(dx) + " = <b>" + nom(c) + "</b>"
    ];
    var out = {
      hasil: [H("Kecerunan KKP", nom(c)), H("Kos lepas 1 unit X", nom(Math.abs(c)) + " unit Y"), H("Kos lepas 1 unit Y", dy !== 0 ? nom(Math.abs(dx / dy)) + " unit X" : "–")],
      langkah: L
    };
    if ((dx > 0 && dy < 0) || (dx < 0 && dy > 0)) {
      var tambahX = dx > 0;
      L.push(
        tambahX
          ? ay("Kos lepas 1 unit X = unit Y yang dikorbankan ÷ unit X yang ditambah") + "Menambah " + nom(dx) + " unit X mengorbankan " + nom(-dy) + " unit Y, maka kos lepas 1 unit X = " + nom(-dy) + " ÷ " + nom(dx) + " = <b>" + nom(Math.abs(c)) + " unit Y</b>"
          : ay("Kos lepas 1 unit Y = unit X yang dikorbankan ÷ unit Y yang ditambah") + "Menambah " + nom(dy) + " unit Y mengorbankan " + nom(-dx) + " unit X, maka kos lepas 1 unit Y = " + nom(-dx) + " ÷ " + nom(dy) + " = <b>" + nom(Math.abs(dx / dy)) + " unit X</b>"
      );
      out.nota = "Tanda negatif menunjukkan KKP mencerun ke bawah dari kiri ke kanan: untuk menambah satu barang, sebahagian barang lain terpaksa dikorbankan.";
    } else {
      out.amaran = "Kedua-dua barang tidak berubah secara bertentangan. Ini bukan pergerakan di sepanjang KKP (mungkin titik asal di dalam keluk atau KKP beralih).";
    }
    return out;
  }

  /* =========================================================
     TINGKATAN 4 · BAB 2 · Pasaran
     ========================================================= */
  tambah({
    id: "pasaran",
    bab: "t4-b2",
    no: "2.1.2",
    tajuk: "Permintaan dan penawaran pasaran",
    kunci: "jumlah mendatar individu firma keluk pasaran landai",
    rumus: ["Kuantiti pasaran = Q<sub>A</sub> + Q<sub>B</sub> + Q<sub>C</sub> + … (pada setiap tingkat harga)"],
    petunjuk: "Guna untuk permintaan (pembeli) atau penawaran (firma). Lajur C boleh dibiarkan kosong.",
    medan: [
      {
        k: "j",
        jenis: "jadual",
        lajur: [
          { k: "p", l: "Harga (RM)" },
          { k: "a", l: "Q A" },
          { k: "b", l: "Q B" },
          { k: "c", l: "Q C", opsyenal: true },
          { k: "pasaran", l: "Q pasaran", hasil: true }
        ]
      }
    ],
    contoh: [
      { n: "Baju kemeja (Jadual 2.2)", v: { j: [[50, 1, 2, ""], [40, 2, 3, ""], [30, 3, 4, ""], [20, 4, 5, ""]] } },
      { n: "Beg galas (Jadual 2.6)", v: { j: [[15, 20, 10, ""], [30, 25, 15, ""], [45, 30, 20, ""], [60, 35, 25, ""]] } }
    ],
    kira: function (x) {
      var sel = [];
      var L = [];
      x.j.forEach(function (r) {
        if (r.p == null || r.a == null || r.b == null) {
          sel.push("–");
          return;
        }
        var q = r.a + r.b + (r.c || 0);
        sel.push(nom(q));
        L.push(ay("Kuantiti pasaran = jumlah kuantiti setiap individu atau firma pada harga yang sama") + "Harga " + wang(r.p) + ": " + nom(r.a) + " + " + nom(r.b) + (r.c != null ? " + " + nom(r.c) : "") + " = <b>" + nom(q) + " unit</b>");
      });
      var sah = x.j.filter(function (r) {
        return r.p != null && r.a != null && r.b != null;
      });
      var nota = "";
      if (sah.length >= 2) {
        var naik = sah[sah.length - 1].p > sah[0].p;
        var qAwal = sah[0].a + sah[0].b + (sah[0].c || 0);
        var qAkhir = sah[sah.length - 1].a + sah[sah.length - 1].b + (sah[sah.length - 1].c || 0);
        var searah = naik ? qAkhir > qAwal : qAkhir < qAwal;
        nota = searah
          ? "Kuantiti bertambah apabila harga naik: ini <b>penawaran pasaran</b>. Keluk penawaran pasaran lebih landai daripada keluk setiap firma."
          : "Kuantiti berkurang apabila harga naik: ini <b>permintaan pasaran</b>. Keluk permintaan pasaran lebih landai daripada keluk individu.";
      }
      return { sel: { pasaran: sel }, langkah: L, nota: nota };
    }
  });

  tambah({
    id: "keseimbangan",
    bab: "t4-b2",
    no: "2.1.12",
    tajuk: "Keseimbangan pasaran, lebihan permintaan dan lebihan penawaran",
    kunci: "keseimbangan lebihan kekurangan qd qs harga keseimbangan ketidakseimbangan",
    rumus: ["Lebihan = Kuantiti diminta (Qd) − Kuantiti ditawarkan (Qs)", "Keseimbangan: Qd = Qs"],
    petunjuk: "Jadual 2.7: seluar sukan, kuantiti dalam ribu helai.",
    medan: [
      {
        k: "j",
        jenis: "jadual",
        lajur: [
          { k: "p", l: "Harga (RM)" },
          { k: "qd", l: "Qd" },
          { k: "qs", l: "Qs" },
          { k: "beza", l: "Qd − Qs", hasil: true },
          { k: "keadaan", l: "Keadaan", hasil: true, teks: true }
        ]
      }
    ],
    contoh: [{ n: "Seluar sukan (Jadual 2.7)", v: { j: [[10, 15, 3], [20, 12, 6], [30, 9, 9], [40, 6, 12], [50, 3, 15]] } }],
    kira: function (x) {
      var beza = [];
      var keadaan = [];
      var L = [];
      var eq = null;
      var sah = [];
      x.j.forEach(function (r) {
        if (r.p == null || r.qd == null || r.qs == null) {
          beza.push("–");
          keadaan.push("–");
          return;
        }
        var b = r.qd - r.qs;
        sah.push({ p: r.p, qd: r.qd, qs: r.qs, b: b });
        beza.push(nom(b));
        var k = b > 0 ? "Lebihan permintaan" : b < 0 ? "Lebihan penawaran" : "Keseimbangan";
        keadaan.push(k);
        if (b === 0 && !eq) eq = r;
        L.push(ay("Beza = kuantiti diminta − kuantiti ditawar (positif: lebihan permintaan; negatif: lebihan penawaran)") + wang(r.p) + ": " + nom(r.qd) + " − " + nom(r.qs) + " = " + nom(b) + " → " + (b > 0 ? "lebihan permintaan " + nom(b) + ", harga cenderung naik" : b < 0 ? "lebihan penawaran " + nom(-b) + ", harga cenderung turun" : "<b>keseimbangan</b>"));
      });
      var out = { sel: { beza: beza, keadaan: keadaan }, langkah: L };
      if (eq) {
        out.hasil = [H("Harga keseimbangan", wang(eq.p), "baik"), H("Kuantiti keseimbangan", nom(eq.qd))];
      } else {
        for (var i = 1; i < sah.length; i++) {
          if ((sah[i - 1].b > 0) !== (sah[i].b > 0)) {
            out.nota = "Tiada baris dengan Qd = Qs. Harga keseimbangan terletak antara " + wang(sah[i - 1].p) + " dan " + wang(sah[i].p) + ".";
            break;
          }
        }
      }
      if (!out.nota) out.nota = "Pada harga di bawah harga keseimbangan berlaku lebihan permintaan; pada harga di atasnya berlaku lebihan penawaran.";
      return out;
    }
  });

  function jenisAnjal(a) {
    a = E.bundar(Math.abs(a), 6);
    if (a === 0) return H("Jenis", "Tak anjal sempurna", "merah");
    if (a < 1) return H("Jenis", "Tak anjal", "amaran");
    if (a === 1) return H("Jenis", "Anjal uniti", "neutral");
    return H("Jenis", "Anjal", "biru");
  }

  tambah({
    id: "ed",
    bab: "t4-b2",
    no: "2.2.2",
    tajuk: "Keanjalan harga permintaan (Ed) dan jumlah hasil",
    kunci: "ed keanjalan elastik anjal tak anjal jumlah hasil tr strategi harga",
    rumus: [
      "Ed = " + frac("% perubahan kuantiti diminta (%ΔQ)", "% perubahan harga (%ΔP)"),
      "%ΔQ = " + frac("Q₁ − Q₀", "Q₀") + " × 100",
      "%ΔP = " + frac("P₁ − P₀", "P₀") + " × 100",
      "Jumlah hasil (TR) = P × Q"
    ],
    medan: [
      { k: "p0", l: "Harga asal P₀ (RM)" },
      { k: "p1", l: "Harga baharu P₁ (RM)" },
      { k: "q0", l: "Kuantiti asal Q₀" },
      { k: "q1", l: "Kuantiti baharu Q₁" }
    ],
    contoh: [
      { n: "RM5 → RM6", v: { p0: 5, p1: 6, q0: 20, q1: 18 } },
      { n: "RM20 → RM16", v: { p0: 20, p1: 16, q0: 60, q1: 90 } },
      { n: "RM40 → RM72", v: { p0: 40, p1: 72, q0: 100, q1: 80 } }
    ],
    kira: function (x) {
      if (x.q0 === 0 || x.p0 === 0) return { ralat: "Harga asal dan kuantiti asal tidak boleh sifar." };
      var dq = ((x.q1 - x.q0) / x.q0) * 100;
      var dp = ((x.p1 - x.p0) / x.p0) * 100;
      var L = [
        ay("%ΔQ = (kuantiti baharu − kuantiti asal) ÷ kuantiti asal × 100") + "%ΔQ = (" + nom(x.q1) + " − " + nom(x.q0) + ") ÷ " + nom(x.q0) + " × 100 = " + pc(dq),
        ay("%ΔP = (harga baharu − harga asal) ÷ harga asal × 100") + "%ΔP = (" + nom(x.p1) + " − " + nom(x.p0) + ") ÷ " + nom(x.p0) + " × 100 = " + pc(dp)
      ];
      var tr0 = x.p0 * x.q0;
      var tr1 = x.p1 * x.q1;
      var dtr = tr1 - tr0;
      var baris = [
        ay("Jumlah hasil (TR) asal = harga asal × kuantiti asal") + "TR asal = " + wang(x.p0) + " × " + nom(x.q0) + " = " + wang(tr0),
        ay("TR baharu = harga baharu × kuantiti baharu") + "TR baharu = " + wang(x.p1) + " × " + nom(x.q1) + " = " + wang(tr1),
        ay("Perubahan TR = TR baharu − TR asal") + "Perubahan TR = " + wang(tr1) + " − " + wang(tr0) + " = <b>" + wang(dtr) + "</b>"
      ];
      if (dp === 0) {
        if (dq === 0) return { ralat: "Harga dan kuantiti tidak berubah. Tukar sekurang-kurangnya satu nilai." };
        return { hasil: [H("Ed", "∞"), H("Jenis", "Anjal sempurna", "baik")], langkah: L.concat(["Harga tidak berubah tetapi kuantiti berubah, maka Ed = ∞"]).concat(baris) };
      }
      var ed = dq / dp;
      var a = Math.abs(ed);
      L.push(ay("Ed = peratus perubahan kuantiti diminta (pengangka) ÷ peratus perubahan harga (penyebut)") + "Ed = " + pc(dq) + " ÷ " + krp(dp) + " = " + nom(ed) + (ed < 0 ? ", dinyatakan sebagai <b>" + nom(a) + "</b>" : ""));
      L = L.concat(baris);
      var out = {
        hasil: [H("Ed", nom(a)), jenisAnjal(a), H("Perubahan TR", (dtr > 0 ? "+" : "") + wang(dtr))],
        langkah: L
      };
      var ab = E.bundar(a, 6);
      var arahP = dp > 0 ? "naik" : "turun";
      var arahTR = dtr > 0 ? "naik" : dtr < 0 ? "turun" : "tidak berubah";
      if (ab > 1) out.nota = "Permintaan anjal: harga dan TR berubah secara <b>bertentangan</b>. Harga " + arahP + ", TR " + arahTR + ". Strategi: turunkan harga untuk menambah TR.";
      else if (ab < 1) out.nota = "Permintaan tak anjal: harga dan TR berubah secara <b>searah</b>. Harga " + arahP + ", TR " + arahTR + ". Strategi: naikkan harga untuk menambah TR.";
      else out.nota = "Permintaan anjal uniti: perubahan harga tidak mengubah TR.";
      if (ed > 0) out.amaran = "Harga dan kuantiti diminta berubah searah. Ini tidak mematuhi hukum permintaan; semak semula nilai.";
      return out;
    }
  });

  tambah({
    id: "ed-cari",
    bab: "t4-b2",
    no: "2.2.2",
    tajuk: "Cari kuantiti atau harga baharu daripada nilai keanjalan",
    kunci: "ed es songsang cari nilai x kuantiti baharu harga baharu keanjalan diberi",
    rumus: ["%ΔQ = Keanjalan × %ΔP", "Q₁ = Q₀ × (1 + %ΔQ ÷ 100) &nbsp;&nbsp; P₁ = P₀ × (1 + %ΔP ÷ 100)"],
    petunjuk: "Soalan jenis “harga jatuh dan Ed ialah 1.5, berapakah nilai X?”",
    medan: [
      {
        k: "jenis",
        jenis: "pilih",
        l: "Keanjalan",
        pilihan: [
          ["d", "Permintaan (Ed)"],
          ["s", "Penawaran (Es)"]
        ]
      },
      {
        k: "cari",
        jenis: "pilih",
        l: "Cari",
        pilihan: [
          ["q1", "Kuantiti baharu Q₁"],
          ["p1", "Harga baharu P₁"]
        ]
      },
      { k: "e", l: "Nilai keanjalan" },
      { k: "p0", l: "Harga asal P₀ (RM)" },
      { k: "q0", l: "Kuantiti asal Q₀" },
      {
        k: "p1",
        l: "Harga baharu P₁ (RM)",
        bila: function (x) {
          return x.cari === "q1";
        }
      },
      {
        k: "q1",
        l: "Kuantiti baharu Q₁",
        bila: function (x) {
          return x.cari === "p1";
        }
      }
    ],
    contoh: [
      { n: "Harga turun, Ed 1.5", v: { jenis: "d", cari: "q1", e: 1.5, p0: 10, q0: 100, p1: 8, q1: 130 } },
      { n: "Cari harga, Es 5", v: { jenis: "s", cari: "p1", e: 5, p0: 50, q0: 150, p1: 52, q1: 180 } }
    ],
    kira: function (x) {
      var d = x.jenis === "d";
      var nama = d ? "Ed" : "Es";
      if (x.p0 === 0 || x.q0 === 0) return { ralat: "Harga asal dan kuantiti asal tidak boleh sifar." };
      if (x.e < 0) return { ralat: "Masukkan nilai keanjalan sebagai nombor positif (nilai mutlak)." };
      var L = [];
      if (x.cari === "q1") {
        var dp = ((x.p1 - x.p0) / x.p0) * 100;
        var dq = (d ? -1 : 1) * x.e * dp;
        var q1 = x.q0 * (1 + dq / 100);
        L.push(ay("%ΔP = (harga baharu − harga asal) ÷ harga asal × 100") + "%ΔP = (" + nom(x.p1) + " − " + nom(x.p0) + ") ÷ " + nom(x.p0) + " × 100 = " + pc(dp));
        L.push(ay("Peratus perubahan kuantiti = nilai keanjalan × peratus perubahan harga") + nama + " = %ΔQ ÷ %ΔP, maka %ΔQ = " + nom(x.e) + " × " + pc(Math.abs(dp)) + " = " + pc(Math.abs(dq)) + (d ? " (arah bertentangan dengan harga)" : " (searah dengan harga)"));
        L.push("%ΔQ = " + pc(dq));
        L.push(ay("Kuantiti baharu = kuantiti asal × (1 + peratus perubahan kuantiti ÷ 100)") + "Q₁ = " + nom(x.q0) + " × (1 + " + kr(dq) + " ÷ 100) = <b>" + nom(q1) + "</b>");
        if (q1 < 0) return { ralat: "Kuantiti baharu menjadi negatif. Semak nilai keanjalan dan harga." };
        return { hasil: [H("Kuantiti baharu Q₁", nom(q1)), H("%ΔQ", pc(dq))], langkah: L };
      }
      if (x.e === 0) return { ralat: "Keanjalan sifar: harga tidak dapat dicari daripada perubahan kuantiti." };
      var dq2 = ((x.q1 - x.q0) / x.q0) * 100;
      var dp2 = ((d ? -1 : 1) * dq2) / x.e;
      var p1 = x.p0 * (1 + dp2 / 100);
      L.push(ay("%ΔQ = (kuantiti baharu − kuantiti asal) ÷ kuantiti asal × 100") + "%ΔQ = (" + nom(x.q1) + " − " + nom(x.q0) + ") ÷ " + nom(x.q0) + " × 100 = " + pc(dq2));
      L.push(ay("Peratus perubahan harga = peratus perubahan kuantiti ÷ nilai keanjalan") + nama + " = %ΔQ ÷ %ΔP, maka %ΔP = " + pc(Math.abs(dq2)) + " ÷ " + nom(x.e) + " = " + pc(Math.abs(dp2)) + (d ? " (arah bertentangan dengan kuantiti)" : " (searah dengan kuantiti)"));
      L.push("%ΔP = " + pc(dp2));
      L.push(ay("Harga baharu = harga asal × (1 + peratus perubahan harga ÷ 100)") + "P₁ = " + wang(x.p0) + " × (1 + " + kr(dp2) + " ÷ 100) = <b>" + wang(p1) + "</b>");
      return { hasil: [H("Harga baharu P₁", wang(p1)), H("%ΔP", pc(dp2))], langkah: L };
    }
  });

  tambah({
    id: "es",
    bab: "t4-b2",
    no: "2.2.6",
    tajuk: "Keanjalan harga penawaran (Es)",
    kunci: "es keanjalan penawaran anjal tak anjal",
    rumus: ["Es = " + frac("% perubahan kuantiti ditawarkan (%ΔQ)", "% perubahan harga (%ΔP)")],
    medan: [
      { k: "p0", l: "Harga asal P₀ (RM)" },
      { k: "p1", l: "Harga baharu P₁ (RM)" },
      { k: "q0", l: "Kuantiti ditawarkan asal Q₀" },
      { k: "q1", l: "Kuantiti ditawarkan baharu Q₁" }
    ],
    contoh: [{ n: "Kasut RM50 → RM52", v: { p0: 50, p1: 52, q0: 150, q1: 180 } }],
    kira: function (x) {
      if (x.q0 === 0 || x.p0 === 0) return { ralat: "Harga asal dan kuantiti asal tidak boleh sifar." };
      var dq = ((x.q1 - x.q0) / x.q0) * 100;
      var dp = ((x.p1 - x.p0) / x.p0) * 100;
      var L = [
        ay("%ΔQ = (kuantiti ditawar baharu − kuantiti ditawar asal) ÷ kuantiti ditawar asal × 100") + "%ΔQ = (" + nom(x.q1) + " − " + nom(x.q0) + ") ÷ " + nom(x.q0) + " × 100 = " + pc(dq),
        ay("%ΔP = (harga baharu − harga asal) ÷ harga asal × 100") + "%ΔP = (" + nom(x.p1) + " − " + nom(x.p0) + ") ÷ " + nom(x.p0) + " × 100 = " + pc(dp)
      ];
      if (dp === 0) {
        if (dq === 0) return { ralat: "Harga dan kuantiti tidak berubah. Tukar sekurang-kurangnya satu nilai." };
        return { hasil: [H("Es", "∞"), H("Jenis", "Anjal sempurna", "baik")], langkah: L };
      }
      var es = dq / dp;
      L.push(ay("Es = peratus perubahan kuantiti ditawar (pengangka) ÷ peratus perubahan harga (penyebut)") + "Es = " + pc(dq) + " ÷ " + krp(dp) + " = <b>" + nom(es) + "</b>");
      var ab = E.bundar(Math.abs(es), 6);
      var out = { hasil: [H("Es", nom(es)), jenisAnjal(es)], langkah: L };
      out.nota =
        ab > 1
          ? "Penawaran anjal: kuantiti ditawarkan berubah lebih besar daripada perubahan harga."
          : ab < 1
          ? "Penawaran tak anjal: kuantiti ditawarkan berubah lebih kecil daripada perubahan harga."
          : ab === 1
          ? "Penawaran anjal uniti: peratus perubahan kuantiti sama dengan peratus perubahan harga."
          : "Penawaran tak anjal sempurna: kuantiti ditawarkan tidak berubah walaupun harga berubah.";
      if (es < 0) out.amaran = "Harga dan kuantiti ditawarkan berubah bertentangan. Ini tidak mematuhi hukum penawaran; semak semula nilai.";
      return out;
    }
  });

  tambah({
    id: "beban-cukai",
    bab: "t4-b2",
    no: "2.2.9",
    tajuk: "Beban cukai pengguna dan pengeluar",
    kunci: "cukai beban pembeli penjual hasil kerajaan cukai jualan seunit",
    rumus: [
      "Beban pengguna seunit = P₁ − P₀",
      "Beban pengeluar seunit = Cukai seunit − Beban pengguna seunit",
      "Hasil cukai kerajaan = Cukai seunit × Q₁"
    ],
    medan: [
      { k: "p0", l: "Harga sebelum cukai P₀ (RM)" },
      { k: "p1", l: "Harga selepas cukai P₁ (RM)" },
      { k: "t", l: "Cukai seunit (RM)" },
      { k: "q1", l: "Kuantiti selepas cukai Q₁" }
    ],
    contoh: [{ n: "Nilai contoh", v: { p0: 5, p1: 5.6, t: 1, q1: 80 } }],
    kira: function (x) {
      if (x.t <= 0) return { ralat: "Cukai seunit mesti lebih daripada sifar." };
      var bp = x.p1 - x.p0;
      var bf = x.t - bp;
      var L = [
        ay("Beban pengguna seunit = harga selepas cukai − harga sebelum cukai") + "Beban pengguna seunit = " + wang(x.p1) + " − " + wang(x.p0) + " = " + wang(bp),
        ay("Beban pengeluar seunit = cukai seunit − beban pengguna seunit") + "Beban pengeluar seunit = " + wang(x.t) + " − " + wang(bp) + " = " + wang(bf),
        ay("Jumlah beban pengguna = beban pengguna seunit × kuantiti selepas cukai") + "Jumlah beban pengguna = " + wang(bp) + " × " + nom(x.q1) + " = <b>" + wang(bp * x.q1) + "</b>",
        ay("Jumlah beban pengeluar = beban pengeluar seunit × kuantiti selepas cukai") + "Jumlah beban pengeluar = " + wang(bf) + " × " + nom(x.q1) + " = <b>" + wang(bf * x.q1) + "</b>",
        ay("Hasil cukai kerajaan = cukai seunit × kuantiti selepas cukai") + "Hasil cukai kerajaan = " + wang(x.t) + " × " + nom(x.q1) + " = <b>" + wang(x.t * x.q1) + "</b>"
      ];
      var out = {
        hasil: [H("Beban pengguna", wang(bp * x.q1), "", pc((bp / x.t) * 100, 1) + " daripada cukai"), H("Beban pengeluar", wang(bf * x.q1), "", pc((bf / x.t) * 100, 1) + " daripada cukai"), H("Hasil kerajaan", wang(x.t * x.q1))],
        langkah: L
      };
      if (bp < 0 || bf < 0) out.amaran = "Kenaikan harga sepatutnya antara RM0 dan cukai seunit. Semak semula nilai.";
      else if (sama(bp, bf)) out.nota = "Beban cukai dikongsi sama rata antara pengguna dan pengeluar.";
      else if (bp > bf) out.nota = "Pengguna menanggung beban lebih besar. Ini berlaku apabila permintaan <b>tak anjal</b> (contoh rokok).";
      else out.nota = "Pengeluar menanggung beban lebih besar. Ini berlaku apabila permintaan <b>anjal</b>.";
      return out;
    }
  });

  tambah({
    id: "subsidi",
    bab: "t4-b2",
    no: "2.2.9",
    tajuk: "Faedah subsidi kepada pengguna dan pengeluar",
    kunci: "subsidi faedah pembeli penjual perbelanjaan kerajaan",
    rumus: [
      "Faedah pengguna seunit = P₀ − P₁",
      "Faedah pengeluar seunit = Subsidi seunit − Faedah pengguna seunit",
      "Perbelanjaan kerajaan = Subsidi seunit × Q₁"
    ],
    medan: [
      { k: "p0", l: "Harga sebelum subsidi P₀ (RM)" },
      { k: "p1", l: "Harga selepas subsidi P₁ (RM)" },
      { k: "s", l: "Subsidi seunit (RM)" },
      { k: "q1", l: "Kuantiti selepas subsidi Q₁" }
    ],
    contoh: [{ n: "Nilai contoh", v: { p0: 3, p1: 2.4, s: 1, q1: 120 } }],
    kira: function (x) {
      if (x.s <= 0) return { ralat: "Subsidi seunit mesti lebih daripada sifar." };
      var fp = x.p0 - x.p1;
      var ff = x.s - fp;
      var L = [
        ay("Faedah pengguna seunit = harga sebelum subsidi − harga selepas subsidi") + "Faedah pengguna seunit = " + wang(x.p0) + " − " + wang(x.p1) + " = " + wang(fp),
        ay("Faedah pengeluar seunit = subsidi seunit − faedah pengguna seunit") + "Faedah pengeluar seunit = " + wang(x.s) + " − " + wang(fp) + " = " + wang(ff),
        ay("Jumlah faedah pengguna = faedah pengguna seunit × kuantiti selepas subsidi") + "Jumlah faedah pengguna = " + wang(fp) + " × " + nom(x.q1) + " = <b>" + wang(fp * x.q1) + "</b>",
        ay("Jumlah faedah pengeluar = faedah pengeluar seunit × kuantiti selepas subsidi") + "Jumlah faedah pengeluar = " + wang(ff) + " × " + nom(x.q1) + " = <b>" + wang(ff * x.q1) + "</b>",
        ay("Perbelanjaan kerajaan = subsidi seunit × kuantiti selepas subsidi") + "Perbelanjaan kerajaan = " + wang(x.s) + " × " + nom(x.q1) + " = <b>" + wang(x.s * x.q1) + "</b>"
      ];
      var out = {
        hasil: [H("Faedah pengguna", wang(fp * x.q1)), H("Faedah pengeluar", wang(ff * x.q1)), H("Kos kepada kerajaan", wang(x.s * x.q1))],
        langkah: L
      };
      if (fp < 0 || ff < 0) out.amaran = "Penurunan harga sepatutnya antara RM0 dan subsidi seunit. Semak semula nilai.";
      else if (sama(fp, ff)) out.nota = "Faedah subsidi dikongsi sama rata.";
      else if (fp > ff) out.nota = "Pengguna menikmati subsidi lebih besar. Ini berlaku apabila permintaan <b>tak anjal</b>.";
      else out.nota = "Pengeluar menikmati subsidi lebih besar. Ini berlaku apabila permintaan <b>anjal</b>.";
      return out;
    }
  });

  /* =========================================================
     TINGKATAN 4 · BAB 3 · Wang, Bank, dan Pendapatan Individu
     ========================================================= */
  tambah({
    id: "pendapatan-individu",
    bab: "t4-b3",
    no: "3.2.4",
    tajuk: "Pendapatan individu",
    kunci: "upah gaji sewa faedah dividen untung bayaran pindahan pendapatan",
    rumus: ["Pendapatan individu = Upah + Sewa + Faedah + Dividen + Untung + Bayaran pindahan"],
    medan: [
      { k: "upah", l: "Upah / gaji (RM)" },
      { k: "sewa", l: "Sewa (RM)" },
      { k: "faedah", l: "Faedah (RM)" },
      { k: "dividen", l: "Dividen (RM)" },
      { k: "untung", l: "Untung (RM)" },
      { k: "pindahan", l: "Bayaran pindahan (RM)" }
    ],
    contoh: [{ n: "Puan Malisah (Mac)", v: { upah: 8000, sewa: 1000, faedah: 0, dividen: 600, untung: 0, pindahan: 0 } }],
    kira: function (x) {
      var nama = { upah: "Upah", sewa: "Sewa", faedah: "Faedah", dividen: "Dividen", untung: "Untung", pindahan: "Bayaran pindahan" };
      var kunci = ["upah", "sewa", "faedah", "dividen", "untung", "pindahan"];
      var t = jumlah(
        kunci.map(function (k) {
          return x[k];
        })
      );
      var besar = kunci.reduce(function (a, b) {
        return x[b] > x[a] ? b : a;
      }, "upah");
      var out = {
        hasil: [H("Pendapatan individu", wang(t))],
        langkah: [
          ay("Pendapatan individu = jumlah semua sumber pendapatan") + "Pendapatan individu = " +
            kunci
              .map(function (k) {
                return wang(x[k]);
              })
              .join(" + ") +
            " = <b>" + wang(t) + "</b>"
        ]
      };
      if (t > 0) out.hasil.push(H("Sumber terbesar", nama[besar] + " (" + pc((x[besar] / t) * 100, 1) + ")"));
      return out;
    }
  });

  tambah({
    id: "upah-benar",
    bab: "t4-b3",
    no: "3.2.4",
    tajuk: "Upah benar dan kuasa beli",
    kunci: "upah benar upah wang harga purata kuasa beli",
    rumus: ["Upah benar = " + frac("Upah wang", "Harga purata barang")],
    petunjuk: "Buku teks: harga A RM5, B RM10, C RM15, maka harga purata RM10.",
    medan: [
      { k: "upah", l: "Upah wang (RM)" },
      { k: "h0", l: "Harga purata barang (RM)" },
      { k: "h1", l: "Harga purata baharu (RM)", opsyenal: true }
    ],
    contoh: [{ n: "Upah RM3 000", v: { upah: 3000, h0: 10, h1: 20 } }],
    kira: function (x) {
      if (x.h0 <= 0) return { ralat: "Harga purata mesti lebih daripada sifar." };
      var ub = x.upah / x.h0;
      var out = { hasil: [H("Upah benar", nom(ub) + " unit")], langkah: [ay("Upah benar = upah wang (pengangka) ÷ harga barang (penyebut): bilangan unit barang yang mampu dibeli") + "Upah benar = " + wang(x.upah) + " ÷ " + wang(x.h0) + " = <b>" + nom(ub) + " unit</b>"] };
      if (x.h1 != null && x.h1 > 0) {
        var ub1 = x.upah / x.h1;
        var ubah = ((ub1 - ub) / ub) * 100;
        out.langkah.push(ay("Upah benar baharu = upah wang ÷ harga barang baharu") + "Upah benar baharu = " + wang(x.upah) + " ÷ " + wang(x.h1) + " = <b>" + nom(ub1) + " unit</b>");
        out.langkah.push(ay("Perubahan kuasa beli = (upah benar baharu − upah benar asal) ÷ upah benar asal × 100") + "Perubahan kuasa beli = (" + nom(ub1) + " − " + nom(ub) + ") ÷ " + nom(ub) + " × 100 = " + pc(ubah));
        out.hasil.push(H("Upah benar baharu", nom(ub1) + " unit"));
        out.hasil.push(H("Kuasa beli", (ubah > 0 ? "+" : "") + pc(ubah), ubah < 0 ? "buruk" : ubah > 0 ? "baik" : "neutral"));
        out.nota = ubah < 0 ? "Harga naik tetapi upah wang tetap, maka kuasa beli (upah benar) menurun." : ubah > 0 ? "Harga turun, maka upah benar dan kuasa beli meningkat." : "";
      }
      return out;
    }
  });

  tambah({
    id: "pbg",
    bab: "t4-b3",
    no: "3.3.1",
    tajuk: "Pendapatan boleh guna (PBG)",
    kunci: "pbg pendapatan boleh guna potongan wajib kwsp perkeso zakat cukai",
    rumus: ["Pendapatan boleh guna = Pendapatan individu − Potongan wajib", "Potongan wajib = KWSP + PERKESO + Zakat + Cukai pendapatan"],
    medan: [
      { k: "gaji", l: "Gaji / upah (RM)" },
      { k: "elaun", l: "Elaun (RM)" },
      { k: "lain", l: "Pendapatan lain (RM)" },
      { k: "kwsp", l: "KWSP (RM)" },
      { k: "perkeso", l: "PERKESO (RM)" },
      { k: "zakat", l: "Zakat (RM)" },
      { k: "cukai", l: "Cukai pendapatan (RM)" }
    ],
    contoh: [
      { n: "Gaji RM6 000", v: { gaji: 6000, elaun: 1000, lain: 0, kwsp: 770, perkeso: 17.5, zakat: 50, cukai: 110 } },
      { n: "Puan Malisah", v: { gaji: 8000, elaun: 0, lain: 1600, kwsp: 880, perkeso: 0, zakat: 300, cukai: 600 } }
    ],
    kira: function (x) {
      var p = x.gaji + x.elaun + x.lain;
      var w = x.kwsp + x.perkeso + x.zakat + x.cukai;
      var pbg = p - w;
      return {
        hasil: [H("Jumlah pendapatan", wang(p)), H("Potongan wajib", wang(w)), H("Pendapatan boleh guna", wang(pbg), pbg >= 0 ? "baik" : "buruk")],
        langkah: [
          ay("Jumlah pendapatan = gaji + elaun + pendapatan lain") + "Jumlah pendapatan = " + wang(x.gaji) + " + " + wang(x.elaun) + " + " + wang(x.lain) + " = " + wang(p),
          ay("Potongan wajib = KWSP + PERKESO + zakat + cukai pendapatan") + "Potongan wajib = " + wang(x.kwsp) + " + " + wang(x.perkeso) + " + " + wang(x.zakat) + " + " + wang(x.cukai) + " = " + wang(w),
          ay("Pendapatan boleh guna = jumlah pendapatan − potongan wajib") + "PBG = " + wang(p) + " − " + wang(w) + " = <b>" + wang(pbg) + "</b>"
        ]
      };
    }
  });

  var JADUAL_CUKAI = [
    [5000, 0],
    [15000, 1],
    [15000, 5],
    [15000, 10],
    [20000, 16],
    [30000, 21]
  ];

  tambah({
    id: "cukai-pendapatan",
    bab: "t4-b3",
    no: "3.3.2",
    tajuk: "Pendapatan boleh cukai dan cukai pendapatan individu",
    kunci: "cukai pendapatan boleh cukai pelepasan rebat progresif tahun taksiran lhdn",
    rumus: ["Pendapatan boleh cukai = Pendapatan tahunan − Pelepasan cukai", "Cukai dikira mengikut jadual kadar progresif (tahun taksiran 2016)"],
    petunjuk: "Jadual buku teks: 0% (RM5 000 pertama), 1%, 5%, 10% (RM15 000 berikutnya setiap satu), 16% (RM20 000), 21% (RM30 000). Rebat RM400 jika pendapatan boleh cukai RM35 000 ke bawah.",
    medan: [
      { k: "tahunan", l: "Pendapatan tahunan (RM)" },
      { k: "pelepasan", l: "Jumlah pelepasan cukai (RM)" }
    ],
    contoh: [
      { n: "Encik Wilfred", v: { tahunan: 48000, pelepasan: 33360 } },
      { n: "Boleh cukai RM60 000", v: { tahunan: 80000, pelepasan: 20000 } }
    ],
    kira: function (x) {
      var bc = Math.max(0, x.tahunan - x.pelepasan);
      var L = [ay("Pendapatan boleh cukai = pendapatan tahunan − pelepasan cukai") + "Pendapatan boleh cukai = " + wang(x.tahunan) + " − " + wang(x.pelepasan) + " = <b>" + wang(bc) + "</b>"];
      if (bc > 100000) return { hasil: [H("Pendapatan boleh cukai", wang(bc))], langkah: L, amaran: "Jadual dalam buku teks hanya sehingga RM100 000. Cukai bagi pendapatan melebihi jumlah ini tidak dikira di sini." };
      var baki = bc;
      var c = 0;
      var awal = true;
      JADUAL_CUKAI.forEach(function (j) {
        if (baki <= 0) return;
        var bah = Math.min(baki, j[0]);
        var cukai = (bah * j[1]) / 100;
        c += cukai;
        L.push(ay("Cukai banjaran = pendapatan dalam banjaran × kadar cukai banjaran itu") + wang(bah) + (awal ? " pertama" : " berikutnya") + " × " + j[1] + "% = " + wang(cukai));
        baki -= bah;
        awal = false;
      });
      L.push("Jumlah cukai = <b>" + wang(c) + "</b>");
      var rebat = bc <= 35000 ? 400 : 0;
      var bayar = Math.max(0, c - rebat);
      if (rebat) L.push("Rebat RM400 (pendapatan boleh cukai RM35 000 ke bawah): " + wang(c) + " − RM400 = <b>" + wang(bayar) + "</b>" + (c < rebat ? " (tiada cukai perlu dibayar)" : ""));
      return {
        hasil: [H("Pendapatan boleh cukai", wang(bc)), H("Cukai dikira", wang(c)), H("Cukai perlu dibayar", wang(bayar), bayar === 0 ? "baik" : "")],
        langkah: L,
        nota: bc > 0 ? "Kadar cukai purata = " + wang(c) + " ÷ " + wang(bc) + " × 100 = " + pc((c / bc) * 100) + ". Kadar meningkat apabila pendapatan meningkat (cukai progresif)." : ""
      };
    }
  });

  tambah({
    id: "belanjawan-peribadi",
    bab: "t4-b3",
    no: "3.3.9",
    tajuk: "Belanjawan peribadi: lebihan atau defisit",
    kunci: "belanjawan peribadi perbelanjaan tabungan simpanan baki lebihan defisit pbg",
    rumus: ["Pendapatan boleh guna = Pendapatan individu − Potongan wajib", "Pendapatan boleh guna = Perbelanjaan penggunaan + Tabungan", "Baki = PBG − (Perbelanjaan + Tabungan)"],
    medan: [
      { k: "pendapatan", l: "Pendapatan individu (RM)" },
      { k: "potongan", l: "Potongan wajib (RM)" },
      { k: "belanja", l: "Perbelanjaan penggunaan (RM)" },
      { k: "tabung", l: "Tabungan dan pelaburan (RM)" }
    ],
    contoh: [{ n: "Puan Malisah (Mac)", v: { pendapatan: 9600, potongan: 1780, belanja: 6200, tabung: 600 } }],
    kira: function (x) {
      var pbg = x.pendapatan - x.potongan;
      var baki = pbg - x.belanja - x.tabung;
      var out = {
        hasil: [H("PBG", wang(pbg)), H("Baki", wang(baki)), H("Belanjawan", baki > 0 ? "Lebihan" : baki < 0 ? "Defisit" : "Seimbang", baki > 0 ? "baik" : baki < 0 ? "buruk" : "neutral")],
        langkah: [
          ay("Pendapatan boleh guna = pendapatan − potongan") + "PBG = " + wang(x.pendapatan) + " − " + wang(x.potongan) + " = " + wang(pbg),
          ay("Baki = pendapatan boleh guna − (perbelanjaan + tabungan)") + "Baki = " + wang(pbg) + " − (" + wang(x.belanja) + " + " + wang(x.tabung) + ") = <b>" + wang(baki) + "</b>"
        ]
      };
      if (pbg > 0) out.langkah.push(ay("Kadar tabungan = tabungan (pengangka) ÷ pendapatan boleh guna (penyebut) × 100") + "Kadar tabungan = " + wang(x.tabung) + " ÷ " + wang(pbg) + " × 100 = " + pc((x.tabung / pbg) * 100));
      out.nota = baki > 0 ? "Lebihan boleh ditambah kepada simpanan, dana kecemasan atau pelaburan." : baki < 0 ? "Perbelanjaan melebihi pendapatan boleh guna. Kurangkan perbelanjaan kehendak dan utamakan keperluan." : "Semua pendapatan boleh guna telah diagihkan.";
      return out;
    }
  });

  tambah({
    id: "sewa-beli",
    bab: "t4-b3",
    no: "3.3.7",
    tajuk: "Pembelian kredit (sewa beli) dan ansuran bulanan",
    kunci: "sewa beli kredit ansuran pinjaman pendahuluan deposit faedah kereta rumah",
    rumus: ["Jumlah pinjaman = Harga barang − Pendahuluan", "Faedah = Pinjaman × Kadar faedah × Tempoh (tahun)", "Ansuran bulanan = " + frac("Pinjaman + Faedah", "Bilangan bulan")],
    medan: [
      { k: "harga", l: "Harga barang (RM)" },
      {
        k: "jenisDp",
        jenis: "pilih",
        l: "Pendahuluan dalam",
        pilihan: [
          ["pc", "Peratus (%)"],
          ["rm", "Ringgit (RM)"]
        ]
      },
      {
        k: "dpPc",
        l: "Pendahuluan (%)",
        bila: function (x) {
          return x.jenisDp === "pc";
        }
      },
      {
        k: "dpRm",
        l: "Pendahuluan (RM)",
        bila: function (x) {
          return x.jenisDp === "rm";
        }
      },
      { k: "kadar", l: "Kadar faedah setahun (%)" },
      { k: "tahun", l: "Tempoh (tahun)" }
    ],
    contoh: [{ n: "Rumah RM100 000", v: { harga: 100000, jenisDp: "pc", dpPc: 20, dpRm: 20000, kadar: 4, tahun: 6 } }],
    kira: function (x) {
      if (x.tahun <= 0) return { ralat: "Tempoh mesti lebih daripada sifar." };
      var dp = x.jenisDp === "pc" ? (x.harga * x.dpPc) / 100 : x.dpRm;
      var pinjam = x.harga - dp;
      if (pinjam < 0) return { ralat: "Pendahuluan tidak boleh melebihi harga barang." };
      var faedah = (pinjam * x.kadar * x.tahun) / 100;
      var jum = pinjam + faedah;
      var bulan = x.tahun * 12;
      var ansuran = jum / bulan;
      var L = [];
      if (x.jenisDp === "pc") L.push(ay("Pendahuluan = peratus pendahuluan × harga barang") + "Pendahuluan = " + pc(x.dpPc) + " × " + wang(x.harga) + " = " + wang(dp));
      L.push(ay("Jumlah pinjaman = harga barang − pendahuluan") + "Jumlah pinjaman = " + wang(x.harga) + " − " + wang(dp) + " = " + wang(pinjam));
      L.push(ay("Faedah = jumlah pinjaman × kadar faedah setahun × bilangan tahun") + "Faedah = " + wang(pinjam) + " × " + pc(x.kadar) + " × " + nom(x.tahun) + " = " + wang(faedah));
      L.push(ay("Jumlah perlu dibayar = jumlah pinjaman + faedah") + "Jumlah perlu dibayar = " + wang(pinjam) + " + " + wang(faedah) + " = " + wang(jum));
      L.push(ay("Ansuran bulanan = jumlah perlu dibayar (pengangka) ÷ bilangan bulan (penyebut)") + "Ansuran = " + wang(jum) + " ÷ " + nom(bulan) + " bulan = <b>" + wang(ansuran) + " sebulan</b>");
      L.push(ay("Jumlah kos sebenar = pendahuluan + jumlah perlu dibayar") + "Jumlah kos sebenar = " + wang(dp) + " + " + wang(jum) + " = " + wang(dp + jum));
      return {
        hasil: [H("Ansuran bulanan", wang(ansuran), "neutral"), H("Jumlah faedah", wang(faedah)), H("Kos sebenar barang", wang(dp + jum))],
        langkah: L,
        nota: "Pembelian kredit membolehkan barang dinikmati lebih awal, tetapi kos sebenar lebih tinggi daripada harga tunai sebanyak " + wang(faedah) + "."
      };
    }
  });

  tambah({
    id: "pulangan",
    bab: "t4-b3",
    no: "3.3.12",
    tajuk: "Pulangan simpanan dan pelaburan",
    kunci: "pulangan faedah simpanan pelaburan dividen kadar pulangan risiko",
    rumus: ["Faedah = Modal × Kadar faedah × Tempoh (tahun)", "Kadar pulangan = " + frac("Pulangan", "Modal") + " × 100"],
    medan: [
      {
        k: "mod",
        jenis: "pilih",
        l: "Kira",
        pilihan: [
          ["faedah", "Pulangan (faedah/dividen)"],
          ["kadar", "Kadar pulangan (%)"]
        ]
      },
      { k: "modal", l: "Modal / simpanan (RM)" },
      {
        k: "kadar",
        l: "Kadar setahun (%)",
        bila: function (x) {
          return x.mod === "faedah";
        }
      },
      {
        k: "tahun",
        l: "Tempoh (tahun)",
        bila: function (x) {
          return x.mod === "faedah";
        }
      },
      {
        k: "pulangan",
        l: "Pulangan diterima (RM)",
        bila: function (x) {
          return x.mod === "kadar";
        }
      }
    ],
    contoh: [
      { n: "Simpanan RM12 000, 4%", v: { mod: "faedah", modal: 12000, kadar: 4, tahun: 1, pulangan: 480 } },
      { n: "Dividen RM650", v: { mod: "kadar", modal: 10000, kadar: 6.5, tahun: 1, pulangan: 650 } }
    ],
    kira: function (x) {
      if (x.mod === "faedah") {
        var f = (x.modal * x.kadar * x.tahun) / 100;
        return {
          hasil: [H("Pulangan", wang(f)), H("Sebulan", wang(f / (x.tahun * 12 || 1))), H("Nilai akhir", wang(x.modal + f))],
          langkah: [ay("Pulangan = modal × kadar pulangan setahun × bilangan tahun") + "Pulangan = " + wang(x.modal) + " × " + pc(x.kadar) + " × " + nom(x.tahun) + " = <b>" + wang(f) + "</b>", ay("Nilai akhir = modal + pulangan") + "Nilai akhir = " + wang(x.modal) + " + " + wang(f) + " = " + wang(x.modal + f)],
          nota: "Pulangan ini ialah kos lepas jika simpanan digunakan untuk tujuan lain (contohnya modal perniagaan)."
        };
      }
      if (x.modal <= 0) return { ralat: "Modal mesti lebih daripada sifar." };
      var k = (x.pulangan / x.modal) * 100;
      return {
        hasil: [H("Kadar pulangan", pc(k))],
        langkah: [ay("Kadar pulangan = pulangan (pengangka) ÷ modal (penyebut) × 100") + "Kadar pulangan = " + wang(x.pulangan) + " ÷ " + wang(x.modal) + " × 100 = <b>" + pc(k) + "</b>"],
        nota: "Pelaburan berisiko tinggi biasanya menawarkan pulangan yang lebih tinggi."
      };
    }
  });

  /* =========================================================
     TINGKATAN 4 · BAB 4 · Pengeluaran
     ========================================================= */
  tambah({
    id: "keluaran",
    bab: "t4-b4",
    no: "4.1.2",
    tajuk: "Jumlah keluaran, keluaran purata dan keluaran marginal",
    kunci: "tp ap mp keluaran purata marginal buruh hukum pulangan berkurangan tahap pengeluaran",
    rumus: ["AP = " + frac("TP", "L") + " &nbsp;&nbsp; MP = " + frac("ΔTP", "ΔL") + " &nbsp;&nbsp; TP = AP × L"],
    petunjuk: "Klik mana-mana baris untuk melihat jalan kira baris itu.",
    medan: [
      {
        k: "j",
        jenis: "jadual",
        pilihBaris: 4,
        lajur: [
          { k: "l", l: "Buruh (L)" },
          { k: "tp", l: "TP" },
          { k: "ap", l: "AP", hasil: true },
          { k: "mp", l: "MP", hasil: true },
          { k: "tahap", l: "Tahap", hasil: true, teks: true }
        ]
      }
    ],
    contoh: [{ n: "Jadual buku teks", v: { j: [[0, 0], [1, 4], [2, 10], [3, 24], [4, 36], [5, 40], [6, 42], [7, 42], [8, 40], [9, 36]] } }],
    kira: function (x) {
      var r = x.j;
      var ap = [];
      var mp = [];
      var apMax = -Infinity;
      var iAP = -1;
      r.forEach(function (b, i) {
        ap.push(b.l > 0 && b.tp != null ? b.tp / b.l : null);
        var s = i > 0 ? r[i - 1] : null;
        mp.push(s && s.tp != null && b.tp != null && b.l !== s.l ? (b.tp - s.tp) / (b.l - s.l) : null);
        if (ap[i] != null && ap[i] > apMax + 1e-9) {
          apMax = ap[i];
          iAP = i;
        }
      });
      var tahap = r.map(function (b, i) {
        if (ap[i] == null) return "–";
        if (mp[i] != null && mp[i] < 0) return "III";
        return i < iAP ? "I" : "II";
      });
      var tpMax = -Infinity;
      var iTP = -1;
      var mpMax = -Infinity;
      var iMP = -1;
      r.forEach(function (b, i) {
        if (b.tp != null && b.tp >= tpMax - 1e-9) {
          tpMax = b.tp;
          iTP = i;
        }
        if (mp[i] != null && mp[i] > mpMax + 1e-9) {
          mpMax = mp[i];
          iMP = i;
        }
      });
      var p = x._baris.j;
      var b = r[p];
      var L = [];
      if (b && b.l > 0 && b.tp != null) {
        L.push(ay("AP = jumlah keluaran, TP (pengangka) ÷ bilangan buruh (penyebut)") + "AP (buruh ke-" + nom(b.l) + ") = " + nom(b.tp) + " ÷ " + nom(b.l) + " = <b>" + nom(ap[p]) + "</b>");
        if (mp[p] != null) L.push(ay("MP = perubahan TP (pengangka) ÷ perubahan bilangan buruh (penyebut)") + "MP (buruh ke-" + nom(b.l) + ") = (" + nom(b.tp) + " − " + nom(r[p - 1].tp) + ") ÷ (" + nom(b.l) + " − " + nom(r[p - 1].l) + ") = <b>" + nom(mp[p]) + "</b>");
      } else {
        L.push("Pilih baris dengan buruh lebih daripada sifar untuk melihat jalan kira.");
      }
      var fmt = function (v) {
        return v == null ? "–" : nom(v);
      };
      var tII = r.filter(function (_, i) {
        return tahap[i] === "II";
      });
      return {
        sel: { ap: ap.map(fmt), mp: mp.map(fmt), tahap: tahap },
        hasil: [
          H("TP maksimum", iTP >= 0 ? nom(tpMax) : "–", "", iTP >= 0 ? "buruh ke-" + nom(r[iTP].l) : ""),
          H("AP maksimum", iAP >= 0 ? nom(apMax) : "–", "", iAP >= 0 ? "buruh ke-" + nom(r[iAP].l) : ""),
          H("MP maksimum", iMP >= 0 ? nom(mpMax) : "–", "", iMP >= 0 ? "buruh ke-" + nom(r[iMP].l) : "")
        ],
        langkah: L,
        nota: tII.length ? "Tahap II (buruh ke-" + nom(tII[0].l) + " hingga ke-" + nom(tII[tII.length - 1].l) + ") ialah tahap pengeluaran paling cekap: bermula pada AP maksimum dan berakhir apabila MP = 0." : ""
      };
    }
  });

  tambah({
    id: "kos",
    bab: "t4-b4",
    no: "4.1.4",
    tajuk: "Kos pengeluaran jangka pendek (TC, VC, AFC, AVC, AC, MC)",
    kunci: "kos tetap berubah jumlah kos purata marginal fc vc tc afc avc ac mc",
    rumus: [
      "TC = FC + VC",
      "AFC = " + frac("FC", "Q") + " &nbsp; AVC = " + frac("VC", "Q") + " &nbsp; AC = " + frac("TC", "Q") + " &nbsp; MC = " + frac("ΔTC", "ΔQ")
    ],
    petunjuk: "Klik mana-mana baris untuk melihat jalan kira baris itu. Semua nilai dalam RM.",
    medan: [
      { k: "fc", l: "Kos tetap FC (RM)" },
      {
        k: "data",
        jenis: "pilih",
        l: "Lajur kedua ialah",
        pilihan: [
          ["vc", "Kos berubah (VC)"],
          ["tc", "Jumlah kos (TC)"]
        ],
        // Tukar nilai lajur kedua (VC ↔ TC) supaya jadual kos yang sama dikekalkan
        ubah: function (s, baru) {
          var fc = bacaNombor(s.v.fc);
          if (fc == null || fc !== fc) return;
          s.j.j.forEach(function (r) {
            var v = bacaNombor(r[1]);
            if (v != null && v === v) r[1] = String(E.bundar(baru === "tc" ? v + fc : v - fc, 6));
          });
        }
      },
      {
        k: "j",
        jenis: "jadual",
        pilihBaris: 5,
        lajur: [
          { k: "q", l: "Output (Q)" },
          {
            k: "n",
            l: function (x) {
              return x.data === "tc" ? "TC" : "VC";
            }
          },
          {
            k: "lain",
            l: function (x) {
              return x.data === "tc" ? "VC" : "TC";
            },
            hasil: true
          },
          { k: "afc", l: "AFC", hasil: true },
          { k: "avc", l: "AVC", hasil: true },
          { k: "ac", l: "AC", hasil: true },
          { k: "mc", l: "MC", hasil: true }
        ]
      }
    ],
    contoh: [
      { n: "Jadual buku teks (VC)", v: { fc: 100, data: "vc", j: [[0, 0], [1, 50], [2, 95], [3, 130], [4, 160], [5, 195], [6, 245], [7, 315], [8, 395]] } },
      { n: "Diberi TC", v: { fc: 100, data: "tc", j: [[0, 100], [1, 150], [2, 195], [3, 230], [4, 260], [5, 295], [6, 345], [7, 415], [8, 495]] } }
    ],
    kira: function (x) {
      var tc = [];
      var vc = [];
      var s = { lain: [], afc: [], avc: [], ac: [], mc: [] };
      var f2 = function (v) {
        return v == null ? "–" : nom(v);
      };
      x.j.forEach(function (b, i) {
        var t = b.n == null ? null : x.data === "tc" ? b.n : x.fc + b.n;
        var v = t == null ? null : t - x.fc;
        tc.push(t);
        vc.push(v);
        var ada = b.q != null && b.q > 0 && t != null;
        var sb = i > 0 ? x.j[i - 1] : null;
        var mc = sb && tc[i - 1] != null && t != null && sb.q != null && b.q !== sb.q ? (t - tc[i - 1]) / (b.q - sb.q) : null;
        s.lain.push(f2(x.data === "tc" ? v : t));
        s.afc.push(ada ? f2(x.fc / b.q) : "–");
        s.avc.push(ada ? f2(v / b.q) : "–");
        s.ac.push(ada ? f2(t / b.q) : "–");
        s.mc.push(f2(mc));
      });
      function minimum(fn) {
        var m = Infinity;
        var im = -1;
        x.j.forEach(function (b, i) {
          var v = fn(b, i);
          if (v != null && v < m - 1e-9) {
            m = v;
            im = i;
          }
        });
        return im;
      }
      var iAC = minimum(function (b, i) {
        return b.q > 0 && tc[i] != null ? tc[i] / b.q : null;
      });
      var iAVC = minimum(function (b, i) {
        return b.q > 0 && vc[i] != null ? vc[i] / b.q : null;
      });
      var p = x._baris.j;
      var b = x.j[p];
      var L = [];
      if (b && b.q > 0 && tc[p] != null) {
        L.push(x.data === "tc" ? ay("Kos berubah = jumlah kos − kos tetap") + "VC = TC − FC = " + wang(tc[p]) + " − " + wang(x.fc) + " = " + wang(vc[p]) : ay("Jumlah kos = kos tetap + kos berubah") + "TC = FC + VC = " + wang(x.fc) + " + " + wang(vc[p]) + " = " + wang(tc[p]));
        L.push(ay("AFC = kos tetap (pengangka) ÷ kuantiti keluaran (penyebut)") + "AFC = " + wang(x.fc) + " ÷ " + nom(b.q) + " = " + wang(x.fc / b.q));
        L.push(ay("AVC = kos berubah (pengangka) ÷ kuantiti keluaran (penyebut)") + "AVC = " + wang(vc[p]) + " ÷ " + nom(b.q) + " = " + wang(vc[p] / b.q));
        L.push(ay("AC = jumlah kos (pengangka) ÷ kuantiti keluaran (penyebut)") + "AC = " + wang(tc[p]) + " ÷ " + nom(b.q) + " = <b>" + wang(tc[p] / b.q) + "</b> (atau AFC + AVC)");
        if (p > 0 && tc[p - 1] != null) L.push(ay("MC = perubahan jumlah kos (pengangka) ÷ perubahan kuantiti keluaran (penyebut)") + "MC = (" + wang(tc[p]) + " − " + wang(tc[p - 1]) + ") ÷ (" + nom(b.q) + " − " + nom(x.j[p - 1].q) + ") = <b>" + wang((tc[p] - tc[p - 1]) / (b.q - x.j[p - 1].q)) + "</b>");
      } else {
        L.push("Pilih baris dengan output lebih daripada sifar untuk melihat jalan kira.");
      }
      return {
        sel: s,
        hasil: [
          H("AC minimum", iAC >= 0 ? wang(tc[iAC] / x.j[iAC].q) : "–", "", iAC >= 0 ? "pada output " + nom(x.j[iAC].q) + " unit" : ""),
          H("AVC minimum", iAVC >= 0 ? wang(vc[iAVC] / x.j[iAVC].q) : "–", "", iAVC >= 0 ? "pada output " + nom(x.j[iAVC].q) + " unit" : "")
        ],
        langkah: L,
        nota: "Apabila MC &lt; AC, AC menurun; apabila MC &gt; AC, AC meningkat. Keluk MC memotong keluk AC pada titik minimum AC."
      };
    }
  });

  tambah({
    id: "untung",
    bab: "t4-b4",
    no: "4.1.7",
    tajuk: "Jumlah hasil dan untung",
    kunci: "jumlah hasil tr untung rugi pulang modal harga kuantiti jualan",
    rumus: ["Jumlah hasil (TR) = Harga (P) × Kuantiti jualan (Q)", "Untung = Jumlah hasil − Jumlah kos"],
    medan: [
      { k: "p", l: "Harga seunit P (RM)" },
      { k: "q", l: "Kuantiti jualan Q" },
      { k: "fc", l: "Kos tetap (RM)" },
      { k: "vc", l: "Kos berubah (RM)" }
    ],
    contoh: [{ n: "Nilai contoh", v: { p: 28, q: 2000, fc: 5600, vc: 29200 } }],
    kira: function (x) {
      var tr = x.p * x.q;
      var tc = x.fc + x.vc;
      var u = tr - tc;
      var out = {
        hasil: [H("TR", wang(tr)), H("TC", wang(tc)), H(u >= 0 ? "Untung" : "Rugi", wang(Math.abs(u)), u > 0 ? "baik" : u < 0 ? "buruk" : "neutral")],
        langkah: [ay("Jumlah hasil = harga × kuantiti") + "TR = " + wang(x.p) + " × " + nom(x.q) + " = " + wang(tr), ay("Jumlah kos = kos tetap + kos berubah") + "TC = " + wang(x.fc) + " + " + wang(x.vc) + " = " + wang(tc), ay("Untung = jumlah hasil − jumlah kos") + "Untung = " + wang(tr) + " − " + wang(tc) + " = <b>" + wang(u) + "</b>"]
      };
      if (x.q > 0) out.langkah.push(ay("Kos purata = jumlah kos ÷ kuantiti; untung seunit = harga − kos purata") + "AC = " + wang(tc) + " ÷ " + nom(x.q) + " = " + wang(tc / x.q) + ", maka untung seunit = " + wang(x.p) + " − " + wang(tc / x.q) + " = " + wang(x.p - tc / x.q));
      out.nota = u > 0 ? "TR &gt; TC: firma mendapat untung." : u < 0 ? "TR &lt; TC: firma mengalami kerugian." : "TR = TC: firma pulang modal.";
      return out;
    }
  });

  // Senarai kos bebas: pelajar menulis sendiri butiran kos eksplisit dan implisit (tidak terikat pada satu contoh).
  function lajurKos(k, l) {
    return {
      k: k,
      jenis: "jadual",
      tanpaPilih: true,
      lajur: [
        { k: "n", l: l, teks: true },
        { k: "v", l: "Nilai (RM)" }
      ]
    };
  }
  // Baris yang ada nilai sahaja; butiran tanpa nama diberi nama lalai
  function senaraiKos(baris, lalai) {
    var out = [];
    baris.forEach(function (r, i) {
      if (r.v == null) return;
      out.push({ n: String(r.n || "").trim() || lalai + " " + (i + 1), v: r.v });
    });
    return out;
  }
  function langkahKos(tajuk, senarai) {
    var j = jumlah(
      senarai.map(function (c) {
        return c.v;
      })
    );
    if (!senarai.length) return { j: 0, teks: tajuk + " = " + wang(0) + " (tiada)" };
    var nama = senarai
      .map(function (c) {
        return esc(c.n);
      })
      .join(" + ");
    var nilaiK = senarai
      .map(function (c) {
        return wang(c.v);
      })
      .join(" + ");
    return { j: j, teks: tajuk + " = " + nama + " = " + (senarai.length > 1 ? nilaiK + " = " : "") + wang(j) };
  }

  tambah({
    id: "untung-ekonomi",
    bab: "t4-b4",
    no: "4.1.6",
    tajuk: "Untung dan untung ekonomi",
    kunci: "untung ekonomi kos eksplisit kos implisit perakaunan kos lepas usahawan sewa faedah gaji dilepaskan",
    rumus: ["Untung = Jumlah hasil − Kos eksplisit", "Untung ekonomi = Jumlah hasil − (Kos eksplisit + Kos implisit)"],
    petunjuk:
      "Tulis sendiri setiap butiran kos dan nilainya; tekan <b>+ Tambah baris</b> jika perlu. <b>Kos eksplisit</b> dibayar dengan nyata kepada pihak lain (bahan mentah, upah pekerja, sewa premis, bil). <b>Kos implisit</b> ialah kos lepas sumber milik sendiri (gaji yang dilepaskan, sewa tapak sendiri, faedah atas modal sendiri = kadar faedah × modal; bahagi 12 jika sebulan). Pastikan semua nilai bagi tempoh yang sama.",
    medan: [
      {
        k: "cara",
        jenis: "pilih",
        l: "Jumlah hasil",
        pilihan: [
          ["tr", "Diberi terus (RM)"],
          ["pq", "Harga × kuantiti jualan"]
        ]
      },
      {
        k: "tr",
        l: "Jumlah hasil TR (RM)",
        bila: function (x) {
          return x.cara === "tr";
        }
      },
      {
        k: "p",
        l: "Harga seunit P (RM)",
        bila: function (x) {
          return x.cara === "pq";
        }
      },
      {
        k: "q",
        l: "Kuantiti jualan Q",
        bila: function (x) {
          return x.cara === "pq";
        }
      },
      lajurKos("eks", "Kos eksplisit"),
      lajurKos("imp", "Kos implisit")
    ],
    contoh: [
      {
        n: "Puan Surayati (sebulan)",
        v: {
          cara: "tr",
          tr: 10000,
          eks: [
            ["Bahan mentah", 3000],
            ["Gaji pembantu", 900],
            ["Bil", 1000]
          ],
          imp: [
            ["Gaji yang dilepaskan", 3000],
            ["Faedah simpanan (4% × RM12 000 ÷ 12)", 40]
          ]
        }
      },
      {
        n: "Encik Semang (semusim)",
        v: {
          cara: "tr",
          tr: 10000,
          eks: [
            ["Anak ayam", 1000],
            ["Makanan ayam", 2000],
            ["Alatan", 1000]
          ],
          imp: [
            ["Sewa tapak milik sendiri", 3000],
            ["", ""]
          ]
        }
      },
      {
        n: "Nilai contoh (P × Q)",
        v: {
          cara: "pq",
          p: 5,
          q: 3000,
          eks: [
            ["Tepung dan bahan", 4000],
            ["Sewa kedai", 2000],
            ["Upah pekerja", 3000]
          ],
          imp: [
            ["Gaji yang dilepaskan", 2500],
            ["Faedah modal sendiri (6% × RM40 000 ÷ 12)", 200]
          ]
        }
      }
    ],
    kira: function (x) {
      var eks = senaraiKos(x.eks, "Kos eksplisit");
      var imp = senaraiKos(x.imp, "Kos implisit");
      var negatif = eks.concat(imp).filter(function (c) {
        return c.v < 0;
      });
      if (negatif.length) return { ralat: "Nilai kos tidak boleh negatif: " + esc(negatif[0].n) + "." };
      if (!eks.length && !imp.length) return { ralat: "Isi sekurang-kurangnya satu butiran kos dan nilainya." };
      var L = [];
      var tr = x.tr;
      if (x.cara === "pq") {
        tr = x.p * x.q;
        L.push(ay("Jumlah hasil = harga seunit × kuantiti jualan") + "TR = " + wang(x.p) + " × " + nom(x.q, 0) + " = " + wang(tr));
      }
      var ke = langkahKos("Kos eksplisit", eks);
      var ki = langkahKos("Kos implisit", imp);
      var ua = tr - ke.j;
      var ue = tr - (ke.j + ki.j);
      L.push(
        ay("Kos eksplisit = jumlah semua bayaran nyata kepada pihak lain") + ke.teks,
        ay("Kos implisit = jumlah kos lepas sumber milik sendiri") + ki.teks,
        ay("Untung = jumlah hasil − kos eksplisit") + "Untung = " + wang(tr) + " − " + wang(ke.j) + " = <b>" + wang(ua) + "</b>",
        ay("Untung ekonomi = jumlah hasil − (kos eksplisit + kos implisit)") +
          "Untung ekonomi = " + wang(tr) + " − (" + wang(ke.j) + " + " + wang(ki.j) + ") = <b>" + wang(ue) + "</b>"
      );
      var nota =
        ue > 0
          ? "Untung ekonomi positif: perniagaan ini memberi pulangan lebih tinggi daripada pilihan kedua terbaik, maka berbaloi diteruskan."
          : ue < 0
          ? "Untung ekonomi negatif: pilihan kedua terbaik (contohnya kekal makan gaji atau menyewakan sumber sendiri) memberi pulangan lebih tinggi."
          : "Untung ekonomi sifar (untung normal): pulangan perniagaan sama dengan pilihan kedua terbaik.";
      if (ua > 0 && ue < 0) nota = "Perniagaan ini untung dari segi perakaunan, tetapi " + nota.charAt(0).toLowerCase() + nota.slice(1);
      return {
        hasil: [
          H("Kos eksplisit", wang(ke.j)),
          H("Kos implisit", wang(ki.j)),
          H("Untung", wang(ua), ua > 0 ? "baik" : ua < 0 ? "buruk" : "neutral"),
          H("Untung ekonomi", wang(ue), ue > 0 ? "baik" : ue < 0 ? "buruk" : "neutral")
        ],
        langkah: L,
        nota: nota
      };
    }
  });

  tambah({
    id: "produktiviti",
    bab: "t4-b4",
    no: "4.2.1",
    tajuk: "Produktiviti",
    kunci: "produktiviti output input buruh kecekapan",
    rumus: ["Produktiviti = " + frac("Output", "Input")],
    medan: [
      { k: "o0", l: "Output (unit)" },
      { k: "i0", l: "Input (contoh bilangan pekerja)" },
      { k: "o1", l: "Output tempoh kedua", opsyenal: true },
      { k: "i1", l: "Input tempoh kedua", opsyenal: true }
    ],
    contoh: [{ n: "Nilai contoh", v: { o0: 1200, i0: 8, o1: 1500, i1: 8 } }],
    kira: function (x) {
      if (x.i0 <= 0) return { ralat: "Input mesti lebih daripada sifar." };
      var p0 = x.o0 / x.i0;
      var out = { hasil: [H("Produktiviti", nom(p0) + " unit seinput")], langkah: [ay("Produktiviti = jumlah keluaran (pengangka) ÷ jumlah input (penyebut)") + "Produktiviti = " + nom(x.o0) + " ÷ " + nom(x.i0) + " = <b>" + nom(p0) + "</b> unit bagi setiap unit input"] };
      if (x.o1 != null && x.i1 != null && x.i1 > 0) {
        var p1 = x.o1 / x.i1;
        var u = ((p1 - p0) / p0) * 100;
        out.langkah.push(ay("Produktiviti tempoh kedua = keluaran tempoh kedua ÷ input tempoh kedua") + "Produktiviti tempoh kedua = " + nom(x.o1) + " ÷ " + nom(x.i1) + " = <b>" + nom(p1) + "</b>");
        out.langkah.push(ay("Perubahan produktiviti = (produktiviti baharu − produktiviti asal) ÷ produktiviti asal × 100") + "Perubahan = (" + nom(p1) + " − " + nom(p0) + ") ÷ " + nom(p0) + " × 100 = " + pc(u));
        out.hasil.push(H("Tempoh kedua", nom(p1)));
        out.hasil.push(H("Perubahan", (u > 0 ? "+" : "") + pc(u), u > 0 ? "baik" : u < 0 ? "buruk" : "neutral"));
        out.nota = u > 0 ? "Produktiviti meningkat: lebih banyak output dihasilkan bagi setiap unit input." : u < 0 ? "Produktiviti menurun." : "";
      }
      return out;
    }
  });

  tambah({
    id: "kos-sosial",
    bab: "t4-b4",
    no: "4.2.4",
    tajuk: "Kos sosial dan faedah sosial",
    kunci: "kos sosial faedah sosial eksternaliti kos luaran faedah luaran peribadi",
    rumus: ["Kos sosial = Kos peribadi + Kos luaran", "Faedah sosial = Faedah peribadi + Faedah luaran"],
    medan: [
      { k: "kp", l: "Kos peribadi (RM)" },
      { k: "kl", l: "Kos luaran (RM)" },
      { k: "fp", l: "Faedah peribadi (RM)" },
      { k: "fl", l: "Faedah luaran (RM)" }
    ],
    contoh: [{ n: "Nilai contoh (kilang)", v: { kp: 500000, kl: 150000, fp: 600000, fl: 80000 } }],
    kira: function (x) {
      var ks = x.kp + x.kl;
      var fs = x.fp + x.fl;
      var b = fs - ks;
      return {
        hasil: [H("Kos sosial", wang(ks)), H("Faedah sosial", wang(fs)), H("Faedah bersih sosial", wang(b), b > 0 ? "baik" : b < 0 ? "buruk" : "neutral")],
        langkah: [ay("Kos sosial = kos persendirian + kos luaran") + "Kos sosial = " + wang(x.kp) + " + " + wang(x.kl) + " = " + wang(ks), ay("Faedah sosial = faedah persendirian + faedah luaran") + "Faedah sosial = " + wang(x.fp) + " + " + wang(x.fl) + " = " + wang(fs), ay("Faedah bersih kepada masyarakat = faedah sosial − kos sosial") + "Faedah sosial − Kos sosial = " + wang(fs) + " − " + wang(ks) + " = <b>" + wang(b) + "</b>"],
        nota: b > 0 ? "Faedah sosial melebihi kos sosial: aktiviti ini menguntungkan masyarakat." : b < 0 ? "Kos sosial melebihi faedah sosial: aktiviti ini membebankan masyarakat walaupun mungkin menguntungkan firma." : "Faedah sosial sama dengan kos sosial."
      };
    }
  });

  /* =========================================================
     TINGKATAN 5 · BAB 1 · Ekonomi dan Kerajaan
     ========================================================= */
  tambah({
    id: "indeks-harga",
    bab: "t5-b1",
    no: "1.2.1",
    tajuk: "Indeks harga sesuatu barang",
    kunci: "indeks harga tahun dasar tahun semasa",
    rumus: ["Indeks harga = " + frac("Harga tahun semasa", "Harga tahun dasar") + " × 100"],
    medan: [
      { k: "h0", l: "Harga tahun dasar (RM)" },
      { k: "h1", l: "Harga tahun semasa (RM)" }
    ],
    contoh: [{ n: "Makanan RM10 → RM12", v: { h0: 10, h1: 12 } }],
    kira: function (x) {
      if (x.h0 <= 0) return { ralat: "Harga tahun dasar mesti lebih daripada sifar." };
      var i = (x.h1 / x.h0) * 100;
      return {
        hasil: [H("Indeks harga", nom(i)), H("Perubahan harga", (i >= 100 ? "+" : "") + pc(i - 100), i > 100 ? "amaran" : i < 100 ? "baik" : "neutral")],
        langkah: [ay("Indeks harga = harga tahun semasa (pengangka) ÷ harga tahun asas (penyebut) × 100") + "Indeks harga = " + wang(x.h1) + " ÷ " + wang(x.h0) + " × 100 = <b>" + nom(i) + "</b>"],
        nota: i > 100 ? "Harga naik " + pc(i - 100) + " berbanding tahun dasar." : i < 100 ? "Harga turun " + pc(100 - i) + " berbanding tahun dasar." : "Harga sama dengan tahun dasar."
      };
    }
  });

  tambah({
    id: "ihp",
    bab: "t5-b1",
    no: "1.2.1",
    tajuk: "Indeks Harga Pengguna (IHP) berwajaran dan tanpa wajaran",
    kunci: "ihp indeks harga pengguna wajaran tanpa wajaran kos sara hidup",
    rumus: ["IHP tanpa wajaran = " + frac("Jumlah indeks harga", "Bilangan barang"), "IHP berwajaran = " + frac("Jumlah (indeks harga × wajaran)", "Jumlah wajaran")],
    petunjuk: "Klik mana-mana baris untuk melihat pengiraan indeksnya.",
    medan: [
      {
        k: "j",
        jenis: "jadual",
        pilihBaris: 0,
        lajur: [
          { k: "nama", l: "Barang", teks: true },
          { k: "w", l: "Wajaran" },
          { k: "h0", l: "Harga dasar (RM)" },
          { k: "h1", l: "Harga semasa (RM)" },
          { k: "i", l: "Indeks", hasil: true },
          { k: "iw", l: "Indeks × wajaran", hasil: true }
        ]
      }
    ],
    contoh: [
      {
        n: "Contoh buku teks",
        v: {
          j: [
            ["Makanan dan minuman", 30, 10, 12],
            ["Pengangkutan", 25, 4, 4.4],
            ["Perumahan dan utiliti", 20, 800, 840],
            ["Pendidikan", 15, 50, 55],
            ["Pakaian", 10, 60, 57]
          ]
        }
      }
    ],
    kira: function (x) {
      var si = [];
      var siw = [];
      var n = 0;
      var ji = 0;
      var jw = 0;
      var jiw = 0;
      x.j.forEach(function (b) {
        if (b.h0 == null || b.h1 == null || !(b.h0 > 0)) {
          si.push("–");
          siw.push("–");
          return;
        }
        var i = (b.h1 / b.h0) * 100;
        si.push(nom(i));
        n++;
        ji += i;
        if (b.w != null) {
          siw.push(nom(i * b.w));
          jw += b.w;
          jiw += i * b.w;
        } else siw.push("–");
      });
      if (!n) return { ralat: "Isi harga tahun dasar dan tahun semasa sekurang-kurangnya satu barang." };
      var tw = ji / n;
      var L = [];
      var b = x.j[x._baris.j];
      if (b && b.h0 > 0 && b.h1 != null) L.push(ay("Indeks barang = harga tahun semasa ÷ harga tahun asas × 100") + "Indeks " + esc(b.nama || "barang") + " = " + wang(b.h1) + " ÷ " + wang(b.h0) + " × 100 = " + nom((b.h1 / b.h0) * 100));
      L.push(ay("IHP tanpa wajaran = jumlah indeks semua barang (pengangka) ÷ bilangan barang (penyebut)") + "IHP tanpa wajaran = " + nom(ji) + " ÷ " + n + " = <b>" + nom(tw) + "</b>");
      var out = { sel: { i: si, iw: siw }, langkah: L, hasil: [H("IHP tanpa wajaran", nom(tw))] };
      if (jw > 0) {
        var bw = jiw / jw;
        L.push(ay("IHP berwajaran = jumlah (indeks × wajaran) (pengangka) ÷ jumlah wajaran (penyebut)") + "IHP berwajaran = " + nom(jiw) + " ÷ " + nom(jw) + " = <b>" + nom(bw) + "</b>");
        out.hasil.push(H("IHP berwajaran", nom(bw), bw > 100 ? "amaran" : "baik"));
        out.nota = bw > 100 ? "Tingkat harga umum tahun semasa naik " + pc(bw - 100) + " berbanding tahun dasar: kos sara hidup meningkat." : bw < 100 ? "Tingkat harga umum turun " + pc(100 - bw) + " berbanding tahun dasar." : "Tingkat harga umum sama dengan tahun dasar.";
      }
      return out;
    }
  });

  tambah({
    id: "inflasi",
    bab: "t5-b1",
    no: "1.2.2",
    tajuk: "Kadar inflasi",
    kunci: "kadar inflasi ihp deflasi merangkak hiperinflasi",
    rumus: ["Kadar inflasi = " + frac("IHP tahun semasa − IHP tahun sebelumnya", "IHP tahun sebelumnya") + " × 100"],
    medan: [
      { k: "i0", l: "IHP tahun sebelumnya" },
      { k: "i1", l: "IHP tahun semasa" }
    ],
    contoh: [{ n: "IHP 120 → 123", v: { i0: 120, i1: 123 } }],
    kira: function (x) {
      if (x.i0 <= 0) return { ralat: "IHP tahun sebelumnya mesti lebih daripada sifar." };
      var r = ((x.i1 - x.i0) / x.i0) * 100;
      var j;
      if (r < 0) j = H("Keadaan", "Deflasi", "biru");
      else if (r === 0) j = H("Keadaan", "Harga stabil", "neutral");
      else if (r <= 3) j = H("Keadaan", "Inflasi sederhana", "baik");
      else if (r <= 5) j = H("Keadaan", "Inflasi merangkak", "amaran");
      else if (r < 100) j = H("Keadaan", "Inflasi tinggi", "buruk");
      else j = H("Keadaan", "Hiperinflasi", "buruk");
      return {
        hasil: [H("Kadar inflasi", pc(r)), j],
        langkah: [ay("Kadar inflasi = (IHP tahun semasa − IHP tahun sebelum) ÷ IHP tahun sebelum × 100") + "Kadar inflasi = (" + nom(x.i1) + " − " + nom(x.i0) + ") ÷ " + nom(x.i0) + " × 100 = <b>" + pc(r) + "</b>"],
        nota: "Klasifikasi buku teks: inflasi sederhana 2% hingga 3% setahun, inflasi merangkak 4% hingga 5% setahun, hiperinflasi beratus-ratus peratus setahun. Kadar negatif bermaksud deflasi."
      };
    }
  });

  tambah({
    id: "tolakan-kos",
    bab: "t5-b1",
    no: "1.2.2",
    tajuk: "Inflasi tolakan kos: harga jualan dengan margin untung",
    kunci: "inflasi tolakan kos margin keuntungan harga jualan kos pengeluaran",
    rumus: ["Harga jualan = Kos seunit × (1 + Margin untung ÷ 100)"],
    medan: [
      { k: "k0", l: "Kos seunit asal (RM)" },
      { k: "k1", l: "Kos seunit baharu (RM)" },
      { k: "m", l: "Margin untung (%)" }
    ],
    contoh: [{ n: "Baju RM12 → RM15", v: { k0: 12, k1: 15, m: 20 } }],
    kira: function (x) {
      var h0 = x.k0 * (1 + x.m / 100);
      var h1 = x.k1 * (1 + x.m / 100);
      var out = {
        hasil: [H("Harga asal", wang(h0)), H("Harga baharu", wang(h1))],
        langkah: [ay("Harga jualan = kos seunit + margin untung × kos seunit") + "Harga asal = " + wang(x.k0) + " + " + pc(x.m) + " × " + wang(x.k0) + " = " + wang(h0), ay("Harga baharu = kos seunit baharu + margin untung × kos seunit baharu") + "Harga baharu = " + wang(x.k1) + " + " + pc(x.m) + " × " + wang(x.k1) + " = <b>" + wang(h1) + "</b>"]
      };
      if (h0 > 0) {
        var u = ((h1 - h0) / h0) * 100;
        out.langkah.push(ay("Kenaikan harga = (harga baharu − harga asal) ÷ harga asal × 100") + "Kenaikan harga = (" + wang(h1) + " − " + wang(h0) + ") ÷ " + wang(h0) + " × 100 = " + pc(u));
        out.hasil.push(H("Kenaikan harga", pc(u), u > 0 ? "amaran" : "neutral"));
      }
      out.nota = "Kenaikan kos pengeluaran dipindahkan kepada pengguna melalui harga yang lebih tinggi: inflasi tolakan kos.";
      return out;
    }
  });

  tambah({
    id: "pendapatan-benar",
    bab: "t5-b1",
    no: "1.2.3",
    tajuk: "Pendapatan benar",
    kunci: "pendapatan benar nominal ihp kuasa beli gaji",
    rumus: ["Pendapatan benar = " + frac("Pendapatan nominal", "IHP") + " × 100"],
    medan: [
      { k: "n", l: "Pendapatan nominal (RM)" },
      { k: "ihp", l: "IHP" }
    ],
    contoh: [{ n: "Gaji RM3 000, IHP 120", v: { n: 3000, ihp: 120 } }],
    kira: function (x) {
      if (x.ihp <= 0) return { ralat: "IHP mesti lebih daripada sifar." };
      var b = (x.n / x.ihp) * 100;
      return {
        hasil: [H("Pendapatan benar", wang(b)), H("Beza kuasa beli", wang(b - x.n), b < x.n ? "buruk" : "baik")],
        langkah: [ay("Pendapatan benar = pendapatan nominal (pengangka) ÷ IHP (penyebut) × 100") + "Pendapatan benar = " + wang(x.n) + " ÷ " + nom(x.ihp) + " × 100 = <b>" + wang(b) + "</b>"],
        nota: x.ihp > 100 ? "IHP melebihi 100: harga naik berbanding tahun dasar, maka kuasa beli gaji " + wang(x.n) + " hanya bernilai " + wang(b) + " pada harga tahun dasar." : "IHP 100 ke bawah: kuasa beli tidak berkurang berbanding tahun dasar."
      };
    }
  });

  tambah({
    id: "pengangguran",
    bab: "t5-b1",
    no: "1.2.4",
    tajuk: "Kadar pengangguran dan kadar penyertaan tenaga buruh (KPTB)",
    kunci: "pengangguran penganggur tenaga buruh guna tenaga penuh kptb penyertaan",
    rumus: [
      "Kadar pengangguran = " + frac("Bilangan penganggur", "Jumlah tenaga buruh") + " × 100 = " + frac("Tenaga buruh − Guna tenaga", "Tenaga buruh") + " × 100",
      "KPTB = " + frac("Tenaga buruh", "Penduduk berumur 15–64 tahun") + " × 100"
    ],
    petunjuk: "Nilai dalam ribu orang. Penduduk 15–64 tahun dalam contoh dianggarkan daripada KPTB dalam buku teks.",
    medan: [
      {
        k: "data",
        jenis: "pilih",
        l: "Data diberi",
        pilihan: [
          ["penganggur", "Bilangan penganggur"],
          ["guna", "Guna tenaga (bekerja)"]
        ]
      },
      { k: "tb", l: "Tenaga buruh" },
      {
        k: "pg",
        l: "Bilangan penganggur",
        bila: function (x) {
          return x.data === "penganggur";
        }
      },
      {
        k: "gt",
        l: "Guna tenaga (bekerja)",
        bila: function (x) {
          return x.data === "guna";
        }
      },
      { k: "pend", l: "Penduduk 15–64 tahun", opsyenal: true }
    ],
    contoh: [
      { n: "2016", v: { data: "penganggur", tb: 14667.8, pg: 504.1, gt: 14163.7, pend: 21666 } },
      { n: "2015", v: { data: "guna", tb: 14518, pg: 450.3, gt: 14067.7, pend: 21381.4 } },
      { n: "2014", v: { data: "penganggur", tb: 13931.6, pg: 399.5, gt: 13532.1, pend: 20639.4 } }
    ],
    kira: function (x) {
      if (x.tb <= 0) return { ralat: "Tenaga buruh mesti lebih daripada sifar." };
      var L = [];
      var pg = x.pg;
      if (x.data === "guna") {
        pg = x.tb - x.gt;
        L.push(ay("Penganggur = jumlah tenaga buruh − guna tenaga") + "Penganggur = " + nom(x.tb) + " − " + nom(x.gt) + " = " + nom(pg));
      }
      var k = (pg / x.tb) * 100;
      L.push(ay("Kadar pengangguran = bilangan penganggur (pengangka) ÷ jumlah tenaga buruh (penyebut) × 100") + "Kadar pengangguran = " + nom(pg) + " ÷ " + nom(x.tb) + " × 100 = <b>" + pc(k) + "</b>");
      var penuh = k < 4;
      var out = { hasil: [H("Kadar pengangguran", pc(k)), H("Guna tenaga penuh", penuh ? "Ya (&lt; 4%)" : "Tidak (≥ 4%)", penuh ? "baik" : "buruk")], langkah: L };
      if (x.pend != null && x.pend > 0) {
        var kp = (x.tb / x.pend) * 100;
        L.push(ay("KPTB = jumlah tenaga buruh (pengangka) ÷ penduduk umur 15–64 tahun (penyebut) × 100") + "KPTB = " + nom(x.tb) + " ÷ " + nom(x.pend) + " × 100 = <b>" + pc(kp) + "</b>");
        out.hasil.push(H("KPTB", pc(kp)));
      }
      out.nota = penuh ? "Kadar pengangguran kurang daripada 4%, maka ekonomi mencapai guna tenaga penuh." : "Kadar pengangguran 4% atau lebih: ekonomi belum mencapai guna tenaga penuh.";
      return out;
    }
  });

  tambah({
    id: "kdnk",
    bab: "t5-b1",
    no: "1.2.6",
    tajuk: "KDNK kaedah perbelanjaan",
    kunci: "kdnk keluaran dalam negara kasar perbelanjaan penggunaan pelaburan kerajaan eksport import eksport bersih",
    rumus: ["KDNK = C + I + G + (X − M)"],
    petunjuk: "C penggunaan swasta, I pelaburan swasta, G perbelanjaan kerajaan, X eksport, M import.",
    medan: [
      { k: "c", l: "Penggunaan swasta C" },
      { k: "i", l: "Pelaburan swasta I" },
      { k: "g", l: "Perbelanjaan kerajaan G" },
      { k: "xx", l: "Eksport X" },
      { k: "m", l: "Import M" }
    ],
    contoh: [{ n: "RM bilion", v: { c: 1000, i: 360, g: 240, xx: 1300, m: 1100 } }],
    kira: function (x) {
      var xm = x.xx - x.m;
      var k = x.c + x.i + x.g + xm;
      return {
        hasil: [H("KDNK", nom(k)), H("Eksport bersih (X − M)", nom(xm), xm >= 0 ? "baik" : "buruk")],
        langkah: [ay("Eksport bersih = eksport − import") + "X − M = " + nom(x.xx) + " − " + nom(x.m) + " = " + nom(xm), ay("KDNK = penggunaan (C) + pelaburan (I) + perbelanjaan kerajaan (G) + eksport bersih (X − M)") + "KDNK = " + nom(x.c) + " + " + nom(x.i) + " + " + nom(x.g) + " + " + kr(xm) + " = <b>" + nom(k) + "</b>"],
        nota: "Unit jawapan sama dengan unit data (contohnya RM bilion)."
      };
    }
  });

  tambah({
    id: "kdnk-benar",
    bab: "t5-b1",
    no: "1.2.6",
    tajuk: "KDNK benar",
    kunci: "kdnk benar nominal harga malar indeks harga deflator",
    rumus: ["KDNK benar = " + frac("KDNK nominal", "Indeks harga") + " × 100"],
    medan: [
      { k: "n", l: "KDNK nominal" },
      { k: "i", l: "Indeks harga" }
    ],
    contoh: [{ n: "Nilai contoh", v: { n: 1800, i: 120 } }],
    kira: function (x) {
      if (x.i <= 0) return { ralat: "Indeks harga mesti lebih daripada sifar." };
      var b = (x.n / x.i) * 100;
      return {
        hasil: [H("KDNK benar", nom(b))],
        langkah: [ay("KDNK benar = KDNK nominal (pengangka) ÷ indeks harga (penyebut) × 100") + "KDNK benar = " + nom(x.n) + " ÷ " + nom(x.i) + " × 100 = <b>" + nom(b) + "</b>"],
        nota: x.i > 100 ? "Indeks melebihi 100: sebahagian nilai KDNK nominal disebabkan kenaikan harga, bukan pertambahan output." : "KDNK benar menyingkirkan kesan perubahan harga supaya output sebenar dapat dibandingkan."
      };
    }
  });

  tambah({
    id: "pertumbuhan",
    bab: "t5-b1",
    no: "1.2.7",
    tajuk: "Kadar pertumbuhan ekonomi",
    kunci: "kadar pertumbuhan ekonomi kdnk benar kemelesetan",
    rumus: ["Kadar pertumbuhan ekonomi = " + frac("KDNK benar tahun semasa − KDNK benar tahun sebelumnya", "KDNK benar tahun sebelumnya") + " × 100"],
    medan: [
      {
        k: "data",
        jenis: "pilih",
        l: "Data diberi",
        pilihan: [
          ["benar", "KDNK benar"],
          ["nominal", "KDNK nominal + indeks harga"]
        ]
      },
      {
        k: "b0",
        l: "KDNK benar tahun sebelumnya",
        bila: function (x) {
          return x.data === "benar";
        }
      },
      {
        k: "b1",
        l: "KDNK benar tahun semasa",
        bila: function (x) {
          return x.data === "benar";
        }
      },
      {
        k: "n0",
        l: "KDNK nominal tahun sebelumnya",
        bila: function (x) {
          return x.data === "nominal";
        }
      },
      {
        k: "i0",
        l: "Indeks harga tahun sebelumnya",
        bila: function (x) {
          return x.data === "nominal";
        }
      },
      {
        k: "n1",
        l: "KDNK nominal tahun semasa",
        bila: function (x) {
          return x.data === "nominal";
        }
      },
      {
        k: "i1",
        l: "Indeks harga tahun semasa",
        bila: function (x) {
          return x.data === "nominal";
        }
      }
    ],
    contoh: [
      { n: "KDNK benar", v: { data: "benar", b0: 1500, b1: 1575, n0: 1800, i0: 120, n1: 1968.75, i1: 125 } },
      { n: "KDNK nominal", v: { data: "nominal", b0: 1200, b1: 1260, n0: 1440, i0: 120, n1: 1575, i1: 125 } }
    ],
    kira: function (x) {
      var L = [];
      var b0 = x.b0;
      var b1 = x.b1;
      if (x.data === "nominal") {
        if (x.i0 <= 0 || x.i1 <= 0) return { ralat: "Indeks harga mesti lebih daripada sifar." };
        b0 = (x.n0 / x.i0) * 100;
        b1 = (x.n1 / x.i1) * 100;
        L.push(ay("KDNK benar tahun sebelum = KDNK nominal ÷ indeks harga × 100") + "KDNK benar tahun sebelumnya = " + nom(x.n0) + " ÷ " + nom(x.i0) + " × 100 = " + nom(b0));
        L.push(ay("KDNK benar tahun semasa = KDNK nominal ÷ indeks harga × 100") + "KDNK benar tahun semasa = " + nom(x.n1) + " ÷ " + nom(x.i1) + " × 100 = " + nom(b1));
      }
      if (b0 <= 0) return { ralat: "KDNK benar tahun sebelumnya mesti lebih daripada sifar." };
      var g = ((b1 - b0) / b0) * 100;
      L.push(ay("Kadar pertumbuhan = (KDNK benar tahun semasa − KDNK benar tahun sebelum) ÷ KDNK benar tahun sebelum × 100") + "Kadar pertumbuhan = (" + nom(b1) + " − " + nom(b0) + ") ÷ " + nom(b0) + " × 100 = <b>" + pc(g) + "</b>");
      return {
        hasil: [H("Kadar pertumbuhan", pc(g)), H("Keadaan", g > 0 ? "Pertumbuhan ekonomi" : g < 0 ? "Kemelesetan ekonomi" : "Tiada pertumbuhan", g > 0 ? "baik" : g < 0 ? "buruk" : "neutral")],
        langkah: L,
        nota: "Kadar positif menunjukkan pertumbuhan ekonomi; kadar negatif menunjukkan kemelesetan ekonomi."
      };
    }
  });

  tambah({
    id: "belanjawan-negara",
    bab: "t5-b1",
    no: "1.3.5",
    tajuk: "Belanjawan negara: lebihan, defisit atau seimbang",
    kunci: "belanjawan negara hasil kerajaan perbelanjaan mengurus pembangunan defisit lebihan dasar fiskal cukai langsung tidak langsung",
    rumus: ["Hasil kerajaan = Cukai langsung + Cukai tidak langsung + Hasil bukan cukai", "Perbelanjaan kerajaan = Perbelanjaan mengurus + Perbelanjaan pembangunan", "Imbangan belanjawan = Hasil kerajaan − Perbelanjaan kerajaan"],
    petunjuk: "Hasil kerajaan 2016 dalam buku teks: RM212 595 juta (cukai langsung 52%, tidak langsung 27%, bukan cukai 21%). Perbelanjaan ialah nilai contoh.",
    medan: [
      { k: "cl", l: "Cukai langsung (RM juta)" },
      { k: "ctl", l: "Cukai tidak langsung (RM juta)" },
      { k: "bc", l: "Hasil bukan cukai (RM juta)" },
      { k: "mg", l: "Perbelanjaan mengurus (RM juta)" },
      { k: "pb", l: "Perbelanjaan pembangunan (RM juta)" },
      { k: "kdnk", l: "KDNK (RM juta)", opsyenal: true }
    ],
    contoh: [{ n: "Hasil 2016", v: { cl: 110549, ctl: 57401, bc: 44645, mg: 215000, pb: 52000, kdnk: "" } }],
    kira: function (x) {
      var h = x.cl + x.ctl + x.bc;
      var p = x.mg + x.pb;
      var b = h - p;
      var L = [ay("Hasil kerajaan = cukai langsung + cukai tak langsung + hasil bukan cukai") + "Hasil kerajaan = " + nom(x.cl) + " + " + nom(x.ctl) + " + " + nom(x.bc) + " = " + nom(h), ay("Perbelanjaan kerajaan = perbelanjaan mengurus + perbelanjaan pembangunan") + "Perbelanjaan kerajaan = " + nom(x.mg) + " + " + nom(x.pb) + " = " + nom(p), ay("Imbangan belanjawan = hasil − perbelanjaan (positif: lebihan; negatif: defisit)") + "Imbangan = " + nom(h) + " − " + nom(p) + " = <b>" + nom(b) + "</b>"];
      var out = {
        hasil: [H("Hasil", nom(h)), H("Perbelanjaan", nom(p)), H("Belanjawan", b > 0 ? "Lebihan " + nom(b) : b < 0 ? "Defisit " + nom(-b) : "Seimbang", b > 0 ? "baik" : b < 0 ? "buruk" : "neutral")],
        langkah: L
      };
      if (x.kdnk != null && x.kdnk > 0) {
        L.push(ay("Imbangan sebagai % KDNK = imbangan belanjawan (pengangka) ÷ KDNK (penyebut) × 100") + "Imbangan sebagai % KDNK = " + nom(b) + " ÷ " + nom(x.kdnk) + " × 100 = " + pc((b / x.kdnk) * 100));
        out.hasil.push(H("% KDNK", pc((b / x.kdnk) * 100)));
      }
      out.nota =
        b > 0
          ? "Belanjawan lebihan: dasar fiskal menguncup, digunakan untuk mengawal inflasi."
          : b < 0
          ? "Belanjawan defisit: dasar fiskal mengembang, digunakan untuk merangsang ekonomi semasa kemelesetan. Defisit dibiayai melalui pinjaman."
          : "Belanjawan seimbang: hasil sama dengan perbelanjaan, digunakan apabila ekonomi berada pada guna tenaga penuh.";
      return out;
    }
  });

  tambah({
    id: "jenis-cukai",
    bab: "t5-b1",
    no: "1.3.3",
    tajuk: "Cukai progresif, regresif atau berkadar malar",
    kunci: "cukai progresif regresif berkadar malar agihan pendapatan kadar cukai purata gst",
    rumus: ["Kadar cukai = " + frac("Jumlah cukai dibayar", "Pendapatan") + " × 100"],
    medan: [
      { k: "pa", l: "Pendapatan individu A (RM)" },
      { k: "ca", l: "Cukai dibayar A (RM)" },
      { k: "pb", l: "Pendapatan individu B (RM)" },
      { k: "cb", l: "Cukai dibayar B (RM)" }
    ],
    contoh: [
      { n: "Cukai pendapatan", v: { pa: 60000, ca: 4000, pb: 18000, cb: 130 } },
      { n: "GST 6% atas RM300", v: { pa: 5000, ca: 18, pb: 1500, cb: 18 } },
      { n: "Cukai syarikat 24%", v: { pa: 1000000, ca: 240000, pb: 200000, cb: 48000 } }
    ],
    kira: function (x) {
      if (x.pa <= 0 || x.pb <= 0) return { ralat: "Pendapatan mesti lebih daripada sifar." };
      if (x.pa === x.pb) return { ralat: "Masukkan dua pendapatan yang berbeza untuk dibandingkan." };
      var ka = (x.ca / x.pa) * 100;
      var kb = (x.cb / x.pb) * 100;
      var tinggi = x.pa > x.pb ? ka : kb;
      var rendah = x.pa > x.pb ? kb : ka;
      var j;
      if (Math.abs(tinggi - rendah) < 0.005) j = H("Jenis cukai", "Berkadar malar", "neutral");
      else if (tinggi > rendah) j = H("Jenis cukai", "Progresif", "baik");
      else j = H("Jenis cukai", "Regresif", "buruk");
      var nota = {
        Progresif: "Kadar cukai meningkat apabila pendapatan meningkat. Golongan kaya membayar lebih, maka jurang pendapatan dapat dirapatkan.",
        Regresif: "Kadar cukai menurun apabila pendapatan meningkat. Cukai ini lebih membebankan golongan berpendapatan rendah dan meluaskan jurang pendapatan.",
        "Berkadar malar": "Kadar cukai tetap walaupun pendapatan berubah. Jumlah cukai berkadaran dengan pendapatan."
      }[j.v];
      return {
        hasil: [H("Kadar A", pc(ka)), H("Kadar B", pc(kb)), j],
        langkah: [ay("Kadar cukai = cukai dibayar (pengangka) ÷ pendapatan (penyebut) × 100") + "Kadar A = " + wang(x.ca) + " ÷ " + wang(x.pa) + " × 100 = " + pc(ka), ay("Kadar cukai = cukai dibayar (pengangka) ÷ pendapatan (penyebut) × 100") + "Kadar B = " + wang(x.cb) + " ÷ " + wang(x.pb) + " × 100 = " + pc(kb)],
        nota: nota
      };
    }
  });

  tambah({
    id: "cukai-syarikat",
    bab: "t5-b1",
    no: "1.3.2",
    tajuk: "Cukai pendapatan syarikat",
    kunci: "cukai pendapatan syarikat pks modal berbayar cukai langsung",
    rumus: ["Syarikat bermodal RM2.5 juta ke bawah: 19% × RM500 000 pertama + 24% × baki", "Syarikat lain: 24% × pendapatan boleh cukai"],
    petunjuk: "Kadar tahun taksiran 2016 seperti dalam buku teks.",
    medan: [
      {
        k: "jenis",
        jenis: "pilih",
        l: "Jenis syarikat",
        pilihan: [
          ["kecil", "Modal RM2.5 juta ke bawah"],
          ["lain", "Syarikat lain"]
        ]
      },
      { k: "u", l: "Pendapatan boleh cukai (RM)" }
    ],
    contoh: [
      { n: "Syarikat kecil", v: { jenis: "kecil", u: 800000 } },
      { n: "Syarikat lain", v: { jenis: "lain", u: 800000 } }
    ],
    kira: function (x) {
      var L = [];
      var c;
      if (x.jenis === "kecil") {
        var a = Math.min(x.u, 500000);
        var b = Math.max(0, x.u - 500000);
        c = a * 0.19 + b * 0.24;
        L.push(ay("Cukai = kadar cukai × pendapatan bercukai dalam banjaran") + "19% × " + wang(a) + " = " + wang(a * 0.19));
        if (b > 0) L.push("24% × " + wang(b) + " = " + wang(b * 0.24));
        L.push("Jumlah cukai = <b>" + wang(c) + "</b>");
      } else {
        c = x.u * 0.24;
        L.push(ay("Cukai = kadar cukai × pendapatan bercukai") + "Cukai = 24% × " + wang(x.u) + " = <b>" + wang(c) + "</b>");
      }
      return {
        hasil: [H("Cukai syarikat", wang(c)), H("Kadar purata", x.u > 0 ? pc((c / x.u) * 100) : "–")],
        langkah: L
      };
    }
  });

  tambah({
    id: "rizab",
    bab: "t5-b1",
    no: "1.3.7",
    tajuk: "Nisbah rizab berkanun",
    kunci: "rizab berkanun nisbah rizab deposit bank perdagangan bank pusat dasar kewangan bekalan wang pinjaman",
    rumus: ["Rizab wajib = Jumlah deposit × Nisbah rizab berkanun", "Lebihan rizab untuk dipinjamkan = Jumlah deposit − Rizab wajib"],
    medan: [
      { k: "d", l: "Jumlah deposit (RM juta)" },
      { k: "n", l: "Nisbah rizab berkanun (%)" },
      { k: "n1", l: "Nisbah baharu (%)", opsyenal: true }
    ],
    contoh: [
      { n: "2013: 3%", v: { d: 65000, n: 3, n1: 4 } },
      { n: "2016: 4%", v: { d: 68000, n: 4, n1: "" } }
    ],
    kira: function (x) {
      var r = (x.d * x.n) / 100;
      var L = [ay("Rizab wajib = deposit × nisbah rizab berkanun") + "Rizab wajib = " + nom(x.d) + " × " + pc(x.n) + " = <b>" + nom(r) + "</b>", ay("Boleh dipinjamkan = deposit − rizab wajib") + "Boleh dipinjamkan = " + nom(x.d) + " − " + nom(r) + " = " + nom(x.d - r)];
      var out = { hasil: [H("Rizab wajib", nom(r)), H("Boleh dipinjamkan", nom(x.d - r))], langkah: L };
      if (x.n1 != null) {
        var r1 = (x.d * x.n1) / 100;
        L.push(ay("Rizab wajib baharu = deposit × nisbah rizab baharu") + "Pada nisbah " + pc(x.n1) + ": rizab wajib = " + nom(x.d) + " × " + pc(x.n1) + " = " + nom(r1) + ", boleh dipinjamkan = " + nom(x.d - r1));
        out.hasil.push(H("Perubahan pinjaman", (r - r1 >= 0 ? "+" : "") + nom(r - r1), r1 > r ? "buruk" : r1 < r ? "baik" : "neutral"));
        out.nota = r1 > r ? "Nisbah dinaikkan: lebih banyak wang disimpan di bank pusat, kurang wang boleh dipinjamkan, bekalan wang berkurang (dasar kewangan menguncup)." : r1 < r ? "Nisbah diturunkan: lebih banyak wang boleh dipinjamkan, bekalan wang bertambah (dasar kewangan mengembang)." : "";
      } else {
        out.nota = "Nisbah rizab dinaikkan untuk mengawal inflasi dan diturunkan semasa kemelesetan.";
      }
      return out;
    }
  });

  /* =========================================================
     TINGKATAN 5 · BAB 2 · Malaysia dan Ekonomi Global
     ========================================================= */
  tambah({
    id: "faedah-berbanding",
    bab: "t5-b2",
    no: "2.2.1",
    tajuk: "Faedah berbanding dan pengkhususan",
    kunci: "faedah berbanding mutlak kos lepas pengkhususan perdagangan antarabangsa getah beras",
    rumus: ["Kos lepas 1 unit barang X = " + frac("Output barang Y", "Output barang X"), "Negara dengan kos lepas lebih rendah mempunyai faedah berbanding"],
    medan: [
      { k: "na", l: "Negara pertama", teks: true },
      { k: "nb", l: "Negara kedua", teks: true },
      { k: "bx", l: "Barang X", teks: true },
      { k: "by", l: "Barang Y", teks: true },
      { k: "ax", l: "Output X negara pertama" },
      { k: "ay", l: "Output Y negara pertama" },
      { k: "cx", l: "Output X negara kedua" },
      { k: "cy", l: "Output Y negara kedua" }
    ],
    contoh: [{ n: "Getah dan beras", v: { na: "A", nb: "B", bx: "getah", by: "beras", ax: 120, ay: 90, cx: 40, cy: 60 } }],
    kira: function (x) {
      if (x.ax <= 0 || x.ay <= 0 || x.cx <= 0 || x.cy <= 0) return { ralat: "Semua output mesti lebih daripada sifar." };
      var A = esc(x.na || "A");
      var B = esc(x.nb || "B");
      var X = esc(x.bx || "X");
      var Y = esc(x.by || "Y");
      var klAX = x.ay / x.ax;
      var klAY = x.ax / x.ay;
      var klBX = x.cy / x.cx;
      var klBY = x.cx / x.cy;
      var L = [
        ay("Kos lepas 1 unit barang = keluaran barang lain yang dikorbankan (pengangka) ÷ keluaran barang itu (penyebut)") + A + ": kos lepas 1 " + X + " = " + nom(x.ay) + " ÷ " + nom(x.ax) + " = " + nom(klAX) + " " + Y,
        ay("Kos lepas 1 unit barang = keluaran barang lain yang dikorbankan (pengangka) ÷ keluaran barang itu (penyebut)") + A + ": kos lepas 1 " + Y + " = " + nom(x.ax) + " ÷ " + nom(x.ay) + " = " + nom(klAY) + " " + X,
        ay("Kos lepas 1 unit barang = keluaran barang lain yang dikorbankan (pengangka) ÷ keluaran barang itu (penyebut)") + B + ": kos lepas 1 " + X + " = " + nom(x.cy) + " ÷ " + nom(x.cx) + " = " + nom(klBX) + " " + Y,
        ay("Kos lepas 1 unit barang = keluaran barang lain yang dikorbankan (pengangka) ÷ keluaran barang itu (penyebut)") + B + ": kos lepas 1 " + Y + " = " + nom(x.cx) + " ÷ " + nom(x.cy) + " = " + nom(klBY) + " " + X
      ];
      if (sama(klAX, klBX)) return { hasil: [H("Faedah berbanding", "Tiada", "neutral")], langkah: L, nota: "Kos lepas kedua-dua negara sama, maka tiada faedah berbanding dan tiada keuntungan daripada pengkhususan." };
      var xA = klAX < klBX;
      L.push("Kos lepas " + X + " lebih rendah di " + (xA ? A : B) + " (" + nom(Math.min(klAX, klBX)) + " &lt; " + nom(Math.max(klAX, klBX)) + ")");
      var mutlak = [];
      var mx = x.ax !== x.cx ? (x.ax > x.cx ? A : B) : null;
      var my = x.ay !== x.cy ? (x.ay > x.cy ? A : B) : null;
      if (mx && mx === my) mutlak.push(mx + " dalam kedua-dua barang");
      else {
        if (mx) mutlak.push(mx + " dalam " + X);
        if (my) mutlak.push(my + " dalam " + Y);
      }
      return {
        hasil: [H("Khusus " + X, xA ? A : B, "baik"), H("Khusus " + Y, xA ? B : A, "biru")],
        langkah: L,
        nota: (xA ? A : B) + " mengkhusus dalam " + X + " dan " + (xA ? B : A) + " dalam " + Y + ", kemudian berdagang: kedua-dua negara untung." + (mutlak.length ? " Faedah mutlak (output lebih banyak): " + mutlak.join("; ") + "." : "")
      };
    }
  });

  tambah({
    id: "tarif",
    bab: "t5-b2",
    no: "2.2.4",
    tajuk: "Tarif spesifik dan tarif ad valorem",
    kunci: "tarif spesifik ad valorem duti import sekatan perdagangan hasil tarif",
    rumus: ["Tarif spesifik = Kadar tetap seunit × Kuantiti import", "Tarif ad valorem = Kadar (%) × Nilai barang import"],
    medan: [
      {
        k: "jenis",
        jenis: "pilih",
        l: "Jenis tarif",
        pilihan: [
          ["spesifik", "Tarif spesifik"],
          ["ad", "Tarif ad valorem"]
        ]
      },
      {
        k: "t",
        l: "Tarif seunit (RM)",
        bila: function (x) {
          return x.jenis === "spesifik";
        }
      },
      {
        k: "k",
        l: "Kadar tarif (%)",
        bila: function (x) {
          return x.jenis === "ad";
        }
      },
      { k: "h", l: "Harga seunit sebelum tarif (RM)", opsyenal: true },
      { k: "q", l: "Kuantiti import (unit)" }
    ],
    contoh: [
      { n: "Mesin RM300 × 20", v: { jenis: "spesifik", t: 300, k: 10, h: "", q: 20 } },
      { n: "Kasut 10% × RM250", v: { jenis: "ad", t: 25, k: 10, h: 250, q: 1 } }
    ],
    kira: function (x) {
      var L = [];
      var seunit;
      if (x.jenis === "spesifik") {
        seunit = x.t;
        L.push("Tarif seunit = " + wang(seunit) + " (tetap, tidak bergantung pada harga)");
      } else {
        if (x.h == null) return { ralat: "Tarif ad valorem memerlukan harga seunit barang." };
        seunit = (x.k / 100) * x.h;
        L.push(ay("Tarif seunit = kadar tarif × harga import seunit") + "Tarif seunit = " + pc(x.k) + " × " + wang(x.h) + " = " + wang(seunit));
      }
      var jum = seunit * x.q;
      L.push(ay("Hasil tarif = tarif seunit × kuantiti import") + "Hasil tarif = " + wang(seunit) + " × " + nom(x.q) + " = <b>" + wang(jum) + "</b>");
      var out = { hasil: [H("Tarif seunit", wang(seunit)), H("Hasil tarif kerajaan", wang(jum))], langkah: L };
      if (x.h != null) {
        L.push(ay("Harga selepas tarif = harga import + tarif seunit") + "Harga seunit selepas tarif = " + wang(x.h) + " + " + wang(seunit) + " = " + wang(x.h + seunit));
        out.hasil.push(H("Harga selepas tarif", wang(x.h + seunit), "amaran"));
      }
      out.nota = "Tarif menaikkan harga barang import, maka permintaan terhadap barang import berkurang dan industri tempatan dilindungi. Kutipan tarif menjadi sumber hasil kerajaan.";
      return out;
    }
  });

  tambah({
    id: "akaun-semasa",
    bab: "t5-b2",
    no: "2.3.3",
    tajuk: "Akaun semasa dalam imbangan pembayaran",
    kunci: "imbangan pembayaran akaun semasa imbangan dagangan perkhidmatan pendapatan primer sekunder eksport import lebihan defisit",
    rumus: [
      "Imbangan dagangan = Eksport barang nampak − Import barang nampak",
      "Imbangan perkhidmatan = Eksport barang tak nampak − Import barang tak nampak",
      "Imbangan akaun pendapatan = Penerimaan pendapatan − Pembayaran pendapatan",
      "Akaun semasa = Barangan + Perkhidmatan + Pendapatan primer + Pendapatan sekunder"
    ],
    petunjuk: "Barangan: data 2016 buku teks (RM juta). Komponen lain ialah nilai contoh.",
    medan: [
      { k: "xb", l: "Eksport barang nampak" },
      { k: "mb", l: "Import barang nampak" },
      { k: "xp", l: "Eksport perkhidmatan" },
      { k: "mp", l: "Import perkhidmatan" },
      { k: "p1", l: "Pendapatan primer diterima" },
      { k: "b1", l: "Pendapatan primer dibayar" },
      { k: "p2", l: "Pendapatan sekunder diterima" },
      { k: "b2", l: "Pendapatan sekunder dibayar" }
    ],
    contoh: [{ n: "RM juta", v: { xb: 686075, mb: 584693, xp: 144000, mp: 165000, p1: 52000, b1: 94000, p2: 8000, b2: 32000 } }],
    kira: function (x) {
      var d = x.xb - x.mb;
      var p = x.xp - x.mp;
      var a1 = x.p1 - x.b1;
      var a2 = x.p2 - x.b2;
      var s = d + p + a1 + a2;
      function st(v) {
        return v > 0 ? "baik" : v < 0 ? "buruk" : "neutral";
      }
      return {
        hasil: [H("Imbangan dagangan", nom(d), st(d)), H("Imbangan perkhidmatan", nom(p), st(p)), H("Pendapatan primer", nom(a1), st(a1)), H("Pendapatan sekunder", nom(a2), st(a2)), H("Akaun semasa", (s > 0 ? "Lebihan " : s < 0 ? "Defisit " : "") + nom(Math.abs(s)), st(s))],
        langkah: [
          ay("Imbangan dagangan = eksport barang − import barang") + "Imbangan dagangan = " + nom(x.xb) + " − " + nom(x.mb) + " = " + nom(d),
          ay("Imbangan perkhidmatan = eksport perkhidmatan − import perkhidmatan") + "Imbangan perkhidmatan = " + nom(x.xp) + " − " + nom(x.mp) + " = " + nom(p),
          ay("Pendapatan primer = penerimaan − pembayaran") + "Pendapatan primer = " + nom(x.p1) + " − " + nom(x.b1) + " = " + nom(a1),
          ay("Pendapatan sekunder = penerimaan − pembayaran") + "Pendapatan sekunder = " + nom(x.p2) + " − " + nom(x.b2) + " = " + nom(a2),
          ay("Akaun semasa = imbangan dagangan + imbangan perkhidmatan + pendapatan primer + pendapatan sekunder") + "Akaun semasa = " + nom(d) + " + " + kr(p) + " + " + kr(a1) + " + " + kr(a2) + " = <b>" + nom(s) + "</b>"
        ],
        nota: s > 0 ? "Lebihan akaun semasa: jumlah penerimaan melebihi jumlah pembayaran." : s < 0 ? "Defisit akaun semasa: jumlah pembayaran melebihi jumlah penerimaan." : "Akaun semasa seimbang."
      };
    }
  });

  tambah({
    id: "tukaran",
    bab: "t5-b2",
    no: "2.4.2",
    tajuk: "Pengiraan pertukaran mata wang asing",
    kunci: "pertukaran asing kadar pertukaran mata wang harga belian harga jualan usd ringgit",
    rumus: ["Mata wang asing = " + frac("Jumlah RM × Unit mata wang asing", "Harga jualan"), "Ringgit Malaysia = " + frac("Jumlah mata wang asing × Harga belian", "Unit mata wang asing")],
    petunjuk: "Bank menjual mata wang asing pada harga jualan dan membelinya pada harga belian. Jika hanya satu kadar diberi, isi harga belian dan jualan dengan nilai yang sama.",
    medan: [
      {
        k: "arah",
        jenis: "pilih",
        l: "Tukar",
        pilihan: [
          ["keAsing", "RM → mata wang asing"],
          ["keRM", "Mata wang asing → RM"]
        ]
      },
      { k: "kod", l: "Kod mata wang", teks: true },
      { k: "unit", l: "Unit mata wang asing" },
      { k: "beli", l: "Harga belian (RM)" },
      { k: "jual", l: "Harga jualan (RM)" },
      {
        k: "rm",
        l: "Jumlah RM",
        bila: function (x) {
          return x.arah === "keAsing";
        }
      },
      {
        k: "asing",
        l: "Jumlah mata wang asing",
        bila: function (x) {
          return x.arah === "keRM";
        }
      }
    ],
    contoh: [
      { n: "(a) RM796 500 → USD", v: { arah: "keAsing", kod: "USD", unit: 1, beli: 4.425, jual: 4.429, rm: 796500, asing: 36000 } },
      { n: "(b) USD36 000 → RM", v: { arah: "keRM", kod: "USD", unit: 1, beli: 4.425, jual: 4.429, rm: 796500, asing: 36000 } },
      { n: "(c) USD1 = RM4.30", v: { arah: "keAsing", kod: "USD", unit: 1, beli: 4.3, jual: 4.3, rm: 456500, asing: 4800 } },
      { n: "(d) £4 800", v: { arah: "keRM", kod: "GBP", unit: 1, beli: 5.6, jual: 5.6, rm: 456500, asing: 4800 } }
    ],
    kira: function (x) {
      var kod = esc(x.kod || "");
      if (x.unit <= 0) return { ralat: "Unit mata wang asing mesti lebih daripada sifar." };
      if (x.arah === "keAsing") {
        if (x.jual <= 0) return { ralat: "Harga jualan mesti lebih daripada sifar." };
        var a = (x.rm * x.unit) / x.jual;
        // Dipotong (bukan dibundarkan) kepada 2 tempat perpuluhan seperti contoh buku teks
        var ap = Math.floor(a * 100 + 1e-7) / 100;
        return {
          hasil: [H("Diterima", kod + E.fmt(ap, 2, true), "neutral")],
          langkah: [ay("Mata wang asing diperoleh = jumlah ringgit × unit mata wang asing ÷ kadar jual bank") + wang(x.rm) + " × " + kod + nom(x.unit, 4) + " ÷ " + kadar(x.jual) + " = <b>" + kod + E.fmt(ap, 2, true) + "</b>"],
          nota: "Kita membeli mata wang asing daripada bank, maka bank menggunakan <b>harga jualan</b>." + (Math.abs(a - ap) > 1e-7 ? " Jawapan dipotong kepada 2 tempat perpuluhan seperti dalam buku teks." : "")
        };
      }
      var r = (x.asing * x.beli) / x.unit;
      return {
        hasil: [H("Diterima", wang(r), "neutral")],
        langkah: [ay("Ringgit diperoleh = jumlah mata wang asing × kadar beli bank ÷ unit mata wang asing") + kod + nom(x.asing) + " × " + kadar(x.beli) + (x.unit === 1 ? "" : " ÷ " + kod + nom(x.unit, 4)) + " = <b>" + wang(r) + "</b>"],
        nota: "Kita menjual mata wang asing kepada bank, maka bank menggunakan <b>harga belian</b>."
      };
    }
  });

  tambah({
    id: "kesan-kadar",
    bab: "t5-b2",
    no: "2.4.5",
    tajuk: "Kesan perubahan kadar pertukaran terhadap eksport dan import",
    kunci: "kadar pertukaran susut nilai naik nilai ringgit eksport import harga import",
    rumus: ["Harga import dalam RM = Harga dalam mata wang asing × Kadar (RM seunit asing)", "Harga eksport dalam mata wang asing = " + frac("Harga dalam RM", "Kadar (RM seunit asing)")],
    medan: [
      { k: "kod", l: "Kod mata wang", teks: true },
      { k: "k0", l: "Kadar asal (RM bagi 1 unit)" },
      { k: "k1", l: "Kadar baharu (RM bagi 1 unit)" },
      { k: "im", l: "Harga barang import (mata wang asing)" },
      { k: "ek", l: "Harga barang eksport (RM)" }
    ],
    contoh: [
      { n: "Ringgit susut nilai", v: { kod: "USD", k0: 4.2, k1: 4.4, im: 1000, ek: 2100 } },
      { n: "Ringgit naik nilai", v: { kod: "USD", k0: 4.4, k1: 4.2, im: 1000, ek: 2100 } }
    ],
    kira: function (x) {
      if (x.k0 <= 0 || x.k1 <= 0) return { ralat: "Kadar pertukaran mesti lebih daripada sifar." };
      var kod = esc(x.kod || "");
      var i0 = x.im * x.k0;
      var i1 = x.im * x.k1;
      var e0 = x.ek / x.k0;
      var e1 = x.ek / x.k1;
      var susut = x.k1 > x.k0;
      var L = [
        ay("Harga import dalam ringgit = harga dalam mata wang asing × kadar pertukaran") + "Harga import: " + kod + nom(x.im) + " × " + kadar(x.k0) + " = " + wang(i0) + " → " + kod + nom(x.im) + " × " + kadar(x.k1) + " = <b>" + wang(i1) + "</b>",
        ay("Harga eksport dalam mata wang asing = harga dalam ringgit (pengangka) ÷ kadar pertukaran (penyebut)") + "Harga eksport: " + wang(x.ek) + " ÷ " + kadar(x.k0) + " = " + mw(kod, e0) + " → " + wang(x.ek) + " ÷ " + kadar(x.k1) + " = <b>" + mw(kod, e1) + "</b>",
        ay("Perubahan nilai ringgit = (kadar lama ÷ kadar baharu − 1) × 100") + "Perubahan nilai ringgit = (" + nom(x.k0, 4) + " ÷ " + nom(x.k1, 4) + " − 1) × 100 = " + pc((x.k0 / x.k1 - 1) * 100)
      ];
      if (x.k0 === x.k1) return { hasil: [H("Ringgit", "Tidak berubah", "neutral")], langkah: L };
      return {
        hasil: [H("Ringgit", susut ? "Susut nilai" : "Naik nilai", susut ? "buruk" : "baik"), H("Harga import (RM)", (i1 > i0 ? "+" : "") + pc(((i1 - i0) / i0) * 100)), H("Harga eksport (" + (kod || "asing") + ")", (e1 > e0 ? "+" : "") + pc(((e1 - e0) / e0) * 100))],
        langkah: L,
        nota: susut
          ? "Ringgit susut nilai: lebih banyak RM diperlukan untuk 1 " + (kod || "unit asing") + ". Import menjadi lebih mahal dan eksport Malaysia lebih murah kepada pembeli asing, maka eksport meningkat dan import berkurang."
          : "Ringgit naik nilai: kurang RM diperlukan untuk 1 " + (kod || "unit asing") + ". Import menjadi lebih murah dan eksport Malaysia lebih mahal kepada pembeli asing, maka eksport berkurang dan import meningkat."
      };
    }
  });

  /* =========================================================
     STPM PENGGAL 1 · BAB 1 · Pengenalan
     ========================================================= */
  tambah({
    id: "stpm-kos-lepas",
    bab: "stpm-p1-b1",
    no: "1.5",
    tajuk: "Kos lepas pada keluk kemungkinan pengeluaran (STPM)",
    kunci: "kkp kecerunan barang industri pertanian perkilangan cembung lurus malar",
    rumus: ["Kos lepas = " + frac("Perubahan unit barang yang dikorbankan", "Perubahan unit barang yang ditambah")],
    petunjuk: "Contoh modul PdP Penggal 1: barang X = barang industri (unit), barang Y = barang pertanian (unit).",
    medan: [
      { k: "x0", l: "Barang X di titik asal" },
      { k: "y0", l: "Barang Y di titik asal" },
      { k: "x1", l: "Barang X di titik baharu" },
      { k: "y1", l: "Barang Y di titik baharu" }
    ],
    contoh: [
      { n: "C → D", v: { x0: 2, y0: 27, x1: 3, y1: 23 } },
      { n: "E → F", v: { x0: 4, y0: 17, x1: 5, y1: 0 } },
      { n: "Pakaian A → B", v: { x0: 0, y0: 25, x1: 5, y1: 20 } }
    ],
    kira: kiraKosLepas
  });

  /* =========================================================
     STPM PENGGAL 1 · BAB 2 · Pasaran Barang dan Harga
     ========================================================= */
  tambah({
    id: "stpm-pasaran-linear",
    bab: "stpm-p1-b2",
    no: "2.3 & 2.7",
    tajuk: "Keseimbangan pasaran daripada fungsi, dengan cukai atau subsidi",
    kunci: "persamaan fungsi permintaan penawaran keseimbangan lebihan pengguna pengeluar cukai subsidi beban",
    rumus: ["DD: P = a − bQ &nbsp; SS: P = c + dQ", "Keseimbangan: a − bQ = c + dQ → Q = " + frac("a − c", "b + d"), "Lebihan pengguna = ½ × Q × (a − P)"],
    petunjuk: "Masukkan cukai seunit sebagai nilai positif dan subsidi seunit sebagai nilai negatif. Contoh modul: daging kambing import.",
    medan: [
      { k: "a", l: "a (pintasan harga DD)" },
      { k: "b", l: "b (kecerunan DD)" },
      { k: "c", l: "c (pintasan harga SS)" },
      { k: "d", l: "d (kecerunan SS)" },
      { k: "t", l: "Cukai (+) atau subsidi (−) seunit (RM)", opsyenal: true }
    ],
    contoh: [
      { n: "Daging kambing, cukai RM3", v: { a: 70, b: 2, c: 10, d: 1, t: 3 } },
      { n: "Barang X, subsidi RM10", v: { a: 50, b: 2.5, c: -10, d: 2.5, t: -10 } },
      { n: "Cukai RM5", v: { a: 50, b: 2, c: 10, d: 3, t: 5 } }
    ],
    kira: function (x) {
      if (x.b + x.d === 0) return { ralat: "b + d tidak boleh sifar." };
      var t = x.t || 0;
      var q0 = (x.a - x.c) / (x.b + x.d);
      if (q0 <= 0) return { ralat: "Keluk tidak bersilang pada kuantiti positif. Semak a dan c." };
      var p0 = x.a - x.b * q0;
      var cs0 = 0.5 * q0 * (x.a - p0);
      var ps0 = 0.5 * q0 * (p0 - x.c);
      var L = [
        ay("Keseimbangan apabila Qd = Qs: Q = (pintasan harga DD − pintasan harga SS) ÷ (kecerunan DD + kecerunan SS)") + x.a + " − " + kr(x.b) + "Q = " + kr(x.c) + " + " + kr(x.d) + "Q → Q = (" + nom(x.a) + " − " + kr(x.c) + ") ÷ (" + nom(x.b) + " + " + nom(x.d) + ") = <b>" + nom(q0) + "</b>",
        ay("Harga keseimbangan = pintasan harga DD − kecerunan DD × Q") + "P = " + nom(x.a) + " − " + nom(x.b) + " × " + nom(q0) + " = <b>" + wang(p0) + "</b>",
        ay("Lebihan pengguna = ½ × kuantiti keseimbangan × (pintasan harga DD − harga keseimbangan)") + "Lebihan pengguna = ½ × " + nom(q0) + " × (" + nom(x.a) + " − " + nom(p0) + ") = <b>" + wang(cs0) + "</b>",
        ay("Lebihan pengeluar = ½ × kuantiti keseimbangan × (harga keseimbangan − pintasan harga SS)") + "Lebihan pengeluar = ½ × " + nom(q0) + " × (" + nom(p0) + " − " + kr(x.c) + ") = <b>" + wang(ps0) + "</b>"
      ];
      var out = { hasil: [H("Harga keseimbangan", wang(p0)), H("Kuantiti keseimbangan", nom(q0)), H("Lebihan pengguna", wang(cs0))], langkah: L };
      if (t) {
        var q1 = (x.a - x.c - t) / (x.b + x.d);
        if (q1 <= 0) return { ralat: "Cukai terlalu besar: kuantiti baharu tidak positif." };
        var p1 = x.a - x.b * q1;
        var cs1 = 0.5 * q1 * (x.a - p1);
        var cukai = t > 0;
        L.push(
          ay("Selepas cukai atau subsidi, SS beralih: Q baharu = (pintasan DD − pintasan SS baharu) ÷ (kecerunan DD + kecerunan SS)") + "SS baharu: P = " + kr(x.c) + (cukai ? " + " : " − ") + nom(Math.abs(t)) + " + " + nom(x.d) + "Q → Q = (" + nom(x.a) + " − " + kr(x.c + t) + ") ÷ " + nom(x.b + x.d) + " = <b>" + nom(q1) + "</b>, P = <b>" + wang(p1) + "</b>",
          ay("Lebihan pengguna baharu = ½ × Q baharu × (pintasan harga DD − harga baharu)") + "Lebihan pengguna baharu = ½ × " + nom(q1) + " × (" + nom(x.a) + " − " + nom(p1) + ") = <b>" + wang(cs1) + "</b>; perubahan = <b>" + (cs1 >= cs0 ? "+" : "−") + wang(Math.abs(cs1 - cs0)) + "</b>"
        );
        var bebanP = Math.abs(p1 - p0) * q1;
        var jumlah = Math.abs(t) * q1;
        L.push(
          ay("Jumlah cukai atau subsidi = kadar seunit × Q baharu; bahagian pengguna = perubahan harga × Q baharu") + (cukai ? "Hasil cukai kerajaan" : "Perbelanjaan subsidi kerajaan") + " = " + nom(Math.abs(t)) + " × " + nom(q1) + " = <b>" + wang(jumlah) + "</b>; " +
            (cukai ? "beban" : "faedah") + " pengguna = " + nom(Math.abs(p1 - p0)) + " × " + nom(q1) + " = " + wang(bebanP) + " (" + pc((bebanP / jumlah) * 100, 1) + "), " +
            (cukai ? "beban" : "faedah") + " pengeluar = " + wang(jumlah - bebanP) + " (" + pc(((jumlah - bebanP) / jumlah) * 100, 1) + ")"
        );
        out.hasil.push(H((cukai ? "Selepas cukai" : "Selepas subsidi") + ": P, Q", wang(p1) + ", " + nom(q1), cukai ? "amaran" : "baik"), H("Lebihan pengguna baharu", wang(cs1)));
        out.nota = cukai
          ? "Cukai menganjak SS ke kiri (ke atas): harga naik, kuantiti turun dan lebihan pengguna berkurang."
          : "Subsidi menganjak SS ke kanan (ke bawah): harga turun, kuantiti naik dan lebihan pengguna bertambah.";
      }
      return out;
    }
  });

  tambah({
    id: "stpm-ec-ey",
    bab: "stpm-p1-b2",
    no: "2.5",
    tajuk: "Keanjalan permintaan silang (Ec) dan pendapatan (Ey)",
    kunci: "ec ey keanjalan silang pendapatan pengganti penggenap mewah normal bawahan",
    rumus: ["E = " + frac("Q₁ − Q₀", "Q₀") + " × " + frac("X₀", "X₁ − X₀"), "X = harga barang lain (Ec) atau pendapatan (Ey)"],
    medan: [
      { k: "jenis", jenis: "pilih", l: "Jenis keanjalan", pilihan: [["ec", "Silang (Ec)"], ["ey", "Pendapatan (Ey)"]] },
      { k: "q0", l: "Kuantiti diminta asal Q₀" },
      { k: "q1", l: "Kuantiti diminta baharu Q₁" },
      {
        k: "x0",
        l: function (x) {
          return x.jenis === "ey" ? "Pendapatan asal (RM)" : "Harga asal barang lain (RM)";
        }
      },
      {
        k: "x1",
        l: function (x) {
          return x.jenis === "ey" ? "Pendapatan baharu (RM)" : "Harga baharu barang lain (RM)";
        }
      }
    ],
    contoh: [
      { n: "Ec modul", v: { jenis: "ec", q0: 10, q1: 20, x0: 2, x1: 3 } },
      { n: "Ey modul", v: { jenis: "ey", q0: 10, q1: 50, x0: 1000, x1: 2000 } }
    ],
    kira: function (x) {
      if (x.q0 === 0 || x.x1 === x.x0) return { ralat: "Q₀ tidak boleh sifar dan X mesti berubah." };
      var e = ((x.q1 - x.q0) / x.q0) * (x.x0 / (x.x1 - x.x0));
      var nama = x.jenis === "ey" ? "Ey" : "Ec";
      var jenis;
      if (x.jenis === "ey") jenis = e < 0 ? "Barang bawahan" : e === 0 ? "Barang mesti (Ey = 0)" : e > 1 ? "Barang mewah" : "Barang normal";
      else jenis = e > 0 ? "Barang pengganti" : e < 0 ? "Barang penggenap" : "Tiada kaitan";
      return {
        hasil: [H(nama, nom(e)), H("Tafsiran", jenis, "neutral")],
        langkah: [
          ay("%ΔQ = (kuantiti baharu − kuantiti asal) ÷ kuantiti asal × 100") + "%ΔQ = (" + nom(x.q1) + " − " + kr(x.q0) + ") ÷ " + nom(x.q0) + " × 100 = " + pc(((x.q1 - x.q0) / x.q0) * 100),
          ay("%ΔX = (nilai baharu − nilai asal) ÷ nilai asal × 100 (harga barang lain bagi Ec, pendapatan bagi Ey)") + "%ΔX = (" + nom(x.x1) + " − " + kr(x.x0) + ") ÷ " + nom(x.x0) + " × 100 = " + pc(((x.x1 - x.x0) / x.x0) * 100),
          ay("Keanjalan = %ΔQ (pengangka) ÷ %ΔX (penyebut)") + nama + " = " + pc(((x.q1 - x.q0) / x.q0) * 100) + " ÷ " + krp(((x.x1 - x.x0) / x.x0) * 100) + " = <b>" + nom(e) + "</b>"
        ],
        nota: x.jenis === "ey" ? "Tafsiran mengikut modul: 0 < Ey ≤ 1 normal, Ey > 1 mewah, Ey = 0 mesti, Ey < 0 bawahan." : "Ec positif: pengganti; negatif: penggenap; sifar: tiada kaitan."
      };
    }
  });

  /* =========================================================
     STPM PENGGAL 1 · BAB 3 · Teori Pengeluaran dan Kos
     ========================================================= */
  tambah({
    id: "stpm-kos-purata",
    bab: "stpm-p1-b3",
    no: "3.3",
    tajuk: "Mencari Q, AVC, TFC dan TVC daripada TC, AFC dan AC",
    kunci: "kos purata kos tetap purata kos berubah purata jumlah kos tetap berubah",
    rumus: ["Q = " + frac("TC", "AC") + " &nbsp; AVC = AC − AFC", "TFC = AFC × Q &nbsp; TVC = TC − TFC"],
    medan: [
      { k: "tc", l: "Jumlah kos TC (RM)" },
      { k: "afc", l: "Kos tetap purata AFC (RM)" },
      { k: "ac", l: "Kos purata AC (RM)" }
    ],
    contoh: [
      { n: "Firma A (modul)", v: { tc: 400, afc: 4, ac: 5 } },
      { n: "Firma B (modul)", v: { tc: 600, afc: 5, ac: 8 } }
    ],
    kira: function (x) {
      if (x.ac === 0) return { ralat: "AC tidak boleh sifar." };
      var q = x.tc / x.ac,
        avc = x.ac - x.afc,
        tfc = x.afc * q,
        tvc = x.tc - tfc;
      var out = {
        hasil: [H("Q", nom(q) + " unit"), H("AVC", wang(avc)), H("TFC", wang(tfc)), H("TVC", wang(tvc))],
        langkah: [
          ay("Kuantiti = jumlah kos (pengangka) ÷ kos purata (penyebut)") + "Q = " + wang(x.tc) + " ÷ " + wang(x.ac) + " = <b>" + nom(q) + " unit</b>",
          ay("AVC = kos purata − kos tetap purata") + "AVC = " + wang(x.ac) + " − " + wang(x.afc) + " = <b>" + wang(avc) + "</b>",
          ay("TFC = kos tetap purata × kuantiti") + "TFC = " + wang(x.afc) + " × " + nom(q) + " = <b>" + wang(tfc) + "</b>",
          ay("TVC = jumlah kos − jumlah kos tetap") + "TVC = " + wang(x.tc) + " − " + wang(tfc) + " = <b>" + wang(tvc) + "</b>"
        ]
      };
      if (avc < 0) out.amaran = "AFC melebihi AC: data tidak munasabah kerana AVC menjadi negatif.";
      return out;
    }
  });

  /* =========================================================
     STPM PENGGAL 2 · BAB 2 · Perakaunan Pendapatan Negara
     ========================================================= */
  tambah({
    id: "stpm-knk",
    bab: "stpm-p2-b2",
    no: "2.1",
    tajuk: "Daripada KDNK kepada KNK, kos faktor, keluaran bersih dan KNK benar",
    kunci: "kdnk knk pfbln cukai tak langsung subsidi susut nilai harga pasaran kos faktor benar nominal pendapatan negara",
    rumus: ["KNK<sub>hp</sub> = KDNK<sub>hp</sub> + PFBLN", "KNK<sub>kf</sub> = KNK<sub>hp</sub> − CTL + subsidi", "KNB<sub>kf</sub> (pendapatan negara) = KNK<sub>kf</sub> − susut nilai", "KNK benar = " + frac("IHP tahun asas", "IHP tahun semasa") + " × KNK nominal"],
    medan: [
      { k: "kdnk", l: "KDNK harga pasaran (RM juta)" },
      { k: "terima", l: "Penerimaan pendapatan faktor dari luar (RM juta)" },
      { k: "bayar", l: "Pembayaran pendapatan faktor ke luar (RM juta)" },
      { k: "ctl", l: "Cukai tak langsung (RM juta)" },
      { k: "sub", l: "Subsidi (RM juta)" },
      { k: "susut", l: "Susut nilai (RM juta)", opsyenal: true },
      { k: "ihp", l: "IHP tahun semasa (asas = 100)", opsyenal: true }
    ],
    contoh: [{ n: "Soalan objektif modul", v: { kdnk: 65000, terima: 6000, bayar: 8000, ctl: 4000, sub: 10000, susut: 3000 } }],
    kira: function (x) {
      var pfbln = x.terima - x.bayar;
      var knkhp = x.kdnk + pfbln;
      var knkkf = knkhp - x.ctl + x.sub;
      var L = [
        ay("PFBLN = penerimaan faktor dari luar negeri − pembayaran faktor ke luar negeri") + "PFBLN = " + nom(x.terima, 0) + " − " + nom(x.bayar, 0) + " = " + nom(pfbln, 0),
        ay("KNK harga pasaran = KDNK harga pasaran + PFBLN") + "KNK<sub>hp</sub> = " + nom(x.kdnk, 0) + " + " + kr(pfbln, 0) + " = <b>" + nom(knkhp, 0) + "</b>",
        ay("KNK kos faktor = KNK harga pasaran − cukai tak langsung + subsidi") + "KNK<sub>kf</sub> = " + nom(knkhp, 0) + " − " + nom(x.ctl, 0) + " + " + nom(x.sub, 0) + " = <b>" + nom(knkkf, 0) + "</b>"
      ];
      var hasil = [H("PFBLN", "RM" + nom(pfbln, 0) + " juta", pfbln < 0 ? "amaran" : "baik"), H("KNK harga pasaran", "RM" + nom(knkhp, 0) + " juta"), H("KNK kos faktor", "RM" + nom(knkkf, 0) + " juta")];
      if (x.susut != null) {
        var knb = knkkf - x.susut;
        L.push(ay("KNB kos faktor = KNK kos faktor − susut nilai") + "KNB<sub>kf</sub> = " + nom(knkkf, 0) + " − " + nom(x.susut, 0) + " = <b>" + nom(knb, 0) + "</b> (pendapatan negara)");
        hasil.push(H("Pendapatan negara (KNB kf)", "RM" + nom(knb, 0) + " juta", "baik"));
      }
      if (x.ihp != null) {
        if (x.ihp === 0) return { ralat: "IHP tidak boleh sifar." };
        var benar = (knkhp * 100) / x.ihp;
        L.push(ay("KNK benar = 100 ÷ IHP × KNK nominal") + "KNK benar = 100 ÷ " + nom(x.ihp) + " × " + nom(knkhp, 0) + " = <b>" + nom(benar) + "</b>");
        hasil.push(H("KNK benar", "RM" + nom(benar) + " juta"));
      }
      return { hasil: hasil, langkah: L, nota: pfbln < 0 ? "PFBLN negatif: KDNK lebih besar daripada KNK." : "PFBLN positif: KNK lebih besar daripada KDNK." };
    }
  });

  /* =========================================================
     STPM PENGGAL 2 · BAB 3 · Keseimbangan Pendapatan Negara
     ========================================================= */
  tambah({
    id: "stpm-ae-y",
    bab: "stpm-p2-b3",
    no: "3.1",
    tajuk: "Keseimbangan pendapatan negara, pengganda dan lompang",
    kunci: "ae y keseimbangan pendapatan negara pengganda mpc mps lompang deflasi inflasi jurang knk suntikan bocoran ekonomi terbuka import",
    rumus: [
      "Y = C + I + G + (X − M), C = a + b(Y − T), M = M₀ + mY",
      "Y = " + frac("a − bT + I + G + X − M₀", "1 − b + m"),
      "Pengganda k = " + frac("1", "1 − b + m") + " &nbsp; Lompang = " + frac("Jurang KNK", "k")
    ],
    petunjuk: "Biarkan X, M₀ dan m kosong untuk ekonomi tertutup. Nilai dalam RM juta.",
    medan: [
      { k: "a", l: "Penggunaan autonomi a" },
      { k: "b", l: "MPC (b)" },
      { k: "i", l: "Pelaburan I" },
      { k: "g", l: "Perbelanjaan kerajaan G" },
      { k: "t", l: "Cukai sekali gus T" },
      { k: "x", l: "Eksport X", opsyenal: true },
      { k: "m0", l: "Import autonomi M₀", opsyenal: true },
      { k: "m", l: "Kecenderungan mengimport sut m", opsyenal: true },
      { k: "yf", l: "Pendapatan guna tenaga penuh Yf", opsyenal: true }
    ],
    contoh: [
      { n: "Tiga sektor (modul)", v: { a: 100, b: 0.8, i: 50, g: 50, t: 30 } },
      { n: "Ekonomi terbuka (modul)", v: { a: 100, b: 0.8, i: 50, g: 50, t: 30, x: 60, m: 0.2 } },
      { n: "Lompang deflasi (Bahagian C)", v: { a: 500, b: 0.9, i: 600, g: 400, t: 200, yf: 14000 } },
      { n: "Terbuka: M = 100 + 0.2Y", v: { a: 260, b: 0.8, i: 400, g: 300, t: 200, x: 500, m0: 100, m: 0.2 } }
    ],
    kira: function (x) {
      var X = x.x || 0,
        m0 = x.m0 || 0,
        m = x.m || 0;
      var penyebut = 1 - x.b + m;
      if (penyebut <= 0) return { ralat: "1 − MPC + m mesti positif." };
      var autonomi = x.a - x.b * x.t + x.i + x.g + X - m0;
      var y = autonomi / penyebut;
      var k = 1 / penyebut;
      var L = [
        ay("Keseimbangan: Y = C + I + G (+ X − M), dengan C = a + MPC(Y − T)") + "Y = " + nom(x.a) + " + " + nom(x.b) + "(Y − " + nom(x.t) + ") + " + nom(x.i) + " + " + nom(x.g) + (X || m0 || m ? " + " + nom(X) + " − (" + nom(m0) + " + " + nom(m) + "Y)" : ""),
        ay("Kumpulkan sebutan Y: (1 − MPC + m)Y = jumlah perbelanjaan autonomi") + "Y = " + nom(autonomi) + " + " + nom(x.b - m) + "Y → " + nom(penyebut) + "Y = " + nom(autonomi),
        ay("Y keseimbangan = jumlah perbelanjaan autonomi (pengangka) ÷ (1 − MPC + m) (penyebut)") + "Y = " + nom(autonomi) + " ÷ " + nom(penyebut) + " = <b>RM" + nom(y) + " juta</b>",
        ay("Pengganda = 1 ÷ (1 − MPC + m)") + "Pengganda = 1 ÷ " + nom(penyebut) + " = <b>" + nom(k) + "</b>"
      ];
      var hasil = [H("Y keseimbangan", "RM" + nom(y) + " juta", "baik"), H("Pengganda", nom(k))];
      if (X || m0 || m) {
        var nx = X - (m0 + m * y);
        L.push(ay("Eksport bersih = eksport − (import autonomi + MPM × Y)") + "Eksport bersih = " + nom(X) + " − (" + nom(m0) + " + " + nom(m) + " × " + nom(y) + ") = <b>" + nom(nx) + "</b>");
        hasil.push(H("Eksport bersih", "RM" + nom(nx) + " juta", nx < 0 ? "amaran" : "baik"));
      }
      var out = { hasil: hasil, langkah: L };
      if (x.yf != null) {
        var jurang = x.yf - y;
        var lompang = Math.abs(jurang) / k;
        L.push(ay("Jurang KNK = Yf − Y keseimbangan; lompang = jurang KNK (pengangka) ÷ pengganda (penyebut)") + "Jurang KNK = " + nom(x.yf) + " − " + nom(y) + " = " + nom(jurang) + "; lompang = " + nom(Math.abs(jurang)) + " ÷ " + nom(k) + " = <b>" + nom(lompang) + "</b>");
        hasil.push(H(jurang > 0 ? "Lompang deflasi" : jurang < 0 ? "Lompang inflasi" : "Guna tenaga penuh", "RM" + nom(lompang) + " juta", jurang > 0 ? "amaran" : jurang < 0 ? "merah" : "baik"));
        out.nota = jurang > 0 ? "G perlu ditambah sebanyak lompang deflasi untuk mencapai guna tenaga penuh." : jurang < 0 ? "G perlu dikurangkan sebanyak lompang inflasi." : "Ekonomi berada pada guna tenaga penuh.";
      }
      return out;
    }
  });

  /* =========================================================
     STPM PENGGAL 2 · BAB 4 · Wang, Bank dan Dasar Kewangan
     ========================================================= */
  tambah({
    id: "stpm-kredit",
    bab: "stpm-p2-b4",
    no: "4.2",
    tajuk: "Penciptaan kredit dan pengganda wang",
    kunci: "penciptaan kredit pengganda wang nisbah rizab deposit pinjaman bank perdagangan",
    rumus: ["Pengganda wang = " + frac("1", "nisbah rizab"), "Jumlah deposit = pengganda × deposit awal", "Kredit baharu = jumlah deposit − deposit awal"],
    medan: [
      { k: "d", l: "Deposit awal (RM)" },
      { k: "r", l: "Nisbah rizab (%)" }
    ],
    contoh: [
      { n: "Modul: RM10 000, 20%", v: { d: 10000, r: 20 } },
      { n: "RM100 juta, 10%", v: { d: 100000000, r: 10 } }
    ],
    kira: function (x) {
      if (x.r <= 0 || x.r > 100) return { ralat: "Nisbah rizab mesti antara 0% dan 100%." };
      var nr = x.r / 100,
        k = 1 / nr;
      var dep = k * x.d,
        rizab = x.d,
        pinjam = dep - x.d;
      return {
        hasil: [H("Pengganda wang", nom(k)), H("Jumlah deposit", wang(dep)), H("Jumlah pinjaman (kredit baharu)", wang(pinjam), "baik"), H("Jumlah rizab", wang(rizab))],
        langkah: [
          ay("Pengganda wang = 1 ÷ nisbah rizab") + "Pengganda = 1 ÷ " + nom(nr) + " = <b>" + nom(k) + "</b>",
          ay("Jumlah deposit = pengganda wang × deposit awal") + "Jumlah deposit = " + nom(k) + " × " + wang(x.d) + " = <b>" + wang(dep) + "</b>",
          ay("Jumlah pinjaman = pengganda wang × lebihan rizab awal") + "Jumlah pinjaman = " + nom(k) + " × " + wang(x.d * (1 - nr)) + " = <b>" + wang(pinjam) + "</b>",
          ay("Jumlah rizab = pengganda wang × rizab awal") + "Jumlah rizab = " + nom(k) + " × " + wang(x.d * nr) + " = <b>" + wang(rizab) + "</b>"
        ],
        nota: "Andaian: urus niaga dengan cek, semua lebihan rizab dipinjamkan, tiada bocoran tunai."
      };
    }
  });

  tambah({
    id: "stpm-fisher",
    bab: "stpm-p2-b4",
    no: "4.2",
    tajuk: "Teori Kuantiti Wang Fisher (MV = PT)",
    kunci: "fisher mv pt teori kuantiti wang halaju tingkat harga urus niaga",
    rumus: ["MV = PT → P = " + frac("MV", "T")],
    medan: [
      { k: "m", l: "Bekalan wang M (RM)" },
      { k: "v", l: "Halaju wang V" },
      { k: "t", l: "Jumlah urus niaga T" },
      { k: "dm", l: "Perubahan M (%)", opsyenal: true }
    ],
    contoh: [
      { n: "M naik 20%", v: { m: 300, v: 5, t: 400, dm: 20 } },
      { n: "M turun 25%", v: { m: 320, v: 5, t: 400, dm: -25 } }
    ],
    kira: function (x) {
      if (x.t === 0) return { ralat: "T tidak boleh sifar." };
      var p0 = (x.m * x.v) / x.t;
      var L = [ay("Tingkat harga P = (penawaran wang M × halaju V) (pengangka) ÷ jumlah urus niaga T (penyebut)") + "P = (" + nom(x.m) + " × " + nom(x.v) + ") ÷ " + nom(x.t) + " = <b>" + wang(p0) + "</b>"];
      var hasil = [H("Tingkat harga P", wang(p0))];
      if (x.dm != null) {
        var m1 = x.m * (1 + x.dm / 100),
          p1 = (m1 * x.v) / x.t;
        L.push(ay("M baharu = M × (1 + peratus perubahan M ÷ 100)") + "M baharu = " + nom(x.m) + " × (1 " + (x.dm < 0 ? "− " : "+ ") + nom(Math.abs(x.dm) / 100) + ") = " + nom(m1), ay("P baharu = (M baharu × V) ÷ T") + "P baharu = (" + nom(m1) + " × " + nom(x.v) + ") ÷ " + nom(x.t) + " = <b>" + wang(p1) + "</b>");
        hasil.push(H("P baharu", wang(p1), x.dm > 0 ? "amaran" : "baik"), H("Perubahan P", (p1 >= p0 ? "+" : "−") + wang(Math.abs(p1 - p0))));
      }
      return { hasil: hasil, langkah: L, nota: "Dengan V dan T tetap, P berubah pada kadar yang sama dengan M." };
    }
  });

  /* =========================================================
     STPM PENGGAL 3 · BAB 3 · Perdagangan Antarabangsa
     ========================================================= */
  tambah({
    id: "stpm-keterbukaan",
    bab: "stpm-p3-b3",
    no: "3.1",
    tajuk: "Keterbukaan ekonomi",
    kunci: "keterbukaan ekonomi eksport import kdnk nisbah perdagangan",
    rumus: ["Keterbukaan = " + frac("Eksport + Import", "KDNK")],
    medan: [
      { k: "x", l: "Eksport" },
      { k: "m", l: "Import" },
      { k: "y", l: "KDNK" }
    ],
    contoh: [{ n: "Malaysia 2007 (RM bilion)", v: { x: 617.35, m: 548.21, y: 503.6 } }],
    kira: function (x) {
      if (x.y === 0) return { ralat: "KDNK tidak boleh sifar." };
      var r = (x.x + x.m) / x.y;
      return {
        hasil: [H("Keterbukaan", nom(r)), H("Tafsiran", r > 1 ? "Ekonomi sangat terbuka" : "Kurang terbuka", r > 1 ? "biru" : "neutral")],
        langkah: [ay("Keterbukaan ekonomi = (eksport + import) (pengangka) ÷ KDNK (penyebut)") + "(" + nom(x.x) + " + " + nom(x.m) + ") ÷ " + nom(x.y) + " = <b>" + nom(r) + "</b>", ay("Nisbah eksport = eksport ÷ KDNK") + "Nisbah eksport kepada KDNK = " + nom(x.x) + " ÷ " + nom(x.y) + " = " + nom(x.x / x.y)]
      };
    }
  });

  /* =========================================================
     MATRIKULASI AE015 · BAB 3 · Keanjalan
     ========================================================= */
  tambah({
    id: "matrik-ed-lengkuk",
    bab: "m1-b3",
    no: "3.1",
    tajuk: "Keanjalan lengkuk: kaedah biasa dan kaedah titik tengah",
    kunci: "ed keanjalan lengkuk titik tengah midpoint kaedah biasa arc",
    rumus: [
      "Kaedah biasa: Ed = " + frac("Q₁ − Q₀", "Q₀") + " × " + frac("P₀", "P₁ − P₀"),
      "Titik tengah: Ed = " + frac("Q₁ − Q₀", "½(Q₀ + Q₁)") + " × " + frac("½(P₀ + P₁)", "P₁ − P₀")
    ],
    petunjuk: "Contoh modul AE015: keluk DD barang X melalui (RM2, 10 unit) dan (RM4, 8 unit).",
    medan: [
      { k: "p0", l: "Harga asal P₀ (RM)" },
      { k: "p1", l: "Harga baharu P₁ (RM)" },
      { k: "q0", l: "Kuantiti asal Q₀" },
      { k: "q1", l: "Kuantiti baharu Q₁" }
    ],
    contoh: [
      { n: "Harga naik RM2 → RM4", v: { p0: 2, p1: 4, q0: 10, q1: 8 } },
      { n: "Harga turun RM4 → RM2", v: { p0: 4, p1: 2, q0: 8, q1: 10 } },
      { n: "Rambutan (modul)", v: { p0: 2, p1: 4, q0: 50, q1: 40 } }
    ],
    kira: function (x) {
      if (x.q0 === 0 || x.p1 === x.p0) return { ralat: "Kuantiti asal tidak boleh sifar dan harga mesti berubah." };
      if (x.q0 + x.q1 === 0) return { ralat: "Jumlah kuantiti tidak boleh sifar." };
      var biasa = ((x.q1 - x.q0) / x.q0) * (x.p0 / (x.p1 - x.p0));
      var tengah = ((x.q1 - x.q0) / ((x.q0 + x.q1) / 2)) * (((x.p0 + x.p1) / 2) / (x.p1 - x.p0));
      var m = Math.abs(tengah);
      var jenis = sama(m, 0) ? "Tidak anjal sempurna" : sama(m, 1) ? "Anjal satu" : m > 1 ? "Anjal" : "Tidak anjal";
      return {
        hasil: [H("Ed kaedah biasa", nom(biasa)), H("Ed titik tengah", nom(tengah), "biru"), H("Darjah (titik tengah)", jenis)],
        langkah: [
          ay("Kaedah biasa: Ed = (perubahan kuantiti ÷ kuantiti asal) × (harga asal ÷ perubahan harga)") + "Kaedah biasa = (" + nom(x.q1) + " − " + nom(x.q0) + ")/" + nom(x.q0) + " × " + nom(x.p0) + "/(" + nom(x.p1) + " − " + nom(x.p0) + ") = <b>" + nom(biasa) + "</b>",
          ay("Titik tengah: Ed = (perubahan kuantiti ÷ purata kuantiti) × (purata harga ÷ perubahan harga)") + "Titik tengah = (" + nom(x.q1) + " − " + nom(x.q0) + ")/½(" + nom(x.q0) + " + " + nom(x.q1) + ") × ½(" + nom(x.p0) + " + " + nom(x.p1) + ")/(" + nom(x.p1) + " − " + nom(x.p0) + ") = <b>" + nom(tengah) + "</b>"
        ],
        nota: "Kaedah biasa memberi nilai berbeza bagi harga naik dan harga turun dalam julat yang sama; kaedah titik tengah memberi nilai yang sama."
      };
    }
  });

  /* =========================================================
     MATRIKULASI AE015 · BAB 4 · Teori Perlakuan Pengguna
     ========================================================= */
  tambah({
    id: "matrik-utiliti",
    bab: "m1-b4",
    no: "4.2.1(c)",
    tajuk: "Semak keseimbangan pengguna dua barang",
    kunci: "utiliti sut mu keseimbangan pengguna mux px muy py pendapatan kardinal",
    rumus: [frac("MUx", "Px") + " = " + frac("MUy", "Py"), "Px·X + Py·Y = I"],
    petunjuk: "Masukkan MU unit terakhir bagi setiap barang pada kombinasi yang disemak.",
    medan: [
      { k: "mux", l: "MUx unit terakhir (util)" },
      { k: "px", l: "Harga X, Px (RM)" },
      { k: "x", l: "Kuantiti X" },
      { k: "muy", l: "MUy unit terakhir (util)" },
      { k: "py", l: "Harga Y, Py (RM)" },
      { k: "y", l: "Kuantiti Y" },
      { k: "i", l: "Pendapatan, I (RM)" }
    ],
    contoh: [
      { n: "3X + 5Y (modul)", v: { mux: 18, px: 3, x: 3, muy: 12, py: 2, y: 5, i: 19 } },
      { n: "4X + 6Y (modul)", v: { mux: 12, px: 3, x: 4, muy: 8, py: 2, y: 6, i: 19 } },
      { n: "4X + 5Y harga sama (modul)", v: { mux: 12, px: 5, x: 4, muy: 12, py: 5, y: 5, i: 45 } }
    ],
    kira: function (x) {
      if (x.px <= 0 || x.py <= 0) return { ralat: "Harga mesti lebih daripada sifar." };
      var rx = x.mux / x.px,
        ry = x.muy / x.py,
        belanja = x.px * x.x + x.py * x.y;
      var syarat1 = sama(E.bundar(rx, 6), E.bundar(ry, 6)),
        syarat2 = sama(belanja, x.i);
      var out = {
        hasil: [
          H("MUx/Px", nom(rx)),
          H("MUy/Py", nom(ry)),
          H("Jumlah belanja", wang(belanja)),
          H("Keputusan", syarat1 && syarat2 ? "Keseimbangan" : "Bukan keseimbangan", syarat1 && syarat2 ? "baik" : "amaran")
        ],
        langkah: [
          ay("Utiliti sut bagi setiap ringgit = MU unit terakhir (pengangka) ÷ harga barang (penyebut)") + "MUx/Px = " + nom(x.mux) + " ÷ " + nom(x.px) + " = " + nom(rx) + "; MUy/Py = " + nom(x.muy) + " ÷ " + nom(x.py) + " = " + nom(ry) + (syarat1 ? " → <b>sama</b>" : " → tidak sama"),
          ay("Jumlah belanja = harga X × kuantiti X + harga Y × kuantiti Y; mesti sama dengan pendapatan") + "Belanja = " + nom(x.px) + "(" + nom(x.x, 0) + ") + " + nom(x.py) + "(" + nom(x.y, 0) + ") = " + wang(belanja) + (syarat2 ? " = pendapatan" : " ≠ pendapatan " + wang(x.i))
        ]
      };
      if (!syarat1) out.nota = rx > ry ? "MUx/Px > MUy/Py: tambah X dan kurangkan Y." : "MUx/Px < MUy/Py: kurangkan X dan tambah Y.";
      else if (!syarat2) out.nota = belanja < x.i ? "Syarat utiliti dipenuhi tetapi pendapatan belum habis dibelanjakan." : "Kombinasi ini melebihi pendapatan.";
      return out;
    }
  });

  /* =========================================================
     MATRIKULASI AE015 · BAB 5 · Teori Kos
     ========================================================= */
  tambah({
    id: "matrik-kos-implisit",
    bab: "m1-b5",
    no: "5.2.1(a)",
    tajuk: "Kos eksplisit dan kos implisit",
    kunci: "kos eksplisit implisit tersembunyi nyata kos lepas gaji sewa bunga modal sendiri",
    rumus: ["Kos implisit = gaji dilepaskan + (kadar bunga × modal sendiri) + sewa dilepaskan", "Jumlah kos = kos eksplisit + kos implisit"],
    petunjuk: "Contoh modul: perniagaan Justin (sewa premis RM1 400 sebulan × 12).",
    medan: [
      { k: "eks", l: "Jumlah kos eksplisit (RM)" },
      { k: "gaji", l: "Gaji setahun yang dilepaskan (RM)" },
      { k: "modal", l: "Modal sendiri (RM)" },
      { k: "r", l: "Kadar bunga (%)" },
      { k: "sewa", l: "Sewa sebulan yang dilepaskan (RM)" }
    ],
    contoh: [{ n: "Justin (modul)", v: { eks: 65000, gaji: 30000, modal: 50000, r: 7, sewa: 1400 } }],
    kira: function (x) {
      var bunga = (x.r / 100) * x.modal,
        sewa = x.sewa * 12,
        imp = x.gaji + bunga + sewa;
      return {
        hasil: [H("Kos implisit", wang(imp)), H("Kos eksplisit", wang(x.eks)), H("Jumlah kos", wang(x.eks + imp), "biru")],
        langkah: [
          ay("Bunga dilepaskan = kadar bunga × modal sendiri") + "Bunga dilepaskan = " + nom(x.r) + "% × " + wang(x.modal) + " = " + wang(bunga),
          ay("Sewa dilepaskan = sewa sebulan × 12 bulan") + "Sewa dilepaskan = " + wang(x.sewa) + " × 12 = " + wang(sewa),
          ay("Kos implisit = gaji dilepaskan + bunga dilepaskan + sewa dilepaskan") + "Kos implisit = " + wang(x.gaji) + " + " + wang(bunga) + " + " + wang(sewa) + " = <b>" + wang(imp) + "</b>",
          ay("Jumlah kos = kos eksplisit + kos implisit") + "Jumlah kos = " + wang(x.eks) + " + " + wang(imp) + " = <b>" + wang(x.eks + imp) + "</b>"
        ]
      };
    }
  });

  /* =========================================================
     MATRIKULASI AE015 · BAB 6 · Struktur Pasaran
     ========================================================= */
  tambah({
    id: "matrik-monopoli",
    bab: "m1-b6",
    no: "6.3.4",
    tajuk: "Keseimbangan monopoli: MR = MC",
    kunci: "monopoli mr mc keseimbangan untung maksimum ar permintaan linear",
    rumus: ["AR = P = a − bQ &nbsp; MR = a − 2bQ", "MC = c + dQ &nbsp; MR = MC → Q = " + frac("a − c", "2b + d")],
    medan: [
      { k: "a", l: "Pemalar permintaan a (P = a − bQ)" },
      { k: "b", l: "Kecerunan b" },
      { k: "c", l: "Pemalar kos sut c (MC = c + dQ)" },
      { k: "d", l: "Kecerunan kos sut d" }
    ],
    contoh: [{ n: "P = 93 − 5Q, MC = 5 + 12Q (modul)", v: { a: 93, b: 5, c: 5, d: 12 } }],
    kira: function (x) {
      if (x.b <= 0) return { ralat: "Kecerunan permintaan b mesti positif." };
      if (2 * x.b + x.d === 0) return { ralat: "2b + d tidak boleh sifar." };
      var q = (x.a - x.c) / (2 * x.b + x.d),
        p = x.a - x.b * q,
        mr = x.a - 2 * x.b * q;
      if (q <= 0) return { ralat: "Tiada keluaran positif: a mesti melebihi c." };
      return {
        hasil: [H("Keluaran Q", nom(q) + " unit"), H("Harga P", wang(p), "biru"), H("MR = MC", wang(mr)), H("Jumlah hasil TR", wang(p * q))],
        langkah: [
          ay("MR = a − 2bQ (kecerunan MR dua kali kecerunan AR)") + "MR = " + nom(x.a) + " − " + nom(2 * x.b) + "Q",
          ay("Untung maksimum apabila MR = MC") + nom(x.a) + " − " + nom(2 * x.b) + "Q = " + nom(x.c) + " + " + nom(x.d) + "Q → " + nom(2 * x.b + x.d) + "Q = " + nom(x.a - x.c),
          ay("Q = (a − c) (pengangka) ÷ (2b + d) (penyebut)") + "Q = " + nom(x.a - x.c) + " ÷ " + nom(2 * x.b + x.d) + " = <b>" + nom(q) + " unit</b>",
          ay("Harga = a − bQ (dibaca daripada keluk permintaan)") + "P = " + nom(x.a) + " − " + nom(x.b) + "(" + nom(q) + ") = <b>" + wang(p) + "</b>"
        ],
        nota: "Harga monopoli (P) lebih tinggi daripada MC pada keseimbangan, maka kecekapan peruntukan tidak tercapai."
      };
    }
  });

  /* =========================================================
     MATRIKULASI AE025 · BAB 3 · Keseimbangan Pendapatan Negara
     ========================================================= */
  tambah({
    id: "matrik-pengganda",
    bab: "m2-b3",
    no: "3.3",
    tajuk: "Keseimbangan dua dan tiga sektor, pengganda dan lompang",
    kunci: "keseimbangan pendapatan negara pengganda kg kt lompang inflasi deflasi mpc cukai lump-sum",
    rumus: ["Y = a + b(Y − T) + I + G", "KG = " + frac("1", "1 − MPC") + " &nbsp; KT = " + frac("−MPC", "1 − MPC"), "ΔG = " + frac("Yf − Ye", "KG") + " &nbsp; ΔT = " + frac("Yf − Ye", "KT")],
    petunjuk: "Biarkan G, T dan Yf kosong untuk ekonomi dua sektor tanpa sasaran guna tenaga penuh.",
    medan: [
      { k: "a", l: "Penggunaan autonomi a" },
      { k: "b", l: "MPC (b)" },
      { k: "i", l: "Pelaburan I" },
      { k: "g", l: "Perbelanjaan kerajaan G", opsyenal: true },
      { k: "t", l: "Cukai lump-sum T", opsyenal: true },
      { k: "yf", l: "Pendapatan guna tenaga penuh Yf", opsyenal: true }
    ],
    contoh: [
      { n: "Dua sektor (modul)", v: { a: 9000, b: 0.75, i: 1500 } },
      { n: "Tiga sektor (modul)", v: { a: 80, b: 0.75, i: 20, g: 30, t: 20 } },
      { n: "Lompang deflasi (modul)", v: { a: 150, b: 0.75, i: 150, g: 200, t: 200, yf: 1500 } },
      { n: "Lompang inflasi (modul)", v: { a: 150, b: 0.75, i: 150, g: 200, t: 200, yf: 1000 } }
    ],
    kira: function (x) {
      if (!(x.b > 0 && x.b < 1)) return { ralat: "MPC mesti antara 0 dan 1." };
      var g = x.g || 0,
        t = x.t || 0;
      var autonomi = x.a - x.b * t + x.i + g;
      var kg = 1 / (1 - x.b),
        kt = -x.b / (1 - x.b);
      var y = autonomi * kg;
      var L = [
        ay("Keseimbangan: Y = C + I + G, dengan C = a + MPC(Y − T)") + "Y = " + nom(x.a) + " + " + nom(x.b) + "(Y − " + nom(t) + ") + " + nom(x.i) + " + " + nom(g),
        ay("(1 − MPC)Y = jumlah perbelanjaan autonomi, maka Y = perbelanjaan autonomi ÷ (1 − MPC)") + nom(1 - x.b) + "Y = " + nom(autonomi) + " → Y = <b>" + nom(y) + "</b>",
        ay("KG = 1 ÷ (1 − MPC); KT = −MPC ÷ (1 − MPC)") + "KG = 1 ÷ " + nom(1 - x.b) + " = " + nom(kg) + "; KT = −" + nom(x.b) + " ÷ " + nom(1 - x.b) + " = " + nom(kt)
      ];
      var hasil = [H("Y keseimbangan", nom(y), "baik"), H("Pengganda KG", nom(kg)), H("Pengganda KT", nom(kt))];
      var out = { hasil: hasil, langkah: L };
      if (x.yf != null) {
        var jurang = x.yf - y;
        var dg = jurang / kg,
          dt = jurang / kt;
        L.push(ay("Jurang = pendapatan guna tenaga penuh − Y keseimbangan") + "Jurang = " + nom(x.yf) + " − " + nom(y) + " = " + nom(jurang));
        L.push(ay("ΔG = jurang (pengangka) ÷ KG (penyebut); ΔT = jurang ÷ KT") + "ΔG = " + nom(jurang) + " ÷ " + nom(kg) + " = <b>" + nom(dg) + "</b>; ΔT = " + nom(jurang) + " ÷ " + nom(kt) + " = <b>" + nom(dt) + "</b>");
        hasil.push(H(jurang > 0 ? "Lompang deflasi" : jurang < 0 ? "Lompang inflasi" : "Guna tenaga penuh", nom(Math.abs(dg)), jurang > 0 ? "amaran" : jurang < 0 ? "merah" : "baik"));
        hasil.push(H("Perubahan G diperlukan", nom(dg)));
        hasil.push(H("Perubahan T diperlukan", nom(dt)));
        out.nota = jurang > 0 ? "Tambah G atau kurangkan T untuk menutup lompang deflasi. Perubahan T lebih besar kerana |KT| < KG." : jurang < 0 ? "Kurangkan G atau naikkan T untuk menutup lompang inflasi." : "Ekonomi berada pada guna tenaga penuh.";
      }
      return out;
    }
  });

  /* =========================================================
     MATRIKULASI AE025 · BAB 4 · Wang
     ========================================================= */
  tambah({
    id: "matrik-bekalan-wang",
    bab: "m2-b4",
    no: "4.2",
    tajuk: "Bekalan wang M1, M2 dan kadar pertumbuhannya",
    kunci: "bekalan wang m1 m2 wang dalam edaran deposit semasa separa wang wang hampir pertumbuhan",
    rumus: ["M1 = wang dalam edaran + deposit semasa", "M2 = M1 + separa wang", "Kadar pertumbuhan = " + frac("M tahun semasa − M tahun sebelum", "M tahun sebelum") + " × 100%"],
    petunjuk: "Nilai dalam RM juta.",
    medan: [
      { k: "e0", l: "Wang dalam edaran, tahun sebelum" },
      { k: "d0", l: "Deposit semasa, tahun sebelum" },
      { k: "s0", l: "Separa wang, tahun sebelum" },
      { k: "e1", l: "Wang dalam edaran, tahun semasa" },
      { k: "d1", l: "Deposit semasa, tahun semasa" },
      { k: "s1", l: "Separa wang, tahun semasa" }
    ],
    contoh: [{ n: "Malaysia 2004 → 2005 (modul)", v: { e0: 28617, d0: 85651.5, s0: 419894.2, e1: 30177.6, d1: 93845.5, s1: 492154.8 } }],
    kira: function (x) {
      var m10 = x.e0 + x.d0,
        m11 = x.e1 + x.d1,
        m20 = m10 + x.s0,
        m21 = m11 + x.s1;
      if (m10 === 0 || m20 === 0) return { ralat: "Bekalan wang tahun sebelum tidak boleh sifar." };
      var g1 = ((m11 - m10) / m10) * 100,
        g2 = ((m21 - m20) / m20) * 100;
      return {
        hasil: [H("M1 tahun semasa", nom(m11)), H("M2 tahun semasa", nom(m21)), H("Pertumbuhan M1", pc(g1), "biru"), H("Pertumbuhan M2", pc(g2), "biru")],
        langkah: [
          ay("M1 = wang dalam edaran + deposit semasa") + "M1 = " + nom(x.e0) + " + " + nom(x.d0) + " = " + nom(m10) + " → " + nom(x.e1) + " + " + nom(x.d1) + " = " + nom(m11),
          ay("M2 = M1 + separa wang") + "M2 = " + nom(m10) + " + " + nom(x.s0) + " = " + nom(m20) + " → " + nom(m11) + " + " + nom(x.s1) + " = " + nom(m21),
          ay("Pertumbuhan M1 = (M1 tahun semasa − M1 tahun sebelum) ÷ M1 tahun sebelum × 100") + "Pertumbuhan M1 = (" + nom(m11) + " − " + nom(m10) + ") ÷ " + nom(m10) + " × 100 = <b>" + pc(g1) + "</b>",
          ay("Pertumbuhan M2 = (M2 tahun semasa − M2 tahun sebelum) ÷ M2 tahun sebelum × 100") + "Pertumbuhan M2 = (" + nom(m21) + " − " + nom(m20) + ") ÷ " + nom(m20) + " × 100 = <b>" + pc(g2) + "</b>"
        ]
      };
    }
  });

  /* =========================================================
     MATRIKULASI AE025 · BAB 5 · Inflasi
     ========================================================= */
  tambah({
    id: "matrik-inw",
    bab: "m2-b5",
    no: "5.1.3",
    tajuk: "Indeks nilai wang dan perubahan nilai wang",
    kunci: "indeks nilai wang inw kuasa beli nilai wang ihp tahun asas",
    rumus: ["INW = " + frac("Indeks harga tahun asas", "Indeks harga tahun semasa") + " × 100", "Perubahan nilai wang = " + frac("INW semasa − INW asas", "INW asas") + " × 100"],
    medan: [
      { k: "asas", l: "Indeks harga tahun asas" },
      { k: "semasa", l: "Indeks harga tahun semasa" }
    ],
    contoh: [
      { n: "Tahun asas 100, 2003 = 120 (modul)", v: { asas: 100, semasa: 120 } },
      { n: "IHP = 200 (modul)", v: { asas: 100, semasa: 200 } },
      { n: "IHP = 50 (modul)", v: { asas: 100, semasa: 50 } }
    ],
    kira: function (x) {
      if (x.semasa <= 0 || x.asas <= 0) return { ralat: "Indeks harga mesti positif." };
      var inw = (x.asas / x.semasa) * 100,
        ubah = ((inw - 100) / 100) * 100;
      return {
        hasil: [H("Indeks nilai wang", nom(inw)), H("Perubahan nilai wang", pc(ubah), ubah < 0 ? "merah" : ubah > 0 ? "baik" : "neutral")],
        langkah: [ay("INW = indeks harga tahun asas (pengangka) ÷ indeks harga tahun semasa (penyebut) × 100") + "INW = " + nom(x.asas) + " ÷ " + nom(x.semasa) + " × 100 = <b>" + nom(inw) + "</b>", ay("Perubahan nilai wang = (INW semasa − INW tahun asas) ÷ INW tahun asas × 100") + "Perubahan = (" + nom(inw) + " − 100) ÷ 100 × 100 = <b>" + pc(ubah) + "</b>"],
        nota: ubah < 0 ? "Harga umum naik, maka kuasa beli wang jatuh." : ubah > 0 ? "Harga umum turun, maka kuasa beli wang naik." : "Tiada perubahan nilai wang."
      };
    }
  });

  /* =========================================================
     MATRIKULASI AE025 · BAB 7 · Ekonomi Antarabangsa
     ========================================================= */
  tambah({
    id: "matrik-ksp",
    bab: "m2-b7",
    no: "7.1.4",
    tajuk: "Kadar syarat perdagangan (KSP) nominal",
    kunci: "kadar syarat perdagangan ksp eksport import nominal",
    rumus: ["KSP nominal = " + frac("Jumlah nilai eksport", "Jumlah nilai import") + " × 100"],
    medan: [
      { k: "x", l: "Jumlah nilai eksport (RM juta)" },
      { k: "m", l: "Jumlah nilai import (RM juta)" }
    ],
    contoh: [{ n: "Malaysia 2005 (modul)", v: { x: 604625, m: 490494 } }],
    kira: function (x) {
      if (x.m <= 0) return { ralat: "Nilai import mesti positif." };
      var k = (x.x / x.m) * 100;
      return {
        hasil: [H("KSP", nom(k), k > 100 ? "baik" : k < 100 ? "amaran" : "neutral")],
        langkah: [ay("KSP = jumlah nilai eksport (pengangka) ÷ jumlah nilai import (penyebut) × 100") + nom(x.x) + " ÷ " + nom(x.m) + " × 100 = <b>" + nom(k) + "</b>"],
        nota: k > 100 ? "KSP melebihi 100: dengan 100 unit eksport, negara memperoleh " + nom(k) + " unit import." : k < 100 ? "KSP kurang daripada 100: syarat perdagangan tidak menguntungkan." : "KSP sama dengan 100."
      };
    }
  });

  /* =========================================================
     ENJIN PAPARAN
     ========================================================= */
  var ikutId = {};
  K.forEach(function (k) {
    ikutId[k.id] = k;
  });

  function medanJadual(k) {
    return k.medan.filter(function (m) {
      return m.jenis === "jadual";
    });
  }

  // Keadaan awal daripada contoh ke-i
  function keadaanAwal(k, i) {
    var c = (k.contoh && k.contoh[i]) || { v: {} };
    var s = { contoh: i, v: {}, j: {}, baris: {} };
    k.medan.forEach(function (m) {
      if (m.jenis === "jadual") {
        s.j[m.k] = (c.v[m.k] || [[]]).map(function (r) {
          return r.map(function (v) {
            return v == null ? "" : String(v);
          });
        });
        s.baris[m.k] = Math.min(m.pilihBaris || 0, s.j[m.k].length - 1);
      } else if (m.jenis === "pilih") {
        s.v[m.k] = c.v[m.k] != null ? String(c.v[m.k]) : m.pilihan[0][0];
      } else {
        s.v[m.k] = c.v[m.k] != null ? String(c.v[m.k]) : "";
      }
    });
    return s;
  }

  function bacaNombor(t) {
    var s = String(t == null ? "" : t)
      .trim()
      .replace(/^RM/i, "")
      .replace(/%$/, "")
      .replace(/[\s,]/g, "")
      .replace(/−/g, "-");
    if (s === "") return null;
    var v = Number(s);
    return isFinite(v) ? v : NaN;
  }

  function label(m, x) {
    return typeof m.l === "function" ? m.l(x) : m.l;
  }

  function nampak(m, x) {
    return !m.bila || m.bila(x);
  }

  // Nilai pilihan sahaja (untuk bila dan label sebelum nombor dibaca)
  function nilaiPilih(k, s) {
    var x = {};
    k.medan.forEach(function (m) {
      if (m.jenis === "pilih") x[m.k] = s.v[m.k];
    });
    return x;
  }

  function nilai(k, s) {
    var x = nilaiPilih(k, s);
    var kosong = [];
    var salah = [];
    x._baris = {};
    k.medan.forEach(function (m) {
      if (m.jenis === "pilih" || !nampak(m, x)) return;
      if (m.jenis === "jadual") {
        x._baris[m.k] = s.baris[m.k];
        x[m.k] = s.j[m.k].map(function (r, ri) {
          var o = {};
          var ci = 0;
          m.lajur.forEach(function (c) {
            if (c.hasil) return;
            var t = r[ci++];
            if (c.teks) o[c.k] = t || "";
            else {
              var v = bacaNombor(t);
              if (v !== v) salah.push(label(c, x) + " (baris " + (ri + 1) + ")");
              o[c.k] = v;
            }
          });
          return o;
        });
        return;
      }
      if (m.teks) {
        x[m.k] = s.v[m.k];
        return;
      }
      var v = bacaNombor(s.v[m.k]);
      if (v === null && !m.opsyenal) kosong.push(label(m, x));
      if (v !== v) salah.push(label(m, x));
      x[m.k] = v;
    });
    if (salah.length) x._ralat = "Nilai bukan nombor: " + salah.join(", ") + ".";
    else if (kosong.length) x._ralat = "Isi nilai untuk: " + kosong.join(", ") + ".";
    return x;
  }

  function htmlMedan(k, s, m, x) {
    var tersorok = nampak(m, x) ? "" : " hidden";
    var id = "k-" + k.id + "-" + m.k;
    if (m.jenis === "pilih") {
      return (
        '<label class="medan"' + tersorok + ' for="' + id + '"><span>' + esc(label(m, x)) + '</span><select id="' + id + '" data-k="' + m.k + '">' +
        m.pilihan
          .map(function (p) {
            return '<option value="' + p[0] + '"' + (s.v[m.k] === p[0] ? " selected" : "") + ">" + esc(p[1]) + "</option>";
          })
          .join("") +
        "</select></label>"
      );
    }
    return (
      '<label class="medan"' + tersorok + ' for="' + id + '"><span>' + esc(label(m, x)) + (m.opsyenal ? ' <i class="kalk-pilihan">pilihan</i>' : "") + "</span>" +
      '<input id="' + id + '" type="text" ' + (m.teks ? "" : 'inputmode="decimal" ') + 'autocomplete="off" spellcheck="false" data-k="' + m.k + '" value="' + esc(s.v[m.k]) + '"></label>'
    );
  }

  // tinggi textarea ikut isi (nama panjang turun ke baris kedua, bukan terpotong)
  function tinggiAuto(t) {
    t.style.height = "auto";
    t.style.height = t.scrollHeight + 2 + "px";
  }

  function htmlJadual(k, s, m, x) {
    var rows = s.j[m.k];
    var h = '<p class="kalk-leret" hidden>Leret jadual ke kiri untuk melihat semua lajur ' + E.ikon("kanan") + "</p>";
    h += '<div class="kalk-jadual jadual' + (m.tanpaPilih ? " kalk-senarai" : "") + '" data-jk="' + m.k + '"><table><thead><tr>';
    m.lajur.forEach(function (c) {
      // kelas tajuk sama dengan sel di bawahnya: lajur teks (input nama atau hasil seperti Tahap) bukan "n"
      var kelas = [c.teks ? "" : "n", c.hasil ? "hasil" : "", c.teks && !c.hasil ? "teks" : ""].join(" ").trim();
      h += '<th class="' + kelas + '" scope="col">' + esc(label(c, x)) + "</th>";
    });
    h += "</tr></thead><tbody>";
    rows.forEach(function (r, ri) {
      h += '<tr data-r="' + ri + '"' + (!m.tanpaPilih && s.baris[m.k] === ri ? ' class="dipilih"' : "") + ">";
      var ci = 0;
      m.lajur.forEach(function (c) {
        if (c.hasil) {
          h += '<td class="' + (c.teks ? "" : "n ") + 'hasil" data-hj="' + m.k + '" data-c="' + c.k + '" data-r="' + ri + '">–</td>';
          return;
        }
        var nilaiSel = r[ci] == null ? "" : r[ci];
        var atr = 'autocomplete="off" spellcheck="false" data-j="' + m.k + '" data-r="' + ri + '" data-i="' + ci + '" aria-label="' + esc(label(c, x)) + ", baris " + (ri + 1) + '"';
        // lajur teks (nama barang) guna textarea supaya nama panjang turun baris dan tidak terpotong di telefon
        h += c.teks
          ? '<td><textarea class="sel teks" rows="1" ' + atr + ">" + esc(nilaiSel) + "</textarea></td>"
          : '<td><input class="sel" type="text" inputmode="decimal" ' + atr + ' value="' + esc(nilaiSel) + '"></td>';
        ci++;
      });
      h += "</tr>";
    });
    h += "</tbody></table></div>";
    h +=
      '<div class="baris-cip kalk-baris">' +
      '<button type="button" class="cip" data-tambah="' + m.k + '">+ Tambah baris</button>' +
      '<button type="button" class="cip" data-buang="' + m.k + '"' + (rows.length <= 2 ? " disabled" : "") + ">− Buang baris akhir</button>" +
      "</div>";
    return h;
  }

  function htmlKad(k, s) {
    var b = E.babIkut[k.bab];
    var x = nilaiPilih(k, s);
    var jadual = medanJadual(k).length > 0;
    var h =
      '<article class="kalk kaca-pekat' + (jadual ? " lebar" : "") + '" id="kalk-' + k.id + '" data-id="' + k.id + '" style="--warna-bab:' + b.warna + '">' +
      '<header class="kalk-kepala"><span class="kalk-tag"><i></i>' + esc(E.labelPendek(b)) + " · " + esc(k.no) + "</span><h3>" + esc(k.tajuk) + "</h3></header>" +
      '<div class="kotak rumus"><span class="kotak-label">Rumus</span>' +
      k.rumus
        .map(function (r) {
          return '<div class="rumus-baris">' + r + "</div>";
        })
        .join("") +
      "</div>";
    if (k.contoh && k.contoh.length > 1) {
      h +=
        '<div class="baris-cip kalk-contoh"><span class="teks-lemah">Contoh</span>' +
        k.contoh
          .map(function (c, i) {
            return '<button type="button" class="cip" data-contoh="' + i + '" aria-pressed="' + (s.contoh === i) + '">' + esc(c.n) + "</button>";
          })
          .join("") +
        "</div>";
    }
    if (k.petunjuk) h += '<p class="kalk-petunjuk">' + k.petunjuk + "</p>";
    var biasa = k.medan.filter(function (m) {
      return m.jenis !== "jadual";
    });
    if (biasa.length)
      h +=
        '<div class="grid-medan kalk-medan">' +
        biasa
          .map(function (m) {
            return htmlMedan(k, s, m, x);
          })
          .join("") +
        "</div>";
    medanJadual(k).forEach(function (m) {
      h += htmlJadual(k, s, m, x);
    });
    h +=
      '<div class="kalk-hasil" aria-live="polite"></div>' +
      '<footer class="kalk-kaki">' +
      '<button type="button" class="btn btn-kecil btn-hantu" data-set-semula>' + E.ikon("ulang") + " Set semula</button>" +
      '<a class="btn btn-kecil btn-hantu" href="#' + b.id + '">' + E.ikon("buku") + " Nota " + esc(E.labelBab(b)) + "</a>" +
      "</footer></article>";
    return h;
  }

  function htmlHasil(o) {
    if (o.ralat) return '<p class="kalk-ralat">' + E.ikon("salah") + "<span>" + o.ralat + "</span></p>";
    var h = "";
    if (o.hasil && o.hasil.length) {
      h +=
        '<div class="kalk-jawapan">' +
        o.hasil
          .map(function (r) {
            return '<div class="kalk-nilai"><span>' + r.l + "</span>" + (r.s ? '<b class="status ' + r.s + '">' + r.v + "</b>" : "<b>" + r.v + "</b>") + (r.ket ? "<small>" + r.ket + "</small>" : "") + "</div>";
          })
          .join("") +
        "</div>";
    }
    if (o.langkah && o.langkah.length) {
      h +=
        '<div class="kalk-langkah"><span class="kalk-sub">Jalan kira</span><ol>' +
        o.langkah
          .map(function (l) {
            return "<li>" + l + "</li>";
          })
          .join("") +
        "</ol></div>";
    }
    if (o.amaran) h += '<p class="kalk-ralat amaran">' + E.ikon("mata") + "<span>" + o.amaran + "</span></p>";
    if (o.nota) h += '<p class="kalk-nota">' + o.nota + "</p>";
    return h;
  }

  function kira(k, s, el) {
    var x = nilai(k, s);
    var o;
    if (x._ralat) o = { ralat: x._ralat };
    else {
      try {
        o = k.kira(x) || {};
      } catch (e) {
        o = { ralat: "Tidak dapat mengira dengan nilai ini." };
      }
    }
    el.querySelector(".kalk-hasil").innerHTML = htmlHasil(o);
    el.querySelectorAll("td.hasil").forEach(function (td) {
      var lajur = o.sel && o.sel[td.getAttribute("data-c")];
      var v = lajur ? lajur[+td.getAttribute("data-r")] : null;
      td.textContent = v == null ? "–" : v;
    });
    el.querySelectorAll(".kalk-jadual").forEach(function (j) {
      j.querySelectorAll("textarea.sel").forEach(tinggiAuto);
      j.previousElementSibling.hidden = j.scrollWidth <= j.clientWidth + 2;
    });
  }

  /* ---------- halaman ---------- */
  function teksCari(k) {
    var b = E.babIkut[k.bab];
    return (k.tajuk + " " + k.kunci + " " + k.rumus.join(" ") + " " + b.tajuk + " " + E.kunciKumpulan(b) + " " + E.labelBab(b) + " " + k.no).replace(/<[^>]+>/g, " ").toLowerCase();
  }

  function bilanganBab(id) {
    return K.filter(function (k) {
      return k.bab === id;
    }).length;
  }

  function papar(app, sasaran) {
    var st = { tapis: "semua", cari: "" };
    var fokus = null;
    var babAda = E.bab.filter(function (b) {
      return bilanganBab(b.id) > 0;
    });
    var kumpulanAda = E.kumpulan().filter(function (g) {
      return g.bab.some(function (b) {
        return bilanganBab(b.id) > 0;
      });
    });
    var kunciAda = kumpulanAda.map(function (g) {
      return g.kunci;
    });
    if (kunciAda.indexOf(sasaran) !== -1 || (E.babIkut[sasaran] && bilanganBab(sasaran))) st.tapis = sasaran;
    else if (ikutId[sasaran]) fokus = sasaran;

    var keadaan = {};
    K.forEach(function (k) {
      keadaan[k.id] = keadaanAwal(k, 0);
    });

    var html =
      '<div class="bekas pandangan halaman-kalk">' +
      '<nav class="remah"><a href="#utama">Utama</a><span>/</span><span>Kalkulator</span></nav>' +
      '<div class="bahagian-kepala" style="margin-top:14px"><div><h1 style="font-size:clamp(30px,4.4vw,44px)">Kalkulator Ekonomi</h1><p>Semua rumus dan pengiraan dalam silibus Ekonomi Tingkatan 4 dan 5' + (E.babPeringkat("stpm").length ? (E.babPeringkat("matrik").length ? ", STPM" : " serta STPM") : "") + (E.babPeringkat("matrik").length ? " serta Matrikulasi" : "") + '. Tukar nilai, jawapan dan jalan kira dikemas kini serta-merta. Nilai awal ialah contoh daripada buku teks.</p></div></div>' +
      '<div class="penapis kaca kalk-penapis">' +
      '<div class="baris"><b>Pilih</b>' +
      '<button type="button" class="cip" data-tapis="semua">Semua</button>' +
      kumpulanAda
        .map(function (g) {
          return '<button type="button" class="cip" data-tapis="' + g.kunci + '">' + esc(g.label) + "</button>";
        })
        .join("") +
      babAda
        .map(function (b) {
          return '<button type="button" class="cip" data-tapis="' + b.id + '"><span class="titik" style="color:' + b.warna + '"></span>' + esc(E.labelPendek(b)) + " B" + b.no + "</button>";
        })
        .join("") +
      "</div>" +
      '<div class="baris"><label class="cari">' + E.ikon("cari") + '<input type="search" id="cari-kalk" placeholder="Cari rumus: Ed, KDNK, inflasi, ansuran…" aria-label="Cari kalkulator"></label><span class="teks-lemah" id="kira-kalk"></span></div>' +
      "</div>";
    babAda.forEach(function (b) {
      html +=
        '<section class="galeri-kumpulan kalk-kumpulan" data-bab="' + b.id + '" style="--warna-bab:' + b.warna + '">' +
        '<h2><span class="lencana-bab" style="width:36px;height:36px;font-size:16px;border-radius:11px">' + b.no + "</span> " + esc(E.labelPendek(b)) + " · " + esc(b.tajuk) + "</h2>" +
        '<div class="grid-kalk">' +
        K.filter(function (k) {
          return k.bab === b.id;
        })
          .map(function (k) {
            return htmlKad(k, keadaan[k.id]);
          })
          .join("") +
        "</div></section>";
    });
    html += '<p class="kalk-tiada teks-lemah" hidden>Tiada kalkulator sepadan dengan carian ini.</p></div>';
    app.innerHTML = html;

    var akar = app.querySelector(".halaman-kalk");
    var cariEl = document.getElementById("cari-kalk");
    var indeks = {};
    K.forEach(function (k) {
      indeks[k.id] = teksCari(k);
      var el = document.getElementById("kalk-" + k.id);
      kira(k, keadaan[k.id], el);
    });

    function tapis() {
      var q = st.cari.toLowerCase().trim().split(/\s+/).filter(Boolean);
      var n = 0;
      akar.querySelectorAll(".kalk").forEach(function (el) {
        var k = ikutId[el.getAttribute("data-id")];
        var b = E.babIkut[k.bab];
        var ok = st.tapis === "semua" || st.tapis === E.kunciKumpulan(b) || st.tapis === k.bab;
        if (ok && q.length)
          ok = q.every(function (w) {
            return indeks[k.id].indexOf(w) !== -1;
          });
        el.hidden = !ok;
        if (ok) n++;
      });
      akar.querySelectorAll(".kalk-kumpulan").forEach(function (g) {
        g.hidden = !g.querySelector(".kalk:not([hidden])");
      });
      akar.querySelector(".kalk-tiada").hidden = n > 0;
      document.getElementById("kira-kalk").textContent = n + " kalkulator";
      akar.querySelectorAll("[data-tapis]").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-tapis") === st.tapis));
      });
    }
    tapis();

    akar.querySelectorAll("[data-tapis]").forEach(function (b) {
      b.addEventListener("click", function () {
        st.tapis = b.getAttribute("data-tapis");
        history.replaceState(null, "", "#kalkulator" + (st.tapis === "semua" ? "" : "-" + st.tapis));
        tapis();
      });
    });
    cariEl.addEventListener("input", function () {
      st.cari = cariEl.value;
      tapis();
    });

    function kadDari(t) {
      var el = t.closest(".kalk");
      return el ? { el: el, k: ikutId[el.getAttribute("data-id")], s: keadaan[el.getAttribute("data-id")] } : null;
    }

    function lukisSemula(c, fokusSelector) {
      var baru = document.createElement("div");
      baru.innerHTML = htmlKad(c.k, c.s);
      var el = baru.firstChild;
      c.el.parentNode.replaceChild(el, c.el);
      kira(c.k, c.s, el);
      if (fokusSelector) {
        var f = el.querySelector(fokusSelector);
        if (f) f.focus();
      }
    }

    akar.addEventListener("input", function (e) {
      var t = e.target;
      var c = kadDari(t);
      if (!c) return;
      if (t.hasAttribute("data-k") && t.tagName === "INPUT") {
        c.s.v[t.getAttribute("data-k")] = t.value;
        kira(c.k, c.s, c.el);
      } else if (t.classList.contains("sel")) {
        var jk = t.getAttribute("data-j");
        var r = +t.getAttribute("data-r");
        c.s.j[jk][r][+t.getAttribute("data-i")] = t.value;
        pilihBaris(c, jk, r);
        kira(c.k, c.s, c.el);
      }
    });

    // nama dalam jadual ialah satu baris: Enter tidak menambah baris baharu dalam textarea
    akar.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.tagName === "TEXTAREA" && e.target.classList.contains("sel")) e.preventDefault();
    });

    function pilihBaris(c, jk, r) {
      if (c.s.baris[jk] === r) return false;
      c.s.baris[jk] = r;
      var mj = medanJadual(c.k).filter(function (x) {
        return x.k === jk;
      })[0];
      if (mj && mj.tanpaPilih) return false;
      c.el.querySelectorAll('.kalk-jadual[data-jk="' + jk + '"] tr[data-r]').forEach(function (tr) {
        tr.classList.toggle("dipilih", +tr.getAttribute("data-r") === r);
      });
      return true;
    }

    akar.addEventListener("focusin", function (e) {
      var t = e.target;
      if (!t.classList || !t.classList.contains("sel")) return;
      var c = kadDari(t);
      if (c && pilihBaris(c, t.getAttribute("data-j"), +t.getAttribute("data-r"))) kira(c.k, c.s, c.el);
    });

    akar.addEventListener("change", function (e) {
      var t = e.target;
      if (t.tagName !== "SELECT") return;
      var c = kadDari(t);
      if (!c) return;
      var m = c.k.medan.filter(function (x) {
        return x.k === t.getAttribute("data-k");
      })[0];
      c.s.v[m.k] = t.value;
      if (m.ubah) m.ubah(c.s, t.value);
      lukisSemula(c, 'select[data-k="' + m.k + '"]');
    });

    akar.addEventListener("click", function (e) {
      var t = e.target.closest("button, td.hasil");
      if (!t) return;
      var c = kadDari(t);
      if (!c) return;
      if (t.tagName === "TD") {
        var tr = t.closest("tr");
        var jk = t.getAttribute("data-hj");
        if (pilihBaris(c, jk, +tr.getAttribute("data-r"))) kira(c.k, c.s, c.el);
        return;
      }
      if (t.hasAttribute("data-contoh")) {
        keadaan[c.k.id] = c.s = keadaanAwal(c.k, +t.getAttribute("data-contoh"));
        lukisSemula(c, '[data-contoh="' + c.s.contoh + '"]');
      } else if (t.hasAttribute("data-set-semula")) {
        keadaan[c.k.id] = c.s = keadaanAwal(c.k, c.s.contoh);
        lukisSemula(c, "[data-set-semula]");
        E.toast("Nilai contoh dipulihkan");
      } else if (t.hasAttribute("data-tambah")) {
        var j = t.getAttribute("data-tambah");
        var m = medanJadual(c.k).filter(function (x) {
          return x.k === j;
        })[0];
        var n = m.lajur.filter(function (x) {
          return !x.hasil;
        }).length;
        var baris = [];
        for (var i = 0; i < n; i++) baris.push("");
        c.s.j[j].push(baris);
        c.s.baris[j] = c.s.j[j].length - 1;
        lukisSemula(c, 'tr[data-r="' + c.s.baris[j] + '"] .sel');
      } else if (t.hasAttribute("data-buang")) {
        var jb = t.getAttribute("data-buang");
        if (c.s.j[jb].length <= 2) return;
        c.s.j[jb].pop();
        c.s.baris[jb] = Math.min(c.s.baris[jb], c.s.j[jb].length - 1);
        lukisSemula(c, '[data-buang="' + jb + '"]');
      }
    });

    if (fokus) {
      setTimeout(function () {
        var el = document.getElementById("kalk-" + fokus);
        if (!el) return;
        el.scrollIntoView({ behavior: "auto", block: "start" });
        el.classList.add("sorot");
        setTimeout(function () {
          el.classList.remove("sorot");
        }, 1800);
      }, 0);
    }
  }

  // Untuk ujian dalam Node: kira contoh ke-i tanpa DOM
  function kiraContoh(id, i) {
    var k = ikutId[id];
    var x = nilai(k, keadaanAwal(k, i || 0));
    return x._ralat ? { ralat: x._ralat } : k.kira(x);
  }

  E.kalkulator = {
    senarai: K,
    papar: papar,
    bilanganBab: bilanganBab,
    ikutId: ikutId,
    kiraContoh: kiraContoh
  };
})();
