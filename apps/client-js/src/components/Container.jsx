// import CssBaseline from "@mui/material/CssBaseline";
import CssBaseline from "@mui/joy/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import { Container as MUIContainer } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/theme.slice";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

function Container({ children }) {
  const isDarkTheme = useSelector((state) => state.theme);

  const githubTheme = extendTheme({
    transition: "background 5s ease-in-out",
  });

  return (
    <>
      <CssVarsProvider theme={githubTheme}>
        {/* <ThemeProvider theme={themeOpts}> */}
        <CssBaseline />
        <MUIContainer maxWidth="md"> {children}</MUIContainer>
        {/* </ThemeProvider> */}
      </CssVarsProvider>
    </>
  );
}

export default Container;
