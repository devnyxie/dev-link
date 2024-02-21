import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { finishLoading, startLoading } from "./loading.slice";
import { setSnackbar } from "./snackbar.slice";
import { redirectTo } from "../../utils/utils";
import instance from "../../utils/axiosInstance";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userCredentials }, { dispatch }) => {
    try {
      const response = await instance.post("/api/login", userCredentials);
      if (response.data && response.status === 200) {
        redirectTo("/");
        return response.data;
      }
    } catch (error) {
      throw new Error("Failed to login.");
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

//search for users
export const searchUsers = createAsyncThunk(
  "teams/searchTeams",
  async (name) => {
    try {
      const response = await instance.get(`/api/users/search/${name}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to search users.");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    token: undefined,
    refreshToken: undefined,
    loading: false,
    error: false,
  },
  reducers: {
    clearUser: (state) => {
      state.user = undefined;
      state.token = undefined;
      state.refreshToken = undefined;
    },
    clearToken: (state) => {
      state.token = undefined;
    },
    clearRefreshToken: (state) => {
      state.refreshToken = undefined;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
