-- ============================================================
-- GET /api/stats/status_groups - 상태별 (활성/휴면/탈퇴)
-- ============================================================
-- 실제 테이블의 상태 컬럼(status, member_status, is_active 등)과 코드값에 맞게 수정하세요.
-- ============================================================

SELECT
    COALESCE(status, 'unknown') AS status,
    COUNT(*) AS count
FROM Members
GROUP BY COALESCE(status, 'unknown')
ORDER BY count DESC;
-- FROM YourActualMemberTable;
-- 예: status IN ('active', 'dormant', 'withdrawn')
