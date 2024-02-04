import {
  Box,
  Button,
  IconButton,
  Sheet,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/joy";
import React, { version } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function SvgComponent({ textColor }) {
  return (
    <>
      <Logo />
    </>
  );
}

function LogoTerminal() {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", height: "100%" }}
      className="monospace"
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          variant="outlined"
          sx={{
            p: 0,
            height: "36px",
            aspectRatio: 1 / 1,
          }}
        >
          <SvgComponent textColor={textColor} />
        </IconButton>
      </Link>
      <Typography
        level="h4"
        sx={{
          width: "max-content",
          whiteSpace: "nowrap",
          ml: 1,
          fontWeight: "400",
          userSelect: "none",
        }}
      >
        Dev-Link
      </Typography>
    </Box>
  );
}

export default LogoTerminal;
