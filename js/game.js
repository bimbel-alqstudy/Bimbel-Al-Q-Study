const API = "https://script.google.com/macros/s/AKfycbyQ4WvL-J3ST5buBgqUkR5-jr4t0N2wWIrdvIG_1rfQZlDSVbnoB79yGi1gxiXZWLM6/exec?sheet=game";

async function ambilGame() {
  const res = await fetch(API);
  const data = await res.json();

  semuaGame = data; // simpan global
  tampilkanGame(data);
}
function tampilkanGame(data) {
  const container = document.getElementById("daftarGame");
  container.innerHTML = "";

  // urutkan terbaru
  data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  data.forEach(game => {
const item = document.createElement("a");
item.className = "latihan-item";
item.href = game.link;
item.target = "_blank";
item.innerHTML = `
      <img src="icon-game.png" class="pdf-icon">

      <div class="latihan-info">
        <h4>${game.judul}</h4>
        <span>${game.kategori} • ${game.sumber}</span>
        <br>
      <small>${game.deskripsi}</small>
      </div>
    `;
    container.appendChild(item);    
  });
}
let semuaGame = [];
ambilGame();

function filterGame(kategori) {
  const hasil = semuaGame.filter(g => g.kategori === kategori);
  tampilkanGame(hasil);
}
