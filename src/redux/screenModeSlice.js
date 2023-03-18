import { createSlice } from "@reduxjs/toolkit";

const screenModeSlice = createSlice({
  name: "screenMode",
  initialState: {
    mode: "Main",
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = screenModeSlice.actions;
export default screenModeSlice.reducer;
