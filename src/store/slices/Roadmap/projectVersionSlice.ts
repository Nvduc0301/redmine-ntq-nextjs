// features/projectVersionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectVersion } from '~/app/projects/[identifier]/roadmap/page';

interface ProjectVersionsState {
  versions: ProjectVersion[];
}

const initialState: ProjectVersionsState = {
  versions: [],
};

const projectVersionsSlice = createSlice({
  name: 'projectVersions',
  initialState,
  reducers: {
    setProjectVersions(state, action: PayloadAction<ProjectVersion[]>) {
      state.versions = action.payload;
    },
  },
});

export const { setProjectVersions } = projectVersionsSlice.actions;
export default projectVersionsSlice.reducer;
