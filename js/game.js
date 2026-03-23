const API = "https://script.google.com/macros/s/AKfycbyQ4WvL-J3ST5buBgqUkR5-jr4t0N2wWIrdvIG_1rfQZlDSVbnoB79yGi1gxiXZWLM6/exec
?sheet=game";

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
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${game.judul}</h3>
      <p>${game.deskripsi}</p>
      <small>${game.kategori} | ${game.sumber}</small>
      <br><br>
      <a href="${game.link}" target="_blank">Mainkan</a>
    `;

    container.appendChild(card);
  });
}
ambilGame();
let semuaGame = [];

function filterGame(kategori) {
  const hasil = semuaGame.filter(g => g.kategori === kategori);
  tampilkanGame(hasil);
}
