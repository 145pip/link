import { createSlice } from "@reduxjs/toolkit";

const stageSlice = createSlice({
  name: "stage",
  initialState: {
    level: localStorage.getItem("stageLevel")
      ? parseInt(localStorage.getItem("stageLevel"), 10)
      : 0,
    departure: null,
    arrival: null,
  },
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setLevelUp: state => {
      state.level += 1;
    },
    setDeparture: (state, action) => {
      state.departure = action.payload;
    },
    setArrival: (state, action) => {
      state.arrival = action.payload;
    },
  },
});

export const { setLevel, setLevelUp, setDeparture, setArrival } =
  stageSlice.actions;
export default stageSlice.reducer;
