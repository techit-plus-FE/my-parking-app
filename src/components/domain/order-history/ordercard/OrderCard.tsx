import React from "react";
import Box from "@mui/material/Box";
import { CardMedia, Typography } from "@mui/material";
import MediaQuery from "../../../../hooks/MediaQuery";

interface OrderCardProps {
  title: string;
  image: string;
  total: string;
  orderItems: number;
}

const OrderCard: React.FC<OrderCardProps> = ({
  title,
  image,
  total,
  orderItems,
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
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          ></Typography>
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
          <Typography variant="body1">
            {title} 외 {orderItems}
          </Typography>
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
          <Typography variant="body1">{total}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default OrderCard;
