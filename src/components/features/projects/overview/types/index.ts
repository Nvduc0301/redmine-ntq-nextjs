export type Project = {
  id: number;
  name: string;
  description?: string;
  created_on?: string | undefined;
  identifier: string;
};

export type Member = {
  id: number;
  project: Project;
  user: { id: number; name: string };
  roles: { id: number; name: string }[];
  label: string;
  value: number;
};

export type TrackerItem = {
  id: number;
  tracker: {
    id: number;
    name: string;
  };
};
