// ===== AMBIL PARAMETER KELAS =====
const params = new URLSearchParams(window.location.search);
const kelasAktif = parseInt(params.get("kelas"));

// ===== ELEMEN DOM =====
const judulKelas = document.getElementById("judulKelas");
const deskripsiKelas = document.getElementById("deskripsiKelas");
const materiKelas = document.getElementById("materiKelas");
const latihanKelas = document.getElementById("latihanKelas");
const tryoutKelas = document.getElementById("tryoutKelas");


// ===== INIT TEKS HALAMAN =====
judulKelas.textContent = kelasAktif ? `Kelas ${kelasAktif}` : "Kelas";
deskripsiKelas.textContent = kelasAktif ? `Kumpulan materi pelajaran, bank soal, dan latihan online untuk kelas ${kelasAktif}.` : "Kumpulan materi pelajaran, bank soal, dan latihan online.";
materiKelas.textContent = kelasAktif ? `Kumpulan materi pelajaran untuk kelas ${kelasAktif}` : "Kumpulan materi pelajaran";
latihanKelas.textContent = kelasAktif ? `Bank soal untuk kelas ${kelasAktif}` : "Bank soal";
tryoutKelas.textContent = kelasAktif ? `Latihan online untuk kelas ${kelasAktif}` : "Latihan online";

