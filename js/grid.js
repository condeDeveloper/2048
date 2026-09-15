// Lógica pura do tabuleiro (sem DOM): deslizar, juntar, gerar peças
class Grid {
  constructor(cells) {
    this.cells = cells ? cells.map(r => r.slice()) : Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  }

  clone() { return new Grid(this.cells); }

  empties() {
    const out = [];
    for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (!this.cells[r][c]) out.push([r, c]);
    return out;
  }

  addRandom() {
    const e = this.empties();
    if (!e.length) return null;
    const [r, c] = e[Math.floor(Math.random() * e.length)];
    this.cells[r][c] = Math.random() < FOUR_CHANCE ? 4 : 2;
    return { r, c };
  }

  // Sequência de coordenadas de cada linha/coluna, ordenada a partir da parede de destino
  lines(dir) {
    const out = [];
    for (let i = 0; i < SIZE; i++) {
      const line = [];
      for (let j = 0; j < SIZE; j++) {
        if (dir === 'left') line.push([i, j]);
        else if (dir === 'right') line.push([i, SIZE - 1 - j]);
        else if (dir === 'up') line.push([j, i]);
        else line.push([SIZE - 1 - j, i]);
      }
      out.push(line);
    }
    return out;
  }

  // Executa um movimento. Retorna { moved, gained, merged: [[r,c],...] }
  move(dir) {
    let moved = false, gained = 0;
    const merged = [];
    for (const line of this.lines(dir)) {
      const vals = line.map(([r, c]) => this.cells[r][c]).filter(Boolean);
      const out = [];
      for (let i = 0; i < vals.length; i++) {
        if (vals[i] === vals[i + 1]) {
          out.push(vals[i] * 2);
          gained += vals[i] * 2;
          merged.push(line[out.length - 1]);
          i++;
        } else {
          out.push(vals[i]);
        }
      }
      while (out.length < SIZE) out.push(0);
      line.forEach(([r, c], i) => {
        if (this.cells[r][c] !== out[i]) moved = true;
        this.cells[r][c] = out[i];
      });
    }
    return { moved, gained, merged };
  }

  canMove() {
    if (this.empties().length) return true;
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const v = this.cells[r][c];
        if (c + 1 < SIZE && this.cells[r][c + 1] === v) return true;
        if (r + 1 < SIZE && this.cells[r + 1][c] === v) return true;
      }
    }
    return false;
  }

  max() { return Math.max(...this.cells.flat()); }
}
