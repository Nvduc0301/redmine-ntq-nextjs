"use client"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Project, ProjectState } from "@/types/Project";
import { fetchAPIGet } from "@/utils/helperAPI";

const initialState: ProjectState = {
  project: [],
  loading: false,
  error: null,
};

export const fetchProject = createAsyncThunk("Project", async (): Promise<Project[]> => {
  const data = await fetchAPIGet("/projects.json");
  return data.projects;
});

const ProjectSlice = createSlice({
  name: "Project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch project";
      });
  },
});

export default ProjectSlice.reducer;
