// import { useEffect } from "react";
// import axios from "axios";
import ProductItem from "./ProductItem";

import classes from "./ProductList.module.css";

import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../../../store";

type Props = {
  products: ProductListType | undefined;
};
const ProductList = ({ products }: Props) => {
  const navigate = useNavigate();

  const user = useBoundStore((state) => state.userBasicInfo);

  // useEffect(() => {
  //   handleGetProducts();
  // }, []);

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
      <h2>주차장 리스트</h2>
      <button type="button" onClick={handleCheckUser}>
        내 주차장 등록하기
      </button>
      <ul className={classes["product-list"]}>
        {products && products.length > 0 ? (
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
