import { Box } from "@mui/system";
import React from "react";
import LOGOBLUE from "../../assets/images/logo-blue.png";
import classes from "./SlideBar.module.css";
import { ChangeEvent } from "react";
import Footer from "./Footer";

interface SlideBarProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SlideBar: React.FC<SlideBarProps> = ({
  onChange,
  onKeyDown,
  value,
  onClick,
}) => {
  return (
    <>
      <Box
        sx={{
          border: "1px solid red",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
        <div>
          <input
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={value || ""}
          />
          <input type="date" />
        </div>
        <button onClick={onClick}>검색하기</button>
        <Footer />
      </Box>
    </>
  );
};

export default SlideBar;
