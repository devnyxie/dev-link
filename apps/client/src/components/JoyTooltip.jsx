import React from "react";
import Box from "@mui/joy/Box";
import { Tooltip } from "@mui/joy";
import Button from "@mui/joy/Button";

function JoyTooltip({ title, children, direction = "bottom" }) {
  return (
    <Tooltip title={title} variant="soft" color="primary" placement={direction}>
      {children}
    </Tooltip>
  );
}

export default JoyTooltip;
