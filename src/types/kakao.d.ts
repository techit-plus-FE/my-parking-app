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
