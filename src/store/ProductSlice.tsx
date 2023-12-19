import { StateCreator } from "zustand";

const initialItem = {
  _id: -1,
  seller_id: -1,
  price: 0,
  shippingFees: 0,
  show: true,
  active: true,
  name: "",
  mainImages: [],
  content: "",
  createdAt: "",
  updatedAt: "",
  extra: {},
  replies: [],
};

// 상품 전체 조회하는 함수
// const requestGetProductList = () => {};

// // 특정상품 조회해주는 함수
// const requsetGetProductItem = () => {};
// // 상품 등록해주는 함수
// const requsetProductRegist = () => {};

// // 상품 삭제 함수
// const requsetProductDelete = () => {};

// 상품 등록, 삭제, 세팅(수정)
export const createProductSlice: StateCreator<ProductSlice> = () => ({
  productItem: initialItem,
  productList: [],
});
