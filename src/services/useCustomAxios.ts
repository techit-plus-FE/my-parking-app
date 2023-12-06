import axios from "axios";
import mem from "mem";
import { BASE_URL } from "./BaseUrl";
import { useBoundStore } from "../store";

// 리플래쉬 토큰 앤드포인트 경로
const REFRESH_URL = "/users/refresh";
const useCustomAxios = () => {
  const user = useBoundStore((state) => state.userDetailInfo);

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 3, // 요청이 timeout보다 오래걸리면 요청 중단됨
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json", // 서버로부터 받고자하는 응답 미디어 타입 지정 -> JSON
    },
    withCredentials: true, // 쿠키, Authorization 인증 헤더, TLS client certifacates를 내포하는 자격 증명을 자동으로 포함시켜 서버전송 가능하도록 설정
  });

  // 요청 인터셉트 -> 요청이 전달되기 전에 작업(전처리) 수행, 요청 오류가 있는 작업 수행을 할 수 있는 2개의 콜백 함수를 받음
  instance.interceptors.request.use(
    (config) => {
      // 요청 전 토큰이 유효한지 리프래쉬토큰 검증 절차 진행
      if (user?.token) {
        let token = user.token.accessToken;
        if (config.url === REFRESH_URL) {
          token = window.localStorage.refreshToken;
        }
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (err) => {
      console.error("interceptors err", err);
      return Promise.reject(err);
    }
  );

  // 응답 인터셉티 -> 응답 데이터가 있는 작업(후처리) 수행, 응답 오류가 있는 작업 수행을 할 수 있는 2개의 콜백 함수를 받음
  instance.interceptors.response.use(
    (res) => {
      if (res.status === 404) {
        console.log("404페이지(에러)로 넘어가야합니다.");
      }
      return res;
    },
    async (err) => {
      console.error("interceptors err", err);

      const { config, response } = err;

      if (response?.status === 401) {
        if (
          response.data.errorName === "TokenExpiredError" &&
          config.url !== REFRESH_URL
        ) {
          console.log("accessToken 만료. 재발급 필요.");
          const accessToken = await getAccessToken(instance);

          if (accessToken) {
            err.config.headers.Authorization = `Bearer ${accessToken}`;
            console.log("accessToken 스토리지에 저장", accessToken);
            window.localStorage.accessToken = accessToken;
            // 기존 axios 설정값을 가지고 재요청
            return axios(err.config);
          }
        }

        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        alert("로그인 후 이용 가능합니다.");

        return Promise.reject(err);
      } else {
        const error = response?.data?.error;
        // Network error 같은 경우 response가 없음
        // 또는 서버에서 error를 응답한 경우
        if (!response || error) {
          alert(
            error?.message ||
              `요청하신 작업처리에 실패했습니다. 잠시후 다시 요청하시기 바랍니다.`
          );
        } else {
          return Promise.reject(err);
        }
      }
    }
  );

  // AccessToken 갱신 요청
  const getAccessToken = mem(
    async function (instance) {
      try {
        const {
          data: { accessToken },
        } = await instance.get(REFRESH_URL);
        return accessToken;
      } catch (err) {
        console.error(err);
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
      }
    },
    { maxAge: 1000 }
  );

  return instance;
};

export default useCustomAxios;
