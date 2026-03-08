import { create } from 'zustand'

interface LayoutState {
  menuBarCollapsed: boolean
  setMenuBarCollapsed: (collapsed: boolean) => void
}

export const useLayoutStore = create<LayoutState>((set) => ({
  menuBarCollapsed: false,
  setMenuBarCollapsed: (collapsed) => set({ menuBarCollapsed: collapsed }),
}))
