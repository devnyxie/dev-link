import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  ListItem,
  Typography,
} from "@mui/joy";
import React from "react";
import { GoBookmark } from "react-icons/go";
import { TbSend } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { createRequest } from "../../redux/slices/teams.slice";
import { useSelector } from "react-redux";

function OpenRoles({ team, setTeam, user, eligibleToJoin, timeSince }) {
  const teams = useSelector((state) => state.teams.teams);
  console.log(teams);
  const dispatch = useDispatch();
  function applyForRole(roleId) {
    console.log("Applying for role", roleId);
    dispatch(
      createRequest({ member_id: roleId, team_id: team.id, user_id: user.id })
    ).then((res) => {
      if (res.payload.data) {
        setTeam({
          ...team,
          openRoles: team.openRoles.map((role) =>
            role.id === roleId
              ? {
                  ...role,
                  requests: [...role.requests, res.payload.data],
                }
              : role
          ),
        });
      }
    });
  }
  return (
    <Box sx={{ p: 1 }}>
      {team.openRoles.length === 0 ? (
        <>
          {" "}
          <Box sx={{ textAlign: "center" }}>
            <Typography>No members</Typography>
          </Box>
        </>
      ) : (
        <>
          <Grid container spacing={1} sx={{ flexGrow: 1 }}>
            {team.openRoles.map((role) => {
              return (
                <Grid xs={12}>
                  <ListItem key={role.id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Box>
                        <Typography level="title-xs">{role.role}</Typography>
                        <Typography level="body-sm">
                          {role.requests.length} Request
                          {(role.requests.length > 1 && "s") ||
                            (role.requests.length == 0 && "s")}
                        </Typography>
                      </Box>

                      <Button
                        disabled={!eligibleToJoin}
                        size="sm"
                        color="primary"
                        onClick={() => applyForRole(role.id)}
                        endDecorator={<TbSend />}
                      >
                        Apply
                      </Button>
                    </Box>
                  </ListItem>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Box>
  );
}

export default OpenRoles;
