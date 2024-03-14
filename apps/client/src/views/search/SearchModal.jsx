import {
  Avatar,
  Box,
  Divider,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Modal,
  ModalClose,
  Sheet,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
  tabClasses,
  Link as JoyUILink,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/joy";
import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import ModalWrapper from "../../components/ModalWrapper";
import TrendingTechnologies from "../../components/TrendingTechnologies";
import { useDispatch } from "react-redux";
import { quickSearch } from "../../redux/slices/search.slice";
import Team from "../../components/Team";
import { searchUsers } from "../../redux/slices/search.slice";
import { PiUsersThree } from "react-icons/pi";

import UserListItem from "./UserListItem";
import { Link, redirect, useLocation } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import TechChip from "../../components/TechChip";
import { redirectTo } from "../../utils/utils";
import TeamListItem from "./TeamListItem";

function DebounceInput(props) {
  const {
    handleDebounce,
    debounceTimeout,
    handleDefault,
    startDecorator,
    placeholder,
    ...rest
  } = props;

  const timerRef = React.useRef();

  const handleChange = (event) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    handleDefault(event.target.value);
    timerRef.current = window.setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return (
    <FormControl {...rest}>
      <FormLabel>Quick Search</FormLabel>
      <Input
        startDecorator={<CiSearch size={20} />}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <FormHelperText>
        Quick tip: Hitting the "Enter" key will take you to the full search
        page.
      </FormHelperText>
    </FormControl>
  );
}

function ResultsDivider({ text }) {
  return (
    <Stack spacing={1} sx={{ fontSize: "sm", mb: 0.5 }}>
      <Divider sx={{ "--Divider-childPosition": `${0}%` }}>{text}</Divider>
    </Stack>
  );
}

function SearchModal({ open, setOpen }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [debouncedValue, setDebouncedValue] = React.useState("");
  const [value, setValue] = React.useState("");
  const [results, setResults] = React.useState(null);
  const handleSearchInput = (e) => {
    setDebouncedValue(e);
  };
  const handleDefault = (e) => {
    setValue(e);
  };
  useEffect(() => {
    if (debouncedValue === "") {
      setResults([]);
      return;
    }
    dispatch(quickSearch(debouncedValue)).then((res) => {
      console.log(res);
      setResults(res.payload);
    });
  }, [debouncedValue]);

  function onClose() {
    setValue("");
    setDebouncedValue("");
    setResults([]);
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    redirectTo(`/search?q=${value}`);
  }

  useEffect(() => {
    onClose();
  }, [location]);

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen} onClose={onClose}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <DebounceInput
            variant="soft"
            color="neutral"
            placeholder="What are you searching for?"
            debounceTimeout={300}
            handleDebounce={(e) => handleSearchInput(e)}
            handleDefault={(e) => handleDefault(e)}
          />
        </form>
        {results &&
        (results?.users || results?.teams || results?.technologies) ? (
          <Box
            sx={{
              flexGrow: 1,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                width: "100%",
                overflow: "scroll",
              }}
            >
              <List>
                {results.teams.length > 0 ? (
                  <Box sx={{ width: "100%", mb: 0.5 }}>
                    <ResultsDivider text={`Teams`} />
                    {results.teams.map((team) => (
                      <TeamListItem team={team} />
                    ))}
                  </Box>
                ) : (
                  <></>
                )}

                {results.users.length > 0 ? (
                  <Box sx={{ width: "100%", mb: 0.5 }}>
                    <ResultsDivider text={`Users`} />
                    {results.users.map((user) => (
                      <UserListItem user={user} />
                    ))}
                  </Box>
                ) : (
                  <></>
                )}
                {results.technologies.length > 0 ? (
                  <Box sx={{ width: "100%", mb: 0.5 }}>
                    <ResultsDivider text={`Technologies`} />
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.75,
                      }}
                    >
                      {results.technologies.map((tech, index) => (
                        <TechChip
                          techName={tech.codeLang.name}
                          count={tech.count}
                          onClick={(e) => console.log(e)}
                        />
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <></>
                )}
              </List>
            </Box>
          </Box>
        ) : (
          <></>
        )}

        {debouncedValue === "" ? (
          <Box sx={{ pt: 2, pb: 2 }}>
            <TrendingTechnologies
              heading={
                <Typography level="title-md">Trending Technologies</Typography>
              }
            />
          </Box>
        ) : null}
        {results && results.length > 0 ? (
          <ResultsDivider length={results.length} />
        ) : null}
      </ModalWrapper>
    </>
  );
}

export default SearchModal;
