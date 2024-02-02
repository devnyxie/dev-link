import React from "react";
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
  Avatar,
  Box,
} from "@mui/joy";
import PropTypes from "prop-types";
import PositionedMenu from "./PositionedMenu";
import { FavoriteBorder } from "@mui/icons-material";
import TranslateIcon from "@mui/icons-material/Translate";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

const Team = ({ team }) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography
          sx={{ fontSize: 14, display: "flex", alignItems: "start" }}
          color="text.secondary"
          gutterBottom
        >
          <Avatar size="sm" sx={{ mr: 1 }} src={team.creator.pfp} />

          {team.creator.username}
        </Typography>
        <Typography variant="h5" component="div">
          {team.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {team.description}
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
      {/* <CardContent style={{ padding: 0 }}>
                <Grid container spacing={2} sx={{ display: "flex" }}>
                                        {team.items.map((item) => {
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
                                                switch (item.name) {
                                                        case "Capacity":
                                                                icon = <GroupIcon />;
                                                                content = item.value;
                                                                break;
                                                        case "Communication":
                                                                icon = <ForumIcon />;
                                                                content = item.value;
                                                                break;
                                                        case "Language":
                                                                icon = <TranslateIcon />;
                                                                content = item.value;
                                                                break;
                                                        default:
                                                                content = "?";
                                                                break;
                                                }
                                                return (
                                                        <Grid
                                                                key={item.name}
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
            </CardContent> */}
      {team.codeLangs.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            alignItems: "start",
          }}
        >
          <CodeOutlinedIcon sx={{ mr: 1 }} />
          {team.codeLangs.map((lang) => {
            console.log(lang);
            return (
              <Chip
                key={team}
                color="primary"
                variant="outlined"
                sx={{ mr: "3px", mb: "3px" }}
                onClick={() => console.log(lang.name)}
              >
                {lang.name}
              </Chip>
            );
          })}
        </Box>
      ) : (
        <></>
      )}

      <Divider />
      <div className="w-100 d-flex" style={{ justifyContent: "end" }}>
        <IconButton
          variant="plain"
          //   variant="plain"
          size="sm"
          color="primary"
          sx={{ marginRight: "5px" }}
        >
          <FavoriteBorder style={{ fontSize: "20px" }} />
        </IconButton>
        <Button
          variant="plain"
          size="sm"
          className=""
          style={{ width: "max-content" }}
        >
          Learn More
        </Button>
      </div>
    </Card>
  );
};

// Team.propTypes = {
//   team: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     items: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         value: PropTypes.oneOfType([
//           PropTypes.string,
//           PropTypes.arrayOf(PropTypes.string),
//         ]).isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

export default Team;
