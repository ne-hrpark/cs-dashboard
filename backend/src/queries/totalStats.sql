-- ============================================================
-- GET /api/stats/summary - 전체 회원 통계
-- ============================================================
-- 실제 테이블/컬럼명에 맞게 수정 후 사용하세요.
-- 예: Members, Users, member_status, created_at 등
-- ============================================================

SELECT
    COUNT(*) AS totalMembers,
    COUNT(CASE WHEN status = 'active' THEN 1 END) AS activeMembers,
    COUNT(CASE WHEN status = 'dormant' THEN 1 END) AS dormantMembers,
    COUNT(CASE WHEN status = 'withdrawn' THEN 1 END) AS withdrawnMembers,
    COUNT(CASE WHEN CAST(created_at AS DATE) = CAST(GETDATE() AS DATE) THEN 1 END) AS todaySignups,
    COUNT(CASE WHEN CAST(created_at AS DATE) >= CAST(DATEADD(DAY, -7, GETDATE()) AS DATE) THEN 1 END) AS weekSignups,
    COUNT(CASE WHEN CAST(created_at AS DATE) >= CAST(DATEADD(DAY, -30, GETDATE()) AS DATE) THEN 1 END) AS monthSignups
FROM Members;
-- FROM YourActualMemberTable;
