import { TOGGLE_SIDEBAR } from '../Actions/ui';

const initialState = {
  sidebarIsActive: false,
};

const ui_reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarIsActive: !state.sidebarIsActive,
      };

    default:
      return state;
  }
};

export default ui_reducer;
