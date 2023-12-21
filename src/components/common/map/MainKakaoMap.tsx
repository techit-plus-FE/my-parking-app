import { useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  ZoomControl,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

import CustomOverlayBox from "./CustomOverlayBox";
import { useBoundStore } from "../../../store";
import { BASE_URL } from "../../../services/BaseUrl";

import classes from "./MainKakaoMap.module.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import USER_MARKER from "../../../assets/images/user-marker2-image.png";
import PARKING_MARKER from "../../../assets/images/parking-marker-image.png";

// 홈페이지 메인 지도 서비스
type Props = {
  map: kakao.maps.Map | undefined;
  setMap: (m: kakao.maps.Map | undefined) => void;
  setProducts: (list: ProductListType) => void;
  searchInfo: MapInfoType;
  nowLocation: LocationType;
  handleFetchNowLocation: () => void;
};

// Home에서 내려준 props검색시 사용된 주소 받기

const MainKakaoMap = ({
  map,
  setMap,
  setProducts,
  searchInfo,
  nowLocation,
  handleFetchNowLocation,
}: Props) => {
  const searchItemsInThisBound = useBoundStore(
    (state) => state.searchItemsInThisBoundAndPeriod
  );

  const [mapExist, setMapExist] = useState<boolean>(false);
  const [markers, setMarkers] = useState<ProductListType | []>();
  const [level, setLevel] = useState<number | undefined>(4);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean | undefined>(
    false
  );
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [_, setIsBtnClick] = useState<boolean>(false);

  // 검색어에 해당하는 주차장 쿼리 요청 함수
  const searchProducts = async () => {
    if (!map) return;

    const bound = map.getBounds();
    const res = await searchItemsInThisBound(bound, searchInfo.period);

    setMarkers(res); // 마커변경출력
    setProducts(res); // 리스트변경출력
  };

  // 현위치 버튼 클릭시,
  const handleToggleLocation = () => {
    setIsBtnClick(true);
    handleFetchNowLocation();
  };

  useEffect(() => {
    // 해당하는 bounds영역에 맞는 범위의 상품리스트 요청
    searchProducts();
  }, [mapExist, searchInfo]);

  return (
    <div className={classes.container}>
      <Map
        center={{
          lat: 37.5070100333146,
          lng: 127.055618149788,
        }}
        style={{ height: "100vh" }}
        level={level}
        onCreate={(map) => {
          setMap(map); // 생성
          setMapExist(true);
        }}
        onZoomChanged={(map) => {
          searchProducts();
          setLevel(map.getLevel());
        }}
        onDragEnd={() => searchProducts()}
        maxLevel={6}
      >
      {searchInfo.place_name && <MapMarker
        position={{
          lat: Number(searchInfo.centerLatLng.lat),
          lng: Number(searchInfo.centerLatLng.lng),
        }}
      >
        <div
          style={{
            padding: "5px 0 10px 18px",
            color: "#000",
            textAlign: "center",
          }}
        >
          <p
            style={{ fontWeight: "700", color: "var(--color-primary-800)" }}
          >
          {searchInfo.place_name}
          </p>
        </div>
      </MapMarker>}
          
        {/* 1. 상품들 데이터리스트를 맵핑해서 해당 위치값을 마커로 보여주기 */}
        {markers &&
          markers?.map((el, idx) => (
            <>
              <MapMarker
                key={idx}
                position={{
                  lat: Number(el?.extra?.lat),
                  lng: Number(el?.extra?.lng),
                }}
                onClick={() => {
                  setIsOverlayOpen(true);
                  setSelectedMarker(idx);
                }}
                image={{
                  src: PARKING_MARKER,
                  size: { width: 60, height: 60 },
                }}
              />
              {isOverlayOpen && selectedMarker === idx && (
                <CustomOverlayMap
                  position={{
                    lat: Number(el?.extra?.lat),
                    lng: Number(el?.extra?.lng),
                  }}
                  clickable={true}
                >
                  <CustomOverlayBox
                    setIsOverlayOpen={setIsOverlayOpen}
                    setSelectedMarker={setSelectedMarker}
                    title={el?.name}
                    startDate={el.extra?.startDate}
                    endDate={el.extra?.endDate}
                    linkId={el?._id}
                    mainImage={BASE_URL + el.mainImages?.[0].url}
                  />
                </CustomOverlayMap>
              )}
            </>
          ))}

        {/* 현재 위치 마커 */}
        {!nowLocation.isLoading && (
          <MapMarker
            position={{
              lat: Number(nowLocation.centerLatLng.lat),
              lng: Number(nowLocation.centerLatLng.lng),
            }}
            image={{
              src: USER_MARKER,
              size: { width: 60, height: 60 },
            }}
          ></MapMarker>
        )}
        <ZoomControl />
      </Map>

      <div className={classes["map-control"]}>
        <MyLocationIcon
          sx={{
            cursor: "pointer",
            backgroundColor: "var(--color-sub-500)",
            color: "var(--color-white)",
            padding: "6px",
            fontSize: "40px",
            boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
          className={classes["location-btn"]}
          onClick={handleToggleLocation}
        />
      </div>
    </div>
  );
};

export default MainKakaoMap;
