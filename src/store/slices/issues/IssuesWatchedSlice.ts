"use client"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Issue, IssuesState } from "@/types/Issue";
import { fetchAPIGet } from "@/utils/helperAPI";
const initialState: IssuesState = {
  issuesWatched: [],
  loading: false,
  error: null,
};

export const fetchIssuesWatched = createAsyncThunk("issues/IssuesWatched", async (): Promise<Issue[]> => {
  const data = await fetchAPIGet("/issues.json", "watcher_id=me");
  return data.issues;
});

const issuesWatchedSlice = createSlice({
  name: "issuesWatched",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesWatched.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesWatched.fulfilled, (state, action) => {
        state.loading = false;
        state.issuesWatched = action.payload;
      })
      .addCase(fetchIssuesWatched.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch issues";
      });
  },
});

export default issuesWatchedSlice.reducer;
