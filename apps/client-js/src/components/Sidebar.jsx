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

function Sidebar() {
  const user = useSelector(selectUser);
  // const dispatch = useDispatch();
  // const user = dispatch(selectUser());
  useEffect(() => {
    console.log(user);
  });
  const buttons = [
    { icon: <NotificationsIcon />, label: "Notifications" },
    { icon: <BookmarksIcon />, label: "Bookmarks" },
    { icon: <TuneIcon />, label: "Settings" },
  ];
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
                dev-link$~/home
              </Button>
            </ListItem>
            <Divider sx={{ mt: 1, mb: 1 }} />
            {buttons.map((button) => {
              return (
                <ListItem
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
            <ListItem
              className="d-flex w-100"
              style={{ justifyContent: "space-between" }}
            >
              <div className="d-flex">
                <Avatar variant="outlined" className="mr-2">
                  JK
                </Avatar>
                <div style={{ textAlign: "left" }}>
                  <Typography sx={{ fontSize: 12 }}>@joecole</Typography>
                  <Typography sx={{ fontSize: 14 }}>Joe Cole</Typography>
                </div>
              </div>
              <Dropdown>
                <MenuButton
                  slots={{ root: IconButton }}
                  slotProps={{
                    root: { variant: "outlined", color: "neutral" },
                  }}
                >
                  <MoreVertOutlined />
                </MenuButton>
                <Menu>
                  <MenuItem>Logout</MenuItem>
                </Menu>
              </Dropdown>
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
