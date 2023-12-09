import React from "react";
import { Box } from "@mui/system";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { CommonButton } from "../../UI/CommonButton";

interface PurchaseFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onSubmit, onChange }) => {
  return (
    <>
      <Box>
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
            <Typography>총</Typography>
            <CommonButton text="결제" />
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default PurchaseForm;
