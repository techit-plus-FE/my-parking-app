// // zustand store 생성
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createAuthSlice } from "./authSlice";
import { createMyPageSlice } from "./MyPageSlice";
import { createProductSlice } from "./ProductSlice";
import { createPurchaseSlice } from "./PurchaseSlice";
import { createSearchSlice } from "./searchSlice";
import { themeSlice } from "./themeSlice";
import { createImageSlice } from "./imageSlice";
import { createCustomAxiosSlice } from "./customAxiosSlice";

export const useBoundStore = create<
    AuthSlice &
    MyPageSlice &
    PurchaseSlice &
    ProductSlice &
    SearchSlice &
    ThemeSlice &
    ImageSlice & 
    customAxiosSlice
>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createMyPageSlice(...a),
        ...createProductSlice(...a),
        ...createPurchaseSlice(...a),
        ...themeSlice(...a),
        ...createSearchSlice(...a),
        ...createImageSlice(...a),
        ...createCustomAxiosSlice(...a),
      }),
      {
        name: "boundStore",
        partialize: (state) => ({
          userToken: state.userToken,
          userBasicInfo: state.userBasicInfo,
          isLoggedIn: state.isLoggedIn,
          productDetailData: state.productDetailData,
          isDark: state.isDark,
          navSelectedValue: state.navSelectedValue,
        }),
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);


export const useAuth = () => useBoundStore((state)=>{
  return  {
  userToken: state.userToken,
  userBasicInfo : state.userBasicInfo,
  isLoggedIn: state.isLoggedIn,
  verifyEmail: state.verifyEmail,
  signUp: state.signUp,
  login: state.login,
  updateUserBasicInfo: state.updateUserBasicInfo,
  logout: state.logout,
}})


export const useMyPage = () => useBoundStore((state)=>{
  return {
    getMyInfo : state.getMyInfo,
    setMyInfo : state.setMyInfo,
    updateMyInfo : state.updateMyInfo,
    getMyProducts : state.getMyProducts,
}})


export const useTheme = () => useBoundStore((state)=>{
  return {
  isDark: state.isDark,
  setIsDark: state.setIsDark,
  isToastOpen: state.isToastOpen,
  alertText: state.alertText,
  bgColor: state.bgColor,
  navSelectedValue: state.navSelectedValue,
  setNavSelected: state.setNavSelected,
  setIsToastOpen: state.setIsToastOpen,
  setAlertText: state.setAlertText,
  setBgColor: state.setBgColor,
  }
})

