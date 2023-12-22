interface ThemeSlice {
  isDark: boolean;
  setIsDark: (boolean) => void;
  isToastOpen: boolean;
  alertText: string;
  navSelectedValue: number;
  setNavSelected: (number) => void;
  setIsToastOpen: (b: boolean) => void;
  setAlertText: (s: string) => void;
}
