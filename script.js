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
    
        // Ambil elemen wadah gambar tunggal di dalam bottom sheet
    const sheetProductImg = document.getElementById('sheetProductImg');

    // Data nama file foto tunggal untuk masing-masing produk (indeks 0 untuk produk 1, indeks 1 untuk produk 2)
    const productImages = ["fotoproduk1.jpg", "fotoproduk2.jpg"];

    cartButtons.forEach((btn, index) => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();

            // Masukkan file foto yang sesuai berdasarkan tombol produk yang diklik
            if (sheetProductImg) {
                sheetProductImg.src = productImages[index] || "fotoproduk1.jpg";
            }

            // Tampilkan bottom sheet
            if (bottomSheet) {
                bottomSheet.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
