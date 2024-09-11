// features/projectVersionsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectVersion } from "~/pages/Project/components/Roadmap";

interface ProjectVersionsState {
  versions: ProjectVersion[];
}

const initialState: ProjectVersionsState = {
  versions: [],
};

const projectVersionsSlice = createSlice({
  name: "projectVersions",
  initialState,
  reducers: {
    setProjectVersions(state, action: PayloadAction<ProjectVersion[]>) {
      state.versions = action.payload;
    },
  },
});

export const { setProjectVersions } = projectVersionsSlice.actions;
export default projectVersionsSlice.reducer;
