import { createSlice } from "@reduxjs/toolkit";

interface ShowTaskState {
  showTask: boolean;
}

const initialState: ShowTaskState = {
  showTask: true,
};

const showTaskSlice = createSlice({
  name: "showTask",
  initialState,
  reducers: {
    toggleShowTask(state) {
      state.showTask = !state.showTask;
    },
    setShowTask(state, action) {
      state.showTask = action.payload;
    },
  },
});

export const { toggleShowTask, setShowTask } = showTaskSlice.actions;
export default showTaskSlice.reducer;
