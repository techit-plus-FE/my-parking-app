// extra 추가 상품 정보 타입 지정
interface extraProductInfoType {
  isNew: boolean;
  isBest: boolean;
  category: string[];
  quantity: number;
  buyQuantity: number;
  order: number;
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

// 상품 리스트 데이터 타입
type ProductResList = ProductItemResponseType[];

// Axios GET Response
interface ProductRes {
  ok: 0 | 1;
  item: [ProductItemResponseType];
}
