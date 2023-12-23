import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/system";

interface CommonButtonProps {
  text?: string;
  bgColor?: string;
  textColor?: string;
  width?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isVisible?: boolean;
  btnType?: boolean;
}

interface MuiButtonProps {
  text? : string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fontSize?: string;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  text, // 버튼내용
  bgColor, // 버튼색상
  textColor,
  disabled,
  onClick,
  width,
  className,
  isVisible = true, // btn이 안보여야할 페이지 에서는 false 설정,
  btnType = true, // btn 기본 타입은 submit이며 false 시 button 타입이 적용됩니다.
}) => {
  return (
    isVisible && (
      <div>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button
            className={className}
            disabled={disabled}
            onClick={onClick}
            variant="contained"
            type={btnType ? "submit" : "button"}
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
    )
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

export const MuiButton = (props: MuiButtonProps) => {
  const theme = useTheme()
  const {fontSize, onClick, text} = {...props}
  return<Button
  onClick = {onClick}
  sx={{
    color: theme.palette.text.primary,
    fontSize:fontSize? fontSize : null
  }}
  >
    {text}
  </Button>
}