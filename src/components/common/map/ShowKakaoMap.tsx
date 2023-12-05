/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import classes from "./ShowKakaoMap.module.css";

type Props = {
  product: ProductItemType;
};

// 등록된 지도의 위치를 마커로 표시해주는 지도 컴포넌트입니다.
const ShowKakaoMap = ({ product }: Props) => {
  const productLocation = {
    address: product.extra?.address,
    lat: product.extra?.lat,
    lng: product.extra?.lng,
  };
  const [map, setMap] = useState<kakao.maps.Map | undefined>();

  useEffect(() => {
    // console.log('4, 지도의 정보를 다시 받아옴')
    handleMapInfo();
  }, [map, location]);

  const handleMapInfo = () => {};

  return (
    <div className={classes.container}>
      <Map
        center={{
          lat: Number(productLocation.lat),
          lng: Number(productLocation.lng),
        }}
        style={{ width: "100%", height: "400px" }}
        level={4}
        onCreate={(map) => setMap(map)}
      >
        {/* 추후 상품들 데이터리스트를 맵핑해서 해당 위치값을 마커로 보여주게 해야함 */}
        <MapMarker
          position={{
            lat: Number(productLocation.lat),
            lng: Number(productLocation.lng),
          }}
        ></MapMarker>
      </Map>
    </div>
  );
};

export default ShowKakaoMap;
