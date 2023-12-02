// 실제 사용자와 인터렉션
import React, { ChangeEvent, FormEventHandler, useState } from "react";

interface LoginFormProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  userInputId: string;
  userInputPassword: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleInputChange,
  handleSubmit,
  userInputId,
  userInputPassword,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-email">로그인</label>
        <input
          id="user-email"
          type="email"
          placeholder="아이디를 입력해주세요"
          value={userInputId}
          onChange={handleInputChange}
        />
      </form>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-password">password</label>
        <input
          id="user-password"
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={userInputPassword}
          onChange={handleInputChange}
        />
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
