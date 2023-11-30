/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState, useRef } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import classes from "./KakaoMap.module.css";

declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}

type Props = {
  setLocation: (l: ProductLocationType) => void;
};

// lat: 위도(y좌표), lng: 경도(x좌표)
const KakaoMap = ({ setLocation }: Props) => {
  const mapRef = useRef(); // 표시한 지도 객체가 담길 요소
  const [mapState, setMapState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    isPanto: true, // 위치 변경시 부드럽게 이동하는 동작 설정여부
  });
  const [searchAddress, setSearchAddress] = useState<string>(""); // 검색한 텍스트
  const [latAndLng, setLatAndLng] = useState({
    lat: "",
    lng: "",
  }); // 검색한 주소 좌표

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  useEffect(() => {
    const map = mapRef.current;
    // 장소 겁색 객체 생성
    const places = new kakao.maps.services.Places(map);

    // 키워드 검색이 끝나고 호출될 콜백 함수
    const placesSearchCB = (data: string, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
        }
      }
    };

    // 키워드로 장소 검색
    places.keywordSearch("치킨", placesSearchCB, {
      useMapBounds: true,
    });

    // 지도에 마커를 표시해주는 함수
    const displayMarker = (place) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    };
  }, []);

  // 입력된 주소로 검색시 원하는 주소로 이동
  const handleSearchAddress = () => {
    const geoCoder = new kakao.maps.services.Geocoder();

    if (searchAddress.trim() !== "") {
      // 해당 주소값으로 좌표를 반환할 콜백함수
      const callback = (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const newSearch = result[0];
          // 지도에 표시할 상태 변경
          setMapState({
            ...mapState,
            center: { lat: newSearch.y, lng: newSearch.x },
          });
          // 좌표값 상태 업데이트
          setLatAndLng({
            lat: newSearch.y,
            lng: newSearch.x,
          });
        }
      };

      // 위경도 좌표로 검색메소드 사용(올바른 주소 검색으로 밸리데이션 필요함)
      geoCoder.addressSearch(`${searchAddress}`, callback);
    }

    // 부모에서 전달받은 props 상태 변경해주기
    setLocation({
      address: searchAddress,
      lat: latAndLng.lat,
      lng: latAndLng.lng,
    });
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
        <button type="button" onClick={handleSearchAddress}>
          검색
        </button>
      </div>
      {/* 지도 */}
      <Map
        ref={mapRef}
        center={mapState.center}
        isPanto={mapState.isPanto}
        style={{ width: "100%", height: "400px" }}
        level={3}
      >
        <MapMarker position={{ lat: 33.450701, lng: 126.570667 }}>
          <div style={{ color: "var(--color-primary-700)" }}>
            여기는 카카오 본사
          </div>
        </MapMarker>
      </Map>

      <div style={{ marginTop: "30px" }}>
        {/* 검색한 주소의 위경도 표시 */}
        {latAndLng.lat} {latAndLng.lng}
      </div>
    </div>
  );
};

export default KakaoMap;
