# Arah visual dan spesifikasi ilustrasi

Alat: imagegen terbina dalam. Rujukan: draf visual novel yang diluluskan dalam perbualan.

Watak kekal: Mira, pelajar perempuan dengan tudung putih dan baju sekolah putih; Hakim, pelajar lelaki dengan rambut coklat gelap, baju putih dan tali leher hijau. Gaya ilustrasi anime dengan suasana sekolah Malaysia, cahaya lembut dan komposisi lebar. Elakkan teks, dialog, butang atau UI yang terbenam dalam gambar. Dialog dan pilihan dipaparkan berasingan oleh permainan.

| Fail | Arahan scene |
| --- | --- |
| assets/kelas.png | Selepas sekolah, kelas diterangi cahaya petang. Mira menunjukkan lakaran booth karnival; Hakim memegang buku kira-kira. Ekspresi ceria dan sedikit bimbang. |
| assets/persediaan.png | Pagi berikutnya, bilik persediaan sekolah. Mira menyediakan sandwich; Hakim memeriksa perancangan. Jug air, bekas makanan dan bahan di atas meja. |
| assets/hujan.png | Booth karnival di bawah kanopi semasa hujan lebat. Mira dan Hakim kelihatan risau; stok makanan bertutup dan hujan di luar kanopi. |
| assets/senja.png | Hujung karnival pada waktu senja. Mira dan Hakim mengemas bekas dan kotak, dengan suasana refleksi dan persahabatan. |

Empat gambar di atas menjadi rujukan komposisi versi animasi. Watak dengan aksi tangan dan barang di tangan dipisahkan daripada latar untuk membolehkan gerakan individu. Penerokaan scene meletakkan butang bulatan pada lakaran, bahan dan bekas. Kamera memberi fokus kepada penutur; pengguna boleh melihat keseluruhan gambar atau mengalih kamera pada skrin menegak.

Versi terkini menggunakan `aksi-kelas.png`, `aksi-persediaan.png`, `aksi-hujan.png` dan `aksi-senja.png`: dua lajur watak dan tiga baris wajah (ceria, fokus, risau). `scene-lapisan.png` menyediakan empat latar tanpa watak. Badan bergerak secara individu, bibir bertukar bingkai ketika dialog dan wajah bertukar mengikut konflik cerita. Barang yang dipegang bergerak bersama pose; klik bahan atau kotak mencetuskan reaksi. Lapisan meja/kotak depan menggabungkan watak ke dalam scene. [Prompt penuh aset animasi](PROMPT-ANIMASI.md).

## Eksperimen sprite terdahulu

Aset berikut disimpan sebagai rujukan versi terdahulu, tetapi tidak dimuatkan atau digunakan dalam versi scene penuh:

| Fail baharu | Prompt akhir / spesifikasi |
| --- | --- |
| assets/mira-sprite.png | Preserve Mira's exact face, white hijab, Malaysian white school blouse and green school badge from the approved reference. Standalone anime visual novel sprite, head to mid-thigh, facing slightly right, friendly open-mouth speaking smile, one hand in conversational gesture. Full head and hands inside portrait frame with small transparent margins. Only Mira, no props, desk, environment, text or other character. Genuinely transparent background and clean alpha edges. |
| assets/hakim-sprite.png | Preserve Hakim's exact face, tousled dark brown hair, white Malaysian school shirt, green tie and green school badge from the approved reference. Standalone anime visual novel sprite, head to mid-thigh, facing slightly left, thoughtful friendly speaking smile, one hand gesturing lightly. Full head and hands inside portrait frame. Only Hakim, no notebook, desk, environment, text or other character. Genuinely transparent background and clean alpha edges. |
| assets/latar-atlas.png | Warm detailed anime illustration style matching reference. One square background atlas, exactly four equal square panels in a precise 2 by 2 grid with no borders, labels, gaps or text. No people. Top left: Malaysian classroom after school with golden window light, desks, chalkboard and Malaysian flag. Top right: school preparation kitchen in morning with covered sandwich containers, lemon drink jug and ingredients. Bottom left: empty school carnival booth canopy during heavy rain, wet courtyard and school hall behind. Bottom right: same carnival at sunset after rain with boxes and covered containers. Eye-level viewpoint and clear middle areas for separately composited character sprites. Each quadrant independently usable. |

Sprite PNG mempunyai alpha telus. Dalam eksperimen terdahulu, watak disusun di depan latar secara berasingan dan diberi gerakan ringan. Pengguna memilih semula ilustrasi lengkap kerana mahu aksi penyediaan bahan dan emosi asal kelihatan bersama scene.

## Variasi emosi

Empat variasi tambahan menggunakan imagegen terbina dalam dengan sprite masing-masing sebagai sasaran edit. Gambar hujan asal yang dirujuk pengguna menjadi rujukan emosi untuk wajah risau. Sprite ceria asal dikekalkan.

| Fail | Ekspresi |
| --- | --- |
| assets/mira-risau.png | Kening naik di tengah, mata cemas, mulut terbuka kecil tanpa senyuman, titisan peluh dan tangan tegang dekat dada. |
| assets/hakim-risau.png | Kening berkerut, mata terkejut, mulut cemas tanpa senyuman dan titisan peluh. |
| assets/mira-fokus.png | Mata memberi perhatian, kening sedikit turun, mulut tertutup dan wajah tekun. |
| assets/hakim-fokus.png | Mata tertumpu pada perbincangan, kening sedikit turun, mulut tertutup dan wajah sedang berfikir. |

Identiti, pakaian, saiz kepala dan kedudukan dalam kanvas dikekalkan supaya pertukaran ekspresi tidak mengganggu komposisi. [Prompt penuh variasi emosi](PROMPT-EMOSI.md).
