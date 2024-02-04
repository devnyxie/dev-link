import React from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Button,
  AspectRatio,
  Divider,
  Chip,
  Box,
  Skeleton,
} from "@mui/joy";
import PropTypes from "prop-types";
import PositionedMenu from "./PositionedMenu";
import { GoHeart } from "react-icons/go";
import { GoCode } from "react-icons/go";
import { GoBookmark } from "react-icons/go";
import { PiUsersThreeLight } from "react-icons/pi";

const Team = ({ team, loading }) => {
  if (loading) {
    return (
      <Card sx={{ mb: 1 }}>
        <CardContent style={{ paddingBottom: 0 }}>
          <AspectRatio ratio={10 / 1} sx={{ width: "30%" }}>
            <Skeleton variant="overlay"></Skeleton>
          </AspectRatio>
          <AspectRatio ratio={18 / 1} sx={{ width: "60%" }}>
            <Skeleton variant="overlay"></Skeleton>
          </AspectRatio>
          <AspectRatio ratio={20 / 2} sx={{ width: "100%" }}>
            <Skeleton variant="overlay"></Skeleton>
          </AspectRatio>
          <AspectRatio ratio={7 / 1} sx={{ width: "30%" }}>
            <Skeleton variant="overlay"></Skeleton>
          </AspectRatio>
          <AspectRatio ratio={8 / 1} sx={{ width: "40%" }}>
            <Skeleton variant="overlay"></Skeleton>
          </AspectRatio>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <AspectRatio ratio={4 / 1} sx={{ width: "150px" }}>
            <Skeleton variant="overlay"></Skeleton>
          </AspectRatio>
        </Box>
      </Card>
    );
  }
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
        <Typography level="title-xs">
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
        <div></div>
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

export default Team;
