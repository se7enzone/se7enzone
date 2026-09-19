// Fungsi untuk mengganti status aktif pada tombol kapsul
function switchTab(clickedButton) {
    // Ambil semua tombol kapsul
    const tabs = document.querySelectorAll('.tab-pill');
    
    // Hapus kelas 'active' dari semua tombol
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Tambahkan kelas 'active' hanya ke tombol yang sedang diklik
    clickedButton.classList.add('active');
}
