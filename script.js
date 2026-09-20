// Hitung Mundur (Countdown Timer) Flash Sale dengan Anti-Reset (localStorage)
function startFlashSaleTimer() {
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (!hoursElement || !minutesElement || !secondsElement) return;

    // Tentukan durasi flash sale (misal: 3 jam 45 menit 30 detik dalam detik)
    const durationInSeconds = 3 * 3600 + 45 * 60 + 30;
    
    // Cek apakah waktu target sudah pernah disimpan di localStorage browser
    let targetTime = localStorage.getItem("se7enzone_flash_end_time");
    
    // Jika belum ada atau waktu sebelumnya sudah habis, buat target waktu baru dari sekarang
    if (!targetTime || Date.now() > parseInt(targetTime)) {
        targetTime = Date.now() + (durationInSeconds * 1000);
        localStorage.setItem("se7enzone_flash_end_time", targetTime);
    }

    const timerInterval = setInterval(() => {
        const now = Date.now();
        const remainingTime = parseInt(targetTime) - now;

        if (remainingTime <= 0) {
            // Jika waktu habis
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            clearInterval(timerInterval);
            return;
        }

        // Hitung sisa jam, menit, dan detik
        const totalSeconds = Math.floor(remainingTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Tampilkan ke elemen HTML dengan format 2 digit
        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }, 1000);
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", startFlashSaleTimer);

