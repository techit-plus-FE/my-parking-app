import React from "react";
import PurchaseForm from "./PurchaseForm";
import OrderHistoryDetailList from "../order-history/detail/OrderHistoryDetailList";
import { useParams } from "react-router-dom";

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
