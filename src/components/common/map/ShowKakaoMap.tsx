/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";

import classes from "./ShowKakaoMap.module.css";

type Props = {
  product?: ProductItemType | undefined;
};

// 등록된 지도의 위치를 마커로 표시해주는 지도 컴포넌트입니다.
const ShowKakaoMap = ({ product }: Props) => {
  const [_, setMap] = useState<kakao.maps.Map | undefined>();

  const productLocation = {
    address: product?.extra?.address,
    lat: Number(product?.extra?.lat),
    lng: Number(product?.extra?.lng),
  };

  return (
    <div className={classes.container}>
      <Map
        center={{
          lat: Number(productLocation.lat),
          lng: Number(productLocation.lng),
        }}
        style={{ width: "100%", height: "400px" }}
        minLevel={4}
        maxLevel={4}
        onCreate={(map) => setMap(map)}
      >
        <MapMarker
          position={{
            lat: Number(productLocation.lat),
            lng: Number(productLocation.lng),
          }}
        />
      </Map>
    </div>
  );
};

export default ShowKakaoMap;
