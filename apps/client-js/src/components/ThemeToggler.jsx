import React from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import App from "../App";
import { useSelector } from "react-redux";
import { toggle } from "../redux/slices/theme.slice";
import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Padding } from "@mui/icons-material";
function ThemeToggler() {
  const { mode, setMode } = useColorScheme();

  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      sx={{ padding: "5px", aspectRatio: "1/1" }}
    >
      {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </Button>
  );
}

export default ThemeToggler;
