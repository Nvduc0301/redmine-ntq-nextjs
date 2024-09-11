import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Member {
  id: number;
  name: string;
  roles: { name: string }[];
  user: { name: string };
}

interface MemberState {
  managers: Member[];
  developers: Member[];
}

const initialState: MemberState = {
  managers: [],
  developers: [],
};

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setManagers: (state, action: PayloadAction<Member[]>) => {
      state.managers = action.payload;
    },
    setDevelopers: (state, action: PayloadAction<Member[]>) => {
      state.developers = action.payload;
    },
  },
});

export const { setManagers, setDevelopers } = memberSlice.actions;
export default memberSlice.reducer;
