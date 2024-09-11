import { Issue } from "~/types/Issue";
import moment from "moment";
import "moment-timezone";
interface GroupedIssues<T> {
  [date: string]: {
    issues: T[];
    totalHours: number;
  };
}

export const groupIssuesByDate = <T extends { spent_on: string; hours: number }>(issues: T[]): GroupedIssues<T> => {
  return issues.reduce((acc: GroupedIssues<T>, issue: T) => {
    const date = issue.spent_on;
    if (!acc[date]) {
      acc[date] = { issues: [], totalHours: 0 };
    }
    acc[date].issues.push(issue);
    acc[date].totalHours += issue.hours;
    return acc;
  }, {});
};
// Hàm lọc issues theo ngày
export const filterIssuesByDate = (issues: Issue[], startDate: moment.Moment, endDate: moment.Moment) =>
  issues.filter((issue) => {
    const issueStartDate = moment(issue.start_date);
    const issueDueDate = issue.due_date ? moment(issue.due_date) : null;
    return issueStartDate.isBetween(startDate, endDate, "day", "[]") || (issueDueDate && issueDueDate.isBetween(startDate, endDate, "day", "[]"));
  });

// Hàm nhóm issues theo ngày
export const groupIssues = (issues: Issue[], startOfDay: moment.Moment, daysCount: number) => {
  const groupedIssues: Record<string, Issue[]> = {};
  for (let i = 0; i < daysCount; i++) {
    const day = startOfDay.clone().add(i, "day").format("YYYY-MM-DD");
    groupedIssues[day] = [];
  }

  issues.forEach((issue) => {
    const startDate = moment(issue.start_date).format("YYYY-MM-DD");
    const dueDate = issue.due_date ? moment(issue.due_date).format("YYYY-MM-DD") : null;

    if (groupedIssues[startDate]) {
      groupedIssues[startDate].push(issue);
    }
    if (dueDate && dueDate !== startDate && groupedIssues[dueDate]) {
      groupedIssues[dueDate].push(issue);
    }
  });

  return groupedIssues;
};
