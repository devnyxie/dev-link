import {
  Avatar,
  Box,
  Divider,
  Input,
  List,
  ListItem,
  Sheet,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
  tabClasses,
} from "@mui/joy";
import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import TrendingTechnologies from "../../components/TrendingTechnologies";
import { useDispatch } from "react-redux";
import {
  searchTeams,
  searchTeamsByTechnology,
  searchTechnologies,
} from "../../redux/slices/search.slice";
import Team from "../../components/Team";
import { searchUsers } from "../../redux/slices/search.slice";
import { useNavigate, useSearchParams } from "react-router-dom";
import TeamListItem from "./TeamListItem";
import UserListItem from "./UserListItem";
import TechChip from "../../components/TechChip";

function DebounceInput(props) {
  const { handleDebounce, debounceTimeout, startDecorator, value, ...rest } =
    props;

  const [inputValue, setInputValue] = React.useState(value);
  const timerRef = React.useRef();

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event) => {
    setInputValue(event.target.value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return (
    <Input
      startDecorator={startDecorator}
      {...rest}
      value={inputValue}
      onChange={handleChange}
    />
  );
}

function ResultsDivider({ length }) {
  return (
    <Stack spacing={1} sx={{ fontSize: "sm" }}>
      <Divider sx={{ "--Divider-childPosition": `${50}%` }}>
        {length} Results
      </Divider>
    </Stack>
  );
}

function Search() {
  //0 = teams, 1 = users, 2 = technologies
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState("");
  const [results, setResults] = React.useState(null);
  const [searchTechnology, setSearchTechnology] = React.useState(null);
  const navigate = useNavigate();

  const clearTechParam = () => {
    setSearchTechnology(null);
    searchParams.delete("tech");
    setSearchParams(searchParams);
  };

  const handleSearchInput = (e) => {
    setSearchValue(e);
    clearTechParam();
    setSearchParams({ ["q"]: e });
  };

  useEffect(() => {
    if (!searchParams.get("tech") && !searchParams.get("q")) {
      return;
    }
    if (searchParams.get("tech")) {
      setSearchValue("");
      setSearchTechnology(searchParams.get("tech"));
    }
    if (searchParams.get("q")) {
      setSearchTechnology(null);
      setSearchValue(searchParams.get("q"));
    }
  }, [searchParams, searchValue, searchTechnology]);

  //index useeffect
  useEffect(() => {
    if (!searchTechnology) {
      if (searchValue == "") return;
    }

    if (index !== 0 && !searchParams.get("tech")) {
      clearTechParam();
    }

    switch (index) {
      case 0:
        if (searchTechnology) {
          dispatch(searchTeamsByTechnology(searchTechnology)).then((res) => {
            setResults(res.payload);
          });
        } else {
          dispatch(searchTeams(searchValue)).then((res) => {
            setResults(res.payload);
          });
        }
        break;
      case 1:
        if (searchValue == "") return;
        dispatch(searchUsers(searchValue)).then((res) => {
          setResults(res.payload);
        });
        break;
      case 2:
        if (searchValue == "") return;
        dispatch(searchTechnologies(searchValue)).then((res) => {
          setResults(res.payload);
        });
        break;
      default:
        break;
    }
  }, [index, searchValue, searchTechnology]);

  useEffect(() => {}, [searchParams]);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <DebounceInput
          sx={{ mb: 2 }}
          variant="soft"
          color="neutral"
          placeholder="What are you searching for?"
          debounceTimeout={300}
          handleDebounce={(e) => handleSearchInput(e)}
          value={searchValue}
          startDecorator={
            searchTechnology ? (
              <TechChip techName={searchTechnology} />
            ) : (
              <CiSearch size={20} />
            )
          }
        />

        <Tabs
          defaultValue={0}
          value={index}
          onChange={(event, value) => {
            if (index === value) return;
            console.log("changing index", value);
            setIndex(value);
            setResults(null);
          }}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
        >
          <TabList
            disableUnderline
            sx={{
              px: 0,
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
            <Tab indicatorInset>Teams</Tab>
            <Tab indicatorInset>Users</Tab>
            <Tab indicatorInset>Technologies</Tab>
          </TabList>
          <Box sx={{ px: 2 }}>
            {!searchValue && !searchTechnology ? (
              <Box sx={{ mt: 3 }}>
                <TrendingTechnologies
                  heading={
                    <Typography level="title-md">
                      Trending Technologies
                    </Typography>
                  }
                />
              </Box>
            ) : null}
            {results && results.length > 0 ? (
              <ResultsDivider length={results.length} />
            ) : null}
            <TabPanel
              value={0}
              sx={{
                flexGrow: 1,
                position: "relative",
              }}
            >
              <List
                variant="plain"
                sx={{
                  height: "100%",
                  width: "100%",
                  overflow: "scroll",
                }}
              >
                {results ? (
                  results.map((result, i) => {
                    console.log(result);
                    return (
                      <>
                        <Team key={i} team={result} />
                      </>
                    );
                  })
                ) : (
                  <ListItem>
                    {/* <Typography level="title-sm">No results found</Typography> */}
                  </ListItem>
                )}
              </List>
            </TabPanel>
            <TabPanel
              value={1}
              sx={{
                p: 0,
                flexGrow: 1,
                position: "relative",
              }}
            >
              <List
                variant="plain"
                sx={{
                  height: "100%",
                  width: "100%",
                  overflow: "scroll",
                }}
              >
                {results ? (
                  <>
                    {results.map((result, i) => {
                      console.log(result);
                      return (
                        <>
                          <ListItem key={i}>
                            <UserListItem user={result} />
                          </ListItem>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <ListItem>
                    {/* <Typography level="title-sm">No results found</Typography> */}
                  </ListItem>
                )}
              </List>
            </TabPanel>
            <TabPanel value={2} sx={{ p: 0 }}>
              <List
                variant="plain"
                sx={{
                  height: "100%",
                  width: "100%",
                  overflow: "scroll",
                }}
              >
                {" "}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.75,
                  }}
                >
                  {results ? (
                    <>
                      {results.map((result, i) => {
                        console.log(result);
                        if (result.codeLang) {
                          return (
                            <>
                              <TechChip
                                techName={result.codeLang.name}
                                count={result.count}
                                onClick={(e) => console.log(e)}
                              />
                            </>
                          );
                        }
                      })}
                    </>
                  ) : (
                    <ListItem>
                      {/* <Typography level="title-sm">No results found</Typography> */}
                    </ListItem>
                  )}
                </Box>
              </List>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.75,
                }}
              ></Box>
            </TabPanel>
          </Box>
        </Tabs>
      </Box>
    </>
  );
}

export default Search;
