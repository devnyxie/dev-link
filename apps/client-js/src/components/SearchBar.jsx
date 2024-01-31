import { Box, InputAdornment } from "@mui/material";
import React from "react";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useTheme } from "@emotion/react";

function SearchBar() {
  const theme = useTheme();
  const style = {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main + "!important", // doesnt work
    },
  };
  return (
    <div
      className="pt-2 pb-2 "
      style={{
        zIndex: "2",
      }}
    >
      <TextField
        sx={style}
        id="outlined-basic"
        variant="outlined"
        placeholder="Search"
        className="w-100"
      />
    </div>
  );
}

export default SearchBar;
