/* =========================================================
   Latihan graf (Semak Jawapan): pasaran, Tingkatan 4 Bab 2.
   Setiap soalan ialah data; enjin semakan dalam graf-senario.js.
   graf: "d" = keluk permintaan, "s" = keluk penawaran, "ds" = pasaran.
   jawapan.tindakan: "anjak" (peralihan keluk, arah kanan/kiri) atau
   "gerak" (pergerakan di sepanjang keluk, arah atas/bawah = harga naik/turun).
   Maklum balas yang tidak diberi menggunakan ayat lalai enjin.
   ========================================================= */
(function () {
  "use strict";
  var S = window.EKO.senario;

  S.daftar({
    id: "d-pendapatan-normal",
    bab: "t4-b2",
    tajuk: "Pendapatan meningkat (barang normal)",
    soalan: "Pendapatan pengguna meningkat. Telefon pintar ialah barang normal. Apakah kesannya terhadap permintaan telefon pintar? Tunjukkan pada graf.",
    petunjuk: "Adakah pendapatan pengguna faktor harga atau faktor bukan harga?",
    graf: "d",
    paksi: { x: "Kuantiti telefon pintar (unit)", y: "Harga (RM)" },
    jawapan: { tindakan: "anjak", keluk: "permintaan", arah: "kanan" },
    maklumBalas: {
      betul: "Pendapatan ialah faktor bukan harga. Bagi barang normal, peningkatan pendapatan meningkatkan kuasa beli pengguna, maka permintaan bertambah dan keluk permintaan beralih ke kanan (D₀ → D₁).",
      salahGerak: "Perubahan pendapatan ialah faktor bukan harga. Oleh itu, keseluruhan keluk permintaan perlu beralih.",
      salahArah: "Bagi barang normal, peningkatan pendapatan meningkatkan permintaan."
    }
  });

  S.daftar({
    id: "d-barang-pengganti",
    bab: "t4-b2",
    tajuk: "Harga barang pengganti naik",
    soalan: "Harga kopi meningkat. Kopi dan teh ialah barang pengganti. Apakah kesannya terhadap permintaan teh? Tunjukkan pada graf permintaan teh.",
    petunjuk: "Apabila kopi menjadi lebih mahal, apakah yang dilakukan oleh pengguna?",
    graf: "d",
    paksi: { x: "Kuantiti teh (kg)", y: "Harga teh (RM)" },
    jawapan: { tindakan: "anjak", keluk: "permintaan", arah: "kanan" },
    maklumBalas: {
      betul: "Apabila harga kopi naik, pengguna beralih kepada teh sebagai barang pengganti. Permintaan teh bertambah dan keluk permintaan teh beralih ke kanan (D₀ → D₁).",
      salahGerak: "Harga kopi bukan harga teh itu sendiri. Bagi teh, ia ialah faktor bukan harga, jadi keseluruhan keluk permintaan teh perlu beralih.",
      salahArah: "Barang pengganti mempunyai hubungan positif: harga kopi naik, permintaan teh bertambah."
    }
  });

  S.daftar({
    id: "d-harga-sendiri",
    bab: "t4-b2",
    tajuk: "Harga barang itu sendiri turun",
    soalan: "Harga durian turun daripada RM6 kepada RM4 sekilogram, ceteris paribus. Tunjukkan perubahan pada graf permintaan durian.",
    petunjuk: "Adakah yang berubah ialah harga durian itu sendiri?",
    graf: "d",
    paksi: { x: "Kuantiti durian (kg)", y: "Harga (RM)" },
    jawapan: { tindakan: "gerak", keluk: "permintaan", arah: "bawah" },
    maklumBalas: {
      betul: "Perubahan harga barang itu sendiri menyebabkan pergerakan ke bawah di sepanjang keluk permintaan yang sama. Kuantiti diminta bertambah: pengembangan permintaan.",
      salahArah: "Harga durian turun, jadi titik perlu bergerak ke bawah di sepanjang keluk permintaan."
    }
  });

  S.daftar({
    id: "s-kos-pengeluaran",
    bab: "t4-b2",
    tajuk: "Harga faktor pengeluaran naik",
    soalan: "Harga baja meningkat. Apakah kesannya terhadap penawaran sayur-sayuran? Tunjukkan pada graf.",
    petunjuk: "Baja ialah input pengeluaran. Apakah yang berlaku kepada kos pengeluaran?",
    graf: "s",
    paksi: { x: "Kuantiti sayur-sayuran (kg)", y: "Harga (RM)" },
    jawapan: { tindakan: "anjak", keluk: "penawaran", arah: "kiri" },
    maklumBalas: {
      betul: "Baja ialah faktor pengeluaran. Harga faktor pengeluaran yang naik meningkatkan kos pengeluaran, maka penawaran berkurang dan keluk penawaran beralih ke kiri (S₀ → S₁).",
      salahGerak: "Harga baja ialah faktor bukan harga bagi sayur-sayuran. Oleh itu, keseluruhan keluk penawaran perlu beralih.",
      salahArah: "Kos pengeluaran yang meningkat mengurangkan penawaran."
    }
  });

  S.daftar({
    id: "s-harga-sendiri",
    bab: "t4-b2",
    tajuk: "Harga barang itu sendiri naik",
    soalan: "Harga minyak sawit naik, ceteris paribus. Tunjukkan perubahan pada graf penawaran minyak sawit.",
    petunjuk: "Adakah yang berubah ialah harga minyak sawit itu sendiri?",
    graf: "s",
    paksi: { x: "Kuantiti minyak sawit (tan)", y: "Harga (RM)" },
    jawapan: { tindakan: "gerak", keluk: "penawaran", arah: "atas" },
    maklumBalas: {
      betul: "Harga minyak sawit itu sendiri berubah, jadi titik bergerak ke atas di sepanjang keluk penawaran yang sama. Kuantiti ditawarkan bertambah: pengembangan penawaran.",
      salahArah: "Harga minyak sawit naik, jadi titik perlu bergerak ke atas di sepanjang keluk penawaran."
    }
  });

  S.daftar({
    id: "ds-teknologi",
    bab: "t4-b2",
    tajuk: "Kemajuan teknologi (pasaran)",
    soalan: "Berlaku kemajuan tingkat teknologi dalam pengeluaran telefon pintar. Tunjukkan kesannya terhadap pasaran telefon pintar.",
    petunjuk: "Teknologi mempengaruhi pembeli atau pengeluar?",
    graf: "ds",
    paksi: { x: "Kuantiti telefon pintar (unit)", y: "Harga (RM)" },
    jawapan: { tindakan: "anjak", keluk: "penawaran", arah: "kanan" },
    maklumBalas: {
      betul: "Kemajuan teknologi mengurangkan kos dan meningkatkan daya pengeluaran, maka penawaran bertambah (S₀ → S₁). Pada harga asal berlaku lebihan penawaran, jadi harga keseimbangan turun dan kuantiti keseimbangan bertambah (E₀ → E₁).",
      salahKeluk: "Teknologi mempengaruhi pengeluar, iaitu keluk penawaran, bukan keluk permintaan.",
      salahArah: "Kemajuan teknologi meningkatkan penawaran."
    }
  });

  S.daftar({
    id: "ds-barang-penggenap",
    bab: "t4-b2",
    tajuk: "Harga barang penggenap naik (pasaran)",
    soalan: "Harga petrol meningkat. Kereta dan petrol ialah barang penggenap. Tunjukkan kesannya terhadap pasaran kereta.",
    petunjuk: "Barang penggenap digunakan bersama-sama.",
    graf: "ds",
    paksi: { x: "Kuantiti kereta (unit)", y: "Harga (RM)" },
    jawapan: { tindakan: "anjak", keluk: "permintaan", arah: "kiri" },
    maklumBalas: {
      betul: "Kereta dan petrol digunakan bersama. Harga petrol naik, maka permintaan kereta berkurang dan keluk permintaan beralih ke kiri (D₀ → D₁). Pada harga asal berlaku lebihan penawaran, jadi harga dan kuantiti keseimbangan kereta turun (E₀ → E₁).",
      salahKeluk: "Harga petrol mempengaruhi pembeli kereta, iaitu keluk permintaan.",
      salahArah: "Barang penggenap mempunyai hubungan negatif: harga petrol naik, permintaan kereta berkurang."
    }
  });

  S.daftar({
    id: "ds-dua-keluk",
    bab: "t4-b2",
    tajuk: "Permintaan dan penawaran berubah serentak",
    soalan:
      "Pendapatan pengguna meningkat (barang normal) dan pada masa yang sama berlaku kemajuan teknologi dalam pengeluaran barang itu. Tunjukkan kesannya terhadap pasaran.",
    petunjuk: "Setiap faktor mempengaruhi satu keluk. Ada dua faktor.",
    graf: "ds",
    jawapan: [
      { tindakan: "anjak", keluk: "permintaan", arah: "kanan" },
      { tindakan: "anjak", keluk: "penawaran", arah: "kanan" }
    ],
    maklumBalas: {
      betul: "Permintaan bertambah (D₀ → D₁) dan penawaran bertambah (S₀ → S₁). Kuantiti keseimbangan pasti bertambah, manakala kesan terhadap harga keseimbangan bergantung pada magnitud peralihan kedua-dua keluk.",
      belumLengkap: "Hampir betul. Situasi ini mempengaruhi kedua-dua keluk: pendapatan mempengaruhi permintaan, teknologi mempengaruhi penawaran.",
      salahArah: "Kedua-dua faktor meningkatkan permintaan dan penawaran."
    }
  });
})();
