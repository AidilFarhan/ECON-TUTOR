/* =========================================================
   Econ Tutor · aplikasi (penghala & pandangan)
   Laluan hash: #utama, #nota, #t4-b1 (bab), #graf, #kad, #kad-t4-b1,
   #kuiz, #kuiz-t4-b1, #kuiz-t4, #kuiz-t5, #kuiz-semua, #kuiz-k1,
   #percubaan, #k2
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var G = E.graf;
  var app = document.getElementById("app");
  var esc = E.esc;
  var pemerhatiTOC = null;
  var pemasaKuiz = null;
  var pendengarKekunci = null;

  /* ---------- tema ---------- */
  function terapTema(t) {
    var root = document.documentElement;
    if (t === "cerah") root.setAttribute("data-theme", "light");
    else if (t === "gelap") root.setAttribute("data-theme", "dark");
    else if (t === "sistem" && root.hasAttribute("data-tema-kami")) root.removeAttribute("data-theme");
    if (t !== "sistem") root.setAttribute("data-tema-kami", "1");
    else root.removeAttribute("data-tema-kami");
    var btn = document.getElementById("btn-tema");
    if (btn) {
      var ikon = t === "cerah" ? "matahari" : t === "gelap" ? "bulan" : "sistem";
      var label = t === "cerah" ? "Tema cerah" : t === "gelap" ? "Tema gelap" : "Tema ikut sistem";
      btn.innerHTML = E.ikon(ikon);
      btn.setAttribute("aria-label", label + " (klik untuk tukar)");
      btn.title = label;
    }
  }

  function tukarTema() {
    var d = E.data();
    var urutan = ["sistem", "cerah", "gelap"];
    var baru = urutan[(urutan.indexOf(d.tema) + 1) % urutan.length];
    E.kemas(function (x) {
      x.tema = baru;
    });
    terapTema(baru);
    E.toast(baru === "sistem" ? "Tema ikut tetapan peranti" : baru === "cerah" ? "Tema cerah" : "Tema gelap");
  }

  /* ---------- rangka navigasi ---------- */
  var NAV = [
    ["utama", "Utama", "rumah"],
    ["nota", "Nota", "buku"],
    ["graf", "Graf", "graf"],
    ["kad", "Kad Study", "kad"],
    ["kuiz", "Kuiz", "kuiz"],
    ["percubaan", "Percubaan", "kertas"]
  ];

  function binaNavigasi() {
    var atas = document.getElementById("nav-atas");
    var bawah = document.getElementById("nav-bawah");
    if (atas) {
      atas.innerHTML = NAV.map(function (n) {
        return '<a href="#' + n[0] + '" data-nav="' + n[0] + '">' + n[1] + "</a>";
      }).join("");
    }
    if (bawah) {
      bawah.innerHTML = NAV.filter(function (n) {
        return n[0] !== "percubaan";
      })
        .map(function (n) {
          return '<a href="#' + n[0] + '" data-nav="' + n[0] + '">' + E.ikon(n[2]) + "<span>" + (n[0] === "kad" ? "Kad" : n[1]) + "</span></a>";
        })
        .join("");
    }
    var jenama = document.getElementById("jenama");
    if (jenama) jenama.innerHTML = E.tandaJenama() + '<span>Econ Tutor</span><small>SPM</small>';
    var bt = document.getElementById("btn-tema");
    if (bt) bt.addEventListener("click", tukarTema);
  }

  function tandaNav(kunci) {
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === kunci) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  /* ---------- penghala ---------- */
  function laluan() {
    var h = "";
    try {
      h = decodeURIComponent((location.hash || "").replace(/^#/, ""));
    } catch (e) {
      h = (location.hash || "").replace(/^#/, "");
    }
    return h || "utama";
  }

  function pergi(h) {
    if (laluan() === h) papar();
    else location.hash = h;
  }
  E.pergi = pergi;

  function bersih() {
    G.tanggal();
    if (pemerhatiTOC) {
      pemerhatiTOC.disconnect();
      pemerhatiTOC = null;
    }
    if (pemasaKuiz) {
      clearInterval(pemasaKuiz);
      pemasaKuiz = null;
    }
    if (pendengarKekunci) {
      document.removeEventListener("keydown", pendengarKekunci);
      pendengarKekunci = null;
    }
  }

  function papar() {
    bersih();
    var h = laluan();
    var nav = "utama";
    var tajuk = "Econ Tutor";
    if (h === "utama") {
      pUtama();
    } else if (h === "nota") {
      nav = "nota";
      pNota();
    } else if (E.babIkut[h]) {
      nav = "nota";
      pBab(E.babIkut[h]);
      tajuk = E.babIkut[h].tajuk + " · Econ Tutor";
    } else if (h === "graf") {
      nav = "graf";
      pGraf();
    } else if (h === "kad" || h.indexOf("kad-") === 0) {
      nav = "kad";
      pKad(h.slice(4) || "semua");
    } else if (h === "kuiz") {
      nav = "kuiz";
      pKuizSenarai();
    } else if (h.indexOf("kuiz-") === 0) {
      nav = "kuiz";
      pKuizMula(h.slice(5));
    } else if (h === "percubaan") {
      nav = "percubaan";
      pPercubaan();
    } else if (h === "k2" || h.indexOf("k2-") === 0) {
      nav = "percubaan";
      pK2(h.slice(3));
    } else {
      pUtama();
    }
    tandaNav(nav);
    document.title = tajuk;
    window.scrollTo(0, 0);
    G.pasang(app);
  }

  /* ---------- statistik & kemajuan ---------- */
  function kiraGraf(b) {
    var n = 0;
    b.seksyen.forEach(function (s) {
      var m = (s.html || "").match(/data-graf="/g);
      if (m) n += m.length;
    });
    return n;
  }

  function kemajuanBab(b) {
    var d = E.data();
    var baca = d.dibaca[b.id] ? 1 : 0;
    var kad = E.kadBab(b.id);
    var diingat = kad.filter(function (k) {
      return d.kad[k.id];
    }).length;
    var rkad = kad.length ? diingat / kad.length : 0;
    var q = d.kuiz[b.id];
    var rkuiz = q && q.jumlah ? q.terbaik / q.jumlah : 0;
    return {
      peratus: Math.round((baca * 0.4 + rkad * 0.3 + rkuiz * 0.3) * 100),
      baca: !!baca,
      diingat: diingat,
      jumlahKad: kad.length,
      kuiz: q
    };
  }

  /* ---------- komponen ---------- */
  function kadBab(b) {
    var k = kemajuanBab(b);
    var nKuiz = E.soalanBab(b.id).length;
    return (
      '<article class="kad-bab kaca" style="--warna-bab:' + b.warna + '">' +
      '<div class="atas"><span class="lencana-bab">' + b.no + '</span><div class="meta">Tingkatan ' + b.tingkatan + " · Bab " + b.no + "</div></div>" +
      '<h3><a href="#' + b.id + '">' + esc(b.tajuk) + "</a></h3>" +
      '<div class="subtopik">' +
      b.seksyen
        .map(function (s) {
          return "<span><i>" + esc(s.no) + "</i>" + esc(s.tajuk) + "</span>";
        })
        .join("") +
      "</div>" +
      '<div class="kemajuan" aria-label="Kemajuan ' + k.peratus + '%"><span style="width:' + k.peratus + '%"></span></div>' +
      '<div class="bawah">' +
      '<a class="cip" href="#kad-' + b.id + '">' + E.ikon("kad") + " Kad · " + b.kad.length + "</a>" +
      '<a class="cip" href="#kuiz-' + b.id + '">' + E.ikon("kuiz") + " Kuiz · " + nKuiz + "</a>" +
      (k.baca ? '<span class="status baik">' + E.ikon("betul") + " Dibaca</span>" : "") +
      "</div></article>"
    );
  }

  function gridTingkatan(t, tajuk, huraian) {
    var senarai = E.babTingkatan(t);
    return (
      '<section class="bahagian">' +
      '<div class="bahagian-kepala"><div><span class="label-kecil"><span class="titik"></span>Tingkatan ' + t + "</span><h2>" + tajuk + "</h2>" + (huraian ? "<p>" + huraian + "</p>" : "") + "</div></div>" +
      '<div class="grid-bab">' + senarai.map(kadBab).join("") + "</div></section>"
    );
  }

  function jumlahSemua() {
    var g = 0,
      k = 0,
      q = 0;
    E.bab.forEach(function (b) {
      g += kiraGraf(b);
      k += b.kad.length;
      q += b.kuiz.length;
    });
    E.setKuiz.forEach(function (s) {
      q += (s.soalan || []).length;
    });
    return { graf: g, kad: k, soalan: q };
  }

  /* ---------- UTAMA ---------- */
  function pUtama() {
    var j = jumlahSemua();
    var d = E.data();
    var akhir = d.akhir && E.babIkut[d.akhir];
    var html =
      '<div class="bekas pandangan">' +
      '<section class="wira">' +
      "<div>" +
      '<span class="label-kecil"><span class="titik"></span>Ekonomi SPM · KSSM Tingkatan 4 &amp; 5</span>' +
      "<h1>Buku teks Ekonomi yang <em>boleh disentuh</em>.</h1>" +
      '<p class="pengenalan">Nota lengkap setiap bab, graf dengan nod yang boleh diseret, kad study untuk menghafal fakta, dan kuiz mengikut bab. Termasuk Kertas Percubaan SPM Kelantan 2025 dan MPP3 Terengganu 2025 bersama skema.</p>' +
      '<div class="tindakan"><a class="btn btn-utama" href="#' + (akhir ? akhir.id : "t4-b1") + '">' + (akhir ? "Sambung " + esc("Bab " + akhir.no + " T" + akhir.tingkatan) : "Mula dari Bab 1") + " " + E.ikon("kanan") + '</a><a class="btn" href="#kuiz">Cuba kuiz</a></div>' +
      '<div class="statistik"><span><b>' + E.bab.length + "</b>bab</span><span><b>" + j.graf + "</b>graf interaktif</span><span><b>" + j.kad + "</b>kad study</span><span><b>" + j.soalan + "</b>soalan kuiz</span></div>" +
      "</div>" +
      '<figure class="wira-graf" data-graf="keseimbangan" data-opt=\'{"preset":"wira"}\'></figure>' +
      "</section>";
    if (akhir) {
      var k = kemajuanBab(akhir);
      html +=
        '<a class="sambung kaca" href="#' + akhir.id + '" style="--warna-bab:' + akhir.warna + '">' +
        '<span class="lencana-bab">' + akhir.no + "</span>" +
        '<span class="teks"><span>Sambung belajar · Tingkatan ' + akhir.tingkatan + "</span><b>" + esc(akhir.tajuk) + "</b></span>" +
        '<span class="status neutral">' + k.peratus + "%</span>" + E.ikon("kanan") +
        "</a>";
    }
    html += gridTingkatan(4, "Asas mikroekonomi", "Konsep ekonomi, pasaran, wang dan pendapatan individu, serta pengeluaran firma.");
    html += gridTingkatan(5, "Makroekonomi & ekonomi global", "Peranan kerajaan, penunjuk ekonomi, dasar fiskal dan kewangan, globalisasi, perdagangan antarabangsa serta pertukaran asing.");
    html +=
      '<section class="bahagian"><div class="bahagian-kepala"><div><span class="label-kecil"><span class="titik"></span>Alat belajar</span><h2>Ulang kaji dengan cara sendiri</h2></div></div>' +
      '<div class="grid-alat">' +
      alat("graf", "graf", "Makmal graf", "Semua keluk interaktif dalam satu tempat.") +
      alat("kad", "kad", "Kad study", "Hafal istilah dan rumus. Tandakan kad yang dah diingat.") +
      alat("kuiz", "kuiz", "Kuiz mengikut bab", "Soalan objektif dengan penerangan untuk setiap jawapan.") +
      alat("percubaan", "kertas", "Kertas Percubaan 2025", "Kertas 1 dan Kertas 2 Kelantan serta MPP3 Terengganu, bersama skema pemarkahan.") +
      "</div></section>";
    html += "</div>";
    app.innerHTML = html;
  }

  function alat(href, ikon, tajuk, teks) {
    return '<a class="kad-alat kaca" href="#' + href + '"><span class="ikon-bulat">' + E.ikon(ikon) + "</span><b>" + tajuk + "</b><span>" + teks + "</span></a>";
  }

  /* ---------- NOTA (senarai bab) ---------- */
  function pNota() {
    app.innerHTML =
      '<div class="bekas pandangan">' +
      '<nav class="remah"><a href="#utama">Utama</a><span>/</span><span>Nota</span></nav>' +
      '<div class="bahagian-kepala" style="margin-top:14px"><div><h1 style="font-size:clamp(30px,4.4vw,44px)">Nota mengikut bab</h1><p>Setiap bab mengikut susunan Standard Kandungan buku teks. Graf dalam nota boleh terus diseret.</p></div></div>' +
      gridTingkatan(4, "Tingkatan 4") +
      gridTingkatan(5, "Tingkatan 5") +
      "</div>";
  }

  /* ---------- BAB ---------- */
  function pBab(b) {
    E.kemas(function (d) {
      d.akhir = b.id;
    });
    var d = E.data();
    var semua = E.bab;
    var idx = semua.indexOf(b);
    var sebelum = semua[idx - 1];
    var selepas = semua[idx + 1];
    var nKuiz = E.soalanBab(b.id).length;
    var html =
      '<div class="bekas pandangan" style="--warna-bab:' + b.warna + '">' +
      '<nav class="remah"><a href="#utama">Utama</a><span>/</span><a href="#nota">Nota</a><span>/</span><span>Tingkatan ' + b.tingkatan + "</span></nav>" +
      '<header class="bab-kepala kaca">' +
      '<div class="atas"><span class="lencana-bab">' + b.no + '</span><span class="label-kecil">Tingkatan ' + b.tingkatan + " · Bab " + b.no + "</span></div>" +
      "<h1>" + esc(b.tajuk) + "</h1>" +
      (b.ringkas ? '<p class="ringkas">' + b.ringkas + "</p>" : "") +
      '<div class="tindakan">' +
      '<a class="btn btn-utama" href="#kad-' + b.id + '">' + E.ikon("kad") + " Kad study (" + b.kad.length + ")</a>" +
      '<a class="btn" href="#kuiz-' + b.id + '">' + E.ikon("kuiz") + " Kuiz bab (" + nKuiz + ")</a>" +
      "</div></header>" +
      '<div class="bab-susun">' +
      '<aside class="isi-kandungan kaca" id="toc"></aside>' +
      '<div class="nota">';
    b.seksyen.forEach(function (s, i) {
      html +=
        '<section class="seksyen kaca-pekat" id="s' + (i + 1) + '">' +
        '<h2><span class="no">' + esc(s.no) + "</span> " + esc(s.tajuk) + "</h2>" +
        (s.soalan && s.soalan.length
          ? '<div class="soalan-panduan">' +
            s.soalan
              .map(function (q) {
                return "<span>" + E.ikon("cari") + " " + q + "</span>";
              })
              .join("") +
            "</div>"
          : "") +
        '<div class="nota-isi">' + s.html + "</div></section>";
    });
    var dibaca = !!d.dibaca[b.id];
    html +=
      '<div class="selesai-kotak kaca"><div><b>' + (dibaca ? "Bab ini sudah ditandakan selesai" : "Dah habis baca?") + "</b><p>Uji kefahaman dengan kad study dan kuiz bab ini.</p></div>" +
      '<div class="baris-cip">' +
      '<button class="btn ' + (dibaca ? "" : "btn-utama") + '" id="btn-selesai" type="button">' + E.ikon("betul") + " " + (dibaca ? "Tandakan belum selesai" : "Tandakan selesai dibaca") + "</button>" +
      '<a class="btn" href="#kuiz-' + b.id + '">Kuiz bab ' + E.ikon("kanan") + "</a></div></div>" +
      '<nav class="bab-navigasi">' +
      (sebelum ? '<a class="kaca" href="#' + sebelum.id + '"><span>' + E.ikon("kiri") + " Sebelum · T" + sebelum.tingkatan + " Bab " + sebelum.no + "</span><b>" + esc(sebelum.tajuk) + "</b></a>" : "<span></span>") +
      (selepas ? '<a class="kaca seterusnya" href="#' + selepas.id + '"><span>Seterusnya · T' + selepas.tingkatan + " Bab " + selepas.no + " " + E.ikon("kanan") + "</span><b>" + esc(selepas.tajuk) + "</b></a>" : "<span></span>") +
      "</nav>";
    html += "</div></div></div>";
    app.innerHTML = html;

    var btn = document.getElementById("btn-selesai");
    btn.addEventListener("click", function () {
      E.kemas(function (x) {
        if (x.dibaca[b.id]) delete x.dibaca[b.id];
        else x.dibaca[b.id] = Date.now();
      });
      E.toast(E.data().dibaca[b.id] ? "Bab ditandakan selesai" : "Tanda selesai dibuang");
      var y = window.scrollY;
      papar();
      window.scrollTo(0, y);
    });
    binaTOC(b);
  }

  function binaTOC(b) {
    var toc = document.getElementById("toc");
    if (!toc) return;
    var item = [];
    var n = 0;
    app.querySelectorAll(".seksyen").forEach(function (sek) {
      var h2 = sek.querySelector("h2");
      item.push({ id: sek.id, no: h2.querySelector(".no").textContent, teks: h2.textContent.replace(h2.querySelector(".no").textContent, "").trim(), tahap: 2 });
      sek.querySelectorAll(".nota-isi > h3").forEach(function (h3) {
        n++;
        if (!h3.id) h3.id = "h" + n;
        var no = h3.querySelector(".no");
        item.push({ id: h3.id, no: no ? no.textContent : "", teks: no ? h3.textContent.replace(no.textContent, "").trim() : h3.textContent, tahap: 3 });
      });
    });
    var sempit = window.matchMedia && window.matchMedia("(max-width: 980px)").matches;
    var senarai =
      "<ol>" +
      item
        .map(function (it) {
          return '<li class="h' + it.tahap + '"><a href="#" data-sasaran="' + it.id + '"><i>' + esc(it.no) + "</i><span>" + esc(it.teks) + "</span></a></li>";
        })
        .join("") +
      "</ol>";
    toc.innerHTML = sempit
      ? "<details><summary>Isi kandungan bab " + E.ikon("senarai") + "</summary>" + senarai + "</details>"
      : "<b>Isi kandungan</b>" + senarai;
    toc.addEventListener("click", function (e) {
      var a = e.target.closest("[data-sasaran]");
      if (!a) return;
      e.preventDefault();
      var el = document.getElementById(a.getAttribute("data-sasaran"));
      if (el) el.scrollIntoView({ behavior: E.kurangGerak() ? "auto" : "smooth", block: "start" });
    });
    if ("IntersectionObserver" in window) {
      var pautan = {};
      toc.querySelectorAll("[data-sasaran]").forEach(function (a) {
        pautan[a.getAttribute("data-sasaran")] = a;
      });
      pemerhatiTOC = new IntersectionObserver(
        function (entri) {
          entri.forEach(function (en) {
            if (en.isIntersecting) {
              toc.querySelectorAll("a.aktif").forEach(function (x) {
                x.classList.remove("aktif");
              });
              var a = pautan[en.target.id];
              if (a) a.classList.add("aktif");
            }
          });
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      item.forEach(function (it) {
        var el = document.getElementById(it.id);
        if (el) pemerhatiTOC.observe(el);
      });
    }
  }

  /* ---------- GRAF (galeri) ---------- */
  function pGraf() {
    var html =
      '<div class="bekas pandangan">' +
      '<nav class="remah"><a href="#utama">Utama</a><span>/</span><span>Graf</span></nav>' +
      '<div class="bahagian-kepala" style="margin-top:14px"><div><h1 style="font-size:clamp(30px,4.4vw,44px)">Makmal graf</h1><p>Semua rajah interaktif mengikut bab. Seret nod, garis harga atau keluk, dan perhati bacaan di bawah setiap graf.</p></div></div>';
    E.bab.forEach(function (b) {
      var figs = [];
      b.seksyen.forEach(function (s) {
        var re = /<figure[^>]*data-graf="[^"]*"[^>]*><\/figure>/g;
        var m;
        while ((m = re.exec(s.html || ""))) figs.push(m[0]);
      });
      if (!figs.length) return;
      html +=
        '<section class="galeri-kumpulan" style="--warna-bab:' + b.warna + '">' +
        '<h2><span class="lencana-bab" style="width:36px;height:36px;font-size:16px;border-radius:11px">' + b.no + "</span> T" + b.tingkatan + " · " + esc(b.tajuk) + ' <a class="cip" style="margin-left:auto" href="#' + b.id + '">Buka nota</a></h2>' +
        '<div class="galeri">' + figs.join("") + "</div></section>";
    });
    html += "</div>";
    app.innerHTML = html;
  }

  /* ---------- KAD STUDY ---------- */
  function pKad(tapis) {
    var d = E.data();
    var st = {
      tapis: tapis,
      paparan: "dek",
      sorok: false,
      cari: ""
    };
    function kadTapis() {
      var babs = E.bab.filter(function (b) {
        if (st.tapis === "semua") return true;
        if (st.tapis === "t4") return b.tingkatan === 4;
        if (st.tapis === "t5") return b.tingkatan === 5;
        return b.id === st.tapis;
      });
      var kad = [];
      babs.forEach(function (b) {
        kad = kad.concat(E.kadBab(b.id));
      });
      return kad;
    }

    function babLabel(id) {
      var b = E.babIkut[id];
      return b ? "T" + b.tingkatan + " Bab " + b.no : "";
    }

    var dek = null;

    function rangka() {
      var pilihanBab = E.bab
        .map(function (b) {
          return '<button type="button" class="cip" data-tapis="' + b.id + '" aria-pressed="' + (st.tapis === b.id) + '"><span class="titik" style="color:' + b.warna + '"></span>T' + b.tingkatan + " B" + b.no + "</button>";
        })
        .join("");
      app.innerHTML =
        '<div class="bekas pandangan">' +
        '<nav class="remah"><a href="#utama">Utama</a><span>/</span><span>Kad Study</span></nav>' +
        '<div class="bahagian-kepala" style="margin-top:14px"><div><h1 style="font-size:clamp(30px,4.4vw,44px)">Kad study</h1><p>Baca soalan, cuba jawab dalam kepala, kemudian terbalikkan kad. Tandakan <b>Dah ingat</b> atau <b>Ulang lagi</b>.</p></div></div>' +
        '<div class="kad-susun">' +
        '<div class="penapis kaca">' +
        '<div class="baris"><b>Pilih</b>' +
        '<button type="button" class="cip" data-tapis="semua" aria-pressed="' + (st.tapis === "semua") + '">Semua</button>' +
        '<button type="button" class="cip" data-tapis="t4" aria-pressed="' + (st.tapis === "t4") + '">Tingkatan 4</button>' +
        '<button type="button" class="cip" data-tapis="t5" aria-pressed="' + (st.tapis === "t5") + '">Tingkatan 5</button>' +
        pilihanBab +
        "</div>" +
        '<div class="baris"><b>Paparan</b>' +
        '<button type="button" class="cip" data-paparan="dek" aria-pressed="' + (st.paparan === "dek") + '">' + E.ikon("kad") + " Kad</button>" +
        '<button type="button" class="cip" data-paparan="senarai" aria-pressed="' + (st.paparan === "senarai") + '">' + E.ikon("senarai") + " Senarai (glosari)</button>" +
        '<label class="cip" style="cursor:pointer"><input type="checkbox" id="sorok-ingat" ' + (st.sorok ? "checked" : "") + ' style="accent-color:var(--accent)"> Sorok kad yang dah diingat</label>' +
        "</div></div>" +
        '<div id="kawasan-kad"></div>' +
        "</div></div>";
      app.querySelectorAll("[data-tapis]").forEach(function (b) {
        b.addEventListener("click", function () {
          st.tapis = b.getAttribute("data-tapis");
          history.replaceState(null, "", "#kad" + (st.tapis === "semua" ? "" : "-" + st.tapis));
          rangka();
        });
      });
      app.querySelectorAll("[data-paparan]").forEach(function (b) {
        b.addEventListener("click", function () {
          st.paparan = b.getAttribute("data-paparan");
          rangka();
        });
      });
      document.getElementById("sorok-ingat").addEventListener("change", function (e) {
        st.sorok = e.target.checked;
        mulaDek();
      });
      mulaDek();
    }

    function mulaDek() {
      d = E.data();
      var kad = kadTapis();
      if (st.sorok)
        kad = kad.filter(function (k) {
          return !d.kad[k.id];
        });
      if (st.paparan === "senarai") return paparSenarai(kad);
      dek = { baris: kad.slice(), i: 0, terbalik: false, jumlah: kad.length, siap: 0 };
      paparDek();
    }

    function paparSenarai(kad) {
      var kawasan = document.getElementById("kawasan-kad");
      kawasan.innerHTML =
        '<div class="penapis kaca" style="margin-bottom:12px"><div class="baris"><label class="cari">' + E.ikon("cari") + '<input type="search" id="cari-kad" placeholder="Cari istilah atau jawapan…" value="' + esc(st.cari) + '"></label><span class="teks-lemah" id="kira-kad"></span></div></div>' +
        '<div class="senarai-kad" id="senarai-kad"></div>';
      var inp = document.getElementById("cari-kad");
      function tapis() {
        var q = st.cari.toLowerCase();
        var hasil = kad.filter(function (k) {
          if (!q) return true;
          return (k.d + " " + k.b.replace(/<[^>]+>/g, " ")).toLowerCase().indexOf(q) !== -1;
        });
        document.getElementById("kira-kad").textContent = hasil.length + " kad";
        document.getElementById("senarai-kad").innerHTML = hasil.length
          ? hasil
              .map(function (k) {
                return (
                  '<div class="item kaca' + (d.kad[k.id] ? " diingat" : "") + '"><div><b>' + k.d + '</b><span class="tag">' + babLabel(k.bab) + (k.t ? " · " + esc(k.t) : "") + '</span></div><div class="jwp">' + k.b + "</div></div>"
                );
              })
              .join("")
          : '<div class="kosong kaca">Tiada kad sepadan.</div>';
      }
      inp.addEventListener("input", function () {
        st.cari = inp.value;
        tapis();
      });
      tapis();
    }

    function paparDek() {
      var kawasan = document.getElementById("kawasan-kad");
      if (!dek.baris.length) {
        var semua = kadTapis();
        var ingat = semua.filter(function (k) {
          return E.data().kad[k.id];
        }).length;
        kawasan.innerHTML =
          '<div class="keputusan kaca"><svg class="ikon" style="width:44px;height:44px;color:var(--good)" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><h2>' +
          (dek.jumlah ? "Satu pusingan selesai!" : "Tiada kad untuk dipaparkan") +
          "</h2><p class=\"teks-lemah\">" + ingat + " daripada " + semua.length + " kad dalam pilihan ini sudah ditandakan <b>Dah ingat</b>.</p>" +
          '<div class="baris-cip" style="justify-content:center"><button class="btn btn-utama" id="dek-lagi" type="button">' + E.ikon("ulang") + ' Ulang kad yang belum diingat</button><button class="btn" id="dek-semua" type="button">Mula semula semua kad</button><a class="btn btn-hantu" href="#kuiz">Pergi ke kuiz</a></div></div>';
        document.getElementById("dek-lagi").addEventListener("click", function () {
          st.sorok = true;
          rangka();
        });
        document.getElementById("dek-semua").addEventListener("click", function () {
          st.sorok = false;
          rangka();
        });
        return;
      }
      var k = dek.baris[dek.i];
      var dd = E.data();
      var peratus = dek.jumlah ? Math.round((dek.siap / dek.jumlah) * 100) : 0;
      kawasan.innerHTML =
        '<div class="dek">' +
        '<div class="dek-kemajuan"><div class="atas"><span>' + dek.siap + " / " + dek.jumlah + " diingat dalam pusingan ini</span><span>" + dek.baris.length + ' baki</span></div><div class="kemajuan"><span style="width:' + peratus + '%"></span></div></div>' +
        '<button type="button" class="kad-flip' + (dek.terbalik ? " terbalik" : "") + '" id="kad-flip" aria-label="Terbalikkan kad">' +
        '<span class="dalam">' +
        '<span class="muka depan kaca-pekat"><span class="jenis"><span>' + babLabel(k.bab) + (k.t ? " · " + esc(k.t) : "") + "</span><span>" + (dd.kad[k.id] ? "✓ dah ingat" : "Soalan") + '</span></span><span class="utama">' + k.d + '</span><span class="kaki"><span>Ketik atau tekan <kbd>Space</kbd> untuk lihat jawapan</span></span></span>' +
        '<span class="muka belakang kaca-pekat"><span class="jenis"><span>Jawapan</span><span>' + babLabel(k.bab) + '</span></span><span class="utama">' + k.b + "</span></span>" +
        "</span></button>" +
        '<div class="dek-kawalan">' +
        '<button class="btn btn-ulang" id="btn-ulang" type="button">' + E.ikon("ulang") + " Ulang lagi</button>" +
        '<button class="btn" id="btn-kocok" type="button" aria-label="Kocok kad">' + E.ikon("kocok") + " Kocok</button>" +
        '<button class="btn btn-ingat" id="btn-ingat" type="button">' + E.ikon("betul") + " Dah ingat</button>" +
        "</div>" +
        '<p class="papan-kekunci"><kbd>Space</kbd> terbalik · <kbd>1</kbd> ulang lagi · <kbd>2</kbd> dah ingat · <kbd>←</kbd> <kbd>→</kbd> tukar kad</p>' +
        "</div>";
      var flip = document.getElementById("kad-flip");
      flip.addEventListener("click", function () {
        dek.terbalik = !dek.terbalik;
        flip.classList.toggle("terbalik", dek.terbalik);
      });
      document.getElementById("btn-ulang").addEventListener("click", ulang);
      document.getElementById("btn-ingat").addEventListener("click", ingat);
      document.getElementById("btn-kocok").addEventListener("click", function () {
        dek.baris = E.kocok(dek.baris);
        dek.i = 0;
        dek.terbalik = false;
        paparDek();
      });
    }

    function ulang() {
      var k = dek.baris.splice(dek.i, 1)[0];
      var pos = Math.min(dek.baris.length, dek.i + 3);
      dek.baris.splice(pos, 0, k);
      if (dek.baris.length === 1) dek.i = 0;
      E.kemas(function (x) {
        delete x.kad[k.id];
      });
      dek.terbalik = false;
      paparDek();
    }
    function ingat() {
      var k = dek.baris.splice(dek.i, 1)[0];
      E.kemas(function (x) {
        x.kad[k.id] = 1;
      });
      dek.siap++;
      if (dek.i >= dek.baris.length) dek.i = 0;
      dek.terbalik = false;
      paparDek();
    }

    pendengarKekunci = function (e) {
      if (st.paparan !== "dek" || !dek || !dek.baris.length) return;
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        var f = document.getElementById("kad-flip");
        dek.terbalik = !dek.terbalik;
        if (f) f.classList.toggle("terbalik", dek.terbalik);
      } else if (e.key === "1") ulang();
      else if (e.key === "2") ingat();
      else if (e.key === "ArrowRight") {
        dek.i = (dek.i + 1) % dek.baris.length;
        dek.terbalik = false;
        paparDek();
      } else if (e.key === "ArrowLeft") {
        dek.i = (dek.i - 1 + dek.baris.length) % dek.baris.length;
        dek.terbalik = false;
        paparDek();
      }
    };
    document.addEventListener("keydown", pendengarKekunci);
    rangka();
  }

  /* ---------- KUIZ ---------- */
  function setKuiz(id) {
    // pulang {id, tajuk, soalan, kocok, label}
    if (E.babIkut[id]) {
      var b = E.babIkut[id];
      return { id: id, tajuk: "Kuiz T" + b.tingkatan + " Bab " + b.no + ": " + b.tajuk, soalan: E.soalanBab(id), kocok: true, bab: b };
    }
    if (id === "t4" || id === "t5") {
      var t = id === "t4" ? 4 : 5;
      var s = [];
      E.babTingkatan(t).forEach(function (b) {
        s = s.concat(E.soalanBab(b.id));
      });
      return { id: id, tajuk: "Kuiz campuran Tingkatan " + t, soalan: s, kocok: true, had: 20 };
    }
    if (id === "semua") {
      var s2 = [];
      E.bab.forEach(function (b) {
        s2 = s2.concat(E.soalanBab(b.id));
      });
      return { id: id, tajuk: "Kuiz campuran Tingkatan 4 & 5", soalan: s2, kocok: true, had: 25 };
    }
    var ss = null;
    E.setKuiz.forEach(function (x) {
      if (x.id === id) ss = x;
    });
    if (ss) {
      return {
        id: ss.id,
        tajuk: ss.label,
        soalan: ss.soalan.map(function (q, i) {
          return Object.assign({ id: ss.id + "-" + (i + 1), src: ss.labelPendek + " · S" + (i + 1), no: i + 1 }, q);
        }),
        kocok: false
      };
    }
    return null;
  }

  function pKuizSenarai() {
    var d = E.data();
    function kad(id, tajuk, teks, warna, no) {
      var s = setKuiz(id);
      var n = s ? Math.min(s.soalan.length, s.had || 999) : 0;
      var rek = d.kuiz[id];
      return (
        '<a class="set-kuiz kaca" href="#kuiz-' + id + '" style="--warna-bab:' + (warna || "var(--accent)") + '">' +
        '<span class="atas">' + (no != null ? '<span class="lencana-bab">' + no + "</span>" : '<span class="lencana-bab">' + E.ikon("kuiz") + "</span>") + "<b>" + tajuk + "</b></span>" +
        "<span>" + teks + " · " + n + " soalan</span>" +
        '<span class="skor-terbaik">' + (rek ? '<span class="status baik">' + E.ikon("bintang") + " Terbaik " + rek.terbaik + "/" + rek.jumlah + "</span>" : '<span class="status neutral">Belum dicuba</span>') + "</span>" +
        "</a>"
      );
    }
    var html =
      '<div class="bekas pandangan">' +
      '<nav class="remah"><a href="#utama">Utama</a><span>/</span><span>Kuiz</span></nav>' +
      '<div class="bahagian-kepala" style="margin-top:14px"><div><h1 style="font-size:clamp(30px,4.4vw,44px)">Kuiz</h1><p>Pilih bab atau set campuran. Setiap jawapan disertakan penerangan supaya anda faham sebab jawapan itu betul.</p></div></div>';
    [4, 5].forEach(function (t) {
      html += '<section class="bahagian" style="margin-top:22px"><div class="bahagian-kepala"><h2>Tingkatan ' + t + '</h2></div><div class="kuiz-pilih">';
      E.babTingkatan(t).forEach(function (b) {
        html += kad(b.id, esc(b.tajuk), "T" + b.tingkatan + " Bab " + b.no, b.warna, b.no);
      });
      html += kad("t" + t, "Campuran Tingkatan " + t, "20 soalan rawak", null, null);
      html += "</div></section>";
    });
    html += '<section class="bahagian" style="margin-top:22px"><div class="bahagian-kepala"><h2>Set khas</h2></div><div class="kuiz-pilih">';
    html += kad("semua", "Campuran T4 &amp; T5", "25 soalan rawak", null, null);
    E.setKuiz.forEach(function (s) {
      html += kad(s.id, esc(s.label), "Susunan asal kertas", "var(--bab-rm100)", null);
    });
    html += "</div></section></div>";
    app.innerHTML = html;
  }

  function rajahSoalan(q) {
    var out = "";
    if (q.f) out += q.f;
    if (q.g) {
      if (Array.isArray(q.g)) {
        out +=
          '<div class="grid-rajah">' +
          q.g
            .map(function (g) {
              return "<figure><figcaption>" + esc(g.label || "") + "</figcaption>" + G.statik(g) + "</figure>";
            })
            .join("") +
          "</div>";
      } else out += G.statik(q.g);
    }
    if (q.kapsyen) out += '<span class="kapsyen">' + q.kapsyen + "</span>";
    return out ? '<div class="rajah">' + out + "</div>" : "";
  }

  // Pilihan bernombor atau gabungan roman (I dan II) kekal mengikut tertib.
  function pilihanTertib(p) {
    return p.every(function (x) {
      var t = String(x).replace(/<[^>]+>/g, "").trim();
      if (/^[IVX]+(,\s*[IVX]+)*\s+dan\s+[IVX]+$/.test(t)) return true;
      return /\d/.test(t) && t.replace(/[^A-Za-z]/g, "").length <= 10;
    });
  }

  // Kocok susunan pilihan supaya jawapan tidak berpola. Soalan kertas
  // percubaan (ada src) dikekalkan mengikut susunan asal.
  function kocokPilihan(q) {
    if (q.src || q.tetap || !q.p || pilihanTertib(q.p)) return q;
    var urutan = E.kocok(q.p.map(function (_, i) {
      return i;
    }));
    return Object.assign({}, q, {
      p: urutan.map(function (k) {
        return q.p[k];
      }),
      j: urutan.indexOf(q.j)
    });
  }

  function pKuizMula(id, senaraiKhas) {
    var set = setKuiz(id);
    if (!set) return pKuizSenarai();
    var soalan = senaraiKhas || set.soalan.slice();
    if (!senaraiKhas && set.kocok) soalan = E.kocok(soalan).map(kocokPilihan);
    if (!senaraiKhas && set.had) soalan = soalan.slice(0, set.had);
    var st = { i: 0, jawapan: [], skor: 0, mula: Date.now() };

    function masa() {
      var s = Math.floor((Date.now() - st.mula) / 1000);
      return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
    }

    function labelBab(q) {
      var b = E.babIkut[q.bab || (set.bab && set.bab.id)];
      return b ? "T" + b.tingkatan + " · Bab " + b.no : "";
    }

    function paparSoalan() {
      var q = soalan[st.i];
      var jawab = st.jawapan[st.i];
      var peratus = Math.round((st.i / soalan.length) * 100);
      var sumber = [labelBab(q), q.src].filter(Boolean).join(" · ");
      app.innerHTML =
        '<div class="bekas pandangan"><div class="kuiz-bekas">' +
        '<nav class="remah" style="margin-top:6px"><a href="#kuiz">Kuiz</a><span>/</span><span>' + esc(set.tajuk) + "</span></nav>" +
        '<div class="kuiz-kepala kaca"><div class="atas"><span>Soalan <b>' + (st.i + 1) + "</b> / " + soalan.length + "</span><span>Skor <b>" + st.skor + '</b></span><span class="tnum">' + E.ikon("jam") + ' <b id="masa">' + masa() + '</b></span></div><div class="kemajuan"><span style="width:' + peratus + '%"></span></div></div>' +
        '<article class="soalan-kad kaca-pekat">' +
        (sumber ? '<div class="sumber-soalan">' + esc(sumber) + "</div>" : "") +
        '<div class="stem">' + q.s + "</div>" +
        rajahSoalan(q) +
        '<div class="pilihan" role="group" aria-label="Pilihan jawapan">' +
        q.p
          .map(function (p, i) {
            return '<button type="button" data-i="' + i + '"><span class="huruf">' + "ABCD"[i] + "</span><span>" + p + "</span></button>";
          })
          .join("") +
        "</div>" +
        '<div id="penerangan"></div>' +
        "</article>" +
        '<div class="kuiz-bawah"><button class="btn btn-hantu" id="btn-tamat" type="button">Tamatkan kuiz</button><button class="btn btn-utama" id="btn-seterusnya" type="button" disabled>' + (st.i + 1 < soalan.length ? "Seterusnya " + E.ikon("kanan") : "Lihat keputusan " + E.ikon("kanan")) + "</button></div>" +
        "</div></div>";
      app.querySelectorAll(".pilihan button").forEach(function (b) {
        b.addEventListener("click", function () {
          pilih(parseInt(b.getAttribute("data-i"), 10));
        });
      });
      document.getElementById("btn-seterusnya").addEventListener("click", seterusnya);
      document.getElementById("btn-tamat").addEventListener("click", function () {
        keputusan(true);
      });
      if (jawab != null) tunjuk(jawab);
    }

    function pilih(i) {
      if (st.jawapan[st.i] != null) return;
      st.jawapan[st.i] = i;
      if (i === soalan[st.i].j) st.skor++;
      tunjuk(i);
    }

    function tunjuk(i) {
      var q = soalan[st.i];
      var betul = i === q.j;
      app.querySelectorAll(".pilihan button").forEach(function (b) {
        var k = parseInt(b.getAttribute("data-i"), 10);
        b.disabled = true;
        if (k === q.j) b.classList.add("betul");
        else if (k === i) b.classList.add("salah");
        else b.classList.add("pudar");
      });
      var p = document.getElementById("penerangan");
      p.innerHTML =
        '<div class="penerangan ' + (betul ? "betul" : "salah") + '"><b class="tajuk">' + (betul ? "Betul!" : "Belum tepat · jawapan " + "ABCD"[q.j]) + "</b><div>" + (q.e || "") + "</div></div>";
      var n = document.getElementById("btn-seterusnya");
      n.disabled = false;
      n.focus({ preventScroll: true });
      var kepala = app.querySelector(".kuiz-kepala .atas span:nth-child(2) b");
      if (kepala) kepala.textContent = st.skor;
    }

    function seterusnya() {
      if (st.jawapan[st.i] == null) return;
      if (st.i + 1 < soalan.length) {
        st.i++;
        paparSoalan();
        window.scrollTo(0, 0);
      } else keputusan(false);
    }

    function keputusan(awal) {
      if (pemasaKuiz) {
        clearInterval(pemasaKuiz);
        pemasaKuiz = null;
      }
      var dijawab = st.jawapan.filter(function (x) {
        return x != null;
      }).length;
      var jumlah = awal ? dijawab : soalan.length;
      if (!jumlah) return pergi("kuiz");
      var peratus = Math.round((st.skor / jumlah) * 100);
      if (!senaraiKhas && !awal) {
        E.kemas(function (d) {
          var lama = d.kuiz[set.id];
          if (!lama || st.skor / jumlah > lama.terbaik / lama.jumlah) d.kuiz[set.id] = { terbaik: st.skor, jumlah: jumlah, tarikh: Date.now() };
        });
      }
      var gred = peratus >= 90 ? "A+" : peratus >= 80 ? "A" : peratus >= 70 ? "A−" : peratus >= 65 ? "B+" : peratus >= 60 ? "B" : peratus >= 50 ? "C+" : peratus >= 45 ? "C" : peratus >= 40 ? "D" : "E";
      var lilitan = 2 * Math.PI * 70;
      var salah = [];
      soalan.forEach(function (q, i) {
        if (st.jawapan[i] != null && st.jawapan[i] !== q.j) salah.push(q);
      });
      var pesan = peratus >= 80 ? "Cemerlang! Anda menguasai topik ini." : peratus >= 60 ? "Bagus. Ulang kaji soalan yang salah untuk mantapkan." : "Teruskan usaha. Baca semula nota dan cuba lagi.";
      app.innerHTML =
        '<div class="bekas pandangan"><div class="kuiz-bekas">' +
        '<div class="keputusan kaca-pekat">' +
        '<svg class="cincin" viewBox="0 0 168 168" aria-hidden="true"><circle class="trek" cx="84" cy="84" r="70"/><circle class="isi" id="cincin-isi" cx="84" cy="84" r="70" stroke-dasharray="' + lilitan + '" stroke-dashoffset="' + lilitan + '"/><text x="84" y="84" text-anchor="middle" font-size="38">' + peratus + '%</text><text x="84" y="112" text-anchor="middle" font-size="15" style="fill:var(--ink-3);font-family:var(--font);font-weight:700">Gred ' + gred + "</text></svg>" +
        "<h2>" + st.skor + " / " + jumlah + " betul</h2>" +
        '<p class="teks-lemah">' + pesan + " Masa: " + masa() + ".</p>" +
        '<div class="baris-cip" style="justify-content:center">' +
        (salah.length ? '<button class="btn btn-utama" id="btn-salah" type="button">' + E.ikon("ulang") + " Ulang " + salah.length + " soalan salah</button>" : "") +
        '<button class="btn" id="btn-lagi" type="button">Cuba set ini sekali lagi</button>' +
        (set.bab ? '<a class="btn btn-hantu" href="#' + set.bab.id + '">Baca nota bab</a>' : '<a class="btn btn-hantu" href="#kuiz">Pilih kuiz lain</a>') +
        "</div>" +
        (salah.length
          ? '<div class="semakan"><b>Semak jawapan yang salah</b>' +
            salah
              .map(function (q) {
                return '<div class="item"><div class="s">' + q.s.replace(/<(?!\/?(b|i|em|strong|br)\b)[^>]+>/g, " ") + '</div><div class="j"><span class="status baik">Jawapan ' + "ABCD"[q.j] + "</span> " + q.p[q.j] + "</div>" + (q.e ? '<div class="teks-lemah">' + q.e + "</div>" : "") + "</div>";
              })
              .join("") +
            "</div>"
          : "") +
        "</div></div></div>";
      requestAnimationFrame(function () {
        var c = document.getElementById("cincin-isi");
        if (c) c.setAttribute("stroke-dashoffset", String(lilitan * (1 - peratus / 100)));
      });
      var bs = document.getElementById("btn-salah");
      if (bs)
        bs.addEventListener("click", function () {
          bersih();
          pKuizMula(id, salah);
        });
      document.getElementById("btn-lagi").addEventListener("click", function () {
        bersih();
        pKuizMula(id);
      });
      window.scrollTo(0, 0);
    }

    pendengarKekunci = function (e) {
      if (!document.querySelector(".pilihan")) return;
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      var k = e.key.toLowerCase();
      var peta = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };
      if (k in peta && st.jawapan[st.i] == null) {
        e.preventDefault();
        pilih(peta[k]);
      } else if (k === "enter" && st.jawapan[st.i] != null && document.activeElement && document.activeElement.id !== "btn-seterusnya") {
        e.preventDefault();
        seterusnya();
      }
    };
    document.addEventListener("keydown", pendengarKekunci);
    pemasaKuiz = setInterval(function () {
      var m = document.getElementById("masa");
      if (m) m.textContent = masa();
    }, 1000);
    paparSoalan();
  }

  /* ---------- PERCUBAAN ---------- */
  function pPercubaan() {
    var d = E.data();
    var html =
      '<div class="bekas pandangan">' +
      '<nav class="remah"><a href="#utama">Utama</a><span>/</span><span>Percubaan</span></nav>' +
      '<div class="bahagian-kepala" style="margin-top:14px"><div><h1 style="font-size:clamp(30px,4.4vw,44px)">Kertas Percubaan SPM 2025</h1><p>Ekonomi 3767. Soalan ditaip semula daripada kertas asal, dengan jawapan mengikut peraturan pemarkahan (skema) setiap negeri.</p></div></div>';
    E.kertas2Set.forEach(function (k) {
      var k1 = setKuiz(k.k1);
      var rek = k1 ? d.kuiz[k1.id] : null;
      var bil = 0;
      k.soalan.forEach(function (s) {
        bil += s.bahagian.length;
      });
      html +=
        '<section class="bahagian" style="margin-top:22px"><div class="bahagian-kepala"><div><h2>' + esc(k.label) + "</h2>" + (k.sumber ? '<p class="teks-lemah" style="margin:4px 0 0">' + esc(k.sumber) + "</p>" : "") + "</div></div>" +
        '<div class="kuiz-pilih">' +
        (k1
          ? '<a class="set-kuiz kaca" href="#kuiz-' + k1.id + '" style="--warna-bab:var(--bab-rm100)"><span class="atas"><span class="lencana-bab">1</span><b>Kertas 1 (3767/1)</b></span><span>' + k1.soalan.length + ' soalan objektif mengikut susunan asal. Penerangan dipaparkan selepas setiap jawapan.</span><span class="skor-terbaik">' + (rek ? '<span class="status baik">Terbaik ' + rek.terbaik + "/" + rek.jumlah + "</span>" : '<span class="status neutral">Belum dicuba</span>') + "</span></a>"
          : "") +
        '<a class="set-kuiz kaca" href="#k2-' + k.id + '" style="--warna-bab:var(--bab-rm50)"><span class="atas"><span class="lencana-bab">2</span><b>Kertas 2 (3767/2)</b></span><span>' + esc((k.bahagianA || "Bahagian A") + " dan " + (k.bahagianB || "Bahagian B")) + '. Tulis jawapan, kemudian semak dengan skema.</span><span class="skor-terbaik"><span class="status neutral">' + bil + " bahagian soalan</span></span></a>" +
        "</div></section>";
    });
    html +=
      '<div class="kotak tip" style="margin-top:18px"><span class="kotak-label">Tip menjawab Kertas 2</span><p>Skema memberi 1 markah bagi setiap <b>fakta (F)</b> dan 1 markah bagi setiap <b>huraian (H)</b>. Untuk soalan “bezakan”, tulis perbandingan berpasangan (1+1). Untuk Bahagian B, markah ditentukan melalui tahap (1 hingga 3): nyatakan pendirian, huraikan dua sisi, sertakan rajah jika sesuai dan buat rumusan.</p></div>' +
      "</div>";
    app.innerHTML = html;
  }

  function pK2(idKertas) {
    var kertas = E.kertas2Ikut(idKertas);
    var k2 = kertas ? kertas.soalan : [];
    var d = E.data();
    // Kunci storan: kertas pertama (Kelantan) kekal dengan format lama.
    function kunciK2(no, bi) {
      return kertas && kertas.kunciLama ? "k2-" + no + "-" + bi : "k2-" + kertas.id + "-" + no + "-" + bi;
    }
    var html =
      '<div class="bekas pandangan">' +
      '<nav class="remah"><a href="#utama">Utama</a><span>/</span><a href="#percubaan">Percubaan</a><span>/</span><span>Kertas 2' + (kertas ? " · " + esc(kertas.nama) : "") + '</span></nav>' +
      '<div class="bahagian-kepala" style="margin-top:14px"><div><h1 style="font-size:clamp(28px,4vw,40px)">Kertas 2 · Latihan struktur &amp; esei</h1><p>' + (kertas ? "<b>" + esc(kertas.label) + ".</b> " : "") + 'Jawapan anda disimpan dalam pelayar ini sahaja. Tekan <b>Tunjuk skema</b>, tandakan isi yang anda tulis dan lihat anggaran markah.</p></div></div>' +
      '<div style="display:grid;gap:16px">';
    k2.forEach(function (s) {
      html +=
        '<article class="struktur-soalan kaca-pekat" id="soalan-k2-' + s.no + '">' +
        '<span class="label-kecil">Bahagian ' + s.seksyen + (s.seksyen === "B" ? " · pilih mana-mana dua" : " · wajib") + "</span>" +
        "<h3>Soalan " + s.no + (s.tajuk ? ": " + esc(s.tajuk) : "") + "</h3>" +
        (s.konteks ? '<div class="konteks">' + s.konteks + "</div>" : "");
      s.bahagian.forEach(function (b, bi) {
        var kunci = kunciK2(s.no, bi);
        var simpan = d.k2[kunci] || {};
        var bb = E.babIkut[b.bab];
        html +=
          '<div class="bahagian-soalan" data-kunci="' + kunci + '" data-s="' + s.no + '" data-b="' + bi + '">' +
          (b.konteks ? '<div class="konteks">' + b.konteks + "</div>" : "") +
          '<div class="kepala"><p><b>' + esc(b.kod) + "</b> " + b.s + '</p><span class="markah">' + b.m + " markah</span></div>" +
          (bb ? '<span class="teks-lemah" style="font-size:12.5px;font-weight:700">Topik: T' + bb.tingkatan + " Bab " + bb.no + " · " + esc(bb.tajuk) + (b.topik ? " · " + esc(b.topik) : "") + "</span>" : "") +
          '<textarea placeholder="Tulis jawapan anda di sini…" aria-label="Jawapan ' + esc(s.no + " " + b.kod) + '">' + esc(simpan.teks || "") + "</textarea>" +
          '<div class="baris-cip"><button class="btn btn-kecil" type="button" data-skema>' + E.ikon("mata") + " Tunjuk skema</button></div>" +
          '<div class="skema-tempat"></div>' +
          "</div>";
      });
      html += "</article>";
    });
    html += "</div></div>";
    app.innerHTML = html;

    app.querySelectorAll(".bahagian-soalan").forEach(function (el) {
      var kunci = el.getAttribute("data-kunci");
      var s = k2.filter(function (x) {
        return String(x.no) === el.getAttribute("data-s");
      })[0];
      var b = s.bahagian[parseInt(el.getAttribute("data-b"), 10)];
      var ta = el.querySelector("textarea");
      var t = null;
      ta.addEventListener("input", function () {
        clearTimeout(t);
        t = setTimeout(function () {
          E.kemas(function (x) {
            x.k2[kunci] = Object.assign(x.k2[kunci] || {}, { teks: ta.value });
          });
        }, 400);
      });
      var btn = el.querySelector("[data-skema]");
      var tempat = el.querySelector(".skema-tempat");
      btn.addEventListener("click", function () {
        if (tempat.innerHTML) {
          tempat.innerHTML = "";
          btn.innerHTML = E.ikon("mata") + " Tunjuk skema";
          return;
        }
        btn.innerHTML = E.ikon("mata") + " Sorok skema";
        tempat.innerHTML = binaSkema(b, kunci);
        var semak = tempat.querySelectorAll("input[type=checkbox]");
        function kira() {
          var n = 0;
          var tanda = [];
          semak.forEach(function (c, i) {
            if (c.checked) {
              n += parseFloat(c.getAttribute("data-m") || "1");
              tanda.push(i);
            }
          });
          var m = Math.min(n, b.m);
          var j = tempat.querySelector(".jumlah");
          if (j) j.textContent = b.rubrik ? "Isi yang ditandakan: " + n : "Anggaran markah: " + m + " / " + b.m;
          E.kemas(function (x) {
            x.k2[kunci] = Object.assign(x.k2[kunci] || {}, { tanda: tanda });
          });
        }
        semak.forEach(function (c) {
          c.addEventListener("change", kira);
        });
        kira();
      });
    });
  }

  function binaSkema(b, kunci) {
    var simpan = (E.data().k2[kunci] || {}).tanda || [];
    var html = '<div class="skema"><div class="tajuk"><span>Peraturan pemarkahan</span><span class="jumlah"></span></div>';
    if (b.rajah) html += '<div class="rajah" style="display:grid;justify-items:center">' + G.statik(b.rajah) + "</div>";
    if (b.contoh) html += '<div class="contoh-skema">' + b.contoh + "</div>";
    var i = 0;
    (b.skema || []).forEach(function (kump) {
      if (kump.label) html += '<b style="font-size:13.5px;margin-top:4px">' + kump.label + "</b>";
      kump.isi.forEach(function (x) {
        var kod = x[0],
          teks = x[1],
          m = x[2] || 1;
        html += '<label><input type="checkbox" data-m="' + m + '"' + (simpan.indexOf(i) !== -1 ? " checked" : "") + "><code>" + esc(kod) + "</code><span>" + teks + "</span></label>";
        i++;
      });
    });
    if (b.nota) html += '<p class="nota-skema">' + b.nota + "</p>";
    if (b.rubrik) {
      html +=
        '<div class="rubrik">' +
        b.rubrik
          .map(function (r) {
            return '<div class="tahap"><b>' + r[0] + "</b><ul>" + r[1].map(function (x) {
              return "<li>" + x + "</li>";
            }).join("") + "</ul></div>";
          })
          .join("") +
        "</div>";
    }
    html += "</div>";
    return html;
  }

  /* ---------- mula ---------- */
  function mula() {
    binaNavigasi();
    terapTema(E.data().tema || "sistem");
    window.addEventListener("hashchange", papar);
    papar();
    var tahun = document.getElementById("tahun");
    if (tahun) tahun.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mula);
  else mula();
})();
