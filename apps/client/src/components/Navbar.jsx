import {
  Avatar,
  Box,
  Button,
  Dropdown,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  useTheme,
} from "@mui/joy";
import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import BookmarksRoundedIcon from "@mui/icons-material/BookmarksRounded";
import { useMediaQuery } from "react-responsive";

const Navbar = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const links = [
    {
      name: "Notifications",
      url: "/notifications",
      icon: <NotificationsNoneRoundedIcon />,
    },
    {
      name: "Bookmarks",
      url: "/bookmarks",
      icon: <BookmarksRoundedIcon />,
    },
    { name: "Settings", url: "/settings", icon: <TuneRoundedIcon /> },
    ,
  ];

  return (
    <Box
      sx={{
        px: 2,
        width: "100%",
        height: "64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // padding: "1em 2em",
      }}
    >
      <div>Dev-Link</div>
      {isTabletOrMobile ? (
        <div>
          <Dropdown>
            <MenuButton sx={{ p: 0, px: 1, height: "min-content" }} size="sm">
              <MenuRoundedIcon />
            </MenuButton>
            <Menu
              placement="bottom-end"
              // open={true}
            >
              <List>
                {links.map((link) => {
                  return (
                    <ListItem
                      key={link.name}
                      size="md"
                      // href={link.url}
                    >
                      <ListItemButton color="primary">
                        <ListItemDecorator>{link.icon}</ListItemDecorator>
                        {link.name}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Menu>
          </Dropdown>
        </div>
      ) : (
        <div>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {links.map((link) => {
              return (
                <IconButton
                  key={link.name}
                  href={link.url}
                  variant="outlined"
                  color="primary"
                  sx={{ p: "5px", aspectRatio: "1/1" }}
                >
                  {link.icon}
                </IconButton>
              );
            })}
            <Avatar variant="outlined" sx={{ height: "36px", width: "36px" }} />
          </Box>
        </div>
      )}
    </Box>
  );
};

export default Navbar;
