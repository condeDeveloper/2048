// Renderização em DOM: células de fundo, peças e placar
const Render = {
  init() {
    const cells = document.getElementById('cells');
    for (let i = 0; i < SIZE * SIZE; i++) cells.appendChild(document.createElement('div'));
    this.tiles = document.getElementById('tiles');
    this.score = document.getElementById('score');
    this.best = document.getElementById('best');
    this.gain = document.getElementById('gain');
    this.overlay = document.getElementById('overlay');
    this.overlayTitle = document.getElementById('overlay-title');
    this.keepBtn = document.getElementById('keep');
    this.undoBtn = document.getElementById('undo');
  },

  // posição em % dentro da área de peças (gap proporcional)
  pos(i) { return `calc(${i} * (100% - var(--gap) * 3) / 4 + ${i} * var(--gap))`; },

  board(grid, opts = {}) {
    const { added = null, merged = [] } = opts;
    this.tiles.innerHTML = '';
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const v = grid.cells[r][c];
        if (!v) continue;
        const t = document.createElement('div');
        t.className = 'tile';
        t.dataset.v = v;
        if (v > 2048) t.classList.add('super');
        if (added && added.r === r && added.c === c) t.classList.add('new');
        if (merged.some(([mr, mc]) => mr === r && mc === c)) t.classList.add('merged');
        t.style.left = this.pos(c);
        t.style.top = this.pos(r);
        t.textContent = v;
        this.tiles.appendChild(t);
      }
    }
  },

  hud(score, best, gained) {
    this.score.textContent = score;
    this.best.textContent = best;
    if (gained > 0) {
      this.gain.textContent = '+' + gained;
      this.gain.classList.remove('show');
      void this.gain.offsetWidth; // reinicia a animação
      this.gain.classList.add('show');
    }
  },

  undoEnabled(on) { this.undoBtn.disabled = !on; },

  showOverlay(title, win) {
    this.overlayTitle.textContent = title;
    this.overlay.classList.toggle('win', !!win);
    this.keepBtn.classList.toggle('hidden', !win);
    this.overlay.classList.remove('hidden');
  },
  hideOverlay() { this.overlay.classList.add('hidden'); },
};
