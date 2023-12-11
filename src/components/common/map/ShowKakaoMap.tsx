/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  ZoomControl,
} from "react-kakao-maps-sdk";

import classes from "./ShowKakaoMap.module.css";

type Props = {
  product?: ProductItemType | undefined;
};

// 등록된 지도의 위치를 마커로 표시해주는 지도 컴포넌트입니다.
const ShowKakaoMap = ({ product }: Props) => {
  const [map, setMap] = useState<kakao.maps.Map | undefined>();
  const [level, setLevel] = useState<number | undefined>();

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
        level={level}
        onCreate={(map) => setMap(map)}
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        <MapMarker
          position={{
            lat: Number(productLocation.lat),
            lng: Number(productLocation.lng),
          }}
        />
        <ZoomControl />
      </Map>
    </div>
  );
};

export default ShowKakaoMap;
