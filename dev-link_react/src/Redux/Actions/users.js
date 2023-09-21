import { CHANGE_STATUS, setLoading, unsetLoading } from "./ui";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_ONE_USER = "GET_ONE_USER";

//actions
export const login = ({ username, password, setResult }) => {
  console.log("Login action. Got: ", username, password);
  return async (dispatch, getState) => {
    dispatch(setLoading());
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );

      if (response.ok) {
        dispatch({
          type: CHANGE_STATUS,
          payload: {
            status: response.status,
            text: "You have logged in successfully.",
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
            text: "Invalid login credentials.",
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
          console.log("Error fetching data");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
