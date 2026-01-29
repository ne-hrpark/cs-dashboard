import axios from 'axios';
import { VITE_API_URL } from '../config/env';

/** 환경변수 기반 API 클라이언트. URL은 하드코딩하지 않음 */
const api = axios.create({
  baseURL: VITE_API_URL || '',
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
