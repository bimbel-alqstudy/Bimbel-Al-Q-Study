// ===== AMBIL PARAMETER KELAS =====
const params = new URLSearchParams(window.location.search);
const kelas = parseInt(params.get("kelas"));

// ===== TENTUKAN JENJANG =====
function getJenjangByKelas(kelas) {
  if (kelas >= 1 && kelas <= 6) return { label: "SD", link: "sd.html" };
  if (kelas >= 7 && kelas <= 9) return { label: "SMP", link: "smp.html" };
  if (kelas >= 10 && kelas <= 12) return { label: "SMA", link: "sma.html" };
  return null;
}

// ===== RENDER BREADCRUMB =====
function renderBreadcrumb() {
  const container = document.getElementById("breadcrumb");
  if (!container) return;

  const jenjang = getJenjangByKelas(kelas);

  let html = `
    <a href="index.html">Beranda</a>
    <span>›</span>
  `;

  if (jenjang) {
    html += `
      <a href="${jenjang.link}">${jenjang.label}</a>
      <span>›</span>
    `;
  }

  html += `
    <a href="latihan.html">Latihan</a>
    <span>›</span>
    <span class="active">Kelas ${kelas}</span>
  `;

  container.innerHTML = html;
}

// ===== JALANKAN =====
renderBreadcrumb();
