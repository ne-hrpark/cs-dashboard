export interface SummaryStats {
  totalMembers?: number;
  activeMembers?: number;
  dormantMembers?: number;
  withdrawnMembers?: number;
  todaySignups?: number;
  weekSignups?: number;
  monthSignups?: number;
}

export interface TrendPoint {
  periodDate: string;
  count: number;
}

export interface GroupItem {
  [key: string]: string | number;
  count: number;
}

export interface RealtimeStats {
  totalMembers?: number;
  activeMembers?: number;
  todaySignups?: number;
}

export interface User {
  id: number | string;
  email?: string;
  name?: string;
  gender?: string;
  region?: string;
  status?: string;
  signup_source?: string;
  created_at?: string;
}

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export type DateRangePreset = 'today' | 'yesterday' | '7days' | '30days' | 'custom';
export type TrendPeriod = 'daily' | 'weekly' | 'monthly';
