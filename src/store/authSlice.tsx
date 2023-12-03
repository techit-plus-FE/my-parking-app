// import { create } from "zustand";

import axios from "axios";
import { StateCreator, create } from "zustand";
import { BASE_URL } from "../services/BaseUrl";
import { persist } from "zustand/middleware";

//index.ts Store에서도 AuthSlice를 참조하기 때문에 types 파일에 AuthSlice type을 선언하였습니다.
const requestSignUp: (arg: UserInputType) => void = async (
  UserInput: UserInputType
) => {
  // 서버로 회원가입 요청 보내기
  try {
    const response = await axios.post<UserInputType, AuthResponseType>(
      `${BASE_URL}/users/`,
      UserInput
    );
    if (response.data.ok === 1) {
      alert("회원가입이 완료되었습니다.");
    }
  } catch (Error: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Error.response) {
      alert(Error.response.data.message);
    }
    console.error("Error:", Error);
  }
};

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
  } catch (Error: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // console.log(userInfo);

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

//stateKey는 로컬 스토리지에 저장된 state객체의 keyName 입니다.
//localStorageKey 는 로컬 스토리지에 저장될 keyName 입니다.
const persistStore = (localStorageKey: string, stateKey: string) => {
  const store = create(
    persist(
      () => ({
        //stateKey의 초기값 세팅
        [stateKey]: "",
      }),
      {
        name: localStorageKey,
      }
    )
  );

  return {
    // getState는 현재 상태를 가져오는 메서드 입니다.
    getState: () => store.getState()[stateKey],

    //upDate 메서드는 상태를 업데이트 하는 메서드 입니다.
    upDate: (newState) => {
      const currentState = store.getState();
      // 기존 data에 state에 중복된 stateKey가 있다면 업데이트가 됩니다.
      store.setState({ ...currentState, [stateKey]: newState });
    },
  };
};

export const createAuthSlice: StateCreator<AuthSlice, []> = (set) => ({
  verifyEmail: (email: string) => {
    requestEmailVerification(email);
    set(() => ({}));
  },
  signUp: (UserInput: UserInputType) => {
    requestSignUp(UserInput);
    set(() => ({}));
  },

  handleLoginResponse: async (email: string, password: string) => {
    const userDetailDataResponse = await userLogin(email, password);

    // localStorage 의 key, state의 key 이름을 정의합니다.
    const userToken = persistStore("user-access-token", "userAccessToken");

    // 업데이트 할 데이터를 넣어줍니다.
    userToken.upDate(userDetailDataResponse.token.accessToken);

    const userDetailInfo = persistStore("user-detail-info", "userDetailInfo");
    userDetailInfo.upDate(userDetailDataResponse);

    return userDetailDataResponse;
  },
});
