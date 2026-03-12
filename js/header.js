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
      <div class="menu-top">
      <span>Menu</span>
      <button class="close-menu" id="closeMenu">✕</button>
    </div>
        <a href="index.html" >Beranda</a>

        <!-- MATERI -->
        <div class="dropdown">
          <button class="drop-btn">Materi</button>
          <div class="dropdown-menu">
            <!-- SD -->
            <div class="submenu">
              <div class="submenu-title">SD</div>
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
              <div class="submenu-title">SMP</div>
              <div class="submenu-list">
                <a href="#">Kelas 7</a>
                <a href="#">Kelas 8</a>
                <a href="#">Kelas 9</a>
              </div>
            </div>
            <div class="submenu">
              <div class="submenu-title">SMA</div>
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
          <button class="drop-btn">Bank Soal</button>
          <div class="dropdown-menu">
            <div class="submenu">
              <div class="submenu-title">SD</div>
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
              <div class="submenu-title">SMP</div>
              <div class="submenu-list">
                <a href="latihan.html?kelas=7">Kelas 7</a>
                <a href="latihan.html?kelas=8">Kelas 8</a>
                <a href="latihan.html?kelas=9">Kelas 9</a>
              </div>
            </div>
            <div class="submenu">
              <div class="submenu-title">SMA</div>
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
          <button class="drop-btn">Latihan Online </button>
          <div class="dropdown-menu">
            <!-- SD -->
            <div class="submenu">
              <div class="submenu-title">SD</div>
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
              <div class="submenu-title">SMP</div>
              <div class="submenu-list">
                <a href="#">Kelas 7</a>
                <a href="#">Kelas 8</a>
                <a href="#">Kelas 9</a>
              </div>
            </div>
            <div class="submenu">
              <div class="submenu-title">SMA</div>
              <div class="submenu-list">
                <a href="#">Kelas 10</a>
                <a href="#">Kelas 11</a>
                <a href="#">Kelas 12</a>
              </div>
            </div>

          </div>
        </div>

        <!-- MEDIA EDUKASI -->
        <div class="dropdown">
        <button class="drop-btn">Media Edukasi</button>
        <div class="dropdown-menu">
        <div class="submenu">
        <div class="submenu-list">
        <a href="#">Game Edukasi</a>
        <a href="#">Video Edukasi</a>
        <a href="#">Laboratorium Virtual</a>
        </div>
        </div>
        </div>
        </div>
        <a href="#">Tentang Kami</a>
      </nav>
    </div>
    <div class="menu-overlay" id="menuOverlay"></div>
`;


  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("menuOverlay");
  
  hamburger.onclick = () => {
 overlay.classList.toggle("show");
hamburger.classList.toggle("active");
  navMenu.classList.toggle("show");
};
overlay.onclick = () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("show");
  overlay.classList.remove("show");
};
closeMenu.onclick = () => {
  navMenu.classList.remove("show");
  overlay.classList.remove("show");
  hamburger.classList.remove("active");
};
// ===== DROPDOWN (LATIHAN & MEDIA EDUKASI) =====
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach(drop => {
  const btn = drop.querySelector(".drop-btn");
  btn.onclick = () => {
    if(window.innerWidth <= 768){
      drop.classList.toggle("active");
      dropdowns.forEach(d=>{
        if(d!==drop) d.classList.remove("active");
      });
    }
  };
});
  
});  
