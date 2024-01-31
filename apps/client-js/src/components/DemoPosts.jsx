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
} from "@mui/joy";

import React from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import { FavoriteBorder, FavoriteBorderOutlined } from "@mui/icons-material";
import PositionedMenu from "./PositionedMenu";
import { Pagination } from "@mui/material";

function DemoPosts() {
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
      <Divider />
      <CardContent style={{ padding: 0 }}>
        <List
          dense={true}
          orientation="horizontal"
          // variant="outlined"
          sx={{
            flexGrow: 0,
            mx: "auto",
          }}
          className=""
        >
          {["Capacity", "Communication", "Language"].map((itemName) => {
            let icon;
            let text;
            switch (itemName) {
              case "Capacity":
                icon = <GroupIcon />;
                text = "0/5";
                break;
              case "Communication":
                icon = <ForumIcon />;
                text = "WeChat";
                break;
              case "Language":
                icon = <TranslateIcon />;
                text = "English, Chinese";
                break;
              default:
                text = "...";
                break;
            }
            return (
              // <ListItem key={itemName}>
              //   {icon && <ListItemDecorator>{icon}</ListItemDecorator>}
              //   <ListItemContent>{text}</ListItemContent>
              // </ListItem>
              <ListItem>
                <ListItemDecorator>{icon}</ListItemDecorator>
                {text}
              </ListItem>
            );
          })}
        </List>
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
        <Card variant="outlined" className="mb-2">
          {card}
        </Card>
      );
    }

    return posts;
  };

  return (
    <>
      {renderPosts()}
      <Pagination count={10} variant="outlined" />
    </>
  );
}

export default DemoPosts;
