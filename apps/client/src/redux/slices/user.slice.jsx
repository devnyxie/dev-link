import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { finishLoading, startLoading } from "./loading.slice";
import { setSnackbar } from "./snackbar.slice";
import { redirectTo } from "../../utils/utils";
// import history from "../../utils/history";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userCredentials }, { dispatch }) => {
    let alert = {};
    try {
      dispatch(startLoading());
      const response = await axios.post(
        process.env.VITE_APP_SERVER_URL + "/api/login",
        userCredentials
      );
      if (response.data && response.status === 200) {
        dispatch(finishLoading());
        dispatch(
          setSnackbar({ message: response.data.message, color: "success" })
        );
        redirectTo("/");
        return response.data.user;
      }
    } catch (error) {
      console.log("error...");
      if (error.response) {
        dispatch(
          setSnackbar({
            message: error.response.data.message,
            color: "danger",
          })
        );
      } else {
        dispatch(setSnackbar());
      }
      throw error;
    } finally {
      dispatch(finishLoading());
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    try {
      dispatch(userSlice.actions.clearUser());
      redirectTo("/login");
      dispatch(
        setSnackbar({
          message: "You have successfully logged out",
          color: "success",
        })
      );
    } catch (error) {
      console.log("Logout error: ", error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    loading: false,
    error: false,
  },
  reducers: {
    clearUser: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
