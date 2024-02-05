import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { finishLoading, startLoading } from "./loading.slice";
import { useDispatch } from "react-redux";
import { setSnackbar } from "./snackbar.slice";

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
      dispatch(setSnackbar());
      throw new Error("Failed to fetch teams.");
    } finally {
      dispatch(finishLoading());
    }
  }
);

export const findTeamById = createAsyncThunk(
  "teams/findByIdStatus",
  async (id, { getState, dispatch }) => {
    let team = undefined;
    try {
      //
      dispatch(startLoading());
      const state = getState();
      const teams = state.teams.teams;
      const teamRes = teams.find((team) => team.id === id);
      if (teamRes) {
        team = teamRes;
      } else {
        const response = await axios.get(
          `${process.env.VITE_APP_SERVER_URL}/api/teams/${id}`
        );
        if (response.data.id) {
          team = response.data;
        } else {
          throw new Error("Failed to fetch team.");
        }
      }
    } catch (error) {
      dispatch(
        setSnackbar({
          message: error.response
            ? error.response.data.message
            : "Team was not found",
          color: "danger",
        })
      );
      throw new Error("Failed to fetch team.");
    } finally {
      dispatch(finishLoading());
    }
    return team;
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
