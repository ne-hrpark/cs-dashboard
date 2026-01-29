import fs from 'fs';
import path from 'path';
import { getPool } from '../config/database';
import {
  mockSummary,
  mockTrend,
  mockAgeGroups,
  mockGenderGroups,
  mockRegionGroups,
  mockSignupSource,
  mockStatusGroups,
  mockRealtime,
  MOCK_USERS_TOTAL,
  getMockUsers,
} from '../mock/data';

const useMock = process.env.MOCK === 'true';

// dev: __dirname = src/services → ../queries = src/queries
// prod: __dirname = dist/services → ../queries = dist/queries (build 시 queries 복사 필요)
const queriesDir = path.join(__dirname, '..', 'queries');

function getQueryPath(fileName: string): string {
  const queryPath = path.join(queriesDir, fileName);
  if (!fs.existsSync(queryPath)) {
    throw new Error(`Query file not found: ${fileName}`);
  }
  return queryPath;
}

class StatsService {
  private async executeQueryFile(
    fileName: string,
    params?: Record<string, unknown>
  ): Promise<Record<string, unknown>[]> {
    const pool = await getPool();
    const queryPath = getQueryPath(fileName);
    let query = fs.readFileSync(queryPath, 'utf-8');

    const request = pool.request();
    if (params) {
      Object.keys(params).forEach((key) => {
        const val = params[key];
        if (val !== undefined && val !== null) {
          request.input(key, val as string | number | Date | boolean);
        }
      });
    }

    const result = await request.query(query);
    return (result.recordset as Record<string, unknown>[]) || [];
  }

  async getTotalStats(): Promise<Record<string, unknown>[]> {
    if (useMock) return [mockSummary as Record<string, unknown>];
    return this.executeQueryFile('totalStats.sql');
  }

  async getTrendStats(
    period: string,
    _startDate: string,
    _endDate: string
  ): Promise<Record<string, unknown>[]> {
    if (useMock) return mockTrend as Record<string, unknown>[];
    return this.executeQueryFile('trendStats.sql', {
      period,
      startDate: _startDate,
      endDate: _endDate,
    });
  }

  async getAgeGroups(): Promise<Record<string, unknown>[]> {
    if (useMock) return mockAgeGroups as Record<string, unknown>[];
    return this.executeQueryFile('groupByAge.sql');
  }

  async getGenderGroups(): Promise<Record<string, unknown>[]> {
    if (useMock) return mockGenderGroups as Record<string, unknown>[];
    return this.executeQueryFile('groupByGender.sql');
  }

  async getRegionGroups(): Promise<Record<string, unknown>[]> {
    if (useMock) return mockRegionGroups as Record<string, unknown>[];
    return this.executeQueryFile('groupByRegion.sql');
  }

  async getSignupSource(): Promise<Record<string, unknown>[]> {
    if (useMock) return mockSignupSource as Record<string, unknown>[];
    return this.executeQueryFile('signupSource.sql');
  }

  async getStatusGroups(): Promise<Record<string, unknown>[]> {
    if (useMock) return mockStatusGroups as Record<string, unknown>[];
    return this.executeQueryFile('statusGroups.sql');
  }

  async getUsers(offset: number, limit: number): Promise<Record<string, unknown>[]> {
    if (useMock) return getMockUsers(offset, limit);
    return this.executeQueryFile('userList.sql', { offset, limit });
  }

  async getUsersTotal(): Promise<number> {
    if (useMock) return MOCK_USERS_TOTAL;
    const rows = await this.executeQueryFile('userListTotal.sql');
    const total = rows[0]?.['total'];
    return typeof total === 'number' ? total : Number(total) || 0;
  }

  async getRealtime(): Promise<Record<string, unknown>[]> {
    if (useMock) return [mockRealtime as Record<string, unknown>];
    return this.executeQueryFile('realtimeStats.sql');
  }
}

export const statsService = new StatsService();
