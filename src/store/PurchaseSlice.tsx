import { StateCreator } from "zustand";

export const createPurchaseSlice: StateCreator<PurchaseSlice, []> = (set) => ({
  productDetailData: {} as ProductItemType,
  setProductDetailData: (data: ProductItemType) =>
    set({ productDetailData: data }),
});
