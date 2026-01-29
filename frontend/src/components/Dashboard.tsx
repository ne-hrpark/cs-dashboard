import React, { useMemo, useState, useEffect } from 'react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { StatCard } from './StatCard';
import { FilterPanel } from './FilterPanel';
import { LineChart } from './Charts/LineChart';
import { PieChart } from './Charts/PieChart';
import { BarChart } from './Charts/BarChart';
import { DataTable } from './DataTable';
import {
  useSummaryStats,
  useTrendStats,
  useAgeGroups,
  useGenderGroups,
  useRegionGroups,
  useSignupSource,
  useStatusGroups,
} from '../hooks/useStats';
import type { DateRangePreset, TrendPeriod } from '../types';

function getDefaultRange(): { start: string; end: string } {
  const today = new Date();
  const start = startOfDay(subDays(today, 6));
  const end = endOfDay(today);
  return { start: format(start, 'yyyy-MM-dd'), end: format(end, 'yyyy-MM-dd') };
}

export const Dashboard: React.FC = () => {
  const [datePreset, setDatePreset] = useState<DateRangePreset>('7days');
  const [period, setPeriod] = useState<TrendPeriod>('daily');
  const defaultRange = useMemo(getDefaultRange, []);
  const [startDate, setStartDate] = useState(defaultRange.start);
  const [endDate, setEndDate] = useState(defaultRange.end);

  useEffect(() => {
    const { start, end } = getDefaultRange();
    if (datePreset === '7days') {
      setStartDate(start);
      setEndDate(end);
    }
  }, [datePreset]);

  const summary = useSummaryStats();
  const trend = useTrendStats(period, startDate, endDate);
  const ageGroups = useAgeGroups();
  const genderGroups = useGenderGroups();
  const regionGroups = useRegionGroups();
  const signupSource = useSignupSource();
  const statusGroups = useStatusGroups();

  const summaryData = summary.data;
  const trendData = trend.data ?? [];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <header className="border-b border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            회원 통계 대시보드
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            실시간 회원 현황 및 그룹별 통계 (30초마다 자동 갱신)
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <FilterPanel
            datePreset={datePreset}
            onDatePresetChange={setDatePreset}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            period={period}
            onPeriodChange={setPeriod}
          />

          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
              전체 요약
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="전체 회원"
                value={summaryData?.totalMembers ?? 0}
                loading={summary.isLoading}
              />
              <StatCard
                title="활성 회원"
                value={summaryData?.activeMembers ?? 0}
                loading={summary.isLoading}
              />
              <StatCard
                title="오늘 가입"
                value={summaryData?.todaySignups ?? 0}
                loading={summary.isLoading}
              />
              <StatCard
                title="최근 7일 가입"
                value={summaryData?.weekSignups ?? 0}
                loading={summary.isLoading}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
              가입 추이
            </h2>
            <LineChart data={trendData} loading={trend.isLoading} />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
                성별 분포
              </h2>
              <PieChart
                data={genderGroups.data ?? []}
                nameKey="gender"
                loading={genderGroups.isLoading}
              />
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
                가입 경로
              </h2>
              <PieChart
                data={signupSource.data ?? []}
                nameKey="signupSource"
                loading={signupSource.isLoading}
              />
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
                연령대별
              </h2>
              <BarChart
                data={ageGroups.data ?? []}
                nameKey="ageGroup"
                loading={ageGroups.isLoading}
              />
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
                지역별
              </h2>
              <BarChart
                data={regionGroups.data ?? []}
                nameKey="region"
                loading={regionGroups.isLoading}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
              상태별
            </h2>
            <BarChart
              data={statusGroups.data ?? []}
              nameKey="status"
              loading={statusGroups.isLoading}
            />
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
              회원 목록
            </h2>
            <DataTable />
          </section>
        </div>
      </main>
    </div>
  );
};
