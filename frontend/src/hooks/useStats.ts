import { useQuery } from '@tanstack/react-query';
import { statsAPI } from '../services/api';
import type { SummaryStats, TrendPoint, GroupItem, RealtimeStats, UsersResponse } from '../types';

export const useSummaryStats = () => {
  return useQuery<SummaryStats>({
    queryKey: ['stats', 'summary'],
    queryFn: async () => {
      const { data } = await statsAPI.getSummary();
      return data as SummaryStats;
    },
    refetchInterval: 30000,
  });
};

export const useTrendStats = (period: string, startDate: string, endDate: string) => {
  return useQuery<TrendPoint[]>({
    queryKey: ['stats', 'trend', period, startDate, endDate],
    queryFn: async () => {
      const { data } = await statsAPI.getTrend({ period, startDate, endDate });
      return (data as TrendPoint[]) ?? [];
    },
    enabled: !!period && !!startDate && !!endDate,
  });
};

export const useAgeGroups = () => {
  return useQuery<GroupItem[]>({
    queryKey: ['stats', 'age_groups'],
    queryFn: async () => {
      const { data } = await statsAPI.getAgeGroups();
      return (data as GroupItem[]) ?? [];
    },
  });
};

export const useGenderGroups = () => {
  return useQuery<GroupItem[]>({
    queryKey: ['stats', 'gender_groups'],
    queryFn: async () => {
      const { data } = await statsAPI.getGenderGroups();
      return (data as GroupItem[]) ?? [];
    },
  });
};

export const useRegionGroups = () => {
  return useQuery<GroupItem[]>({
    queryKey: ['stats', 'region_groups'],
    queryFn: async () => {
      const { data } = await statsAPI.getRegionGroups();
      return (data as GroupItem[]) ?? [];
    },
  });
};

export const useSignupSource = () => {
  return useQuery<GroupItem[]>({
    queryKey: ['stats', 'signup_source'],
    queryFn: async () => {
      const { data } = await statsAPI.getSignupSource();
      return (data as GroupItem[]) ?? [];
    },
  });
};

export const useStatusGroups = () => {
  return useQuery<GroupItem[]>({
    queryKey: ['stats', 'status_groups'],
    queryFn: async () => {
      const { data } = await statsAPI.getStatusGroups();
      return (data as GroupItem[]) ?? [];
    },
  });
};

export const useUsers = (page: number, limit: number) => {
  return useQuery<UsersResponse>({
    queryKey: ['users', page, limit],
    queryFn: async () => {
      const { data } = await statsAPI.getUsers({ page, limit });
      return data as UsersResponse;
    },
  });
};

export const useRealtimeStats = () => {
  return useQuery<RealtimeStats>({
    queryKey: ['stats', 'realtime'],
    queryFn: async () => {
      const { data } = await statsAPI.getRealtime();
      return data as RealtimeStats;
    },
    refetchInterval: 30000,
  });
};
