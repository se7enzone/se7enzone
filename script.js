// Fungsi untuk Mengganti Tab Interaktif (Pilihan Produk & Cara Order)
function switchTab(evt, sectionId) {
    // 1. Ambil semua tombol tab dan hapus kelas 'active'
    let buttons = document.getElementsByClassName("nav-tab-btn");
    for (let btn of buttons) {
        btn.classList.remove("active");
    }

    // 2. Ambil semua konten tab dan sembunyikan
    let contents = document.getElementsByClassName("tab-content");
    for (let content of contents) {
        content.classList.remove("active-content");
    }

    // 3. Tambahkan kelas 'active' ke tombol yang sedang diklik
    evt.currentTarget.classList.add("active");

    // 4. Munculkan konten yang sesuai dengan tombol yang ditekan
    document.getElementById(sectionId).classList.add("active-content");
}

