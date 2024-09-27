export type Settings = {
  id: number;
  version: string;
  name: string;
  sharing: string;
  status: string;
  date: string;
  description: string;
  updated_on: string;
  created_on: string;
  due_date: string;
  project: { id: number; name: string };
};
