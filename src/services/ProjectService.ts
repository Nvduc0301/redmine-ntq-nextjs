import { Settings } from './../types/Project';
import { fetchAPIGet } from '~/utils/helperAPI';
import {
  GroupMemberSelect,
  Issue,
  Member,
  Project,
  Time,
  TrackerItem,
  Versions,
  VersionSelect,
  Wikis,
} from '~/types/Project';
import { PROJECT_ID } from '~/const/MagicConstant';
import { customLabels } from '~/utils/MetaData';
import { axiosInstance } from './api';

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axiosInstance.get('/projects.json');
    return response.data.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getMembers = async (identifier: string): Promise<Member[]> => {
  try {
    const data = await fetchAPIGet(`/projects/${identifier}/memberships.json`);
    return data.memberships;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
export const getMembersSelect = async (): Promise<GroupMemberSelect> => {
  try {
    const data = await fetchAPIGet(`/projects/${PROJECT_ID}/memberships.json`);
    const memberships = data.memberships?.map((membership: Member) => ({
      value: membership.user.id,
      label: membership.user.name,
    }));
    const Membership = [...customLabels, ...memberships];
    const Watcher = [...memberships];
    return { Membership, Watcher };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
export const getVersionSelect = async (): Promise<Versions[]> => {
  try {
    const data = await fetchAPIGet(`/projects/${PROJECT_ID}/versions.json`);
    let version = data.versions
      ?.filter((version: VersionSelect) => version.status === 'open')
      .map((version: VersionSelect) => ({
        value: version.id,
        label: version.name,
      }));

    return (version = [customLabels[0], ...version]);
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getTrackerQuantity = async (
  identifier: string
): Promise<TrackerItem[]> => {
  try {
    const data = await fetchAPIGet('/issues.json', `identifier=${identifier}`);
    return data.issues;
  } catch (error) {
    console.error('Error fetching tracker quantity:', error);
    throw error;
  }
};

// activity

export const timeEntries = async (identifier: string): Promise<Time[]> => {
  try {
    const data = await fetchAPIGet(
      '/time_entries.json',
      `identifier=${identifier}`
    );
    return data.time_entries;
  } catch (error) {
    console.error('Error fetching time entries:', error);
    throw error;
  }
};

export const getWiki = async (identifier: string): Promise<Wikis[]> => {
  try {
    const data = await fetchAPIGet(`projects/${identifier}/wiki/Wiki.json`);
    return data.wiki_page;
  } catch (error) {
    console.error('Error fetching wiki page:', error);
    throw error;
  }
};

export const getUserDetail = async (user_id: string): Promise<Member[]> => {
  try {
    const data = await fetchAPIGet(`users/${user_id}.json`);
    return data.user;
  } catch (error) {
    console.error('Error fetching wiki page:', error);
    throw error;
  }
};

// Issues

export const getIssuesDetail = async (user_id: string): Promise<Issue[]> => {
  try {
    const data = await fetchAPIGet(`issues/${user_id}.json`);
    return data.issue;
  } catch (error) {
    console.error('Error fetching wiki page:', error);
    throw error;
  }
};

// Settings

export const getVersions = async (identifier: string): Promise<Settings[]> => {
  try {
    const data = await fetchAPIGet(`projects/${identifier}/versions.json`);
    return data.versions;
  } catch (error) {
    console.error('Error fetching wiki page:', error);
    throw error;
  }
};
