# Grupo 2 – Navegação e Acessibilidade (PGW2)

Exercício Avaliativo 4. **O próprio site é a apresentação.** Cada slide explica um recurso,
deixa você testar na hora e mostra o código usado. Tudo funciona só com o teclado, e o
**VLibras** traduz para Libras cada item que recebe foco (Tab) ou que o mouse passa por cima.

## Como abrir

Precisa de internet (o VLibras vem do site do governo).

- **GitHub Pages** (recomendado): Settings → Pages → Branch `main` / `(root)` → Save.
- **No computador**: abrir com a extensão *Live Server* do VS Code, ou rodar
  `python -m http.server` na pasta e abrir `http://localhost:8000`.

## Como usar

| Tecla | O que faz |
|---|---|
| `Tab` / `Shift+Tab` | próximo / item anterior |
| `→` / `←` | próximo / slide anterior |
| `Enter` / `Espaço` | ativa links e botões / marca caixas |
| `Alt+1` `Alt+2` `Alt+3` `Alt+4` | conteúdo, menu, formulário, rodapé (padrão eMAG) |
| `?` / `Esc` | abre / fecha a ajuda |

Na barra azul do topo você pode ligar **Voz** (leitura em voz alta) e **Raio-X**
(mostra, ao vivo, o que o JavaScript está fazendo).

## Slides

| # | Slide | Experimente |
|---|---|---|
| – | Início | lista de **10 missões** que se completam sozinhas |
| 1 | Por que acessibilidade? | — (conceitos, números e leis) |
| 2 | Navegar pelo teclado | contador de Tab e Shift+Tab |
| 3 | Foco visível | botão que **desliga o foco** para sentir a diferença |
| 4 | Skip link | volta ao começo da página para testar o “Pular para o conteúdo” |
| 5 | Atalhos | Alt+1..4 |
| 6 | Ordem do Tab e `tabindex` | caixas com `tabindex="0"`, sem tabindex e `"-1"` |
| 7 | Certo x Errado | `<div onclick>` x `<button>` |
| 8 | Formulário | `label`, `fieldset`, foco no campo com erro |
| 9 | Janelas (modal) | foco preso na janela, Esc fecha, foco volta |
| 10 | VLibras | escreva uma frase e o avatar traduz |
| 11 | Tab + VLibras | **diagrama dos 5 passos que acende ao vivo** |
| 12 | Bônus: voz | Web Speech API simulando um leitor de tela |
| 13 | Resumo | checklist, missões e referências |

## Como a tradução automática funciona

1. **Evento**: `focusin` (Tab) ou `mousemove` (mouse).
2. **Texto**: `data-libras` → `aria-label` → `<label>` → texto do elemento.
3. **Espera 600 ms**: se apertar Tab rápido, só o último item é traduzido.
4. **Envia**: `window.plugin.translate(texto)`.
5. **Avatar sinaliza**.

O item traduzido recebe fundo amarelo-claro com **texto preto** (classe `.traduzindo`) para ficar fácil de ler.

> `window.plugin.translate` não está na documentação oficial do VLibras. Funciona na versão atual (7.x).
> Se mudar, o VLibras continua funcionando do jeito normal (clicando no texto).

## Arquivos

```
index.html       os slides (HTML comentado)
css/estilo.css   visual, foco visível, skip link
js/scripts.js    teclado, missões, Raio-X, VLibras e voz (dividido em 10 partes comentadas)
```
