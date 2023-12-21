import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import LOGOBLUE from "../../assets/images/logo-blue.png";
import classes from "./SlideBar.module.css";
import Footer from "./Footer";
import Toggle from "./Toggle";

interface SlideBarProps {
  children?: ReactNode;
}

const SlideBar: React.FC<SlideBarProps> = ({ children }) => {
  return (
    <div className={classes.slideBarContainer}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div className={classes.logoWrapper}>
          <div>
            <Toggle />
            <div className={classes.logoImgWrapper}>
              <div className={classes.imgWrapper}>
                <img src={LOGOBLUE} alt="logo-img" />
              </div>
              <p>마이파킹</p>
            </div>
          </div>
        </div>

        {/* 검색 및 날짜 필터 양식 */}
        {children}

        <p className={classes.etc}>Made By @MYPARKING</p>
      </Box>
      <Footer position="absolute" />
    </div>
  );
};

export default SlideBar;
