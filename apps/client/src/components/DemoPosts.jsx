import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Button,
  AspectRatio,
  Divider,
  List,
  ListItem,
  CardActions,
  ListItemDecorator,
  ListItemContent,
  Grid,
  Sheet,
  Chip,
} from "@mui/joy";

import React, { useEffect } from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import { FavoriteBorder, FavoriteBorderOutlined } from "@mui/icons-material";
import PositionedMenu from "./PositionedMenu";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTeam } from "../redux/slices/teams.slice";

function DemoPosts() {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.teams);
  console.log("change");
  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const card = (
    <React.Fragment>
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          @joecole
        </Typography>
        <Typography variant="h5" component="div">
          JavaScript Socket Projects: Practice
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          🌟 Join Our Dynamic JavaScript Socket Projects Team! 🌟 Are you
          passionate about JavaScript and eager to enhance your skills in socket
          programming? Look no further!
        </Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
        >
          <PositionedMenu />
        </IconButton>
      </CardContent>
      {/* <Divider /> */}
      <CardContent style={{ padding: 0 }}>
        <Grid container spacing={2} sx={{ display: "flex" }}>
          {["Capacity", "Communication", "Language"].map((itemName) => {
            let icon;
            let content;
            function renderText() {
              if (Array.isArray(content)) {
                let chips = [];
                content.forEach((element) => {
                  console.log(element);
                  chips.push(
                    <Chip
                      key={element}
                      color="primary"
                      variant="outlined"
                      sx={{ mr: "3px", mb: "3px" }}
                    >
                      {element}
                    </Chip>
                  );
                });
                return chips;
              } else {
                return content;
              }
            }
            switch (itemName) {
              case "Capacity":
                icon = <GroupIcon />;
                content = "0/5";
                break;
              case "Communication":
                icon = <ForumIcon />;
                content = ["WeChat", "Discord"];
                break;
              case "Language":
                icon = <TranslateIcon />;
                content = ["English", "Chinese"];
                break;
              default:
                content = "?";
                break;
            }
            return (
              <Grid
                key={itemName}
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                  {icon}
                </Box>
                {renderText()}
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <Divider />
      <div className="w-100 d-flex" style={{ justifyContent: "end" }}>
        <IconButton
          // variant="outlined"
          variant="plain"
          color="primary"
          sx={{ marginRight: "5px" }}
        >
          <FavoriteBorder style={{ fontSize: "20px" }} />
        </IconButton>
        <Button
          variant="outlined"
          className=""
          style={{ width: "max-content" }}
        >
          Learn More
        </Button>
      </div>
    </React.Fragment>
  );
  const renderPosts = () => {
    const posts = [];

    for (let i = 0; i < 20; i++) {
      posts.push(
        <Card key={i} variant="outlined" className="mb-2">
          {card}
        </Card>
      );
    }

    return posts;
  };

  return <>{renderPosts()}</>;
}

export default DemoPosts;
