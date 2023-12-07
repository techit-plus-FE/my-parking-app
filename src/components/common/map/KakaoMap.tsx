/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import classes from "./KakaoMap.module.css";

type Props = {
  product: ProductItemType; // 이미 기존에 등록된 상품
  formData: ProductItemType; // 부모에서 업데이트 하는 상품
  setFormData?: (d: ProductItemType) => void;
};

// 위치 등록시 사용할 카카오 맵 컴포넌트
const KakaoMap = ({ product, formData, setFormData }: Props) => {
  // 지도의 초기 중심좌표위치(카카오본사)
  const [mapLocation, setMapLocation] = useState({
    lat: Number(product.extra?.lat) || 33.450701,
    lng: Number(product.extra?.lng) || 126.570667,
  });
  // 검색한 텍스트
  const [searchAddress, setSearchAddress] = useState<string>("");

  // 1. 주소 검색시 위치 이동 렌더링
  useEffect(() => {}, []);

  // 입력된 주소로 지도 업데이팅 함수
  const handleSearchMapUpdate = () => {
    //주소-좌표간 변환 서비스 객체를 생성
    const geoCoder = new kakao.maps.services.Geocoder();
    //장소 검색 서비스 객체
    const ps = new kakao.maps.services.Places();

    if (searchAddress.trim() !== "") {
      // 해당 주소값으로 좌표를 반환할 콜백함수
      const callback = (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const newSearch = result[0];
          // 지도에 표시할 상태 변경
          setMapLocation({
            lat: newSearch.y,
            lng: newSearch.x,
          });
          // 부모에서 전달받은 props 상태 변경해주기
          if (setFormData) {
            setFormData({
              ...formData,
              extra: {
                ...formData.extra,
                address: searchAddress,
                lat: newSearch.y,
                lng: newSearch.x,
              },
            });
          }
        }
      };
      // 위경도 좌표로 이동
      geoCoder.addressSearch(`${searchAddress}`, callback);
      // 마커 표시
      ps.keywordSearch(`${searchAddress}`, callback);
    }
  };
  // console.log(searchAddress); // 애플트리타워
  // console.log(mapLocation.lat); // 37.5070100333146
  // console.log(mapLocation.lng); // 127.055618149788

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes["input-box"]}>
        <input
          type="text"
          value={searchAddress}
          onChange={handleChange}
          placeholder="등록할 주차장 주소를 입력하세요."
        />
        <button type="button" onClick={handleSearchMapUpdate}>
          검색
        </button>
      </div>
      {/* 지도 */}
      <Map
        center={{ lat: mapLocation.lat, lng: mapLocation.lng }}
        style={{ width: "100%", height: "400px" }}
        level={4}
      >
        {/* 추후 상품들 데이터리스트를 맵핑해서 해당 위치값을 마커로 보여주게 해야함 */}
        <MapMarker
          position={{
            lat: mapLocation.lat,
            lng: mapLocation.lng,
          }}
        ></MapMarker>
      </Map>
    </div>
  );
};

export default KakaoMap;
