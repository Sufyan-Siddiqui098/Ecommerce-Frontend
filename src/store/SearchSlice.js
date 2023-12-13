import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchProduct",
  initialState: {
    searchResult: [],
  },
  reducers: {
    setSearchResult: (state, action) => {
      if (action.payload.success) {
        state.searchResult = action.payload.result;
      }
    },
  },
});

export const { setSearchResult } = searchSlice.actions;
export default searchSlice.reducer;
