-- ============================================================
-- GET /api/stats/gender_groups - 성별 그룹
-- ============================================================
-- 실제 테이블의 성별 컬럼명(gender, sex 등)과 코드값(M/F, male/female 등)에 맞게 수정하세요.
-- ============================================================

SELECT
    COALESCE(gender, 'unknown') AS gender,
    COUNT(*) AS count
FROM Members
GROUP BY COALESCE(gender, 'unknown')
ORDER BY count DESC;
-- FROM YourActualMemberTable;
