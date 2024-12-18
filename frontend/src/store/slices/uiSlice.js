import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    search: "",
    showSearch: false,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setShowSearch: (state, action) => {
      state.showSearch = action.payload;
    },
  },
});

export const { setSearch, setShowSearch } = uiSlice.actions;
export default uiSlice.reducer;

// Selectors
export const selectSearch = (state) => state.ui.search;
export const selectShowSearch = (state) => state.ui.showSearch;
