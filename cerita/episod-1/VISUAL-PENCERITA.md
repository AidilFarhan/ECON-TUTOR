# Visual aksi Pencerita

Setiap baris Pencerita utama mempunyai gambar close-up yang muncul automatik semasa baris itu dipaparkan. Latar dan watak dimalapkan di belakang gambar. Dialog dan butang Seterusnya kekal boleh digunakan; tiada popup yang perlu ditutup. Gambar hilang apabila dialog watak atau giliran pemain bermula. Jelajah scene menyembunyikan gambar sementara.

`narasi.js` memadankan node, indeks baris dan keadaan pasukan kepada gambar dalam `assets/narasi/`. Semua 324 laluan telah disemak: 22 gambar aksi berbeza digunakan untuk narasi, dengan satu gambar susulan tambahan pada baris terakhir. Baki panel ialah bahan rujukan. Angka harga dan stok ditambah oleh permainan mengikut laluan sebenar; gambar ialah ilustrasi aksi dan bukan kiraan inventori tepat.

- Pelan sandwich: close-up poster dengan animasi SVG bulatan pen merah.
- Pelan air: lakaran cawan dan buku kira-kira.
- Pelan campur: tiga tangan menyatukan pelan.
- Persediaan: alat tiba, pembantu, salad, bekas diisi dan stok dibawa ke booth.
- Hujan: stok dilindungi, berpindah, laluan sunyi atau bantuan penganjur.
- Jualan: syiling pelanggan, kad promosi, pembelian, pelanggan berundur atau bantuan.
- Semasa Mira hendak menggantung kad promosi, Hakim hanya mengangkat tapak tangan sebagai isyarat berhenti. Tiada sentuhan antara Hakim dan Mira; kekalkan batas ini dalam gambar dan animasi seterusnya.
- Penutup: stok dikemas, lakaran dilipat; selepas 3.6 saat gambar beralih ke kotak terakhir yang diangkat bersama-sama.

Ilustrasi mempunyai gerakan masuk dan kamera mendekat perlahan. Ini bukan rakaman video atau animasi tangan lengkap. Bulatan merah ialah gerakan lukisan sebenar pada lapisan grafik. Tetapan Gerakan: dimatikan dan prefers-reduced-motion mengekalkan visual, dengan bulatan siap tanpa gerakan.

Skrip penuh voice-over memaparkan gambar di bawah setiap baris Pencerita, termasuk semua cabang. `poster-dibulatkan.png` ialah pratonton bulatan siap untuk skrip; permainan menggunakan `poster.jpg` tanpa bulatan dan melukis bulatan di atasnya.

Panel storyboard asal dan prompt dijana dengan alat imagegen terbina dalam; lihat `PROMPT-VISUAL-PENCERITA.md`. Aset akhir disimpan dalam pakej episod, tanpa permintaan gambar luar ketika bermain.

Semakan: jalankan `node semak-narasi.cjs` dari folder serahan Claude. Semak juga dialog, pilihan, penutup, Jelajah scene dan saiz telefon dalam browser selepas integrasi.
