// 실제 사용자와 인터렉션
import React, { ChangeEvent } from "react";
import { CommonButtonLarge } from "../../UI/CommonButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";
import classes from "./Login.module.css";

interface LoginFormProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  userInputId: string;
  userInputPassword: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleInputChange,
  handleSubmit,
  userInputPassword,
  userInputId,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        "& > :not(style)": { m: 1 },
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 className={classes.title}>로그인</h2>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            // helperText="Please enter your name"
            id="user-email"
            label="아이디"
            value={userInputId}
            onChange={handleInputChange}
            type="email"
            required
            // error={!userInputId}
            // helperText={!userInputId && "아이디를 입력해주세요."}
            sx={{ padding: "10px", width: "300px" }}
          />
          <TextField
            id="user-password"
            label="비밀번호"
            value={userInputPassword}
            onChange={handleInputChange}
            type="password"
            required
            sx={{ padding: "10px" }}
          />
        </Box>
        <CommonButtonLarge text="로그인하기" />
        <Button
          onClick={() => navigate("/signup")}
          sx={{ color: theme.palette.text.primary, width: "100%" }}
        >
          <p>이메일로 회원가입</p>
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
