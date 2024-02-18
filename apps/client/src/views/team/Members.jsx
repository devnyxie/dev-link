import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import React from "react";

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
                  <ListItemButton sx={{ borderRadius: "sm" }}>
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
                      <Typography>
                        @{role.user.username} <Typography>as</Typography>{" "}
                        <Typography level="title-md">{role.role}</Typography>
                      </Typography>

                      <Typography sx={{ fontSize: 13 }}>
                        Member since {timeSince(role.createdAt)}
                      </Typography>
                    </Box>
                  </ListItemButton>
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
