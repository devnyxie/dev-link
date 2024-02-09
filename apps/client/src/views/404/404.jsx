import { Box, Button } from "@mui/joy";
import { Link, useRouteError } from "react-router-dom";

export default function NoSuchRoute() {
  // const error = useRouteError();
  return (
    <Box
      id="error-page"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pb: 5,
      }}
    >
      <h1>404</h1>
      <p>
        Lost in space? Fear not, our cosmic crew is navigating the stars to
        guide you back home!
      </p>
      <Link to="/">
        <Button variant="outlined" color="neutral">
          Beam Me Back Home
        </Button>
      </Link>
    </Box>
  );
}
