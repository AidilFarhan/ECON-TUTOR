# Econ Tutor

Laman pembelajaran interaktif **Ekonomi SPM Tingkatan 4 dan 5** (KSSM), dibina dengan HTML, CSS dan JavaScript biasa sahaja. Tiada pustaka, tiada proses *build* dan tiada pelayan khas.

## Kandungan

| Bahagian | Isi |
| --- | --- |
| **Nota** | Nota lengkap 6 bab mengikut subtopik buku teks: T4 Bab 1–4 dan T5 Bab 1–2 |
| **Graf interaktif** | 36 rajah SVG dalam nota. Nod, garis harga dan keluk boleh diseret dengan tetikus, jari atau kekunci anak panah |
| **Kad study** | 263 kad fakta. Terbalikkan kad, tandakan *Dah ingat* atau *Ulang lagi*. Kemajuan disimpan dalam pelayar |
| **Kuiz** | 178 soalan mengikut bab (termasuk Latihan Sumatif buku teks T5), set campuran T4, T5 dan T4 + T5. Setiap jawapan ada penerangan |
| **Percubaan SPM 2025** | Kelantan dan MPP3 Terengganu: setiap satu Kertas 1 (40 soalan objektif mengikut susunan asal) dan Kertas 2 (7 soalan, skema boleh ditanda, rubrik tahap) |

Soalan Kertas 1 percubaan turut dimasukkan ke dalam kuiz bab yang berkaitan.

## Cara guna

- **Buka terus:** klik dua kali `index.html`. Laman berfungsi tanpa internet, kecuali fon Google.
- **Pelayan tempatan (pilihan):** `python3 -m http.server` dalam folder ini, kemudian buka `http://localhost:8000`.

Kemajuan kad, skor kuiz dan jawapan Kertas 2 disimpan dalam `localStorage` pelayar pelajar sahaja. Tiada data dihantar ke mana-mana.

## Hosting percuma dengan GitHub Pages

1. Gabungkan (*merge*) cawangan ini ke `main`.
2. Di GitHub, buka **Settings → Pages**.
3. Di bahagian **Build and deployment**, pilih **Deploy from a branch**, kemudian `main` dan folder `/ (root)`. Tekan **Save**.
4. Selepas satu atau dua minit, laman boleh dibuka di `https://<nama-pengguna>.github.io/<nama-repo>/`. Kongsi pautan itu dengan pelajar.

Laman ini juga boleh dihoskan di Netlify atau Vercel dengan memuat naik folder yang sama; tiada tetapan *build* diperlukan.

## Struktur fail

```
index.html                      rangka laman
assets/css/style.css            tema kaca minimalis (cerah dan gelap)
assets/favicon.svg              ikon laman
assets/js/eko-core.js           pendaftaran bab, storan, utiliti
assets/js/graf.js               enjin graf SVG + graf permintaan, penawaran, keseimbangan, keanjalan, cukai dan subsidi
assets/js/graf-t4.js            graf T4 (KKP, sistem ekonomi, kos, TP/AP/MP, untung, produktiviti, PBG, sewa beli dan lain-lain)
assets/js/graf-t5.js            graf T5 (IHP, AD-AS, pengangguran, KDNK, belanjawan, cukai, faedah berbanding, tarif/subsidi/kuota, akaun semasa, penukaran mata wang, kadar pertukaran)
assets/js/data/t4-bab1.js ...   nota, kad dan kuiz setiap bab
assets/js/data/percubaan-kelantan-2025.js     Kertas 1 dan Kertas 2 percubaan Kelantan
assets/js/data/percubaan-terengganu-2025.js   Kertas 1 dan Kertas 2 MPP3 Terengganu
assets/js/app.js                penghala halaman (#nota, #graf, #kad, #kuiz, #percubaan, #k2-<id>)
```

## Cara menambah atau membetulkan kandungan

Semua kandungan berada dalam `assets/js/data/`. Setiap bab didaftarkan begini:

```js
EKO.daftarBab({
  id: "t4-b2", tingkatan: 4, no: 2, tajuk: "Pasaran", warna: "var(--bab-rm5)",
  ringkas: "Ringkasan bab...",
  seksyen: [{ no: "2.1", tajuk: "...", soalan: ["Soalan panduan"], html: `<h3>...</h3><p>...</p>` }],
  kad:  [{ d: "Depan kad", b: "Belakang kad", t: "2.1.3" }],
  kuiz: [{ s: "Soalan", p: ["A", "B", "C", "D"], j: 1, e: "Penerangan jawapan" }]
});
```

- `j` ialah indeks jawapan betul (0 = A, 1 = B, 2 = C, 3 = D). Susunan pilihan kuiz bab dikocok secara automatik, kecuali pilihan bernombor dan gabungan I, II, III.
- Untuk memasukkan graf ke dalam nota, tulis `<figure data-graf="keseimbangan" data-opt='{"preset":"kawalan"}'></figure>`. Senarai nama graf ada dalam fail `graf*.js` (cari `G.daftar(`).
- Komponen nota yang tersedia: `kotak def`, `kotak rumus`, `kotak tip`, `kotak contoh`, `kotak info`, `grid-2`, `grid-3`, `kad-mini`, `jadual`, `aliran`, `kira` dan `istilah`.

## Sumber kandungan

- Nota Tingkatan 4 berdasarkan buku teks Ekonomi Tingkatan 4 (KSSM) dalam repo ini.
- Nota Tingkatan 5 berdasarkan buku teks Ekonomi Tingkatan 5 (KSSM) Bab 1 dan Bab 2 dalam repo ini, termasuk data, contoh pengiraan dan Latihan Sumatif. Nota guru BAB 1 T5 dan BAB 2 T5 digunakan sebagai rujukan sahaja.
- Soalan dan skema percubaan daripada *Modul Koleksi Item Peperiksaan Percubaan SPM 2025 (Kelantan)* dan *Modul Perkembangan Pembelajaran SPM 2025 MPP3 (Terengganu)*. Isi bertanda "cadangan" dalam Kertas 2 disediakan untuk latihan dan bukan sebahagian daripada skema rasmi.
- Nilai berangka dalam graf dan contoh pengiraan ialah nilai contoh untuk latihan, bukan data rasmi.
