import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import stageLevelReducer from "./stageLevelSlice";
import screenModeSliceReducer from "./screenModeSlice";
import edgeLinkSliceReducer from "./edgeLinkSlice";
import currentCoordinatesSlice from "./currentCoordinatesSlice";

const store = configureStore({
  reducer: {
    stageLevel: stageLevelReducer,
    screenMode: screenModeSliceReducer,
    edgeLink: edgeLinkSliceReducer,
    currentCoordinates: currentCoordinatesSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
