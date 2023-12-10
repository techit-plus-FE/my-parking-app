// 주문한 상품의 정보

interface OrderHistoryData {
  item: OrderHistoryItem[];
}

//주문한 상품의 디테일 정보
interface OrderHistoryProduct {
  image: string;
  name: string;
  price: number;
  _id: number;
  updatedAt: string;
  address: {
    name: string;
    value: string;
  };
  products: OrderHistoryProduct[];
}

interface OrderHistoryItem {
  address: {
    name: string;
    value: string;
  };
  updatedAt: string;
  _id: number;
  products: OrderHistoryProduct[];
  cost: {
    total: number;
  };
}
