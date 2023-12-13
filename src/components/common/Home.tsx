/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChangeEvent, useState } from "react";

import classes from "./Home.module.css";

import ProductList from "../domain/product/list/ProductList";
import MainKakaoMap from "./map/MainKakaoMap";

import Footer from "../layouts/Footer";
import { Box } from "@mui/system";
import SlideBar from "../layouts/SlideBar";
import SearchInput from "../layouts/SearchInput";
import SearchHeader from "../layouts/SearchHeader";
import MediaQuery from "../UI/MediaQuery";
import MediaQueryMain from "../UI/MediaQueryMain";

const Home = () => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [products, setProducts] = useState<ProductListType | undefined>(); // 서버 요청 받는 상품들 데이터(초기, 검색후)
  const [searchValue, setSearchValue] = useState("");

  // 위치검색을 통한 지도 영역생성 함수
  const handleSearchMakeMap = () => {
    if (!map) return;

    const ps = new kakao.maps.services.Places(map);
    const bounds = new kakao.maps.LatLngBounds(); // 지도 영역생성

    ps.keywordSearch(`${searchValue}`, function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const data = result; // 가장 유사한 상위검색객체 저장
        for (let i = 0; i < 3; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x)); // 받아온 검색한 결과값의 x,y좌표로 영역 재설정
        }
        map.setBounds(bounds);
      }
    });

    return map.getBounds();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchMakeMap();
    }
  };

  const isMobile = MediaQueryMain();

  console.log(isMobile);
  return (
    <Box
      className={classes.mapContainer}
      sx={{
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {isMobile ? (
        <SearchHeader />
      ) : (
        <SlideBar>
          <SearchInput
            onChange={handleChange}
            onKeyDown={onKeyDown}
            value={searchValue || ""}
          />
        </SlideBar>
      )}
      <div className={classes.mapWrapper}>
        <Box>
          <MainKakaoMap
            map={map}
            setMap={setMap}
            setProducts={setProducts}
            handleSearchMakeMap={handleSearchMakeMap}
          />
        </Box>
      </div>
      <Box>
        <ProductList products={products} isMobile={isMobile} />
      </Box>
      {isMobile ? (
        <Footer />
      ) : (
        <Footer position="absolute" width="var(--slide-width)" />
      )}
    </Box>
  );
};

export default Home;

// 검색한 주소의 위치를 받아서 1. 지도가 이동하고 2. 받은 위치와 서버에 담긴 상품들을 불러와소 해당 상품들 위치정보와 같은 범위의 상품들을 마커배열에 등록해서 렌더링해준다.

// 1. 왼쪽 사이드바에서 검색어를 입력하면 지도에 표시되게 하려면 사이드바 컴포넌트에 props로 검색어 상태변경함수를 내려주어야함
// 2. 검색된 위치에 해당하는 상품 데이터를 MainKakaoMap에 보여줘야하고, 해당하는 리스트를 불러오는건 오른족 사이드바 컴포넌트에서 진행해야함
// 3. 지도 레벨에따라 해당하는 범위의 게시글을 랜더링해주기(정보업데이트)
