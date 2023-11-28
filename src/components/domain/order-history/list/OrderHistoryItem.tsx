import React from "react";
import classes from "./OrderHistory.module.css";
import { useNavigate } from "react-router-dom";

interface OrderHistoryItemProps {
  orderTitle: string;
  orderDate: string;
  orderPrice: string;
  orderId: number;
}

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({
  orderTitle,
  orderDate,
  orderPrice,
  orderId,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/order-history/${orderId}`);
  };

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
          <button onClick={handleClick}>상세보기 </button>
        </a>
        <h2>{orderTitle}</h2>
        <time>2023.3.485</time>
        <span>{orderPrice}</span>
      </div>
    </article>
  );
};

export default OrderHistoryItem;
