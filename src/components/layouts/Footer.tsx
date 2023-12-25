import React, { useEffect } from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import { useTheme } from "@mui/material/styles";
import { Toast } from "../UI/Toast";

interface FooterProps {
  position?: string;
  width?: string;
}

const Footer: React.FC<FooterProps> = ({ position, width }) => {
  const logout = useBoundStore((state) => state.logout);
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);

  const user_id = useBoundStore((state) => state.myInfo._id);
  const setNavSelected = useBoundStore((state) => state.setNavSelected);
  const navSelectedValue = useBoundStore((state) => state.navSelectedValue);

  const isToastOpen = useBoundStore((state) => state.isToastOpen);
  const alertText = useBoundStore((state) => state.alertText);
  // const bgColor = useBoundStore((state) => state.bgColor);
  const setIsToastOpen = useBoundStore((state) => state.setIsToastOpen);
  const setAlertText = useBoundStore((state) => state.setAlertText);
  // const setBgColor = useBoundStore((state) => state.setBgColor);

  const navigate = useNavigate();
  const location = useLocation().pathname;
  const pathName = location.split("/")[1];
  const handelNavigate = (path: string) => {
    navigate(path);
  };
  const theme = useTheme();

  //pathName 이 바뀔때 마다 nav의 color 변경됩니다.
  useEffect(() => {
    if (pathName === "home") {
      setNavSelected(0);
    } else if (pathName === "mypage") {
      setNavSelected(1);
    }
  }, [pathName, setNavSelected]);

  return (
    <Box
      sx={{
        // 모바일 일 땐
        position: position ? position : "fixed",

        right: position ? 0 : null,
        bottom: 0,
        zIndex: 1000,
        width: width ? width : "100%",
      }}
    >
      <BottomNavigation
        showLabels
        value={navSelectedValue}
        // onChange={(_, newValue) => {
        //   setNavSelected(newValue);
        //   // navigate(event.target.);
        // }}
        sx={{
          maxWidth: "var(--main-max-width)",
          bgcolor: theme.palette.background.default,
        }}
      >
        <BottomNavigationAction
          label="홈"
          icon={<HomeIcon />}
          onClick={() => handelNavigate("/home")}
          sx={{ flex: 1, minWidth: 0 }}
        />
        {/* <BottomNavigationAction
          label="검색"
          icon={<SearchIcon />}
          onClick={() =>
            //검색페이지 없음
            handelNavigate("/home")
          }
          sx={{ flex: 1, minWidth: 0 }}
        /> */}
        <BottomNavigationAction
          label="프로필"
          icon={<PersonIcon />}
          onClick={() => handelNavigate(`/mypage/${user_id}`)}
          sx={{ flex: 1, minWidth: 0 }}
        />

        {isLoggedIn ? (
          <BottomNavigationAction
            label="로그아웃"
            icon={<PersonIcon />}
            onClick={() => {
              logout();
              setNavSelected(0);
              setAlertText("로그아웃이 완료되었습니다");
              setIsToastOpen(true);
            }}
            sx={{ flex: 1, minWidth: 0 }}
          />
        ) : (
          <BottomNavigationAction
            label="로그인"
            icon={<PersonIcon />}
            onClick={() => {
              handelNavigate("/login");
            }}
            sx={{ flex: 1, minWidth: 0 }}
          />
        )}
      </BottomNavigation>
      <Toast isToastOpen={isToastOpen} alertText={alertText} />
    </Box>
  );
};

export default Footer;
