import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { BASE_URL } from "../../../../services/BaseUrl";

import MainImagesComponent from "./MainImagesComponent";
import SellerInfoComponent from "./SellerInfoComponent";
import DetailComponent from "./DetailComponent";
import PriceAndBtnComponent from "./PriceAndBtnComponent";

import classes from "./ProductDetail.module.css";
import { upDateUserBasicDataStore } from "../../../../store/authSlice";
import Loading from "../../../common/Loading";

const ProductDetail = () => {
  const { productId } = useParams();
  const userInfo = upDateUserBasicDataStore((state) => state.userBasicInfo);

  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<ProductItemType>({
    name: "",
    content: "",
    price: 0,
    mainImages: [],
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
    try {
      const response = await axios.get<ProductItemResType>(
        `${BASE_URL}/products/${productId}`
      );
      const resItem = response.data.item;
      setProductData({
        name: resItem.name,
        content: resItem.content,
        createdAt: resItem.createdAt,
        mainImages: resItem.mainImages,
        price: resItem.price,
        extra: resItem.extra,
        replies: resItem.replies,
      });

      setLoading(false);
    } catch (err) {
      console.error("해당 게시글을 불러오는데 실패하였습니다", err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  if (loading) return <Loading />;

  return (
    <div className={classes.container}>
      {/* 상품 이미지 컴포넌트 */}
      <MainImagesComponent product={productData} />
      {/* 판매자 정보 컴포넌트 */}
      <SellerInfoComponent user={userInfo} />
      {/* 상품 상세 정보 컴포넌트 */}
      <DetailComponent product={productData} />
      {/* 구매 및 가격 컴포넌트 */}
      <PriceAndBtnComponent product={productData} />
    </div>
  );
};

export default ProductDetail;
