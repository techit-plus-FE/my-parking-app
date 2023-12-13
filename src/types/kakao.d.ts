interface LocationType {
  center: {
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

interface InfoType {
  keyword: string;
  centerLatLng: {
    lat: number;
    lng: number;
  };
}
