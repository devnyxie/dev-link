import React, { useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Button,
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  List,
  Avatar,
  Typography,
  Chip,
  Sheet,
  Link,
  Divider,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/joy";
import "../css/default.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { MoreVertOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { selectUser } from "../redux/slices/user.slice";
import { useSelector } from "react-redux";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

function Sidebar() {
  const { user } = useSelector(selectUser);
  useEffect(() => {
    console.log(user);
  });
  const buttons = [
    { icon: <NotificationsIcon />, label: "Notifications" },
    { icon: <BookmarksIcon />, label: "Bookmarks" },
    { icon: <TuneIcon />, label: "Settings" },
  ];
  console.log("change");

  return (
    <Grid item xs={12} md={4}>
      <div className="sticky-top pt-3">
        <Sheet
          variant="outlined"
          sx={{ borderRadius: "var(--joy-radius-sm)" }}
          className="w-100"
          style={{ textAlign: "center" }}
        >
          <List sx={{ userSelect: "none" }}>
            <ListItem>
              <Button
                color="primary"
                variant="outlined"
                className="w-100 d-flex"
                sx={{ justifyContent: "start" }}
              >
                dev-link$~
              </Button>
            </ListItem>
            <Divider sx={{ mt: 1, mb: 1 }} />
            {buttons.map((button, index) => {
              return (
                <ListItem
                  key={index}
                  style={{
                    justifyContent: "start",
                    textTransform: "none",
                  }}
                >
                  <ListItemButton variant="plain" color="primary">
                    <ListItemDecorator>{button.icon}</ListItemDecorator>
                    <ListItemContent>{button.label}</ListItemContent>
                  </ListItemButton>
                </ListItem>
              );
            })}
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ListItem>
              <>
                {user ? (
                  <div
                    className="d-flex w-100"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="neutral"
                      sx={{
                        p: "2px",
                        px: 1,
                        borderRadius: "var(--joy-radius-sm)",
                        justifyContent: "start",
                        alignItems: "center",
                        fontWeight: "normal",
                      }}
                      className="d-flex"
                    >
                      <Avatar size="sm" variant="outlined" className="mr-2">
                        JK
                      </Avatar>
                      <div style={{ textAlign: "left" }}>
                        <Typography sx={{ fontSize: 12 }}>
                          {user.username}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          {user.name + " " + user.surname}
                        </Typography>
                      </div>
                    </Button>
                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{
                          root: {
                            variant: "outlined",
                            color: "neutral",
                            size: "sm",
                          },
                        }}
                        sx={{ height: "max-content" }}
                      >
                        <MoreVertOutlined />
                      </MenuButton>
                      <Menu>
                        <MenuItem>Logout</MenuItem>
                      </Menu>
                    </Dropdown>
                  </div>
                ) : (
                  <div className="w-100 d-flex justify-content-center">
                    <Button
                      variant="outlined"
                      component="a"
                      href="#as-link"
                      startDecorator={<LoginOutlinedIcon />}
                    >
                      Login
                    </Button>
                  </div>
                )}
              </>
            </ListItem>
          </List>
        </Sheet>
        <Sheet
          variant="outlined"
          sx={{ pt: 1, pb: 1, borderRadius: "var(--joy-radius-sm)" }}
          className="w-100 mt-1"
          style={{ textAlign: "center" }}
        >
          <Typography sx={{ fontSize: 12 }}>© 2024 Dev-Link</Typography>
          <Typography
            sx={{
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Give us a star on&nbsp;<Link underline="hover">GitHub</Link>&nbsp;
            <GitHubIcon />
          </Typography>
        </Sheet>
      </div>
    </Grid>
  );
}

export default Sidebar;
