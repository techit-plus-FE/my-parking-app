// import { create } from "zustand";
import axios from "axios"
import {StateCreator} from 'zustand'

// interface AuthSlice {
//   signUp: (UserInput: UserInputType) => void;
//   // logIn: 
//   // 인증
//   // 인가
// }

const requestSignUp: (arg: UserInputType) => AuthSlice = (UserInput: UserInputType) => {
  console.log('request')
  // 서버로 회원가입 요청 보내기
  console.log(UserInput)
  try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = axios.post<UserInputType>(
          "https://localhost/api/users/",
          UserInput,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ).then((response) => {
          alert("회원가입이 완료되었습니다.");
      })
    return {} as AuthSlice
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(Error: any) {
    console.error("Error:", Error);
    return {} as AuthSlice
  }
}

export const createAuthSlice: StateCreator<
AuthSlice, 
[]
> = (set) => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp: (UserInput: UserInputType)=>set((state) =>({...requestSignUp(UserInput)})),
})
