import React from "react";
import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";
import { Box, Sheet } from "@mui/joy";
function ThemeToggler() {
  const { mode, setMode } = useColorScheme();

  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      sx={{
        padding: "5px",
        aspectRatio: "1/1",
        flexGrow: 1,
        borderRadius: "var(--joy-radius-sm)",
      }}
    >
      {mode === "dark" ? <GoSun size={18} /> : <GoMoon size={18} />}
    </Button>
  );
}

export default ThemeToggler;
