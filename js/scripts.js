// =============================================================
// Navegação por teclado + tradução automática com VLibras
// Grupo 2 - Navegação e Acessibilidade (PGW2)
// =============================================================

// ---------- Elementos da página ----------
const tutorial = document.getElementById("tutorial");
const tituloTutorial = document.getElementById("tutorial-titulo");
const btnComecar = document.getElementById("btn-comecar");
const btnAjuda = document.getElementById("btn-ajuda");
const optLibras = document.getElementById("opt-libras");
const optVoz = document.getElementById("opt-voz");
const painelTecla = document.getElementById("painel-tecla");
const painelTexto = document.getElementById("painel-texto");

let elementoAntesDoTutorial = null; // para devolver o foco ao fechar a ajuda
let temporizador = null;            // espera o usuário "parar" num item antes de traduzir
let ultimoTexto = "";
let itemDestacado = null;

// ---------- 1) Tutorial inicial ----------
function abrirTutorial() {
  elementoAntesDoTutorial = document.activeElement;
  tutorial.classList.remove("escondido");
  tituloTutorial.focus();
  traduzir(tituloTutorial.dataset.libras);
}

function fecharTutorial() {
  tutorial.classList.add("escondido");
  if (elementoAntesDoTutorial && elementoAntesDoTutorial !== document.body) {
    elementoAntesDoTutorial.focus();
  } else {
    // Volta o foco para o início da página: o próximo Tab mostra o "Pular para o conteúdo"
    document.body.setAttribute("tabindex", "-1");
    document.body.focus();
    document.body.removeAttribute("tabindex");
  }
}

btnComecar.addEventListener("click", fecharTutorial);
btnAjuda.addEventListener("click", abrirTutorial);

// Mantém o Tab "preso" dentro do tutorial enquanto ele está aberto (focus trap)
tutorial.addEventListener("keydown", function (evento) {
  if (evento.key !== "Tab") return;
  const focaveis = tutorial.querySelectorAll("button");
  const primeiro = focaveis[0];
  const ultimo = focaveis[focaveis.length - 1];
  if (evento.shiftKey && document.activeElement === primeiro) {
    evento.preventDefault();
    ultimo.focus();
  } else if (!evento.shiftKey && document.activeElement === ultimo) {
    evento.preventDefault();
    primeiro.focus();
  }
});

// ---------- 2) Atalhos de teclado ----------
const atalhos = {
  "1": "conteudo",
  "2": "menu",
  "3": "formulario",
  "4": "rodape"
};

document.addEventListener("keydown", function (evento) {
  mostrarTecla(evento);

  const tutorialAberto = !tutorial.classList.contains("escondido");

  if (evento.key === "Escape" && tutorialAberto) {
    fecharTutorial();
    return;
  }

  // "?" abre a ajuda (fora de campos de texto)
  const digitando = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);
  if (evento.key === "?" && !digitando && !tutorialAberto) {
    abrirTutorial();
    return;
  }

  // Alt + 1..4 → pula para a região (padrão eMAG do governo)
  if (evento.altKey && atalhos[evento.key] && !tutorialAberto) {
    evento.preventDefault();
    irPara(atalhos[evento.key]);
  }
});

// Links internos (#conteudo, #menu...) também movem o foco, não só a rolagem
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (evento) {
    const id = link.getAttribute("href").substring(1);
    if (document.getElementById(id)) {
      evento.preventDefault();
      irPara(id);
    }
  });
});

function irPara(id) {
  const alvo = document.getElementById(id);
  if (!alvo.hasAttribute("tabindex") && !alvo.matches("a, button, input, select, textarea")) {
    alvo.setAttribute("tabindex", "-1");
  }
  alvo.focus();
  alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", "#" + id);

  const titulo = alvo.querySelector("h1, h2");
  traduzir(titulo ? textoDoElemento(titulo) : textoDoElemento(alvo));
}

function mostrarTecla(evento) {
  let nome = evento.key === " " ? "Espaço" : evento.key;
  if (evento.key === "Tab" && evento.shiftKey) nome = "Shift + Tab";
  else if (evento.altKey && evento.key !== "Alt") nome = "Alt + " + evento.key;
  painelTecla.textContent = nome;
}

// ---------- 3) VLibras: traduz o item com foco ou com o mouse em cima ----------
const SELETOR_TRADUZIVEL = "[data-libras], a, button, input, select, textarea, h1, h2, h3, p, li";

// Foco pelo teclado (Tab / Shift+Tab)
document.addEventListener("focusin", function (evento) {
  const alvo = evento.target.closest(SELETOR_TRADUZIVEL);
  if (alvo) agendarTraducao(alvo);
});

// Mouse em cima do item
document.addEventListener("mouseover", function (evento) {
  if (evento.target.closest("#vlibras-access-wrapper, #vlibras-app-root")) return;
  const alvo = evento.target.closest("[data-libras]") || evento.target.closest(SELETOR_TRADUZIVEL);
  if (alvo && alvo !== itemDestacado) agendarTraducao(alvo);
});

// Com o avatar aberto, o VLibras "segura" cliques em links e botões para traduzir
// e pede uma confirmação antes de executar. Como aqui a tradução já acontece no
// foco/mouse, marcamos o clique para o VLibras ignorar e o link/botão funcionar
// direto (inclusive com Enter e Espaço pelo teclado).
window.addEventListener("click", function (evento) {
  if (!optLibras.checked) return;
  if (evento.target.closest && evento.target.closest("#vlibras-access-wrapper, #vlibras-app-root")) return;
  Object.defineProperty(evento, "__vlibrasSyntheticClick", { value: true });
}, true);

// Espera 600 ms parado no item: se a pessoa apertar Tab várias vezes seguidas,
// só o último item é traduzido (o avatar não fica "atrasado").
function agendarTraducao(elemento) {
  destacar(elemento);
  clearTimeout(temporizador);
  temporizador = setTimeout(function () {
    traduzir(textoDoElemento(elemento));
  }, 600);
}

function destacar(elemento) {
  if (itemDestacado) itemDestacado.classList.remove("traduzindo");
  itemDestacado = elemento;
  elemento.classList.add("traduzindo");
}

// Escolhe o melhor texto para traduzir
function textoDoElemento(elemento) {
  if (elemento.dataset.libras) return elemento.dataset.libras;
  if (elemento.getAttribute("aria-label")) return elemento.getAttribute("aria-label");

  // Campo de formulário: usa o texto do <label>
  if (elemento.labels && elemento.labels.length > 0) {
    return elemento.labels[0].textContent.trim();
  }
  return elemento.textContent.replace(/\s+/g, " ").trim().substring(0, 200);
}

function traduzir(texto) {
  if (!texto || texto === ultimoTexto) return;
  ultimoTexto = texto;
  painelTexto.textContent = texto;

  if (optLibras.checked) traduzirEmLibras(texto);
  if (optVoz.checked) falar(texto);
}

let textoPendente = null;
let esperandoVLibras = null;

function traduzirEmLibras(texto) {
  // window.plugin.translate é criado pelo VLibras depois que o avatar carrega
  if (vlibrasPronto()) {
    window.plugin.translate(texto);
    return;
  }
  // Avatar ainda carregando: guarda o último texto e traduz assim que ficar pronto
  textoPendente = texto;
  abrirVLibras();
  if (!esperandoVLibras) {
    esperandoVLibras = setInterval(function () {
      if (vlibrasPronto()) {
        clearInterval(esperandoVLibras);
        esperandoVLibras = null;
        window.plugin.translate(textoPendente);
      }
    }, 500);
  }
}

function vlibrasPronto() {
  return window.plugin && typeof window.plugin.translate === "function";
}

// Abre o avatar automaticamente (o mesmo que clicar no botão azul)
function abrirVLibras() {
  if (window.VLibrasWidget && typeof window.VLibrasWidget.open === "function") {
    window.VLibrasWidget.open();
  }
}

// ---------- 4) Voz (leitor de tela simples com a Web Speech API) ----------
function falar(texto) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  window.speechSynthesis.speak(fala);
}

optVoz.addEventListener("change", function () {
  if (optVoz.checked) falar("Voz ativada");
  else window.speechSynthesis.cancel();
});

optLibras.addEventListener("change", function () {
  if (optLibras.checked) abrirVLibras();
});

// ---------- 5) Exemplo Certo x Errado ----------
const msgComparacao = document.getElementById("msg-comparacao");

document.getElementById("div-botao").addEventListener("click", function () {
  msgComparacao.textContent = "A div funcionou com o MOUSE, mas pelo teclado ela nunca recebe foco.";
});

document.getElementById("btn-certo").addEventListener("click", function () {
  msgComparacao.textContent = "O button funcionou! Com mouse, Enter ou Espaço.";
  traduzir("O botão funcionou");
});

// ---------- 6) Formulário ----------
const form = document.getElementById("form-contato");
const msgForm = document.getElementById("msg-form");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");

  if (nome.value.trim() === "") {
    msgForm.textContent = "Preencha o nome.";
    nome.focus(); // leva o foco direto para o campo com erro
    traduzir("Erro: preencha o nome");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    msgForm.textContent = "Digite um e-mail válido.";
    email.focus();
    traduzir("Erro: digite um e-mail válido");
    return;
  }
  msgForm.textContent = "Obrigado, " + nome.value.trim() + "! Mensagem enviada.";
  traduzir("Obrigado! Mensagem enviada.");
  form.reset();
});

// ---------- Início ----------
window.addEventListener("load", function () {
  abrirVLibras();
  abrirTutorial();
});
