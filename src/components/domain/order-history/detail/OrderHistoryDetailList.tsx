import { useLocation } from "react-router-dom";
import OrderCard from "../ordercard/OrderCard";

const OrderHistoryDetailList = () => {
  //orderHistoryList에 data
  const productItems = useLocation().state.orderHistoryData;

  return (
    <>
      {productItems.products.map((item: OrderHistoryProduct) => {
        return (
          <div key={item._id}>
            <OrderCard
              image={item.image}
              title={item.name}
              priceProduct={item.price}
              buyDate={productItems.updatedAt}
            />
          </div>
        );
      })}
    </>
  );
};

export default OrderHistoryDetailList;
