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
    
    const sliderTrack = document.getElementById("sheetSliderTrack");
    const sliderDots = document.getElementById("sheetSliderDots");

    // Data khusus foto produk (Produk 1 = 2 slide, Produk 2 = 3 slide)
    const productsData = [
        {
            images: ["produk_sbg.jpg", "produk_slide2.jpg"]
        },
        {
            images: ["produk_sbg.jpg", "produk_slide2.jpg", "produk_slide3.jpg"]
        }
    ];

    let currentSlide = 0;

    cartButtons.forEach((btn, index) => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            
            const data = productsData[index] || productsData[0];
            currentSlide = 0;

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
                sliderTrack.style.transform = `translateX(0px)`;
            }

            if (bottomSheet) {
                bottomSheet.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Logika Geser (Touch) yang stabil
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    if (sliderTrack) {
        sliderTrack.addEventListener("touchstart", function (e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        sliderTrack.addEventListener("touchmove", function (e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });

        sliderTrack.addEventListener("touchend", function () {
            if (!isDragging) return;
            isDragging = false;

            const diffX = startX - currentX;
            const slideCount = sliderTrack.children.length;

            if (diffX > 50 && currentSlide < slideCount - 1) {
                currentSlide++;
            } else if (diffX < -50 && currentSlide > 0) {
                currentSlide--;
            }

            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            if (sliderDots) {
                const dots = sliderDots.querySelectorAll(".dot");
                dots.forEach((dot, idx) => {
                    if (idx === currentSlide) {
                        dot.classList.add("active");
                    } else {
                        dot.classList.remove("active");
                    }
                });
            }
        });
    }

    window.addEventListener("click", function (e) {
        if (e.target === bottomSheet) {
            bottomSheet.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});
