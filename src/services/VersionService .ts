import axiosInstance from "./api";
import { projectID } from "~/utils/CommonData";
type CreateVersionBody = {
  name: string;
  description?: string;
  status: string;
  wiki_page_title: string;
  due_date?: string;
  sharing: string;
};
export const CreateVersion = async (body: CreateVersionBody) => {
  try {
    await axiosInstance.post(`/projects/${projectID}/versions.json`, { version: body });
  } catch (err) {
    console.log("Error fetching issues:", err);
  }
};
