import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/joy";
import React from "react";
import { GoBookmark } from "react-icons/go";
import { TbSend } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { createRequest } from "../../redux/slices/teams.slice";
import { useSelector } from "react-redux";

function OpenRoles({ team, setTeam, user, eligibleToJoin }) {
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
                <Grid key={role.id} xs={12} sm={6} md={6}>
                  <Card variant="outlined" orientation="vertical">
                    <CardContent sx={{ display: "flex" }}>
                      <Typography
                        level="title-sm"
                        id="card-description"
                        noWrap={true}
                        sx={{ width: "220px" }}
                      >
                        {role.role}
                      </Typography>
                      <Chip
                        variant="outlined"
                        color="primary"
                        size="sm"
                        sx={{ pointerEvents: "none", mt: 1 }}
                      >
                        {role.requests.length} Requests
                      </Chip>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <IconButton
                        disabled={!eligibleToJoin}
                        size="sm"
                        variant="outlined"
                        color="primary"
                      >
                        <GoBookmark size={20} />
                      </IconButton>

                      <Button
                        disabled={!eligibleToJoin}
                        size="sm"
                        endDecorator={<TbSend />}
                        variant="outlined"
                        color="primary"
                        onClick={() => applyForRole(role.id)}
                      >
                        Apply
                      </Button>
                    </CardActions>
                  </Card>
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
