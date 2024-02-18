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
import { useParams } from "react-router-dom";
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
      <Divider sx={{ mb: 2, mt: 2 }} />
      <>
        {team.codeLangs.length > 0 ? (
          <>
            {" "}
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
                      <Chip
                        color="primary"
                        variant="outlined"
                        onClick={() => console.log(lang.name)}
                      >
                        {lang.name}
                      </Chip>
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
    return null;
  }

  //function which accepts dateString and returns output in such format: 17 Oct 2021
  const timeSince = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // return (
  //   <Box
  //     sx={{
  //       flexGrow: 1,
  //       width: "100%",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "start",
  //       flexDirection: "column",
  //       overflowX: "hidden",
  //     }}
  //     className="fade-in"
  //   >
  //     <Tabs
  //       value={index}
  //       onChange={(event, value) => setIndex(value)}
  //       sx={{
  //         backgroundColor: "transparent",
  //         width: "100%",
  //         display: "flex",
  //         flexDirection: "column",
  //         flexGrow: 1,
  //       }}
  //     >
  //       <TabList
  //         disableUnderline
  //         sx={{
  //           pt: 1,
  //           width: "max-content",
  //           backgroundColor: "transparent",
  //           justifyContent: "center",
  //           [`&& .${tabClasses.root}`]: {
  //             flex: "initial",
  //             [`&.${tabClasses.selected}`]: {
  //               color: "primary.plainColor",
  //               "&::after": {
  //                 height: 2,
  //                 borderTopLeftRadius: 3,
  //                 borderTopRightRadius: 3,
  //                 bgcolor: "primary.500",
  //               },
  //             },
  //           },
  //         }}
  //       >
  //         <Tab indicatorInset>Info</Tab>
  //         <Tab indicatorInset>Members</Tab>
  //         <Tab indicatorInset disabled>
  //           Settings
  //         </Tab>
  //       </TabList>
  //       <Sheet variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
  //         <TabPanel value={0}>
  //           {" "}
  //           <Typography level="title-md" sx={{ mb: 2 }}>
  //             {team.name}
  //           </Typography>
  //           {team.description ? (
  //             <>
  //               {" "}
  //               <Stack spacing={1} sx={{ fontSize: "sm", mb: 2, mt: 1 }}>
  //                 <Divider sx={{ "--Divider-childPosition": `50%` }}>
  //                   Description
  //                 </Divider>
  //               </Stack>
  //               <Typography>{team.description}</Typography>
  //             </>
  //           ) : (
  //             <></>
  //           )}
  //           {team.README ? (
  //             <>
  //               <Stack spacing={1} sx={{ fontSize: "sm", mb: 2, mt: 1 }}>
  //                 <Divider sx={{ "--Divider-childPosition": `50%` }}>
  //                   README
  //                 </Divider>
  //               </Stack>
  //               <div
  //                 className="markdown-body"
  //                 dangerouslySetInnerHTML={{
  //                   __html: markdownToHtml(team.README),
  //                 }}
  //               ></div>
  //             </>
  //           ) : (
  //             <></>
  //           )}
  //         </TabPanel>
  //         <TabPanel value={1}>
  //           <Stack spacing={1} sx={{ fontSize: "sm", mb: 2, mt: 1 }}>
  //             <Divider sx={{ "--Divider-childPosition": `50%` }}>
  //               Members
  //             </Divider>
  //           </Stack>
  //           <List
  //             sx={{
  //               borderRadius: "sm",
  //             }}
  //           >
  //             {team.takenRoles.length === 0 ? (
  //               <Box sx={{ textAlign: "center" }}>
  //                 <Typography>No members</Typography>
  //               </Box>
  //             ) : (
  //               <>
  //                 {team.takenRoles.map((role) => {
  //                   return (
  //                     <ListItem key={role.user.id}>
  //                       <ListItemButton sx={{ borderRadius: "sm" }}>
  //                         <ListItemDecorator sx={{ mr: 0.2 }}>
  //                           <Avatar size="md" src={role.user.pfp} />
  //                         </ListItemDecorator>
  //                         <Typography>
  //                           @{role.user.username} <Typography>as</Typography>{" "}
  //                           <Typography level="title-md">
  //                             {role.role}
  //                           </Typography>
  //                         </Typography>
  //                       </ListItemButton>
  //                     </ListItem>
  //                   );
  //                 })}
  //               </>
  //             )}
  //           </List>

  //           <Stack spacing={1} sx={{ fontSize: "sm", mb: 2, mt: 1 }}>
  //             <Divider sx={{ "--Divider-childPosition": `50%` }}>
  //               Open Roles
  //             </Divider>
  //           </Stack>

  //           {team.openRoles.length === 0 ? (
  //             <>
  //               {" "}
  //               <Box sx={{ textAlign: "center" }}>
  //                 <Typography>No members</Typography>
  //               </Box>
  //             </>
  //           ) : (
  //             <>
  //               <Grid container spacing={1} sx={{ flexGrow: 1 }}>
  //                 {team.openRoles.map((role) => {
  //                   return (
  //                     <Grid key={role.id} xs={12} sm={6} md={4}>
  //                       <Card variant="outlined" orientation="vertical">
  //                         <CardContent sx={{ display: "flex" }}>
  //                           <Typography
  //                             level="title-sm"
  //                             id="card-description"
  //                             noWrap={true}
  //                             sx={{ width: "220px" }}
  //                           >
  //                             {role.role}
  //                           </Typography>
  //                           <Chip
  //                             variant="outlined"
  //                             color="primary"
  //                             size="sm"
  //                             sx={{ pointerEvents: "none", mt: 1 }}
  //                           >
  //                             {role.requests.length} Requests
  //                           </Chip>
  //                         </CardContent>
  //                         <CardActions
  //                           sx={{ display: "flex", justifyContent: "end" }}
  //                         >
  //                           <IconButton
  //                             disabled={!eligibleToJoin}
  //                             size="sm"
  //                             variant="outlined"
  //                             color="primary"
  //                           >
  //                             <GoBookmark size={20} />
  //                           </IconButton>

  //                           <Button
  //                             disabled={!eligibleToJoin}
  //                             size="sm"
  //                             endDecorator={<TbSend />}
  //                             variant="outlined"
  //                             color="primary"
  //                           >
  //                             Apply
  //                           </Button>
  //                         </CardActions>
  //                       </Card>
  //                     </Grid>
  //                   );
  //                 })}
  //               </Grid>
  //             </>
  //           )}
  //         </TabPanel>
  //         <TabPanel value={2}>Lorem</TabPanel>
  //       </Sheet>
  //     </Tabs>
  //   </Box>
  // );
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
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />

      <Grid container spacing={2} sx={{ flexGrow: 1, pt: 1 }}>
        {/* DESCRIPTION <md */}
        <DetailsBlock
          team={team}
          sx={{ display: { xs: "block", md: "none" } }}
        />
        {/* MEMBERS AND OPEN ROLES */}
        <Grid item xs={12} md={8} lg={8}>
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
                        <Members team={team} timeSince={timeSince} />
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
                          team={team}
                          eligibleToJoin={eligibleToJoin}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </AccordionGroup>
                </TabPanel>
              </Box>
            </Tabs>
          </Sheet>
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
