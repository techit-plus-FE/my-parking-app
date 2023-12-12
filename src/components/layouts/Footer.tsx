import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import classes from "./Footer.module.css";
import { useBoundStore } from "../../store";

const Footer: React.FC = () => {
  //수정하기 변경하기
  // const iconActiveFill = "var(--color-gray-400)";
  const logout = useBoundStore((state) => state.logout);
  const user_id = useBoundStore((state) => state.myInfo._id);
  const isDark = useBoundStore((state) => state.isDark);

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handelNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        zIndex: 1000,
        width: "100%",
      }}
      className={classes.footerContainer}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
          // navigate(event.target.);
        }}
        sx={{ maxWidth: "var(--main-max-width)" }}
      >
        <BottomNavigationAction
          label="홈"
          icon={<HomeIcon />}
          onClick={() => handelNavigate("home")}
          sx={{ flex: 1 }}
        />
        <BottomNavigationAction
          label="검색"
          icon={<SearchIcon />}
          onClick={() =>
            //검색페이지 없음
            handelNavigate("home")
          }
        />
        <BottomNavigationAction
          label="프로필"
          icon={<PersonIcon />}
          onClick={() => handelNavigate(`mypage/${user_id}`)}
          sx={{ flex: 1 }}
        />
        <BottomNavigationAction
          label="로그아웃"
          icon={<PersonIcon />}
          onClick={() => {
            logout();
            alert("로그아웃이 완료되었습니다");
          }}
          sx={{ flex: 1 }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
