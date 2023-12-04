import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import {Person} from "../../../types/classImplementations"
import { useBoundStore } from "../../../store/index";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';


const SignUpForm = () => {
  const AuthSlice: AuthSlice = useBoundStore((state) => state);
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState<UserInputType>(
    new Person()
    );


  const saveUserInputs: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target as HTMLInputElement;

    setUserInputs((prev: UserInputType) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp: (userInputs: UserInputType) => void  = async (userInputs: UserInputType) => {
    if (await AuthSlice.signUp(userInputs) == true){
      navigate('/login')
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <div>email</div>
         <TextField
          required
          variant="standard"
          name = "email"
          onChange = {saveUserInputs}
        />
      </div>
      <button onClick={() => AuthSlice.verifyEmail(userInputs.email)}>
          이메일 중복확인
      </button>
      <div>
        <div>password</div>
        <TextField
          required
          value={userInputs.password as string}
          name = "password"
          type="password"
          variant="standard"
          onChange = {saveUserInputs}
        />
      </div>
      {Object.keys(userInputs)
        .filter((v) => v !== "email" &&v!=="password" && v !== "extra" && v !== "type")
        .map((item) => {
          return (
            <div key = {item}>
              <div>{item}</div>
              <TextField
              required
              value={userInputs[item as keyof UserInputType] as string}
              name = {item}           
              variant="standard"
              onChange = {saveUserInputs}
              />
            </div>
          );
        })}
      <button onClick={() => handleSignUp(userInputs)}> 회원가입 </button>
    </form>
  );
};

export default SignUpForm;