import {
  ListItem,
  ListItemDecorator,
  Typography,
  Link as JoyUILink,
} from "@mui/joy";
import React from "react";
import { PiUsersThree } from "react-icons/pi";
import { Link } from "react-router-dom";

function TeamListItem({ team }) {
  return (
    <>
      <ListItem>
        <ListItemDecorator>
          <PiUsersThree size={20} />
        </ListItemDecorator>
        <Link to={`/team/${team.id}`}>
          <Typography level="title-xs">
            <JoyUILink>
              {team.creator.username}/{team.name}
            </JoyUILink>
          </Typography>
        </Link>
      </ListItem>
    </>
  );
}

export default TeamListItem;
