import { Typography } from "@mui/material";
import React from "react";

interface OrderTotalPriceProps {
  totalPrice: number;
}

const OrderTotalPrice: React.FC<OrderTotalPriceProps> = ({ totalPrice }) => {
  return (
    <>
      <Typography sx={{ color: "var(--color-primary-600)" }}>
        {totalPrice} 원
      </Typography>
    </>
  );
};

export default OrderTotalPrice;
