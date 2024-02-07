import {
  Typography,
  IconButton,
  Divider,
  Button,
  Chip,
  Box,
  List,
  ListItem,
  ListItemDecorator,
  ListDivider,
  Avatar,
  Sheet,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  ListItemButton,
  Grid,
  Card,
  CardContent,
  Stack,
  Slider,
  CardActions,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { GoCode, GoBookmark, GoBook } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { findTeamById } from "../../redux/slices/teams.slice";
import React from "react";
import { tabClasses } from "@mui/joy/Tab";
import { TbSend } from "react-icons/tb";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/user.slice";

const TeamView = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { teamId } = useParams();
  const [eligibleToJoin, setEligibleToJoin] = useState(false);

  const [team, setTeam] = useState(undefined);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(findTeamById(teamId))
      .then((response) => {
        setTeam(response.payload);
      })
      .catch((error) => {
        console.error("Failed to fetch team:", error);
      });
  }, []);

  useEffect(() => {
    if (team && user) {
      const isMember = team.takenRoles.some((role) => role.user.id === user.id);
      setEligibleToJoin(!isMember);
    } else {
      setEligibleToJoin(false);
    }
  }, [team, user]);

  if (!team) {
    return null; // or loading indicator
  }

  console.log(eligibleToJoin);
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
        overflowX: "hidden",
      }}
      className="fade-in"
    >
      <Tabs
        value={index}
        onChange={(event, value) => setIndex(value)}
        sx={{
          backgroundColor: "transparent",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <TabList
          disableUnderline
          sx={{
            pt: 1,
            width: "max-content",
            backgroundColor: "transparent",
            justifyContent: "center",
            [`&& .${tabClasses.root}`]: {
              flex: "initial",
              [`&.${tabClasses.selected}`]: {
                color: "primary.plainColor",
                "&::after": {
                  height: 2,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  bgcolor: "primary.500",
                },
              },
            },
          }}
        >
          <Tab indicatorInset>Info</Tab>
          <Tab indicatorInset>Members</Tab>
          <Tab indicatorInset disabled>
            Settings
          </Tab>
        </TabList>
        <Sheet variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
          <TabPanel value={0}>
            {" "}
            <Typography level="title-md" sx={{ mb: 2 }}>
              {team.name}
            </Typography>
            {team.description ? (
              <>
                {" "}
                <Stack spacing={1} sx={{ fontSize: "sm", mb: 2, mt: 1 }}>
                  <Divider sx={{ "--Divider-childPosition": `50%` }}>
                    About
                  </Divider>
                </Stack>
                <Typography>{team.description}</Typography>
              </>
            ) : (
              <></>
            )}
          </TabPanel>
          <TabPanel value={1}>
            <Stack spacing={1} sx={{ fontSize: "sm", mb: 2, mt: 1 }}>
              <Divider sx={{ "--Divider-childPosition": `50%` }}>
                Members
              </Divider>
            </Stack>
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
                    return (
                      <ListItem key={role.user.id}>
                        <ListItemButton sx={{ borderRadius: "sm" }}>
                          <ListItemDecorator sx={{ mr: 0.2 }}>
                            <Avatar size="md" src={role.user.pfp} />
                          </ListItemDecorator>
                          <Typography>
                            @{role.user.username} <Typography>as</Typography>{" "}
                            <Typography level="title-md">
                              {role.role}
                            </Typography>
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </>
              )}
            </List>

            <Stack spacing={1} sx={{ fontSize: "sm", mb: 2, mt: 1 }}>
              <Divider sx={{ "--Divider-childPosition": `50%` }}>
                Open Roles
              </Divider>
            </Stack>

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
                      <Grid key={role.id} xs={12} sm={6} md={4}>
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
                            sx={{ display: "flex", justifyContent: "end" }}
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
          </TabPanel>
          <TabPanel value={2}>Lorem</TabPanel>
        </Sheet>
      </Tabs>
    </Box>
  );
};

export default TeamView;
