import { useDispatch } from 'react-redux';

//exports
export const GET_FEED = 'GET_FEED';

//actions

//feed
export const getTeams = ({ from, to }) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/feed?from=${from}&to=${to}`
      );
      if (response.ok) {
        let feed = await response.json();
        dispatch({
          type: GET_FEED,
          payload: feed,
        });
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//get one team
export const getOneTeam = ({ id, setTeam }) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/teams/${id}`
      );
      if (response.ok) {
        let team = await response.json();
        setTeam(team);
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//create team
export const createTeam = (team) => {
  console.log('New post req. Got: ', team);
  return async (dispatch, getState) => {
    try {
      const requestBody = JSON.stringify(team);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/teams`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        }
      );

      if (response.ok) {
        console.log('Team was created.');
        let team = await response.json();
      } else {
        console.log('Error creationg a team');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
