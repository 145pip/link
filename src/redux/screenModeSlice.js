import { createSlice } from "@reduxjs/toolkit";
import { SCREEN_MODE } from "../utils/constants";

const screenModeSlice = createSlice({
  name: "screenMode",
  initialState: {
    mode: SCREEN_MODE.MAIN,
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = screenModeSlice.actions;
export default screenModeSlice.reducer;
