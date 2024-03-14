import {
  Avatar,
  ListItem,
  ListItemDecorator,
  Link as JoyUILink,
  Typography,
} from "@mui/joy";
import React from "react";
import { Link } from "react-router-dom";

function UserListItem({ user }) {
  return (
    <>
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src={user.pfp} />
        </ListItemDecorator>
        <Link to={`/${user.username}`}>
          <Typography level="title-xs">
            <JoyUILink>{user.username}</JoyUILink>
          </Typography>
        </Link>
      </ListItem>
    </>
  );
}

export default UserListItem;
