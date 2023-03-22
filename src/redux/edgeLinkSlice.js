import { createSlice } from "@reduxjs/toolkit";

const edgeLinkSlice = createSlice({
  name: "edgeLink",
  initialState: {
    isLink: false,
    linkEdge: null,
  },
  reducers: {
    setIsLink: (state, action) => {
      state.isLink = action.payload;
    },
    setLinkEdge: (state, action) => {
      state.linkEdge = action.payload;
    },
  },
});

export const { setIsLink, setLinkEdge } = edgeLinkSlice.actions;
export default edgeLinkSlice.reducer;
