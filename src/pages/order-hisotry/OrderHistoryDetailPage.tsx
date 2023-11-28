// 주문 기록 상세 페이지
import React from "react";
import OrderHistoryDetailItem from "../../components/domain/order-history/detail/OrderHistoryDetailItem";
import { useParams } from "react-router-dom";

const OrderHistoryDetailPage = () => {
  const id = useParams();
  console.log(id);
  return (
    <div>
      <OrderHistoryDetailItem />
    </div>
  );
};

export default OrderHistoryDetailPage;
