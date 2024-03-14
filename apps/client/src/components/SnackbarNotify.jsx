// StatusAlert.jsx
import {
  Box,
  Button,
  IconButton,
  Sheet,
  Snackbar as JoyUISnackbar,
} from "@mui/joy";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSnackbar } from "../redux/slices/snackbar.slice.jsx";
import { GoCheckCircle } from "react-icons/go";
import { GoUnverified } from "react-icons/go";
import { GoStop } from "react-icons/go";
import { keyframes } from "@emotion/react";
import { IoIosClose } from "react-icons/io";

function chooseIcon(color) {
  switch (color) {
    case "success":
      return <GoCheckCircle size={20} />;
    case "warning":
      return <GoUnverified size={20} />;
    case "danger":
      return <GoStop size={20} />;
    default:
      return <></>;
  }
}

function SnackbarNotify() {
  console.log("StatusAlert");
  const dispatch = useDispatch();
  const { open, color, message } = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearSnackbar());
  };

  return (
    <>
      <JoyUISnackbar
        startDecorator={chooseIcon(color)}
        color={color}
        autoHideDuration={1700}
        open={open}
        variant="outlined"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        sx={{
          zIndex: 3,
          mt: "70px",
          mr: "20px",
          ...(open && {
            animation: `inAnimation 0.2s forwards`,
          }),
          ...(!open && {
            animation: `outAnimation 0.2s forwards`,
          }),
        }}
        endDecorator={
          <IconButton
            onClick={() => handleClose()}
            size="sm"
            variant="plain"
            color={color}
          >
            <IoIosClose size={20} />
          </IconButton>
        }
      >
        {message}
      </JoyUISnackbar>
    </>
  );
}

export default SnackbarNotify;
