import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import "./css/index.css";
import "./css/githubMarkdown.css";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./views/home/Feed.jsx";
import ErrorPage from "./views/error/ErrorPage.jsx";
import Layout from "./layout/Layout.jsx";
import LoginPage from "./views/login/LoginPage.jsx";
import NoSuchRoute from "./views/404/404.jsx";
import TeamView from "./views/team/Team.view.jsx";
import NewTeam from "./views/newTeam/NewTeam.jsx";

const theme = extendTheme({});

export const router = createBrowserRouter([
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
    path: "/team/:teamId",
    element: (
      <Layout>
        <TeamView />
      </Layout>
    ),
  },
  {
    path: "/team/create",
    element: (
      <Layout>
        <NewTeam />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <NoSuchRoute />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} history={history} />
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
