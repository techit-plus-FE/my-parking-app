// import { create } from "zustand";
import axios from "axios"
import {StateCreator} from 'zustand'
import { AuthSlice, UserInputType, AuthResponseType} from "../types/Auth"
import { BASE_URL } from "../services/BaseUrl"

//index.ts Store에서도 AuthSlice를 참조하기 때문에 types 파일에 AuthSlice type을 선언하였습니다. 

const requestSignUp: (arg: UserInputType) => void = async (UserInput: UserInputType) => {
  // 서버로 회원가입 요청 보내기
  try {
        const response = await axios.post<UserInputType, AuthResponseType>(
          `${BASE_URL}/users/`,
          UserInput,
        )
        if (response.data.ok === 1) {
          alert("회원가입이 완료되었습니다.")
        } 
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch(Error: any) {
    if (Error.response){
      alert(Error.response.data.message)
      }
    console.error("Error:", Error);
    }
  }

const requestEmailVerification: (arg: string) => void =  async (email: string) => {
  try {
      const response = await axios.get<string, AuthResponseType>(
        `${BASE_URL}/users/email?email=${email}`,
      )
      if (response.data.ok === 1) {
        alert("이메일 인증이 완료되었습니다.")
      } 
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(Error: any) {
    if (Error.response){
        alert(Error.response.data.message)
        }
    console.error("Error:", Error);
    }
  }

export const createAuthSlice: StateCreator<
AuthSlice, 
[]
> = (set) => ({
  verifyEmail: async (email: string) => {
    await requestEmailVerification(email)
    set(()=>({}))
  },
  signUp: async (UserInput: UserInputType)=>{
    await requestSignUp(UserInput)
    set(() =>({}))
  },
})
