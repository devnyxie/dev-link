import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { GoLock } from "react-icons/go";
import {
  Link,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { redirectTo } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { findTeamById } from "../../redux/slices/teams.slice";

function General({ team }) {
  return (
    <Stack direction="column" spacing={2}>
      <FormControl>
        <FormLabel>Team Name</FormLabel>
        <Input value={team?.name}></Input>
        //to-do: create controlled-input component with limited characters
        (prop)
      </FormControl>
    </Stack>
  );
}

function PrivateDetails({ team }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography level="title-md">Coming soon</Typography>
    </Box>
  );
}

function TeamSettings() {
  const dispatch = useDispatch();
  const [team, setTeam] = React.useState(null);
  const { teamId } = useParams();
  const location = useLocation();
  //General
  //Private Details
  //useeffect -> manage active tabs. 0 = general, 1 = private details. By default active tab is general. If user clicks on a tab, set active tab to that tab. Each time tab is assigned, change url accordingly using React Router Dom (/settings/general or /settings/private-details).
  const [activeTab, setActiveTab] = React.useState(0);
  //

  React.useEffect(() => {
    //URL
    const currentPath = window.location.pathname;
    if (currentPath.includes("/settings/general")) {
      setActiveTab(0);
    } else if (currentPath.includes("/settings/private-details")) {
      setActiveTab(1);
    } else {
      redirectTo(`/team/${teamId}/settings/general`);
      setActiveTab(0);
    }
    //TEAM
    dispatch(findTeamById(teamId))
      .then((response) => {
        setTeam(response.payload);
      })
      .catch((error) => {
        console.error("Failed to fetch team:", error);
      });
  }, [location, teamId]);
  console.log(activeTab);

  const Tab = () => {
    if (activeTab === 0) {
      return <General team={team} />;
    } else if (activeTab === 1) {
      return <PrivateDetails team={team} />;
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        height: "100%",
        flexGrow: { xs: "", md: 1 },
      }}
    >
      <Grid item xs={12} md={5} lg={4} sx={{ height: "min-content" }}>
        <List size="md">
          <ListItem value={0}>
            <Link
              to={`/team/${teamId}/settings/general`}
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <ListItemButton
                selected={activeTab === 0}
                sx={{
                  borderRadius: "sm",
                  overflow: "hidden",
                }}
              >
                <ListItemDecorator>
                  <IoSettingsOutline size={20} />{" "}
                </ListItemDecorator>
                General
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to={`/team/${teamId}/settings/private-details`}
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <ListItemButton
                selected={activeTab === 1}
                sx={{
                  borderRadius: "sm",
                  overflow: "hidden",
                }}
              >
                <ListItemDecorator>
                  <GoLock size={20} />
                </ListItemDecorator>
                Private Details
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Grid>
      <Grid
        item
        xs={12}
        md={7}
        lg={8}
        sx={{ pt: 2, display: "flex", flexDirection: "column" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "sm",
            p: 2,
            minHeight: "200px",
            height: "100%",
          }}
        >
          {Tab()}
        </Sheet>
      </Grid>
    </Grid>
  );
}

export default TeamSettings;
