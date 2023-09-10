export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_ONE_USER = 'GET_ONE_USER';

//actions
export const login = ({ username, password, setResult }) => {
  console.log('Login action. Got: ', username, password);
  return async (dispatch, getState) => {
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
        console.log('Login successful.');
        let user = await response.json();
        dispatch({
          type: LOGIN,
          payload: user,
        });
        setResult(true);
      } else {
        console.log('Error logging in');
        setResult(false);
      }
    } catch (error) {
      console.log(error);
      setResult(false);
    }
  };
};
//get one user
export const getOneUser = ({ id, setUser }) => {
  return async (dispatch, getState) => {
    try {
      const alreadyFetchedUser = getState().user_data[`user_${id}`];
      if (alreadyFetchedUser) {
        setUser(alreadyFetchedUser);
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/users/${id}`
        );
        if (response.ok) {
          let user = await response.json();
          setUser(user);
          dispatch({
            type: GET_ONE_USER,
            payload: user,
          });
        } else {
          console.log('Error fetching data');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
