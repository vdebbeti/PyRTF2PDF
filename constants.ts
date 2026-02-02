import { SortingStrategy } from './types';

export const DEFAULT_CONFIG = {
  appName: 'RTF Merger Pro',
  sourceExtension: '.rtf',
  includeTOC: true,
  sortingStrategy: SortingStrategy.COMBINED,
  handleTables: true,
  handleFigures: true,
  handleListings: true,
  tocDepth: 3,
  useWin32Com: true,
};

export const STRATEGY_LABELS = {
  [SortingStrategy.COMBINED]: 'Single Combined PDF (Sorted by ID)',
  [SortingStrategy.SEPARATE_FILES]: 'Separate PDF Files (Tables.pdf, Figures.pdf...)',
  [SortingStrategy.SEPARATE_SECTIONS]: 'Single PDF with Separated Sections'
};