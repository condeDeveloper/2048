// Teclado, swipe e botões
const KEYMAP = {
  ArrowLeft: 'left', KeyA: 'left', KeyH: 'left',
  ArrowRight: 'right', KeyD: 'right', KeyL: 'right',
  ArrowUp: 'up', KeyW: 'up', KeyK: 'up',
  ArrowDown: 'down', KeyS: 'down', KeyJ: 'down',
};

function bindInput(game) {
  window.addEventListener('keydown', e => {
    const dir = KEYMAP[e.code];
    if (dir) { e.preventDefault(); game.move(dir); return; }
    if (e.code === 'KeyU' || (e.ctrlKey && e.code === 'KeyZ')) { e.preventDefault(); game.undo(); }
    if (e.code === 'KeyN' || e.code === 'KeyR') game.newGame();
  });

  // swipe no tabuleiro
  const board = document.getElementById('board');
  let start = null;
  board.addEventListener('pointerdown', e => { start = { x: e.clientX, y: e.clientY }; });
  board.addEventListener('pointerup', e => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    start = null;
    if (Math.hypot(dx, dy) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) game.move(dx > 0 ? 'right' : 'left');
    else game.move(dy > 0 ? 'down' : 'up');
  });
  board.addEventListener('pointercancel', () => { start = null; });

  document.getElementById('undo').addEventListener('click', () => game.undo());
  document.getElementById('new').addEventListener('click', () => game.newGame());
  document.getElementById('retry').addEventListener('click', () => game.newGame());
  document.getElementById('keep').addEventListener('click', () => game.keepPlaying());
}
