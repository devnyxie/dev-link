import { useState } from "react";
import Container from "./components/Container";
import { Avatar, Box, IconButton, Sheet } from "@mui/joy";
// import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Grid from "@mui/joy/Grid";
import SearchBar from "./components/SearchBar";
import ThemeToggler from "./components/ThemeToggler";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Container>
        <Navbar />
        <Feed />
        <Footer />
      </Container>
    </>
  );
}

export default App;
