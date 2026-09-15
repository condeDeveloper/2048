// Persistência em localStorage: recorde e partida em andamento
const Storage = {
  loadBest() { return Number(localStorage.getItem(BEST_KEY) || 0); },
  saveBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (_) {} },

  saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  },
  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!Array.isArray(s.cells) || s.cells.length !== SIZE) return null;
      return s;
    } catch (_) { return null; }
  },
  clearState() { try { localStorage.removeItem(STORAGE_KEY); } catch (_) {} },
};
