import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWeatherByLocation,
  fetchDailyWeatherByLocation,
  fetchWeatherByCity,
  fetchDailyWeatherByCity,
} from "./weatherThunk";

const initialState = {
  current: {},
  daily: {},
  weekly: {},
  news: {},
  status: "",
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByLocation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
        state.status = "success";
        state.current = action.payload;
      })
      .addCase(fetchDailyWeatherByLocation.fulfilled, (state, action) => {
        state.daily = action.payload;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.status = "success";
        state.current = action.payload;
      })
      .addCase(fetchDailyWeatherByCity.fulfilled, (state, action) => {
        state.daily = action.payload;
      })

      .addCase(fetchWeatherByLocation.rejected, (state) => {
        state.status = "error";
        state.error = "NOT_FOUND";
      })

      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.status = "error";
        state.error = "NOT_FOUND";
      });
  },
});

export default weatherSlice.reducer;
