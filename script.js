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

// --- Logika Interaksi Bottom Sheet SE7ENZONE ---
const cartBtn = document.querySelector('.cart-btn');
const bottomSheet = document.getElementById('bottomSheet');

// Ketika tombol plus (+) diklik, tampilkan bottom sheet
if (cartBtn && bottomSheet) {
    cartBtn.addEventListener('click', function() {
        bottomSheet.classList.add('active');
    });

    // Ketika area gelap di luar panel diklik, tutup bottom sheet kembali
    bottomSheet.addEventListener('click', function(e) {
        if (e.target === bottomSheet) {
            bottomSheet.classList.remove('active');
        }
    });
}
