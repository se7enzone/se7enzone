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

// Data galeri foto untuk masing-masing produk
const productsGalleryData = [
    {
        // Data untuk Produk 1 (2 Foto)
        images: ["slidev1.jpg", "slide2.jpg"]
    },
    {
        // Data untuk Produk 2 (3 Foto)
        images: ["slidev2.jpg", "slide2.jpg", "slide3.jpg"]
    }
];

// 2. Fungsi Bottom Sheet & Galeri Foto Dinamis
document.addEventListener("DOMContentLoaded", function () {
    const bottomSheet = document.getElementById("productBottomSheet");
    const cartButtons = document.querySelectorAll(".cart-btn");
    
    const sheetMainImg = document.getElementById("sheetMainImg");
    const sheetThumbnailsContainer = document.getElementById("sheetThumbnailsContainer");

    cartButtons.forEach((btn, index) => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();

            // Ambil data galeri berdasarkan produk yang diklik
            const productData = productsGalleryData[index] || productsGalleryData[0];
            const images = productData.images;

            // Set foto utama ke gambar pertama
            if (sheetMainImg && images.length > 0) {
                sheetMainImg.src = images[0];
            }

            // Bersihkan dan buat thumbnail secara dinamis
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

                    // Event klik untuk mengganti foto utama dan menandai thumbnail aktif
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

