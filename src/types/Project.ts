export interface Project {
  id: number;
  name: string;
  description?: string;
  created_on?: string | undefined;
  identifier: string;
}
export interface ProjectState {
  project: Project[];
  loading?: boolean;
  error?: string | null;
}



// Activity

export interface Time {
  activity: { id: number; name: string };
  id: string;
  spent_on: string;
  comments: string;
  created_on: string;
  user: { id: number; name: string };
  hours: number;
  issue?: { id: number };
}

export interface Wikis {
  title: string;
  text: string;
  version: number;
  author: { id: number; name: string };
  created_on: string;
}

export interface OverviewProps {
  identifier: string;
}
export interface Project {
  id: number;
  name: string;
  description?: string;
  created_on?: string;
  identifier: string;
}


export interface VersionSelect {
  id: number;
  name: string;
  status: string;
}
export interface WatcherSelect {
  value: number;
  label: string;
}
export interface MemberSelect {
  value: number;
  label: string;
}
export interface GroupMemberSelect {
  Membership: MemberSelect[];
  Watcher: WatcherSelect[];
}
export interface Member {
  id: number;
  project: Project;
  user: { id: number; name: string };
  roles: { id: number; name: string }[];
  label: string;
  value: number;
}

export interface Versions {
  id: number;
  project: Project;
  user: { id: number; name: string };
  roles: { id: number; name: string }[];
  label: string;
  value: number;
}
export interface MemberShip {
  memberships: Member[];
  total_count: number;
  offset: number;
  limit: number;
}
