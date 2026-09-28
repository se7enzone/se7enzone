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

// Data produk lengkap (Galeri Foto, Kategori, Judul, Harga, dan Ulasan)
const productsGalleryData = [
    {
        category: "Indonesia Server",
        title: "Advance Server Level 3",
        priceCurrent: "Rp 2.500",
        priceOld: "Rp 5.000",
        rating: "4.9",
        reviewCount: "(10K+ Review)",
        images: ["slidev1.jpg", "slide2.jpg"],
        description: "Akun khusus Advance Server Mobile Legends yang sudah dilengkapi dengan dukungan akses untuk 1 server aktif di dalamnya [<b>Support Android only</b>]. Seluruh spesifikasi seperti tingkat level akun, informasi harga, serta detail tampilannya sudah disesuaikan secara langsung dengan data dan gambar produk ini. Untuk panduan atau cara ganti email akun, silahkan baca pada menu/opsi FAQ atau hubungi Admin."
    },
    {
        category: "Indonesia Server",
        title: "Advance Server Level 3",
        priceCurrent: "Rp 7.000",
        priceOld: "Rp 14.000",
        rating: "4.9",
        reviewCount: "(12K+ Review)",
        images: ["slidev2.jpg", "slide2.jpg", "slide3.jpg"],
        description: "Akun khusus Advance Server Mobile Legends yang sudah dilengkapi dengan dukungan akses untuk total 5 server aktif di dalamnya [<b>Support Android only</b>]. Seluruh spesifikasi seperti tingkat level akun, informasi harga, serta detail tampilannya sudah disesuaikan secara langsung dengan data dan gambar produk ini. Untuk panduan atau cara ganti email akun, silahkan baca pada menu/opsi FAQ atau hubungi Admin."
    }
];

// 2. Fungsi Bottom Sheet & Konten Dinamis
document.addEventListener("DOMContentLoaded", function () {
    const bottomSheet = document.getElementById("productBottomSheet");
    const cartButtons = document.querySelectorAll(".cart-btn");
    
    const sheetMainImg = document.getElementById("sheetMainImg");
    const sheetThumbnailsContainer = document.getElementById("sheetThumbnailsContainer");
    
    // Elemen teks detail produk
    const sheetProductCategory = document.getElementById("sheetProductCategory");
    const sheetProductTitle = document.getElementById("sheetProductTitle");
    const sheetPriceCurrent = document.getElementById("sheetPriceCurrent");
    const sheetPriceOld = document.getElementById("sheetPriceOld");
    const sheetRating = document.getElementById("sheetRating");
    const sheetReviewCount = document.getElementById("sheetReviewCount");
    const sheetDescription = document.getElementById("sheetDescription");

    cartButtons.forEach((btn, index) => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();

            // Ambil data berdasarkan produk yang diklik
            const productData = productsGalleryData[index] || productsGalleryData[0];
            const images = productData.images;

            // Masukkan data teks ke bottom sheet
            if (sheetProductCategory) sheetProductCategory.textContent = productData.category;
            if (sheetProductTitle) sheetProductTitle.textContent = productData.title;
            if (sheetPriceCurrent) sheetPriceCurrent.textContent = productData.priceCurrent;
            if (sheetPriceOld) sheetPriceOld.textContent = productData.priceOld;
            if (sheetRating) sheetRating.textContent = productData.rating;
            if (sheetReviewCount) sheetReviewCount.textContent = productData.reviewCount;
            if (sheetDescription) sheetDescription.innerHTML = productData.description;

            // Set foto utama ke gambar pertama
            if (sheetMainImg && images.length > 0) {
                sheetMainImg.src = images[0];
            }

            // Buat thumbnail secara dinamis
            if (sheetThumbnailsContainer) {
                sheetThumbnailsContainer.innerHTML = "";
                
                images.forEach((imgSrc, imgIndex) => {
                    const thumb = document.createElement("img");
                    thumb.src = imgSrc;
                    thumb.alt = "Thumbnail " + (imgIndex + 1);
                    thumb.className = "thumb-img";
                    
                    if (imgIndex === 0) {
                        thumb.classList.add("active");
                    }

                    // Event klik thumbnail
                    thumb.addEventListener("click", function () {
                        if (sheetMainImg) {
                            sheetMainImg.src = imgSrc;
                        }
                        const allThumbs = sheetThumbnailsContainer.querySelectorAll(".thumb-img");
                        allThumbs.forEach(t => t.classList.remove("active"));
                        thumb.classList.add("active");
                    });

                    sheetThumbnailsContainer.appendChild(thumb);
                });
            }

            // Tampilkan bottom sheet
            if (bottomSheet) {
                bottomSheet.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Tutup bottom sheet saat klik di luar area konten
    window.addEventListener("click", function (e) {
        if (e.target === bottomSheet) {
            bottomSheet.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});

