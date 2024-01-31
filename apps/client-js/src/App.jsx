import { useState } from "react";
import Container from "./components/Container";
import { Box } from "@mui/joy";
import Sidebar from "./components/Sidebar";
import DemoPosts from "./components/DemoPosts";
import Grid from "@mui/joy/Grid";
function App() {
  return (
    <>
      <Grid container spacing={1}>
        <Sidebar />
        <Grid item xs={12} md={8}>
          <Box className="pt-3" sx={{ borderColor: "secondary.main" }}>
            <DemoPosts />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
