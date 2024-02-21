import React from "react";
import { ListItem, Avatar, Typography, IconButton } from "@mui/joy";

const UserListItem = ({ user }) => {
  console.log("user", user);

  return (
    <ListItem
      variant="outlined"
      sx={{ gap: 1, width: "100%", borderRadius: "sm" }}
    >
      <IconButton sx={{ borderRadius: "50%", aspectRatio: 1 / 1 }}>
        <Avatar src={user.pfp} alt={user.username} />
      </IconButton>

      <Typography>{user.username}</Typography>
    </ListItem>
  );
};

export default UserListItem;
