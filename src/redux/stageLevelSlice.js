import { createSlice } from "@reduxjs/toolkit";

const stageLevelSlice = createSlice({
  name: "stageLevel",
  initialState: {
    level: 1,
  },
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload;
    },
  },
});

export const { setLevel } = stageLevelSlice.actions;
export default stageLevelSlice.reducer;