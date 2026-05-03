# Chelatama Bojongsari - Content Management System (CMS)

Website ini menggunakan **Decap CMS** untuk pengelolaan konten secara visual dan dinamis.

## Panduan Penggunaan Lokal (Staging/Trial)

Jika Anda ingin melakukan perubahan konten di komputer lokal sebelum mempublikasikannya ke GitHub, ikuti langkah-langkah berikut:

### 1. Prasyarat
- Pastikan Anda sudah menginstall **Node.js** (Versi LTS direkomendasikan) dari [nodejs.org](https://nodejs.org/).

### 2. Menjalankan Proxy Server CMS
CMS memerlukan jembatan (proxy) agar bisa menyimpan perubahan langsung ke folder `data/` Anda saat dijalankan secara lokal.
- Buka Terminal/PowerShell di folder proyek `1C`.
- Jalankan perintah:
  ```bash
  npx decap-cms-proxy-server
  ```
- Biarkan terminal tersebut tetap terbuka.

### 3. Akses Admin Panel
- Buka browser dan jalankan file `index.html` menggunakan Live Server (atau akses melalui `http://localhost:port/admin/index.html`).
- Anda sekarang bisa mengedit Judul Hero, Blog, Produk, dan Media Sosial secara visual.

## Panduan Penggunaan Live (GitHub)

Setelah Anda mempublikasikan website ke GitHub:
1. Akses `https://chelatamabojongsari.github.io/sites/admin/` (sesuaikan dengan URL GitHub Pages Anda).
2. Anda akan diminta login menggunakan akun GitHub Anda.
3. Perubahan yang Anda simpan di sana akan langsung membuat **Commit** baru di repositori GitHub Anda secara otomatis.

---

**PENTING**: Jangan menghapus folder `data/` karena folder tersebut adalah sumber utama konten yang ditampilkan di halaman depan website.
