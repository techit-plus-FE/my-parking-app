interface ThemeSlice {
  isDark: boolean;
  setIsDark: (boolean) => void;
  isToastOpen: boolean;
  alertText: string;
  bgColor: string;
  navSelectedValue: number;
  setNavSelected: (number) => void;
  setIsToastOpen: (b: boolean) => void;
  setAlertText: (s: string) => void;
  setBgColor: (s: string) => void;
}
