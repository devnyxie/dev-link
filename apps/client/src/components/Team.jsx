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
  Avatar,
  Link as JoyUILink,
} from "@mui/joy";
import PropTypes from "prop-types";
import PositionedMenu from "./PositionedMenu";
import { GoHeart } from "react-icons/go";
import { GoCode } from "react-icons/go";
import { GoBookmark } from "react-icons/go";
import { PiUsersThree } from "react-icons/pi";
import { Link } from "react-router-dom";
import markdownToHtml from "./MarkdownToHTML";
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
    <Card sx={{ mb: 1, width: "100%" }} key={index}>
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography
          sx={{ fontSize: 14, display: "flex", alignItems: "start" }}
          color="neutral"
          gutterBottom
        >
          <IconButton sx={{ borderRadius: "50%", aspectRatio: 1 / 1, mr: 0.5 }}>
            <Avatar
              size="sm"
              color="neutral"
              variant="outlined"
              src={team.creator.pfp}
            />
          </IconButton>
          @{team.creator.username}
        </Typography>
        <Link to={`/team/${team.id}`}>
          <JoyUILink>
            <Typography level="title-md" component="div">
              {team.name}
            </Typography>
          </JoyUILink>
        </Link>

        <Box sx={{ mb: 1.5 }}>
          <Typography
            color="neutral"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              fontSize: "15px",
            }}
          >
            {team.description}
          </Typography>
        </Box>
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
          gap: 1,
        }}
      >
        <PiUsersThree size={20} s />
        <Typography level="title-xs">
          {team.takenRoles.length +
            "/" +
            (team.openRoles.length + team.takenRoles.length)}
        </Typography>
      </Box>

      {team.codeLangs.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
            }}
          >
            {" "}
            <GoCode size="20" />
            {team.codeLangs.map((lang, index) => {
              return (
                <div key={index}>
                  <Chip
                    color="primary"
                    variant="outlined"
                    onClick={() => console.log(lang.name)}
                  >
                    {lang.name}
                  </Chip>
                </div>
              );
            })}
          </Box>
        </>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default Team;
