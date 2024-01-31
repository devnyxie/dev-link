import { Box, Button, Grid } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import TuneIcon from "@mui/icons-material/Tune";
import SearchBar, { RedditTextField } from "./SearchBar";
import { themeOptions } from "./Theme";
import ThemeToggler from "./ThemeToggler";

function Sidebar() {
  const buttons = [
    { icon: <NotificationsIcon />, label: "Notifications" },
    { icon: <BookmarksIcon />, label: "Bookmarks" },
    { icon: <TuneIcon />, label: "Settings" },
  ];

  return (
    <Grid item xs={12} md={4}>
      <div className="sticky-top pt-3">
        <Box className="" sx={{ border: "1px solid secondary" }}>
          <Box
            className="p-2"
            sx={{
              // border: "1px solid secondary",
              // color: "white",
              borderRadius: "4px",
              border: `1px solid ${themeOptions.palette.primary.main}`,
              // backgroundColor: themeOptions.palette.primary.dark,
            }}
          >
            <span>dev-link$~/home</span>
          </Box>
          <SearchBar />
          {/* --------------- */}
          {buttons.map((button) => {
            return (
              <Button
                className="w-100"
                color="primary"
                startIcon={button.icon}
                style={{ justifyContent: "start", textTransform: "none" }}
                sx={{
                  // color: themeOptions.palette.primary.contrastText,
                  ":hover": {
                    bgcolor: themeOptions.palette.primary.dark,
                    // bgcolor: "transparent",
                    // border: "1px solid " + themeOptions.palette.primary.dark,
                    // color: "white",
                  },
                }}
              >
                {button.label}
              </Button>
            );
          })}
        </Box>
      </div>
    </Grid>
  );
}

export default Sidebar;
