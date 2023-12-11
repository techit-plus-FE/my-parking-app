import { StateCreator } from "zustand";

export const createPurchaseSlice: StateCreator<PurchaseSlice, []> = (set) => ({
  productDetailData: {} as ProductItemType,

  setProductDetailData: (data: ProductItemType) =>
    // ProductDetail.tsx 에서 업데이트 됨
    set({ productDetailData: data }),
});
