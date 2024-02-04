import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { finishLoading, startLoading } from "./loading.slice";
import { setAlert } from "./alertSlice";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userCredentials, navigate }, { dispatch }) => {
    let alert = {};
    try {
      dispatch(startLoading());
      const response = await axios.post(
        process.env.VITE_APP_SERVER_URL + "/api/login",
        userCredentials
      );
      if (response.data && response.status === 200) {
        alert = { message: response.data.message, status: response.status };
        dispatch(finishLoading());
        dispatch(setAlert(alert));
        navigate("/");
        console.log("----------", response.data.user);
        return response.data.user;
      }
    } catch (error) {
      console.log("error...");
      if (error.response) {
        console.log(
          "setting normal alert...",
          error.response.data.message,
          error.response.status
        );
        dispatch(
          setAlert({
            message: error.response.data.message,
            status: error.response.status,
          })
        );
      } else {
        dispatch(setAlert());
      }

      throw error;
    } finally {
      dispatch(finishLoading());
    }
    // dispatch(setAlert({ status: 500, message: "test" }));
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async ({ navigate }, { dispatch }) => {
    try {
      dispatch(userSlice.actions.clearUser());
      navigate("/login");
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
