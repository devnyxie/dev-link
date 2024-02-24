import { router } from "../main";
import { setSnackbar } from "../redux/slices/snackbar.slice";
import { getStore } from "../redux/store/store";

export function redirectTo(path) {
  router.navigate(path);
}

export function expireSession() {
  const store = getStore();
  redirectTo("/login");
  console.log("redirected");
  store.dispatch({
    type: "user/clearUser",
  });
  store.dispatch({
    type: "snackbar/setSnackbar",
    payload: {
      message: "Session expired. Please sign in again.",
      color: "danger",
    },
  });
  console.log("dispatch");
}

export const timeFormatter = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
