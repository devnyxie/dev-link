// StatusAlert.jsx
import { Box, Button, IconButton, Sheet, Snackbar } from "@mui/joy";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../redux/slices/alertSlice";
import { GoCheckCircle } from "react-icons/go";
import { GoUnverified } from "react-icons/go";
import { GoXCircle } from "react-icons/go";
import { GoStop } from "react-icons/go";
import { keyframes } from "@emotion/react";
import { IoIosClose } from "react-icons/io";

const inAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

function StatusAlert() {
  console.log("StatusAlert");

  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.alert);
  console.log(open, message, severity);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearAlert());
  };

  let icon;
  if (severity === "success") {
    icon = <GoCheckCircle />;
  } else if (severity === "primary") {
    icon = <GoUnverified />;
  } else if (severity === "warning") {
    icon = <GoStop />;
  } else if (severity === "error") {
    icon = <GoXCircle />;
  } else {
    icon = <></>;
  }
  return (
    <>
      <Snackbar
        startDecorator={icon}
        color={severity}
        autoHideDuration={2000}
        open={open}
        variant="outlined"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        sx={{
          mt: "60px",

          ...(open && {
            animation: `inAnimation 200ms forwards`,
          }),
          ...(!open && {
            animation: `outAnimation 75ms forwards`,
          }),
        }}
        endDecorator={
          <IconButton
            onClick={() => handleClose()}
            size="sm"
            variant="soft"
            color={severity}
          >
            <IoIosClose size={20} />
          </IconButton>
        }
      >
        {message}
      </Snackbar>
    </>
  );
}

export default StatusAlert;
