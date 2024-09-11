"use client"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GroupedIssues, Issue, IssuesState } from "@/types/Issue";
import moment, { getWeekAndMonthDates } from "@/utils/FormatDay";
import { fetchAPIGet } from "@/utils/helperAPI";
import images from "@/assets/img";
import { filterIssuesByDate, groupIssues } from "@/utils/GroupByDate";

const initialState: IssuesState = {
  issuesSchedule: {
    week: [],
    month: [],
  },
  loading: false,
  error: null,
};
// Hàm xác định hình ảnh cho mỗi issue
const determineImage = (issue: Issue, currentDate: string) => {
  const startDate = moment(issue.start_date).format("YYYY-MM-DD");
  const dueDate = issue.due_date ? moment(issue.due_date).format("YYYY-MM-DD") : null;
  if (dueDate && dueDate === startDate) {
    return images.diamond;
  }
  if (currentDate === startDate && dueDate && dueDate !== startDate) {
    return images.arrow_right;
  }
  if (dueDate && currentDate === dueDate) {
    return images.arrow_left;
  }
  return images.arrow_right;
};

// Hàm sắp xếp issues
const sortIssues = (issues: Issue[], currentDate: string) => {
  return issues.sort((a, b) => {
    const isDueA = a.due_date === currentDate ? 1 : 0;
    const isDueB = b.due_date === currentDate ? 1 : 0;
    if (isDueA !== isDueB) {
      return isDueB - isDueA;
    }
    return a.id - b.id;
  });
};

// Hàm chính để lấy dữ liệu lịch trình issues
export const fetchIssuesSchedule = createAsyncThunk(
  "issues/fetchIssuesSchedule",
  async (): Promise<{ week: GroupedIssues[]; month: GroupedIssues[] }> => {
    try {
      const data = await fetchAPIGet("/issues.json");
      const issues: Issue[] = data.issues;
      const { startOfWeek, endOfWeek, LastWeekOfPreviousMonth, LastWeekOfCurrentMonth } = getWeekAndMonthDates();
      const filteredIssuesForWeek = filterIssuesByDate(issues, startOfWeek, endOfWeek);
      const filteredIssuesForMonth = filterIssuesByDate(issues, LastWeekOfPreviousMonth, LastWeekOfCurrentMonth);
      const groupedIssuesForWeek = groupIssues(filteredIssuesForWeek, startOfWeek, 7);
      const groupedIssuesForMonth = groupIssues(filteredIssuesForMonth, LastWeekOfPreviousMonth, 35);
      const groupedIssuesArrayForWeek: GroupedIssues[] = Object.keys(groupedIssuesForWeek).map((date) => ({
        day: date,
        tasks: sortIssues(groupedIssuesForWeek[date], date).map((issue) => ({
          ...issue,
          deadline: issue.due_date === issue.start_date,
          img: determineImage(issue, date),
        })),
      }));

      const groupedIssuesArrayForMonth: GroupedIssues[] = Object.keys(groupedIssuesForMonth).map((date) => ({
        day: date,
        tasks: sortIssues(groupedIssuesForMonth[date], date).map((issue) => ({
          ...issue,
          deadline: issue.due_date === issue.start_date,
          img: determineImage(issue, date),
        })),
      }));

      return { week: groupedIssuesArrayForWeek, month: groupedIssuesArrayForMonth };
    } catch (error) {
      console.error("Error fetching issues:", error);
      throw error;
    }
  },
);

const issuesScheduleSlice = createSlice({
  name: "issuesSchedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.issuesSchedule = action.payload;
      })
      .addCase(fetchIssuesSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch issues";
      });
  },
});

export default issuesScheduleSlice.reducer;
