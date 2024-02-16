import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import "./css/index.css";
import "./css/githubMarkdown.css";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Feed from "./views/home/Feed.jsx";
import ErrorPage from "./views/error/ErrorPage.jsx";
import Layout from "./layout/Layout.jsx";
import LoginPage from "./views/login/LoginPage.jsx";
import NoSuchRoute from "./views/404/404.jsx";
import TeamView from "./views/team/Team.view.jsx";
import NewTeam from "./views/newTeam/NewTeam.jsx";
import { useSelector } from "react-redux";
import { redirectTo } from "./utils/utils.jsx";

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user); // get user from Redux state
  console.log("protected route", user);
  if (!user) {
    // if user is not logged in, redirect to login page
    redirectTo("/login");
    return null;
  }
  return children;
}

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
      <Layout size="lg">
        <TeamView />
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
