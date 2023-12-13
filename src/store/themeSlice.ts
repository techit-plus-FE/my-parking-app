// import create from "zustand";

// interface DarkModeState {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// }

// // Zustand 상태 및 액션 정의
// const useDarkModeStore = create<DarkModeState>((set) => ({
//   darkMode: false,
//   toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
// }));

// // 외부에서 다크모드 상태 및 액션을 사용하기 위한 custom hook
// export const useDarkMode = () => useDarkModeStore();

// // 다크모드 값에 따라 document.documentElement에 'dark' class 추가 또는 제거
// useDarkModeStore.subscribe((state) => {
//   if (state.darkMode) {
//     document.documentElement.classList.add("dark");
//     localStorage.theme = "dark";
//   } else {
//     document.documentElement.classList.remove("dark");
//     localStorage.theme = "light";
//   }
// });

// // 어플리케이션이 실행될 때 localStorage에 다크모드 여부를 확인하고 초기값 설정
// const isDark =
//   localStorage.theme === "dark" ||
//   (!("theme" in localStorage) &&
//     window.matchMedia("(prefers-color-scheme: dark)").matches);
// useDarkModeStore.setState({ darkMode: isDark });

import { StateCreator } from "zustand";

export const themeSlice: StateCreator<ThemeSlice, []> = (set) => ({
  isDark: false,

  setIsDark: (state) => set({ isDark: !state }),
});
