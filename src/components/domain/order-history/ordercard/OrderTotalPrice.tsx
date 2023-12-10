import { Box } from "@mui/system";
import React from "react";

interface OrderTotalPriceProps {
  totalPrice: number;
}

const OrderTotalPrice: React.FC<OrderTotalPriceProps> = ({ totalPrice }) => {
  return (
    <>
      <Box>{totalPrice} 원</Box>
    </>
  );
};

export default OrderTotalPrice;
