// extra 추가 상품 정보 타입 지정
interface extraProductInfoType {
  isNew?: boolean;
  isBest?: boolean;
  category?: string[];
  quantity?: number;
  buyQuantity?: number;
  order?: number;
  periodFrom: string;
  periodTo: string;
  locationX: string;
  locationY: string;
}

// 응답받은 상품 아이템 데이터 타입
interface ProductItemResponseType {
  _id: number;
  seller_id: number;
  price: number;
  shippingFees?: number;
  show?: boolean;
  active?: boolean;
  name: string;
  mainImages: string[];
  content: string;
  createdAt?: string;
  updatedAt?: string;
  extra?: extraProductInfoType;
}

// 응답으로부터 받은 데이터 화면에 보여주게 할 데이터
interface ProductDetailItemType {
  name: string;
  content: string;
  createdAt: string | undefined;
  mainImages: string[];
  price: number;
  extra:
    | {
        periodFrom: string;
        periodTo: string;
        locationX: string;
        locationY: string;
      }
    | undefined;
}

// 상품 리스트 데이터 타입
type ProductResList = ProductItemResponseType[];

// Axios GET Response
interface ProductRes {
  ok: 0 | 1;
  item: ProductItemResponseType[];
}

// 상품 등록양식 전체 데이터 타입
interface ProductAllFormDataType {
  location: ProductLocationType; // x,y좌표(카카오 지도로부터 받은 위치)
  startDate: string;
  endDate: string;
  othersInfo: ProductOthersInfoType;
  mainImages: string[];
}

// 위치 좌표 타입
interface ProductLocationType {
  address: string;
  lat: string;
  lng: string;
}

// 상품등록 마지막에 받을 양식 타입
interface ProductOthersInfoType {
  name: string;
  price: string;
  content: string;
}
