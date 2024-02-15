import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  List,
  ListItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Textarea,
  Typography,
} from "@mui/joy";
import React, { useEffect } from "react";
import markdownToHtml from "../../components/MarkdownToHTML";
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";
import { GoCheck, GoCode } from "react-icons/go";
import JoyTooltip from "../../components/JoyTooltip";
import RolesList from "./RolesList";
import { useDispatch } from "react-redux";
import { createTeam } from "../../redux/slices/teams.slice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/user.slice";

function NewTeam() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  //NAME
  const [teamName, setTeamName] = React.useState("");
  //README
  const [README, setREADME] = React.useState("");
  const [hideMarkdown, setHideMarkdown] = React.useState(false);
  //DESCRIPTION
  const [description, setDescription] = React.useState("");
  // TECHNOLOGIES
  const [technologies, setTechnologies] = React.useState([
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Ruby",
    "Go",
    "Swift",
    "TypeScript",
    "PHP",
    "Rust",
    "Kotlin",
    "HTML",
    "CSS",
    "React",
  ]);
  const [selectedTechnologies, setSelectedTechnologies] = React.useState([]);
  const [newTechnology, setNewTechnology] = React.useState("");
  // ROLES
  const [roles, setRoles] = React.useState([]);

  function submitTechnology(event) {
    event.preventDefault();
    if (!newTechnology.trim()) {
      return;
    }
    //lowercase everything
    const lowerCaseTechnologies = technologies.map((technology) =>
      technology.toLowerCase()
    );
    const lowerCaseNewTechnology = newTechnology.toLowerCase();
    const lowerCaseSelectedTechnologies = selectedTechnologies.map(
      (technology) => technology.toLowerCase()
    );

    if (lowerCaseTechnologies.includes(lowerCaseNewTechnology)) {
      const index = lowerCaseTechnologies.indexOf(lowerCaseNewTechnology);
      const selectedTechnology = technologies[index];
      //
      if (!lowerCaseSelectedTechnologies.includes(lowerCaseNewTechnology)) {
        setSelectedTechnologies((val) => [...val, selectedTechnology]);
        setNewTechnology("");
      }
      //
    } else {
      setTechnologies((val) => [...val, newTechnology]);
      setSelectedTechnologies((val) => [...val, newTechnology]);
      setNewTechnology("");
    }
  }

  function submitTeam() {
    const data = {
      team: {
        name: teamName,
        creator_id: user.id,
        description: description,
        README: README,
      },
      members: [...roles],
      languages: selectedTechnologies,
    };
    console.log(data);
    dispatch(createTeam(data));
  }

  function inputLimit(value, limit) {
    return value.length + "/" + limit;
  }

  return (
    <Box style={{ width: "100%", pt: 2, pb: 2 }}>
      <Stack
        spacing={1}
        sx={{
          fontSize: "sm",
          mb: 1,
          mt: 1,
          width: "100%",
        }}
      >
        <Divider sx={{ "--Divider-childPosition": `50%` }}>
          <Typography color="neutral">Team Creation</Typography>
        </Divider>
      </Stack>
      {/* NAME */}
      <FormControl sx={{ mb: 3 }}>
        <FormLabel
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>Name</div> <div>{inputLimit(description, 80)}</div>
        </FormLabel>
        <Input
          required
          placeholder="Name of the team"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value.slice(0, 80))}
        />
        <FormHelperText>
          This should ideally include the main programming language or the
          project you'll be working on. For example, 'Python Data Analysis Team'
          or 'Frontend React Project Group'.
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ mb: 2 }}>
        <FormLabel
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>Description</div> <div>{inputLimit(description, 200)}</div>
        </FormLabel>
        <Textarea
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 200))}
          placeholder="Short Description of the team"
        />
        <FormHelperText>
          Write a short description for your team. This could include the
          purpose of the team, the project you'll be working on, or any other
          relevant information.
        </FormHelperText>
      </FormControl>
      {/* README */}
      <FormControl sx={{ mb: 3 }}>
        <FormLabel>README</FormLabel>
        <Tabs
          variant="outlined"
          sx={{ borderRadius: "sm", overflow: "hidden" }}
        >
          <TabList sx={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <Tab variant="plain" color="neutral" disabled={hideMarkdown}>
                Markdown
              </Tab>
              <Tab variant="plain" color="neutral" disabled={hideMarkdown}>
                Preview
              </Tab>
            </div>

            <JoyTooltip title="Hide Markdown">
              <IconButton
                variant={hideMarkdown ? "solid" : "plain"}
                sx={{ borderRadius: 0 }}
                onClick={() => setHideMarkdown(!hideMarkdown)}
              >
                {hideMarkdown ? <GrFormViewHide /> : <GrFormView />}
              </IconButton>
            </JoyTooltip>
          </TabList>

          <TabPanel
            sx={{ p: 0, display: hideMarkdown ? "none" : "block" }}
            value={0}
          >
            <FormControl>
              <Textarea
                value={README}
                onChange={(e) => setREADME(e.target.value)}
                placeholder="<!-- We support markdown! -->"
                sx={{ borderRadius: "0", border: 0, minHeight: "200px" }}
              />
            </FormControl>
          </TabPanel>
          <TabPanel
            value={1}
            sx={{ p: 0, display: hideMarkdown ? "none" : "block" }}
          >
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(README),
              }}
              style={{ minHeight: "200px", padding: "10px" }}
            ></div>
          </TabPanel>
        </Tabs>
        <FormHelperText>
          Write a brief README for your team here. Include your team's goals,
          main activities, and any other relevant information.
        </FormHelperText>
      </FormControl>
      {/* TECHNOLOGIES */}
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ mb: 1 }}>
          <FormLabel>Technologies</FormLabel>
          <FormHelperText>
            Choose Languages, Framework and Tools that your team will be using
            or add your own.
          </FormHelperText>
        </FormControl>
        <Box
          role="group"
          aria-labelledby="fav-movie"
          sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitTechnology(e);
            }}
          >
            <Input
              placeholder="Add your own language or framework"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              startDecorator={<GoCode />}
              endDecorator={
                <IconButton
                  type="submit"
                  color={newTechnology ? "success" : "neutral"}
                  variant="plain"
                  onClick={(e) => submitTechnology(e)}
                >
                  +
                </IconButton>
              }
            />
          </form>
          <List
            orientation="horizontal"
            wrap
            sx={{
              "--List-gap": "8px",
              "--ListItem-radius": "20px",
              "--ListItem-minHeight": "32px",
              "--ListItem-gap": "4px",
            }}
          >
            {technologies.map((item, index) => (
              <ListItem key={item}>
                <Checkbox
                  size="sm"
                  disableIcon
                  overlay
                  label={item}
                  checked={selectedTechnologies.includes(item)}
                  variant={
                    selectedTechnologies.includes(item) ? "soft" : "outlined"
                  }
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedTechnologies((val) => [...val, item]);
                    } else {
                      setSelectedTechnologies((val) =>
                        val.filter((text) => text !== item)
                      );
                    }
                  }}
                  slotProps={{
                    action: ({ checked }) => ({
                      sx: checked
                        ? {
                            border: "1px solid",
                            borderColor: "primary.500",
                          }
                        : {},
                    }),
                  }}
                />
                {selectedTechnologies.includes(item) ? (
                  <GoCheck style={{ zIndex: 2 }} />
                ) : null}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      {/* Roles */}
      <RolesList roles={roles} setRoles={setRoles} user={user} />
      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Button variant="outlined" onClick={submitTeam}>
          Create
        </Button>
      </Box>
    </Box>
  );
}

export default NewTeam;
