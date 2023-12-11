import { CardMedia } from "@mui/material";
import { Box, flexbox } from "@mui/system";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { CommonButtonMiddle } from "../../UI/CommonButton";
import { useNavigate } from "react-router-dom";

const PurchaseResult = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CheckIcon
          sx={{
            fontSize: "200px",
          }}
        />
        <Box>결제가 완료되었습니다.</Box>
        <Box
          sx={{
            mb: "20px",
            width: "300px",
          }}
        >
          <CommonButtonMiddle
            text="예약 확인하기"
            onClick={() => navigate("/order-history")}
          />
        </Box>
        <Box
          sx={{
            width: "300px",
          }}
        >
          <CommonButtonMiddle text="홈으로" onClick={() => navigate("/home")} />
        </Box>
      </Box>
    </Box>
  );
};

export default PurchaseResult;
