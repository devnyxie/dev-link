import { CHANGE_STATUS, TOGGLE_SIDEBAR } from "../Actions/ui";

const initialState = {
  sidebarIsActive: false,
  status: null,
};

const ui_reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarIsActive: !state.sidebarIsActive,
      };
    case CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default ui_reducer;
