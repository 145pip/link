import { createSlice } from "@reduxjs/toolkit";

const edgeLinkSlice = createSlice({
  name: "edgeLink",
  initialState: {
    isLinked: false,
    linkEdge: null,
  },
  reducers: {
    setIsLinked: (state, action) => {
      state.isLinked = action.payload;
    },
    setLinkEdge: (state, action) => {
      state.linkEdge = action.payload;
    },
  },
});

export const { setIsLinked, setLinkEdge } = edgeLinkSlice.actions;
export default edgeLinkSlice.reducer;
