import { Grid } from "@mui/material";
import Container from "./components/Container";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DemoPosts from "./components/DemoPosts";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Container>
      <Grid container spacing={1}>
        <Sidebar />
        <Grid item xs={12} md={8}>
          <Box className="pt-3" sx={{ borderColor: "secondary.main" }}>
            <DemoPosts />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
