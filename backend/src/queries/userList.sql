-- ============================================================
-- GET /api/users - 회원 목록 (페이징, 필터)
-- ============================================================
-- 파라미터: @offset, @limit (필요 시 @status, @search 등 추가)
-- 실제 테이블/컬럼에 맞게 SELECT 목록과 WHERE 조건을 수정하세요.
-- ============================================================

SELECT
    id,
    email,
    name,
    gender,
    region,
    status,
    signup_source,
    created_at
FROM Members
-- WHERE (필터 예: @status가 있으면 status = @status, @search가 있으면 name LIKE '%' + @search + '%')
ORDER BY created_at DESC
OFFSET @offset ROWS
FETCH NEXT @limit ROWS ONLY;
-- FROM YourActualMemberTable;
