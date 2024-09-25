import { CreateVersionBody } from '~/types/Project';
import { PROJECT_ID } from '~/const/MagicConstant';
import { axiosInstance } from './api';

export const CreateVersion = async (body: CreateVersionBody) => {
  try {
    await axiosInstance.post(`/projects/${PROJECT_ID}/versions.json`, {
      version: body,
    });
  } catch (err) {
    console.log('Error fetching issues:', err);
  }
};
