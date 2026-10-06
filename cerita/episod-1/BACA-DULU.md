# Misi Karnival — Janji Kelas Kita

Satu episod visual novel untuk pelajar SPM Ekonomi Tingkatan 4, dengan dialog santai Manglish. Kamu, Mira dan Hakim mengurus booth karnival untuk membeli buku sudut bacaan kelas.

## Cara main

Ekstrak semua fail daripada ZIP ke satu folder. Buka `index.html` dalam browser. Kekalkan folder `assets` bersama fail yang lain. Episod boleh dimainkan tanpa internet; pautan sumber memerlukan internet.

Klik **Mulakan cerita**, kemudian klik dialog atau **Seterusnya**. Apabila pilihan muncul, pilih tindakan kamu. Menu boleh menukar dialog kepada paparan terus penuh. Kemajuan disimpan pada browser yang sama apabila penyimpanan tempatan tersedia.

Empat scene berlapis mengekalkan aksi daripada ilustrasi yang diluluskan: Mira menunjukkan lakaran di kelas, menyediakan sandwich bersama Hakim, menjaga stok ketika hujan, dan mengemas booth pada waktu senja. Watak memegang bahan dan barang yang sesuai dengan scene. Kamera memberi fokus mengikut penutur; ilustrasi mengisi skrin. Butang **⛶** membuka mod skrin penuh apabila browser menyokongnya.

Klik **Jelajah scene** untuk menyembunyikan dialog cerita dan melihat gambar dengan lebih jelas. Klik bulatan pada lakaran, bahan, buku kira-kira, jug atau bekas untuk respons watak. **Lihat keseluruhan** memaparkan seluruh ilustrasi; anak panah mengalih kamera apabila gambar lebih lebar daripada skrin. **Kembali ke cerita** menyambung pada baris yang sama. Interaksi penerokaan tidak membelanjakan dana atau memilih tindakan bagi pihak pemain. Semakan stok pada scene senja menggunakan baki sebenar daripada keputusan kamu.

Mira dan Hakim mempunyai gerakan 2D masing-masing: gerakan badan ketika bercakap, pernafasan semasa menunggu, mulut bertukar bingkai semasa dialog, serta reaksi apabila objek diklik. Wajah bertukar antara ceria, fokus dan risau mengikut dialog serta keputusan. Aksi tangan dan barang di tangan berada bersama badan watak. Gerakan boleh dimatikan dalam Menu dan menghormati tetapan kurangkan gerakan pada peranti.

Apabila dialog **Kamu** muncul atau butang pilihan tersedia, Mira dan Hakim memandang terus ke arah player dan menjadi sedikit malap. Emosi, pose dan barang di tangan dikekalkan. Warna dan pandangan asal pulih apabila dialog kembali kepada watak. Empat variasi pandangan dibuat menggunakan imagegen; prompt penuh dalam `PROMPT-PANDANGAN-PLAYER.md`. Pembukaan bermula dengan Mira: “OK Hakim, berapa bajet kita untuk booth kita esok?”

Enam keputusan membawa kepada empat jenis ending. Dialog pilihan selesai dahulu sebelum butang pilihan muncul. Peralihan tempat menunjukkan lokasi dan masa; bahagian jualan menghubungkan promosi dengan kiraan petang. Dana akhir, stok, reaksi watak dan dialog bergantung pada pilihan. **Jejak keputusan** pada ending memaparkan pilihan kamu dan kiraan hasil. **Nota Bab 1** boleh dibuka pada bila-bila masa.

Tekan **Dana Kelas** untuk membuka **PKK (Penyata Kedudukan Kewangan)**. Tunai, stok, liabiliti dan dana kelas dikemas kini mengikut keputusan. Stok dinilai pada kos bahan semasa persediaan; baki tidak terjual dinilai RM0 pada penutup mengikut model simulasi satu hari. Kutipan jualan disahkan pada kiraan petang. Peralatan dipinjam atau disewa, jadi bukan aset milik kelas.

`skrip-voice-over.md` mengandungi skrip penuh, semua cabang dialog, dialog penerokaan dan ending. Bahagian angka penutup ditandakan sebagai token. Rakaman suara belum dimasukkan dalam prototaip ini.

## Kaitan pembelajaran

Cerita menumpukan kekurangan, pilihan, kos lepas, faktor pengeluaran, had pengeluaran, empat masalah asas ekonomi serta amanah. Nota tambahan turut merangkumi sistem ekonomi. Cerita berlangsung pada satu karnival dan bukan pengganti keseluruhan nota Bab 1.

Sumber: [ECON-TUTOR — Bab 1 Tingkatan 4](https://github.com/AidilFarhan/ECON-TUTOR/blob/main/assets/js/data/t4-bab1.js).

Semua watak, dialog, harga, kapasiti dan kadar jualan ialah cadangan / nilai contoh. Model booth menggunakan kos lepas malar; nota membezakan model ini daripada contoh KKP dengan kos lepas semakin meningkat dalam sumber.

## Semakan

324 kombinasi keputusan telah diperiksa hingga tamat: dana seimbang, tiada wang negatif, jualan dan bantuan tidak melebihi stok, serta semua empat ending dapat dicapai. Satu laluan dimainkan hingga ending dalam browser; simpan/sambung, nota, menu dan pilihan pada telefon turut diperiksa.

Empat ilustrasi asal dan aset baharu dihasilkan menggunakan imagegen berdasarkan draf visual yang diluluskan. Versi animasi menggunakan empat helaian aksi watak dan satu atlas latar; prompt disimpan dalam `PROMPT-ANIMASI.md`. Aset eksperimen berdiri terdahulu disimpan sebagai rujukan. Pertukaran wajah, gerakan bercakap, respons bahan dan satu laluan hingga ending diperiksa dalam browser. Episod ini ialah prototaip tempatan; belum diterbitkan ke laman ECON-TUTOR.
