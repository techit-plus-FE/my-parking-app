import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useBoundStore } from "../../store";

interface ToastProps {
  isToastOpen: boolean;
  alertText: string;
}

//useState로 isToastOpen, setIsToastOpen을 만들어서 사용해야 함
export const Toast: React.FC<ToastProps> = ({
  isToastOpen: toastOpen,
  alertText,
}) => {
  const setIsToastOpen = useBoundStore((state) => state.setIsToastOpen);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsToastOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={toastOpen}
      autoHideDuration={2000}
      onClose={handleClose}
      message={alertText}
      action={action}
    />
  );
};
