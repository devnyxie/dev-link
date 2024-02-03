import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { Container as MUIContainer } from "@mui/system";

function Container({ children }) {
  return (
    <>
      <MUIContainer maxWidth="md"> {children}</MUIContainer>
      {/* <div className="container"> {children}</div> */}
    </>
  );
}

export default Container;
