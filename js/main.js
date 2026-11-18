// JavaScript untuk fitur Beranda, Proyek, dan Kontak.
// File dimuat dengan defer pada halaman yang menggunakan fitur-fitur ini.


// 1. Daftar keahlian (halaman Beranda), data dari
// data/keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const skills = await response.json();

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });
    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}

if (daftarSkill) {
  muatKeahlian();
}


// Kontak: perbarui penghitung karakter pesan.
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  const perbaruiHitungKarakter = () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  };

  kotakPesan.addEventListener("input", perbaruiHitungKarakter);
  perbaruiHitungKarakter();
  hitungKarakter.classList.toggle("hampir-penuh", kotakPesan.value.length >= 250);
 if (tombolKosongkan) {
  tombolKosongkan.addEventListener("click", () => {
    kotakPesan.value = "kosongkan-kotak-pesan";
    perbaruiHitungKarakter();
  });
 }
}

// Proyek: data dan fungsi untuk menampilkan serta memfilter kartu proyek.
let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
const tombolFilter = document.querySelectorAll("[data-filter-proyek]");
let kategoriAktif = "semua";

function buatKartuProyek(item) {
  const gambar = item.gambar
    ? `<img src="${item.gambar}" alt="${item.alt}" width="280">`
    : "";

  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      ${gambar}
      <p>${item.deskripsi}</p>
    </article>
  `;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek || !jumlahProyek) {
    return;
  }

  daftarProyek.innerHTML = daftar.map(buatKartuProyek).join("");
  jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek.`;
}

async function muatProyek() {
    try {
        daftarProyek.innerHTML = "Memuat proyek...";

        const response = await fetch("data/proyek.json");

        if (!response.ok) {
            throw new Error("Gagal mengambil data proyek");
        }

        proyek = await response.json();

        terapkanFilter();
    } catch (error) {
        daftarProyek.innerHTML = "Data proyek gagal dimuat.";
        console.error(error);
    }
}

function terapkanFilter() {
  const hasilFilter = kategoriAktif === "semua"
    ? proyek
    : proyek.filter((item) => item.kategori === kategoriAktif);

  tampilkanProyek(hasilFilter);
}

if (daftarProyek && jumlahProyek) {
  muatProyek();
  tombolFilter.forEach((tombol) => {
    tombol.addEventListener("click", () => {
      kategoriAktif = tombol.dataset.filterProyek;
      tombolFilter.forEach((item) => {
        const aktif = item === tombol;
        item.classList.toggle("aktif", aktif);
        item.setAttribute("aria-pressed", String(aktif));
      });
      terapkanFilter();
    });
  });
}



// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "zahrarpl23-code";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";

const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
  statusRepo.textContent = "Memuat...";

  try {
    const response = await fetch(alamatRepo + pilihan);
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const repos = await response.json();

    repos.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");
      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.textContent = repo.name;
      item.appendChild(tautan);
      daftarRepo.appendChild(item);
    });

    statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;
  } catch (error) {
    statusRepo.textContent = "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
    console.error(error);
  }
}

if (daftarRepo) {
  ambilRepo();
}