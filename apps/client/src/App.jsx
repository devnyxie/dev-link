import { useState } from "react";
import Container from "./components/Container";
import { Avatar, Box, IconButton, Sheet } from "@mui/joy";
// import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Grid from "@mui/joy/Grid";
import SearchBar from "./components/SearchBar";
import ThemeToggler from "./components/ThemeToggler";
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
      <Container>
        <Navbar />
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
