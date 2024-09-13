import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "~/services/api";
import { TimeEntriesType } from "~/types/spentTime";
import { fetchAPIGet } from "~/utils/helperAPI";

interface SpentTimeState {
  timeSpent: TimeEntriesType[];
  loading: boolean;
  error: string | null;
}

const initialState: SpentTimeState = {
  timeSpent: [],
  loading: false,
  error: null,
};

export const fetchTimeSpent = createAsyncThunk("timeSpent", async (): Promise<TimeEntriesType[]> => {
  const data = await fetchAPIGet("/time_entries.json");
  return data.time_entries;
});

const timeSpentSlice = createSlice({
  // Rename slice
  name: "timeSpent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeSpent.pending, (state) => {
        // Rename action
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimeSpent.fulfilled, (state, action) => {
        // Rename action
        state.loading = false;
        state.timeSpent = action.payload; // Rename this field
      })
      .addCase(fetchTimeSpent.rejected, (state, action) => {
        // Rename action
        state.loading = false;
        state.error = action.error.message || "Failed to fetch time spent"; // Update error message
      });
  },
});

export default timeSpentSlice.reducer;
