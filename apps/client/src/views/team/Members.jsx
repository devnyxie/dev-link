import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Typography,
  Link as JoyLink,
} from "@mui/joy";
import React from "react";
import { Link } from "react-router-dom";

function Members({ team, timeSince }) {
  return (
    <>
      <List
        sx={{
          borderRadius: "sm",
        }}
      >
        {team.takenRoles.length === 0 ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography>No members</Typography>
          </Box>
        ) : (
          <>
            {team.takenRoles.map((role) => {
              console.log(role);
              return (
                <ListItem key={role.user.id}>
                  <ListItemDecorator sx={{ mr: 0.2 }}>
                    <Avatar size="md" src={role.user.pfp} />
                  </ListItemDecorator>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Link to={`/profile/${role.user.username}`}>
                        <JoyLink>{role.user.username}</JoyLink>
                      </Link>
                      <Typography level="body-sm">as {role.role}</Typography>
                    </Box>

                    <Typography sx={{ fontSize: 13 }}>
                      Member since {timeSince(role.createdAt)}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })}
          </>
        )}
      </List>
    </>
  );
}

export default Members;
