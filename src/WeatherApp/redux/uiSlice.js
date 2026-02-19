import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
  mode: "auto", 
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDark(state, action) {
      state.isDark = action.payload;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export const { setDark, setMode } = uiSlice.actions;
export default uiSlice.reducer;