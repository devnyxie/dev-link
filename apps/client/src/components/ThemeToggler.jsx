import React from "react";
import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Sheet } from "@mui/joy";
function ThemeToggler() {
  const { mode, setMode } = useColorScheme();

  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "var(--joy-radius-sm)",
        marginLeft: "5px",
        overflow: "hidden",
      }}
    >
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        sx={{
          padding: "5px",
          aspectRatio: "1/1",
          backgroundColor: "transparent",
          border: "none",
          flexGrow: 1,
          maxWidth: "40px",
          borderRadius: 0,
        }}
      >
        {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </Button>
      {/* <Dropdown>
        <MenuButton>
          {mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </MenuButton>
        <Menu>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Dropdown> */}
    </Sheet>
  );
}

export default ThemeToggler;
