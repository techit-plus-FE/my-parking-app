import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface CommonButtonProps {
  text?: string;
  bgColor?: string;
  textColor?: string;
  width?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  text,
  bgColor,
  textColor,
  disabled,
  onClick,
  width,
  className,
}) => {
  return (
    <div>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button
          className={className}
          disabled={disabled}
          onClick={onClick}
          variant="contained"
          sx={{
            // 기본값 지정
            backgroundColor: bgColor || "var(--color-primary-600)",
            // 기본값 지정
            color: textColor || "var(--color-white)",
            width: width,
            borderRadius: "44px",
          }}
        >
          {text}
        </Button>
      </Stack>
    </div>
  );
};

// 버튼 크기에 따른 UI
export const CommonButtonSmall = (props: CommonButtonProps) => {
  return <CommonButton {...props} width="30%" />;
};

export const CommonButtonMiddle = (props: CommonButtonProps) => {
  return <CommonButton {...props} width="60%" />;
};

export const CommonButtonLarge = (props: CommonButtonProps) => {
  return <CommonButton {...props} width="90%" />;
};

// 버튼 색깔에 따른 UI
export const CommonButtonDark = () => {
  // props로 내려줄때 다크모드일때 컬러를 지정해서 하드코딩하여 넣어주셔야해요! -> index.css에 있어요
  return <CommonButton width="90%" bgColor="var()" />;
};
