// ===== AMBIL PARAMETER KELAS =====
const params = new URLSearchParams(window.location.search);
const kelasAktif = parseInt(params.get("kelas"));
const type = params.get("type") || "latihan"; 

const API = `https://script.google.com/macros/s/AKfycby0X0Th-zSjoQaWS55jPcbKdPPCI9nEWyJPiOBKqHc4ywWx3tP2Hw3KlRlztntBieRf/exec?type=${type}&kelas=${kelasAktif}`;

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
    label: "Materi"  
  },
  latihan: {
    judul: `Bank Soal Kelas ${kelasAktif}`,
    deskripsi: "Kumpulan soal latihan yang bisa dibaca dan diunduh.",
    label: "Bank Soal"
  },
  tryout: {
    judul: `Latihan Online Kelas ${kelasAktif}`,
    deskripsi: "Latihan online untuk menguji pemahaman materi secara langsung.",
    label: "Latihan Online"
  }
};
if (!config[type]) {
  document.getElementById("judulHalaman").textContent = "Halaman tidak ditemukan";
  throw new Error("Type tidak valid");
}

const halaman = config[type];
const viewerPage = {
  materi: "viewermateri.html",
  latihan: "viewerlatihan.html",
  tryout: "viewertryout.html"
};
const iconKategori = {
  matematika: "calculator",
  ipa: "flask-conical",
  indonesia: "book-open",
  inggris: "globe",
  jawa: "brain",
  ips: "map",
  pancasila: "scale",
  seni: "palette",
  agama: "book",
  default: "file"
};

const warnaKategori = {
  matematika: "#f39c12",
  ipa: "#27ae60",
  indonesia: "#8e44ad",
  inggris: "#2980b9",
  jawa: "#7f8c8d",
  ips: "#16a085",
  pancasila: "#c0392b",
  seni: "#e67e22",
  agama: "#2ecc71",
  default: "#95a5a6"
};
function getKategori(mapel) {
  if (mapel.includes("matematika")) return "matematika";
  if (mapel.includes("ipa")) return "ipa";
  if (mapel.includes("indonesia")) return "indonesia";
  if (mapel.includes("inggris")) return "inggris";
  if (mapel.includes("agama")) return "agama";
  if (mapel.includes("jawa")) return "jawa";
  if (mapel.includes("ips")) return "ips";
  if (mapel.includes("pancasila")) return "pancasila";
  if (mapel.includes("seni")) return "seni";
  return "default";
}
function getJenjang(kelas) {
  if (kelas >= 1 && kelas <= 6) return "SD";
  if (kelas >= 7 && kelas <= 9) return "SMP";
  if (kelas >= 10 && kelas <= 12) return "SMA";
  return "";
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
initBreadcrumb();  
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
})
.catch(err => {
latihanList.innerHTML = "<p class='empty'>Gagal memuat data.</p>";
console.error(err);
});

// ===== INISIALISASI FILTER MAPEL =====
function initFilterMapel() {
  const mapelMap = new Map();

  DATA_LATIHAN.forEach(item => {
      mapelMap.set(
        item.mapel,        // normalized (value)
        item.mapelLabel    // asli (label)
      );
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
    const matchMapel =
      selectedMapel === "all" || item.mapel === selectedMapel;

    const matchSearch =
      !searchQuery ||
      item.judulNorm.includes(searchQuery) ||
      item.mapel.includes(searchQuery) ||
      item.bab.includes(searchQuery);

    return matchMapel && matchSearch;
  });

  currentPage = 1;
  render();
}

// ===== RENDER LIST =====
function renderList() {
latihanList.innerHTML = "";

if (filteredData.length === 0) {
latihanList.innerHTML = "<p class='empty'>Data tidak ditemukan.</p>";
return;
}

const start = (currentPage - 1) * ITEMS_PER_PAGE;
const end = start + ITEMS_PER_PAGE;
const pageItems = filteredData.slice(start, end);

pageItems.forEach(item => {
const kategori = getKategori(item.mapel);  
const icon = iconKategori[kategori] || iconKategori.default;
const warna = warnaKategori[kategori] || warnaKategori.default;
const a = document.createElement("a");
  
const fileId = item.embedlink.split("/d/")[1].split("/")[0];
const previewLink = `https://drive.google.com/file/d/${fileId}/preview`;
const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
const viewer = viewerPage[type] || "viewer.html";
a.href = `${viewer}?file=${encodeURIComponent(previewLink)}
&download=${encodeURIComponent(downloadLink)}
&mapel=${encodeURIComponent(item.mapelLabel)}
&bab=${encodeURIComponent(item.babLabel)}
&judul=${encodeURIComponent(item.judul)}
&kelas=${kelasAktif}
&type=${type}`;
a.rel = "noopener noreferrer";
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
  const jenjang = getJenjang(kelasAktif);

  renderBreadcrumb([
    { label: "Beranda", link: "index.html" },
    { label: jenjang, link: `${jenjang}.html` },
    { label: `Kelas ${kelasAktif}`, link: `kelas.html?kelas=${kelasAktif}` },
    { label: halaman.label }
  ]);
}
