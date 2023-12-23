import { StateCreator } from "zustand";

export const themeSlice: StateCreator<ThemeSlice, []> = (set) => ({
  isDark: false,
  bgColor: "",
  // 선택한 navBar의 value
  navSelectedValue: 0,
  isToastOpen: false,
  setIsDark: (newIsDark) => {
    set({ isDark: newIsDark });
  },
  alertText: "",
  setNavSelected: (newValue) => set({ navSelectedValue: newValue }),
  setIsToastOpen: (isToastOpen) => set({ isToastOpen: isToastOpen }),
  setAlertText: (newText) => set({ alertText: newText }),
  setBgColor: (newColor) => set({ bgColor: newColor }),
});
