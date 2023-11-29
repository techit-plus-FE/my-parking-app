// 실제 사용자와 인터렉션
import React, { ChangeEvent, useState } from "react";
import LoginInput from "./LoginInput";
import axios from "axios";

const LoginForm = () => {
  const [userInputId, setUserInputId] = useState("");
  const [userInputPassword, setUserInputPassword] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "user-id") {
      setUserInputId(e.target.value);
    } else if (e.target.id === "user-password") {
      setUserInputPassword(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // post 작업
    postUserInfo();
  };

  // axios 부분 수정해야함 변경해야함
  const postUserInfo = async () => {
    // axios body
    const userInfo = {
      email: userInputId,
      password: userInputPassword,
    };

    const response = await axios.post(
      "https://localhost/api/users/login",
      userInfo
    );
    const userLoginData = response.data.item;

    localStorage.setItem(
      "userToken",
      JSON.stringify(userLoginData.token.accessToken)
    );

    if (response.data.ok) {
      alert("로그인완");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <LoginInput
          id="user-id"
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
