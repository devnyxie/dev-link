import { useState } from "react";
import Container from "./components/Container";
import { Avatar, Box, IconButton, Sheet } from "@mui/joy";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Grid from "@mui/joy/Grid";
import SearchBar from "./components/SearchBar";
import ThemeToggler from "./components/ThemeToggler";
import { FavoriteBorder } from "@mui/icons-material";
import Navbar from "./components/Navbar";

function App() {
  {
    /* <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              mt: 2,
              borderRadius: "var(--joy-radius-sm)",
            }}
          >
            <Feed />
          </Box>
        </Grid>
        <Sidebar />
      </Grid> */
  }
  return (
    <>
      <Navbar />
      {/* <Sheet
        sx={{
          p: "6px",
          px: 2,
          borderRight: 0,
          borderLeft: 0,
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
        variant="outlined"
        id="navbar"
        className="w-100 sticky-top"
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: "8px",
              height: "var(--joy-size-1)",
            }}
            className="d-flex"
          >
            <SearchBar />
            <Avatar variant="outlined" onClick={() => console.log("Avatar")} />
          </Box>
        </Container>
      </Sheet> */}
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Feed />
        </Box>
      </Container>
    </>
  );
}

export default App;
