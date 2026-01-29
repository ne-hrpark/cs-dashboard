-- ============================================================
-- GET /api/stats/signup_source - 가입 경로별 통계
-- ============================================================
-- 실제 테이블의 가입 경로 컬럼(signup_source, join_path, channel 등)에 맞게 수정하세요.
-- 값 예: web, mobile, app, admin, api 등
-- ============================================================

SELECT
    COALESCE(signup_source, 'unknown') AS signupSource,
    COUNT(*) AS count
FROM Members
GROUP BY COALESCE(signup_source, 'unknown')
ORDER BY count DESC;
-- FROM YourActualMemberTable;
