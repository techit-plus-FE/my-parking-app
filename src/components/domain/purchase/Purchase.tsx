import React from "react";
import PurchaseForm from "./PurchaseForm";
import OrderHistoryDetailList from "../order-history/detail/OrderHistoryDetailList";

const Purchase = () => {
  return (
    <>
      <PurchaseForm>
        <OrderHistoryDetailList />
      </PurchaseForm>
    </>
  );
};

export default Purchase;
