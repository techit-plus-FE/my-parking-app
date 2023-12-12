import { createTheme } from "@mui/system";
import { useBoundStore } from "../../store";

const darkTheme: React.FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9", // 다크 모드에서의 primary 색상
      },
      secondary: {
        main: "#ffcc80", // 다크 모드에서의 secondary 색상
      },
      background: {
        default: "#212121", // 기본 배경색
        paper: "#2c2c2c", // 다크 모드에서의 페이퍼 배경색
      },
      text: {
        primary: "#000", // 다크 모드에서의 텍스트 색상
        secondary: "#989898", // 다크 모드에서의 보조 텍스트 색상
      },

      // 기타 색상들을 필요에 따라 추가할 수 있습니다.
    },
  });

  const rigthTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#90caf9", // 다크 모드에서의 primary 색상
      },
      secondary: {
        main: "#ffcc80", // 다크 모드에서의 secondary 색상
      },
      background: {
        default: "#fff", // 기본 배경색
        paper: "#fff", // 다크 모드에서의 페이퍼 배경색
      },
      text: {
        primary: "#000", // 다크 모드에서의 텍스트 색상
        secondary: "#989898", // 다크 모드에서의 보조 텍스트 색상
      },

      // 기타 색상들을 필요에 따라 추가할 수 있습니다.
    },
  });

  return (

  );
};

export default darkTheme;
