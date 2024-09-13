import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Issue, IssuesState } from "~/types/Issue";
import { fetchAPIGet } from "~/utils/helperAPI";
const initialState: IssuesState = {
  issuesReport: [],
  loading: false,
  error: null,
};

export const fetchIssuesReport = createAsyncThunk("issues/IssuesReport", async (): Promise<Issue[]> => {
  const data = await fetchAPIGet("/issues.json", "author_id=me");
  return data.issues;
});

const issuesReportSlice = createSlice({
  name: "issuesReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesReport.fulfilled, (state, action) => {
        state.loading = false;
        state.issuesReport = action.payload;
      })
      .addCase(fetchIssuesReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch issues";
      });
  },
});

export default issuesReportSlice.reducer;
