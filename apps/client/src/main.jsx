import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import "./css/index.css";
import "./css/githubMarkdown.css";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/home/Home.jsx";
import Layout from "./layout/Layout.jsx";
import LoginPage from "./views/login/LoginPage.jsx";
import NoSuchRoute from "./views/404/404.jsx";
import TeamView from "./views/team/Team.view.jsx";
import NewTeam from "./views/newTeam/NewTeam.jsx";
import { useSelector } from "react-redux";
import { redirectTo } from "./utils/utils.jsx";
import YourTeams from "./views/yourTeams/Teams.view.jsx";
import YourRequests from "./views/yourRequests/Requests.view.jsx";
import TeamSettings from "./views/teamSettings/TeamSettings.jsx";
import SearchModal from "./views/search/SearchModal.jsx";
import Search from "./views/search/Search.view.jsx";

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user); // get user from Redux state
  if (!user) {
    // if user is not logged in, redirect to login page
    redirectTo("/login");
    return null;
  }
  return children;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout size="lg">
        <Home />
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
      <Layout size="lg">
        <TeamView />
      </Layout>
    ),
  },
  {
    path: "/team/:teamId/settings/general",
    element: (
      <Layout size="lg">
        <ProtectedRoute>
          <TeamSettings />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/team/:teamId/settings/private-details",
    element: (
      <Layout size="lg">
        <ProtectedRoute>
          <TeamSettings />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/team/create",
    element: (
      <Layout>
        <ProtectedRoute>
          <NewTeam />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/requests",
    element: (
      <Layout>
        <ProtectedRoute>
          <YourRequests />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/teams",
    element: (
      <Layout>
        <ProtectedRoute>
          <YourTeams />
        </ProtectedRoute>
      </Layout>
    ),
  },
  //add modal route, which don't change initial content
  {
    path: "/search",
    element: (
      <Layout>
        <Search />
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

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          //indigo
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
          softBg: "var(--joy-palette-primary-50)",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          //indigo
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
          softBg: "var(--joy-palette-primary-950)",
        },
      },
    },
  },
});

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
