// import React from "react";
// import styles from "./OrderCard.module.css";
// import Box from "@mui/material/Box";

// interface OrderCardProps {
//   title?: string;
//   image?: string;
//   createdAt: string;
//   total: string;
//   orderItems: number;
// }

// const OrderCard: React.FC<OrderCardProps> = ({
//   title,
//   image,
//   createdAt,
//   total,
//   orderItems,
// }) => {
//   return (
//     <div className={styles.orderCardContainer}>
//       <div className={styles.orderWrapper}>
//         <div className={styles.imgWrapper}>
//           <img src={image} alt="" />
//         </div>
//         <div className={styles.itemWrapper}>
//           <h4>
//             {title} 외 {orderItems} 건
//           </h4>
//           <div>주문날짜 :{createdAt}</div>
//           <address>
//             <p>강남구 어쩌고</p>
//           </address>
//           <span className={styles.orderPrice}>총합계 {total}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;

import React from "react";
import styles from "./OrderCard.module.css";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { CardMedia, Typography } from "@mui/material";

interface OrderCardProps {
  title: string;
  image: string;
  createdAt: string;
  total: string;
  orderItems: number;
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
          <Typography variant="body1">{total}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default OrderCard;
