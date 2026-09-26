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

// 2. Fungsi Bottom Sheet & Produk
document.addEventListener("DOMContentLoaded", function () {
    const bottomSheet = document.getElementById("productBottomSheet");
    const cartButtons = document.querySelectorAll(".cart-btn");
    const sheetProductImg = document.getElementById("sheetProductImg");

    // Dibuat ke bawah agar tidak terpotong di layar HP
    const productImages = [
        "fotoproduk1.jpg",
        "fotoproduk2.jpg"
    ];

    cartButtons.forEach((btn, index) => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();

            if (sheetProductImg) {
                sheetProductImg.src = productImages[index] || "fotoproduk1.jpg";
            }

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

