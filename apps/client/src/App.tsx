import { Grid } from "@mui/material";
import Container from "./components/Container";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DemoPosts from "./components/DemoPosts";
import SearchBar from "./components/SearchBar";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";
// import InboxIcon from "@mui/icons-material/Inbox";
// import DraftsIcon from "@mui/icons-material/Drafts";

function App() {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <div className="sticky-top pt-2">
            <Box className="widget p-2" sx={{ borderColor: "secondary.main" }}>
              <Box
                className="widget p-2 text-monospace terminal-green"
                sx={{ borderColor: "secondary.main" }}
              >
                dev-link$~
              </Box>
            </Box>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box className="" sx={{ borderColor: "secondary.main" }}>
            <SearchBar />
            <DemoPosts />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
