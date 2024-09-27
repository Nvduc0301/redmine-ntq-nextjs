import { Project } from '~/types/Project';

export type Versions = {
  id: number;
  project: Project;
  user: { id: number; name: string };
  roles: { id: number; name: string }[];
  label: string;
  value: number;
};

export type WatcherSelect = {
  value: number;
  label: string;
};

export type MemberSelect = {
  value: number;
  label: string;
};
export type GroupMemberSelect = {
  Membership: MemberSelect[];
  Watcher: WatcherSelect[];
};

export type FileObj = {
  file: File;
  description: string;
};
