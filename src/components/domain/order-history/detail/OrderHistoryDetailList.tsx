import { useLocation, useNavigate, useParams } from "react-router-dom";
import OrderCard from "../ordercard/OrderCard";
import { BASE_URL } from "../../../../services/BaseUrl";
import classes from "./OrderHistory.module.css";
import { useEffect, useState } from "react";
import useCustomAxios from "../../../../services/useCustomAxios";

const OrderHistoryDetailList = () => {
  //orderHistoryList에서 넘겨준 data
  // 주문건에 대한 item 이 productItems에 arr 형식으로 저장되어있습니다.
  const productItems = useLocation().state.orderHistoryData;
  const navigate = useNavigate();
  const instance = useCustomAxios();
  const { orderId } = useParams();
  // 리뷰가 쓰였는지 안쓰였는지 확인하는 state
  const [reviewData, setReviewData] = useState<boolean>(false);

  useEffect(() => {
    const getReplyData = async () => {
      const res = await instance(`/replies/${orderId}`);
      res && setReviewData(true);
    };

    getReplyData();
  }, []);

  return (
    <>
      <h2 className={classes.h2}>주문목록상세</h2>
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
              btnText={reviewData ? "수정하기" : "리뷰쓰기"}
              onClick={() =>
                // 후기 쓰는 페이지로 이동합니다.
                // productId  /   orderId 순서 입니다.
                reviewData
                  ? "수정하기"
                  : navigate(`/reply/${item._id}/${productItems._id}`)
              }
            />
          </div>
        );
      })}
    </>
  );
};

export default OrderHistoryDetailList;
