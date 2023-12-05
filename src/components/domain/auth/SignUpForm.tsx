import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import {Person, UserInputClass} from "../../../types/classImplementations"
import { useBoundStore } from "../../../store/index";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import {MenuItem} from "@mui/material";


const SignUpForm = () => {
  const AuthSlice: AuthSlice = useBoundStore((state) => state);
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState<UserInputClass>(
    new UserInputClass()
    );
  

  const saveUserInputs: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target as HTMLInputElement;

    setUserInputs((prev: UserInputClass) => ({
      ...prev,
      [name]: value,
    }));
  };


  const isMatching: () => boolean = () => {
    if (userInputs.password === userInputs.passwordCheck)
      return true
    return false
  }


  const handleSignUp: (userInputs: UserInputClass) => void  = async (userInputs: UserInputClass) => {
    //userInputs에서 passwordCheck를 삭제한 객체 newPerson을 만들어 줍니다.
    const newPerson: {
      [key in keyof Person] : Person[key]
    } = {...userInputs} satisfies Person
    console.log(newPerson)

    //newPerson을 넣어 회원가입을 진행합니다. 잘 완료되었다면 login 페이지로 이동합니다. 
    if (await AuthSlice.signUp(newPerson) == true){
      navigate('/login')
    }
  }

 
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <div>회원유형</div>
        <TextField
           select
           fullWidth
           required
           defaultValue = "user"
           helperText="회원유형을 선택해 주세요"
           name="type"
           variant="standard"
           onChange={saveUserInputs}
        >  
          <MenuItem key = "user" value="user">일반</MenuItem>
          <MenuItem key = "seller" value="seller">판매자</MenuItem>
        </TextField> 
      </div>
      <div>
        <div>email</div>
         <TextField
          fullWidth
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
          fullWidth
          value={userInputs.password as string}
          name = "password"
          type="password"
          variant="standard"
          onChange = {saveUserInputs}
        />
      </div>
      <div>
        <div>password check</div>
        <TextField
          required                 
          fullWidth
          error = {userInputs.password.length===0 ? 
          userInputs.passwordCheck.length!==0 ? true : false :
          isMatching()? false : true}
          helperText={userInputs.password.length===0 ? 
            userInputs.passwordCheck.length!==0 ? "비밀번호를 설정해 주세요" : true :
            userInputs.passwordCheck.length===0 ? "비밀번호 중복확인을 해 주세요" :
            isMatching()? "비밀번호가 일치합니다" : "비밀번호가 일치하지 않습니다"}
          value={userInputs.passwordCheck as string}
          name = "passwordCheck"
          type="password"
          variant="standard"
          onChange = {saveUserInputs}
        />
      </div>
      {Object.keys(userInputs)
        .filter((v) => v !== "email" &&v!=="password" && v !== "extra" && v !== "type" && v!=="passwordCheck")
        .map((item) => {
          return (
            <div key = {item}>
              <div>{item}</div>
              <TextField
              fullWidth
              required
              value={userInputs[item as keyof UserInputClass] as string}
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
}

export default SignUpForm;