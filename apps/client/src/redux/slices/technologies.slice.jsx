//setup redux slice for technologies

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../utils/axiosInstance";

const initialState = {
  trendingTechnologies: [],
  loading: false,
  error: null,
};

//get request to "/api/teamCodeLangs/top10"
// export const getTrendingTechnologies = () => async (dispatch) => {

// };

export const getTrendingTechnologies = createAsyncThunk(
  "teams/getTrendingTechnologies",
  async (_, { getState, dispatch }) => {
    dispatch(setLoading(true));
    try {
      const state = getState();
      if (state.technologies.trendingTechnologies.length > 0) {
        return state.technologies.trendingTechnologies;
      }
      const response = await instance.get("/api/trendingTechnologies");
      console.log(response);
      dispatch(setTechnologies(response.data));
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const technologiesSlice = createSlice({
  name: "technologies",
  initialState,
  reducers: {
    setTechnologies: (state, action) => {
      state.trendingTechnologies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTechnologies, setLoading, setError } =
  technologiesSlice.actions;

export default technologiesSlice.reducer;
