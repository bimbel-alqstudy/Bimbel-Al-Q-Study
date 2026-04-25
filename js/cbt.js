const params = new URLSearchParams(window.location.search);

const kelas = parseInt(params.get("kelas"));
const jenjang = params.get("jenjang") || "SD"; 
const id = params.get("id"); 
const mapel = params.get("mapel") || "Matematika";
const judul = params.get("judul"); 
const bab = params.get("bab"); 
const JudulEl = document.getElementById("JudulHalaman");
const subJudulEl = document.getElementById("subJudul");

JudulEl.textContent = `Latihan Online Kelas ${kelas}`;

let teks = "";
// Format: Mapel - Bab - Judul
if (mapel && bab && judul) {
  teks = `${mapel} - ${bab} - ${judul}`;
} else if (mapel && judul) {
  teks = `${mapel} - ${judul}`;
} else {
  teks = judul || "";
}
subJudulEl.textContent = teks;
renderBreadcrumb([
  { label: "Beranda", link: "index.html" },
  { label: jenjang, link: `${jenjang}.html` },
  { label: `Kelas ${kelas}`, link: `kelas.html?kelas=${kelas}` },
  { label: "Latihan Online", link: `latihan.html?type=tryout&kelas=${kelas}` },
  { label: teks || "Latihan" }
]);

const API_SOAL = `https://script.google.com/macros/s/AKfycby0X0Th-zSjoQaWS55jPcbKdPPCI9nEWyJPiOBKqHc4ywWx3tP2Hw3KlRlztntBieRf/exec?type=soal&id=${id}`;
// ===== CONTOH DATA (nanti ganti dari API kamu) =====
let soal = [];
let isSubmitted = false;
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
        jawaban: item.jawaban.toUpperCase()
      });
    });

    renderSoal();
    aktifkanZoomGambar();
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
  const huruf = String.fromCharCode(65 + i);

  html += `
    <label>
      <input type="radio" name="soal${index}" value="${huruf}" onclick="hapusBorder(${index})">
      ${huruf}. ${opsi}
  `;

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
  let firstUnanswered = null;

  // ===== 1. CEK DULU YANG KOSONG =====
  soal.forEach((q, index) => {
    const selected = document.querySelector(`input[name="soal${index}"]:checked`);
    const soalDiv = document.getElementById(`soal-${index}`);

    if (!selected) {
      belumJawab = true;
      soalDiv.style.border = "2px solid red";

      if (firstUnanswered === null) {
        firstUnanswered = soalDiv;
      }
    } else {
      // kalau sudah dijawab → hapus border merah
      soalDiv.style.border = "";
    }
  });

  // ===== 2. JIKA MASIH ADA YANG KOSONG → STOP =====
  if (belumJawab) {
    alert("Masih ada soal yang belum dijawab!");

    if (firstUnanswered) {
      firstUnanswered.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return; // ❗ STOP → TIDAK ADA KOREKSI
  }

  // ===== 3. BARU KOREKSI (semua sudah dijawab) =====
  document.querySelectorAll("label").forEach(l => {
  l.classList.remove("benar", "salah");
});
  soal.forEach((q, index) => {
    const selected = document.querySelector(`input[name="soal${index}"]:checked`);
    const soalDiv = document.getElementById(`soal-${index}`);
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

  // ===== 4. HITUNG NILAI =====
  const nilai = Math.round((skor / soal.length) * 100);
  document.getElementById("hasil").textContent = "Nilai kamu: " + nilai;

  // ===== 5. KUNCI JAWABAN =====
  document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.disabled = true;
  });
document.getElementById("quiz").classList.add("locked");
  document.getElementById("btnSubmit").disabled = true;
isSubmitted = true;
  window.scrollTo(0, document.body.scrollHeight);
});

function hapusBorder(index) {
  const soalDiv = document.getElementById(`soal-${index}`);
  soalDiv.style.border = "";
}

function aktifkanZoomGambar() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".image-modal .close");

  document.querySelectorAll(".img-soal, .img-opsi").forEach(img => {
    img.style.cursor = "pointer";

img.addEventListener("click", function () {
  if (isSubmitted) return; // ❌ blok kalau sudah submit
  modal.style.display = "block";
  modalImg.src = this.src;
});
});

  // tombol close
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // klik luar gambar
  modal.onclick = function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}
