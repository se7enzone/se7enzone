// Script Flash Sale Timer Anti-Reset dengan localStorage
document.addEventListener("DOMContentLoaded", function () {
    const hoursElem = document.getElementById("hours");
    const minutesElem = document.getElementById("minutes");
    const secondsElem = document.getElementById("seconds");

    // Jika elemen timer tidak ditemukan di halaman, hentikan script
    if (!hoursElem || !minutesElem || !secondsElem) return;

    // Tentukan durasi countdown (misal: 3 jam dari pertama kali dibuka)
    const countdownDuration = 3 * 60 * 60 * 1000; // 3 jam dalam milidetik
    
    // Cek apakah target waktu sudah tersimpan di localStorage
    let targetTime = localStorage.getItem("flashSaleTargetTime");

    if (!targetTime) {
        // Jika belum ada, buat waktu target baru dari sekarang dan simpan
        targetTime = new Date().getTime() + countdownDuration;
        localStorage.setItem("flashSaleTargetTime", targetTime);
    } else {
        targetTime = parseInt(targetTime, 10);
    }

    function updateTimer() {
        const now = new Date().getTime();
        let timeLeft = targetTime - now;

        // Jika waktu habis, reset ulang durasinya (opsional, agar terus berputar)
        if (timeLeft <= 0) {
            targetTime = new Date().getTime() + countdownDuration;
            localStorage.setItem("flashSaleTargetTime", targetTime);
            timeLeft = targetTime - now;
        }

        // Hitung jam, menit, detik
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Tampilkan ke dalam elemen HTML dengan format 2 digit (misal: 03, 09)
        hoursElem.textContent = String(hours).padStart(2, '0');
        minutesElem.textContent = String(minutes).padStart(2, '0');
        secondsElem.textContent = String(seconds).padStart(2, '0');
    }

    // Jalankan pertama kali agar tidak ada jeda 1 detik
    updateTimer();

    // Jalankan setiap 1 detik
    setInterval(updateTimer, 1000);
});

