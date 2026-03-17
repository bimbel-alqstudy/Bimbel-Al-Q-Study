// ===== AMBIL PARAMETER KELAS =====
const params = new URLSearchParams(window.location.search);
const kelasAktif = parseInt(params.get("kelas"));
console.log("kelasAktif =", kelasAktif);

// ===== ELEMEN DOM =====
const judulKelas = document.getElementById("judulKelas");


// ===== INIT TEKS HALAMAN =====
judulKelas.textContent = kelasAktif ? `Sekolah Dasar (SD) Kelas ${kelasAktif}` : "Kelas";

