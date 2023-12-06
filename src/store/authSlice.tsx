// import { create } from "zustand";

import axios from "axios";
import { StateCreator} from "zustand";
import { BASE_URL } from "../services/BaseUrl";
import { UserBasicInfo } from "../types/classImplementations";

//index.ts Store에서도 AuthSlice를 참조하기 때문에 types 파일에 AuthSlice type을 선언하였습니다.

const requestSignUp: (arg: Person) => Promise<boolean> = async (
  UserInput: Person
  ) => {

  // 서버로 회원가입 요청 보내기
  try {
        const response: AuthResponseType = await axios.post<Person, AuthResponseType>(
          `${BASE_URL}/users/`,
          UserInput,
        )
        if (response.data.ok === 1) {
          alert("회원가입이 완료되었습니다.")
          return true
        } 
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch(Error: any) {
    if (Error.response){
      alert(Error.response.data.message)
      }
    console.error("Error:", Error);
    return false
    }
  return false
  }

const requestEmailVerification: (arg: string) => void = async (
  email: string
) => {
  try {
    const response = await axios.get<string, AuthResponseType>(
      `${BASE_URL}/users/email?email=${email}`
    );
    if (response.data.ok === 1) {
      alert("이메일 인증이 완료되었습니다.");
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (Error: any) {
    if (Error.response) {
      alert(Error.response.data.message);
    }
    console.error("Error:", Error);
  }
};

//로그인 후 토큰 받아오는 함수
const requestUserLogin = async (email: string, password: string) => {
  // axios body
  try {
    const userInfo = {
      email: email,
      password: password,
    };

    const response: LoginResponseType = await axios.post(
      "https://localhost/api/users/login",
      userInfo
    );

    if (response.data.ok) {
      alert("로그인이 완료되었습니다.");
    }
    // response 객체 안에 item return
    return response.data.item;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (Error: any) {
    if (Error.response) {
      alert(Error.response.data.message);
    }
    console.error("로그인이 실패하였습니다.");
  }
  return {... new UserBasicInfo(), token : {accessToken : "" , refreshToken : "" }}
};


//stateKey는 로컬 스토리지에 저장된 state객체의 keyName 입니다.
//localStorageKey 는 로컬 스토리지에 저장될 keyName 입니다.

export const createAuthSlice: StateCreator<AuthSlice, []> = (set) => ({
  userToken : {
    accessToken : '',
    refreshToken : '',
  },
  userBasicInfo : new UserBasicInfo(), 
  isLoggedIn : false,
  verifyEmail: (email: string) => {
    requestEmailVerification(email);
  },
  signUp: (UserInput: Person)=>{
    return requestSignUp(UserInput)
  },
  login: async function (email: string, password: string) {
    return requestUserLogin(email, password);
  },
  updateUserBasicInfo(userToken: TokenType, userBasicInfo: UserBasicInfoType){
    set(() => ({
      userToken : userToken,
      userBasicInfo: userBasicInfo,
      isLoggedIn: true,
    }))
  },
  logout: () => {
    set(()=> ({
      userToken :{
        accessToken : "",
        refreshToken : "",
      },
      userBasicInfo : new UserBasicInfo(),
      isLoggedIn: false,
  }))
  }
});
