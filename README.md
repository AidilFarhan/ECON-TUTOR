# Econ Tutor

Laman pembelajaran interaktif **Ekonomi SPM Tingkatan 4 dan 5** (KSSM), dibina dengan HTML, CSS dan JavaScript biasa sahaja. Tiada pustaka, tiada proses *build* dan tiada pelayan khas.

## Kandungan

| Bahagian | Isi |
| --- | --- |
| **Nota** | Nota lengkap 6 bab mengikut subtopik buku teks: T4 Bab 1–4 dan T5 Bab 1–2 |
| **Graf interaktif** | 36 rajah SVG dalam nota. Nod, garis harga dan keluk boleh diseret dengan tetikus, jari atau kekunci anak panah |
| **Kad study** | 263 kad fakta. Terbalikkan kad, tandakan *Dah ingat* atau *Ulang lagi*. Kemajuan disimpan dalam pelayar |
| **Kuiz** | 178 soalan mengikut bab (termasuk Latihan Sumatif buku teks T5), set campuran T4, T5 dan T4 + T5. Setiap jawapan ada penerangan |
| **Percubaan SPM 2025** | Kelantan: Kertas 1 (40 soalan objektif mengikut susunan asal) dan Kertas 2 (7 soalan, skema boleh ditanda, rubrik tahap). Kertas MPP3 Terengganu sudah siap tetapi disorok buat masa ini (lihat di bawah) |

Soalan Kertas 1 percubaan turut dimasukkan ke dalam kuiz bab yang berkaitan.

## Cara guna

- **Buka terus:** klik dua kali `index.html`. Laman berfungsi tanpa internet, kecuali fon Google.
- **Pelayan tempatan (pilihan):** `python3 -m http.server` dalam folder ini, kemudian buka `http://localhost:8000`.

Kemajuan kad, skor kuiz dan jawapan Kertas 2 disimpan dalam `localStorage` pelayar pelajar sahaja. Log masuk hanya menggunakan Firebase Authentication untuk mengenal pasti pelajar; tiada data pembelajaran dihantar ke mana-mana.

## Hosting percuma dengan GitHub Pages

1. Gabungkan (*merge*) cawangan ini ke `main`.
2. Di GitHub, buka **Settings → Pages**.
3. Di bahagian **Build and deployment**, pilih **Deploy from a branch**, kemudian `main` dan folder `/ (root)`. Tekan **Save**.
4. Selepas satu atau dua minit, laman boleh dibuka di `https://<nama-pengguna>.github.io/<nama-repo>/`. Kongsi pautan itu dengan pelajar.

## Hosting dengan Vercel

Projek Vercel disambungkan terus ke repo ini. Setiap kali `main` dikemas kini, Vercel menerbitkan semula laman secara automatik. Tiada tetapan *build* diperlukan (Framework Preset: **Other**, tiada *build command*, *output directory* ialah root).

Fail `.vercelignore` menghalang fail PDF (buku teks, nota guru, kertas peperiksaan) daripada diterbitkan.

### Menyorok atau memaparkan kertas Terengganu

Kertas MPP3 Terengganu disorok daripada laman. Untuk memaparkannya:

1. Tambah `<script src="assets/js/data/percubaan-terengganu-2025.js" defer></script>` dalam `index.html`, selepas baris skrip Kelantan.
2. Buang baris `assets/js/data/percubaan-terengganu-2025.js` daripada `.vercelignore`.
3. Kemas kini teks kaki laman dan `<meta name="description">` dalam `index.html` jika perlu.

Halaman utama, halaman Percubaan dan senarai kuiz akan menyenaraikan kertas itu secara automatik.

## Log masuk dan senarai akses

Di Vercel, semua kandungan dikunci. Pelajar perlu log masuk dengan **Google** atau **email + kata laluan**, dan email mereka mesti ada dalam senarai akses.

Cara ia berfungsi:

1. `masuk.html` menggunakan Firebase Authentication. SDK Firebase dihoskan sendiri dalam `assets/js/vendor/`.
2. Selepas log masuk, token ID Firebase dihantar ke `api/sesi.js`. Fungsi ini:
   - menyemak tandatangan token dengan kunci awam Google;
   - memastikan email sudah disahkan (akaun email + kata laluan perlu klik pautan pengesahan dahulu);
   - memastikan email ada dalam senarai akses;
   - kemudian menetapkan kuki sesi `econ_sesi` (HttpOnly, 12 jam).
3. `middleware.js` menyemak kuki itu untuk setiap fail. Tanpa sesi yang sah, halaman dialihkan ke `masuk.html` dan fail lain dijawab dengan 401.

Apabila dibuka secara tempatan (klik dua kali `index.html` atau `python3 -m http.server`), laman tidak dikunci kerana middleware hanya berjalan di Vercel.

### Tetapan sekali sahaja

| Di mana | Apa |
| --- | --- |
| Firebase console | Buat projek, aktifkan **Authentication → Sign-in method → Email/Password** dan **Google**, tambah domain laman dalam **Authentication → Settings → Authorized domains** |
| `assets/js/firebase-config.js` | Tampal `apiKey`, `authDomain`, `projectId` dan `appId` daripada **Project settings → Your apps → Web app** (nilai awam, bukan rahsia) |
| Vercel → Settings → Environment Variables | `RAHSIA_SESI`: rahsia rawak sekurang-kurangnya 32 aksara (sudah ditetapkan). Tukar nilainya untuk log keluar semua pengguna |
| Vercel → Settings → Environment Variables | `EMAIL_DIBENARKAN`: senarai email yang dibenarkan |

### Mengurus senarai akses

`EMAIL_DIBENARKAN` ialah senarai email yang dipisahkan dengan koma atau baris baharu. Huruf besar dan kecil tidak dibezakan. Contoh:

```
cikgu@gmail.com, ali@gmail.com
siti@moe-dl.edu.my
@sekolahku.edu.my
```

Entri yang bermula dengan `@` membenarkan semua email dalam domain itu.

Selepas mengubah senarai, buka **Deployments**, pilih deployment production terkini dan tekan **Redeploy**; perubahan hanya berkuat kuasa pada deployment baharu. Email yang dibuang akan terus disekat, termasuk pengguna yang sedang log masuk.

### Mengemas kini SDK Firebase

```
npm i firebase@<versi> esbuild
npx esbuild entry.js --bundle --format=esm --minify --platform=browser --outfile=assets/js/vendor/firebase-auth-<versi>.js
```

`entry.js` mengeksport fungsi yang diimport oleh `assets/js/masuk.js`. Kemudian kemas kini laluan import dalam `masuk.js`.

## Struktur fail

```
index.html                      rangka laman
masuk.html                      halaman log masuk (Google atau email)
middleware.js                   kunci kandungan di Vercel (semak kuki sesi dan senarai akses)
api/sesi.js                     sahkan token Firebase, tetapkan atau padam kuki sesi
lib/sesi.js, lib/token-firebase.js   kuki sesi bertandatangan, senarai akses, pengesahan token
assets/css/style.css            tema kaca minimalis (cerah dan gelap)
assets/favicon.svg              ikon laman
assets/js/eko-core.js           pendaftaran bab, storan, utiliti
assets/js/graf.js               enjin graf SVG + graf permintaan, penawaran, keseimbangan, keanjalan, cukai dan subsidi
assets/js/graf-t4.js            graf T4 (KKP, sistem ekonomi, kos, TP/AP/MP, untung, produktiviti, PBG, sewa beli dan lain-lain)
assets/js/graf-t5.js            graf T5 (IHP, AD-AS, pengangguran, KDNK, belanjawan, cukai, faedah berbanding, tarif/subsidi/kuota, akaun semasa, penukaran mata wang, kadar pertukaran)
assets/js/data/t4-bab1.js ...   nota, kad dan kuiz setiap bab
assets/js/data/percubaan-kelantan-2025.js     Kertas 1 dan Kertas 2 percubaan Kelantan
assets/js/data/percubaan-terengganu-2025.js   Kertas 1 dan Kertas 2 MPP3 Terengganu (disorok)
assets/js/app.js                penghala halaman (#nota, #graf, #kad, #kuiz, #percubaan, #k2-<id>)
assets/js/akaun.js              butang akaun dan log keluar dalam bar atas
assets/js/masuk.js              logik halaman log masuk
assets/js/firebase-config.js    tetapan projek Firebase (awam)
assets/js/vendor/               SDK Firebase Auth yang dihoskan sendiri
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
