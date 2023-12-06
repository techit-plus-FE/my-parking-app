// import { create } from "zustand";

import axios from "axios";
import { StateCreator, create } from "zustand";
import { BASE_URL } from "../services/BaseUrl";
import { devtools, persist } from "zustand/middleware";

//index.ts Store에서도 AuthSlice를 참조하기 때문에 types 파일에 AuthSlice type을 선언하였습니다.

const requestSignUp: (arg: UserInputType) => Promise<boolean> = async (
  UserInput: UserInputType
  ) => {

  // 서버로 회원가입 요청 보내기
  try {
        const response: AuthResponseType = await axios.post<UserInputType, AuthResponseType>(
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
const userLogin = async (email: string, password: string) => {
  // axios body
  try {
    const userInfo = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      "https://localhost/api/users/login",
      userInfo
    );

    if (response.data.ok) {
      alert("로그인이 완료되었습니다.");
    }
    // response 객체 안에 item return
    return response.data.item;
  } catch {
    console.error("로그인이 실패하였습니다.");
  }
};


export const updateTokenStore = create(
  devtools(
    persist<updateTokenStoreType>(
      (set) => ({
        //로그인 된 유저의 현재 토큰값이 필요할 때 token 사용하시면 됩니다.
        userToken: "",
        isLoggedIn: false,
        updateUserToken: async (email: string, password: string) => {
          const userData = await userLogin(email, password);
          set(() => ({
            userToken: userData.token.accessToken,
            //로그인 시 true
            isLoggedIn: true,
          }));
        },

        deleteUserToken: () => {
          set(() => ({ userToken: "", isLoggedIn: false }));
        },
      }),
      {
        name: "user-token",
      }
    )
  )
);

export const upDateUserBasicDataStore = create(
  persist<upDateUserBasicDataStoreType>(
    (set) => ({
      //로그인 된 유저의 데이터 값이 필요할 때 userBasicInfo 사용하시면 됩니다.
      userBasicInfo: {
        _id: 0,
        email: "",
        name: "",
        type: "",
        phone: "",
        address: "",
        createdAt: "",
        updatedAt: "",
        token: {
          accessToken: "",
          refreshToken: "",
        },
      },
      updateUserBasicInfo: async (email: string, password: string) => {
        const userData = await userLogin(email, password);
        set(() => ({ userBasicInfo: userData }));
      },
      deleteUserToken: () => {
        set(() => ({
          userBasicInfo: {
            _id: 0,
            email: "",
            name: "",
            type: "",
            phone: "",
            address: "",
            createdAt: "",
            updatedAt: "",
            token: {
              accessToken: "",
              refreshToken: "",
            },
          },
          isLoggedIn: false,
        }));
      },
    }),
    {
      name: "user-basic-info",
    }
  )
);

//stateKey는 로컬 스토리지에 저장된 state객체의 keyName 입니다.
//localStorageKey 는 로컬 스토리지에 저장될 keyName 입니다.

export const createAuthSlice: StateCreator<AuthSlice, []> = (set) => ({
  verifyEmail: (email: string) => {
    requestEmailVerification(email);
  },
  signUp: (UserInput: UserInputType) => {
    requestSignUp(UserInput);
  },
});
