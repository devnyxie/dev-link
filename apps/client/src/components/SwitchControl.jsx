import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Switch from "@mui/joy/Switch";
import { Box } from "@mui/joy";

export default function SwitchControl({ text, helperText }) {
  const [checked, setChecked] = React.useState(false);
  return (
    <FormControl
      orientation="horizontal"
      sx={{ width: "max-content", justifyContent: "space-between" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <FormLabel>{text}</FormLabel>
        {helperText ? (
          <FormHelperText sx={{ mt: 0 }}>{helperText}</FormHelperText>
        ) : (
          <></>
        )}
      </Box>
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        color={checked ? "success" : "neutral"}
        variant={checked ? "solid" : "outlined"}
        endDecorator={checked ? "On" : "Off"}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
  );
}
