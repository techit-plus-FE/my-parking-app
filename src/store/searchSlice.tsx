import axios from "axios";
import { StateCreator } from "zustand";
import { BASE_URL } from "../services/BaseUrl";

const requestItemsInThisBound: (
  bound: kakao.maps.LatLngBounds
) => Promise<ProductListType> = async (bound) => {
  const sw: kakao.maps.LatLng = bound.getSouthWest();
  const ne: kakao.maps.LatLng = bound.getNorthEast();

  const [min_lat, min_lng]: number[] = [sw.getLat(), sw.getLng()];
  const [max_lat, max_lng]: number[] = [ne.getLat(), ne.getLng()];
  //Lat의 범위 : sw[0] <= lat <= ne[0]
  //lng의 범위 : sw[1] <= lng <= ne[1]

  try {
    const response = await axios.get<string, { data: ProductListResType }>(
      `${BASE_URL}/products?custom={"extra.lat" : {"$gte": ${min_lat}, "$lte": ${max_lat}}, "extra.lng" : {"$gte": ${min_lng}, "$lte": ${max_lng}}}`
    );
    if (response.data.ok === 1) {
      return response.data.item;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (Error: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Error.response) {
      alert(Error.response.data.message);
      console.log("error");
    }
    console.error("Error:", Error);
  }
  return [] as ProductListType;
};

export const createSearchSlice: StateCreator<SearchSlice, []> = () => ({
  searchItemsInThisBound: (bound) => {
    return requestItemsInThisBound(bound);
  },
});
