// 실제 사용자와 인터렉션
import React, { ChangeEvent } from "react";
import { CommonButtonSmall } from "../../UI/CommonButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

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
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        "& > :not(style)": { m: 1 },
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          // helperText="Please enter your name"
          id="user-email"
          label="아이디"
          value={userInputId}
          onChange={handleInputChange}
          type="email"
          required
          error={!userInputId}
          helperText={!userInputId && "아이디를 입력해주세요."}
        />
        <TextField
          // helperText="Please enter your name"
          id="user-password"
          label="비밀번호"
          value={userInputPassword}
          onChange={handleInputChange}
          type="password"
          required
          error={!userInputPassword}
          helperText={!userInputPassword && "비밀번호를 입력해주세요."}
        />
        <CommonButtonSmall text="로그인하기" />
        <button onClick={() => navigate("/signup")}>이메일로 회원가입</button>
      </form>
    </Box>
  );
};

export default LoginForm;
