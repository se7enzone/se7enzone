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

// --- Logika Interaksi Bottom Sheet SE7ENZONE (Dengan Kunci Layar & Blur) ---
const cartBtn = document.querySelector('.cart-btn');
const bottomSheet = document.getElementById('bottomSheet');

if (cartBtn && bottomSheet) {
    // Ketika tombol plus (+) diklik, tampilkan bottom sheet & kunci layar belakang
    cartBtn.addEventListener('click', function() {
        bottomSheet.classList.add('active');
        document.body.style.overflow = 'hidden'; // Mengunci layar agar tidak bisa di-scroll
    });

    // Fungsi untuk menutup bottom sheet & membuka kembali kunci layar
    function tutupBottomSheet() {
        bottomSheet.classList.remove('active');
        document.body.style.overflow = ''; // Mengembalikan fungsi scroll halaman
    }

    // Ketika area gelap/blur di luar panel diklik, tutup bottom sheet
    bottomSheet.addEventListener('click', function(e) {
        if (e.target === bottomSheet) {
            tutupBottomSheet();
        }
    });
}

