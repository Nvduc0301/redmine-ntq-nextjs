'use client'

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filterSlice from "./slices/issues/filterSlice";
import IssuesAssignedSlice from "./slices/issues/IssuesAssignedSlice";
import IssuesReportSlice from "./slices/issues/IssuesReportSlice";
import IssuesWatchedSlice from "./slices/issues/IssuesWatchedSlice";
import ProjectSlice from "./slices/issues/ProjectSlice ";
import SpentTimeSlice from "./slices/issues/SpentTimeSlice";
import TimeSpentSlice from "./slices/issues/TimeSpentSlice";
// import projectVersionSlice from "./slices/Roadmap/projectVersionSlice";
import showBugSlice from "./slices/Roadmap/showBugSlice";
import showClosedSlice from "./slices/Roadmap/showClosedSlice";
import showTaskSlice from "./slices/Roadmap/showTaskSlice";
import tempSettingsSlice from "./slices/Roadmap/tempSettingsSlice";
import memberReducer from "./slices/users/memberReducer";


const store = configureStore({
  reducer: {
    issuesReport: IssuesReportSlice,
    issuesWatched: IssuesWatchedSlice,
    issuesAssigned: IssuesAssignedSlice,
    issuesSchedule: IssuesWatchedSlice,
    SpentTime: SpentTimeSlice,
    showClosed: showClosedSlice,
    showBug: showBugSlice,
    showTask: showTaskSlice,
    tempSettings: tempSettingsSlice,
    // projectVersion: projectVersionSlice,
    filter: filterSlice,
    timeSpent: TimeSpentSlice,
    project: ProjectSlice,
    members: memberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
