import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
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
      </CardContent>
      <Divider />
      <CardContent style={{ padding: 0 }}>
        <List dense={true}>
          {["Capacity", "Communication", "Language"].map((itemName) => {
            let Icon: JSX.Element | undefined;
            let text: string | "...";
            switch (itemName) {
              case "Capacity":
                Icon = <GroupIcon />;
                text = "0/5";
                break;
              case "Communication":
                Icon = <ForumIcon />;
                text = "WeChat";
                break;
              case "Language":
                Icon = <TranslateIcon />;
                text = "English, Chinese";
                break;
              default:
                text = "...";
                break;
            }
            return (
              <ListItem key={itemName}>
                {Icon && <ListItemIcon>{Icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="small" style={{ textTransform: "none" }}>
          Learn More
        </Button>
      </CardActions>
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

  return <>{renderPosts()}</>;
}

export default DemoPosts;
