import {
  Box,
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
import TechnologyIcon from "../../components/TechnologyIcon";

function NewTeam() {
  const [markdownDescription, setMarkdownDescription] = React.useState("");
  const [hideMarkdown, setHideMarkdown] = React.useState(false);
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

  //   function submitTechnology(event) {
  //     event.preventDefault();
  //     if (technologies.includes(newTechnology)) {
  //       console.log("does not exist");
  //       setSelectedTechnologies((val) => [...val, newTechnology]);
  //     } else {
  //       setTechnologies((val) => [...val, newTechnology]);
  //       setSelectedTechnologies((val) => [...val, newTechnology]);
  //       setNewTechnology("");
  //     }
  //   }

  function submitTechnology(event) {
    event.preventDefault();
    //lowercase everything
    const lowerCaseTechnologies = technologies.map((technology) =>
      technology.toLowerCase()
    );
    const lowerCaseNewTechnology = newTechnology.toLowerCase();
    const lowerCaseSelectedTechnologies = selectedTechnologies.map(
      (technology) => technology.toLowerCase()
    );

    if (lowerCaseTechnologies.includes(lowerCaseNewTechnology)) {
      console.log("does not exist");
      const index = lowerCaseTechnologies.indexOf(lowerCaseNewTechnology);
      const selectedTechnology = technologies[index];
      //
      if (!lowerCaseSelectedTechnologies.includes(lowerCaseNewTechnology)) {
        setSelectedTechnologies((val) => [...val, selectedTechnology]);
      }
      //
    } else {
      setTechnologies((val) => [...val, newTechnology]);
      setSelectedTechnologies((val) => [...val, newTechnology]);
      setNewTechnology("");
    }
  }

  useEffect(() => {
    console.log(selectedTechnologies);
  });

  return (
    <Box sx={{ width: "100%", pt: 2 }}>
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
      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Name of the team" />
        <FormHelperText>
          This should ideally include the main programming language or the
          project you'll be working on. For example, 'Python Data Analysis Team'
          or 'Frontend React Project Group'.
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ mb: 3 }}>
        <FormLabel>Description</FormLabel>
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
            <IconButton
              variant={hideMarkdown ? "plain" : "solid"}
              sx={{ borderRadius: 0 }}
              onClick={() => setHideMarkdown(!hideMarkdown)}
            >
              {hideMarkdown ? <GrFormViewHide /> : <GrFormView />}
            </IconButton>
          </TabList>

          <TabPanel
            sx={{ p: 0, display: hideMarkdown ? "none" : "block" }}
            value={0}
          >
            <FormControl>
              <Textarea
                value={markdownDescription}
                onChange={(e) => setMarkdownDescription(e.target.value)}
                placeholder="<!-- Describe your team! -->"
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
                __html: markdownToHtml(markdownDescription),
              }}
              style={{ minHeight: "200px", padding: "10px" }}
            ></div>
          </TabPanel>
        </Tabs>
        <FormHelperText>
          Write a brief description of your team here. Include your team's
          goals, main activities, and any other relevant information.
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ mb: 1 }}>
        <FormLabel>Technologies</FormLabel>
        <FormHelperText>
          Choose Languages, Framework and Tools that your team will be using or
          add your own.
        </FormHelperText>
      </FormControl>
      <Box
        role="group"
        aria-labelledby="fav-movie"
        sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
      >
        <form onSubmit={(e) => submitTechnology(e)}>
          <Input
            placeholder="Add your own stack"
            value={newTechnology}
            onChange={(e) => setNewTechnology(e.target.value)}
            startDecorator={<GoCode />}
            endDecorator={<IconButton type="submit">+</IconButton>}
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
  );
}

export default NewTeam;
