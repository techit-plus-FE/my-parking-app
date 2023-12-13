import { useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  ZoomControl,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

import CustomOverlayBox from "./CustomOverlayBox";
import { useBoundStore } from "../../../store";

// 홈페이지 메인 지도 서비스
type Props = {
  map: kakao.maps.Map | undefined;
  setMap: (m: kakao.maps.Map | undefined) => void;
  searchInfo: InfoType;
  setProducts: (list: ProductListType) => void;
};

// Home에서 내려준 props검색시 사용된 주소 받기

const MainKakaoMap = ({ map, setMap, searchInfo, setProducts }: Props) => {
  const searchItemsInThisBound = useBoundStore(
    (state) => state.searchItemsInThisBound
  );
  const [mapExist, setMapExist] = useState<boolean>(false);
  // const [location, setLocation] = useState({
  //   center: {
  //     lat: 37.5069632,
  //     lng: 127.0556291,
  //   },
  //   error: null,
  //   isLoading: true,
  // }); // 보여줄 위치상태
  const [markers, setMarkers] = useState<ProductListType | []>();
  const [level, setLevel] = useState<number | undefined>(4);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean | undefined>(
    false
  );
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const requsetSearchProduct = async () => {
    if (map && mapExist) {
      const bound = map.getBounds()      
      const res = await searchItemsInThisBound(bound);

      setMarkers(res); // 마커변경출력
      setProducts(res); // 리스트변경출력
    }
  };

  useEffect(() => {
      // 해당하는 bounds영역에 맞는 범위의 상품리스트 요청
      requsetSearchProduct();
  }, [map, mapExist, searchInfo]);

  

  return (
    <>
      <Map
        center={{
          lat: searchInfo.centerLatLng.lat,
          lng: searchInfo.centerLatLng.lng,
        }}
        style={{ width: "100%", height: "100vh" }}
        level={level}
        onCreate={(map) => {
          setMap(map); // 생성
          setMapExist(true);
        }}
        onZoomChanged={(map) => setLevel(map.getLevel())}
        onDragEnd={() => requsetSearchProduct()}
      >
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


        {/* {!location.isLoading && (
          <MapMarker
            position={location.center}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: { width: 38, height: 55 },
            }}
            title="내 위치"
          ></MapMarker>
        )} */}

        <ZoomControl />
      </Map>
    </>
  );
};

export default MainKakaoMap;

// 3. 실시간 현재위치에따른 지도 이동
// useEffect(() => {
//   moveFirstLocation();
// }, []);

// 4. 지도의 정보를 다시 받아오기
// useEffect(() => {
//   handleMapInfo();
// }, [map, location]);

// 첫 랜더링시 현재 접속 위치로 이동
// const moveFirstLocation = () => {
//   if (navigator.geolocation) {
//     // geo서비스를 사용해서 접속 위치 추출
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation((prev) => ({
//           ...prev,
//           center: {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           },
//           isLoading: false,
//         }));
//       },
//       (err) => {
//         setLocation((prev) => ({
//           ...prev,
//           errMsg: err.message,
//           isLoading: false,
//         }));
//       }
//     );
//   } else {
//     // geo서비스를 사용못할때 마커표시와 인포윈도우 내용 설정
//     setLocation((prev) => ({
//       ...prev,
//       errMsg: "실시간 위치정보를 불러오는데 문제가 생겼습니다.",
//       isLoading: false,
//     }));
//   }
// };

// // 주소 반경 정보 받아오기
// const handleMapInfo = () => {
//   {
//     map &&
//       setInfo({
//         center: {
//           lat: map.getCenter().getLat(),
//           lng: map.getCenter().getLng(),
//         },
//         level: map.getLevel(),
//         typeId: map.getMapTypeId(),
//         swLatLng: {
//           lat: map.getBounds().getSouthWest().getLat(),
//           lng: map.getBounds().getSouthWest().getLng(),
//         },
//         neLatLng: {
//           lat: map.getBounds().getNorthEast().getLat(),
//           lng: map.getBounds().getNorthEast().getLng(),
//         },
//       });
//   }
// };
