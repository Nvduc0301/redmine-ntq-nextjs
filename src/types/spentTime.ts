export interface TimeEntriesType {
  id: number;
  project: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
  };
  activity: {
    id: number;
    name: string;
  };
  hours: number;
  comments: string;
  spent_on: string;
  created_on: string;
  updated_on: string;
  custom_fields: {
    id: number;
    name: string;
    value: string;
  }[];
  issue?: {
    id: number;
  };
}
export interface SpentTimeState {
  SpentTime: TimeEntriesType[];
  loading: boolean;
  error: string | null;
}
