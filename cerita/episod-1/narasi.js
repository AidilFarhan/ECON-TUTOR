(function () {
  "use strict";
  function shot(id, alt, gerak) { return { id: id, gambar: "assets/narasi/" + id + ".jpg", alt: alt, gerak: gerak || "sorot" }; }
  var shots = {
    poster: shot("poster", "Close-up lakaran booth: Mira membulatkan sandwich dengan pen merah.", "bulat"),
    cawan: shot("cawan", "Mira melukis cawan di lakaran; Hakim menarik buku kira-kira ke tengah meja.", "lukis"),
    sepakat: shot("sepakat", "Tiga tangan menolak lakaran booth ke tengah meja.", "tolak"),
    alat: shot("alat", "Set peralatan tiba; Mira menyusun bahan sementara Hakim menyemak senarai."),
    pembantu: shot("pembantu", "Kawan mengurus bahan dan bekas di meja sebelah."),
    salad: shot("salad", "Mira meletakkan salad atas roti contoh; buku dua lajur ada di sisi.", "susun"),
    isi: shot("isi", "Bekas kosong diisi dengan produk satu demi satu.", "susun"),
    angkat: shot("angkat", "Mira dan Hakim membawa stok ke booth ketika titisan hujan mula jatuh.", "tolak"),
    lindung: shot("lindung", "Hakim merapatkan bekas di bawah kanopi; Mira melihat ke arah dewan."),
    pindah: shot("pindah", "Pasukan membawa stok ke ruang berbumbung tepi dewan.", "tolak"),
    sunyi: shot("sunyi", "Murid berpayung melintasi booth luar tanpa berhenti."),
    bantuan: shot("bantuan", "Penganjur memanggil pasukan ke ruang berbumbung tanpa bayaran."),
    syiling: shot("syiling", "Seorang murid mengira duit di tangannya di depan menu booth."),
    kad: shot("kad", "Hakim memberi isyarat berhenti dengan tapak tangan terbuka, tanpa menyentuh Mira."),
    betulkan: shot("betulkan", "Mira membetulkan kad promosi; lima hadiah disusun di sebelahnya.", "lukis"),
    jual: shot("jual", "Produk diserahkan kepada pembeli dan bayaran diterima."),
    undur: shot("undur", "Pelanggan berundur ketika kad promosi diturunkan."),
    ramai: shot("ramai", "Mira melayan barisan murid; Hakim menandakan jualan dalam buku."),
    agih: shot("agih", "Bekas bantuan diserahkan daripada bakul yang berasingan dengan stok jualan."),
    petang: shot("petang", "Hujan reda, pengunjung pulang dan Mira mengambil kotak kosong."),
    kemas: shot("kemas", "Mira menyusun bekas berbaki ke dalam kotak; Hakim membuka buku.", "susun"),
    lipat: shot("lipat", "Mira melipat lakaran booth dan menyelitkannya ke dalam buku Hakim.", "lipat"),
    terakhir: shot("terakhir", "Mira dan Hakim mengangkat kotak terakhir bersama-sama.", "tolak"),
    kira: shot("kira", "Close-up buku kira-kira, wang kutipan dan lakaran yang disimpan.")
  };
  shots.kad.gambar = "assets/narasi/kad-stop.png";
  function cue(s, baris) {
    if (!s || !baris || baris.nama !== "Pencerita") { return null; }
    var key = s.node + ":" + s.baris, id;
    if (key === "sepakat:3") { id = s.pelan === "sandwic" ? "poster" : s.pelan === "air" ? "cawan" : "sepakat"; }
    else if (key === "jualan:0") { id = s.jujur ? "betulkan" : "jual"; }
    else if (key === "jualan:3") { id = !s.jujur ? "undur" : s.agihan === "kongsi" ? "agih" : s.agihan === "murid" ? "ramai" : "jual"; }
    else { id = { "siap-alat:0": "alat", "siap-buruh:0": "pembantu", "kuantiti:0": "salad", "stok:1": "isi", "stok:3": "angkat", "langit:0": "lindung", "dalam:0": "pindah", "luar:0": "sunyi", "dibantu:0": "bantuan", "pelanggan:0": "syiling", "agihan:2": "kad", "jualan:4": "petang", "penutup:0": "kemas", "penutup:6": "lipat" }[key]; }
    if (!id) { return null; }
    var c = Object.assign({}, shots[id]);
    if (id === "syiling") { c.label = (s.air ? "Air · RM3" : "Sandwich · RM4") + " / Duit murid: RM" + (s.air ? 2 : 3); }
    if (id === "betulkan") { c.label = "Hadiah untuk lima pembeli pertama"; }
    if (id === "isi") { c.label = "Stok disediakan: " + s.air + " air · " + s.sandwic + " sandwich"; }
    if (id === "lipat") { c.susulan = shots.terakhir; }
    return c;
  }
  var timer = null, current = null, observer = null;
  function el(id) { return document.getElementById(id); }
  function tutup() {
    clearTimeout(timer); current = null; el("narasi-visual").hidden = true;
    el("novel").classList.remove("ada-narasi");
  }
  function tinggi() { el("novel").style.setProperty("--tinggi-dialog", el("mainan").getBoundingClientRect().height + "px"); }
  function gambar(c) {
    el("gambar-narasi").onload = function () { el("novel").style.setProperty("--nisbah-narasi", this.naturalWidth / this.naturalHeight); };
    el("gambar-narasi").src = c.gambar; el("gambar-narasi").alt = c.alt;
    el("narasi-bingkai").dataset.gerak = c.gerak;
    el("bulatan-narasi").toggleAttribute("hidden", c.gerak !== "bulat");
    el("label-narasi").textContent = c.label || ""; el("label-narasi").hidden = !c.label;
    el("narasi-bingkai").classList.remove("mula-aksi"); void el("narasi-bingkai").offsetWidth; el("narasi-bingkai").classList.add("mula-aksi");
  }
  function papar(s, baris) {
    tutup(); var c = cue(s, baris); if (!c) { return; }
    current = c; gambar(c); tinggi();
    el("narasi-visual").hidden = false; el("novel").classList.add("ada-narasi");
    if (!observer) { observer = new ResizeObserver(tinggi); observer.observe(el("mainan")); }
    if (c.susulan) { timer = setTimeout(function () { if (current === c) { gambar(c.susulan); } }, 3600); }
  }
  window.KARNIVAL_NARASI = { cue: cue, papar: papar, tutup: tutup, shots: shots };
})();
