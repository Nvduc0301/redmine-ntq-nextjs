export type DataSample = {
  title: string;
  type: string;
  description: string;
  author: { id: number; name: string };
  created_on: string;
  trackerName?: string;
  statusName?: string;
  subject?: string;
  id?: number;
  hours?: number;
  version?: number;
};

export type Time = {
  activity: { id: number; name: string };
  id: string;
  spent_on: string;
  comments: string;
  created_on: string;
  user: { id: number; name: string };
  hours: number;
  issue?: { id: number };
};

export type Wikis = {
  title: string;
  text: string;
  version: number;
  author: { id: number; name: string };
  created_on: string;
};
