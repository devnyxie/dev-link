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
  AvatarGroup,
} from "@mui/joy";
import PropTypes from "prop-types";
import PositionedMenu from "./PositionedMenu";
import { GoHeart } from "react-icons/go";
import { GoCode } from "react-icons/go";
import { GoBookmark } from "react-icons/go";
import { PiUsersThreeLight } from "react-icons/pi";

const Team = ({ team }) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography
          sx={{ fontSize: 14, display: "flex", alignItems: "start" }}
          color="neutral"
          gutterBottom
        >
          {/* <Avatar size="sm" sx={{ mr: 1 }} src={team.creator.pfp} /> */}@
          {team.creator.username}
        </Typography>
        <Typography level="h5" component="div">
          {team.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="neutral">
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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <PiUsersThreeLight size={20} style={{ marginRight: "8px" }} />
        <Typography color="primary" level="title-sm">
          {team.takenRoles.length +
            "/" +
            (team.openRoles.length + team.takenRoles.length)}
        </Typography>
      </Box>

      {team.codeLangs.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <GoCode size="20" style={{ marginRight: "8px" }} />
          {team.codeLangs.map((lang) => {
            console.log(lang);
            return (
              <Chip
                key={team}
                color="primary"
                variant="outlined"
                sx={{ mr: "3px" }}
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
      <Box
        className=""
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <AvatarGroup sx={{ flexDirection: "row-reverse" }}>
            {/* <Avatar>{members.length - 3}</Avatar> */}

            {/* <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
          </AvatarGroup>
        </div>
        <Box sx={{ display: "flex", justifyItems: "center" }}>
          <IconButton
            variant="plain"
            size="sm"
            color="primary"
            sx={{ marginRight: "5px" }}
          >
            <GoBookmark size={20} />
          </IconButton>
          <Button
            variant="plain"
            size="sm"
            className=""
            style={{ width: "max-content" }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
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
