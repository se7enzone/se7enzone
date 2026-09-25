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

// --- Logika Interaktif Bottom Sheet SE7ENZONE (Dinamis & Kunci Layar) ---
const bottomSheet = document.getElementById('bottomSheet');
const sheetProductImg = document.getElementById('sheetProductImg');
const sheetProductTitle = document.getElementById('sheetProductTitle');
const sheetProductRegion = document.getElementById('sheetProductRegion');
const sheetProductPrice = document.getElementById('sheetProductPrice');

// Fungsi untuk membuka bottom sheet dengan data produk
function openBottomSheet(productData) {
    sheetProductImg.src = productData.img;
    sheetProductTitle.textContent = productData.title;
    sheetProductRegion.textContent = productData.region;
    sheetProductPrice.textContent = productData.price;
    
    bottomSheet.classList.add('active');
    document.body.style.overflow = 'hidden'; // Mengunci layar agar tidak bisa di-scroll
}

// Fungsi untuk menutup bottom sheet
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

// Menghubungkan setiap tombol (+) pada card produk
const cartButtons = document.querySelectorAll('.cart-btn');

cartButtons.forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Data sementara sesuai produk yang ditekan (bisa disesuaikan nanti)
        let sampleProduct = {
            img: index === 0 ? "produk_sbg.jpg" : "produk_sbg.jpg", // Sesuaikan path gambar
            title: index === 0 ? "Advance Server Level 3" : "Server Edisi Spesial",
            region: "Indonesia Server / Android Only",
            price: index === 0 ? "Rp 7.000" : "Rp 15.000"
        };
        
        openBottomSheet(sampleProduct);
    });
});


