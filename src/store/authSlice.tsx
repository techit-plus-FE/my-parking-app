// import { create } from "zustand";

import axios from "axios";
import { StateCreator } from "zustand";
import { BASE_URL } from "../services/BaseUrl";
import { UserBasicInfo } from "../types/classImplementations";

//회원가입 API 요청 -> 성공 시 true, 실패 시 false 반환
const requestSignUp: (arg: Person) => Promise<AuthAlertType> = async (
  UserInput: Person
) => {
  // 서버로 회원가입 요청 보내기
  try {
    const response: AuthResponseType = await axios.post<
      Person,
      AuthResponseType
    >(`${BASE_URL}/users/`, UserInput);
    if (response.data.ok === 1) {
      return { ok: true, message: "회원가입이 완료되었습니다" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage: string = error.response.data.errors[0]?.msg
          ? error.response.data.errors[0].msg
          : error.response.data.message;
        return { ok: false, message: errorMessage };
      }
    }
    console.error("Error:", error);
    return { ok: false, message: "unknown error" };
  }
  return { ok: false, message: "unknown error" };
};

//이메일 중복확인 요청
const requestEmailVerification: (
  arg: string
) => Promise<AuthAlertType> = async (email: string) => {
  try {
    const response = await axios.get<string, AuthResponseType>(
      `${BASE_URL}/users/email?email=${email}`
    );
    console.log(response);
    console.log(response.data);
    if (response.data.ok === 1) {
      return { ok: true, message: "이메일 인증이 완료되었습니다" };
    }
  } catch (error: unknown) {
    console.log(error);
    if (!axios.isAxiosError(error))
      return { ok: false, message: "unknown error" };
    if (error.response) {
      const errorMessage: string = error.response.data.errors
        ? error.response.data.errors[0].msg
        : error.response.data.message;
      return { ok: false, message: errorMessage };
    }
    return { ok: false, message: "unknown error" };
  }
  return { ok: false, message: "unknown error" };
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
      `${BASE_URL}/users/login`,
      userInfo
    );

    // response 객체 안에 item return
    return response.data.item;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      //axios 에러시 에러 메세지를 담은 data를 return 합니다.
      console.error(error.response?.data);
      return error.response?.data;
    }
    console.error("로그인이 실패하였습니다.");
  }
  return {
    ...new UserBasicInfo(),
    token: { accessToken: "", refreshToken: "" },
  };
};

// store의 실제 구현 부분
export const createAuthSlice: StateCreator<AuthSlice, []> = (set) => ({
  userToken: {
    accessToken: "",
    refreshToken: "",
  },
  userBasicInfo: new UserBasicInfo(),
  isLoggedIn: false,

  //이메일 중복확인
  verifyEmail: (email: string) => {
    return requestEmailVerification(email);
  },
  //회원가입
  signUp: (UserInput: Person) => {
    return requestSignUp(UserInput);
  },
  //로그인
  login: async function (email: string, password: string) {
    return requestUserLogin(email, password);
  },
  //사용자의 기본 정보(토큰값, 이름, 프로필사진 등등) 업데이트
  updateUserBasicInfo(
    userToken: TokenInfoType["token"],
    userBasicInfo: UserBasicInfoType
  ) {
    set(() => ({
      userToken: userToken,
      userBasicInfo: userBasicInfo,
      isLoggedIn: true,
    }));
  },
  //로그아웃하면 정보 초기화
  logout: () => {
    set(() => ({
      userToken: {
        accessToken: "",
        refreshToken: "",
      },
      userBasicInfo: new UserBasicInfo(),
      isLoggedIn: false,
    }));
  },
});
