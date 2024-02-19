import axios from "axios";
import { getStore } from "../redux/store/store";
import { expireSession } from "./utils";
import { setSnackbar } from "../redux/slices/snackbar.slice";
import { finishLoading, startLoading } from "../redux/slices/loading.slice";

const instance = axios.create({
  baseURL: process.env.VITE_APP_SERVER_URL,
});

instance.interceptors.request.use(async (config) => {
  const store = getStore();
  //start loader
  store.dispatch(startLoading());
  const state = store.getState();
  const token = state.user.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    //finish loading
    const store = getStore();
    store.dispatch(finishLoading());
    if (response.data.message) {
      store.dispatch(
        setSnackbar({ message: response.data.message, color: "success" })
      );
    }
    // If the response was successful, there's no need to do anything
    return response;
  },
  async (error) => {
    //get store
    const store = getStore();
    //finish loading
    store.dispatch(finishLoading());
    const state = store.getState();
    const originalRequest = error.config;

    // 401 error
    if (
      error.response &&
      error.response.status === 401 &&
      (!originalRequest._retryCount || originalRequest._retryCount < 2)
    ) {
      const refreshToken = state.user.refreshToken;
      //safety check
      if (!refreshToken) {
        expireSession();
        return Promise.reject(error);
      }
      //request new token using refresh token and retry the original request
      originalRequest._retry = true;
      originalRequest._retryCount = originalRequest._retryCount
        ? originalRequest._retryCount + 1
        : 1;
      try {
        console.log("refreshToken", refreshToken);
        const response = await instance.post("/api/refresh-token", {
          refreshToken,
        });
        console.log("res token:", response.data.token);
        if (response.status === 200) {
          // Update token in store
          store.dispatch({
            type: "user/updateToken",
            payload: response.data.token,
          });

          // Modify the Authorization header
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          // Retry the original request
          return instance(originalRequest);
        } else {
          // Refresh Token expired
          expireSession();
          return Promise.reject(error);
        }
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    }
    let message;
    if (error.response) {
      message = error.response.data.message;
    } else {
      message = null;
    }
    // error snackbar
    store.dispatch(
      setSnackbar({
        message: message,
      })
    );
    //
    return Promise.reject(error);
  }
);

export default instance;
