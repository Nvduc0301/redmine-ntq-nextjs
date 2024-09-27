import { Issue } from '~/types/Issue';

export type ModalState = {
  issue: Issue;
  mousePosition: { x: number; y: number };
  zIndex: number;
};
