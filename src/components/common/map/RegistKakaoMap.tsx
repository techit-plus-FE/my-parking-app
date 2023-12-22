/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import classes from "./RegistKakaoMap.module.css";
// import Checkbox from "../../UI/Checkbox";
import { Checkbox } from "@mui/material";

type Props = {
  product: ProductItemType; // 이미 기존에 등록된 상품
  formData: ProductItemType; // 부모에서 업데이트 하는 상품
  setFormData?: (d: ProductItemType) => void;
};

type PositionType = {
  placeName?: string;
  centerLatLng: {
    lat: number | undefined;
    lng: number | undefined;
  };
};
// 위치 등록시 사용할 카카오 맵 컴포넌트
const RegistKakaoMap = ({ product, formData, setFormData }: Props) => {
  // 지도의 초기 중심좌표위치(카카오본사)
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [mapLocation, setMapLocation] = useState<PositionType>({
    placeName: "",
    centerLatLng: {
      lat: Number(product.extra?.lat) || 33.450701,
      lng: Number(product.extra?.lng) || 126.570667,
    },
  }); // 지도 중심 좌표
  const [clickPosition, setClickPosition] = useState<PositionType | undefined>({
    centerLatLng: {
      lat: Number(product.extra?.lat) || undefined,
      lng: Number(product.extra?.lng) || undefined,
    },
  }); // 지도 이동 후 클릭한 위치의 좌표

  const [searchCheckbox, setSearchCheckbox] = useState<boolean>(true);
  const [directCheckbox, setDirectCheckbox] = useState<boolean>(false);
  const [isSearchCheckbox, setIsSearchCheckbox] = useState<boolean>(true);

  // 입력된 주소로 지도 업데이팅
  const handleSearchUpdate = () => {
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
            placeName: newSearch.place_name,
            centerLatLng: {
              lat: newSearch.y,
              lng: newSearch.x,
            },
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

  // 클릭한 좌표로 지도 업데이팅
  const handleClickUpdate = (_t: any, mouseEvent: any) => {
    setClickPosition({
      centerLatLng: {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    });

    if (setFormData) {
      setFormData({
        ...formData,
        extra: {
          ...formData.extra,
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        },
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchUpdate();
    }
  };

  const handleSearchCheckboxChange = () => {
    setSearchCheckbox(!searchCheckbox);
    setDirectCheckbox(false);
    setIsSearchCheckbox(true);
  };

  const handleDirectCheckboxChange = () => {
    setDirectCheckbox(!directCheckbox);
    setSearchCheckbox(false);
    setIsSearchCheckbox(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.checkboxs}>
        <div
          className={classes["search-address"]}
          style={{
            borderLeft: searchCheckbox
              ? "2px solid var(--color-primary-600)"
              : "none",
          }}
        >
          <Checkbox
            onChange={handleSearchCheckboxChange}
            checked={searchCheckbox}
          />
          <span> 직접 주소 입력하기</span>
        </div>
        <div
          className={classes["pick-location"]}
          style={{
            borderLeft: directCheckbox
              ? "2px solid var(--color-primary-600)"
              : "none",
          }}
        >
          <Checkbox
            onChange={handleDirectCheckboxChange}
            checked={directCheckbox}
          />
          <span>직접 좌표 찍기</span>
        </div>
      </div>

      {isSearchCheckbox ? (
        <>
          <div className={classes["input-box"]}>
            <input
              type="text"
              value={searchAddress}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="등록할 주차장 주소를 입력하세요."
            />
            <button type="button" onClick={handleSearchUpdate}>
              검색
            </button>
          </div>

          {/* 지도 */}
          <Map
            center={{
              lat: Number(mapLocation.centerLatLng.lat),
              lng: Number(mapLocation.centerLatLng.lng),
            }}
            style={{ width: "100%", height: "400px" }}
            level={4}
            draggable={false}
          >
            {mapLocation.placeName && (
              <MapMarker
                position={{
                  lat: Number(mapLocation.centerLatLng.lat),
                  lng: Number(mapLocation.centerLatLng.lng),
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
                    style={{
                      fontWeight: "700",
                      color: "var(--color-primary-800)",
                    }}
                  >
                    {mapLocation.placeName}
                  </p>
                </div>
              </MapMarker>
            )}
          </Map>
        </>
      ) : (
        <Map
          center={{
            lat: Number(mapLocation.centerLatLng.lat),
            lng: Number(mapLocation.centerLatLng.lng),
          }}
          style={{ width: "100%", height: "400px" }}
          level={4}
          onClick={handleClickUpdate}
        >
          {clickPosition && (
            <MapMarker
              position={{
                lat: Number(clickPosition.centerLatLng.lat),
                lng: Number(clickPosition.centerLatLng.lng),
              }}
            />
          )}
        </Map>
      )}
    </div>
  );
};

export default RegistKakaoMap;

// console.log(searchAddress); // 애플트리타워
// console.log(mapLocation.lat); // 37.5070100333146
// console.log(mapLocation.lng); // 127.055618149788
