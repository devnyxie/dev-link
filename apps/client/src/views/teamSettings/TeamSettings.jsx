import {
  Box,
  Button,
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
  Textarea,
  Typography,
} from "@mui/joy";
import React, { useRef } from "react";
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
import ControlledInput from "../../components/ControlledInput";
import MarkdownInput from "../../components/MarkdownInput";
import MembersManagement from "../../components/TeamManagement.jsx";
import { useSelector } from "react-redux";

function General({ team, user }) {
  if (team) {
    const [error, setError] = React.useState({ id: null });
    // const [teamName, setTeamName] = React.useState(team.name);
    const teamName = useRef(team.name);
    const teamDescription = useRef(team.description);
    const [teamReadme, setTeamReadme] = React.useState(team.readme);
    // Form Data
    const formData = {
      teamName: {
        id: "teamName",
        minLength: 5,
        maxLength: 80,
        placeholder: "Enter team name",
        label: "Name",
        valueRef: teamName,
        useControlledInput: true,
        // successHighlight: true,
      },
      teamDescription: {
        id: "teamDescription",
        placeholder: "Enter team description",
        label: "Description",
        valueRef: teamDescription,
        component: Textarea,
        useControlledInput: true,
        minLength: 50,
        maxLength: 300,
      },
      teamManagement: {
        id: "teamManagement",
        label: "Team Management",
        useControlledInput: false,
        team: team,
        user: user,
        component: MembersManagement,
      },
      teamReadme: {
        id: "teamReadme",
        placeholder: "Enter team readme",
        label: "Readme",
        value: teamReadme,
        setValue: setTeamReadme,
        useControlledInput: false,
        component: MarkdownInput,
      },
    };
    //

    // Form Validation
    function validateForm() {
      console.log("validating form");
      //teamName
      //go through formData inputs and check each input for min length, max length, and if it's empty
      //if all inputs are valid, submit form
      Object.keys(formData).forEach((key) => {
        const input = formData[key];
        if (input.valueRef.current.length < input.minLength) {
          setError({ id: input.id });
          console.log(error);
          return;
        }
        if (input.valueRef.current.length > input.maxLength) {
          setError({ id: input.id });
          return;
        }
        if (input.valueRef.current.length === 0) {
          setError({ id: input.id });
          return;
        }
      });
      //submit form
    }

    return (
      <Stack direction="column" spacing={2}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateForm();
          }}
        >
          <Stack direction="column" spacing={2}>
            {Object.keys(formData).map((key) => {
              const input = formData[key];
              if (input.useControlledInput) {
                return (
                  <ControlledInput
                    {...input}
                    error={error}
                    setError={setError}
                  />
                );
              } else {
                return (
                  <input.component
                    {...input}
                    error={error}
                    setError={setError}
                  />
                );
              }
            })}
          </Stack>
        </form>
      </Stack>
    );
  }
}

function PrivateDetails({ team, user }) {
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
  const user = useSelector((state) => state.user.user);

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

  const Tab = () => {
    if (activeTab === 0) {
      return <General team={team} user={user} />;
    } else if (activeTab === 1) {
      return <PrivateDetails team={team} user={user} />;
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
        <List size="sm">
          <ListItem value={0}>
            <Link
              to={`/team/${teamId}/settings/general`}
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <ListItemButton
                color="primary"
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
                color="primary"
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
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          {Tab()}
        </Box>
      </Grid>
    </Grid>
  );
}

export default TeamSettings;
