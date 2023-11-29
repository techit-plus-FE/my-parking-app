import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "../../../../services/BaseUrl";

import MainImagesComponent from "./MainImagesComponent";
import SellerInfoComponent from "./SellerInfoComponent";
import DetailComponent from "./DetailComponent";
import PriceAndBtnComponent from "./PriceAndBtnComponent";

const ProductDetail = () => {
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const _id = params.get("_id");

  const { _id } = useParams();
  console.log(_id);

  const getProduct = async () => {
    const response = await axios.get<ProductRes>(`${BASE_URL}/products/${_id}`);

    console.log(response);
  };

  useEffect(() => {
    getProduct();
  }, [_id]);

  return (
    <>
      {/* 상품 이미지 컴포넌트 */}
      <MainImagesComponent />
      {/* 판매자 정보 컴포넌트 */}
      <SellerInfoComponent />
      {/* 상품 상세 정보 컴포넌트 */}
      <DetailComponent />
      {/* 구매 및 가격 컴포넌트 */}
      <PriceAndBtnComponent />
    </>
  );
};

export default ProductDetail;
