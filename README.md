# 🔢 2048

Clone do 2048 em HTML, CSS e JavaScript puro. Sem dependências, sem build.

**Jogar online:** https://condedeveloper.github.io/2048/

## Rodar local

```bash
npx serve -l 5184 .
```

## Controles

| Ação       | Tecla / gesto            |
|------------|--------------------------|
| Mover      | Setas, WASD, HJKL, swipe |
| Desfazer   | U ou Ctrl+Z              |
| Novo jogo  | N ou R                   |

## Funcionalidades

- Lógica do tabuleiro separada do DOM e testável
- **Desfazer** até 10 jogadas
- Partida salva automaticamente no `localStorage`: fecha e volta de onde parou
- Recorde persistente
- Animações de surgimento, fusão e de pontos ganhos
- Tela de vitória com opção de continuar até passar de 2048
- Swipe no celular

## Estrutura

```
js/config.js    # constantes
js/grid.js      # regras: deslizar, juntar, gerar peças, detectar fim
js/storage.js   # recorde e partida salva
js/render.js    # DOM: peças, placar, overlay
js/input.js     # teclado, swipe, botões
js/game.js      # orquestração
```

## Licença

MIT
