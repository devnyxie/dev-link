import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  acceptOrDeclineRequest,
  fetchRequestsByCreatorId,
} from "../../redux/slices/teams.slice";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  List,
  ListDivider,
  ListItem,
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
import ModalWrapper from "../../components/ModalWrapper";

function Notifications({ open, setOpen }) {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    dispatch(fetchRequestsByCreatorId()).then((res) => {
      if (res.payload) setRequests(res.payload);
    });
  }, []);
  function handleRequestManagement(e) {
    console.log(e);
    dispatch(
      acceptOrDeclineRequest({ id: e.target.id, accepted: e.target.value })
    ).then((res) => {
      console.log(res);
    });
  }
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <>
          <Tabs
            value={index}
            onChange={(event, value) => setIndex(value)}
            sx={{
              height: "100%",

              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <TabList
              sx={{
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
              <Tab indicatorInset>Requests</Tab>
            </TabList>

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
                {requests.length > 0 ? (
                  requests.map((request, index) => {
                    return (
                      <>
                        <ListItem key={request.id}>
                          <Stack spacing={1}>
                            {" "}
                            <Typography
                              level="title-sm"
                              sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                                overflow: "hidden",
                              }}
                            >
                              {request.team.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <ListItemDecorator>
                                <Avatar
                                  size="sm"
                                  src={request.user.pfp}
                                  variant="outlined"
                                />
                              </ListItemDecorator>
                              <Typography level="body-sm">
                                {request.user.username}
                              </Typography>
                            </Box>
                            <ButtonGroup variant="soft">
                              <Button
                                color="danger"
                                value={false}
                                id={request.id}
                                onClick={(e) => handleRequestManagement(e)}
                              >
                                Decline
                              </Button>
                              <Button
                                color="success"
                                value={true}
                                id={request.id}
                                onClick={(e) => handleRequestManagement(e)}
                              >
                                Approve
                              </Button>
                            </ButtonGroup>
                          </Stack>
                        </ListItem>
                        {index !== requests.length - 1 && (
                          <ListDivider inset="gutter" />
                        )}
                      </>
                    );
                  })
                ) : (
                  <Box sx={{ textAlign: "center", mt: 3 }}>
                    {" "}
                    <Typography level="title-sm" color="neutral">
                      You have no incoming requests
                    </Typography>
                  </Box>
                )}
              </List>
            </TabPanel>
          </Tabs>
        </>
      </ModalWrapper>
    </>
  );
}

export default Notifications;
