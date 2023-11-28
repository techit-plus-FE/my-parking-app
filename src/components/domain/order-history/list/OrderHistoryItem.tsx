import React from "react";
import classes from "./OrderHistory.module.css";

interface OrderHistoryItemProps {
  orderTitle: string;
  orderDate: string;
  orderPrice: string;
}

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({
  orderTitle,
  orderDate,
  orderPrice,
}) => {
  return (
    <article className={classes.orderHistoryItemContainer}>
      <div>
        <span>{orderDate}</span>
        <div className={classes.imgWrapper}>
          <img src="https://picsum.photos/100/85" alt="" />
        </div>
      </div>
      <div>
        <a href="">
          <span>상세보기 </span>
        </a>
        <h2>{orderTitle}</h2>
        <time>2023.3.485</time>
        <span>{orderPrice}</span>
      </div>
    </article>
  );
};

export default OrderHistoryItem;
