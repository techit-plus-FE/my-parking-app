/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import classes from "./KakaoMap.module.css";

// declare global {
//   interface Window {
//     kakao: any;
//     daum: any;
//   }
// }

type Props = {
  setLocation: (l: ProductLocationType) => void;
};

// lat: 위도(y좌표), lng: 경도(x좌표)
// 위치 등록시 사용할 카카오 맵 컴포넌트
// props로 받는 상태중에 location정보(adress,lat,lng)이 있으면 검색인풋창 안보이고 맵만 랜더링 되게해야함
const KakaoMap = ({ setLocation }: Props) => {
  // 지도의 초기 중심좌표위치(카카오본사)
  const [mapLocation, setMapLocation] = useState({
    lat: 33.450701,
    lng: 126.570667,
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
          setLocation({
            address: searchAddress,
            lat: newSearch.y,
            lng: newSearch.x,
          });
        }
      };
      // 위경도 좌표로 이동
      geoCoder.addressSearch(`${searchAddress}`, callback);
      // 마커 표시
      ps.keywordSearch(`${searchAddress}`, callback);
    }
  };

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
          position={{ lat: mapLocation.lat, lng: mapLocation.lng }}
        ></MapMarker>
      </Map>
    </div>
  );
};

export default KakaoMap;