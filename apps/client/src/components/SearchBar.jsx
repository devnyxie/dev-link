import React from "react";
import { Textarea } from "@mui/joy";

function SearchBar() {
  // const style = {
  //   "&:hover fieldset": {
  //     borderColor: theme.palette.primary.main + "!important", // doesnt work
  //   },
  // };
  return (
    <div
      style={{
        zIndex: "2",
        flexGrow: 1,
      }}
    >
      <Textarea
        name="Neutral"
        placeholder="Type in here…"
        variant="outlined"
        color="neutral"
      />
    </div>
  );
}

export default SearchBar;
