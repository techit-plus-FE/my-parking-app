import { useState, useEffect } from "react";
// import axios from "axios";
import ProductItem from "./ProductItem";

import classes from "./ProductList.module.css";

import { useNavigate } from "react-router-dom";
import useCustomAxios from "../../../../services/useCustomAxios";
import { useBoundStore } from "../../../../store";
import { Box } from "@mui/system";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProudcts] = useState<ProductListType>([]);
  const axiosInstance = useCustomAxios();

  const user = useBoundStore((state) => state.userBasicInfo);

  const handleGetProducts = async () => {
    try {
      const response = await axiosInstance.get<ProductListResType>(`/products`);
      const responseData = response.data.item;

      // console.log(responseData);
      setProudcts(responseData);
    } catch (error) {
      console.error("상품 목록을 가져오는데 에러가 발생했습니다.", error);
    }
  };
  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleCheckUser = () => {
    if (user.type === "seller") {
      navigate("/products/regist");
    } else {
      alert("판매자로 가입한 회원만 등록이 가능합니다.");
      if (confirm("판매자로 회원가입을 하시겠습니까?")) {
        navigate("/signup");
      }
    }
  };

  return (
    <div className={classes.container}>
      <Box sx={{ fontSize: "2rem" }}>주차장 리스트</Box>
      <button type="button" onClick={handleCheckUser}>
        내 주차장 등록하기
      </button>
      <ul className={classes["product-list"]}>
        {products.length > 0 ? (
          products.map((product) => {
            return <ProductItem key={product._id} product={product} />;
          })
        ) : (
          <p>등록된 상품이 암것도 없어요ㅠㅠ</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
