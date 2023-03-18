import { configureStore } from "@reduxjs/toolkit";
import stageLevelReducer from "./stageLevelSlice";
import screenModeSliceReducer from "./screenModeSlice";

const store = configureStore({
  reducer: {
    stageLevel: stageLevelReducer,
    screenMode: screenModeSliceReducer,
  },
});

export default store;
