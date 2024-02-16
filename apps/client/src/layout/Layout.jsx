import React from "react";
import Navbar from "../components/Navbar";
import { Container } from "@mui/system";
import Footer from "../components/Footer";
import StatusAlert from "../components/SnackbarNotify";
import Test from "../views/Test";
import SnackbarNotify from "../components/SnackbarNotify";
import { Box } from "@mui/joy";

const Layout = ({ children, size = "md" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
        alignItems: "center", // Add alignItems: center
      }}
    >
      <Navbar />
      <Container
        maxWidth={size}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
          alignItems: "center",
          animation: "inAnimation 0.2s ease-in-out forwards",
        }}
        classes={{ root: "fade-in" }}
      >
        <Box
          sx={{
            pt: 2,
            pb: 2,
            flexGrow: 1,
            width: "100%",
            display: "flex",
          }}
        >
          {children}
        </Box>
        <Footer />
      </Container>
      <SnackbarNotify />
    </div>
  );
};

export default Layout;
