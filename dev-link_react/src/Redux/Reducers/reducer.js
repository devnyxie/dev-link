import teams_reducer from './teams_reducer';
import ui_reducer from './ui_reducer';
import users_reducer from './users_reducer';

export default function Reducer(state = {}, action) {
  return {
    // planets_data: Planets_Reducer(state.planets_data, action),
    feed: teams_reducer(state.feed, action),
    user_data: users_reducer(state.user_data, action),
    ui_data: ui_reducer(state.ui_data, action),
  };
}
