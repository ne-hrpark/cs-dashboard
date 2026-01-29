/**
 * API 응답 형식에 맞는 Mock 데이터
 * MOCK=true 일 때 DB 대신 이 데이터를 반환합니다.
 */

function lastDays(count: number): string[] {
  const dates: string[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export const mockSummary = {
  totalMembers: 12580,
  activeMembers: 9820,
  dormantMembers: 2100,
  withdrawnMembers: 660,
  todaySignups: 42,
  weekSignups: 318,
  monthSignups: 1250,
};

export const mockTrend = lastDays(14).map((date, i) => ({
  periodDate: date,
  count: 20 + Math.floor(Math.random() * 25) + i,
}));

export const mockAgeGroups = [
  { ageGroup: '10대 이하', count: 520 },
  { ageGroup: '20대', count: 3850 },
  { ageGroup: '30대', count: 4120 },
  { ageGroup: '40대', count: 2580 },
  { ageGroup: '50대', count: 980 },
  { ageGroup: '60대 이상', count: 530 },
];

export const mockGenderGroups = [
  { gender: 'M', count: 6520 },
  { gender: 'F', count: 6010 },
  { gender: 'unknown', count: 50 },
];

export const mockRegionGroups = [
  { region: '서울', count: 3520 },
  { region: '경기', count: 2810 },
  { region: '부산', count: 1200 },
  { region: '인천', count: 980 },
  { region: '대구', count: 750 },
  { region: '대전', count: 520 },
  { region: '기타', count: 2820 },
];

export const mockSignupSource = [
  { signupSource: 'web', count: 5200 },
  { signupSource: 'mobile', count: 4100 },
  { signupSource: 'app', count: 2280 },
  { signupSource: 'admin', count: 800 },
  { signupSource: 'unknown', count: 200 },
];

export const mockStatusGroups = [
  { status: 'active', count: 9820 },
  { status: 'dormant', count: 2100 },
  { status: 'withdrawn', count: 660 },
];

const firstNames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
const lastNames = ['민준', '서연', '도윤', '하은', '시우', '지우', '수아', '준서', '지민', '서준'];
const regions = ['서울', '경기', '부산', '인천', '대구'];
const statuses = ['active', 'active', 'active', 'dormant', 'withdrawn'];
const sources = ['web', 'mobile', 'app'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildMockUsers(count: number, offset: number): Record<string, unknown>[] {
  const users: Record<string, unknown>[] = [];
  for (let i = 0; i < count; i++) {
    const id = offset + i + 1;
    const name = randomItem(firstNames) + randomItem(lastNames);
    users.push({
      id,
      email: `user${id}@example.com`,
      name,
      gender: Math.random() > 0.5 ? 'M' : 'F',
      region: randomItem(regions),
      status: randomItem(statuses),
      signup_source: randomItem(sources),
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  return users;
}

export const MOCK_USERS_TOTAL = 12580;

export function getMockUsers(offset: number, limit: number): Record<string, unknown>[] {
  return buildMockUsers(limit, offset);
}

export const mockRealtime = {
  totalMembers: mockSummary.totalMembers,
  activeMembers: mockSummary.activeMembers,
  todaySignups: mockSummary.todaySignups,
};
