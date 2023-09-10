import { LOGIN, LOGOUT, GET_ONE_USER } from '../Actions/users';

const initialState = {
  isLoggedIn: false,
  logged_user: {},
};

const users_reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        logged_user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        logged_user: {},
        isLoggedIn: false,
      };
    case GET_ONE_USER:
      return {
        ...state,
        [`user_${action.payload.id}`]: action.payload,
      };
    default:
      return state;
  }
};

export default users_reducer;
