import React, { useEffect, useState } from "react";
import OrderHistoryDetailItem from "./OrderHistoryDetailItem";
import axios from "axios";
import { useParams } from "react-router-dom";
import classes from "./OrderHistory.module.css";

const OrderHistoryDetailList = () => {
  const [getData, setGetData] = useState<OrderHistoryDetailData>();
  const _id = useParams().orderId;
  console.log(_id);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`https://localhost/api/products/${_id}`);
      console.log(response.data.item);
      return setGetData(response.data.item);
    };

    getData();
  }, []);

  return (
    <div className={classes.OrderHistoryDetailListContainer}>
      <span>{getData?.createdAt}</span>
      <div>
        <h2>주문번호: 5456465</h2>
        <div className={classes.paymentWrapper}>
          <div>총 가격</div>
          <div>결제 수단</div>
        </div>
        <h3>주문목록</h3>
      </div>
      <OrderHistoryDetailItem />
    </div>
  );
};

export default OrderHistoryDetailList;
