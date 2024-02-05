import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import "./css/index.css";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./views/feed/Feed.jsx";
import ErrorPage from "./views/error/ErrorPage.jsx";
import Layout from "./layout/Layout.jsx";
import LoginPage from "./views/login/LoginPage.jsx";

const theme = extendTheme({});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Feed />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: "/test",
    element: <Layout>{/* <PaginatedItems itemsPerPage={4} /> */}</Layout>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
