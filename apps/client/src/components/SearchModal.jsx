import {
  Avatar,
  Box,
  Divider,
  Input,
  List,
  ListItem,
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
} from "@mui/joy";
import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import ModalWrapper from "./ModalWrapper";
import TrendingTechnologies from "./TrendingTechnologies";
import { useDispatch } from "react-redux";
import { searchTeams } from "../redux/slices/teams.slice";
import Team from "./Team";
import { searchUsers } from "../redux/slices/user.slice";
import UserListItem from "./UserListItem";

function DebounceInput(props) {
  const { handleDebounce, debounceTimeout, ...rest } = props;

  const timerRef = React.useRef();

  const handleChange = (event) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...rest} onChange={handleChange} />;
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

function SearchModal({ open, setOpen }) {
  //0 = teams, 1 = users, 2 = technologies
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);
  console.log(index);
  const [searchValue, setSearchValue] = React.useState("");
  const [results, setResults] = React.useState(null);
  const handleSearchInput = (e) => {
    console.log(e);
    setSearchValue(e);
  };
  useEffect(() => {
    if (searchValue === "") {
      setResults([]);
      return;
    }
    switch (index) {
      case 0:
        dispatch(searchTeams(searchValue)).then((res) => {
          setResults(res.payload);
        });
        break;
      case 1:
        dispatch(searchUsers(searchValue)).then((res) => {
          console.log(res.payload);
          setResults(res.payload);
        });
      default:
        break;
    }
  }, [searchValue, index]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  function onClose() {
    setSearchValue("");
  }

  // const Item = ({ data, i }) => {
  //   let returnItem;
  //   switch (index) {
  //     case 0:
  //       returnItem = (
  //         <ListItem key={i}>
  //           <Team team={data} />
  //         </ListItem>
  //       );
  //       break;
  //     case 1:
  //       returnItem = (
  //         <ListItem key={i}>
  //           <UserListItem user={data} />
  //         </ListItem>
  //       );
  //       break;
  //     default:
  //       returnItem = <></>;
  //       break;
  //   }
  //   return returnItem;
  // };
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen} onClose={onClose}>
        <DebounceInput
          sx={{ mb: 2 }}
          variant="soft"
          color="neutral"
          placeholder="What are you searching for?"
          debounceTimeout={300}
          handleDebounce={(e) => handleSearchInput(e)}
        />

        <Tabs
          defaultValue={null}
          value={index}
          onChange={(event, value) => {
            setIndex(value);
            setResults(null);
          }}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
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
            <Tab indicatorInset disabled={searchValue === "" ? true : false}>
              Teams
            </Tab>
            <Tab indicatorInset disabled={searchValue === "" ? true : false}>
              Users
            </Tab>
            <Tab indicatorInset disabled={searchValue === "" ? true : false}>
              Technologies
            </Tab>
          </TabList>

          {searchValue === "" ? (
            <Box sx={{ pt: 2, pb: 2 }}>
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
              p: 0,
              flexGrow: 1,
              position: "relative",
            }}
          >
            <List
              variant="plain"
              sx={{
                position: "absolute",
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
                      <ListItem key={i}>
                        <Team team={result} />
                      </ListItem>
                    </>
                  );
                })
              ) : (
                <ListItem>
                  <Typography level="title-sm">No results found</Typography>
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
                position: "absolute",
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
                  <Typography level="title-sm">No results found</Typography>
                </ListItem>
              )}
            </List>
          </TabPanel>
        </Tabs>
      </ModalWrapper>
    </>
  );
}

export default SearchModal;
