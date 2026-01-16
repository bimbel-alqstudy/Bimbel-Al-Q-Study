document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("siteFooter");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-container">

      <!-- Kiri: Logo + Motto -->
      <div class="footer-brand">
        <img src="gambar/logo.png" alt="Al-Q Study Logo" class="footer-logo" />

        <div class="footer-motto">
          <h3>Bimbingan Belajar</h3>
          <h2>Al-Q Study</h2>
          <p>Belajar menyenangkan, Prestasi Gemilang!</p>
        </div>
      </div>

      <!-- Kanan: Kontak -->
      <div class="footer-contact">
        <h4>Hubungi Kami</h4>

        <ul>
          <li>
            <i class="fas fa-envelope"></i>
            <a href="mailto:joko.shabieq@gmail.com">
              joko.shabieq@gmail.com
            </a>
          </li>
          <li>
            <i class="fab fa-instagram"></i>
            <a href="https://instagram.com/j0k0_cahy0n0" target="_blank" rel="noopener">
              @j0k0_cahy0n0
            </a>
          </li>
          <li>
            <i class="fab fa-whatsapp"></i>
            <a href="https://wa.me/6285604606502" target="_blank" rel="noopener">
              085604606502
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-copyright">
      © 2026 Bimbingan Belajar Al-Q Study. All Rights Reserved.
    </div>
  `;
});
