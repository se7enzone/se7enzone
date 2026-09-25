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

document.addEventListener("DOMContentLoaded", function () {
    const bottomSheet = document.getElementById("productBottomSheet");
    const cartButtons = document.querySelectorAll(".cart-btn");

    // Munculkan bottom sheet saat tombol (+) diklik
    cartButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (bottomSheet) {
                bottomSheet.classList.add("active");
                document.body.style.overflow = "hidden"; // Kunci scroll layar belakang
            }
        });
    });

    // Tutup bottom sheet jika area gelap di luar diklik
    window.addEventListener("click", function (e) {
        if (e.target === bottomSheet) {
            bottomSheet.classList.remove("active");
            document.body.style.overflow = ""; // Kembalikan scroll layar
        }
    });
});
