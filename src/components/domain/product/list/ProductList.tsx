import { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";

// import { MOCKPRODUCTS } from "./MockProducts";

import classes from "./ProductList.module.css";

import { BASE_URL } from "../../../../services/BaseUrl";

const ProductList = () => {
  const [products, setProudcts] = useState<ProductResList>([]);

  useEffect(() => {
    console.log("상품목록조회 컴포넌트가 렌더링 됩니다.");

    const getFetch = async () => {
      const response = await axios.get<ProductRes>(`${BASE_URL}/products`);
      const responseData = response.data.item;

      console.log(responseData);
      setProudcts(responseData);
    };

    getFetch();
  }, []);

  return (
    <div className={classes.container}>
      <h2>주차장 리스트</h2>
      <ul className={classes["product-list"]}>
        {products?.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </ul>
    </div>
  );
};

export default ProductList;
