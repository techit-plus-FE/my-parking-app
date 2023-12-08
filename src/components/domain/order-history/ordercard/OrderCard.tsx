import React from "react";
import styles from "./OrderCard.module.css";

interface OrderCardProps {
  title?: string;
  image?: string;
  createdAt: string;
  total: string;
  orderItems: number;
}

const OrderCard: React.FC<OrderCardProps> = ({
  title,
  image,
  createdAt,
  total,
  orderItems,
}) => {
  return (
    <div className={styles.orderCardContainer}>
      <div className={styles.orderWrapper}>
        <div className={styles.imgWrapper}>
          <img src={image} alt="" />
        </div>
        <div className={styles.itemWrapper}>
          <h4>
            {title} 외 {orderItems} 건
          </h4>
          <div>주문날짜 :{createdAt}</div>
          <address>
            <p>강남구 어쩌고</p>
          </address>
          <span className={styles.orderPrice}>총합계 {total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
