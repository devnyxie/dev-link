import { GET_FEED, UPDATE_ONE_TEAM } from '../Actions/teams';

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
    case UPDATE_ONE_TEAM:
      console.log(action.payload);
      // Update the team in the state based on the action payload
      const updatedFeed = state.feed.map((team) =>
        team.id === action.payload.id ? action.payload : team
      );
      console.log(updatedFeed);
      if (updatedFeed.length === 0) {
        return {
          ...state,
          feed: [action.payload],
        };
      } else {
        return {
          ...state,
          feed: updatedFeed,
        };
      }
    default:
      return state;
  }
};

export default teams_reducer;
