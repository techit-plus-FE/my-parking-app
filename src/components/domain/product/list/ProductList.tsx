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
    window.scrollTo(0, 0);
    const getFetch = async () => {
      try {
        const response = await axios.get<ProductListResType>(
          `${BASE_URL}/products`
        );
        const responseData = response.data.item;

        // console.log(responseData);
        setProudcts(responseData);
      } catch (error) {
        console.error("상품 목록을 가져오는데 에러가 발생했습니다.", error);
      }
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
