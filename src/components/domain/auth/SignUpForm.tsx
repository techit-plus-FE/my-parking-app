import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import {Person} from "../../../types/classImplementations";
import { useBoundStore } from "../../../store/index";


const SignUpForm = () => {
  const AuthSlice: AuthSlice = useBoundStore((state) => state);
  const [userInputs, setUserInputs] = useState<UserInputType>(
    // Customer일 때 
    new Person()
      // Seller일 때 
    // new Person("seller")
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

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <div>email</div>
        <label>
          <input
            value={userInputs.email as string}
            name="email"
            onChange={saveUserInputs}
          ></input>
        </label>
        <button onClick={() => AuthSlice.verifyEmail(userInputs.email)}>
          이메일 중복확인
        </button>
      </div>
      {Object.keys(userInputs)
        .filter((v) => v !== "email" && v !== "extra" && v !== "type")
        .map((item) => {
          return (
            <div>
              <div>{item}</div>
              <label>
                <input
                  value={userInputs[item as keyof UserInputType] as string}
                  name={item}
                  onChange={saveUserInputs}
                ></input>
              </label>
            </div>
          );
        })}
      <button onClick={() => AuthSlice.signUp(userInputs)}> 회원가입 </button>
    </form>
  );
};

export default SignUpForm;