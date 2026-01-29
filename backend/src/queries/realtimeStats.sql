-- ============================================================
-- GET /api/stats/realtime - 실시간 통계 (폴링용)
-- ============================================================
-- 대시보드 30초 폴링용 경량 집계. totalStats와 유사하되 필요한 항목만 포함해도 됩니다.
-- 실제 스키마에 맞게 수정하세요.
-- ============================================================

SELECT
    COUNT(*) AS totalMembers,
    COUNT(CASE WHEN status = 'active' THEN 1 END) AS activeMembers,
    COUNT(CASE WHEN CAST(created_at AS DATE) = CAST(GETDATE() AS DATE) THEN 1 END) AS todaySignups
FROM Members;
-- FROM YourActualMemberTable;
