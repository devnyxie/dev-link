import { Link, Sheet, Typography } from "@mui/joy";
import React from "react";
import { FaGithub } from "react-icons/fa";
function Footer() {
  return (
    <Sheet
      variant="outlined"
      sx={{ mb: 1, p: 1, borderRadius: "var(--joy-radius-sm)" }}
      className="w-100 mt-1"
      style={{ textAlign: "center" }}
    >
      <Typography sx={{ fontSize: 12 }}>© 2024 Dev-Link</Typography>
      <Typography
        sx={{
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Give us a star on&nbsp;<Link underline="hover">GitHub</Link>&nbsp;
        <FaGithub />
      </Typography>
    </Sheet>
  );
}

export default Footer;
