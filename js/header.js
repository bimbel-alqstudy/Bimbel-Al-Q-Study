document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");

  header.innerHTML = `
    <div class="navbar">

      <div class="brand">
        <img src="gambar/logo.png">
        <div class="brand-text">
          <div class="top">Bimbingan Belajar</div>
          <div class="bottom">
            <span class="al">Al-Q</span>
            <span class="study"> Study</span>
          </div>
        </div>
      </div>

      <div class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav class="nav-menu" id="navMenu">
        <a href="index.html" >Beranda</a>

        <!-- MATERI -->
        <div class="dropdown">
          <a href="#" class="drop-btn">Materi <span class="arrow">^</span></a>
          <div class="dropdown-menu">
            <!-- SD -->
            <div class="submenu">
              <span class="submenu-title">SD</span>
              <div class="submenu-list">
                <a href="#">Kelas 1</a>
                <a href="#">Kelas 2</a>
                <a href="#">Kelas 3</a>
                <a href="#">Kelas 4</a>
                <a href="#">Kelas 5</a>
                <a href="#">Kelas 6</a>
              </div>
            </div>
            <div class="submenu">
              <span class="submenu-title">SMP</span>
              <div class="submenu-list">
                <a href="#">Kelas 7</a>
                <a href="#">Kelas 8</a>
                <a href="#">Kelas 9</a>
              </div>
            </div>
            <div class="submenu">
              <span class="submenu-title">SMA</span>
              <div class="submenu-list">
                <a href="#">Kelas 10</a>
                <a href="#">Kelas 11</a>
                <a href="#">Kelas 12</a>
              </div>
            </div>

          </div>
        </div>

        <!-- LATIHAN -->
        <div class="dropdown">
          <a href="#" class="drop-btn">Soal-Soal <span class="arrow">^</span></a>
          <div class="dropdown-menu">
            <div class="submenu">
              <span class="submenu-title">SD</span>
              <div class="submenu-list">
                <a href="latihan.html?kelas=1">Kelas 1</a>
                <a href="latihan.html?kelas=2">Kelas 2</a>
                <a href="latihan.html?kelas=3">Kelas 3</a>
                <a href="latihan.html?kelas=4">Kelas 4</a>
                <a href="latihan.html?kelas=5">Kelas 5</a>
                <a href="latihan.html?kelas=6">Kelas 6</a>
              </div>
            </div>
            <div class="submenu">
              <span class="submenu-title">SMP</span>
              <div class="submenu-list">
                <a href="latihan.html?kelas=7">Kelas 7</a>
                <a href="latihan.html?kelas=8">Kelas 8</a>
                <a href="latihan.html?kelas=9">Kelas 9</a>
              </div>
            </div>
            <div class="submenu">
              <span class="submenu-title">SMA</span>
              <div class="submenu-list">
                <a href="latihan.html?kelas=10">Kelas 10</a>
                <a href="latihan.html?kelas=11">Kelas 11</a>
                <a href="latihan.html?kelas=12">Kelas 12</a>
              </div>
            </div>
            
          </div>
        </div>
        <!-- LATIHAN ONLINE -->
        <div class="dropdown">
          <a href="#" class="drop-btn">Latihan Online <span class="arrow">^</span></a>
          <div class="dropdown-menu">
            <!-- SD -->
            <div class="submenu">
              <span class="submenu-title">SD</span>
              <div class="submenu-list">
                <a href="#">Kelas 1</a>
                <a href="#">Kelas 2</a>
                <a href="#">Kelas 3</a>
                <a href="#">Kelas 4</a>
                <a href="#">Kelas 5</a>
                <a href="#">Kelas 6</a>
              </div>
            </div>
            <div class="submenu">
              <span class="submenu-title">SMP</span>
              <div class="submenu-list">
                <a href="#">Kelas 7</a>
                <a href="#">Kelas 8</a>
                <a href="#">Kelas 9</a>
              </div>
            </div>
            <div class="submenu">
              <span class="submenu-title">SMA</span>
              <div class="submenu-list">
                <a href="#">Kelas 10</a>
                <a href="#">Kelas 11</a>
                <a href="#">Kelas 12</a>
              </div>
            </div>

          </div>
        </div>

        <!-- MEDIA EDUKASI -->
        <div class="dropdown small-dropdown">
        <a href="#" class="drop-btn">Media Edukasi <span class="arrow">^</span></a>
        <div class="dropdown-menu game-menu">
        <a href="#">Game Edukasi</a>
        <a href="#">Video Edukasi</a>
        <a href="#">Laboratorium Virtual</a>
        </div>
        </div>
        <a href="#">Tentang Kami</a>
      </nav>
    </div>
  <div class="menu-overlay" id="menuOverlay"></div>
`;

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("menuOverlay");
const dropdowns = document.querySelectorAll(".dropdown");

/* ===== HAMBURGER ===== */
hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("show");
  overlay.classList.toggle("show");
});

/* ===== OVERLAY MENUTUP MENU ===== */
overlay?.addEventListener("click", () => {
  closeMenu();
});

/* ===== DROPDOWN MOBILE ===== */
dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector(".drop-btn");

  btn.addEventListener("click", (e) => {

    if (window.innerWidth <= 768) {
      e.preventDefault();

      const isActive = dropdown.classList.contains("active");

      // tutup semua dropdown
      dropdowns.forEach(d => d.classList.remove("active"));

      // buka dropdown yang diklik
      if (!isActive) {
        dropdown.classList.add("active");
      }
    }

  });
});

/* ===== TUTUP MENU SAAT LINK DIKLIK ===== */
document.querySelectorAll(".nav-menu a:not(.drop-btn)").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  });
});

/* ===== FUNCTION TUTUP MENU ===== */
function closeMenu(){
  hamburger.classList.remove("active");
  navMenu.classList.remove("show");
  overlay.classList.remove("show");

  dropdowns.forEach(d => d.classList.remove("active"));
}  
