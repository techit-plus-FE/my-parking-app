// import { create } from "zustand";

import axios from "axios"
import {StateCreator} from 'zustand'
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

//로그인 후 토큰 받아오는 함수
const userLogin = async (email: string, password: string) => {
  // axios body
  try {
    const userInfo = {
      email: email,
      password: password,
    };
    // console.log(userInfo);

    const response = await axios.post(
      "https://localhost/api/users/login",
      userInfo
    );
    const LoginResponseData = response.data.item;

    localStorage.setItem("userDetailData", JSON.stringify(LoginResponseData));
    localStorage.setItem(
      "userToken",
      JSON.stringify(LoginResponseData.token.accessToken)
    );

    if (response.data.ok) {
      // console.log(LoginResponseData);

      alert("로그인완");
    }

    // response 객체 안에 item return
    return LoginResponseData;
  } catch {
    console.error("로그인이 실패하였습니다.");
  }
};


export const createAuthSlice: StateCreator<
AuthSlice, 
[]
> = (set) => ({
  userDetailInfo: JSON.parse(localStorage.getItem("userDetailData") || "{}"),
  userToken: localStorage.getItem("userToken") || "",

  verifyEmail: (email: string) => {
    requestEmailVerification(email)
    set(()=>({}))
  },
  signUp: (UserInput: UserInputType)=>{
    requestSignUp(UserInput)
    set(() =>({}))
  },
  
  handleLoginResponse: async (email: string, password: string) => {
    const userDetailDataResponse = await userLogin(email, password);
    // user 토큰 값 저장
    set(() => ({
      userToken: userDetailDataResponse.token.accessToken,
      userDetailInfo: userDetailDataResponse,
    }));
    // user 정보 저장
  },

})