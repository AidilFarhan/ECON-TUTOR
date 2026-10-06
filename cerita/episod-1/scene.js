(function () {
  "use strict";
  function el(n) { return document.getElementById(n); }
  var sedang = false, semua = false, kamera = 50, namaScene = "kelas", gambar = new Image(), dilihat = {}, fokusBalik = null;
  var titik = {
    kelas: [
      { id: "lakaran", x: .28, y: .54, label: "Lakaran booth", nama: "Mira", teks: "Ni idea booth kita! Air dan sandwich nampak best, tapi kita kena pilih ikut duit dan masa yang ada." },
      { id: "buku", x: .63, y: .59, label: "Buku kira-kira", nama: "Hakim", teks: "Duit kelas RM100. Wishlist RM150. Beza RM50 tu sebab kita kena kecilkan pelan, bukan terus janji buat semua." }
    ],
    persediaan: [
      { id: "salad", x: .36, y: .65, label: "Letak salad", nama: "Mira", teks: "Okay, salad atas roti dulu. Aku susun contoh sandwich ni; lepas pilih kuantiti, baru kita sediakan stok jualan." },
      { id: "jug", x: .79, y: .76, label: "Sediakan air", nama: "Hakim", teks: "Jug dan bahan air dah ready. Setiap cawan guna bahan serta masa; banyak mana kita buat kena ikut kapasiti pasukan." },
      { id: "kira", x: .78, y: .58, label: "Semak kapasiti", nama: "Hakim", teks: "Aku semak kiraan sambil Mira susun bahan. Satu air guna 1 unit kerja, satu sandwich guna 2. Kita tak boleh melebihi had sesi ni." }
    ],
    hujan: [
      { id: "bekas", x: .60, y: .64, label: "Jaga bekas", nama: "Hakim", teks: "Aku pegang bekas ni supaya makanan kekal bertutup. Stok dah siap; sekarang kita kena pilih lokasi yang sesuai untuk jual." },
      { id: "hujan", x: .88, y: .40, label: "Tengok laluan", nama: "Mira", teks: "Laluan luar dah sunyi. Jimat bayaran tapak ada manfaat, tapi kita mungkin lepaskan peluang jumpa lebih ramai pembeli." }
    ],
    senja: [
      { id: "kotak", x: .54, y: .81, label: "Kemas booth", nama: "Mira", teks: "Kita susun bekas yang masih bertutup dalam kotak. Dah habis karnival, kita tetap kena kira baki dan kemas sama-sama." },
      { id: "stok", x: .66, y: .61, label: "Semak baki stok", nama: "Hakim", teks: function (s) { return s ? "Baki stok: " + (s.air - s.jualAir - s.bantuanAir) + " air dan " + (s.sandwic - s.jualSandwic - s.bantuanSandwic) + " sandwich. Jualan dan bantuan dikira berasingan." : "Aku semak bekas yang berbaki. Kita asingkan apa yang terjual, apa yang diagihkan dan apa yang masih ada."; } }
    ]
  };
  var state = null;
  function letak() {
    var r = el("novel").getBoundingClientRect(), iw = gambar.naturalWidth || 1672, ih = gambar.naturalHeight || 941;
    var skala = (semua ? Math.min : Math.max)(r.width / iw, r.height / ih), w = iw * skala, h = ih * skala;
    var ox = (r.width - w) * (semua ? .5 : kamera / 100), oy = (r.height - h) * (semua ? .5 : .35);
    window.KARNIVAL_ANIMASI.bingkai(w,h,ox,oy);
    el("scene-kiri").disabled = semua || w <= r.width + 2 || kamera <= 0;
    el("scene-kanan").disabled = semua || w <= r.width + 2 || kamera >= 100;
    Array.prototype.forEach.call(el("titik-scene").children, function (b) {
      var x = ox + Number(b.dataset.x) * w, y = oy + Number(b.dataset.y) * h;
      b.style.left = x + "px"; b.style.top = y + "px";
      b.hidden = x < 28 || x > r.width - 28 || y < 100 || y > r.height - 80;
    });
  }
  function pan(n) { kamera = Math.max(0, Math.min(100, n)); el("latar").style.setProperty("--kamera-x", kamera + "%"); letak(); }
  function binaTitik() {
    el("titik-scene").replaceChildren();
    titik[namaScene].forEach(function (p) {
      var b = document.createElement("button"); b.className = "titik"; b.dataset.x = p.x; b.dataset.y = p.y; b.dataset.objek = p.id;
      b.setAttribute("aria-label", p.label); var label = document.createElement("span"); label.textContent = p.label; b.appendChild(label);
      b.classList.toggle("dilihat", !!dilihat[namaScene + p.id]);
      b.onclick = function () {
        dilihat[namaScene + p.id] = true; b.classList.add("dilihat"); fokusBalik = b;
        el("suara-scene").textContent = p.nama; el("respons-scene").textContent = typeof p.teks === "function" ? p.teks(state) : p.teks;
        window.KARNIVAL_BUNYI.objek(p.id);
        window.KARNIVAL_ANIMASI.respons(p.nama,p.id,el("respons-scene").textContent);
        el("reaksi-scene").hidden = false; el("novel").classList.add("ada-respons"); el("sambung-scene").focus({ preventScroll: true });
        el("latar").classList.remove("novel-sorot"); void el("latar").offsetWidth; el("latar").classList.add("novel-sorot");
      };
      el("titik-scene").appendChild(b);
    });
    letak();
  }
  function tutupRespons() { el("reaksi-scene").hidden = true; el("novel").classList.remove("ada-respons"); window.KARNIVAL_ANIMASI.kembali(); if (fokusBalik && !fokusBalik.hidden) { fokusBalik.focus({ preventScroll: true }); } }
  function jelajah(v) {
    sedang = v; semua = false; tutupRespons(); el("novel").classList.toggle("menjelajah", v); el("novel").classList.remove("lihat-semua"); el("scene-semua").textContent = "Lihat keseluruhan";
    el("titik-scene").hidden = !v; el("arah-scene").hidden = !v; el("jelajah").textContent = v ? "Kembali ke cerita" : "Jelajah scene";
    el("jelajah").setAttribute("aria-expanded", String(v)); if (v) { pan(50); } else { el("jelajah").focus({ preventScroll: true }); }
  }
  el("jelajah").onclick = function () { jelajah(!sedang); };
  el("sambung-scene").onclick = tutupRespons;
  el("scene-kiri").onclick = function () { semua = false; el("novel").classList.remove("lihat-semua"); pan(kamera - 25); };
  el("scene-kanan").onclick = function () { semua = false; el("novel").classList.remove("lihat-semua"); pan(kamera + 25); };
  el("scene-semua").onclick = function () { semua = !semua; el("novel").classList.toggle("lihat-semua", semua); el("scene-semua").textContent = semua ? "Penuhi skrin" : "Lihat keseluruhan"; letak(); };
  document.addEventListener("keydown", function (e) { if (sedang && e.key === "Escape" && !el("buku").open) { jelajah(false); } });
  new ResizeObserver(letak).observe(el("novel"));
  function papar(n, penutur, s) {
    state = s; el("kawalan-scene").hidden = !s; if (sedang) { jelajah(false); }
    window.KARNIVAL_ANIMASI.papar(n,penutur,s);
    var sceneBaru = namaScene !== n || !gambar.src;
    if (sceneBaru) { namaScene = n; gambar.onload = letak; gambar.src = "assets/" + n + ".png"; binaTitik(); }
    var menegak = el("novel").clientHeight > el("novel").clientWidth;
    if (!menegak) { pan(50); }
    else if (penutur === "Mira" || penutur === "Hakim") { pan(penutur === "Mira" ? 30 : 65); }
    else if (penutur === "Kamu") { pan(50); }
    else if (sceneBaru) { pan(40); }
  }
  window.KARNIVAL_SCENE = { papar: papar, player: function () { if (!sedang) { pan(50); } }, menjelajah: function () { return sedang; } };
  papar("kelas", "Pencerita", null);
})();
