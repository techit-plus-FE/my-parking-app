import React from "react";
import { Box } from "@mui/system";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { CommonButtonMiddle } from "../../UI/CommonButton";
import PurchaseInformation from "./PurchaseInformation";

interface PurchaseFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  total: number;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({
  onSubmit,
  onChange,
  total,
}) => {
  return (
    <Box mt="50px">
      <PurchaseInformation />
      <Typography fontWeight="bold" marginBottom="20px">
        결제 수단
      </Typography>
      <Box
        sx={{
          borderTop: "1px solid var(--color-gray-300)",
        }}
      >
        <form onSubmit={onSubmit}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="options"
              name="options"
              //라디오 버튼이 눌릴 때 발생하는 이벤트
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="신용/체크카드"
                onChange={onChange}
              />
              <FormControlLabel
                value="noPassBook"
                control={<Radio />}
                label="무통장입금"
                onChange={onChange}
              />
              <FormControlLabel
                value="phone"
                control={<Radio />}
                label="휴대폰"
                onChange={onChange}
              />
            </RadioGroup>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              총 {total} 원
            </Typography>
            <CommonButtonMiddle text="결제" />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default PurchaseForm;
