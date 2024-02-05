import React from "react";
import Navbar from "../components/Navbar";
import { Container } from "@mui/system";
import Footer from "../components/Footer";
import StatusAlert from "../components/AlertSnackbar";

const Layout = ({ children }) => {
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
        maxWidth="md"
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
        {children} <Footer />
      </Container>
      <StatusAlert />
    </div>
  );
};

export default Layout;
