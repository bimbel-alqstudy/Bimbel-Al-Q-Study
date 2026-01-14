const API_URL = "https://script.google.com/macros/s/AKfycbxYPhQxThs9qcs8YqqQVOw5Xrt6b7kHDeyRc9da0-iXiBLGVDJt8OtHgLUXiW2FDjJJ9w/exec";

// ===== AMBIL PARAMETER KELAS =====
const params = new URLSearchParams(window.location.search);
const kelasAktif = parseInt(params.get("kelas"));
// ===== ELEMEN DOM =====
const judulKelas = document.getElementById("judulKelas");
const breadcrumbKelas = document.getElementById("breadcrumbKelas");
const latihanList = document.getElementById("latihanList");
const paginationEl = document.getElementById("pagination");
const filterMapel = document.getElementById("filterMapel");
const searchInput = document.getElementById("searchInput");

const ITEMS_PER_PAGE = 10;

// ===== STATE =====
let DATA_LATIHAN = [];
let filteredData = [];
let currentPage = 1;

function formatTanggal(tgl) {
  return new Date(tgl).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")                 // normalisasi unicode
    .replace(/[\u0300-\u036f]/g, "")  // hapus karakter aneh
    .replace(/\s+/g, " ")             // spasi ganda → tunggal
    .trim();
}

// ===== INIT TEKS HALAMAN =====
judulKelas.textContent = kelasAktif ? `Latihan Kelas ${kelasAktif}` : "Latihan Soal";
breadcrumbKelas.textContent = kelasAktif ? `Kelas ${kelasAktif}` : "Latihan";

// ===== FETCH DATA DARI SPREADSHEET =====
fetch(API_URL)
.then(res => res.json())
.then(data => {
DATA_LATIHAN = data.map(item => ({
kelas: parseInt(item.kelas),
mapel: normalize(item.mapel),
judul: item.judul,
file: item.file,
tanggal: new Date(item.tanggal)
}));
DATA_LATIHAN.sort((a, b) => b.tanggal - a.tanggal);

initFilterMapel();
applyFilter();
})
.catch(err => {
latihanList.innerHTML = "<p class='empty'>Gagal memuat data.</p>";
console.error(err);
});

// ===== INISIALISASI FILTER MAPEL =====
// ===== RENDER LIST =====
function renderList() {
latihanList.innerHTML = "";


if (filteredData.length === 0) {
latihanList.innerHTML = "<p class='empty'>Latihan tidak ditemukan.</p>";
return;
}


const start = (currentPage - 1) * ITEMS_PER_PAGE;
const end = start + ITEMS_PER_PAGE;
const pageItems = filteredData.slice(start, end);


pageItems.forEach(item => {
const a = document.createElement("a");
a.href = item.file;
a.target = "_blank";
a.className = "latihan-item";
a.innerHTML = `
<img src="gambar/pdf.png" class="pdf-icon" alt="PDF">
<div class="latihan-info">
<h3>${item.judul}</h3>
<span class="mapel">${item.mapel}</span>
</div>
`;
latihanList.appendChild(a);
});
}


// ===== PAGINATION =====
function renderPagination() {
paginationEl.innerHTML = "";


const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
if (totalPages <= 1) return;


const prev = document.createElement("button");
prev.textContent = "‹";
prev.disabled = currentPage === 1;
prev.onclick = () => { currentPage--; render(); };
paginationEl.appendChild(prev);


for (let i = 1; i <= totalPages; i++) {
const btn = document.createElement("button");
btn.textContent = i;
if (i === currentPage) btn.classList.add("active");
btn.onclick = () => { currentPage = i; render(); };
paginationEl.appendChild(btn);
}


const next = document.createElement("button");
next.textContent = "›";
next.disabled = currentPage === totalPages;
next.onclick = () => { currentPage++; render(); };
paginationEl.appendChild(next);
}
