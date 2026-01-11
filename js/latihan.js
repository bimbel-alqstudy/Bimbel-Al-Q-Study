const API_URL = "https://script.google.com/macros/s/AKfycbxYPhQxThs9qcs8YqqQVOw5Xrt6b7kHDeyRc9da0-iXiBLGVDJt8OtHgLUXiW2FDjJJ9w/exec";
const container = document.getElementById("latihanList");
const filter = document.getElementById("mapel");
const pagination = document.getElementById("pagination");

const ITEMS_PER_PAGE = 10;

let allItems = [];
let filteredItems = [];
let currentPage = 1;

fetch(API_URL)
  .then(res => res.json())
  .then(data => {

    // kelas 3 saja
    allItems = data
      .filter(item => item.kelas == 3)
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

    filteredItems = [...allItems];

    render();
  });

function render() {
  renderItems();
  renderPagination();
}

function renderItems() {
  container.innerHTML = "";

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = filteredItems.slice(start, end);

  pageItems.forEach(item => {
    const a = document.createElement("a");
    a.href = item.file_pdf;
    a.target = "_blank";
    a.className = "latihan-item";
    a.dataset.mapel = item.mata_pelajaran.toLowerCase();

    a.innerHTML = `
      <img src="gambar/pdf.png" class="pdf-icon">
      <div class="latihan-info">
        <h4>${item.mata_pelajaran} - ${item.materi} - ${item.judul}</h4>
        <span>${formatTanggal(item.tanggal)}</span>
      </div>
    `;

    container.appendChild(a);
  });
}

function renderPagination() {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  if (totalPages <= 1) return;

  const prev = document.createElement("button");
  prev.textContent = "<<";
  prev.disabled = currentPage === 1;
  prev.onclick = () => {
    currentPage--;
    render();
  };
  pagination.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      render();
    };
    pagination.appendChild(btn);
  }

  const next = document.createElement("button");
  next.textContent = ">>";
  next.disabled = currentPage === totalPages;
  next.onclick = () => {
    currentPage++;
    render();
  };
  pagination.appendChild(next);
}

// FILTER
filter.addEventListener("change", () => {
  const value = filter.value;

  filteredItems =
    value === "all"
      ? [...allItems]
      : allItems.filter(item =>
          item.mata_pelajaran.toLowerCase() === value
        );

  currentPage = 1;
  render();
});

function formatTanggal(tgl) {
  return new Date(tgl).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
