import React from "react";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import classes from "./Footer.module.css";
import {
  updateTokenStore,
  upDateUserBasicDataStore,
} from "../../store/authSlice";
const Footer: React.FC = () => {
  //수정하기 변경하기
  // const iconActiveFill = "var(--color-gray-400)";
  const deleteUserToken = updateTokenStore((state) => state.deleteUserToken);
  const deleteUserBasicData = upDateUserBasicDataStore(
    (state) => state.deleteUserBasicData
  );

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handelNavigate = (path: string) => {
    navigate(path);
  };

  const logout = () => {
    deleteUserToken();
    deleteUserBasicData();
  };

  return (
    <Box sx={{ width: "100%" }} className={classes.footerContainer}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
          // navigate(event.target.);
        }}
      >
        <BottomNavigationAction
          label="홈"
          icon={<HomeIcon />}
          onClick={() => handelNavigate("home")}
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
          onClick={() => handelNavigate("mypage")}
        />
        <BottomNavigationAction
          label="로그아웃"
          icon={<PersonIcon />}
          onClick={() => logout()}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
