import React, { ReactNode } from "react";
import classes from "./purchase.module.css";

interface Props {
  children?: ReactNode;
}

const PurchaseForm: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div>
        <h1>예약할 주차장</h1>
        {children}
      </div>
      <h2>결제 방법</h2>
      <div>
        <div className={classes.payMentWrapper}>
          <button>신용카드</button>
          <button>무통장</button>
          <button>신용카드</button>
          <button>무통장</button>
          <button>신용카드</button>
          <button>무통장</button>
        </div>
      </div>
      <div>
        <span>총 : 1000,000원</span>
        <button>결제</button>
      </div>
    </div>
  );
};

export default PurchaseForm;
