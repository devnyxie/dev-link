import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeam = createAsyncThunk("teams/fetchTeams", async () => {
  const response = await axios.get(
    process.env.VITE_APP_SERVER_URL + "/api/teams"
  );
  return response.data;
});

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    teams: null,
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
        state.teams = action.payload;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default teamsSlice;
