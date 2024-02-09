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
import { PiUsersThree } from "react-icons/pi";
import { Link } from "react-router-dom";
import TechnologyIcon from "./TechnologyIcon";
const Team = ({ team, loading, index }) => {
  if (loading) {
    return (
      <Card sx={{ mb: 1 }} key={index}>
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
    <Card sx={{ mb: 1 }} key={index}>
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
          {/* <PositionedMenu /> */}
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
        <PiUsersThree size={20} style={{ marginRight: "8px" }} />
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
          <Box
            role="group"
            aria-labelledby="fav-movie"
            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
          >
            {" "}
            {team.codeLangs.map((lang, index) => {
              return (
                <div key={index}>
                  <Chip
                    color="primary"
                    variant="outlined"
                    onClick={() => console.log(lang.name)}
                  >
                    {TechnologyIcon({ technology: lang.name })}
                    {lang.name}
                  </Chip>
                </div>
              );
            })}
          </Box>
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
            disabled
            variant="plain"
            size="sm"
            color="primary"
            sx={{ marginRight: "5px" }}
          >
            <GoBookmark size={20} />
          </IconButton>
          <Link to={`/team/${team.id}`}>
            <Button
              variant="plain"
              size="sm"
              className=""
              style={{ width: "max-content" }}
            >
              Learn More
            </Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default Team;
