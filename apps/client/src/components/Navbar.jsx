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
import React, { useEffect } from "react";
import { GoBell } from "react-icons/go";
import { useMediaQuery } from "react-responsive";
import ThemeToggler from "./ThemeToggler";
import { useSelector } from "react-redux";
import { logoutUser, selectUser } from "../redux/slices/user.slice";
import { GoSignIn } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import Brand from "./Brand";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import { GoPlus } from "react-icons/go";
import SearchModal from "./SearchModal";
import Notifications from "../views/notifications/Notifications.view";
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [searchModalOpen, setSearchModalOpen] = React.useState(false);
  const [notificationsModalOpen, setNotificationsModalOpen] =
    React.useState(false);

  const isLoading = useSelector((state) => state.loading);
  const { user } = useSelector(selectUser);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1400px)",
  });
  //
  const toggleDrawer = (inOpen) => (event) => {
    setOpen(inOpen);
    console.log("switching ", inOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
            <Button
              variant="outlined"
              color="neutral"
              // startDecorator={}
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
              onClick={() => setSearchModalOpen(true)}
            >
              <CiSearch size={20} />
              {isMobile ? (
                <> </>
              ) : (
                <>
                  <Typography color="neutral" level="title-sm">
                    Search
                  </Typography>
                  <Sheet
                    variant="outlined"
                    sx={{ borderRadius: "sm", px: 0.5 }}
                  >
                    <Typography color="neutral" level="title-sm">
                      Ctrl+K
                    </Typography>
                  </Sheet>
                </>
              )}
            </Button>
            <SearchModal open={searchModalOpen} setOpen={setSearchModalOpen} />
            <ThemeToggler />
            <Divider
              orientation="vertical"
              sx={{ mx: 1, mt: "5px", mb: "5px" }}
            />
            {user ? (
              <>
                <Link to="/team/create">
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    sx={{ p: "5px", aspectRatio: "1/1" }}
                  >
                    <GoPlus size={20} />
                  </IconButton>
                </Link>

                <IconButton
                  onClick={() => setNotificationsModalOpen(true)}
                  variant="outlined"
                  color="neutral"
                  sx={{ p: "5px", aspectRatio: "1/1" }}
                >
                  <GoBell size={20} />
                </IconButton>
                <Notifications
                  open={notificationsModalOpen}
                  setOpen={setNotificationsModalOpen}
                />
                <IconButton
                  style={{ borderRadius: "50%", aspectRatio: 1 / 1 }}
                  onClick={() => setOpen(!open)}
                >
                  <Avatar
                    color="neutral"
                    variant="outlined"
                    src={user.pfp}
                    sx={{ height: "36px", width: " 36px" }}
                  />
                </IconButton>
                <Sidebar
                  toggleDrawer={toggleDrawer}
                  setOpen={setOpen}
                  open={open}
                  user={user}
                  isMobile={isMobile}
                  isTablet={isTablet}
                />
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
