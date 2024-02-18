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

function OpenRoles({ team, eligibleToJoin }) {
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
