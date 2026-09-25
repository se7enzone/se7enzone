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

// --- LANGKAH 8: Logika Tombol Cart & Slider Dinamis (2 Slide vs 3 Slide) ---
const bottomSheet = document.getElementById('productBottomSheet');
const cartButtons = document.querySelectorAll('.cart-btn');
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');

// Ambil semua tombol (+) di halaman
cartButtons.forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const card = btn.closest('.product-card');
        if (card) {
            const imgEl = card.querySelector('img');
            const imgSrc = imgEl ? imgEl.src : '';
            
            // Tentukan jumlah slide: Produk 1 (index 0) = 2 slide, Produk 2 (index 1) = 3 slide
            let totalSlides = (index === 0) ? 2 : 3;
            
            // Kosongkan wadah slider & dots sebelumnya
            if (sliderTrack) sliderTrack.innerHTML = '';
            if (sliderDots) sliderDots.innerHTML = '';
            
            // Buat slide gambar dan titik dots secara otomatis
            for (let i = 0; i < totalSlides; i++) {
                // Buat elemen slide
                const slideDiv = document.createElement('div');
                slideDiv.className = 'sheet-slide';
                slideDiv.innerHTML = `<img src="${imgSrc}" alt="Slide ${i + 1}">`;
                sliderTrack.appendChild(slideDiv);
                
                // Buat titik dot indikator
                const dotSpan = document.createElement('span');
                dotSpan.className = `dot ${i === 0 ? 'active' : ''}`;
                sliderDots.appendChild(dotSpan);
            }
            
            // Atur lebar track slider menyesuaikan jumlah slide
            if (sliderTrack) {
                sliderTrack.style.width = `${totalSlides * 100}%`;
            }
            
            // Munculkan bottom sheet
            if (bottomSheet) {
                bottomSheet.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });
});

// Tutup bottom sheet jika area gelap di luar panel diklik
if (bottomSheet) {
    bottomSheet.addEventListener('click', function(e) {
        if (e.target === bottomSheet) {
            bottomSheet.classList.remove('active');
            document.body.style.overflow = ''; // Mengembalikan fungsi scroll layar
        }
    });
}

// --- LANGKAH 4: Fitur Geser ke Bawah (Swipe Down) untuk Menutup ---
let startY = 0;
let currentY = 0;
let isDragging = false;

const sheetContent = bottomSheet.querySelector('.bottom-sheet-content');

if (sheetContent) {
    // Saat jari mulai menyentuh area sheet
    sheetContent.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        isDragging = true;
    });

    // Saat jari digeser ke bawah
    sheetContent.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        let diffY = currentY - startY;

        // Jika digeser ke bawah (nilai positif), ikuti gerakan jari
        if (diffY > 0) {
            sheetContent.style.transform = `translateY(${diffY}px)`;
            sheetContent.style.transition = 'none'; // Matikan transisi agar responsif mengikuti jari
        }
    });

    // Saat jari dilepaskan dari layar
    sheetContent.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        
        let diffY = currentY - startY;
        sheetContent.style.transition = 'transform 0.3s cubic-bezier(0.1, 0.9, 0.1, 1)'; // Nyalakan kembali animasinya

        // Jika geseran ke bawah lebih dari 100 piksel, tutup bottom sheet
        if (diffY > 100) {
            bottomSheet.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Kembalikan posisi sheet ke asal jika tidak jadi ditutup
        sheetContent.style.transform = 'translateY(0)';
    });
}

