// ===== AMBIL PARAMETER KELAS =====
const params = new URLSearchParams(window.location.search);
const kelasAktif = parseInt(params.get("kelas"));

// ===== ELEMEN DOM =====
const judulKelas = document.getElementById("judulKelas");
const deskripsiKelas = document.getElementById("deskripsiKelas");
const materiKelas = document.getElementById("materiKelas");
const latihanKelas = document.getElementById("latihanKelas");
const tryoutKelas = document.getElementById("tryoutKelas");

function getJenjang(kelas) {
  if (kelas >= 1 && kelas <= 6) return "SD";
  if (kelas >= 7 && kelas <= 9) return "SMP";
  if (kelas >= 10 && kelas <= 12) return "SMA";
  return "";
}
// ===== INIT TEKS HALAMAN =====
judulKelas.textContent = kelasAktif ? `Kelas ${kelasAktif}` : "Kelas";
deskripsiKelas.textContent = kelasAktif ? `Kumpulan materi pelajaran, bank soal, dan latihan online untuk kelas ${kelasAktif}.` : "Kumpulan materi pelajaran, bank soal, dan latihan online.";
materiKelas.textContent = kelasAktif ? `Kumpulan materi pelajaran untuk kelas ${kelasAktif}` : "Kumpulan materi pelajaran";
latihanKelas.textContent = kelasAktif ? `Bank soal untuk kelas ${kelasAktif}` : "Bank soal";
tryoutKelas.textContent = kelasAktif ? `Latihan online untuk kelas ${kelasAktif}` : "Latihan online";
document.getElementById("matericard").href = `latihan.html?kelas=${kelasAktif}&type=materi`;
document.getElementById("latihancard").href = `latihan.html?kelas=${kelasAktif}&type=latihan`;
document.getElementById("tryoutcard").href = `latihan.html?kelas=${kelasAktif}&type=tryout`;
document.addEventListener("DOMContentLoaded", () => {
const jenjang = getJenjang(kelasAktif);
  renderBreadcrumb([
    { label: "Beranda", link: "index.html" },
    { label: jenjang, link:`jenjang.html`},
    { label: `kelas ${kelasAktif}`},
  ]);
});
