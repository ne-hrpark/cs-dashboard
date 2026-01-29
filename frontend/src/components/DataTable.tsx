import React, { useState } from 'react';
import { useUsers } from '../hooks/useStats';
import type { User } from '../types';
import { format } from 'date-fns';

const PAGE_SIZE = 10;

export const DataTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useUsers(page, PAGE_SIZE);

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20">
        {(error as Error)?.message ?? '회원 목록을 불러오지 못했습니다.'}
      </div>
    );
  }

  const users: User[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-600">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
                이메일
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
                이름
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
                성별
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
                지역
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
                상태
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
                가입일
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-600 dark:bg-slate-800">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                  로딩 중...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={String(user.id)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 dark:text-white">
                    {user.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {user.email ?? '-'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {user.name ?? '-'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {user.gender ?? '-'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {user.region ?? '-'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {user.status ?? '-'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {user.created_at
                      ? format(new Date(user.created_at), 'yyyy-MM-dd HH:mm')
                      : '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-600">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            총 {total}명 ({(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, total)})
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded border border-slate-300 px-3 py-1 text-sm disabled:opacity-50 dark:text-slate-200"
            >
              이전
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded border border-slate-300 px-3 py-1 text-sm disabled:opacity-50 dark:text-slate-200"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
