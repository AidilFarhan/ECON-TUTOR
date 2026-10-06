(function () {
  "use strict";
  function ay(nama, teks) { return { nama: nama, teks: teks }; }
  function p(teks, id, lanjut) { return { teks: teks, id: id, lanjut: lanjut }; }
  function nombor(n) { return "RM" + n.toFixed(2); }
  function awal() { return { versi: 1, node: "janji", baris: 0, pelan: "", teknik: "", kapasiti: 0, air: 0, sandwic: 0, wang: 100, kos: 0, hasil: 0, percaya: 0, tempat: "", agihan: "", jujur: true, jualAir: 0, jualSandwic: 0, bantuanAir: 0, bantuanSandwic: 0, sejarah: [] }; }
  function belanja(s, jumlah) { s.wang -= jumlah; s.kos += jumlah; }
  function kombinasi(s, jenis) {
    if (jenis === "air") { return [s.kapasiti, 0]; }
    if (jenis === "sandwic") { return [0, s.kapasiti / 2]; }
    return [s.kapasiti / 2, s.kapasiti / 4];
  }
  function keluarkan(s, jenis) { var q = kombinasi(s, jenis); s.air = q[0]; s.sandwic = q[1]; belanja(s, s.air + s.sandwic * 2); s.keluaran = jenis; }
  function jual(s) {
    var air = s.air, sandwic = s.sandwic, dalam = s.tempat !== "luar", hargaAir = 3, hargaSandwic = 4;
    s.bantuanAir = 0; s.bantuanSandwic = 0;
    if (s.agihan === "kongsi") { s.bantuanAir = Math.min(4, air); s.bantuanSandwic = Math.min(4, sandwic); }
    air -= s.bantuanAir; sandwic -= s.bantuanSandwic;
    var ka = dalam ? .8 : .35, ks = dalam ? .9 : .55;
    if (s.agihan === "murid") { hargaAir = 2; hargaSandwic = 3; ka = dalam ? .95 : .55; ks = dalam ? 1 : .75; }
    if (!s.jujur) { ka *= .6; ks *= .6; }
    s.jualAir = Math.min(air, Math.floor(s.air * ka)); s.jualSandwic = Math.min(sandwic, Math.floor(s.sandwic * ks));
    s.hasil = s.jualAir * hargaAir + s.jualSandwic * hargaSandwic; s.wang += s.hasil;
  }
  var adegan = {
    janji: { seni: "kelas", lokasi: "Kelas 4 Bestari · 3:10 petang", baris: function () { return [
      ay("Mira", "OK Hakim, berapa bajet kita untuk booth kita esok?"),
      ay("Hakim", "RM100. Aku dah semak duit kelas tadi."),
      ay("Mira", "Okay! Aku dah sketch ni. Kita jual sandwich dengan air sejuk, pastu letak banner besar dekat depan."),
      ay("Hakim", "Aku kira semua yang kau senaraikan tu… RM150. Lebih RM50 daripada bajet kita."),
      ay("Mira", "Alamak. Banner kita lukis sendiri je lah. Tapi sandwich dengan air tu, aku nak buat juga."),
      ay("Hakim", "Kena tengok bahan dan masa juga. Kita nak kumpul duit beli buku kelas, kan? Target bawa balik RM120 lepas semua belanja."),
      ay("Mira", "Haah. Kalau buat semua sampai duit tak cukup, susah pula nanti."),
      ay("Hakim", "Aku cadang fokus air dulu. Lebih senang kita urus."),
      ay("Mira", "Aku rasa sandwich pun boleh laku. Kau rasa macam mana? Kita pilih satu menu, atau buat sikit dua-dua?")
    ]; }, pilihan: function () { return [p("Fokus air. Kita buat satu menu dulu.", "pelan-air", "sepakat"), p("Pilih sandwich. Kita fokus makanan.", "pelan-sandwic", "sepakat"), p("Buat sikit dua-dua. Kita bahagi sumber.", "pelan-bincang", "sepakat")]; } },
    sepakat: { seni: "kelas", lokasi: "Kelas 4 Bestari · 3:20 petang", baris: function (s) {
      if (s.pelan === "air") { return [ay("Kamu", "Air dulu. Idea sandwich kita simpan untuk karnival lain."), ay("Mira", "Sayang juga… tapi okay. Aku boleh buat label cawan. Biar menu sikit, booth tetap lawa."), ay("Hakim", "Deal. Aku senaraikan bahan air; Mira urus label."), ay("Pencerita", "Mira melukis cawan di tepi lakarannya. Hakim tarik buku kira-kira ke tengah meja.")]; }
      if (s.pelan === "sandwic") { return [ay("Kamu", "Kita pilih sandwich. Air kita lepaskan dulu supaya tak kelam-kabut."), ay("Mira", "Yes! Aku boleh tunjuk cara bungkus. Hakim, kau tolong kira bahan?"), ay("Hakim", "Boleh. Aku padam senarai air dulu. Lepas ni kita semak berapa banyak mampu buat."), ay("Pencerita", "Mira membulatkan lukisan sandwich. Kali ini, mereka merancang menu yang sama.")]; }
      return [ay("Kamu", "Kita buat sikit kedua-duanya. Tapi jumlah kena kecil supaya sempat siap."), ay("Mira", "Okay! Ada makanan untuk yang lapar, ada air untuk yang haus."), ay("Hakim", "Boleh, asalkan kita bahagi kerja. Aku kira kapasiti dulu sebelum janji jumlah."), ay("Pencerita", "Mira menolak lakaran ke tengah. Tiga orang, dua menu—sekarang mereka perlukan cara bekerja.")];
    }, lanjut: "tenaga" },
    tenaga: { seni: "kelas", lokasi: "Kelas 4 Bestari · 3:30 petang", baris: function () { return [
      ay("Hakim", "Tapak booth dah ada. Jug dan papan pemotong sekolah boleh pinjam. Tapi esok kita cuma ada satu sesi untuk prepare."),
      ay("Mira", "Kalau sewa set peralatan RM25, kerja lebih laju. Kalau upah kawan bantu RM15, ada orang boleh urus bahan dan bekas."),
      ay("Hakim", "Dengan alat, kita mampu buat 60 unit kerja. Dengan pembantu, 40 unit. Aku tulis dua pilihan dekat sini."),
      ay("Mira", "Alat beri kapasiti lebih besar, tapi baki duit kurang. Pembantu lebih murah. Mana satu kita tempah?")
    ]; }, pilihan: function () { return [p("Sewa peralatan RM25 · 60 unit kerja.", "alat", "siap-alat"), p("Upah pembantu RM15 · 40 unit kerja.", "pembantu", "siap-buruh")]; } },
    "siap-alat": { seni: "persediaan", lokasi: "Bilik persediaan · Esok, 7:30 pagi", peralihan: "Esok pagi. Pelan semalam mula jadi kerja sebenar.", baris: function (s) { return [
      ay("Pencerita", "Set peralatan yang kamu tempah sudah sampai. Mira susun bahan untuk contoh sandwich; Hakim semak senarai."),
      ay("Mira", "Okay, semua ready. Aku buat satu contoh dulu supaya kita tahu langkahnya."),
      ay("Hakim", "Sewa RM25 dah bayar. Baki " + nombor(s.wang) + ". Dengan set ni, sesi kita cukup untuk 60 unit kerja.")
    ]; }, lanjut: "kuantiti" },
    "siap-buruh": { seni: "persediaan", lokasi: "Bilik persediaan · Esok, 7:30 pagi", peralihan: "Esok pagi. Pasukan berkumpul untuk mula menyediakan bahan.", baris: function (s) { return [
      ay("Pencerita", "Kawan yang kamu upah mengambil tugas bahan dan bekas di meja sebelah. Mira dan Hakim menyiapkan contoh di meja utama."),
      ay("Mira", "Best, ada orang bantu. Aku tunjuk contoh; lepas tu kita bahagi tugas ikut jumlah yang dipilih."),
      ay("Hakim", "Upah RM15 dah bayar. Baki " + nombor(s.wang) + ". Sesi kita cukup untuk 40 unit kerja.")
    ]; }, lanjut: "kuantiti" },
    kuantiti: { seni: "persediaan", lokasi: "Bilik persediaan · 7:45 pagi", baris: function (s) { return [
      ay("Pencerita", "Mira letak salad atas roti contoh. Hakim tandakan dua lajur: air dan sandwich."),
      ay("Hakim", "Satu air guna 1 unit kerja dan bahan RM1. Satu sandwich guna 2 unit kerja dan bahan RM2."),
      ay("Mira", "Jadi kapasiti " + s.kapasiti + " tu cukup untuk " + s.kapasiti + " air, atau " + s.kapasiti / 2 + " sandwich. Kalau tambah satu sandwich, kena kurangkan dua air."),
      ay("Hakim", "Kalau bahagi kerja sama rata: " + s.kapasiti / 2 + " air dan " + s.kapasiti / 4 + " sandwich. Semua pilihan ni guna bahan bernilai " + nombor(s.kapasiti) + "."),
      ay("Mira", "Semalam kita pilih " + labelPelan(s.pelan) + ". Bahan jualan belum dibeli—nak teruskan pelan tu atau ubah jumlah sekarang?")
    ]; }, pilihan: function (s) { var q = kombinasi(s, s.pelan), lain = s.pelan === "air" ? "sandwic" : "air"; var a = [p("Teruskan pelan: " + labelKuantiti(q) + ".", "ikut", "stok")]; a.push(s.pelan !== "campur" ? p("Bahagi kerja: " + labelKuantiti(kombinasi(s, "campur")) + ".", "campur", "stok") : p("Fokus sandwich: " + labelKuantiti(kombinasi(s, "sandwic")) + ".", "sandwic", "stok")); a.push(p("Fokus " + (lain === "air" ? "air" : "sandwich") + ": " + labelKuantiti(kombinasi(s, lain)) + ".", lain, "stok")); return a; } },
    stok: { seni: "persediaan", lokasi: "Bilik persediaan · 8:30 pagi", baris: function (s) { return [
      ay("Mira", s.keluaran === s.pelan ? "Okay, ikut pelan. Aku susun kerja; kau tolong beli bahan ikut senarai ni." : "Okay, kita ubah sebelum beli bahan. Aku tukar susunan kerja dulu supaya semua orang ikut jumlah baru."),
      ay("Pencerita", "Selepas bahan dibeli, mereka membahagi tugas. Sedikit demi sedikit, bekas yang kosong mula terisi."),
      ay("Hakim", "Siap: " + s.air + " air dan " + s.sandwic + " sandwich. Bahan " + nombor(s.air + 2 * s.sandwic) + "; baki " + nombor(s.wang) + ". Semua dah bertutup."),
      ay("Pencerita", "Mereka angkat bekas ke booth. Baru saja menu hendak digantung, titisan hujan jatuh atas kanopi.")
    ]; }, lanjut: "langit" },
    langit: { seni: "hujan", lokasi: "Tapak karnival · 9:00 pagi", peralihan: "Dari bilik persediaan ke tapak karnival. Hujan semakin lebat.", baris: function (s) { return [
      ay("Pencerita", "Hakim rapatkan bekas makanan ke bawah bumbung. Mira memandang murid yang berlari menuju ke dewan."),
      ay("Mira", "Weh… laluan kita makin kosong. Belum buka jualan pun hujan dah turun."),
      ay("Hakim", "Tunai tinggal " + nombor(s.wang) + ". Penganjur kata boleh pindah ke ruang berbumbung tepi dewan, tapi kena bayar RM10."),
      ay("Mira", "Ada ruang bantuan percuma juga, cuma kena tunggu giliran. Kalau kekal sini, kita jimat duit tapi pembeli kurang."),
      ay("Hakim", "Bekas dah selamat. Sekarang kita pilih tempat—pindah terus, kekal sini, atau tunggu bantuan?")
    ]; }, pilihan: function () { return [p("Bayar RM10. Pindah sekarang.", "pindah", "dalam"), p("Kekal bawah kanopi. Jimat tunai.", "kekal", "luar"), p("Tunggu ruang bantuan percuma.", "bantuan", "dibantu")]; } },
    dalam: { seni: "hujan", lokasi: "Tepi dewan · 9:15 pagi", baris: function (s) { return [ay("Pencerita", "Kamu bayar RM10. Mereka mengangkat stok ke ruang berbumbung tepi dewan; hujan masih kedengaran di luar."), ay("Mira", "Dekat sini orang lalu! Kau susun bekas, aku gantung menu."), ay("Hakim", "Baki " + nombor(s.wang) + ". Kita dah belanja untuk dapat tempat ni. Jom sediakan jualan.")]; }, lanjut: "pelanggan" },
    luar: { seni: "hujan", lokasi: "Tapak karnival · 9:15 pagi", baris: function (s) { return [ay("Pencerita", "Mereka kekal di bawah kanopi. Beberapa murid lalu cepat-cepat tanpa berhenti."), ay("Mira", "Tunai " + nombor(s.wang) + " tu kita simpan. Tapi… sunyi juga sini."), ay("Hakim", "Jom susun menu menghadap laluan. Kita cuba tarik orang yang masih lalu.")]; }, lanjut: "pelanggan" },
    dibantu: { seni: "hujan", lokasi: "Ruang bantuan · 9:35 pagi", baris: function () { return [ay("Pencerita", "Selepas menunggu, penganjur memanggil mereka. Pasukan kamu dapat ruang berbumbung tanpa bayaran."), ay("Mira", "Akhirnya! Cepat, kita pindahkan bekas. Dah lambat sikit ni."), ay("Hakim", "Duit masih ada, tapi masa jualan makin pendek. Kita susun menu dulu.")]; }, lanjut: "pelanggan" },
    pelanggan: { seni: "hujan", lokasi: "Booth kelas · 10:00 pagi", baris: function (s) { var barang = s.air ? "air" : "sandwich", harga = s.air ? 3 : 4, poket = s.air ? 2 : 3; return [
      ay("Pencerita", "Sebaik menu dipasang, seorang murid berhenti. Dia melihat harga " + barang + " RM" + harga + ", kemudian mengira duit di tangannya."),
      ay("Murid", "Saya ada RM" + poket + " je. Tak apa… saya tengok dulu."),
      ay("Mira", "Sekejap, jangan pergi dulu. Guys, boleh kita bincang harga sebelum mula jual?"),
      ay("Hakim", "Harga biasa bantu kumpul dana. Kita boleh turunkan harga, atau asingkan sedikit stok untuk bantuan—tapi duit yang masuk akan berubah."),
      ay("Mira", "Aku nak dia boleh beli juga. Tapi buku kelas pun kita kena fikir. Kita buat macam mana?")
    ]; }, pilihan: function () { return [p("Kekalkan harga. Kumpul dana buku.", "biasa", "agihan"), p("Harga murid: air RM2, sandwich RM3.", "murid", "agihan"), p("Asingkan hingga 4 unit setiap produk untuk bantuan.", "kongsi", "agihan")]; } },
    agihan: { seni: "hujan", lokasi: "Booth kelas · 10:10 pagi", baris: function (s) { return [
      ay("Mira", s.agihan === "biasa" ? "Okay, kita kekalkan harga. Aku jelaskan elok-elok—duit ni untuk buku kelas." : s.agihan === "murid" ? "Aku tukar menu sekarang. Adik, " + (s.air ? "air RM2" : "sandwich RM3") + " lepas ni. Tunggu kejap, kita nak buka." : "Aku asingkan bekas bantuan dulu. Adik boleh ambil daripada bahagian ni bila kita buka."),
      ay("Hakim", s.agihan === "kongsi" ? "Aku tanda stok bantuan supaya tak tercampur dengan kiraan jualan." : "Aku tulis harga yang kita setuju. Nanti kutipan jangan campur dengan baki duit bahan."),
      ay("Pencerita", "Mira mengambil kad promosi yang disiapkan semalam. Hakim menahan tangannya sebelum kad itu digantung.")
    ]; }, lanjut: "amanah" },
    amanah: { seni: "hujan", lokasi: "Booth kelas · 10:20 pagi", baris: function () { return [
      ay("Hakim", "Eh, kad ni tulis setiap pembelian dapat hadiah. Hadiah kita cuma ada lima."),
      ay("Mira", "Alamak. Aku buat sebelum kira bajet. Kalau tukar jadi lima pembeli pertama, okay tak?"),
      ay("Hakim", "Okay. Tapi kalau biarkan ayat lama, orang akan harapkan hadiah yang kita tak ada."),
      ay("Mira", "Pen dah ada sini. Kita betulkan dulu, atau tetap gantung kad lama?")
    ]; }, pilihan: function () { return [p("Betulkan: hadiah untuk lima pembeli pertama.", "jujur", "jualan"), p("Gantung kad lama walaupun hadiah tak cukup.", "palsu", "jualan")]; } },
    jualan: { seni: "hujan", lokasi: "Booth kelas · Jualan bermula", baris: function (s) { return [
      ay("Pencerita", s.jujur ? "Mira membetulkan kad promosi. Hakim susun stok; kamu menjaga kutipan. Akhirnya, booth mereka dibuka." : "Kad lama digantung. Mira menyerahkan stok kepada pembeli pertama; kamu mula mengumpulkan bayaran."),
      ay("Mira", s.jujur ? "Hadiah untuk lima pembeli pertama ya. Terima kasih singgah booth kita!" : "Hakim… ada orang tanya hadiah lagi. Lima hadiah tu dah habis."),
      ay("Hakim", !s.jujur ? "Kita kena mengaku kad tu salah. Aku turunkan sekarang—tak boleh terus janji benda yang tak ada." : s.tempat === "luar" ? "Ada yang berhenti, tapi ramai terus menuju ke dewan. Kita teruskan dengan pelanggan yang datang." : s.tempat === "bantuan" ? "Orang dah mula singgah. Kita kena guna masa yang masih ada sebaik mungkin." : "Dekat laluan ni ramai juga singgah. Kau urus bayaran, aku semak bekas yang keluar."),
      ay("Pencerita", !s.jujur ? "Beberapa pelanggan berundur selepas mendengar penjelasan. Mereka meneruskan jualan dengan kad yang sudah diturunkan." : s.agihan === "murid" ? "Harga baharu membuat lebih ramai murid berhenti. Mira melayan pesanan sementara Hakim menanda setiap unit yang terjual." : s.agihan === "kongsi" ? "Sebahagian stok diagihkan sebagai bantuan. Stok jualan dan bantuan dicatat berasingan, satu demi satu." : "Bayaran dikumpulkan, pesanan diserahkan. Hakim menandakan jualan dalam buku yang sama sejak semalam."),
      ay("Pencerita", "Menjelang petang, hujan reda dan pengunjung mula pulang. Mira mengambil kotak kosong. Masa untuk kira baki dan kemas booth.")
    ]; }, lanjut: "penutup" },
    penutup: { seni: "senja", lokasi: "Tapak karnival · 4:00 petang", peralihan: "Karnival berakhir. Mereka mengemas sambil mengira kutipan.", baris: function (s) { return [
      ay("Pencerita", "Mira menyusun bekas berbaki dalam kotak. Hakim duduk di sebelahnya, membuka semula buku kira-kira."),
      ay("Hakim", "Hari ni terjual " + s.jualAir + " air dan " + s.jualSandwic + " sandwich. Kutipan " + nombor(s.hasil) + "."),
      ay("Mira", "Belanja semua sekali " + nombor(s.kos) + ". Jadi duit kelas yang kita bawa balik… " + nombor(s.wang) + "."),
      ay("Kamu", s.wang >= 120 ? "Cukup untuk target buku! Semalam kita cuma ada lakaran. Hari ni kita dah buat jadi." : "Belum cukup RM120. Kita bawa balik dulu apa yang ada, kemudian fikir cara cukupkan baki."),
      ay("Mira", s.jujur ? "Penat, tapi lega. Kita tepati apa yang kita janji dekat pelanggan." : "Pasal kad tadi… aku kena minta maaf. Lepas ni aku semak dulu sebelum janji apa-apa."),
      ay("Hakim", s.jujur ? "Aku simpan kiraan ni. Banyak yang kita boleh buat lebih baik untuk karnival seterusnya." : "Kita baiki sama-sama. Aku simpan kiraan ni supaya kita ingat apa yang jadi."),
      ay("Pencerita", "Mira melipat lakaran booth dan menyelitkannya ke dalam buku Hakim. Mereka mengangkat kotak terakhir bersama-sama.")
    ]; }, lanjut: "tamat" }
  };
  function labelPelan(j) { return j === "air" ? "fokus air" : j === "sandwic" ? "fokus sandwich" : "sedikit air dan sandwich"; }
  function labelKuantiti(q) { return q[0] + " air, " + q[1] + " sandwich"; }
  function tindakan(s, id) {
    if (id.indexOf("pelan-") === 0) { s.pelan = id === "pelan-air" ? "air" : id === "pelan-sandwic" ? "sandwic" : "campur"; s.percaya += id === "pelan-bincang" ? 2 : 1; }
    else if (id === "alat") { s.teknik = "modal"; s.kapasiti = 60; belanja(s, 25); }
    else if (id === "pembantu") { s.teknik = "buruh"; s.kapasiti = 40; belanja(s, 15); }
    else if (id === "ikut" || id === "air" || id === "sandwic" || id === "campur") { var j = id === "ikut" ? s.pelan : id; if (j !== s.pelan) { s.percaya--; } keluarkan(s, j); }
    else if (id === "pindah") { s.tempat = "dewan"; belanja(s, 10); }
    else if (id === "kekal") { s.tempat = "luar"; }
    else if (id === "bantuan") { s.tempat = "bantuan"; }
    else if (id === "biasa" || id === "murid" || id === "kongsi") { s.agihan = id; }
    else if (id === "jujur" || id === "palsu") { s.jujur = id === "jujur"; if (!s.jujur) { s.percaya -= 2; } jual(s); }
    if (s.tempat === "bantuan" && (id === "jujur" || id === "palsu")) {
      // Masa menunggu memendekkan tempoh jualan: kira semula 75% pembeli simulasi.
      s.wang -= s.hasil; s.jualAir = Math.floor(s.jualAir * .75); s.jualSandwic = Math.floor(s.jualSandwic * .75);
      s.hasil = s.jualAir * (s.agihan === "murid" ? 2 : 3) + s.jualSandwic * (s.agihan === "murid" ? 3 : 4); s.wang += s.hasil;
    }
  }
  function ending(s) { if (!s.jujur) { return { tajuk: "Janji yang perlu diperbaiki.", teks: "Kamu sudah nampak kesan promosi yang tidak benar: pelanggan berundur dan kepercayaan hilang. Dana sahaja tidak menceritakan semuanya. Ada peluang memilih dengan lebih jujur apabila bermain semula.", id: "amanah" }; } if (s.wang >= 120) { return { tajuk: "Janji kelas, tertunai.", teks: "Dana buku mencapai sasaran. Pasukan kamu mengurus sumber, membuat pilihan dan menerima pengorbanannya. Strategi lain boleh membawa perjalanan yang berbeza.", id: "target" }; } if (s.agihan !== "biasa") { return { tajuk: "Ada yang kita kongsi.", teks: "Sasaran dana belum dicapai, tetapi pilihan agihan membuka ruang untuk lebih ramai murid. Bincangkan apa yang diperoleh dan apa yang dilepaskan—kemudian cuba laluan lain.", id: "kongsi" }; } return { tajuk: "Belum cukup. Belum habis.", teks: "Dana belum mencapai sasaran. Pasukan kamu kini tahu bagaimana kapasiti, lokasi dan kuasa beli membentuk keputusan. Peluang belajar itu boleh dibawa ke percubaan seterusnya.", id: "belajar" }; }
  function kewangan(s) {
    var selesai = s.node === "penutup" || s.node === "tamat", hasil = selesai ? s.hasil : 0;
    var air = selesai ? s.air - s.jualAir - s.bantuanAir : s.air, sandwic = selesai ? s.sandwic - s.jualSandwic - s.bantuanSandwic : s.sandwic;
    var tunai = 100 - s.kos + hasil, stok = selesai ? 0 : air + 2 * sandwic, aset = tunai + stok;
    return {selesai:selesai,hasil:hasil,tunai:tunai,air:air,sandwic:sandwic,stok:stok,aset:aset,liabiliti:0,lebihan:aset-100,ekuiti:aset};
  }
  window.KARNIVAL = { adegan: adegan, awal: awal, tindakan: tindakan, ending: ending, rm: nombor, kombinasi: kombinasi, kewangan:kewangan };
})();
