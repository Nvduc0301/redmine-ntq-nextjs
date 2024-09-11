import { createSlice } from "@reduxjs/toolkit";

interface ShowBugState {
  showBug: boolean;
}

const initialState: ShowBugState = {
  showBug: true,
};

const showBugSlice = createSlice({
  name: "showBug",
  initialState,
  reducers: {
    toggleShowBug(state) {
      state.showBug = !state.showBug;
    },
    setShowBug(state, action) {
      state.showBug = action.payload;
    },
  },
});

export const { toggleShowBug, setShowBug } = showBugSlice.actions;
export default showBugSlice.reducer;
