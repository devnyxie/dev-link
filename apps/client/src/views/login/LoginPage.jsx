import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Sheet,
  Snackbar,
  Stack,
  Input,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import Logo from "../../components/Logo";
import { GoPerson } from "react-icons/go";
import { BsKey } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/user.slice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const handleLogin = () => {
    dispatch(
      loginUser({
        userCredentials: { username, password },
      })
    );
  };

  return (
    <Box
      maxWidth="sm"
      sx={{
        flexGrow: 1,
        position: "relative",
        width: "max-content",
        maxWidth: "400px",
        paddingBottom: "15%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "30%", userSelect: "none" }}>
        <Logo />
      </Box>

      <Typography
        level="h3"
        sx={{
          fontWeight: "400",
          pb: 2,
        }}
      >
        Sign In to Dev-Link
      </Typography>
      <Sheet
        variant="outlined"
        sx={{ width: "100%", p: 2, borderRadius: "sm" }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
          spacing={1}
        >
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              startDecorator={<GoPerson />}
              type="text"
              placeholder="Username"
              className={error ? "error-neutral-border-animation" : ""}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startDecorator={<BsKey />}
              type="password"
              placeholder="Password"
              className={error ? "error-neutral-border-animation" : ""}
            />
          </FormControl>

          <Box>
            <Button variant="outlined" onClick={handleLogin}>
              Sign in
            </Button>
          </Box>
        </Stack>
      </Sheet>
      <Divider sx={{ mt: 2, mb: 2, mx: 4 }} />
      <Sheet
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: "sm",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
          spacing={1}
        >
          <Typography
            sx={{
              fontWeight: "400",
            }}
          >
            New to Dev-Link?
          </Typography>
          <Button variant="outlined" disabled>
            Sign up
          </Button>
        </Stack>
      </Sheet>
    </Box>
  );
};

export default LoginPage;
