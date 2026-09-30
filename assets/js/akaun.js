/* =========================================================
   Econ Tutor · butang akaun (email + log keluar) dalam bar atas
   Hanya muncul apabila laman dibuka melalui Vercel dengan sesi sah.
   ========================================================= */
(function () {
  "use strict";

  var btnTema = document.getElementById("btn-tema");
  if (!btnTema || !window.fetch) return;

  // Butang "Hubungi cikgu" dalam menu akaun: buka WhatsApp cikgu dengan mesej siap.
  // Nombor sama dengan WHATSAPP_CIKGU dalam masuk.js (format antarabangsa, digit sahaja); tukar kedua-duanya bersama.
  var WHATSAPP_CIKGU = "601160757145";
  var MESEJ_HUBUNGI = "Salam cikgu, saya ada soalan tentang Nota Ekonomi Interaktif.";

  function pautanWhatsApp(nama, email) {
    var teks = MESEJ_HUBUNGI + "\nNama: " + nama + "\nEmail: " + email;
    return "https://wa.me/" + WHATSAPP_CIKGU + "?text=" + encodeURIComponent(teks);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  fetch("/api/sesi", { credentials: "same-origin", cache: "no-store" })
    .then(function (res) {
      return res.ok ? res.json() : null;
    })
    .then(function (sesi) {
      if (sesi && sesi.email) bina(sesi);
    })
    .catch(function () {});

  function bina(sesi) {
    var nama = sesi.nama || sesi.email.split("@")[0];
    var w = document.createElement("div");
    w.className = "akaun";
    w.innerHTML =
      '<button type="button" class="akaun-btn" aria-haspopup="true" aria-expanded="false" aria-label="Akaun: ' + esc(sesi.email) + '" title="' + esc(sesi.email) + '">' +
      esc(nama.charAt(0)) +
      "</button>" +
      '<div class="akaun-menu kaca" hidden>' +
      "<p><b>" + esc(nama) + "</b>" + esc(sesi.email) + "</p>" +
      '<a class="btn btn-wa" href="' + esc(pautanWhatsApp(nama, sesi.email)) + '" target="_blank" rel="noopener">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.3 20.7l4.4-1.1A8.8 8.8 0 1 0 12 3.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.2 8.6c.3 2.9 2.4 5 5.3 5.6l1.1-1.2-1.8-.9-.8.8c-1-.4-1.8-1.2-2.2-2.2l.8-.8-.9-1.8z" fill="currentColor"/></svg>' +
      "Hubungi cikgu</a>" +
      '<button type="button" class="btn btn-kecil" data-keluar>Log keluar</button>' +
      "</div>";
    btnTema.insertAdjacentElement("afterend", w);

    var btn = w.querySelector(".akaun-btn");
    var menu = w.querySelector(".akaun-menu");
    function tutup() {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
      btn.setAttribute("aria-expanded", String(!menu.hidden));
    });
    document.addEventListener("click", function (e) {
      if (!w.contains(e.target)) tutup();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) {
        tutup();
        btn.focus();
      }
    });
    w.querySelector("[data-keluar]").addEventListener("click", function () {
      this.disabled = true;
      fetch("/api/sesi", { method: "DELETE", credentials: "same-origin" })
        .catch(function () {})
        .then(function () {
          location.href = "/masuk.html?keluar=1";
        });
    });
  }
})();
