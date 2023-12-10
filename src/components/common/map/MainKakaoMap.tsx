import { useEffect, useState } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import useCustomAxios from "../../../services/useCustomAxios";

// 홈페이지 메인 지도 서비스

interface LocationType {
  lat: number;
  lng: number;
}

interface InfoType {
  center: {
    lat: number;
    lng: number;
  };
  level: number;
  typeId: number;
  swLatLng: {
    lat: number;
    lng: number;
  };
  neLatLng: {
    lat: number;
    lng: number;
  };
}

// Home에서 내려준 props검색시 사용된 주소 받기
const MainKakaoMap = () => {
  const axiosInstance = useCustomAxios();

  const [products, setProducts] = useState<ProductListType | undefined>(); // 서버 요청 받는 상품들 데이터
  const [map, setMap] = useState<kakao.maps.Map | undefined>();
  const [location, setLocation] = useState<LocationType | undefined>({
    lat: 37.49676871972202,
    lng: 127.02474726969814,
  });
  const [info, setInfo] = useState<InfoType | undefined>(); // 마커 표시할 상품 데이터
  const [level, setLevel] = useState<number | undefined>(); // 지도 레벨
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false); // 오버레이 창 여부

  const handleMapInfo = () => {
    {
      map &&
        setInfo({
          center: {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          },
          level: map.getLevel(),
          typeId: map.getMapTypeId(),
          swLatLng: {
            lat: map.getBounds().getSouthWest().getLat(),
            lng: map.getBounds().getSouthWest().getLng(),
          },
          neLatLng: {
            lat: map.getBounds().getNorthEast().getLat(),
            lng: map.getBounds().getNorthEast().getLng(),
          },
        });
    }
  };

  // 1. 해당하는 범위내 주차장데이터 불러오기
  useEffect(() => {
    // 모든 상품 데이터를 불러와야합니다.
    const getProducts = async () => {
      try {
        const response = await axiosInstance.get<ProductListResType>(
          `/products`
        );
        const responseData = response.data.item;

        console.log(responseData);
        const listData = responseData;
        setProducts(listData);
      } catch (err) {
        console.error("데이터를 불러오는데 문제가 생겼습니다.", err);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    // console.log('4, 지도의 정보를 다시 받아옴')
    handleMapInfo();
  }, [map, location]);

  return (
    <>
      <Map
        center={{
          lat: Number(location?.lat),
          lng: Number(location?.lng),
        }}
        style={{ width: "100%", height: "500px" }}
        level={4}
        onCreate={(map) => setMap(map)}
        onIdle={handleMapInfo}
      >
        {/* 추후 상품들 데이터리스트를 맵핑해서 해당 위치값을 마커로 보여주게 해야함 */}
        {products &&
          products?.map((el, idx) => (
            <MapMarker
              key={idx}
              position={{
                lat: Number(el?.extra?.lat),
                lng: Number(el?.extra?.lng),
              }}
            ></MapMarker>
          ))}
        <ZoomControl />
      </Map>
    </>
  );
};

export default MainKakaoMap;
