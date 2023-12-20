import { Typography } from "@mui/material";
import React from "react";

interface OrderTotalPriceProps {
  totalPrice?: number;
  productPrice?: number;
}

const OrderTotalPrice: React.FC<OrderTotalPriceProps> = ({
  totalPrice,
  productPrice,
}) => {
  return (
    <>
      <Typography
        sx={{ color: "var(--color-primary-600)", fontWeight: "bold" }}
      >
        {totalPrice ? totalPrice : productPrice} 원
      </Typography>
    </>
  );
};

export default OrderTotalPrice;
