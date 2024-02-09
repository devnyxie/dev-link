import React from "react";
import logoDark from "../assets/logo/logo-dark.svg";
import logoLight from "../assets/logo/logo-light.svg";
import { useColorScheme } from "@mui/joy";

function Logo() {
  const { mode } = useColorScheme();
  return (
    <>
      <img
        src={mode === "dark" ? logoDark : logoLight}
        alt="Logo"
        style={{ width: "100%" }}
      />
    </>
  );
}

export default Logo;
