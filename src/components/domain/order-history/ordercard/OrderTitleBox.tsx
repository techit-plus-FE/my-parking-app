import { List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MediaQuery from "../../../../hooks/MediaQuery";
import { useTheme } from "@emotion/react";
import { useBoundStore } from "../../../../store";

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

  const isDark = useBoundStore((state) => state.isDark);
  console.log(isDark);
  return (
    <>
      {isMobile || (
        <Typography
          variant="h2"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            padding: "30px",
          }}
        >
          주문/결제하기
        </Typography>
      )}

      {isMobile || (
        <Box sx={{}}>
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: isDark ? "#2c2c2c" : "#F2F2F2",
            }}
          >
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
            {option3 && (
              <ListItem
                sx={{
                  justifyContent: option4 ? "end" : "start",
                  flex: flex ? flex : 2,
                }}
              >
                {option3}
              </ListItem>
            )}

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
