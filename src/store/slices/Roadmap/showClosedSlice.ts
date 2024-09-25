import { createSlice } from '@reduxjs/toolkit';

interface ShowClosedState {
  showClosed: boolean;
}

const initialState: ShowClosedState = {
  showClosed: false,
};

const showClosedSlice = createSlice({
  name: 'showClosed',
  initialState,
  reducers: {
    toggleShowClosed(state) {
      state.showClosed = !state.showClosed;
    },
    setShowClosed(state, action) {
      state.showClosed = action.payload;
    },
  },
});

export const { toggleShowClosed, setShowClosed } = showClosedSlice.actions;
export default showClosedSlice.reducer;
