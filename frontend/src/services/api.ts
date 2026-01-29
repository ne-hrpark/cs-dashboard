import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 10000,
});

export const statsAPI = {
  getSummary: () => api.get('/stats/summary'),
  getTrend: (params: { period?: string; startDate?: string; endDate?: string }) =>
    api.get('/stats/trend', { params }),
  getAgeGroups: () => api.get('/stats/age_groups'),
  getGenderGroups: () => api.get('/stats/gender_groups'),
  getRegionGroups: () => api.get('/stats/region_groups'),
  getSignupSource: () => api.get('/stats/signup_source'),
  getStatusGroups: () => api.get('/stats/status_groups'),
  getUsers: (params: { page?: number; limit?: number; [key: string]: unknown }) =>
    api.get('/users', { params }),
  getRealtime: () => api.get('/stats/realtime'),
};
