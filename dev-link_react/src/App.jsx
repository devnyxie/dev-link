import { useEffect, useState } from 'react';

import './styles/App.css';
import { Alert, Container, Tooltip } from 'react-bootstrap';
import Theme_switcher from './components/Theme_switcher';
// import MainContainer from './views/main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from './Redux/Actions/teams';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Main from './views/main/Main';
import Login_View from './views/login/Login_View';
import Main_bar from './views/main/Main_bar';
import Team_View from './views/team_view/Team_View';
import NewOrEditTeam_View from './views/new/NewOrEditTeam_View';
import Alert_widget from './components/Alert/Alert_widget';
import Loader_component from './components/loader/Loader_component';
import Sidebar from './components/Sidebar/Sidebar';
import { TOGGLE_SIDEBAR_OFF } from './Redux/Actions/ui';
import Settings_view from './views/settings/Settings_view';
import Profile_view from './views/profile/Profile_view';
import Tooltip_component from './components/Tooltip/Tooltip_component';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  //sidebar [off] on route change:
  useEffect(() => {
    dispatch({
      type: TOGGLE_SIDEBAR_OFF,
    });
  }, [location]);
  const sidebar = useSelector((state) => state.ui_data.sidebarIsActive);
  const alert_widget = useSelector((state) => state.ui_data.alert_widget);
  const isLoading = useSelector((state) => state.ui_data.isLoading);
  const user = useSelector((state) => state.user_data.logged_user);
  const isLoggedIn = useSelector((state) => state.user_data.isLoggedIn);
  const teams = useSelector((state) => state.feed.feed);
  return (
    <div
      className="fs-container text-light position-relative"
      style={{ overflow: 'hidden' }}
    >
      <div className="container-lg p-0 main d-flex flex-column">
        {/*Tooltip*/}
        <Tooltip_component />
        {/*note: top bar  */}
        <Main_bar isLoggedIn={isLoggedIn} sidebar={sidebar} />
        {/*note: content (parent div with two layers. one for content and another one for sidebar ) */}
        <div className="d-flex flex-fill position-relative">
          {alert_widget ? <Alert_widget alert_widget={alert_widget} /> : <></>}
          {isLoading ? <Loader_component /> : <></>}
          <div
            className="w-100 h-100 position-absolute"
            style={{ overflowY: 'auto' }}
          >
            <Routes>
              <Route path="/" element={<Main teams={teams} user={user} />} />
              <Route
                path="/login"
                element={<Login_View />}
                user={user}
                isLoggedIn={isLoggedIn}
              />
              <Route
                path="/team"
                element={<Team_View teams={teams} user={user} />}
              />
              {/* create, edit, del */}
              <Route
                path="/new"
                element={<NewOrEditTeam_View teams={teams} user={user} />}
              />
              <Route
                path="/edit"
                element={<NewOrEditTeam_View teams={teams} user={user} />}
              />
              {/* settings */}
              <Route path="/settings" element={<Settings_view user={user} />} />
              {/* personal profile & other profiles */}
              <Route
                path="/profile/:username"
                element={<Profile_view logged_user={user} />}
              />
              <Route
                path="/profile"
                element={<Profile_view logged_user={user} />}
              />
            </Routes>
          </div>
          {sidebar ? <Sidebar user={user} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default App;
