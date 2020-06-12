import { QuickPickItem } from 'vscode';

export type SortIds = 'ascending' | 'descending';

export interface SortOption extends QuickPickItem {
  id: SortIds;
}

export type SortOptions = SortOption[];
