import { CHANGE_STATUS, TOGGLE_SIDEBAR, setLoading, unsetLoading } from './ui';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_ONE_USER = 'GET_ONE_USER';

//actions
export const login = ({ username, password, setResult }) => {
  console.log('Login action. Got: ', username, password);
  return async (dispatch, getState) => {
    dispatch(setLoading());
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        }
      );

      if (response.ok) {
        dispatch({
          type: CHANGE_STATUS,
          payload: {
            status: response.status,
            text: 'You have logged in successfully.',
          },
        });
        let user = await response.json();
        dispatch({
          type: LOGIN,
          payload: user,
        });
        setResult(true);
      } else {
        dispatch({
          type: CHANGE_STATUS,
          payload: {
            status: response.status,
            text: 'Invalid login credentials.',
          },
        });
        setResult(false);
      }
    } catch (error) {
      console.log(error);
      setResult(false);
    }
    dispatch(unsetLoading());
  };
};
export const logout = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading());
    try {
      dispatch({
        type: LOGOUT,
        payload: {},
      });
      dispatch({
        type: TOGGLE_SIDEBAR,
      });
    } catch (error) {
      console.log(error);
      setResult(false);
    }
    dispatch(unsetLoading());
  };
};
//get one user
// export const getOneUser = ({ id, setUser }) => {
//   return async (dispatch, getState) => {
//     try {
//       const alreadyFetchedUser = getState().user_data[`user_${id}`];
//       if (alreadyFetchedUser) {
//         setUser(alreadyFetchedUser);
//       } else {
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_LINK}/users/${id}`
//         );
//         if (response.ok) {
//           let user = await response.json();
//           setUser(user);
//           dispatch({
//             type: GET_ONE_USER,
//             payload: user,
//           });
//         } else {
//           console.log('Error fetching data');
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

//get one user by username
export const getOneUser = ({ username, id, setRes }) => {
  return async (dispatch, getState) => {
    try {
      let link = `${import.meta.env.VITE_BACKEND_LINK}/users`;
      if (username && !id) {
        link = link + `?username=${username}`;
      } else if (id && !username) {
        link = link + `?id=${id}`;
      }
      const response = await fetch(link);
      if (response.ok) {
        let user = await response.json();
        setRes(user);
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = ({ credentials }) => {
  console.log('updateUser action. Got: ', credentials);
  return async (dispatch, getState) => {
    dispatch(setLoading());
    const user_id = getState().user_data.logged_user.id;
    try {
      const requestBody = JSON.stringify(credentials);
      console.log('Updating: ', requestBody);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/users/${user_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        }
      );
      if (response.ok) {
        dispatch({
          type: CHANGE_STATUS,
          payload: {
            status: response.status,
            text: 'Your credentials were updated successfully.',
          },
        });
        let user = await response.json();
        dispatch({
          type: LOGIN,
          payload: user,
        });
      } else {
        dispatch({
          type: CHANGE_STATUS,
          payload: {
            status: response.status,
            text: 'Something went wrong.',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(unsetLoading());
  };
};
