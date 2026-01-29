import type { FC } from 'react';
import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import type { TrendPoint } from '../../types';

interface LineChartProps {
  data: TrendPoint[];
  loading?: boolean;
  dataKey?: string;
}

export const LineChart: FC<LineChartProps> = ({
  data,
  loading,
  dataKey = 'count',
}) => {
  const chartData = data.map((d) => ({
    ...d,
    dateLabel: d.periodDate
      ? format(new Date(d.periodDate), 'MM/dd')
      : String(d.periodDate),
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
    <div className="h-80 w-full rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLine data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 12 }}
            stroke="#64748b"
          />
          <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip
            formatter={(value: number) => [value, '가입 수']}
            labelFormatter={(label) => label}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb' }}
          />
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
};
