(function () {
  "use strict";
  // Raut muka ikut konflik, dialog dan keputusan pasukan.
  function raut(s) {
    if (!s) { return { mira: "ceria", hakim: "ceria" }; }
    var n = s.node, b = s.baris, muka = { mira: "ceria", hakim: "ceria" };
    if (n === "janji") {
      if (b === 1 || b === 2) { muka.hakim = "fokus"; }
      if (b === 3 || b === 4) { muka = { mira: "risau", hakim: "fokus" }; }
      if (b >= 5) { muka = { mira: "fokus", hakim: "fokus" }; }
    } else if (n === "sepakat") {
      if (s.pelan === "air") { muka.mira = b === 0 || b === 3 ? "risau" : "fokus"; }
      else if (s.pelan === "sandwic") { muka.hakim = "fokus"; }
      else if (b < 4) { muka = { mira: "fokus", hakim: "fokus" }; }
    } else if (n === "tenaga" || n === "siap-alat" || n === "siap-buruh" || n === "kuantiti" || n === "stok") {
      muka = { mira: "fokus", hakim: "fokus" };
      if (n === "stok" && b >= 2) { muka = { mira:"ceria",hakim:"ceria" }; }
    } else if (n === "langit" || n === "luar" || n === "amanah") {
      muka = { mira: "risau", hakim: "risau" };
    } else if (n === "dalam" || n === "dibantu") {
      muka = { mira: "ceria", hakim: "fokus" };
    } else if (n === "pelanggan") {
      muka = { mira: "risau", hakim: "fokus" };
    } else if (n === "agihan") {
      muka = { mira: s.agihan === "biasa" ? "fokus" : "ceria", hakim: "fokus" };
    } else if (n === "jualan") {
      muka = !s.jujur && b >= 1 ? {mira:"risau",hakim:"risau"} : {mira:"ceria",hakim:"fokus"};
    } else if (n === "penutup" || n === "tamat") {
      muka = !s.jujur ? { mira: "risau", hakim: "risau" } : s.wang >= 120 ? { mira: "ceria", hakim: "ceria" } : { mira: "fokus", hakim: "fokus" };
      if (n === "penutup" && s.jujur && b >= 4) { muka = { mira: "ceria", hakim: "ceria" }; }
    }
    return muka;
  }
  function fail(nama, emosi) { return "assets/" + nama + (emosi === "ceria" ? "-sprite" : "-" + emosi) + ".png"; }
  window.KARNIVAL_EMOSI = { raut: raut, fail: fail };
})();
