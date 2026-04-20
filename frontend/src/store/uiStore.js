import { create } from 'zustand';

export const useGameStore = create((set) => ({
  user: { username: 'Player1', coins: 100 }, // starts with 100 (2 packs)
  addCoins: (amount) => set((state) => ({ user: { ...state.user, coins: state.user.coins + amount } })),
  deductCoins: (amount) => set((state) => ({ user: { ...state.user, coins: state.user.coins - amount } }))
}));

export const useSettingsStore = create((set) => ({
  musicEnabled: true,
  sfxEnabled: true,
  currentTrack: 'SeriousBackgroundMusic.mp3',
  toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
  toggleSfx: () => set((state) => ({ sfxEnabled: !state.sfxEnabled })),
  setTrack: (track) => set({ currentTrack: track })
}));
