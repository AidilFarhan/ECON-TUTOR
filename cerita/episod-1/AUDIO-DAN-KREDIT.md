# Audio — Misi Karnival

Semua audio berada dalam `assets/audio/` dan dimainkan secara tempatan. Game tidak meminta servis audio luar ketika dimainkan. Audio bermula selepas interaksi pemain; browser tidak perlu membenarkan autoplay tanpa klik.

## Mengikut situasi

| Situasi | BGM | Suasana / kesan |
| --- | --- | --- |
| Kelas | Melodi lembut untuk merancang | Murid berbual, bunyi kelas |
| Persediaan bahan | Melodi lebih pantas dan ringan | Pisau memotong di papan; blender sekali-sekala |
| Booth waktu hujan | Melodi minor lebih tenang dan tegang | Hujan, guruh sekali-sekala, crowd jauh |
| Booth selepas pindah ke ruang terlindung / bantuan | Melodi karnival lebih ceria | Crowd lebih jelas, hujan dan guruh lebih perlahan |
| Mengemas waktu senja | Melodi hangat dan santai | Suara orang ramai lebih perlahan |

Setiap butang berbunyi titisan air. Perubahan tunai yang dipaparkan memainkan cash register: nada menurun untuk duit keluar, nada menaik untuk duit masuk. Kutipan jualan tidak berbunyi sebagai duit masuk sebelum baki disahkan pada kiraan petang. Sambung simpanan dan mula semula tidak dianggap transaksi.

Menu mempunyai mute dan slider berasingan untuk BGM, suasana dan kesan. Tetapan disimpan dengan key `econ-vn-audio:v1`, berasingan daripada simpanan cerita. Muzik dan suasana beralih secara beransur antara scene; tidak dimulakan semula pada setiap dialog. Bunyi latar diperlahankan semasa teks menaip. Bila tab disembunyikan, semua audio dihentikan sementara; kembali ke tab menyambung lapisan yang berkenaan.

## Rakaman suasana

Lima rakaman berikut disemak pada halaman asal dan dikeluarkan sebagai CC0. Versi HQ MP3 awam digunakan, kemudian dipendekkan, ditapis frekuensi rendah, diberi fade ringkas dan dikod semula sebagai MP3 112 kbps / 32 kHz. Sumber direkodkan untuk rujukan dan penghargaan, walaupun CC0 tidak mewajibkan atribusi.

| Fail tempatan | Pencipta | Halaman sumber |
| --- | --- | --- |
| `kelas.mp3` | doom.blu | [Ambient Classroom Chatter](https://freesound.org/people/doom.blu/sounds/636033/) |
| `potong.mp3` | MarleneAyni | [Chopping onions](https://freesound.org/people/MarleneAyni/sounds/569389/) |
| `blender.mp3` | parkersenk | [Empty blender](https://freesound.org/people/parkersenk/sounds/452706/) |
| `crowd.mp3` | bolkmar | [Crowded street at medieval market](https://freesound.org/people/bolkmar/sounds/424790/) |
| `hujan.mp3` | thaighaudio | [Light rain thunderstorm](https://freesound.org/people/thaighaudio/sounds/121533/) |

Lesen rakaman: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Fail `sumber-audio.json` menyimpan URL sumber, URL preview yang digunakan dan lesen. Rakaman ini ialah bunyi suasana contoh, bukan rakaman sekolah atau karnival dalam cerita.

## Muzik dan kesan asal projek

Lima BGM `bgm-kelas`, `bgm-dapur`, `bgm-hujan`, `bgm-festival`, `bgm-senja` disusun dan disintesis untuk projek ini menggunakan lapisan nada pluck, pad dan rentak ringan. Tiada sampel lagu artis lain digunakan.

`titis.mp3`, `cash-keluar.mp3`, `cash-masuk.mp3` dan `guruh.mp3` ialah kesan sintesis asal projek. Guruh tambahan dimainkan pada jarak masa berubah untuk mengelakkan corak ulangan terlalu ketara. Audio boleh digunakan bersama kod game ini.

## Panduan untuk Claude

- Muatkan `bunyi.js` sebelum `scene.js` dan `main.js`; muatkan `bunyi.css` bersama CSS lain. Salin **semua** `assets/audio/`.
- `KARNIVAL_BUNYI.scene(scene, state)` mengemas kini situasi; peralihan ke festival berpandukan `state.tempat`.
- `KARNIVAL_BUNYI.cash(delta)` dipanggil apabila nilai tunai HUD berubah. Nilai awal ketika load/reset tidak memainkan cash.
- `KARNIVAL_BUNYI.typing(boolean)` merendahkan lapisan latar. Apabila VO dipasang, gunakan kawalan ini ketika audio dialog bermain dan lepaskan pada akhir/error/interruption.
- `KARNIVAL_BUNYI.panel()` menghasilkan kawalan Menu. `objek(id)` memberikan respons potong/blender ketika objek persediaan ditekan.
- Audio sengaja menggunakan elemen HTMLAudio untuk menyokong fail tempatan dan laman statik. Kekalkan aktivasi selepas user gesture. Jika menggunakan iframe, semak izin autoplay dan gunakan klik pengguna untuk memulakan.
- Jika menukar game kepada komponen SPA, tambah fungsi teardown untuk interval audio dan listener dokumen. Pakej asal menggunakan halaman berasingan dan lifecycle `pagehide` / `visibilitychange`.
- VO belum dipasang. Lima BGM, lima rakaman dan empat kesan sahaja berada dalam folder audio.
