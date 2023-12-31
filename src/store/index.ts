// import { updateTokenStore } from './authSlice';
// // zustand store 생성
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createAuthSlice } from "./authSlice";
import { createMyPageSlice } from "./MyPageSlice";
import { createProductSlice } from "./ProductSlice";
import { createPurchaseSlice } from "./PurchaseSlice";
import { createSearchSlice } from "./searchSlice";
import { themeSlice } from "./themeSlice";
import { createImageSlice } from "./imageSlice";

export const useBoundStore = create<
  AuthSlice &
    MyPageSlice &
    PurchaseSlice &
    ProductSlice &
    SearchSlice &
    ThemeSlice &
    ImageSlice
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
      }
    )
  )
);
