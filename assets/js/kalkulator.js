/* =========================================================
   Econ Tutor · Kalkulator Ekonomi
   Semua rumus dan pengiraan dalam silibus Ekonomi KSSM T4 & T5.
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
    kira: function (x) {
      var dx = x.x1 - x.x0;
      var dy = x.y1 - x.y0;
      if (dx === 0) return { ralat: "Perubahan barang X tidak boleh sifar." };
      var c = dy / dx;
      var L = [
        "Perubahan barang Y = " + nom(x.y1) + " − " + kr(x.y0) + " = " + nom(dy),
        "Perubahan barang X = " + nom(x.x1) + " − " + kr(x.x0) + " = " + nom(dx),
        "Kecerunan KKP = " + nom(dy) + " ÷ " + kr(dx) + " = <b>" + nom(c) + "</b>"
      ];
      var out = {
        hasil: [H("Kecerunan KKP", nom(c)), H("Kos lepas 1 unit X", nom(Math.abs(c)) + " unit Y"), H("Kos lepas 1 unit Y", dy !== 0 ? nom(Math.abs(dx / dy)) + " unit X" : "–")],
        langkah: L
      };
      if ((dx > 0 && dy < 0) || (dx < 0 && dy > 0)) {
        var tambahX = dx > 0;
        L.push(
          tambahX
            ? "Menambah " + nom(dx) + " unit X mengorbankan " + nom(-dy) + " unit Y, maka kos lepas 1 unit X = " + nom(-dy) + " ÷ " + nom(dx) + " = <b>" + nom(Math.abs(c)) + " unit Y</b>"
            : "Menambah " + nom(dy) + " unit Y mengorbankan " + nom(-dx) + " unit X, maka kos lepas 1 unit Y = " + nom(-dx) + " ÷ " + nom(dy) + " = <b>" + nom(Math.abs(dx / dy)) + " unit X</b>"
        );
        out.nota = "Tanda negatif menunjukkan KKP mencerun ke bawah dari kiri ke kanan: untuk menambah satu barang, sebahagian barang lain terpaksa dikorbankan.";
      } else {
        out.amaran = "Kedua-dua barang tidak berubah secara bertentangan. Ini bukan pergerakan di sepanjang KKP (mungkin titik asal di dalam keluk atau KKP beralih).";
      }
      return out;
    }
  });

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
        L.push("Harga " + wang(r.p) + ": " + nom(r.a) + " + " + nom(r.b) + (r.c != null ? " + " + nom(r.c) : "") + " = <b>" + nom(q) + " unit</b>");
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
        L.push(wang(r.p) + ": " + nom(r.qd) + " − " + nom(r.qs) + " = " + nom(b) + " → " + (b > 0 ? "lebihan permintaan " + nom(b) + ", harga cenderung naik" : b < 0 ? "lebihan penawaran " + nom(-b) + ", harga cenderung turun" : "<b>keseimbangan</b>"));
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
        "%ΔQ = (" + nom(x.q1) + " − " + nom(x.q0) + ") ÷ " + nom(x.q0) + " × 100 = " + pc(dq),
        "%ΔP = (" + nom(x.p1) + " − " + nom(x.p0) + ") ÷ " + nom(x.p0) + " × 100 = " + pc(dp)
      ];
      var tr0 = x.p0 * x.q0;
      var tr1 = x.p1 * x.q1;
      var dtr = tr1 - tr0;
      var baris = [
        "TR asal = " + wang(x.p0) + " × " + nom(x.q0) + " = " + wang(tr0),
        "TR baharu = " + wang(x.p1) + " × " + nom(x.q1) + " = " + wang(tr1),
        "Perubahan TR = " + wang(tr1) + " − " + wang(tr0) + " = <b>" + wang(dtr) + "</b>"
      ];
      if (dp === 0) {
        if (dq === 0) return { ralat: "Harga dan kuantiti tidak berubah. Tukar sekurang-kurangnya satu nilai." };
        return { hasil: [H("Ed", "∞"), H("Jenis", "Anjal sempurna", "baik")], langkah: L.concat(["Harga tidak berubah tetapi kuantiti berubah, maka Ed = ∞"]).concat(baris) };
      }
      var ed = dq / dp;
      var a = Math.abs(ed);
      L.push("Ed = " + pc(dq) + " ÷ " + krp(dp) + " = " + nom(ed) + (ed < 0 ? ", dinyatakan sebagai <b>" + nom(a) + "</b>" : ""));
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
        L.push("%ΔP = (" + nom(x.p1) + " − " + nom(x.p0) + ") ÷ " + nom(x.p0) + " × 100 = " + pc(dp));
        L.push(nama + " = %ΔQ ÷ %ΔP, maka %ΔQ = " + nom(x.e) + " × " + pc(Math.abs(dp)) + " = " + pc(Math.abs(dq)) + (d ? " (arah bertentangan dengan harga)" : " (searah dengan harga)"));
        L.push("%ΔQ = " + pc(dq));
        L.push("Q₁ = " + nom(x.q0) + " × (1 + " + kr(dq) + " ÷ 100) = <b>" + nom(q1) + "</b>");
        if (q1 < 0) return { ralat: "Kuantiti baharu menjadi negatif. Semak nilai keanjalan dan harga." };
        return { hasil: [H("Kuantiti baharu Q₁", nom(q1)), H("%ΔQ", pc(dq))], langkah: L };
      }
      if (x.e === 0) return { ralat: "Keanjalan sifar: harga tidak dapat dicari daripada perubahan kuantiti." };
      var dq2 = ((x.q1 - x.q0) / x.q0) * 100;
      var dp2 = ((d ? -1 : 1) * dq2) / x.e;
      var p1 = x.p0 * (1 + dp2 / 100);
      L.push("%ΔQ = (" + nom(x.q1) + " − " + nom(x.q0) + ") ÷ " + nom(x.q0) + " × 100 = " + pc(dq2));
      L.push(nama + " = %ΔQ ÷ %ΔP, maka %ΔP = " + pc(Math.abs(dq2)) + " ÷ " + nom(x.e) + " = " + pc(Math.abs(dp2)) + (d ? " (arah bertentangan dengan kuantiti)" : " (searah dengan kuantiti)"));
      L.push("%ΔP = " + pc(dp2));
      L.push("P₁ = " + wang(x.p0) + " × (1 + " + kr(dp2) + " ÷ 100) = <b>" + wang(p1) + "</b>");
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
        "%ΔQ = (" + nom(x.q1) + " − " + nom(x.q0) + ") ÷ " + nom(x.q0) + " × 100 = " + pc(dq),
        "%ΔP = (" + nom(x.p1) + " − " + nom(x.p0) + ") ÷ " + nom(x.p0) + " × 100 = " + pc(dp)
      ];
      if (dp === 0) {
        if (dq === 0) return { ralat: "Harga dan kuantiti tidak berubah. Tukar sekurang-kurangnya satu nilai." };
        return { hasil: [H("Es", "∞"), H("Jenis", "Anjal sempurna", "baik")], langkah: L };
      }
      var es = dq / dp;
      L.push("Es = " + pc(dq) + " ÷ " + krp(dp) + " = <b>" + nom(es) + "</b>");
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
        "Beban pengguna seunit = " + wang(x.p1) + " − " + wang(x.p0) + " = " + wang(bp),
        "Beban pengeluar seunit = " + wang(x.t) + " − " + wang(bp) + " = " + wang(bf),
        "Jumlah beban pengguna = " + wang(bp) + " × " + nom(x.q1) + " = <b>" + wang(bp * x.q1) + "</b>",
        "Jumlah beban pengeluar = " + wang(bf) + " × " + nom(x.q1) + " = <b>" + wang(bf * x.q1) + "</b>",
        "Hasil cukai kerajaan = " + wang(x.t) + " × " + nom(x.q1) + " = <b>" + wang(x.t * x.q1) + "</b>"
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
        "Faedah pengguna seunit = " + wang(x.p0) + " − " + wang(x.p1) + " = " + wang(fp),
        "Faedah pengeluar seunit = " + wang(x.s) + " − " + wang(fp) + " = " + wang(ff),
        "Jumlah faedah pengguna = " + wang(fp) + " × " + nom(x.q1) + " = <b>" + wang(fp * x.q1) + "</b>",
        "Jumlah faedah pengeluar = " + wang(ff) + " × " + nom(x.q1) + " = <b>" + wang(ff * x.q1) + "</b>",
        "Perbelanjaan kerajaan = " + wang(x.s) + " × " + nom(x.q1) + " = <b>" + wang(x.s * x.q1) + "</b>"
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
          "Pendapatan individu = " +
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
      var out = { hasil: [H("Upah benar", nom(ub) + " unit")], langkah: ["Upah benar = " + wang(x.upah) + " ÷ " + wang(x.h0) + " = <b>" + nom(ub) + " unit</b>"] };
      if (x.h1 != null && x.h1 > 0) {
        var ub1 = x.upah / x.h1;
        var ubah = ((ub1 - ub) / ub) * 100;
        out.langkah.push("Upah benar baharu = " + wang(x.upah) + " ÷ " + wang(x.h1) + " = <b>" + nom(ub1) + " unit</b>");
        out.langkah.push("Perubahan kuasa beli = (" + nom(ub1) + " − " + nom(ub) + ") ÷ " + nom(ub) + " × 100 = " + pc(ubah));
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
          "Jumlah pendapatan = " + wang(x.gaji) + " + " + wang(x.elaun) + " + " + wang(x.lain) + " = " + wang(p),
          "Potongan wajib = " + wang(x.kwsp) + " + " + wang(x.perkeso) + " + " + wang(x.zakat) + " + " + wang(x.cukai) + " = " + wang(w),
          "PBG = " + wang(p) + " − " + wang(w) + " = <b>" + wang(pbg) + "</b>"
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
      var L = ["Pendapatan boleh cukai = " + wang(x.tahunan) + " − " + wang(x.pelepasan) + " = <b>" + wang(bc) + "</b>"];
      if (bc > 100000) return { hasil: [H("Pendapatan boleh cukai", wang(bc))], langkah: L, amaran: "Jadual dalam buku teks hanya sehingga RM100 000. Cukai bagi pendapatan melebihi jumlah ini tidak dikira di sini." };
      var baki = bc;
      var c = 0;
      var awal = true;
      JADUAL_CUKAI.forEach(function (j) {
        if (baki <= 0) return;
        var bah = Math.min(baki, j[0]);
        var cukai = (bah * j[1]) / 100;
        c += cukai;
        L.push(wang(bah) + (awal ? " pertama" : " berikutnya") + " × " + j[1] + "% = " + wang(cukai));
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
          "PBG = " + wang(x.pendapatan) + " − " + wang(x.potongan) + " = " + wang(pbg),
          "Baki = " + wang(pbg) + " − (" + wang(x.belanja) + " + " + wang(x.tabung) + ") = <b>" + wang(baki) + "</b>"
        ]
      };
      if (pbg > 0) out.langkah.push("Kadar tabungan = " + wang(x.tabung) + " ÷ " + wang(pbg) + " × 100 = " + pc((x.tabung / pbg) * 100));
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
      if (x.jenisDp === "pc") L.push("Pendahuluan = " + pc(x.dpPc) + " × " + wang(x.harga) + " = " + wang(dp));
      L.push("Jumlah pinjaman = " + wang(x.harga) + " − " + wang(dp) + " = " + wang(pinjam));
      L.push("Faedah = " + wang(pinjam) + " × " + pc(x.kadar) + " × " + nom(x.tahun) + " = " + wang(faedah));
      L.push("Jumlah perlu dibayar = " + wang(pinjam) + " + " + wang(faedah) + " = " + wang(jum));
      L.push("Ansuran = " + wang(jum) + " ÷ " + nom(bulan) + " bulan = <b>" + wang(ansuran) + " sebulan</b>");
      L.push("Jumlah kos sebenar = " + wang(dp) + " + " + wang(jum) + " = " + wang(dp + jum));
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
          langkah: ["Pulangan = " + wang(x.modal) + " × " + pc(x.kadar) + " × " + nom(x.tahun) + " = <b>" + wang(f) + "</b>", "Nilai akhir = " + wang(x.modal) + " + " + wang(f) + " = " + wang(x.modal + f)],
          nota: "Pulangan ini ialah kos lepas jika simpanan digunakan untuk tujuan lain (contohnya modal perniagaan)."
        };
      }
      if (x.modal <= 0) return { ralat: "Modal mesti lebih daripada sifar." };
      var k = (x.pulangan / x.modal) * 100;
      return {
        hasil: [H("Kadar pulangan", pc(k))],
        langkah: ["Kadar pulangan = " + wang(x.pulangan) + " ÷ " + wang(x.modal) + " × 100 = <b>" + pc(k) + "</b>"],
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
        L.push("AP (buruh ke-" + nom(b.l) + ") = " + nom(b.tp) + " ÷ " + nom(b.l) + " = <b>" + nom(ap[p]) + "</b>");
        if (mp[p] != null) L.push("MP (buruh ke-" + nom(b.l) + ") = (" + nom(b.tp) + " − " + nom(r[p - 1].tp) + ") ÷ (" + nom(b.l) + " − " + nom(r[p - 1].l) + ") = <b>" + nom(mp[p]) + "</b>");
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
        L.push(x.data === "tc" ? "VC = TC − FC = " + wang(tc[p]) + " − " + wang(x.fc) + " = " + wang(vc[p]) : "TC = FC + VC = " + wang(x.fc) + " + " + wang(vc[p]) + " = " + wang(tc[p]));
        L.push("AFC = " + wang(x.fc) + " ÷ " + nom(b.q) + " = " + wang(x.fc / b.q));
        L.push("AVC = " + wang(vc[p]) + " ÷ " + nom(b.q) + " = " + wang(vc[p] / b.q));
        L.push("AC = " + wang(tc[p]) + " ÷ " + nom(b.q) + " = <b>" + wang(tc[p] / b.q) + "</b> (atau AFC + AVC)");
        if (p > 0 && tc[p - 1] != null) L.push("MC = (" + wang(tc[p]) + " − " + wang(tc[p - 1]) + ") ÷ (" + nom(b.q) + " − " + nom(x.j[p - 1].q) + ") = <b>" + wang((tc[p] - tc[p - 1]) / (b.q - x.j[p - 1].q)) + "</b>");
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
        langkah: ["TR = " + wang(x.p) + " × " + nom(x.q) + " = " + wang(tr), "TC = " + wang(x.fc) + " + " + wang(x.vc) + " = " + wang(tc), "Untung = " + wang(tr) + " − " + wang(tc) + " = <b>" + wang(u) + "</b>"]
      };
      if (x.q > 0) out.langkah.push("AC = " + wang(tc) + " ÷ " + nom(x.q) + " = " + wang(tc / x.q) + ", maka untung seunit = " + wang(x.p) + " − " + wang(tc / x.q) + " = " + wang(x.p - tc / x.q));
      out.nota = u > 0 ? "TR &gt; TC: firma mendapat untung." : u < 0 ? "TR &lt; TC: firma mengalami kerugian." : "TR = TC: firma pulang modal.";
      return out;
    }
  });

  tambah({
    id: "untung-ekonomi",
    bab: "t4-b4",
    no: "4.1.6",
    tajuk: "Untung perakaunan dan untung ekonomi",
    kunci: "untung ekonomi kos eksplisit kos implisit perakaunan kos lepas usahawan",
    rumus: ["Untung = Jumlah hasil − Kos eksplisit", "Untung ekonomi = Jumlah hasil − (Kos eksplisit + Kos implisit)"],
    petunjuk: "Kos implisit ialah kos lepas sumber milik sendiri, contohnya gaji yang dilepaskan dan faedah simpanan yang tidak diperoleh.",
    medan: [
      { k: "tr", l: "Jumlah hasil (RM)" },
      { k: "eks", l: "Kos eksplisit (RM)" },
      { k: "gaji", l: "Gaji dilepaskan (RM)" },
      { k: "faedah", l: "Faedah simpanan dilepaskan (RM)" },
      { k: "lain", l: "Kos implisit lain (RM)" }
    ],
    contoh: [{ n: "Usahawan (sebulan)", v: { tr: 10000, eks: 4900, gaji: 3000, faedah: 40, lain: 0 } }],
    kira: function (x) {
      var imp = x.gaji + x.faedah + x.lain;
      var ua = x.tr - x.eks;
      var ue = x.tr - (x.eks + imp);
      return {
        hasil: [H("Untung perakaunan", wang(ua)), H("Kos implisit", wang(imp)), H("Untung ekonomi", wang(ue), ue > 0 ? "baik" : ue < 0 ? "buruk" : "neutral")],
        langkah: [
          "Kos implisit = " + wang(x.gaji) + " + " + wang(x.faedah) + " + " + wang(x.lain) + " = " + wang(imp),
          "Untung = " + wang(x.tr) + " − " + wang(x.eks) + " = " + wang(ua),
          "Untung ekonomi = " + wang(x.tr) + " − (" + wang(x.eks) + " + " + wang(imp) + ") = <b>" + wang(ue) + "</b>"
        ],
        nota: ue > 0 ? "Untung ekonomi positif: perniagaan ini lebih baik daripada pilihan kedua terbaik." : ue < 0 ? "Untung ekonomi negatif: pilihan kedua terbaik (contohnya kekal makan gaji) memberi pulangan lebih tinggi." : "Untung ekonomi sifar: pulangan perniagaan sama dengan pilihan kedua terbaik."
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
      var out = { hasil: [H("Produktiviti", nom(p0) + " unit seinput")], langkah: ["Produktiviti = " + nom(x.o0) + " ÷ " + nom(x.i0) + " = <b>" + nom(p0) + "</b> unit bagi setiap unit input"] };
      if (x.o1 != null && x.i1 != null && x.i1 > 0) {
        var p1 = x.o1 / x.i1;
        var u = ((p1 - p0) / p0) * 100;
        out.langkah.push("Produktiviti tempoh kedua = " + nom(x.o1) + " ÷ " + nom(x.i1) + " = <b>" + nom(p1) + "</b>");
        out.langkah.push("Perubahan = (" + nom(p1) + " − " + nom(p0) + ") ÷ " + nom(p0) + " × 100 = " + pc(u));
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
        langkah: ["Kos sosial = " + wang(x.kp) + " + " + wang(x.kl) + " = " + wang(ks), "Faedah sosial = " + wang(x.fp) + " + " + wang(x.fl) + " = " + wang(fs), "Faedah sosial − Kos sosial = " + wang(fs) + " − " + wang(ks) + " = <b>" + wang(b) + "</b>"],
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
        langkah: ["Indeks harga = " + wang(x.h1) + " ÷ " + wang(x.h0) + " × 100 = <b>" + nom(i) + "</b>"],
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
      if (b && b.h0 > 0 && b.h1 != null) L.push("Indeks " + esc(b.nama || "barang") + " = " + wang(b.h1) + " ÷ " + wang(b.h0) + " × 100 = " + nom((b.h1 / b.h0) * 100));
      L.push("IHP tanpa wajaran = " + nom(ji) + " ÷ " + n + " = <b>" + nom(tw) + "</b>");
      var out = { sel: { i: si, iw: siw }, langkah: L, hasil: [H("IHP tanpa wajaran", nom(tw))] };
      if (jw > 0) {
        var bw = jiw / jw;
        L.push("IHP berwajaran = " + nom(jiw) + " ÷ " + nom(jw) + " = <b>" + nom(bw) + "</b>");
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
        langkah: ["Kadar inflasi = (" + nom(x.i1) + " − " + nom(x.i0) + ") ÷ " + nom(x.i0) + " × 100 = <b>" + pc(r) + "</b>"],
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
        langkah: ["Harga asal = " + wang(x.k0) + " + " + pc(x.m) + " × " + wang(x.k0) + " = " + wang(h0), "Harga baharu = " + wang(x.k1) + " + " + pc(x.m) + " × " + wang(x.k1) + " = <b>" + wang(h1) + "</b>"]
      };
      if (h0 > 0) {
        var u = ((h1 - h0) / h0) * 100;
        out.langkah.push("Kenaikan harga = (" + wang(h1) + " − " + wang(h0) + ") ÷ " + wang(h0) + " × 100 = " + pc(u));
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
        langkah: ["Pendapatan benar = " + wang(x.n) + " ÷ " + nom(x.ihp) + " × 100 = <b>" + wang(b) + "</b>"],
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
        L.push("Penganggur = " + nom(x.tb) + " − " + nom(x.gt) + " = " + nom(pg));
      }
      var k = (pg / x.tb) * 100;
      L.push("Kadar pengangguran = " + nom(pg) + " ÷ " + nom(x.tb) + " × 100 = <b>" + pc(k) + "</b>");
      var penuh = k < 4;
      var out = { hasil: [H("Kadar pengangguran", pc(k)), H("Guna tenaga penuh", penuh ? "Ya (&lt; 4%)" : "Tidak (≥ 4%)", penuh ? "baik" : "buruk")], langkah: L };
      if (x.pend != null && x.pend > 0) {
        var kp = (x.tb / x.pend) * 100;
        L.push("KPTB = " + nom(x.tb) + " ÷ " + nom(x.pend) + " × 100 = <b>" + pc(kp) + "</b>");
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
        langkah: ["X − M = " + nom(x.xx) + " − " + nom(x.m) + " = " + nom(xm), "KDNK = " + nom(x.c) + " + " + nom(x.i) + " + " + nom(x.g) + " + " + kr(xm) + " = <b>" + nom(k) + "</b>"],
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
        langkah: ["KDNK benar = " + nom(x.n) + " ÷ " + nom(x.i) + " × 100 = <b>" + nom(b) + "</b>"],
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
        L.push("KDNK benar tahun sebelumnya = " + nom(x.n0) + " ÷ " + nom(x.i0) + " × 100 = " + nom(b0));
        L.push("KDNK benar tahun semasa = " + nom(x.n1) + " ÷ " + nom(x.i1) + " × 100 = " + nom(b1));
      }
      if (b0 <= 0) return { ralat: "KDNK benar tahun sebelumnya mesti lebih daripada sifar." };
      var g = ((b1 - b0) / b0) * 100;
      L.push("Kadar pertumbuhan = (" + nom(b1) + " − " + nom(b0) + ") ÷ " + nom(b0) + " × 100 = <b>" + pc(g) + "</b>");
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
      var L = ["Hasil kerajaan = " + nom(x.cl) + " + " + nom(x.ctl) + " + " + nom(x.bc) + " = " + nom(h), "Perbelanjaan kerajaan = " + nom(x.mg) + " + " + nom(x.pb) + " = " + nom(p), "Imbangan = " + nom(h) + " − " + nom(p) + " = <b>" + nom(b) + "</b>"];
      var out = {
        hasil: [H("Hasil", nom(h)), H("Perbelanjaan", nom(p)), H("Belanjawan", b > 0 ? "Lebihan " + nom(b) : b < 0 ? "Defisit " + nom(-b) : "Seimbang", b > 0 ? "baik" : b < 0 ? "buruk" : "neutral")],
        langkah: L
      };
      if (x.kdnk != null && x.kdnk > 0) {
        L.push("Imbangan sebagai % KDNK = " + nom(b) + " ÷ " + nom(x.kdnk) + " × 100 = " + pc((b / x.kdnk) * 100));
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
        langkah: ["Kadar A = " + wang(x.ca) + " ÷ " + wang(x.pa) + " × 100 = " + pc(ka), "Kadar B = " + wang(x.cb) + " ÷ " + wang(x.pb) + " × 100 = " + pc(kb)],
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
        L.push("19% × " + wang(a) + " = " + wang(a * 0.19));
        if (b > 0) L.push("24% × " + wang(b) + " = " + wang(b * 0.24));
        L.push("Jumlah cukai = <b>" + wang(c) + "</b>");
      } else {
        c = x.u * 0.24;
        L.push("Cukai = 24% × " + wang(x.u) + " = <b>" + wang(c) + "</b>");
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
      var L = ["Rizab wajib = " + nom(x.d) + " × " + pc(x.n) + " = <b>" + nom(r) + "</b>", "Boleh dipinjamkan = " + nom(x.d) + " − " + nom(r) + " = " + nom(x.d - r)];
      var out = { hasil: [H("Rizab wajib", nom(r)), H("Boleh dipinjamkan", nom(x.d - r))], langkah: L };
      if (x.n1 != null) {
        var r1 = (x.d * x.n1) / 100;
        L.push("Pada nisbah " + pc(x.n1) + ": rizab wajib = " + nom(x.d) + " × " + pc(x.n1) + " = " + nom(r1) + ", boleh dipinjamkan = " + nom(x.d - r1));
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
        A + ": kos lepas 1 " + X + " = " + nom(x.ay) + " ÷ " + nom(x.ax) + " = " + nom(klAX) + " " + Y,
        A + ": kos lepas 1 " + Y + " = " + nom(x.ax) + " ÷ " + nom(x.ay) + " = " + nom(klAY) + " " + X,
        B + ": kos lepas 1 " + X + " = " + nom(x.cy) + " ÷ " + nom(x.cx) + " = " + nom(klBX) + " " + Y,
        B + ": kos lepas 1 " + Y + " = " + nom(x.cx) + " ÷ " + nom(x.cy) + " = " + nom(klBY) + " " + X
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
        L.push("Tarif seunit = " + pc(x.k) + " × " + wang(x.h) + " = " + wang(seunit));
      }
      var jum = seunit * x.q;
      L.push("Hasil tarif = " + wang(seunit) + " × " + nom(x.q) + " = <b>" + wang(jum) + "</b>");
      var out = { hasil: [H("Tarif seunit", wang(seunit)), H("Hasil tarif kerajaan", wang(jum))], langkah: L };
      if (x.h != null) {
        L.push("Harga seunit selepas tarif = " + wang(x.h) + " + " + wang(seunit) + " = " + wang(x.h + seunit));
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
          "Imbangan dagangan = " + nom(x.xb) + " − " + nom(x.mb) + " = " + nom(d),
          "Imbangan perkhidmatan = " + nom(x.xp) + " − " + nom(x.mp) + " = " + nom(p),
          "Pendapatan primer = " + nom(x.p1) + " − " + nom(x.b1) + " = " + nom(a1),
          "Pendapatan sekunder = " + nom(x.p2) + " − " + nom(x.b2) + " = " + nom(a2),
          "Akaun semasa = " + nom(d) + " + " + kr(p) + " + " + kr(a1) + " + " + kr(a2) + " = <b>" + nom(s) + "</b>"
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
          langkah: [wang(x.rm) + " × " + kod + nom(x.unit, 4) + " ÷ " + kadar(x.jual) + " = <b>" + kod + E.fmt(ap, 2, true) + "</b>"],
          nota: "Kita membeli mata wang asing daripada bank, maka bank menggunakan <b>harga jualan</b>." + (Math.abs(a - ap) > 1e-7 ? " Jawapan dipotong kepada 2 tempat perpuluhan seperti dalam buku teks." : "")
        };
      }
      var r = (x.asing * x.beli) / x.unit;
      return {
        hasil: [H("Diterima", wang(r), "neutral")],
        langkah: [kod + nom(x.asing) + " × " + kadar(x.beli) + (x.unit === 1 ? "" : " ÷ " + kod + nom(x.unit, 4)) + " = <b>" + wang(r) + "</b>"],
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
        "Harga import: " + kod + nom(x.im) + " × " + kadar(x.k0) + " = " + wang(i0) + " → " + kod + nom(x.im) + " × " + kadar(x.k1) + " = <b>" + wang(i1) + "</b>",
        "Harga eksport: " + wang(x.ek) + " ÷ " + kadar(x.k0) + " = " + mw(kod, e0) + " → " + wang(x.ek) + " ÷ " + kadar(x.k1) + " = <b>" + mw(kod, e1) + "</b>",
        "Perubahan nilai ringgit = (" + nom(x.k0, 4) + " ÷ " + nom(x.k1, 4) + " − 1) × 100 = " + pc((x.k0 / x.k1 - 1) * 100)
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

  function htmlJadual(k, s, m, x) {
    var rows = s.j[m.k];
    var h = '<p class="kalk-leret" hidden>Leret jadual ke kiri untuk melihat semua lajur ' + E.ikon("kanan") + "</p>";
    h += '<div class="kalk-jadual jadual"><table><thead><tr>';
    m.lajur.forEach(function (c) {
      h += '<th class="' + (c.teks && !c.hasil ? "" : "n") + (c.hasil ? " hasil" : "") + '" scope="col">' + esc(label(c, x)) + "</th>";
    });
    h += "</tr></thead><tbody>";
    rows.forEach(function (r, ri) {
      h += '<tr data-r="' + ri + '"' + (s.baris[m.k] === ri ? ' class="dipilih"' : "") + ">";
      var ci = 0;
      m.lajur.forEach(function (c) {
        if (c.hasil) {
          h += '<td class="' + (c.teks ? "" : "n ") + 'hasil" data-hj="' + m.k + '" data-c="' + c.k + '" data-r="' + ri + '">–</td>';
          return;
        }
        var nilaiSel = r[ci] == null ? "" : r[ci];
        h +=
          '<td><input class="sel' + (c.teks ? " teks" : "") + '" type="text" ' + (c.teks ? "" : 'inputmode="decimal" ') + 'autocomplete="off" spellcheck="false" data-j="' + m.k + '" data-r="' + ri + '" data-i="' + ci + '" value="' + esc(nilaiSel) + '" aria-label="' + esc(label(c, x)) + ", baris " + (ri + 1) + '"></td>';
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
      '<header class="kalk-kepala"><span class="kalk-tag"><i></i>T' + b.tingkatan + " · " + esc(k.no) + "</span><h3>" + esc(k.tajuk) + "</h3></header>" +
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
      '<a class="btn btn-kecil btn-hantu" href="#' + b.id + '">' + E.ikon("buku") + " Nota T" + b.tingkatan + " Bab " + b.no + "</a>" +
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
      j.previousElementSibling.hidden = j.scrollWidth <= j.clientWidth + 2;
    });
  }

  /* ---------- halaman ---------- */
  function teksCari(k) {
    var b = E.babIkut[k.bab];
    return (k.tajuk + " " + k.kunci + " " + k.rumus.join(" ") + " " + b.tajuk + " t" + b.tingkatan + " bab " + b.no + " " + k.no).replace(/<[^>]+>/g, " ").toLowerCase();
  }

  function bilanganBab(id) {
    return K.filter(function (k) {
      return k.bab === id;
    }).length;
  }

  function papar(app, sasaran) {
    var st = { tapis: "semua", cari: "" };
    var fokus = null;
    if (sasaran === "t4" || sasaran === "t5" || (E.babIkut[sasaran] && bilanganBab(sasaran))) st.tapis = sasaran;
    else if (ikutId[sasaran]) fokus = sasaran;

    var keadaan = {};
    K.forEach(function (k) {
      keadaan[k.id] = keadaanAwal(k, 0);
    });

    var babAda = E.bab.filter(function (b) {
      return bilanganBab(b.id) > 0;
    });

    var html =
      '<div class="bekas pandangan halaman-kalk">' +
      '<nav class="remah"><a href="#utama">Utama</a><span>/</span><span>Kalkulator</span></nav>' +
      '<div class="bahagian-kepala" style="margin-top:14px"><div><h1 style="font-size:clamp(30px,4.4vw,44px)">Kalkulator Ekonomi</h1><p>Semua rumus dan pengiraan dalam silibus Ekonomi Tingkatan 4 dan 5. Tukar nilai, jawapan dan jalan kira dikemas kini serta-merta. Nilai awal ialah contoh daripada buku teks.</p></div></div>' +
      '<div class="penapis kaca kalk-penapis">' +
      '<div class="baris"><b>Pilih</b>' +
      '<button type="button" class="cip" data-tapis="semua">Semua</button>' +
      '<button type="button" class="cip" data-tapis="t4">Tingkatan 4</button>' +
      '<button type="button" class="cip" data-tapis="t5">Tingkatan 5</button>' +
      babAda
        .map(function (b) {
          return '<button type="button" class="cip" data-tapis="' + b.id + '"><span class="titik" style="color:' + b.warna + '"></span>T' + b.tingkatan + " B" + b.no + "</button>";
        })
        .join("") +
      "</div>" +
      '<div class="baris"><label class="cari">' + E.ikon("cari") + '<input type="search" id="cari-kalk" placeholder="Cari rumus: Ed, KDNK, inflasi, ansuran…" aria-label="Cari kalkulator"></label><span class="teks-lemah" id="kira-kalk"></span></div>' +
      "</div>";
    babAda.forEach(function (b) {
      html +=
        '<section class="galeri-kumpulan kalk-kumpulan" data-bab="' + b.id + '" style="--warna-bab:' + b.warna + '">' +
        '<h2><span class="lencana-bab" style="width:36px;height:36px;font-size:16px;border-radius:11px">' + b.no + "</span> T" + b.tingkatan + " · " + esc(b.tajuk) + "</h2>" +
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
        var ok = st.tapis === "semua" || st.tapis === "t" + b.tingkatan || st.tapis === k.bab;
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

    function pilihBaris(c, jk, r) {
      if (c.s.baris[jk] === r) return false;
      c.s.baris[jk] = r;
      c.el.querySelectorAll('tr[data-r]').forEach(function (tr) {
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
        lukisSemula(c, 'tr[data-r="' + c.s.baris[j] + '"] input.sel');
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
