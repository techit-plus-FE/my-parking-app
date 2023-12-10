import { List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface OrderTitleBoxProps {
  option1: string;
  option2: string;
  option3: string;
  option4?: string;
}

const OrderTitleBox: React.FC<OrderTitleBoxProps> = ({
  option1,
  option2,
  option3,
}) => {
  return (
    <>
      <Box sx={{ backgroundColor: "#e1e1e1" }}>
        <List sx={{ display: "flex", flexDirection: "row" }}>
          {
            <ListItem sx={{ justifyContent: "center", flex: 3 }}>
              {option1}
            </ListItem>
          }
          <ListItem sx={{ justifyContent: "center", flex: 2 }}>
            {option2}
          </ListItem>
          <ListItem sx={{ justifyContent: "start", flex: 2 }}>
            {option3}
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default OrderTitleBox;
