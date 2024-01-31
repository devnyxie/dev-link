import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setTheme } from "../redux/store";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import App from "../App";

function ThemeToggler() {
  const dispatch = useDispatch();
  // const theme = useSelector((state: any) => state.theme);
  // const handleThemeChange = () => {
  //   const newTheme = theme === "dark" ? "light" : "dark";
  //   dispatch(setTheme(newTheme));
  // };
  const theme = useTheme();
  console.log(theme);
  return (
    <div style={{ textDecoration: "underline" }}>{theme.palette.mode} mode</div>
  );
}

export function getTheme() {
  // const theme = useSelector((state: any) => state.theme);
  return "dark";
}

export default ThemeToggler;
