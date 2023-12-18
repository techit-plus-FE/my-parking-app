import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import LOGOBLUE from "../../assets/images/logo-blue.png";
import classes from "./SlideBar.module.css";
import { useTheme } from "@mui/material/styles";
import Footer from "./Footer";

interface SlideBarProps {
  children?: ReactNode;
}

const SlideBar: React.FC<SlideBarProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={classes.logoWrapper}>
          <div className={classes.imgWrapper}>
            <img src={LOGOBLUE} alt="logo-img" />
          </div>
          <p>마이파킹</p>
        </div>

        {/* 검색 및 날짜 필터 양식 */}
        {children}

        <p className={classes.etc}>Made By @MYPARKING</p>
      </Box>

      <Footer position="absolute" />
    </>
  );
};

export default SlideBar;
