import { fetchAPIGet } from "~/utils/helperAPI";

export const getProjectVersions = async (identifier: string) => {
  try {
    const versions = await fetchAPIGet(`/projects/${identifier}/versions.json`);
    const data = versions.versions;
    const projectId = data?.length > 0 ? data[0]?.project.id : null;
    return { data, projectId };
  } catch (error) {
    console.error("Error fetching project versions:", error);
    throw error;
  }
};

export const getProjectVersionsIssues = async (project_id: number) => {
  try {
    const data = await fetchAPIGet("/issues.json", `project_id=${project_id}`, "fixed_version_id=*");
    return data;
  } catch (error) {
    console.error("Error fetching project versions issues:", error);
    throw error;
  }
};
