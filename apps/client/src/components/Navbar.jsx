import {
  Avatar,
  Box,
  Button,
  Divider,
  Dropdown,
  IconButton,
  Input,
  LinearProgress,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Typography,
  useTheme,
} from "@mui/joy";
import React from "react";
import { GoBell } from "react-icons/go";
import { useMediaQuery } from "react-responsive";
import { IoBookmarksOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import ThemeToggler from "./ThemeToggler";
import { useSelector } from "react-redux";
import { logoutUser, selectUser } from "../redux/slices/user.slice";
import { GoSignIn } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import Brand from "./Brand";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loading);
  const { user } = useSelector(selectUser);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "60px",
          position: "sticky",
          top: 0,
          zIndex: 2,
          backdropFilter: "blur(5px)", // Add backdrop blur
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            px: 2,
            backgroundColor: "transparent",
            borderRight: "none",
            borderLeft: "none",
            borderTop: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Brand />

          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            {isTabletOrMobile ? (
              <> </>
            ) : (
              <>
                {" "}
                <Input
                  startDecorator={<CiSearch size={20} />}
                  variant="outlined"
                  color="neutral"
                  placeholder="Search"
                  sx={{ backgroundColor: "transparent" }}
                />
                <Divider
                  orientation="vertical"
                  sx={{ mx: 1, mt: "5px", mb: "5px" }}
                />
              </>
            )}
            <ThemeToggler />
            {user ? (
              <>
                {" "}
                <IconButton
                  variant="outlined"
                  color="neutral"
                  sx={{ p: "5px", aspectRatio: "1/1" }}
                >
                  <GoBell size={20} />
                </IconButton>
                <Dropdown>
                  <MenuButton
                    sx={{
                      p: 0,
                      border: "none",
                      height: "min-content",
                      borderRadius: "50%",
                    }}
                    size="sm"
                  >
                    <Avatar
                      color="neutral"
                      variant="outlined"
                      src={user.pfp}
                      sx={{ height: "36px", width: " 36px" }}
                    />
                  </MenuButton>
                  <Menu placement="bottom-end">
                    <MenuItem sx={{ px: 3 }}>
                      <ListItemDecorator>
                        <GoPerson size={20} />
                      </ListItemDecorator>
                      Profile
                    </MenuItem>
                    <MenuItem sx={{ px: 3 }}>
                      <ListItemDecorator>
                        <IoBookmarksOutline size={20} />
                      </ListItemDecorator>
                      Bookmarks
                    </MenuItem>
                    <MenuItem sx={{ px: 3 }}>
                      <ListItemDecorator>
                        <IoSettingsOutline size={20} />
                      </ListItemDecorator>
                      Settings
                    </MenuItem>
                    <MenuItem
                      color="danger"
                      sx={{ px: 3 }}
                      onClick={() => dispatch(logoutUser({ navigate }))}
                    >
                      <ListItemDecorator>
                        <GoSignOut size={20} />
                      </ListItemDecorator>
                      Logout
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outlined"
                    color="neutral"
                    startDecorator={<GoSignIn />}
                  >
                    Sign in
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Sheet>
        {isLoading ? (
          <div>
            <LinearProgress thickness={1} />
          </div>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default Navbar;
