// src/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { getFromLocalStorage } from '~/utils/LocalStorage';

export interface FilterState {
  showIssues: boolean;
  showChangesets: boolean;
  showDocuments: boolean;
  showFiles: boolean;
  showWikiEdits: boolean;
  showTimeEntries: boolean;
}

const loadInitialState = (): FilterState => {
  return getFromLocalStorage<FilterState>('filters', {
    showIssues: true,
    showChangesets: true,
    showDocuments: true,
    showFiles: true,
    showWikiEdits: false,
    showTimeEntries: false,
  });
};

const initialState: FilterState = loadInitialState();

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      const newState = { ...state, ...action.payload };
      return newState;
    },
  },
});

export const { setFilters } = filterSlice.actions;

export const selectFilters = (state: RootState) => state.filter;

export default filterSlice.reducer;
