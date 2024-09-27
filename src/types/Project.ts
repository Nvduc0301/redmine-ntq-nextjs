export interface ProjectState {
  project: Project[];
  loading?: boolean;
  error?: string | null;
}

//Overview

//Roadmap

export interface Issue {
  fixed_version: {
    id: number;
  };
  tracker: {
    id: number;
    name: string;
  };
  id: number;
  subject: string;
  estimated_hours: number;
  done_ratio: number;
}

export interface ProjectVersionsIssuesResponse {
  issues: Issue[];
}

export interface ProjectVersionData {
  data: ProjectVersion[];
  projectId: number;
}

export interface ProjectVersion {
  id: number;
  name: string;
  due_date: string;
  description: string;
  status: string;
}

// Activity

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

export interface Member {
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

//version

export type CreateVersionBody = {
  name: string;
  description?: string;
  status: string;
  wiki_page_title: string;
  due_date?: string;
  sharing: string;
};
