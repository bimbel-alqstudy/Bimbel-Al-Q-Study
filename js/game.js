const API = "https://script.google.com/macros/s/AKfycbyQ4WvL-J3ST5buBgqUkR5-jr4t0N2wWIrdvIG_1rfQZlDSVbnoB79yGi1gxiXZWLM6/exec?sheet=game";
let DATA_GAME = [];
let filteredGame = [];
let searchGame = "";

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
      item.kategori.includes(searchGame);

    return matchKategori && matchSearch;
  });

  renderGame(filteredGame);
}

function renderGame(data) {
  const container = document.getElementById("daftarGame");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p class='empty'>Game tidak ditemukan.</p>";
    return;
  }

  data.forEach(game => {
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
}

