import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface CommonButtonProps {
  text?: string;
  bgColor?: string;
  textColor?: string;
  width: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
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
      <Stack spacing={2} direction="row">
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

export default CommonButton;
