import { createSlice } from "@reduxjs/toolkit";

const currentCoordinatesSlice = createSlice({
  name: "currentCoordinates",
  initialState: {
    coordinates: null,
  },
  reducers: {
    setCurrentCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
  },
});

export const { setCurrentCoordinates } = currentCoordinatesSlice.actions;
export default currentCoordinatesSlice.reducer;
