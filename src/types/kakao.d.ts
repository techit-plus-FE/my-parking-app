interface LocationType {
  centerLatLng: {
    lat: number | undefined;
    lng: number | undefined;
  };
  error: string | null;
  isLoading: boolean | undefined;
}

interface MarkerType {
  position: {
    lat: string;
    lng: string;
  };
  marker: string;
  content: string;
}

type MarkerListType = MarkerType[];

interface MapInfoType {
  keyword: string | null;
  centerLatLng: {
    lat: number;
    lng: number;
  };
  period: string[]|undefined;
  isPanTo: boolean;
}
