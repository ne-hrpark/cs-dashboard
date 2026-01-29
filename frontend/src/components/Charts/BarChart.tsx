import React from 'react';
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { GroupItem } from '../../types';

interface BarChartProps {
  data: GroupItem[];
  nameKey: string;
  loading?: boolean;
  title?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  nameKey,
  loading,
  title,
}) => {
  const chartData = data.map((d) => ({
    name: String(d[nameKey] ?? ''),
    count: Number(d.count ?? 0),
  }));

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-500">데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      {title && (
        <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          {title}
        </h3>
      )}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
            <Tooltip formatter={(value: number) => [value, '명']} />
            <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </RechartsBar>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
