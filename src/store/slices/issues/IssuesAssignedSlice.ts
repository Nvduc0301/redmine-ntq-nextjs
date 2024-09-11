"use client"

import { IssuesState, Issue } from "@/types/Issue";
import { fetchAPIGet } from "@/utils/helperAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: IssuesState = {
  issuesAssigned: [],
  loading: false,
  error: null,
};

export const fetchIssuesAssigned = createAsyncThunk("issues/IssuesAssigned", async (): Promise<Issue[]> => {
  const data = await fetchAPIGet("/issues.json", "assigned_to_id=me");
  return data.issues;
});

const issuesAssignedSlice = createSlice({
  name: "issuesAssigned",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesAssigned.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesAssigned.fulfilled, (state, action) => {
        state.loading = false;
        state.issuesAssigned = action.payload;
      })
      .addCase(fetchIssuesAssigned.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch issues";
      });
  },
});

export default issuesAssignedSlice.reducer;
