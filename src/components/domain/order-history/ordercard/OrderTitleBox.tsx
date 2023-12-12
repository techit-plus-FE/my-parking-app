import { List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MediaQuery from "../../../../hooks/MediaQuery";

interface OrderTitleBoxProps {
  option1: string;
  option2: string;
  option3: string;
  option4?: string;
  flex?: number;
}

const OrderTitleBox: React.FC<OrderTitleBoxProps> = ({
  option1,
  option2,
  option3,
  option4,
  flex,
}) => {
  const isMobile = MediaQuery();

  return (
    <>
      {isMobile || (
        <Box>
          <List sx={{ display: "flex", flexDirection: "row" }}>
            {
              <ListItem
                sx={{
                  justifyContent: "center",

                  flex: option4 ? 5 : 2,
                }}
              >
                {option1}
              </ListItem>
            }
            <ListItem
              sx={{
                justifyContent: option4 ? "end" : "start",
                flex: option4 ? 1 : 2,
              }}
            >
              {option2}
            </ListItem>
            <ListItem
              sx={{
                justifyContent: option4 ? "end" : "start",
                flex: flex ? flex : 2,
              }}
            >
              {option3}
            </ListItem>

            {option4 && (
              <ListItem
                sx={{
                  justifyContent: option4 ? "end" : "start",
                  flex: flex ? flex : 2,
                }}
              >
                {option4}
              </ListItem>
            )}
          </List>
        </Box>
      )}
    </>
  );
};

export default OrderTitleBox;
