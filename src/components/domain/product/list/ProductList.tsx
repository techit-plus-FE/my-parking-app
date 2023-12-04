import { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";

// import { MOCKPRODUCTS } from "./MockProducts";

import classes from "./ProductList.module.css";

import { BASE_URL } from "../../../../services/BaseUrl";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigage = useNavigate();
  const [products, setProudcts] = useState<ProductListType>([]);

  useEffect(() => {
    // console.log("상품목록조회 컴포넌트가 렌더링 됩니다.");

    const getFetch = async () => {
      const response = await axios.get<ProductListResType>(
        `${BASE_URL}/products`
      );
      const responseData = response.data.item;

      // console.log(responseData);
      setProudcts(responseData);
    };

    getFetch();
  }, []);

  return (
    <div className={classes.container}>
      <h2>주차장 리스트</h2>
      <button type="button" onClick={() => navigage("/products/regist")}>
        내 주차장 등록하기
      </button>
      <ul className={classes["product-list"]}>
        {products?.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </ul>
    </div>
  );
};

export default ProductList;
