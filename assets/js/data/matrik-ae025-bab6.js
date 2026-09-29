/* =========================================================
   Matrikulasi · AE025 Makroekonomi · Bab 6
   Belanjawan Negara, Dasar Fiskal dan Dasar Kewangan
   Sumber: slaid kuliah AE025 "6.1 Belanjawan Negara" (34 slaid),
           "6.2 Dasar Fiskal" (46) dan "6.3 Dasar Kewangan" (28)
   ========================================================= */
EKO.daftarBab({
  id: "m2-b6",
  peringkat: "matrik",
  tingkatan: 2,
  no: 6,
  tajuk: "Belanjawan Negara, Dasar Fiskal dan Dasar Kewangan",
  warna: "var(--bab-rm100)",
  ringkas:
    "Kerajaan menstabilkan ekonomi melalui belanjawan dan dasar fiskal, manakala bank pusat menggunakan dasar kewangan. Bab ini merangkumi jenis belanjawan, hasil dan perbelanjaan kerajaan persekutuan, hutang negara, penstabil automatik dan dasar fiskal budi bicara, menutup lompang inflasi dan deflasi, serta alat dasar kewangan kuantitatif dan kualitatif.",
  seksyen: [
    {
      no: "6.1",
      tajuk: "Belanjawan Negara Malaysia",
      soalan: [
        "Apakah maksud belanjawan lebihan, kurangan dan seimbang?",
        "Apakah sumber hasil dan jenis perbelanjaan kerajaan?",
        "Apakah jenis, sumber, kebaikan dan keburukan hutang negara?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Belanjawan</span><p>Rancangan anggaran hasil dan perbelanjaan kerajaan bagi satu tahun tertentu. Struktur: <b>hasil negara</b> (cukai langsung, cukai tak langsung, hasil bukan cukai) dan <b>perbelanjaan negara</b> (mengurus dan pembangunan).</p></div>
<div class="grid-3">
  <div class="kad-mini"><b>Belanjawan lebihan</b><p>Jumlah hasil melebihi jumlah perbelanjaan. Berlaku apabila kerajaan menaikkan cukai atau mengurangkan perbelanjaan.</p></div>
  <div class="kad-mini"><b>Belanjawan kurangan</b><p>Jumlah hasil kurang daripada jumlah perbelanjaan. Berlaku apabila kerajaan mengurangkan cukai atau menambah perbelanjaan.</p></div>
  <div class="kad-mini"><b>Belanjawan seimbang</b><p>Jumlah hasil sama dengan jumlah perbelanjaan.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 8–9 mentakrifkan jenis belanjawan menggunakan tanda "∆" (perubahan hasil berbanding perubahan perbelanjaan). Jenis belanjawan ditentukan oleh <b>jumlah</b> hasil berbanding <b>jumlah</b> perbelanjaan dalam tahun itu, seperti yang ditunjukkan oleh jadual slaid 10.</p></div>
<div class="jadual"><table><caption>Belanjawan Kerajaan Persekutuan (RM juta; % kepada KDNK)</caption>
<thead><tr><th>Butiran</th><th class="n">2002</th><th class="n">2003</th><th class="n">2004*</th><th class="n">2005**</th><th class="n">2006***</th></tr></thead>
<tbody>
<tr><td>Jumlah hasil</td><td class="n">83 515 (23.2%)</td><td class="n">92 608 (23.5%)</td><td class="n">99 397 (22.1%)</td><td class="n">105 856 (21.7%)</td><td class="n">115 561 (21.8%)</td></tr>
<tr><td>Perbelanjaan mengurus</td><td class="n">68 699</td><td class="n">75 224</td><td class="n">91 298</td><td class="n">98 244</td><td class="n">101 246</td></tr>
<tr><td>Perbelanjaan pembangunan</td><td class="n">35 975</td><td class="n">39 353</td><td class="n">28 864</td><td class="n">30 511</td><td class="n">33 502</td></tr>
<tr><td>Jumlah perbelanjaan</td><td class="n">104 674</td><td class="n">114 577</td><td class="n">120 162</td><td class="n">128 755</td><td class="n">134 748</td></tr>
<tr><td>Jenis belanjawan</td><td class="n">Kurangan</td><td class="n">Kurangan</td><td class="n">Kurangan</td><td class="n">Kurangan</td><td class="n">Kurangan</td></tr>
</tbody></table></div>
<p class="teks-lemah">* Anggaran sebenar; ** anggaran disemak; *** peruntukan bajet. Sumber: Perbendaharaan Malaysia (seperti dalam modul).</p>
<p>Selepas pulih daripada krisis 1998, hasil kerajaan meningkat, tetapi kerajaan mengekalkan belanjawan kurangan dari 2002 hingga 2006 untuk terus menggalakkan pertumbuhan.</p>
<figure data-graf="belanjawan-negara"></figure>
<div class="grid-2">
  <div class="kad-mini"><b>6.1.2 Hasil negara</b><p><b>Cukai langsung</b> (beban tidak boleh dipindahkan): cukai pendapatan persendirian, syarikat, petroleum, koperasi, cukai harta, aktiviti luar pesisir Labuan. <b>Cukai tak langsung</b> (beban boleh dipindahkan): duti eksport dan import, duti eksais, cukai jualan, cukai perkhidmatan. <b>Hasil bukan cukai</b>: lesen dan permit, sewa, royalti gas dan petroleum, denda, pendapatan pelaburan awam, cukai jalan. <b>Terimaan bukan hasil</b>: bayaran balik perbelanjaan dan sumbangan badan kerajaan.</p></div>
  <div class="kad-mini"><b>6.1.3 Perbelanjaan negara</b><p><b>Mengurus</b> (mengikut objek): emolumen, khidmat hutang, pemberian kepada negeri, pencen, bekalan dan perkhidmatan, subsidi, pemberian kepada badan berkanun. <b>Pembangunan</b> (mengikut sektor): keselamatan, perkhidmatan sosial, perkhidmatan ekonomi dan pentadbiran am; bersifat pelaburan jangka panjang.</p></div>
</div>
<h3><span class="no">6.1.4</span> Hutang negara</h3>
<p>Pinjaman kerajaan dari dalam dan luar negara untuk membiayai perbelanjaan pembangunan dan belanjawan kurangan.</p>
<div class="grid-2">
  <div class="kad-mini"><b>Jenis hutang</b><p><b>Hutang terapung</b>: hutang jangka pendek daripada orang ramai dan institusi kewangan melalui sekuriti jangka pendek. <b>Hutang berterusan</b>: hutang jangka sederhana dan panjang.</p></div>
  <div class="kad-mini"><b>Sumber hutang</b><p><b>Dalam negara</b>: sekuriti kerajaan (sumber utama, dijual kepada KWSP), bil perbendaharaan, terbitan pelaburan, pinjaman bank dan institusi kewangan. <b>Luar negara</b>: pinjaman pasaran (sumber utama), pinjaman projek, kredit pembekal, pinjaman kerajaan asing dan institusi seperti Bank Dunia, ADB dan IMF.</p></div>
</div>
<div class="jadual"><table><caption>Jumlah hutang Malaysia 2002–2005 (RM juta)</caption>
<thead><tr><th>Sumber</th><th class="n">2002</th><th class="n">2003</th><th class="n">2004</th><th class="n">2005*</th></tr></thead>
<tbody>
<tr><td>Dalam negara</td><td class="n">128 680</td><td class="n">151 483</td><td class="n">181 970</td><td class="n">206 970</td></tr>
<tr><td>Luar negara</td><td class="n">36 283</td><td class="n">37 284</td><td class="n">34 654</td><td class="n">31 506</td></tr>
<tr><td><b>Jumlah</b></td><td class="n">164 963</td><td class="n">188 767</td><td class="n">216 624</td><td class="n">238 476</td></tr>
</tbody></table></div>
<div class="jadual"><table><caption>6.1.5 Kebaikan dan keburukan hutang negara</caption>
<thead><tr><th></th><th>Hutang dalam negara</th><th>Hutang luar negara</th></tr></thead>
<tbody>
<tr><td><b>Kebaikan</b></td><td>Mudah diperoleh (sekuriti kepada KWSP); tiada bayaran faedah ke luar negara; tidak terjejas oleh kadar pertukaran</td><td>Aliran modal masuk membaiki akaun modal; sumber pinjaman lebih luas; tidak mengurangkan keupayaan bank mencipta kredit kepada swasta</td></tr>
<tr><td><b>Keburukan</b></td><td>Mungkin tidak cukup; mengurangkan kredit bank dan pelaburan swasta; memburukkan agihan pendapatan (orang kaya memberi pinjaman, rakyat membayar faedah melalui cukai)</td><td>Rizab asing mengalir keluar untuk bayaran balik dan faedah; hutang bertambah jika mata wang asing naik nilai; beban cukai rakyat lebih tinggi</td></tr>
</tbody></table></div>
`
    },
    {
      no: "6.2",
      tajuk: "Dasar Fiskal",
      soalan: [
        "Apakah beza penstabil automatik dengan dasar budi bicara?",
        "Bagaimanakah G dan T digunakan untuk menutup lompang inflasi dan deflasi?",
        "Mengapakah belanjawan seimbang masih menaikkan AE?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Dasar fiskal (dasar belanjawan)</span><p>Dasar mengubah corak perbelanjaan kerajaan dan sistem cukai untuk kestabilan ekonomi. Matlamat: menentang keadaan ekonomi melambung dan meleset supaya pertumbuhan berterusan tanpa inflasi atau deflasi, serta mengagihkan pendapatan dengan lebih saksama.</p></div>
<h3><span class="no">6.2.1</span> Penstabil automatik</h3>
<p>Alat yang mengecilkan ayunan kitaran perniagaan <b>secara automatik</b>, tanpa keputusan baharu kerajaan.</p>
<div class="grid-3">
  <div class="kad-mini"><b>Cukai progresif / berkadar</b><p>Semasa melambung, pendapatan naik maka kutipan cukai bertambah dengan sendirinya: kenaikan Yd, AD dan Y dikurangkan. Semasa meleset, kutipan cukai berkurang dengan sendirinya: kejatuhan Yd dan AD dikurangkan.</p></div>
  <div class="kad-mini"><b>Skim pengangguran</b><p>Semasa melambung, ramai bekerja dan mencarum ke tabung pengangguran. Semasa meleset, penganggur menerima elaun (bayaran pindahan), maka kejatuhan AD dikurangkan.</p></div>
  <div class="kad-mini"><b>Dasar harga minimum</b><p>Semasa meleset, harga tidak boleh jatuh di bawah harga minimum; pendapatan petani terjamin.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 9 menerangkan cukai progresif sebagai "kerajaan akan menaikkan cukai" semasa melambung. Sebagai penstabil automatik, <b>kadar cukai tidak diubah</b>; jumlah kutipan cukai naik atau turun dengan sendirinya mengikut pendapatan. Mengubah kadar cukai secara sengaja ialah dasar budi bicara.</p></div>

<h3>Dasar budi bicara</h3>
<p>Mengubah perbelanjaan kerajaan (G), cukai lump-sum (T), atau kedua-duanya serentak.</p>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Mengatasi inflasi (belanjawan lebihan)</span><p>Inflasi berlaku apabila pada Yf, AE &gt; AS atau I + G &gt; S + T. <b>Kurangkan G</b> (AE₀ beralih ke AE₁) atau <b>naikkan T</b> (Yd dan C berkurang; S + T beralih ke atas). Melalui proses pengganda, Ye turun ke Yf dan lompang inflasi tertutup.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Mengatasi deflasi (belanjawan kurangan)</span><p>Deflasi berlaku apabila pada Yf, AE &lt; AS atau I + G &lt; S + T. <b>Tambah G</b> atau <b>kurangkan T</b> (Yd dan C bertambah; S + T beralih ke bawah). Ye naik ke Yf dan lompang deflasi tertutup.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 31 menulis deflasi berlaku apabila "suntikan melebihi bocoran"; yang betul ialah suntikan <b>kurang daripada</b> bocoran (I + G &lt; S + T). Slaid 33 menulis titik keseimbangan beralih "dari E ke B"; berdasarkan rajah slaid 32 ia beralih ke <b>F</b>. Slaid 35 menulis fungsi bocoran beralih ke "S + T + ∆T"; bagi pengurangan cukai ia beralih ke <b>S + T − ∆T</b>.</p></div>
<h3>Belanjawan seimbang (G dan T naik sama banyak)</h3>
<div class="kotak contoh"><span class="kotak-label">Contoh: menutup lompang deflasi RM100 juta, MPC = 0.8</span><div class="kira">
  <div class="baris">ΔAE = ΔG − MPC × ΔT; oleh sebab ΔG = ΔT, ΔAE = (1 − 0.8)ΔG = 0.2ΔG</div>
  <div class="baris">0.2ΔG = RM100 juta → ΔG = RM500 juta</div>
  <div class="baris">T naik RM500 juta → C jatuh 0.8 × 500 = RM400 juta</div>
  <div class="baris jawapan">ΔAE bersih = 500 − 400 = RM100 juta: lompang deflasi tertutup</div></div></div>
<h3><span class="no">6.2.3</span> Pendekatan AD–AS</h3>
<div class="grid-2">
  <div class="kad-mini"><b>Inflasi tarikan permintaan</b><p>Kurangkan G atau tambah T lump-sum: AD₀ beralih ke kiri ke AD₁, harga umum turun dari P₀ ke P₁.</p></div>
  <div class="kad-mini"><b>Pengangguran kitaran</b><p>Tambah G atau kurangkan T: AD beralih ke kanan, pendapatan naik dari Y₀ ke Yf (harga naik dari P₀ ke P₁), pengangguran berkurang.</p></div>
</div>
<figure data-graf="ad-as" data-opt='{"mod":"dasar"}'></figure>
`
    },
    {
      no: "6.3",
      tajuk: "Dasar Kewangan",
      soalan: ["Apakah alat dasar kewangan kuantitatif dan kualitatif?", "Bagaimanakah setiap alat digunakan semasa inflasi dan deflasi?"],
      html: `
<div class="kotak def"><span class="kotak-label">Dasar kewangan (monetari)</span><p>Langkah bank pusat mempengaruhi kegiatan ekonomi dengan mengawal <b>bekalan wang</b> dan <b>kadar bunga</b>, untuk mencapai matlamat makroekonomi.</p></div>
<div class="aliran"><span>Inflasi: Ms dikurangkan</span><i>→</i><span>r naik</span><i>→</i><span>I turun</span><i>→</i><span>AE dan AD turun</span><i>→</i><span>Harga turun</span></div>
<div class="aliran"><span>Deflasi: Ms ditambah</span><i>→</i><span>r turun</span><i>→</i><span>I naik</span><i>→</i><span>AE dan AD naik</span><i>→</i><span>Y dan guna tenaga naik</span></div>
<h3>Dasar kewangan kuantitatif</h3>
<p>Mempengaruhi jumlah bekalan wang secara langsung.</p>
<div class="jadual"><table><caption>Alat kuantitatif</caption>
<thead><tr><th>Alat</th><th>Semasa inflasi</th><th>Semasa deflasi</th></tr></thead>
<tbody>
<tr><td><b>Operasi pasaran terbuka (OPT)</b>: jual beli sekuriti kerajaan dan bil perbendaharaan oleh bank pusat</td><td>Jual sekuriti: rizab bank berkurang, kredit berkurang</td><td>Beli sekuriti: rizab bank bertambah, kredit bertambah</td></tr>
<tr><td><b>Nisbah rizab berkanun</b>: peratus rizab wajib di bank pusat</td><td>Naikkan nisbah</td><td>Turunkan nisbah</td></tr>
<tr><td><b>Nisbah rizab mudah tunai</b></td><td>Naikkan peratus</td><td>Turunkan peratus</td></tr>
<tr><td><b>Pendanaan semula</b>: menukar tempoh matang hutang kerajaan</td><td>Panjangkan tempoh (contoh bon 5 → 10 tahun): kecairan berkurang</td><td>Pendekkan tempoh</td></tr>
<tr><td><b>Kadar bank (kadar diskaun)</b>: kadar bunga minimum bank pusat kepada bank perdagangan</td><td>Naikkan kadar bank</td><td>Turunkan kadar bank</td></tr>
</tbody></table></div>
<div class="kotak tip"><span class="kotak-label">Syarat OPT berkesan</span><p>Bank perdagangan tidak memiliki lebihan rizab tunai, dan wujud pasaran sekuriti kerajaan yang baik. Keperluan rizab mudah tunai pula kurang berkesan jika bank mempunyai rizab berlebihan atau mudah mendapat sumber kewangan lain.</p></div>
<h3>Dasar kewangan kualitatif</h3>
<p>Mempengaruhi bekalan wang secara tidak langsung, dengan mengawal <b>corak</b> kredit dan pelaburan.</p>
<div class="grid-2">
  <div class="kad-mini"><b>Kawalan kredit terpilih</b><p><b>Syarat margin</b>: mengawal spekulasi saham. Contoh margin 70%: pembeli menggunakan 70% wang sendiri dan meminjam 30%; dinaikkan semasa inflasi. <b>Kredit ansuran</b>: menetapkan bayaran pendahuluan dan tempoh bayaran balik. Contoh rumah RM100 000 dengan pendahuluan 10% memerlukan RM10 000; semasa inflasi pendahuluan dinaikkan dan tempoh dipendekkan. <b>Kawalan gadai janji</b>: mengetatkan atau melonggarkan syarat pinjaman harta tetap. <b>Arahan khas</b>: menyalurkan pinjaman kepada sektor produktif seperti perkilangan dan pertanian. <b>Dasar kadar bunga</b>: had maksimum kadar bunga bank perdagangan.</p></div>
  <div class="kad-mini"><b>Pujukan moral</b><p>Bank pusat berjumpa dan memujuk institusi kewangan menyokong dasar kerajaan secara sukarela: mengurangkan pinjaman untuk spekulasi semasa inflasi, dan menambah pinjaman kepada sektor tertentu semasa deflasi.</p></div>
</div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Inflasi tarikan permintaan</span><p>Kuantitatif: naikkan nisbah rizab, jual bon, naikkan kadar diskaun, pendanaan semula. Kualitatif: tinggikan margin dan pendahuluan, pujuk bank mengawal pinjaman. Bekalan wang berkurang, AD₀ beralih ke kiri, harga turun.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Pengangguran kitaran</span><p>Kuantitatif: turunkan nisbah rizab, beli bon, turunkan kadar diskaun. Kualitatif: rendahkan margin dan pendahuluan, pujuk bank menambah pinjaman. AD beralih ke kanan, Y naik ke Yf, pengangguran berkurang.</p></div>
</div>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 24 (dasar kewangan kualitatif bagi inflasi) mengandungi ayat "Penambahan cukai lump-sum sebesar ΔT, mengubah ADo ke AD1" yang terbawa daripada slaid dasar fiskal. Cukai bukan alat dasar kewangan; ayat itu diabaikan dalam nota ini.</p></div>
<div class="kotak tip"><span class="kotak-label">Kesimpulan</span><p>Dasar kuantitatif mengawal <b>jumlah</b> bekalan wang melalui kredit bank. Dasar kualitatif mengawal <b>bentuk dan corak</b> kredit dan pelaburan.</p></div>
`
    }
  ],
  kad: [
    { d: "Maksud <b>belanjawan kurangan</b>", b: "Jumlah hasil kerajaan kurang daripada jumlah perbelanjaan.", t: "6.1" },
    { d: "Jenis belanjawan Malaysia 2002–2006", b: "Kurangan setiap tahun, untuk menggalakkan pertumbuhan selepas krisis 1998.", t: "6.1" },
    { d: "Beza cukai <b>langsung</b> dan <b>tak langsung</b>", b: "Langsung: beban tidak boleh dipindahkan (cukai pendapatan). Tak langsung: beban boleh dipindahkan (duti import, cukai jualan).", t: "6.1.2" },
    { d: "Beza perbelanjaan <b>mengurus</b> dan <b>pembangunan</b>", b: "Mengurus: perbelanjaan semasa pentadbiran (emolumen, subsidi). Pembangunan: perbelanjaan modal projek sosioekonomi jangka panjang.", t: "6.1.3" },
    { d: "Sumber utama hutang dalam negara", b: "Sekuriti kerajaan (dijual kepada KWSP).", t: "6.1.4" },
    { d: "Satu keburukan hutang luar negara", b: "Contoh: rizab asing mengalir keluar untuk bayaran balik dan faedah; hutang bertambah jika mata wang asing naik nilai.", t: "6.1.5" },
    { d: "Maksud <b>penstabil automatik</b>", b: "Alat yang mengecilkan ayunan kitaran perniagaan secara automatik tanpa keputusan baharu kerajaan: cukai progresif, skim pengangguran, harga minimum.", t: "6.2.1" },
    { d: "Dasar budi bicara semasa <b>inflasi</b>", b: "Kurangkan G atau naikkan T (belanjawan lebihan).", t: "6.2" },
    { d: "Belanjawan seimbang: lompang deflasi RM100 juta, MPC 0.8", b: "ΔG = ΔT = RM500 juta; ΔAE = 500 − 0.8(500) = RM100 juta.", t: "6.2" },
    { d: "Lima alat dasar kewangan <b>kuantitatif</b>", b: "OPT, nisbah rizab berkanun, nisbah rizab mudah tunai, pendanaan semula, kadar bank.", t: "6.3" },
    { d: "OPT semasa <b>inflasi</b>", b: "Bank pusat menjual sekuriti kerajaan: rizab bank dan kredit berkurang, r naik, I dan AD turun.", t: "6.3" },
    { d: "Maksud <b>syarat margin</b> 70%", b: "Pembeli saham menggunakan 70% wang sendiri dan hanya boleh meminjam 30%.", t: "6.3" },
    { d: "Dua alat dasar kewangan <b>kualitatif</b>", b: "Kawalan kredit terpilih dan pujukan moral.", t: "6.3" },
    { d: "Beza dasar kewangan kuantitatif dan kualitatif", b: "Kuantitatif mengawal jumlah bekalan wang; kualitatif mengawal bentuk dan corak kredit.", t: "6.3" }
  ],
  kuiz: []
});
