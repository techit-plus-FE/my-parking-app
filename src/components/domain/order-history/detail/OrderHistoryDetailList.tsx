import { useLocation, useNavigate } from "react-router-dom";
import OrderCard from "../ordercard/OrderCard";
import OrderTitleBox from "../ordercard/OrderTitleBox";
import { BASE_URL } from "../../../../services/BaseUrl";
import classes from "./OrderHistory.module.css";

const OrderHistoryDetailList = () => {
  //orderHistoryList에서 넘겨준 data
  // 주문건에 대한 item 이 productItems에 arr 형식으로 저장되어있습니다.
  const productItems = useLocation().state.orderHistoryData;
  const navigate = useNavigate();
  console.log(productItems);
  return (
    <>
      <div className={classes.orderHistoryDetailListContainer}>
        <ul>
          <li>상품정보</li>
          <li>결제금액</li>
        </ul>
      </div>
      {productItems.products.map((item: OrderHistoryProduct) => {
        console.log(productItems);

        return (
          <div key={item._id}>
            <OrderCard
              image={BASE_URL + item.image.url}
              title={item.name}
              productPrice={item.price}
              buyDate={productItems.buyDate}
              isVisible={true}
              btnText="후기"
              onClick={() =>
                // 후기 쓰는 페이지로 이동합니다.
                // productId  /   orderId 순서 입니다.
                navigate(`/reply/${item._id}/${productItems._id}`)
              }
            />
          </div>
        );
      })}
    </>
  );
};

export default OrderHistoryDetailList;
