import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import stage from "./stageSlice";
import screenMode from "./screenModeSlice";
import edgeLink from "./edgeLinkSlice";
import currentCoordinates from "./currentCoordinatesSlice";
import player from "./playerSlice";
import sound from "./soundSlice";

const store = configureStore({
  reducer: {
    stage,
    screenMode,
    edgeLink,
    currentCoordinates,
    player,
    sound,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
