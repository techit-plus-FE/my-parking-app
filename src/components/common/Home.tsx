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
  const [products, setProducts] = useState<ProductListType | []>([]); // 서버 요청 받는 상품들 데이터(초기, 검색후)
  const [searchValue, setSearchValue] = useState<string>(""); // 초기 검색어 상태
  const [searchInfo, setSearchInfo] = useState<InfoType>({
    keyword: "",
    centerLatLng: { // 애플트리타워로 초기 좌표설정
      lat: 37.5070100333146,
      lng: 127.055618149788,
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchMakeMap();
    }
  };

  // 위치검색을 통한 지도 영역생성 함수
  const handleSearchMakeMap = () => {
    if (!map || !searchValue) return;

    const ps = new kakao.maps.services.Places(map);
    ps.keywordSearch(`${searchValue}`, placeSearchCB);
    
    function placeSearchCB (result: any, status: any) {
      if(!map) return;
      if (status === kakao.maps.services.Status.OK) {
        // 남서,북동 기본값(애플트리타워)
        const bound = new kakao.maps.LatLngBounds(); // 지도 영역생성 -> 사각형
        
        const data = result[0]; // 가장 유사한 상위검색객체 저장

        bound.extend(new kakao.maps.LatLng(data.y, data.x));
        map.setBounds(bound);

        // (추가)검색한 키워드, 중심좌표, 영역을 담은 객체 상태를 변경해줍니다.
        setSearchInfo({
          keyword: searchValue,
          centerLatLng: {
            lat: data.y,
            lng: data.x,
          },
        });
      }
    }
  };

  const isMobile = MediaQueryMain();

  return (
    <Box
      className={classes.mapContainer}
      sx={{
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* 왼쪽 사이드바 */}
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
      {/* 가운데 지도  */}
      <div className={classes.mapWrapper}>
        <Box>
          <MainKakaoMap
            map={map}
            setMap={setMap}
            setProducts={setProducts}
            searchInfo={searchInfo}
          />
        </Box>
      </div>

      {/* 오른쪽사이드바 */}
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
