import { useState } from "react";
import Container from "./components/Container";
import { Box } from "@mui/joy";
import Sidebar from "./components/Sidebar";
import DemoPosts from "./components/DemoPosts";
import Grid from "@mui/joy/Grid";
import SearchBar from "./components/SearchBar";
import ThemeToggler from "./components/ThemeToggler";

function App() {
  return (
    <>
      <Grid container spacing={1}>
        <Sidebar />
        <Grid item xs={12} md={8}>
          <Box className="pt-3" sx={{ borderColor: "secondary.main" }}>
            <Box className="d-flex" sx={{ pb: 1 }}>
              <SearchBar />
              <ThemeToggler />
            </Box>
            <DemoPosts />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
