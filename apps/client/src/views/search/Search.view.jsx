import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Divider,
  Grid,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
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
import { capitalize } from "../../utils/utils";

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

function CustomListItem({ text, activeTab, handleTabChange }) {
  return (
    <ListItem>
      <ListItemButton
        color={text == activeTab ? "primary" : "neutral"}
        selected={text == activeTab}
        onClick={(e) => handleTabChange(text)}
      >
        {capitalize(text)}
      </ListItemButton>
    </ListItem>
  );
}

function Search() {
  const dispatch = useDispatch();
  //params
  const [searchParams, setSearchParams] = useSearchParams();
  //states
  // --- searchValue
  const [searchValue, setSearchValue] = React.useState({
    q: null,
    tech: null,
  });
  // --- results
  const [results, setResults] = React.useState(null);
  // --- activeTab
  const [activeTab, setActiveTab] = React.useState("teams");
  // all categories
  const categories = ["teams", "users", "technologies"];

  const handleSearchInput = (e) => {
    setSearchValue(e);
    console.log(searchParams);
    searchParams.set("q", e);
    setSearchParams(new URLSearchParams(searchParams.toString()));
  };
  function updateParams() {
    setSearchParams(new URLSearchParams(searchParams.toString()));
  }

  // 1. if we get redirected to this page, we must check if there are any search params and setSearchValue if needed. (useEffect)
  // 2. searchParams : if q -> set param searchValue.q, if tech -> set param searchValue.tech. (useEffect)
  // 3. activeTab: if no ?tab in searchParams, set activeTab to "teams". (useEffect) --- done
  // 4. Func in order to set active tab --- done

  //1, 2.
  useEffect(() => {
    if (searchParams.get("q")) {
      searchParams.delete("tech");
      setSearchParams(searchParams);
      setSearchValue({ q: searchParams.get("q") });
    }
    if (searchParams.get("tech")) {
      searchParams.delete("q");
      setSearchParams(searchParams);
      // setActiveTab("teams"); --- works, but a bad fix
      setSearchValue({ tech: searchParams.get("tech") });
    }
  }, [searchParams]);

  //last issue = when we have results and change tabs, results persist. We need to clear results when we change tabs. Also, we must set searchValue.tech to null if we switch to tab !== teams.
  // update: when URL is changed, we must clear results (and refetch?). (useEffect)
  useEffect(() => {
    if (activeTab !== "teams") {
      searchParams.delete("tech");
      setSearchValue({ ...searchValue, tech: null });
      updateParams();
    }
  }, [activeTab]);

  useEffect(() => {
    setResults(null);
  }, [searchParams]);

  //3.
  useEffect(() => {
    if (
      searchParams.get("tab") &&
      categories.includes(searchParams.get("tab"))
    ) {
      setActiveTab(searchParams.get("tab"));
    } else {
      searchParams.set("tab", "teams");
      updateParams();
    }
  }, [searchParams]);

  //4.
  const handleTabChange = (e) => {
    setActiveTab(e);
    setResults(null);
    searchParams.set("tab", e);
    updateParams();
  };

  //search useEffect. Depends on: searchValue.q, searchValue.tech, searchParams.tab
  useEffect(() => {
    console.log("value:", searchValue);
    console.log("tab:", activeTab);
    if (searchValue && searchValue.q) {
      if (activeTab === "teams") {
        dispatch(searchTeams(searchValue.q)).then((res) => {
          setResults(res.payload);
        });
      }
      if (activeTab === "users") {
        dispatch(searchUsers(searchValue.q)).then((res) => {
          setResults(res.payload);
        });
      }
      if (activeTab === "technologies") {
        dispatch(searchTechnologies(searchValue.q)).then((res) => {
          setResults(res.payload);
        });
      }
    }
    if (searchValue.tech) {
      if (activeTab === "teams") {
        dispatch(searchTeamsByTechnology(searchValue.tech)).then((res) => {
          setResults(res.payload);
        });
      }
    }
  }, [searchValue, activeTab]);

  //map results to components
  const renderResults = () => {
    if (results) {
      if (activeTab === "teams") {
        return results.map((team) => <Team team={team} />);
      }
      if (activeTab === "users") {
        return results.map((user) => <UserListItem user={user} />);
      }
      if (activeTab === "technologies") {
        return results.map((tech) => (
          <TechChip techName={tech.codeLang.name} count={tech.count} />
        ));
      }
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={4}>
            <Accordion expanded>
              <AccordionSummary>Categories</AccordionSummary>
              <AccordionDetails>
                <List size="sm" variant="plain">
                  {["teams", "users", "technologies"].map((text) => (
                    <CustomListItem
                      text={text}
                      activeTab={activeTab}
                      handleTabChange={handleTabChange}
                    />
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={8}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <div>
              {/* INPUT */}
              <DebounceInput
                variant="soft"
                color="neutral"
                placeholder="What are you searching for?"
                debounceTimeout={300}
                handleDebounce={(e) => handleSearchInput(e)}
                value={searchValue.q}
                startDecorator={
                  searchValue.tech ? (
                    <TechChip
                      techName={searchValue.tech}
                      variant="outlined"
                      link={false}
                      onClick={(e) => {
                        //delete tech from url and searchValue
                        searchParams.delete("tech");
                        updateParams();
                        setSearchValue({ ...searchValue, tech: null });
                      }}
                    />
                  ) : (
                    <CiSearch />
                  )
                }
              />
            </div>
            <div style={{ alignSelf: "end" }}>
              {/* RESULTS */}
              {results && results.length > 0 ? (
                <Typography level="body-sm">
                  {results.length} results
                </Typography>
              ) : (
                <></>
              )}
            </div>
            <List>{renderResults()}</List>

            <Box>
              {!searchValue.q && !searchValue.tech ? (
                <TrendingTechnologies
                  heading={
                    <Typography level="title-md">
                      Trending Technologies
                    </Typography>
                  }
                />
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Search;
