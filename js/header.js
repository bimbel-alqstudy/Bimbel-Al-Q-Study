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
      <div class="brand">
      <img src="gambar/logo.png">
      <span>Al-Q Study  </span>
    </div>
      <button class="close-menu" id="closeMenu">✕</button>
      </div>
       <div class="menu-content">
        <a href="index.html"> <i data-lucide="home" class="icon"></i>Beranda</a>

        <!-- MATERI -->
        <div class="dropdown">
          <button class="drop-btn"><i data-lucide="book-open" class="icon"></i>
          Materi <span class="arrow"></span></button>
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
          <button class="drop-btn"><i data-lucide="folder-open" class="icon"></i>
          Bank Soal <span class="arrow"></span></button>
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
          <button class="drop-btn"><i data-lucide="clipboard-check" class="icon"></i>
          Latihan Online <span class="arrow"></span> </button>
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
        <button class="drop-btn"><i data-lucide="play-circle" class="icon"></i>
        Media Edukasi <span class="arrow"></span></button>
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
        <a href="#"><i data-lucide="info" class="icon"></i>Tentang Kami</a>
       </div>
      </nav>
    </div>
`;
lucide.createIcons();

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("menuOverlay");
  
  hamburger.onclick = () => {
 overlay.classList.toggle("show");
hamburger.classList.toggle("active");
  navMenu.classList.toggle("show");
};
overlay.addEventListener("click", (e) => {
  if(!navMenu.contains(e.target)){
    navMenu.classList.remove("show");
    overlay.classList.remove("show");
    hamburger.classList.remove("active");
  }
});
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
