// 컴포넌트 안에 비즈니스로직이고 반환(return)은 해당 로직에서 사용한 변수나 함수를 전달할 UI컴포넌트 렌더링
import React, { ChangeEvent, useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import {
  updateTokenStore,
  upDateUserBasicDataStore,
} from "../../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [userInputId, setUserInputId] = useState("");
  const [userInputPassword, setUserInputPassword] = useState("");
  const updateUserToken = updateTokenStore((state) => state.updateUserToken);
  const updateUserBasicInfo = upDateUserBasicDataStore(
    (state) => state.updateUserBasicInfo
  );

  // input의 id name에 따라 값이 담김
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "user-email") {
      setUserInputId(e.target.value);
    } else if (e.target.id === "user-password") {
      setUserInputPassword(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateTokenState = updateUserToken(userInputId, userInputPassword);
    updateUserBasicInfo(userInputId, userInputPassword);

    //updateTokenState이 resolve시 navigate로 이동
    updateTokenState.then(() => navigate("/home"));
  };

  return (
    <div>
      <LoginForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        userInputId={userInputId}
        userInputPassword={userInputPassword}
      />
    </div>
  );
};

export default Login;