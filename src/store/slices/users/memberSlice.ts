import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Member {
  id: number;
  project: { id: number; name: string | undefined };
  roles: { id: number; name: string }[];
  user: { id: number; name: string };
}

const initialState = {
  members: [] as Member[],
};

const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setLocalMembers(state, action: PayloadAction<Member[]>) {
      state.members = action.payload;
    },
  },
});

export const { setLocalMembers } = memberSlice.actions;
export default memberSlice.reducer;
