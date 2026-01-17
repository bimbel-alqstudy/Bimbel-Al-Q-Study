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
          <a href="#" class="drop-btn">Latihan <span class="arrow">^</span></a>
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
  `;

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
hamburger?.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

// ===== DROPDOWN (LATIHAN & MEDIA EDUKASI) =====
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector(".drop-btn");

  btn.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();

      dropdown.classList.toggle("active");

      // tutup dropdown lain
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove("active");
      });
    }
  });
});

// ===== TUTUP MENU SAAT LINK DIKLIK (MOBILE) =====
document.querySelectorAll(".dropdown-menu a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navMenu.classList.remove("show");
      dropdowns.forEach(d => d.classList.remove("active"));
    }
  });
});
});
