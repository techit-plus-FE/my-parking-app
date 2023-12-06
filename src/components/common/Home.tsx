import { useState } from "react";
import ProductList from "../domain/product/list/ProductList";

import classes from "./Home.module.css";

// import { updateTokenStore } from "../../store/authSlice";

const Home = () => {
  // 임시 위치 상태 -> 여긴 setLocation이 필요없는 컴폰너트
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  return (
    <div className={classes.container}>
      <div className={classes["map-box"]}>
        {/* 검색해서 넘어가는 카카오 맵컴포넌트가 추가로 필요할까? */}
       
      </div>

      <ProductList />
    </div>
  );
};

export default Home;
