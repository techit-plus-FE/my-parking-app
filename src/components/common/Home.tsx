import { ChangeEvent, useState } from "react";
import ProductList from "../domain/product/list/ProductList";
import MainKakaoMap from "./map/MainKakaoMap";
import classes from "./Home.module.css";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchAddress, SetSearchAddress] = useState("");
  const [mainSearchAddressCenter, SetMainSearchAddressCenter] = useState();

  const SearchMap = () => {
    const ps = new kakao.maps.services.Places();

    const placesSearchCB = function (result: any, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        SetMainSearchAddressCenter({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };
    ps.keywordSearch(`${searchAddress}`, placesSearchCB);
    onReset();
  };

  const handleSearchAddress = (e: ChangeEvent<HTMLInputElement>) => {
    SetSearchAddress(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      SearchMap();
    }
  };

  const onReset = () => {
    SetSearchAddress(" ");
  };

  return (
    <div className={classes.container}>
      <div className={classes["map-box"]}>
        <MainKakaoMap mainSearchAddressCenter={mainSearchAddressCenter} />
        <div>
          <input
            type="text"
            onChange={handleSearchAddress}
            onKeyDown={onKeyPress}
            value={searchAddress}
          />
          <button onClick={SearchMap}>검색하기</button>
        </div>
      </div>

      <ProductList />
    </div>
  );
};

export default Home;
