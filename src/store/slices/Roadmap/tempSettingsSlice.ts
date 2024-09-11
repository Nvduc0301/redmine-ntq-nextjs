import { createSlice } from "@reduxjs/toolkit";

interface TempSettingsState {
  tempShowClosed: boolean;
  tempShowBug: boolean;
  tempShowTask: boolean;
}

const initialState: TempSettingsState = {
  tempShowClosed: false,
  tempShowBug: true,
  tempShowTask: true,
};

const tempSettingsSlice = createSlice({
  name: "tempSettings",
  initialState,
  reducers: {
    setTempShowClosed(state, action) {
      state.tempShowClosed = action.payload;
    },
    setTempShowBug(state, action) {
      state.tempShowBug = action.payload;
    },
    setTempShowTask(state, action) {
      state.tempShowTask = action.payload;
    },
  },
});

export const { setTempShowClosed, setTempShowBug, setTempShowTask } = tempSettingsSlice.actions;
export default tempSettingsSlice.reducer;
