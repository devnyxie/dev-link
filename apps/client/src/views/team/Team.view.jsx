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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionGroup,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { GoCode, GoBookmark, GoBook } from "react-icons/go";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findTeamById } from "../../redux/slices/teams.slice";
import React from "react";
import { tabClasses } from "@mui/joy/Tab";
import { TbSend } from "react-icons/tb";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/user.slice";
import markdownToHtml from "../../components/MarkdownToHTML";
import OpenRoles from "./OpenRoles";
import Members from "./Members";
import { PiUsersThree } from "react-icons/pi";
import { timeFormatter } from "../../utils/utils";
import TechChip from "../../components/TechChip";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";

const DetailsBlock = ({ team, sx }) => {
  return (
    <Grid item xs={12} md={4} lg={4} sx={sx}>
      <Typography
        level="title-md"
        sx={{ mb: 1, display: { xs: "none", md: "block" } }}
      >
        Description
      </Typography>
      {team.description ? (
        <>
          <Typography>{team.description}</Typography>
        </>
      ) : (
        <>
          <Typography color="neutral">No description</Typography>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ mt: 2 }}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="neutral"
          >
            <PiUsersThree size={20} style={{ marginRight: "10px" }} />
            <Typography>
              {team.takenRoles.length +
                "/" +
                (team.openRoles.length + team.takenRoles.length)}
            </Typography>
          </Typography>
        </Stack>
      </Box>

      <>
        {team.codeLangs.length > 0 ? (
          <>
            <Divider sx={{ mb: 2, mt: 2 }} />{" "}
            <Typography
              level="title-md"
              sx={{ mb: 1, display: { xs: "none", md: "block" } }}
            >
              Stack
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {" "}
                {team.codeLangs.map((lang, index) => {
                  return (
                    <div key={index}>
                      <TechChip
                        techName={lang.name}
                        onClick={(e) => console.log(e)}
                      />
                    </div>
                  );
                })}
              </Box>
            </Box>
          </>
        ) : (
          <> </>
        )}
      </>
    </Grid>
  );
};

const TeamView = () => {
  const teams = useSelector((state) => state.teams.teams);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { teamId } = useParams();
  const [eligibleToJoin, setEligibleToJoin] = useState(false);
  const [team, setTeam] = useState(undefined);
  const [index, setIndex] = useState(0);
  const [membersAccordion, setMembersAccordion] = useState(true);
  const [openRolesAccordion, setOpenRolesAccordion] = useState(true);

  useEffect(() => {
    dispatch(findTeamById(teamId))
      .then((response) => {
        setTeam(response.payload);
      })
      .catch((error) => {
        console.error("Failed to fetch team:", error);
      });
  }, [teams]);

  useEffect(() => {
    if (team && user) {
      const isMember = team.takenRoles.some((role) => role.user.id === user.id);
      const isAlreadyRequested = team.openRoles.some((role) =>
        role.requests.some((request) => request.user.id === user.id)
      );
      if (isAlreadyRequested || isMember) {
        setEligibleToJoin(false);
      } else {
        setEligibleToJoin(true);
      }
    } else {
      setEligibleToJoin(false);
    }
    console.log(eligibleToJoin);
  }, [team, user]);

  if (!team) {
    return null;
  }
  return (
    <Box className="fade-in" sx={{ width: "100%" }}>
      {/* TOP BAR */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton style={{ borderRadius: "50%", aspectRatio: 1 / 1 }} props>
            <Avatar
              color="neutral"
              variant="outlined"
              src={team.creator.pfp}
              sx={{ height: "36px", width: " 36px" }}
            />
          </IconButton>
          <Typography level="h4" sx={{ ml: 1 }}>
            {team.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="sm" disabled>
            <GoBookmark size={20} />
          </IconButton>
          {user && user.id === team.creator_id ? (
            <Link to={`/team/${team.id}/settings/general`}>
              <Button
                size="sm"
                variant="plain"
                color="neutral"
                startDecorator={<IoSettingsOutline size={20} />}
                sx={{}}
              >
                Settings
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />

      <Grid container spacing={2} sx={{ flexGrow: 1, pt: 1 }}>
        {/* DESCRIPTION <md */}
        <DetailsBlock
          team={team}
          sx={{ display: { xs: "block", md: "none" } }}
        />
        {/* MEMBERS, OPEN ROLES, MD */}
        <Grid item xs={12} md={8} lg={8}>
          <Sheet
            variant="outlined"
            sx={{ borderRadius: "sm", overflow: "hidden", mb: 2 }}
          >
            <Tabs
              aria-label="Pipeline"
              value={index}
              onChange={(event, value) => setIndex(value)}
            >
              <TabList
                sx={{
                  pt: 1,
                  px: 1.5,
                  borderRadius: "0",

                  [`&& .${tabClasses.root}`]: {
                    flex: "initial",
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                    [`&.${tabClasses.selected}`]: {
                      color: "primary.plainColor",
                      "&::after": {
                        height: 2,
                        // borderTopLeftRadius: 3,
                        // borderTopRightRadius: 3,
                        bgcolor: "primary.500",
                      },
                    },
                  },
                }}
              >
                <Tab indicatorInset>Overview</Tab>
              </TabList>
              <Box>
                <TabPanel value={0}>
                  {/* Members */}
                  <AccordionGroup sx={{ borderRadius: 0 }}>
                    <Accordion
                      expanded={membersAccordion}
                      onChange={(event, expanded) => {
                        setMembersAccordion(expanded ? expanded : false);
                      }}
                    >
                      <AccordionSummary>Members</AccordionSummary>
                      <AccordionDetails>
                        <Members team={team} timeSince={timeFormatter} />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={openRolesAccordion}
                      onChange={(event, expanded) => {
                        setOpenRolesAccordion(expanded ? expanded : false);
                      }}
                    >
                      <AccordionSummary>Open Roles</AccordionSummary>
                      <AccordionDetails>
                        <OpenRoles
                          user={user}
                          team={team}
                          setTeam={setTeam}
                          eligibleToJoin={eligibleToJoin}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </AccordionGroup>
                </TabPanel>
              </Box>
            </Tabs>
          </Sheet>
          {team.README ? (
            <>
              <Sheet
                variant="outlined"
                sx={{ borderRadius: "sm", overflow: "hidden" }}
              >
                <Tabs
                  aria-label="Pipeline"
                  value={index}
                  onChange={(event, value) => setIndex(value)}
                >
                  <TabList
                    sx={{
                      pt: 1,
                      px: 1.5,
                      borderRadius: "0",

                      [`&& .${tabClasses.root}`]: {
                        flex: "initial",
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "transparent",
                        },
                        [`&.${tabClasses.selected}`]: {
                          color: "primary.plainColor",
                          "&::after": {
                            height: 2,

                            bgcolor: "primary.500",
                          },
                        },
                      },
                    }}
                  >
                    <Tab indicatorInset>README</Tab>
                  </TabList>
                  <Box>
                    <TabPanel value={0}>
                      <div
                        className="markdown-body"
                        dangerouslySetInnerHTML={{
                          __html: markdownToHtml(team.README),
                        }}
                      ></div>
                    </TabPanel>
                  </Box>
                </Tabs>
              </Sheet>
            </>
          ) : (
            <></>
          )}
        </Grid>
        {/* DetailsBlock >md */}
        <DetailsBlock
          team={team}
          sx={{ display: { xs: "none", md: "block" } }}
        />
      </Grid>
    </Box>
  );
};

export default TeamView;
