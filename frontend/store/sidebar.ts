import { create } from "zustand";

interface SidebarState {
  collapsed: boolean;
  secondaryVisible: boolean;
  toggleCollapsed: () => void;
  setSecondaryVisible: (visible: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: false,
  secondaryVisible: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setSecondaryVisible: (visible) => set({ secondaryVisible: visible }),
}));
