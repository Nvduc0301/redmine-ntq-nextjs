import Documents from '~/components/features/my-page/document';
import LatestNews from '~/components/features/my-page/latest-news';
import LogTime from '~/components/features/my-page/log-time';
import Schedule from '~/components/features/my-page/schedule';
import SpentTime from '~/components/features/my-page/spent-time';
import TableIssue from '~/components/features/my-page/table-issue';
import TotalTime from '~/components/features/my-page/total-time';

import { IssueType } from './Issue';

export const componentMap: ComponentMap = {
  LogTime,
  Schedule,
  TableIssue,
  TotalTime,
  SpentTime,
  LatestNews,
  Documents,
};
export type ItemDrag = {
  id: string;
  content?: string;
  componentName: keyof ComponentMap;
  component?: React.ReactNode;
  data?: IssueType;
  label?: string;
};

export type ItemsState = {
  FirstSpace: ItemDrag[];
  SecondSpace: ItemDrag[];
  ThirdSpace: ItemDrag[];
};
export type Option = {
  label: string;
  value: string;
  componentName?: string;
  isAdded?: boolean;
};
export type ComponentMap = {
  LogTime: React.FC;
  Schedule: React.FC<{ id: string }>;
  TableIssue: React.FC<{ id: string }>;
  TotalTime: React.FC;
  SpentTime: React.FC;
  LatestNews: React.FC;
  Documents: React.FC;
};

export type SpecificTypeName = keyof ItemsState;
