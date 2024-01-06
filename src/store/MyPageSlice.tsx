import { StateCreator } from "zustand";
import { BASE_URL } from "../services/BaseUrl";
import axios, { AxiosError, AxiosInstance } from "axios";
import { UserDetailInfo } from "../types/classImplementations";

const requestMyInfo: (
  id: number,
  accessToken: string,
  axiosInstance: AxiosInstance
) => Promise<UserDetailInfoType> = async (id: number, accessToken: string, axiosInstance) => {
  // 서버로 회원가입 요청 보내기
  try {
    const response = await axiosInstance.get<number, MyPageResponseType>(
    // const response = await axios.get<number, MyPageResponseType>(
      `${BASE_URL}/users/${id}`,
    );
    if (response.data.ok === 1) {
      return response.data.item;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response){
      alert(error.response.data.message);
      console.log("error");
    }
    console.error("Error:", Error);
  }
  return new UserDetailInfo();
};

const requestUpdateMyInfo = async (
  editedInfo: Partial<UserDetailInfoType>,
  id: number,
  accessToken: string,
  axiosInstance: AxiosInstance,
) => {
  try {
    const response = await axiosInstance.patch<number, MyPageEditResponseType>(
      `${BASE_URL}/users/${id}`,
      editedInfo,
      // {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // }
    );
    if (response.data.ok === 1) {
      return response.data.updated;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      console.log("error", error.response);
    }
    console.error("Error:", error);
  }
  return new UserDetailInfo();
};

const requestMyProducts = async (
  accessToken: string,
  axiosInstance: AxiosInstance,
  ) => {
  try {
    const response = await axiosInstance.get<number, MyProductsResponseType>(
      `${BASE_URL}/seller/products`,
      // {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // }
    );
    if (response.data.ok === 1) {
      return response.data.item;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      alert(error.response.data.message);
      console.log("error");
    }
    console.error("error:", Error);
  }
  return [] as ProductListType;
};

export const createMyPageSlice: StateCreator<
MyPageSlice & customAxiosSlice,
[],
[],
MyPageSlice
> = (set, get) => ({
  myInfo: new UserDetailInfo(),
  getMyInfo: async (id: number, accessToken: string) => {
    return await requestMyInfo(id, accessToken, get().useCustomAxios());
  },
  setMyInfo: async (newInfo: Partial<UserDetailInfoType>) => {
    set((state) => ({ myInfo: { ...state.myInfo, ...newInfo } }));
  },
  updateMyInfo: async (
    id: number,
    accessToken: string,
    editedInfo: Partial<UserDetailInfoType>
  ) => {
    return await requestUpdateMyInfo(editedInfo, id, accessToken, get().useCustomAxios());
  },
  getMyProducts: async (accessToken: string) => {
    return await requestMyProducts(accessToken, get().useCustomAxios());
  },
});
