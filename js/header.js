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
        <a href="#" class="active">Beranda</a>

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
              </div>
            </div>
          </div>
        </div>

        <a href="#">Tentang Kami</a>
      </nav>
    </div>
  `;

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
});

