// get orders
// 주문목록  Response 타입
interface OrderLisType {
  _id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  reply_id: number;
}

interface Discount {
  products: number;
  shippingFees: number;
}

interface Cost {
  products: number;
  shippingFees: number;
  discount: Discount;
  total: number;
}

interface Address {
  name: string;
  value: string;
}

interface Order {
  _id: number;
  user_id: number;
  state: string;
  products: Product[];
  cost: Cost;
  address: Address;
  createdAt: string;
  updatedAt: string;
}
