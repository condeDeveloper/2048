// Estado da partida, regras e integração com render/input/storage
class Game {
  constructor() {
    Render.init();
    this.best = Storage.loadBest();
    this.history = [];
    const saved = Storage.loadState();
    if (saved) {
      this.grid = new Grid(saved.cells);
      this.score = saved.score || 0;
      this.won = !!saved.won;
      this.over = false;
    } else {
      this.newGame(false);
    }
    bindInput(this);
    this.draw();
  }

  newGame(redraw = true) {
    this.grid = new Grid();
    for (let i = 0; i < START_TILES; i++) this.grid.addRandom();
    this.score = 0;
    this.won = false;
    this.over = false;
    this.history = [];
    Render.hideOverlay();
    Storage.saveState(this.snapshot());
    if (redraw) this.draw();
  }

  snapshot() { return { cells: this.grid.cells, score: this.score, won: this.won }; }

  move(dir) {
    if (this.over) return;
    const before = this.grid.clone(), prevScore = this.score;
    const { moved, gained, merged } = this.grid.move(dir);
    if (!moved) return;

    this.history.push({ grid: before, score: prevScore });
    if (this.history.length > 10) this.history.shift();

    this.score += gained;
    if (this.score > this.best) { this.best = this.score; Storage.saveBest(this.best); }
    const added = this.grid.addRandom();
    this.draw({ added, merged, gained });

    if (!this.won && this.grid.max() >= WIN_TILE) {
      this.won = true;
      Render.showOverlay('Você venceu!', true);
    } else if (!this.grid.canMove()) {
      this.over = true;
      Storage.clearState();
      Render.showOverlay('Fim de jogo', false);
      return;
    }
    Storage.saveState(this.snapshot());
  }

  undo() {
    const prev = this.history.pop();
    if (!prev) return;
    this.grid = prev.grid;
    this.score = prev.score;
    this.over = false;
    Render.hideOverlay();
    Storage.saveState(this.snapshot());
    this.draw();
  }

  keepPlaying() { Render.hideOverlay(); }

  draw(opts = {}) {
    Render.board(this.grid, opts);
    Render.hud(this.score, this.best, opts.gained || 0);
    Render.undoEnabled(this.history.length > 0);
  }
}

window.addEventListener('DOMContentLoaded', () => { window.game = new Game(); });
