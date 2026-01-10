const API_URL = "https://script.google.com/macros/s/AKfycbxYPhQxThs9qcs8YqqQVOw5Xrt6b7kHDeyRc9da0-iXiBLGVDJt8OtHgLUXiW2FDjJJ9w/exec";
const container = document.getElementById("latihanList");

fetch(API_URL)
  .then(res => res.json())
  .then(data => {

    // kelas 3 saja
    const kelas3 = data.filter(item => item.kelas == 3);

    // urutkan terbaru
    kelas3.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

    container.innerHTML = "";

    kelas3.forEach(item => {

      const a = document.createElement("a");
      a.href = item.file_pdf;
      a.target = "_blank";
      a.className = "latihan-item";
      a.dataset.mapel = item.mata_pelajaran.toLowerCase();

      a.innerHTML = `
        <img src="gambar/pdf.png" alt="PDF" class="pdf-icon">
        <div class="latihan-info">
          <h4>${item.mata_pelajaran} - ${item.materi}</h4>
          <span>${formatTanggal(item.tanggal)}</span>
        </div>
      `;

      container.appendChild(a);
    });
  });

function formatTanggal(tgl) {
  const opsi = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(tgl).toLocaleDateString('id-ID', opsi);
}
