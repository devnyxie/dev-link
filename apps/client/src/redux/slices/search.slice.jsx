import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../utils/axiosInstance";

// --- search for teams
export const searchTeams = createAsyncThunk(
  "search/searchTeams",
  async (name, { dispatch }) => {
    try {
      const response = await instance.get(`/api/teams/search/${name}`);
      if (response.status === 200) {
        dispatch(
          searchSlice.actions.setSearchResults({ teams: response.data })
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to search teams.");
    }
  }
);
// --- search for teams by their technologies
export const searchTeamsByTechnology = createAsyncThunk(
  "search/searchTeamsByTechnology",
  async (name, { dispatch }) => {
    try {
      const response = await instance.get(
        `/api/teams/search/technology/${name}`
      );
      if (response.status === 200) {
        dispatch(
          searchSlice.actions.setSearchResults({ teams: response.data })
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to search teams by technology.");
    }
  }
);
// --- search for users
export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async (name, { dispatch }) => {
    try {
      const response = await instance.get(`/api/users/search/${name}`);
      if (response.status === 200) {
        dispatch(
          searchSlice.actions.setSearchResults({ users: response.data })
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to search users.");
    }
  }
);
// --- search for technologies
export const searchTechnologies = createAsyncThunk(
  "search/searchTechnologies",
  async (name, { dispatch }) => {
    try {
      const response = await instance.get(`/api/technologies/search/${name}`);
      if (response.status === 200) {
        dispatch(
          searchSlice.actions.setSearchResults({ technologies: response.data })
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to search technologies.");
    }
  }
);
// --- QuickSearch for all (teams, users, technologies)
export const quickSearch = createAsyncThunk(
  "teams/quickSearch",
  async (query, { dispatch }) => {
    try {
      const response = await instance.get(`/api/quicksearch/${query}`);
      if (response.status === 200) {
        const { teams, users, technologies } = response.data;
        dispatch(
          searchSlice.actions.setSearchResults({ teams, users, technologies })
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to perform quick search.");
    }
  }
);

const initialState = {
  searchResults: {}, // *could be array of obj or obj of arrays. That's why we make it obj: {users: [], teams: []}. We always will know what we are getting.
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchResults, setLoading, setError } = searchSlice.actions;

export default searchSlice.reducer;
