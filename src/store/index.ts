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

export const useBoundStore = create<
  AuthSlice &
    MyPageSlice &
    PurchaseSlice &
    ProductSlice &
    SearchSlice &
    ThemeSlice
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
      }),
      {
        name: "boundStore",
        partialize: (state) => ({
          userToken: state.userToken,
          userBasicInfo: state.userBasicInfo,
          isLoggedIn: state.isLoggedIn,
          productDetailData: state.productDetailData,
          isDark: state.isDark,
        }),
      }
    )
  )
);
