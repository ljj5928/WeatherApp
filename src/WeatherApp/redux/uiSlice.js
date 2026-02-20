import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
  mode: "auto",
  unit: "C",
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
    setUnit(state, action) {
      state.unit = action.payload;
    },
  },
});

export const { setDark, setMode,setUnit } = uiSlice.actions;
export default uiSlice.reducer;
