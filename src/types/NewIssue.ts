export const selectOptions = [
  { value: '1.1', label: '1.1 REQ_Missing or incomplete' },
  { value: '2.1', label: '2.1 DES_Missing or incomplete' },
  { value: '3.1', label: '3.1 PRO_Missing or Incomplete' },
  { value: '4.1', label: '4.1 IMP_Discipline/Process non-compliance' },
  {
    value: '4.2',
    label: '4.2 IMP_Insufficient analysis before implementation',
  },
  { value: '4.3', label: '4.3 IMP_Shortage of time' },
  { value: '4.4', label: '4.4 IMP_Missing or incomplete process' },
  { value: '4.5', label: '4.5 IMP_Lack of testing' },
  { value: '5.1', label: '5.1 COM_Missing communication' },
  { value: '5.2', label: '5.2 COM_Missing confirmation' },
  { value: '6.1', label: '6.1 SKI_Inadequate language proficiency' },
  { value: '6.2', label: '6.2 SKI_Shortage of business domain expertise' },
  { value: '6.3', label: '6.3 SKI_Lack of experience' },
  { value: '8', label: '8. Inconsistency in document or design' },
  { value: '9', label: '9. Other' },
];
export interface ItemOptions {
  label: string;
  value: string;
}

export const IsDegree = [
  {
    label: 'No',
    value: 'No',
  },
  {
    label: 'Yes',
    value: 'Yes',
  },
];
export const ratio = Array.from({ length: 11 }, (_, i) => {
  const value = i * 10 + ' %';
  return { label: value.toString(), value };
});

export const items1: ItemOptions[] = [
  { label: 'Status', value: '1' },
  { label: 'Priority', value: '2' },
  { label: 'Assignee', value: '3' },
  { label: 'Target version', value: '4' },
];

export const items2: ItemOptions[] = [
  { label: 'Parent task', value: '1' },
  { label: 'Start date', value: '2' },
  { label: 'Due date', value: '3' },
  { label: 'Estimate time', value: '4' },
  { label: '% Done', value: '5' },
];

export const items3: ItemOptions[] = [
  { label: 'Bug Type', value: '1' },
  { label: 'Severity', value: '2' },
  { label: 'QC Activity', value: '3' },
];

export const items4: ItemOptions[] = [
  { label: 'Cause Category', value: '1' },
  { label: 'Is Degrade?', value: '2' },
  { label: 'Reopen counter', value: '3' },
];

export const items5: ItemOptions[] = [
  { label: 'A', value: '1' },
  { label: 'B', value: '2' },
  { label: 'C', value: '3' },
];

export const optionsForStatus = [
  { label: 'New', value: 1 },
  { label: 'In Progress', value: 2 },
  { label: 'Reviewing', value: 3 },
  { label: 'Feedback', value: 4 },
  { label: 'Resolved', value: 5 },
  { label: 'Build', value: 6 },
  { label: 'Closed', value: 7 },
  { label: "Can't fix", value: 8 },
  { label: 'Next Release', value: 9 },
  { label: 'Watching', value: 10 },
  { label: 'Release OK', value: 11 },
  { label: 'Done STG', value: 12 },
  { label: 'Release Honban (Done Honban)', value: 13 },
];

export const optionsForPriority = [
  { label: 'Low', value: 1 },
  { label: 'Normal', value: 2 },
  { label: 'Urgent', value: 3 },
  { label: 'High', value: 4 },
  { label: 'Immediate', value: 5 },
];

export const optionsForBugType = [
  { label: 'GUI', value: 'GUI' },
  { label: 'Function', value: 'Function' },
  { label: 'Non-function', value: 'Non-function' },
  { label: 'Others', value: 'Others' },
];

export const optionsForSeverity = [
  { label: 'Critical', value: 'Critical' },
  { label: 'Major', value: 'Major' },
  { label: 'Morderate', value: 'Morderate' },
  { label: 'Minor', value: 'Minor' },
  { label: 'Cosmetic', value: 'Cosmetic' },
];

export const optionsForQC = [
  { label: 'Code review', value: 'Code review' },
  { label: 'Unit test', value: 'Unit test' },
  { label: 'Integration test', value: 'Integration test' },
  { label: 'System test', value: 'System test' },
  { label: 'Document review', value: 'Document review' },
  { label: 'Acceptance review', value: 'Acceptance review' },
  { label: 'Acceptance test', value: 'Acceptance test' },
  { label: 'Other review', value: 'Other revie' },
  { label: 'Other test', value: 'Other test' },
];
export const defaultValueForQc = optionsForQC[8].value;
export const defaultValueForBugType = optionsForBugType[3].value;
export const defatultValueForSeverity = optionsForSeverity[4].value;
export const defaultValueForOptions = selectOptions[14].value;
