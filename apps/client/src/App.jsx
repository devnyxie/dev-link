import { useState } from "react";
import Container from "./components/Container";
import { Box, Sheet } from "@mui/joy";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Grid from "@mui/joy/Grid";
import SearchBar from "./components/SearchBar";
import ThemeToggler from "./components/ThemeToggler";

function App() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Box
            // sx={{ p: 1, borderRadius: "var(--joy-radius-sm)" }}
            sx={{
              mt: 2,
              borderRadius: "var(--joy-radius-sm)",
            }}
          >
            <Box className="d-flex" sx={{ pb: 1 }}>
              <SearchBar />
              <ThemeToggler />
            </Box>
            <Feed />
          </Box>
        </Grid>
        <Sidebar />
      </Grid>
    </>
  );
}

export default App;
