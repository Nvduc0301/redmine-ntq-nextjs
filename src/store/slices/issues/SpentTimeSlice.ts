import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TimeEntriesType } from "~/types/spentTime";
import { SpentTimeState } from "~/types/spentTime";
import { fetchAPIGet } from "~/utils/helperAPI";
const initialState: SpentTimeState = {
  SpentTime: [],
  loading: false,
  error: null,
};
export const fetchSpentTime = createAsyncThunk("SpentTime", async (): Promise<TimeEntriesType[]> => {
  const data = await fetchAPIGet("/time_entries.json", "user_id=me");
  return data.time_entries;
});

const SpentTimeSlice = createSlice({
  name: "SpentTime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpentTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpentTime.fulfilled, (state, action) => {
        state.loading = false;
        state.SpentTime = action.payload;
      })
      .addCase(fetchSpentTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch spent time";
      });
  },
});

export default SpentTimeSlice.reducer;
