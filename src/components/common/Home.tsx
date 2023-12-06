import { useState } from "react";
import ProductList from "../domain/product/list/ProductList";

import classes from "./Home.module.css";
import KakaoMap from "./map/KakaoMap";
import { updateTokenStore } from "../../store/authSlice";

const Home = () => {
  // 임시 위치 상태 -> 여긴 setLocation이 필요없는 컴폰너트
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useState({
    address: "",
    lat: "",
    lng: "",
  });
  const test = updateTokenStore((state) => state.isLoggedIn);
  console.log(test);

  return (
    <div className={classes.container}>
      <div className={classes["map-box"]}>
        {/* 검색해서 넘어가는 카카오 맵컴포넌트가 추가로 필요할까? */}
        <KakaoMap setLocation={setLocation} />
      </div>

      <ProductList />
    </div>
  );
};

export default Home;
