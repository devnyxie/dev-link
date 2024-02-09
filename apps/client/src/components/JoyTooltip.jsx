import React from "react";
import Box from "@mui/joy/Box";
import { Tooltip } from "@mui/joy";
import Button from "@mui/joy/Button";

function JoyTooltip({ title, children }) {
  return (
    <Tooltip arrow title={title} variant="outlined">
      {children}
    </Tooltip>
  );
}

export default JoyTooltip;
