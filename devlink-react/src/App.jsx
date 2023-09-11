import { useEffect, useState } from 'react';

import './styles/App.css';
import { Container } from 'react-bootstrap';
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
import Sidebar from './views/main/Sidebar/Sidebar';
import Team_View from './views/team_view/Team_View';
import NewTeam_View from './views/new/NewTeam_View';

function App() {
  const sidebar = useSelector((state) => state.ui_data.sidebarIsActive);
  const user = useSelector((state) => state.user_data.logged_user);
  const isLoggedIn = useSelector((state) => state.user_data.isLoggedIn);
  const teams = useSelector((state) => state.feed.feed);

  return (
    <Router>
      <div className='fs-container text-light position-relative'>
        <div className='container-lg p-0 main d-flex flex-column'>
          {/*note: top bar  */}
          <Main_bar isLoggedIn={isLoggedIn} sidebar={sidebar} />
          {/*note: content (parent div with two layers. one for content and another one for sidebar ) */}
          <div className='d-flex flex-fill position-relative'>
            <div
              className='w-100 h-100 position-absolute'
              style={{ overflowY: 'auto' }}
            >
              <Routes>
                <Route
                  path='/'
                  element={<Main teams={teams} sidebar={sidebar} />}
                />
                <Route
                  path='/login'
                  element={<Login_View />}
                  user={user}
                  isLoggedIn={isLoggedIn}
                />
                <Route path='/team' element={<Team_View teams={teams} />} />
                <Route
                  path='/new'
                  element={<NewTeam_View teams={teams} user={user} />}
                />
              </Routes>
            </div>
            {sidebar ? <Sidebar user={user} /> : <></>}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
