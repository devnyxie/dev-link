import { DELETE_ONE_TEAM, GET_FEED, UPDATE_ONE_TEAM } from '../Actions/teams';

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
    case DELETE_ONE_TEAM:
      const team_id_to_delete = action.payload;
      const DELETE_ONE_TEAM_feed = state.feed.map((team) =>
        team.id === team_id_to_delete ? undefined : team
      );
      return {
        ...state,
        feed: DELETE_ONE_TEAM_feed,
      };

    default:
      return state;
  }
};

export default teams_reducer;
