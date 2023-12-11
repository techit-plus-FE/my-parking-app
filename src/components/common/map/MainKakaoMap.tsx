import { useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  ZoomControl,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

import useCustomAxios from "../../../services/useCustomAxios";

import CustomOverlayBox from "./CustomOverlayBox";

// 홈페이지 메인 지도 서비스
type Props = {
  mainSearchLocation: {
    lat: string;
    lng: string;
  };
};

// Home에서 내려준 props검색시 사용된 주소 받기
const MainKakaoMap = ({ mainSearchLocation }: Props) => {
  const axiosInstance = useCustomAxios();

  const [products, setProducts] = useState<ProductListType | undefined>(); // 서버 요청 받는 상품들 데이터

  const [map, setMap] = useState<kakao.maps.Map | undefined>();
  // 보여줄 위치상태
  const [location, setLocation] = useState({
    center: {
      lat: 37.49676871972202,
      lng: 127.02474726969814,
    },
    error: null,
    isLoading: true,
  });
  // 지도 정보
  const [info, setInfo] = useState<InfoType | undefined>();
  // 지도 레벨
  const [level, setLevel] = useState<number | undefined>();
  // 오버레이
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean | undefined>(
    false
  );
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  // 1. 해당하는 범위내 주차장데이터 불러오기
  useEffect(() => {
    getProducts();
  }, []);

  // 2. 주소검색시 위치로 이동
  useEffect(() => {
    moveMainSearch();
  }, [mainSearchLocation]);

  // 3. 실시간 현재위치에따른 지도 이동
  useEffect(() => {
    moveFirstLocation();
  }, []);

  // 4. 지도의 정보를 다시 받아오기
  useEffect(() => {
    handleMapInfo();
  }, [map, location]);

  // 지도의 레벨에 맞춰 목록 출력
  useEffect(() => {
    // 5. 지도의 레벨에 맞춰서 글의 목록을 보여주는 요청
    if (info && info.level <= 5) {
      getProducts();
    } else if (info && info.level >= 6) {
      getProducts();
    }
  }, [info]);

  // 모든 상품 데이터를 불러와야합니다.
  const getProducts = async () => {
    try {
      const response = await axiosInstance.get<ProductListResType>(`/products`);
      const responseData = response.data.item;

      // console.log(responseData);
      const listData = responseData;
      setProducts(listData);
    } catch (err) {
      console.error("데이터를 불러오는데 문제가 생겼습니다.", err);
    }
  };

  // 첫 랜더링시 현재 접속 위치로 이동
  const moveFirstLocation = () => {
    if (navigator.geolocation) {
      // geo서비스를 사용해서 접속 위치 추출
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // geo서비스를 사용못할때 마커표시와 인포윈도우 내용 설정
      setLocation((prev) => ({
        ...prev,
        errMsg: "실시간 위치정보를 불러오는데 문제가 생겼습니다.",
        isLoading: false,
      }));
    }
  };

  // 주소 검색시 위치로 이동
  const moveMainSearch = () => {
    {
      mainSearchLocation &&
        setLocation((prev) => ({
          ...prev,
          center: {
            lat: Number(mainSearchLocation.lat),
            lng: Number(mainSearchLocation.lng),
          },
        }));
    }
  };

  // 주소 반경 정보 받아오기
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

  return (
    <>
      <Map
        center={{
          lat: Number(location?.center.lat),
          lng: Number(location?.center.lng),
        }}
        style={{ width: "100%", height: "100vh" }}
        level={level}
        onCreate={(map) => setMap(map)}
        onZoomChanged={(map) => setLevel(map.getLevel())}
        onIdle={handleMapInfo}
      >
        {/* 1. 상품들 데이터리스트를 맵핑해서 해당 위치값을 마커로 보여주기 */}
        {products &&
          products?.map((el, idx) => (
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
              />
              {isOverlayOpen && selectedMarker === idx && (
                <CustomOverlayMap
                  position={{
                    lat: Number(el?.extra?.lat),
                    lng: Number(el?.extra?.lng),
                  }}
                >
                  <CustomOverlayBox
                    setIsOverlayOpen={setIsOverlayOpen}
                    setSelectedMarker={setSelectedMarker}
                    title={el?.name}
                    startDate={el.extra?.startDate}
                    endDate={el.extra?.endDate}
                    linkId={el?._id}
                    mainImage={el.mainImages && el.mainImages[0]}
                  />
                </CustomOverlayMap>
              )}
            </>
          ))}

        {/* 2. 현재 접속한 위치의 마커 표시 */}
        {!location.isLoading && (
          <MapMarker
            position={location.center}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: { width: 38, height: 55 },
            }}
            title="내 위치"
          ></MapMarker>
        )}

        <ZoomControl />
      </Map>
    </>
  );
};

export default MainKakaoMap;
