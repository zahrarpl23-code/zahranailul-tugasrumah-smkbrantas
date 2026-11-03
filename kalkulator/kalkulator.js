
// Fungsi menghitung rata-rata
function hitungRataRata(tugas, uts, uas) {
    return (tugas + uts + uas) / 3;
}

// Fungsi menentukan predikat
function predikat(nilai) {

    if (nilai >= 90) {
        return "A - Sangat Baik";
    } else if (nilai >= 80) {
        return "B - Baik";
    } else if (nilai >= 70) {
        return "C - Cukup";
    } else if (nilai >= 60) {
        return "D - Kurang";
    } else {
        return "E - Sangat Kurang";
    }
}

// Fungsi menghitung nilai siswa
function hitungNilai() {

    // Mengambil nilai dari input
    let tugas = Number(document.getElementById("tugas").value);
    let uts = Number(document.getElementById("uts").value);
    let uas = Number(document.getElementById("uas").value);

    let hasil = document.getElementById("hasil");

    // Memeriksa input kosong
    if (
        document.getElementById("tugas").value === "" ||
        document.getElementById("uts").value === "" ||
        document.getElementById("uas").value === ""
    ) {
        hasil.innerHTML = "Mohon isi semua nilai terlebih dahulu!";
        return;
    }

    // Memeriksa batas nilai
    if (
        tugas < 0 || tugas > 100 ||
        uts < 0 || uts > 100 ||
        uas < 0 || uas > 100
    ) {
        hasil.innerHTML = "Nilai harus antara 0 sampai 100!";
        return;
    }

    // Menghitung rata-rata
    let rataRata = hitungRataRata(tugas, uts, uas);

    // Menentukan predikat
    let hasilPredikat = predikat(rataRata);

    // Menampilkan hasil
    hasil.innerHTML =
        "Rata-rata: " + rataRata.toFixed(2) +
        "<br>Predikat: " + hasilPredikat;
}
