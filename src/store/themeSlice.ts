import { StateCreator } from "zustand";

export const themeSlice: StateCreator<ThemeSlice, []> = (set) => ({
  isDark: false,

  // 선택한 navBar의 value
  navSelectedValue: 0,
  setIsDark: (state) => set({ isDark: state }),
  setNavSelected: (newValue) => set({ navSelectedValue: newValue }),
});
