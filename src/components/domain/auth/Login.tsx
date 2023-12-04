// 컴포넌트 안에 비즈니스로직이고 반환(return)은 해당 로직에서 사용한 변수나 함수를 전달할 UI컴포넌트 렌더링
import React from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
