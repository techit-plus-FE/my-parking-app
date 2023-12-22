import { StateCreator } from "zustand";
import { BASE_URL } from "../services/BaseUrl";
import axios from "axios";
import { UserDetailInfo } from "../types/classImplementations";

//index.ts Store에서 AuthSlice를 참조하기 때문에 types 파일에 AuthSlice type을 넣었습니다.

// 1. 함수 매개변수로 리프래쉬 토큰과 이전 요청해서 받아온 응답값 가져오기
// 2. 가져온 응답의 에러메시지 확인후, refresh토큰을 헤더에 담아서 토큰 재발급 서버 요청
const updateAccessToken = async (
  refreshToken: string,
  response: MyPageErrorResType
) => {
  // 요청에대한 에러응답의 401메시지 확인
  if (response?.errorName === "TokenExpiredError") {
    try {
      const updatedTokenRes = await axios.get(`${BASE_URL}/users/refresh`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      // 여기서 updatedTokenRes값을 꺼내보세요!
    } catch (err) {
      // 여기선 리프래쉬 토큰의 유효기간 마져 끝났다고 판단하여야 해서 다시 로그인을 시도하게끔 로직을 작성하실수 있어요!
      console.error(err);
    }
  }
  // return newAccToken
};

const requestMyInfo: (
  id: number,
  accessToken: string
) => Promise<UserDetailInfoType> = async (id: number, accessToken: string) => {
  // 서버로 회원가입 요청 보내기
  try {
    const response = await axios.get<number, MyPageResponseType>(
      `${BASE_URL}/users/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (response.data.ok === 1) {
      return response.data.item;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (Error: any) {
    if (Error.response) {
      alert(Error.response.data.message);
      console.log("error");
    }
    console.error("Error:", Error);
  }
  return new UserDetailInfo();
};

const requestUpdateMyInfo = async (
  editedInfo: Partial<UserDetailInfoType>,
  id: number,
  accessToken: string
) => {
  try {
    const response = await axios.patch<number, MyPageEditResponseType>(
      `${BASE_URL}/users/${id}`,
      editedInfo,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (response.data.ok === 1) {
      return response.data.updated;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (Error: any) {
    if (Error.response) {
      alert(Error.response.data.message);
      console.log("error");
    }
    console.error("Error:", Error);
  }
  return new UserDetailInfo();
};

const requestMyProducts = async (
  accessToken: string
) => {
  try {
    const response = await axios.get<number, MyProductsResponseType>(
      `${BASE_URL}/seller/products`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (response.data.ok === 1) {
      return response.data.item;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (Error: any) {
    if (Error.response) {
      alert(Error.response.data.message);
      console.log("error");
    }
    console.error("Error:", Error);
  }
  return [] as ProductListType;
};


export const createMyPageSlice: StateCreator<MyPageSlice, []> = (set) => ({
  myInfo: new UserDetailInfo(),
  getMyInfo: async (id: number, accessToken: string) => {
    return await requestMyInfo(id, accessToken);
  },
  setMyInfo: async (newInfo: Partial<UserDetailInfoType>) => {
    set((state) => ({ myInfo: { ...state.myInfo, ...newInfo } }));
  },
  updateMyInfo: async (
    id: number,
    accessToken: string,
    editedInfo: Partial<UserDetailInfoType>
  ) => {
    return await requestUpdateMyInfo(editedInfo, id, accessToken);
  },
  getMyProducts: async (accessToken: string) => {
    return await requestMyProducts(accessToken);
  }
});
