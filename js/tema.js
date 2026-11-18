const tombolTema = document.querySelector("#btn-tema");

if (tombolTema) {
  const temaGelapAktif = localStorage.getItem("tema") === "gelap";

  if (temaGelapAktif) {
    document.body.classList.add("gelap");
  }

  const perbaruiTombolTema = () => {
    const gelap = document.body.classList.contains("gelap");
    tombolTema.textContent = gelap ? "☀️ Mode Terang" : "🌙 Mode Gelap";
  };

  perbaruiTombolTema();

  tombolTema.addEventListener("click", () => {
    const gelap = document.body.classList.toggle("gelap");
    localStorage.setItem("tema", gelap ? "gelap" : "terang");
    perbaruiTombolTema();
  });
}
