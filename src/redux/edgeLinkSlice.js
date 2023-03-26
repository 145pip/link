import { createSlice } from "@reduxjs/toolkit";

const edgeLinkSlice = createSlice({
  name: "edgeLink",
  initialState: {
    isLinked: false,
    linkEdge: null,
    edgeFromCoordinates: null,
    edgeToCoordinates: null,
  },
  reducers: {
    setIsLinked: (state, action) => {
      state.isLinked = action.payload;
    },
    setLinkEdge: (state, action) => {
      state.linkEdge = action.payload;
    },
    setEdgeFromCoordinates: (state, action) => {
      state.edgeFromCoordinates = action.payload;
    },
    setEdgeToCoordinates: (state, action) => {
      state.edgeToCoordinates = action.payload;
    },
  },
});

export const {
  setIsLinked,
  setLinkEdge,
  setEdgeFromCoordinates,
  setEdgeToCoordinates,
} = edgeLinkSlice.actions;
export default edgeLinkSlice.reducer;
