export type TableHeader = {
  key: string;
  label: string;
};

export const tableHeaders: TableHeader[] = [
  { key: '#', label: '#' },
  { key: 'Project', label: 'Project' },
  { key: 'Tracker', label: 'Tracker' },
  { key: 'Subject', label: 'Subject' },
];

export type TableNames = {
  issuesAssigned: string;
  issuesReport: string;
  issuesWatched: string;
  default: string;
};

export const tableNames: TableNames = {
  issuesAssigned: 'Issues assigned to me',
  issuesReport: 'Reported issues',
  issuesWatched: 'Watched issues',
  default: 'Issues',
};

// project service

export const customLabels = [
  { value: '', label: '' },
  { value: '2803', label: '<<me>>' },
];

// new issue project

export const statusOptions = [
  { label: 'Bug', value: 1 },
  { label: 'Task', value: 4 },
];
