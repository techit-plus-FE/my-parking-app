import { StateCreator } from "zustand";

export const themeSlice: StateCreator<ThemeSlice, []> = (set) => ({
  isDark: false,

  // 선택한 navBar의 value
  navSelectedValue: 0,

  setIsDark: (newIsDark) => {
    set({ isDark: newIsDark });
  },

  setNavSelected: (newValue) => set({ navSelectedValue: newValue }),
});
