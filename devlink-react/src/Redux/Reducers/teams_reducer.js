import { GET_FEED } from '../Actions/teams';

const initialState = {
  feed: [],
};

const teams_reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED:
      return {
        ...state,
        feed: action.payload,
      };

    default:
      return state;
  }
};

export default teams_reducer;
