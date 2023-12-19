import { StateCreator } from "zustand";

export const themeSlice: StateCreator<ThemeSlice, []> = (set) => ({
  isDark: false,

  // 선택한 navBar의 value
  navSelectedValue: 0,

  setIsDark: (isDark) => {
    set({ isDark });
  },

  setNavSelected: (navSelectedValue) => set({ navSelectedValue }),
});
