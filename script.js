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
    const sliderTrack = document.getElementById("sheetSliderTrack");
    const sliderDots = document.getElementById("sheetSliderDots");

    const sheetTitle = document.getElementById("sheetTitle");
    const sheetPrice = document.getElementById("sheetPrice");
    const sheetSold = document.getElementById("sheetSold");
    const sheetDescription = document.getElementById("sheetDescription");
    const pesanSekarangBtn = document.getElementById("pesanSekarangBtn");

    // Data spesifik produk
    const productsData = [
        {
            title: "Advance Server Level 3 (Multi-Region)",
            price: "Rp 2.500",
            sold: "Terjual 120+",
            description: "Akun multi-region siap pakai, proses cepat, aman, dan bergaransi resmi dari SE7ENZONE.",
            images: ["produk_sbg.jpg", "produk_slide2.jpg"],
            whatsappUrl: "https://wa.me/628xxxxxxxxxx?text=Halo,%20saya%20pesan%20Produk%20Multi-Region"
        },
        {
            title: "Advance Server Level 3 (Indonesia Server)",
            price: "Rp 7.000",
            sold: "Terjual 250+",
            description: "Server khusus Indonesia, ping stabil, level 3 siap pakai untuk kebutuhan gaming maksimal.",
            images: ["produk_sbg.jpg", "produk_slide2.jpg", "produk_slide3.jpg"],
            whatsappUrl: "https://wa.me/628xxxxxxxxxx?text=Halo,%20saya%20pesan%20Produk%20Indonesia%20Server"
        }
    ];

    const cartButtons = document.querySelectorAll(".cart-btn");

    cartButtons.forEach((btn, index) => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            const data = productsData[index] || productsData[0];

            if (sheetTitle) sheetTitle.textContent = data.title;
            if (sheetPrice) sheetPrice.textContent = data.price;
            if (sheetSold) sheetSold.textContent = data.sold;
            if (sheetDescription) sheetDescription.textContent = data.description;
            if (pesanSekarangBtn) pesanSekarangBtn.href = data.whatsappUrl;

            if (sliderTrack) sliderTrack.innerHTML = "";
            if (sliderDots) sliderDots.innerHTML = "";

            data.images.forEach((imgSrc, i) => {
                const slideDiv = document.createElement("div");
                slideDiv.className = "sheet-slide";
                slideDiv.innerHTML = `<img src="${imgSrc}" alt="Slide ${i + 1}">`;
                sliderTrack.appendChild(slideDiv);

                const dot = document.createElement("span");
                dot.className = `dot ${i === 0 ? "active" : ""}`;
                sliderDots.appendChild(dot);
            });

            if (sliderTrack) {
                sliderTrack.style.width = `${data.images.length * 100}%`;
            }

            if (bottomSheet) {
                bottomSheet.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Tutup jika area luar diklik
    window.addEventListener("click", function (e) {
        if (e.target === bottomSheet) {
            bottomSheet.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // --- FITUR TAMBAHAN: Swipe Down untuk Menutup dari Header ---
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    if (bottomSheet) {
        bottomSheet.addEventListener("touchstart", function (e) {
            // Hanya aktifkan drag jika menyentuh bagian atas (header/handle)
            if (e.target.closest('.sheet-handle') || e.target.closest('.sheet-details')) {
                startY = e.touches[0].clientY;
                isDragging = true;
            }
        });

        bottomSheet.addEventListener("touchmove", function (e) {
            if (!isDragging) return;
            currentY = e.touches[0].clientY;
            let diffY = currentY - startY;

            // Jika ditarik ke bawah (positif)
            if (diffY > 0) {
                bottomSheet.style.transition = "none";
                bottomSheet.style.transform = `translateY(${diffY}px)`;
            }
        });

        bottomSheet.addEventListener("touchend", function (e) {
            if (!isDragging) return;
            isDragging = false;
            let diffY = currentY - startY;

            bottomSheet.style.transition = "bottom 0.3s ease-in-out, transform 0.3s ease-in-out";
            bottomSheet.style.transform = "translateY(0)";

            // Jika ditarik ke bawah lebih dari 100px, tutup sheet
            if (diffY > 100) {
                bottomSheet.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }
});
