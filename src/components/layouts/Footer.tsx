import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import { useTheme } from "@emotion/react";

interface FooterProps {
  position?: string;
  width?: string;
}

const Footer: React.FC<FooterProps> = ({ position, width }) => {
  const logout = useBoundStore((state) => state.logout);
  const user_id = useBoundStore((state) => state.myInfo._id);
  const setNavSelected = useBoundStore((state) => state.setNavSelected);
  const navSelectedValue = useBoundStore((state) => state.navSelectedValue);

  const navigate = useNavigate();

  const handelNavigate = (path: string) => {
    navigate(path);
  };
  const theme = useTheme();

  return (
    <Box
      sx={{
        // 모바일 일 땐
        position: position ? position : "fixed",
        bottom: 0,
        zIndex: 1000,
        width: width ? width : "100%",
      }}
    >
      <BottomNavigation
        showLabels
        value={navSelectedValue}
        onChange={(e, newValue) => {
          setNavSelected(newValue);
          // navigate(event.target.);
        }}
        sx={{
          maxWidth: "var(--main-max-width)",
          bgcolor: theme.palette.background.default,
        }}
      >
        <BottomNavigationAction
          label="홈"
          icon={<HomeIcon />}
          onClick={() => handelNavigate("/home")}
          sx={{ flex: 1 }}
        />
        <BottomNavigationAction
          label="검색"
          icon={<SearchIcon />}
          onClick={() =>
            //검색페이지 없음
            handelNavigate("/home")
          }
        />
        <BottomNavigationAction
          label="프로필"
          icon={<PersonIcon />}
          onClick={() => handelNavigate(`/mypage/${user_id}`)}
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
