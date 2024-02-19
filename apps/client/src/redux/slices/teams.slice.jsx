import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redirectTo } from "../../utils/utils";
import instance from "../../utils/axiosInstance";

export const fetchTeam = createAsyncThunk(
  "teams/fetchTeams",
  async ({ offset, limit }) => {
    try {
      const response = await instance.get(
        `/api/teams?offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch teams.");
    } finally {
    }
  }
);

export const findTeamById = createAsyncThunk(
  "teams/findByIdStatus",
  async (id, { getState, dispatch }) => {
    let team = undefined;
    try {
      const state = getState();
      console.log("state", state);
      const teams = state.teams.teams;
      const teamRes = teams.find((team) => team.id === id);
      if (teamRes) {
        team = teamRes;
      } else {
        console.log("fetching from server");
        const response = await instance.get(`/api/teams/${id}`);
        console.log("response");
        console.log(response);
        if (response.data.id) {
          team = response.data;
        } else {
          throw new Error("Failed to fetch team.");
        }
      }
    } catch (error) {
      console.log("error, redirecting to 404...");
      redirectTo("/404");
      throw new Error("Failed to fetch team.");
    }
    return team;
  }
);

export const createTeam = createAsyncThunk("teams/createTeam", async (data) => {
  try {
    const response = await instance.post(`/api/teams`, data);
    if (response.status === 200) {
      redirectTo("/team/" + response.data.team.id);
      return response.data;
    } else {
      throw new Error("Failed to create team.");
    }
  } catch (error) {
    console.log(error.response);
    throw new Error("Failed to create team.");
  }
});

export const createRequest = createAsyncThunk(
  "teams/createRequest",
  async (request) => {
    let res = undefined;
    try {
      const response = await instance.post(`/api/requests`, request);
      if (response.status === 200) {
        res = response.data;
      } else {
        throw new Error("Failed to send request.");
      }
    } catch (error) {
      console.log(error.response);
      throw new Error("Failed to send request.");
    } finally {
      return res;
    }
  }
);

//get all requests of a  user from "/api/requests/user/:id"
export const fetchRequestsByUserId = createAsyncThunk(
  "teams/fetchRequestsByUserId",
  async (userId) => {
    try {
      const response = await instance.get(`/api/requests/user/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch requests.");
    }
  }
);
//delete request by request id
export const deleteRequest = createAsyncThunk(
  "teams/deleteRequest",
  async (requestId) => {
    try {
      const response = await instance.delete(`/api/requests/${requestId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete request.");
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
  reducers: {
    updateOneTeamById: (state, action) => {
      console.log("updateOneTeamById");

      const team = action.payload;
      const index = state.teams.findIndex((t) => t.id === team.id);
      if (index !== -1) {
        console.log("if");
        // state.teams = state.teams.map((teamOld, i) =>
        //   i === index ? team : teamOld
        // );
        state.teams = state.teams.map((teamOld, i) =>
          i === index ? { ...team } : { ...teamOld }
        );
      } else {
        console.log("else");
        state.teams = [...state.teams, team];
      }
      state.count = state.teams.length;
      console.log("state.teams", state.teams);
    },
  },
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

export const { updateOneTeamById } = teamsSlice.actions;
export default teamsSlice;
