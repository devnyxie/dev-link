import { Box } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <div
      className="pt-2 pb-2"
      style={{
        zIndex: "2",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <Box
        className="widget p-2 w-100"
        sx={{ borderColor: "secondary.main" }}
        style={{ display: "inline-block" }}
      >
        <SearchIcon className="mr-2" /> Search
      </Box>
      {/* <Box
        className="widget"
        sx={{ borderColor: "secondary.main" }}
        style={{
          display: "inline-block",
        }}
      >
        <NotificationsIcon
          style={{ width: "25px", height: "auto", aspectRatio: "1/1" }}
        />
      </Box> */}
    </div>
  );
}

export default SearchBar;
