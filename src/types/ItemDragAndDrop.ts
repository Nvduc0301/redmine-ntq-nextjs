import Documents from '~/app/(my-page)/document/page';
import LatestNews from '~/app/(my-page)/latest-news/page';
import LogTime from '~/app/(my-page)/log-time/page';
import Schedule from '~/app/(my-page)/schedule/page';
import SpentTime from '~/app/(my-page)/spent-time/page';
import TableIssue from '~/app/(my-page)/table-issue/page';
import TotalTime from '~/app/(my-page)/total-time/page';
import { IssueType } from './Issue';

export type ComponentName =
  | 'LogTime'
  | 'Schedule'
  | 'TableIssue'
  | 'TotalTime'
  | 'SpentTime'
  | 'LatestNews'
  | 'Documents';
export const componentMap: ComponentMap = {
  LogTime,
  Schedule,
  TableIssue,
  TotalTime,
  SpentTime,
  LatestNews,
  Documents,
};
export interface Item {
  id: string;
  content?: string;
  componentName: keyof ComponentMap;
  component?: React.ReactNode;
  data?: IssueType;
  label?: string;
}

export interface ItemsState {
  A: Item[];
  B: Item[];
  C: Item[];
}
export interface Option {
  label: string;
  value: string;
  componentName?: string;
  isAdded?: boolean;
}
export type ComponentMap = {
  LogTime: () => JSX.Element;
  Schedule: React.FC<{ id: string }>;
  TableIssue: React.FC<{ id: string }>;
  TotalTime: React.FC;
  SpentTime: () => JSX.Element;
  LatestNews: React.FC;
  Documents: React.FC;
};
