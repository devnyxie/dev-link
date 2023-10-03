import { useDispatch } from 'react-redux';
import { CHANGE_STATUS, setLoading, unsetLoading } from './ui';
import { useNavigate } from 'react-router-dom';

//exports
export const GET_FEED = 'GET_FEED';
export const UPDATE_ONE_TEAM = 'UPDATE_ONE_TEAM';
//actions

export const updateTeamAction = (team) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading());
      dispatch({
        type: UPDATE_ONE_TEAM,
        payload: team,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(unsetLoading());
  };
};

//feed
export const getTeams = ({ offset, limit }) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading());
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_LINK
        }/feed?offset=${offset}&limit=${limit}`
      );
      if (response.ok) {
        let feed = await response.json();
        console.log(feed);
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
    dispatch(unsetLoading());
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
        // setTeam(team);
        dispatch(updateTeamAction(team));
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//create team
export const createTeam = ({ team, setRes }) => {
  console.log('New post req. Got: ', team);
  return async (dispatch, getState) => {
    dispatch(setLoading());
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
        setRes(true);
      } else {
        dispatch({
          type: CHANGE_STATUS,
          payload: {
            status: 400,
            text: 'An error occured while creating a team.',
          },
        });
        console.log('Error creationg a team');
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: CHANGE_STATUS,
        payload: {
          status: 500,
          text: 'An unexpected error occured while creating a team.',
        },
      });
    }
    dispatch(unsetLoading());
  };
};
//join team
export const joinOrLeave = ({ member_id, team_id, method }) => {
  console.log('Join/Leave req. Member id: ', member_id);
  return async (dispatch, getState) => {
    dispatch(setLoading());
    const user = getState().user_data.logged_user;
    if (!user.id) {
      dispatch({
        type: CHANGE_STATUS,
        payload: {
          status: 403,
          text: 'You must log in to have the ability to join a team.',
        },
      });
    } else {
      try {
        const requestBody = JSON.stringify({
          user_id: user.id,
          member_id: member_id,
        });
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/teams/join_or_leave`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: requestBody,
          }
        );
        if (response.ok) {
          //change status - successful widget
          dispatch({
            type: CHANGE_STATUS,
            payload: {
              status: 200,
              text: `You successfully ${
                method === 'join' ? 'joined' : 'left'
              } the team.`,
            },
          });
          //
          let teams = getState().feed.feed;
          console.log('Teams: ', teams);
          let team = teams.find((team) => team.id === team_id);
          console.log('team found:', team.id);
          console.log('method:', method);
          if (method === 'join') {
            console.log('join');
            let OpenRole = team.open_roles.find(
              (slot) => slot.member_id === member_id
            );
            console.log('OpenRole:', OpenRole);
            let open_role_with_user = {
              member_id: OpenRole.member_id,
              role: OpenRole.role,
              user_id: user.id,
              ...user,
            };
            team.open_roles = team.open_roles.filter(
              (slot) => slot.member_id !== member_id
            );
            team.members.push(open_role_with_user);
            dispatch(updateTeamAction(team));
          } else if (method === 'leave') {
            console.log('leave');
            //broken leaving
            let member = team.members.find(
              (member) => member.member_id === member_id
            );
            const clean_members = team.members.filter(
              (slot) => slot.member_id !== member_id
            );
            team.members = clean_members;
            team.open_roles.push({
              role: member.role,
              user_id: null,
              member_id: member_id,
            });
            dispatch(updateTeamAction(team));
          }
          //1. get team, find the right team, add member, dispatch.
        } else if (response.status === 409) {
          console.log('DUPLICATE.');
          dispatch({
            type: CHANGE_STATUS,
            payload: {
              status: response.status,
              text: 'You are already part of this team.',
            },
          });
        } else {
          console.log('Error creationg a team');
        }
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(unsetLoading());
  };
};
