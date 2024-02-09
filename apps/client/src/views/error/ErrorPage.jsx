import { Box } from "@mui/joy";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
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
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </Box>
  );
}
