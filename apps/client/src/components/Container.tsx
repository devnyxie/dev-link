import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { ReactNodeInterface } from "../interfaces/ReactNode";
import { themeOptions } from "./Theme";
import { Container as MUIContainer } from "@mui/material";

function Container({ children }: ReactNodeInterface) {
  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <MUIContainer maxWidth="md"> {children}</MUIContainer>
    </ThemeProvider>
  );
}

export default Container;
