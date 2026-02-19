import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APIkey = "abaa4bc6ae221a9e82b86c4cfb336282";

export const fetchWeatherByLocation = createAsyncThunk(
  "weather/fetchByLocation",
  async ({ lat, lon }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`,
      );
      return response.data;
    } catch (error) {
      return console.error("error");
    }
  },
);

export const fetchDailyWeatherByLocation = createAsyncThunk(
  "weather/fetchDailyWeatherByLocation",
  async ({ lat, lon }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`,
      );
      return response.data.list;
    } catch (error) {
      return console.error("error");
    }
  },
);

export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchByCity",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("NOT_FOUND");
    }
  },
);

export const fetchDailyWeatherByCity = createAsyncThunk(
  "weather/fetchDailyWeatherByCity",
  async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`,
      );
      return response.data.list;
    } catch (error) {
      return console.error("error");
    }
  },
);
