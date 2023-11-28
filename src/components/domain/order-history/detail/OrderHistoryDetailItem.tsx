import React from "react";
import classes from "./OrderHistoryDatailItem.module.css";

const OrderHistoryDetailItem = () => {
  return (
    <article className={classes.orderHistoryDetailContainer}>
      <span>2023.05.05</span>
      <div>
        <h2>주문번호: 5456465</h2>
        <div>
          <div>총 가격</div>
          <div>결제 수단</div>
        </div>
        <h3>주문목록</h3>
        <div>
          <div className="order-history-list-wrapper">
            <img src="https://picsum.photos/200/300" alt="" />
          </div>
          <div>
            <h4>애플트리 건물주</h4>
            <time>1201.54.4564</time>
            <address>
              <p>강남구 어쩌고</p>
            </address>
            <span>1000원</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderHistoryDetailItem;
