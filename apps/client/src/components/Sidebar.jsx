import React from "react";
import Drawer from "@mui/joy/Drawer";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Typography,
} from "@mui/joy";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoBookmark, GoHome, GoSignOut } from "react-icons/go";
import Footer from "./Footer";
import { GoPerson } from "react-icons/go";
import { PiUsersThree } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { logoutUser } from "../redux/slices/user.slice";
import { useDispatch } from "react-redux";
import { IoIosClose } from "react-icons/io";

function Sidebar({ toggleDrawer, open, setOpen, user, isTablet, isMobile }) {
  const dispatch = useDispatch();
  let size = "sm";
  if (isTablet) size = "md";
  if (isMobile) size = "lg";
  return (
    <>
      <Drawer
        color="neutral"
        open={open}
        onClose={toggleDrawer(false)}
        size={size}
        variant="plain"
        anchor="right"
      >
        <Sheet
          variant="outlined"
          sx={{
            zIndex: 4,
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "none",
            borderTop: "none",
            borderBottom: "none",
          }}
        >
          <Box
            sx={{
              width: "100%",
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Profile */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{ height: "100%", display: "flex", alignItems: "center" }}
              >
                <Avatar
                  variant="outlined"
                  src={user.pfp}
                  sx={{
                    height: user.name && user.surname ? "45px" : "35px",
                    width: user.name && user.surname ? "45px" : "35px",
                    aspectRatio: 1 / 1,
                    mr: 1,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                  }}
                >
                  <Typography level="title-sm">@{user.username}</Typography>
                  {user.name && user.surname ? (
                    <Typography fontSize={15} color="neutral">
                      {user.name + " " + user.surname}
                    </Typography>
                  ) : null}
                </Box>
              </Box>
              <IconButton
                onClick={(e) => setOpen(false)}
                size="sm"
                variant="outlined"
                color="neutral"
              >
                <IoIosClose size={20} />
              </IconButton>
            </Box>
            <Box>
              <List sx={{ userSelect: "none" }}>
                <ListItem>
                  <ListItemButton sx={{ borderRadius: "sm" }}>
                    <ListItemDecorator>
                      <GoHome size={20} />
                    </ListItemDecorator>
                    <ListItemContent>Home</ListItemContent>
                    <MdKeyboardArrowRight size={20} />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton sx={{ borderRadius: "sm" }}>
                    <ListItemDecorator>
                      <GoPerson size={20} />
                    </ListItemDecorator>
                    <ListItemContent>Profile</ListItemContent>
                    <MdKeyboardArrowRight size={20} />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton sx={{ borderRadius: "sm" }}>
                    <ListItemDecorator>
                      <PiUsersThree size={20} />
                    </ListItemDecorator>
                    <ListItemContent>Your Teams</ListItemContent>
                    <MdKeyboardArrowRight size={20} />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton sx={{ borderRadius: "sm" }}>
                    <ListItemDecorator>
                      <GoBookmark size={20} />
                    </ListItemDecorator>
                    <ListItemContent>Bookmarks</ListItemContent>
                    <MdKeyboardArrowRight size={20} />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <ListItem>
                  <ListItemButton sx={{ borderRadius: "sm" }}>
                    <ListItemDecorator>
                      <IoSettingsOutline size={20} />
                    </ListItemDecorator>
                    <ListItemContent>Settings</ListItemContent>
                    <MdKeyboardArrowRight size={20} />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <ListItem>
                  <ListItemButton
                    sx={{ borderRadius: "sm" }}
                    color="danger"
                    onClick={() => dispatch(logoutUser())}
                  >
                    <ListItemDecorator>
                      <GoSignOut size={20} />
                    </ListItemDecorator>
                    <ListItemContent>Sign out</ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            {/* Tabs */}
          </Box>
          <Footer />
        </Sheet>
      </Drawer>
    </>
  );
}

export default Sidebar;
