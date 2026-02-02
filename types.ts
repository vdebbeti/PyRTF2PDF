export enum SortingStrategy {
  COMBINED = 'COMBINED',
  SEPARATE_FILES = 'SEPARATE_FILES',
  SEPARATE_SECTIONS = 'SEPARATE_SECTIONS'
}

export interface AppConfig {
  appName: string;
  sourceExtension: string;
  includeTOC: boolean;
  sortingStrategy: SortingStrategy;
  handleTables: boolean;
  handleFigures: boolean;
  handleListings: boolean;
  tocDepth: number;
  useWin32Com: boolean;
}

export interface GeneratedResult {
  code: string;
  instructions: string;
  requirements: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}