import { List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const OrderTitleBox: React.FC = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#e1e1e1" }}>
        <List sx={{ display: "flex", flexDirection: "row" }}>
          <ListItem sx={{ justifyContent: "center", flex: 2 }}>
            상품정보
          </ListItem>
          <ListItem sx={{ justifyContent: "center", flex: 1 }}>
            대여기간
          </ListItem>
          <ListItem sx={{ justifyContent: "center", flex: 1 }}>
            결제금액
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default OrderTitleBox;
