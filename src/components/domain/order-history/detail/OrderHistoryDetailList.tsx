import { useLocation, useNavigate } from "react-router-dom";
import OrderCard from "../ordercard/OrderCard";
import OrderTitleBox from "../ordercard/OrderTitleBox";

const OrderHistoryDetailList = () => {
  //orderHistoryList에서 넘겨준 data
  // 주문건에 대한 item 이 productItems에 arr 형식으로 저장되어있습니다.
  const productItems = useLocation().state.orderHistoryData;
  const navigate = useNavigate();
  return (
    <>
      <OrderTitleBox
        pageTitle="주문상세"
        option1="상품정보"
        option3="상품 금액"
        flex={1}
      />
      {productItems.products.map((item: OrderHistoryProduct) => {
        console.log(productItems);

        return (
          <div key={item._id}>
            <button
              onClick={() =>
                // productId  /   orderId 순서 입니다.
                navigate(`/replies/${item._id}/${productItems._id}`)
              }
            >
              후기등록하기
            </button>

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
