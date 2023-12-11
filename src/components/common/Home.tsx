/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChangeEvent, useState } from "react";

import classes from "./Home.module.css";

import ProductList from "../domain/product/list/ProductList";
import MainKakaoMap from "./map/MainKakaoMap";

import LOGOBLUE from "../../assets/images/logo-blue.png";
import Footer from "../layouts/Footer";

// 1. 왼쪽 사이드바에서 검색어를 입력하면 지도에 표시되게 하려면 사이드바 컴포넌트에 props로 검색어 상태변경함수를 내려주어야함
// 2. 검색된 위치에 해당하는 상품 데이터를 MainKakaoMap에 보여줘야하고, 해당하는 리스트를 불러오는건 오른족 사이드바 컴포넌트에서 진행해야함
// 3. 지도 레벨에따라 해당하는 범위의 게시글을 랜더링해주기(정보업데이트)

const Home = () => {
  // 검색창 인풋상태
  const [searchValue, SetSearchValue] = useState("");
  // 검색창에서 받은 위경도(MainKakaoMap에서 변경됨)
  const [mainSearchLocation, SetMainSearchLocation] = useState({
    lat: "",
    lng: "",
  });
  // 검색어 입력 여부 ->
  // const [isClicked, setIsClicked] = useState()

  // 위치검색을 통한 지도 생성함수
  const handleSearchMap = () => {
    const ps = new kakao.maps.services.Places();

    const placesSearchCB = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        SetMainSearchLocation({
          lat: newSearch.y,
          lng: newSearch.x,
        });
      }
    };
    ps.keywordSearch(`${searchValue}`, placesSearchCB);
    onReset();
  };

  const handleSearchAddress = (e: ChangeEvent<HTMLInputElement>) => {
    SetSearchValue(e.target.value);
  };
  const onReset = () => {
    SetSearchValue(" ");
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchMap();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftSideBar}>
        <div className={classes.logo}>
          <p>마이파킹</p>
          <img src={LOGOBLUE} alt="logo-img" />
        </div>

        {/* 검색창 */}
        <div className={classes.searchBar}>
          <input
            type="text"
            onChange={handleSearchAddress}
            onKeyDown={onKeyDown}
            value={searchValue || ""}
          />
          <button onClick={handleSearchMap}>검색하기</button>
        </div>
        {/* 날짜 검색창 */}
        <div>
          <input type="date" />
        </div>

        {/* 푸터 */}
        <Footer />
      </div>

      <div className={classes.main}>
        <MainKakaoMap mainSearchLocation={mainSearchLocation} />
      </div>

      <div className={classes.rightSideBar}></div>
      <ProductList />
    </div>
  );
};

export default Home;

// 검색한 주소의 위치를 받아서 1. 지도가 이동하고 2. 받은 위치와 서버에 담긴 상품들을 불러와소 해당 상품들 위치정보와 같은 범위의 상품들을 마커배열에 등록해서 렌더링해준다.
