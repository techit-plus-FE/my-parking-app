import { useLocation } from "react-router-dom";
import OrderCard from "../ordercard/OrderCard";
import OrderTitleBox from "../ordercard/OrderTitleBox";

const OrderHistoryDetailList = () => {
  //orderHistoryList에 data
  const productItems = useLocation().state.orderHistoryData;

  return (
    <>
      <OrderTitleBox
        option1="상품정보"
        option2="대여기간"
        option3="상품 금액"
      />
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
