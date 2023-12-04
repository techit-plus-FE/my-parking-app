// 실제 사용자와 인터렉션
import React, { ChangeEvent, useState } from "react";
import LoginInput from "./LoginInput";
import { useBoundStore } from "../../../store/index";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const AuthSlice = useBoundStore((state) => state);
  const navigate = useNavigate();
  const [userInputId, setUserInputId] = useState("");
  const [userInputPassword, setUserInputPassword] = useState("");

  // input의 id name에 따라 값이 담김
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "user-email") {
      setUserInputId(e.target.value);
    } else if (e.target.id === "user-password") {
      setUserInputPassword(e.target.value);
    }
  };

  // axios 부분 수정해야함 변경해야함

  const submitFc = (e) => {
    e.preventDefault();
    AuthSlice.handleLoginResponse(userInputId, userInputPassword);
    navigate("/home");
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={submitFc}>
        <LoginInput
          id="user-email"
          label="로그인"
          value={userInputId}
          placeholder="아이디"
          onChange={handleInputChange}
        />
        <LoginInput
          id="user-password"
          label="비밀번호"
          value={userInputPassword}
          placeholder="비밀번호"
          type="password"
          onChange={handleInputChange}
        />
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;