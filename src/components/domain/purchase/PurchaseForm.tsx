import React, { ReactNode } from "react";
import classes from "./purchase.module.css";
import axios from "axios";
import { BASE_URL } from "../../../services/BaseUrl";

interface Props {
  children?: ReactNode;
}

const PurchaseForm: React.FC<Props> = ({ children }) => {
  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


  };

  return (
    <div>
      <form onSubmit={handlePayment}>
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
      </form>
    </div>
  );
};

export default PurchaseForm;
