// ===== AMBIL PARAMETER KELAS =====
const params = new URLSearchParams(window.location.search);
const kelasAktif = parseInt(params.get("kelas"));
const type = params.get("type") || "latihan"; 

const API = `https://script.google.com/macros/s/AKfycbyQ4WvL-J3ST5buBgqUkR5-jr4t0N2wWIrdvIG_1rfQZlDSVbnoB79yGi1gxiXZWLM6/exec?sheet=${type}`;

// ===== ELEMEN DOM =====
const judulKelas = document.getElementById("judulHalaman");
const latihanList = document.getElementById("latihanList");
const paginationEl = document.getElementById("pagination");
const filterMapel = document.getElementById("filterMapel");
const searchInput = document.getElementById("searchInput");

const ITEMS_PER_PAGE = 5;

// ===== STATE =====
let DATA_LATIHAN = [];
let filteredData = [];
let currentPage = 1;
let searchQuery = "";

const config = {
  materi: {
    judul: `Kumpulan Materi Pelajaran Kelas ${kelasAktif}`,
    deskripsi: "Kumpulan materi pelajaran yang bisa dibaca dan diunduh.",
    sheet: "materi"
  },
  latihan: {
    judul: `Bank Soal Kelas ${kelasAktif}`,
    deskripsi: "Kumpulan soal latihan yang bisa dibaca dan diunduh.",
    sheet: "latihan"
  },
  tryout: {
    judul: `Latihan Online Kelas ${kelasAktif}`,
    deskripsi: "Latihan online untuk menguji pemahaman materi secara langsung.",
    sheet: "tryout"
  }
};
if (!config[type]) {
  document.getElementById("judulHalaman").textContent = "Halaman tidak ditemukan";
  throw new Error("Type tidak valid");
}

const halaman = config[type];
const iconKategori = {
  matematika: "calculator",
  ipa: "flask-conical",
  indonesia: "pencil",
  agama: "book",
  inggris: "graduation-cap",
  jawa: "brain",
  default: "file"
};
const warnaKategori = {
  matematika: "#f39c12",
  ipa: "#27ae60",
  indonesia: "#8e44ad",
  agama: "#3498db",
  inggris: "#2c3e50",
  jawa: "#7f8c8d",
  default: "#7f8c8d"
};

function getKategori(mapel) {
  if (mapel.includes("matematika")) return "matematika";
  if (mapel.includes("ipa")) return "ipa";
  if (mapel.includes("indonesia")) return "indonesia";
  if (mapel.includes("inggris")) return "inggris";
  if (mapel.includes("agama")) return "agama";
  if (mapel.includes("jawa")) return "jawa";
  return "default";
}

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
document.getElementById("judulHalaman").textContent = halaman.judul;
document.getElementById("deskripsiHalaman").textContent = halaman.deskripsi;

// ===== FETCH DATA DARI SPREADSHEET =====
fetch(API)
.then(res => res.json())
.then(data => {
DATA_LATIHAN = data.map(item => ({
jenjang: normalize(item.jenjang),
jenjangLabel: item.jenjang,  
kelas: parseInt(item.kelas),
mapel: normalize(item.mapel),
mapelLabel: item.mapel,
babLabel: item.bab,
bab: normalize(item.bab),
judul: item.judul,
judulNorm: normalize(item.judul),
embedlink: item.embedlink,
downloadlink: item.downloadlink,  
tanggal: new Date(item.tanggal)
}));
DATA_LATIHAN.sort((a, b) => b.tanggal - a.tanggal);
initFilterMapel();
applyAllFilters();
initBreadcrumb();  
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
      item.mapel.includes(searchQuery) ||
      item.bab.includes(searchQuery);

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
const kategori = getKategori(item.mapel);  
const icon = iconKategori[item.kategori] || iconKategori.default;
const warna = warnaKategori[item.kategori] || warnaKategori.default;
const a = document.createElement("a");
a.href = `viewer.html?file=${encodeURIComponent(item.embedlink)}&judul=${encodeURIComponent(item.judul)}`;  a.rel = "noopener noreferrer";
a.className = "latihan-item";
a.innerHTML = `
<div class="icon-media" style="color:${warna}">
    <i data-lucide="${icon}"></i>
    </div>
<div class="latihan-info">
<h4 class="judul">${item.mapelLabel} • ${item.babLabel} - ${item.judul}</h4>
<span class="tanggal">${formatTanggal(item.tanggal)}</span>
</div>
`;
latihanList.appendChild(a);
});
  window.scrollTo({ top: 0, behavior: "smooth" });
  lucide.createIcons();

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

function initBreadcrumb() {
  if (DATA_LATIHAN.length === 0) return;

  const jenjang = DATA_LATIHAN[0].jenjangLabel;

  renderBreadcrumb([
    { label: "Beranda", link: "index.html" },
    { label: jenjang, link: `${jenjang.toLowerCase()}.html` },
    { label: `Kelas ${kelasAktif}`, link: `kelas.html?kelas=${kelasAktif}` },
    { label: halaman.judul }
  ]);
}
