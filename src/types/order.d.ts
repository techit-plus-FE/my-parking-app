// 주문한 상품의 정보
interface OrderHistoryData {
  item: OrderHistoryProduct[];
}

//주문한 상품의 디테일 정보
interface OrderHistoryProduct {
  image: string;
  name: string;
  price: number;
  _id: number;
  updatedAt: string;
  products: ProductsItem[];
  cost: {
    total: number;
  };
  extra: {
    buyDate: string;
  };
}

//주문한 상품의 개별 item 정보
interface ProductsItem {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  image: string;
  price: number;
}
