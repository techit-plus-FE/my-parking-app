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
        flex={1}
      />
      {productItems.products.map((item: OrderHistoryProduct) => {
        console.log(item);
        return (
          <div key={item._id}>
            <OrderCard
              image={item.image}
              title={item.name}
              productPrice={item.price}
              buyDate={productItems.updatedAt}
              isVisible={false}
            />
          </div>
        );
      })}
    </>
  );
};

export default OrderHistoryDetailList;
