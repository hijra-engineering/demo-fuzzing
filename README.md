# Demo Fuzzing

Repository ini berisi contoh demo untuk [teknik fuzzing](https://en.wikipedia.org/wiki/Fuzzing) yang dibahas di Hijra Engineering Talk tanggal 12 Maret 2022 yang silam (tonton [rekaman videonya di YouTube](https://www.youtube.com/watch?v=JkhvqDSa2Q4)).

Yang dibutuhkan: [Node.js](https://nodejs.org/) versi 12 atau lebih baru.

Langkah pertama, pasang semua dependensi terlebih dahulu:

```
npm install
```

Lalu coba jalankan fuzzing secara manual:

```
npm run fuzz
```

Seharusnya akan tampil pesan kesalahan, karena fuzzing menemukan sebuah bug!

Silakan perbaiki dulu bug-nya (petunjuk: cari kata kunci `FIXME`).

Sesudah bug tersebut diperbaiki, kembali ulangi langkah di atas dan mestinya tidak ada pesan kesalahan lagi.

Untuk menjalankan unit tests secara lengkap, yang juga mencakup fuzzing (lihat `fuzz.spec.js`):

```
npm test
```

## Tautan terkait

* [OSS-Fuzz](https://github.com/google/oss-fuzz) continuous fuzzing for open source software
