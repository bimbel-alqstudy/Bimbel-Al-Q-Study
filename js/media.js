const params = new URLSearchParams(window.location.search);
const type = params.get("type"); // game, video, laboratorium

const API = `https://script.google.com/macros/s/AKfycbyQ4WvL-J3ST5buBgqUkR5-jr4t0N2wWIrdvIG_1rfQZlDSVbnoB79yGi1gxiXZWLM6/exec?sheet=${type}`;

let DATA_GAME = [];
let filteredGame = [];
let searchGame = "";
const ITEMS_PER_PAGE = 5;
let currentPageGame = 1;

const config = {
  game: {
    judul: "Game Edukasi",
    deskripsi: "Belajar sambil bermain dengan berbagai game edukatif.",
    sheet: "game"
  },
  video: {
    judul: "Video Edukasi",
    deskripsi: "Tonton video pembelajaran yang menarik dan mudah dipahami.",
    sheet: "video"
  },
  laboratorium: {
    judul: "Laboratorium Virtual",
    deskripsi: "Lakukan percobaan secara virtual dengan simulasi interaktif.",
    sheet: "laboratorium"
  }
};
if (!config[type]) {
  document.getElementById("judulHalaman").textContent = "Halaman tidak ditemukan";
  throw new Error("Type tidak valid");
}
const halaman = config[type];

document.getElementById("judulHalaman").textContent = halaman.judul;
document.getElementById("deskripsiHalaman").textContent = halaman.deskripsi;

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")                 // normalisasi unicode
    .replace(/[\u0300-\u036f]/g, "")  // hapus karakter aneh
    .replace(/\s+/g, " ")             // spasi ganda → tunggal
    .trim();
}
fetch(API)
.then(res => res.json())
.then(data => {

  DATA_GAME = data.map(item => ({
    judul: item.judul,
    judulNorm: normalize(item.judul),
    kategori: normalize(item.kategori),
    kategoriLabel: item.kategori,
    sumber: item.sumber,
    link: item.link,
    deskripsi:item.deskripsi,
    tanggal: new Date(item.tanggal)
  }));

  DATA_GAME.sort((a, b) => b.tanggal - a.tanggal);

  initFilterKategori();
  applyFilterGame();
});

const filterKategori = document.getElementById("filterKategori");
const searchInputGame = document.getElementById("searchGame");

function initFilterKategori() {
  const kategoriSet = new Map();

  DATA_GAME.forEach(item => {
    kategoriSet.set(item.kategori, item.kategoriLabel);
  });

  filterKategori.innerHTML = `<option value="all">Semua Kategori</option>`;

  kategoriSet.forEach((label, value) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = label;
    filterKategori.appendChild(opt);
  });
}

filterKategori.addEventListener("change", () => {
  applyFilterGame();
});

searchInputGame.addEventListener("input", () => {
  searchGame = normalize(searchInputGame.value);
  applyFilterGame();
});

function applyFilterGame() {
  const selectedKategori = filterKategori.value;

  filteredGame = DATA_GAME.filter(item => {
    const matchKategori =
      selectedKategori === "all" || item.kategori === selectedKategori;

    const matchSearch =
      !searchGame ||
      item.judulNorm.includes(searchGame) ||
      item.kategori.includes(searchGame) || 
      normalize(item.deskripsi).includes(searchGame);
    
    return matchKategori && matchSearch;
  });
currentPageGame = 1; 
  renderGame();
}

function renderGame() {
  const container = document.getElementById("daftarMedia");
  container.innerHTML = "";

  if (filteredGame.length === 0) {
    container.innerHTML = "<p class='empty'>Game tidak ditemukan.</p>";
    return;
  }
const start = (currentPageGame - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = filteredGame.slice(start, end);
  
  pageItems.forEach(game => {
    const item = document.createElement("a");
    item.className = "latihan-item";
    item.href = game.link;
    item.target = "_blank";
    item.innerHTML = `
      <img src="gambar/game3.png" class="pdf-icon">

      <div class="latihan-info">
        <h4>${game.judul}</h4>
        <span>${game.kategoriLabel} • ${game.sumber}</span>
         <br>
      <small>${game.deskripsi}</small>
      </div>
    `;

    container.appendChild(item);
  });
  renderPaginationGame();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const paginationGame = document.getElementById("paginationGame");

function renderPaginationGame() {
  paginationGame.innerHTML = "";

  const totalPages = Math.ceil(filteredGame.length / ITEMS_PER_PAGE);
  if (totalPages <= 1) return;

  // tombol prev
  const prev = document.createElement("button");
  prev.textContent = "‹";
  prev.disabled = currentPageGame === 1;
  prev.onclick = () => {
    currentPageGame--;
    renderGame();
  };
  paginationGame.appendChild(prev);

  // nomor halaman
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPageGame) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      currentPageGame = i;
      renderGame();
    };

    paginationGame.appendChild(btn);
  }

  // tombol next
  const next = document.createElement("button");
  next.textContent = "›";
  next.disabled = currentPageGame === totalPages;
  next.onclick = () => {
    currentPageGame++;
    renderGame();
  };

  paginationGame.appendChild(next);
}

document.addEventListener("DOMContentLoaded", () => {
  // isi nanti sesuai halaman
  renderBreadcrumb([
  { label: "Beranda", link: "index.html" },
  { label: "Media Edukasi", link: "media.html" },
  { label: halaman.judul }
]);
});
