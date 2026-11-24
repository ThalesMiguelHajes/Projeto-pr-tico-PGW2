# Grupo 2 – Navegação e Acessibilidade (PGW2)

Protótipo do Exercício Avaliativo 4: uma página que ensina a navegar **só pelo teclado (Tab)** e,
a cada item que recebe foco ou que o mouse passa por cima, o **VLibras** traduz o texto para Libras.

## Como abrir

Precisa de internet (o VLibras é carregado do site do governo).

- Jeito mais simples: abrir o `index.html` no navegador.
- Se o avatar não aparecer abrindo o arquivo direto, use um servidor local:
  - VS Code: extensão **Live Server** → botão direito no `index.html` → *Open with Live Server*; ou
  - Terminal: `python -m http.server` na pasta do projeto e abrir `http://localhost:8000`.

## O que a página demonstra

| Recurso | Onde está no código |
|---|---|
| Tutorial inicial com as teclas (abre sozinho; `?` ou botão **Ajuda** reabre; `Esc` fecha) | `#tutorial` no HTML, `abrirTutorial()` no JS |
| **Skip link** "Pular para o conteúdo" (aparece no 1º Tab) | `.pular-link` no HTML e CSS |
| **Foco visível** (borda amarela) | `:focus-visible` no CSS |
| **Tab / Shift+Tab** em cards, links, botões e formulário | `tabindex="0"` nos cards |
| `tabindex="-1"` para receber foco só por JavaScript | `<main>`, `<nav>`, `<footer>` |
| **Atalhos Alt+1 a Alt+4** (padrão eMAG do governo) | objeto `atalhos` no JS |
| Prender o Tab dentro da janela de ajuda (*focus trap*) | `keydown` do `tutorial` no JS |
| **Certo x Errado**: `<div onclick>` (Tab pula) x `<button>` | seção 4 |
| Formulário com `<label>`, `fieldset`/`legend` e foco no campo com erro | seção 6 |
| **VLibras** traduzindo automaticamente no foco e no mouse | `agendarTraducao()` e `traduzir()` no JS |
| **Voz** opcional (Web Speech API) simulando um leitor de tela | `falar()` no JS |
| Painel que mostra a tecla apertada e o texto enviado ao VLibras | `.painel` |

### Como a tradução automática funciona

1. O widget oficial é instalado com o código do governo:
   ```html
   <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
   <script>new window.VLibras.Widget('https://vlibras.gov.br/app');</script>
   ```
2. Ao carregar, o script abre o avatar (`window.VLibrasWidget.open()`).
3. Os eventos `focusin` (teclado) e `mouseover` (mouse) pegam o item atual.
4. O texto vem do atributo `data-libras` (texto curto e simples, pensado para tradução);
   se não houver, usa o `aria-label`, o `<label>` do campo ou o próprio texto.
5. Espera 600 ms parado no item (se apertar Tab várias vezes rápido, só o último é traduzido)
   e chama `window.plugin.translate(texto)`, função que o VLibras cria quando o avatar carrega.

> Observação: o VLibras sinaliza em Libras, ele **não fala**. A opção **Voz** foi adicionada para
> mostrar também como um leitor de tela lê a página para pessoas cegas.
>
> `window.plugin.translate` não faz parte da documentação oficial do widget; funciona na versão atual
> (7.x). Se o governo mudar o widget, o VLibras continua funcionando do jeito normal (clicar no texto).

## Roteiro sugerido para a demonstração (≈ 6 min)

1. Abrir a página → tutorial aparece e o avatar já sinaliza o título.
2. `Esc` → apertar `Tab` → aparece o **skip link** → `Enter` pula o menu.
3. `Tab` / `Shift+Tab` pelos cards → mostrar a borda de foco e o avatar traduzindo cada um.
4. `Alt+2` (menu), `Alt+3` (formulário), `Alt+4` (rodapé), `Alt+1` (conteúdo).
5. Seção **Certo x Errado**: mostrar que o Tab pula a `div` e para no `button`.
6. Formulário só pelo teclado: setas no select/radio, `Espaço` no checkbox, enviar vazio → foco volta para o campo com erro.
7. Passar o mouse por cima dos itens → mesma tradução.
8. Ligar **Voz** → navegar com Tab ouvindo a leitura.

## Estrutura

```
index.html
css/estilo.css
js/scripts.js
```
