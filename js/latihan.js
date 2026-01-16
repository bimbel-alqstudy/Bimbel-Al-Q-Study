const API_URL = "https://script.google.com/macros/s/AKfycbxYPhQxThs9qcs8YqqQVOw5Xrt6b7kHDeyRc9da0-iXiBLGVDJt8OtHgLUXiW2FDjJJ9w/exec";

// ===== AMBIL PARAMETER KELAS =====
const params = new URLSearchParams(window.location.search);
const kelasAktif = parseInt(params.get("kelas"));
console.log("kelasAktif =", kelasAktif);

// ===== ELEMEN DOM =====
const judulKelas = document.getElementById("judulKelas");
const latihanList = document.getElementById("latihanList");
const paginationEl = document.getElementById("pagination");
const filterMapel = document.getElementById("filterMapel");
const searchInput = document.getElementById("searchInput");

const ITEMS_PER_PAGE = 10;

// ===== STATE =====
let DATA_LATIHAN = [];
let filteredData = [];
let currentPage = 1;
let searchQuery = "";

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

// ===== FETCH DATA DARI SPREADSHEET =====
fetch(API_URL)
.then(res => res.json())
.then(data => {
console.log("DATA RAW DARI API:");
console.table(data);

DATA_LATIHAN = data.map(item => ({
kelas: parseInt(item.kelas),
mapel: normalize(item.mapel),
mapelLabel: item.mapel,
judul: item.judul,
judulNorm: normalize(item.judul),
file: item.file,
tanggal: new Date(item.tanggal)
}));
console.log("DATA SETELAH DIPARSE:");
console.table(DATA_LATIHAN);

DATA_LATIHAN.sort((a, b) => b.tanggal - a.tanggal);

initFilterMapel();
applyAllFilters();
})
.catch(err => {
latihanList.innerHTML = "<p class='empty'>Gagal memuat data.</p>";
console.error(err);
});

// ===== INISIALISASI FILTER MAPEL =====
function initFilterMapel() {
  const mapelMap = new Map();

  DATA_LATIHAN.forEach(item => {
    if (item.kelas === kelasAktif) {
      mapelMap.set(
        item.mapel,        // normalized (value)
        item.mapelLabel    // asli (label)
      );
    }
  });

  filterMapel.innerHTML = `<option value="all">Semua Mata Pelajaran</option>`;

  mapelMap.forEach((label, value) => {
    const opt = document.createElement("option");
    opt.value = value;       // normalized
    opt.textContent = label; // tampil rapi
    filterMapel.appendChild(opt);
  });
}

filterMapel.addEventListener("change", () => {
  applyAllFilters();
});

searchInput.addEventListener("input", () => {
  searchQuery = normalize(searchInput.value);
  applyAllFilters();
});

function applyAllFilters() {
  const selectedMapel = filterMapel.value;

  filteredData = DATA_LATIHAN.filter(item => {
    const matchKelas = item.kelas === kelasAktif;
    const matchMapel =
      selectedMapel === "all" || item.mapel === selectedMapel;

    const matchSearch =
      !searchQuery ||
      item.judulNorm.includes(searchQuery) ||
      item.mapel.includes(searchQuery);

    return matchKelas && matchMapel && matchSearch;
  });

  currentPage = 1;
  render();
}

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
  a.rel = "noopener noreferrer";
a.className = "latihan-item";
a.innerHTML = `
<img src="gambar/pdf.png" class="pdf-icon" alt="PDF">
<div class="latihan-info">
<h4 class="judul">${item.mapelLabel} - ${item.judul}</h4>
<span class="tanggal">${formatTanggal(item.tanggal)}</span>
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

function render() {
  renderList();
  renderPagination();
}
