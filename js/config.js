// Constantes do jogo
const SIZE = 4;
const WIN_TILE = 2048;
const FOUR_CHANCE = 0.1;      // probabilidade de nascer um 4 em vez de 2
const START_TILES = 2;
const STORAGE_KEY = '2048-state';
const BEST_KEY = '2048-best';

const DIRS = {
  left:  { dr: 0,  dc: -1 },
  right: { dr: 0,  dc: 1 },
  up:    { dr: -1, dc: 0 },
  down:  { dr: 1,  dc: 0 },
};
