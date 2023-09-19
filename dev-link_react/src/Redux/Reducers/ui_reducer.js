import { CHANGE_STATUS, TOGGLE_SIDEBAR } from "../Actions/ui";

const initialState = {
  sidebarIsActive: false,
  alert_widget: { status: null, text: null },
  isLoading: false,
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
        alert_widget: action.payload,
      };
    //loading
    case "SET_LOADING":
      return { ...state, isLoading: true };

    case "UNSET_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default ui_reducer;
