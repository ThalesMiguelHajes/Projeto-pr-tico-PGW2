# Conteúdo dos slides – Grupo 2: Navegação e Acessibilidade

> **Para que serve este arquivo:** é o texto de cada slide, antes de montar a apresentação.
> Segue o formato das aulas da Profa. Cristiane: título no topo, tópicos curtos (□ e –),
> problema → código → explicação, **notas em caixa amarela** ao lado do código, tabela com
> cabeçalho preto, “Dúvidas?”, “Exercícios de fixação” e “Referências”.
>
> **Objetivo:** quem nunca usou essas ferramentas deve conseguir aplicar só lendo os slides.
>
> **Legenda:**
> - `□` tópico · `–` subtópico
> - 📦 **Código** = caixa de código
> - 🟨 **Nota** = caixa amarela ao lado do código
> - ▶️ **Demo** = mostrar no site da apresentação
> - ⭐ = slide essencial (se faltar tempo, os outros podem sair)

> **Atualização:** a versão final está nos slides. Neles foram adicionados as etiquetas “No HTML / No CSS / No JavaScript” em cada código, um resumo do que vai em cada arquivo (fim da Parte 2) e 7 slides novos na Parte 3 explicando `focusin`, `mousemove`, os 600 ms (`setTimeout`/`clearTimeout`) e `traduzir()`. O exemplo mínimo testado está em `docs/exemplo-vlibras-tab/`.

**Divisão:**

| Parte | Tema | Slides |
|---|---|---|
| Abertura | Capa, sumário e introdução | 1 – 4 |
| **Parte 1** | **UI/UX: como estruturar a página para facilitar a navegação** | 5 – 15 |
| **Parte 2** | **Código: navegação pelo Tab, mover o foco e criar atalhos** | 16 – 31 |
| **Parte 3** | **VLibras: como funciona e como usar no código** | 32 – 43 |
| Encerramento | Demonstração, dúvidas, exercícios e referências | 44 – 47 |

---

## ABERTURA

### Slide 1 – Capa ⭐
- Desenvolvimento de Páginas Web Dinâmicas – PGW2
- **Navegação e Acessibilidade: teclado e VLibras**
- Grupo 2: *(nomes dos integrantes)*
- IFSP – Câmpus Araraquara

### Slide 2 – Sumário ⭐
- □ Introdução
- □ Parte 1 – Estrutura da página (UI/UX)
- □ Parte 2 – Navegação pelo teclado no código
- □ Parte 3 – VLibras
- □ Demonstração
- □ Exercícios de fixação
- □ Referências

### Slide 3 – Introdução: o que é acessibilidade na Web ⭐
- □ Acessibilidade na Web: **qualquer pessoa consegue perceber, entender, navegar e interagir** com o site, inclusive pessoas com deficiência.
- □ Comparação: é a **rampa** na entrada do prédio. Ajuda o cadeirante, mas também quem está com carrinho de bebê ou mala.
- □ No Brasil, **18,6 milhões** de pessoas têm alguma deficiência (IBGE, PNAD Contínua 2022).

### Slide 4 – Introdução: quem depende do que vamos mostrar ⭐

**Tabela:**

| Quem | Como navega | O que precisa |
|---|---|---|
| Pessoa cega | Leitor de tela + teclado | Estrutura bem feita e tudo funcionando pelo teclado |
| Pessoa com deficiência motora | Teclado ou acionadores | Navegar sem mouse e ver onde está o foco |
| Pessoa surda | Visão | Conteúdo em **Libras** (VLibras) |
| Todo mundo | Mouse quebrado, braço engessado, “usuário rápido” | Atalhos |

- □ Normas:
  - – **WCAG 2.2** (W3C): padrão mundial.
  - – **eMAG 3.1**: Modelo de Acessibilidade em Governo Eletrônico, o padrão do governo brasileiro.
- □ Leis:
  - – **Lei 13.146/2015** (Lei Brasileira de Inclusão), art. 63: sites de empresas e órgãos públicos devem ser acessíveis.
  - – **Lei 10.436/2002**: reconhece a Libras.

---

## PARTE 1 – UI/UX: COMO ESTRUTURAR A PÁGINA PARA FACILITAR A NAVEGAÇÃO

### Slide 5 – Como uma pessoa navega sem mouse ⭐
- □ Pelo **teclado**: a tecla **Tab** pula de um item clicável para o próximo (links, botões, campos).
- □ Pelo **leitor de tela** (ex.: NVDA, gratuito para Windows), por atalhos:
  - – **H**: próximo título (`h1`, `h2`…)
  - – **D**: próxima região (cabeçalho, menu, conteúdo, rodapé)
  - – **K**: próximo link · **F**: próximo campo de formulário
- □ **Conclusão:** quem não usa mouse navega pela **estrutura** da página. Página mal estruturada vira um labirinto.

### Slide 6 – Estrutura semântica: as regiões da página ⭐
- □ Cada parte da página deve usar a **tag que diz o que ela é**: `header`, `nav`, `main`, `aside`, `footer`.
- □ O leitor de tela anuncia essas regiões, e a pessoa pula direto para elas.

📦 **Código:**
```html
<body>
  <header> logo, barra de acessibilidade </header>
  <nav> menu principal </nav>
  <main id="conteudo"> conteúdo principal (só 1 por página) </main>
  <aside> conteúdo relacionado </aside>
  <footer id="rodape"> contato, endereço </footer>
</body>
```

🟨 **Nota:** Evite montar tudo com `<div>`. Para o leitor de tela, uma `div` não significa nada. Recomendações eMAG 1.2 (“Organizar o código HTML de forma lógica e semântica”) e 1.8 (“Dividir as áreas de informação”).

### Slide 7 – Títulos em hierarquia
- □ Use **um** `h1` (o assunto da página) e depois `h2`, `h3`… **sem pular níveis**.
- □ O título é escolhido pelo **significado**, não pelo tamanho da letra. Para mudar o tamanho, use CSS.

📦 **Código:**
```html
<h1>Curso de ADS</h1>
  <h2>Disciplinas</h2>
    <h3>PGW2</h3>
  <h2>Contato</h2>
```

🟨 **Nota:** Quem usa leitor de tela costuma navegar **pulando de título em título** (tecla H). eMAG 1.3: “Utilizar corretamente os níveis de cabeçalho”.

### Slide 8 – Ordem lógica = ordem do Tab ⭐
- □ O Tab segue a **ordem do código HTML**, de cima para baixo.
- □ Por isso, a ordem **visual** da página tem que ser a **mesma** ordem do HTML.
- □ ❌ Erro comum: usar CSS (`float`, `order`, `position`) para “trocar de lugar” os blocos. Na tela parece certo, mas o Tab pula de um lado para o outro.
- □ Regra prática: leia o HTML de cima para baixo. A ordem deve fazer sentido, como um texto.

🟨 **Nota:** WCAG 2.4.3 – Ordem do foco. eMAG 1.4: “Ordenar de forma lógica e intuitiva a leitura e tabulação”.

### Slide 9 – Barra de acessibilidade (padrão gov.br) ⭐
- □ O eMAG pede uma **barra no topo de todas as páginas** com:
  - – **Atalhos**: ir para o conteúdo **[1]**, menu **[2]**, busca **[3]** e rodapé **[4]**
  - – **Alto contraste**
  - – Link para a página de **Acessibilidade** (que explica os recursos do site)
- □ As **teclas** dos atalhos devem aparecer escritas na própria barra.
- □ Exemplo real: o topo de qualquer site gov.br.

▶️ **Demo:** a faixa azul-escura no topo do nosso site.

🟨 **Nota:** eMAG, seção “Elementos padronizados”, item 4.3 (barra de acessibilidade). Em geral, o botão do **VLibras** também fica disponível nessas páginas.

### Slide 10 – “Pular para o conteúdo” (skip link) ⭐
- □ **Problema:** para chegar ao conteúdo, a pessoa precisa passar pelo menu inteiro com Tab, **em toda página**.
- □ **Solução:** o **primeiro link da página** leva direto ao conteúdo principal.
- □ Ele pode ficar **escondido** e aparecer só quando recebe o foco (no primeiro Tab).

🟨 **Nota:** eMAG 1.5: “Fornecer âncoras para ir direto a um bloco de conteúdo”. O eMAG diz ainda que “o primeiro link da página deve ser o de ir para o conteúdo”. WCAG 2.4.1 – Ignorar blocos.

▶️ **Demo:** recarregar o site e apertar Tab.

### Slide 11 – Foco visível ⭐
- □ Quem usa mouse vê a setinha. Quem usa teclado precisa ver **onde está o foco**.
- □ O foco deve ter **bom contraste** com o fundo (borda grossa, cor forte).
- □ ❌ **Nunca** apague a borda de foco sem colocar outra no lugar.
- □ O item com foco **não pode ficar escondido** atrás de menus fixos no topo.

🟨 **Nota:** eMAG 4.4: “Possibilitar que o elemento com foco seja visualmente evidente”. WCAG 2.4.7 (Foco visível) e 2.4.11 (Foco não encoberto).

▶️ **Demo:** botão “Desligar foco visível” do site.

### Slide 12 – Links e botões: cada um no seu papel
- □ **Link** (`<a>`) **leva** para outro lugar (outra página, outra parte da página).
- □ **Botão** (`<button>`) **faz uma ação** (enviar, abrir, fechar, salvar).
- □ O texto do link deve fazer sentido **sozinho**:
  - – ❌ “Clique **aqui**”
  - – ✅ “Baixar o edital (PDF)”
- □ A área clicável deve ter tamanho suficiente (mínimo de **24 × 24 px**).

🟨 **Nota:** O leitor de tela pode listar **só os links** da página, e uma lista com dez “clique aqui” não ajuda ninguém. WCAG 2.4.4 (Finalidade do link) e 2.5.8 (Tamanho do alvo).

### Slide 13 – Formulários fáceis de navegar
- □ Todo campo com um **rótulo visível** ligado a ele (`<label>`).
- □ Campos parecidos **agrupados** (`<fieldset>` + `<legend>`).
- □ Ordem lógica dos campos (nome → e-mail → mensagem → enviar).
- □ **Instruções antes** do campo (ex.: “Data no formato dd/mm/aaaa”).
- □ Se der **erro**: dizer qual é o erro, perto do campo, e **levar o foco até ele**.

🟨 **Nota:** eMAG 6.2 (Associar etiquetas aos seus campos), 6.3 (Ordem lógica de navegação), 6.5 (Instruções), 6.6 (Identificar e descrever erros) e 6.7 (Agrupar campos).

### Slide 14 – Janelas, avisos e o foco
- □ Ao abrir uma janela por cima da página (**modal**):
  - – o foco **entra** na janela;
  - – o Tab **fica dentro** dela;
  - – **Esc** fecha;
  - – ao fechar, o foco **volta** para onde estava.
- □ Não abrir **novas abas ou janelas** sem avisar a pessoa.
- □ Onde colocar o **botão do VLibras**: na lateral, sem cobrir textos nem botões.

🟨 **Nota:** eMAG 1.9: “Não abrir novas instâncias sem a solicitação do usuário”. WCAG 2.1.2: a pessoa nunca pode ficar **presa** sem conseguir sair usando o teclado.

### Slide 15 – Teste de 5 minutos: tire o mouse ⭐

**Checklist:**
- □ Consigo usar **tudo** só com Tab, Shift+Tab, Enter, Espaço e setas?
- □ Sempre **vejo** onde está o foco?
- □ A **ordem** do Tab faz sentido?
- □ O **primeiro Tab** mostra “Pular para o conteúdo”?
- □ Consigo **sair** de janelas e menus (Esc)?

**Ferramentas gratuitas:**
- – **Lighthouse** (Chrome: F12 → aba Lighthouse → Acessibilidade)
- – Extensão **WAVE**
- – Leitor de tela **NVDA**

---

## PARTE 2 – CÓDIGO: NAVEGAÇÃO PELO TAB, MOVER O FOCO E CRIAR ATALHOS

### Slide 16 – Teclas de navegação ⭐

**Tabela:**

| Tecla | O que faz |
|---|---|
| `Tab` | Vai para o **próximo** item focável |
| `Shift` + `Tab` | **Volta** para o item anterior |
| `Enter` | Abre o link / aperta o botão |
| `Espaço` | Aperta o botão / marca a caixa de seleção |
| `↑` `↓` `←` `→` | Escolhe opções em listas, `select` e botões de rádio |
| `Esc` | Fecha janelas e menus |

- □ **Foco** = o item que vai receber o próximo comando do teclado.

### Slide 17 – Quem recebe foco? ⭐
- □ **Já recebem foco sozinhos** (sem nenhum código): `a` (com `href`), `button`, `input`, `select`, `textarea`.
- □ **Não recebem foco:** `p`, `div`, `span`, `h1`, `img`, …

📦 **Código:**
```html
<a href="contato.html">Contato</a>   <!-- recebe foco -->
<button type="button">Salvar</button> <!-- recebe foco -->
<input type="text" id="nome">        <!-- recebe foco -->
<p>Texto comum</p>                   <!-- NÃO recebe foco -->
```

🟨 **Nota:** Por isso, a primeira regra é **usar a tag certa**. Um botão feito com `<button>` já funciona com Tab, Enter e Espaço, sem nenhuma linha de JavaScript.

### Slide 18 – O atributo `tabindex` ⭐
- □ Muda **quem** recebe foco e **quando**.

**Tabela:**

| Valor | O que faz | Quando usar |
|---|---|---|
| `tabindex="0"` | Entra na fila do Tab, na ordem do HTML | Elemento personalizado que precisa receber foco |
| `tabindex="-1"` | **Fora** da fila do Tab, mas recebe foco **pelo JavaScript** | Destino de atalhos e do skip link (`main`, títulos) |
| `tabindex="1"`, `"2"`… | “Fura a fila”: vem antes de todos | ❌ **Evite**: bagunça a ordem da página |

📦 **Código:**
```html
<div tabindex="0">Recebe foco pelo Tab</div>
<main id="conteudo" tabindex="-1">Recebe foco só pelo JavaScript</main>
```

### Slide 19 – Certo × errado: `div` como botão
- □ **Problema:** um “botão” feito com `div` + `onclick`:
  - – **não recebe** foco;
  - – **não funciona** com Enter;
  - – o leitor de tela **não anuncia** que é um botão.

📦 **Código:**
```html
<!-- ❌ Errado -->
<div onclick="enviar()">Enviar</div>

<!-- ✅ Certo -->
<button type="button" id="enviar">Enviar</button>
```

🟨 **Nota:** Para “consertar” a `div` seria preciso `tabindex="0"`, `role="button"` e código para Enter e Espaço. O `<button>` já vem com tudo isso.

▶️ **Demo:** slide “Certo x Errado” do site.

### Slide 20 – Mover o foco pelo código: `focus()` ⭐
- □ **Problema 1:** ao clicar no botão “Ir para o formulário”, o cursor deve ir direto para o campo **Nome**.
- □ **Solução:** o método **`focus()`** coloca o foco em um elemento, e a tela rola até ele.

📦 **Código HTML:**
```html
<button type="button" id="irFormulario">Ir para o formulário</button>
…
<label for="nome">Nome</label>
<input type="text" id="nome">
<script src="js/script.js"></script>
```

### Slide 21 – Mover o foco pelo código: `focus()` (continuação) ⭐

📦 **Código JavaScript:**
```js
window.onload = registrarFuncoes;

function registrarFuncoes() {
  let botao = document.getElementById("irFormulario");
  botao.addEventListener("click", irParaFormulario);
}

function irParaFormulario() {
  let campo = document.getElementById("nome");
  campo.focus(); // o foco (e a tela) vai até o campo
}
```

🟨 **Nota:** `focus()` funciona direto em links, botões e campos. Em outros elementos (`main`, `section`, `h2`), é preciso colocar `tabindex="-1"` antes.

### Slide 22 – Foco no campo com erro (validação) ⭐
- □ Ligação com a aula de **Validação de formulários**: se o campo estiver errado, mostre a mensagem **e leve o foco até ele**.

📦 **Código:**
```js
function registrarFuncoes() {
  let form = document.getElementById("formContato");
  form.addEventListener("submit", validar);
}

function validar(e) {
  let nome = document.getElementById("nome");
  if (nome.value.trim() === "") {
    e.preventDefault();  // não envia
    document.getElementById("erro").innerHTML = "Preencha o nome.";
    nome.focus();        // leva a pessoa até o erro
  }
}
```

📦 **HTML da mensagem:**
```html
<p id="erro" role="alert"></p>
```

🟨 **Nota:** Com `role="alert"`, o leitor de tela **lê a mensagem** assim que ela aparece.

### Slide 23 – Eventos de foco
- □ Sabemos qual elemento está com foco com **`document.activeElement`**.

**Tabela:**

| Evento | Quando acontece |
|---|---|
| `focus` | O elemento **recebe** o foco |
| `blur` | O elemento **perde** o foco (já visto em aula) |
| `focusin` / `focusout` | Igual a `focus` / `blur`, mas **“sobem”** para os elementos pais (dá para usar um só no `document` para a página toda) |

📦 **Código:**
```js
document.addEventListener("focusin", function (e) {
  console.log("Foco em:", e.target); // e.target = quem recebeu o foco
});
```

🟨 **Nota:** É assim que o nosso site sabe qual item mandar para o VLibras traduzir (Parte 3).

### Slide 24 – Deixando o foco visível com CSS ⭐

📦 **Código CSS:**
```css
/* Borda amarela grossa só quando o foco vem do TECLADO */
:focus-visible {
  outline: 4px solid #ffcd07;
  outline-offset: 3px;
}

/* ❌ Nunca faça isso sem colocar outro estilo no lugar */
*:focus { outline: none; }
```

🟨 **Nota:**
- `:focus` → sempre que o elemento tem foco (inclusive ao clicar com o mouse).
- `:focus-visible` → só quando o navegador entende que a pessoa está usando o **teclado**.

### Slide 25 – Criando o “Pular para o conteúdo” ⭐

📦 **Código HTML** (primeiro elemento dentro do `<body>`):
```html
<a href="#conteudo" class="pular-link">Pular para o conteúdo</a>
<header>…</header>
<nav>…</nav>
<main id="conteudo" tabindex="-1"> … </main>
```

📦 **Código CSS:**
```css
.pular-link       { position: absolute; top: -100px; } /* fora da tela */
.pular-link:focus { top: 0; }                          /* aparece no Tab */
```

🟨 **Nota:** O `tabindex="-1"` no `<main>` garante que o **foco** vá para o conteúdo, e não só a rolagem da tela. Assim, o próximo Tab continua a partir do conteúdo.

### Slide 26 – Atalhos, forma 1: atributo `accesskey` (sem JavaScript) ⭐
- □ É o jeito **mais simples**: basta um atributo no HTML.
- □ É o que o **eMAG** recomenda para os atalhos 1, 2, 3 e 4.

📦 **Código:**
```html
<a href="#conteudo" accesskey="1">Ir para o conteúdo [1]</a>
<a href="#menu"     accesskey="2">Ir para o menu [2]</a>
<a href="#busca"    accesskey="3">Ir para a busca [3]</a>
<a href="#rodape"   accesskey="4">Ir para o rodapé [4]</a>
```

🟨 **Nota:** Não pode repetir o mesmo `accesskey` na página (eMAG 1.5). Escreva a tecla no próprio texto do link (`[1]`): ninguém adivinha um atalho invisível.

### Slide 27 – Como acionar o `accesskey` em cada navegador

**Tabela:**

| Navegador / sistema | Combinação |
|---|---|
| Chrome e Edge (Windows) | `Alt` + tecla |
| Firefox (Windows e Linux) | `Alt` + `Shift` + tecla |
| Chrome (Linux) | `Alt` + tecla |
| Mac (Safari, Chrome, Firefox) | `Control` + `Option` + tecla |

- □ **Vantagem:** zero JavaScript, funciona em todo lugar.
- □ **Desvantagem:** a combinação **muda** de navegador para navegador, e você não controla o que acontece (cada navegador pode seguir o link ou só dar foco).
- □ Para ter controle total → **forma 2: JavaScript**.

### Slide 28 – Atalhos, forma 2: evento `keydown` ⭐
- □ **Problema 2:** ao apertar **Alt + 1**, o foco deve ir para o conteúdo principal.
- □ Usamos o evento **`keydown`** (tecla **apertada**). Ele acontece **antes** do navegador agir, então dá para cancelar o comportamento padrão com `preventDefault()`.

**Tabela – propriedades do evento de teclado:**

| Propriedade | O que informa |
|---|---|
| `e.key` | O **caractere** da tecla (`"a"`, `"Enter"`, `"?"`) |
| `e.code` | A **tecla física** (`"Digit1"`, `"KeyA"`) |
| `e.altKey` / `e.ctrlKey` / `e.shiftKey` | `true` se `Alt` / `Ctrl` / `Shift` estava apertado |
| `e.preventDefault()` | Cancela a ação padrão do navegador |

### Slide 29 – Atalhos, forma 2: código ⭐

📦 **Código JavaScript:**
```js
window.onload = registrarFuncoes;

function registrarFuncoes() {
  document.addEventListener("keydown", tratarAtalhos);
}

function tratarAtalhos(e) {
  if (e.altKey && e.code === "Digit1") {     // Alt + 1
    e.preventDefault();
    document.getElementById("conteudo").focus();
  }
  if (e.altKey && e.code === "Digit2") {     // Alt + 2
    e.preventDefault();
    document.getElementById("menu").focus();
  }
}
```

🟨 **Nota:** O ouvinte fica no `document` porque o atalho deve funcionar em **qualquer parte** da página. Usamos `e.code`, e não `e.key`, porque no Mac o Alt (Option) muda o caractere: Option + 1 vira “¡”.

### Slide 30 – Atalhos com um objeto (menos `if`) e boas práticas

📦 **Código:**
```js
const atalhos = {
  Digit1: "conteudo", Digit2: "menu", Digit3: "busca", Digit4: "rodape"
};

function tratarAtalhos(e) {
  if (e.altKey && atalhos[e.code]) {
    e.preventDefault();
    let alvo = document.getElementById(atalhos[e.code]);
    alvo.focus();
  }
}
```

**Boas práticas:**
- □ ❌ Não substitua atalhos do navegador (`Ctrl+S`, `Ctrl+P`, `Ctrl+T`, `Alt+F4`).
- □ ❌ Evite atalho de **uma letra só**. Se usar, ignore quando a pessoa estiver **digitando** num campo (WCAG 2.1.4).
- □ ✅ **Mostre** os atalhos na tela (barra de acessibilidade ou página de ajuda).
- □ ✅ Se o topo da página for **fixo**, use `scroll-padding-top` no CSS para o item não ficar escondido.

### Slide 31 – Janelas (modal) do jeito simples: `<dialog>`
- □ O HTML já tem uma tag para janelas: **`<dialog>`**.
- □ Com `showModal()`, o navegador **faz sozinho**:
  - – prende o foco na janela;
  - – fecha com Esc;
  - – deixa o fundo inativo.

📦 **Código:**
```html
<button type="button" id="abrirAjuda">Ajuda</button>

<dialog id="ajuda">
  <h2>Atalhos do site</h2>
  <p>Alt + 1: conteúdo · Alt + 2: menu</p>
  <button type="button" id="fecharAjuda">Fechar</button>
</dialog>
```

```js
function registrarFuncoes() {
  let janela = document.getElementById("ajuda");
  document.getElementById("abrirAjuda").addEventListener("click", function () {
    janela.showModal();  // abre e leva o foco para dentro
  });
  document.getElementById("fecharAjuda").addEventListener("click", function () {
    janela.close();      // fecha (Esc também fecha)
  });
}
```

🟨 **Nota:** Ao fechar, os navegadores atuais devolvem o foco ao botão que abriu a janela. No nosso site fizemos esse controle à mão, para mostrar como funciona por dentro.

---

## PARTE 3 – VLIBRAS: COMO FUNCIONA E COMO USAR NO CÓDIGO

### Slide 32 – Libras é uma língua ⭐
- □ **Libras** (Língua Brasileira de Sinais) é uma língua **completa**, com gramática própria.
- □ Não é “português com gestos”: a ordem das palavras é diferente, e as **expressões faciais** fazem parte da gramática.
- □ Reconhecida pela **Lei 10.436/2002** e regulamentada pelo **Decreto 5.626/2005**.
- □ Para muitas pessoas surdas, a Libras é a **primeira língua** e o português escrito é a **segunda**. Ler textos longos pode ser difícil.

### Slide 33 – O que é o VLibras ⭐
- □ Conjunto de ferramentas **gratuitas e de código aberto** que traduz conteúdos em **português** para **Libras** com um **avatar 3D**.
- □ **Quem faz:**
  - – Ministério da Gestão e da Inovação em Serviços Públicos (Secretaria de Governo Digital);
  - – Ministério dos Direitos Humanos e da Cidadania;
  - – **UFPB** (Laboratório de Aplicações de Vídeo Digital – LAVID).
- □ **Onde funciona:** páginas Web (**widget**), extensão de navegador, computador e celular.
- □ **Avatares:** Ícaro, Hosana e Guga.

### Slide 34 – Como o VLibras funciona por dentro ⭐

**Diagrama (5 passos em fila):**

**Texto em português** → **Servidor de tradução** → **Glosa** → **Dicionário de sinais** → **Avatar 3D sinaliza**

- □ **Glosa** = a Libras escrita com palavras do português em MAIÚSCULAS, na **ordem da Libras**.
  - – Exemplo didático: “Eu vou à escola amanhã.” → `AMANHÃ EU IR ESCOLA`
- □ Palavra **sem sinal** no dicionário (nomes, siglas) → o avatar faz a **datilologia** (soletra letra por letra).

🟨 **Nota:** Dá para ver isso acontecendo: F12 → aba **Rede (Network)** → traduzir um texto. Aparece um pedido para `traducao2.vlibras.gov.br/translate` com o texto enviado.

▶️ **Demo:** abrir o F12 durante a apresentação.

### Slide 35 – Usando o VLibras como usuário ⭐
1. Clique no **botão azul** com o símbolo de mãos, na lateral da página.
2. Na primeira vez, o avatar carrega (leva alguns segundos).
3. Clique em **qualquer texto** da página: o avatar traduz.
4. Também dá para **selecionar** um trecho de texto.

**Recursos da janela do VLibras:**
- – velocidade (1x)
- – legenda (mostra a glosa)
- – troca de avatar
- – dicionário de sinais
- – configurações (ex.: opacidade)
- – “Pular”
- – arrastar a janela para outro lugar

### Slide 36 – Instalando no seu site: 1 linha ⭐
- □ **Problema 3:** colocar o VLibras em uma página HTML.
- □ **Solução:** colar o script oficial no HTML (de preferência antes do `</body>`).

📦 **Código:**
```html
<body>
  …
  <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
</body>
```

🟨 **Nota:** Segundo a documentação oficial, “apenas isso já é suficiente”: o botão azul aparece sozinho na lateral direita. Precisa de **internet**, porque o avatar e a tradução vêm dos servidores do governo.

### Slide 37 – Configurando o widget ⭐

📦 **Código:**
```html
<script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
<script>
  new window.VLibras.Widget({
    rootPath: "https://vlibras.gov.br/app",
    avatar: "hosana",   // icaro (padrão), hosana, guga ou random
    position: "L"       // R = direita (padrão), L = esquerda
  });
</script>
```

**Tabela – parâmetros:**

| Parâmetro | Para que serve | Valores |
|---|---|---|
| `rootPath` | Endereço da aplicação | `"https://vlibras.gov.br/app"` |
| `avatar` | Avatar inicial | `"icaro"`, `"hosana"`, `"guga"`, `"random"` |
| `position` | Lado da tela | `"R"` (direita), `"L"` (esquerda) |
| `personalization` | Avatar personalizado | Só para instituições parceiras |

### Slide 38 – Personalizando o botão com CSS
- □ O VLibras aceita **variáveis CSS** para o botão azul.

📦 **Código:**
```css
:root {
  --vlibras-btn-focus-visible-outline: 4px solid #ffcd07;  /* foco do botão */
  --vlibras-btn-focus-visible-shadow: 0 0 0 7px #1b1b1b;
  --vlibras-btn-hover-filter: brightness(1.2);              /* mouse em cima */
}
```

🟨 **Nota:** Assim, o foco do botão do VLibras fica **igual** ao foco do resto do site.

### Slide 39 – Boas práticas e limitações
**Boas práticas:**
- □ Frases **curtas e simples** traduzem melhor.
- □ Imagens com texto alternativo (`alt`).
- □ Não deixe o botão do VLibras cobrir conteúdo.

**Limitações:**
- □ É tradução **automática**: não substitui um **intérprete humano** em conteúdos importantes (vídeos institucionais, aulas, documentos oficiais).
- □ Não traduz **áudio nem vídeo**, só texto.
- □ Depende de **internet**.

### Slide 40 – No nosso projeto: VLibras + Tab juntos
- □ **Ideia:** cada item que recebe **foco pelo Tab** (ou que o mouse passa por cima) é traduzido **sozinho**, sem precisar clicar.

**Diagrama (5 passos):**

**1. Evento** (`focusin` / `mousemove`) → **2. Pega o texto** → **3. Espera 600 ms** → **4. Manda para o VLibras** → **5. Avatar sinaliza**

▶️ **Demo:** slide “Tab + VLibras” do site, com o diagrama acendendo ao vivo.

### Slide 41 – No nosso projeto: o texto de cada item (`data-libras`)
- □ Atributos **`data-*`** guardam informações extras no HTML. O nome depois do `data-` é escolhido por nós.
- □ Criamos o **`data-libras`** com uma frase **curta e simples** para o VLibras traduzir.
- □ No JavaScript, lemos o atributo com **`elemento.dataset.libras`**.

📦 **Código:**
```html
<article tabindex="0"
         data-libras="Foco visível. O item selecionado precisa ter uma borda.">
  <h3>Foco visível</h3>
  <p>O item com foco precisa aparecer! Usamos :focus-visible …</p>
</article>
```

### Slide 42 – No nosso projeto: o código

📦 **Código JavaScript (simplificado):**
```js
let temporizador;

document.addEventListener("focusin", function (e) {
  let texto = e.target.dataset.libras || e.target.textContent;
  clearTimeout(temporizador);              // cancela o anterior
  temporizador = setTimeout(function () {
    window.plugin.translate(texto);        // manda para o VLibras
  }, 600);
});
```

🟨 **Nota:**
- Por que esperar 600 ms? Se a pessoa apertar Tab várias vezes rápido, só o **último** item é traduzido.
- `window.plugin.translate()` **não está na documentação oficial**. Funciona na versão atual (7.x), mas pode mudar. Se mudar, o VLibras continua funcionando do jeito normal (clicando no texto).

### Slide 43 – Bônus: e quem não enxerga?
- □ O VLibras **sinaliza**, ele não fala.
- □ Pessoas cegas usam **leitor de tela**: NVDA (Windows, gratuito), Narrador (Windows), VoiceOver (Mac e iPhone), TalkBack (Android).
- □ No nosso site, simulamos um leitor de tela com a **Web Speech API** do navegador:

📦 **Código:**
```js
function falar(texto) {
  let fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  window.speechSynthesis.speak(fala);
}
```

---

## ENCERRAMENTO

### Slide 44 – Demonstração ⭐
- □ Site: `https://thalesmiguelhajes.github.io/Projeto-pr-tico-PGW2/`

**Roteiro (≈ 4 min):**
1. Abrir o site: a ajuda aparece e o avatar já sinaliza.
2. Tab → **“Pular para o conteúdo”** → Enter.
3. Tab pelos cards: o **foco visível** e o **avatar traduzindo** cada item.
4. **Alt+2** (menu) → **Alt+1** (conteúdo).
5. Slide **Foco visível**: desligar o foco e tentar navegar.
6. Slide **Formulário**: enviar vazio, e o foco vai para o erro.
7. Slide **Tab + VLibras**: ligar o **Raio-X** e mostrar o diagrama acendendo.
8. Escrever o nome de alguém da turma no VLibras para mostrar a **datilologia**.

### Slide 45 – Dúvidas? ⭐

### Slide 46 – Exercícios de fixação
1. Crie uma página com `header`, `nav` (3 links), `main` e `footer`. Navegue só com Tab e anote a ordem do foco.
2. Adicione o link “Pular para o conteúdo” como primeiro elemento da página, escondido até receber foco.
3. Crie os atalhos para conteúdo **[1]** e menu **[2]** usando `accesskey`. Depois, refaça usando `addEventListener("keydown", …)` com `Alt + 1` e `Alt + 2`.
4. Crie um formulário com nome e e-mail. Ao enviar com um campo vazio, mostre a mensagem de erro e leve o foco até o campo com `focus()`.
5. Instale o VLibras na página com o avatar **Hosana** do lado **esquerdo**.

### Slide 47 – Referências ⭐
- BRASIL. **eMAG – Modelo de Acessibilidade em Governo Eletrônico**, versão 3.1. Disponível em: https://emag.governoeletronico.gov.br/.
- BRASIL. **Lei nº 13.146, de 6 de julho de 2015** (Lei Brasileira de Inclusão). Disponível em: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm.
- BRASIL. **Lei nº 10.436, de 24 de abril de 2002** (Libras). Disponível em: https://www.planalto.gov.br/ccivil_03/leis/2002/l10436.htm.
- VLIBRAS. **Documentação do VLibras Widget**. Disponível em: https://vlibras.gov.br/doc/widget/.
- BRASIL. **Suíte VLibras** – gov.br. Disponível em: https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/vlibras.
- W3C. **Web Content Accessibility Guidelines (WCAG) 2.2**. Disponível em: https://www.w3.org/TR/WCAG22/.
- MDN Web Docs. **tabindex**, **accesskey**, **HTMLElement.focus()**, **KeyboardEvent**, **&lt;dialog&gt;**. Disponível em: https://developer.mozilla.org/pt-BR/.
- IBGE. **PNAD Contínua: Pessoas com deficiência 2022**. Disponível em: https://www.ibge.gov.br/.
- W3Schools. Disponível em: https://www.w3schools.com.

---

## Plano de tempo (15 minutos)

| Bloco | Slides essenciais (⭐) | Tempo |
|---|---|---|
| Abertura | 1, 2, 3, 4 | 1 min |
| Parte 1 – UI/UX | 5, 6, 8, 9, 10, 11, 15 | 3 min 30 |
| Parte 2 – Código | 16, 17, 18, 20, 21, 22, 24, 25, 26, 28, 29 | 4 min 30 |
| Parte 3 – VLibras | 32, 33, 34, 35, 36, 37 | 3 min |
| Demonstração + encerramento | 44, 45, 47 | 3 min |

Os slides sem ⭐ servem como apoio. Mantenham no arquivo, porque ajudam a responder as perguntas individuais (que valem 4 pontos), mas podem ser pulados na hora de apresentar.

## Conferência das fontes

Os itens abaixo foram conferidos nas páginas oficiais na preparação deste conteúdo:

- **Recomendações do eMAG:** números e títulos (1.2, 1.3, 1.4, 1.5, 1.8, 1.9, 4.4, 6.2, 6.3, 6.5, 6.6, 6.7), atalhos 1 a 4 e itens da barra de acessibilidade.
- **Documentação oficial do VLibras Widget:** instalação com uma linha, parâmetros `avatar` e `position` e variáveis CSS do botão.
- **Página gov.br do VLibras:** quem desenvolve e o fato de ser gratuito e de código aberto.
- **Funcionamento interno do VLibras** (servidor de tradução, dicionário, datilologia): observado na prática pela aba Rede do navegador.

Conferir antes de apresentar:

- **Números de leis e critérios WCAG:** citados de memória.
- **Combinações do `accesskey`:** testar em pelo menos um navegador.
- **18,6 milhões (IBGE, PNAD Contínua 2022):** citado de memória; confirmar o número no site do IBGE.
