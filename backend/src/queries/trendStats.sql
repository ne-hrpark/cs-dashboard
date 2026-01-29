-- ============================================================
-- GET /api/stats/trend - 시계열 통계 (period, startDate, endDate)
-- ============================================================
-- 파라미터: @period (daily|weekly|monthly), @startDate, @endDate
-- 실제 날짜 컬럼명(created_at 등)과 그룹 기준에 맞게 수정하세요.
-- ============================================================

-- daily: 일별 집계, weekly: 주별, monthly: 월별
SELECT
    CASE
        WHEN @period = 'daily' THEN CAST(created_at AS DATE)
        WHEN @period = 'weekly' THEN DATEADD(WEEK, DATEDIFF(WEEK, 0, created_at), 0)
        WHEN @period = 'monthly' THEN DATEFROMPARTS(YEAR(created_at), MONTH(created_at), 1)
    END AS periodDate,
    COUNT(*) AS count
FROM Members
WHERE CAST(created_at AS DATE) >= @startDate
  AND CAST(created_at AS DATE) <= @endDate
GROUP BY
    CASE
        WHEN @period = 'daily' THEN CAST(created_at AS DATE)
        WHEN @period = 'weekly' THEN DATEADD(WEEK, DATEDIFF(WEEK, 0, created_at), 0)
        WHEN @period = 'monthly' THEN DATEFROMPARTS(YEAR(created_at), MONTH(created_at), 1)
    END
ORDER BY periodDate;
