import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { BASE_URL } from "../../../../services/BaseUrl";

import MainImagesComponent from "./MainImagesComponent";
import SellerInfoComponent from "./SellerInfoComponent";
import DetailComponent from "./DetailComponent";
import PriceAndBtnComponent from "./PriceAndBtnComponent";

import classes from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { productId } = useParams();

  const [productData, setProductData] = useState<ProductItemType>({
    name: "",
    content: "",
    price: 0,
    mainImages: [""],
    createdAt: "",
    extra: {
      startDate: "",
      endDate: "",
      address: "",
      lat: "",
      lng: "",
    },
    replies: [],
  });

  const getProduct = async () => {
    const response = await axios.get<ProductItemResType>(
      `${BASE_URL}/products/${productId}`
    );
    console.log(response.data.item);
    const resItem = response.data.item;
    // 응답 아이템에서 실제 보여줄 데이터만 정제
    setProductData({
      name: resItem.name,
      content: resItem.content,
      createdAt: resItem.createdAt,
      mainImages: resItem.mainImages,
      price: resItem.price,
      extra: resItem.extra,
    });
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <div className={classes.container}>
      {/* 상품 이미지 컴포넌트 */}
      <MainImagesComponent product={productData} />
      {/* 판매자 정보 컴포넌트 */}
      <SellerInfoComponent />
      {/* 상품 상세 정보 컴포넌트 */}
      <DetailComponent product={productData} />
      {/* 구매 및 가격 컴포넌트 */}
      <PriceAndBtnComponent product={productData} />
    </div>
  );
};

export default ProductDetail;
