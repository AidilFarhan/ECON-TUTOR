/* =========================================================
   Matrikulasi · AE025 Makroekonomi · Bab 8 · Pertumbuhan Ekonomi
   Sumber: slaid kuliah AE025 "8 Nota Pertumbuhan Ekonomi" (22 slaid)
   ========================================================= */
EKO.daftarBab({
  id: "m2-b8",
  peringkat: "matrik",
  tingkatan: 2,
  no: 8,
  tajuk: "Pertumbuhan Ekonomi",
  warna: "var(--bab-rm5)",
  ringkas:
    "Pertumbuhan ekonomi ialah pertambahan keluaran negara benar berbanding tahun sebelumnya. Bab ini merangkumi kadar pertumbuhan ekonomi, hubungannya dengan KKP, arah aliran pertumbuhan ekonomi Malaysia, serta faktor penggalak dan penghalang pertumbuhan.",
  seksyen: [
    {
      no: "8.1",
      tajuk: "Pertumbuhan Ekonomi dan Arah Alirannya",
      soalan: ["Bagaimanakah kadar pertumbuhan ekonomi dikira?", "Bagaimanakah KKP menunjukkan pertumbuhan ekonomi?", "Apakah arah aliran pertumbuhan ekonomi Malaysia?"],
      html: `
<div class="kotak def"><span class="kotak-label">8.1.1 Pertumbuhan ekonomi</span><p>Perubahan keluaran negara benar tahun semasa berbanding tahun sebelumnya, iaitu peningkatan kegiatan ekonomi yang menambah jumlah pengeluaran barang secara sebenar.</p></div>
<div class="grid-2">
  <div class="kotak rumus"><span class="kotak-label">Kadar pertumbuhan ekonomi</span><div class="rumus-baris">= (KN benar<sub>t</sub> − KN benar<sub>t−1</sub>) ÷ KN benar<sub>t−1</sub> × 100%</div><p>KN benar boleh menggunakan data KDNK atau KNK mengikut data yang diberi.</p></div>
  <div class="kotak contoh"><span class="kotak-label">Contoh</span><div class="kira"><div class="baris">KDNK benar 2000 = RM200 juta; 2001 = RM260 juta</div><div class="baris">(260 − 200) ÷ 200 × 100</div><div class="baris jawapan">= 30%</div></div></div>
</div>
<div class="kotak fokus"><span class="kotak-label">KKP dan pertumbuhan ekonomi</span><p>KKP AB ialah had keluaran maksimum pada guna tenaga penuh. Peralihan KKP dari AB ke CD menunjukkan pertumbuhan ekonomi akibat pertambahan sumber dan kemajuan teknologi: keluaran maksimum barang Y naik dari OA ke OC dan barang X dari OB ke OD.</p></div>
<figure data-graf="kkp-anjakan"></figure>
<h3><span class="no">8.1.2</span> Arah aliran pertumbuhan ekonomi Malaysia</h3>
<div class="jadual"><table><caption>Kadar pertumbuhan ekonomi Malaysia (%), sumber Laporan Ekonomi</caption>
<thead><tr><th>Tahun</th><th class="n">%</th><th>Tahun</th><th class="n">%</th><th>Tahun</th><th class="n">%</th></tr></thead>
<tbody>
<tr><td>1980</td><td class="n">7.4</td><td>1990</td><td class="n">9.7</td><td>2000</td><td class="n">7.5</td></tr>
<tr><td>1981</td><td class="n">6.9</td><td>1991</td><td class="n">8.7</td><td>2001</td><td class="n">2.0</td></tr>
<tr><td>1982</td><td class="n">5.9</td><td>1992</td><td class="n">7.8</td><td>2002</td><td class="n">4.4</td></tr>
<tr><td>1983</td><td class="n">6.3</td><td>1993</td><td class="n">8.3</td><td>2003</td><td class="n">5.4</td></tr>
<tr><td>1984</td><td class="n">7.8</td><td>1994</td><td class="n">9.2</td><td>2004</td><td class="n">7.1</td></tr>
<tr><td>1985</td><td class="n">−1.0</td><td>1995</td><td class="n">9.8</td><td>2005</td><td class="n">5.3</td></tr>
<tr><td>1986</td><td class="n">1.2</td><td>1996</td><td class="n">10.0</td><td>2006*</td><td class="n">5.5</td></tr>
<tr><td>1987</td><td class="n">5.4</td><td>1997</td><td class="n">7.3</td><td></td><td></td></tr>
<tr><td>1988</td><td class="n">8.9</td><td>1998</td><td class="n">−7.4</td><td></td><td></td></tr>
<tr><td>1989</td><td class="n">9.2</td><td>1999</td><td class="n">5.8</td><td></td><td></td></tr>
<tr><td><b>Purata 1980–89</b></td><td class="n"><b>5.8</b></td><td><b>Purata 1990–99</b></td><td class="n"><b>6.9</b></td><td><b>Purata 2000–05</b></td><td class="n"><b>5.3</b></td></tr>
</tbody></table></div>
<figure data-graf="carta-jadual" data-opt='{"tajuk":"Kadar pertumbuhan ekonomi Malaysia, 1980–2006","namaX":"Tahun","unitX":"","dpX":0,"dp":1,"nilaiX":[1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006],"xAwal":1998,"notaLalai":"","nota":{"1985":"Kemelesetan ekonomi dunia: pertumbuhan −1.0%.","1996":"Kemuncak dekad 1990-an: 10.0% hasil perkembangan sektor perindustrian.","1998":"Krisis mata wang Asia 1997/98: pertumbuhan jatuh ke −7.4%.","2001":"Pertumbuhan perlahan: 2.0%.","2006":"Anggaran: 5.5%."},"panel":[{"labelX":"Tahun","labelY":"Kadar pertumbuhan (%)","x":[1979,2008],"y":[-10,12],"tikX":[1980,1985,1990,1995,2000,2005],"tikY":[-10,-5,0,5,10],"asalan":false,"paksiXBawah":true,"siri":[{"id":"g","nama":"Pertumbuhan","label":"","kelas":"d","unit":"%","licin":false,"data":[[1980,7.4],[1981,6.9],[1982,5.9],[1983,6.3],[1984,7.8],[1985,-1],[1986,1.2],[1987,5.4],[1988,8.9],[1989,9.2],[1990,9.7],[1991,8.7],[1992,7.8],[1993,8.3],[1994,9.2],[1995,9.8],[1996,10],[1997,7.3],[1998,-7.4],[1999,5.8],[2000,7.5],[2001,2],[2002,4.4],[2003,5.4],[2004,7.1],[2005,5.3],[2006,5.5]]}]}]}'></figure>
<div class="kotak info"><span class="kotak-label">Nota semakan</span><p>Slaid 7 dan slaid 8 memaparkan dua jadual dengan nilai berbeza bagi beberapa tahun (contoh 2000: 8.5% berbanding 7.5%; 2001: 0.3% berbanding 2.0%; 1996: 8.6% berbanding 10.0%), mungkin kerana siri data dengan tahun asas berlainan. Nota ini menggunakan jadual slaid 8 yang lebih lengkap. Purata 2000–2005 ialah 31.7 ÷ 6 = <b>5.3%</b> (slaid menulis 5.2%).</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>1970-an</b><p>Bergantung pada sektor peringkat pertama (pertanian, perlombongan); pertumbuhan turun naik ketara mengikut harga komoditi.</p></div>
  <div class="kad-mini"><b>1980-an dan 1990-an</b><p>Pertumbuhan semakin tinggi dan stabil kerana perkembangan sektor perindustrian; kemelesetan 1985 akibat kemelesetan dunia, dan kejatuhan 1998 akibat krisis mata wang Asia.</p></div>
</div>
`
    },
    {
      no: "8.2",
      tajuk: "Faktor Penggalak dan Penghalang Pertumbuhan Ekonomi",
      soalan: ["Apakah faktor yang menggalakkan pertumbuhan ekonomi?", "Apakah faktor yang menghalangnya?"],
      html: `
<div class="grid-2">
  <div class="kad-mini"><b>8.2.1 Faktor penggalak</b><p>(a) <b>Anugerah kekayaan alam</b>: iklim, tanah, galian, hutan dan laut menjamin bahan mentah dan menarik pelaburan asing. (b) <b>Pertumbuhan penduduk dan buruh mahir</b>: menambah tenaga buruh, keluaran dan pasaran. (c) <b>Perkembangan teknologi</b>: meningkatkan produktiviti dan kualiti. (d) <b>Tabungan dan pembentukan modal</b>: tabungan membiayai pelaburan (pendekatan Klasik). (e) <b>Peluasan pasaran</b> dalam dan luar negara. (f) <b>Sistem sosial dan sikap masyarakat</b> yang terbuka kepada perubahan. (g) <b>Galakan kerajaan</b>: infrastruktur, taraf perintis, elaun pelaburan semula, subsidi eksport dan R&amp;D.</p></div>
  <div class="kad-mini"><b>8.2.2 Faktor penghalang</b><p>(a) <b>Pertumbuhan penduduk yang pesat</b>: lebih banyak barang pengguna, tabungan dan modal berkurang, persaingan guna tanah, beban kemudahan sosial. (b) <b>Kekurangan usahawan</b>. (c) <b>Kemerosotan sumber</b> seperti petroleum dan kayu balak. (d) <b>Kekurangan modal</b> untuk projek dan teknologi. (e) <b>Kekurangan tenaga mahir</b> yang menyekat R&amp;D. (f) <b>Faktor sosial negatif</b>: terikat adat tradisional dan enggan bekerja keras.</p></div>
</div>
`
    }
  ],
  kad: [
    { d: "Definisi <b>pertumbuhan ekonomi</b>", b: "Perubahan keluaran negara benar tahun semasa berbanding tahun sebelumnya.", t: "8.1.1" },
    { d: "KDNK benar RM200 juta → RM260 juta", b: "Kadar pertumbuhan = 60 ÷ 200 × 100 = 30%.", t: "8.1.1" },
    { d: "Bagaimana KKP menunjukkan pertumbuhan ekonomi?", b: "KKP beralih ke luar (AB ke CD) akibat pertambahan sumber dan kemajuan teknologi.", t: "8.1.1" },
    { d: "Pertumbuhan Malaysia 1998 dan puncanya", b: "−7.4%, akibat krisis mata wang Asia 1997/98.", t: "8.1.2" },
    { d: "Mengapa pertumbuhan 1970-an turun naik?", b: "Ekonomi bergantung pada sektor pertanian dan perlombongan yang harga komoditinya turun naik.", t: "8.1.2" },
    { d: "Tiga faktor <b>penggalak</b> pertumbuhan", b: "Contoh: anugerah kekayaan alam, perkembangan teknologi, tabungan dan pembentukan modal.", t: "8.2.1" },
    { d: "Mengapa pertumbuhan penduduk pesat boleh menghalang pertumbuhan?", b: "Lebih banyak barang pengguna diperlukan sehingga tabungan dan modal berkurang, persaingan guna tanah, dan beban kemudahan sosial mengurangkan pelaburan produktif.", t: "8.2.2" },
    { d: "Tiga faktor <b>penghalang</b> pertumbuhan", b: "Contoh: kekurangan usahawan, kekurangan modal, kekurangan tenaga mahir.", t: "8.2.2" }
  ],
  kuiz: []
});
