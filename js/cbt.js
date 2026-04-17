// ===== CONTOH DATA (nanti ganti dari API kamu) =====
const soal = [
  {
    pertanyaan: "2 + 2 = ...",
    opsi: ["2", "3", "4", "5"],
    jawaban: "4"
  },
  {
    pertanyaan: "5 x 2 = ...",
    opsi: ["10", "8", "6", "12"],
    jawaban: "10"
  }
];

// ===== RENDER SOAL =====
function renderSoal() {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";

  document.getElementById("jumlahSoal").textContent = soal.length;

  soal.forEach((q, index) => {
    let html = `
      <div class="soal" id="soal-${index}">
        <p><b>${index + 1}. ${q.pertanyaan}</b></p>
        <div class="opsi">
    `;

    q.opsi.forEach((opsi) => {
      html += `
        <label>
          <input type="radio" name="soal${index}" value="${opsi}">
          ${opsi}
        </label>
      `;
    });

    html += `</div></div>`;
    quiz.innerHTML += html;
  });
}

renderSoal();

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
