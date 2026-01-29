import type { FC } from 'react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import type { DateRangePreset, TrendPeriod } from '../types';

interface FilterPanelProps {
  datePreset: DateRangePreset;
  onDatePresetChange: (preset: DateRangePreset) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  period: TrendPeriod;
  onPeriodChange: (period: TrendPeriod) => void;
}

const presets: { value: DateRangePreset; label: string }[] = [
  { value: 'today', label: '오늘' },
  { value: 'yesterday', label: '어제' },
  { value: '7days', label: '최근 7일' },
  { value: '30days', label: '최근 30일' },
  { value: 'custom', label: '기간 지정' },
];

const periods: { value: TrendPeriod; label: string }[] = [
  { value: 'daily', label: '일별' },
  { value: 'weekly', label: '주별' },
  { value: 'monthly', label: '월별' },
];

export const FilterPanel: FC<FilterPanelProps> = ({
  datePreset,
  onDatePresetChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  period,
  onPeriodChange,
}) => {
  const handlePresetClick = (preset: DateRangePreset) => {
    onDatePresetChange(preset);
    const today = new Date();
    let s: Date;
    let e: Date;
    switch (preset) {
      case 'today':
        s = startOfDay(today);
        e = endOfDay(today);
        break;
      case 'yesterday':
        s = startOfDay(subDays(today, 1));
        e = endOfDay(subDays(today, 1));
        break;
      case '7days':
        s = startOfDay(subDays(today, 6));
        e = endOfDay(today);
        break;
      case '30days':
        s = startOfDay(subDays(today, 29));
        e = endOfDay(today);
        break;
      default:
        return;
    }
    onStartDateChange(format(s, 'yyyy-MM-dd'));
    onEndDateChange(format(e, 'yyyy-MM-dd'));
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">
            기간
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => handlePresetClick(p.value)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  datePreset === p.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        {datePreset === 'custom' && (
          <div className="flex flex-wrap items-end gap-2">
            <div>
              <label className="mb-1 block text-xs text-slate-500">시작일</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="rounded border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">종료일</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="rounded border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">
            집계 단위
          </label>
          <div className="flex gap-2">
            {periods.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => onPeriodChange(p.value)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  period === p.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
