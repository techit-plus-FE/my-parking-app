import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useBoundStore } from "../../../store";

const PurchaseInformation: React.FC = () => {
  const userBasicInfo = useBoundStore((state) => state.userBasicInfo);
  console.log(userBasicInfo);

  function maskSensitiveInfo(userInfo: {
    name: string;
    phone: string;
    email: string;
  }) {
    // 이름은 그대로 표시, 연락처 뒷부분 4글자, 이메일 뒷부분 @ 이전은 그대로 표시, @ 이후는 마스킹
    const maskedInfo = {
      name: userInfo.name,
      phone: userInfo.phone.replace(/.(?=.{4,}$)/g, "*"), // 뒷부분 4글자를 *로 대체
      email: userInfo.email.replace(/.(?=@)/g, "***"), // @ 이전의 문자를 그대로 표시, @ 이후의 문자를 *로 대체
    };

    return maskedInfo;
  }

  const maskedUserInfo = maskSensitiveInfo(userBasicInfo);

  return (
    <>
      <Box
        sx={{
          borderBottom: "1px solid var(--color-gray-300)",
        }}
      >
        <Typography fontWeight="bold" mt="20px">
          구매자 정보
        </Typography>
      </Box>
      <Box
        mt="20px"
        mb="20px"
        sx={{
          borderBottom: "1px solid var(--color-gray-300)",
        }}
      >
        <Typography>이름: {maskedUserInfo.name}</Typography>
        <Typography>연락처: {maskedUserInfo.phone}</Typography>
        <Typography>이메일: {maskedUserInfo.email}</Typography>
      </Box>
    </>
  );
};

export default PurchaseInformation;
