import React from "react";
import Box from "@mui/material/Box";
import { CardMedia, Typography } from "@mui/material";

interface OrderCardProps {
  title: string;
  image: string;
  createdAt: string;
  total: string;
  orderItems?: number;
}

const OrderCard: React.FC<OrderCardProps> = ({
  title,
  image,
  createdAt,
  total,
  orderItems,
}) => {
  return (
    <>
      <Box
        sx={{
          border: "1px solid red",
          display: "flex",
          justifyContent: " space-evenly",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexBasis: "200px", margin: "20px" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {createdAt}
          </Typography>
          <CardMedia
            component="img"
            height="100"
            image={image}
            alt=""
            style={{ borderRadius: "10px" }}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1">
            {title} 외 {orderItems}
          </Typography>
          <Typography variant="body1">{createdAt}</Typography>
          <Typography variant="body1">{total} 원</Typography>
        </Box>
      </Box>
    </>
  );
};

export default OrderCard;
