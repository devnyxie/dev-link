import React from "react";
import { Textarea } from "@mui/joy";

function SearchBar() {
  return (
    <div
      style={{
        zIndex: "2",
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
