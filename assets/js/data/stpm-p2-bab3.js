/* =========================================================
   STPM Penggal 2 · Bab 3 · Keseimbangan Pendapatan Negara dan Dasar Fiskal
   Sumber: Modul PdP Ekonomi P2 Makroekonomi, Bab 3
   ========================================================= */
EKO.daftarBab({
  id: "stpm-p2-b3",
  peringkat: "stpm",
  tingkatan: 2,
  no: 3,
  tajuk: "Keseimbangan Pendapatan Negara dan Dasar Fiskal",
  warna: "var(--bab-rm10)",
  ringkas:
    "Pendapatan negara ditentukan oleh perbelanjaan agregat. Bab ini merangkumi fungsi penggunaan, tabungan dan pelaburan, keseimbangan AE–Y dan suntikan–bocoran, pengganda, lompang deflasi dan inflasi, dasar fiskal, ekonomi terbuka serta analisis AD–AS.",
  seksyen: [
    {
      no: "3.1",
      tajuk: "Pendekatan Perbelanjaan Agregat–Pendapatan (AE–Y)",
      soalan: [
        "Apakah komponen AE, suntikan dan bocoran?",
        "Bagaimanakah fungsi penggunaan dan tabungan terbentuk, dan apakah kesan cukai sekali gus?",
        "Bagaimanakah keseimbangan pendapatan negara ditentukan?"
      ],
      html: `
<h3>(a) Komponen perbelanjaan agregat</h3>
<p>Dalam ekonomi tiga sektor: aliran (1) <b>Y</b> pendapatan faktor dari firma kepada isi rumah; (2) <b>C</b> perbelanjaan penggunaan; (3) <b>T</b> cukai kepada kerajaan; (4) <b>G</b> perbelanjaan kerajaan. Tabungan (S) disalurkan melalui institusi kewangan kepada pelaburan (I).</p>
<div class="grid-2">
  <div class="kotak def"><span class="kotak-label">Suntikan (J)</span><p>Aliran masuk wang ke dalam pusingan pendapatan yang <b>menambah</b> pendapatan negara.</p></div>
  <div class="kotak def"><span class="kotak-label">Bocoran (W)</span><p>Aliran keluar wang daripada pusingan pendapatan yang <b>mengurangkan</b> pendapatan negara.</p></div>
</div>
<div class="jadual"><table><caption>AE, suntikan dan bocoran</caption>
<thead><tr><th>Ekonomi</th><th>AE</th><th>Suntikan</th><th>Bocoran</th></tr></thead>
<tbody>
<tr><td>Dua sektor</td><td>C + I</td><td>I</td><td>S</td></tr>
<tr><td>Tiga sektor</td><td>C + I + G</td><td>I + G</td><td>S + T</td></tr>
<tr><td>Empat sektor</td><td>C + I + G + (X − M)</td><td>I + G + X</td><td>S + T + M</td></tr>
</tbody></table></div>

<h3>(b) Fungsi penggunaan dan fungsi tabungan</h3>
<div class="kotak rumus"><span class="kotak-label">Rumus</span>
<div class="rumus-baris">C = a + bY<sub>d</sub> (a = penggunaan autonomi, b = MPC)</div>
<div class="rumus-baris">S = −a + (1 − b)Y<sub>d</sub></div>
<div class="rumus-baris">MPC = <span class="pecahan"><span>ΔC</span><span>ΔY<sub>d</sub></span></span>, MPS = <span class="pecahan"><span>ΔS</span><span>ΔY<sub>d</sub></span></span>, MPC + MPS = 1</div>
<div class="rumus-baris">Y<sub>d</sub> = C + S = Y − T</div></div>
<div class="jadual"><table><caption>Contoh fungsi penggunaan dan tabungan</caption>
<thead><tr><th class="n">Y<sub>d</sub></th><th class="n">C</th><th class="n">S</th><th class="n">ΔC</th><th class="n">ΔS</th><th class="n">MPC</th><th class="n">MPS</th></tr></thead>
<tbody>
<tr><td class="n">0</td><td class="n">80</td><td class="n">−80</td><td class="n">–</td><td class="n">–</td><td class="n">–</td><td class="n">–</td></tr>
<tr><td class="n">100</td><td class="n">160</td><td class="n">−60</td><td class="n">80</td><td class="n">20</td><td class="n">0.8</td><td class="n">0.2</td></tr>
<tr><td class="n">200</td><td class="n">240</td><td class="n">−40</td><td class="n">80</td><td class="n">20</td><td class="n">0.8</td><td class="n">0.2</td></tr>
<tr><td class="n">300</td><td class="n">320</td><td class="n">−20</td><td class="n">80</td><td class="n">20</td><td class="n">0.8</td><td class="n">0.2</td></tr>
<tr><td class="n">400</td><td class="n">400</td><td class="n">0</td><td class="n">80</td><td class="n">20</td><td class="n">0.8</td><td class="n">0.2</td></tr>
<tr><td class="n">500</td><td class="n">480</td><td class="n">20</td><td class="n">80</td><td class="n">20</td><td class="n">0.8</td><td class="n">0.2</td></tr>
</tbody></table></div>
<p>Daripada jadual: C = 80 + 0.8Y<sub>d</sub> dan S = −80 + 0.2Y<sub>d</sub>. MPC 0.8 bermaksud 80% tambahan pendapatan boleh guna dibelanjakan; MPS 0.2 bermaksud 20% ditabung.</p>
<p><b>Faktor mempengaruhi penggunaan:</b> pendapatan boleh guna (lebih tinggi, C lebih tinggi), kadar bunga (lebih tinggi, kos meminjam naik, C berkurang), dan MPC.</p>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Cukai sekali gus ke atas C</span><div class="kira">
  <div class="baris">C = 1 000 + 0.8Y<sub>d</sub>, T = 200</div>
  <div class="baris">C = 1 000 + 0.8(Y − 200) = 840 + 0.8Y</div>
  <div class="baris jawapan">C berkurang 0.8 × 200 = RM160</div></div><p>Keluk C beralih ke bawah secara selari (MPC tidak berubah).</p></div>
  <div class="kotak contoh"><span class="kotak-label">Cukai sekali gus ke atas S</span><div class="kira">
  <div class="baris">S = −1 000 + 0.2Y<sub>d</sub>, T = 200</div>
  <div class="baris">S = −1 000 + 0.2(Y − 200) = −1 040 + 0.2Y</div>
  <div class="baris jawapan">S berkurang 0.2 × 200 = RM40</div></div><p>Keluk S beralih ke bawah secara selari (MPS tidak berubah).</p></div>
</div>

<h3>(c) Pelaburan dan (d) perbelanjaan kerajaan</h3>
<ul>
<li><b>Pelaburan (I)</b> (pembentukan modal tetap kasar swasta): perbelanjaan firma ke atas jentera dan mesin, bahan mentah dan stok, serta pembinaan kilang dan pejabat. <b>Pelaburan autonomi</b> tidak dipengaruhi pendapatan negara (keluk mendatar).</li>
<li><b>Kecekapan modal sut (MEI)</b>: peratus keuntungan daripada pelaburan dalam setahun. Pelaburan dibuat jika kadar pulangan melebihi kadar bunga. Keluk MEI menunjukkan hubungan <b>songsang</b> antara kadar bunga dengan pelaburan.</li>
<li><b>Perbelanjaan kerajaan (G)</b>: perbelanjaan mengurus dan pembangunan; tetap pada semua tingkat pendapatan negara.</li>
</ul>

<h3>(e)–(f) Keseimbangan pendapatan negara</h3>
<div class="kotak def"><span class="kotak-label">Keseimbangan</span><p>Nilai keluaran (Y) sama dengan perbelanjaan agregat (AE), atau suntikan sama dengan bocoran. Pada Y di bawah keseimbangan, AE &gt; Y, stok firma berkurang dan firma menambah keluaran; pada Y di atas keseimbangan, stok berlebihan dan firma mengurangkan keluaran.</p></div>
<div class="jadual"><table><caption>Syarat keseimbangan</caption>
<thead><tr><th>Ekonomi</th><th>AE–Y</th><th>Suntikan–bocoran</th></tr></thead>
<tbody>
<tr><td>Dua sektor</td><td>Y = C + I</td><td>S = I</td></tr>
<tr><td>Tiga sektor</td><td>Y = C + I + G</td><td>S + T = I + G</td></tr>
<tr><td>Empat sektor</td><td>Y = C + I + G + (X − M)</td><td>S + T + M = I + G + X</td></tr>
</tbody></table></div>
<div class="grid-2">
  <div class="kotak contoh"><span class="kotak-label">Pendekatan AE–Y</span><div class="kira">
  <div class="baris">C = 100 + 0.8Y<sub>d</sub>, I = 50, G = 50, T = 30</div>
  <div class="baris">Y = 100 + 0.8(Y − 30) + 50 + 50</div>
  <div class="baris">Y = 176 + 0.8Y → 0.2Y = 176</div>
  <div class="baris jawapan">Y = RM880 juta</div></div></div>
  <div class="kotak contoh"><span class="kotak-label">Pendekatan suntikan–bocoran</span><div class="kira">
  <div class="baris">S + T = I + G</div>
  <div class="baris">−100 + 0.2(Y − 30) + 30 = 50 + 50</div>
  <div class="baris">0.2Y − 6 = 170 → 0.2Y = 176</div>
  <div class="baris jawapan">Y = RM880 juta</div></div></div>
</div>
<figure data-graf="ae-y"></figure>

<h3>(g) Proses pengganda</h3>
<div class="kotak rumus"><span class="kotak-label">Pengganda</span><div class="rumus-baris">k = <span class="pecahan"><span>ΔY</span><span>ΔAE</span></span> = <span class="pecahan"><span>1</span><span>1 − MPC</span></span> = <span class="pecahan"><span>1</span><span>MPS</span></span></div><div class="rumus-baris">Pengganda cukai = <span class="pecahan"><span>−MPC</span><span>1 − MPC</span></span></div></div>
<div class="jadual"><table><caption>Pelaburan RM10 juta, MPC = 0.8</caption>
<thead><tr><th>Peringkat</th><th class="n">ΔY (RM juta)</th><th class="n">ΔC</th><th class="n">ΔS</th></tr></thead>
<tbody>
<tr><td>1</td><td class="n">10</td><td class="n">8</td><td class="n">2</td></tr>
<tr><td>2</td><td class="n">8</td><td class="n">6.4</td><td class="n">1.6</td></tr>
<tr><td>3</td><td class="n">6.4</td><td class="n">5.12</td><td class="n">1.28</td></tr>
<tr><td>…</td><td class="n">…</td><td class="n">…</td><td class="n">…</td></tr>
<tr><td><b>Jumlah</b></td><td class="n"><b>50</b></td><td class="n">40</td><td class="n">10</td></tr>
</tbody></table></div>
<p>k = 1 ÷ (1 − 0.8) = 5, maka ΔY = 5 × 10 = RM50 juta. Semakin tinggi MPC, semakin besar pengganda:</p>
<div class="jadual"><table><caption>Saiz pengganda</caption><thead><tr><th>MPC</th><td class="n">0.5</td><td class="n">0.6</td><td class="n">0.75</td><td class="n">0.8</td><td class="n">0.9</td></tr></thead>
<tbody><tr><th>Pengganda</th><td class="n">2</td><td class="n">2.5</td><td class="n">4</td><td class="n">5</td><td class="n">10</td></tr></tbody></table></div>
<p><b>Kesan perubahan:</b> pertambahan AE atau suntikan (contoh G naik) menambah Y beberapa kali ganda; pertambahan bocoran (contoh T naik) mengurangkan Y beberapa kali ganda, dan sebaliknya.</p>
`
    },
    {
      no: "3.1 (h)–(j)",
      tajuk: "Dasar Fiskal, Lompang Deflasi dan Lompang Inflasi",
      soalan: ["Apakah dasar fiskal dan jenis belanjawan?", "Bagaimanakah lompang deflasi dan inflasi dihitung?", "Bagaimanakah dasar fiskal mengatasi pengangguran dan inflasi?"],
      html: `
<div class="kotak def"><span class="kotak-label">Dasar fiskal</span><p>Dasar kerajaan mengubah <b>cukai (T)</b> dan <b>perbelanjaan kerajaan (G)</b> untuk mempengaruhi kegiatan ekonomi. <b>Belanjawan negara</b> ialah perancangan kewangan kerajaan bagi hasil dan perbelanjaan setahun akan datang.</p></div>
<div class="grid-2">
  <div class="kad-mini"><b>Hasil kerajaan</b><p>Hasil cukai (cukai pendapatan individu, cukai syarikat, duti import) dan hasil bukan cukai (lesen perniagaan, denda).</p></div>
  <div class="kad-mini"><b>Perbelanjaan kerajaan</b><p>Mengurus (emolumen) dan pembangunan (sekolah, hospital).</p></div>
</div>
<h3>Jurang KNK, lompang deflasi dan lompang inflasi</h3>
<div class="kotak rumus"><span class="kotak-label">Rumus</span>
<div class="rumus-baris">Jurang KNK = Y<sub>f</sub> − Y<sub>e</sub></div>
<div class="rumus-baris">Lompang = <span class="pecahan"><span>Jurang KNK</span><span>Pengganda</span></span></div></div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Lompang deflasi</span><p><b>Kekurangan AE</b> untuk mencapai pendapatan guna tenaga penuh. Y<sub>e</sub> &lt; Y<sub>f</sub>. Diatasi dengan dasar fiskal <b>mengembang</b>: tambah G atau turunkan T.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Lompang inflasi</span><p><b>Lebihan AE</b> pada pendapatan guna tenaga penuh. Y<sub>e</sub> &gt; Y<sub>f</sub>. Diatasi dengan dasar fiskal <b>menguncup</b>: kurangkan G atau naikkan T.</p></div>
</div>
<div class="jadual"><table><caption>Jenis belanjawan</caption>
<thead><tr><th>Belanjawan</th><th>Syarat</th></tr></thead>
<tbody><tr><td>Lebihan</td><td>Hasil &gt; perbelanjaan</td></tr><tr><td>Kurangan (defisit)</td><td>Hasil &lt; perbelanjaan</td></tr><tr><td>Terimbang</td><td>Hasil = perbelanjaan</td></tr></tbody></table></div>
<div class="kotak def"><span class="kotak-label">Hutang negara</span><p>Hutang kerajaan untuk membiayai belanjawan defisit. <b>Dalam negeri</b>: daripada institusi seperti KWSP dan LTH melalui sekuriti kerajaan, sijil pelaburan dan bil perbendaharaan. <b>Luar negara</b>: daripada kerajaan asing dan institusi kewangan antarabangsa melalui pinjaman pasaran dan pinjaman projek.</p></div>
<div class="kotak contoh"><span class="kotak-label">Panduan menjawab · Bahagian C</span>
<p>C = 500 + 0.9Y<sub>d</sub>, T = 200, I = 600, G = 400 (RM juta); Y<sub>f</sub> = RM14 000 juta.</p>
<div class="kira">
<div class="baris">(b) Y = 500 + 0.9(Y − 200) + 600 + 400 = 1 320 + 0.9Y → Y = RM13 200 juta</div>
<div class="baris">(d)(i) Jurang KNK = 14 000 − 13 200 = 800; pengganda = 1 ÷ 0.1 = 10</div>
<div class="baris">Lompang deflasi = 800 ÷ 10 = RM80 juta</div>
<div class="baris">(d)(ii) G perlu ditambah RM80 juta</div>
<div class="baris">(e) G naik 50 dan T turun 50: ΔY = (10 × 50) + (−9 × −50) = 500 + 450 = 950</div>
<div class="baris jawapan">Y baharu = 13 200 + 950 = RM14 150 juta</div></div></div>
`
    },
    {
      no: "3.1 (k)–(m)",
      tajuk: "Keseimbangan Ekonomi Terbuka",
      soalan: ["Bagaimanakah keseimbangan ekonomi terbuka ditentukan?", "Apakah kesan perubahan eksport dan import?"],
      html: `
<div class="grid-2">
  <div class="kad-mini"><b>Fungsi eksport</b><p>Eksport tidak dipengaruhi secara langsung oleh pendapatan negara; keluk <b>mendatar</b>.</p></div>
  <div class="kad-mini"><b>Fungsi import</b><p>Import dipengaruhi secara langsung oleh pendapatan negara; keluk <b>mencerun ke atas</b>. Semakin tinggi Y, semakin tinggi import.</p></div>
</div>
<div class="kotak contoh"><span class="kotak-label">Contoh</span><div class="kira">
<div class="baris">C = 100 + 0.8Y<sub>d</sub>, I = 50, G = 50, T = 30, X = 60, M = 0.2Y</div>
<div class="baris">Y = 100 + 0.8(Y − 30) + 50 + 50 + 60 − 0.2Y</div>
<div class="baris">Y = 236 + 0.6Y → 0.4Y = 236</div>
<div class="baris jawapan">Y = RM590 juta</div></div></div>
<div class="jadual"><table><caption>Kesan perubahan eksport dan import</caption>
<thead><tr><th>Perubahan</th><th>Kesan pada rajah suntikan–bocoran</th><th>Pendapatan negara</th></tr></thead>
<tbody>
<tr><td>Eksport bertambah</td><td>Suntikan I + G + X beralih ke atas</td><td>Naik</td></tr>
<tr><td>Eksport berkurang</td><td>Suntikan beralih ke bawah</td><td>Turun</td></tr>
<tr><td>Import berkurang</td><td>Bocoran S + T + M beralih ke bawah</td><td>Naik</td></tr>
<tr><td>Import bertambah</td><td>Bocoran beralih ke atas</td><td>Turun</td></tr>
</tbody></table></div>
<div class="kotak contoh"><span class="kotak-label">Panduan menjawab · Bahagian C</span>
<p>C = 260 + 0.8Y<sub>d</sub>, I = 400, G = 300, X = 500, M = 100 + 0.2Y, T = 200 (RM juta).</p>
<div class="kira">
<div class="baris">Tertutup: Y = 260 + 0.8(Y − 200) + 400 + 300 → 0.2Y = 800 → Y = RM4 000 juta</div>
<div class="baris">Terbuka: Y = 1 200 + 0.6Y → 0.4Y = 1 200 → Y = RM3 000 juta</div>
<div class="baris">Eksport bersih = 500 − [100 + 0.2(3 000)] = −RM200 juta</div>
<div class="baris">C = 260 + 0.8(3 000 − 200) = RM2 500 juta</div>
<div class="baris jawapan">Sumbangan: penggunaan 83.33%, eksport 16.67%</div></div></div>
`
    },
    {
      no: "3.2",
      tajuk: "Analisis Permintaan Agregat–Penawaran Agregat (AD–AS)",
      soalan: [
        "Bagaimanakah keluk AD diterbitkan dan apakah punca peralihannya?",
        "Apakah punca peralihan keluk AS?",
        "Apakah kesan perubahan AD dan AS terhadap harga dan pendapatan negara benar?"
      ],
      html: `
<div class="kotak def"><span class="kotak-label">Keluk AD</span><p>Keluk yang menunjukkan hubungan antara tingkat harga umum dengan pendapatan negara benar. Bercerun <b>negatif</b>: harga naik (P₀ ke P₁), kuasa beli merosot, AE berkurang, Y benar berkurang (Y₀ ke Y₁).</p></div>
<div class="grid-2">
  <div class="kotak fokus"><span class="kotak-label">Peralihan AD</span><p>C, I, G, X atau bekalan wang bertambah, atau M berkurang: AD ke <b>kanan</b>. Sebaliknya: AD ke <b>kiri</b>.</p></div>
  <div class="kotak fokus"><span class="kotak-label">Peralihan AS</span><p>Teknologi meningkat, kos pengeluaran turun, produktiviti naik, sumber bertambah: AS ke <b>kanan</b>. Sebaliknya: AS ke <b>kiri</b>. Keluk AS bercerun positif dan menegak pada guna tenaga penuh.</p></div>
</div>
<p><b>Keseimbangan AD–AS</b> pada E₀ (P₀, Y₀). Pada harga lebih tinggi, lebihan AS menurunkan harga; pada harga lebih rendah, lebihan AD menaikkan harga.</p>
<div class="jadual"><table><caption>Perubahan keseimbangan AD–AS</caption>
<thead><tr><th>Contoh</th><th>Peralihan</th><th>Harga</th><th>Y benar</th></tr></thead>
<tbody>
<tr><td>Kadar bunga turun (I naik) / cukai pendapatan turun</td><td>AD ke kanan</td><td>Naik</td><td>Bertambah</td></tr>
<tr><td>Upah buruh naik (kos naik)</td><td>AS ke kiri</td><td>Naik</td><td>Berkurang</td></tr>
<tr><td>AD bertambah melebihi pengurangan AS</td><td>AD kanan, AS kiri</td><td>Naik</td><td>Bertambah</td></tr>
<tr><td>Teknologi meningkat</td><td>AS ke kanan</td><td>Turun</td><td>Bertambah</td></tr>
</tbody></table></div>
<figure data-graf="ad-as"></figure>
`
    }
  ],
  kad: [
    { d: "Komponen <b>suntikan</b> dan <b>bocoran</b> ekonomi empat sektor", b: "Suntikan: I + G + X. Bocoran: S + T + M.", t: "3.1" },
    { d: "Fungsi <b>penggunaan</b> dan <b>tabungan</b>", b: "C = a + bYd; S = −a + (1 − b)Yd; a = penggunaan autonomi, b = MPC.", t: "3.1" },
    { d: "Maksud <b>MPC</b> dan <b>MPS</b>", b: "MPC = ΔC ÷ ΔYd; MPS = ΔS ÷ ΔYd; MPC + MPS = 1.", t: "3.1" },
    { d: "Kesan <b>cukai sekali gus</b> T = 200 ke atas C = 1 000 + 0.8Yd", b: "C = 840 + 0.8Y: berkurang RM160; keluk C beralih ke bawah secara selari.", t: "3.1" },
    { d: "Maksud <b>kecekapan modal sut (MEI)</b>", b: "Peratus keuntungan pelaburan dalam setahun. Keluk MEI: hubungan songsang kadar bunga dengan pelaburan.", t: "3.1" },
    { d: "Syarat keseimbangan ekonomi <b>tiga sektor</b>", b: "Y = C + I + G, atau S + T = I + G.", t: "3.1" },
    { d: "C = 100 + 0.8Yd, I = 50, G = 50, T = 30: cari Y", b: "Y = 176 ÷ 0.2 = RM880 juta.", t: "3.1" },
    { d: "Apa berlaku apabila AE > Y?", b: "Stok firma berkurang, firma menambah keluaran sehingga AE = Y.", t: "3.1" },
    { d: "Rumus <b>pengganda</b>", b: "k = ΔY ÷ ΔAE = 1 ÷ (1 − MPC) = 1 ÷ MPS.", t: "3.1" },
    { d: "Pelaburan RM10 juta, MPC 0.8: kesan ke atas Y", b: "k = 5, ΔY = RM50 juta.", t: "3.1" },
    { d: "Pengganda bagi MPC 0.5, 0.75, 0.9", b: "2, 4 dan 10. Semakin tinggi MPC, semakin besar pengganda.", t: "3.1" },
    { d: "Maksud <b>dasar fiskal</b>", b: "Dasar kerajaan mengubah cukai dan perbelanjaan kerajaan untuk mempengaruhi kegiatan ekonomi.", t: "3.1" },
    { d: "Maksud <b>lompang deflasi</b>", b: "Kekurangan AE untuk mencapai pendapatan guna tenaga penuh. Lompang = jurang KNK ÷ pengganda.", t: "3.1" },
    { d: "Maksud <b>lompang inflasi</b>", b: "Lebihan AE pada tingkat pendapatan guna tenaga penuh.", t: "3.1" },
    { d: "Jurang KNK RM800 juta, MPC 0.9: lompang?", b: "Pengganda 10, lompang deflasi RM80 juta.", t: "3.1" },
    { d: "Rumus <b>pengganda cukai</b>", b: "−MPC ÷ (1 − MPC). Contoh MPC 0.9: −9.", t: "3.1" },
    { d: "Tiga jenis <b>belanjawan</b>", b: "Lebihan (hasil > belanja), kurangan/defisit (hasil < belanja), terimbang (hasil = belanja).", t: "3.1" },
    { d: "Sumber <b>hutang negara</b>", b: "Dalam negeri (KWSP, LTH: sekuriti kerajaan, bil perbendaharaan) dan luar negara (kerajaan asing, institusi antarabangsa).", t: "3.1" },
    { d: "Bentuk fungsi <b>eksport</b> dan <b>import</b>", b: "Eksport: mendatar (tidak bergantung Y). Import: mencerun ke atas (bergantung Y).", t: "3.1" },
    { d: "Kesan import bertambah ke atas pendapatan negara", b: "Bocoran bertambah, keluk S + T + M beralih ke atas, pendapatan negara turun.", t: "3.1" },
    { d: "Mengapa keluk <b>AD</b> bercerun negatif?", b: "Harga naik mengurangkan kuasa beli, AE berkurang, pendapatan negara benar berkurang.", t: "3.2" },
    { d: "Punca keluk <b>AS</b> beralih ke kanan", b: "Teknologi meningkat, kos pengeluaran turun, produktiviti naik, sumber bertambah.", t: "3.2" },
    { d: "Kesan <b>kenaikan upah</b> dalam analisis AD–AS", b: "Kos naik, AS ke kiri: harga naik, pendapatan negara benar berkurang.", t: "3.2" },
    { d: "Kesan <b>penurunan cukai pendapatan</b> dalam AD–AS", b: "Yd dan C naik, AD ke kanan: harga naik, pendapatan negara benar bertambah.", t: "3.2" }
  ],
  kuiz: []
});
