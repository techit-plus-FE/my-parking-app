import React from "react";

const OrderHistoryDetailItem = () => {
  return (
    <div className="order-history-detail-item-container">
      <div className="order-history-list-wrapper">
        <div>
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
        <div>
          <p>애플트리 건물주</p>
          <time>1201.54.4564</time>
          <address>
            <p>강남구 어쩌고</p>
          </address>
          <span>1000원</span>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryDetailItem;
