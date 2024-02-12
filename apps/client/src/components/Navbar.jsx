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
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
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

  // function toggleDrawer(inOpen) {
  //   console.log("switching ", inOpen);
  //   setOpen(inOpen);
  // }
  //
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
            {isMobile ? (
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
                {/* <Divider
                  orientation="vertical"
                  sx={{ mx: 1, mt: "5px", mb: "5px" }}
                /> */}
              </>
            )}
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
                  disabled
                  variant="outlined"
                  color="neutral"
                  sx={{ p: "5px", aspectRatio: "1/1" }}
                >
                  <GoBell size={20} />
                </IconButton>
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
