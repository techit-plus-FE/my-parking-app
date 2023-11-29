// import { create } from "zustand";
import axios from "axios"
import {StateCreator} from 'zustand'

//index.ts Store에서 AuthSlice를 참조하기 때문에 types 파일에 AuthSlice를 넣었습니다. 

const requestSignUp: (arg: UserInputType) => AuthSlice = (UserInput: UserInputType) => {
  console.log('request')
  // 서버로 회원가입 요청 보내기
  //console.log(UserInput)
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

const requestEmailVerification: (arg: string) => AuthSlice =  (email: string) => {
  console.log('Email Verification')
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = axios.get<string>(
      `https://localhost/api/users/email?email=${email}`,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ).then((response) => {
        alert("이메일 인증이 완료되었습니다.");
        return {} as AuthSlice
  })
    .catch((err: Error) =>{  
        alert("이미 등록된 이메일입니다.")
        console.error("Error:", err);
        return {} as AuthSlice
    })
  
return {} as AuthSlice

// eslint-disable-next-line @typescript-eslint/no-explicit-any
} 
  catch(Error: unknown) {
  console.error("Error:", Error);
  return {} as AuthSlice
}
}

export const createAuthSlice: StateCreator<
AuthSlice, 
[]
> = (set) => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verifyEmail: (email: string) => set((state)=>({...requestEmailVerification(email)})),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp: (UserInput: UserInputType)=>set((state) =>({...requestSignUp(UserInput)})),
})
