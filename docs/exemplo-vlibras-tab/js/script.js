let temporizador;      // guarda o setTimeout agendado
let itemAtual = null;  // último item agendado

window.onload = function () {
  window.VLibrasWidget.open();                         // abre o avatar
  document.addEventListener("focusin", aoFocar);       // Tab
  document.addEventListener("mousemove", aoMoverMouse); // mouse
};

function aoFocar(e) {
  agendarTraducao(e.target);
}

function aoMoverMouse(e) {
  let item = e.target.closest("[data-libras]");
  if (item && item !== itemAtual) {
    agendarTraducao(item);
  }
}

function agendarTraducao(item) {
  itemAtual = item;
  let texto = item.dataset.libras || item.textContent;
  clearTimeout(temporizador);          // cancela o anterior
  temporizador = setTimeout(function () {
    traduzir(texto);
  }, 600);                             // espera 600 ms
}

function traduzir(texto) {
  if (window.plugin && window.plugin.translate) {
    window.plugin.translate(texto);
  }
}
