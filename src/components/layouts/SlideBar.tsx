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
      <Box sx={{}}>
        <Box
          sx={{
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            position: "relative",
          }}
        >
          <Box
            sx={{
              marginBottom: "100px",
            }}
          >
            <div className={classes.logoWrapper}>
              <p>마이파킹</p>
              <div className={classes.imgWrapper}>
                <img src={LOGOBLUE} alt="logo-img" />
              </div>
            </div>
          </Box>
          <div>{children}</div>
          <Footer position="absolute" />
        </Box>
      </Box>
    </>
  );
};

export default SlideBar;
