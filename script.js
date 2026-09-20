// Hitung Mundur (Countdown Timer) Flash Sale
function startFlashSaleTimer() {
    // Waktu target (misal: 3 jam dari sekarang)
    let totalSeconds = 3 * 3600 + 45 * 60 + 30;

    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (!hoursElement || !minutesElement || !secondsElement) return;

    const timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            return;
        }

        totalSeconds--;

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }, 1000);
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", startFlashSaleTimer);
