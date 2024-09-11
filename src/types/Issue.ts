export interface Issue {
  id: number;
  project: { id: number; name: string };
  subject: string;
  start_date: string;
  status?: { id: number; name: string };
  author?: { id: number; name: string };
  description?: string;
  created_on?: string;
  custom_fields?: { id: number; name: string; value: string; multiple?: boolean }[];
  done_ratio?: number;
  priority?: { id: number; name: string };
  tracker: { id: number; name: string };
  fixed_version?: { id: number; name: string; value: string };
  updated_on?: string;
  due_date?: string;
  assigned_to?: { id: number; name: string };
  estimated_hours?: number;
  deadline?: boolean;
  loading?: boolean;
  error?: string | null;
  img?: string;
  spent_hours?: number;
}
export interface GroupedIssues {
  day?: string;
  tasks?: Issue[];
}
export interface IssuesState {
  issuesReport?: Issue[];
  issuesAssigned?: Issue[];
  issuesWatched?: Issue[];
  issuesSchedule?: { week: GroupedIssues[]; month: GroupedIssues[] };
  loading: boolean;
  error: string | null;
}

export interface IssueReport {
  id?: number;
  project?: { id: number; name: string };
  tracker?: { id: number; name: string };
  subject?: string;
}
export type IssueType = IssueReport[] | GroupedIssues[];
export interface CustomFieldValue {
  field_id: number;
  value: string | number | string[];
}

export interface IssueData {
  project_id: number;
  subject: string;
  priority_id: number;
  tracker_id: number;
  status_id: number;
  description?: string;
  assigned_to_id?: string;
  fixed_version_id?: string;
  parent_issue_id: string;
  start_date?: string;
  due_date?: string;
  estimated_hours: string;
  done_ratio: string;
  custom_field_values: CustomFieldValue[];
}
