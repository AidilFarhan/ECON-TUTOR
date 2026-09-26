/* =========================================================
   Econ Tutor · butang akaun (email + log keluar) dalam bar atas
   Hanya muncul apabila laman dibuka melalui Vercel dengan sesi sah.
   ========================================================= */
(function () {
  "use strict";

  var btnTema = document.getElementById("btn-tema");
  if (!btnTema || !window.fetch) return;

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
