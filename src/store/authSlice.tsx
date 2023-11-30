// import { create } from "zustand";
import axios from "axios";
import { StateCreator } from "zustand";

//index.ts Store에서 AuthSlice를 참조하기 때문에 types 파일에 AuthSlice를 넣었습니다.

const requestSignUp: (arg: UserInputType) => AuthSlice = (
  UserInput: UserInputType
) => {
  console.log("request");
  // 서버로 회원가입 요청 보내기
  //console.log(UserInput)
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = axios
      .post<UserInputType>(
        "https://localhost/api/users/",
        UserInput
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      )
      .then((response) => {
        alert("회원가입이 완료되었습니다.");
      });
    return {} as AuthSlice;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (Error: any) {
    console.error("Error:", Error);
    return {} as AuthSlice;
  }
};

const requestEmailVerification: (arg: string) => AuthSlice = (
  email: string
) => {
  console.log("Email Verification");
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = axios
      .get<string>(
        `https://localhost/api/users/email?email=${email}`
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      )
      .then((response) => {
        alert("이메일 인증이 완료되었습니다.");
        return {} as AuthSlice;
      })
      .catch((err: Error) => {
        alert("이미 등록된 이메일입니다.");
        console.error("Error:", err);
        return {} as AuthSlice;
      });

    return {} as AuthSlice;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (Error: unknown) {
    console.error("Error:", Error);
    return {} as AuthSlice;
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
    console.log(userInfo);

    const response = await axios.post(
      "https://localhost/api/users/login",
      userInfo
    );
    const userLoginData = response.data.item;

    localStorage.setItem(
      "userToken",
      JSON.stringify(userLoginData.token.accessToken)
    );

    if (response.data.ok) {
      alert("로그인완");
    }

    return userLoginData.token.accessToken;
  } catch {
    console.error("로그인이 실패하였습니다.");
  }
};

export const createAuthSlice: StateCreator<AuthSlice, []> = (set) => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verifyEmail: (email: string) =>
    set((state) => ({ ...requestEmailVerification(email) })),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp: (UserInput: UserInputType) =>
    set((state) => ({ ...requestSignUp(UserInput) })),

  userToken: localStorage.getItem("userToken") || "",
  login: async (email: string, password: string) => {
    const token = await userLogin(email, password);
    set(() => ({ userToken: token }));
  },
});
