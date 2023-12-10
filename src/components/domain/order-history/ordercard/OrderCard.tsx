import React from "react";
import Box from "@mui/material/Box";
import { CardMedia, Typography } from "@mui/material";
import MediaQuery from "../../../../hooks/MediaQuery";
import { CommonButton } from "../../../UI/CommonButton";
import OrderTotalPrice from "./OrderTotalPrice";

interface OrderCardProps {
  title: string;
  image: string;
  orderItems?: number; // 주문건 외 몇건
  startDate?: string; // 대여 시작 날짜
  endDate?: string; // 대여 종료 날짜
  buyDate?: string; // 구매날짜
  priceProduct?: number; // 각각의 상품 가격
  totalPrice?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  title,
  image,
  orderItems,
  endDate,
  startDate,
  buyDate,
  onClick,
  priceProduct,
  totalPrice,
}) => {
  const isMobile = MediaQuery();
  console.log(isMobile);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: " space-evenly",
          mt: "25px",
          mb: "25px",
          alignItems: "center",
          backgroundColor: "#e6e6e6",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            flexBasis: "200px",
            margin: "20px",
            flex: 1,
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            구매 날짜: {buyDate}
          </Typography>
          <CardMedia
            component="img"
            height="100"
            image={image}
            alt=""
            style={{
              borderRadius: "10px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
          {orderItems ? (
            <Typography variant="body1">
              {title} 외 {orderItems}
            </Typography>
          ) : (
            <Typography variant="body1">{title}</Typography>
          )}
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: isMobile ? undefined : "flex",
            width: "100%",
            justifyContent: "space-around",
            flex: 2,
          }}
        >
          {startDate} ~대여기간~!!!어디!!!!!!있을까! {endDate}
          {totalPrice && <OrderTotalPrice totalPrice={totalPrice} />}
          {priceProduct && <Typography>{priceProduct} 원</Typography>}
          <CommonButton text="상세보기" onClick={onClick} />
        </Box>
      </Box>
    </>
  );
};

export default OrderCard;
