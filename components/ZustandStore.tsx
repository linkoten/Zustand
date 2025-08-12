import { create } from "zustand";

interface BearState {
  bears: number;
  increase: (by: number) => void;
  decrease: (by: number) => void;
  resetBears: () => void; // Correction : resetBears est une fonction
}

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  decrease: (by) => set((state) => ({ bears: state.bears - by })),
  resetBears: () => set({ bears: 0 }), // Correction : resetBears est maintenant une fonction
}));
