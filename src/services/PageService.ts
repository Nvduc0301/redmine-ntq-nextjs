import { TimeEntriesType } from '~/types/spentTime';
import { axiosInstance } from './api';

export const getSpentTime = async (): Promise<TimeEntriesType[]> => {
  try {
    const response = await axiosInstance.get('/time_entries.json');
    return response.data.time_entries;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getTotalTime = async (): Promise<TimeEntriesType[]> => {
  try {
    const response = await axiosInstance.get('/time_entries.json?user_id=me');
    return response.data.time_entries;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
