import { Box, InputAdornment } from "@mui/material";
import React from "react";
import { alpha, styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { themeOptions } from "./Theme";

export const RedditTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  fieldset: {
    borderColor: themeOptions.palette.primary.main,
  },
  "&:hover fieldset": {
    //borderColor: "green!important" // works
    borderColor: themeOptions.palette.primary.light + "!important", // doesnt work
  },
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "transparent",
    border: "1px solid ",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",

    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    },
    "&.Mui-focused": {
      backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    },
  },
}));

//Styles for an input (disables the annoying hover border)
const style = {
  // fieldset: {
  //   borderColor: themeOptions.palette.primary.main,
  // },
  "&:hover fieldset": {
    borderColor: themeOptions.palette.primary.main + "!important", // doesnt work
  },
};

function SearchBar() {
  return (
    <div
      className="pt-2 pb-2 "
      style={{
        zIndex: "2",
      }}
    >
      {/* <RedditTextField
        label="Search"
        // placeholder="Search"
        className="w-100"
        variant="filled"
        style={{ marginTop: 0 }}
      /> */}
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
