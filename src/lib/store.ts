import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_CONFIG,
  STORAGE_KEY,
  type ArcxnjoConfig,
  type PanelTab,
} from "./config";

type Store = {
  config: ArcxnjoConfig;
  menuOpen: boolean;
  tab: PanelTab;
  capturingKey: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
  setTab: (tab: PanelTab) => void;
  setCapturingKey: (v: boolean) => void;
  patch: (fn: (c: ArcxnjoConfig) => ArcxnjoConfig) => void;
  reset: () => void;
};

export const useArcxnjo = create<Store>()(
  persist(
    (set) => ({
      config: DEFAULT_CONFIG,
      menuOpen: true,
      tab: "aimbot",
      capturingKey: false,
      setMenuOpen: (menuOpen) => set({ menuOpen }),
      toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
      setTab: (tab) => set({ tab }),
      setCapturingKey: (capturingKey) => set({ capturingKey }),
      patch: (fn) => set((s) => ({ config: fn(s.config) })),
      reset: () => set({ config: DEFAULT_CONFIG }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (s) => ({ config: s.config, tab: s.tab }),
      skipHydration: true,
    },
  ),
);
