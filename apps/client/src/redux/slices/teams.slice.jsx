import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { finishLoading, startLoading } from "./loading.slice";
import { useDispatch } from "react-redux";
import { setAlert } from "./alertSlice";

export const fetchTeam = createAsyncThunk(
  "teams/fetchTeams",
  async ({ offset, limit }, { dispatch }) => {
    try {
      dispatch(startLoading());
      const response = await axios.get(
        `${process.env.VITE_APP_SERVER_URL}/api/teams?offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      dispatch(setAlert());
      throw new Error("Failed to fetch teams.");
    } finally {
      dispatch(finishLoading());
    }
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload.teams;
        state.count = action.payload.count;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default teamsSlice;
