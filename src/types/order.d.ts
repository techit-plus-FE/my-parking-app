interface Product {
  _id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  reply_id: number;
}

interface Cost {
  products: string;
  shippingFees: number;
  discount: {
    products: number;
    shippingFees: number;
  };
  total: number;
}

interface Address {
  name: string;
  value: string;
}

interface OrderHistoryDataType {
  _id: number;
  user_id: number;
  state: string;
  products: Product[];
  cost: Cost;
  address: Address;
  createdAt: string;
  updatedAt: number;
}
