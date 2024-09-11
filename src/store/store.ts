import { configureStore } from "@reduxjs/toolkit";
import IssuesAssignedSlice from "./slices/issues/IssuesAssignedSlice";
import IssuesReportSlice from "./slices/issues/IssuesReportSlice";
import IssuesScheduleSlice from "./slices/issues/IssuesScheduleSlice";
import IssuesWatchedSlice from "./slices/issues/IssuesWatchedSlice";
import SpentTimeSlice from "./slices/issues/SpentTimeSlice";
import projectVersionSlice from "./slices/Roadmap/projectVersionSlice";
import showBugSlice from "./slices/Roadmap/showBugSlice";
import showClosedSlice from "./slices/Roadmap/showClosedSlice";
import showTaskSlice from "./slices/Roadmap/showTaskSlice";
import tempSettingsSlice from "./slices/Roadmap/tempSettingsSlice";
// import IssuesAssignedSlice from "@store/slices/issues/IssuesAssignedSlice";
// import IssuesReportSlice from "~/features/issues/IssuesReportSlice";
// import IssuesScheduleSlice from "~/features/issues/IssuesScheduleSlice";
// import IssuesWatchedSlice from "~/features/issues/IssuesWatchedSlice";
// import SpentTimeSlice from "~/features/issues/SpentTimeSlice";
// import projectVersionSlice from "~/features/Roadmap/projectVersionSlice";
// import showBugSlice from "~/features/Roadmap/showBugSlice";
// import showClosedSlice from "~/features/Roadmap/showClosedSlice";
// import showTaskSlice from "~/features/Roadmap/showTaskSlice";
// import tempSettingsSlice from "~/features/Roadmap/tempSettingsSlice";
// import filterReducer from "~/features/issues/filterSlice";
// import timeSpentReducer from "~/features/issues/TimeSpentSlice";
// import ProjectSlice from "~/features/issues/ProjectSlice ";
// import memberReducer from "~/features/users/memberSlice";

const store = configureStore({
  reducer: {
    issuesReport: IssuesReportSlice,
    issuesWatched: IssuesWatchedSlice,
    issuesAssigned: IssuesAssignedSlice,
    issuesSchedule: IssuesScheduleSlice,
    SpentTime: SpentTimeSlice,
    showClosed: showClosedSlice,
    showBug: showBugSlice,
    showTask: showTaskSlice,
    tempSettings: tempSettingsSlice,
    projectVersion: projectVersionSlice,
    // filter: filterReducer,
    // timeSpent: timeSpentReducer,
    // project: ProjectSlice,
    // members: memberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
