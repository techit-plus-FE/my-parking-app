import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { BASE_URL } from "../../../../services/BaseUrl";

import MainImagesComponent from "./MainImagesComponent";
import SellerInfoComponent from "./SellerInfoComponent";
import DetailComponent from "./DetailComponent";
import PriceAndBtnComponent from "./PriceAndBtnComponent";

import classes from "./ProductDetail.module.css";
import { useBoundStore } from "../../../../store";
import Loading from "../../../common/Loading";
import useCustomAxios from "../../../../services/useCustomAxios";

const ProductDetail = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const axiosInstance = useCustomAxios();

  const user = useBoundStore((state) => state.userBasicInfo);

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

  const handleGetProduct = async () => {
    try {
      const response = await axiosInstance<ProductItemResType>(
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

  const handleRemoveProduct = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.delete(
        `${BASE_URL}/seller/products/${id}`
      );
      if (response.status === 1) {
        alert("해당 상품이 정상적으로 삭제되었습니다.");
        navigate(-1);
      }
    } catch (err) {
      console.error("해당 상품글 삭제중 문제가 발생하였습니다.", err);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [productId]);

  if (loading) return <Loading />;
  return (
    <div className={classes.container}>
      {/* 상품 이미지 컴포넌트 */}
      <MainImagesComponent product={productData} />
      {/* 판매자 정보 컴포넌트 */}
      <SellerInfoComponent user={user} />
      {/*추후 헤더에 들어갈 삭제 수정하는 엑션 버튼들 컴포넌트로 만들예정*/}
      <div className={classes["util-action"]}>
        <button type="button" onClick={() => handleRemoveProduct(productId)}>
          삭제하기
        </button>
        <button type="button" onClick={() => navigate(`edit`)}>
          수정하기
        </button>
      </div>

      {/* 상품 상세 정보 컴포넌트 */}
      <DetailComponent product={productData} />
      {/* 구매 및 가격 컴포넌트 */}
      <PriceAndBtnComponent product={productData} />
    </div>
  );
};

export default ProductDetail;
