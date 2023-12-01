import React from "react";
import classes from "./OrderHistoryDetail.module.css";

const OrderHistoryDetailItem = () => {
  return (
    <div className={classes.OrderHistoryDetailContainer}>
      <div className="order-history-list-wrapper">
        <div className={classes.imgWrapper}>
          <img src="https://picsum.photos/100/100" alt="" />
        </div>
      </div>
      <div>
        <h4>애플트리 건물주</h4>
        <span>1201.54.4564</span>
        <address>
          <p>강남구 어쩌고</p>
        </address>
        <span>1000원</span>
      </div>
    </div>
  );
};

export default OrderHistoryDetailItem;
