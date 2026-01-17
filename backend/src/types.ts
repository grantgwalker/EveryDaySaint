export type SaintRank = 'principal_feast' | 'festival' | 'lesser_festival' | 'commemoration';

export interface Saint {
  name: string;
  rank: SaintRank;
  rank_priority: number;
  life_summary: string;
  key_life_events: string[];
  path_to_sainthood: string;
  source_reference: string;
}

export interface SaintResponse {
  date: string;
  saint: Saint;
}

export interface NoSaintResponse {
  date: string;
  message: string;
}

export interface SaintsData {
  [date: string]: Saint[];
}
