// =====================================================================
// Grupo 2 - Navegação e Acessibilidade (PGW2)
// Apresentação navegável pelo teclado + tradução automática com VLibras
//
// Partes deste arquivo:
//   1. Elementos da página
//   2. Missões
//   3. Raio-X (mostra o que o JavaScript está fazendo)
//   4. Janela de ajuda (com o foco "preso" dentro dela)
//   5. Teclado: atalhos Alt+1..4, setas entre slides e links internos
//   6. Slides: progresso e sumário
//   7. VLibras: tradução automática no foco (Tab) e no mouse
//   8. Voz (Web Speech API)
//   9. Demonstrações de cada slide
//  10. Início
// =====================================================================


// ---------------------------------------------------------------------
// 1. Elementos da página
// ---------------------------------------------------------------------
const tutorial = document.getElementById("tutorial");
const tituloTutorial = document.getElementById("tutorial-titulo");
const optLibras = document.getElementById("opt-libras");
const optVoz = document.getElementById("opt-voz");
const optRaiox = document.getElementById("opt-raiox");
const painelTecla = document.getElementById("painel-tecla");
const painelTexto = document.getElementById("painel-texto");
const raiox = document.getElementById("raiox");
const raioxLista = document.getElementById("raiox-lista");
const toast = document.getElementById("toast");
const slides = Array.from(document.querySelectorAll(".slide"));


// ---------------------------------------------------------------------
// 2. Missões: se completam sozinhas conforme a pessoa usa a página
// ---------------------------------------------------------------------
const missoes = {
  tab: "Avance com Tab",
  shiftTab: "Volte com Shift + Tab",
  setas: "Troque de slide com as setas ← →",
  skip: "Use o link “Pular para o conteúdo”",
  atalho: "Use um atalho Alt + número",
  botao: "Aperte um botão com Enter ou Espaço",
  formulario: "Envie o formulário sem usar o mouse",
  libras: "Traduza a sua própria frase no VLibras",
  mouse: "Passe o mouse em um item para traduzir",
  voz: "Ligue a voz"
};
const missoesFeitas = [];
const listaMissoes = document.getElementById("lista-missoes");
const totalMissoes = Object.keys(missoes).length;

// Cria um <li> para cada missão
for (const chave in missoes) {
  const item = document.createElement("li");
  item.id = "missao-" + chave;
  item.textContent = missoes[chave];
  listaMissoes.appendChild(item);
}
atualizarMissoes();

function cumprir(chave) {
  if (missoesFeitas.includes(chave)) return;
  missoesFeitas.push(chave);
  document.getElementById("missao-" + chave).classList.add("feita");
  atualizarMissoes();
  mostrarToast("🎯 Missão cumprida: " + missoes[chave]);
}

function atualizarMissoes() {
  const texto = missoesFeitas.length + "/" + totalMissoes;
  document.getElementById("missoes-contador").textContent = texto;
  document.getElementById("missoes-final").textContent =
    missoesFeitas.length + " de " + totalMissoes + " cumpridas." +
    (missoesFeitas.length === totalMissoes ? " Parabéns! 🎉" : "");
}

let tempoToast = null;
function mostrarToast(mensagem) {
  toast.textContent = mensagem;
  toast.classList.add("visivel");
  clearTimeout(tempoToast);
  tempoToast = setTimeout(function () {
    toast.classList.remove("visivel");
  }, 3000);
}


// ---------------------------------------------------------------------
// 3. Raio-X: lista os últimos passos do JavaScript
// ---------------------------------------------------------------------
function raioX(mensagem) {
  const item = document.createElement("li");
  item.textContent = mensagem;
  raioxLista.prepend(item);                 // o mais novo fica em cima
  while (raioxLista.children.length > 8) {  // guarda só os 8 últimos
    raioxLista.lastElementChild.remove();
  }
}

optRaiox.addEventListener("change", function () {
  raiox.hidden = !optRaiox.checked;
  if (optRaiox.checked) raioX("Raio-X ligado. Aperte Tab e acompanhe aqui.");
});

// Descreve um elemento de forma curta: <button#btn-certo.botao>
function descrever(elemento) {
  let nome = "<" + elemento.tagName.toLowerCase();
  if (elemento.id) nome += "#" + elemento.id;
  else if (elemento.classList.length > 0) nome += "." + elemento.classList[0];
  return nome + ">";
}


// ---------------------------------------------------------------------
// 4. Janela de ajuda
// ---------------------------------------------------------------------
let elementoAntesDaAjuda = null; // para devolver o foco quando fechar

function abrirAjuda() {
  elementoAntesDaAjuda = document.activeElement;
  tutorial.classList.remove("escondido");
  tituloTutorial.focus();                     // o foco ENTRA na janela
  raioX("Janela aberta: foco foi para dentro dela");
}

function fecharAjuda() {
  tutorial.classList.add("escondido");
  if (elementoAntesDaAjuda && elementoAntesDaAjuda !== document.body) {
    elementoAntesDaAjuda.focus();             // o foco VOLTA para onde estava
    raioX("Janela fechada: foco voltou para " + descrever(elementoAntesDaAjuda));
  } else {
    focarInicioDaPagina();
  }
}

function ajudaAberta() {
  return !tutorial.classList.contains("escondido");
}

document.getElementById("btn-comecar").addEventListener("click", fecharAjuda);
document.getElementById("btn-ajuda").addEventListener("click", abrirAjuda);
document.getElementById("btn-ajuda-slide").addEventListener("click", abrirAjuda);

// Foco "preso" na janela: do último item volta para o primeiro (e vice-versa)
tutorial.addEventListener("keydown", function (evento) {
  if (evento.key !== "Tab") return;
  const focaveis = tutorial.querySelectorAll("button");
  const primeiro = focaveis[0];
  const ultimo = focaveis[focaveis.length - 1];

  if (evento.shiftKey && document.activeElement === primeiro) {
    evento.preventDefault();
    ultimo.focus();
    raioX("Foco preso: Shift+Tab voltou para o último item da janela");
  } else if (!evento.shiftKey && document.activeElement === ultimo) {
    evento.preventDefault();
    primeiro.focus();
    raioX("Foco preso: Tab voltou para o primeiro item da janela");
  }
});

// Coloca o foco no começo da página: o próximo Tab mostra o skip link
function focarInicioDaPagina() {
  window.scrollTo(0, 0);
  document.body.setAttribute("tabindex", "-1");
  document.body.focus();
  document.body.removeAttribute("tabindex");
  raioX("Foco no começo da página. O próximo Tab é o skip link.");
}


// ---------------------------------------------------------------------
// 5. Teclado: atalhos, setas e links internos
// ---------------------------------------------------------------------
const atalhos = { "1": "conteudo", "2": "menu", "3": "formulario", "4": "rodape" };
let ultimaEntradaFoiMouse = false; // usado na missão do formulário
let contTab = 0;
let contShift = 0;

document.addEventListener("mousedown", function () { ultimaEntradaFoiMouse = true; });

document.addEventListener("keydown", function (evento) {
  mostrarTecla(evento);
  ultimaEntradaFoiMouse = false;

  // Esc fecha a ajuda
  if (evento.key === "Escape" && ajudaAberta()) {
    fecharAjuda();
    return;
  }
  if (ajudaAberta()) return;  // com a janela aberta, os outros atalhos ficam desligados

  // Tab e Shift+Tab: contadores e missões
  if (evento.key === "Tab") {
    if (evento.shiftKey) {
      contShift++;
      document.getElementById("cont-shift").textContent = contShift;
      cumprir("shiftTab");
    } else {
      contTab++;
      document.getElementById("cont-tab").textContent = contTab;
      cumprir("tab");
    }
    return;
  }

  // Se a pessoa está digitando, as teclas abaixo não fazem nada especial
  const tag = document.activeElement.tagName;
  const digitando = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

  // ? abre a ajuda
  if (evento.key === "?" && !digitando) {
    abrirAjuda();
    return;
  }

  // Alt + 1..4: pula para a região (padrão eMAG)
  if (evento.altKey && atalhos[evento.key]) {
    evento.preventDefault();
    raioX("Atalho Alt+" + evento.key + " → irPara('" + atalhos[evento.key] + "')");
    irPara(atalhos[evento.key]);
    cumprir("atalho");
    return;
  }

  // Setas ← → trocam de slide
  const semModificador = !evento.altKey && !evento.ctrlKey && !evento.shiftKey && !evento.metaKey;
  if (!digitando && semModificador && (evento.key === "ArrowRight" || evento.key === "ArrowLeft")) {
    evento.preventDefault();
    const atual = indiceSlideAtual();
    const novo = evento.key === "ArrowRight" ? atual + 1 : atual - 1;
    if (novo >= 0 && novo < slides.length) {
      raioX("Seta " + (evento.key === "ArrowRight" ? "→" : "←") + ": slide " + (novo + 1));
      irPara(slides[novo].id);
      cumprir("setas");
    }
  }
});

function mostrarTecla(evento) {
  let nome = evento.key === " " ? "Espaço" : evento.key;
  if (evento.key === "Tab" && evento.shiftKey) nome = "Shift + Tab";
  else if (evento.altKey && evento.key !== "Alt") nome = "Alt + " + evento.key;
  painelTecla.textContent = nome;
}

// Links internos (#teclado, #menu...) movem o FOCO, e não só a rolagem.
// Sem isso, o próximo Tab continuaria de onde o link estava.
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (evento) {
    const id = link.getAttribute("href").substring(1);
    if (!document.getElementById(id)) return;
    evento.preventDefault();
    if (link.classList.contains("pular-link")) {
      raioX("Skip link usado: foco foi para o <main>");
      cumprir("skip");
    }
    irPara(id);
  });
});

function irPara(id) {
  const alvo = document.getElementById(id);
  // Regiões como <main> e <section> não recebem foco: o tabindex="-1" permite
  if (!alvo.hasAttribute("tabindex") && !alvo.matches("a, button, input, select, textarea")) {
    alvo.setAttribute("tabindex", "-1");
  }
  alvo.focus({ preventScroll: true });
  alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", "#" + id);
}


// ---------------------------------------------------------------------
// 6. Slides: progresso e sumário
// ---------------------------------------------------------------------
const linksSumario = document.querySelectorAll("#menu a");
let slideAnterior = -1;

// O slide atual é o último cujo topo já passou de 1/3 da tela
function indiceSlideAtual() {
  let atual = 0;
  slides.forEach(function (slide, i) {
    if (slide.getBoundingClientRect().top < window.innerHeight / 3) atual = i;
  });
  return atual;
}

function atualizarProgresso() {
  const atual = indiceSlideAtual();
  if (atual === slideAnterior) return;
  slideAnterior = atual;

  document.getElementById("progresso-texto").textContent = (atual + 1) + " de " + slides.length;
  document.getElementById("progresso-barra").style.width = ((atual + 1) / slides.length * 100) + "%";

  linksSumario.forEach(function (link, i) {
    if (i === atual) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });

  // Saiu do slide "Foco visível"? Liga o foco de novo, por segurança
  if (slides[atual].id !== "foco") ligarFocoVisivel(true);
}

window.addEventListener("scroll", atualizarProgresso);
window.addEventListener("resize", atualizarProgresso);


// ---------------------------------------------------------------------
// 7. VLibras: tradução automática
// ---------------------------------------------------------------------
const SELETOR_TRADUZIVEL = "[data-libras], a, button, input, select, textarea, h1, h2, h3, p, li";
const REGIOES = ".slide, main, nav, footer, #missoes"; // não destacar a região inteira

let temporizador = null;   // espera a pessoa "parar" num item
let ultimoTexto = "";
let itemDestacado = null;

// Passo 1 – evento de FOCO (Tab, Shift+Tab, atalhos, links)
document.addEventListener("focusin", function (evento) {
  const alvo = evento.target.closest(SELETOR_TRADUZIVEL);
  if (alvo) agendarTraducao(alvo, "focusin");
});

// Passo 1 – evento de MOUSE
// Usamos "mousemove" (e não "mouseover") porque, quando a página rola pelo
// teclado, o item que passa embaixo do mouse PARADO também dispara "mouseover"
// e seria traduzido sem querer. O "mousemove" só conta se o mouse se mexeu.
let mouseX = -1;
let mouseY = -1;
document.addEventListener("mousemove", function (evento) {
  if (evento.screenX === mouseX && evento.screenY === mouseY) return; // não mexeu
  mouseX = evento.screenX;
  mouseY = evento.screenY;

  if (evento.target.closest("#vlibras-access-wrapper, #vlibras-app-root, #raiox")) return;
  const alvo = evento.target.closest("[data-libras]") || evento.target.closest(SELETOR_TRADUZIVEL);
  if (!alvo || alvo === itemDestacado || alvo.matches(REGIOES)) return;
  agendarTraducao(alvo, "mousemove");
});

// Passos 2 e 3 – pega o texto e espera 600 ms
function agendarTraducao(elemento, tipoEvento) {
  destacar(elemento);
  const texto = textoDoElemento(elemento);

  acenderPasso(1, tipoEvento + " em " + descrever(elemento));
  acenderPasso(2, '"' + texto + '"');
  acenderPasso(3, "esperando…");
  raioX(tipoEvento + " em " + descrever(elemento) + ' → texto: "' + texto + '"');

  clearTimeout(temporizador);  // se outro item recebeu foco antes, cancela o anterior
  temporizador = setTimeout(function () {
    acenderPasso(3, "600 ms ok");
    if (tipoEvento === "mousemove") cumprir("mouse");
    traduzir(texto);
  }, 600);
}

function destacar(elemento) {
  if (itemDestacado) itemDestacado.classList.remove("traduzindo");
  itemDestacado = null;
  if (elemento.matches(REGIOES)) return;
  itemDestacado = elemento;
  elemento.classList.add("traduzindo");
}

// Passo 2 – escolhe o melhor texto para traduzir
function textoDoElemento(elemento) {
  if (elemento.dataset.libras) return elemento.dataset.libras;           // texto curto escrito por nós
  if (elemento.getAttribute("aria-label")) return elemento.getAttribute("aria-label");
  if (elemento.labels && elemento.labels.length > 0) {                   // campo de formulário
    return elemento.labels[0].textContent.trim();
  }
  return elemento.textContent.replace(/\s+/g, " ").trim().substring(0, 200);
}

// Passo 4 – envia para o VLibras (e para a voz, se estiver ligada)
function traduzir(texto, forcar) {
  if (!texto) return;
  if (texto === ultimoTexto && !forcar) return;  // não repete o mesmo texto
  ultimoTexto = texto;
  painelTexto.textContent = texto;

  if (optLibras.checked) traduzirEmLibras(texto);
  if (optVoz.checked) falar(texto);
}

let textoPendente = null;
let esperandoVLibras = null;

function vlibrasPronto() {
  // window.plugin.translate é criado pelo VLibras quando o avatar termina de carregar
  return window.plugin && typeof window.plugin.translate === "function";
}

function traduzirEmLibras(texto) {
  if (vlibrasPronto()) {
    window.plugin.translate(texto);
    acenderPasso(4, 'translate("' + texto + '")');
    acenderPasso(5, "sinalizando 🤟");
    raioX('window.plugin.translate("' + texto + '")');
    return;
  }
  // Avatar ainda carregando: guarda o texto e tenta de novo a cada meio segundo
  textoPendente = texto;
  acenderPasso(4, "avatar carregando…");
  abrirVLibras();
  if (!esperandoVLibras) {
    esperandoVLibras = setInterval(function () {
      if (vlibrasPronto()) {
        clearInterval(esperandoVLibras);
        esperandoVLibras = null;
        traduzirEmLibras(textoPendente);
      }
    }, 500);
  }
}

// Abre o avatar (o mesmo que clicar no botão azul do VLibras)
function abrirVLibras() {
  if (window.VLibrasWidget && typeof window.VLibrasWidget.open === "function") {
    window.VLibrasWidget.open();
  }
}

optLibras.addEventListener("change", function () {
  if (optLibras.checked) abrirVLibras();
});

// Com o avatar aberto, o VLibras "segura" cliques em links e botões para traduzir
// e pede confirmação antes de executar. Como aqui a tradução já acontece no
// foco/mouse, marcamos o clique para o VLibras ignorar e o link/botão funcionar
// direto (inclusive com Enter e Espaço).
window.addEventListener("click", function (evento) {
  if (!optLibras.checked) return;
  if (evento.target.closest && evento.target.closest("#vlibras-access-wrapper, #vlibras-app-root")) return;
  Object.defineProperty(evento, "__vlibrasSyntheticClick", { value: true });
}, true);

// Diagrama do slide "Tab + VLibras": acende cada passo
const passosFluxo = document.querySelectorAll("#fluxo li");
function acenderPasso(numero, detalhe) {
  if (numero === 1) {
    passosFluxo.forEach(function (passo) { passo.classList.remove("ativo"); });
    for (let i = 1; i <= 5; i++) document.getElementById("fluxo-" + i).textContent = "—";
  }
  passosFluxo[numero - 1].classList.add("ativo");
  document.getElementById("fluxo-" + numero).textContent = detalhe;
}


// ---------------------------------------------------------------------
// 8. Voz (leitor de tela simples com a Web Speech API)
// ---------------------------------------------------------------------
const btnVozSlide = document.getElementById("btn-voz-slide");

function falar(texto) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();                  // para a fala anterior
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  window.speechSynthesis.speak(fala);
}

function atualizarVoz() {
  btnVozSlide.textContent = optVoz.checked ? "Desligar a voz 🔇" : "Ligar a voz 🔊";
  if (optVoz.checked) {
    falar("Voz ligada");
    cumprir("voz");
  } else if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

optVoz.addEventListener("change", atualizarVoz);
btnVozSlide.addEventListener("click", function () {
  optVoz.checked = !optVoz.checked;
  atualizarVoz();
});


// ---------------------------------------------------------------------
// 9. Demonstrações dos slides
// ---------------------------------------------------------------------

// Missão "botão pelo teclado": um clique feito pelo teclado tem detail = 0
document.addEventListener("click", function (evento) {
  if (evento.detail === 0 && evento.target.closest("button")) cumprir("botao");
});

// --- Foco visível: liga/desliga ---
const btnFoco = document.getElementById("btn-foco");
const msgFoco = document.getElementById("msg-foco");

function ligarFocoVisivel(ligar) {
  document.body.classList.toggle("sem-foco", !ligar);
  btnFoco.setAttribute("aria-pressed", String(!ligar));
  btnFoco.textContent = ligar ? "Desligar foco visível" : "Ligar foco visível";
}

btnFoco.addEventListener("click", function () {
  const desligado = document.body.classList.contains("sem-foco");
  ligarFocoVisivel(desligado);
  if (desligado) {
    msgFoco.textContent = "Foco visível ligado de novo. Bem melhor, não é?";
  } else {
    msgFoco.textContent = "Foco desligado! Aperte Tab e tente descobrir onde você está.";
  }
  raioX("body.classList.toggle('sem-foco')");
});

// --- Skip link: volta o foco para o começo ---
document.getElementById("btn-testar-skip").addEventListener("click", function () {
  focarInicioDaPagina();
  mostrarToast("Agora aperte Tab e depois Enter ⌨️");
});

// --- tabindex: foco na caixa C pelo JavaScript ---
document.getElementById("btn-focar-c").addEventListener("click", function () {
  document.getElementById("caixa-c").focus();
  raioX('document.getElementById("caixa-c").focus()');
});

// --- Certo x Errado ---
const msgComparacao = document.getElementById("msg-comparacao");

document.getElementById("div-botao").addEventListener("click", function () {
  msgComparacao.textContent = "A div funcionou com o MOUSE, mas pelo teclado ela nunca recebe foco.";
});

document.getElementById("btn-certo").addEventListener("click", function () {
  msgComparacao.textContent = "O button funcionou! Com mouse, Enter ou Espaço.";
  traduzir("O botão funcionou", true);
});

// --- Formulário ---
const form = document.getElementById("form-contato");
const msgForm = document.getElementById("msg-form");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");

  if (nome.value.trim() === "") {
    msgForm.textContent = "Preencha o nome.";
    nome.focus();                       // leva o foco direto para o campo com erro
    raioX("Erro no nome → nome.focus()");
    traduzir("Erro: preencha o nome", true);
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    msgForm.textContent = "Digite um e-mail válido.";
    email.focus();
    raioX("Erro no e-mail → email.focus()");
    traduzir("Erro: digite um e-mail válido", true);
    return;
  }
  msgForm.textContent = "Obrigado, " + nome.value.trim() + "! Mensagem enviada.";
  traduzir("Obrigado! Mensagem enviada.", true);
  if (!formUsouMouse) cumprir("formulario");
  form.reset();
});

// Missão do formulário: verifica se o mouse foi usado dentro dele
let formUsouMouse = false;
form.addEventListener("focusin", function (evento) {
  if (!form.contains(evento.relatedTarget)) formUsouMouse = ultimaEntradaFoiMouse; // acabou de entrar
});
form.addEventListener("mousedown", function () { formUsouMouse = true; });

// --- VLibras: traduzir uma frase escrita pela pessoa ---
document.getElementById("btn-traduzir-frase").addEventListener("click", function () {
  const frase = document.getElementById("frase").value.trim();
  if (frase === "") return;
  traduzir(frase, true);
  cumprir("libras");
});


// ---------------------------------------------------------------------
// 10. Início
// ---------------------------------------------------------------------
atualizarProgresso();
window.addEventListener("load", function () {
  abrirVLibras();
  abrirAjuda();
  traduzir(tituloTutorial.dataset.libras);
});
