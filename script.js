// 1. Fungsi Tab Interaktif
function switchTab(evt, sectionId) {
    let buttons = document.getElementsByClassName("nav-tab-btn");
    for (let btn of buttons) {
        btn.classList.remove("active");
    }

    let contents = document.getElementsByClassName("tab-content");
    for (let content of contents) {
        content.classList.remove("active-content");
    }

    evt.currentTarget.classList.add("active");
    document.getElementById(sectionId).classList.add("active-content");
}

// Data produk lengkap (Judul, Jumlah Terjual, dan Foto) untuk setiap tombol
const productsData = [
    {
        title: "Advance Server Level 3 (Multi-Region)",
        sold: "150+",
        image: "fotoproduk1.jpg"
    },
    {
        title: "Advance Server Level 3 (Indonesia Server)",
        sold: "320+",
        image: "fotoproduk2.jpg"
    }
];

// 2. Fungsi Bottom Sheet & Dinamis Data Produk
document.addEventListener("DOMContentLoaded", function () {
    const bottomSheet = document.getElementById("productBottomSheet");
    const cartButtons = document.querySelectorAll(".cart-btn");
    
    // Ambil elemen penampil di dalam bottom sheet
    const sheetProductImg = document.getElementById("sheetProductImg");
    const sheetProductTitle = document.getElementById("sheetProductTitle");
    const sheetProductSold = document.getElementById("sheetProductSold");

    cartButtons.forEach((btn, index) => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();

            // Ambil data berdasarkan urutan tombol produk yang diklik
            const currentData = productsData[index] || productsData[0];

            // Masukkan data secara dinamis ke dalam bottom sheet
            if (sheetProductImg) sheetProductImg.src = currentData.image;
            if (sheetProductTitle) sheetProductTitle.textContent = currentData.title;
            if (sheetProductSold) sheetProductSold.textContent = currentData.sold;

            // Tampilkan bottom sheet
            if (bottomSheet) {
                bottomSheet.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    window.addEventListener("click", function (e) {
        if (e.target === bottomSheet) {
            bottomSheet.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});
