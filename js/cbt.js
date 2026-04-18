const params = new URLSearchParams(window.location.search);
const kelas = parseInt(params.get("kelas"));
const type = params.get("type") || "latihan"; 
const id = params.get("id"); 
const judul = params.get("judul"); 
const bab = params.get("bab"); 

const API_SOAL = `https://script.google.com/macros/s/AKfycby0X0Th-zSjoQaWS55jPcbKdPPCI9nEWyJPiOBKqHc4ywWx3tP2Hw3KlRlztntBieRf/exec?type=${type}&id=${id}`;

// ===== CONTOH DATA (nanti ganti dari API kamu) =====
fetch(API_SOAL)
  .then(res => res.json())
  .then(data => {
    soal.length = 0;

    data.forEach(item => {
      soal.push({
        pertanyaan: item.pertanyaan,
        gambar: item.gambar || null,
        opsi: [
          item.opsi_a,
          item.opsi_b,
          item.opsi_c,
          item.opsi_d
        ],
    gambar_opsi: [
    item.gambar_a,
    item.gambar_b,
    item.gambar_c,
    item.gambar_d
  ],
        jawaban: item["opsi_" + item.jawaban.toLowerCase()]
      });
    });

    renderSoal();
  });
// ===== RENDER SOAL =====
function renderSoal() {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";

  document.getElementById("jumlahSoal").textContent = soal.length;

  soal.forEach((q, index) => {
    let html = `
      <div class="soal" id="soal-${index}">
        <p><b>${index + 1}. ${q.pertanyaan}</b></p>
    `;

    // ✅ GAMBAR SOAL
    if (q.gambar) {
      html += `<img src="${q.gambar}" class="img-soal">`;
    }

    html += `<div class="opsi">`;

    q.opsi.forEach((opsi, i) => {
      html += `
        <label>
          <input type="radio" name="soal${index}" value="${opsi}">
          ${opsi ? opsi : ""}
      `;

      // ✅ GAMBAR OPSI
      if (q.gambar_opsi && q.gambar_opsi[i]) {
        html += `<br><img src="${q.gambar_opsi[i]}" class="img-opsi">`;
      }

      html += `</label>`;
    });

    html += `</div></div>`;
    quiz.innerHTML += html;
  });
}
// ===== SUBMIT =====
document.getElementById("btnSubmit").addEventListener("click", () => {
  let skor = 0;
  let belumJawab = false;

  soal.forEach((q, index) => {
    const selected = document.querySelector(`input[name="soal${index}"]:checked`);
    const soalDiv = document.getElementById(`soal-${index}`);

    if (!selected) {
      belumJawab = true;
      soalDiv.style.border = "2px solid red";
      return;
    }

    const labels = soalDiv.querySelectorAll("label");

    labels.forEach(label => {
      const input = label.querySelector("input");

      if (input.value === q.jawaban) {
        label.classList.add("benar");
      }

      if (input.checked && input.value !== q.jawaban) {
        label.classList.add("salah");
      }
    });

    if (selected.value === q.jawaban) {
      skor++;
    }
  });

  if (belumJawab) {
    alert("Masih ada soal yang belum dijawab!");
    return;
  }

  const nilai = Math.round((skor / soal.length) * 100);
  document.getElementById("hasil").textContent = "Nilai kamu: " + nilai;

  window.scrollTo(0, document.body.scrollHeight);
});
